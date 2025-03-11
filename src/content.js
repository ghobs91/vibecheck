(() => {
    const websiteSelectorDict = {
        'reddit.com': {
            'subject': '[slot="full-post-link"]',
            'parent': 'article',
        },
        'bsky.app': {
            'subject': '[data-testid="postText"]',
            'parent': '[role="link"]',
        },
        'x.com': {
            'subject': '[data-testid="tweetText"]',
            'parent': 'article',
        },
    };

    if (typeof browser === 'undefined') {
        var browser = chrome;
    }

    const processSubjects = (rootNode) => {
        const matchingKey = Object.keys(websiteSelectorDict).find(key =>
            window.location.hostname.includes(key)
        );
        if (matchingKey) {
            const subjects = rootNode.querySelectorAll(websiteSelectorDict[matchingKey].subject);
            const texts = [];
            const subjectElements = [];

            subjects.forEach(subject => {
                const text = subject.innerText.trim();
                if (text.length > 0) {
                    texts.push(text);
                    subjectElements.push(subject);
                }
            });

            if (texts.length > 0) {
                // Check if extension is active
                chrome.storage.local.get({ extensionActive: true }, (result) => {
                    if (!result.extensionActive) return;

                    // Send a single message for both sentiment analysis and topic classification
                    browser.runtime.sendMessage({ action: 'analyze-text', texts }, (response) => {
                        if (response && Array.isArray(response)) {
                            response.forEach((result, index) => {
                                const { negativeResult, matchesBlockedTopic } = result;
                                if ((negativeResult && negativeResult.score >= 0.8) || matchesBlockedTopic) {
                                    const parentToHide = subjectElements[index].closest(websiteSelectorDict[matchingKey].parent);
                                    if (parentToHide) {
                                        parentToHide.style.display = 'none';
                                    }
                                }
                            });
                        }
                    });
                });
            }
        }
    };

    // Process subjects that are already on the page.
    processSubjects(document);

    // Set up a MutationObserver to handle infinite scrolling.
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    processSubjects(node);
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
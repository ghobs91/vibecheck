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
            subjects.forEach(subject => {
                const text = subject.innerText.trim();
                if (text.length > 0) {
                    // Check if extension is active
                    chrome.storage.local.get({ extensionActive: true }, (result) => {
                        if (!result.extensionActive) return;
                        browser.runtime.sendMessage({ action: 'sentiment-analysis', text }, (response) => {
                            if (response && Array.isArray(response)) {
                                console.log(`text classification score: ${response[0].score}`);
                                const negativeResult = response.find(item => item.label.toLowerCase() === 'negative');
                                if (negativeResult && negativeResult.score >= 0.8) {
                                    const parentToHide = subject.closest(websiteSelectorDict[matchingKey].parent);
                                    if (parentToHide) {
                                        parentToHide.style.display = 'none';
                                    }
                                }
                            }
                        });

                        // work in progress topic filtering
                        // browser.runtime.sendMessage({ action: 'classify-topic', text }, (response) => {
                        //     if (response) {
                        //         console.log(`classifyTopic output recieved from content.js: ${response}`);
                        //     }
                        // });
                        // 

                    });
                }
            });
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
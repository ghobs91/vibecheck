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
                    browser.runtime.sendMessage({ action: 'classify', text }, (response) => {
                        if (response && Array.isArray(response)) {
                            const negativeResult = response.find(item => item.label.toLowerCase() === 'negative');
                            if (negativeResult && negativeResult.score >= 0.8) {
                                const parentToHide = subject.closest(websiteSelectorDict[matchingKey].parent);
                                if (parentToHide) {
                                    // parentToHide.style.opacity = '0.1';
                                    parentToHide.style.display = 'none';
                                }
                            }
                        }
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
                // Only process element nodes.
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
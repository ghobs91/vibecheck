// content.js - the content scripts which is run in the context of web pages, and has access
// to the DOM and other web APIs.

// Example usage:
// const message = {
//     action: 'classify',
//     text: 'text to classify',
// }
// chrome.runtime.sendMessage(message, (response) => {
//     console.log('received user data', response)
// });

(() => {
    const websiteSelectorDict = {
        'www.reddit.com': {
            'subject': '[slot="full-post-link"]',
            'parent': 'article',
        },
    };

    const processSubjects = (rootNode) => {
        const subjects = rootNode.querySelectorAll(websiteSelectorDict[window.location.hostname].subject);
        subjects.forEach(subject => {
            const text = subject.innerText.trim();
            if (text.length > 0) {
                chrome.runtime.sendMessage({ action: 'classify', text }, (response) => {
                    if (response && Array.isArray(response)) {
                        const negativeResult = response.find(item => item.label.toLowerCase() === 'negative');
                        if (negativeResult && negativeResult.score >= 0.8) {
                            const parentToHide = subject.closest(websiteSelectorDict[window.location.hostname].parent);
                            if (parentToHide) {
                                parentToHide.style.opacity = '0.5';
                                // parentToHide.style.display = 'none';
                            }
                        }
                    }
                });
            }
        });
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
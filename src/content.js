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
    // Iterate over all anchor link elements on the page
    const websiteSelectorDict = {
        'www.reddit.com': {
            'subject': '[slot="full-post-link"]',
            'parent': 'article',
        },
    };
    const subjects = document.querySelectorAll(websiteSelectorDict[window.location.hostname].subject);
    for (const subject of subjects) {
        const text = subject.innerText.trim();
        if (text.length > 0) {
            chrome.runtime.sendMessage({ action: 'classify', text }, (response) => {
                // Expecting response is an array of classification results
                if (response && Array.isArray(response)) {
                    const negativeResult = response.find(item => item.label.toLowerCase() === 'negative');
                    // If negative sentiment and above a threshold, mark the div
                    if (negativeResult && negativeResult.score >= 0.8) {
                        // Hide the parent element
                        const parentToHide = subject.closest(websiteSelectorDict[window.location.hostname]['parent']);
                        if (parentToHide) {
                            parentToHide.style.display = 'none';
                        }
                    }
                }
            });
        }
    }
})();
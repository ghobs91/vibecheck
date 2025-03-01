// popup.js - handles interaction with the extension's popup, sends requests to the
// service worker (background.js), and updates the popup's UI (popup.html) on completion.

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleActive');
    const counterElement = document.getElementById('negative-counter');

    // Set initial button state based on stored value (default to active if not set)
    try {
        chrome.storage.local.get({ extensionActive: true }, (result) => {
            const isActive = result.extensionActive;
            toggleButton.classList.toggle('active', isActive);
            toggleButton.classList.toggle('inactive', !isActive);
            toggleButton.textContent = isActive ? 'On' : 'Off';
        });
    } catch (error) {
        console.error('Error retrieving extensionActive state:', error);
    }

    // Toggle the extension active state on button click.
    toggleButton.addEventListener('click', () => {
        try {
            chrome.storage.local.get({ extensionActive: true }, (result) => {
                const newState = !result.extensionActive;
                chrome.storage.local.set({ extensionActive: newState }, () => {
                    toggleButton.classList.toggle('active', newState);
                    toggleButton.classList.toggle('inactive', !newState);
                    toggleButton.textContent = newState ? 'On' : 'Off';
                });
            });
        } catch (error) {
            console.error('Error toggling extensionActive state:', error);
        }
    });

    // Load the initial count from storage
    if (counterElement) {
        try {
            chrome.storage.local.get(['negativeCount'], (result) => {
                if (result.negativeCount !== undefined) {
                    counterElement.textContent = result.negativeCount;
                }
            });
        } catch (error) {
            console.error('Error retrieving negativeCount:', error);
        }

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'updateCounter') {
                counterElement.textContent = message.count;
            }
        });
    } else {
        console.error('Element with ID "negative-counter" not found.');
    }
});
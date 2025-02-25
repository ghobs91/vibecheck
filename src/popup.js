// popup.js - handles interaction with the extension's popup, sends requests to the
// service worker (background.js), and updates the popup's UI (popup.html) on completion.

const toggleButton = document.getElementById('toggleActive');

// Set initial button state based on stored value (default to active if not set)
chrome.storage.local.get({ extensionActive: true }, (result) => {
    const isActive = result.extensionActive;
    toggleButton.textContent = isActive ? 'Deactivate Extension' : 'Activate Extension';
});

// Toggle the extension active state on button click.
toggleButton.addEventListener('click', () => {
    chrome.storage.local.get({ extensionActive: true }, (result) => {
        const newState = !result.extensionActive;
        chrome.storage.local.set({ extensionActive: newState }, () => {
            toggleButton.textContent = newState ? 'Deactivate Extension' : 'Activate Extension';
        });
    });
});
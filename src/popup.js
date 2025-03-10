// popup.js - handles interaction with the extension's popup, sends requests to the
// service worker (background.js), and updates the popup's UI (popup.html) on completion.

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleActive');
    const counterElement = document.getElementById('negative-counter');
    const topicInput = document.getElementById('topic-input');
    const addTopicButton = document.getElementById('add-topic');
    const topicList = document.getElementById('topic-list');
    const suggestedTopicList = document.getElementById('suggested-topic-list');

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

    // Load the initial list of topics from storage
    chrome.storage.local.get(['blockedTopics'], (result) => {
        if (result.blockedTopics !== undefined) {
            result.blockedTopics.forEach(topic => {
                addTopicToList(topic);
            });
        }
    });

    // Add topic to the list and save it to storage
    addTopicButton.addEventListener('click', () => {
        const topic = topicInput.value.trim();
        if (topic) {
            chrome.storage.local.get(['blockedTopics'], (result) => {
                let topics = result.blockedTopics || [];
                if (!topics.includes(topic)) {
                    topics.push(topic);
                    chrome.storage.local.set({ blockedTopics: topics }, () => {
                        addTopicToList(topic);
                        topicInput.value = '';
                    });
                } else {
                    console.log('Topic already exists');
                }
            });
        }
    });

    function addTopicToList(topic) {
        const li = document.createElement('li');
        li.textContent = topic;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-topic');
        removeButton.addEventListener('click', () => {
            removeTopicFromList(topic);
        });
        li.appendChild(removeButton);
        topicList.appendChild(li);
    }

    function removeTopicFromList(topic) {
        chrome.storage.local.get(['blockedTopics'], (result) => {
            let topics = result.blockedTopics || [];
            topics = topics.filter(t => t !== topic);
            chrome.storage.local.set({ blockedTopics: topics }, () => {
                topicList.innerHTML = '';
                topics.forEach(t => addTopicToList(t));
            });
        });
    }

    // Suggested topics
    const suggestedTopics = ['Politics', 'Religion', 'Violence', 'Drugs', 'Gambling'];
    suggestedTopics.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.classList.add('add-suggested-topic');
        addButton.addEventListener('click', () => {
            topicInput.value = topic;
            addTopicButton.click();
        });
        li.appendChild(addButton);
        suggestedTopicList.appendChild(li);
    });
});
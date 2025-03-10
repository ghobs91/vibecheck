/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7O0FDTkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLHVCQUF1QjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0EsMkNBQTJDLDJCQUEyQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLHVCQUF1QjtBQUN0RTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qyx1QkFBdUI7QUFDOUQ7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leHRlbnNpb24vLi9zcmMvcG9wdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHBvcHVwLmpzIC0gaGFuZGxlcyBpbnRlcmFjdGlvbiB3aXRoIHRoZSBleHRlbnNpb24ncyBwb3B1cCwgc2VuZHMgcmVxdWVzdHMgdG8gdGhlXG4vLyBzZXJ2aWNlIHdvcmtlciAoYmFja2dyb3VuZC5qcyksIGFuZCB1cGRhdGVzIHRoZSBwb3B1cCdzIFVJIChwb3B1cC5odG1sKSBvbiBjb21wbGV0aW9uLlxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGVBY3RpdmUnKTtcbiAgICBjb25zdCBjb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZWdhdGl2ZS1jb3VudGVyJyk7XG4gICAgY29uc3QgdG9waWNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BpYy1pbnB1dCcpO1xuICAgIGNvbnN0IGFkZFRvcGljQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10b3BpYycpO1xuICAgIGNvbnN0IHRvcGljTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BpYy1saXN0Jyk7XG4gICAgY29uc3Qgc3VnZ2VzdGVkVG9waWNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Z2dlc3RlZC10b3BpYy1saXN0Jyk7XG5cbiAgICAvLyBTZXQgaW5pdGlhbCBidXR0b24gc3RhdGUgYmFzZWQgb24gc3RvcmVkIHZhbHVlIChkZWZhdWx0IHRvIGFjdGl2ZSBpZiBub3Qgc2V0KVxuICAgIHRyeSB7XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCh7IGV4dGVuc2lvbkFjdGl2ZTogdHJ1ZSB9LCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IHJlc3VsdC5leHRlbnNpb25BY3RpdmU7XG4gICAgICAgICAgICB0b2dnbGVCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgaXNBY3RpdmUpO1xuICAgICAgICAgICAgdG9nZ2xlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJywgIWlzQWN0aXZlKTtcbiAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbi50ZXh0Q29udGVudCA9IGlzQWN0aXZlID8gJ09uJyA6ICdPZmYnO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZXRyaWV2aW5nIGV4dGVuc2lvbkFjdGl2ZSBzdGF0ZTonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlIHRoZSBleHRlbnNpb24gYWN0aXZlIHN0YXRlIG9uIGJ1dHRvbiBjbGljay5cbiAgICB0b2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoeyBleHRlbnNpb25BY3RpdmU6IHRydWUgfSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0gIXJlc3VsdC5leHRlbnNpb25BY3RpdmU7XG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgZXh0ZW5zaW9uQWN0aXZlOiBuZXdTdGF0ZSB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBuZXdTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScsICFuZXdTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbi50ZXh0Q29udGVudCA9IG5ld1N0YXRlID8gJ09uJyA6ICdPZmYnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB0b2dnbGluZyBleHRlbnNpb25BY3RpdmUgc3RhdGU6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBMb2FkIHRoZSBpbml0aWFsIGNvdW50IGZyb20gc3RvcmFnZVxuICAgIGlmIChjb3VudGVyRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnbmVnYXRpdmVDb3VudCddLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5uZWdhdGl2ZUNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSByZXN1bHQubmVnYXRpdmVDb3VudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJldHJpZXZpbmcgbmVnYXRpdmVDb3VudDonLCBlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5hY3Rpb24gPT09ICd1cGRhdGVDb3VudGVyJykge1xuICAgICAgICAgICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZS5jb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRWxlbWVudCB3aXRoIElEIFwibmVnYXRpdmUtY291bnRlclwiIG5vdCBmb3VuZC4nKTtcbiAgICB9XG5cbiAgICAvLyBMb2FkIHRoZSBpbml0aWFsIGxpc3Qgb2YgdG9waWNzIGZyb20gc3RvcmFnZVxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ2Jsb2NrZWRUb3BpY3MnXSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LmJsb2NrZWRUb3BpY3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LmJsb2NrZWRUb3BpY3MuZm9yRWFjaCh0b3BpYyA9PiB7XG4gICAgICAgICAgICAgICAgYWRkVG9waWNUb0xpc3QodG9waWMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFkZCB0b3BpYyB0byB0aGUgbGlzdCBhbmQgc2F2ZSBpdCB0byBzdG9yYWdlXG4gICAgYWRkVG9waWNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvcGljID0gdG9waWNJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIGlmICh0b3BpYykge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnYmxvY2tlZFRvcGljcyddLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHRvcGljcyA9IHJlc3VsdC5ibG9ja2VkVG9waWNzIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmICghdG9waWNzLmluY2x1ZGVzKHRvcGljKSkge1xuICAgICAgICAgICAgICAgICAgICB0b3BpY3MucHVzaCh0b3BpYyk7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGJsb2NrZWRUb3BpY3M6IHRvcGljcyB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRUb3BpY1RvTGlzdCh0b3BpYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3BpY0lucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUb3BpYyBhbHJlYWR5IGV4aXN0cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhZGRUb3BpY1RvTGlzdCh0b3BpYykge1xuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpLnRleHRDb250ZW50ID0gdG9waWM7XG4gICAgICAgIGNvbnN0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICByZW1vdmVCdXR0b24udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICAgIHJlbW92ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtdG9waWMnKTtcbiAgICAgICAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlVG9waWNGcm9tTGlzdCh0b3BpYyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChyZW1vdmVCdXR0b24pO1xuICAgICAgICB0b3BpY0xpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVRvcGljRnJvbUxpc3QodG9waWMpIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnYmxvY2tlZFRvcGljcyddLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBsZXQgdG9waWNzID0gcmVzdWx0LmJsb2NrZWRUb3BpY3MgfHwgW107XG4gICAgICAgICAgICB0b3BpY3MgPSB0b3BpY3MuZmlsdGVyKHQgPT4gdCAhPT0gdG9waWMpO1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgYmxvY2tlZFRvcGljczogdG9waWNzIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0b3BpY0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgdG9waWNzLmZvckVhY2godCA9PiBhZGRUb3BpY1RvTGlzdCh0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU3VnZ2VzdGVkIHRvcGljc1xuICAgIGNvbnN0IHN1Z2dlc3RlZFRvcGljcyA9IFsnUG9saXRpY3MnLCAnUmVsaWdpb24nLCAnVmlvbGVuY2UnLCAnRHJ1Z3MnLCAnR2FtYmxpbmcnXTtcbiAgICBzdWdnZXN0ZWRUb3BpY3MuZm9yRWFjaCh0b3BpYyA9PiB7XG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGkudGV4dENvbnRlbnQgPSB0b3BpYztcbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgICAgICBhZGRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWRkLXN1Z2dlc3RlZC10b3BpYycpO1xuICAgICAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0b3BpY0lucHV0LnZhbHVlID0gdG9waWM7XG4gICAgICAgICAgICBhZGRUb3BpY0J1dHRvbi5jbGljaygpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcbiAgICAgICAgc3VnZ2VzdGVkVG9waWNMaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
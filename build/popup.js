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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7O0FDTkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyx1QkFBdUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHVCQUF1QjtBQUM5RDtBQUNBLDJDQUEyQywyQkFBMkI7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixVQUFVO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsTUFBTTtBQUNOO0FBQ0E7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uLy4vc3JjL3BvcHVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBwb3B1cC5qcyAtIGhhbmRsZXMgaW50ZXJhY3Rpb24gd2l0aCB0aGUgZXh0ZW5zaW9uJ3MgcG9wdXAsIHNlbmRzIHJlcXVlc3RzIHRvIHRoZVxuLy8gc2VydmljZSB3b3JrZXIgKGJhY2tncm91bmQuanMpLCBhbmQgdXBkYXRlcyB0aGUgcG9wdXAncyBVSSAocG9wdXAuaHRtbCkgb24gY29tcGxldGlvbi5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0b2dnbGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlQWN0aXZlJyk7XG4gICAgY29uc3QgY291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmVnYXRpdmUtY291bnRlcicpO1xuXG4gICAgLy8gU2V0IGluaXRpYWwgYnV0dG9uIHN0YXRlIGJhc2VkIG9uIHN0b3JlZCB2YWx1ZSAoZGVmYXVsdCB0byBhY3RpdmUgaWYgbm90IHNldClcbiAgICB0cnkge1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoeyBleHRlbnNpb25BY3RpdmU6IHRydWUgfSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSByZXN1bHQuZXh0ZW5zaW9uQWN0aXZlO1xuICAgICAgICAgICAgdG9nZ2xlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIGlzQWN0aXZlKTtcbiAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScsICFpc0FjdGl2ZSk7XG4gICAgICAgICAgICB0b2dnbGVCdXR0b24udGV4dENvbnRlbnQgPSBpc0FjdGl2ZSA/ICdPbicgOiAnT2ZmJztcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcmV0cmlldmluZyBleHRlbnNpb25BY3RpdmUgc3RhdGU6JywgZXJyb3IpO1xuICAgIH1cblxuICAgIC8vIFRvZ2dsZSB0aGUgZXh0ZW5zaW9uIGFjdGl2ZSBzdGF0ZSBvbiBidXR0b24gY2xpY2suXG4gICAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHsgZXh0ZW5zaW9uQWN0aXZlOiB0cnVlIH0sIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9ICFyZXN1bHQuZXh0ZW5zaW9uQWN0aXZlO1xuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGV4dGVuc2lvbkFjdGl2ZTogbmV3U3RhdGUgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgbmV3U3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnLCAhbmV3U3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVCdXR0b24udGV4dENvbnRlbnQgPSBuZXdTdGF0ZSA/ICdPbicgOiAnT2ZmJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdG9nZ2xpbmcgZXh0ZW5zaW9uQWN0aXZlIHN0YXRlOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gTG9hZCB0aGUgaW5pdGlhbCBjb3VudCBmcm9tIHN0b3JhZ2VcbiAgICBpZiAoY291bnRlckVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ25lZ2F0aXZlQ291bnQnXSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubmVnYXRpdmVDb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gcmVzdWx0Lm5lZ2F0aXZlQ291bnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZXRyaWV2aW5nIG5lZ2F0aXZlQ291bnQ6JywgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAndXBkYXRlQ291bnRlcicpIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2UuY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VsZW1lbnQgd2l0aCBJRCBcIm5lZ2F0aXZlLWNvdW50ZXJcIiBub3QgZm91bmQuJyk7XG4gICAgfVxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
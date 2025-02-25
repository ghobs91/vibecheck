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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7O0FDTkE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDJCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLCtCQUErQix1QkFBdUI7QUFDdEQ7QUFDQSxtQ0FBbUMsMkJBQTJCO0FBQzlEO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTCxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uLy4vc3JjL3BvcHVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBwb3B1cC5qcyAtIGhhbmRsZXMgaW50ZXJhY3Rpb24gd2l0aCB0aGUgZXh0ZW5zaW9uJ3MgcG9wdXAsIHNlbmRzIHJlcXVlc3RzIHRvIHRoZVxuLy8gc2VydmljZSB3b3JrZXIgKGJhY2tncm91bmQuanMpLCBhbmQgdXBkYXRlcyB0aGUgcG9wdXAncyBVSSAocG9wdXAuaHRtbCkgb24gY29tcGxldGlvbi5cblxuY29uc3QgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZ2dsZUFjdGl2ZScpO1xuXG4vLyBTZXQgaW5pdGlhbCBidXR0b24gc3RhdGUgYmFzZWQgb24gc3RvcmVkIHZhbHVlIChkZWZhdWx0IHRvIGFjdGl2ZSBpZiBub3Qgc2V0KVxuY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHsgZXh0ZW5zaW9uQWN0aXZlOiB0cnVlIH0sIChyZXN1bHQpID0+IHtcbiAgICBjb25zdCBpc0FjdGl2ZSA9IHJlc3VsdC5leHRlbnNpb25BY3RpdmU7XG4gICAgdG9nZ2xlQnV0dG9uLnRleHRDb250ZW50ID0gaXNBY3RpdmUgPyAnRGVhY3RpdmF0ZSBFeHRlbnNpb24nIDogJ0FjdGl2YXRlIEV4dGVuc2lvbic7XG59KTtcblxuLy8gVG9nZ2xlIHRoZSBleHRlbnNpb24gYWN0aXZlIHN0YXRlIG9uIGJ1dHRvbiBjbGljay5cbnRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoeyBleHRlbnNpb25BY3RpdmU6IHRydWUgfSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdTdGF0ZSA9ICFyZXN1bHQuZXh0ZW5zaW9uQWN0aXZlO1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBleHRlbnNpb25BY3RpdmU6IG5ld1N0YXRlIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbi50ZXh0Q29udGVudCA9IG5ld1N0YXRlID8gJ0RlYWN0aXZhdGUgRXh0ZW5zaW9uJyA6ICdBY3RpdmF0ZSBFeHRlbnNpb24nO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
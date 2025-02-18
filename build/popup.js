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

const inputElement = document.getElementById('text');
const outputElement = document.getElementById('output');

// Listen for changes made to the textbox.
inputElement.addEventListener('input', (event) => {

    // Bundle the input data into a message.
    const message = {
        action: 'classify',
        text: event.target.value,
    }

    // Send this message to the service worker.
    chrome.runtime.sendMessage(message, (response) => {
        // Handle results returned by the service worker (`background.js`) and update the popup's UI.
        outputElement.innerText = JSON.stringify(response, null, 2);
    });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7O0FDTkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uLy4vc3JjL3BvcHVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBwb3B1cC5qcyAtIGhhbmRsZXMgaW50ZXJhY3Rpb24gd2l0aCB0aGUgZXh0ZW5zaW9uJ3MgcG9wdXAsIHNlbmRzIHJlcXVlc3RzIHRvIHRoZVxuLy8gc2VydmljZSB3b3JrZXIgKGJhY2tncm91bmQuanMpLCBhbmQgdXBkYXRlcyB0aGUgcG9wdXAncyBVSSAocG9wdXAuaHRtbCkgb24gY29tcGxldGlvbi5cblxuY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcbmNvbnN0IG91dHB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0Jyk7XG5cbi8vIExpc3RlbiBmb3IgY2hhbmdlcyBtYWRlIHRvIHRoZSB0ZXh0Ym94LlxuaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2ZW50KSA9PiB7XG5cbiAgICAvLyBCdW5kbGUgdGhlIGlucHV0IGRhdGEgaW50byBhIG1lc3NhZ2UuXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgYWN0aW9uOiAnY2xhc3NpZnknLFxuICAgICAgICB0ZXh0OiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGlzIG1lc3NhZ2UgdG8gdGhlIHNlcnZpY2Ugd29ya2VyLlxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKG1lc3NhZ2UsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyBIYW5kbGUgcmVzdWx0cyByZXR1cm5lZCBieSB0aGUgc2VydmljZSB3b3JrZXIgKGBiYWNrZ3JvdW5kLmpzYCkgYW5kIHVwZGF0ZSB0aGUgcG9wdXAncyBVSS5cbiAgICAgICAgb3V0cHV0RWxlbWVudC5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSwgbnVsbCwgMik7XG4gICAgfSk7XG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
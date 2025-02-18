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
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QywwQkFBMEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxDQUFDLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uLy4vc3JjL2NvbnRlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGNvbnRlbnQuanMgLSB0aGUgY29udGVudCBzY3JpcHRzIHdoaWNoIGlzIHJ1biBpbiB0aGUgY29udGV4dCBvZiB3ZWIgcGFnZXMsIGFuZCBoYXMgYWNjZXNzXG4vLyB0byB0aGUgRE9NIGFuZCBvdGhlciB3ZWIgQVBJcy5cblxuLy8gRXhhbXBsZSB1c2FnZTpcbi8vIGNvbnN0IG1lc3NhZ2UgPSB7XG4vLyAgICAgYWN0aW9uOiAnY2xhc3NpZnknLFxuLy8gICAgIHRleHQ6ICd0ZXh0IHRvIGNsYXNzaWZ5Jyxcbi8vIH1cbi8vIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKG1lc3NhZ2UsIChyZXNwb25zZSkgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCB1c2VyIGRhdGEnLCByZXNwb25zZSlcbi8vIH0pO1xuXG4oKCkgPT4ge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhbGwgYW5jaG9yIGxpbmsgZWxlbWVudHMgb24gdGhlIHBhZ2VcbiAgICBjb25zdCB3ZWJzaXRlU2VsZWN0b3JEaWN0ID0ge1xuICAgICAgICAnd3d3LnJlZGRpdC5jb20nOiB7XG4gICAgICAgICAgICAnc3ViamVjdCc6ICdbc2xvdD1cImZ1bGwtcG9zdC1saW5rXCJdJyxcbiAgICAgICAgICAgICdwYXJlbnQnOiAnYXJ0aWNsZScsXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBzdWJqZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwod2Vic2l0ZVNlbGVjdG9yRGljdFt3aW5kb3cubG9jYXRpb24uaG9zdG5hbWVdLnN1YmplY3QpO1xuICAgIGZvciAoY29uc3Qgc3ViamVjdCBvZiBzdWJqZWN0cykge1xuICAgICAgICBjb25zdCB0ZXh0ID0gc3ViamVjdC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogJ2NsYXNzaWZ5JywgdGV4dCB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBFeHBlY3RpbmcgcmVzcG9uc2UgaXMgYW4gYXJyYXkgb2YgY2xhc3NpZmljYXRpb24gcmVzdWx0c1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiBBcnJheS5pc0FycmF5KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZWdhdGl2ZVJlc3VsdCA9IHJlc3BvbnNlLmZpbmQoaXRlbSA9PiBpdGVtLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09ICduZWdhdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBuZWdhdGl2ZSBzZW50aW1lbnQgYW5kIGFib3ZlIGEgdGhyZXNob2xkLCBtYXJrIHRoZSBkaXZcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ2F0aXZlUmVzdWx0ICYmIG5lZ2F0aXZlUmVzdWx0LnNjb3JlID49IDAuOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSGlkZSB0aGUgcGFyZW50IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFRvSGlkZSA9IHN1YmplY3QuY2xvc2VzdCh3ZWJzaXRlU2VsZWN0b3JEaWN0W3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZV1bJ3BhcmVudCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUb0hpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRUb0hpZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
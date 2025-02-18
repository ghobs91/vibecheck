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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsMEJBQTBCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4dGVuc2lvbi8uL3NyYy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBjb250ZW50LmpzIC0gdGhlIGNvbnRlbnQgc2NyaXB0cyB3aGljaCBpcyBydW4gaW4gdGhlIGNvbnRleHQgb2Ygd2ViIHBhZ2VzLCBhbmQgaGFzIGFjY2Vzc1xuLy8gdG8gdGhlIERPTSBhbmQgb3RoZXIgd2ViIEFQSXMuXG5cbi8vIEV4YW1wbGUgdXNhZ2U6XG4vLyBjb25zdCBtZXNzYWdlID0ge1xuLy8gICAgIGFjdGlvbjogJ2NsYXNzaWZ5Jyxcbi8vICAgICB0ZXh0OiAndGV4dCB0byBjbGFzc2lmeScsXG4vLyB9XG4vLyBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShtZXNzYWdlLCAocmVzcG9uc2UpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgdXNlciBkYXRhJywgcmVzcG9uc2UpXG4vLyB9KTtcblxuKCgpID0+IHtcbiAgICBjb25zdCB3ZWJzaXRlU2VsZWN0b3JEaWN0ID0ge1xuICAgICAgICAnd3d3LnJlZGRpdC5jb20nOiB7XG4gICAgICAgICAgICAnc3ViamVjdCc6ICdbc2xvdD1cImZ1bGwtcG9zdC1saW5rXCJdJyxcbiAgICAgICAgICAgICdwYXJlbnQnOiAnYXJ0aWNsZScsXG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IHByb2Nlc3NTdWJqZWN0cyA9IChyb290Tm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBzdWJqZWN0cyA9IHJvb3ROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwod2Vic2l0ZVNlbGVjdG9yRGljdFt3aW5kb3cubG9jYXRpb24uaG9zdG5hbWVdLnN1YmplY3QpO1xuICAgICAgICBzdWJqZWN0cy5mb3JFYWNoKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHN1YmplY3QuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogJ2NsYXNzaWZ5JywgdGV4dCB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIEFycmF5LmlzQXJyYXkocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZWdhdGl2ZVJlc3VsdCA9IHJlc3BvbnNlLmZpbmQoaXRlbSA9PiBpdGVtLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09ICduZWdhdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ2F0aXZlUmVzdWx0ICYmIG5lZ2F0aXZlUmVzdWx0LnNjb3JlID49IDAuOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFRvSGlkZSA9IHN1YmplY3QuY2xvc2VzdCh3ZWJzaXRlU2VsZWN0b3JEaWN0W3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZV0ucGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50VG9IaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFRvSGlkZS5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcmVudFRvSGlkZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gUHJvY2VzcyBzdWJqZWN0cyB0aGF0IGFyZSBhbHJlYWR5IG9uIHRoZSBwYWdlLlxuICAgIHByb2Nlc3NTdWJqZWN0cyhkb2N1bWVudCk7XG5cbiAgICAvLyBTZXQgdXAgYSBNdXRhdGlvbk9ic2VydmVyIHRvIGhhbmRsZSBpbmZpbml0ZSBzY3JvbGxpbmcuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChtdXRhdGlvbiA9PiB7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBwcm9jZXNzIGVsZW1lbnQgbm9kZXMuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NTdWJqZWN0cyhub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgfSk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
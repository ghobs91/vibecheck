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
        'reddit.com': {
            'subject': '[slot="full-post-link"]',
            'parent': 'article',
        },
        'bsky.app': {
            'subject': '[data-testid="postText"]',
            'parent': '[role="link"]',
        },
        'x.com': {
            'subject': '[data-testid="tweetText"]',
            'parent': 'article',
        },
    };

    const processSubjects = (rootNode) => {
        const matchingKey = Object.keys(websiteSelectorDict).find(key =>
            window.location.hostname.includes(key)
        );
        if (matchingKey) {
            const subjects = rootNode.querySelectorAll(websiteSelectorDict[matchingKey].subject);
            subjects.forEach(subject => {
                const text = subject.innerText.trim();
                if (text.length > 0) {
                    chrome.runtime.sendMessage({ action: 'classify', text }, (response) => {
                        if (response && Array.isArray(response)) {
                            const negativeResult = response.find(item => item.label.toLowerCase() === 'negative');
                            if (negativeResult && negativeResult.score >= 0.8) {
                                const parentToHide = subject.closest(websiteSelectorDict[matchingKey].parent);
                                if (parentToHide) {
                                    // parentToHide.style.opacity = '0.1';
                                    parentToHide.style.display = 'none';
                                }
                            }
                        }
                    });
                }
            });
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDBCQUEwQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4dGVuc2lvbi8uL3NyYy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBjb250ZW50LmpzIC0gdGhlIGNvbnRlbnQgc2NyaXB0cyB3aGljaCBpcyBydW4gaW4gdGhlIGNvbnRleHQgb2Ygd2ViIHBhZ2VzLCBhbmQgaGFzIGFjY2Vzc1xuLy8gdG8gdGhlIERPTSBhbmQgb3RoZXIgd2ViIEFQSXMuXG5cbi8vIEV4YW1wbGUgdXNhZ2U6XG4vLyBjb25zdCBtZXNzYWdlID0ge1xuLy8gICAgIGFjdGlvbjogJ2NsYXNzaWZ5Jyxcbi8vICAgICB0ZXh0OiAndGV4dCB0byBjbGFzc2lmeScsXG4vLyB9XG4vLyBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShtZXNzYWdlLCAocmVzcG9uc2UpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgdXNlciBkYXRhJywgcmVzcG9uc2UpXG4vLyB9KTtcblxuKCgpID0+IHtcbiAgICBjb25zdCB3ZWJzaXRlU2VsZWN0b3JEaWN0ID0ge1xuICAgICAgICAncmVkZGl0LmNvbSc6IHtcbiAgICAgICAgICAgICdzdWJqZWN0JzogJ1tzbG90PVwiZnVsbC1wb3N0LWxpbmtcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdhcnRpY2xlJyxcbiAgICAgICAgfSxcbiAgICAgICAgJ2Jza3kuYXBwJzoge1xuICAgICAgICAgICAgJ3N1YmplY3QnOiAnW2RhdGEtdGVzdGlkPVwicG9zdFRleHRcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdbcm9sZT1cImxpbmtcIl0nLFxuICAgICAgICB9LFxuICAgICAgICAneC5jb20nOiB7XG4gICAgICAgICAgICAnc3ViamVjdCc6ICdbZGF0YS10ZXN0aWQ9XCJ0d2VldFRleHRcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdhcnRpY2xlJyxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgcHJvY2Vzc1N1YmplY3RzID0gKHJvb3ROb2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hdGNoaW5nS2V5ID0gT2JqZWN0LmtleXMod2Vic2l0ZVNlbGVjdG9yRGljdCkuZmluZChrZXkgPT5cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5pbmNsdWRlcyhrZXkpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChtYXRjaGluZ0tleSkge1xuICAgICAgICAgICAgY29uc3Qgc3ViamVjdHMgPSByb290Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKHdlYnNpdGVTZWxlY3RvckRpY3RbbWF0Y2hpbmdLZXldLnN1YmplY3QpO1xuICAgICAgICAgICAgc3ViamVjdHMuZm9yRWFjaChzdWJqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gc3ViamVjdC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhY3Rpb246ICdjbGFzc2lmeScsIHRleHQgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgQXJyYXkuaXNBcnJheShyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZWdhdGl2ZVJlc3VsdCA9IHJlc3BvbnNlLmZpbmQoaXRlbSA9PiBpdGVtLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09ICduZWdhdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWdhdGl2ZVJlc3VsdCAmJiBuZWdhdGl2ZVJlc3VsdC5zY29yZSA+PSAwLjgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50VG9IaWRlID0gc3ViamVjdC5jbG9zZXN0KHdlYnNpdGVTZWxlY3RvckRpY3RbbWF0Y2hpbmdLZXldLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUb0hpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcmVudFRvSGlkZS5zdHlsZS5vcGFjaXR5ID0gJzAuMSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRUb0hpZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gUHJvY2VzcyBzdWJqZWN0cyB0aGF0IGFyZSBhbHJlYWR5IG9uIHRoZSBwYWdlLlxuICAgIHByb2Nlc3NTdWJqZWN0cyhkb2N1bWVudCk7XG5cbiAgICAvLyBTZXQgdXAgYSBNdXRhdGlvbk9ic2VydmVyIHRvIGhhbmRsZSBpbmZpbml0ZSBzY3JvbGxpbmcuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChtdXRhdGlvbiA9PiB7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBwcm9jZXNzIGVsZW1lbnQgbm9kZXMuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NTdWJqZWN0cyhub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgfSk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
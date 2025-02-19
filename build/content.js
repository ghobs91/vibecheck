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

    if (typeof browser === 'undefined') {
        var browser = chrome;
    }

    const processSubjects = (rootNode) => {
        const matchingKey = Object.keys(websiteSelectorDict).find(key =>
            window.location.hostname.includes(key)
        );
        if (matchingKey) {
            const subjects = rootNode.querySelectorAll(websiteSelectorDict[matchingKey].subject);
            subjects.forEach(subject => {
                const text = subject.innerText.trim();
                if (text.length > 0) {
                    browser.runtime.sendMessage({ action: 'classify', text }, (response) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCwwQkFBMEI7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsSSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leHRlbnNpb24vLi9zcmMvY29udGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiKCgpID0+IHtcbiAgICBjb25zdCB3ZWJzaXRlU2VsZWN0b3JEaWN0ID0ge1xuICAgICAgICAncmVkZGl0LmNvbSc6IHtcbiAgICAgICAgICAgICdzdWJqZWN0JzogJ1tzbG90PVwiZnVsbC1wb3N0LWxpbmtcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdhcnRpY2xlJyxcbiAgICAgICAgfSxcbiAgICAgICAgJ2Jza3kuYXBwJzoge1xuICAgICAgICAgICAgJ3N1YmplY3QnOiAnW2RhdGEtdGVzdGlkPVwicG9zdFRleHRcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdbcm9sZT1cImxpbmtcIl0nLFxuICAgICAgICB9LFxuICAgICAgICAneC5jb20nOiB7XG4gICAgICAgICAgICAnc3ViamVjdCc6ICdbZGF0YS10ZXN0aWQ9XCJ0d2VldFRleHRcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdhcnRpY2xlJyxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBicm93c2VyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgYnJvd3NlciA9IGNocm9tZTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9jZXNzU3ViamVjdHMgPSAocm9vdE5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgbWF0Y2hpbmdLZXkgPSBPYmplY3Qua2V5cyh3ZWJzaXRlU2VsZWN0b3JEaWN0KS5maW5kKGtleSA9PlxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLmluY2x1ZGVzKGtleSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hdGNoaW5nS2V5KSB7XG4gICAgICAgICAgICBjb25zdCBzdWJqZWN0cyA9IHJvb3ROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwod2Vic2l0ZVNlbGVjdG9yRGljdFttYXRjaGluZ0tleV0uc3ViamVjdCk7XG4gICAgICAgICAgICBzdWJqZWN0cy5mb3JFYWNoKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBzdWJqZWN0LmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhY3Rpb246ICdjbGFzc2lmeScsIHRleHQgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgQXJyYXkuaXNBcnJheShyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZWdhdGl2ZVJlc3VsdCA9IHJlc3BvbnNlLmZpbmQoaXRlbSA9PiBpdGVtLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09ICduZWdhdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWdhdGl2ZVJlc3VsdCAmJiBuZWdhdGl2ZVJlc3VsdC5zY29yZSA+PSAwLjgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50VG9IaWRlID0gc3ViamVjdC5jbG9zZXN0KHdlYnNpdGVTZWxlY3RvckRpY3RbbWF0Y2hpbmdLZXldLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUb0hpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcmVudFRvSGlkZS5zdHlsZS5vcGFjaXR5ID0gJzAuMSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRUb0hpZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gUHJvY2VzcyBzdWJqZWN0cyB0aGF0IGFyZSBhbHJlYWR5IG9uIHRoZSBwYWdlLlxuICAgIHByb2Nlc3NTdWJqZWN0cyhkb2N1bWVudCk7XG5cbiAgICAvLyBTZXQgdXAgYSBNdXRhdGlvbk9ic2VydmVyIHRvIGhhbmRsZSBpbmZpbml0ZSBzY3JvbGxpbmcuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChtdXRhdGlvbiA9PiB7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBwcm9jZXNzIGVsZW1lbnQgbm9kZXMuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NTdWJqZWN0cyhub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgfSk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
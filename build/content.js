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
                    // Check if extension is active
                    chrome.storage.local.get({ extensionActive: true }, (result) => {
                        if (!result.extensionActive) return;
                        browser.runtime.sendMessage({ action: 'classify', text }, (response) => {
                            if (response && Array.isArray(response)) {
                                console.log(`text classification score: ${response[0].score}`);
                                const negativeResult = response.find(item => item.label.toLowerCase() === 'negative');
                                if (negativeResult && negativeResult.score >= 0.8) {
                                    const parentToHide = subject.closest(websiteSelectorDict[matchingKey].parent);
                                    if (parentToHide) {
                                        parentToHide.style.display = 'none';
                                    }
                                }
                            }
                        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLHVCQUF1QjtBQUN0RTtBQUNBLHNEQUFzRCwwQkFBMEI7QUFDaEY7QUFDQSwwRUFBMEUsa0JBQWtCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4dGVuc2lvbi8uL3NyYy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIoKCkgPT4ge1xuICAgIGNvbnN0IHdlYnNpdGVTZWxlY3RvckRpY3QgPSB7XG4gICAgICAgICdyZWRkaXQuY29tJzoge1xuICAgICAgICAgICAgJ3N1YmplY3QnOiAnW3Nsb3Q9XCJmdWxsLXBvc3QtbGlua1wiXScsXG4gICAgICAgICAgICAncGFyZW50JzogJ2FydGljbGUnLFxuICAgICAgICB9LFxuICAgICAgICAnYnNreS5hcHAnOiB7XG4gICAgICAgICAgICAnc3ViamVjdCc6ICdbZGF0YS10ZXN0aWQ9XCJwb3N0VGV4dFwiXScsXG4gICAgICAgICAgICAncGFyZW50JzogJ1tyb2xlPVwibGlua1wiXScsXG4gICAgICAgIH0sXG4gICAgICAgICd4LmNvbSc6IHtcbiAgICAgICAgICAgICdzdWJqZWN0JzogJ1tkYXRhLXRlc3RpZD1cInR3ZWV0VGV4dFwiXScsXG4gICAgICAgICAgICAncGFyZW50JzogJ2FydGljbGUnLFxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIGJyb3dzZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBicm93c2VyID0gY2hyb21lO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2Nlc3NTdWJqZWN0cyA9IChyb290Tm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGluZ0tleSA9IE9iamVjdC5rZXlzKHdlYnNpdGVTZWxlY3RvckRpY3QpLmZpbmQoa2V5ID0+XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUuaW5jbHVkZXMoa2V5KVxuICAgICAgICApO1xuICAgICAgICBpZiAobWF0Y2hpbmdLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YmplY3RzID0gcm9vdE5vZGUucXVlcnlTZWxlY3RvckFsbCh3ZWJzaXRlU2VsZWN0b3JEaWN0W21hdGNoaW5nS2V5XS5zdWJqZWN0KTtcbiAgICAgICAgICAgIHN1YmplY3RzLmZvckVhY2goc3ViamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IHN1YmplY3QuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGV4dGVuc2lvbiBpcyBhY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHsgZXh0ZW5zaW9uQWN0aXZlOiB0cnVlIH0sIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmV4dGVuc2lvbkFjdGl2ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiAnY2xhc3NpZnknLCB0ZXh0IH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiBBcnJheS5pc0FycmF5KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgdGV4dCBjbGFzc2lmaWNhdGlvbiBzY29yZTogJHtyZXNwb25zZVswXS5zY29yZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmVnYXRpdmVSZXN1bHQgPSByZXNwb25zZS5maW5kKGl0ZW0gPT4gaXRlbS5sYWJlbC50b0xvd2VyQ2FzZSgpID09PSAnbmVnYXRpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ2F0aXZlUmVzdWx0ICYmIG5lZ2F0aXZlUmVzdWx0LnNjb3JlID49IDAuOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50VG9IaWRlID0gc3ViamVjdC5jbG9zZXN0KHdlYnNpdGVTZWxlY3RvckRpY3RbbWF0Y2hpbmdLZXldLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50VG9IaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VG9IaWRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gUHJvY2VzcyBzdWJqZWN0cyB0aGF0IGFyZSBhbHJlYWR5IG9uIHRoZSBwYWdlLlxuICAgIHByb2Nlc3NTdWJqZWN0cyhkb2N1bWVudCk7XG5cbiAgICAvLyBTZXQgdXAgYSBNdXRhdGlvbk9ic2VydmVyIHRvIGhhbmRsZSBpbmZpbml0ZSBzY3JvbGxpbmcuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChtdXRhdGlvbiA9PiB7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NTdWJqZWN0cyhub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgfSk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
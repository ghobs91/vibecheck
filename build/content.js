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
            const texts = [];
            const subjectElements = [];

            subjects.forEach(subject => {
                const text = subject.innerText.trim();
                if (text.length > 0) {
                    texts.push(text);
                    subjectElements.push(subject);
                }
            });

            if (texts.length > 0) {
                // Check if extension is active
                chrome.storage.local.get({ extensionActive: true }, (result) => {
                    if (!result.extensionActive) return;

                    // Send a single message for both sentiment analysis and topic classification
                    browser.runtime.sendMessage({ action: 'analyze-text', texts }, (response) => {
                        if (response && Array.isArray(response)) {
                            response.forEach((result, index) => {
                                const { negativeResult, matchesBlockedTopic } = result;
                                if ((negativeResult && negativeResult.score >= 0.8) || matchesBlockedTopic) {
                                    const parentToHide = subjectElements[index].closest(websiteSelectorDict[matchingKey].parent);
                                    if (parentToHide) {
                                        parentToHide.style.display = 'none';
                                    }
                                }
                            });
                        }
                    });
                });
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsMkNBQTJDLHVCQUF1QjtBQUNsRTs7QUFFQTtBQUNBLGtEQUFrRCwrQkFBK0I7QUFDakY7QUFDQTtBQUNBLHdDQUF3QyxzQ0FBc0M7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4dGVuc2lvbi8uL3NyYy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIoKCkgPT4ge1xuICAgIGNvbnN0IHdlYnNpdGVTZWxlY3RvckRpY3QgPSB7XG4gICAgICAgICdyZWRkaXQuY29tJzoge1xuICAgICAgICAgICAgJ3N1YmplY3QnOiAnW3Nsb3Q9XCJmdWxsLXBvc3QtbGlua1wiXScsXG4gICAgICAgICAgICAncGFyZW50JzogJ2FydGljbGUnLFxuICAgICAgICB9LFxuICAgICAgICAnYnNreS5hcHAnOiB7XG4gICAgICAgICAgICAnc3ViamVjdCc6ICdbZGF0YS10ZXN0aWQ9XCJwb3N0VGV4dFwiXScsXG4gICAgICAgICAgICAncGFyZW50JzogJ1tyb2xlPVwibGlua1wiXScsXG4gICAgICAgIH0sXG4gICAgICAgICd4LmNvbSc6IHtcbiAgICAgICAgICAgICdzdWJqZWN0JzogJ1tkYXRhLXRlc3RpZD1cInR3ZWV0VGV4dFwiXScsXG4gICAgICAgICAgICAncGFyZW50JzogJ2FydGljbGUnLFxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIGJyb3dzZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBicm93c2VyID0gY2hyb21lO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2Nlc3NTdWJqZWN0cyA9IChyb290Tm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGluZ0tleSA9IE9iamVjdC5rZXlzKHdlYnNpdGVTZWxlY3RvckRpY3QpLmZpbmQoa2V5ID0+XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUuaW5jbHVkZXMoa2V5KVxuICAgICAgICApO1xuICAgICAgICBpZiAobWF0Y2hpbmdLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YmplY3RzID0gcm9vdE5vZGUucXVlcnlTZWxlY3RvckFsbCh3ZWJzaXRlU2VsZWN0b3JEaWN0W21hdGNoaW5nS2V5XS5zdWJqZWN0KTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRzID0gW107XG4gICAgICAgICAgICBjb25zdCBzdWJqZWN0RWxlbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgc3ViamVjdHMuZm9yRWFjaChzdWJqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gc3ViamVjdC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dHMucHVzaCh0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdEVsZW1lbnRzLnB1c2goc3ViamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0ZXh0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZXh0ZW5zaW9uIGlzIGFjdGl2ZVxuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCh7IGV4dGVuc2lvbkFjdGl2ZTogdHJ1ZSB9LCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmV4dGVuc2lvbkFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNlbmQgYSBzaW5nbGUgbWVzc2FnZSBmb3IgYm90aCBzZW50aW1lbnQgYW5hbHlzaXMgYW5kIHRvcGljIGNsYXNzaWZpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogJ2FuYWx5emUtdGV4dCcsIHRleHRzIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIEFycmF5LmlzQXJyYXkocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZm9yRWFjaCgocmVzdWx0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG5lZ2F0aXZlUmVzdWx0LCBtYXRjaGVzQmxvY2tlZFRvcGljIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobmVnYXRpdmVSZXN1bHQgJiYgbmVnYXRpdmVSZXN1bHQuc2NvcmUgPj0gMC44KSB8fCBtYXRjaGVzQmxvY2tlZFRvcGljKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRUb0hpZGUgPSBzdWJqZWN0RWxlbWVudHNbaW5kZXhdLmNsb3Nlc3Qod2Vic2l0ZVNlbGVjdG9yRGljdFttYXRjaGluZ0tleV0ucGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUb0hpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRUb0hpZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBQcm9jZXNzIHN1YmplY3RzIHRoYXQgYXJlIGFscmVhZHkgb24gdGhlIHBhZ2UuXG4gICAgcHJvY2Vzc1N1YmplY3RzKGRvY3VtZW50KTtcblxuICAgIC8vIFNldCB1cCBhIE11dGF0aW9uT2JzZXJ2ZXIgdG8gaGFuZGxlIGluZmluaXRlIHNjcm9sbGluZy5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9ucyA9PiB7XG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKG11dGF0aW9uID0+IHtcbiAgICAgICAgICAgIG11dGF0aW9uLmFkZGVkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1N1YmplY3RzKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICB9KTtcbn0pKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
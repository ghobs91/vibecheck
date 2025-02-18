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
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDBCQUEwQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4dGVuc2lvbi8uL3NyYy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBjb250ZW50LmpzIC0gdGhlIGNvbnRlbnQgc2NyaXB0cyB3aGljaCBpcyBydW4gaW4gdGhlIGNvbnRleHQgb2Ygd2ViIHBhZ2VzLCBhbmQgaGFzIGFjY2Vzc1xuLy8gdG8gdGhlIERPTSBhbmQgb3RoZXIgd2ViIEFQSXMuXG5cbi8vIEV4YW1wbGUgdXNhZ2U6XG4vLyBjb25zdCBtZXNzYWdlID0ge1xuLy8gICAgIGFjdGlvbjogJ2NsYXNzaWZ5Jyxcbi8vICAgICB0ZXh0OiAndGV4dCB0byBjbGFzc2lmeScsXG4vLyB9XG4vLyBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShtZXNzYWdlLCAocmVzcG9uc2UpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgdXNlciBkYXRhJywgcmVzcG9uc2UpXG4vLyB9KTtcblxuKCgpID0+IHtcbiAgICBjb25zdCB3ZWJzaXRlU2VsZWN0b3JEaWN0ID0ge1xuICAgICAgICAncmVkZGl0LmNvbSc6IHtcbiAgICAgICAgICAgICdzdWJqZWN0JzogJ1tzbG90PVwiZnVsbC1wb3N0LWxpbmtcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdhcnRpY2xlJyxcbiAgICAgICAgfSxcbiAgICAgICAgJ2Jza3kuYXBwJzoge1xuICAgICAgICAgICAgJ3N1YmplY3QnOiAnW2RhdGEtdGVzdGlkPVwicG9zdFRleHRcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdbcm9sZT1cImxpbmtcIl0nLFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHByb2Nlc3NTdWJqZWN0cyA9IChyb290Tm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGluZ0tleSA9IE9iamVjdC5rZXlzKHdlYnNpdGVTZWxlY3RvckRpY3QpLmZpbmQoa2V5ID0+XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUuaW5jbHVkZXMoa2V5KVxuICAgICAgICApO1xuICAgICAgICBpZiAobWF0Y2hpbmdLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YmplY3RzID0gcm9vdE5vZGUucXVlcnlTZWxlY3RvckFsbCh3ZWJzaXRlU2VsZWN0b3JEaWN0W21hdGNoaW5nS2V5XS5zdWJqZWN0KTtcbiAgICAgICAgICAgIHN1YmplY3RzLmZvckVhY2goc3ViamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IHN1YmplY3QuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiAnY2xhc3NpZnknLCB0ZXh0IH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIEFycmF5LmlzQXJyYXkocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmVnYXRpdmVSZXN1bHQgPSByZXNwb25zZS5maW5kKGl0ZW0gPT4gaXRlbS5sYWJlbC50b0xvd2VyQ2FzZSgpID09PSAnbmVnYXRpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnYXRpdmVSZXN1bHQgJiYgbmVnYXRpdmVSZXN1bHQuc2NvcmUgPj0gMC44KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFRvSGlkZSA9IHN1YmplY3QuY2xvc2VzdCh3ZWJzaXRlU2VsZWN0b3JEaWN0W21hdGNoaW5nS2V5XS5wYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50VG9IaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJlbnRUb0hpZGUuc3R5bGUub3BhY2l0eSA9ICcwLjEnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VG9IaWRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIFByb2Nlc3Mgc3ViamVjdHMgdGhhdCBhcmUgYWxyZWFkeSBvbiB0aGUgcGFnZS5cbiAgICBwcm9jZXNzU3ViamVjdHMoZG9jdW1lbnQpO1xuXG4gICAgLy8gU2V0IHVwIGEgTXV0YXRpb25PYnNlcnZlciB0byBoYW5kbGUgaW5maW5pdGUgc2Nyb2xsaW5nLlxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zID0+IHtcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2gobXV0YXRpb24gPT4ge1xuICAgICAgICAgICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgcHJvY2VzcyBlbGVtZW50IG5vZGVzLlxuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzU3ViamVjdHMobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgIH0pO1xufSkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
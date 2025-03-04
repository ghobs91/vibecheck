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
                        browser.runtime.sendMessage({ action: 'sentiment-analysis', text }, (response) => {
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

                        // 
                        browser.runtime.sendMessage({ action: 'classify-topic', text }, (response) => {
                            if (response) {
                                console.log(`classifyTopic output recieved from content.js: ${response}`);
                            }
                        });
                        // 

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLHVCQUF1QjtBQUN0RTtBQUNBLHNEQUFzRCxvQ0FBb0M7QUFDMUY7QUFDQSwwRUFBMEUsa0JBQWtCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7O0FBRXpCO0FBQ0Esc0RBQXNELGdDQUFnQztBQUN0RjtBQUNBLDhGQUE4RixTQUFTO0FBQ3ZHO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsSSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leHRlbnNpb24vLi9zcmMvY29udGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiKCgpID0+IHtcbiAgICBjb25zdCB3ZWJzaXRlU2VsZWN0b3JEaWN0ID0ge1xuICAgICAgICAncmVkZGl0LmNvbSc6IHtcbiAgICAgICAgICAgICdzdWJqZWN0JzogJ1tzbG90PVwiZnVsbC1wb3N0LWxpbmtcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdhcnRpY2xlJyxcbiAgICAgICAgfSxcbiAgICAgICAgJ2Jza3kuYXBwJzoge1xuICAgICAgICAgICAgJ3N1YmplY3QnOiAnW2RhdGEtdGVzdGlkPVwicG9zdFRleHRcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdbcm9sZT1cImxpbmtcIl0nLFxuICAgICAgICB9LFxuICAgICAgICAneC5jb20nOiB7XG4gICAgICAgICAgICAnc3ViamVjdCc6ICdbZGF0YS10ZXN0aWQ9XCJ0d2VldFRleHRcIl0nLFxuICAgICAgICAgICAgJ3BhcmVudCc6ICdhcnRpY2xlJyxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBicm93c2VyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgYnJvd3NlciA9IGNocm9tZTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9jZXNzU3ViamVjdHMgPSAocm9vdE5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgbWF0Y2hpbmdLZXkgPSBPYmplY3Qua2V5cyh3ZWJzaXRlU2VsZWN0b3JEaWN0KS5maW5kKGtleSA9PlxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLmluY2x1ZGVzKGtleSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG1hdGNoaW5nS2V5KSB7XG4gICAgICAgICAgICBjb25zdCBzdWJqZWN0cyA9IHJvb3ROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwod2Vic2l0ZVNlbGVjdG9yRGljdFttYXRjaGluZ0tleV0uc3ViamVjdCk7XG4gICAgICAgICAgICBzdWJqZWN0cy5mb3JFYWNoKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBzdWJqZWN0LmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBleHRlbnNpb24gaXMgYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCh7IGV4dGVuc2lvbkFjdGl2ZTogdHJ1ZSB9LCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5leHRlbnNpb25BY3RpdmUpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogJ3NlbnRpbWVudC1hbmFseXNpcycsIHRleHQgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIEFycmF5LmlzQXJyYXkocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0ZXh0IGNsYXNzaWZpY2F0aW9uIHNjb3JlOiAke3Jlc3BvbnNlWzBdLnNjb3JlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZWdhdGl2ZVJlc3VsdCA9IHJlc3BvbnNlLmZpbmQoaXRlbSA9PiBpdGVtLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09ICduZWdhdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnYXRpdmVSZXN1bHQgJiYgbmVnYXRpdmVSZXN1bHQuc2NvcmUgPj0gMC44KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRUb0hpZGUgPSBzdWJqZWN0LmNsb3Nlc3Qod2Vic2l0ZVNlbGVjdG9yRGljdFttYXRjaGluZ0tleV0ucGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUb0hpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRUb0hpZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogJ2NsYXNzaWZ5LXRvcGljJywgdGV4dCB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGNsYXNzaWZ5VG9waWMgb3V0cHV0IHJlY2lldmVkIGZyb20gY29udGVudC5qczogJHtyZXNwb25zZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIFByb2Nlc3Mgc3ViamVjdHMgdGhhdCBhcmUgYWxyZWFkeSBvbiB0aGUgcGFnZS5cbiAgICBwcm9jZXNzU3ViamVjdHMoZG9jdW1lbnQpO1xuXG4gICAgLy8gU2V0IHVwIGEgTXV0YXRpb25PYnNlcnZlciB0byBoYW5kbGUgaW5maW5pdGUgc2Nyb2xsaW5nLlxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zID0+IHtcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2gobXV0YXRpb24gPT4ge1xuICAgICAgICAgICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzU3ViamVjdHMobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgIH0pO1xufSkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
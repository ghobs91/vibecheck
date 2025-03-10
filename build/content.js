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

                    // Batch sentiment analysis
                    browser.runtime.sendMessage({ action: 'sentiment-analysis', texts }, (response) => {
                        if (response && Array.isArray(response)) {
                            response.forEach((result, index) => {
                                console.log(`text classification score: ${result[0].score}`);
                                const negativeResult = result.find(item => item.label.toLowerCase() === 'negative');
                                if (negativeResult && negativeResult.score >= 0.8) {
                                    const parentToHide = subjectElements[index].closest(websiteSelectorDict[matchingKey].parent);
                                    if (parentToHide) {
                                        parentToHide.style.display = 'none';
                                    }
                                }
                            });
                        }
                    });

                    // Batch topic classification
                    browser.runtime.sendMessage({ action: 'classify-topic', texts }, (response) => {
                        if (response && Array.isArray(response)) {
                            response.forEach((result, index) => {
                                const matchesBlockedTopic = result.scores.find(score => score >= 0.8);
                                console.log(`This text matches a blocked topic: ${texts[index]}`);
                                if (matchesBlockedTopic) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsMkNBQTJDLHVCQUF1QjtBQUNsRTs7QUFFQTtBQUNBLGtEQUFrRCxxQ0FBcUM7QUFDdkY7QUFDQTtBQUNBLDBFQUEwRSxnQkFBZ0I7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0Esa0RBQWtELGlDQUFpQztBQUNuRjtBQUNBO0FBQ0E7QUFDQSxrRkFBa0YsYUFBYTtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uLy4vc3JjL2NvbnRlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIigoKSA9PiB7XG4gICAgY29uc3Qgd2Vic2l0ZVNlbGVjdG9yRGljdCA9IHtcbiAgICAgICAgJ3JlZGRpdC5jb20nOiB7XG4gICAgICAgICAgICAnc3ViamVjdCc6ICdbc2xvdD1cImZ1bGwtcG9zdC1saW5rXCJdJyxcbiAgICAgICAgICAgICdwYXJlbnQnOiAnYXJ0aWNsZScsXG4gICAgICAgIH0sXG4gICAgICAgICdic2t5LmFwcCc6IHtcbiAgICAgICAgICAgICdzdWJqZWN0JzogJ1tkYXRhLXRlc3RpZD1cInBvc3RUZXh0XCJdJyxcbiAgICAgICAgICAgICdwYXJlbnQnOiAnW3JvbGU9XCJsaW5rXCJdJyxcbiAgICAgICAgfSxcbiAgICAgICAgJ3guY29tJzoge1xuICAgICAgICAgICAgJ3N1YmplY3QnOiAnW2RhdGEtdGVzdGlkPVwidHdlZXRUZXh0XCJdJyxcbiAgICAgICAgICAgICdwYXJlbnQnOiAnYXJ0aWNsZScsXG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgYnJvd3NlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGJyb3dzZXIgPSBjaHJvbWU7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvY2Vzc1N1YmplY3RzID0gKHJvb3ROb2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hdGNoaW5nS2V5ID0gT2JqZWN0LmtleXMod2Vic2l0ZVNlbGVjdG9yRGljdCkuZmluZChrZXkgPT5cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZS5pbmNsdWRlcyhrZXkpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChtYXRjaGluZ0tleSkge1xuICAgICAgICAgICAgY29uc3Qgc3ViamVjdHMgPSByb290Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKHdlYnNpdGVTZWxlY3RvckRpY3RbbWF0Y2hpbmdLZXldLnN1YmplY3QpO1xuICAgICAgICAgICAgY29uc3QgdGV4dHMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHN1YmplY3RFbGVtZW50cyA9IFtdO1xuXG4gICAgICAgICAgICBzdWJqZWN0cy5mb3JFYWNoKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBzdWJqZWN0LmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0cy5wdXNoKHRleHQpO1xuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0RWxlbWVudHMucHVzaChzdWJqZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRleHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBleHRlbnNpb24gaXMgYWN0aXZlXG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHsgZXh0ZW5zaW9uQWN0aXZlOiB0cnVlIH0sIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuZXh0ZW5zaW9uQWN0aXZlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQmF0Y2ggc2VudGltZW50IGFuYWx5c2lzXG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogJ3NlbnRpbWVudC1hbmFseXNpcycsIHRleHRzIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIEFycmF5LmlzQXJyYXkocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZm9yRWFjaCgocmVzdWx0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgdGV4dCBjbGFzc2lmaWNhdGlvbiBzY29yZTogJHtyZXN1bHRbMF0uc2NvcmV9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5lZ2F0aXZlUmVzdWx0ID0gcmVzdWx0LmZpbmQoaXRlbSA9PiBpdGVtLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09ICduZWdhdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnYXRpdmVSZXN1bHQgJiYgbmVnYXRpdmVSZXN1bHQuc2NvcmUgPj0gMC44KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRUb0hpZGUgPSBzdWJqZWN0RWxlbWVudHNbaW5kZXhdLmNsb3Nlc3Qod2Vic2l0ZVNlbGVjdG9yRGljdFttYXRjaGluZ0tleV0ucGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUb0hpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRUb0hpZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBCYXRjaCB0b3BpYyBjbGFzc2lmaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhY3Rpb246ICdjbGFzc2lmeS10b3BpYycsIHRleHRzIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIEFycmF5LmlzQXJyYXkocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZm9yRWFjaCgocmVzdWx0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzQmxvY2tlZFRvcGljID0gcmVzdWx0LnNjb3Jlcy5maW5kKHNjb3JlID0+IHNjb3JlID49IDAuOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGlzIHRleHQgbWF0Y2hlcyBhIGJsb2NrZWQgdG9waWM6ICR7dGV4dHNbaW5kZXhdfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0Jsb2NrZWRUb3BpYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50VG9IaWRlID0gc3ViamVjdEVsZW1lbnRzW2luZGV4XS5jbG9zZXN0KHdlYnNpdGVTZWxlY3RvckRpY3RbbWF0Y2hpbmdLZXldLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50VG9IaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VG9IaWRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gUHJvY2VzcyBzdWJqZWN0cyB0aGF0IGFyZSBhbHJlYWR5IG9uIHRoZSBwYWdlLlxuICAgIHByb2Nlc3NTdWJqZWN0cyhkb2N1bWVudCk7XG5cbiAgICAvLyBTZXQgdXAgYSBNdXRhdGlvbk9ic2VydmVyIHRvIGhhbmRsZSBpbmZpbml0ZSBzY3JvbGxpbmcuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChtdXRhdGlvbiA9PiB7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NTdWJqZWN0cyhub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgfSk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
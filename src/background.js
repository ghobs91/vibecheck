// background.js - Handles requests from the UI, runs the model, then sends back a response

import { pipeline, env } from '@xenova/transformers';

// Skip initial check for local models, since we are not loading any local models.
env.allowLocalModels = false;

// Due to a bug in onnxruntime-web, we must disable multithreading for now.
// See https://github.com/microsoft/onnxruntime/issues/14445 for more information.
env.backends.onnx.wasm.numThreads = 1;


class PipelineSingleton {
    static task = 'text-classification';
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }

        return this.instance;
    }
}

// Load the initial count from storage
let negativeCount = 0;
chrome.storage.local.get(['negativeCount'], (result) => {
    if (result.negativeCount !== undefined) {
        negativeCount = result.negativeCount;
    }
});

const classify = async (text) => {
    let model = await PipelineSingleton.getInstance();
    let result = await model(text);

    // Check if the result contains negative sentiment
    const negativeResult = result.find(item => item.label.toLowerCase() === 'negative');
    if (negativeResult && negativeResult.score >= 0.8) {
        negativeCount++;
        chrome.storage.local.set({ negativeCount: negativeCount });
        chrome.runtime.sendMessage({ action: 'updateCounter', count: negativeCount });
    }

    return result;
};

////////////////////// Message Events /////////////////////
// 
// Listen for messages from the UI, process it, and send the result back.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('sender', sender)
    if (message.action !== 'classify') return; // Ignore messages that are not meant for classification.

    // Run model prediction asynchronously
    (async function () {
        // Perform classification
        let result = await classify(message.text);

        // Send response back to UI
        sendResponse(result);
    })();

    // return true to indicate we will send a response asynchronously
    // see https://stackoverflow.com/a/46628145 for more information
    return true;
});
//////////////////////////////////////////////////////////////

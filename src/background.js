// background.js - Handles requests from the UI, runs the model, then sends back a response

import { pipeline, env } from '@xenova/transformers';

// Skip initial check for local models, since we are not loading any local models.
env.allowLocalModels = false;

// Due to a bug in onnxruntime-web, we must disable multithreading for now.
// See https://github.com/microsoft/onnxruntime/issues/14445 for more information.
env.backends.onnx.wasm.numThreads = 1;


class SentimentPipelineSingleton {
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

class TopicPipelineSingleton {
    static task = 'zero-shot-classification';
    static model = 'Xenova/mobilebert-uncased-mnli';
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

const sentimentAnalysis = async (text) => {
    let model = await SentimentPipelineSingleton.getInstance();
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

const classifyTopic = async (text) => {
    const classifier = await pipeline('zero-shot-classification', 'Xenova/nli-deberta-v3-xsmall');
    
    // Retrieve the list of topics from storage
    let labels = [];
    chrome.storage.local.get(['blockedTopics'], (result) => {
        if (result.blockedTopics !== undefined) {
            labels = result.blockedTopics;
        }
    });

    const output = await classifier(text, labels, { multi_label: true });
    return output;
};

////////////////////// Message Events /////////////////////
// 
// Listen for messages from the UI, process it, and send the result back.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('sender', sender);
    if (message.action === 'sentiment-analysis') {
        // Run model prediction asynchronously
        (async function () {
            try {
                // Perform classification
                let result = await sentimentAnalysis(message.text);
                // Send response back to UI
                sendResponse(result);
            } catch (error) {
                console.error('Error during sentiment analysis:', error);
                sendResponse({ error: 'Sentiment analysis failed' });
            }
        })();
        // return true to indicate we will send a response asynchronously
        return true;
    } else if (message.action === 'classify-topic') {
        // Run model prediction asynchronously
        (async function () {
            try {
                // Perform classification
                let result = await classifyTopic(message.text);
                // Send response back to UI
                sendResponse(result);
            } catch (error) {
                console.error('Error during topic classification:', error);
                sendResponse({ error: 'Topic classification failed' });
            }
        })();
        // return true to indicate we will send a response asynchronously
        return true;
    } else {
        return false;
    }
});
//////////////////////////////////////////////////////////////

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

    return negativeResult;
};

const classifyTopic = async (text) => {
    const classifier = await TopicPipelineSingleton.getInstance();
    
    // Retrieve the list of topics from storage
    let labels = await new Promise((resolve) => {
        chrome.storage.local.get(['blockedTopics'], (result) => {
            resolve(result.blockedTopics || []);
        });
    });

    const output = await classifier(text, labels, { multi_label: true });
    const matchesBlockedTopic = output.scores.find(score => score >= 0.8);
    return matchesBlockedTopic;
};

////////////////////// Message Events /////////////////////
// 
// Listen for messages from the UI, process it, and send the result back.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'analyze-text') {
        // Run model predictions asynchronously
        (async function () {
            try {
                const results = await Promise.all(message.texts.map(async (text) => {
                    const negativeResult = await sentimentAnalysis(text);
                    const matchesBlockedTopic = await classifyTopic(text);
                    return { negativeResult, matchesBlockedTopic };
                }));
                sendResponse(results);
            } catch (error) {
                console.error('Error during text analysis:', error);
                sendResponse({ error: 'Text analysis failed' });
            }
        })();
        // return true to indicate we will send a response asynchronously
        return true;
    } else {
        return false;
    }
});
//////////////////////////////////////////////////////////////

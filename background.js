// Load TensorFlow.js and required dependencies
const joblib = require('joblib');

// Path to your saved model and vectorizer
const MODEL_PATH = 'phishing_model.pkl';
const VECTORIZER_PATH = 'vectorizer.pkl';

let model, vectorizer;

// Load the model and vectorizer
async function loadModelAndVectorizer() {
    try {
        // Load the trained logistic regression model
        model = joblib.load(MODEL_PATH);

        // Load the vectorizer used to transform email text into numerical features
        vectorizer = joblib.load(VECTORIZER_PATH);

        console.log("Model and vectorizer loaded successfully.");
    } catch (error) {
        console.error("Error loading model or vectorizer:", error);
    }
}

// Classify email or message content
async function classifyEmail(emailContent) {
    try {
        // Clean and vectorize the email text
        const emailCleaned = emailContent.toLowerCase().trim();
        const emailVectorized = vectorizer.transform([emailCleaned]);

        // Use the model to predict if the email is phishing or legitimate
        const prediction = model.predict(emailVectorized);

        // Return the prediction result
        return prediction[0] === 1 ? 'Phishing' : 'Legitimate';
    } catch (error) {
        console.error("Error classifying email:", error);
        return 'Error processing email';
    }
}

// Listen for messages from the frontend (email classification requests)
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'classifyEmail') {
        const result = await classifyEmail(request.emailContent);
        sendResponse({ result: result });
    }
});

// Check phishing websites through PhishTank API (your friend can handle this)
async function checkPhishTank(url) {
    const apiURL = `https://checkurl.phishtank.com/api/url-check/${encodeURIComponent(url)}`;

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error("API response was not OK");
        }

        const data = await response.json(); // Correctly parse the JSON response
        if (data.phish) {
            console.log("This is a phishing site.");
        } else {
            console.log("This site is safe.");
        }
    } catch (error) {
        console.error("Error fetching data from PhishTank:", error);
    }
}

// Load model and vectorizer on startup
loadModelAndVectorizer();

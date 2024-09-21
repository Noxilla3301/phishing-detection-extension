// No access to DOM in service worker, so we cannot use document.createElement

let model;
loadModel();

// Load AI model (when available)
async function loadModel() {
  try {
    // Assuming TensorFlow.js is included properly elsewhere
    model = await tf.loadLayersModel('path/to/model.json'); // Replace with actual model path
    console.log("Model loaded successfully.");
  } catch (error) {
    console.error("Error loading model:", error);
  }
}

// Example function to check phishing URLs
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

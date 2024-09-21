// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

// URL Checker using PhishTank API (Placeholder)
document.getElementById('checkURLButton').addEventListener('click', function() {
  const url = document.getElementById('urlInput').value;

  if (url) {
    // Replace this with the actual PhishTank API call
    checkURL(url);
  } else {
    document.getElementById('urlResult').textContent = 'Please enter a URL.';
  }
});

// Placeholder function for URL checking
function checkURL(url) {
  // Simulate a phishing check (you will replace this with the real PhishTank API call)
  setTimeout(() => {
    if (url.includes('phish')) {
      document.getElementById('urlResult').textContent = 'This website is likely a phishing site!';
    } else {
      document.getElementById('urlResult').textContent = 'This website appears safe.';
    }
  }, 1000);
}

// Email/Message Checker with Machine Learning (Placeholder)
document.getElementById('checkEmailButton').addEventListener('click', function() {
  const email = document.getElementById('emailInput').value;

  if (email) {
    // Call to the AI-based email/message checking function
    checkEmail(email);
  } else {
    document.getElementById('emailResult').textContent = 'Please enter an email or message.';
  }
});

// Placeholder function for email checking (you will integrate AI here)
function checkEmail(email) {
  // Simulate an AI phishing likelihood score (replace this with your ML model later)
  setTimeout(() => {
    const likelihood = Math.random(); // Random likelihood score between 0 and 1

    if (likelihood > 0.7) {
      document.getElementById('emailResult').textContent = 'This message is likely a phishing scam!';
    } else {
      document.getElementById('emailResult').textContent = 'This message appears safe.';
    }
  }, 1000);
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

// URL Checker using PhishTank API (Placeholder, handled by your friend)
document.getElementById('checkURLButton').addEventListener('click', function() {
  const url = document.getElementById('urlInput').value;

  if (url) {
      // Replace this with the actual PhishTank API call (handled by your friend)
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

// Email/Message Checker with Machine Learning (the AI part you're handling)
document.getElementById('checkEmailButton').addEventListener('click', function() {
  const email = document.getElementById('emailInput').value;

  if (email) {
      // Send email content to background.js for classification
      chrome.runtime.sendMessage({ action: 'classifyEmail', emailContent: email }, function(response) {
          if (response.result === 'Phishing') {
              document.getElementById('emailResult').textContent = 'This message is likely a phishing scam!';
          } else if (response.result === 'Legitimate') {
              document.getElementById('emailResult').textContent = 'This message appears to be legitimate.';
          } else {
              document.getElementById('emailResult').textContent = 'Error processing the message.';
          }
      });
  } else {
      document.getElementById('emailResult').textContent = 'Please enter an email or message.';
  }
});

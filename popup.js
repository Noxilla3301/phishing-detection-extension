document.addEventListener('DOMContentLoaded', function () {
  const openWebsiteButton = document.getElementById('openWebsite');

  if (openWebsiteButton) {
    openWebsiteButton.addEventListener('click', () => {
      chrome.tabs.create({ url: "https://noxilla3301.github.io/phishing-detection-extension/" });
    });
  } else {
    console.error("Button with ID 'openWebsite' not found.");
  }
});

// Placeholder for any content script functionality
// For example, you could use this script to highlight suspicious links on the page

// This script will run on all pages as specified in the manifest file
console.log('Content script loaded.');

// Example function to highlight all links on the page
function highlightLinks() {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.style.border = '2px solid red'; // Example styling for highlighting
  });
}

// You can call highlightLinks() when needed

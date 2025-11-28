// Scrolling Title
// Wait for page to fully load before starting scroll (ensures SEO sees static title)
window.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure search engines see the static title first
  setTimeout(() => {
    let titleText = document.title;
    let index = 0;

    function scrollTitle() {
      document.title = titleText.substring(index) + " " + titleText.substring(0, index);
      index = (index + 1) % titleText.length;
      setTimeout(scrollTitle, 200);
    }

    scrollTitle();
  }, 1000); // 1 second delay for SEO
});

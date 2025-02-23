// Scrolling Title
let titleText = document.title;
let index = 0;

function scrollTitle() {
  document.title = titleText.substring(index) + " " + titleText.substring(0, index);
  index = (index + 1) % titleText.length;
  setTimeout(scrollTitle, 100);
}

scrollTitle();

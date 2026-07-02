// Scrolling Title — a playful browser-tab marquee for human visitors.
//
// Search-engine crawlers (Googlebot renders JS) are skipped so they index the
// clean, static <title> instead of a scrambled mid-scroll frame. The canonical
// document.title in index.html is never permanently mangled: we scroll a local
// copy padded with a separator so the loop reads as a continuous ticker.

const SEPARATOR = "  —  ";
const STEP_MS = 200;
const BOT_PATTERN = /bot|crawl|spider|slurp|bingpreview|lighthouse|headless/i;

const isCrawler = BOT_PATTERN.test(navigator.userAgent) || navigator.webdriver === true;

if (!isCrawler) {
  const ticker = document.title + SEPARATOR;
  let index = 0;

  const scrollTitle = () => {
    document.title = ticker.substring(index) + ticker.substring(0, index);
    index = (index + 1) % ticker.length;
    setTimeout(scrollTitle, STEP_MS);
  };

  scrollTitle();
}

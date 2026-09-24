// The v-reveal directive (directives/reveal.js).
export const REVEAL = {
	className: 'is-visible',
	// a huge top margin: a jump-scroll can skip an element past the viewport, so anything above counts as seen
	rootMargin: '9999px 0px -12% 0px',
	threshold: 0.15,
}

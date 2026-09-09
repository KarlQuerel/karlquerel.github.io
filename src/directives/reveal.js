// Adds `is-visible` the first time an element scrolls into view, then stops observing.

import { prefersReducedMotion } from '../composables/usePrefersReducedMotion.js'

const REVEAL_CLASS = 'is-visible'

export const reveal = {
	mounted(el) {
		if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
			el.classList.add(REVEAL_CLASS)
			return
		}
		const observer = new IntersectionObserver(
			(entries, obs) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					entry.target.classList.add(REVEAL_CLASS)
					obs.unobserve(entry.target)
				}
			},
			// huge top margin: a jump-scroll can skip an element past the viewport, so treat anything above as seen
			{ rootMargin: '9999px 0px -12% 0px', threshold: 0.15 }
		)
		observer.observe(el)
		el._revealObserver = observer
	},
	unmounted(el) {
		el._revealObserver?.disconnect()
		delete el._revealObserver
	},
}

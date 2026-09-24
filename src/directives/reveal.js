// Adds `is-visible` the first time an element scrolls into view, then stops observing.

import { prefersReducedMotion } from '../composables/usePrefersReducedMotion.js'
import { REVEAL } from '../constants/reveal.js'

export const reveal = {
	mounted(el) {
		if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
			el.classList.add(REVEAL.className)
			return
		}
		const observer = new IntersectionObserver(
			(entries, obs) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					entry.target.classList.add(REVEAL.className)
					obs.unobserve(entry.target)
				}
			},
			{ rootMargin: REVEAL.rootMargin, threshold: REVEAL.threshold }
		)
		observer.observe(el)
		el._revealObserver = observer
	},
	unmounted(el) {
		el._revealObserver?.disconnect()
		delete el._revealObserver
	},
}

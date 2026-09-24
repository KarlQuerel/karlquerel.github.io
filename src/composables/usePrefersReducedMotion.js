// Shared, SSR-safe reduced-motion check; the query is built once since hot paths call it per frame.
let query = null

export function prefersReducedMotion() {
	if (!query) {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
		query = window.matchMedia('(prefers-reduced-motion: reduce)')
	}
	return query.matches
}

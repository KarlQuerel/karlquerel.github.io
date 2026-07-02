// Shared, SSR-safe reduced-motion check. Call it when deciding whether to
// animate, so the OS-level "reduce motion" preference is honoured in one place.
export function prefersReducedMotion() {
	return (
		typeof window !== 'undefined' &&
		typeof window.matchMedia === 'function' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	)
}

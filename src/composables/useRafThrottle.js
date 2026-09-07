import { onScopeDispose } from 'vue'

// Coalesces a high-frequency handler (scroll/resize) into at most one call per animation frame.
export function useRafThrottle(fn) {
	let rafId = 0

	const throttled = (...args) => {
		if (rafId) return
		rafId = requestAnimationFrame(() => {
			rafId = 0
			fn(...args)
		})
	}

	onScopeDispose(() => {
		if (rafId) cancelAnimationFrame(rafId)
	})

	return throttled
}

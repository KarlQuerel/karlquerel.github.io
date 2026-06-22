import { onScopeDispose } from 'vue'

// Coalesces a high-frequency handler (scroll/resize) into at most one call per
// animation frame. Returns the throttled function; the pending frame is
// cancelled automatically when the surrounding component/scope is torn down.
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

// A value that glides after its source instead of snapping to it; parks its loop once arrived.
// Two half-length stages in series: same average lag as one, but it eases out of rest as well as into it.

import { onScopeDispose, ref, watch } from 'vue'
import { approach } from '../js/math.js'
import { FIRST_FRAME_DT, MAX_FRAME_DT } from '../constants/artGrid.js'
import { SCROLL_GLIDE_S, SCROLL_REST } from '../constants/viewport.js'
import { prefersReducedMotion } from './usePrefersReducedMotion.js'

export function useGlide(source, tau = SCROLL_GLIDE_S, rest = SCROLL_REST) {
	const value = ref(source.value)
	let mid = source.value
	let rafId = 0
	let last = 0

	function stop() {
		cancelAnimationFrame(rafId)
		rafId = 0
		last = 0
	}

	// jump straight to the source: a remount or a restored scroll is not a flight
	function snap() {
		stop()
		mid = source.value
		value.value = source.value
	}

	function tick(t) {
		const dt = last ? Math.min(MAX_FRAME_DT, (t - last) / 1000) : FIRST_FRAME_DT
		last = t
		mid = approach(mid, source.value, dt, tau / 2)
		value.value = approach(value.value, mid, dt, tau / 2)
		if (Math.abs(source.value - mid) < rest && Math.abs(source.value - value.value) < rest)
			snap()
		else rafId = requestAnimationFrame(tick)
	}

	watch(source, () => {
		if (prefersReducedMotion()) snap()
		else if (!rafId) rafId = requestAnimationFrame(tick)
	})

	onScopeDispose(stop)

	return { value, snap }
}

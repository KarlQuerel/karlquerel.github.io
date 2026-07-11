import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRafThrottle } from './useRafThrottle.js'

// Reactive scroll-direction flag: `hidden` is true while the reader scrolls DOWN
// into a page, false on any upward scroll or near the top. Consumers use it to
// tuck a transient hint away mid-scroll (e.g. the nav star's "MENU" label) so it
// doesn't trail over content. `hidden` is always false within `topZone` px of the
// top; `delta` ignores sub-pixel scroll jitter.
export function useHideOnScroll({ topZone = 32, delta = 6 } = {}) {
	const hidden = ref(false)
	let lastY = 0

	function sync() {
		const y = window.scrollY
		if (y <= topZone) {
			hidden.value = false
			lastY = y
			return
		}
		if (Math.abs(y - lastY) < delta) return
		hidden.value = y > lastY
		lastY = y
	}

	const onScroll = useRafThrottle(sync)

	onMounted(() => {
		lastY = window.scrollY
		window.addEventListener('scroll', onScroll, { passive: true })
		sync()
	})

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', onScroll)
	})

	return { hidden }
}

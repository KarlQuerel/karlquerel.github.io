// Tracks the page scroll position over a tall wrapper element as a continuous
// 0 -> 1 value. The wrapper acts as a scroll "runway": as it travels through the
// viewport, progress goes 0 -> 1, driving animations like the hero crawl.
//
// Uses a viewport-relative getBoundingClientRect() measurement, so it is
// unaffected by content rendered above the wrapper.

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRafThrottle } from './useRafThrottle.js'

export function useScrollSections(wrapperRef) {
	// Continuous 0 -> 1 scroll position over the runway.
	const progress = ref(0)

	let resizeObserver = null

	function computeProgress() {
		const wrapper = wrapperRef.value
		if (!wrapper) return 0
		const rect = wrapper.getBoundingClientRect()
		const range = wrapper.offsetHeight - window.innerHeight
		if (range <= 1) return 0
		// rect.top goes from 0 (wrapper top hits viewport top) to -range (fully scrolled).
		const scrolled = -rect.top
		return Math.min(1, Math.max(0, scrolled / range))
	}

	function sync() {
		progress.value = computeProgress()
	}

	const onScroll = useRafThrottle(sync)

	onMounted(() => {
		window.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('resize', onScroll, { passive: true })
		const wrapper = wrapperRef.value
		if (wrapper && typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => onScroll())
			resizeObserver.observe(wrapper)
		}
		sync()
	})

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', onScroll)
		window.removeEventListener('resize', onScroll)
		if (resizeObserver) resizeObserver.disconnect()
	})

	return { progress }
}

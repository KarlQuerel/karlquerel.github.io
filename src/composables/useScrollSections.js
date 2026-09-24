// Tracks the page scroll position over a tall wrapper element as a continuous 0 -> 1 value.

import { ref, onActivated, onBeforeUnmount, onDeactivated, onMounted } from 'vue'
import { useRafThrottle } from './useRafThrottle.js'
import { useWindowListener } from './useWindowListener.js'

export function useScrollSections(wrapperRef) {
	// Continuous 0 -> 1 scroll position over the runway.
	const progress = ref(0)

	let resizeObserver = null
	// parked by KeepAlive the wrapper is detached, and would measure as a runway of nothing
	let parked = false

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

	const onScroll = useRafThrottle(() => {
		if (!parked) sync()
	})

	useWindowListener('scroll', onScroll)
	useWindowListener('resize', onScroll)

	onMounted(() => {
		const wrapper = wrapperRef.value
		if (wrapper && typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => onScroll())
			resizeObserver.observe(wrapper)
		}
		sync()
	})

	onActivated(() => (parked = false))
	onDeactivated(() => (parked = true))

	onBeforeUnmount(() => resizeObserver?.disconnect())

	// `sync` lets a kept-alive consumer force a re-measure: its scroll listener may have gone stale.
	return { progress, sync }
}

/***	useScrollSections		***/
// Maps the page scroll position over a tall wrapper element to a discrete
// section index. The wrapper acts as a scroll "runway": as it travels through
// the viewport, progress goes 0 -> 1 and the active section advances.
//
// Uses a viewport-relative getBoundingClientRect() measurement, so it is
// unaffected by content rendered above the wrapper.

import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollSections(wrapperRef, sectionCount) {
	const count = Math.max(1, sectionCount)

	const activeIndex = ref(0)

	let rafScroll = 0
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
		const p = computeProgress()
		const raw = Math.floor(p * count)
		const index = Math.min(count - 1, Math.max(0, raw))
		activeIndex.value = index
	}

	function onScroll() {
		if (rafScroll) return
		rafScroll = requestAnimationFrame(() => {
			rafScroll = 0
			sync()
		})
	}

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
		if (rafScroll) cancelAnimationFrame(rafScroll)
		if (resizeObserver) resizeObserver.disconnect()
	})

	return { activeIndex }
}

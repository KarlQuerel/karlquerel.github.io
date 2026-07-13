import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRafThrottle } from './useRafThrottle.js'

// Reactive "scrolled away from the top" flag: `hidden` is true whenever the page
// is scrolled more than `topZone` px down, and false only near the top — direction
// doesn't matter, so a hint tied to it (e.g. the nav star's "MENU" label) shows
// only at the top of the page, not on every upward scroll.
export function useHideOnScroll({ topZone = 32 } = {}) {
	const hidden = ref(false)

	function sync() {
		hidden.value = window.scrollY > topZone
	}

	const onScroll = useRafThrottle(sync)

	onMounted(() => {
		window.addEventListener('scroll', onScroll, { passive: true })
		sync()
	})

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', onScroll)
	})

	return { hidden }
}

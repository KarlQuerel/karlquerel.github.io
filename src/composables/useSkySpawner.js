import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion'
import { randIn } from '@/js/math'

// Occasional decorative elements crossing a sky. Exists for two failures: a hidden tab never fires
// `animationend`, so spawns pile up and arrive together; and a timer outliving the component.
// `firstGapMs` puts the first spawn on its own fuse.
export function useSkySpawner({ gapMs, firstGapMs = gapMs, make, active = () => true }) {
	const items = ref([])
	let nextId = 0
	let timer = 0

	function schedule(gap = gapMs) {
		timer = window.setTimeout(spawn, randIn(gap))
	}

	function spawn() {
		// skip while hidden or off stage, or they pile up behind a paused animation
		if (document.visibilityState === 'visible' && active()) {
			items.value.push({ id: nextId++, ...make() })
		}
		schedule()
	}

	function remove(id) {
		items.value = items.value.filter(item => item.id !== id)
	}

	function start() {
		window.clearTimeout(timer)
		if (!prefersReducedMotion()) schedule(firstGapMs)
	}

	const stop = () => window.clearTimeout(timer)

	onMounted(start)
	// a parked sky is detached, so its spawns would never end either
	onActivated(start)
	onDeactivated(stop)
	onBeforeUnmount(stop)

	return { items, remove }
}

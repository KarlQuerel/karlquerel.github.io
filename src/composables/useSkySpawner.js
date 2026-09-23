import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion'

// Occasional decorative elements crossing a sky. Exists for two failures: a hidden tab never fires
// `animationend`, so spawns pile up and arrive together; and a timer outliving the component.
export function useSkySpawner({ gapMs, make, active = () => true }) {
	const items = ref([])
	let nextId = 0
	let timer = 0

	function schedule() {
		const [lo, hi] = gapMs
		timer = window.setTimeout(spawn, lo + Math.random() * (hi - lo))
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
		if (!prefersReducedMotion()) schedule()
	}

	const stop = () => window.clearTimeout(timer)

	onMounted(start)
	// a parked sky is detached, so its spawns would never end either
	onActivated(start)
	onDeactivated(stop)
	onBeforeUnmount(stop)

	return { items, remove }
}

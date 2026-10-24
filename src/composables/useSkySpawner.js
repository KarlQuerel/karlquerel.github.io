import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion'
import { randIn } from '@/js/math'

// Occasional decorative elements crossing a sky. Exists for two failures: a hidden tab never fires
// `animationend`, so spawns pile up and arrive together; and a timer outliving the component.
// `firstGapMs` puts the first spawn on its own fuse; `spawn` lets the owner call one up off the clock,
// with a `plan` for `make`.
export function useSkySpawner({ gapMs, firstGapMs = gapMs, make, active = () => true }) {
	const items = ref([])
	let nextId = 0
	let timer = 0

	function schedule(gap = gapMs) {
		timer = window.setTimeout(tick, randIn(gap))
	}

	function spawn(plan) {
		// skip while hidden or off stage, or they pile up behind a paused animation
		if (prefersReducedMotion() || document.visibilityState !== 'visible' || !active()) return
		items.value.push({ id: nextId++, ...make(plan) })
	}

	function tick() {
		spawn()
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

	return { items, remove, spawn }
}

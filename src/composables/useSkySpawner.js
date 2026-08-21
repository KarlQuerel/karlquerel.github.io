import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion'

// Occasional short-lived decorative elements crossing a sky — a meteor, a flock.
// Each is spawned after a random gap, carries its own CSS custom properties, and
// removes itself when its animation ends.
//
// The spawning is the boring part. What this exists for is the two things that go
// wrong without it, both already learned the hard way in SpaceBackground.vue: a
// hidden tab never fires `animationend`, so anything spawned while it is hidden piles
// up forever and all arrives at once on return; and a timer that outlives the
// component keeps pushing into a ref nobody is rendering.
//
// `gapMs` is a [min, max] range and `make` is called per spawn — it returns whatever
// that item needs, spread onto it, so one crossing can be a single streak and another
// a whole formation.
export function useSkySpawner({ gapMs, make }) {
	const items = ref([])
	let nextId = 0
	let timer = 0

	function schedule() {
		const [lo, hi] = gapMs
		timer = window.setTimeout(spawn, lo + Math.random() * (hi - lo))
	}

	function spawn() {
		// skip while hidden, or they pile up behind a paused animation
		if (document.visibilityState === 'visible') {
			items.value.push({ id: nextId++, ...make() })
		}
		schedule()
	}

	function remove(id) {
		items.value = items.value.filter(item => item.id !== id)
	}

	onMounted(() => {
		if (prefersReducedMotion()) return
		schedule()
	})

	onBeforeUnmount(() => window.clearTimeout(timer))

	return { items, remove }
}

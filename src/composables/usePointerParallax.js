import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion'
import { FINE_POINTER_QUERY, POINTER_EASE } from '@/constants/viewport'

// Mouse parallax, the one contract every scene layer shares: axes normalised to
// -1..1 and negated, published as --mx/--my on a container, and each layer inside it
// multiplies them by its own --depth. Layers ride the CSS `translate` property with
// it, which keeps the lean off `transform` — that belongs to the scroll-scrubbed
// motion. Nearer layers take a bigger depth; the parallax between them is the relief.
//
// Touch devices have no cursor and their drag-scrolls fire pointermove, so they skip
// it entirely, as does reduced motion: the style then stays at a resting 0.
export function usePointerParallax() {
	const pointer = ref({ x: 0, y: 0 })

	const parallaxStyle = computed(() => ({
		'--mx': pointer.value.x,
		'--my': pointer.value.y,
	}))

	// The cursor sets where the lean is headed; a frame loop closes the distance, so the
	// layers drift into place instead of snapping. It runs only while there is distance
	// left to close and stops itself the moment there is not.
	const target = { x: 0, y: 0 }
	let frame = 0

	function settle() {
		const dx = target.x - pointer.value.x
		const dy = target.y - pointer.value.y
		if (Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005) {
			pointer.value = { ...target }
			frame = 0
			return
		}
		pointer.value = {
			x: pointer.value.x + dx * POINTER_EASE,
			y: pointer.value.y + dy * POINTER_EASE,
		}
		frame = requestAnimationFrame(settle)
	}

	function onPointerMove(event) {
		target.x = -((event.clientX / window.innerWidth - 0.5) * 2)
		target.y = -((event.clientY / window.innerHeight - 0.5) * 2)
		if (!frame) frame = requestAnimationFrame(settle)
	}

	onMounted(() => {
		if (prefersReducedMotion() || !window.matchMedia(FINE_POINTER_QUERY).matches) return
		window.addEventListener('pointermove', onPointerMove, { passive: true })
	})

	onBeforeUnmount(() => {
		window.removeEventListener('pointermove', onPointerMove)
		if (frame) cancelAnimationFrame(frame)
	})

	return { parallaxStyle }
}

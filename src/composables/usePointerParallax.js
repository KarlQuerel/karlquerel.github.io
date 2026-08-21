import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion'
import { useRafThrottle } from './useRafThrottle'
import { FINE_POINTER_QUERY } from '@/constants/viewport'

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

	const onPointerMove = useRafThrottle(event => {
		pointer.value = {
			x: -((event.clientX / window.innerWidth - 0.5) * 2),
			y: -((event.clientY / window.innerHeight - 0.5) * 2),
		}
	})

	onMounted(() => {
		if (prefersReducedMotion() || !window.matchMedia(FINE_POINTER_QUERY).matches) return
		window.addEventListener('pointermove', onPointerMove, { passive: true })
	})

	onBeforeUnmount(() => window.removeEventListener('pointermove', onPointerMove))

	return { parallaxStyle }
}

import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion'
import { useWindowListener } from './useWindowListener'
import { FINE_POINTER_QUERY, POINTER_EASE } from '@/constants/viewport'

// The cursor as a lean, -1..1 on each axis and negated so layers drift against it.
export const leanOf = event => ({
	x: -((event.clientX / window.innerWidth - 0.5) * 2),
	y: -((event.clientY / window.innerHeight - 0.5) * 2),
})

// Mouse parallax, the contract every scene layer shares: --mx/--my on a container, each layer
// multiplying them by its own --depth.
export function usePointerParallax() {
	const pointer = ref({ x: 0, y: 0 })

	const parallaxStyle = computed(() => ({
		'--mx': pointer.value.x,
		'--my': pointer.value.y,
	}))

	// The cursor sets where the lean is headed; a frame loop closes the distance so layers drift in.
	let target = { x: 0, y: 0 }
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
		target = leanOf(event)
		if (!frame) frame = requestAnimationFrame(settle)
	}

	function stop() {
		cancelAnimationFrame(frame)
		frame = 0
	}

	if (!prefersReducedMotion() && window.matchMedia(FINE_POINTER_QUERY).matches) {
		useWindowListener('pointermove', onPointerMove)
	}
	// a kept-alive page parked off-route must not chase the cursor
	onDeactivated(stop)
	onBeforeUnmount(stop)

	return { parallaxStyle, pointer }
}

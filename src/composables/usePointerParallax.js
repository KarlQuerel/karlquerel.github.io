import { onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion'
import { useWindowListener } from './useWindowListener'
import { FINE_POINTER_QUERY, LEAN_LAYER, POINTER_EASE } from '@/constants/viewport'

// The cursor as a lean, -1..1 on each axis and negated so layers drift against it.
export const leanOf = event => ({
	x: -((event.clientX / window.innerWidth - 0.5) * 2),
	y: -((event.clientY / window.innerHeight - 0.5) * 2),
})

// Mouse parallax, the contract every scene layer shares: each [data-lean] layer under the container
// takes --mx/--my and multiplies them by its own --depth (_layout.scss).
export function usePointerParallax(containerRef) {
	const pointer = ref({ x: 0, y: 0 })

	function lean(layers) {
		const { x, y } = pointer.value
		for (const layer of layers) {
			layer.style.setProperty('--mx', x)
			layer.style.setProperty('--my', y)
		}
	}

	// The cursor sets where the lean is headed; a frame loop closes the distance so layers drift in.
	let target = { x: 0, y: 0 }
	let frame = 0

	function settle() {
		const dx = target.x - pointer.value.x
		const dy = target.y - pointer.value.y
		if (Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005) {
			pointer.value = { ...target }
			frame = 0
		} else {
			pointer.value = {
				x: pointer.value.x + dx * POINTER_EASE,
				y: pointer.value.y + dy * POINTER_EASE,
			}
			frame = requestAnimationFrame(settle)
		}
		lean(containerRef.value?.querySelectorAll(LEAN_LAYER) ?? [])
	}

	function onPointerMove(event) {
		target = leanOf(event)
		if (!frame) frame = requestAnimationFrame(settle)
	}

	// a layer mounted after the cursor moved (a v-if) takes the lean at once, as if it had inherited it
	function onAdded(records) {
		const layers = records.flatMap(record =>
			[...record.addedNodes]
				.filter(node => node instanceof Element)
				.flatMap(node => [
					...(node.matches(LEAN_LAYER) ? [node] : []),
					...node.querySelectorAll(LEAN_LAYER),
				])
		)
		if (layers.length) lean(layers)
	}

	function stop() {
		cancelAnimationFrame(frame)
		frame = 0
	}

	if (!prefersReducedMotion() && window.matchMedia(FINE_POINTER_QUERY).matches) {
		useWindowListener('pointermove', onPointerMove)
		const added = new MutationObserver(onAdded)
		onMounted(() => added.observe(containerRef.value, { childList: true, subtree: true }))
		onBeforeUnmount(() => added.disconnect())
	}
	// a kept-alive page parked off-route must not chase the cursor
	onDeactivated(stop)
	onBeforeUnmount(stop)

	return { pointer }
}

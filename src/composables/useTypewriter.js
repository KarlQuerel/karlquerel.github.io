import { onBeforeUnmount, ref } from 'vue'
import { prefersReducedMotion } from './usePrefersReducedMotion.js'

// Characters shown of a line typed in one per `charMs` after `delayMs`; reduced motion shows it whole.
export function useTypewriter({ delayMs, charMs }) {
	const shown = ref(0)
	let frame = 0
	let from = 0
	let total = 0

	function tick(now) {
		if (!from) from = now
		const next = Math.min(total, Math.floor((now - from - delayMs) / charMs))
		if (next > shown.value) shown.value = next
		if (shown.value < total) frame = requestAnimationFrame(tick)
	}

	function start(length) {
		stop()
		total = length
		shown.value = 0
		from = 0
		if (prefersReducedMotion()) shown.value = total
		else frame = requestAnimationFrame(tick)
	}

	function stop() {
		if (frame) cancelAnimationFrame(frame)
		frame = 0
	}

	onBeforeUnmount(stop)
	return { shown, start, stop }
}

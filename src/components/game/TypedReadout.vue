<template>
	<!-- The line under the name, typed in one character per step. -->
	<p class="readout">
		<span class="sr-only">{{ lead }} {{ accent }}</span>
		<span aria-hidden="true">
			<!-- the space lives between the boxes, explicit so the compiler keeps it: a wrapped line then
			     centres on its own text -->
			<span class="readout__part">{{ lead.slice(0, shown) }}</span
			>{{ ' '
			}}<span class="readout__part readout__accent">{{
				accent.slice(0, Math.max(0, shown - lead.length))
			}}</span>
		</span>
	</p>
</template>

<script setup>
	import { onBeforeUnmount, ref, watch } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { GAME_HOLDING } from '@/constants/game'

	const props = defineProps({
		// typing begins when this turns true
		start: { type: Boolean, default: false },
	})

	const { lead, accent, delayMs, charMs } = GAME_HOLDING.readout
	const total = lead.length + accent.length
	const shown = ref(0)
	let started = false
	let frame = 0
	let from = 0

	function tick(now) {
		if (!from) from = now
		const next = Math.min(total, Math.floor((now - from - delayMs) / charMs))
		if (next > shown.value) shown.value = next
		if (shown.value < total) frame = requestAnimationFrame(tick)
	}

	watch(
		() => props.start,
		on => {
			if (!on || started) return
			started = true
			if (prefersReducedMotion()) shown.value = total
			else frame = requestAnimationFrame(tick)
		},
		{ immediate: true }
	)
	onBeforeUnmount(() => {
		if (frame) cancelAnimationFrame(frame)
	})
</script>

<style scoped lang="scss">
	// The terminal's voice, a size up from prose: grey caps with the last word yellow.
	.readout {
		margin: 1.5rem 0 0;
		min-height: 1.5em;
		font-family: $font-terminal;
		font-size: $type-prose;
		line-height: 1.5;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: $light-gray;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}

	// a narrow frame wraps between the two halves, never inside one
	.readout__part {
		display: inline-block;
		white-space: nowrap;
	}

	.readout__accent {
		color: $yellow;
		text-shadow: 0 0 12px rgba($yellow, 0.45);
	}
</style>

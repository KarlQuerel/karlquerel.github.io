<template>
	<!-- The line under the name, typed in one character per step, or set whole. -->
	<p class="readout" :class="{ 'readout--pixel': pixel }">
		<span class="sr-only">{{ line.lead }} {{ line.accent }}</span>
		<span aria-hidden="true">
			<!-- the space lives between the boxes, explicit so the compiler keeps it: a wrapped line then
			     centres on its own text -->
			<span class="readout__part">{{ line.lead.slice(0, count) }}</span
			>{{ ' '
			}}<span class="readout__part readout__accent">{{
				line.accent.slice(0, Math.max(0, count - line.lead.length))
			}}</span>
		</span>
	</p>
</template>

<script setup>
	import { computed, watch } from 'vue'
	import { useTypewriter } from '@/composables/useTypewriter'

	const props = defineProps({
		// { lead, accent, delayMs, charMs }: the accent is the highlighted tail
		line: { type: Object, required: true },
		// typing begins when this turns true
		start: { type: Boolean, default: false },
		// set in the pixel face, to sit with a pixel-art title
		pixel: { type: Boolean, default: false },
		// false sets the line whole, for a page that brings it in some other way
		typed: { type: Boolean, default: true },
	})

	const { lead, accent, delayMs, charMs } = props.line
	const { shown, start: type } = useTypewriter({ delayMs, charMs })
	const count = computed(() => (props.typed ? shown.value : lead.length + accent.length))
	let started = false

	watch(
		() => props.start,
		on => {
			if (!on || started) return
			started = true
			type(lead.length + accent.length)
		},
		{ immediate: true }
	)
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

	// Press Start 2P on its own grid, tracked two glyph pixels, no soft glow
	.readout--pixel {
		font-family: $font-pixel;
		font-size: $type-title;
		letter-spacing: 2 * $font-pixel-unit;
		text-shadow: none;

		.readout__accent {
			text-shadow: none;
		}
	}

	// a size up on the face's own grid where the frame is wide enough to carry it
	@media (min-width: $breakpoint-desktop) {
		.readout--pixel {
			font-size: px8(3);
		}
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

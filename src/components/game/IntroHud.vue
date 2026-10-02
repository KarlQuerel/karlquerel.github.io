<template>
	<!-- The visor: a helmet's glass over the picture, readouts in the corners, alarms in red, an
	     alert across the upper middle. Dim on purpose: the picture stays the subject. -->
	<div class="hud" :class="{ 'hud--hot': hot }" aria-hidden="true">
		<div class="hud__visor" />
		<ul class="hud__readouts">
			<li
				v-for="(line, i) in readouts"
				:key="line"
				class="hud__line"
				:class="{ 'hud__line--ship': i === 0, 'hud__line--off': i > lit }"
			>
				{{ i === lit && boot < 1 ? garbled(line) : line }}
			</li>
		</ul>
		<ul v-if="alarms.length" class="hud__alarms">
			<li v-for="line in alarms" :key="line" class="hud__alarm">{{ line }}</li>
		</ul>
		<p v-if="alert" class="hud__alert">{{ alert }}</p>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, ref, watch } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { HUD } from '@/constants/intro/hud'
	import { hash1 } from '@/js/pixelNoise'

	const props = defineProps({
		// top-left, the ship's name first
		readouts: { type: Array, default: () => [] },
		// top-right, in red
		alarms: { type: Array, default: () => [] },
		// '' for none: a band across the upper middle
		alert: { type: String, default: '' },
		// how far the visor has booted, 0..1: the readouts come up one by one below 1
		boot: { type: Number, default: 1 },
		// the alarms saturate: the crash
		hot: { type: Boolean, default: false },
	})

	// which line is being written: everything above it is steady, everything below it is off
	const lit = computed(() =>
		props.boot >= 1
			? props.readouts.length
			: Math.floor(props.boot * (props.readouts.length + 1))
	)

	// The garble runs on its own stepped clock, never a fade: one new scramble per step.
	const step = ref(0)
	let frame = 0
	function tick(now) {
		const next = Math.floor(now / HUD.garbleMs)
		if (next !== step.value) step.value = next
		frame = requestAnimationFrame(tick)
	}
	function stop() {
		cancelAnimationFrame(frame)
		frame = 0
	}
	watch(
		() => props.boot < 1 && !prefersReducedMotion(),
		booting => {
			if (booting && !frame) frame = requestAnimationFrame(tick)
			if (!booting) stop()
		},
		{ immediate: true }
	)
	onBeforeUnmount(stop)

	// this step's scramble of a line: a share of its characters swapped for glyphs, spaces kept
	function garbled(line) {
		return [...line]
			.map((c, i) =>
				c !== ' ' && hash1(i * 31 + step.value, 7) < HUD.garbleShare
					? HUD.glyphs[Math.floor(hash1(i + step.value * 17, 3) * HUD.glyphs.length)]
					: c
			)
			.join('')
	}
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;
	@use '@/styles/mixins' as *;

	.hud {
		position: fixed;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		font-family: $font-terminal;
		text-align: left;
	}

	// The glass: dark rounded corners where the helmet's frame closes in, two curved reflections
	// off the light, and a faint scan every few pixels. All gradients, no image.
	.hud__visor {
		position: absolute;
		inset: -8vh -5vw;
		border-radius: 42% 42% 46% 46% / 34% 34% 40% 40%;
		box-shadow:
			inset 0 0 8vh 1.5vh rgba($black, 0.75),
			inset 0 0 0 0.8vh rgba($black, 0.9);
		background:
			radial-gradient(ellipse 34% 18% at 22% 12%, rgba($white, 0.05), transparent 70%),
			radial-gradient(ellipse 40% 14% at 74% 90%, rgba($white, 0.035), transparent 70%),
			repeating-linear-gradient(180deg, rgba($black, 0.06) 0 1px, transparent 1px 5px);
	}

	.hud__readouts,
	.hud__alarms {
		position: absolute;
		top: $chrome-clearance;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: $type-prose-sm;
		line-height: 2;
		letter-spacing: 1px;
		@include pixel-keyline(1px, 4px);
	}

	.hud__readouts {
		left: 5vw;
		color: $flyby-dim;
	}

	.hud__line--ship {
		font-size: $type-prose;
		line-height: 1.6;
		color: $flyby-ink;
	}

	.hud__line--off {
		visibility: hidden;
	}

	.hud__alarms {
		right: 5vw;
		text-align: right;
		color: $light-red;
		// a stepped pulse, two frames, the way an 8-bit warning blinks
		animation: hud-pulse 1s steps(2, end) infinite;
	}

	.hud--hot .hud__alarms {
		color: $white;
		animation-duration: 0.3s;
	}

	.hud--hot .hud__visor {
		box-shadow:
			inset 0 0 8vh 1.5vh rgba($light-red, 0.5),
			inset 0 0 0 0.8vh rgba($black, 0.9);
	}

	// the alert: a band across the upper middle, ember on a dark strip, blinking on steps
	.hud__alert {
		position: absolute;
		top: 22vh;
		left: 50%;
		margin: 0;
		padding: 0.35rem 1.2rem;
		transform: translateX(-50%);
		font-size: $type-prose;
		letter-spacing: 3px;
		white-space: nowrap;
		color: $flyby-hot;
		@include void-panel(rgba($black, 0.55));
		@include pixel-keyline(1px, 4px);
		animation: hud-blink 0.8s steps(2, end) infinite;
	}

	@keyframes hud-pulse {
		50% {
			opacity: 0.45;
		}
	}

	@keyframes hud-blink {
		50% {
			opacity: 0.2;
		}
	}

	@media (max-width: #{$breakpoint-mobile}) {
		// a tall frame: the glass bows wider than the screen, so only the corners darken
		.hud__visor {
			inset: -6vh -22vw;
			border-radius: 50% / 24%;
		}
		.hud__readouts,
		.hud__alarms {
			top: $chrome-clearance-mobile;
		}
		.hud__alarms {
			right: 3vw;
		}
		.hud__readouts {
			left: 3vw;
		}
		.hud__alert {
			font-size: $type-prose-sm;
			letter-spacing: 2px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hud__alarms,
		.hud__alert {
			animation: none;
		}
	}
</style>

<template>
	<!-- POV from inside the cryo pod, looking up through the glass just before
	     the lid (HeroIntro's aperture mask, run in reverse) seals over you. -->
	<div class="pod" :style="podStyle" aria-hidden="true">
		<div class="pod__glow" />
		<div class="pod__rim" />
		<p class="pod__caption">{{ HERO_WAKE.cryoEngage }}</p>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { HERO_WAKE } from '../data/heroLines.js'

	const props = defineProps({
		// 0 → lying down, 1 → lid sealed (the mask above does the actual closing).
		t: { type: Number, default: 0 },
	})

	const podStyle = computed(() => ({
		opacity: Math.min(1, props.t / 0.15),
	}))
</script>

<style scoped lang="scss">
	.pod {
		position: absolute;
		inset: 0;
		z-index: 2;
		overflow: hidden;
		pointer-events: none;
	}

	// cold pod light overhead
	.pod__glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse at 50% 18%,
			rgba($light-blue, 0.2) 0%,
			rgba($light-blue, 0.05) 40%,
			transparent 70%
		);
	}

	// the pod opening's glass rim, curving past the viewport corners
	.pod__rim {
		position: absolute;
		inset: 5% -18%;
		border: 2px solid rgba($light-blue, 0.18);
		border-radius: 50%;
	}

	.pod__caption {
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translateX(-50%);
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 1.8vw, 0.9rem);
		letter-spacing: 0.2em;
		color: $light-blue;
		text-shadow: 0 0 14px rgba($light-blue, 0.45);
		white-space: nowrap;
		animation: podCaptionPulse 1.4s steps(2, end) infinite;
	}

	@keyframes podCaptionPulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.55;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pod__caption {
			animation: none;
		}
	}
</style>

<template>
	<!-- Time-driven cut-scene: the jump from the homepage HUD ends here — warp,
	     drop-out over the planet, impact flash, cut to black, then `done`. -->
	<div class="crash" :class="{ 'crash--shaking': shaking }">
		<HyperspaceWarp :intensity="warpIntensity" />
		<PixelPlanet :reveal="planetReveal" />

		<p v-if="caption" class="crash__caption" aria-hidden="true">{{ caption }}</p>

		<div class="crash__flash" :style="{ opacity: flashOpacity }" aria-hidden="true" />
		<div class="crash__black" :style="{ opacity: blackOpacity }" aria-hidden="true" />

		<button class="crash__skip" type="button" @click="finish">{{ CRASH_INTRO.skip }}</button>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { CRASH_INTRO } from '@/constants/game'
	import HyperspaceWarp from '../HyperspaceWarp.vue'
	import PixelPlanet from '../PixelPlanet.vue'

	const emit = defineEmits(['done'])

	// seconds since mount; every visual below derives from this one clock
	const t = ref(0)
	let rafId = 0
	let startTs = 0
	let finished = false

	const clamp01 = v => Math.min(1, Math.max(0, v))

	const warpIntensity = computed(
		() =>
			clamp01(t.value / CRASH_INTRO.warpRamp) *
			(1 -
				clamp01(
					(t.value - CRASH_INTRO.warpHold) / (CRASH_INTRO.arrival - CRASH_INTRO.warpHold)
				))
	)
	const planetReveal = computed(() =>
		clamp01((t.value - CRASH_INTRO.warpHold) / (CRASH_INTRO.arrival - CRASH_INTRO.warpHold))
	)
	const flashOpacity = computed(() =>
		clamp01((t.value - CRASH_INTRO.arrival) / (CRASH_INTRO.impact - CRASH_INTRO.arrival))
	)
	const blackOpacity = computed(() =>
		clamp01((t.value - CRASH_INTRO.impact) / (CRASH_INTRO.blackout - CRASH_INTRO.impact))
	)
	const shaking = computed(() => t.value >= CRASH_INTRO.impact - CRASH_INTRO.shakeLead)
	// last caption whose cue has passed
	const caption = computed(() => {
		let text = ''
		for (const cue of CRASH_INTRO.captions) {
			if (t.value >= cue.at) text = cue.text
		}
		return text
	})

	function finish() {
		if (finished) return
		finished = true
		if (rafId) cancelAnimationFrame(rafId)
		rafId = 0
		emit('done')
	}

	function frame(ts) {
		if (!startTs) startTs = ts
		t.value = (ts - startTs) / 1000
		if (t.value >= CRASH_INTRO.blackout) {
			finish()
			return
		}
		rafId = requestAnimationFrame(frame)
	}

	onMounted(() => {
		rafId = requestAnimationFrame(frame)
	})

	onBeforeUnmount(() => {
		if (rafId) cancelAnimationFrame(rafId)
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.crash {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: $black;
	}

	.crash--shaking {
		animation: crashShake 0.12s steps(2, end) infinite;
	}

	.crash__caption {
		position: absolute;
		top: 14%;
		left: 50%;
		z-index: 3;
		transform: translateX(-50%);
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 1.8vw, 0.9rem);
		letter-spacing: 0.16em;
		color: $light-blue;
		text-shadow: 0 0 14px rgba($light-blue, 0.5);
		white-space: nowrap;
	}

	// impact white-out, same recipe as the old hero flash
	.crash__flash {
		position: absolute;
		inset: 0;
		z-index: 3;
		pointer-events: none;
		background: radial-gradient(circle at 50% 50%, $white 0%, $white 45%, $light-blue 115%);
	}

	.crash__black {
		position: absolute;
		inset: 0;
		z-index: 4;
		pointer-events: none;
		background: $black;
	}

	.crash__skip {
		position: absolute;
		right: 1.5rem;
		bottom: 1.5rem;
		z-index: 5;
		padding: 0.7rem 1.1rem;
		font-family: $font-pixel;
		font-size: 0.6rem;
		letter-spacing: 0.12em;
		// last: the mixin emits nested states, so trailing declarations would warn
		@include void-button($lift: -2px);
	}

	@keyframes crashShake {
		0%,
		100% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(-6px, 4px);
		}
		50% {
			transform: translate(5px, -5px);
		}
		75% {
			transform: translate(-4px, -3px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.crash--shaking {
			animation: none;
		}
	}
</style>

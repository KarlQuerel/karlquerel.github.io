<template>
	<!-- Silent launch beat: the ship pulls away while a dying Earth shrinks below. -->
	<div class="launch" :style="launchStyle" aria-hidden="true">
		<div class="launch__earth">
			<PixelPlanet :reveal="earthReveal" :palette="EARTH_PALETTE" />
		</div>
		<div class="launch__ship" :style="shipStyle">
			<span class="launch__hull" />
			<span class="launch__flame" />
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { EARTH_PALETTE } from '@/constants/planet'
	import PixelPlanet from './PixelPlanet.vue'

	const props = defineProps({
		// 0 → beat begins (in orbit), 1 → beat over (Earth left behind).
		t: { type: Number, default: 0 },
	})

	const clamp01 = v => Math.min(1, Math.max(0, v))

	// fade the whole beat in and out at its edges
	const launchStyle = computed(() => ({
		opacity: Math.min(clamp01(props.t / 0.12), clamp01((1 - props.t) / 0.12)),
	}))
	// Earth recedes from full disc to a distant globe — never a dot, it should
	// stay recognisable for the whole beat.
	const earthReveal = computed(() => 1 - 0.72 * props.t)
	const shipStyle = computed(() => ({
		'--ship-rise': `${(24 - 52 * props.t).toFixed(1)}vh`,
		'--ship-scale': (1 - 0.3 * props.t).toFixed(3),
	}))
</script>

<style scoped lang="scss">
	.launch {
		position: absolute;
		inset: 0;
		z-index: 2;
		overflow: hidden;
		pointer-events: none;
	}

	// Earth sits low so the ship has sky to climb into.
	.launch__earth {
		position: absolute;
		inset: 0;
		transform: translateY(32vh);
	}

	// climb + slight shrink as the ship pulls away, both scroll-driven
	.launch__ship {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, calc(-50% + var(--ship-rise, 0vh))) scale(var(--ship-scale, 1));
	}

	// pixel-art rocket: one base pixel per element, box-shadow copies fan out the
	// sprite (same technique as the hero hint arrow) — no image asset needed
	$px: 5px;

	.launch__hull {
		display: block;
		width: $px;
		height: $px;
		background: $light-red; // base pixel = the nose tip
		box-shadow:
			// upper hull
			#{-$px} #{$px} $light-gray,
			0 #{$px} $light-gray,
			#{$px} #{$px} $light-gray,
			#{-$px} #{$px * 2} $light-gray,
			0 #{$px * 2} $light-gray,
			#{$px} #{$px * 2} $light-gray,
			#{-$px * 2} #{$px * 3} $light-gray,
			#{-$px} #{$px * 3} $light-gray,
			0 #{$px * 3} $light-gray,
			#{$px} #{$px * 3} $light-gray,
			#{$px * 2} #{$px * 3} $light-gray,
			// window row
			#{-$px * 2} #{$px * 4} $light-gray,
			#{-$px} #{$px * 4} $light-blue,
			0 #{$px * 4} $light-blue,
			#{$px} #{$px * 4} $light-blue,
			#{$px * 2} #{$px * 4} $light-gray,
			// lower hull
			#{-$px * 2} #{$px * 5} $light-gray,
			#{-$px} #{$px * 5} $light-gray,
			0 #{$px * 5} $light-gray,
			#{$px} #{$px * 5} $light-gray,
			#{$px * 2} #{$px * 5} $light-gray,
			#{-$px * 2} #{$px * 6} $light-gray,
			#{-$px} #{$px * 6} $light-gray,
			0 #{$px * 6} $light-gray,
			#{$px} #{$px * 6} $light-gray,
			#{$px * 2} #{$px * 6} $light-gray,
			#{-$px * 3} #{$px * 7} $light-gray,
			#{-$px * 2} #{$px * 7} $light-gray,
			#{-$px} #{$px * 7} $light-gray,
			0 #{$px * 7} $light-gray,
			#{$px} #{$px * 7} $light-gray,
			#{$px * 2} #{$px * 7} $light-gray,
			#{$px * 3} #{$px * 7} $light-gray,
			// skirt + fins
			#{-$px * 4} #{$px * 8} $light-red,
			#{-$px * 3} #{$px * 8} $light-gray,
			#{-$px * 2} #{$px * 8} $light-gray,
			#{-$px} #{$px * 8} $light-gray,
			0 #{$px * 8} $light-gray,
			#{$px} #{$px * 8} $light-gray,
			#{$px * 2} #{$px * 8} $light-gray,
			#{$px * 3} #{$px * 8} $light-gray,
			#{$px * 4} #{$px * 8} $light-red,
			#{-$px * 4} #{$px * 9} $light-red,
			#{-$px * 3} #{$px * 9} $light-red,
			#{-$px * 2} #{$px * 9} $light-gray,
			#{-$px} #{$px * 9} $light-gray,
			0 #{$px * 9} $light-gray,
			#{$px} #{$px * 9} $light-gray,
			#{$px * 2} #{$px * 9} $light-gray,
			#{$px * 3} #{$px * 9} $light-red,
			#{$px * 4} #{$px * 9} $light-red;
	}

	// exhaust: flickers in chunky steps beneath the skirt
	.launch__flame {
		position: absolute;
		top: $px * 10;
		left: 0;
		width: $px;
		height: $px;
		background: $yellow;
		box-shadow:
			#{-$px} 0 $yellow,
			#{$px} 0 $yellow,
			0 #{$px} $light-red;
		animation: launchFlameFlicker 0.24s steps(2, end) infinite;
	}

	@keyframes launchFlameFlicker {
		0%,
		100% {
			transform: scaleY(1);
			opacity: 1;
		}
		50% {
			transform: scaleY(0.6);
			opacity: 0.75;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.launch__flame {
			animation: none;
		}
	}
</style>

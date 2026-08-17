<template>
	<!-- Silent launch beat: the ship pulls away while a dying Earth shrinks below. -->
	<div class="launch" :style="launchStyle" aria-hidden="true">
		<div class="launch__earth">
			<PixelPlanet :reveal="earthReveal" :palette="EARTH_PALETTE" />
		</div>
		<div class="launch__ship" :style="shipStyle">
			<PixelShip />
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { EARTH_PALETTE } from '@/constants/planet'
	import { clamp01 } from '@/js/math'
	import PixelPlanet from './PixelPlanet.vue'
	import PixelShip from './PixelShip.vue'

	const props = defineProps({
		// 0 → beat begins (in orbit), 1 → beat over (Earth left behind).
		t: { type: Number, default: 0 },
	})

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
</style>

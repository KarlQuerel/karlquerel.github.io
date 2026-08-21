<template>
	<!-- The ground the flight leaves from: a near ridge across the foot of the opening
	     frame, dropping away as the camera lifts over it. Scroll owns the climb.
	     Decorative — the same cut as the arrival's range, see js/ridge.js. -->
	<div class="ridge" :style="ridgeStyle">
		<!-- behind the silhouette, so the ridge masks the half of it below the crests -->
		<div class="ridge__air" :style="airStyle" />
		<canvas ref="canvasEl" class="ridge__band" />
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { DEPARTURE_RIDGE as RIDGE, ENTRY } from '@/constants/journey'
	import { clamp01, smoothstep } from '@/js/math'
	import { drawRidge } from '@/js/ridge'

	const props = defineProps({
		// world units the camera has run down the corridor
		travel: { type: Number, default: 0 },
		// how far through the pass we are — what the ridge is gone by
		pass: { type: Number, default: 0 },
	})

	const canvasEl = ref(null)

	// It swells as we close on it and drops as we climb: one is the perspective, the
	// other is the camera rising, and both come off the same travel.
	const ridgeStyle = computed(() => {
		const gone = smoothstep(
			clamp01((props.pass - RIDGE.goneFrom) / (RIDGE.goneTo - RIDGE.goneFrom))
		)
		const swell = 1 + RIDGE.swellPerUnit * props.travel
		const drop = RIDGE.dropVhPerUnit * props.travel
		return {
			display: gone < 1 ? null : 'none',
			height: `${RIDGE.heightVh}vh`,
			opacity: (1 - gone).toFixed(3),
			transform: `translate3d(0, ${drop.toFixed(1)}vh, 0) scale(${swell.toFixed(3)})`,
		}
	})

	const airStyle = {
		background: `linear-gradient(to top, transparent 0%, ${RIDGE.air} ${RIDGE.airFrom * 100}%, transparent ${RIDGE.airTo * 100}%)`,
	}

	// one seed per visit, so a reshape re-cuts the same ridge rather than a new one
	let visitSeed = 1
	let frame = { w: 0, h: 0 }

	function cut() {
		frame = { w: window.innerWidth, h: window.innerHeight }
		if (canvasEl.value) drawRidge(canvasEl.value, RIDGE, visitSeed, frame)
	}

	// only when the frame really changed shape (see ENTRY.ridgeReshape)
	const onResize = useRafThrottle(() => {
		const reshaped =
			window.innerWidth !== frame.w ||
			Math.abs(window.innerHeight / frame.h - 1) > ENTRY.ridgeReshape
		if (reshaped) cut()
	})

	onMounted(() => {
		visitSeed = Math.floor(Math.random() * 1e5) + 1
		cut()
		window.addEventListener('resize', onResize, { passive: true })
	})

	onBeforeUnmount(() => window.removeEventListener('resize', onResize))
</script>

<style scoped lang="scss">
	// Anchored to the foot of the frame and grown from there, so the swell pushes the
	// crests up rather than sliding the whole band around.
	.ridge {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 2;
		transform-origin: bottom center;
		pointer-events: none;
	}

	.ridge__air {
		position: absolute;
		inset: 0;
	}

	.ridge__band {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
		// hard-edged silhouette, like the rest of the sprite work
		image-rendering: pixelated;
	}
</style>

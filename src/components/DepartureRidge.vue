<template>
	<!-- The ground the flight leaves from: two ranges across the foot of the opening
	     frame, dropping away as the camera lifts over them. Scroll owns the climb, the
	     cursor owns the lean. Decorative — the same cut as the arrival's range, see
	     js/ridge.js. -->
	<div class="ridge" :style="ridgeStyle" aria-hidden="true">
		<!-- behind the silhouettes, so the ridges mask the half of it below the crests -->
		<div class="ridge__air" :style="airStyle" />
		<canvas
			v-for="(band, i) in RIDGE.bands"
			:key="i"
			:ref="el => (bandEls[i] = el)"
			class="ridge__band"
			:style="bandStyle(band)"
		/>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted } from 'vue'
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

	// --mx/--my come from the flight container (usePointerParallax); each band takes
	// its own share of them through --depth, and that difference is the relief.
	const ridgeStyle = computed(() => ({
		display: gone.value < 1 ? null : 'none',
		opacity: (1 - gone.value).toFixed(3),
	}))

	const gone = computed(() =>
		smoothstep(clamp01((props.pass - RIDGE.goneFrom) / (RIDGE.goneTo - RIDGE.goneFrom)))
	)

	// A band swells as we close on it and drops as we climb: one is the perspective,
	// the other is the camera rising, and both come off the same travel — scaled by the
	// band's own share of it, which is the parallax that reads as relief.
	function bandStyle(band) {
		const swell = 1 + RIDGE.swellPerUnit * band.climb * props.travel
		const drop = RIDGE.dropVhPerUnit * band.climb * props.travel
		return {
			'--depth': band.depth,
			height: `${band.heightVh}vh`,
			transform: `translate3d(0, ${drop.toFixed(1)}vh, 0) scale(${swell.toFixed(3)})`,
		}
	}

	// The air rides with the ground rather than the frame, so it stays the range's
	// own atmosphere as the horizon drops away.
	const airStyle = computed(() => ({
		height: `${RIDGE.airVh}vh`,
		transform: `translate3d(0, ${(RIDGE.dropVhPerUnit * props.travel).toFixed(1)}vh, 0)`,
		background: `linear-gradient(to top, transparent 0%, ${RIDGE.air} ${RIDGE.airFrom * 100}%, transparent ${RIDGE.airTo * 100}%)`,
	}))

	// one seed per visit, so a reshape re-cuts the same ridges rather than new ones
	let visitSeed = 1
	let frame = { w: 0, h: 0 }
	const bandEls = []

	function cut() {
		frame = { w: window.innerWidth, h: window.innerHeight }
		RIDGE.bands.forEach((band, i) => {
			if (bandEls[i]) drawRidge(bandEls[i], band, visitSeed + i * 31, frame)
		})
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
	.ridge {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.ridge__air {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}

	// Anchored to the foot of the frame and grown from there, so the swell pushes the
	// crests up rather than sliding the whole band around. Each bleeds past the edges
	// by its own depth, so the cursor's lean can never uncover one.
	.ridge__band {
		position: absolute;
		bottom: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		width: calc(100% + var(--depth, 0) * 2px);
		display: block;
		transform-origin: bottom center;
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
		// hard-edged silhouette, like the rest of the sprite work
		image-rendering: pixelated;
	}
</style>

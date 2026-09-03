<template>
	<!-- The ground the flight leaves from: a moon across the foot of the opening frame,
	     three layers of one ground dropping away as the camera lifts over them.
	     Scroll owns the climb, the cursor owns the lean. Decorative — drawn by
	     drawMoon in js/ridge.js. -->
	<div ref="rootEl" class="ridge" :style="ridgeStyle" aria-hidden="true">
		<!-- the sky: the sun's glow and the galaxy, on the ground's grid -->
		<canvas ref="skyEl" class="ridge__sky" :style="skyStyle" />
		<!-- the bright stars — behind the crests, so the world can still stand in front
		     of them — and the destination's ember, hung over the notch by the cut -->
		<span
			v-for="(glint, i) in RIDGE.sky.glints"
			:key="i"
			class="ridge__glint"
			:style="glintStyle(glint)"
		/>
		<span class="ridge__glint" :style="starStyle" />
		<canvas
			v-for="(band, i) in RIDGE.bands"
			:key="i"
			:ref="el => (bandEls[i] = el)"
			class="ridge__band"
			:style="bandStyle(band, i)"
		/>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { DEPARTURE_RIDGE as RIDGE, ENTRY } from '@/constants/journey'
	import { PALETTE } from '@/constants/palette'
	import { clamp01, smoothstep } from '@/js/math'
	import { cellFor, drawMoon } from '@/js/ridge'
	import { drawSky } from '@/js/sky'

	const props = defineProps({
		// world units the camera has run down the corridor
		travel: { type: Number, default: 0 },
		// how far through the pass we are — what the ridge is gone by
		pass: { type: Number, default: 0 },
	})

	// --mx/--my come from the flight container (usePointerParallax); each band takes
	// its own share of them through --depth, and that difference is the relief.
	// --fade is for the sky alone: the ground leaves by dropping out of frame, and
	// only what sits at infinity has to fade instead.
	const ridgeStyle = computed(() => ({
		display: gone.value < 1 ? null : 'none',
		'--fade': (1 - gone.value).toFixed(3),
	}))

	const gone = computed(() =>
		smoothstep(clamp01((props.pass - RIDGE.goneFrom) / (RIDGE.goneTo - RIDGE.goneFrom)))
	)

	// A band swells as we close on it and drops as we climb: one is the perspective,
	// the other is the camera rising, and both come off the same travel — scaled by the
	// band's own share of it, which is the parallax that reads as relief.
	function bandStyle(band, i) {
		const swell = 1 + RIDGE.swellPerUnit * band.climb * props.travel
		const drop = RIDGE.dropVhPerUnit * band.climb * props.travel
		return {
			'--depth': band.depth,
			...sized(sizes.value.bands[i]),
			transform: `translate3d(0, ${drop.toFixed(1)}vh, 0) scale(${swell.toFixed(3)})`,
		}
	}

	// The glints hold still while the ground drops away — a star sits at infinity, so
	// the climb owes it no motion. They only leave with the scene's fade. One cell
	// each (--cell, set at the cut), a core with four arms breathing on a stepped clock.
	const rgb = name => `rgb(${PALETTE[name].join(',')})`
	// Every canvas is sized to exactly the cells it was cut on (see gridFor), never
	// stretched to the frame — that is what keeps each cell a whole number of device
	// pixels. The sizes come back from the cut.
	const sizes = ref({ sky: null, bands: [] })
	const sized = cut =>
		cut ? { width: `${cut.cols * cut.cell}px`, height: `${cut.rows * cut.cell}px` } : {}
	const skyStyle = computed(() => ({ '--depth': RIDGE.sky.depth, ...sized(sizes.value.sky) }))
	const glintVars = (glint, depth) => ({
		'--depth': depth,
		'--core': rgb(glint.core),
		'--arm': rgb(glint.arm),
		'--tip': rgb(glint.tip),
		'--period': `${glint.periodMs}ms`,
		'--delay': `${glint.delayMs}ms`,
		'--dim': glint.dim,
	})
	const glintStyle = glint => ({
		left: `${glint.x * 100}%`,
		top: `${glint.y * 100}%`,
		...glintVars(glint, RIDGE.sky.glintDepth),
	})
	// the destination's place comes off the cut: over the notch, clear of the crest
	const starAt = ref({ left: 0, top: 0 })
	const starStyle = computed(() => ({
		left: `${starAt.value.left}px`,
		top: `${starAt.value.top}px`,
		...glintVars(RIDGE.star, RIDGE.star.depth),
	}))

	let frame = { w: 0, h: 0 }
	const rootEl = ref(null)
	const skyEl = ref(null)
	const bandEls = []

	// Cut from the authored RIDGE.ridgeSeed — the opening frame is a composition, not a
	// roll; a reshape re-cuts the same ground. The cut is spread over frames, one canvas
	// each, and starts a frame after it is asked for: the title, the stars and the
	// planet paint first and the ground arrives a frame later, back to front, and no
	// single task holds the main thread long enough to swallow an input.
	let pendingFrame = 0
	function cut() {
		frame = { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio || 1 }
		rootEl.value.style.setProperty('--cell', cellFor(frame))
		const steps = [
			() => {
				sizes.value.sky = drawSky(skyEl.value, { ...frame, bleed: RIDGE.sky.depth })
			},
			...RIDGE.bands.map((band, i) => () => {
				if (!bandEls[i]) return
				const cut = drawMoon(bandEls[i], band, RIDGE.ridgeSeed, {
					...frame,
					bleed: band.depth,
				})
				sizes.value.bands[i] = cut
				const notch = band.hills?.notch
				if (!cut.hillTop || !notch) return
				// the star hangs `aboveCells` over the highest point the notch's crest
				// reaches under it and its arms, whatever this frame made of the range;
				// the canvas starts `depth` px left of the frame and ends at its foot
				const x = Math.round(notch.at * cut.cols)
				const crest = Math.min(...cut.hillTop.slice(Math.max(0, x - 1), x + 2))
				const top = frame.h + band.depth - cut.rows * cut.cell
				starAt.value = {
					left: x * cut.cell - band.depth,
					top: top + (crest - RIDGE.star.aboveCells) * cut.cell,
				}
			}),
		]
		cancelAnimationFrame(pendingFrame)
		const next = () => {
			steps.shift()()
			if (steps.length) pendingFrame = requestAnimationFrame(next)
		}
		pendingFrame = requestAnimationFrame(next)
	}

	// only when the frame really changed shape (see ENTRY.ridgeReshape)
	const onResize = useRafThrottle(() => {
		const reshaped =
			window.innerWidth !== frame.w ||
			Math.abs(window.innerHeight / frame.h - 1) > ENTRY.ridgeReshape
		if (reshaped) cut()
	})

	onMounted(() => {
		cut()
		window.addEventListener('resize', onResize, { passive: true })
	})

	onBeforeUnmount(() => {
		cancelAnimationFrame(pendingFrame)
		window.removeEventListener('resize', onResize)
	})
</script>

<style scoped lang="scss">
	.ridge {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	// Starts its bleed past the frame's corner, like the bands, so the lean never
	// uncovers an edge; its size is the cut's, in whole cells.
	.ridge__sky {
		position: absolute;
		opacity: var(--fade, 1);
		top: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
		image-rendering: pixelated;
	}

	// A pixel star, five cells across: one cell of core; arms one cell out, drawn as
	// shadows so they can breathe without the core; and tips two cells out that blink
	// on the off-beat. Both motions are on their own clock, so they are stepped.
	.ridge__glint {
		position: absolute;
		opacity: var(--fade, 1);
		width: calc(var(--cell, 6) * 1px);
		height: calc(var(--cell, 6) * 1px);
		background: var(--core);
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);

		&::before,
		&::after {
			content: '';
			position: absolute;
			inset: 0;
		}

		&::before {
			box-shadow:
				calc(var(--cell, 6) * -1px) 0 var(--arm),
				calc(var(--cell, 6) * 1px) 0 var(--arm),
				0 calc(var(--cell, 6) * -1px) var(--arm),
				0 calc(var(--cell, 6) * 1px) var(--arm);
			animation: ridge-glint var(--period) steps(3, end) var(--delay) infinite;
		}

		&::after {
			box-shadow:
				calc(var(--cell, 6) * -2px) 0 var(--tip),
				calc(var(--cell, 6) * 2px) 0 var(--tip),
				0 calc(var(--cell, 6) * -2px) var(--tip),
				0 calc(var(--cell, 6) * 2px) var(--tip);
			animation: ridge-glint-tip var(--period) steps(2, end)
				calc(var(--delay) + var(--period) / 2) infinite;
		}
	}

	@keyframes ridge-glint {
		0%,
		55% {
			opacity: 1;
		}
		70%,
		100% {
			opacity: var(--dim, 0.35);
		}
	}

	@keyframes ridge-glint-tip {
		0%,
		45% {
			opacity: 1;
		}
		55%,
		100% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ridge__glint::before,
		.ridge__glint::after {
			animation: none;
		}
	}

	// Anchored to the foot of the frame and grown from there, so the swell pushes the
	// crests up rather than sliding the whole band around. Each bleeds past the edges
	// by its own depth, so the cursor's lean can never uncover one.
	.ridge__band {
		position: absolute;
		bottom: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		display: block;
		transform-origin: bottom center;
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
		// hard-edged silhouette, like the rest of the sprite work
		image-rendering: pixelated;
	}
</style>

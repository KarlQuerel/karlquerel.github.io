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
		<!-- meteors: a streak jumping cell by cell down and right, rare -->
		<span
			v-for="meteor in meteors"
			:key="meteor.id"
			class="ridge__meteor"
			:style="meteor.style"
			@animationend="removeMeteor(meteor.id)"
		/>
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
	import { useSkySpawner } from '@/composables/useSkySpawner'
	import { DEPARTURE_RIDGE as RIDGE, ENTRY } from '@/constants/journey'
	import { PALETTE } from '@/constants/palette'
	import { clamp01, randIn, smoothstep } from '@/js/math'
	import { createCutter } from '@/js/departureCut'
	import { cellFor } from '@/js/ridge'

	const props = defineProps({
		// world units the camera has run down the corridor
		travel: { type: Number, default: 0 },
		// how far through the pass we are — what the ridge is gone by
		pass: { type: Number, default: 0 },
	})
	// the cut's progress (done, and what the step in flight will bring it to, 0..1)
	// and its landing — what the landing's boot screen waits on
	const emit = defineEmits(['progress', 'ready'])

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
	// Meteors, rolled per crossing: where they enter and how far they run. The head is
	// the element, the tail its shadows a cell up and left per step behind it; the
	// stepping is in the timing function, one step per cell, so the streak is never
	// between cells. None spawn once the scene has left the frame.
	const M = RIDGE.sky.meteor
	const tail = M.shades
		.slice(1)
		.map(
			(name, i) =>
				`calc(var(--cell) * ${-(i + 1)}px) calc(var(--cell) * ${-(i + 1)}px) ${rgb(name)}`
		)
		.join(', ')
	const { items: meteors, remove: removeMeteor } = useSkySpawner({
		gapMs: M.gapMs,
		active: () => gone.value < 1,
		make: () => {
			const cells = Math.round(randIn(M.travelCells))
			return {
				style: {
					left: `${(randIn(M.x) * 100).toFixed(1)}%`,
					top: `${(randIn(M.y) * 100).toFixed(1)}%`,
					'--head': rgb(M.shades[0]),
					'--tail': tail,
					'--cells': cells,
					animationDuration: `${cells * M.msPerCell}ms`,
					animationTimingFunction: `steps(${cells}, end)`,
				},
			}
		},
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
	// roll; a reshape re-cuts the same ground. The drawing happens off the main thread
	// where it can (js/departureCut.js), so the title, the stars and the planet paint at
	// once and the ground arrives when it is ready.
	let cutter = null
	function cut() {
		frame = { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio || 1 }
		rootEl.value.style.setProperty('--cell', cellFor(frame))
		const onStep = (done, total) => emit('progress', done / total, (done + 1) / total)
		cutter.cut(frame, RIDGE.ridgeSeed, onStep).then(cuts => {
			sizes.value = cuts
			emit('ready')
			const i = RIDGE.bands.findIndex(band => band.hills?.notch)
			const band = RIDGE.bands[i]
			const cut = cuts.bands[i]
			// the star hangs `aboveCells` over the highest point the notch's crest reaches
			// under it and its arms, whatever this frame made of the range; the canvas
			// starts `depth` px left of the frame and ends at its foot
			const x = Math.round(band.hills.notch.at * cut.cols)
			const crest = Math.min(...cut.hillTop.slice(Math.max(0, x - 1), x + 2))
			const top = frame.h + band.depth - cut.rows * cut.cell
			starAt.value = {
				left: x * cut.cell - band.depth,
				top: top + (crest - RIDGE.star.aboveCells) * cut.cell,
			}
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
		cutter = createCutter({ sky: skyEl.value, bands: bandEls })
		cut()
		window.addEventListener('resize', onResize, { passive: true })
	})

	onBeforeUnmount(() => {
		cutter.dispose()
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

	// a meteor is its head cell; the tail rides along as shadows. The travel is the same
	// count of cells across and down, so every step lands it exactly one cell on.
	.ridge__meteor {
		position: absolute;
		opacity: var(--fade, 1);
		width: calc(var(--cell, 6) * 1px);
		height: calc(var(--cell, 6) * 1px);
		background: var(--head);
		box-shadow: var(--tail);
		animation-name: ridge-meteor;
		animation-fill-mode: forwards;
	}

	@keyframes ridge-meteor {
		to {
			translate: calc(var(--cell, 6) * var(--cells) * 1px)
				calc(var(--cell, 6) * var(--cells) * 1px);
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
		.ridge__glint::after,
		.ridge__meteor {
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

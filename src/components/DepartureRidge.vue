<template>
	<!-- The ground the flight leaves from: a moon across the foot of the opening frame, three layers
	     of one ground dropping away as the camera lifts over them. -->
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
	// the cut's progress (done, and where the step in flight lands) and what the boot screen waits on
	const emit = defineEmits(['progress', 'ready'])

	// --mx/--my come from the flight container; each band's --depth share of them is the relief.
	const ridgeStyle = computed(() => ({
		display: gone.value < 1 ? null : 'none',
		'--fade': (1 - gone.value).toFixed(3),
	}))

	const gone = computed(() =>
		smoothstep(clamp01((props.pass - RIDGE.goneFrom) / (RIDGE.goneTo - RIDGE.goneFrom)))
	)

	// A band swells as we close and drops as we climb, both off the same travel, scaled by its share.
	function bandStyle(band, i) {
		const swell = 1 + RIDGE.swellPerUnit * band.climb * props.travel
		const drop = RIDGE.dropVhPerUnit * band.climb * props.travel
		return {
			'--depth': band.depth,
			...sized(sizes.value.bands[i]),
			transform: `translate3d(0, ${drop.toFixed(1)}vh, 0) scale(${swell.toFixed(3)})`,
		}
	}

	// The glints hold still while the ground drops away — a star at infinity owes the climb no motion.
	const rgb = name => `rgb(${PALETTE[name].join(',')})`
	// Every canvas is sized to exactly the cells it was cut on, so a cell stays whole device pixels.
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
	// Meteors rolled per crossing. The head is the element, the tail its shadows one cell back per step.
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
			// entered on the grid, and run out until the tail has left by the right edge or behind the ridge
			const cell = cellFor(frame)
			const left = Math.round((randIn(M.x) * frame.w) / cell) * cell
			const top = Math.round((randIn(M.y) * frame.h) / cell) * cell
			const cells =
				Math.ceil(Math.min(frame.w - left, frame.h - top) / cell) + M.shades.length
			return {
				style: {
					left: `${left}px`,
					top: `${top}px`,
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

	// Cut from the authored RIDGE.ridgeSeed: the opening frame is a composition, not a roll.
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
			// the star hangs `aboveCells` over the highest point the notch's crest reaches under it
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
	@use '@/styles/mixins' as *;

	.ridge {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	// Starts its bleed past the frame's corner like the bands, so the lean never uncovers an edge.
	.ridge__sky {
		position: absolute;
		opacity: var(--fade, 1);
		top: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		@include lean;
		image-rendering: pixelated;
	}

	// A pixel star, five cells across: a core, arms drawn as shadows so they breathe, blinking tips.
	.ridge__glint {
		position: absolute;
		opacity: var(--fade, 1);
		width: calc(var(--cell, 6) * 1px);
		height: calc(var(--cell, 6) * 1px);
		background: var(--core);
		@include lean;

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

	// a meteor is its head cell, the tail rides as shadows; travel is equal cells across and down
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

	// Anchored to the foot of the frame, so the swell pushes the crests up rather than sliding the band.
	.ridge__band {
		position: absolute;
		bottom: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		display: block;
		transform-origin: bottom center;
		@include lean;
		// hard-edged silhouette, like the rest of the sprite work
		image-rendering: pixelated;
	}
</style>

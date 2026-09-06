<template>
	<!-- /under-construction, where /game lands until the game ships (GAME_SHIPPED): the
	     heading over two strips of the departure's moon — far hills and the near plain,
	     leaning with the cursor at their own depths — with a crane worksite on the near
	     plain. Still, but for the beacon on the mast: a DOM cell, so it can blink on a
	     stepped clock without a redraw. Decorative but for the heading. -->
	<div class="content holding">
		<HomeChip />
		<PageTitle :lead="GAME_HOLDING.lead" :accent="GAME_HOLDING.accent" />
		<div class="site" :style="parallaxStyle" aria-hidden="true">
			<canvas ref="farEl" class="site__layer" :style="layerStyle(S.far, far)" />
			<div class="site__layer site__near" :style="layerStyle(S.near, near)">
				<canvas ref="nearEl" class="site__canvas" />
				<span class="site__beacon" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { usePointerParallax } from '@/composables/usePointerParallax'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { GAME_HOLDING } from '@/constants/game'
	import { DEPARTURE_RIDGE, ENTRY } from '@/constants/journey'
	import { PALETTE } from '@/constants/palette'
	import { drawMoon } from '@/js/ridge'
	import HomeChip from '../HomeChip.vue'
	import PageTitle from '../PageTitle.vue'

	const S = GAME_HOLDING.site
	const { parallaxStyle } = usePointerParallax()

	// two strips of the departure's ground: its low hills for the distance, its near
	// plain for the site to stand on, each grown to the height this page wants
	const [, hills, plain] = DEPARTURE_RIDGE.bands
	const bands = { far: { ...hills, ...S.far }, near: { ...plain, ...S.near } }

	// every canvas is sized to exactly the cells it was cut on, never stretched, and
	// bleeds past the frame by its depth so the lean can never uncover an edge
	const far = ref(null)
	const near = ref(null)
	// (the template hands the cuts over unwrapped)
	const layerStyle = (layer, cut) => ({
		'--depth': bands[layer === S.far ? 'far' : 'near'].depth,
		...(cut ? { width: `${cut.cols * cut.cell}px`, height: `${cut.rows * cut.cell}px` } : {}),
	})

	const farEl = ref(null)
	const nearEl = ref(null)
	let frame = { w: 0, h: 0 }

	function cut() {
		frame = { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio || 1 }
		const seed = DEPARTURE_RIDGE.ridgeSeed
		far.value = drawMoon(farEl.value, bands.far, seed, { ...frame, bleed: bands.far.depth })
		const el = nearEl.value
		const c = drawMoon(el, bands.near, seed, { ...frame, bleed: bands.near.depth })
		near.value = c
		// the layout the frame has room for, its foot row on the horizon under the mast
		// and the rows below it lying on the ground as shadow
		const inner = frame.w / c.cell
		const site = inner >= S.wide.rows[0].length ? S.wide : S.narrow
		const cols = site.rows[0].length
		const left = Math.round(c.cols * S.at - cols / 2)
		const mast = Math.min(c.cols - 1, Math.max(0, left + site.beacon[0]))
		const top = c.horizon[mast] - S.foot
		const ctx = el.getContext('2d')
		site.rows.forEach((row, y) => {
			for (let x = 0; x < row.length; x++) {
				const name = S.legend[row[x]]
				if (!name) continue
				ctx.fillStyle = `rgb(${PALETTE[name].join(' ')})`
				ctx.fillRect(left + x, top + y, 1, 1)
			}
		})
		// the beacon sits on its own cell of the near grid
		const style = el.parentElement.style
		style.setProperty('--cell', c.cell)
		style.setProperty('--beacon-x', left + site.beacon[0])
		style.setProperty('--beacon-y', top + site.beacon[1])
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
	onBeforeUnmount(() => window.removeEventListener('resize', onResize))
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.holding {
		padding: $page-pad-top 1rem 0;
	}

	// the scene fills the viewport behind the heading
	.site {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
	}

	// anchored to the foot of the frame, starting its bleed past the corner
	.site__layer {
		position: absolute;
		bottom: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		display: block;
		@include lean;
		image-rendering: pixelated;
	}

	.site__canvas {
		display: block;
		width: 100%;
		height: 100%;
		image-rendering: pixelated;
	}

	// the site light: on, off, on the glints' own clock
	.site__beacon {
		position: absolute;
		top: calc(var(--beacon-y) * var(--cell) * 1px);
		left: calc(var(--beacon-x) * var(--cell) * 1px);
		width: calc(var(--cell) * 1px);
		height: calc(var(--cell) * 1px);
		background: $yellow;
		animation: holding-beacon 2.4s steps(2, end) infinite;
	}

	@keyframes holding-beacon {
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
		.site__beacon {
			animation: none;
		}
	}
</style>

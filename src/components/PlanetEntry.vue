<template>
	<!-- Atmospheric entry: the deck closes over the camera, the dusk sky takes over, the ridgelines settle. -->
	<div class="entry" aria-hidden="true">
		<canvas ref="skyEl" class="entry__sky" :style="skyStyle" />
		<!-- two coprime tiles, so the field never repeats inside a viewport -->
		<div
			v-for="(layer, i) in ENTRY.stars.layers"
			:key="layer.tile"
			class="entry__stars"
			:style="starStyle(layer, i)"
		/>
		<!-- everything alive up there: a handful of stars breathing, and the occasional
		     thing crossing a sky that is otherwise holding perfectly still -->
		<EntrySkyLife :fade="starFade" :clear="skyClear" :dusk="smokeLit.dusk" :seed="visitSeed" />
		<div
			v-for="(cloud, i) in cloudField"
			:key="i"
			class="entry__cloud"
			:style="cloudStyle(cloud, i)"
		/>
		<!-- inside the deck: cloud closes over the lens and hides the sky handoff -->
		<div class="entry__deck" :style="deckStyle" />
		<!-- far → near; each band is cut to the box it fills, so redraws on reshape -->
		<canvas
			v-for="(band, i) in ARRIVAL_BANDS"
			:key="band.key"
			:ref="el => (ridgeEls[i] = el)"
			class="entry__ridge"
			:style="ridgeStyle(band, i)"
		/>
		<!-- someone is home: the habitat's chimney, over the near band it stands on -->
		<div v-if="smoke" class="entry__smoke" :style="smoke">
			<span
				v-for="i in ENTRY.smoke.puffs"
				:key="i"
				:ref="el => (puffEls[i - 1] = el)"
				class="entry__puff"
			/>
		</div>
	</div>
</template>

<script setup>
	import {
		computed,
		nextTick,
		onActivated,
		onBeforeUnmount,
		onDeactivated,
		onMounted,
		ref,
		watch,
	} from 'vue'
	import { useFrameReshape } from '@/composables/useFrameReshape'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { ENTRY } from '@/constants/journey'
	import { drawCloud, drawPuff, drawStarTile, seedClouds } from '@/js/entrySprites'
	import { sunAt } from '@/js/sun'
	import { clamp01, ramp, smoothstep } from '@/js/math'
	import { createArrival } from '@/js/arrivalCut'
	import { windAt } from '@/js/wind'
	import { createPlume } from '@/js/plume'
	import { ARRIVAL_BANDS } from '@/js/arrivalSurface'
	import EntrySkyLife from './EntrySkyLife.vue'

	const props = defineProps({
		// approach progress: 0 → still in space, 1 → landed
		progress: { type: Number, default: 0 },
	})

	// --mx/--my are inherited from HomeJourney's .journey, the one pointer loop

	// inside the deck the view goes to cloud, which is what the sky handoff hides behind
	const deck = computed(() => {
		const { start, peak, end, max } = ENTRY.deck
		const p = props.progress
		if (p <= start || p >= end) return 0
		const t = p < peak ? (p - start) / (peak - start) : 1 - (p - peak) / (end - peak)
		return smoothstep(clamp01(t)) * max
	})

	const deckStyle = computed(() => ({
		opacity: deck.value.toFixed(3),
		display: deck.value > 0 ? null : 'none',
	}))

	// Every canvas is shown at exactly the cells it was cut on (see arrivalSurface.js): stretched to
	// the frame instead, a cell came out 5.5 pixels wide and 5.6 tall and the dither wobbled with it.
	const sizes = ref({ sky: null, bands: [] })
	const sized = grid =>
		grid ? { width: `${grid.cols * grid.cell}px`, height: `${grid.rows * grid.cell}px` } : {}

	// dusk takeover: transparent space → opaque sky, then it holds
	const skyStyle = computed(() => {
		const t = ramp(props.progress, ENTRY.skyStart, ENTRY.skyFull)
		return { opacity: t.toFixed(3), display: t > 0 ? null : 'none', ...sized(sizes.value.sky) }
	})

	// Each cloud rushes up past the camera inside its own window of the drop.
	function cloudStyle(cloud, i) {
		// variants cycle by position in the deck, so no two neighbours match
		const sprite = cloudSprites.value[i % ENTRY.cloud.variants]
		const t = clamp01((props.progress - cloud.start) / ENTRY.cloudTravel)
		const ease = t * t
		const y = ENTRY.cloudFromVh - (ENTRY.cloudFromVh - ENTRY.cloudToVh) * ease
		const drift = (cloud.left - 50) * ENTRY.cloudSpread * ease
		const scale = cloud.scale * (1 + ENTRY.cloudApproach * ease)
		return {
			left: `${cloud.left}vw`,
			display: t > 0 && t < 1 ? null : 'none',
			backgroundImage: sprite ? `url(${sprite})` : undefined,
			opacity: Math.min(1, (1 - t) / ENTRY.cloudFadeTail).toFixed(3),
			'--depth': ENTRY.parallax.cloud,
			transform:
				`translate3d(${drift.toFixed(1)}vw, ${y.toFixed(1)}vh, 0)` +
				` scale(${scale.toFixed(2)})`,
		}
	}

	// each ridge band lifts into place on its own beat — the two-plane parallax
	function ridgeStyle(band, i) {
		const t = smoothstep(clamp01((props.progress - band.revealAt) / ENTRY.ridgeSettle))
		return {
			display: t > 0 ? null : 'none',
			'--depth': band.depth,
			// far to near, with room between for the gulls (ENTRY.stacking)
			'--layer': (i + 1) * ENTRY.stacking.range,
			opacity: t.toFixed(3),
			...sized(sizes.value.bands[i]),
			transform: `translate3d(0, ${((1 - t) * band.liftVh).toFixed(1)}vh, 0)`,
		}
	}

	// The chimney's plume: where it hangs comes back from the cut, which alone knows the habitat's place.
	// A puff is a `cellsTo` box of whole cells with its floor on the chimney's lip (drawPuff), so
	// everything about it is counted in cells and lands on the band's grid.
	const vent = ref(null)
	const smoke = computed(() => {
		if (!vent.value) return null
		const { col, row, cell, band } = vent.value
		const { cellsTo } = ENTRY.smoke
		return {
			...ridgeStyle(ARRIVAL_BANDS[band], band),
			'--vent-x': `${(col - Math.floor((cellsTo - 1) / 2)) * cell}px`,
			'--vent-y': `${(row - cellsTo) * cell}px`,
			'--puff': `${cellsTo * cell}px`,
			'--smoke': `url(${puffSprites[smokeLit.value.night ? 'night' : 'day'][smokeLit.value.side < 0 ? 0 : 1]})`,
		}
	})
	// The puffs take the light as it stands: lit on the sun's side, dim once the lamp is on. Drawn once
	// per visit, four sprites, and only swapped when the sun crosses the chimney or the lamp turns.
	// The gulls take the dusk as the disc goes behind the ranges, in steps: by night a paler tone, or
	// the sky would have them.
	const puffSprites = {
		day: [-1, 1].map(side => drawPuff(ENTRY.smoke.shades, side)),
		night: [-1, 1].map(side => drawPuff(ENTRY.smoke.nightShades, side)),
	}
	const smokeLit = ref({ side: -1, night: false, dusk: 0 })
	function lightSmoke() {
		if (!vent.value) return
		const sun = sunAt(sunk, frame)
		// the chimney's column as a share of the frame: its band starts `depth` px left of it
		const { col, cell, band } = vent.value
		const side = sun.x * frame.w < col * cell - ARRIVAL_BANDS[band].depth ? -1 : 1
		const night = sun.ground >= ENTRY.near.habitat.lampAt
		const steps = ENTRY.flock.duskSteps
		const dusk = Math.round((sun.ground / ENTRY.sun.night) * steps) / steps
		const lit = smokeLit.value
		if (side !== lit.side || night !== lit.night || dusk !== lit.dusk) {
			smokeLit.value = { side, night, dusk }
		}
	}

	// The plume (js/plume.js), flown on `dt` ms with the sun: every puff reads the wind as it blows now,
	// so a gust leans the whole of it at once. Painted onto the spans directly: bound through `:style`,
	// a puff crossing a cell re-patched every style in the scene, 4% of the main thread for ten boxes.
	const plume = createPlume()
	const puffEls = []
	function blowSmoke(dt) {
		if (!vent.value) return
		plume.blow(windAt(performance.now(), visitSeed), dt)
		plume.show(vent.value.cell, (i, style) => Object.assign(puffEls[i].style, style))
	}

	const ridgeEls = []
	// the frame the sprites were last cut for, read only while cutting so the canvases cannot disagree
	let frame = { w: 0, h: 0 }
	// three cloud sprites drawn once per visit; each puff picks one by index
	const cloudSprites = ref([])
	const skyEl = ref(null)
	const starTiles = ref([])
	const cloudField = ref([])

	// the gulls wait for the deck to clear: born in it, they would fly over the whiteout
	const skyClear = computed(() => props.progress >= ENTRY.deck.end)

	// the first stars come out once the sky has settled, over the dark top of it
	const starFade = computed(() => {
		const { appearStart, appearEnd, maxOpacity } = ENTRY.stars
		const t = ramp(props.progress, appearStart, appearEnd)
		return smoothstep(t) * maxOpacity
	})

	function starStyle(layer, i) {
		return {
			opacity: starFade.value.toFixed(3),
			display: starFade.value > 0 && starTiles.value[i] ? null : 'none',
			'--depth': layer.depth,
			backgroundImage: `url(${starTiles.value[i]})`,
			backgroundSize: `${layer.tile}px ${layer.tile}px`,
		}
	}

	// The surface (js/arrivalCut.js): the sky and the ranges, cut and relit off this thread where the
	// browser allows it. It takes the canvases at mount and keeps them.
	let arrival = null
	// how far the sun has fallen, in ms on the surface
	let sunk = 0

	// The sun goes on crossing the sky while the surface is read, once the ground is under the visitor:
	// one step of its circuit a frame (see arrivalSurface.js for what a step does).
	let sinking = 0
	let last = 0
	function sink(now) {
		sinking = requestAnimationFrame(sink)
		const dt = last ? now - last : 0
		sunk += dt
		last = now
		arrival?.step(sunk)
		lightSmoke()
		blowSmoke(dt)
	}

	// `immediate`, because a reload restores the scroll: mount can already be on the ground, and a
	// watcher that only answers a change would leave the sun stuck there for good. Reduced motion
	// holds the sun where `cut` lit it: it is the largest moving thing on the page, and the sky-life
	// is held for the same reason; the plume, flown by the same loop, stands where `cut` settled it.
	const landed = () => props.progress >= ENTRY.sun.sinkFrom
	function setSinking(on) {
		cancelAnimationFrame(sinking)
		last = 0
		if (on && !prefersReducedMotion()) sinking = requestAnimationFrame(sink)
	}
	watch(landed, setSinking, { immediate: true })
	// parked by KeepAlive, the sun holds until the visitor is back
	onActivated(() => setSinking(landed()))
	onDeactivated(() => setSinking(false))

	// One seed per visit for the weather, so no two visits share a sky.
	const visitSeed = Math.floor(Math.random() * 1e5) + 1

	// Cut for the frame as it stands; the chimney's place comes back with it, for the smoke.
	function cut() {
		// `dpr` snaps the cell to whole device pixels (cellFor), the one thing that keeps a dither even
		frame = { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio || 1 }
		arrival?.cut(frame, sunk).then(({ sizes: grids, vent: at }) => {
			sizes.value = grids
			// the band by index, not by object: a ref wraps what it holds, so the object would not be found
			vent.value = at && { ...at, band: ARRIVAL_BANDS.findIndex(band => band.key === at.key) }
			lightSmoke()
			// the column stands full from its first frame, in the wind as it blows; its spans mount
			// with the vent, a tick on
			plume.settle(windAt(performance.now(), visitSeed))
			nextTick(() => blowSmoke(0))
		})
	}

	useFrameReshape(() => frame, cut)

	// The arrival is viewports down, so its sprites are cut a frame after mount.
	let deferred = 0
	onMounted(() => {
		deferred = requestAnimationFrame(() => {
			if (skyEl.value) arrival = createArrival({ sky: skyEl.value, bands: ridgeEls })
			cut()
			cloudField.value = seedClouds(visitSeed)
			cloudSprites.value = Array.from({ length: ENTRY.cloud.variants }, (_, i) =>
				drawCloud(visitSeed + i * 137)
			)
			starTiles.value = ENTRY.stars.layers.map((layer, i) =>
				drawStarTile(visitSeed + i * 991, layer)
			)
		})
	})

	onBeforeUnmount(() => {
		cancelAnimationFrame(deferred)
		cancelAnimationFrame(sinking)
		arrival?.dispose()
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// The scene is its own stack: the ranges and the gulls' slabs sort by z-index inside it, and none
	// of that reaches the arrival's content or its controls over it.
	.entry {
		position: absolute;
		inset: 0;
		isolation: isolate;
	}

	// Alien dusk, cut from the shared palette on the ranges' own grid (see drawArrivalSky). Sized by
	// the cut, so the last column may run past the frame; the pin clips it.
	.entry__sky {
		position: absolute;
		top: 0;
		left: 0;
		image-rendering: pixelated;
	}

	// Stars only over the dark upper sky, masked out before the horizon glow washes them out.
	.entry__stars,
	.entry__cloud,
	.entry__ridge,
	.entry__smoke {
		@include lean;
	}

	.entry__stars {
		position: absolute;
		inset: calc(var(--depth, 0) * -1px);
		background-repeat: repeat;
		image-rendering: pixelated;
		-webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 24%, transparent 58%);
		mask-image: linear-gradient(to bottom, #000 0%, #000 24%, transparent 58%);
	}

	// pixel cloud puff: a procedural sprite (see drawCloud), upscaled blocky
	.entry__cloud {
		position: absolute;
		top: 0;
		width: 100px;
		aspect-ratio: 9 / 5;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		image-rendering: pixelated;
	}

	// The smoke shares the near band's box and depth: it stands on that rock, so it leans with it.
	// A band is cut `depth` px past the frame on each side (its bleed), so it starts that far out.
	.entry__ridge,
	.entry__smoke {
		position: absolute;
		z-index: var(--layer);
		bottom: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		// hard-edged silhouettes, like the rest of the sprite work
		image-rendering: pixelated;
	}

	// A puff is a box of whole cells showing one frame of its sheet, carried a whole cell at a time and
	// grown a whole frame at a time (js/plume.js). Nothing is scaled, so a cell of smoke is a cell of
	// the range it rises from.
	.entry__puff {
		position: absolute;
		top: var(--vent-y);
		left: var(--vent-x);
		width: var(--puff);
		height: var(--puff);
		background: var(--smoke) 0 0 / auto 100% no-repeat;
		image-rendering: pixelated;
		// unseen until the plume has painted it
		opacity: 0;
	}

	// Inside the deck: a flat wash on purpose — any shaped gradient at full-frame size reads as a shape.
	.entry__deck {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgb(198, 176, 172) 0%,
			rgb(224, 206, 200) 45%,
			rgb(232, 216, 210) 100%
		);
	}
</style>

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
		<EntrySkyLife :fade="starFade" :seed="visitSeed" />
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
			v-for="(band, i) in bands"
			:key="band.key"
			:ref="el => (ridgeEls[i] = el)"
			class="entry__ridge"
			:style="ridgeStyle(band)"
		/>
		<!-- someone is home: the habitat's chimney, over the near band it stands on -->
		<div v-if="smoke" class="entry__smoke" :style="smoke">
			<span
				v-for="i in ENTRY.smoke.puffs"
				:key="i"
				class="entry__puff"
				:style="puffStyle(i - 1)"
			/>
		</div>
	</div>
</template>

<script setup>
	import {
		computed,
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
	import { paletteRgb } from '@/constants/palette'
	import { drawCloud, drawStarTile, seedClouds } from '@/js/entrySprites'
	import { clamp01, smoothstep } from '@/js/math'
	import { hash1 } from '@/js/pixelNoise'
	import { cutRidge, lightRidge } from '@/js/ridge'
	import { darkenSky, drawArrivalSky, paintSun, rebuildSky } from '@/js/arrivalSky'
	import { sunAt } from '@/js/sun'
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

	// dusk takeover: transparent space → opaque sky, then it holds
	const skyStyle = computed(() => {
		const t = clamp01((props.progress - ENTRY.skyStart) / (ENTRY.skyFull - ENTRY.skyStart))
		return { opacity: t.toFixed(3), display: t > 0 ? null : 'none' }
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
	function ridgeStyle(band) {
		const t = smoothstep(clamp01((props.progress - band.revealAt) / ENTRY.ridgeSettle))
		return {
			display: t > 0 ? null : 'none',
			'--depth': band.depth,
			opacity: t.toFixed(3),
			height: `${band.heightVh}vh`,
			transform: `translate3d(0, ${((1 - t) * band.liftVh).toFixed(1)}vh, 0)`,
		}
	}

	// The chimney's plume: where it hangs comes back from the cut, which alone knows the habitat's place.
	const vent = ref(null)
	const smoke = computed(() => {
		if (!vent.value) return null
		const { x, y, cell, band } = vent.value
		const S = ENTRY.smoke
		return {
			...ridgeStyle(band),
			'--vent-x': `${(x * 100).toFixed(2)}%`,
			'--vent-y': `${(y * 100).toFixed(2)}%`,
			'--puff': `${(S.puffCells * cell).toFixed(1)}px`,
			'--rise': `${(-S.riseCells * cell).toFixed(1)}px`,

			'--grow': S.grow,
			'--peak': S.peak,
			'--period': `${S.periodMs}ms`,
			// one whole cell per step on the way up, one whole cell per step wider
			'--rise-ease': `steps(${S.riseCells}, end)`,
			'--puff-ease': `steps(${S.grow - 1}, end)`,
			'--smoke': paletteRgb(S.shade),
		}
	})
	// Staggered backwards, so the column is already full on the frame it appears on.
	const puffStyle = i => {
		const S = ENTRY.smoke
		const wander = S.driftMin + (1 - S.driftMin) * 2 * hash1(i, ENTRY.ridgeSeed)
		return {
			'--delay': `${(-(i * S.periodMs) / S.puffs).toFixed(0)}ms`,
			'--drift': `${(S.driftCells * (vent.value?.cell ?? 0) * wander).toFixed(1)}px`,
		}
	}

	// far → near, each with its parallax depth
	const bands = ['distant', 'far', 'near'].map(key => ({
		...ENTRY[key],
		key,
		depth: ENTRY.parallax[key],
	}))
	const ridgeEls = []
	// the frame the sprites were last cut for, read only while cutting so the canvases cannot disagree
	let frame = { w: 0, h: 0 }
	// three cloud sprites drawn once per visit; each puff picks one by index
	const cloudSprites = ref([])
	const skyEl = ref(null)
	const starTiles = ref([])
	const cloudField = ref([])

	// the first stars come out once the sky has settled, over the dark top of it
	const starFade = computed(() => {
		const { appearStart, appearEnd, maxOpacity } = ENTRY.stars
		const t = clamp01((props.progress - appearStart) / (appearEnd - appearStart))
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

	// the kept sky (js/arrivalSky.js) and how far the sun has fallen, in ms on the surface
	let sky = null
	let sunk = 0

	// The sun goes on crossing the sky while the surface is read, once the ground is under the visitor.
	// The disc is repainted whenever it has slid `nudge` of a cell, where its edge starts to answer.
	// Every `travel` cells the sky is placed again and the ranges relit, so their light, shadows and
	// glow follow the disc; between those, every `notch` of a step of night the sky is darkened and
	// the ranges relit, for a sun that sinks faster than it travels. Work runs one job a frame, and a
	// tick that lands on pending jobs folds into them — a job reads the sun as it stands when it runs,
	// so the frame rate is the ceiling on how fine any of it gets, never a backlog.
	const tick = night => Math.floor(night / ENTRY.sun.notch)
	const jobs = []
	let sinking = 0
	let last = 0
	function sink(now) {
		sinking = requestAnimationFrame(sink)
		sunk += last ? now - last : 0
		last = now
		if (!sky) return
		const set = sunAt(sunk, frame)
		const [cx, cy] = [set.x * sky.w, set.y * sky.h]
		if (!jobs.length) {
			if (Math.hypot(cx - sky.litX, cy - sky.litY) >= ENTRY.sun.travel) {
				jobs.push(s => rebuildSky(sky, s), lightRanges)
			} else if (tick(set.night) !== tick(sky.night)) {
				jobs.push(fall)
			} else if (tick(set.ground) !== tick(groundLit)) {
				jobs.push(lightRanges)
			}
		}
		const job = jobs.shift()
		if (job) job(set)
		if (job || Math.hypot(cx - sky.atX, cy - sky.atY) >= ENTRY.sun.nudge) paintSun(sky, set)
	}

	// `immediate`, because a reload restores the scroll: mount can already be on the ground, and a
	// watcher that only answers a change would leave the sun stuck there for good. Reduced motion
	// holds the sun where `cut` lit it: it is the largest moving thing on the page, and the sky-life
	// and the puffs are already held for the same reason.
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

	// The ranges are cut once for the frame, the dear part, and relit as the sun moves and night comes.
	let ranges = []
	function cutRanges() {
		ranges = bands.map(
			(band, i) => ridgeEls[i] && cutRidge(ridgeEls[i], band, ENTRY.ridgeSeed, frame)
		)
		ranges.forEach((sprite, i) => {
			if (sprite?.vent) vent.value = { ...sprite.vent, cell: sprite.cell, band: bands[i] }
		})
	}
	// the ranges' own night, kept so a notch of THEIR walk asks for a relight: it runs far faster than
	// the sky's around the setting, and on the sky's notch alone the rock darkened in visible stairs
	let groundLit = -1
	function lightRanges(now) {
		ranges.forEach(sprite => sprite && lightRidge(sprite, now))
		groundLit = now.ground
	}
	// one notch of night over everything that keeps its rungs
	function fall(now) {
		darkenSky(sky, now.night)
		lightRanges(now)
	}

	function cut() {
		frame = { w: window.innerWidth, h: window.innerHeight }
		const now = sunAt(sunk, frame)
		if (skyEl.value) sky = drawArrivalSky(skyEl.value, frame, now)
		cutRanges()
		lightRanges(now)
	}

	useFrameReshape(() => frame, cut)

	// The arrival is viewports down, so its sprites are cut a frame after mount.
	let deferred = 0
	onMounted(() => {
		deferred = requestAnimationFrame(() => {
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
	})
</script>

<style scoped lang="scss">
	// Alien dusk, cut from the shared palette on the ranges' own grid (see drawArrivalSky).
	.entry__sky {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		image-rendering: pixelated;
	}

	// Stars only over the dark upper sky, masked out before the horizon glow washes them out.
	.entry__stars,
	.entry__cloud,
	.entry__ridge,
	.entry__smoke {
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
	}

	@media (prefers-reduced-motion: reduce) {
		.entry__puff {
			animation: none;
		}
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
	.entry__ridge,
	.entry__smoke {
		position: absolute;
		bottom: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		width: calc(100% + var(--depth, 0) * 2px);
		// hard-edged silhouettes, like the rest of the sprite work
		image-rendering: pixelated;
	}

	// A puff is one cell: `translate` carries the climb and `scale` the spread, so neither lands on half.
	.entry__puff {
		position: absolute;
		top: var(--vent-y);
		left: var(--vent-x);
		width: var(--puff);
		height: var(--puff);
		margin: calc(var(--puff) / -2) 0 0 calc(var(--puff) / -2);
		background: var(--smoke);
		opacity: 0;
		animation:
			entry-smoke var(--period) var(--rise-ease) var(--delay) infinite,
			entry-smoke-spread var(--period) var(--puff-ease) var(--delay) infinite;
	}

	@keyframes entry-smoke {
		0% {
			translate: 0 0;
			opacity: 0;
		}
		10%,
		55% {
			opacity: var(--peak);
		}
		100% {
			translate: var(--drift) var(--rise);
			opacity: 0;
		}
	}

	@keyframes entry-smoke-spread {
		to {
			scale: var(--grow);
		}
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

<template>
	<!-- Atmospheric entry: a cloud deck rushes up and closes over the camera,
	     the dusk sky takes over behind it, and the surface ridgelines settle in —
	     the journey ends standing on the planet. All scroll-scrubbed. -->
	<div class="entry" :style="parallaxStyle" aria-hidden="true">
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
		<div class="entry__sky-life" :style="skyLifeStyle">
			<span
				v-for="(tw, i) in twinklers"
				:key="i"
				class="entry__twinkle"
				:style="twinkleStyle(tw)"
			/>
			<span
				v-for="m in meteors"
				:key="`m${m.id}`"
				class="entry__meteor"
				:style="m.style"
				@animationend="removeMeteor(m.id)"
			/>
			<div
				v-for="fl in flocks"
				:key="`f${fl.id}`"
				class="entry__flock"
				:style="fl.style"
				@animationend="removeFlock(fl.id)"
			>
				<span
					v-for="(b, i) in fl.birds"
					:key="i"
					class="entry__bird"
					:style="birdStyle(b)"
				/>
			</div>
		</div>
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
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { usePointerParallax } from '@/composables/usePointerParallax'
	import { useSkySpawner } from '@/composables/useSkySpawner'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { ENTRY } from '@/constants/journey'
	import { PALETTE } from '@/constants/palette'
	import { clamp01, randIn, smoothstep } from '@/js/math'
	import { ditherIndex, fbm1, fbm2, hash1, seamIndex } from '@/js/pixelNoise'
	import { drawRidge } from '@/js/ridge'

	const props = defineProps({
		// approach progress: 0 → still in space, 1 → landed
		progress: { type: Number, default: 0 },
	})

	// the shared lean: see usePointerParallax for the contract these layers follow
	const { parallaxStyle } = usePointerParallax()

	// inside the deck the view goes to cloud, which is what the sky handoff hides
	// behind. Plain triangular envelope, eased both sides.
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

	// Each cloud rushes up past the camera inside its own window of the drop. It
	// swells and fans away from centre as it closes — the perspective is what
	// makes the deck read as something we are flying into rather than past.
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
			// fade the last stretch so a puff never pops out at the frame edge
			opacity: Math.min(1, (1 - t) / 0.15).toFixed(3),
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

	// The chimney's plume: where it hangs comes back from the cut, since only the cut
	// knows where the range put the habitat. It rides the near band's own box and
	// beat, so it lifts into place with the rock it stands on.
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
			'--smoke': `rgb(${PALETTE[S.shade].join(',')})`,
		}
	})
	// Evenly staggered, so a handful of squares reads as one continuous column — and
	// staggered backwards, so the column is already full on the frame it appears on
	// rather than building itself over a whole period while you watch. Each puff takes
	// its own share of the wind, or the column comes up dead straight and reads as a
	// stack of boxes rather than as smoke.
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
	// the frame the sprites were last cut for — read only while cutting, so the
	// canvases can never disagree with each other about what viewport this is
	let frame = { w: 0, h: 0 }
	// three cloud sprites drawn once per visit; each puff picks one by index
	const cloudSprites = ref([])
	const skyEl = ref(null)
	const birdSheet = ref('')

	// One sheet, frames side by side, walked by background-position — the way sprite
	// animation has always worked. A silhouette needs no shading, so it is one colour.
	function drawBirdSheet() {
		const b = ENTRY.bird
		const el = document.createElement('canvas')
		el.width = b.w * b.frames.length
		el.height = b.h
		const ctx = el.getContext('2d')
		ctx.fillStyle = `rgb(${PALETTE[b.colour].join(',')})`
		b.frames.forEach((rows, f) => {
			rows.forEach((row, y) => {
				for (let x = 0; x < row.length; x++) {
					if (row[x] === '#') ctx.fillRect(f * b.w + x, y, 1, 1)
				}
			})
		})
		return el.toDataURL()
	}
	const starTiles = ref([])
	const twinklers = ref([])
	const cloudField = ref([])

	// The stream, rolled per visit like everything else here. Lanes advance by the
	// golden ratio from a seeded phase: consecutive puffs never share a lane and any
	// window of the stream still covers the width - a plain shuffle guarantees neither.
	function seedClouds(seed) {
		const c = ENTRY.cloudStream
		const phase = hash1(1, seed + 7)
		return Array.from({ length: c.count }, (_, i) => ({
			left: c.leftMin + ((phase + i * 0.618034) % 1) * (c.leftMax - c.leftMin),
			scale:
				(c.scaleFrom + (c.scaleTo - c.scaleFrom) * (i / (c.count - 1))) *
				(1 + (hash1(i, seed + 19) - 0.5) * c.scaleJitter),
			start: c.startAt + i * c.stagger + (hash1(i, seed + 31) - 0.5) * c.startJitter,
		}))
	}

	// Placed off the visit seed like everything else here, so no two visits blink in
	// the same places. Kept inside the band of sky the star mask actually shows.
	function seedTwinklers(seed) {
		const { count, periodMs, spreadVh } = ENTRY.stars.twinkle
		const hues = ENTRY.stars.colors
		return Array.from({ length: count }, (_, i) => {
			const pick = Math.min(hues.length - 1, Math.floor(hash1(i, seed + 37) * hues.length))
			return {
				left: hash1(i, seed + 11) * 100,
				top: hash1(i, seed + 23) * spreadVh,
				colour: `rgb(${PALETTE[hues[pick]].join(',')})`,
				delay: hash1(i, seed + 53) * periodMs,
			}
		})
	}

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

	const skyLifeStyle = computed(() => ({
		opacity: starFade.value.toFixed(3),
		display: starFade.value > 0 ? null : 'none',
	}))

	// inclusive of both ends, and flat across them — rounding a float instead biases
	// hard toward the middle of a short range
	const randInt = ([lo, hi]) => lo + Math.floor(Math.random() * (hi - lo + 1))
	const tint = names =>
		`rgb(${PALETTE[names[Math.floor(Math.random() * names.length)]].join(',')})`

	// Both streams roll every value per spawn, so no two crossings match. The spawner
	// owns the gap, the hidden-tab skip and the self-removal — see useSkySpawner.
	const { items: meteors, remove: removeMeteor } = useSkySpawner({
		gapMs: ENTRY.meteor.gapMs,
		make: () => {
			const m = ENTRY.meteor
			return {
				style: {
					'--y': `${randIn(m.y).toFixed(1)}%`,
					'--x': `${randIn(m.x).toFixed(1)}%`,
					'--angle': `${randIn(m.angle).toFixed(1)}deg`,
					'--len': `${Math.round(randIn(m.len))}px`,
					'--travel': `${randIn(m.travelVw).toFixed(1)}vw`,
					'--dur': `${Math.round(randIn(m.durMs))}ms`,
					'--peak': randIn(m.peak).toFixed(2),
					'--tint': tint(m.tints),
				},
			}
		},
	})

	// A flock: one container crossing the frame, with its birds strung out inside it.
	// The formation is loose on purpose — a rank of evenly spaced birds all beating
	// together reads as a machine.
	const { items: flocks, remove: removeFlock } = useSkySpawner({
		gapMs: ENTRY.flock.gapMs,
		make: () => {
			const f = ENTRY.flock
			const bird = ENTRY.bird
			const scale = randInt(f.scale)
			const flap = Math.round(randIn(f.flapMs))
			const sheet = bird.frames.length * bird.w * scale
			const rightward = Math.random() < 0.5
			return {
				style: {
					'--y': `${randIn(f.y).toFixed(1)}%`,
					'--from': rightward ? '-14vw' : '114vw',
					'--travel': `${(randIn(f.travelVw) * (rightward ? 1 : -1)).toFixed(1)}vw`,
					'--drift': `${randIn(f.driftVh).toFixed(1)}vh`,
					'--dur': `${Math.round(randIn(f.durMs))}ms`,
					'--peak': randIn(f.peak).toFixed(2),
				},
				// Gaps accumulate from independent rolls rather than scaling one roll by
				// the index, so the spacing inside a flock is uneven the way a real one is.
				birds: (() => {
					let x = 0
					return Array.from({ length: randInt(f.count) }, () => {
						const at = {
							left: Math.round(x),
							top: Math.round(randIn(f.jitterPx)),
							w: bird.w * scale,
							h: bird.h * scale,
							sheet,
							flap,
							// its own phase, so the wingbeats never line up
							delay: Math.round(Math.random() * flap),
						}
						x += randIn(f.gapPx)
						return at
					})
				})(),
			}
		},
	})

	function birdStyle(b) {
		return {
			left: `${b.left}px`,
			top: `${b.top}px`,
			width: `${b.w}px`,
			height: `${b.h}px`,
			backgroundImage: `url(${birdSheet.value})`,
			backgroundSize: `${b.sheet}px ${b.h}px`,
			animationDuration: `${b.flap}ms`,
			animationDelay: `-${b.delay}ms`,
			'--sheet': `-${b.sheet}px`,
			'--frames': ENTRY.bird.frames.length,
		}
	}

	// Negative delays, so they are already mid-cycle on the first frame rather than all
	// lighting together and then drifting apart.
	function twinkleStyle(tw) {
		return {
			left: `${tw.left.toFixed(2)}%`,
			top: `${tw.top.toFixed(2)}vh`,
			background: tw.colour,
			animationDuration: `${ENTRY.stars.twinkle.periodMs}ms`,
			animationDelay: `-${Math.round(tw.delay)}ms`,
		}
	}

	// A cumulus as a union of irregular lobes with a noise-warped boundary. Lobes
	// alone scallop into clip art; noise alone drifts into an amoeba. Together
	// the shape stays readable while the edge stays believable. Each lobe then
	// shades under its own crown, so the sprite has volume rather than a flat
	// top-to-bottom ramp.
	function drawCloud(seed) {
		const cfg = ENTRY.cloud
		const { spriteW: w, spriteH: h } = cfg
		const shades = cfg.shades.map(name => PALETTE[name])
		const el = document.createElement('canvas')
		el.width = w
		el.height = h
		const ctx = el.getContext('2d')
		const img = ctx.createImageData(w, h)
		const px = img.data
		const levels = shades.length
		const span = ([lo, hi], r) => lo + (hi - lo) * r

		// lobes sit along the base, biggest toward the middle
		const lobes = Array.from({ length: cfg.lobes }, (_, k) => {
			const centre = 1 - Math.abs((k + 0.5) / cfg.lobes - 0.5) * 2
			return {
				cx: 0.12 + 0.76 * ((k + 0.5) / cfg.lobes) + (hash1(k, seed) - 0.5) * cfg.lobeJitter,
				cy: cfg.baseAt - span(cfg.lobeRise, hash1(k, seed + 11)) * (0.4 + centre),
				rx: span(cfg.lobeRx, hash1(k, seed + 23)) * (0.6 + 0.6 * centre),
				ry: span(cfg.lobeRy, hash1(k, seed + 37)) * (0.6 + 0.6 * centre),
			}
		})

		// signed field: > 0 inside the cloud
		const mask = new Uint8Array(w * h)
		for (let y = 0; y < h; y++) {
			const t = y / (h - 1)
			for (let x = 0; x < w; x++) {
				const u = x / (w - 1)
				let d = -1
				for (const l of lobes) {
					const dx = (u - l.cx) / l.rx
					const dy = (t - l.cy) / l.ry
					d = Math.max(d, 1 - Math.hypot(dx, dy))
				}
				d += (fbm2(u * cfg.warpFreq, t * cfg.warpFreq, seed) - 0.5) * cfg.warp
				// flat cumulus underside, ruffled just enough to not be a ruler line
				const base = cfg.baseAt + (fbm1(u * 3, seed + 61) - 0.5) * cfg.baseRuffle
				if (t > base) d -= (t - base) * 12
				const i = y * w + x
				if (d > 0) mask[i] = 1
				else if (d > -cfg.feather) mask[i] = ditherIndex(1 + d / cfg.feather, 2, x, y)
			}
		}

		// despeckle: the dithered edge strands lone pixels that read as dirt
		const solidAt = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : mask[y * w + x])
		const cleaned = Uint8Array.from(mask)
		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				if (!mask[y * w + x]) continue
				let n = 0
				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++) if (dx || dy) n += solidAt(x + dx, y + dy)
				}
				if (n < cfg.minNeighbours) cleaned[y * w + x] = 0
			}
		}

		for (let x = 0; x < w; x++) {
			const u = x / (w - 1)
			// distance below this column's current crown, so light dies away
			// under each lobe separately instead of ramping the whole sprite
			let depth = -1
			for (let y = 0; y < h; y++) {
				if (!cleaned[y * w + x]) {
					depth = -1
					continue
				}
				depth = depth < 0 ? 0 : depth + 1
				const crown = clamp01(1 - depth / cfg.shadeDepth)
				const side = 0.5 + (0.5 - u) * cfg.sideLight * -ENTRY.ridgeLight
				const lit = clamp01(crown * 0.7 + side * 0.3)
				const [r, g, b] = shades[ditherIndex(lit, levels, x, y)]
				const i = (y * w + x) * 4
				px[i] = r
				px[i + 1] = g
				px[i + 2] = b
				px[i + 3] = 255
			}
		}

		ctx.putImageData(img, 0, 0)
		return el.toDataURL()
	}

	// One tile of first-evening stars. Two of these at coprime sizes are what stop the
	// field reading as wallpaper — see ENTRY.stars.
	function drawStarTile(seed, layer) {
		const { tile, count } = layer
		// fillStyle wants a string; the colour still comes from the one palette
		const colors = ENTRY.stars.colors.map(name => `rgb(${PALETTE[name].join(',')})`)
		const el = document.createElement('canvas')
		el.width = tile
		el.height = tile
		const ctx = el.getContext('2d')
		for (let i = 0; i < count; i++) {
			const x = Math.floor(hash1(i, seed) * tile)
			const y = Math.floor(hash1(i, seed + 101) * tile)
			const pick = hash1(i, seed + 202)
			const bright = hash1(i, seed + 303)
			ctx.globalAlpha = 0.35 + bright * 0.65
			ctx.fillStyle = colors[Math.floor(pick * colors.length)]
			// a couple of the brightest read as two cells; the rest are single
			const size = bright > 0.92 ? 2 : 1
			ctx.fillRect(x, y, size, size)
		}
		return el.toDataURL()
	}

	// The dusk sky, cut on the same grid the ranges are, with the sun and its corona
	// drawn into it. One canvas rather than a gradient plus a sprite: the glow has to
	// dither into the sky on the same grid, or it reads as a light pasted over a wash.
	function drawSky(el, box) {
		const cell = ENTRY.ridgeCellPx
		const w = Math.max(8, Math.round(box.w / cell))
		const h = Math.max(8, Math.round(box.h / cell))
		el.width = w
		el.height = h
		const ctx = el.getContext('2d')
		const img = ctx.createImageData(w, h)
		const px = img.data
		const ramp = ENTRY.sky.map(name => PALETTE[name])
		const top = ramp.length - 1
		// one rung of the ramp, the unit the sky's two fields are sized in
		const F = ENTRY.skyField
		const rung1 = 1 / top
		const sun = ENTRY.sun
		const disc = PALETTE[sun.disc]
		const rim = PALETTE[sun.rim]
		const cx = sun.x * w
		const cy = sun.y * h
		const reach = sun.r * sun.coronaR

		for (let y = 0; y < h; y++) {
			// gamma keeps the bright band against the horizon instead of letting it
			// spread halfway up the frame
			const rung = Math.pow(y / (h - 1), ENTRY.skyGamma)
			for (let x = 0; x < w; x++) {
				const d = Math.hypot(x - cx, y - cy)
				let col
				if (d <= sun.r) col = disc
				else if (d <= sun.r + 1.5) col = rim
				else {
					// Haze at altitude plus grain, both in ramp steps, so the bands
					// stop being level sets of a smooth field — see ENTRY.skyField.
					// The colour is untouched: this only decides which of the twelve
					// entries a cell lands on, so the sky is still exactly its ramp.
					const lit =
						rung +
						(fbm2(x / F.driftCells, y / F.driftRows, ENTRY.ridgeSeed) - 0.5) *
							F.drift *
							rung1 +
						(fbm2(x / F.mottleCells, y / F.mottleCells, ENTRY.ridgeSeed + 3) - 0.5) *
							F.mottle *
							rung1
					// the corona climbs the sky's own ramp rather than adding light on
					// top, so every pixel of it is still exactly a palette entry
					const g = clamp01(1 - (d - sun.r) / (reach - sun.r))
					const step =
						seamIndex(lit, ramp.length, x, y, ENTRY.skySeam, ENTRY.skyJitter) +
						ditherIndex(g * g, sun.coronaLift, x, y)
					col = ramp[step > top ? top : step]
				}
				const i = (y * w + x) * 4
				px[i] = col[0]
				px[i + 1] = col[1]
				px[i + 2] = col[2]
				px[i + 3] = 255
			}
		}
		ctx.putImageData(img, 0, 0)
	}

	// One seed per visit for the weather — clouds, twinklers, star tiles — so no
	// two visits share a sky. The ranges are NOT on it: they cut from the authored
	// ENTRY.ridgeSeed, so every visit lands in the composition chosen by eye.
	let visitSeed = 1

	function cut() {
		frame = { w: window.innerWidth, h: window.innerHeight }
		if (skyEl.value) drawSky(skyEl.value, frame)
		bands.forEach((band, i) => {
			if (!ridgeEls[i]) return
			const sprite = drawRidge(ridgeEls[i], band, ENTRY.ridgeSeed, frame)
			if (sprite.vent) vent.value = { ...sprite.vent, cell: sprite.cell, band }
		})
	}

	// only when the frame really changed shape (see ENTRY.ridgeReshape)
	const onResize = useRafThrottle(() => {
		const reshaped =
			window.innerWidth !== frame.w ||
			Math.abs(window.innerHeight / frame.h - 1) > ENTRY.ridgeReshape
		if (reshaped) cut()
	})

	// The arrival is viewports down the page, so its sprites are cut a frame after
	// mount: the opening frame is not made to wait for ranges it cannot see yet.
	let deferred = 0
	onMounted(() => {
		visitSeed = Math.floor(Math.random() * 1e5) + 1
		window.addEventListener('resize', onResize, { passive: true })
		deferred = requestAnimationFrame(() => {
			cut()
			cloudField.value = seedClouds(visitSeed)
			cloudSprites.value = Array.from({ length: ENTRY.cloud.variants }, (_, i) =>
				drawCloud(visitSeed + i * 137)
			)
			starTiles.value = ENTRY.stars.layers.map((layer, i) =>
				drawStarTile(visitSeed + i * 991, layer)
			)
			twinklers.value = seedTwinklers(visitSeed)
			birdSheet.value = drawBirdSheet()
		})
	})

	onBeforeUnmount(() => {
		cancelAnimationFrame(deferred)
		window.removeEventListener('resize', onResize)
	})
</script>

<style scoped lang="scss">
	// Alien dusk, cut from the shared palette on the ranges' own grid (see drawSky) —
	// the colours used to be three hex literals here, the last thing in the scene that
	// was neither stepped nor on the palette.
	.entry__sky {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		image-rendering: pixelated;
	}

	// Stars only over the dark upper sky — masked out well before the horizon
	// glow, since a bright horizon washes them out.
	// Mouse parallax rides `translate`, leaving `transform` to the scroll-scrubbed
	// motion on the same elements. Each layer bleeds by its own depth so the
	// shift can never uncover an edge.
	.entry__stars,
	.entry__cloud,
	.entry__ridge,
	.entry__smoke {
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
	}

	.entry__sky-life {
		position: absolute;
		inset: 0;
	}

	// Meteor: pixel head plus a fading streak, rotated onto its travel angle — the same
	// shape the site starfield's comets use, tuned rarer and shallower for a landscape.
	.entry__meteor {
		position: absolute;
		top: var(--y);
		left: var(--x);
		width: var(--len);
		height: 2px;
		color: var(--tint);
		background: linear-gradient(to left, currentColor, transparent);
		opacity: 0;
		transform: rotate(var(--angle));
		transform-origin: center;
		image-rendering: pixelated;
		animation: entry-meteor var(--dur) linear forwards;
	}

	.entry__meteor::after {
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		width: 3px;
		height: 3px;
		margin-top: -1px;
		background: currentColor;
	}

	@keyframes entry-meteor {
		0% {
			transform: rotate(var(--angle)) translateX(0);
			opacity: 0;
		}
		14% {
			opacity: var(--peak);
		}
		82% {
			opacity: var(--peak);
		}
		100% {
			transform: rotate(var(--angle)) translateX(var(--travel));
			opacity: 0;
		}
	}

	// Self-running motion, so it is stepped — the house rule for anything on its own
	// clock. Three steps is enough to read as a blink rather than a fade.
	.entry__twinkle {
		position: absolute;
		width: 2px;
		height: 2px;
		animation-name: entry-twinkle;
		animation-timing-function: steps(3, end);
		animation-iteration-count: infinite;
	}

	@keyframes entry-twinkle {
		0%,
		55% {
			opacity: 1;
		}
		70%,
		100% {
			opacity: 0.2;
		}
	}

	// A flock crosses as one container; the birds are strung out inside it.
	.entry__flock {
		position: absolute;
		top: var(--y);
		left: var(--from);
		opacity: 0;
		animation: entry-flock var(--dur) linear forwards;
	}

	@keyframes entry-flock {
		0% {
			transform: translate3d(0, 0, 0);
			opacity: 0;
		}
		10% {
			opacity: var(--peak);
		}
		88% {
			opacity: var(--peak);
		}
		100% {
			transform: translate3d(var(--travel), var(--drift), 0);
			opacity: 0;
		}
	}

	// Wingbeats are on their own clock, so they are stepped — and stepping a sprite
	// sheet by background-position is what the rule is describing in the first place.
	.entry__bird {
		position: absolute;
		background-repeat: no-repeat;
		image-rendering: pixelated;
		animation-name: entry-flap;
		// the step count is the sprite's frame count, handed down as a custom property so
		// the sheet stays the only place that knows how many frames it has
		animation-timing-function: steps(var(--frames), end);
		animation-iteration-count: infinite;
	}

	@keyframes entry-flap {
		from {
			background-position: 0 0;
		}
		to {
			background-position: var(--sheet) 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.entry__twinkle,
		.entry__meteor,
		.entry__flock,
		.entry__bird,
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

	// The smoke shares the near band's box and its depth: it stands on that rock, so
	// it has to lean with it or the plume slides off its own chimney.
	.entry__ridge,
	.entry__smoke {
		position: absolute;
		bottom: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		width: calc(100% + var(--depth, 0) * 2px);
		// hard-edged silhouettes, like the rest of the sprite work
		image-rendering: pixelated;
	}

	// A puff is one cell, climbing and spreading in whole cells: `translate` carries
	// the climb and `scale` the spread, two animations on two properties over the same
	// clock, so each can step on its own count and neither lands on half a cell.
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

	// Inside the deck: cloud closes right over the lens. Deliberately a flat
	// wash — any shaped gradient at full-frame size reads as a shape sitting on
	// the screen. All the form here comes from the puff sprites in front of it.
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

<template>
	<!-- Atmospheric entry: a cloud deck rushes up and closes over the camera,
	     the dusk sky takes over behind it, and the surface ridgelines settle in —
	     the journey ends standing on the planet. All scroll-scrubbed. -->
	<div class="entry" aria-hidden="true">
		<div class="entry__sky" :style="skyStyle" />
		<div
			v-for="(cloud, i) in ENTRY.clouds"
			:key="i"
			class="entry__cloud"
			:style="cloudStyle(cloud, i)"
		/>
		<!-- inside the deck: cloud closes over the lens and hides the sky handoff -->
		<div class="entry__deck" :style="deckStyle" />
		<canvas ref="farEl" class="entry__ridge" :style="ridgeStyle(ENTRY.far)" />
		<canvas ref="nearEl" class="entry__ridge" :style="ridgeStyle(ENTRY.near)" />
	</div>
</template>

<script setup>
	import { computed, onMounted, ref } from 'vue'
	import { ENTRY } from '@/constants/journey'
	import { clamp01, smoothstep } from '@/js/math'
	import { ditherIndex, fbm1, fbm2, hash1, ridged1 } from '@/js/pixelNoise'

	const props = defineProps({
		// approach progress: 0 → still in space, 1 → landed
		progress: { type: Number, default: 0 },
	})

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
			transform:
				`translate3d(${drift.toFixed(1)}vw, ${y.toFixed(1)}vh, 0)` +
				` scale(${scale.toFixed(2)})` +
				// mirrored puffs: cheap variety across a deck this dense. Last in
				// the list, so it flips the sprite and not the drift.
				(cloud.flip ? ' scaleX(-1)' : ''),
		}
	}

	// each ridge band lifts into place on its own beat — the two-plane parallax
	function ridgeStyle(band) {
		const t = smoothstep(clamp01((props.progress - band.revealAt) / ENTRY.ridgeSettle))
		return {
			display: t > 0 ? null : 'none',
			opacity: t.toFixed(3),
			height: `${band.heightVh}vh`,
			transform: `translate3d(0, ${((1 - t) * band.liftVh).toFixed(1)}vh, 0)`,
		}
	}

	const farEl = ref(null)
	const nearEl = ref(null)
	// three cloud sprites drawn once per visit; each puff picks one by index
	const cloudSprites = ref([])

	// Shaded relief, drawn once per visit and upscaled pixelated by CSS. Each
	// column is lit by the way its face turns, then darkened with depth into the
	// mass, and the result is dithered onto the band's ramp — the same trick the
	// planet sprite uses, so the ridges gain volume without leaving the grid.
	function drawRidge(el, band, visitSeed) {
		const w = ENTRY.ridgeRes
		const h = Math.round(w * ENTRY.ridgeAspect)
		el.width = w
		el.height = h
		const ctx = el.getContext('2d')
		const img = ctx.createImageData(w, h)
		const px = img.data
		const levels = band.shades.length

		// the whole profile first, so a column can be compared with its neighbour
		const profile = new Array(w)
		for (let x = 0; x < w; x++) {
			const u = (x / w) * band.freq
			const seed = band.seed + visitSeed
			const shape =
				ENTRY.ridgeBlend * ridged1(u, seed) + (1 - ENTRY.ridgeBlend) * fbm1(u, seed)
			profile[x] = band.base + shape * band.amp
		}

		const put = (x, y, [r, g, b]) => {
			const i = (y * w + x) * 4
			px[i] = r
			px[i + 1] = g
			px[i + 2] = b
			px[i + 3] = 255
		}

		for (let x = 0; x < w; x++) {
			const ridge = profile[x]
			const yTop = Math.round(h * (1 - ridge))
			// which way this face turns decides how much of the sun it catches,
			// measured across a span so the facets come out broad
			const span = ENTRY.ridgeSlopeSpan
			const lo = profile[Math.max(0, x - span)]
			const hi = profile[Math.min(w - 1, x + span)]
			const slope = (hi - lo) / (2 * span)
			const face = 0.5 + slope * band.slopeGain * ENTRY.ridgeLight
			const rf = ENTRY.ridgeRoughFreq / w
			for (let y = yTop; y < h; y++) {
				// the face is a band under the crest; below it the mass goes dark
				const depth = Math.min(1, (y - yTop) / band.faceDepth)
				// crag texture in 2D — sampled per column only, it stripes
				const rough =
					(fbm2(x * rf, y * rf, band.seed + visitSeed + 5) - 0.5) * ENTRY.ridgeRough
				const lit = clamp01((face + rough) * (1 - depth * ENTRY.ridgeDepthFade))
				put(x, y, band.shades[ditherIndex(lit, levels, x, y)])
			}
			// the sunlit rim along the very top of the ridge
			put(x, yTop, band.crest)
		}

		ctx.putImageData(img, 0, 0)
	}

	// A cumulus in profile: a handful of overlapping round lobes for the bulbous
	// crown, a flat-ish base, lit from above and from the sun's side, then
	// dithered down into the underside. Beats a flat blob for the same few colours.
	function drawCloud(seed) {
		const cfg = ENTRY.cloud
		const { spriteW: w, spriteH: h, shades } = cfg
		const el = document.createElement('canvas')
		el.width = w
		el.height = h
		const ctx = el.getContext('2d')
		const img = ctx.createImageData(w, h)
		const px = img.data
		const levels = shades.length

		// lobes spread across the width, each its own size — the silhouette is
		// their upper envelope
		const span = (lo, hi, r) => lo + (hi - lo) * r
		const lobes = Array.from({ length: cfg.lobes }, (_, k) => ({
			cx: (k + 0.5) / cfg.lobes + (hash1(k, seed) - 0.5) * 0.16,
			r: span(...cfg.lobeRadius, hash1(k, seed + 11)),
			h: span(...cfg.lobeHeight, hash1(k, seed + 23)),
		}))

		for (let x = 0; x < w; x++) {
			const u = x / (w - 1)
			let crown = 0
			for (const l of lobes) {
				const d = (u - l.cx) / l.r
				if (d > -1 && d < 1) crown = Math.max(crown, l.h * Math.sqrt(1 - d * d))
			}
			if (crown <= 0) continue
			const bottom = h - 1 - Math.round(fbm1(u * 2.3, seed + 41) * cfg.baseJitter)
			const top = Math.round(bottom - crown * (h - 1))
			if (top >= bottom) continue
			const mass = bottom - top
			for (let y = top; y <= bottom; y++) {
				// crown catches the light, underside falls away; the sun's side
				// adds the lateral tilt that keeps it from reading symmetrical
				const depth = (y - top) / mass
				const side = 0.5 + (0.5 - u) * cfg.sideLight * -ENTRY.ridgeLight
				const lit = clamp01((1 - depth) * 0.72 + side * 0.38)
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

	onMounted(() => {
		const visitSeed = Math.floor(Math.random() * 1e5) + 1
		drawRidge(farEl.value, ENTRY.far, visitSeed)
		drawRidge(nearEl.value, ENTRY.near, visitSeed)
		cloudSprites.value = Array.from({ length: ENTRY.cloud.variants }, (_, i) =>
			drawCloud(visitSeed + i * 137)
		)
	})
</script>

<style scoped lang="scss">
	// alien dusk in the planet's dusty palette; opaque so the starfield vanishes
	$sky-top: #150a0d;
	$sky-mid: #5c3a38;
	$sky-horizon: #b97a5e;

	.entry__sky {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, $sky-horizon 0%, $sky-mid 42%, $sky-top 100%);
	}

	// pixel cloud puff: a procedural sprite (see drawCloud), upscaled blocky
	.entry__cloud {
		position: absolute;
		top: 0;
		width: 100px;
		aspect-ratio: 17 / 9;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		image-rendering: pixelated;
	}

	.entry__ridge {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		// hard-edged silhouettes, like the rest of the sprite work
		image-rendering: pixelated;
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

<template>
	<!-- Atmospheric entry: a cloud deck rushes up and closes over the camera,
	     the dusk sky takes over behind it, and the surface ridgelines settle in —
	     the journey ends standing on the planet. All scroll-scrubbed. -->
	<div class="entry" :style="pointerStyle" aria-hidden="true">
		<div class="entry__sky" :style="skyStyle" />
		<div class="entry__stars" :style="starStyle" />
		<div
			v-for="(cloud, i) in ENTRY.clouds"
			:key="i"
			class="entry__cloud"
			:style="cloudStyle(cloud, i)"
		/>
		<!-- inside the deck: cloud closes over the lens and hides the sky handoff -->
		<div class="entry__deck" :style="deckStyle" />
		<canvas
			ref="farEl"
			class="entry__ridge"
			:style="ridgeStyle(ENTRY.far, ENTRY.parallax.far)"
		/>
		<canvas
			ref="nearEl"
			class="entry__ridge"
			:style="ridgeStyle(ENTRY.near, ENTRY.parallax.near)"
		/>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { ENTRY } from '@/constants/journey'
	import { FINE_POINTER_QUERY } from '@/constants/viewport'
	import { clamp01, smoothstep } from '@/js/math'
	import { ditherIndex, fbm1, fbm2, hash1, ridged1 } from '@/js/pixelNoise'

	const props = defineProps({
		// approach progress: 0 → still in space, 1 → landed
		progress: { type: Number, default: 0 },
	})

	// Mouse parallax, the same contract the starfield uses: axes normalised to
	// -1..1 and negated, published as --mx/--my, and each layer multiplies them
	// by its own --depth. It rides the CSS `translate` property so it never
	// collides with the scroll-scrubbed `transform` on the same elements.
	const pointer = ref({ x: 0, y: 0 })
	const pointerStyle = computed(() => ({ '--mx': pointer.value.x, '--my': pointer.value.y }))

	const onPointerMove = useRafThrottle(event => {
		pointer.value = {
			x: -((event.clientX / window.innerWidth - 0.5) * 2),
			y: -((event.clientY / window.innerHeight - 0.5) * 2),
		}
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
			'--depth': ENTRY.parallax.cloud,
			transform:
				`translate3d(${drift.toFixed(1)}vw, ${y.toFixed(1)}vh, 0)` +
				` scale(${scale.toFixed(2)})`,
		}
	}

	// each ridge band lifts into place on its own beat — the two-plane parallax
	function ridgeStyle(band, depth) {
		const t = smoothstep(clamp01((props.progress - band.revealAt) / ENTRY.ridgeSettle))
		return {
			display: t > 0 ? null : 'none',
			'--depth': depth,
			opacity: t.toFixed(3),
			height: `${band.heightVh}vh`,
			transform: `translate3d(0, ${((1 - t) * band.liftVh).toFixed(1)}vh, 0)`,
		}
	}

	const farEl = ref(null)
	const nearEl = ref(null)
	// three cloud sprites drawn once per visit; each puff picks one by index
	const cloudSprites = ref([])
	const starTile = ref('')

	// the first stars come out once the sky has settled, over the dark top of it
	const starStyle = computed(() => {
		const { appearStart, appearEnd, maxOpacity, tile } = ENTRY.stars
		const t = clamp01((props.progress - appearStart) / (appearEnd - appearStart))
		return {
			opacity: (smoothstep(t) * maxOpacity).toFixed(3),
			display: t > 0 && starTile.value ? null : 'none',
			'--depth': ENTRY.parallax.stars,
			backgroundImage: `url(${starTile.value})`,
			backgroundSize: `${tile}px ${tile}px`,
		}
	})

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

	// A cumulus as a union of irregular lobes with a noise-warped boundary. Lobes
	// alone scallop into clip art; noise alone drifts into an amoeba. Together
	// the shape stays readable while the edge stays believable. Each lobe then
	// shades under its own crown, so the sprite has volume rather than a flat
	// top-to-bottom ramp.
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

	// One repeating tile of first-evening stars, so it scales to any viewport
	// the way the site starfield does.
	function drawStarTile(seed) {
		const { tile, count, colors } = ENTRY.stars
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

	onMounted(() => {
		const visitSeed = Math.floor(Math.random() * 1e5) + 1
		drawRidge(farEl.value, ENTRY.far, visitSeed)
		drawRidge(nearEl.value, ENTRY.near, visitSeed)
		cloudSprites.value = Array.from({ length: ENTRY.cloud.variants }, (_, i) =>
			drawCloud(visitSeed + i * 137)
		)
		starTile.value = drawStarTile(visitSeed)
		// no cursor on touch devices, and their drag-scrolls fire pointermove
		if (!prefersReducedMotion() && window.matchMedia(FINE_POINTER_QUERY).matches) {
			window.addEventListener('pointermove', onPointerMove, { passive: true })
		}
	})

	onBeforeUnmount(() => window.removeEventListener('pointermove', onPointerMove))
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

	// Stars only over the dark upper sky — masked out well before the horizon
	// glow, since a bright horizon washes them out.
	// Mouse parallax rides `translate`, leaving `transform` to the scroll-scrubbed
	// motion on the same elements. Each layer bleeds by its own depth so the
	// shift can never uncover an edge.
	.entry__stars,
	.entry__cloud,
	.entry__ridge {
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
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

	.entry__ridge {
		position: absolute;
		bottom: calc(var(--depth, 0) * -1px);
		left: calc(var(--depth, 0) * -1px);
		width: calc(100% + var(--depth, 0) * 2px);
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

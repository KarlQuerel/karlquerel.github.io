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
			:style="cloudStyle(cloud)"
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
	function cloudStyle(cloud) {
		const t = clamp01((props.progress - cloud.start) / ENTRY.cloudTravel)
		const ease = t * t
		const y = ENTRY.cloudFromVh - (ENTRY.cloudFromVh - ENTRY.cloudToVh) * ease
		const drift = (cloud.left - 50) * ENTRY.cloudSpread * ease
		const scale = cloud.scale * (1 + ENTRY.cloudApproach * ease)
		return {
			left: `${cloud.left}vw`,
			display: t > 0 && t < 1 ? null : 'none',
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

	// dependency-free 1D value noise for the ridgelines, seeded per visit
	const farEl = ref(null)
	const nearEl = ref(null)

	function hash1(i, seed) {
		let n = Math.imul(i, 374761393) ^ Math.imul(seed, 951274213)
		n = Math.imul(n ^ (n >>> 13), 1274126177)
		return ((n ^ (n >>> 16)) >>> 0) / 4294967295
	}

	function noise1(x, seed) {
		const i = Math.floor(x)
		return hash1(i, seed) + (hash1(i + 1, seed) - hash1(i, seed)) * smoothstep(x - i)
	}

	function fbm1(x, seed) {
		return (
			0.6 * noise1(x, seed) +
			0.3 * noise1(x * 2.7, seed + 7) +
			0.1 * noise1(x * 6.1, seed + 13)
		)
	}

	// silhouette with a single lit crest pixel per column; drawn once per visit,
	// upscaled pixelated by CSS
	function drawRidge(el, band, visitSeed) {
		const w = ENTRY.ridgeRes
		const h = Math.round(w * ENTRY.ridgeAspect)
		el.width = w
		el.height = h
		const ctx = el.getContext('2d')
		for (let x = 0; x < w; x++) {
			const ridge = band.base + fbm1((x / w) * band.freq, band.seed + visitSeed) * band.amp
			const yTop = Math.round(h * (1 - ridge))
			ctx.fillStyle = band.crest
			ctx.fillRect(x, yTop, 1, 1)
			ctx.fillStyle = band.body
			ctx.fillRect(x, yTop + 1, 1, h - yTop)
		}
	}

	onMounted(() => {
		const visitSeed = Math.floor(Math.random() * 1e5) + 1
		drawRidge(farEl.value, ENTRY.far, visitSeed)
		drawRidge(nearEl.value, ENTRY.near, visitSeed)
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

	// pixel cloud puff: one base cell, box-shadow copies fan out the lumps
	$cloud-px: 12px;

	.entry__cloud {
		position: absolute;
		top: 0;
		width: $cloud-px;
		height: $cloud-px;
		background: rgba(226, 204, 196, 0.9);
		box-shadow:
			#{-$cloud-px * 5} 0 rgba(226, 204, 196, 0.75),
			#{-$cloud-px * 4} 0 rgba(226, 204, 196, 0.9),
			#{-$cloud-px * 3} 0 rgba(226, 204, 196, 0.9),
			#{-$cloud-px * 2} 0 rgba(226, 204, 196, 0.9),
			#{-$cloud-px} 0 rgba(226, 204, 196, 0.9),
			#{$cloud-px} 0 rgba(226, 204, 196, 0.9),
			#{$cloud-px * 2} 0 rgba(226, 204, 196, 0.9),
			#{$cloud-px * 3} 0 rgba(226, 204, 196, 0.9),
			#{$cloud-px * 4} 0 rgba(226, 204, 196, 0.75),
			#{-$cloud-px * 3} #{-$cloud-px} rgba(226, 204, 196, 0.85),
			#{-$cloud-px * 2} #{-$cloud-px} rgba(226, 204, 196, 0.9),
			#{-$cloud-px} #{-$cloud-px} rgba(226, 204, 196, 0.85),
			0 #{-$cloud-px} rgba(226, 204, 196, 0.9),
			#{$cloud-px} #{-$cloud-px} rgba(226, 204, 196, 0.85),
			#{$cloud-px * 2} #{-$cloud-px} rgba(226, 204, 196, 0.8),
			#{-$cloud-px} #{-$cloud-px * 2} rgba(226, 204, 196, 0.8),
			0 #{-$cloud-px * 2} rgba(226, 204, 196, 0.8),
			#{-$cloud-px * 4} #{$cloud-px} rgba(226, 204, 196, 0.7),
			#{-$cloud-px * 3} #{$cloud-px} rgba(226, 204, 196, 0.8),
			#{-$cloud-px * 2} #{$cloud-px} rgba(226, 204, 196, 0.8),
			#{-$cloud-px} #{$cloud-px} rgba(226, 204, 196, 0.8),
			0 #{$cloud-px} rgba(226, 204, 196, 0.8),
			#{$cloud-px} #{$cloud-px} rgba(226, 204, 196, 0.8),
			#{$cloud-px * 2} #{$cloud-px} rgba(226, 204, 196, 0.7);
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

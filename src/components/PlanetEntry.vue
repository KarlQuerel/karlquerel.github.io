<template>
	<!-- Atmospheric entry: past the entry point the dusk sky swallows the stars,
	     a cloud deck rushes up past the camera, and the surface ridgelines settle
	     in — the journey ends standing on the planet. All scroll-scrubbed. -->
	<div class="entry" aria-hidden="true">
		<div class="entry__sky" :style="skyStyle" />
		<div
			v-for="(cloud, i) in ENTRY.clouds"
			:key="i"
			class="entry__cloud"
			:style="cloudStyle(cloud)"
		/>
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

	// dusk takeover: transparent space → opaque sky, then it holds
	const skyStyle = computed(() => {
		const t = clamp01((props.progress - ENTRY.skyStart) / (ENTRY.skyFull - ENTRY.skyStart))
		return { opacity: t.toFixed(3), display: t > 0 ? null : 'none' }
	})

	// each cloud rushes up past the camera inside its own window of the drop
	function cloudStyle(cloud) {
		const t = clamp01((props.progress - cloud.start) / ENTRY.cloudTravel)
		const y = ENTRY.cloudFromVh - (ENTRY.cloudFromVh - ENTRY.cloudToVh) * t
		return {
			left: `${cloud.left}vw`,
			display: t > 0 && t < 1 ? null : 'none',
			transform: `translate3d(0, ${y.toFixed(1)}vh, 0) scale(${cloud.scale})`,
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
	// under the contact content (z 3), over the planet stage showing through the pin
	.entry {
		position: absolute;
		inset: 0;
		z-index: 1;
		overflow: hidden;
		pointer-events: none;
	}

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
</style>

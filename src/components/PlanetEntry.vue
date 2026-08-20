<template>
	<!-- Atmospheric entry: the hull lights up on the interface, the dusk sky
	     swallows the stars, a cloud deck rushes up past the camera, and the
	     surface ridgelines settle in — the journey ends standing on the planet.
	     All scroll-scrubbed. -->
	<div class="entry" aria-hidden="true">
		<!-- oversized, so the buffet can shift it without exposing an edge -->
		<div
			class="entry__shake"
			:class="{ 'entry__shake--buffeting': buffet > 0 }"
			:style="shakeStyle"
		>
			<div class="entry__sky" :style="skyStyle" />
			<div
				v-for="(cloud, i) in ENTRY.clouds"
				:key="i"
				class="entry__cloud"
				:style="cloudStyle(cloud)"
			/>
			<canvas ref="farEl" class="entry__ridge" :style="ridgeStyle(ENTRY.far)" />
			<canvas ref="nearEl" class="entry__ridge" :style="ridgeStyle(ENTRY.near)" />
			<div class="entry__heat" :style="heatStyle" />
		</div>
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

	// friction bloom: ramps in on the interface, holds the peak, then cools —
	// a plain triangular envelope, eased on both sides
	const heat = computed(() => {
		const { start, peak, end, max } = ENTRY.heat
		const p = props.progress
		if (p <= start || p >= end) return 0
		const t = p < peak ? (p - start) / (peak - start) : 1 - (p - peak) / (end - peak)
		return smoothstep(clamp01(t)) * max
	})

	const heatStyle = computed(() => ({
		opacity: heat.value.toFixed(3),
		display: heat.value > 0 ? null : 'none',
	}))

	// buffet amplitude in px; the keyframes read it back as --buffet
	const buffet = computed(() => {
		const { start, end, maxPx } = ENTRY.buffet
		const t = clamp01((props.progress - start) / (end - start))
		// up and back down across the window, so it never cuts off mid-shake
		return t <= 0 || t >= 1 ? 0 : Math.sin(t * Math.PI) * maxPx
	})

	const shakeStyle = computed(() => ({ '--buffet': buffet.value.toFixed(2) }))

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
	// headroom for the buffet shift, so no edge ever peeks in
	$buffet-overscan: 8px;

	// under the contact content (z 3), over the planet stage showing through the pin
	.entry {
		position: absolute;
		inset: 0;
		z-index: 1;
		overflow: hidden;
		pointer-events: none;
	}

	// oversized so a few px of buffet never uncovers the layers behind the pin
	.entry__shake {
		position: absolute;
		inset: -#{$buffet-overscan};
	}

	// hard-stepped judder: the air is fighting the hull. Amplitude comes from
	// --buffet (scroll-scrubbed), so it dies out on its own at both ends.
	.entry__shake--buffeting {
		animation: entry-buffet 0.32s steps(1, end) infinite;
	}

	@keyframes entry-buffet {
		0% {
			transform: translate3d(0, 0, 0);
		}
		20% {
			transform: translate3d(calc(var(--buffet) * -1px), calc(var(--buffet) * 1px), 0);
		}
		40% {
			transform: translate3d(calc(var(--buffet) * 1px), calc(var(--buffet) * -0.5px), 0);
		}
		60% {
			transform: translate3d(calc(var(--buffet) * -0.5px), calc(var(--buffet) * -1px), 0);
		}
		80% {
			transform: translate3d(calc(var(--buffet) * 1px), calc(var(--buffet) * 0.5px), 0);
		}
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

	// The shock layer. Two stacked fields: a sheath wrapping the frame edges, and
	// the compression bloom off the leading edge below the frame. Hard colour
	// stops rather than smooth ramps — the banding is what keeps plasma reading
	// as pixel art at this size.
	.entry__heat {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(
				118% 108% at 50% 50%,
				rgba(255, 150, 62, 0) 52%,
				rgba(255, 150, 62, 0.24) 52%,
				rgba(255, 150, 62, 0.24) 68%,
				rgba(206, 76, 30, 0.44) 68%,
				rgba(206, 76, 30, 0.44) 84%,
				rgba(132, 38, 18, 0.6) 84%
			),
			radial-gradient(
				150% 130% at 50% 132%,
				rgba(255, 247, 226, 0.98) 0%,
				rgba(255, 247, 226, 0.98) 14%,
				rgba(255, 198, 112, 0.95) 14%,
				rgba(255, 198, 112, 0.95) 27%,
				rgba(242, 126, 48, 0.88) 27%,
				rgba(242, 126, 48, 0.88) 42%,
				rgba(178, 64, 32, 0.7) 42%,
				rgba(178, 64, 32, 0.7) 58%,
				rgba(98, 30, 18, 0.4) 58%,
				rgba(98, 30, 18, 0.4) 76%,
				rgba(40, 12, 10, 0.12) 76%,
				rgba(40, 12, 10, 0) 100%
			);
	}

	// the judder is the one thing here that runs on its own clock
	@media (prefers-reduced-motion: reduce) {
		.entry__shake--buffeting {
			animation: none;
		}
	}
</style>

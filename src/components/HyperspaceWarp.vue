<template>
	<!-- Scroll-driven lightspeed jump: a starfield warp whose speed, tail length
	     and opacity all scale with `intensity` (0 → off, 1 → full lightspeed).
	     Purely decorative. -->
	<canvas
		ref="canvasEl"
		class="hyperspace"
		:style="{ opacity: props.intensity }"
		aria-hidden="true"
	/>
</template>

<script setup>
	import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { HYPERSPACE } from '@/constants/hyperspace'

	const props = defineProps({
		// 0 → off, 1 → full lightspeed. Drives speed, tail length and opacity.
		intensity: { type: Number, default: 0 },
	})

	const lerp = (a, b, t) => a + (b - a) * t
	const rand = (min, max) => min + Math.random() * (max - min)
	const pick = arr => arr[Math.floor(Math.random() * arr.length)]

	const canvasEl = ref(null)
	let ctx = null
	let stars = []
	let rafId = 0
	let width = 0
	let height = 0
	let cx = 0
	let cy = 0

	// Drop a star at a random depth down the tunnel; pz tracks its previous depth
	// so each frame can draw the streak between the two projected positions.
	function spawn(star) {
		star.x = rand(-cx, cx)
		star.y = rand(-cy, cy)
		star.z = rand(1, width)
		star.pz = star.z
		star.color = pick(HYPERSPACE.colors)
		return star
	}

	function resize() {
		const el = canvasEl.value
		if (!el) return
		const scale = HYPERSPACE.pixelScale
		width = Math.max(1, Math.floor(el.clientWidth / scale))
		height = Math.max(1, Math.floor(el.clientHeight / scale))
		el.width = width
		el.height = height
		cx = width / 2
		cy = height / 2
		// Re-seed so the field always fills the current viewport.
		stars = Array.from({ length: HYPERSPACE.starCount }, () => spawn({}))
	}

	function frame() {
		const intensity = props.intensity
		if (intensity <= 0 || !ctx) {
			rafId = 0
			return
		}

		// Translucent wash instead of a hard clear → comet tails.
		ctx.fillStyle = `rgba(0, 0, 0, ${lerp(HYPERSPACE.trail[0], HYPERSPACE.trail[1], intensity)})`
		ctx.fillRect(0, 0, width, height)

		const speed = HYPERSPACE.speed * width * intensity
		ctx.lineCap = 'round'

		for (const star of stars) {
			star.z -= speed
			if (star.z < 1) {
				spawn(star)
				continue
			}
			const sx = cx + (star.x / star.z) * cx
			const sy = cy + (star.y / star.z) * cy
			const px = cx + (star.x / star.pz) * cx
			const py = cy + (star.y / star.pz) * cy
			star.pz = star.z

			const nearness = 1 - star.z / width
			ctx.strokeStyle = star.color
			ctx.lineWidth = lerp(HYPERSPACE.width[0], HYPERSPACE.width[1], nearness)
			ctx.beginPath()
			ctx.moveTo(px, py)
			ctx.lineTo(sx, sy)
			ctx.stroke()
		}

		rafId = requestAnimationFrame(frame)
	}

	// Run the loop only while the jump is engaged and motion is allowed.
	function ensureRunning() {
		if (!rafId && props.intensity > 0 && ctx && !prefersReducedMotion()) {
			rafId = requestAnimationFrame(frame)
		}
	}

	watch(() => props.intensity, ensureRunning)

	onMounted(() => {
		ctx = canvasEl.value.getContext('2d')
		resize()
		window.addEventListener('resize', resize, { passive: true })
		ensureRunning()
	})

	onBeforeUnmount(() => {
		if (rafId) cancelAnimationFrame(rafId)
		window.removeEventListener('resize', resize)
	})
</script>

<style scoped lang="scss">
	.hyperspace {
		position: absolute;
		inset: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		display: block;
		pointer-events: none;
		// Chunky upscaling of the half-res backing store keeps the streaks crisp
		// and pixel-flavoured rather than smoothly anti-aliased.
		image-rendering: pixelated;
	}
</style>

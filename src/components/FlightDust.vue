<template>
	<!-- The flight's depth cue: motes standing still in the world while the camera
	     moves through them. Scroll owns the travel, so nothing here runs on a clock —
	     stop scrolling and the field stops with you. Decorative. -->
	<canvas ref="canvasEl" class="dust" :style="canvasStyle" aria-hidden="true" />
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { HERO_FLYBY } from '@/constants/journey'
	import { clamp01, smoothstep } from '@/js/math'

	const props = defineProps({
		// world units the camera has run down the corridor
		travel: { type: Number, default: 0 },
		// 0 → the field is off, and the canvas drops out of the compositor entirely
		fade: { type: Number, default: 0 },
	})

	const canvasEl = ref(null)
	const canvasStyle = computed(() => ({
		display: props.fade > 0.01 ? null : 'none',
	}))

	// half-heights per world unit at unit depth — the frame's own field of view
	const FOCAL = 1 / Math.tan((HERO_FLYBY.fovDeg * Math.PI) / 360)

	let ctx = null
	let w = 0
	let h = 0
	let motes = []

	function seed() {
		const box = HERO_FLYBY.moteBox
		motes = Array.from({ length: HERO_FLYBY.motes }, () => ({
			x: (Math.random() - 0.5) * box,
			y: (Math.random() - 0.5) * box,
			z: Math.random() * box,
			// a mote's own share of the tail, so the field is not one comb of equals
			tail: 0.45 + Math.random() * 0.9,
			glow: 0.4 + Math.random() * 0.6,
		}))
	}

	// Setting width/height reallocates the backing store and clears it, so only do it
	// when the frame really changed size — this runs on every scrolled frame.
	function resize() {
		const el = canvasEl.value
		if (!el) return
		const scale = HERO_FLYBY.motePixelScale
		const next = [
			Math.max(1, Math.floor(el.clientWidth / scale)),
			Math.max(1, Math.floor(el.clientHeight / scale)),
		]
		if (next[0] === w && next[1] === h) return
		;[w, h] = next
		el.width = w
		el.height = h
	}

	// One frame of the field. A mote's depth wraps into a box that travels with the
	// camera: it leaves at the near plane and comes back in at the far one, which is
	// what makes a field of a few hundred read as endless. The tail runs along the way
	// we are going, so length is speed rather than blur.
	function draw() {
		if (!ctx || props.fade <= 0.01) return
		const { moteBox: box, moteTail, moteNear } = HERO_FLYBY
		resize()
		ctx.clearRect(0, 0, w, h)
		// over black, motes add up rather than paint over each other
		ctx.globalCompositeOperation = 'lighter'
		ctx.strokeStyle = HERO_FLYBY.moteColor
		ctx.lineWidth = 1
		const cx = w / 2
		const cy = h / 2
		// clip x is a half-width and clip y a half-height, so both project on h / 2
		const unit = h / 2
		for (const m of motes) {
			// the wrap: depth relative to a camera that has run `travel` down the box
			const z = ((((m.z - props.travel) % box) + box) % box) - box * 0.5
			if (z < moteNear) continue
			const zTail = z + moteTail * m.tail
			const k = (FOCAL * unit) / z
			const x = cx + m.x * k
			const y = cy - m.y * k
			// off frame with its tail: nothing to draw, and no stroke to pay for
			if (x < -unit || x > w + unit || y < -unit || y > h + unit) continue
			const kt = (FOCAL * unit) / zTail
			// near motes dim as they pass the lens, far ones as they reach the box edge
			const dist = Math.hypot(m.x, m.y, z)
			const near = smoothstep(clamp01((z - moteNear) / (1.8 - moteNear)))
			const far = 1 - smoothstep(clamp01((dist - box * 0.18) / (box * 0.5 - box * 0.18)))
			ctx.globalAlpha = clamp01(near * far * m.glow * props.fade)
			ctx.beginPath()
			ctx.moveTo(x, y)
			ctx.lineTo(cx + m.x * kt, cy - m.y * kt)
			ctx.stroke()
		}
		ctx.globalAlpha = 1
	}

	const redraw = useRafThrottle(draw)

	watch(() => [props.travel, props.fade], redraw)

	onMounted(() => {
		if (prefersReducedMotion()) return
		ctx = canvasEl.value.getContext('2d')
		seed()
		resize()
		draw()
		window.addEventListener('resize', redraw, { passive: true })
	})

	onBeforeUnmount(() => window.removeEventListener('resize', redraw))
</script>

<style scoped lang="scss">
	.dust {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: block;
		width: 100%;
		height: 100%;
		pointer-events: none;
		// chunky upscale of the half-res store: a mote is one art pixel, not a dot
		image-rendering: pixelated;
	}
</style>

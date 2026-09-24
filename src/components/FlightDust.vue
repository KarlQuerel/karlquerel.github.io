<template>
	<!-- The flight's depth cue: motes held in the world. Scroll owns the travel, so nothing runs on a clock. -->
	<canvas ref="canvasEl" class="dust" :style="canvasStyle" aria-hidden="true" />
</template>

<script setup>
	import { computed, onActivated, onMounted, ref, watch } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { ARRIVAL, HERO_FLYBY } from '@/constants/journey'
	import { paletteRgb } from '@/constants/palette'
	import { clamp01, randIn, smoothstep } from '@/js/math'

	const props = defineProps({
		// world units the camera has run down the corridor
		travel: { type: Number, default: 0 },
		// 0 → the field is off, and the canvas drops out of the compositor entirely
		fade: { type: Number, default: 0 },
		// the cursor's lean in the --mx/--my convention (usePointerParallax's pointer)
		lean: { type: Object, default: () => ({ x: 0, y: 0 }) },
		// 0 → vacuum, 1 → full re-entry burn (walks ARRIVAL.heatRamp band by band)
		heat: { type: Number, default: 0 },
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
	// the store is sized off the laid-out box, read again only after the window has resized
	let dirty = true

	function seed() {
		const box = HERO_FLYBY.moteBox
		motes = Array.from({ length: HERO_FLYBY.motes }, () => ({
			x: (Math.random() - 0.5) * box,
			y: (Math.random() - 0.5) * box,
			z: Math.random() * box,
			tail: randIn(HERO_FLYBY.moteTailShare),
			glow: randIn(HERO_FLYBY.moteGlow),
		}))
	}

	// Setting width/height reallocates and clears the backing store, so only do it on a real resize.
	function resize() {
		const el = canvasEl.value
		if (!el || !dirty) return
		dirty = false
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

	// A mote's depth wraps into a box travelling with the camera, which is what makes a few hundred endless.
	function draw() {
		if (!ctx || props.fade <= 0.01) return
		const { moteBox: box, moteTail, moteNear, moteLean, moteNearFade, moteFarFade } = HERO_FLYBY
		const [farFrom, farTo] = moteFarFade
		resize()
		ctx.clearRect(0, 0, w, h)
		// over black, motes add up rather than paint over each other
		ctx.globalCompositeOperation = 'lighter'
		// heat walks the whole field up the ember ramp, one hard band at a time
		const ramp = ARRIVAL.heatRamp
		const band = Math.min(ramp.length, Math.floor(props.heat * (ramp.length + 1)))
		ctx.strokeStyle = band === 0 ? HERO_FLYBY.moteColor : paletteRgb(ramp[band - 1])
		ctx.lineWidth = 1
		const cx = w / 2
		const cy = h / 2
		// clip x is a half-width and clip y a half-height, so both project on h / 2
		const unit = h / 2
		// the lean as a camera pan, projected per mote: near motes take more of it than far ones
		const lx = props.lean.x * moteLean
		const ly = props.lean.y * moteLean
		for (const m of motes) {
			// the wrap: depth relative to a camera that has run `travel` down the box
			const z = ((((m.z - props.travel) % box) + box) % box) - box * 0.5
			if (z < moteNear) continue
			const zTail = z + moteTail * m.tail
			const k = (FOCAL * unit) / z
			const x = cx + (m.x + lx) * k
			const y = cy - (m.y - ly) * k
			// off frame with its tail: nothing to draw, and no stroke to pay for
			if (x < -unit || x > w + unit || y < -unit || y > h + unit) continue
			const kt = (FOCAL * unit) / zTail
			// near motes dim as they pass the lens, far ones as they reach the box edge
			const dist = Math.hypot(m.x, m.y, z)
			const near = smoothstep(clamp01((z - moteNear) / (moteNearFade - moteNear)))
			const far =
				1 - smoothstep(clamp01((dist - box * farFrom) / (box * farTo - box * farFrom)))
			ctx.globalAlpha = clamp01(near * far * m.glow * props.fade)
			ctx.beginPath()
			ctx.moveTo(x, y)
			ctx.lineTo(cx + (m.x + lx) * kt, cy - (m.y - ly) * kt)
			ctx.stroke()
		}
		ctx.globalAlpha = 1
	}

	const redraw = useRafThrottle(draw)

	watch(() => [props.travel, props.fade, props.lean, props.heat], redraw)

	// a resize while parked by KeepAlive went unheard, so coming back re-reads the box too
	function resized() {
		dirty = true
		redraw()
	}
	useWindowListener('resize', resized)
	onActivated(resized)

	onMounted(() => {
		if (prefersReducedMotion()) return
		ctx = canvasEl.value.getContext('2d')
		seed()
		draw()
	})
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

<template>
	<!-- procedural low-res planet, upscaled pixelated. Decorative -->
	<!-- keyed on the renderer: a canvas WebGL has claimed can never give a 2D context to the fall-back -->
	<canvas
		:key="gpuLost"
		ref="canvasEl"
		class="planet"
		:class="{ 'planet--smooth': smooth }"
		:style="prefilter"
		aria-hidden="true"
	/>
</template>

<script setup>
	import {
		computed,
		nextTick,
		ref,
		watch,
		onActivated,
		onDeactivated,
		onMounted,
		onBeforeUnmount,
	} from 'vue'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { createPlanetGpu } from '@/js/planetGpu'
	import { createPlanetShader } from '@/js/planetShader'
	import PlanetWorker from '@/js/planet.worker.js?worker'
	import { PLANET } from '@/constants/planet'
	import { MOBILE_VIEWPORT_QUERY } from '@/constants/viewport'

	const props = defineProps({
		// False parks the shader. The globe keeps its canvas and seed, but a sweep under zero opacity is
		// the most expensive way to draw nothing — and the entry is exactly where it would happen.
		awake: { type: Boolean, default: true },
		// Longitude in radians, scroll-driven.
		spin: { type: Number, default: 0 },
		// Sun yaw in radians about the view's vertical. 0 keeps the fixed upper-left key light.
		lightYaw: { type: Number, default: 0 },
		// 0 -> full cloud deck, 1 -> clear. At landing magnification a deck reads as a checker layer.
		cloudThin: { type: Number, default: 0 },
		// the camera's magnification of the laid-out globe
		scale: { type: Number, default: 1 },
	})

	const canvasEl = ref(null)
	// The GPU draws a sweep in well under a millisecond; the CPU path (worker, then 2D blit) is the fall-back.
	let gpu = null
	const gpuLost = ref(false)
	let ctx = null
	let drawId = 0
	let lastDraw = -1
	const isMobile = window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
	// phones draw a smaller sprite — the per-pixel shader cost is resolution²
	const res = isMobile ? PLANET.resolutionMobile : PLANET.resolution
	const orbitFrameMs = 1000 / (isMobile ? PLANET.orbitFpsMobile : PLANET.orbitFps)

	// Device px each cell covers on screen: the dither aliases into checkers unless it is filtered to that.
	const boxCss = ref(0)
	const measureBox = () => (boxCss.value = canvasEl.value?.clientWidth ?? 0)
	const cellPx = computed(() => (boxCss.value * window.devicePixelRatio * props.scale) / res)
	const smooth = computed(() => cellPx.value < PLANET.crispFrom)
	// Shrunk, bilinear still skips cells, so blur away what the screen cannot hold; applied before the scale.
	const prefilter = computed(() => {
		const q = cellPx.value
		if (!q || q >= 1) return null
		const blur = Math.round((boxCss.value / res) * (1 / q - 1)) / 2
		return blur > 0 ? { filter: `blur(${blur}px)` } : null
	})
	useWindowListener('resize', measureBox)
	// this visit's world, fixed here so every renderer rolls the same terrain
	const seed = Math.floor(Math.random() * 1e5) + 1

	// One buffer, ping-ponged with the worker so a frame allocates nothing.
	let pixels = new Uint8ClampedArray(res * res * 4)
	let worker = null
	// the same shader on this thread: the first frame, and the fall-back where no worker can be had
	let shader = null
	// KeepAlive parks rather than unmounts, so this is the only thing that stops a sweep running on
	let parked = false

	// The last picture asked for, so a redraw is judged against what is there rather than the clock.
	let drawnSpin = null
	let drawnYaw = 0
	let drawnThin = 0
	// Reduced motion holds the globe's turn where it was first drawn; light and weather still follow.
	let heldSpin = 0
	const spinTarget = () => (prefersReducedMotion() ? heldSpin : props.spin)

	// The CPU waits for a whole art pixel of turn before paying for a sweep. The GPU's sweep is nearly free,
	// and a part-cell turn still flips the cells on an edge, so it follows every change: the glide stays fluid.
	const cellTurn = (2 * Math.PI) / res
	function moved() {
		const turn = gpu ? 0 : cellTurn
		const thin = gpu ? 0 : PLANET.cloudThinStep
		return (
			drawnSpin === null ||
			Math.abs(spinTarget() - drawnSpin) > turn ||
			Math.abs(props.lightYaw - drawnYaw) > turn ||
			Math.abs(props.cloudThin - drawnThin) > thin
		)
	}

	// wrapping the buffer costs no pixel copy — the ImageData is a view, not a store
	function blit() {
		ctx.putImageData(new ImageData(pixels, res, res), 0, 0)
	}

	// Ask for one sweep at `spin`. Angles are recorded now, so a flung scroll cannot queue one per frame.
	function render(spin) {
		drawnSpin = spin
		drawnYaw = props.lightYaw
		drawnThin = props.cloudThin
		if (gpu) {
			gpu.draw(spin, drawnYaw, drawnThin)
			return
		}
		if (!worker) {
			shader.draw(pixels, spin, drawnYaw, drawnThin)
			blit()
			return
		}
		const buffer = pixels.buffer
		pixels = null
		try {
			worker.postMessage({ buffer, spin, lightYaw: drawnYaw, cloudThin: drawnThin }, [buffer])
		} catch {
			dropWorker()
		}
	}

	function onPainted({ data }) {
		pixels = new Uint8ClampedArray(data.buffer)
		if (ctx) blit()
		// the angles may have run on while the sweep was in flight — chase them
		scheduleDraw()
	}

	// A worker that cannot run must not take the globe down: the sweep comes back to this thread.
	function dropWorker() {
		if (worker) worker.terminate()
		worker = null
		if (!pixels) pixels = new Uint8ClampedArray(res * res * 4)
		drawnSpin = null
		scheduleDraw()
	}

	// The GPU draws in the same frame the angles changed. The CPU keeps at most one sweep in flight,
	// capped in rate and always trailing to the latest angle.
	function scheduleDraw() {
		if (parked || !props.awake || !moved()) return
		if (gpu) {
			render(spinTarget())
			return
		}
		if (drawId || !pixels || !ctx) return
		drawId = requestAnimationFrame(ts => {
			drawId = 0
			if (lastDraw >= 0 && ts - lastDraw < orbitFrameMs) {
				scheduleDraw() // too soon — retry next frame, still on the latest angle
				return
			}
			lastDraw = ts
			render(spinTarget())
		})
	}

	function stopLoop() {
		if (drawId) cancelAnimationFrame(drawId)
		drawId = 0
	}

	watch(() => props.spin, scheduleDraw)
	watch(() => props.lightYaw, scheduleDraw)
	watch(() => props.cloudThin, scheduleDraw)
	// coming back on has to catch the picture up: `moved` sees a stale angle and redraws
	watch(() => props.awake, scheduleDraw)

	// A lost context drops the globe to the CPU path for the rest of the visit, on a fresh canvas.
	async function toCpu() {
		gpu = null
		gpuLost.value = true
		await nextTick()
		start()
	}

	function startCpu(el) {
		ctx = el.getContext('2d')
		if (!ctx) return
		shader = createPlanetShader({ res, seed })
		// the first frame on this thread, so the globe is ready the instant it reveals
		render(heldSpin)
		try {
			worker = new PlanetWorker()
			worker.onmessage = onPainted
			worker.onerror = dropWorker
			worker.postMessage({ type: 'init', res, seed })
		} catch {
			worker = null
		}
	}

	function start() {
		const el = canvasEl.value
		measureBox()
		el.width = res
		el.height = res
		heldSpin = props.spin
		drawnSpin = null
		if (!gpuLost.value) {
			gpu = createPlanetGpu(el, { res, seed })
			if (!gpu) {
				// a failed compile has already claimed this canvas
				toCpu()
				return
			}
			el.addEventListener('webglcontextlost', toCpu, { once: true })
			render(heldSpin)
			return
		}
		startCpu(el)
		scheduleDraw()
	}

	onMounted(start)

	// kept alive under HomeJourney: onBeforeUnmount never fires on navigation
	onDeactivated(() => {
		parked = true
		stopLoop()
	})
	onActivated(() => {
		parked = false
		measureBox()
		scheduleDraw()
	})

	onBeforeUnmount(() => {
		parked = true
		stopLoop()
		gpu?.release()
		if (worker) worker.terminate()
	})
</script>

<style scoped lang="scss">
	.planet {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 2;
		width: min(84vmin, 94vw);
		height: min(84vmin, 94vw);
		// centred, and settled a little low in its stage
		transform: translate(-50%, calc(-50% + 6vh));
		transform-origin: center;
		pointer-events: none;
		// Keep the upscaled sprite blocky rather than smoothly interpolated.
		image-rendering: pixelated;
	}

	.planet--smooth {
		image-rendering: auto;
	}
</style>

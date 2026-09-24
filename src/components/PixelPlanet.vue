<template>
	<!-- procedural low-res planet, upscaled pixelated. Decorative -->
	<canvas ref="canvasEl" class="planet" aria-hidden="true" />
</template>

<script setup>
	import { ref, watch, onActivated, onDeactivated, onMounted, onBeforeUnmount } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { createPlanetShader } from '@/js/planetShader'
	import PlanetWorker from '@/js/planet.worker.js?worker'
	import { PLANET } from '@/constants/planet'
	import { MOBILE_VIEWPORT_QUERY } from '@/constants/viewport'

	const props = defineProps({
		// False parks the shader. The globe keeps its canvas and seed, but a sweep under zero opacity is
		// the most expensive way to draw nothing — and the entry is exactly where it would happen.
		awake: { type: Boolean, default: true },
		// Longitude in radians. null → the planet free-spins on the clock over PLANET.spinSeconds.
		spin: { type: Number, default: null },
		// Sun yaw in radians about the view's vertical. 0 keeps the fixed upper-left key light.
		lightYaw: { type: Number, default: 0 },
		// 0 -> full cloud deck, 1 -> clear. At landing magnification a deck reads as a checker layer.
		cloudThin: { type: Number, default: 0 },
		// Optional override of named PALETTE entries (e.g. EARTH_PALETTE). Fixed at mount.
		palette: { type: Object, default: null },
	})

	const canvasEl = ref(null)
	let ctx = null
	let rafId = 0
	let drawId = 0
	let lastDraw = -1
	const isMobile = window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
	// phones draw a smaller sprite — the per-pixel shader cost is resolution²
	const res = isMobile ? PLANET.resolutionMobile : PLANET.resolution
	const frameMs = 1000 / (isMobile ? PLANET.fpsMobile : PLANET.fps)
	const orbitFrameMs = 1000 / (isMobile ? PLANET.orbitFpsMobile : PLANET.orbitFps)
	// this visit's world, fixed here so both threads' shaders roll the same terrain
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
	const spinTarget = () => (prefersReducedMotion() ? heldSpin : (props.spin ?? 0))

	// A redraw that cannot move an art pixel costs a full sweep to produce the picture already on screen.
	const cellTurn = (2 * Math.PI) / res
	function moved() {
		return (
			drawnSpin === null ||
			Math.abs(spinTarget() - drawnSpin) >= cellTurn ||
			Math.abs(props.lightYaw - drawnYaw) >= cellTurn ||
			Math.abs(props.cloudThin - drawnThin) >= PLANET.cloudThinStep
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
		if (props.spin !== null) scheduleDraw()
	}

	// A worker that cannot run must not take the globe down: the sweep comes back to this thread.
	function dropWorker() {
		if (worker) worker.terminate()
		worker = null
		if (!pixels) pixels = new Uint8ClampedArray(res * res * 4)
		drawnSpin = null
		resume()
	}

	function loop(ts) {
		if (pixels && (lastDraw < 0 || ts - lastDraw >= frameMs)) {
			lastDraw = ts
			render((ts / 1000 / PLANET.spinSeconds) * Math.PI * 2)
		}
		rafId = requestAnimationFrame(loop)
	}

	// Driven mode: at most one sweep in flight, always trailing to the latest angle.
	function scheduleDraw() {
		if (drawId || !pixels || parked || !ctx || !props.awake || !moved()) return
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

	// free-spinning planets run the idle loop; driven ones redraw off the spin watcher
	function resume() {
		if (parked || !ctx) return
		if (props.spin !== null) {
			scheduleDraw()
			return
		}
		if (!rafId && props.awake && !prefersReducedMotion()) {
			rafId = requestAnimationFrame(loop)
		}
	}

	function stopLoop() {
		if (rafId) cancelAnimationFrame(rafId)
		if (drawId) cancelAnimationFrame(drawId)
		rafId = 0
		drawId = 0
	}

	watch(() => props.spin, scheduleDraw)
	watch(() => props.lightYaw, scheduleDraw)
	watch(() => props.cloudThin, scheduleDraw)
	// coming back on has to catch the picture up: `moved` sees a stale angle and redraws
	watch(() => props.awake, resume)

	onMounted(() => {
		const el = canvasEl.value
		el.width = res
		el.height = res
		ctx = el.getContext('2d')
		shader = createPlanetShader({ res, seed, palette: props.palette })
		// the first frame on this thread, so the globe is ready the instant it reveals
		heldSpin = props.spin ?? 0
		render(heldSpin)
		try {
			worker = new PlanetWorker()
			worker.onmessage = onPainted
			worker.onerror = dropWorker
			worker.postMessage({ type: 'init', res, seed, palette: props.palette })
		} catch {
			worker = null
		}
		resume()
	})

	// kept alive under HomeJourney: onBeforeUnmount never fires on navigation
	onDeactivated(() => {
		parked = true
		stopLoop()
	})
	onActivated(() => {
		parked = false
		resume()
	})

	onBeforeUnmount(() => {
		parked = true
		stopLoop()
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
		will-change: transform, opacity;
	}
</style>

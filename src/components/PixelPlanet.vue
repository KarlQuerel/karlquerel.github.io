<template>
	<!-- procedural low-res planet, upscaled pixelated; reveal (0 → 1) grows it in. Decorative -->
	<canvas ref="canvasEl" class="planet" :style="planetStyle" aria-hidden="true" />
</template>

<script setup>
	import {
		ref,
		computed,
		watch,
		onActivated,
		onDeactivated,
		onMounted,
		onBeforeUnmount,
	} from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { createPlanetShader } from '@/js/planetShader'
	import PlanetWorker from '@/js/planet.worker.js?worker'
	import { PLANET } from '@/constants/planet'
	import { MOBILE_VIEWPORT_QUERY } from '@/constants/viewport'

	const props = defineProps({
		// 0 → far-off dot, 1 → arrived and full size. Drives scale and opacity.
		reveal: { type: Number, default: 1 },
		// False parks the shader. The globe keeps its canvas and its seed — it is the
		// same world when it comes back — but a sweep of the sprite that lands under an
		// opacity of nought is the most expensive way there is to draw nothing, and the
		// entry is exactly where it happens: `roll` spins the planet two thirds of a
		// turn while it fades out behind the atmosphere, so it redraws hardest at the
		// one moment nobody can see it and the cloud deck needs the frame.
		awake: { type: Boolean, default: true },
		// Longitude in radians. null → the planet free-spins on the clock over
		// PLANET.spinSeconds. A number → the caller owns the angle (a scroll-driven
		// orbit), and each change schedules a redraw instead of an idle loop running.
		spin: { type: Number, default: null },
		// Sun yaw in radians around the view's vertical axis. 0 keeps the fixed
		// upper-left key light; the landing journey sweeps it so the terminator
		// advances while you orbit.
		lightYaw: { type: Number, default: 0 },
		// 0 → full cloud deck, 1 → clear skies. The journey raises it as the camera
		// dives: at landing magnification the deck stops reading as weather above
		// the ground and starts reading as a checker layer stacked on the mountains.
		cloudThin: { type: Number, default: 0 },
		// Optional override of named PALETTE entries — e.g. EARTH_PALETTE, which walks
		// the same ramps through a different set of colours. Fixed at mount.
		palette: { type: Object, default: null },
	})

	// grow from a vanishing-point dot to full size, settling slightly lower as it "lands"
	const planetStyle = computed(() => ({
		opacity: Math.min(1, props.reveal * 4),
		transform: `translate(-50%, calc(-50% + ${props.reveal * 6}vh)) scale(${0.05 + 0.95 * props.reveal})`,
		// hidden until arrival — drop the promoted canvas out of the compositor during the crawl
		display: props.reveal > 0 ? null : 'none',
	}))

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

	// One buffer for the sprite, ping-ponged with the worker (see planet.worker.js) so
	// a frame allocates nothing. Holding it is what permits a sweep, so `pixels` being
	// null reads as "one is in flight" — and that is the whole of the pacing. A fixed
	// frame budget can only ask for sweeps faster than the machine can run them; this
	// asks for the next one when the last has landed, so a slow machine spins the
	// globe slower instead of dropping every frame of the scroll around it.
	let pixels = new Uint8ClampedArray(res * res * 4)
	let worker = null
	// the same shader on this thread: the first frame, and the fall-back where a
	// worker cannot be had
	let shader = null
	// KeepAlive parks the component rather than unmounting it, so this is the only
	// thing that stops a sweep running on behind whatever page you navigated to
	let parked = false

	// The last picture actually asked for, so a redraw can be judged against what is
	// already there (or already on its way) rather than against the clock.
	let drawnSpin = null
	let drawnYaw = 0
	let drawnThin = 0

	// A redraw that cannot move a single art pixel costs a full sweep of the sprite to
	// produce the picture already on screen. The globe is `res` cells around, so the
	// surface has to turn by 2π/res before any cell can land on a different sample —
	// and a scrolled frame advances the spin by roughly a third of that, so most of
	// the redraws the orbit used to run were identical to the one before. Judging the
	// pending angle against the drawn one instead of against a frame budget skips
	// those, and it is not a stepped orbit: the globe's position and scale are CSS and
	// stay continuous, and a texture that has moved less than one of its own pixels
	// has by definition nothing to show.
	const cellTurn = (2 * Math.PI) / res
	function moved() {
		return (
			drawnSpin === null ||
			Math.abs((props.spin ?? 0) - drawnSpin) >= cellTurn ||
			Math.abs(props.lightYaw - drawnYaw) >= cellTurn ||
			Math.abs(props.cloudThin - drawnThin) >= PLANET.cloudThinStep
		)
	}

	// wrapping the buffer costs no pixel copy — the ImageData is a view, not a store
	function blit() {
		ctx.putImageData(new ImageData(pixels, res, res), 0, 0)
	}

	// Ask for one sweep at `spin`. The angles it was asked for are recorded now rather
	// than when it lands, so `moved` judges the picture on its way and a flung scroll
	// does not queue a sweep per frame behind the one being drawn.
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

	// A worker that cannot run must not take the globe down with it: the sweep comes
	// back to this thread and carries on. The buffer went with the failed post, so the
	// picture has to be built again from scratch.
	function dropWorker() {
		if (worker) worker.terminate()
		worker = null
		if (!pixels) pixels = new Uint8ClampedArray(res * res * 4)
		drawnSpin = null
		resume()
	}

	function loop(ts) {
		if (props.reveal <= 0) {
			rafId = 0
			return
		}
		if (pixels && (lastDraw < 0 || ts - lastDraw >= frameMs)) {
			lastDraw = ts
			render((ts / 1000 / PLANET.spinSeconds) * Math.PI * 2)
		}
		rafId = requestAnimationFrame(loop)
	}

	// Driven mode: at most one sweep in flight, and always trailing to the latest
	// angle, so a flung scroll still lands the orbit where it stopped.
	function scheduleDraw() {
		if (drawId || !pixels || parked || !ctx) return
		if (!props.awake || props.reveal <= 0 || prefersReducedMotion()) return
		if (!moved()) return
		drawId = requestAnimationFrame(ts => {
			drawId = 0
			if (lastDraw >= 0 && ts - lastDraw < orbitFrameMs) {
				scheduleDraw() // too soon — retry next frame, still on the latest angle
				return
			}
			lastDraw = ts
			render(props.spin)
		})
	}

	// free-spinning planets run the idle loop; driven ones redraw off the spin watcher
	function resume() {
		if (parked || !ctx) return
		if (props.spin !== null) {
			scheduleDraw()
			return
		}
		if (!rafId && props.awake && props.reveal > 0 && !prefersReducedMotion()) {
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
	watch(() => props.reveal, resume)
	// coming back on has to catch the picture up: `moved` sees a stale angle and redraws
	watch(() => props.awake, resume)

	onMounted(() => {
		const el = canvasEl.value
		el.width = res
		el.height = res
		ctx = el.getContext('2d')
		shader = createPlanetShader({ res, seed, palette: props.palette })
		// the first frame on this thread, so the globe is ready the instant it reveals
		// rather than a worker round-trip later
		render(props.spin ?? 0)
		// reduced motion never redraws, so it never needs a second thread
		if (!prefersReducedMotion()) {
			try {
				worker = new PlanetWorker()
				worker.onmessage = onPainted
				worker.onerror = dropWorker
				worker.postMessage({ type: 'init', res, seed, palette: props.palette })
			} catch {
				worker = null
			}
		}
		resume()
	})

	// kept alive under HomeJourney: onBeforeUnmount never fires on navigation, so the
	// shader loop would keep burning a thread behind every other page
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
		transform-origin: center;
		pointer-events: none;
		// Keep the upscaled sprite blocky rather than smoothly interpolated.
		image-rendering: pixelated;
		will-change: transform, opacity;
	}
</style>

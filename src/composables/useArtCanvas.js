// One WebGL context on the art grid: sizing, the perf ladder, the boot, the frame loop and its losses.
// build(gl, step) reruns after a context restore; the last bootWeights key is the first frame, reported here.

import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
import { loseContext } from '../js/gl.js'
import { useWindowListener } from './useWindowListener.js'
import {
	ART_MIN_DEVICE_PX,
	ART_MIN_HEIGHT,
	ART_MIN_WIDTH,
	ART_RUNGS,
	ART_TARGET,
	CONTEXT_ATTRIBUTES,
	FIRST_FRAME_DT,
	MAX_FRAME_DT,
	PERF_FAST_MS,
	PERF_SLOW_MS,
	PERF_WINDOW,
	RESTORE_WAIT_MS,
	resolutionQuery,
} from '../constants/artGrid.js'

// thrown out of step() when the build it belongs to has been superseded
const STALE = Symbol('stale build')

// Let the browser actually paint: the first frame schedules, the second is after compositing.
const paint = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))

export function useArtCanvas(
	canvasRef,
	{ bootWeights = { frame: 1 }, build, frame, resize, release }
) {
	const order = Object.keys(bootWeights)
	const supported = ref(true)
	const booting = ref(true)
	// how far the boot has got, and where the step in flight will land; the loader creeps toward it
	const bootProgress = ref(0)
	const bootCeiling = ref(bootWeights[order[0]])
	const grid = { width: 0, height: 0 }

	let canvas = null
	let gl = null
	let run = 0
	let ready = false
	let active = true
	let raf = 0
	let restoreWait = 0
	let rung = 0
	let lastT = 0
	let dprQuery = null
	const perf = { start: 0, frames: 0 }

	function fit() {
		// innerWidth, not the element's box: the element is about to be a hair wider than the viewport
		const dpr = window.devicePixelRatio || 1
		const devW = Math.round(window.innerWidth * dpr)
		const devH = Math.round(window.innerHeight * dpr)
		const k = Math.max(ART_MIN_DEVICE_PX, Math.round(devH / ART_TARGET) + rung)
		grid.width = Math.max(ART_MIN_WIDTH, Math.ceil(devW / k))
		grid.height = Math.max(ART_MIN_HEIGHT, Math.ceil(devH / k))
		canvas.width = grid.width
		canvas.height = grid.height
		// The spill past the viewport is split by half, floored to a device pixel, so edges stay on the grid.
		canvas.style.width = `${(grid.width * k) / dpr}px`
		canvas.style.height = `${(grid.height * k) / dpr}px`
		canvas.style.left = `${-Math.floor((grid.width * k - devW) / 2) / dpr}px`
		canvas.style.top = `${-Math.floor((grid.height * k - devH) / 2) / dpr}px`
		gl.viewport(0, 0, grid.width, grid.height)
		resize?.(grid)
	}

	function render(t) {
		const dt = lastT ? Math.min(MAX_FRAME_DT, (t - lastT) / 1000) : FIRST_FRAME_DT
		lastT = t
		return frame(dt, t)
	}

	// Steps a rung down the grid when frames run slow, back up when they run fast.
	function loop(t) {
		const drew = render(t)
		raf = requestAnimationFrame(loop)
		if (!drew) {
			perf.start = 0
			return
		}
		if (!perf.start) {
			perf.start = t
			perf.frames = 0
			return
		}
		if (++perf.frames < PERF_WINDOW) return
		const avg = (t - perf.start) / PERF_WINDOW
		perf.start = 0
		if (avg > PERF_SLOW_MS && rung < ART_RUNGS - 1) rung++
		else if (avg < PERF_FAST_MS && rung > 0) rung--
		else return
		fit()
	}

	function resume() {
		if (ready && active && !booting.value && !raf) raf = requestAnimationFrame(loop)
	}

	function pause() {
		cancelAnimationFrame(raf)
		raf = 0
		lastT = 0
		perf.start = 0
	}

	function stepper(id) {
		let done = 0
		return async key => {
			if (booting.value) {
				done += bootWeights[key]
				bootProgress.value = done
				const next = bootWeights[order[order.indexOf(key) + 1]] ?? 0
				bootCeiling.value = Math.min(1, done + next)
			}
			await paint()
			if (id !== run || gl.isContextLost()) throw STALE
		}
	}

	async function start() {
		const id = ++run
		const step = stepper(id)
		try {
			// put the loader up before anything that blocks: compiling a shader freezes a slow GPU
			await paint()
			if (id !== run) return
			await build(gl, step)
			ready = true
			fit()
			render(performance.now())
			// drawing only queues work, so the cover cannot come off until the GPU has finished it
			gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4))
			await step(order[order.length - 1])
		} catch (err) {
			if (err === STALE || id !== run || gl.isContextLost()) return
			console.error(err)
			fail()
			return
		}
		booting.value = false
		resume()
	}

	function onLost(e) {
		// without preventDefault the browser never offers the context back
		e.preventDefault()
		run++
		ready = false
		pause()
		// a context lost mid-boot that never comes back would hold the cover up for good
		if (booting.value) restoreWait = setTimeout(fail, RESTORE_WAIT_MS)
	}

	function onRestored() {
		clearTimeout(restoreWait)
		start()
	}

	function onDprChange() {
		watchDpr()
		onResize()
	}

	function watchDpr() {
		dprQuery?.removeEventListener('change', onDprChange)
		dprQuery = window.matchMedia(resolutionQuery(window.devicePixelRatio || 1))
		dprQuery.addEventListener('change', onDprChange)
	}

	function unwatchDpr() {
		dprQuery?.removeEventListener('change', onDprChange)
		dprQuery = null
	}

	function onResize() {
		if (ready) fit()
	}

	function dispose() {
		run++
		ready = false
		pause()
		unwatchDpr()
		canvas?.removeEventListener('webglcontextlost', onLost)
		canvas?.removeEventListener('webglcontextrestored', onRestored)
		clearTimeout(restoreWait)
		if (!gl) return
		release?.(gl)
		loseContext(gl)
		gl = null
	}

	function fail() {
		supported.value = false
		booting.value = false
		dispose()
	}

	useWindowListener('resize', onResize)

	onMounted(() => {
		canvas = canvasRef.value
		gl = canvas?.getContext('webgl', CONTEXT_ATTRIBUTES)
		if (!gl) {
			fail()
			return
		}
		canvas.addEventListener('webglcontextlost', onLost)
		canvas.addEventListener('webglcontextrestored', onRestored)
		watchDpr()
		start()
	})

	// a kept-alive view parked off-route draws nothing
	onDeactivated(() => {
		active = false
		pause()
		unwatchDpr()
	})
	onActivated(() => {
		if (active) return
		active = true
		if (!gl) return
		watchDpr()
		onResize()
		resume()
	})
	onBeforeUnmount(dispose)

	return { supported, booting, bootProgress, bootCeiling, grid }
}

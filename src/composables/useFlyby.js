// The flyby renderer: owns the GL context, the three programs, the art-grid sizing
// and the frame loop. Everything about *where the camera goes* lives in
// js/flybyPath.js; this file only uploads the answer and draws it.

import { onBeforeUnmount, onMounted, ref } from 'vue'
import { clamp01, smoothstep } from '../js/math.js'
import { dot, mul, sub } from '../js/vec3.js'
import { sampleFlight } from '../js/flybyPath.js'
import { buildBelt } from '../js/flybyBelt.js'
import { TITLE_PLANE, drawTitleCanvas, planeWidth, textureSize } from '../js/flybyTitle.js'
import { prefersReducedMotion } from './usePrefersReducedMotion.js'
import sceneVert from '../shaders/flyby/scene.vert.glsl?raw'
import sceneFragSrc from '../shaders/flyby/scene.frag.glsl?raw'
import titleVert from '../shaders/flyby/title.vert.glsl?raw'
import titleFrag from '../shaders/flyby/title.frag.glsl?raw'
import dustVert from '../shaders/flyby/dust.vert.glsl?raw'
import dustFrag from '../shaders/flyby/dust.frag.glsl?raw'
import {
	ART_RUNGS,
	ART_TARGET,
	BELT_MAX,
	BELT_SPIN,
	BELT_UNIFORM_BUDGET,
	BODIES,
	DUST_BOX,
	FOCAL,
	HUD_CELLS,
	LEGS,
	MOTES,
	PERF_FAST_MS,
	PERF_SLOW_MS,
	PERF_WINDOW,
	RING_NORMAL,
	ROCKS,
	SCROLL_EASE,
	SUN,
	TITLE,
} from '../constants/flyby.js'

const SCENE_UNIFORMS = [
	'uRes',
	'uCamPos',
	'uRight',
	'uUp',
	'uFwd',
	'uFocal',
	'uEntry',
	'uProg',
	'uLook',
	'uSun',
	'uRingN',
]
const TITLE_UNIFORMS = [
	'uCamPos',
	'uRight',
	'uUp',
	'uFwd',
	'uTPos',
	'uTRight',
	'uTUp',
	'uAnchor',
	'uSnap',
	'uFocal',
	'uAspect',
	'uTW',
	'uTH',
	'uFade',
]
const DUST_UNIFORMS = [
	'uCamPos',
	'uRight',
	'uUp',
	'uFwd',
	'uFocal',
	'uAspect',
	'uBox',
	'uStreak',
	'uFade',
]

const TURN = Math.PI * 2

export function useFlyby(canvasRef) {
	// A browser with no WebGL still gets the copy: the page degrades to its own text
	// rather than throwing on a null context.
	const supported = ref(true)
	const progress = ref(0)
	const leg = ref(LEGS[0][1])
	const wake = ref(0)
	const hint = ref(1)
	const arrive = ref(0)
	const markOn = ref(false)
	const shaderLines = ref(0)

	let gl = null
	let raf = 0
	let scene, title, dust
	let quad, titleQuad, dustSeeds, dustTails, titleTex
	let U, TU, DU, aScene, aTitle, aDust
	let beltCount = 0
	let W = 0
	let H = 0
	let artStep = 0
	let planeW = TITLE.w
	let texSize = TITLE.tex
	// scroll position the camera is easing toward, and the one it last drew
	let eased = null
	let drawn = -1
	// pointer target and its eased follower
	let mx = 0
	let my = 0
	let mxs = 0
	let mys = 0
	let still = false

	const bodyArr = new Float32Array(BODIES.length * 4)
	const bodyP = new Float32Array(BODIES.length * 4)
	const rockArr = new Float32Array(ROCKS.length * 4)
	const rockSpin = new Float32Array(ROCKS.length * 4)

	function compile(vs, fs) {
		const p = gl.createProgram()
		for (const [type, src] of [
			[gl.VERTEX_SHADER, vs],
			[gl.FRAGMENT_SHADER, fs],
		]) {
			const sh = gl.createShader(type)
			gl.shaderSource(sh, src)
			gl.compileShader(sh)
			if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
				console.error(gl.getShaderInfoLog(sh), src)
			gl.attachShader(p, sh)
			gl.deleteShader(sh)
		}
		gl.linkProgram(p)
		if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(p))
		return p
	}

	const locations = (program, names) =>
		Object.fromEntries(names.map(n => [n, gl.getUniformLocation(program, n)]))

	function buffer(data) {
		const b = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, b)
		gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
		return b
	}

	function uploadTitle() {
		gl.bindTexture(gl.TEXTURE_2D, titleTex)
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			drawTitleCanvas(texSize)
		)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
		drawn = -1 // the plane changed, so the next frame has to redraw
	}

	function resize() {
		const canvas = canvasRef.value
		if (!canvas) return
		// innerWidth rather than the element's own box: the element is about to be a hair
		// wider than the viewport, and 100vw counts the scrollbar the same way this does.
		const dpr = window.devicePixelRatio || 1
		const devW = Math.round(window.innerWidth * dpr)
		const devH = Math.round(window.innerHeight * dpr)
		// device pixels per art pixel: whole, never fewer than two, one more per rung down
		const k = Math.max(2, Math.round(devH / ART_TARGET) + artStep)
		W = Math.max(160, Math.ceil(devW / k))
		H = Math.max(120, Math.ceil(devH / k))
		canvas.width = W
		canvas.height = H
		// Rounding the buffer up to whole art pixels leaves the element a little larger
		// than the viewport; offset by half the spill, floored to a whole device pixel, so
		// the overflow splits instead of cropping one side - and so the element's own edges
		// stay on the device grid, which is the whole point of the exercise.
		canvas.style.width = `${(W * k) / dpr}px`
		canvas.style.height = `${(H * k) / dpr}px`
		canvas.style.left = `${-Math.floor((W * k - devW) / 2) / dpr}px`
		canvas.style.top = `${-Math.floor((H * k - devH) / 2) / dpr}px`
		gl.viewport(0, 0, W, H)

		planeW = planeWidth(W / H)
		const next = textureSize(planeW, H)
		if (next[0] !== texSize[0]) {
			texSize = next
			uploadTitle()
		}
	}

	// One frame. Returns false when nothing moved, so the perf ladder only ever
	// measures frames that actually did work.
	function draw() {
		const doc = document.documentElement
		const max = doc.scrollHeight - window.innerHeight
		const target = clamp01(max > 0 ? window.scrollY / max : 0)
		if (eased === null) eased = target
		eased += (target - eased) * SCROLL_EASE
		if (Math.abs(target - eased) < 0.00004) eased = target
		const p = eased

		mxs += (mx - mxs) * 0.055
		mys += (my - mys) * 0.055
		const settling = Math.abs(mx - mxs) > 0.0008 || Math.abs(my - mys) > 0.0008
		if (Math.abs(p - drawn) < 0.00002 && !settling) return false
		drawn = p

		const cam = sampleFlight(p, mxs, mys, still)

		// spins accumulate with scroll, never on a clock
		BODIES.forEach((b, i) => (bodyP[i * 4 + 1] = b.spin * p * TURN))

		gl.useProgram(scene)
		gl.bindBuffer(gl.ARRAY_BUFFER, quad)
		gl.enableVertexAttribArray(aScene)
		gl.vertexAttribPointer(aScene, 2, gl.FLOAT, false, 0, 0)
		gl.uniform2f(U.uRes, W, H)
		gl.uniform3fv(U.uCamPos, cam.eye)
		gl.uniform3fv(U.uRight, cam.right)
		gl.uniform3fv(U.uUp, cam.up)
		gl.uniform3fv(U.uFwd, cam.fwd)
		gl.uniform1f(U.uFocal, FOCAL)
		gl.uniform1f(U.uEntry, cam.entry)
		gl.uniform1f(U.uProg, p)
		gl.uniform2f(U.uLook, mxs, mys)
		gl.uniform3fv(U.uSun, SUN)
		gl.uniform3fv(U.uRingN, RING_NORMAL)
		gl.uniform4fv(U.uB, bodyArr)
		gl.uniform4fv(U.uBP, bodyP)
		// No range gate: culling by distance made them wink in and out of existence.
		// Two bounding spheres cost almost nothing on a ray that misses.
		ROCKS.forEach((r, i) => {
			rockArr.set(r.c, i * 4)
			rockArr[i * 4 + 3] = r.r
			const a = r.spin * p * TURN
			const b = r.tumble * p * TURN
			rockSpin.set([Math.cos(a), Math.sin(a), Math.cos(b), Math.sin(b)], i * 4)
		})
		gl.uniform4fv(U.uRock, rockArr)
		gl.uniform4fv(U.uRockSpin, rockSpin)
		if (beltCount) gl.uniform1f(U.uBeltSpin, p * TURN * BELT_SPIN)
		gl.disable(gl.BLEND)
		gl.drawArrays(gl.TRIANGLES, 0, 6)

		drawTitlePlane(cam)
		drawDust(cam)
		updateReadout(p, cam.wake)
		return true
	}

	// The title plane, over the scene: nothing else is ever nearer than it is. One
	// dissolve for the whole plane rather than per corner - the letter is metres wide
	// by the time we are inside it, and a per-vertex fade leaves the far end of the
	// name hanging on as a pale slab while the near end has gone.
	// Held much later than it used to be. Threading the gap only needed the words solid
	// until they cleared the frame edges; threading the Q needs the letter solid while
	// it is the frame - at tz=0.7 its ink spans 46 degrees against a 52-degree frame,
	// and the counter the flight goes through is a 7-degree slot floor to ceiling. The
	// floor is not a taste call: the vertex shader drops any corner nearer than z=0.3,
	// so the plane has to be gone before then or it vanishes in one frame instead of
	// dissolving.
	function drawTitlePlane(cam) {
		const trel = sub(TITLE_PLANE.pos, cam.eye)
		const tz = dot(trel, cam.fwd)
		const tfade = smoothstep(clamp01((tz - 0.34) / 0.36))
		if (tfade <= 0.01) return

		gl.useProgram(title)
		gl.bindBuffer(gl.ARRAY_BUFFER, titleQuad)
		gl.enableVertexAttribArray(aTitle)
		gl.vertexAttribPointer(aTitle, 2, gl.FLOAT, false, 0, 0)
		gl.activeTexture(gl.TEXTURE0)
		gl.bindTexture(gl.TEXTURE_2D, titleTex)
		gl.uniform3fv(TU.uCamPos, cam.eye)
		gl.uniform3fv(TU.uRight, cam.right)
		gl.uniform3fv(TU.uUp, cam.up)
		gl.uniform3fv(TU.uFwd, cam.fwd)
		gl.uniform3fv(TU.uTPos, TITLE_PLANE.pos)
		gl.uniform3fv(TU.uTRight, TITLE.right)
		gl.uniform3fv(TU.uTUp, TITLE.up)
		gl.uniform2fv(TU.uAnchor, TITLE_PLANE.anchor)
		gl.uniform1f(TU.uFocal, FOCAL)
		gl.uniform1f(TU.uAspect, W / H)
		gl.uniform1f(TU.uTW, planeW)
		gl.uniform1f(TU.uTH, (planeW * texSize[1]) / texSize[0])
		gl.uniform1f(TU.uFade, tfade)
		// Snap the plane onto the art grid. The pointer look slides the title forty-odd
		// art pixels across a full sweep, and the plane samples its texture NEAREST at
		// one texel per pixel: move it by a fraction of a pixel and every stroke in the
		// name gains or loses a pixel on its own, which is the letters chattering rather
		// than gliding. Holding the anchor on a pixel boundary keeps the texel grid in
		// step with the pixel grid, so the whole word steps as one piece.
		const snap = (v, n) => (Math.round((v * n) / 2) * 2) / n - v
		gl.uniform2f(
			TU.uSnap,
			snap((2 * FOCAL * dot(trel, cam.right)) / tz / (W / H), W),
			snap((2 * FOCAL * dot(trel, cam.up)) / tz, H)
		)
		gl.enable(gl.BLEND)
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
		gl.drawArrays(gl.TRIANGLES, 0, 6)
	}

	// dust streaks: strongest in open space, gone once we hit atmosphere
	function drawDust(cam) {
		const fade = clamp01(cam.speed / 320) * (1 - clamp01(cam.entry / 0.35)) * cam.wake
		if (fade <= 0.01) return

		gl.useProgram(dust)
		gl.bindBuffer(gl.ARRAY_BUFFER, dustSeeds)
		gl.enableVertexAttribArray(aDust.seed)
		gl.vertexAttribPointer(aDust.seed, 3, gl.FLOAT, false, 0, 0)
		gl.bindBuffer(gl.ARRAY_BUFFER, dustTails)
		gl.enableVertexAttribArray(aDust.tail)
		gl.vertexAttribPointer(aDust.tail, 1, gl.FLOAT, false, 0, 0)
		gl.uniform3fv(DU.uCamPos, cam.eye)
		gl.uniform3fv(DU.uRight, cam.right)
		gl.uniform3fv(DU.uUp, cam.up)
		gl.uniform3fv(DU.uFwd, cam.fwd)
		gl.uniform1f(DU.uFocal, FOCAL)
		gl.uniform1f(DU.uAspect, W / H)
		gl.uniform1f(DU.uBox, DUST_BOX)
		// streak length follows real speed, so the cue is the motion, not a constant
		gl.uniform3fv(DU.uStreak, mul(cam.travel, clamp01(cam.speed / 900) * 4.0 + 0.25))
		gl.uniform1f(DU.uFade, fade)
		gl.enable(gl.BLEND)
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
		gl.drawArrays(gl.LINES, 0, MOTES * 2)
	}

	function updateReadout(p, wakeAmount) {
		progress.value = p
		hint.value = clamp01(1 - p / 0.06)
		// the instrument comes up with the engines, like the dust: the opening frame is
		// still meant to look like a photograph
		wake.value = wakeAmount
		const cells = Math.round(p * HUD_CELLS)
		leg.value = `${LEGS.find(l => p < l[0])[1]}  [${'='.repeat(cells)}${'-'.repeat(
			HUD_CELLS - cells
		)}] ${String(Math.round(p * 100)).padStart(3)}%`
		markOn.value = p > 0.2
		// start the reveal once the ground has settled, and give it enough scroll that
		// every link is up well before the page runs out
		arrive.value = clamp01((p - 0.955) / 0.035)
	}

	const perf = { start: 0, frames: 0 }

	function loop(t) {
		const drew = draw()
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
		if (avg > PERF_SLOW_MS && artStep < ART_RUNGS - 1) artStep++
		else if (avg < PERF_FAST_MS && artStep > 0) artStep--
		else return
		resize()
		drawn = -1
	}

	function onResize() {
		resize()
		drawn = -1
	}

	// Pointer look. Mouse only: a touch drag is a scroll, and reading a finger as a
	// look would fight the flight the reader is actually driving.
	function onPointerMove(e) {
		if (e.pointerType !== 'mouse') return
		mx = (e.clientX / window.innerWidth) * 2 - 1
		my = (e.clientY / window.innerHeight) * 2 - 1
	}

	function setup() {
		const canvas = canvasRef.value
		gl = canvas && canvas.getContext('webgl', { antialias: false, alpha: false })
		if (!gl) {
			supported.value = false
			return
		}
		still = prefersReducedMotion()

		// How many belt rocks this GPU can afford — see BELT_UNIFORM_BUDGET.
		beltCount = Math.max(
			0,
			Math.min(
				BELT_MAX,
				gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS) - BELT_UNIFORM_BUDGET
			)
		)
		const sceneFrag = sceneFragSrc.replace('__BELT_COUNT__', String(beltCount))
		shaderLines.value = sceneFrag.trim().split('\n').length

		scene = compile(sceneVert, sceneFrag)
		dust = compile(dustVert, dustFrag)
		title = compile(titleVert, titleFrag)

		quad = buffer(new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]))
		// Two triangles carrying UVs; the plane's world corners are built in the shader.
		titleQuad = buffer(new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]))

		const seeds = new Float32Array(MOTES * 6)
		const tails = new Float32Array(MOTES * 2)
		for (let i = 0; i < MOTES; i++) {
			const s = [Math.random(), Math.random(), Math.random()]
			for (let k = 0; k < 2; k++) {
				seeds[i * 6 + k * 3] = s[0]
				seeds[i * 6 + k * 3 + 1] = s[1]
				seeds[i * 6 + k * 3 + 2] = s[2]
				tails[i * 2 + k] = k * 0.38 // tail sits behind the head in travel space
			}
		}
		dustSeeds = buffer(seeds)
		dustTails = buffer(tails)

		U = locations(scene, SCENE_UNIFORMS)
		U.uRock = gl.getUniformLocation(scene, 'uRock[0]')
		U.uRockSpin = gl.getUniformLocation(scene, 'uRockSpin[0]')
		U.uBelt = gl.getUniformLocation(scene, 'uBelt[0]')
		U.uBeltSpin = gl.getUniformLocation(scene, 'uBeltSpin')
		U.uB = gl.getUniformLocation(scene, 'uB[0]')
		U.uBP = gl.getUniformLocation(scene, 'uBP[0]')
		TU = locations(title, TITLE_UNIFORMS)
		DU = locations(dust, DUST_UNIFORMS)
		aScene = gl.getAttribLocation(scene, 'aP')
		aTitle = gl.getAttribLocation(title, 'aUV')
		aDust = {
			seed: gl.getAttribLocation(dust, 'aSeed'),
			tail: gl.getAttribLocation(dust, 'aTail'),
		}

		BODIES.forEach((b, i) => {
			bodyArr.set(b.c.concat([b.r]), i * 4)
			bodyP.set([b.pid, 0, b.ring[0], b.ring[1]], i * 4)
		})
		if (beltCount) {
			gl.useProgram(scene)
			gl.uniform4fv(U.uBelt, buildBelt(beltCount))
		}

		titleTex = gl.createTexture()
		resize()
		uploadTitle()
		// the pixel font may still be loading; redraw the plane once it lands
		if (document.fonts) document.fonts.ready.then(() => gl && uploadTitle()).catch(() => {})

		window.addEventListener('resize', onResize, { passive: true })
		if (!still) window.addEventListener('pointermove', onPointerMove, { passive: true })
		raf = requestAnimationFrame(loop)
	}

	function teardown() {
		cancelAnimationFrame(raf)
		window.removeEventListener('resize', onResize)
		window.removeEventListener('pointermove', onPointerMove)
		if (!gl) return
		for (const b of [quad, titleQuad, dustSeeds, dustTails]) gl.deleteBuffer(b)
		for (const p of [scene, title, dust]) gl.deleteProgram(p)
		gl.deleteTexture(titleTex)
		// the context outlives the canvas element otherwise, and browsers cap how many
		// live WebGL contexts a tab may hold
		gl.getExtension('WEBGL_lose_context')?.loseContext()
		gl = null
	}

	onMounted(setup)
	onBeforeUnmount(teardown)

	return { supported, progress, leg, wake, hint, arrive, markOn, shaderLines }
}

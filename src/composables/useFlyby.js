// The landing flyby: the flight state and its readout, drawn by three passes on one art canvas.

import { ref } from 'vue'
import { clamp01 } from '../js/math.js'
import { createRollState, sampleFlight } from '../js/flybyPath.js'
import { beltCountFor, createScenePass } from '../js/flybyScene.js'
import { createDustPass } from '../js/flybyDust.js'
import { createTitlePass } from '../js/flybyTitlePass.js'
import { prefersReducedMotion } from './usePrefersReducedMotion.js'
import { useArtCanvas } from './useArtCanvas.js'
import { useWindowListener } from './useWindowListener.js'
import {
	ARRIVE_FROM,
	ARRIVE_SPAN,
	BOOT_WEIGHTS,
	FONT_WAIT_MAX,
	HINT_SPAN,
	HUD_CELLS,
	LEGS,
	LOOK_EASE,
	LOOK_REST,
	MARK_AT,
	REDRAW_REST,
	SCROLL_EASE,
	SCROLL_REST,
	TITLE,
} from '../constants/flyby.js'

// The face the title is drawn in. The race means a font that never arrives costs FONT_WAIT_MAX.
function fontReady() {
	if (!document.fonts) return Promise.resolve()
	return Promise.race([
		document.fonts.load(`${TITLE.size}px ${TITLE.font}`).catch(() => {}),
		new Promise(r => setTimeout(r, FONT_WAIT_MAX)),
	])
}

function scrollProgress() {
	const max = document.documentElement.scrollHeight - window.innerHeight
	return clamp01(max > 0 ? window.scrollY / max : 0)
}

export function useFlyby(canvasRef) {
	const leg = ref(LEGS[0][1])
	const wake = ref(0)
	const hint = ref(1)
	const arrive = ref(0)
	const markOn = ref(false)

	const still = prefersReducedMotion()
	let passes = null
	// scroll position the camera is easing toward, and the one it last drew
	let eased = null
	let drawn = -1
	// the airframe's roll carries momentum between frames; owned here so a remount starts level
	const rollState = createRollState()
	// pointer target and its eased follower
	const look = { x: 0, y: 0, tx: 0, ty: 0 }

	async function build(gl, step) {
		const beltCount = beltCountFor(gl)
		await step('context')
		const scene = createScenePass(gl, beltCount)
		await step('scene')
		const dust = createDustPass(gl)
		const title = createTitlePass(gl)
		passes = { scene, dust, title }
		await step('programs')
		// before the first title upload, so the name is drawn in the real face rather than fallback
		await fontReady()
		await step('typeface')
		// if the face lost the race above, redraw the plane when it lands
		document.fonts?.ready
			.then(() => {
				if (passes?.title !== title || gl.isContextLost()) return
				title.upload()
				drawn = -1
				wakeLoop()
			})
			.catch(() => {})
	}

	function frame(dt) {
		const target = scrollProgress()
		if (eased === null) eased = target
		eased += (target - eased) * SCROLL_EASE
		if (Math.abs(target - eased) < SCROLL_REST) eased = target
		const p = eased

		look.x += (look.tx - look.x) * LOOK_EASE
		look.y += (look.ty - look.y) * LOOK_EASE
		// the roll keeps moving after the scroll stops, so it has a say in whether this frame can be skipped
		const settling =
			Math.abs(look.tx - look.x) > LOOK_REST ||
			Math.abs(look.ty - look.y) > LOOK_REST ||
			!rollState.settled
		if (Math.abs(p - drawn) < REDRAW_REST && !settling) return false
		drawn = p

		const cam = sampleFlight(p, look.x, look.y, still, rollState, dt)
		passes.scene.draw(cam, p, look.x, look.y, grid)
		passes.title.draw(cam, grid)
		passes.dust.draw(cam, grid)
		updateReadout(p, cam.wake)
		return true
	}

	function updateReadout(p, wakeAmount) {
		hint.value = clamp01(1 - p / HINT_SPAN)
		// the instrument comes up with the engines, like the dust: the opening frame is still a photograph
		wake.value = wakeAmount
		const cells = Math.round(p * HUD_CELLS)
		const bar = `${'='.repeat(cells)}${'-'.repeat(HUD_CELLS - cells)}`
		const pct = String(Math.round(p * 100)).padStart(3)
		leg.value = `${LEGS.find(l => p < l[0])[1]}  [${bar}] ${pct}%`
		markOn.value = p > MARK_AT
		arrive.value = clamp01((p - ARRIVE_FROM) / ARRIVE_SPAN)
	}

	const {
		supported,
		booting,
		bootProgress,
		bootCeiling,
		grid,
		wake: wakeLoop,
	} = useArtCanvas(canvasRef, {
		bootWeights: BOOT_WEIGHTS,
		build,
		frame,
		resize(size) {
			passes.title.resize(size)
			drawn = -1
		},
		release() {
			for (const pass of Object.values(passes ?? {})) pass.release()
			passes = null
		},
	})

	// the loop parks once the flight has settled, so every input that can move the camera wakes it
	useWindowListener('scroll', wakeLoop)
	// Pointer look, mouse only: a touch drag is a scroll, and reading it as a look would fight it.
	if (!still)
		useWindowListener('pointermove', e => {
			if (e.pointerType !== 'mouse') return
			look.tx = (e.clientX / window.innerWidth) * 2 - 1
			look.ty = (e.clientY / window.innerHeight) * 2 - 1
			wakeLoop()
		})

	return { supported, booting, bootProgress, bootCeiling, leg, wake, hint, arrive, markOn }
}

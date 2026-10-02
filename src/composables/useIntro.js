// The intro's runtime: one art canvas, the storyboard's clock, and what the overlays need to know.

import { computed, ref, shallowRef } from 'vue'
import { FULLSCREEN_QUAD, staticBuffer } from '../js/gl.js'
import { INTRO_SHOTS } from '../js/intro/index.js'
import { createIntroPass } from '../js/intro/introPass.js'
import { sky } from '../js/intro/sky.js'
import { createTransition } from '../js/intro/transition.js'
import blackFrag from '../shaders/intro/black.frag.glsl?raw'
import { prefersReducedMotion } from './usePrefersReducedMotion.js'
import { useArtCanvas } from './useArtCanvas.js'
import { useWindowListener } from './useWindowListener.js'
import {
	INTRO_BOOT_WEIGHTS,
	INTRO_INSPECT,
	INTRO_LOOK_EASE,
	INTRO_STILL_START,
} from '../constants/intro/timeline.js'
import {
	INTRO_OVERLAY_AT,
	INTRO_SKIP_DUR,
	INTRO_TRANSITIONS,
	TRANSITION_KINDS,
} from '../constants/intro/transitions.js'

// On the dev server `?shot=key&t=seconds` opens the intro there, for tuning a shot in isolation.
function opening(still) {
	const at = key =>
		Math.max(
			0,
			INTRO_SHOTS.findIndex(s => s.key === key)
		)
	if (import.meta.env.DEV) {
		const q = new URLSearchParams(window.location.search)
		if (q.has('shot')) return { index: at(q.get('shot')), t: Number(q.get('t')) || 0 }
	}
	return { index: still ? at(INTRO_STILL_START) : 0, t: 0 }
}

export function useIntro(canvasRef) {
	const still = prefersReducedMotion()
	// the shot on screen, its card, the milestones it has passed, and its clock at a tenth of a second
	const shot = shallowRef(null)
	const card = ref('')
	const marks = ref({})
	const clock = ref(0)
	// false while a transition is still showing mostly the outgoing shot: the overlays wait for it
	const settled = ref(true)
	// every choice the player has made, for the overlays; io carries the same for the shots
	const choices = ref({ role: null, responded: false })
	// dev inspection: the frozen frame's clock, and how far the arrows have asked it to move
	const paused = ref(
		import.meta.env.DEV && new URLSearchParams(window.location.search).has(INTRO_INSPECT.param)
	)
	const pausedAt = ref(0)
	let stepBy = 0

	// What the shots read and write: the pointer, and every choice the player has made.
	const io = { look: [0, 0], ptr: [0.5, 0.5], down: false, still, role: null, responded: false }
	const look = { tx: 0, ty: 0 }
	let index = -1
	let local = 0
	// the shot's card has had its turn: once a choice comes up it goes, and it does not come back
	let cardShown = false
	let gl = null
	let quad = null
	let passes = null
	let mixer = null
	// the shot being left, still running under the transition: { shot, local, kind, dur, t }
	let leaving = null

	function go(i, t = 0) {
		const px = shot.value?.cellPx
		index = i
		shot.value = INTRO_SHOTS[i] ?? null
		// a shot on its own pixel size takes the grid with it; the shot it leaves redraws on it too
		if (shot.value?.cellPx !== px) refit()
		local = t
		card.value = ''
		cardShown = false
		marks.value = {}
		clock.value = 0
		shot.value?.enter?.(io)
	}

	// the last shot is where the intro rests: nothing to skip to
	const last = computed(() => shot.value === INTRO_SHOTS[INTRO_SHOTS.length - 1])

	// `skipped` hurries the same transition rather than dropping it
	function next(skipped = false) {
		if (!shot.value || last.value) return
		const into = INTRO_TRANSITIONS[INTRO_SHOTS[index + 1].key]
		const from = { shot: shot.value, local }
		go(index + 1)
		if (!into || still) {
			leaving = null
			return
		}
		const dur = skipped ? Math.min(into.dur, INTRO_SKIP_DUR) : into.dur
		leaving = { ...from, kind: TRANSITION_KINDS[into.kind], dur, t: 0 }
		settled.value = false
	}

	function skip() {
		next(true)
	}

	// a choice made in the overlays, for the shot waiting on it
	function choose(key, value) {
		io[key] = value
		choices.value = { ...choices.value, [key]: value }
	}

	// what the visor shows and what the player is being asked, as the shot on screen defines them
	const hud = computed(() => shot.value?.hud?.(clock.value, marks.value, choices.value) ?? null)
	const choice = computed(
		() => shot.value?.choice?.(clock.value, marks.value, choices.value) ?? null
	)

	// A shot whose shader fails on this GPU plays black rather than taking the intro down with it.
	function compile(s) {
		try {
			return createIntroPass(gl, quad, s.frag, s.chunks)
		} catch (err) {
			console.error(`intro shot ${s.key}:`, err)
			return createIntroPass(gl, quad, blackFrag)
		}
	}

	async function build(glCtx, step) {
		gl = glCtx
		quad = staticBuffer(gl, FULLSCREEN_QUAD)
		await step('context')
		passes = Object.fromEntries(INTRO_SHOTS.map(s => [s.key, compile(s)]))
		mixer = createTransition(gl, quad)
		sky.setup(gl)
		for (const s of INTRO_SHOTS) s.setup?.(gl)
		await step('programs')
		const { index: i, t } = opening(still)
		go(i, t)
	}

	function frame(dt) {
		const s = shot.value
		if (!s) return false
		if (paused.value) {
			dt = stepBy
			stepBy = 0
		} else {
			io.look[0] += (look.tx - io.look[0]) * INTRO_LOOK_EASE
			io.look[1] += (look.ty - io.look[1]) * INTRO_LOOK_EASE
		}
		local = Math.max(0, local + dt)
		if (s.card && !cardShown && local >= s.card.at) {
			card.value = s.card.text
			cardShown = true
		}
		// a choice takes the frame: the card has had its turn by then
		if (card.value && choice.value) card.value = ''
		if (s.marks)
			for (const [k, at] of Object.entries(s.marks))
				if (!marks.value[k] && local >= at) marks.value = { ...marks.value, [k]: true }
		const tenth = Math.floor(local * 10) / 10
		if (tenth !== clock.value) clock.value = tenth
		if (leaving) {
			const l = leaving
			l.t += dt
			l.local += dt
			const progress = Math.min(1, l.t / l.dur)
			if (progress >= INTRO_OVERLAY_AT) settled.value = true
			mixer.draw(
				grid,
				progress,
				l.kind,
				() => paint(l.shot, l.local),
				() => paint(s, local)
			)
			if (progress >= 1) leaving = null
		} else paint(s, local)
		if (s.duration ? local >= s.duration : s.ready?.(local, io)) next()
		if (!paused.value) return true
		hold()
		// a frozen frame keeps drawing until the loop parks, so a resize never leaves it blank
		return dt !== 0
	}

	// the frozen frame's address, so a reload comes back to it
	function hold() {
		if (pausedAt.value === local) return
		pausedAt.value = local
		const q = new URLSearchParams({ shot: shot.value.key, t: local.toFixed(2) })
		q.set(INTRO_INSPECT.param, '')
		window.history.replaceState(window.history.state, '', `?${q}`)
	}

	function paint(s, t) {
		const u = s.params(t, io, gl, grid)
		passes[s.key].draw(grid, { time: t, look: io.look, ptr: io.ptr, ...u })
	}

	const { supported, booting, bootProgress, bootCeiling, grid, refit, wake } = useArtCanvas(
		canvasRef,
		{
			bootWeights: INTRO_BOOT_WEIGHTS,
			cellPx: () => shot.value?.cellPx,
			build,
			frame,
			resize(size) {
				for (const s of INTRO_SHOTS) s.resize?.(gl, size)
			},
			release() {
				for (const s of INTRO_SHOTS) s.release?.(gl)
				for (const pass of Object.values(passes ?? {})) pass.release()
				passes = null
				mixer?.release()
				mixer = null
				if (sky.texture) sky.release(gl)
				leaving = null
				if (quad) gl.deleteBuffer(quad)
				quad = null
			},
		}
	)

	// The pointer over the frame: a look for the mouse, a position for whatever a shot lets you touch.
	function track(e) {
		io.ptr[0] = e.clientX / window.innerWidth
		io.ptr[1] = 1 - e.clientY / window.innerHeight
		if (e.pointerType !== 'mouse' || still) return
		look.tx = (e.clientX / window.innerWidth) * 2 - 1
		look.ty = (e.clientY / window.innerHeight) * 2 - 1
	}
	useWindowListener('pointermove', track)
	useWindowListener('pointerdown', e => {
		track(e)
		io.down = true
	})
	useWindowListener('pointerup', () => {
		io.down = false
	})
	useWindowListener('pointercancel', () => {
		io.down = false
	})

	if (import.meta.env.DEV)
		useWindowListener(
			'keydown',
			e => {
				const { toggle, back, forward, frameS, shiftS } = INTRO_INSPECT
				if (toggle.includes(e.key)) paused.value = !paused.value
				else if (paused.value && (e.key === back || e.key === forward))
					stepBy += (e.shiftKey ? shiftS : frameS) * (e.key === back ? -1 : 1)
				else return
				e.preventDefault()
				wake()
			},
			// not passive: Space must not also press the focused SKIP
			{}
		)

	return {
		supported,
		booting,
		bootProgress,
		bootCeiling,
		shot,
		card,
		marks,
		clock,
		settled,
		hud,
		choice,
		last,
		skip,
		choose,
		paused,
		pausedAt,
	}
}

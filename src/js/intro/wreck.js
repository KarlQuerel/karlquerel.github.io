import frag from '../../shaders/intro/corridor.frag.glsl?raw'
import hands from '../../shaders/intro/hands.glsl?raw'
import human from '../../shaders/intro/human.glsl?raw'
import edgeCells from '../../shaders/intro/edgeCells.glsl?raw'
import { INTRO_PUSH_HINT, INTRO_ROLES, INTRO_WALK_HINT } from '../../data/gameIntro.js'
import { ACT_WRECK } from '../../data/gameActs.js'
import { itemOf } from './wake.js'
import { paletteSnap } from './paletteSnap.js'
import { breathe, createWalk, lookWalk, stepWalk } from './walk.js'
import { createGait, footFrame, stepGait } from './gait.js'
import { aimDrift, createDrift, driftUniforms, pushDrift, stepDrift } from './drift.js'
import { CORRIDOR } from '../../constants/intro/corridor.js'
import { WALK_KEYS } from '../../constants/intro/walk.js'
import { WRECK } from '../../constants/intro/wreck.js'
import { PLAY, WRECK_ACT } from '../../constants/game/play.js'
import { approach, clamp } from '../math.js'

// the pod once it is vented: out of the ship, nowhere the march can find it
const GONE = [0, -50, 0, 0, 0, 0, 0, 1]

// the walk, the boots, the pod, where the view meets it, the last push, the suit's readout, and the
// beat the player stands at
function fresh() {
	const walk = createWalk(CORRIDOR.walk)
	return {
		walk,
		gait: createGait(walk),
		pod: createDrift(),
		aimed: null,
		using: false,
		pushedAt: null,
		last: null,
		wrist: 0,
		wristUsed: false,
		fog: 0,
		game: null,
		line: '',
		at: null,
		vented: false,
	}
}
let state = fresh()
const palette = paletteSnap(WRECK.palette, CORRIDOR.seam)
const held = codes => io => codes.some(code => io.keys.has(code))
const using = held(WALK_KEYS.use)
const wristUp = held(WALK_KEYS.wrist)
const near = (w, spot) => Math.hypot(w.x - spot.x, w.z - spot.z) < spot.reach

// what the player stands at, in the order the beats take precedence
function spotAt(w, pod, aimed) {
	const S = WRECK_ACT.spots
	if (aimed || Math.hypot(w.x - pod.p[0], w.z - pod.p[2]) < S.pod.reach) return 'pod'
	if (near(w, S.log)) return 'log'
	// the way down waits beside the transmitter, and only once the envoy knows it is gone
	if (state.game?.is('tx') && near(w, S.descend)) return 'descend'
	if (near(w, S.tx)) return 'tx'
	return null
}

// the helmet lamp on its battery: full at the wake, a glow once spent, a stepped flicker on the way
function lampLevel(t) {
	const L = PLAY.lamp
	const level = L.floor + (1 - L.floor) * clamp(1 - t / L.fullS, 0, 1)
	return level < L.flickerBelow && Math.floor(t * 13) % 3 === 0 ? level * 0.6 : level
}

// what the wreck looked like last, for the descent to shake
let lastView = null
export const wreckView = () => lastView

// Act I opens here: the corridor's own source drawn wrecked, so a change to the corridor lands in both.
// The envoy wakes with the role's tool in hand, reads the log, finds the transmitter gone, decides what
// to do with the second pod, and rides their own down.
export const wreck = {
	key: 'wreck',
	frag,
	chunks: [hands, human, palette, edgeCells, '#define WRECK'],
	edges: palette,
	cellPx: CORRIDOR.cellPx,
	pov: true,
	walk: true,
	act: true,
	checkpoint: true,
	duration: 0,
	enter(io) {
		state = fresh()
		io.game.reset()
		if (io.role) io.game.take(io.role)
		io.pod = io.descend = null
	},
	params(t, io) {
		const { walk: w, gait: g, pod } = state
		const game = io.game
		state.game = game
		const voice = ACT_WRECK.voice
		const dt = state.last === null ? 0 : t - state.last
		state.last = t
		lookWalk(w, io.turn)
		io.turn[0] = io.turn[1] = 0
		if (dt > 0) {
			stepWalk(w, io.keys, dt, CORRIDOR.walk)
			// before the boots: the pod may have stopped the player short
			if (!state.vented) stepDrift(pod, w, dt)
			stepGait(g, w, dt)
			if (w.sprint) game.spend('o2', PLAY.sprintO2 * dt)
		}
		state.aimed = state.vented ? null : aimDrift(pod, w)
		state.at = spotAt(w, pod, state.aimed)
		// the suit's readout, held up with Tab
		const up = wristUp(io)
		if (up) state.wristUsed = true
		state.wrist = approach(state.wrist, up ? 1 : 0, dt, PLAY.wristS)
		state.fog = approach(
			state.fog,
			w.sprint ? 1 : 0,
			dt,
			w.sprint ? PLAY.fog.inS : PLAY.fog.outS
		)
		// one push, read or check per press of the key
		const use = using(io)
		if (use && !state.using) {
			if (state.aimed) {
				pushDrift(pod, w, state.aimed)
				state.pushedAt = t
			} else if (state.at === 'log' && !game.is('log')) {
				game.set('log')
				state.line = voice.log
			} else if (state.at === 'tx' && !game.is('tx')) {
				game.set('tx')
				state.line = voice.tx
			}
		}
		state.using = use
		// the beats: the wake, the pod's fate, and the way down
		if (t >= WRECK_ACT.wakeAt && !game.is('woke')) {
			game.set('woke')
			state.line = voice.wake
		}
		if (state.at === 'pod' && !io.pod && !game.is('podSeen')) {
			game.set('podSeen')
			state.line = voice.pod
		}
		if (io.pod && !game.is('podDone')) {
			game.set('podDone')
			if (io.pod === 'vent') {
				game.gain('hull', WRECK_ACT.vent.hull)
				game.set('vented')
				state.vented = true
				state.line = voice.vent
			} else state.line = voice.keep
		}
		if (io.descend === 'wait' && state.at !== 'descend') io.descend = null
		if (io.descend === 'go' && !game.is('descending')) {
			game.set('descending')
			state.line = voice.descend
		}
		const pushing = state.pushedAt !== null && t < state.pushedAt + WRECK.handsS
		lastView = {
			p: [w.z, io.still ? 0 : g.rise + breathe(t), 0, lampLevel(t)],
			q: [io.still ? 0 : g.sway, w.x, w.heading, w.pitch],
			r: footFrame(g.feet[0], w),
			s: footFrame(g.feet[1], w),
			// the tool in the right hand; both hands reach out for a push and drop again
			h: [pushing ? 1 : 2, itemOf(io), 1, 0],
			b: state.vented ? GONE : driftUniforms(pod),
			g: game.uniform(state.wrist),
			suit: [state.fog, 0, 0, 0],
		}
		return lastView
	},
	caption: () => state.line,
	hint(_clock, _marks, choices) {
		const H = ACT_WRECK.hints
		if (!choices.role) return null
		if (!state.walk.moved) return INTRO_WALK_HINT
		if (!state.wristUsed) return H.suit
		if (state.aimed) return INTRO_PUSH_HINT
		if (state.at === 'log' && !state.game.is('log')) return H.log
		if (state.at === 'tx' && !state.game.is('tx')) return H.tx
		return null
	},
	choice: (_clock, _marks, choices) => {
		if (!choices.role)
			return { key: 'role', options: INTRO_ROLES.map(({ key, label }) => ({ key, label })) }
		// once the voice has asked about the pod, the question stands until it is answered
		if (state.game?.is('podSeen') && !choices.pod)
			return { key: 'pod', options: ACT_WRECK.choices.pod }
		if (state.at === 'descend' && !choices.descend && state.game?.is('tx'))
			return { key: 'descend', options: ACT_WRECK.choices.descend }
		return null
	},
	ready: (_t, io) => (io.descend === 'go' ? 'descent' : false),
}

import frag from '../../shaders/intro/surface.frag.glsl?raw'
import hands from '../../shaders/intro/hands.glsl?raw'
import human from '../../shaders/intro/human.glsl?raw'
import edgeCells from '../../shaders/intro/edgeCells.glsl?raw'
import { INTRO_WALK_HINT } from '../../data/gameIntro.js'
import { ACT_SURFACE } from '../../data/gameActs.js'
import { itemOf } from '../intro/wake.js'
import { paletteSnap } from '../intro/paletteSnap.js'
import { breathe, createWalk, lookWalk, stepWalk } from '../intro/walk.js'
import { createGait, footFrame, stepGait } from '../intro/gait.js'
import { terrainHeight } from './terrain.js'
import { SURFACE } from '../../constants/game/surface.js'
import { WALK_KEYS } from '../../constants/intro/walk.js'
import { PLAY } from '../../constants/game/play.js'
import { approach } from '../math.js'

// the walk, the head, the suit's readout, the scanner's sweep, the voice's line and the beat stood at
function fresh() {
	const walk = createWalk(SURFACE.walk)
	return {
		walk,
		gait: createGait(walk, SURFACE.lope),
		last: null,
		wrist: 0,
		fog: 0,
		scan: 0,
		line: '',
		at: null,
		using: false,
		game: null,
		ending: null,
	}
}
let state = fresh()
export const SURFACE_CHUNKS = Object.freeze({
	frag,
	chunks: [hands, human, paletteSnap(SURFACE.palette, SURFACE.seam, true), edgeCells],
})
const palette = SURFACE_CHUNKS.chunks[2]
// the surface as it last looked, for the endings to hold
let lastView = null
export const surfaceView = () => lastView
const held = codes => io => codes.some(code => io.keys.has(code))
const using = held(WALK_KEYS.use)
const wristUp = held(WALK_KEYS.wrist)
const near = (w, spot) => Math.hypot(w.x - spot.x, w.z - spot.z) < spot.reach
// a boot's frame for the shader, lifted or sunk by the ground's rise under it from the player's
function footOn(f, w, groundY) {
	const frame = footFrame(f, w)
	frame[2] += terrainHeight(f.x, f.z) - groundY
	return frame
}

function spotAt(w) {
	const S = SURFACE.spots
	if (near(w, S.dish)) return 'dish'
	if (near(w, S.sample)) return 'sample'
	if (near(w, S.fronds)) return 'fronds'
	// the ridge is a crest, not a spot: anywhere along its top counts
	if (Math.abs(w.z - S.ridge.z) < S.ridge.reach && Math.abs(w.x - S.ridge.x) < S.ridge.width)
		return 'ridge'
	return null
}

// the ending the meters and the choice add up to
function endingFor(game, sent) {
	if (!sent) return 'end-silence'
	if (!game.green) return 'end-lie'
	return game.o2 > 0 ? 'end-green-alive' : 'end-green'
}

// Acts II and III: the envoy on the ground. Take the dish from the pod, test the air, the water and
// the ground, climb the ridge, and decide what to send with the air that is left.
export const surface = {
	key: 'surface',
	...SURFACE_CHUNKS,
	edges: palette,
	cellPx: SURFACE.cellPx,
	pov: true,
	walk: true,
	checkpoint: true,
	duration: 0,
	enter(io) {
		state = fresh()
		io.air = io.send = null
	},
	params(t, io) {
		const { walk: w, gait: g } = state
		const game = io.game
		const voice = ACT_SURFACE.voice
		state.game = game
		const dt = state.last === null ? 0 : t - state.last
		state.last = t
		lookWalk(w, io.turn)
		io.turn[0] = io.turn[1] = 0
		if (dt > 0) {
			stepWalk(w, io.keys, dt, SURFACE.walk)
			stepGait(g, w, dt)
		}
		const groundY = terrainHeight(w.x, w.z)
		const eyeY = groundY + SURFACE.eye
		const depth = Math.max(0, SURFACE.terrain.water - eyeY)
		// the suit: air goes with time and the run, the hull with every metre under water
		if (dt > 0) {
			const breathing = game.is('helmetOpen')
			if (!breathing) game.spend('o2', (SURFACE.o2PerS + (w.sprint ? PLAY.sprintO2 : 0)) * dt)
			if (depth > 0) game.spend('hull', depth * SURFACE.hullPerMS * dt)
		}
		const up = wristUp(io)
		state.wrist = approach(state.wrist, up ? 1 : 0, dt, PLAY.wristS)
		state.fog = approach(
			state.fog,
			w.sprint ? 1 : 0,
			dt,
			w.sprint ? PLAY.fog.inS : PLAY.fog.outS
		)
		state.at = spotAt(w)
		// the verbs: take the dish, take the sample
		const use = using(io)
		if (use && !state.using) {
			if (state.at === 'dish' && !game.has('dish')) {
				game.take('dish')
				state.line = voice.dish
			} else if (state.at === 'sample' && depth > 0 && game.found.water === undefined) {
				const ok = game.test('water')
				if (!ok) game.spend('hull', SURFACE.acidHull)
				state.line = ok ? voice.waterOk : voice.waterBad
			}
		}
		state.using = use
		// the scanner, held on the right button among the fronds
		if (io.scan && state.at === 'fronds' && game.found.ground === undefined) {
			state.scan = Math.min(1, state.scan + dt / SURFACE.scan.seconds)
			if (state.scan >= 1) {
				game.spend('signal', SURFACE.scan.signal)
				state.line = game.test('ground') ? voice.groundOk : voice.groundBad
				state.scan = 0
			}
		} else state.scan = Math.max(0, state.scan - dt / SURFACE.scan.seconds)
		// the voice: the landing, the lake, the fronds, the air, the ridge
		if (t >= SURFACE.landAt && !game.is('landed')) {
			game.set('landed')
			state.line = voice.land
		}
		if (depth > 0 && !game.is('wet')) {
			game.set('wet')
			state.line = voice.water
		}
		if (state.at === 'fronds' && !game.is('seenFronds')) {
			game.set('seenFronds')
			state.line = voice.scan
		}
		if (t >= SURFACE.airAskAt && !game.is('airAsked') && depth === 0) {
			game.set('airAsked')
			state.line = voice.air
		}
		if (io.air === 'open' && !game.is('airTried')) {
			game.set('airTried')
			if (game.test('air')) {
				game.set('helmetOpen')
				game.gain('o2', 100)
				state.line = voice.airOk
			} else {
				state.line = voice.airBad
				state.ending = 'end-dead'
			}
		}
		if (state.at === 'ridge' && !game.has('dish') && !game.is('ridgeEarly')) {
			game.set('ridgeEarly')
			state.line = voice.noDish
		}
		if (state.at === 'ridge' && game.has('dish') && !game.is('onRidge')) {
			game.set('onRidge')
			state.line = game.confirmed() ? voice.ridge : voice.unsure
		}
		if (io.send && !game.is('sent')) {
			game.set('sent')
			if (io.send === 'green') game.spend('o2', SURFACE.sendO2)
			state.ending = endingFor(game, io.send === 'green')
		}
		if (game.o2 <= SURFACE.o2Low && !game.is('o2Low') && !game.is('helmetOpen')) {
			game.set('o2Low')
			state.line = voice.o2Low
		}
		if (game.o2 <= 0 && !state.ending) state.ending = 'end-dead'
		// the fronds show their truth to the scanner and, faintly, to the eye
		const alive = game.green || game.fails !== 'ground'
		lastView = {
			p: [w.z, io.still ? 0 : g.rise + breathe(t), state.scan, game.is('helmetOpen') ? 1 : 0],
			q: [io.still ? 0 : g.sway, w.x, w.heading, w.pitch],
			r: footOn(g.feet[0], w, groundY),
			s: footOn(g.feet[1], w, groundY),
			h: [2, itemOf(io), 1, 0],
			// uB[0]: the eye over the ground, the dish taken, the fronds alive, the sample taken;
			// uB[1]: the depth under water, the ground under the player
			b: [
				eyeY,
				game.has('dish') ? 1 : 0,
				alive ? 1 : 0,
				game.found.water === undefined ? 0 : 1,
				depth,
				groundY,
				0,
				0,
			],
			g: game.uniform(state.wrist),
			suit: [state.fog, 0, 0, 0],
		}
		return lastView
	},
	caption: () => state.line,
	hint() {
		const H = ACT_SURFACE.hints
		const game = state.game
		if (!game) return null
		if (!state.walk.moved) return INTRO_WALK_HINT
		if (state.at === 'dish' && !game.has('dish')) return H.dish
		if (state.at === 'sample' && game.found.water === undefined) return H.sample
		if (state.at === 'fronds' && game.found.ground === undefined) return H.scan
		return null
	},
	choice: (_clock, _marks, choices) => {
		const game = state.game
		if (!game) return null
		if (game.is('airAsked') && !choices.air)
			return { key: 'air', options: ACT_SURFACE.choices.air }
		if (game.is('onRidge') && state.at === 'ridge' && !choices.send)
			return { key: 'send', options: ACT_SURFACE.choices.send }
		return null
	},
	ready: () => state.ending ?? false,
}

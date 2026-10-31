import black from '../../shaders/intro/black.frag.glsl?raw'
import { ENDINGS, ENDING_AGAIN } from '../../data/gameActs.js'
import { INTRO_ACT } from '../../data/gameIntro.js'
import { SURFACE_CHUNKS, surfaceView } from './surface.js'
import { SURFACE } from '../../constants/game/surface.js'
import { terrainHeight } from './terrain.js'

// the voice's last line comes this long after the card
const LINE_AT = 3.5
// an ending opened on its own (dev): the surface from where the pod came down, no hands
const GROUND = terrainHeight(0, 0)
const STILL = { b: [GROUND + SURFACE.eye, 1, 1, 0, 0, GROUND, 0, 0], h: [0, 0, 0, 0] }

// The endings: the name with the ending's own title typed under it, then the voice's last line.
// Every ending but the suit's death holds the world as the envoy last saw it; that one is black.
// Each rests until the player leaves. Keyed 'end-<name>'.
export const ENDING_SHOTS = Object.entries(ENDINGS).map(([name, { lead, accent, line }]) => ({
	key: `end-${name}`,
	...(name === 'dead'
		? { frag: black, params: () => ({}) }
		: {
				...SURFACE_CHUNKS,
				edges: SURFACE_CHUNKS.chunks[2],
				cellPx: SURFACE.cellPx,
				params: () => surfaceView() ?? STILL,
			}),
	title: { lead, accent, delayMs: INTRO_ACT.delayMs, charMs: INTRO_ACT.charMs },
	card: { at: LINE_AT, text: line },
	end: true,
	duration: 0,
	enter(io) {
		io.again = null
	},
	// the way back in, once the last line has been read
	choice: clock => (clock >= LINE_AT + 2 ? { key: 'again', options: ENDING_AGAIN } : null),
	ready: (_t, io) => (io.again ? 'wreck' : false),
}))

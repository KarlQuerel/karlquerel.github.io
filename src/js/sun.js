// Where the arrival's sun stands. It crosses the whole sky rather than setting where it rose: straight
// up from behind the right-hand range, over in a low arc, straight down behind the left, then back
// under the world the way it came, so the glow before dawn gathers on the right where it will come up.
// None of it answers to the scroll — the hour the visitor arrives only says where in the day they come in.

import { ENTRY } from '../constants/journey.js'
import { clamp01 } from './math.js'

const DAY_MINUTES = 24 * 60
const TURN = 2 * Math.PI

// Where the sun is, what its light is doing, and how far night has come. All of it answers to the
// sun's height and nothing else: the rim reddens as it comes down (`low`), and night falls by how far
// under the skyline it is, so midnight is dark because the sun is under the world then — not because a
// timer said so. Night walks linearly with depth: twilight loses light about evenly per degree the sun
// sinks, and the arc already slows it into the bottom of the turn.
export function sunAt(elapsed = 0, now = new Date()) {
	const { horizon, rise, span, cycleMs, nightFrom, nightFull, floor } = ENTRY.sun.circuit
	const hour = (now.getHours() * 60 + now.getMinutes()) / DAY_MINUTES
	// a quarter turn back, so the top of the arc is noon and it comes up at six
	const turn = (hour + elapsed / cycleMs) * TURN - TURN / 4
	// An ellipse, not a lid: sideways it is slowest where it meets the skyline, so it comes up and goes
	// down near enough straight, the way a low sun does, and is never cut by the frame's edge.
	const y = horizon - rise * Math.sin(turn)
	const top = horizon - rise
	const gone = clamp01((y - nightFrom) / (nightFull - nightFrom))
	return {
		x: 0.5 + span * Math.cos(turn),
		y,
		// how far down its arc the disc has come: 0 at the top of the turn, 1 as it meets the skyline
		low: clamp01((y - top) / (nightFrom - top)),
		light: 1 - (1 - floor) * gone,
		night: ENTRY.sun.night * gone,
	}
}

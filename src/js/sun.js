// Where the arrival's sun stands. It crosses the whole sky rather than setting where it rose: up from
// behind the right-hand range, over in a low arc, down behind the left, then back under the world the
// way it came, so the glow before dawn gathers on the right where it will come up. None of it answers
// to the scroll — the hour the visitor arrives only says where in the day they come in.

import { ENTRY } from '../constants/journey.js'
import { clamp01 } from './math.js'

const DAY_MINUTES = 24 * 60

// Where the sun is, what its light is doing, and how far night has come. All of it answers to the
// sun's height and nothing else: the rim reddens as it comes down (`low`), and night falls by how far
// under the skyline it is, so midnight is dark because the sun is under the world then — not because a
// timer said so. Night walks linearly with depth: twilight loses light about evenly per degree the sun
// sinks, and the arc already slows it into the bottom of the turn.
export function sunAt(elapsed = 0, now = new Date()) {
	const { horizon, rise, span, cycleMs, nightFrom, floor } = ENTRY.sun.circuit
	const hour = (now.getHours() * 60 + now.getMinutes()) / DAY_MINUTES
	// the day from sunrise, 0..1, so it comes up at six and stands highest at noon
	const day = (((hour + elapsed / cycleMs - 0.25) % 1) + 1) % 1
	// Across the frame at one pace, right to left by day and back under the world by night, on a
	// parabola over the skyline and its mirror under it. A sun crosses the sky at a steady pace on a
	// line near enough straight; an ellipse plunged at the horizon and curled back while still in view.
	const up = day < 0.5
	const u = up ? 1 - 4 * day : 4 * day - 3
	const arc = rise * (1 - u * u)
	const y = up ? horizon - arc : horizon + arc
	const top = horizon - rise
	// night is full at the bottom of the turn, so the whole way down is twilight and none of it a plateau
	const gone = clamp01((y - nightFrom) / (horizon + rise - nightFrom))
	return {
		x: 0.5 + span * u,
		y,
		// how far down its arc the disc has come: 0 at the top of the turn, 1 as it meets the skyline
		low: clamp01((y - top) / (nightFrom - top)),
		light: 1 - (1 - floor) * gone,
		night: ENTRY.sun.night * gone,
	}
}

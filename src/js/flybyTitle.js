// The name as a plane in the scene: owns both its geometry and the canvas the letters are drawn into.

import { camAt } from './flybyPath.js'
import { cross, norm, sub } from './vec3.js'
import { FOCAL, HEADING_SPAN, PATH, Q_COUNTER, TITLE, TITLE_FLOOR, UP } from '../constants/flyby.js'

// the width the layout constants in TITLE are quoted in
const TITLE_REF = TITLE.tex[0]

const pos = camAt(TITLE.at)
// The plane's anchor, and the point the flight pierces it — a hole that happens to be inside a letter.
const refBlock = (TITLE.tex[0] - (TITLE.name.join('').length * TITLE.size + TITLE.gap)) / 2
const refQ = refBlock + TITLE.name[0].length * TITLE.size + TITLE.gap
const anchor = [
	(refQ + Q_COUNTER[0] * TITLE.size) / TITLE.tex[0],
	(TITLE.nameY + Q_COUNTER[1] * TITLE.size) / TITLE.tex[1],
]

// Square-on to the resting camera, not aimed at its centre: aligning to the view plane avoids keystone.
const restFwd = norm(sub(camAt(HEADING_SPAN), camAt(0)))
const restRight = norm(cross(restFwd, UP))

// Derived from the numbers in TITLE; none of it is tuned by hand.
export const TITLE_PLANE = {
	pos,
	rest: Math.hypot(...sub(pos, PATH[0].p)),
	anchor,
	wide: Math.max(anchor[0], 1 - anchor[0]), // the anchor's long side
	right: restRight,
	up: cross(restRight, restFwd),
}

// Hold the title in frame on narrow viewports: screen x is 2*focal*X/(z*aspect), capped at 0.86 of the edge.
export function planeWidth(aspect) {
	return Math.min(TITLE.w, (0.43 * TITLE_PLANE.rest * aspect) / (FOCAL * TITLE_PLANE.wide))
}

// Author the texture at the pixels the plane covers at rest — one texel per art pixel, so it cannot shimmer.
export function textureSize(planeW, artH) {
	const px = Math.max(TITLE_FLOOR, Math.round((FOCAL * planeW * artH) / TITLE_PLANE.rest))
	return [px, Math.round(px / 4)]
}

// Draw at exactly the pixels the plane covers; NEAREST then breaks the letters chunky rather than soft.
export function drawTitleCanvas([texW, texH]) {
	const c = document.createElement('canvas')
	c.width = texW
	c.height = texH
	// The layout constants are quoted against a 512-wide texture; scale them to this one.
	const k = c.width / TITLE_REF
	const size = Math.max(8, Math.round(TITLE.size * k))
	const roleSize = Math.max(5, Math.round(TITLE.roleSize * k))
	const gap = Math.round(TITLE.gap * k)
	const nameY = Math.round(TITLE.nameY * k)
	const roleY = Math.round(TITLE.roleY * k)
	const block = Math.round((c.width - (TITLE.name.join('').length * size + gap)) / 2)

	const x = c.getContext('2d')
	x.textBaseline = 'middle'
	// A keyline all the way round, not a drop shadow: the words cross the lit limb and a cloud deck.
	const line = (text, px, left, cy) => {
		x.font = `${px}px "Press Start 2P", monospace`
		const d = Math.max(1, Math.round(px / 8))
		x.fillStyle = TITLE.edge
		for (let ox = -d; ox <= d; ox++)
			for (let oy = -d; oy <= d; oy++) x.fillText(text, left + ox, cy + oy)
		x.fillStyle = TITLE.ink
		x.fillText(text, left, cy)
	}

	const [first, last] = TITLE.name
	line(first, size, block, nameY)
	line(last, size, block + first.length * size + gap, nameY)
	// Centred under the name, not on the word space — the flight goes through the Q, so the space is free.
	const nameW = TITLE.name.join('').length * size + gap
	line(
		TITLE.role,
		roleSize,
		Math.round(block + nameW / 2 - (TITLE.role.length * roleSize) / 2),
		roleY
	)

	return c
}

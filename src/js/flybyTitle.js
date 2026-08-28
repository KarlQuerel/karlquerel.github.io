// The name, as a plane standing in the scene. This module owns both the geometry the
// plane hangs on and the canvas the letters are drawn into; the renderer only uploads
// what comes out of here.

import { camAt } from './flybyPath.js'
import { cross, norm, sub } from './vec3.js'
import { FOCAL, HEADING_SPAN, PATH, Q_COUNTER, TITLE, TITLE_FLOOR, UP } from '../constants/flyby.js'

// the width the layout constants in TITLE are quoted in
const TITLE_REF = TITLE.tex[0]

const pos = camAt(TITLE.at)
// The plane's anchor, and the point the flight pierces it. Everything the camera aims
// at is a hole; this one just happens to be inside a letter instead of between two.
const refBlock = (TITLE.tex[0] - (TITLE.name.join('').length * TITLE.size + TITLE.gap)) / 2
const refQ = refBlock + TITLE.name[0].length * TITLE.size + TITLE.gap
const anchor = [
	(refQ + Q_COUNTER[0] * TITLE.size) / TITLE.tex[0],
	(TITLE.nameY + Q_COUNTER[1] * TITLE.size) / TITLE.tex[1],
]

// Square-on to the resting camera rather than aimed at its centre: aligning to the view
// plane is what keeps the letters free of keystone. Read off the path rather than copied
// in, so curving the run-in to the letter can never leave the plane keystoned against a
// camera that has moved. This is the basis sampleFlight builds at p=0, where the focus
// pull is zero and there is no roll yet.
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

// Hold the title inside the frame on narrow viewports. Screen x is
// 2*focal*X/(z*aspect), so what caps it is the wider of the plane's two sides of the
// anchor landing at 0.86 of the frame edge. Depends on the viewport, not the scroll.
export function planeWidth(aspect) {
	return Math.min(TITLE.w, (0.43 * TITLE_PLANE.rest * aspect) / (FOCAL * TITLE_PLANE.wide))
}

// Author the texture at the pixels that plane covers at rest - one texel per art pixel,
// so the look cannot shimmer it - with a floor on how few that can be. A narrow viewport
// caps the plane to a third of its width, and a texture authored that small has nothing
// left to magnify: the flight goes past at ten times the size the letters were drawn, and
// every antialiased edge becomes a grey slab. Below the floor the letters are minified at
// rest instead, which is soft but still, and stillness is all it needs there - the look
// only answers a mouse.
export function textureSize(planeW, artH) {
	const px = Math.max(TITLE_FLOOR, Math.round((FOCAL * planeW * artH) / TITLE_PLANE.rest))
	return [px, Math.round(px / 4)]
}

// Draw the name at exactly the pixels the plane covers. NEAREST magnification then does
// the rest: close in, the letters go chunky instead of soft, which is the direction pixel
// art should break. Authoring it any smaller than the plane means LINEAR minification,
// and a minified pixel font drops a column here and there as soon as anything moves it.
export function drawTitleCanvas([texW, texH]) {
	const c = document.createElement('canvas')
	c.width = texW
	c.height = texH
	// The layout constants are quoted against a 512-wide texture; scale them to this
	// one. Rounding moves the drawn corridor off the anchor by at most a texel, out of
	// forty-odd texels of corridor, so the flight still goes down the middle of it.
	const k = c.width / TITLE_REF
	const size = Math.max(8, Math.round(TITLE.size * k))
	const roleSize = Math.max(5, Math.round(TITLE.roleSize * k))
	const gap = Math.round(TITLE.gap * k)
	const nameY = Math.round(TITLE.nameY * k)
	const roleY = Math.round(TITLE.roleY * k)
	const block = Math.round((c.width - (TITLE.name.join('').length * size + gap)) / 2)

	const x = c.getContext('2d')
	x.textBaseline = 'middle'
	// A keyline the whole way round, not a drop shadow. The words cross the moon's lit
	// limb and then a cloud deck on the way past, so they need holding off the
	// background from every side; one design pixel of it (the grid is size/8) is
	// enough, and stays a keyline rather than a smear under NEAREST.
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
	// Centred under the name now, not on the word space. It used to straddle the gap
	// because the gap was the hole the flight went through; the flight goes through the
	// Q instead, so the space is free to be a space and the role is free to be centred.
	// Rounded to a whole texel because it is a bitmap face: the role has an odd
	// character count, so this lands on a half texel whenever exactly one of the name
	// width and roleSize is odd, and half a texel puts every glyph through the
	// antialiaser, which NEAREST then magnifies on the way past. Round the centre once
	// here rather than per glyph: the words themselves are drawn as whole strings, so
	// the font's own advance keeps the tracking exact.
	const nameW = TITLE.name.join('').length * size + gap
	line(
		TITLE.role,
		roleSize,
		Math.round(block + nameW / 2 - (TITLE.role.length * roleSize) / 2),
		roleY
	)

	return c
}

// The cryo bay's heart (SHIP_CRYO): a pentagonal core deck to ceiling with a seam of light down each corner, a pod on
// each face held off the deck over a pool of light, and a ring of light in the ceiling over the pods' fronts. Each
// pod's window shows a hollow lit from just behind its glass, padded where a body stands, its number lit on the glass;
// with the lines of light the heart throws and the footprints the walk keeps clear of.

import {
	Box3,
	BoxGeometry,
	CylinderGeometry,
	ExtrudeGeometry,
	Group,
	Mesh,
	Path,
	PlaneGeometry,
	Shape,
	ShapeGeometry,
	TorusGeometry,
} from 'three'
import common from '../../shaders/intro/common.glsl?raw'
import { SHIP_CRYO } from '../../constants/game/shipCryo.js'
import { SHIP_LAYOUT } from '../../constants/game/shipLayout.js'
import { lineColor } from './roomLight.js'
import { facesMesh } from './shipRoomShell.js'
import { floorOf, heightOf } from './shipInterior.js'

const { room: id, core, pod, halo, paint, light } = SHIP_CRYO
const ROOM = SHIP_LAYOUT.rooms.find(r => r.id === id)
const FIFTH = (2 * Math.PI) / 5
const PODS = [0, 1, 2, 3, 4]
// a pentagon's corner radius from its apothem
export const corner = apothem => apothem / Math.cos(FIFTH / 2)
const middle = ([a, b]) => (a + b) / 2

// the heart's place: the room's middle on its deck, and its ceiling
export const HEART = {
	cx: middle(ROOM.x),
	cz: middle(ROOM.z),
	floor: floorOf(ROOM, middle(ROOM.z)),
	top: floorOf(ROOM, middle(ROOM.z)) + heightOf(ROOM),
}
const { cx, cz, floor, top } = HEART
// a point `radius` m out from the heart's middle at `y`, `a` rad round from the nose toward +x
export const round = (radius, y, a) => [cx + radius * Math.sin(a), y, cz + radius * Math.cos(a)]
// the core's corners lie half a fifth round from its faces
export const CORNERS = PODS.map(k => (k + 0.5) * FIFTH)
// round the heart, pod `k` fifths from the nose toward +x: the way out from the middle
const out = k => [Math.sin(k * FIFTH), Math.cos(k * FIFTH)]
// a point in pod k's frame, in the room
function inPod(k, [x, y, z]) {
	const [s, c] = out(k)
	const back = core.apothem + 0.002
	return [cx + s * (back + z) + c * x, floor + core.lift + y, cz + c * (back + z) - s * x]
}

// a pod's front outline `w` wide and `h` tall from `y0`, by its shape: an arch (a half circle on top, the foot's
// corners rounded `f`), the corridor's octagon (every corner cut at 45°, `cut` of the width), or a capsule (a half
// circle top and bottom)
const OUTLINES = {
	arch(path, w, y0, h, f) {
		const r = w / 2
		path.moveTo(-r + f, y0)
		path.lineTo(r - f, y0)
		path.quadraticCurveTo(r, y0, r, y0 + f)
		path.lineTo(r, y0 + h - r)
		path.absarc(0, y0 + h - r, r, 0, Math.PI, false)
		path.lineTo(-r, y0 + f)
		path.quadraticCurveTo(-r, y0, -r + f, y0)
		return path
	},
	octagon(path, w, y0, h) {
		const [r, c] = [w / 2, w * pod.cut]
		const corners = [
			[-r + c, y0],
			[r - c, y0],
			[r, y0 + c],
			[r, y0 + h - c],
			[r - c, y0 + h],
			[-r + c, y0 + h],
			[-r, y0 + h - c],
			[-r, y0 + c],
		]
		path.moveTo(...corners[0])
		for (const p of [...corners.slice(1), corners[0]]) path.lineTo(...p)
		return path
	},
	capsule(path, w, y0, h) {
		const r = w / 2
		path.moveTo(r, y0 + r)
		path.lineTo(r, y0 + h - r)
		path.absarc(0, y0 + h - r, r, 0, Math.PI, false)
		path.lineTo(-r, y0 + r)
		path.absarc(0, y0 + r, r, Math.PI, 2 * Math.PI, false)
		return path
	},
}
const outline = OUTLINES[pod.shape]

// a rounded rect `w` × `h` with its foot's middle at [0, y0], its corners rounded `r`
function roundRect(w, y0, h, r) {
	const s = new Shape()
	const [x0, x1, y1] = [-w / 2, w / 2, y0 + h]
	s.moveTo(x0 + r, y0)
	s.lineTo(x1 - r, y0)
	s.quadraticCurveTo(x1, y0, x1, y0 + r)
	s.lineTo(x1, y1 - r)
	s.quadraticCurveTo(x1, y1, x1 - r, y1)
	s.lineTo(x0 + r, y1)
	s.quadraticCurveTo(x0, y1, x0, y1 - r)
	s.lineTo(x0, y0 + r)
	s.quadraticCurveTo(x0, y0, x0 + r, y0)
	return s
}

// a pod in its own frame (its back on z 0 against the core, its front toward +z, its foot on y 0): the shell with
// its window cut through, the glass set back in it and a rim of light just behind the glass, the hollow's back (the
// cradle) with its pads where a body stands, the status line under the window; and its two lines of light, one
// lighting the hollow from behind the glass, one throwing its glow out into the room
const { width, depth, height, foot, bevel, rim, sill, recess, cradle, status, digits } = pod
const glass = [width - 2 * rim, sill, height - rim - sill]
const windowAt = z => new ShapeGeometry(outline(new Shape(), ...glass, foot), 24).translate(0, 0, z)
const body = new ExtrudeGeometry(
	Object.assign(outline(new Shape(), width, 0, height, foot), {
		holes: [outline(new Path(), ...glass, foot)],
	}),
	{
		depth: depth - 2 * bevel.size,
		bevelEnabled: true,
		bevelThickness: bevel.size,
		bevelSize: bevel.size,
		bevelOffset: -bevel.size,
		bevelSegments: bevel.segments,
		curveSegments: 24,
	}
).translate(0, 0, bevel.size)
const pane = windowAt(depth - recess)
const back = windowAt(cradle)
// the rim: the window's outline less itself drawn `pod.mouth` in, just behind the glass
const [gw, gy, gh] = glass
const m = pod.mouth
const mouth = new ShapeGeometry(
	Object.assign(outline(new Shape(), ...glass, foot), {
		holes: [outline(new Path(), gw - 2 * m, gy + m, gh - 2 * m, foot)],
	}),
	24
).translate(0, 0, depth - recess - 0.004)
const pads = pod.pads.map(({ w, y, h }) =>
	new ExtrudeGeometry(roundRect(w, y, h, pod.pad.round), {
		depth: pod.pad.depth,
		bevelEnabled: true,
		bevelThickness: pod.pad.round / 2,
		bevelSize: pod.pad.round / 2,
		bevelOffset: -pod.pad.round / 2,
		bevelSegments: 2,
		curveSegments: 8,
	}).translate(0, 0, cradle)
)
const lightSpan = [sill + 0.25, height - rim - 0.3]
const hollowLine = lightSpan.map(y => [0, y, depth - recess - 0.06])
const glowLine = lightSpan.map(y => [0, y, depth + 0.02])
const statusLine = new PlaneGeometry(...status).translate(0, sill / 2, depth + 0.002)

// the 3x5 font's digits, read from common.glsl so the font lives in one place: fifteen bits each, row by row from
// the top (bit y*3 + x)
const DIGITS = [...common.match(/float digitCode[\s\S]*?\n}/)[0].matchAll(/return (\d+)\.0;/g)].map(
	m => Number(m[1])
)
if (DIGITS.length !== 10) throw new Error('the 3x5 font has lost its digits')
// a pod's number, two digits a cell apart, its cells `cell` m square, its top `under` m beneath the window's top,
// lit on the glass: the corners of its cells' faces
function numberCells(n) {
	const { cell, under } = digits
	const cells = []
	const top = height - rim - under
	String(n)
		.padStart(2, '0')
		.split('')
		.forEach((d, i) => {
			for (let bit = 0; bit < 15; bit++) {
				if (!(Math.floor(DIGITS[Number(d)] / 2 ** bit) % 2)) continue
				const [x, y] = [(bit % 3) + i * 4 - 3.5, Math.floor(bit / 3)]
				const [x0, y0] = [x * cell, top - (y + 1) * cell]
				const z = depth - recess + 0.003
				const [a, b, c, e] = [
					[x0, y0, z],
					[x0 + cell, y0, z],
					[x0 + cell, y0 + cell, z],
					[x0, y0 + cell, z],
				]
				cells.push(...a, ...b, ...c, ...a, ...c, ...e)
			}
		})
	return cells
}

// the lines of light: the halo in `chords` pieces, the glow under the pods (its source a pentagon round under their
// fronts, so it pools out from beneath them), then for each pod (last, for the breath to turn up and down) the light
// in its hollow, turned back onto the pads, and its glow thrown out through the glass. The core's seams light
// nothing: so near the pods' sides, they would blanch them.
export function heartLines() {
	const ring = (radius, y, count, phase = 0) =>
		Array.from({ length: count }, (_, i) =>
			[i, i + 1].map(j => round(radius, y, phase + (j / count) * 2 * Math.PI))
		)
	const lit = (spec, lines) => lines.map(([a, b]) => ({ a, b, color: lineColor(spec) }))
	const perPod = (spec, line, way) =>
		PODS.map(k => {
			const [s, c] = out(k)
			const [a, b] = line.map(p => inPod(k, p))
			return { a, b, color: lineColor(spec), face: [way * s, 0, way * c], wrap: spec.wrap }
		})
	return [
		...lit(light.halo, ring(halo.radius, top - halo.tube, light.halo.chords)).map(l => ({
			...l,
			face: [0, -1, 0],
		})),
		...lit(light.under, ring(corner(core.under), floor + core.glow, 5, FIFTH / 2)),
		...perPod(light.hollow, hollowLine, -1),
		...perPod(light.glow, glowLine, 1),
	]
}
// how many of the heart's lines, at its end, are the pods' (and breathe)
export const POD_LINES = 2 * PODS.length

// the heart, painted by the room (`painted`): its group and its footprints
export function buildHeart(painted) {
	const group = new Group()
	// the core, deck to ceiling, a pentagon with a face toward each pod, and a seam of light down each corner
	const prism = new Mesh(
		new CylinderGeometry(corner(core.apothem), corner(core.apothem), top - floor, 5),
		painted(paint.core)
	)
	prism.position.set(cx, (floor + top) / 2, cz)
	prism.rotation.y = FIFTH / 2
	group.add(prism)
	const seam = new BoxGeometry(core.seam, top - floor - core.lift, core.seam)
	for (const a of CORNERS) {
		const strip = new Mesh(seam, painted(paint.seam))
		strip.position.set(...round(corner(core.apothem), (floor + core.lift + top) / 2, a))
		strip.rotation.y = a
		group.add(strip)
	}
	// the halo, a tube half sunk in the ceiling
	const ring = new Mesh(new TorusGeometry(halo.radius, halo.tube, 8, 96), painted(paint.line))
	ring.rotation.x = Math.PI / 2
	ring.position.set(cx, top, cz)
	group.add(ring)
	// the pods, the player's number and status line amber; the core between them
	const reach = corner(core.apothem)
	const footprints = [{ x: [cx - reach, cx + reach], z: [cz - reach, cz + reach] }]
	for (const k of PODS) {
		const yours = k === pod.yours
		const unit = new Group()
		unit.add(
			new Mesh(body, painted(paint.shell)),
			new Mesh(back, painted(paint.cradle)),
			...pads.map(p => new Mesh(p, painted(paint.pad))),
			new Mesh(mouth, painted(paint.mouth)),
			new Mesh(pane, painted(paint.glass)),
			new Mesh(statusLine, painted(paint[yours ? 'yours' : 'status'])),
			facesMesh(numberCells(pod.numbers[k]), painted(paint[yours ? 'yours' : 'number']))
		)
		unit.position.set(...inPod(k, [0, 0, 0]))
		unit.rotation.y = k * FIFTH
		group.add(unit)
		const { min, max } = new Box3().setFromObject(unit)
		footprints.push({ x: [min.x, max.x], z: [min.z, max.z] })
	}
	return { group, footprints }
}

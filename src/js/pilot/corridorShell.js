// The corridor's shell in meshes, the intro shader's octagon: deck, ceiling, the cut corners top and bottom,
// the walls, a rib every other metre standing proud of all but the deck, the bays opening off it (the wall
// and the lower cut give way across each opening, the deck runs on into the room), the sealed bulkhead
// behind and the door wall ahead with its lockers and doorway sunk into it. Each surface is one mesh of its
// kind, painted and lit by corridorSurface.glsl.

import { BufferGeometry, Float32BufferAttribute, Mesh, Shape, ShapeGeometry, Vector3 } from 'three'
import { surfaceMaterial } from './corridorMaterial.js'
import { PILOT_SET } from '../../constants/game/pilot.js'

const { halfWidth: W, height: H, chamfer: C, back, door, ribs, bays, lockers, doorway } = PILOT_SET
const v = (x, y, z) => new Vector3(x, y, z)

// the bays: their middle along z and the side they open on (three's +x first)
const BAYS = Array.from({ length: bays.count }, (_, k) => ({
	z: bays.first + k * bays.every,
	side: k % 2 ? -1 : 1,
}))
const opening = (side, z) => BAYS.some(b => b.side === side && Math.abs(z - b.z) < bays.half)
// the stretches of z along one side that are wall, not opening
function wallSpans(side) {
	const cuts = BAYS.filter(b => b.side === side).map(b => [b.z - bays.half, b.z + bays.half])
	const spans = []
	let from = back
	for (const [a, b] of cuts) {
		spans.push([from, a])
		from = b
	}
	spans.push([from, door])
	return spans
}

// flat pieces gathered by kind, each corner list wound to face n
const pieces = {}
function face(kind, corners, n) {
	const [a, b, c] = corners
	const facing = new Vector3().crossVectors(b.clone().sub(a), c.clone().sub(a)).dot(n) > 0
	const ring = facing ? corners : [...corners].reverse()
	const list = (pieces[kind] ??= { position: [], normal: [] })
	for (let i = 1; i < ring.length - 1; i++)
		for (const p of [ring[0], ring[i], ring[i + 1]]) {
			list.position.push(p.x, p.y, p.z)
			list.normal.push(n.x, n.y, n.z)
		}
}

// a strip of the cross-section from (x, y) a to b, run along z from z0 to z1, facing n (x, y)
const strip = (kind, a, b, n, z0, z1) =>
	face(
		kind,
		[v(a[0], a[1], z0), v(b[0], b[1], z0), v(b[0], b[1], z1), v(a[0], a[1], z1)],
		v(n[0], n[1], 0)
	)

// a rib's slab on one face of the cross-section: the face from a to b, `inset` in along n, `depth` along z
function slab(kind, a, b, n, z) {
	const d = ribs.depth / 2
	const t = ribs.inset
	const ai = [a[0] + n[0] * t, a[1] + n[1] * t]
	const bi = [b[0] + n[0] * t, b[1] + n[1] * t]
	strip(kind, ai, bi, n, z - d, z + d)
	const along = [b[0] - a[0], b[1] - a[1]]
	strip(kind, a, ai, [-along[0], -along[1]], z - d, z + d)
	strip(kind, bi, b, along, z - d, z + d)
	for (const s of [-1, 1]) {
		const zz = z + s * d
		face(
			kind,
			[v(a[0], a[1], zz), v(b[0], b[1], zz), v(bi[0], bi[1], zz), v(ai[0], ai[1], zz)],
			v(0, 0, s)
		)
	}
}

// the cross-section's faces on one side: upper cut, wall, lower cut, with their inward normals
const r2 = Math.SQRT1_2
const upperCut = s => [
	[s * (W - C), H],
	[s * W, H - C],
	[-s * r2, -r2],
]
const wall = s => [
	[s * W, H - C],
	[s * W, C],
	[-s, 0],
]
const lowerCut = s => [
	[s * W, C],
	[s * (W - C), 0],
	[-s * r2, r2],
]

function hull() {
	strip('deck', [-(W - C), 0], [W - C, 0], [0, 1], back, door)
	strip('ceiling', [-(W - C), H], [W - C, H], [0, -1], back, door)
	for (const s of [-1, 1]) {
		strip('upperCut', ...upperCut(s), back, door)
		for (const [z0, z1] of wallSpans(s)) {
			strip('wall', ...wall(s), z0, z1)
			strip('lowerCut', ...lowerCut(s), z0, z1)
		}
	}
	// a rib on the odd metres, across the ceiling and upper cuts always, the walls and lower cuts but at an opening
	const first = Math.ceil(back / ribs.every - 0.5) * ribs.every + ribs.every / 2
	for (let z = first; z < door; z += ribs.every) {
		slab('ceiling', [W - C, H], [-(W - C), H], [0, -1], z)
		for (const s of [-1, 1]) {
			slab('upperCut', ...upperCut(s), z)
			if (opening(s, z)) continue
			slab('wall', ...wall(s), z)
			slab('lowerCut', ...lowerCut(s), z)
		}
	}
}

// a bay: the deck running on in, its lit back wall, its sides and ceiling, and the lower cut's ends
function bay({ z, side: s }) {
	const z0 = z - bays.half
	const z1 = z + bays.half
	const out = s * (W + bays.depth)
	strip('deck', [s * (W - C), 0], [out, 0], [0, 1], z0, z1)
	strip('bayBack', [out, H - C], [out, 0], [-s, 0], z0, z1)
	strip('baySides', [s * W, H - C], [out, H - C], [0, -1], z0, z1)
	for (const [zz, nz] of [
		[z0, 1],
		[z1, -1],
	]) {
		face(
			'baySides',
			[v(s * W, 0, zz), v(out, 0, zz), v(out, H - C, zz), v(s * W, H - C, zz)],
			v(0, 0, nz)
		)
		face('baySides', [v(s * (W - C), 0, zz), v(s * W, 0, zz), v(s * W, C, zz)], v(0, 0, nz))
	}
}

// the octagon's outline at an end, with a notch for the doorway if it has one
function outline(notch) {
	const shape = new Shape().moveTo(-(W - C), 0)
	if (notch) {
		const [x0, x1] = notch
		shape.lineTo(x0, 0).lineTo(x0, doorway.top).lineTo(x1, doorway.top).lineTo(x1, 0)
	}
	return shape
		.lineTo(W - C, 0)
		.lineTo(W, C)
		.lineTo(W, H - C)
		.lineTo(W - C, H)
		.lineTo(-(W - C), H)
		.lineTo(-W, H - C)
		.lineTo(-W, C)
		.closePath()
}

// a flat shape at z facing n.z, gathered with its kind's pieces
function cap(kind, shape, z, nz) {
	const geo = new ShapeGeometry(shape).toNonIndexed()
	const p = geo.attributes.position
	for (let i = 0; i < p.count; i += 3) {
		const tri = [0, 1, 2].map(j => v(p.getX(i + j), p.getY(i + j), z))
		face(kind, tri, v(0, 0, nz))
	}
	geo.dispose()
}

// a box sunk into the door wall: its back and the sides round it, facing out to the corridor
function recess(x0, x1, y0, y1, deep) {
	const z1 = door + deep
	face('doorWall', [v(x0, y0, z1), v(x1, y0, z1), v(x1, y1, z1), v(x0, y1, z1)], v(0, 0, -1))
	face('doorWall', [v(x0, y0, door), v(x0, y0, z1), v(x0, y1, z1), v(x0, y1, door)], v(1, 0, 0))
	face('doorWall', [v(x1, y0, door), v(x1, y0, z1), v(x1, y1, z1), v(x1, y1, door)], v(-1, 0, 0))
	face('doorWall', [v(x0, y1, door), v(x1, y1, door), v(x1, y1, z1), v(x0, y1, z1)], v(0, -1, 0))
	if (y0 > 0)
		face(
			'doorWall',
			[v(x0, y0, door), v(x1, y0, door), v(x1, y0, z1), v(x0, y0, z1)],
			v(0, 1, 0)
		)
	else strip('deck', [x0, 0], [x1, 0], [0, 1], door, z1)
}

// the locker cells' x spans, leftward from the edge
export const lockerSpans = () =>
	Array.from({ length: lockers.count }, (_, i) => [
		lockers.edge - (i + 1) * lockers.pitch + lockers.inset,
		lockers.edge - i * lockers.pitch - lockers.inset,
	])

// a locker cell's opening, its foot cut along the octagon's lower corners where it reaches past them
function cellOpening([x0, x1]) {
	const { bottom: y0, top: y1 } = lockers
	const reach = y => W - C + y
	const hole = new Shape().moveTo(x0, y1)
	if (x0 < -reach(y0)) hole.lineTo(x0, -x0 - (W - C)).lineTo(-reach(y0), y0)
	else hole.lineTo(x0, y0)
	if (x1 > reach(y0)) hole.lineTo(reach(y0), y0).lineTo(x1, x1 - (W - C))
	else hole.lineTo(x1, y0)
	return hole.lineTo(x1, y1).closePath()
}

function ends() {
	cap('bulkhead', outline(), back, 1)
	const wallShape = outline(doorway.x)
	for (const span of lockerSpans()) {
		wallShape.holes.push(cellOpening(span))
		recess(...span, lockers.bottom, lockers.top, lockers.deep)
	}
	cap('doorWall', wallShape, door, -1)
	recess(doorway.x[0], doorway.x[1], 0, doorway.top, doorway.deep)
}

export function addShell(scene) {
	hull()
	BAYS.forEach(bay)
	ends()
	for (const [kind, { position, normal }] of Object.entries(pieces)) {
		const geo = new BufferGeometry()
		geo.setAttribute('position', new Float32BufferAttribute(position, 3))
		geo.setAttribute('normal', new Float32BufferAttribute(normal, 3))
		scene.add(new Mesh(geo, surfaceMaterial(kind)))
		delete pieces[kind]
	}
}

export { BAYS }

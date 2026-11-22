// HERMES-8's cryo bay built for itself (SHIP_CRYO): the room's shell with a lit niche in each stretch of the side
// walls, the heart in its middle (cryoHeart), ribs across the ceiling from the halo to the coves, and a ring on the
// deck under the halo with a path of light to it from each open door. Lit by its own lines (roomLight), never the
// sun; the light in the pods breathes, slowly and smoothly.

import { BoxGeometry, Group, Mesh, PlaneGeometry, RingGeometry } from 'three'
import { SHIP_CRYO } from '../../constants/game/shipCryo.js'
import { SHIP_LAYOUT } from '../../constants/game/shipLayout.js'
import { paletteMix } from '../../constants/palette.js'
import { CORNERS, HEART, POD_LINES, buildHeart, heartLines, round } from './cryoHeart.js'
import { lineColor, roomPainter } from './roomLight.js'
import { doorsIn } from './shipInterior.js'
import { facesMesh, roomShell, wallFrame } from './shipRoomShell.js'

const { room: id, shell, halo, ribs, trace, breath, paint, light } = SHIP_CRYO
const ROOM = SHIP_LAYOUT.rooms.find(r => r.id === id)
const { cx, cz, floor, top } = HEART
// a palette mix's hue at a brightness (luma) of 1
const metalHue = spec => {
	const c = paletteMix(spec)
	return c.map(v => v / (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]))
}

// ribs under the ceiling: from just outside the halo along each core corner's line out to the coves, a line of the
// deck's trace along the underside of each (the ceiling answering the paths on the deck)
function ceilingRibs(material, line) {
	const group = new Group()
	const bounds = [ROOM.x, ROOM.z].map(([lo, hi]) => [lo + shell.cove, hi - shell.cove])
	const from = halo.radius + halo.tube + ribs.clear
	for (const a of CORNERS) {
		const way = [Math.sin(a), Math.cos(a)]
		const reach = Math.min(
			...way
				.map((d, i) => [d, [cx, cz][i], bounds[i]])
				.filter(([d]) => Math.abs(d) > 1e-6)
				.map(([d, m, [lo, hi]]) => ((d > 0 ? hi : lo) - m) / d)
		)
		const rib = new Mesh(new BoxGeometry(ribs.width, ribs.depth, reach - from), material)
		const under = new Mesh(new PlaneGeometry(trace, reach - from), line)
		under.rotation.x = Math.PI / 2
		under.position.y = -ribs.depth / 2 - 0.002
		rib.add(under)
		rib.position.set(...round((from + reach) / 2, top - ribs.depth / 2, a))
		rib.rotation.y = a
		group.add(rib)
	}
	return group
}

// on the deck: a ring under the halo, and a path from the middle of each open door to it
function deckMarks(material) {
	const y = floor + 0.003
	const ring = new Mesh(
		new RingGeometry(halo.radius - trace / 2, halo.radius + trace / 2, 96),
		material
	)
	ring.rotation.x = -Math.PI / 2
	ring.position.set(cx, y, cz)
	const paths = []
	for (const wall of ['x0', 'x1', 'z0', 'z1']) {
		const { axis, side } = wallFrame(ROOM, wall)
		const [c, m] = axis === 'x' ? [cx, cz] : [cz, cx]
		for (const d of doorsIn(ROOM, axis, side).filter(d => !d.locked)) {
			const v = (d.from + d.to) / 2 - m
			if (Math.abs(v) >= halo.radius) continue
			const end = c + (side ? 1 : -1) * (Math.sqrt(halo.radius ** 2 - v ** 2) + trace / 2)
			const [a0, a1] = [ROOM[axis][side], end]
			const [b0, b1] = [m + v - trace / 2, m + v + trace / 2]
			const pt = (a, b) => (axis === 'x' ? [a, y, b] : [b, y, a])
			paths.push(
				...pt(a0, b0),
				...pt(a1, b0),
				...pt(a1, b1),
				...pt(a0, b0),
				...pt(a1, b1),
				...pt(a0, b1)
			)
		}
	}
	const group = new Group()
	group.add(ring, facesMesh(paths, material))
	return group
}

// the room, its footprints, and its tick (the pods' breath) for the clock in seconds
export function buildCryo() {
	const room = roomShell(ROOM, shell)
	const lines = [
		...room.lines.map(l => ({ ...l, color: lineColor(light[l.kind]) })),
		...heartLines(),
	]
	const { paint: painted, gain } = roomPainter(id, {
		lines,
		fill: paletteMix(light.fill),
		soft: light.soft,
		sheen: light.sheen,
		metal: metalHue(light.metal),
		neutral: light.neutral,
	})
	const group = new Group()
	for (const [part, positions] of Object.entries(room.faces))
		group.add(facesMesh(positions, painted(paint[part])))
	const heart = buildHeart(painted)
	group.add(
		heart.group,
		ceilingRibs(painted(paint.rib), painted(paint.trace)),
		deckMarks(painted(paint.trace))
	)

	// the pods' lines are the room's last, a hollow's light then a glow per pod: each pod swells and ebbs a fifth of
	// a breath behind the one before; only the light breathes, the rims stay lit
	const first = lines.length - POD_LINES
	const pods = POD_LINES / 2
	const tick = time => {
		for (let i = 0; i < POD_LINES; i++) {
			const phase = time / breath.period - (i % pods) / pods
			gain[first + i] =
				breath.low + (1 - breath.low) * (0.5 - 0.5 * Math.cos(2 * Math.PI * phase))
		}
	}
	return { group, footprints: heart.footprints, tick }
}

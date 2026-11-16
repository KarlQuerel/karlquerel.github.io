// HERMES-8's passages dressed with a modelled hallway (SHIP_LAB.hallway): one bay, cut pillar to pillar, repeated
// down each passage and fitted to its width, height and ramp. Where a bay would close a door, its side drops away
// under the ceiling to the greybox wall and its doorway; a porthole over a hull window keeps its glass, the others
// turn to panels; the ceiling opens under the skylights.

import { Box3, BufferGeometry, Float32BufferAttribute, Group, Mesh, Vector3 } from 'three'
import { SHIP_LAB } from '../../constants/game/shipLab.js'
import { SHIP_LAYOUT } from '../../constants/game/shipLayout.js'
import { paletteHex } from '../../constants/palette.js'
import { loadProp } from './models.js'
import { floorOf, heightOf, longAxis, OPENINGS } from './shipInterior.js'

const { model, role, relief, clear, inset, band, jamb, screen, paint } = SHIP_LAB.hallway

// the bay's triangles, each material's corners in the bay's frame: x across (centred), y up, z along
function triangles(bay) {
	const parts = []
	bay.updateMatrixWorld(true)
	bay.traverse(o => {
		if (o.isMesh)
			parts.push({
				material: o.material,
				corners: o.geometry.toNonIndexed().applyMatrix4(o.matrixWorld).attributes.position
					.array,
			})
	})
	return parts
}

// the extent [lo, hi] of every `k`th coordinate (0 x, 1 y, 2 z) of the corners
function extent(corners, k) {
	let [lo, hi] = [Infinity, -Infinity]
	for (let i = k; i < corners.length; i += 3)
		[lo, hi] = [Math.min(lo, corners[i]), Math.max(hi, corners[i])]
	return [lo, hi]
}

const within = ([a, b], [lo, hi]) => a >= lo && b <= hi
// a point over a skylight's rect
const over = ([x, , z], s) => within([x, x], s.x) && within([z, z], s.z)

// the polygon `poly` ([u, y, v] corners) cut to its part on the `keep` side of v = at (-1 under, 1 over)
function cut(poly, at, keep) {
	const kept = []
	poly.forEach((p, i) => {
		const q = poly[(i + 1) % poly.length]
		const [dp, dq] = [(p[2] - at) * keep, (q[2] - at) * keep]
		if (dp >= 0) kept.push(p)
		if (dp * dq < 0) kept.push(p.map((c, k) => c + ((q[k] - c) * dp) / (dp - dq)))
	})
	return kept
}

// the polygon less the span [a, b] along v: what is left before it and after it
const outside = (poly, [a, b]) => [cut(poly, a, -1), cut(poly, b, 1)].filter(p => p.length > 2)

export async function dressPassages() {
	const bay = await loadProp({ url: model, paint })
	const size = new Box3().setFromObject(bay).getSize(new Vector3())
	const half = size.x / 2
	const parts = triangles(bay)
	const glass = parts.find(p => p.material.name === 'hall_glass')
	const port = { y: extent(glass.corners, 1), z: extent(glass.corners, 2) }
	const panel = glass.material.clone()
	panel.name = 'hall_screen'
	panel.color.set(paletteHex(screen))
	const out = new Map()

	for (const room of SHIP_LAYOUT.rooms.filter(r => r.role === role)) {
		if (longAxis(room) !== 'z') throw new Error(`passage ${room.id} must run along z`)
		const [x0, x1] = room.x
		const mid = (x0 + x1) / 2
		const count = Math.max(1, Math.round((room.z[1] - room.z[0]) / size.z))
		const step = (room.z[1] - room.z[0]) / count
		const kz = step / size.z
		const ky = (heightOf(room) - 2 * inset) / size.y
		// across: the walls keep their shape, squeezed to `deep` where the passage is narrow; the middle stretches
		const deep = Math.min(relief, Math.max(0, (x1 - x0 - clear) / 2))
		const edge = (x1 - x0) / 2 - inset
		const across = u =>
			Math.abs(u) >= half - relief
				? Math.sign(u) * (edge - ((half - Math.abs(u)) * deep) / relief)
				: (u * (edge - deep)) / (half - relief)
		const wallOf = side => room.windows?.filter(w => w.wall === `x${side}`) ?? []
		// each side's doors, spans along z widened by the jamb
		const doorsOn = [0, 1].map(side =>
			OPENINGS.filter(
				o => o.axis === 'x' && o.rooms.includes(room) && o.mid < mid === (side === 0)
			).map(o => [o.from - jamb, o.to + jamb])
		)
		for (let i = 0; i < count; i++) {
			const z0 = room.z[0] + i * step
			const map = (u, y, v) => {
				const z = z0 + v * kz
				return [mid + across(u), floorOf(room, z) + inset + y * ky, z]
			}
			// the doors this bay meets, in its own z
			const gaps = doorsOn.map(spans =>
				spans
					.map(([a, b]) => [(a - z0) / kz, (b - z0) / kz])
					.filter(([a, b]) => a < size.z && b > 0)
			)
			// a porthole wholly on a window of the hull sees out
			const sees = [0, 1].map(side =>
				wallOf(side).some(
					w =>
						within(
							port.z.map(v => z0 + v * kz),
							[w.at - w.width / 2, w.at + w.width / 2]
						) &&
						within(
							port.y.map(y => inset + y * ky),
							[w.sill, w.head]
						)
				)
			)
			for (const { material, corners } of parts) {
				const paintAs = side =>
					material === glass.material && !sees[side] ? panel : material
				for (let t = 0; t < corners.length; t += 9) {
					const tri = [0, 3, 6].map(k => [
						corners[t + k],
						corners[t + k + 1],
						corners[t + k + 2],
					])
					const [cu, cy, cv] = [0, 1, 2].map(k => (tri[0][k] + tri[1][k] + tri[2][k]) / 3)
					const side = Number(cu > 0)
					if (cy > band[1] && room.skylights?.some(s => over(map(cu, cy, cv), s)))
						continue
					// a wall's triangles cut away across each door
					const wall = Math.abs(cu) > half - relief && cy > band[0] && cy < band[1]
					const pieces = wall
						? gaps[side].reduce(
								(kept, gap) => kept.flatMap(p => outside(p, gap)),
								[tri]
							)
						: [tri]
					if (!out.has(paintAs(side))) out.set(paintAs(side), [])
					const into = out.get(paintAs(side))
					for (const p of pieces)
						for (let k = 1; k + 1 < p.length; k++)
							for (const q of [p[0], p[k], p[k + 1]]) into.push(...map(...q))
				}
			}
		}
	}

	const hall = new Group()
	for (const [material, positions] of out) {
		const geometry = new BufferGeometry()
		geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
		geometry.computeVertexNormals()
		hall.add(new Mesh(geometry, material))
	}
	return hall
}

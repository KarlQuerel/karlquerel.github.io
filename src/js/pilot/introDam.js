// The intro's dam shot (constants/game/introDam.js), a set of its own: the dusk sky on a dome that follows the
// camera, the valley and its cracked bed, the stranded boat, drowned trees and a fence line, the dam with its
// towers and lamps, each side's searchlights sweeping the bed; then the flash past the dam and the dust.

import {
	AdditiveBlending,
	BackSide,
	BufferGeometry,
	Color,
	ConeGeometry,
	DirectionalLight,
	DoubleSide,
	Euler,
	Float32BufferAttribute,
	FogExp2,
	Group,
	HemisphereLight,
	IcosahedronGeometry,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	PlaneGeometry,
	Scene,
	SphereGeometry,
	SpotLight,
	SRGBColorSpace,
	Vector3,
} from 'three'
import { INTRO_DAM } from '../../constants/game/introDam.js'
import { PILOT_BEAM } from '../../constants/game/pilot.js'
import { paletteHex, paletteMix } from '../../constants/palette.js'
import { clamp01, smootherstep, smoothstep } from '../math.js'
import { fbm2, hash1, hash2, ridged2 } from '../pixelNoise.js'

const D = INTRO_DAM
const DEG = Math.PI / 180
const DOWN = new Vector3(0, -1, 0)

// a paint: a palette name, or [a, b, t] a mix of two
const paint = spec =>
	typeof spec === 'string'
		? new Color(paletteHex(spec))
		: new Color().setRGB(...paletteMix(spec), SRGBColorSpace)

// the set's own dice, the same every run
function dice(seed) {
	let i = 0
	const roll = () => hash1(i++, seed)
	return { roll, within: ([lo, hi]) => lo + roll() * (hi - lo) }
}

// a direction `azDeg` off the view's axis (-z, + right) and `elevDeg` up
const bearing = (azDeg, elevDeg) =>
	new Vector3(
		Math.sin(azDeg * DEG) * Math.cos(elevDeg * DEG),
		Math.sin(elevDeg * DEG),
		-Math.cos(azDeg * DEG) * Math.cos(elevDeg * DEG)
	)

// flat faces with a colour each, gathered into one geometry; `up` lights every face as if it faced the sky
function faces() {
	const pos = []
	const col = []
	const tri = (a, b, c, k) => {
		pos.push(...a, ...b, ...c)
		for (let i = 0; i < 3; i++) col.push(k.r, k.g, k.b)
	}
	const quad = (a, b, c, d, k) => {
		tri(a, b, c, k)
		tri(a, c, d, k)
	}
	// a box from its middle and full size
	const box = ([x, y, z], [w, h, l], k) => {
		const c = (i, j, m) => [x + (i - 0.5) * w, y + (j - 0.5) * h, z + (m - 0.5) * l]
		quad(c(0, 0, 0), c(1, 0, 0), c(1, 1, 0), c(0, 1, 0), k)
		quad(c(0, 0, 1), c(0, 1, 1), c(1, 1, 1), c(1, 0, 1), k)
		quad(c(0, 0, 0), c(0, 1, 0), c(0, 1, 1), c(0, 0, 1), k)
		quad(c(1, 0, 0), c(1, 0, 1), c(1, 1, 1), c(1, 1, 0), k)
		quad(c(0, 1, 0), c(1, 1, 0), c(1, 1, 1), c(0, 1, 1), k)
		quad(c(0, 0, 0), c(0, 0, 1), c(1, 0, 1), c(1, 0, 0), k)
	}
	// a tube of `sides` from point a to b, radius ra to rb
	const tube = (a, b, ra, rb, sides, k) => {
		const axis = new Vector3(...b).sub(new Vector3(...a))
		const side = new Vector3(1, 0, 0)
		if (Math.abs(axis.clone().normalize().x) > 0.9) side.set(0, 0, 1)
		const u = side.cross(axis).normalize()
		const v = axis.clone().cross(u).normalize()
		const ring = (p, r, s) => {
			const t = (s / sides) * 2 * Math.PI
			return new Vector3(...p)
				.addScaledVector(u, Math.cos(t) * r)
				.addScaledVector(v, Math.sin(t) * r)
				.toArray()
		}
		for (let s = 0; s < sides; s++)
			quad(ring(a, ra, s), ring(a, ra, s + 1), ring(b, rb, s + 1), ring(b, rb, s), k)
	}
	return {
		tri,
		quad,
		box,
		tube,
		geometry({ up = false } = {}) {
			const g = new BufferGeometry()
			g.setAttribute('position', new Float32BufferAttribute(pos, 3))
			g.setAttribute('color', new Float32BufferAttribute(col, 3))
			if (!up) g.computeVertexNormals()
			else
				g.setAttribute(
					'normal',
					new Float32BufferAttribute(
						pos.map((_, i) => +(i % 3 === 1)),
						3
					)
				)
			return g
		},
	}
}

const solid = ({ flat = true } = {}) =>
	new MeshStandardMaterial({
		vertexColors: true,
		flatShading: flat,
		roughness: 1,
		metalness: 0,
		side: DoubleSide,
	})

// light in the air (the beams): drawn over what is behind, kept out of the pixel pass's normals
function lightInAir(mesh) {
	mesh.layers.set(PILOT_BEAM.layer)
	return mesh
}

// The dusk on a dome: a gradient up from the horizon, darker opposite the glow, the glow low over the gorge; each
// vertex also keeps how far round the flash it is, for the sky to whiten from there.
function skyDome(flashDir) {
	const S = D.sky
	const geometry = new SphereGeometry(S.radius, ...S.segments)
	const p = geometry.attributes.position
	const base = new Float32Array(p.count * 3)
	const reach = new Float32Array(p.count)
	const [low, high, zenith, east, horizon] = [S.low, S.high, S.zenith, S.east, S.horizon].map(
		paint
	)
	const d = new Vector3()
	const k = new Color()
	const glowAz = S.glowAzDeg * DEG
	for (let i = 0; i < p.count; i++) {
		d.fromBufferAttribute(p, i).normalize()
		const up = Math.max(0, d.y)
		const az = Math.atan2(d.x, -d.z)
		k.copy(low).lerp(high, smoothstep(clamp01(up / 0.35)))
		k.lerp(zenith, smoothstep(clamp01((up - 0.3) / 0.6)))
		k.lerp(east, ((1 - Math.cos(az)) / 2) * 0.7)
		const off = Math.atan2(Math.sin(az - glowAz), Math.cos(az - glowAz))
		const glow = Math.exp(-((off / (S.glowSpread * Math.PI)) ** 2)) * Math.exp(-up / S.glowFade)
		k.lerp(horizon, glow)
		k.toArray(base, i * 3)
		reach[i] = clamp01(1 - d.angleTo(flashDir) / (D.flash.sky * Math.PI)) ** 1.5
	}
	geometry.setAttribute('color', new Float32BufferAttribute(base.slice(), 3))
	const mesh = new Mesh(
		geometry,
		new MeshBasicMaterial({ vertexColors: true, side: BackSide, fog: false })
	)
	const white = paint(D.flash.color)
	let shown = 0
	// the sky whitened `level` round the flash
	function whiten(level) {
		if (level === shown) return
		shown = level
		const c = geometry.attributes.color
		for (let i = 0; i < p.count; i++) {
			k.fromArray(base, i * 3).lerp(white, clamp01(level * reach[i]))
			k.toArray(c.array, i * 3)
		}
		c.needsUpdate = true
	}
	return { mesh, whiten }
}

// the valley's ground height at (x, z)
function groundAt(x, z) {
	const V = D.valley
	const half = V.halfWidth + Math.max(0, z - D.dam.z) * V.widen
	const out = Math.abs(x) - half
	const rise = Math.min(V.top, Math.max(0, out) * V.slope)
	// benches: each strata step nearly flat, then a cliff up to the next
	const wall = V.bench * (Math.floor(rise / V.bench) + ((rise / V.bench) % 1) ** 4)
	const rough = V.rough * ridged2(x / V.grain, z / V.grain, D.seed, 4) * clamp01(out / 40)
	const far = clamp01((D.plates.fromZ - D.plates.depth - 10 - z) / 40)
	return wall + rough + V.swale * (2 * fbm2(x / 45, z / 45, D.seed + 1) - 1) * far
}

// The valley floor and its walls in strata, the rock bleached pale below the old water line, the dry bed in mud.
function valley() {
	const V = D.valley
	const geometry = new PlaneGeometry(...V.size, ...V.cells).rotateX(-Math.PI / 2)
	geometry.translate(V.center[0], 0, V.center[1])
	const p = geometry.attributes.position
	const color = new Float32Array(p.count * 3)
	const [mud, bleached, rock] = [V.mud, V.bleached, V.rock].map(paint)
	const k = new Color()
	for (let i = 0; i < p.count; i++) {
		const x = p.getX(i)
		const z = p.getZ(i)
		const y = groundAt(x, z)
		p.setY(i, y)
		const grain = 0.9 + 0.2 * fbm2(x / 9, z / 9, D.seed + 2)
		const strata =
			1 + V.strata * Math.sin(y / V.strataEvery + 3 * fbm2(x / 80, z / 80, D.seed + 4))
		const line = V.waterLine + 3 * (fbm2(x / 30, z / 30, D.seed + 3) - 0.5)
		if (y > line) k.copy(rock).multiplyScalar(strata)
		else k.copy(mud).lerp(bleached, smoothstep(clamp01(y / 6)))
		k.multiplyScalar(grain).toArray(color, i * 3)
	}
	geometry.setAttribute('color', new Float32BufferAttribute(color, 3))
	geometry.computeVertexNormals()
	return new Mesh(geometry, solid())
}

// The mud near the lens dried into plates: a jittered grid, its cells growing with the distance so the cracks
// never get finer than the art grid can hold, each cell cut by its neighbours (Voronoi), shrunk to leave the crack,
// its rim curled up; the tops lit as the bed is, the sides and the cracks' floor dark under them.
function plates() {
	const P = D.plates
	const k = (P.farCell - P.cell) / P.depth
	const out = v => (P.cell / k) * (Math.exp(k * v) - 1)
	const size = v => P.cell + k * out(v)
	const halfWide = v => P.wide[0] + P.wide[1] * out(v)
	const rows = Math.ceil(Math.log(1 + (k * P.depth) / P.cell) / k)
	const seed = D.seed + 10
	const point = (i, j) => [
		i + 0.1 + 0.8 * hash2(i, j, seed),
		j + 0.1 + 0.8 * hash2(i, j, seed + 1),
	]
	const world = ([u, v], y) => [u * size(v), y, P.fromZ - out(v)]
	const paints = P.plate.map(paint)
	const tops = faces()
	const sides = faces()
	const crack = paint(P.crack)
	for (let j = 0; j < rows; j++) {
		const reach = Math.ceil(halfWide(j) / size(j)) + 1
		for (let i = -reach; i < reach; i++) {
			const p = point(i, j)
			let poly = [
				[p[0] - 2, p[1] - 2],
				[p[0] + 2, p[1] - 2],
				[p[0] + 2, p[1] + 2],
				[p[0] - 2, p[1] + 2],
			]
			for (let di = -2; di <= 2; di++)
				for (let dj = -2; dj <= 2; dj++)
					if (di || dj) poly = cut(poly, p, point(i + di, j + dj))
			const n = poly.length
			const c = poly.reduce((s, q) => [s[0] + q[0] / n, s[1] + q[1] / n], [0, 0])
			const rim = poly.map(q => [
				c[0] + (q[0] - c[0]) * (1 - P.gap),
				c[1] + (q[1] - c[1]) * (1 - P.gap),
			])
			const roll = m => hash2(i, j, seed + m)
			const thick = P.thick[0] + (P.thick[1] - P.thick[0]) * roll(2)
			const curl = P.curl[0] + (P.curl[1] - P.curl[0]) * roll(3)
			const top = paints[Math.floor(roll(4) * paints.length)]
				.clone()
				.multiplyScalar(0.94 + 0.1 * roll(5))
			const side = top.clone().multiplyScalar(P.side)
			const middle = world(c, thick)
			const edge = rim.map(q => world(q, thick + curl))
			const foot = rim.map(q => world(q, 0))
			for (let a = 0; a < n; a++) {
				const b = (a + 1) % n
				tops.tri(middle, edge[a], edge[b], top)
				sides.quad(edge[a], foot[a], foot[b], edge[b], side)
			}
		}
	}
	// the cracks' floor, the plates' own footprint a hair over the bed
	for (let j = 0; j < rows; j++) {
		const [a, b] = [j, j + 1].map(v => halfWide(v) + 2 * size(v))
		const [za, zb] = [j, j + 1].map(v => P.fromZ - out(v))
		sides.quad([-a, 0.004, za], [a, 0.004, za], [b, 0.004, zb], [-b, 0.004, zb], crack)
	}
	const group = new Group()
	group.add(
		new Mesh(tops.geometry({ up: true }), solid({ flat: false })),
		new Mesh(sides.geometry(), solid())
	)
	return group
}

// a convex polygon cut to the side of the bisector between p and q that holds p
function cut(poly, p, q) {
	const n = [q[0] - p[0], q[1] - p[1]]
	const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]
	const side = r => (r[0] - m[0]) * n[0] + (r[1] - m[1]) * n[1]
	const out = []
	for (let a = 0; a < poly.length; a++) {
		const r = poly[a]
		const s = poly[(a + 1) % poly.length]
		const sr = side(r)
		const ss = side(s)
		if (sr <= 0) out.push(r)
		if (sr * ss < 0) {
			const t = sr / (sr - ss)
			out.push([r[0] + (s[0] - r[0]) * t, r[1] + (s[1] - r[1]) * t])
		}
	}
	return out
}

// The boat: a hull lofted through its sections (bow on +z), red below the old waterline, a dark boot top, white
// topsides streaked with rust, its deck, a wheelhouse with its window band, a mast and its boom.
function boat() {
	const B = D.boat
	const f = faces()
	const half = s =>
		(B.beam / 2) * (s < 0.45 ? 0.82 + (0.18 * s) / 0.45 : 1 - ((s - 0.45) / 0.55) ** 2)
	const keel = s => B.depth * (s < 0.8 ? 1 : 1 - 0.6 * ((s - 0.8) / 0.2))
	const deckY = s => B.sheer * s * s
	const along = s => (s - 0.5) * B.length
	const point = (s, j, mirror) => {
		const th = (j / B.ribs) * (Math.PI / 2)
		const x = half(s) * Math.sin(th) ** 0.55
		return [mirror * x, deckY(s) - keel(s) * Math.cos(th) ** 1.6, along(s)]
	}
	const [bottom, bootTop, topsides, rust, deck] = [
		B.bottom,
		B.bootTop,
		B.topsides,
		B.rust,
		B.deck,
	].map(paint)
	const band = (s, j) => {
		const up = 1 - Math.cos(((j + 0.5) / B.ribs) * (Math.PI / 2)) ** 1.6
		if (up < B.boot) return bottom
		if (up < B.boot + 0.08) return bootTop
		return hash1(Math.floor(s * B.stations), D.seed + 20) < 0.22 ? rust : topsides
	}
	for (let i = 0; i < B.stations; i++) {
		const [s0, s1] = [i / B.stations, (i + 1) / B.stations]
		for (const mirror of [1, -1])
			for (let j = 0; j < B.ribs; j++)
				f.quad(
					point(s0, j, mirror),
					point(s1, j, mirror),
					point(s1, j + 1, mirror),
					point(s0, j + 1, mirror),
					band(s0, j)
				)
		f.quad(
			point(s0, B.ribs, 1),
			point(s1, B.ribs, 1),
			point(s1, B.ribs, -1),
			point(s0, B.ribs, -1),
			deck
		)
	}
	// the transom, fanned round its middle
	const mid = [0, deckY(0) - keel(0) / 2, along(0)]
	for (const mirror of [1, -1])
		for (let j = 0; j < B.ribs; j++)
			f.tri(mid, point(0, j, mirror), point(0, j + 1, mirror), topsides)
	const H = B.house
	const [w, h, l] = H.size
	const floor = deckY(0.5 + H.at / B.length)
	f.box([0, floor + h / 2, H.at], H.size, paint(H.paint))
	f.box([0, floor + h * 0.72, H.at], [w * 1.02, h * 0.24, l * 1.02], paint(H.glass))
	f.box([0, floor + h + 0.08, H.at], [w + 0.3, 0.16, l + 0.4], deck)
	const M = B.mast
	const foot = deckY(0.5 + M.at / B.length)
	const spar = paint(M.paint)
	f.tube([0, foot, M.at], [0, foot + M.height, M.at], M.radius, M.radius * 0.7, 6, spar)
	const [aft, lift] = M.boom
	f.tube(
		[0, foot + 1.2, M.at],
		[0, foot + 1.2 + lift, M.at - aft],
		M.radius * 0.7,
		M.radius * 0.5,
		5,
		spar
	)
	const mesh = new Mesh(f.geometry(), solid())
	mesh.position.set(...B.at)
	mesh.rotation.copy(new Euler(B.pitchDeg * DEG, B.yawDeg * DEG, B.heelDeg * DEG, 'YXZ'))
	return mesh
}

// a point on the dam's upstream face `x` along its chord, `y` up, `out` m back into the concrete
function damFace(x, y, out = 0) {
	const { z, radius } = D.dam
	const phi = Math.asin(x / radius)
	const r = radius - out
	return [r * Math.sin(phi), y, z - radius + r * Math.cos(phi)]
}

// The dam: its upstream face in columns, bleached below the old water line with a dark tide mark on it, darker
// joints down it and the crest's shadow under the parapet; the crest; the intake towers on the dry bed; lamps.
function dam() {
	const A = D.dam
	const f = faces()
	const lamps = faces()
	const [face, stain, tower, lamp] = [A.face, A.stain, A.tower, A.lamp].map(paint)
	const bleached = paint(A.bleached)
	const line = D.valley.waterLine
	const rows = [-8, line - 0.8, line + 0.5, A.height - A.shadow, A.height]
	const top = A.height + A.parapet
	for (let c = 0; c < A.segments; c++) {
		const [x0, x1] = [c, c + 1].map(i => (i / A.segments - 0.5) * A.chord)
		const joint = c % Math.round(A.segments / A.joints) === 0
		const shade = (joint ? 0.86 : 1) * (0.94 + 0.08 * hash1(c, D.seed + 30))
		const paints = [bleached, stain, face, stain].map(k => k.clone().multiplyScalar(shade))
		for (let r = 0; r < paints.length; r++)
			f.quad(
				damFace(x0, rows[r]),
				damFace(x1, rows[r]),
				damFace(x1, rows[r + 1]),
				damFace(x0, rows[r + 1]),
				paints[r]
			)
		f.quad(
			damFace(x0, A.height),
			damFace(x1, A.height),
			damFace(x1, top),
			damFace(x0, top),
			face
		)
		f.quad(
			damFace(x0, top),
			damFace(x1, top),
			damFace(x1, top, 0.5),
			damFace(x0, top, 0.5),
			face
		)
		f.quad(
			damFace(x0, A.height, 0.5),
			damFace(x1, A.height, 0.5),
			damFace(x1, A.height, A.crest),
			damFace(x0, A.height, A.crest),
			stain
		)
	}
	for (let x = -A.chord / 2 + A.lampEvery / 2; x < A.chord / 2; x += A.lampEvery)
		lamps.box(damFace(x, top + 2.2, 0.4), [0.9, 0.6, 0.9], lamp)
	for (const [x, outward, radius, height] of A.towers) {
		const [bx, , bz] = damFace(x, 0, -outward)
		const ring = (y0, y1, k) => f.tube([bx, y0, bz], [bx, y1, bz], radius, radius, 12, k)
		ring(-2, line, bleached)
		ring(line, height - 9, tower)
		ring(height - 9, height - 6, stain)
		ring(height - 6, height, tower)
		f.tube([bx, height, bz], [bx, height + 4, bz], radius * 1.05, radius * 0.4, 12, stain)
		// its walkway back to the crest
		const [cx, , cz] = damFace(x, 0)
		f.box(
			[(bx + cx) / 2, A.height - 2, (bz + cz) / 2],
			[2.4, 1.6, Math.hypot(bx - cx, bz - cz)],
			tower
		)
		lamps.box([bx, height + 4.6, bz], [0.8, 0.8, 0.8], lamp)
	}
	const group = new Group()
	group.add(
		new Mesh(f.geometry(), solid()),
		new Mesh(lamps.geometry(), new MeshBasicMaterial({ vertexColors: true, fog: false }))
	)
	return group
}

// The drowned trees, bare trunks forking up; and the fence line run out toward the dam, its posts leaning.
function deadwood() {
	const { roll, within } = dice(D.seed + 50)
	const T = D.trees
	const f = faces()
	const bark = paint(T.paint)
	const grow = (from, dir, length, radius, level) => {
		const to = new Vector3(...from).addScaledVector(dir, length).toArray()
		f.tube(from, to, radius, radius * 0.65, 5, bark)
		if (level === 0) return
		const forks = 2 + Math.floor(roll() * 2)
		for (let i = 0; i < forks; i++) {
			const turn = new Vector3(within([-1, 1]), within([-1, 1]), within([-1, 1]))
				.cross(dir)
				.normalize()
			const next = dir
				.clone()
				.applyAxisAngle(turn, within([0.35, 0.8]))
				.normalize()
			grow(to, next, length * within([0.5, 0.75]), radius * 0.65, level - 1)
		}
	}
	for (const [x, z, h] of T.at) {
		const lean = new Vector3(within([-0.15, 0.15]), 1, within([-0.15, 0.15])).normalize()
		grow([x, groundAt(x, z) - 0.3, z], lean, h * 0.55, h * 0.04, T.levels)
	}
	const F = D.fence
	const [ax, az] = F.from
	const [bx, bz] = F.to
	const posts = Math.floor(Math.hypot(bx - ax, bz - az) / F.every)
	const wood = paint(F.paint)
	const [w, h] = F.post
	for (let i = 0; i <= posts; i++) {
		const [x, z] = [ax + ((bx - ax) * i) / posts, az + ((bz - az) * i) / posts]
		const tip = [x + within([-F.lean, F.lean]) * h, h, z + within([-F.lean, F.lean]) * h]
		f.tube([x, -0.2, z], tip, w / 2, w / 2.4, 4, wood)
	}
	return new Mesh(f.geometry(), solid())
}

// One searchlight: its lamp on the crest, its beam a cone fading from the lamp out, and the spot it lights.
function searchlight({ at: [x, up] }) {
	const S = D.searchlights
	const origin = new Vector3(...damFace(x, D.dam.height + D.dam.parapet + up, -1))
	const color = paint(S.color)
	const cone = new ConeGeometry(1, 1, 16, 6, true).translate(0, -0.5, 0)
	const p = cone.attributes.position
	const rgba = new Float32Array(p.count * 4)
	for (let i = 0; i < p.count; i++) {
		const a = S.shaft + (S.tail - S.shaft) * Math.sqrt(-p.getY(i))
		rgba.set([color.r, color.g, color.b, a], i * 4)
	}
	cone.setAttribute('color', new Float32BufferAttribute(rgba, 4))
	const beam = lightInAir(
		new Mesh(
			cone,
			new MeshBasicMaterial({
				vertexColors: true,
				transparent: true,
				blending: AdditiveBlending,
				depthWrite: false,
				fog: false,
				side: DoubleSide,
			})
		)
	)
	beam.position.copy(origin)
	const spot = new SpotLight(color, S.intensity, 0, S.halfDeg * DEG * 1.3, 0.5, 0)
	spot.position.copy(origin)
	const head = new Mesh(
		new SphereGeometry(1.1, 8, 6),
		new MeshBasicMaterial({ color, fog: false })
	)
	head.position.copy(origin)
	return { origin, beam, spot, head }
}

// The fireball past the dam: lumpy shells, rim to core, each smaller one bulging out of the last toward the
// camera, so its hottest middle shows through.
function fireball() {
	const F = D.flash.fireball
	const geometry = new IcosahedronGeometry(1, 3)
	const p = geometry.attributes.position
	const v = new Vector3()
	for (let i = 0; i < p.count; i++) {
		v.fromBufferAttribute(p, i)
		const bump = fbm2(Math.atan2(v.z, v.x) * 3 + 10, v.y * 3 + 10, D.seed + 70)
		p.setXYZ(i, ...v.multiplyScalar(1 + F.lumps * (2 * bump - 1)).toArray())
	}
	const group = new Group()
	const shells = F.shells.map(color => {
		const mesh = new Mesh(geometry, new MeshBasicMaterial({ color: paint(color), fog: false }))
		group.add(mesh)
		return mesh
	})
	group.visible = false
	const base = bearing(D.flash.azDeg, 0).multiplyScalar(D.flash.distance)
	const toward = base.clone().normalize().negate()
	// `since` seconds after the flash
	function grow(since) {
		group.visible = since > 0
		const r = F.radius * (1 - Math.exp(-Math.max(0, since) / F.growS))
		shells.forEach((shell, i) => {
			const k = 1 - (0.4 * i) / (shells.length - 1)
			shell.position
				.copy(base)
				.setY(r * F.sit + F.climb * since)
				.addScaledVector(toward, r * (1 - k + 0.05 * i))
			shell.scale.setScalar(r * k)
		})
	}
	return { group, grow }
}

// the dust thrown up past the dam: lumps along a front, each with its own place, size and lift
function dustFront() {
	const U = D.dust
	const { within } = dice(D.seed + 60)
	const material = new MeshStandardMaterial({
		color: paint(U.color),
		emissive: paint(U.color),
		emissiveIntensity: 0,
		flatShading: true,
		roughness: 1,
		fog: false,
	})
	const geometry = new IcosahedronGeometry(1, 1)
	const group = new Group()
	const lumps = Array.from({ length: U.count }, () => {
		const mesh = new Mesh(geometry, material)
		mesh.rotation.set(within([0, 6]), within([0, 6]), within([0, 6]))
		group.add(mesh)
		return {
			mesh,
			x: within([-U.wide / 2, U.wide / 2]),
			lag: within([0, 80]),
			grow: within([0.5, 1]),
			lift: within(U.rise),
		}
	})
	group.visible = false
	return { group, lumps, material }
}

// how bright the flash is `s` into the shot of `holdS`: up fast, settling, then swelling to white for the cut
function flashLevel(s, holdS) {
	const F = D.flash
	const since = s - F.atS
	if (since < 0) return 0
	const up = clamp01(since / F.riseS)
	const settled = 1 - (1 - F.settle) * smootherstep(clamp01((since - F.riseS) / F.settleS))
	const white = smoothstep(clamp01((s - (holdS - F.whiteS)) / F.whiteS))
	return up * settled + white * (F.white - settled)
}

export function createDamSet() {
	const scene = new Scene()
	const flashDir = bearing(D.flash.azDeg, D.flash.elevDeg)
	const sky = skyDome(flashDir)
	const fogBase = paint(D.fog.color)
	const fogWarm = paint(D.flash.warm)
	scene.fog = new FogExp2(fogBase.clone(), D.fog.density)

	const L = D.light
	const hemi = new HemisphereLight(paint(L.hemi.sky), paint(L.hemi.ground), L.hemi.intensity)
	const glow = new DirectionalLight(paint(L.glow.color), L.glow.intensity)
	glow.position.copy(bearing(D.sky.glowAzDeg, L.glow.elevationDeg))
	const fill = new DirectionalLight(paint(L.fill.color), L.fill.intensity)
	fill.position.copy(bearing(L.fill.azDeg, L.fill.elevationDeg))
	const flashLight = new DirectionalLight(paint(D.flash.warm), 0)
	flashLight.position.copy(flashDir)
	const ball = fireball()
	const lights = D.searchlights.lights.map(spec => ({ spec, ...searchlight(spec) }))
	const dust = dustFront()
	scene.add(sky.mesh, hemi, glow, fill, flashLight, ball.group, dust.group)
	scene.add(valley(), plates(), boat(), dam(), deadwood())
	for (const { beam, spot, head } of lights) scene.add(beam, spot, spot.target, head)

	const from = { at: new Vector3(...D.from.at), look: new Vector3(...D.from.look) }
	const to = { at: new Vector3(...D.to.at), look: new Vector3(...D.to.look) }
	const look = new Vector3()
	const aim = new Vector3()
	const along = new Vector3()

	// the set `s` seconds into its shot of `holdS`, seen by `camera`; reduced motion holds it at stillS, still
	function frame(s, holdS, camera, still) {
		const t = still ? D.stillS : s
		const u = still ? 1 : smootherstep(clamp01(s / holdS))
		camera.position.lerpVectors(from.at, to.at, u)
		camera.lookAt(look.lerpVectors(from.look, to.look, u))
		camera.updateMatrixWorld()
		sky.mesh.position.copy(camera.position)

		for (const { spec, origin, beam, spot } of lights) {
			const w = 2 * Math.PI * spec.rateHz * t + spec.phase
			aim.set(
				spec.aim[0] + spec.swing[0] * Math.sin(w),
				0,
				spec.aim[1] + spec.swing[1] * Math.sin(0.7 * w + 1.3)
			)
			along.subVectors(aim, origin)
			const length = along.length()
			const wide = length * Math.tan(D.searchlights.halfDeg * DEG)
			beam.scale.set(wide, length, wide)
			beam.quaternion.setFromUnitVectors(DOWN, along.normalize())
			spot.target.position.copy(aim)
			spot.target.updateMatrixWorld()
		}

		const since = still ? -1 : s - D.flash.atS
		const level = still ? 0 : flashLevel(s, holdS)
		sky.whiten(level)
		ball.grow(since)
		flashLight.intensity = D.flash.intensity * level
		hemi.intensity = L.hemi.intensity * (1 + 1.5 * level)
		scene.fog.color.copy(fogBase).lerp(fogWarm, clamp01(level * 0.7))

		const U = D.dust
		dust.group.visible = since > 0
		dust.material.emissiveIntensity = U.lit * clamp01(level)
		const age = clamp01(since / (holdS - D.flash.atS))
		for (const { mesh, x, lag, grow, lift } of dust.lumps) {
			const r = (U.size[0] + (U.size[1] - U.size[0]) * age) * grow
			mesh.scale.setScalar(r)
			mesh.position.set(x, r * 0.4 + lift * age, U.z + lag + U.speed * Math.max(0, since))
		}
	}

	function dispose() {
		scene.traverse(o => {
			o.geometry?.dispose()
			o.material?.dispose()
		})
	}

	return {
		scene,
		lens: { fovDeg: D.fovDeg, near: D.near, far: D.far },
		frame,
		dispose,
	}
}

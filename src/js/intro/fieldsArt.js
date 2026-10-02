// The fields' layers, painted once per grid and stacked in one atlas, each a frame tall and wider than
// the frame by `margin` both sides so the truck never runs off them: the sky and the ground, the farm
// on the horizon, the harvester, the tree. The windmill's blades, the fence and the embers are live.

import { FIELDS } from '../../constants/intro/fields.js'
import { PALETTE } from '../../constants/palette.js'
import { ditherIndex, ditherThreshold, fbm2, hash1, hash2 } from '../pixelNoise.js'
import { tidySprite } from '../ridge.js'
import { createLayer, disc, line, put, rect, rimLight, tri } from './raster.js'

const SKY = ['basalt', 'garnet', 'rust', 'brick', 'clay', 'flare', 'amber', 'dune', 'sand']
const SUN = ['rust', 'brick', 'clay', 'flare', 'amber', 'dune']
const DIRT = ['void', 'basalt', 'rust', 'brick', 'clay', 'flare', 'amber', 'dune']
const SLAB = ['basalt', 'ash', 'stone', 'bone']

// the margin a layer needs past each side of the frame: the furthest any layer slides, plus the pointer
export function fieldsMargin(grid) {
	const deepest = Math.max(FIELDS.ground.near, FIELDS.tree.depth)
	return Math.ceil(
		deepest * ((FIELDS.truck / 2 + FIELDS.carry) * grid.height + FIELDS.lookCells) + 4
	)
}

const putRgb = (L, x, y, rgb) => L.data.set([...rgb, 255], (y * L.w + x) * 4)

// F1 and F2 to the nearest plate centres, and the nearest plate's own hash
function plates(x, z) {
	const ix = Math.floor(x)
	const iz = Math.floor(z)
	let f1 = 9
	let f2 = 9
	let id = 0
	for (let j = -1; j <= 1; j++)
		for (let i = -1; i <= 1; i++) {
			const cx = ix + i + 0.15 + 0.7 * hash2(ix + i, iz + j, 71)
			const cz = iz + j + 0.15 + 0.7 * hash2(ix + i, iz + j, 73)
			const d = Math.hypot(x - cx, z - cz)
			if (d < f1) {
				f2 = f1
				f1 = d
				id = hash2(ix + i, iz + j, 79)
			} else if (d < f2) f2 = d
		}
	return { f1, f2, id }
}

function paintSkyGround(W, H, M) {
	const L = createLayer(W + 2 * M, H)
	const S = FIELDS.sky
	const G = FIELDS.ground
	const hz = Math.round(FIELDS.horizon * H)
	const sx = S.sunAt[0] * W + M
	const sy = S.sunAt[1] * H
	const sr = S.sunR * H
	for (let y = 0; y < hz; y++)
		for (let x = 0; x < L.w; x++) {
			const d = Math.hypot(x + 0.5 - sx, y + 0.5 - sy)
			// heat pooled at the horizon, and the sun's own glare round it
			const glow = Math.exp(-Math.max(0, d - sr) / (sr * 2))
			let lit = 0.1 + 0.5 * (y / hz) ** 1.4 + 0.2 * glow
			let ramp = SKY
			// the disc: a swollen red sunset, darker at its rim, never white
			if (d < sr) {
				ramp = SUN
				lit = 0.5 + 0.5 * Math.sqrt(1 - (d / sr) ** 2)
			}
			// cloud bars across its lower half, lit along their tops
			for (const [by, bx, len, thick] of S.bars) {
				const row = y - (sy + by * sr)
				if (Math.abs(x - sx - bx * sr) < len * sr && row >= -thick && row < thick) {
					ramp = SKY
					lit = row < 1 - thick ? 0.5 : 0.12
				}
			}
			// the plumes: smoke leaning off the burning fields, dark against the sky and across the sun
			for (const px of S.plumes) {
				const up = (hz - y) / H
				const cx = px * W + M + up * 0.45 * H + (fbm2(y / 26, px * 9, 5) - 0.5) * 24
				const w = 4 + up * 0.32 * H
				const n = fbm2((x - cx) / 22, (y + px * 400) / 18, 9)
				const body = (1 - Math.abs(x - cx) / w) * (0.6 + n) * Math.min(1, up * 6)
				if (body > ditherThreshold(x, y) + 0.35) {
					ramp = SKY
					lit = Math.min(lit, 0.06 + 0.14 * n)
				}
			}
			putRgb(L, x, y, PALETTE[ramp[ditherIndex(Math.min(1, lit), ramp.length, x, y)]])
		}
	for (let y = hz; y < H; y++) {
		const k = (y + 0.5 - hz) / (H - hz)
		// the lens in cells, and how far off the ground this row sees
		const f = (G.focal * H) / 2
		const z = (f * G.eye) / (k * (H - hz))
		// one cell's width on the ground here, in metres
		const pw = z / f
		// stalks stand a quarter metre, so a far one is a single cell and a near one a short stroke
		const stalk = Math.max(1, Math.min(6, Math.round(0.25 / pw)))
		for (let x = 0; x < L.w; x++) {
			const wx = (x - M - FIELDS.vanish * W) * pw
			const sun = Math.exp(-((((x - M) / W - S.sunAt[0]) / 0.14) ** 2))
			let name
			if (k < G.haze) {
				const lit = 0.5 + 0.3 * sun + 0.2 * (1 - k / G.haze)
				name = DIRT[ditherIndex(Math.min(1, lit), DIRT.length, x, y)]
			} else if (Math.abs(wx - G.chanX) < G.chanW) {
				// the dry channel: paving slabs, a dark kerb at both edges
				const kerb = G.chanW - Math.abs(wx - G.chanX) < pw * 1.5
				const joint = (z / 0.6) % 1 < Math.max(0.06, pw / 0.6)
				const lit = 0.25 + 0.5 * (1 - k) ** 1.5 + 0.25 * sun * (1 - k)
				name = kerb || joint ? 'basalt' : SLAB[ditherIndex(lit, SLAB.length, x, y)]
			} else {
				const { f1, f2, id } = plates(wx / G.plate, z / G.plate)
				const crack = f2 - f1 < Math.max(0.05, (pw / G.plate) * 1.3)
				const lit = 0.22 + 0.3 * id + 0.4 * (1 - k) ** 2 + 0.3 * sun * (1 - k)
				// a few cracks still smoulder
				if (crack)
					name =
						k > 0.25 && hash2(Math.floor(wx * 3), Math.floor(z * 3), 83) < 0.1
							? 'flare'
							: 'void'
				else name = DIRT[ditherIndex(Math.min(1, lit), DIRT.length, x, y)]
			}
			putRgb(L, x, y, PALETTE[name])
			// stubble: a stalk on the furrow line, now and then
			const onRow = (z / G.row) % 1 < Math.max(0.04, pw / G.row)
			if (
				onRow &&
				Math.abs(wx - G.chanX) > G.chanW &&
				hash2(x, Math.floor(z / G.row), 89) < 0.06
			)
				for (let s = 1; s <= stalk; s++) put(L, x, y - s, s === stalk ? 'rust' : 'basalt')
		}
	}
	return L
}

// The farm, standing on the horizon: windmill tower, house, silos, pylons and their wires, a far town.
function paintFarm(W, H, M) {
	const L = createLayer(W + 2 * M, H)
	const F = FIELDS.farm
	const hz = Math.round(FIELDS.horizon * H)
	const at = x => x * W + M
	const ink = 'garnet'
	// the town on the horizon, a broken line of roofs
	for (let x = at(F.city.from); x < at(F.city.to); x += 2 + Math.floor(hash1(x, 3) * 4)) {
		const h = Math.ceil(hash1(x, 5) * F.city.h * H)
		rect(L, x, hz - h, x + 2 + Math.floor(hash1(x, 7) * 3), hz, ink)
	}
	// pylons: tapered lattice legs, crossarms, wires sagging between the tops
	const tops = []
	for (const p of F.pylons) {
		const x = at(p.x)
		const h = p.h * H
		const foot = h * 0.16
		line(L, x - foot, hz, x - 1, hz - h, 1, ink)
		line(L, x + foot, hz, x + 1, hz - h, 1, ink)
		for (let s = 1; s < 5; s++) {
			const y0 = hz - (h * (s - 1)) / 5
			const y1 = hz - (h * s) / 5
			const w0 = foot * (1 - (s - 1) / 5)
			const w1 = foot * (1 - s / 5)
			line(L, x - w0, y0, x + w1, y1, 1, ink)
			line(L, x + w0, y0, x - w1, y1, 1, ink)
		}
		line(L, x - h * 0.22, hz - h * 0.86, x + h * 0.22, hz - h * 0.86, 1, ink)
		line(L, x - h * 0.15, hz - h * 0.7, x + h * 0.15, hz - h * 0.7, 1, ink)
		tops.push([x, hz - h * 0.86, h])
	}
	tops.unshift([-M, tops[0][1] - tops[0][2] * 0.3, tops[0][2]])
	for (let i = 1; i < tops.length; i++) {
		const [x0, y0] = tops[i - 1]
		const [x1, y1, h1] = tops[i]
		for (const off of [-0.22, 0.22]) {
			const a = x0 + off * h1
			const b = x1 + off * h1
			for (let x = Math.min(a, b); x <= Math.max(a, b); x++) {
				const u = (x - a) / (b - a || 1)
				put(L, x, y0 + (y1 - y0) * u + Math.sin(Math.PI * u) * h1 * 0.12, ink)
			}
		}
	}
	// the windmill's tower and tail; the blades turn live
	const wx = at(F.windmill.x)
	const wh = F.windmill.h * H
	const wf = wh * 0.18
	line(L, wx - wf, hz, wx - 1, hz - wh, 1, ink)
	line(L, wx + wf, hz, wx + 1, hz - wh, 1, ink)
	for (let s = 1; s < 4; s++) {
		const y = hz - (wh * s) / 4
		const w = wf * (1 - s / 4)
		line(L, wx - w, y, wx + w, y, 1, ink)
	}
	rect(L, wx - 3, hz - wh - 2, wx + 3, hz - wh + 2, ink)
	tri(
		L,
		[wx + 3, hz - wh - 1],
		[wx + wh * 0.3, hz - wh - wh * 0.1],
		[wx + wh * 0.3, hz - wh + wh * 0.06],
		ink
	)
	// the house, its roof broken in, one window still lit
	const hx = at(F.house.x)
	const hw = (F.house.w * H) / 2
	const hh = F.house.h * H
	rect(L, hx - hw, hz - hh, hx + hw, hz, ink)
	tri(
		L,
		[hx - hw - 3, hz - hh],
		[hx + hw + 3, hz - hh],
		[hx - hw * 0.2, hz - hh - hh * 0.75],
		ink
	)
	tri(
		L,
		[hx + hw * 0.1, hz - hh - 1],
		[hx + hw * 0.55, hz - hh - 1],
		[hx + hw * 0.3, hz - hh - hh * 0.3],
		'void'
	)
	rect(L, hx + hw * 0.35, hz - hh * 0.6, hx + hw * 0.65, hz - hh * 0.3, 'amber')
	rect(L, hx - hw * 0.6, hz - hh * 0.55, hx - hw * 0.35, hz, 'void')
	// the silos: drums with domed caps and a ladder
	for (const s of F.silos) {
		const x = at(s.x)
		const r = (s.w * H) / 2
		const h = s.h * H
		rect(L, x - r, hz - h, x + r, hz, ink)
		disc(L, x, hz - h, r, ink)
		line(L, x + r * 0.5, hz, x + r * 0.5, hz - h, 1, 'basalt')
	}
	rimLight(L, x => [Math.sign(FIELDS.sky.sunAt[0] * W + M - x) || 1, -1], 'clay')
	return L
}

// The harvester, sunk to its axles where it stopped: body, cab, a header out front, one great wheel.
function paintHarvester(W, H, M) {
	const L = createLayer(W + 2 * M, H)
	const { at, h: size } = FIELDS.harvester
	const x = at[0] * W + M
	const y = at[1] * H
	const h = size * H
	rect(L, x - h * 0.9, y - h * 0.55, x + h * 0.5, y, 'basalt')
	rect(L, x + h * 0.05, y - h, x + h * 0.55, y - h * 0.5, 'basalt')
	rect(L, x + h * 0.15, y - h * 0.9, x + h * 0.45, y - h * 0.62, 'brick')
	line(L, x + h * 0.5, y - h * 0.3, x + h * 1.25, y - h * 0.05, Math.max(2, h * 0.08), 'basalt')
	for (let s = 0; s < 6; s++)
		line(L, x + h * (0.6 + s * 0.11), y - h * 0.25, x + h * (0.6 + s * 0.11), y, 1, 'basalt')
	disc(L, x - h * 0.45, y - h * 0.15, h * 0.32, 'basalt')
	disc(L, x - h * 0.45, y - h * 0.15, h * 0.12, 'rust')
	line(L, x - h * 0.85, y - h * 0.55, x - h * 0.7, y - h * 0.85, 2, 'basalt')
	rimLight(L, () => [1, -1], 'brick')
	return L
}

// The dead tree in the foreground: a trunk that forks and forks again, bare to the tips.
function paintTree(W, H, M) {
	const L = createLayer(W + 2 * M, H)
	const { at, h: size } = FIELDS.tree
	let n = 0
	const branch = (x, y, ang, len, width, depth) => {
		const x1 = x + Math.cos(ang) * len
		const y1 = y - Math.sin(ang) * len
		line(L, x, y, x1, y1, Math.max(1, Math.round(width)), 'void')
		if (depth === 0) return
		const kids = 2 + (hash1(n++, 13) < 0.35 ? 1 : 0)
		for (let k = 0; k < kids; k++) {
			const spread = (k / (kids - 1) - 0.5) * 1.3 + (hash1(n++, 17) - 0.5) * 0.5
			branch(
				x1,
				y1,
				ang + spread,
				len * (0.62 + hash1(n++, 19) * 0.16),
				width * 0.62,
				depth - 1
			)
		}
	}
	branch(at[0] * W + M, at[1] * H, Math.PI / 2 + 0.06, size * H * 0.42, size * H * 0.06, 5)
	rimLight(L, () => [1, -1], 'rust')
	return L
}

export function paintFieldsAtlas(grid) {
	const W = grid.width
	const H = grid.height
	const margin = fieldsMargin(grid)
	const layers = [paintSkyGround, paintFarm, paintHarvester, paintTree].map(paint => {
		const L = paint(W, H, margin)
		tidySprite({ data: L.data }, L.w, L.h, FIELDS.tidyPasses)
		return L
	})
	const width = W + 2 * margin
	const data = new Uint8ClampedArray(width * H * 4 * layers.length)
	layers.forEach((L, i) => data.set(L.data, i * L.data.length))
	return { data, width, height: H * layers.length, margin }
}

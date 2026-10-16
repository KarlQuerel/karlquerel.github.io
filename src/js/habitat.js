// The habitat on the nearest arrival range: the dome, its doorway and lamp, the trail down the face.
// Painted once at the cut in its own light; only the lamp cells wait on lightRidge.

import { ENTRY } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01 } from './math.js'
import { norm } from './vec3.js'
import { ditherThreshold, fbm1, seamIndex } from './pixelNoise.js'

// The habitat (band.habitat): one dome in the middle stretch — the journey was TO somewhere. Its lamp,
// the lit doorway, is kept aside for lightRidge: lit as the sun goes.
export function paintHabitat(put, hab, range) {
	const { w, h, profile } = range
	const lamp = []
	// a cell that waits on the lamp: `day` as cut, `col` once the lamp is thrown
	const lit = (x, y, day, col) => {
		put(x, y, day)
		if (x >= 0 && y >= 0 && x < w && y < h) lamp.push({ x, y, col })
	}
	const shellShades = hab.shades.map(name => PALETTE[name])
	const half = (hab.w - 1) / 2
	const groundAt = x => Math.round(h * (1 - profile[Math.max(0, Math.min(w - 1, x))]))
	// wherever the middle stretch is lowest; the footing buries the downhill edge
	let hx = Math.round(w * 0.5)
	for (let x = Math.round(w * 0.25); x < w * 0.75; x++) {
		if (profile[x] < profile[hx]) hx = x
	}
	// footed on the lowest ground it spans
	let base = 0
	for (let dx = -half; dx <= half; dx++) base = Math.max(base, groundAt(hx + dx))
	// how many cells of shell stand over the footing `dx` off the centre
	const shellAt = dx =>
		Math.max(
			1,
			Math.round((hab.h + hab.sink) * Math.sqrt(1 - (dx / (half + 0.5)) ** 2)) - hab.sink
		)
	const site = { hx, base, half, shellShades }

	paintDome(put, hab, range, site)
	// the shell's ground shadow, thrown along the surface away from the sun — a shape without one floats
	const shadowDir = -Math.sign(ENTRY.ridgeLight)
	for (let i = 1; i <= hab.shadowLen; i++) {
		const x = hx + (half + i) * shadowDir
		if (x < 0 || x >= w) continue
		const y = groundAt(x)
		if (i > hab.shadowLen - 2 && ditherThreshold(x, y) > 0.5) continue
		put(x, y, shellShades[0])
	}
	paintTrail(hab, range, site)
	doorLight(hab, range, site)
	paintPorch(put, hab, site)

	// The entrance is an arch, not a slab: ember walls around a hotter core read as light from inside.
	// By day it is a dark doorway, as a doorway is; the lit cells wait on the lamp.
	const light = PALETTE[hab.light]
	const glow = PALETTE[hab.glow]
	const dark = shellShades[0]
	lit(hx - 1, base, dark, light)
	lit(hx + 1, base, dark, light)
	lit(hx - 1, base - 1, dark, light)
	lit(hx + 1, base - 1, dark, light)
	lit(hx, base - 2, dark, light)
	lit(hx, base, dark, glow)
	lit(hx, base - 1, dark, glow)

	// The chimney: one column standing off the shell, its lip on the rim shade so the sun catches it.
	const vx = hx + hab.vent.at
	const lip = base - shellAt(hab.vent.at) - hab.vent.h + 1
	const lipShade = PALETTE[hab.rim]
	for (let y = lip; y <= base - shellAt(hab.vent.at); y++) {
		if (y <= groundAt(vx)) put(vx, y, y === lip ? lipShade : shellShades[1])
	}

	return { vent: { x: (vx + 0.5) / w, y: lip / h }, lamp }
}

// The airlock porch: a frame standing proud of the shell round the doorway, so it reads as built.
function paintPorch(put, hab, { hx, base }) {
	const [side, lit, top] = hab.porch.map(name => PALETTE[name])
	// the sun side of the frame catches the light
	const sunSide = Math.sign(ENTRY.ridgeLight) || 1
	for (let dy = 0; dy < 3; dy++) {
		put(hx + 2 * sunSide, base - dy, lit)
		put(hx - 2 * sunSide, base - dy, side)
	}
	for (let dx = -1; dx <= 1; dx++) put(hx + dx, base - 3, top)
}

// The shell, lit off a real surface normal, gathering sun and sky separately at each cell.
function paintDome(put, hab, { h, w, profile, faceAt }, { hx, base, half, shellShades }) {
	const sunDir = norm([ENTRY.ridgeLight, hab.sunUp, hab.sunFront])
	const edgeShades = [shellShades[0], shellShades[2], shellShades[3], PALETTE[hab.rim]]
	for (let dx = -half; dx <= half; dx++) {
		const x = hx + dx
		if (x < 0 || x >= w) continue
		// The shell springs from `sink` cells UNDER the ground, so what stands above is the top of a bigger dome.
		const rise = Math.round((hab.h + hab.sink) * Math.sqrt(1 - (dx / (half + 0.5)) ** 2))
		// A dome is its own shape, but it stands in the mountain's light and not in its own.
		const u = dx / (half + 0.5)
		const bedded = hab.bed + (1 - hab.bed) * clamp01(faceAt(x))
		// The hill in front buries it. `base` is the LOWEST ground the shell spans, so other columns stand above.
		const ground = Math.round(h * (1 - profile[x]))
		const foot = base + hab.sink
		// what is left of the column once the hill has buried it; too little is a stray cell
		if (rise - Math.max(0, foot - ground) < hab.minRise) continue
		let crownLit = 0
		let footCourse = true
		for (let dy = 0; dy < rise; dy++) {
			const y = foot - dy
			const v = dy / (hab.h + hab.sink)
			const nz = Math.sqrt(Math.max(0, 1 - u * u - v * v))
			const lit = clamp01(
				hab.ambient +
					hab.sun * bedded * clamp01(u * sunDir[0] + v * sunDir[1] + nz * sunDir[2]) +
					hab.sky * v
			)
			crownLit = lit
			if (y > ground) continue
			// Panel seams run as longitude, not screen x: across the width they came out as a cylinder's meridians.
			const lon = Math.atan2(u, Math.max(nz, 1e-3))
			const m = (lon / Math.PI + 0.5) * hab.panels
			const onSeam = v < hab.panelTop && Math.abs(m - Math.round(m)) * (1 / hab.panelSeam) < 1
			// The base course: the lowest cell a column shows is where shell meets ground, and it drops a notch.
			const shade = clamp01(
				lit - (onSeam ? hab.panelDip : 0) - (footCourse ? hab.footDip : 0)
			)
			footCourse = false
			put(x, y, shellShades[seamIndex(shade, shellShades.length, x, y, ENTRY.ridgeSeam)])
		}
		// The crown is lit by the sky too. `lip` is the skylight floor, so the top edge stays above the body.
		const edgeY = foot - rise + 1
		if (edgeY <= ground) {
			// Seamed, not checkered: a one-cell rim alternating shades is a dotted line, and that is not an edge.
			const lip = clamp01(crownLit + hab.rimLift)
			put(x, edgeY, edgeShades[seamIndex(lip, edgeShades.length, x, edgeY, ENTRY.ridgeSeam)])
		}
	}
}

// The worn path down the face: S-bends, ragged shoulders and a paler crown where the feet go.
function paintTrail(hab, { w, h, profile, seed, tread }, { hx, base }) {
	const P = hab.path
	// a rung on the path's own ramp: the relight walks it into the night with the rock around it
	const levels = P.shades.length
	const onGround = (x, y) => x >= 0 && x < w && y > Math.round(h * (1 - profile[x]))
	for (let y = base + 1; y < h; y++) {
		const row = y - base
		const t = row / Math.max(1, h - 1 - base)
		// S-bends down the face, roughened so no two turns match; they come in over the first rows,
		// so the path leaves the door straight
		const wander = Math.min(1, row / P.settle)
		const bend = Math.sin((row / P.bendRows) * 2 * Math.PI) * P.bend
		const jog = (fbm1(y / P.wanderCells, seed + 13) - 0.5) * P.meander
		const cx = hx + 0.5 + (bend + jog) * wander * (0.5 + 0.5 * t)
		const wPath = (1 + P.spread * t) / 2
		// each shoulder breaks on its own noise, so the edges never mirror
		const left = wPath + (fbm1(y / P.ragCells, seed + 21) - 0.5) * P.rag
		const right = wPath + (fbm1(y / P.ragCells, seed + 22) - 0.5) * P.rag
		for (let x = Math.floor(cx - left) - 1; x <= Math.ceil(cx + right) + 1; x++) {
			if (!onGround(x, y)) continue
			const d = x + 0.5 - cx
			const reach = d < 0 ? left : right
			if (Math.abs(d) > reach) continue
			// 0 at the shoulder, 1 down the middle; a fading crown, worn less far from the door
			const crown = clamp01(1 - Math.abs(d) / Math.max(0.5, reach)) * (1 - P.crownFade * t)
			tread(x, y, seamIndex(crown, levels, x, y, P.seam))
		}
	}
}

// The doorway's light on the ground in front of it, as a share per cell: a cone that leaves the sill
// as wide as the door and opens toward the viewer, falling off with distance and toward its sides.
// It is not painted: lightRidge walks each lit cell back up its own ramp by it, so the rock's crags
// and the path's tread stay under the light instead of a flat wash laid over them.
function doorLight(hab, { w, h, solid, light }, { hx, base }) {
	const L = hab.doorLight
	for (let dy = 1; dy <= L.reach; dy++) {
		const spread = L.width / 2 + dy * L.open
		for (let dx = -Math.ceil(spread) - 1; dx <= Math.ceil(spread) + 1; dx++) {
			const x = hx + dx
			const y = base + dy
			if (x < 0 || x >= w || y >= h || !solid(x, y)) continue
			const fall = clamp01(1 - dy / L.reach) ** L.power
			const side = clamp01(1 - (Math.abs(dx) / (spread + 1)) ** L.edge)
			if (fall * side > 0) light(x, y, fall * side)
		}
	}
}

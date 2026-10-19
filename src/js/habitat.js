// The habitat on the nearest arrival range: the dome, its doorway and lamp, the trail down the face.
// Cut once with the range, then lit with it (lightHabitat): it stands in the same sun as the rock.

import { ENTRY } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01 } from './math.js'
import { dot, norm } from './vec3.js'
import { ditherThreshold, fbm1, seamIndex } from './pixelNoise.js'

// the faces the built parts show: straight up (an edge, a lintel) and straight out of the screen at us
const UP = [0, 1, 0]
const OUT = [0, 0, 1]

// The habitat (band.habitat): one dome in the middle stretch — the journey was TO somewhere. Its lamp,
// the lit doorway, is kept aside for lightRidge: lit as the sun goes.
export function paintHabitat(claim, hab, range) {
	const { w, h, profile } = range
	const lamp = []
	// Each cell keeps how it takes the light, as a level on the habitat's own ramp (dark to lit, its top
	// step the sun's on the metal) under the sun as it stands. A later cell wins: the doorway over the
	// shell, the porch over both.
	const cells = new Map()
	const relit = (x, y, level) => {
		if (x < 0 || y < 0 || x >= w || y >= h) return
		claim(x, y)
		cells.set(y * w + x, { x, y, level })
	}
	// a cell that waits on the lamp: `day` as lit, `col` once the lamp is thrown
	const lit = (x, y, day, col) => {
		relit(x, y, day)
		if (x >= 0 && y >= 0 && x < w && y < h) lamp.push({ x, y, col })
	}
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
	const site = { hx, base, half, groundAt }

	const shell = paintDome(relit, hab, range, site)
	// The ground either side the shell's shadow can fall on; shadeHabitat throws it away from the disc.
	// It starts where the shell is last seen, not at its full width: the hill buries its outer columns.
	const shadow = []
	for (const side of [-1, 1]) {
		for (let i = 1; i <= hab.shadowLen; i++) {
			const x = (side < 0 ? shell.left : shell.right) + i * side
			if (x < 0 || x >= w) continue
			shadow.push({ x, y: groundAt(x), side, i })
		}
	}
	paintTrail(hab, range, site)
	doorLight(hab, range, site)
	paintPorch(lit, hab, site)

	// The entrance is an arch, not a slab: ember walls around a hotter core read as light from inside.
	// By day it is a dark doorway, as a doorway is; the lit cells wait on the lamp.
	const light = PALETTE[hab.light]
	const glow = PALETTE[hab.glow]
	const dark = () => 0
	lit(hx - 1, base, dark, light)
	lit(hx + 1, base, dark, light)
	lit(hx - 1, base - 1, dark, light)
	lit(hx + 1, base - 1, dark, light)
	lit(hx, base - 2, dark, light)
	lit(hx, base, dark, glow)
	lit(hx, base - 1, dark, glow)
	// the arch's shoulders catch the lamp with the frame, or the lit doorway reads as two eyes over a glow
	for (const dx of [-1, 1]) {
		if (hx + dx >= 0 && hx + dx < w)
			lamp.push({ x: hx + dx, y: base - 2, col: PALETTE[hab.porchLamp] })
	}

	// The chimney: a stack off the crown facing us, its lip an edge turned up so a high sun catches it.
	const vx = hx + hab.vent.at
	const lip = base - shellAt(hab.vent.at) - hab.vent.h + 1
	for (let y = lip; y <= base - shellAt(hab.vent.at); y++) {
		if (y > groundAt(vx)) continue
		relit(vx, y, sun =>
			y === lip ? edgeLevel(hab, sun, UP, vx, y) : shellLevel(hab, sun, OUT, vx, y)
		)
	}

	return {
		vent: { col: vx, row: lip },
		lamp,
		habitat: {
			hab,
			w,
			h,
			hx,
			base,
			cells: [...cells.values()],
			shadow,
			// the cells under the shell's shadow this relight, kept so a relight allocates nothing
			shade: new Uint8Array(w * h),
			ramp: hab.shades.map(name => PALETTE[name]),
		},
	}
}

// The disc as the dome sees it: across and up from the doorway, on the band's grid.
function sightOf({ h, hx, base }, disc) {
	const ax = disc[0] - hx
	const ay = Math.max(0, disc[1] - (h - base))
	return { ax, ay, len: Math.hypot(ax, ay) || 1 }
}

// Where the shell's shadow lies on the ground now, for lightRidge to shade the rock under it as it
// shades it under a peak, crags and all: thrown away from the disc, `shadowRows` deep at the footing
// and thinning out, long under a low sun and gone under a high one. A shape without one floats.
export function shadeHabitat(habitat, disc) {
	const { hab, w, h, shadow, shade } = habitat
	const { ax, len } = sightOf(habitat, disc)
	const long = (hab.shadowLen * Math.abs(ax)) / len
	shade.fill(0)
	for (const s of shadow) {
		if (s.side === Math.sign(ax) || s.i > long) continue
		const rows = Math.max(1, Math.round(hab.shadowRows * (1 - (s.i - 1) / long)))
		for (let y = s.y; y < Math.min(h, s.y + rows); y++) {
			// the tip breaks up rather than stopping square
			if (s.i > long - 2 && ditherThreshold(s.x, y) > 0.5) continue
			shade[y * w + s.x] = 1
		}
	}
	return shade
}

// The habitat in the light it stands in now, after the rock it stands on (see lightRidge). `disc` is
// the sun's place on the band's grid, `cast` the direct sun left on the rock, `face` each column's
// facing under it, `light` what the sky still gives, and `line` the shadow the peaks throw across the
// band, which falls on the shell as it falls on the rock.
export function lightHabitat(habitat, { disc, cast, face, light, line }, write) {
	const { hab, h, cells, ramp } = habitat
	const top = ramp.length - 1
	const SH = ENTRY.ridgeShadow
	// `sunFront` brings the disc out of the screen toward us: it stands behind the range, and lit from
	// there the face would stay dark.
	const { ax, ay, len } = sightOf(habitat, disc)
	const dir = norm([ax / len, ay / len, hab.sunFront])
	// we look down into the valley, not level at it, so the mirror of the disc sits higher on the shell
	const view = norm([0, hab.lookDown, 1])
	const sun = {
		dir,
		light,
		// halfway between the disc and us: where the shell turns to it, it mirrors the sun
		half: norm([dir[0] + view[0], dir[1] + view[1], dir[2] + view[2]]),
		// A dome is its own shape, but it stands in the mountain's light and not in its own: its
		// column's facing beds it, and under a peak's shadow line it loses `shade` of what the rock
		// does, over the same soft seam — lit whole inside a shaded valley, it floated.
		reach: (x, y) =>
			cast *
			(hab.bed + (1 - hab.bed) * clamp01(face[x])) *
			(1 - SH.depth * hab.shade * clamp01((line[x] - (h - y)) / SH.soft)),
	}
	// Quantised once, after the sun: lit continuously the shell darkens as a terminator sweeping over
	// it. Walked down a rung at a time on each cell's own threshold, as the rock is, it dissolved into
	// speckle at dusk — a smooth shell has no crags to hide the order the cells go over in.
	for (const c of cells) {
		write(c.x, c.y, ramp[seamIndex(c.level(sun) / top, ramp.length, c.x, c.y, ENTRY.ridgeSeam)])
	}
}

// A cell's light off its normal `n`: the sun on a cosine where it reaches, the sky and the ambient by
// what the sky still gives, and on the side turned from the sun the lit ground's light thrown back into
// its lower half, so the darkest band runs along the terminator and the far edge reads round.
function shellLight(hab, sun, n, x, y) {
	const facing = dot(n, sun.dir)
	const reach = sun.reach(x, y)
	const sunlit = hab.sun * reach * clamp01(facing) ** hab.falloff
	const bounce = hab.bounce * reach * clamp01(-facing) * (1 - n[1])
	return clamp01(sun.light * (hab.ambient + hab.sky * n[1]) + sunlit + bounce)
}

// That light as a level on the ramp, short of its top step: diffuse light stops a step under the sun's.
function shellLevel(hab, sun, n, x, y, dip = 0) {
	return clamp01(shellLight(hab, sun, n, x, y) - dip) * (hab.shades.length - 2)
}

// An edge turned to the sky — the crown's rim, the chimney's lip — lifted toward the top step where the
// sun stands on its side of the silhouette, taken on the band's plane: a low sun picks out the flank
// under it and a high one the top, never the whole outline. Rounded whole, not dithered: a one-cell
// row alternating shades is a dotted line, and that is not an edge.
function edgeLevel(hab, sun, n, x, y) {
	const top = hab.shades.length - 1
	const across = Math.hypot(n[0], n[1]) || 1
	const catches = sun.reach(x, y) * clamp01((n[0] * sun.dir[0] + n[1] * sun.dir[1]) / across)
	return Math.round(Math.min(top, shellLevel(hab, sun, n, x, y) + hab.rimLift * top * catches))
}

// The airlock porch: a frame standing proud of the shell round the doorway, so it reads as built. Each
// face is lit off its own normal — the posts out to their side, the lintel up, all `front` toward us —
// so the sun walks round the frame as it does round the shell; at night the whole frame catches the lamp.
function paintPorch(lit, hab, { hx, base }) {
	const lamp = PALETTE[hab.porchLamp]
	for (const post of [-1, 1]) {
		const n = norm([post, 0, hab.porch.front])
		const x = hx + 2 * post
		for (let dy = 0; dy < 3; dy++) {
			const y = base - dy
			lit(x, y, sun => shellLevel(hab, sun, n, x, y), lamp)
		}
	}
	const n = norm([0, 1, hab.porch.front])
	for (let dx = -1; dx <= 1; dx++) {
		const [x, y] = [hx + dx, base - 3]
		lit(x, y, sun => shellLevel(hab, sun, n, x, y), lamp)
	}
}

// The shell, lit off a real surface normal, gathering sun and sky separately at each cell. Hands back
// the first and last columns it shows.
function paintDome(relit, hab, { w }, { hx, base, half, groundAt }) {
	const top = hab.shades.length - 1
	const shown = { left: hx, right: hx }
	for (let dx = -half; dx <= half; dx++) {
		const x = hx + dx
		if (x < 0 || x >= w) continue
		// The shell springs from `sink` cells UNDER the ground, so what stands above is the top of a bigger dome.
		const rise = Math.round((hab.h + hab.sink) * Math.sqrt(1 - (dx / (half + 0.5)) ** 2))
		const u = dx / (half + 0.5)
		// The hill in front buries it. `base` is the LOWEST ground the shell spans, so other columns stand
		// above. A crag one column wide stands no higher than its neighbours here: on the shell it read as
		// a cell of rock with shell on three sides.
		const ground = Math.max(groundAt(x), Math.min(groundAt(x - 1), groundAt(x + 1)))
		const foot = base + hab.sink
		// what is left of the column once the hill has buried it; too little is a stray cell
		if (rise - Math.max(0, foot - ground) < hab.minRise) continue
		shown.left = Math.min(shown.left, x)
		shown.right = Math.max(shown.right, x)
		let crown = null
		let footCourse = true
		for (let dy = 0; dy < rise; dy++) {
			const y = foot - dy
			const v = dy / (hab.h + hab.sink)
			const n = [u, v, Math.sqrt(Math.max(0, 1 - u * u - v * v))]
			crown = n
			if (y > ground) continue
			// Panel seams run as longitude, not screen x: across the width they came out as a cylinder's meridians.
			const lon = Math.atan2(u, Math.max(n[2], 1e-3))
			const m = (lon / Math.PI + 0.5) * hab.panels
			const onSeam = v < hab.panelTop && Math.abs(m - Math.round(m)) * (1 / hab.panelSeam) < 1
			// The base course: the lowest cell a column shows is where shell meets ground, and it drops a notch.
			const dip = (onSeam ? hab.panelDip : 0) + (footCourse ? hab.footDip : 0)
			footCourse = false
			relit(x, y, sun => {
				const level = shellLevel(hab, sun, n, x, y, dip)
				// the glint, where the shell mirrors the disc toward us: the top step at its core and a step
				// up around it, sliding over the shell with the sun
				const glint = onSeam
					? 0
					: sun.reach(x, y) * clamp01(dot(n, sun.half)) ** hab.glint.power
				if (glint > hab.glint.at) return top
				return glint > hab.glint.halo ? Math.min(top - 1, level + 1) : level
			})
		}
		// The crown's edge, on the side turned to the sun and only there: lit all round, the dome came
		// out drawn in a bright outline.
		const edgeY = foot - rise + 1
		if (edgeY <= ground) {
			const edge = crown
			relit(x, edgeY, sun => edgeLevel(hab, sun, edge, x, edgeY))
		}
	}
	return shown
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

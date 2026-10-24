// A shaded wordmark from plain glyph masks. Light, depth, outline, plating and wear are all derived
// here, so the constants hold nothing but the letter shapes, drawn coarse and doubled up to `scale`.

import { paletteRgb } from '@/constants/palette'
import { ramp } from './math.js'
import { ditherThreshold, hash1, hash2 } from './pixelNoise.js'
import { scaleMask } from './pixelScale.js'

const NEIGHBOURS = [-1, 0, 1]
const LIT = new Set(['specular', 'light', 'face', 'brushed', 'shade'])
const FACE = new Set(['face', 'shade'])

// Each glyph of the text, `scale` cells per drawn cell, set on one line `gap` cells apart: where it
// starts, and the line's size. A `cut` is one line of void through every letter: `rows` rows of the
// glyphs from `at` are emptied.
function glyphRun({ text, glyphs, gap, cut, scale }) {
	const inCut = y => cut && y >= cut.at && y < cut.at + cut.rows
	const run = []
	let x = 0
	for (const ch of text) {
		const glyph = scaleMask(glyphs[ch], scale).map((row, y) =>
			inCut(y) ? row.replaceAll('#', '.') : row
		)
		run.push({ glyph, x })
		x += glyph[0].length + gap
	}
	return { run, width: x - gap, height: run[0].glyph.length }
}

// Lays the mark's text out on one grid and names each cell's role.
export function layoutWordmark(mark) {
	const { run: line, width, height } = glyphRun(mark)
	// one cell of outline all round, plus the depth the letters cast down and to the right
	const cols = width + 2 + mark.depth
	const rows = height + 2 + mark.depth

	const mask = Array.from({ length: rows }, () => new Array(cols).fill(false))
	const owner = Array.from({ length: rows }, () => new Array(cols).fill(-1))
	const boxes = []
	line.forEach(({ glyph, x: start }, index) => {
		const x = start + 1
		glyph.forEach((row, y) => {
			for (let i = 0; i < row.length; i++) {
				if (row[i] !== '#') continue
				mask[y + 1][x + i] = true
				owner[y + 1][x + i] = index
			}
		})
		boxes.push({ x, y: 1, w: glyph[0].length, h: height })
	})

	const at = (cx, cy) => cy >= 0 && cy < rows && cx >= 0 && cx < cols && mask[cy][cx]
	const castBy = (cx, cy) => {
		for (let d = 1; d <= mark.depth; d++) if (at(cx - d, cy - d)) return d
		return 0
	}
	const solid = (cx, cy) => at(cx, cy) || castBy(cx, cy) > 0
	const near = (cx, cy, test) =>
		NEIGHBOURS.some(dy => NEIGHBOURS.some(dx => test(cx + dx, cy + dy)))

	// Key light from the upper left, `bevel` cells deep: caps and left edges lit, feet and right edges
	// shaded, with a thin rim light along the very bottom.
	const b = mark.bevel
	const open = (cx, cy, dx, dy, n) => {
		for (let d = 1; d <= n; d++) if (!at(cx + dx * d, cy + dy * d)) return true
		return false
	}
	const lit = (cx, cy) => {
		if (!at(cx, cy - 1)) return 'specular'
		if (!at(cx, cy + 1)) return 'rim'
		if (open(cx, cy, 0, -1, b) || open(cx, cy, -1, 0, b - 1)) return 'light'
		if (open(cx, cy, 0, 1, b) || open(cx, cy, 1, 0, b - 1)) return 'dark'
		if (open(cx, cy, -1, 0, b)) return 'light'
		if (open(cx, cy, 1, 0, b)) return 'dark'
		return 'face'
	}

	const roles = mask.map((row, cy) =>
		row.map((on, cx) => {
			if (on) return lit(cx, cy)
			const d = castBy(cx, cy)
			if (d) return d === 1 ? 'depth' : 'depthFar'
			return near(cx, cy, solid) ? 'outline' : null
		})
	)
	// the cut is a saw through the whole letter, depth and outline included: its rows stay void
	if (mark.cut)
		for (let cy = mark.cut.at + 1; cy < mark.cut.at + 1 + mark.cut.rows; cy++)
			roles[cy].fill(null)

	// Per letter: the face falls off toward the lower right.
	boxes.forEach(({ x: bx, y: by, w, h }) => {
		for (let cy = by; cy < by + h; cy++)
			for (let cx = bx; cx < bx + w; cx++) {
				if (roles[cy][cx] !== 'face') continue
				const t = (cx - bx + cy - by) / (w + h)
				const fall = ramp(t, mark.shade.from, mark.shade.to)
				if (ditherThreshold(cx, cy) < fall) roles[cy][cx] = 'shade'
			}
	})
	// A shaded cell with no shaded neighbour is where the dither first bites: alone, it reads as a
	// dead pixel, so it goes back to face.
	const SIDES = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	]
	const alone = []
	roles.forEach((row, cy) =>
		row.forEach((role, cx) => {
			if (
				role === 'shade' &&
				!SIDES.some(([dx, dy]) => roles[cy + dy]?.[cx + dx] === 'shade')
			)
				alone.push([cx, cy])
		})
	)
	for (const [cx, cy] of alone) roles[cy][cx] = 'face'

	// Wear on a fixed seed: brushed grain in short runs across the faces, worn highlights and a
	// chipped outline. The grain lifts a cell one step, so it reads as light catching the brushing.
	const { seed, run, streak, worn, chip } = mark.wear
	const outer = (cx, cy) =>
		roles[cy][cx] === 'outline' && near(cx, cy, (x2, y2) => roles[y2]?.[x2] === null)
	roles.forEach((row, cy) =>
		row.forEach((role, cx) => {
			const r = hash2(cx, cy, seed)
			if (FACE.has(role) && hash2(Math.floor(cx / run), cy, seed + 1) < streak)
				row[cx] = role === 'face' ? 'brushed' : 'face'
			else if ((role === 'light' || role === 'specular') && r > 1 - worn) row[cx] = 'face'
			else if (role === 'outline' && r < chip && outer(cx, cy)) row[cx] = null
		})
	)

	return { cols, rows, roles, boxes, mask, owner, castBy }
}

// Cuts the letters into plates, squares laid on each letter's box, and orders their landing: letters
// in sequence, each starting once the one before is `overlap` along. Within a letter the plates land
// diagonal by diagonal from the top left, shuffled only along a diagonal, so the letter grows whole.
// Depth cells land with the cell that casts them.
export function platesOf(layout, plating) {
	const { plate, overlap, seed } = plating
	const ids = new Map()
	const rankAt = layout.roles.map(row => row.map(() => -1))
	layout.roles.forEach((row, y) =>
		row.forEach((role, x) => {
			if (!role || role === 'outline') return
			const d = layout.mask[y][x] ? 0 : layout.castBy(x, y)
			const [mx, my] = [x - d, y - d]
			const letter = layout.owner[my][mx]
			const box = layout.boxes[letter]
			const pr = Math.floor((my - box.y) / plate)
			const pc = Math.floor((mx - box.x) / plate)
			const key = `${letter}:${pr}:${pc}`
			const span = Math.ceil(box.w / plate) + Math.ceil(box.h / plate)
			// a hash under one keeps the shuffle inside the diagonal
			const diag = (pr + pc + hash1(ids.size, seed)) / span
			if (!ids.has(key)) ids.set(key, { letter, diag, cells: [] })
			ids.get(key).cells.push([x, y])
		})
	)
	const plates = [...ids.values()]
	const at = p => p.letter + p.diag * (1 + overlap)
	plates.sort((a, b) => at(a) - at(b))
	const centres = plates.map((p, rank) => {
		p.cells.forEach(([x, y]) => (rankAt[y][x] = rank))
		const [sx, sy] = p.cells.reduce(([ax, ay], [x, y]) => [ax + x, ay + y], [0, 0])
		return [Math.round(sx / p.cells.length), Math.round(sy / p.cells.length)]
	})
	return { rankAt, centres, count: plates.length }
}

// Paints the word mid-construction at (ox, oy): plates ranked under `landed` in their shaded steel,
// the rest not yet there. `hot` plates glow, `glint` is the sweep's diagonal, `sparks` are [x, y, tone].
export function paintPlating(ctx, layout, plates, mark, weld, state, ox, oy) {
	const { landed, hot, glint, sparks } = state
	const tones = layout.roles.map((row, y) =>
		row.map((role, x) => {
			if (!role || role === 'outline' || plates.rankAt[y][x] >= landed) return null
			if (hot.has(plates.rankAt[y][x]) && LIT.has(role)) return weld.hot
			if (LIT.has(role) && x + y >= glint && x + y < glint + mark.glint.width)
				return mark.ramp.glint
			return mark.ramp[role]
		})
	)
	// The outline follows whatever has landed, so a half-built letter is outlined as itself. Tested
	// against a snapshot: an outline cell must not light the next one along.
	const built = tones.map(row => [...row])
	layout.roles.forEach((row, y) =>
		row.forEach((role, x) => {
			if (role !== 'outline') return
			if (NEIGHBOURS.some(dy => NEIGHBOURS.some(dx => built[y + dy]?.[x + dx])))
				tones[y][x] = mark.ramp.outline
		})
	)
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	const put = (x, y, name) => {
		ctx.fillStyle = paletteRgb(name)
		ctx.fillRect(ox + x, oy + y, 1, 1)
	}
	tones.forEach((row, y) => row.forEach((name, x) => name && put(x, y, name)))
	for (const [x, y, tone] of sparks) put(x, y, tone)
}

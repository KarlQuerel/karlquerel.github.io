// A shaded wordmark from plain glyph masks. Light, depth, outline, plating and wear are all derived
// here, so the constants hold nothing but the letter shapes.

import { PALETTE } from '@/constants/palette'
import { clamp01 } from './math.js'
import { ditherThreshold, hash1, hash2 } from './pixelNoise.js'

const NEIGHBOURS = [-1, 0, 1]
const LIT = new Set(['specular', 'light', 'face', 'brushed', 'shade'])
const FACE = new Set(['face', 'shade'])

// Lays `text` out on one grid and names each cell's role.
export function layoutWordmark(mark, text = mark.text) {
	const glyphs = [...text].map(ch => mark.glyphs[ch])
	const height = glyphs[0].length
	const width = glyphs.reduce((sum, g) => sum + g[0].length, 0) + mark.gap * (glyphs.length - 1)
	// one cell of outline all round, plus the depth the letters cast down and to the right
	const cols = width + 2 + mark.depth
	const rows = height + 2 + mark.depth

	const mask = Array.from({ length: rows }, () => new Array(cols).fill(false))
	const owner = Array.from({ length: rows }, () => new Array(cols).fill(-1))
	const boxes = []
	let x = 1
	glyphs.forEach((glyph, index) => {
		glyph.forEach((row, y) => {
			for (let i = 0; i < row.length; i++) {
				if (row[i] !== '#') continue
				mask[y + 1][x + i] = true
				owner[y + 1][x + i] = index
			}
		})
		boxes.push({ x, y: 1, w: glyph[0].length, h: height })
		x += glyph[0].length + mark.gap
	})

	const at = (cx, cy) => cy >= 0 && cy < rows && cx >= 0 && cx < cols && mask[cy][cx]
	const castBy = (cx, cy) => {
		for (let d = 1; d <= mark.depth; d++) if (at(cx - d, cy - d)) return d
		return 0
	}
	const solid = (cx, cy) => at(cx, cy) || castBy(cx, cy) > 0
	const near = (cx, cy, test) =>
		NEIGHBOURS.some(dy => NEIGHBOURS.some(dx => test(cx + dx, cy + dy)))

	// Key light from the upper left, two cells deep: caps and left edges lit, feet and right edges
	// shaded, with a thin rim light along the very bottom.
	const lit = (cx, cy) => {
		if (!at(cx, cy - 1)) return 'specular'
		if (!at(cx, cy + 1)) return 'rim'
		if (!at(cx, cy - 2) || !at(cx - 1, cy)) return 'light'
		if (!at(cx, cy + 2) || !at(cx + 1, cy)) return 'dark'
		if (!at(cx - 2, cy)) return 'light'
		if (!at(cx + 2, cy)) return 'dark'
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

	// Per letter: the face falls off toward the lower right, then a rivet inside each corner.
	boxes.forEach(({ x: bx, y: by, w, h }) => {
		for (let cy = by; cy < by + h; cy++)
			for (let cx = bx; cx < bx + w; cx++) {
				if (roles[cy][cx] !== 'face') continue
				const t = (cx - bx + cy - by) / (w + h)
				const fall = clamp01((t - mark.shade.from) / (mark.shade.to - mark.shade.from))
				if (ditherThreshold(cx, cy) < fall) roles[cy][cx] = 'shade'
			}
		const i = mark.rivet.inset
		for (const [cx, cy] of [
			[bx + i, by + i],
			[bx + w - 1 - i, by + i],
			[bx + i, by + h - 1 - i],
			[bx + w - 1 - i, by + h - 1 - i],
		]) {
			if (!FACE.has(roles[cy][cx])) continue
			roles[cy][cx] = 'hardware'
			if (FACE.has(roles[cy - 1][cx - 1])) roles[cy - 1][cx - 1] = 'specular'
		}
	})

	// Wear on a fixed seed: brushed grain in short runs across the faces, scratches, worn highlights,
	// chipped outline. The grain lifts a cell one step, so it reads as light catching the brushing.
	const { seed, run, streak, scratch, worn, chip } = mark.wear
	const outer = (cx, cy) =>
		roles[cy][cx] === 'outline' && near(cx, cy, (x2, y2) => roles[y2]?.[x2] === null)
	roles.forEach((row, cy) =>
		row.forEach((role, cx) => {
			const r = hash2(cx, cy, seed)
			if (FACE.has(role) && r < scratch) row[cx] = 'dark'
			else if (FACE.has(role) && hash2(Math.floor(cx / run), cy, seed + 1) < streak)
				row[cx] = role === 'face' ? 'brushed' : 'face'
			else if ((role === 'light' || role === 'specular') && r > 1 - worn) row[cx] = 'face'
			else if (role === 'outline' && r < chip && outer(cx, cy)) row[cx] = null
		})
	)

	return { cols, rows, roles, boxes, mask, owner, castBy }
}

// Cuts the letters into plates, squares laid on each letter's box, and orders their landing: letters
// in sequence, each starting once the one before is `overlap` along, plates shuffled within a letter.
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
			const key = `${letter}:${Math.floor((my - box.y) / plate)}:${Math.floor((mx - box.x) / plate)}`
			if (!ids.has(key)) ids.set(key, { id: ids.size, letter, cells: [] })
			ids.get(key).cells.push([x, y])
		})
	)
	const plates = [...ids.values()]
	const at = p => p.letter + hash1(p.id, seed) * (1 + overlap)
	plates.sort((a, b) => at(a) - at(b))
	const centres = plates.map((p, rank) => {
		p.cells.forEach(([x, y]) => (rankAt[y][x] = rank))
		const [sx, sy] = p.cells.reduce(([ax, ay], [x, y]) => [ax + x, ay + y], [0, 0])
		return [Math.round(sx / p.cells.length), Math.round(sy / p.cells.length)]
	})
	return { rankAt, centres, count: plates.length }
}

// Paints the word mid-construction at (ox, oy): plates ranked under `landed` in their shaded steel,
// the rest not yet there. `hot` plates glow, `glint` is the sweep's diagonal, `sparks` are cells.
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
		ctx.fillStyle = `rgb(${PALETTE[name].join(' ')})`
		ctx.fillRect(ox + x, oy + y, 1, 1)
	}
	tones.forEach((row, y) => row.forEach((name, x) => name && put(x, y, name)))
	for (const [x, y] of sparks) put(x, y, weld.spark)
}

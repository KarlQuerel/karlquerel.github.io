// Pixel-art upscaling for the glyph masks: AdvMAME2x doubles a mask and rounds its stair-steps, so a
// letter drawn at six cells a stroke paints at twelve without being redrawn.

// One doubling: each cell becomes a 2x2 block. A block's corner takes the neighbours' value where the
// two neighbours on that side agree and the opposite pairs differ, which is what smooths a diagonal.
function double(rows) {
	const h = rows.length
	const w = rows[0].length
	const at = (x, y) => (y >= 0 && y < h && x >= 0 && x < w ? rows[y][x] : '.')
	const out = Array.from({ length: h * 2 }, () => new Array(w * 2))
	for (let y = 0; y < h; y++)
		for (let x = 0; x < w; x++) {
			const e = rows[y][x]
			const up = at(x, y - 1)
			const left = at(x - 1, y)
			const right = at(x + 1, y)
			const down = at(x, y + 1)
			const smooth = up !== down && left !== right
			out[y * 2][x * 2] = smooth && left === up ? left : e
			out[y * 2][x * 2 + 1] = smooth && up === right ? right : e
			out[y * 2 + 1][x * 2] = smooth && left === down ? left : e
			out[y * 2 + 1][x * 2 + 1] = smooth && down === right ? right : e
		}
	return out.map(row => row.join(''))
}

// `rows` doubled until each drawn cell is `scale` cells across; `scale` is a power of two.
export function scaleMask(rows, scale) {
	let out = rows
	for (let s = 1; s < scale; s *= 2) out = double(out)
	return out
}

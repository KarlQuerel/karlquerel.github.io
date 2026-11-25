// Bake a sky: a 2:1 equirectangular panorama (or the first image in a .glb, as Sketchfab ships a skybox)
// graded and reduced to PALETTE, one texel to about an art cell at 1440p, no dither, so the pixel pass can
// draw it per cell as it is. Needs ImageMagick (convert), with OpenEXR for an .exr.
// usage: node scripts/sky/bake.mjs <panorama.png|.exr|skybox.glb> [out.png] [nebula|earth]

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { PALETTE } from '../../src/constants/palette.js'

const SIZE = [2048, 1024]
// Each sky's grade: its light scaled by `exposure` (linear), the cyan's saturation by `cyan`, the hues moved
// along `hues` ([from, to] degrees), and the brightest, palest cores warmed by `gold` toward ember's glow.
const GRADES = {
	// the alien world's nebula: green into the cyan, the blue dust toward violet, violet toward magenta, warm
	// stars kept
	nebula: {
		exposure: 1.3,
		cyan: 0.6,
		gold: 0.75,
		hues: [
			[0, 0],
			[60, 55],
			[120, 168],
			[200, 186],
			[212, 228],
			[240, 278],
			[300, 322],
			[360, 360],
		],
	},
	// Earth's own sky (NASA's star map): only lifted, its stars and the Milky Way left their colours
	earth: {
		exposure: 4,
		cyan: 1,
		gold: 0,
		hues: [
			[0, 0],
			[360, 360],
		],
	},
}
const GOLD = PALETTE.ember.map((c, i) => (c + PALETTE.glow[i]) / 2 / 255)

const [src, out = 'public/assets/game/sky/nebula.png', name = 'nebula'] = process.argv.slice(2)
const GRADE = GRADES[name]
if (!src || !GRADE)
	throw new Error(
		'usage: node scripts/sky/bake.mjs <panorama|skybox.glb> [out.png] [nebula|earth]'
	)

// a .glb's first image: its JSON chunk names the buffer view, the binary chunk holds the bytes
function glbImage(file) {
	const glb = readFileSync(file)
	const jsonLength = glb.readUInt32LE(12)
	const gltf = JSON.parse(glb.subarray(20, 20 + jsonLength).toString())
	const view = gltf.bufferViews[gltf.images[0].bufferView]
	const start = 20 + jsonLength + 8 + (view.byteOffset ?? 0)
	return glb.subarray(start, start + view.byteLength)
}

const smooth = (a, b, x) => {
	const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
	return t * t * (3 - 2 * t)
}
function along(table, x) {
	for (let i = 1; i < table.length; i++) {
		const [[x0, y0], [x1, y1]] = [table[i - 1], table[i]]
		if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
	}
	return x
}
const toLinear = Array.from({ length: 256 }, (_, i) =>
	i / 255 <= 0.04045 ? i / 255 / 12.92 : ((i / 255 + 0.055) / 1.055) ** 2.4
)
const toSrgb = c => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055)
function hsv([r, g, b]) {
	const max = Math.max(r, g, b)
	const d = max - Math.min(r, g, b)
	let h = 0
	if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
	return [(h * 60 + 360) % 360, max ? d / max : 0, max]
}
function rgb(h, s, v) {
	const f = n => {
		const k = (n + h / 60) % 6
		return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
	}
	return [f(5), f(3), f(1)]
}

function grade(pixels) {
	const graded = Buffer.alloc(pixels.length)
	for (let o = 0; o < pixels.length; o += 3) {
		const lit = [0, 1, 2].map(i =>
			Math.min(1, toSrgb(toLinear[pixels[o + i]] * GRADE.exposure))
		)
		let [h, s, v] = hsv(lit)
		// the cyan family, fading out 35 degrees either side
		s *= 1 + (GRADE.cyan - 1) * Math.max(0, 1 - Math.abs(h - 185) / 35)
		h = along(GRADE.hues, h)
		const hot = GRADE.gold * smooth(0.65, 1, v) * (1 - s)
		rgb(h, s, v).forEach((c, i) => {
			graded[o + i] = Math.round(Math.min(1, c + (GOLD[i] - c) * hot) * 255)
		})
	}
	return graded
}

const dir = mkdtempSync(join(tmpdir(), 'sky-bake-'))
try {
	const source = src.endsWith('.glb') ? join(dir, 'source') : src
	if (source !== src) writeFileSync(source, glbImage(src))
	const palette = join(dir, 'palette.png')
	const swatches = Object.values(PALETTE).map(([r, g, b]) => `xc:rgb(${r},${g},${b})`)
	execFileSync('convert', ['-size', '1x1', ...swatches, '+append', palette])
	const size = SIZE.join('x')
	const raw = { maxBuffer: SIZE[0] * SIZE[1] * 4 }
	// an .exr is linear light in half floats: brought to 8-bit sRGB like any other source for the grade
	const pixels = execFileSync(
		'convert',
		[source, '-colorspace', 'sRGB', '-resize', `${size}!`, '-depth', '8', 'rgb:-'],
		raw
	)
	execFileSync(
		'convert',
		['-size', size, '-depth', '8', 'rgb:-', '-dither', 'None', '-remap', palette, out],
		{ ...raw, input: grade(pixels) }
	)
	console.warn(`${out}: ${execFileSync('identify', ['-format', '%k', out])} palette colours`)
} finally {
	rmSync(dir, { recursive: true })
}

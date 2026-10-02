import frag from '../../shaders/intro/wake.frag.glsl?raw'
import hands from '../../shaders/intro/hands.glsl?raw'
import { INTRO_CARDS, INTRO_HUD, INTRO_ROLES } from '../../data/gameIntro.js'
import { WAKE } from '../../constants/intro/wake.js'
import { ramp } from '../math.js'

const FROSTED = 255

// The glass: one byte per art cell, 255 frosted, mirrored on the GPU as a luminance texture.
const glass = {
	texture: null,
	data: null,
	width: 0,
	height: 0,
	cleared: 0,
	prev: null,
	alerted: false,
	// a fresh sheet is owed: on entering the shot, once the texture exists
	reset: false,
}

// the item in the right hand, from the role picked at the door (0 = none)
export const itemOf = io => INTRO_ROLES.findIndex(r => r.key === io.role) + 1

function upload(gl, from, to) {
	gl.bindTexture(gl.TEXTURE_2D, glass.texture)
	gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
	gl.texSubImage2D(
		gl.TEXTURE_2D,
		0,
		0,
		from,
		glass.width,
		to - from,
		gl.LUMINANCE,
		gl.UNSIGNED_BYTE,
		glass.data.subarray(from * glass.width, to * glass.width)
	)
}

function frostOver(gl) {
	glass.data?.fill(FROSTED)
	glass.cleared = 0
	glass.prev = null
	glass.alerted = false
	if (glass.data) upload(gl, 0, glass.height)
}

// Whole blocks go, never single cells: the wipe has to read as a glove on glass, not a brush.
function eraseBlock(bx, by) {
	const size = WAKE.block
	const x0 = bx * size
	const y0 = by * size
	if (x0 >= glass.width || y0 >= glass.height || x0 < 0 || y0 < 0) return
	const x1 = Math.min(glass.width, x0 + size)
	const y1 = Math.min(glass.height, y0 + size)
	for (let y = y0; y < y1; y++) {
		const row = y * glass.width
		for (let x = x0; x < x1; x++) {
			if (glass.data[row + x] === FROSTED) glass.cleared++
			glass.data[row + x] = 0
		}
	}
}

// erase a disc of blocks about a cell, returning the rows touched
function dab(cx, cy, radius) {
	const size = WAKE.block
	const r = radius / size
	const bx = cx / size
	const by = cy / size
	for (let y = Math.floor(by - r); y <= Math.ceil(by + r); y++)
		for (let x = Math.floor(bx - r); x <= Math.ceil(bx + r); x++)
			if ((x + 0.5 - bx) ** 2 + (y + 0.5 - by) ** 2 <= r * r) eraseBlock(x, y)
	return [Math.floor(by - r) * size, (Math.ceil(by + r) + 1) * size]
}

// A stroke from the last pointer to this one, dabbed densely enough that a fast drag leaves no gaps.
function wipe(gl, io) {
	if (!glass.data || !io.down) {
		glass.prev = null
		return
	}
	const at = [io.ptr[0] * glass.width, io.ptr[1] * glass.height]
	if (io.still) {
		if (glass.cleared === glass.width * glass.height) return
		glass.data.fill(0)
		glass.cleared = glass.width * glass.height
		upload(gl, 0, glass.height)
		glass.alerted = true
		return
	}
	const from = glass.prev ?? at
	glass.prev = at
	const radius = WAKE.brush * glass.height
	const steps = Math.max(
		1,
		Math.ceil(Math.hypot(at[0] - from[0], at[1] - from[1]) / (radius * 0.5))
	)
	let lo = glass.height
	let hi = 0
	const before = glass.cleared
	for (let i = 0; i <= steps; i++) {
		const k = i / steps
		const [y0, y1] = dab(
			from[0] + (at[0] - from[0]) * k,
			from[1] + (at[1] - from[1]) * k,
			radius
		)
		lo = Math.min(lo, y0)
		hi = Math.max(hi, y1)
	}
	if (glass.cleared === before) return
	upload(gl, Math.max(0, lo), Math.min(glass.height, hi))
	if (glass.cleared / (glass.width * glass.height) >= WAKE.clearedAt) glass.alerted = true
}

export const wake = {
	key: 'wake',
	frag,
	chunks: [hands],
	duration: 0,
	card: { at: WAKE.cardAt, text: INTRO_CARDS.warning },
	setup(gl) {
		glass.texture = gl.createTexture()
		gl.bindTexture(gl.TEXTURE_2D, glass.texture)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
		glass.data = null
	},
	// The glass is the grid, one byte a cell, so a new grid is a new sheet of frost. The perf
	// ladder refits the same grid every few dozen frames, and that must not wipe a stroke.
	resize(gl, grid) {
		if (grid.width === glass.width && grid.height === glass.height && glass.data) return
		const old = glass.data && { data: glass.data, width: glass.width, height: glass.height }
		glass.width = grid.width
		glass.height = grid.height
		glass.data = new Uint8Array(grid.width * grid.height).fill(FROSTED)
		glass.cleared = 0
		glass.prev = null
		// the strokes already made carry over, nearest cell, so a rung change mid-wipe loses nothing
		if (old)
			for (let y = 0; y < grid.height; y++) {
				const oy = Math.floor((y * old.height) / grid.height) * old.width
				for (let x = 0; x < grid.width; x++) {
					const v = old.data[oy + Math.floor((x * old.width) / grid.width)]
					glass.data[y * grid.width + x] = v
					if (v !== FROSTED) glass.cleared++
				}
			}
		gl.bindTexture(gl.TEXTURE_2D, glass.texture)
		gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.LUMINANCE,
			grid.width,
			grid.height,
			0,
			gl.LUMINANCE,
			gl.UNSIGNED_BYTE,
			glass.data
		)
	},
	release(gl) {
		if (glass.texture) gl.deleteTexture(glass.texture)
		glass.texture = null
		glass.data = null
	},
	enter: () => {
		glass.alerted = false
		glass.prev = null
		glass.reset = true
	},
	params(t, io, gl) {
		if (glass.reset && glass.data) {
			frostOver(gl)
			glass.reset = false
		}
		if (t >= WAKE.wipeAt) wipe(gl, io)
		const blink = glass.alerted ? Math.floor(t * WAKE.alertSteps) % 2 : 0
		return {
			p: [ramp(t, 0, WAKE.approachSpan), 1, ramp(t, 0, WAKE.eyelid), blink],
			// the tool stays stowed while the hands are on the glass
			h: [ramp(t, WAKE.wipeAt, WAKE.wipeAt + WAKE.reachSpan), 0, 1, io.down ? 1 : 0],
			mask: glass.texture,
		}
	},
	hud: () => ({}),
	choice: (_clock, marks, choices) =>
		glass.alerted && !choices.responded
			? { key: 'responded', options: [{ key: true, label: INTRO_HUD.respond }] }
			: null,
	ready: (t, io) => io.responded,
}

// the crash reuses the glass texture only so the sampler is never left unbound
export const glassTexture = () => glass.texture

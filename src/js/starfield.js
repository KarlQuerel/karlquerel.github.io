// The backdrop's star planes on one canvas. Every star lands on a whole device pixel, so a dot is never
// split into two dim halves that drop out of sight: it hops a pixel at a time instead.

import { SCROLL_PARALLAX, STAR_COLORS, STAR_SIZE_JITTER } from '../constants/starfield.js'
import { randIn } from './math.js'

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

// One dot drawn once, centred on a pixel centre (odd width) or a pixel corner (even), so its blit is exact.
function dotSprite(sizeCss, color, alpha, dpr) {
	const d = sizeCss * dpr
	const side = Math.max(1, Math.round(d)) + 2
	const sprite = document.createElement('canvas')
	sprite.width = side
	sprite.height = side
	const ctx = sprite.getContext('2d')
	ctx.globalAlpha = alpha
	ctx.fillStyle = color
	ctx.beginPath()
	ctx.arc(side / 2, side / 2, d / 2, 0, Math.PI * 2)
	ctx.fill()
	return { sprite, half: side / 2 }
}

// A plane's stars, rolled once per visit, in tile space (CSS px).
function buildPlane(spec, dpr) {
	const [w, h] = spec.tile
	return {
		spec,
		stars: Array.from({ length: spec.count }, () => ({
			x: randIn([0, w]),
			y: randIn([0, h]),
			...dotSprite(
				spec.size * randIn(STAR_SIZE_JITTER),
				pick(STAR_COLORS),
				randIn(spec.alpha),
				dpr
			),
		})),
	}
}

export function createStarfield(canvas, specs) {
	const ctx = canvas.getContext('2d')
	let dpr = 1
	let vw = 0
	let vh = 0
	let planes = []
	let drawnKey = ''

	function resize() {
		const nextDpr = window.devicePixelRatio || 1
		// sprites are cut for one density; the sky is rolled again only if it changes
		if (nextDpr !== dpr || !planes.length) {
			dpr = nextDpr
			planes = specs.map(spec => buildPlane(spec, dpr))
		}
		// the box, not the window: a classic scrollbar narrows it, and a stretched canvas splits every dot again
		vw = canvas.clientWidth
		vh = canvas.clientHeight
		canvas.width = Math.round(vw * dpr)
		canvas.height = Math.round(vh * dpr)
		drawnKey = ''
	}

	// A plane's two offsets, as the CSS planes composed them: the drift rides inside the zoom, the lean and
	// the scroll parallax outside it. Both snapped to device px, so a plane's stars move in lockstep.
	function offsetsOf({ spec }, { t, lean, scrollY }) {
		const [w, h] = spec.tile
		const phase = (t / spec.duration) % 1
		const snap = v => Math.round(v * dpr) / dpr
		return {
			drift: [snap(spec.dir[0] * w * phase), snap(spec.dir[1] * h * phase)],
			// never wrapped at the tile: out here the zoomed pattern repeats at h * zoom, so a wrap is a jump
			shift: [
				snap(lean.x * spec.depth),
				snap(lean.y * spec.depth - scrollY * SCROLL_PARALLAX * spec.depth),
			],
		}
	}

	// Draws only when some star would land on a different pixel. `warp` zooms each plane about the
	// frame's centre by moving its stars apart, never by scaling a bitmap of them.
	function draw(state) {
		const frame = planes.map(plane => {
			const zoom = (1 + plane.spec.warp) ** state.warp
			return { plane, zoom, ...offsetsOf(plane, state) }
		})
		const key = frame.map(f => `${f.drift},${f.shift},${f.zoom.toFixed(4)}`).join('|')
		if (key === drawnKey) return
		drawnKey = key

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		const cx = vw / 2
		const cy = vh / 2
		for (const { plane, zoom, drift, shift } of frame) {
			const [w, h] = plane.spec.tile
			const [ox, oy] = drift
			// the window test runs in the drift's space, so take the outer shift back off the frame
			const [tx, ty] = shift
			// the pre-zoom window that lands on screen, widened by a dot's reach
			const m = plane.spec.size * 2
			const x0 = cx - (cx + tx + m) / zoom
			const x1 = cx + (vw - cx - tx + m) / zoom
			const y0 = cy - (cy + ty + m) / zoom
			const y1 = cy + (vh - cy - ty + m) / zoom
			for (let j = Math.floor((y0 - oy) / h); j <= Math.floor((y1 - oy) / h); j++) {
				for (let i = Math.floor((x0 - ox) / w); i <= Math.floor((x1 - ox) / w); i++) {
					for (const s of plane.stars) {
						const sx = tx + cx + (s.x + ox + i * w - cx) * zoom
						const sy = ty + cy + (s.y + oy + j * h - cy) * zoom
						ctx.drawImage(
							s.sprite,
							Math.round(sx * dpr - s.half),
							Math.round(sy * dpr - s.half)
						)
					}
				}
			}
		}
	}

	// Seconds between two one-pixel hops of the fastest plane: the idle drift needs no more redraws.
	const hopSeconds = () => Math.min(...specs.map(s => s.duration / (Math.max(...s.tile) * dpr)))

	resize()
	return { draw, resize, hopSeconds }
}

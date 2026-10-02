// The sun shot's three painted states, side by side in one atlas, each a disc sprite with its surface:
// convection cells huge on the giant, fine granulation, sunspots, limb darkening, on one palette ramp
// that the star slides down as it ages. Only the corona and what leaves the limb are drawn live.

import { SUN } from '../../constants/intro/sun.js'
import { PALETTE } from '../../constants/palette.js'
import { ditherIndex, fbm2 } from '../pixelNoise.js'
import { tidySprite } from '../ridge.js'

const RAMP = ['rust', 'ochre', 'brick', 'clay', 'flare', 'amber', 'dune', 'sand', 'glow', 'star']
// two spots riding the surface: longitude, latitude, umbra radius (radians)
const SPOTS = [
	[0.42, -0.28, 0.07],
	[-0.38, 0.33, 0.055],
]

// every state's radius in cells for this grid, capped so a portrait frame holds the giant
export const sunRadii = grid =>
	SUN.states.map(s =>
		Math.floor(Math.min(s.radius, (grid.width / grid.height) * SUN.fitWidth) * grid.height)
	)

function paintDisc(R, age) {
	const S = 2 * R + 4
	const d = new Uint8ClampedArray(S * S * 4)
	const c = S / 2
	const lo = 4.5 * (1 - age)
	const hi = 9 - 3.5 * age
	const cells = 6 - 2.8 * age
	for (let y = 0; y < S; y++)
		for (let x = 0; x < S; x++) {
			const qx = (x + 0.5 - c) / R
			const qy = (y + 0.5 - c) / R
			const q2 = qx * qx + qy * qy
			if (q2 >= 1) continue
			const z = Math.sqrt(1 - q2)
			// onto the sphere, so the pattern crowds toward the limb
			const lon = Math.atan2(qx, z)
			const lat = Math.asin(qy)
			// convection cells: the contour of a slow field draws their dark walls
			const n1 = fbm2(lon * cells, lat * cells, 31)
			const wall = Math.abs(n1 - 0.5) < 0.025 ? 0 : 1
			// granulation in two sizes between thin lanes
			const grains =
				(fbm2(lon * 40, lat * 40, 37) > 0.5 ? 0.6 : 0) +
				(fbm2(lon * 16, lat * 16, 41) > 0.55 ? 0.4 : 0)
			const m = fbm2(lon * 2.4, lat * 2.4, 43)
			let v =
				0.28 +
				(0.08 + 0.24 * age) * wall +
				(0.3 - 0.12 * age) * grains +
				0.2 * m +
				0.06 * (1 - age)
			// limb darkening, stronger as the star cools and puffs out
			v *= 0.55 - 0.15 * age + (0.45 + 0.15 * age) * z ** 0.65
			for (const [sl, sb, sr] of SPOTS) {
				const a = Math.hypot(lon - sl, lat - sb)
				if (a < sr) v *= 0.38
				else if (a < sr * 2.1)
					v *= 0.62 + 0.2 * (fbm2(lon * 60, lat * 60, 47) > 0.5 ? 1 : 0)
			}
			const lit = (lo + Math.max(0, Math.min(1, v)) * (hi - lo)) / 9
			const [r, g, b] = PALETTE[RAMP[ditherIndex(lit, RAMP.length, x, y)]]
			d.set([r, g, b, 255], (y * S + x) * 4)
		}
	tidySprite({ data: d }, S, S, SUN.tidyPasses)
	return { d, S }
}

export function paintSunAtlas(grid) {
	const discs = sunRadii(grid).map((R, i) => paintDisc(R, SUN.states[i].age))
	const width = discs.reduce((w, { S }) => w + S, 0)
	const height = Math.max(...discs.map(({ S }) => S))
	const data = new Uint8ClampedArray(width * height * 4)
	let ox = 0
	for (const { d, S } of discs) {
		for (let y = 0; y < S; y++)
			data.set(d.subarray(y * S * 4, (y + 1) * S * 4), (y * width + ox) * 4)
		ox += S
	}
	return { data, width, height, sizes: discs.map(({ S }) => S) }
}

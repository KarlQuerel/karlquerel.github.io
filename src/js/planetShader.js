// The planet's surface shader, out of PixelPlanet.vue so main thread and worker share one definition.

import { PALETTE } from '../constants/palette.js'
import { PLANET } from '../constants/planet.js'
import { smoothstep } from './math.js'
import { ditherIndex, ditherThreshold } from './pixelNoise.js'

// `res` is the sprite's side in cells, `seed` this visit's world, `palette` an optional PALETTE override.
export function createPlanetShader({ res, seed, palette: override = null }) {
	// The palette, and the ramps resolved out of it once — neither changes live.
	const palette = { ...PALETTE, ...override }
	const RAMPS = PLANET.bands.map(([name]) => PLANET.ramps[name].map(c => palette[c]))
	const CLOUD_RAMP = PLANET.cloudRamp.map(c => palette[c])
	// every ramp is the same length; the light picks an index into it
	const LEVELS = CLOUD_RAMP.length
	const TOP = LEVELS - 1
	// each band's upper elevation edge, as an absolute noise value
	const EDGES = PLANET.bands.map(([, offset]) => PLANET.seaLevel + offset)
	// the atmosphere's layers, resolved the same way
	const SHELL = PLANET.shell.map(([name, alpha]) => [palette[name], alpha])

	const clampByte = v => (v < 0 ? 0 : v > 255 ? 255 : v | 0)
	const mix = (a, b, t) => a + (b - a) * t

	function normalize(v) {
		const m = Math.hypot(v[0], v[1], v[2]) || 1
		return [v[0] / m, v[1] / m, v[2] / m]
	}

	// dependency-free 3D value noise, seeded per visit so no two planets are alike
	function hash3(ix, iy, iz) {
		let n = Math.imul(ix, 374761393)
		n = (n + Math.imul(iy, 668265263)) | 0
		n = (n + Math.imul(iz, 1274126177)) | 0
		n = (n + Math.imul(seed, 951274213)) | 0
		n ^= n >>> 13
		n = Math.imul(n, 1274126177)
		n ^= n >>> 16
		return (n >>> 0) / 4294967295
	}

	function noise3(x, y, z) {
		const ix = Math.floor(x)
		const iy = Math.floor(y)
		const iz = Math.floor(z)
		const u = smoothstep(x - ix)
		const v = smoothstep(y - iy)
		const w = smoothstep(z - iz)
		const x00 = mix(hash3(ix, iy, iz), hash3(ix + 1, iy, iz), u)
		const x10 = mix(hash3(ix, iy + 1, iz), hash3(ix + 1, iy + 1, iz), u)
		const x01 = mix(hash3(ix, iy, iz + 1), hash3(ix + 1, iy, iz + 1), u)
		const x11 = mix(hash3(ix, iy + 1, iz + 1), hash3(ix + 1, iy + 1, iz + 1), u)
		return mix(mix(x00, x10, v), mix(x01, x11, v), w)
	}

	function fbm(x, y, z, octaves = 4) {
		let sum = 0
		let amp = 0.5
		let freq = 1
		for (let o = 0; o < octaves; o++) {
			sum += amp * noise3(x * freq + o * 19, y * freq, z * freq)
			freq *= 2
			amp *= 0.5
		}
		return sum
	}

	// Fractal elevation over the sphere — the bands and the sea-glint mask read it.
	function elevation(px, py, pz) {
		const s = PLANET.noiseScale
		let n = fbm(px * s, py * s, pz * s)
		for (const b of basins) {
			const dot = px * b.x + py * b.y + pz * b.z
			if (dot > b.cos) n -= PLANET.basins.depth * smoothstep((dot - b.cos) / (1 - b.cos))
		}
		return n
	}

	// rolled from the same seed as the terrain, once per visit
	function rollBasins() {
		const bs = PLANET.basins
		return Array.from({ length: bs.count }, (_, b) => {
			const lon = hash3(101 + b, 7, 13) * Math.PI * 2
			const y = (hash3(3, 51 + b, 11) - 0.5) * 2 * bs.latMax
			const r = Math.sqrt(Math.max(0, 1 - y * y))
			return {
				x: r * Math.sin(lon),
				y,
				z: r * Math.cos(lon),
				cos: Math.cos(bs.radMin + (bs.radMax - bs.radMin) * hash3(9, 29, 71 + b)),
			}
		})
	}

	// Which band an elevation falls in. Edges are dithered, not cross-faded: a blend is a colour we lack.
	function bandAt(n, thr) {
		const bw = PLANET.bandBlend
		for (let i = 0; i < EDGES.length - 1; i++) {
			const edge = EDGES[i]
			if (n < edge - bw) return i
			if (n < edge + bw) return (n - edge + bw) / (2 * bw) > thr ? i + 1 : i
		}
		return EDGES.length - 1
	}

	const radius = res * PLANET.discRadius
	const center = res / 2
	const light = normalize(PLANET.light)
	const tilt = (PLANET.tiltDeg * Math.PI) / 180
	const cosT = Math.cos(tilt)
	const sinT = Math.sin(tilt)
	const haloReach = 1 + PLANET.haloWidth
	// the disc the sweep is bounded to: the halo's outer edge, in cells
	const reach2 = haloReach * haloReach
	const row0 = Math.max(0, Math.ceil(center - haloReach * radius - 0.5))
	const row1 = Math.min(res - 1, Math.floor(center + haloReach * radius - 0.5))

	// this visit's impact basins, fixed in planet space so they turn with the ground
	const basins = rollBasins()

	function draw(d, spin, lightYaw, cloudThin) {
		const cosS = Math.cos(spin)
		const sinS = Math.sin(spin)
		// the cloud shell drifts ahead of the ground, so weather crosses coastlines
		const cl = PLANET.clouds
		const cosC = Math.cos(spin * cl.spinFactor)
		const sinC = Math.sin(spin * cl.spinFactor)
		// the key light swung around the vertical axis — the orbiting terminator
		const cosL = Math.cos(lightYaw)
		const sinL = Math.sin(lightYaw)
		const lx = light[0] * cosL + light[2] * sinL
		const lz = -light[0] * sinL + light[2] * cosL
		// Blinn half-vector of the yawed key light and the viewer — the sea glint
		let hvx = lx
		let hvy = light[1]
		let hvz = lz + 1
		const hm = Math.hypot(hvx, hvy, hvz) || 1
		hvx /= hm
		hvy /= hm
		hvz /= hm
		// the yawed light in the tilted frame the cloud shell samples in
		const so = cl.shadowOffset
		const ltx = lx
		const lty = light[1] * cosT - lz * sinT
		const ltz = light[1] * sinT + lz * cosT
		// how thin the deck is — scales cover, so thinning opens it into scattered dither rather than fading
		const thin = cloudThin
		// this visit's storm centre: a unit vector in cloud space, so it rides the shell.
		const st = PLANET.storm
		const lonS = st.faceLon + (hash3(11, 23, 5) - 0.5) * st.lonJitter
		const latS = st.latMin + (st.latMax - st.latMin) * hash3(17, 3, 29)
		const sty = hash3(7, 13, 19) < 0.5 ? -latS : latS
		// sin/cos order matches the view transform, so a storm at lonS faces the camera at that cloud angle
		const rS = Math.sqrt(1 - sty * sty)
		const stx = rS * Math.sin(lonS)
		const stz = rS * Math.cos(lonS)
		const stormCos = Math.cos(st.radius)
		// Tangent basis at the storm centre for the rainbands' angle (latMax keeps it off the poles).
		const u1m = Math.hypot(stx, stz) || 1
		const u1x = -stz / u1m
		const u1z = stx / u1m
		const u2x = sty * u1z
		const u2y = stz * u1x - stx * u1z
		const u2z = -sty * u1x
		const bandPhase = hash3(29, 41, 3) * Math.PI * 2

		// Cloud cover at a cloud-space point: the deck overhead and the shadow it casts read this one field.
		let stormT = 0
		let stormN = 0
		function cloudCoverAt(cx, cy, cz) {
			stormT = 0
			stormN = 0
			if (thin >= 1) return 0
			let wx = cx
			let wy = cy
			let wz = cz
			let bump = 0
			const dot = cx * stx + cy * sty + cz * stz
			if (dot > stormCos) {
				const t = (dot - stormCos) / (1 - stormCos)
				stormT = t
				const t2 = t * t
				const a = st.swirl * t2
				const ca = Math.cos(a)
				const sa = Math.sin(a)
				const k = dot * (1 - ca)
				wx = cx * ca + (sty * cz - stz * cy) * sa + stx * k
				wy = cy * ca + (stz * cx - stx * cz) * sa + sty * k
				wz = cz * ca + (stx * cy - sty * cx) * sa + stz * k
				// Rainbands: the boost is cut into spiral arms, since a flat radial boost reads as a pasted white circle.
				const px = cx - stx * dot
				const py = cy - sty * dot
				const pz = cz - stz * dot
				const phi = Math.atan2(px * u2x + py * u2y + pz * u2z, px * u1x + pz * u1z)
				const band =
					st.bandMin +
					(1 - st.bandMin) *
						(0.5 + 0.5 * Math.sin(st.arms * phi + st.armTwist * (1 - t) + bandPhase))
				const t8 = t2 * t2 * t2 * t2
				bump = st.boost * t2 * band - st.eyeDrop * t8 * t8
			}
			const cn = fbm(wx * cl.scale + 41, wy * cl.scale, wz * cl.scale, cl.octaves) + bump
			if (stormT > 0) stormN = cn
			if (cn <= cl.cover - cl.blend) return 0
			// The wall solidifies where the storm is dense — at fixed opacity the interior reads as wallpaper.
			const op =
				bump > 0
					? cl.opacity + (1 - cl.opacity) * Math.min(1, bump * st.solidify)
					: cl.opacity
			const cover =
				cn >= cl.cover + cl.blend
					? op
					: smoothstep((cn - cl.cover + cl.blend) / (2 * cl.blend)) * op
			return cover * (1 - thin)
		}

		// The sweep is bounded to the halo's disc rather than to the sprite's square.
		for (let y = row0; y <= row1; y++) {
			const dy = (y + 0.5 - center) / radius
			const span = radius * Math.sqrt(Math.max(0, reach2 - dy * dy))
			const x1 = Math.min(res - 1, Math.floor(center + span - 0.5))
			const row = y * res
			for (let x = Math.max(0, Math.ceil(center - span - 0.5)); x <= x1; x++) {
				const i = (row + x) * 4
				const dx = (x + 0.5 - center) / radius
				const d2 = dx * dx + dy * dy

				// Outside the disc: the atmosphere in stepped layers, lit as the ground is.
				if (d2 > 1) {
					const dist = Math.sqrt(d2)
					if (dist < haloReach) {
						const up = (dist - 1) / PLANET.haloWidth
						// floored, not dithered — see PLANET.shell
						const at = (up * SHELL.length) | 0
						const [col, alpha] = SHELL[at > SHELL.length - 1 ? SHELL.length - 1 : at]
						// The shell's normal is its direction from centre; its zero crossing sits shellTwilight past the terminator.
						const inv = 1 / dist
						const tw = PLANET.shellTwilight
						const nl = Math.max(
							0,
							(dx * inv * lx + dy * inv * light[1] + tw) / (1 + tw)
						)
						const night = PLANET.shellNight
						d[i] = col[0]
						d[i + 1] = col[1]
						d[i + 2] = col[2]
						d[i + 3] = clampByte(alpha * (night + (1 - night) * nl))
					}
					continue
				}

				const dz = Math.sqrt(1 - d2)
				// The key light picks a step on a ramp rather than scaling a colour, so the terminator is a hard edge.
				const diff = Math.max(0, dx * lx + dy * light[1] + dz * lz)

				// rotate the normal into planet space so the surface turns under static lighting
				const ny = dy * cosT - dz * sinT
				const nz = dy * sinT + dz * cosT
				const sx = dx * cosS + nz * sinS
				const sz = -dx * sinS + nz * cosS
				const n = elevation(sx, ny, sz)

				// One dither slot for this pixel, shared by every decision below.
				const thr = ditherThreshold(x, y)

				// The cloud shell picks the ramp, not a colour to blend toward: cover short of 1 thins by dither.
				const cover = cloudCoverAt(dx * cosC + nz * sinC, ny, -dx * sinC + nz * cosC)
				const onCloud = cover > thr
				// this pixel's storm falloff and noise, saved before the shadow sample clobbers them
				const inStorm = stormT
				const stormTex = stormN
				// Elevation alone decides the ground; no latitude overrides it.
				const ramp = onCloud ? CLOUD_RAMP : RAMPS[bandAt(n, thr)]

				// Relief modulates the catch before the step, so bands follow the terrain instead of ringing the globe.
				const relief = 1 + (n - PLANET.seaLevel) * PLANET.relief
				// The limb glow promotes the step rather than adding light: additive lands between palette entries.
				let step =
					ditherIndex(diff * relief, LEVELS, x, y) +
					ditherIndex(d2 * d2 * diff, PLANET.rimLevels, x, y)

				// The wall is promoted toward the ramp's white top by its own falloff, scaled by daylight and the warped noise.
				if (onCloud && inStorm > 0) {
					const tex = Math.min(1, Math.max(0, (stormTex - cl.cover) * st.texGain))
					step += ditherIndex(inStorm * diff * tex, st.whitenLevels, x, y)
				}

				// A deck between ground and sun demotes the step: the displaced shadow proves the clouds float.
				let shaded = false
				if (!onCloud && diff > 0) {
					const ox = dx + ltx * so
					const oy = ny + lty * so
					const oz = nz + ltz * so
					shaded = cloudCoverAt(ox * cosC + oz * sinC, oy, -ox * sinC + oz * cosC) > thr
					if (shaded) step = Math.max(0, step - cl.shadowDrop)
				}

				// open water mirroring the sun goes to the top of its ramp — unless it sits in a cloud's shadow
				if (!onCloud && !shaded && n < PLANET.seaLevel) {
					const sd = Math.max(0, dx * hvx + dy * hvy + dz * hvz)
					const s2 = sd * sd
					const s4 = s2 * s2
					const s8 = s4 * s4
					if (s8 * s8 * PLANET.oceanGloss > thr) step = TOP
				}

				const col = ramp[step > TOP ? TOP : step]
				d[i] = col[0]
				d[i + 1] = col[1]
				d[i + 2] = col[2]
				d[i + 3] = 255
			}
		}
	}

	return { res, draw }
}

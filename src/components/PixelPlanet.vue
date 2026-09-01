<template>
	<!-- procedural low-res planet, upscaled pixelated; reveal (0 → 1) grows it in. Decorative -->
	<canvas ref="canvasEl" class="planet" :style="planetStyle" aria-hidden="true" />
</template>

<script setup>
	import {
		ref,
		computed,
		watch,
		onActivated,
		onDeactivated,
		onMounted,
		onBeforeUnmount,
	} from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { smoothstep } from '@/js/math'
	import { ditherIndex, ditherThreshold } from '@/js/pixelNoise'
	import { PALETTE } from '@/constants/palette'
	import { PLANET } from '@/constants/planet'
	import { MOBILE_VIEWPORT_QUERY } from '@/constants/viewport'

	const props = defineProps({
		// 0 → far-off dot, 1 → arrived and full size. Drives scale and opacity.
		reveal: { type: Number, default: 0 },
		// Longitude in radians. null → the planet free-spins on the clock over
		// PLANET.spinSeconds. A number → the caller owns the angle (a scroll-driven
		// orbit), and each change schedules a redraw instead of an idle loop running.
		spin: { type: Number, default: null },
		// Sun yaw in radians around the view's vertical axis. 0 keeps the fixed
		// upper-left key light; the landing journey sweeps it so the terminator
		// advances while you orbit.
		lightYaw: { type: Number, default: 0 },
		// 0 → full cloud deck, 1 → clear skies. The journey raises it as the camera
		// dives: at landing magnification the deck stops reading as weather above
		// the ground and starts reading as a checker layer stacked on the mountains.
		cloudThin: { type: Number, default: 0 },
		// Optional override of named PALETTE entries — e.g. EARTH_PALETTE, which walks
		// the same ramps through a different set of colours. Fixed at mount.
		palette: { type: Object, default: null },
	})

	// The palette, and the ramps resolved out of it once — neither changes live. Every
	// pixel the shader writes is one of these entries exactly: it picks a step, never
	// a blend, which is what keeps the rendered planet on a countable palette.
	const palette = { ...PALETTE, ...props.palette }
	const RAMPS = PLANET.bands.map(([name]) => PLANET.ramps[name].map(c => palette[c]))
	const CLOUD_RAMP = PLANET.cloudRamp.map(c => palette[c])
	const POLAR_RAMP = PLANET.polar.ramp.map(c => palette[c])
	// every ramp is the same length; the light picks an index into it
	const LEVELS = CLOUD_RAMP.length
	const TOP = LEVELS - 1
	// each band's upper elevation edge, as an absolute noise value
	const EDGES = PLANET.bands.map(([, offset]) => PLANET.seaLevel + offset)
	// the atmosphere's layers, resolved the same way
	const SHELL = PLANET.shell.map(([name, alpha]) => [palette[name], alpha])

	// grow from a vanishing-point dot to full size, settling slightly lower as it "lands"
	const planetStyle = computed(() => ({
		opacity: Math.min(1, props.reveal * 4),
		transform: `translate(-50%, calc(-50% + ${props.reveal * 6}vh)) scale(${0.05 + 0.95 * props.reveal})`,
		// hidden until arrival — drop the promoted canvas out of the compositor during the crawl
		display: props.reveal > 0 ? null : 'none',
	}))

	const clampByte = v => (v < 0 ? 0 : v > 255 ? 255 : v | 0)
	const mix = (a, b, t) => a + (b - a) * t

	function normalize(v) {
		const m = Math.hypot(v[0], v[1], v[2]) || 1
		return [v[0] / m, v[1] / m, v[2] / m]
	}

	// dependency-free 3D value noise, seeded per visit so no two planets are alike
	let seed = 1
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

	// this visit's impact basins, fixed in planet space so they turn with the ground
	let basins = []

	// Fractal elevation over the sphere — the bands and the sea-glint mask read it.
	// The basins press smooth circular dents into it: where a floor drops below sea
	// level the dent floods, and the world gains a round sea.
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
		basins = Array.from({ length: bs.count }, (_, b) => {
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

	// Which band an elevation falls in. Across an edge the two bands are dithered
	// against the pixel's own slot rather than cross-faded: a faded colour is one the
	// palette does not contain, and a dithered coastline still stops the edge snapping
	// as the globe turns, which is what the fade was there for.
	function bandAt(n, thr) {
		const bw = PLANET.bandBlend
		for (let i = 0; i < EDGES.length - 1; i++) {
			const edge = EDGES[i]
			if (n < edge - bw) return i
			if (n < edge + bw) return (n - edge + bw) / (2 * bw) > thr ? i + 1 : i
		}
		return EDGES.length - 1
	}

	const canvasEl = ref(null)
	let ctx = null
	let rafId = 0
	let drawId = 0
	let lastDraw = -1
	// the footprint never moves, so pixels are overwritten in place — no ~65KB realloc per frame
	let imageData = null
	const isMobile = window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
	// phones draw a smaller sprite — the per-pixel shader cost is resolution²
	const res = isMobile ? PLANET.resolutionMobile : PLANET.resolution
	const radius = res * PLANET.discRadius
	const center = res / 2
	const light = normalize(PLANET.light)
	const tilt = (PLANET.tiltDeg * Math.PI) / 180
	const cosT = Math.cos(tilt)
	const sinT = Math.sin(tilt)
	const frameMs = 1000 / (isMobile ? PLANET.fpsMobile : PLANET.fps)
	const orbitFrameMs = 1000 / (isMobile ? PLANET.orbitFpsMobile : PLANET.orbitFps)
	const haloReach = 1 + PLANET.haloWidth

	function draw(spin) {
		if (!imageData) imageData = ctx.createImageData(res, res)
		const img = imageData
		const d = img.data
		const cosS = Math.cos(spin)
		const sinS = Math.sin(spin)
		// the cloud shell drifts ahead of the ground, so weather crosses coastlines
		const cl = PLANET.clouds
		const cosC = Math.cos(spin * cl.spinFactor)
		const sinC = Math.sin(spin * cl.spinFactor)
		// the key light swung around the vertical axis — the orbiting terminator
		const cosL = Math.cos(props.lightYaw)
		const sinL = Math.sin(props.lightYaw)
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
		// the yawed light in the tilted frame the cloud shell samples in — the
		// direction a ground pixel looks along to find the cloud shading it
		const so = cl.shadowOffset
		const ltx = lx
		const lty = light[1] * cosT - lz * sinT
		const ltz = light[1] * sinT + lz * cosT
		// how thin the deck is right now — scales the cover, so thinning opens the
		// deck into scattered dither rather than fading it
		const thin = props.cloudThin
		// this visit's storm centre: a unit vector in cloud space, so it rides the
		// shell. Longitude is seeded around faceLon rather than the whole circle, so
		// the storm faces the camera while the stations are read.
		const st = PLANET.storm
		const lonS = st.faceLon + (hash3(11, 23, 5) - 0.5) * st.lonJitter
		const latS = st.latMin + (st.latMax - st.latMin) * hash3(17, 3, 29)
		const sty = hash3(7, 13, 19) < 0.5 ? -latS : latS
		// sin/cos order matches the view transform: the camera-facing point in cloud
		// space is (sin C, ·, cos C), so a storm at lonS faces the camera when the
		// cloud angle (spin × spinFactor) equals lonS — which is what faceLon states.
		const rS = Math.sqrt(1 - sty * sty)
		const stx = rS * Math.sin(lonS)
		const stz = rS * Math.cos(lonS)
		const stormCos = Math.cos(st.radius)
		// Tangent basis at the storm centre, for the rainbands' angle around its
		// axis (the centre never sits at a pole, latMax keeps it off).
		const u1m = Math.hypot(stx, stz) || 1
		const u1x = -stz / u1m
		const u1z = stx / u1m
		const u2x = sty * u1z
		const u2y = stz * u1x - stx * u1z
		const u2z = -sty * u1x
		const bandPhase = hash3(29, 41, 3) * Math.PI * 2

		// Cloud cover at a cloud-space point (0..opacity) — the deck overhead and the
		// shadow it casts both read this one field. The storm warps the domain first:
		// inside its cap the sample rotates around the storm axis (Rodrigues), hardest
		// at the centre, so the fbm streaks bend into a spiral; the wall fills and the
		// eye clears on the same falloff. `stormT` (the falloff, 0 outside the cap)
		// and `stormN` (the warped noise there) are left holding the last sample's
		// values so the shading step can texture the wall — read them before the
		// shadow sample overwrites them.
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
				// Rainbands: the boost is cut by angle into spiral arms that wind
				// outward, instead of filling the cap — a flat radial boost thresholds
				// along its own circular contour and reads as a pasted white circle.
				// φ is the sample's angle around the storm axis (unwarped, so the
				// bands hold still while the fbm shreds under them); the phase runs
				// with (1 − t) so each arm trails away from the eye.
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
			// The wall solidifies where the storm is dense: a hurricane wall is not
			// 72% cloud with ground dithering through — at fixed opacity the whole
			// interior becomes one uniform checker and reads as wallpaper. Ambient
			// decks keep cl.opacity; the texture inside the solid wall comes from
			// the shading step reading stormN.
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

		for (let y = 0; y < res; y++) {
			for (let x = 0; x < res; x++) {
				const i = (y * res + x) * 4
				const dx = (x + 0.5 - center) / radius
				const dy = (y + 0.5 - center) / radius
				const d2 = dx * dx + dy * dy

				// Outside the disc: the atmosphere, in stepped layers rather than one
				// falloff, and lit the way the ground is — a bright crescent on the sun
				// side thinning to a bare edge on the night limb. Layers with a
				// measurable thickness are what give the globe a radius; a smooth glow
				// only ever gives it a light.
				if (d2 > 1) {
					const dist = Math.sqrt(d2)
					if (dist < haloReach) {
						const up = (dist - 1) / PLANET.haloWidth
						// floored, not dithered — see PLANET.shell
						const at = (up * SHELL.length) | 0
						const [col, alpha] = SHELL[at > SHELL.length - 1 ? SHELL.length - 1 : at]
						// The shell's own normal is its direction from the centre. Its zero
						// crossing sits shellTwilight past the terminator, so the dusk arc
						// hangs past the day/night line instead of dying where the ground does.
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
				// The key light against the view-space normal. It picks a step on a ramp
				// rather than scaling a colour, so the terminator lands as a hard pixel
				// edge and the sun's yaw across the trip stays legible.
				const diff = Math.max(0, dx * lx + dy * light[1] + dz * lz)

				// rotate the normal into planet space so the surface turns under static lighting
				const ny = dy * cosT - dz * sinT
				const nz = dy * sinT + dz * cosT
				const sx = dx * cosS + nz * sinS
				const sz = -dx * sinS + nz * cosS
				const n = elevation(sx, ny, sz)

				// One dither slot for this pixel, shared by every decision below — which
				// ramp we are on, and how far up it. Two grids would beat against each
				// other and the surface would crawl.
				const thr = ditherThreshold(x, y)

				// The cloud shell picks the ramp rather than a colour to blend toward.
				// Coverage short of 1 thins the deck by letting ground through in a
				// dither, which is how a deck stays a deck once it is magnified.
				const cover = cloudCoverAt(dx * cosC + nz * sinC, ny, -dx * sinC + nz * cosC)
				const onCloud = cover > thr
				// this pixel's storm falloff and noise, saved before the shadow sample
				// clobbers them
				const inStorm = stormT
				const stormTex = stormN
				// Past the frost latitude the ground is ice whatever the elevation
				// says — sea freezes and land snows over alike. ny is the planet-space
				// latitude (the spin turns about this axis), and the edge dithers.
				let ramp = CLOUD_RAMP
				if (!onCloud) {
					const frost = (Math.abs(ny) - PLANET.polar.lat) / (2 * PLANET.polar.blend) + 0.5
					ramp = frost > thr ? POLAR_RAMP : RAMPS[bandAt(n, thr)]
				}

				// Relief modulates the catch before the step, so the band boundaries
				// follow the terrain instead of ringing the globe in even circles.
				const relief = 1 + (n - PLANET.seaLevel) * PLANET.relief
				// The limb glow promotes the step instead of adding light on top: an
				// additive term lands between palette entries, and since every ramp
				// warms as it climbs, a promotion at the limb is the warm rim it wants.
				let step =
					ditherIndex(diff * relief, LEVELS, x, y) +
					ditherIndex(d2 * d2 * diff, PLANET.rimLevels, x, y)

				// The storm wall is promoted toward the ramp's white top by its own
				// falloff — scaled by daylight so the cyclone's night side stays night,
				// and by the warped noise, which the domain warp has already bent into
				// spirals: a flat promotion paints the whole wall the same white, where
				// this one draws the striations inside it.
				if (onCloud && inStorm > 0) {
					const tex = Math.min(1, Math.max(0, (stormTex - cl.cover) * st.texGain))
					step += ditherIndex(inStorm * diff * tex, st.whitenLevels, x, y)
				}

				// A deck between this ground and the sun demotes the step: the displaced
				// shadow is what proves the clouds float above the surface rather than
				// being painted on it. Same field (storm included), same threshold — and
				// day side only, since night has no sun to block.
				let shaded = false
				if (!onCloud && diff > 0) {
					const ox = dx + ltx * so
					const oy = ny + lty * so
					const oz = nz + ltz * so
					shaded = cloudCoverAt(ox * cosC + oz * sinC, oy, -ox * sinC + oz * cosC) > thr
					if (shaded) step = Math.max(0, step - cl.shadowDrop)
				}

				// open water mirroring the sun goes to the top of its ramp — unless it
				// sits in a cloud's shadow, exactly where a glint cannot be
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
		ctx.putImageData(img, 0, 0)
	}

	function loop(ts) {
		if (props.reveal <= 0) {
			rafId = 0
			return
		}
		if (lastDraw < 0 || ts - lastDraw >= frameMs) {
			lastDraw = ts
			draw((ts / 1000 / PLANET.spinSeconds) * Math.PI * 2)
		}
		rafId = requestAnimationFrame(loop)
	}

	// Driven mode: at most one redraw per frame, and always trailing to the latest
	// angle, so a flung scroll still lands the orbit where it stopped.
	function scheduleDraw() {
		if (drawId || !ctx || props.reveal <= 0 || prefersReducedMotion()) return
		drawId = requestAnimationFrame(ts => {
			drawId = 0
			if (lastDraw >= 0 && ts - lastDraw < orbitFrameMs) {
				scheduleDraw() // too soon — retry next frame, still on the latest angle
				return
			}
			lastDraw = ts
			draw(props.spin)
		})
	}

	// free-spinning planets run the idle loop; driven ones redraw off the spin watcher
	function resume() {
		if (props.spin !== null) {
			scheduleDraw()
			return
		}
		if (!rafId && props.reveal > 0 && ctx && !prefersReducedMotion()) {
			rafId = requestAnimationFrame(loop)
		}
	}

	function stopLoop() {
		if (rafId) cancelAnimationFrame(rafId)
		if (drawId) cancelAnimationFrame(drawId)
		rafId = 0
		drawId = 0
	}

	watch(() => props.spin, scheduleDraw)
	watch(() => props.lightYaw, scheduleDraw)
	watch(() => props.cloudThin, scheduleDraw)
	watch(() => props.reveal, resume)

	onMounted(() => {
		const el = canvasEl.value
		el.width = res
		el.height = res
		ctx = el.getContext('2d')
		seed = Math.floor(Math.random() * 1e5) + 1
		rollBasins()
		draw(props.spin ?? 0) // initial static frame so it's ready the instant it reveals
		resume()
	})

	// kept alive under HomeJourney: onBeforeUnmount never fires on navigation, so the
	// shader loop would keep burning the main thread behind every other page
	onDeactivated(stopLoop)
	onActivated(resume)

	onBeforeUnmount(stopLoop)
</script>

<style scoped lang="scss">
	.planet {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 2;
		width: min(84vmin, 94vw);
		height: min(84vmin, 94vw);
		transform-origin: center;
		pointer-events: none;
		// Keep the upscaled sprite blocky rather than smoothly interpolated.
		image-rendering: pixelated;
		will-change: transform, opacity;
	}
</style>

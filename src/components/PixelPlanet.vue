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

	// fractal elevation over the sphere — the bands and the sea-glint mask read it
	function elevation(px, py, pz) {
		const s = PLANET.noiseScale
		return fbm(px * s, py * s, pz * s)
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
						// the shell's own normal is its direction from the centre
						const inv = 1 / dist
						const nl = Math.max(0, dx * inv * lx + dy * inv * light[1])
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
				const cn = fbm(
					(dx * cosC + nz * sinC) * cl.scale + 41,
					ny * cl.scale,
					(-dx * sinC + nz * cosC) * cl.scale,
					cl.octaves
				)
				let cover = 0
				if (cn > cl.cover - cl.blend) {
					cover =
						cn >= cl.cover + cl.blend
							? cl.opacity
							: smoothstep((cn - cl.cover + cl.blend) / (2 * cl.blend)) * cl.opacity
				}
				const onCloud = cover > thr
				const ramp = onCloud ? CLOUD_RAMP : RAMPS[bandAt(n, thr)]

				// Relief modulates the catch before the step, so the band boundaries
				// follow the terrain instead of ringing the globe in even circles.
				const relief = 1 + (n - PLANET.seaLevel) * PLANET.relief
				// The limb glow promotes the step instead of adding light on top: an
				// additive term lands between palette entries, and since every ramp
				// warms as it climbs, a promotion at the limb is the warm rim it wants.
				let step =
					ditherIndex(diff * relief, LEVELS, x, y) +
					ditherIndex(d2 * d2 * diff, PLANET.rimLevels, x, y)

				// open water mirroring the sun goes to the top of its ramp
				if (!onCloud && n < PLANET.seaLevel) {
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
	watch(() => props.reveal, resume)

	onMounted(() => {
		const el = canvasEl.value
		el.width = res
		el.height = res
		ctx = el.getContext('2d')
		seed = Math.floor(Math.random() * 1e5) + 1
		draw(props.spin ?? 0) // initial static frame so it's ready the instant it reveals
		resume()
	})

	// kept alive under HeroIntro: onBeforeUnmount never fires on navigation, so the
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

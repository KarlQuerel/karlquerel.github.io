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
	import { PLANET } from '@/constants/planet'
	import { MOBILE_VIEWPORT_QUERY } from '@/constants/viewport'

	const props = defineProps({
		// 0 → far-off dot, 1 → arrived and full size. Drives scale and opacity.
		reveal: { type: Number, default: 0 },
		// Optional band-colour override ({ ocean, oceanShallow, land, highland,
		// atmosphere }) — e.g. EARTH_PALETTE. Fixed at mount.
		palette: { type: Object, default: null },
	})

	// surface + halo colours resolved once, since the palette never changes live
	const colors = {
		ocean: PLANET.ocean,
		oceanShallow: PLANET.oceanShallow,
		land: PLANET.land,
		highland: PLANET.highland,
		atmosphere: PLANET.atmosphere,
		...props.palette,
	}

	// grow from a vanishing-point dot to full size, settling slightly lower as it "lands"
	const planetStyle = computed(() => ({
		opacity: Math.min(1, props.reveal * 4),
		transform: `translate(-50%, calc(-50% + ${props.reveal * 6}vh)) scale(${0.05 + 0.95 * props.reveal})`,
		// hidden until arrival — drop the promoted canvas out of the compositor during the crawl
		display: props.reveal > 0 ? null : 'none',
	}))

	const clampByte = v => (v < 0 ? 0 : v > 255 ? 255 : v | 0)
	const smoothstep = t => t * t * (3 - 2 * t)
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

	function fbm(x, y, z) {
		let sum = 0
		let amp = 0.5
		let freq = 1
		for (let o = 0; o < 4; o++) {
			sum += amp * noise3(x * freq + o * 19, y * freq, z * freq)
			freq *= 2
			amp *= 0.5
		}
		return sum
	}

	// Colour bands keyed by their upper noise edge, low → high elevation.
	const bands = [
		[colors.ocean, PLANET.seaLevel - 0.08],
		[colors.oceanShallow, PLANET.seaLevel],
		[colors.land, PLANET.seaLevel + 0.12],
		[colors.highland, Infinity],
	]

	// map a point to a surface colour, cross-fading band edges so coastlines don't shimmer
	function surface(px, py, pz) {
		const s = PLANET.noiseScale
		const n = fbm(px * s, py * s, pz * s)
		const bw = PLANET.bandBlend
		for (let i = 0; i < bands.length - 1; i++) {
			const edge = bands[i][1]
			if (n < edge - bw) return bands[i][0]
			if (n < edge + bw) {
				const t = smoothstep((n - edge + bw) / (2 * bw))
				const [a, b] = [bands[i][0], bands[i + 1][0]]
				return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]
			}
		}
		return bands[bands.length - 1][0]
	}

	const canvasEl = ref(null)
	let ctx = null
	let rafId = 0
	let lastDraw = -1
	// the footprint never moves, so pixels are overwritten in place — no ~65KB realloc per frame
	let imageData = null
	const res = PLANET.resolution
	const radius = res * PLANET.discRadius
	const center = res / 2
	const light = normalize(PLANET.light)
	const tilt = (PLANET.tiltDeg * Math.PI) / 180
	const cosT = Math.cos(tilt)
	const sinT = Math.sin(tilt)
	const frameMs =
		1000 / (window.matchMedia(MOBILE_VIEWPORT_QUERY).matches ? PLANET.fpsMobile : PLANET.fps)
	const haloReach = 1 + PLANET.haloWidth

	function draw(spin) {
		if (!imageData) imageData = ctx.createImageData(res, res)
		const img = imageData
		const d = img.data
		const cosS = Math.cos(spin)
		const sinS = Math.sin(spin)
		const [ar, ag, ab] = colors.atmosphere

		for (let y = 0; y < res; y++) {
			for (let x = 0; x < res; x++) {
				const i = (y * res + x) * 4
				const dx = (x + 0.5 - center) / radius
				const dy = (y + 0.5 - center) / radius
				const d2 = dx * dx + dy * dy

				// Outside the disc: a thin atmosphere halo fading into space.
				if (d2 > 1) {
					const dist = Math.sqrt(d2)
					if (dist < haloReach) {
						const t = 1 - (dist - 1) / PLANET.haloWidth
						d[i] = ar
						d[i + 1] = ag
						d[i + 2] = ab
						d[i + 3] = clampByte(t * t * PLANET.haloAlpha)
					}
					continue
				}

				const dz = Math.sqrt(1 - d2)
				// Lighting uses the fixed view-space normal (terminator stays put).
				const diff = Math.max(0, dx * light[0] + dy * light[1] + dz * light[2])
				const shade = PLANET.ambient + (1 - PLANET.ambient) * diff

				// rotate the normal into planet space so the surface turns under static lighting
				const ny = dy * cosT - dz * sinT
				const nz = dy * sinT + dz * cosT
				const sx = dx * cosS + nz * sinS
				const sz = -dx * sinS + nz * cosS
				const col = surface(sx, ny, sz)

				// Brighten the lit limb for an atmospheric rim glow.
				const rim = d2 * d2 * diff * PLANET.rimStrength
				d[i] = clampByte(col[0] * shade + ar * rim)
				d[i + 1] = clampByte(col[1] * shade + ag * rim)
				d[i + 2] = clampByte(col[2] * shade + ab * rim)
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

	function ensureRunning() {
		if (!rafId && props.reveal > 0 && ctx && !prefersReducedMotion()) {
			rafId = requestAnimationFrame(loop)
		}
	}

	function stopLoop() {
		if (rafId) cancelAnimationFrame(rafId)
		rafId = 0
	}

	watch(() => props.reveal, ensureRunning)

	onMounted(() => {
		const el = canvasEl.value
		el.width = res
		el.height = res
		ctx = el.getContext('2d')
		seed = Math.floor(Math.random() * 1e5) + 1
		draw(0) // initial static frame so it's ready the instant it reveals
		ensureRunning()
	})

	// kept alive under HeroIntro: onBeforeUnmount never fires on navigation, so the
	// shader loop would keep burning the main thread behind every other page
	onDeactivated(stopLoop)
	onActivated(ensureRunning)

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

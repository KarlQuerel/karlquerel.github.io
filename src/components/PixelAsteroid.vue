<template>
	<!-- procedural sculpted pixel rock, drawn once per visit and upscaled
	     pixelated; tumbling comes free from the parent's scroll-driven rotate.
	     Decorative. -->
	<canvas ref="canvasEl" class="asteroid" :style="{ width: `${size}vmin` }" aria-hidden="true" />
</template>

<script setup>
	import { onMounted, ref } from 'vue'
	import { ASTEROID, PLANET } from '@/constants/planet'
	import { smoothstep } from '@/js/math'

	defineProps({
		// on-screen width (vmin) at distance 1 — depth scaling comes from the parent
		size: { type: Number, required: true },
	})

	const canvasEl = ref(null)

	// dependency-free 2D value noise, seeded per visit so no two rocks match
	let seed = 1

	function hash2(ix, iy) {
		let n = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263)
		n = (n + Math.imul(seed, 951274213)) | 0
		n = Math.imul(n ^ (n >>> 13), 1274126177)
		return ((n ^ (n >>> 16)) >>> 0) / 4294967295
	}

	function noise2(x, y) {
		const ix = Math.floor(x)
		const iy = Math.floor(y)
		const u = smoothstep(x - ix)
		const v = smoothstep(y - iy)
		const a = hash2(ix, iy) + (hash2(ix + 1, iy) - hash2(ix, iy)) * u
		const b = hash2(ix, iy + 1) + (hash2(ix + 1, iy + 1) - hash2(ix, iy + 1)) * u
		return a + (b - a) * v
	}

	function fbm2(x, y) {
		return (
			0.55 * noise2(x, y) +
			0.3 * noise2(x * 2.3 + 11, y * 2.3) +
			0.15 * noise2(x * 5.1, y * 5.1 + 7)
		)
	}

	// The rock is a heightfield: a dome (overall convexity) plus noise lumps plus
	// a seeded crater field (bowls with raised lips). Shading then comes from the
	// height gradient's normals, so lumps catch the key light and craters
	// self-shadow — quantised into hard bands to stay pixel art.
	function draw() {
		const res = ASTEROID.resolution
		const el = canvasEl.value
		el.width = res
		el.height = res
		const ctx = el.getContext('2d')
		const img = ctx.createImageData(res, res)
		const d = img.data
		const half = res / 2

		// seeded crater field, kept off the extreme rim
		const cfg = ASTEROID.craters
		const craters = []
		for (let c = 0; c < cfg.count; c++) {
			const angle = hash2(c, 101) * Math.PI * 2
			const dist = Math.sqrt(hash2(c, 202)) * 0.55
			craters.push({
				x: Math.cos(angle) * dist,
				y: Math.sin(angle) * dist,
				r: cfg.rMin + hash2(c, 303) * (cfg.rMax - cfg.rMin),
				depth: cfg.depthMin + hash2(c, 404) * (cfg.depthMax - cfg.depthMin),
			})
		}

		// pass 1: the heightfield (-1 marks outside the silhouette)
		const heights = new Float32Array(res * res).fill(-1)
		for (let y = 0; y < res; y++) {
			for (let x = 0; x < res; x++) {
				const dx = (x + 0.5 - half) / half
				const dy = (y + 0.5 - half) / half
				const theta = Math.atan2(dy, dx)
				// rim ripple sampled on the unit circle, so the outline has no seam
				const ripple =
					fbm2(
						Math.cos(theta) * ASTEROID.edgeFreq + 23,
						Math.sin(theta) * ASTEROID.edgeFreq
					) *
						2 -
					0.94
				const edge = ASTEROID.baseRadius * 2 * (1 + ASTEROID.roughness * ripple)
				const nd = Math.hypot(dx, dy) / edge
				if (nd > 1) continue

				const dome = Math.sqrt(1 - nd * nd)
				let h = dome
				// lumps fade toward the rim so they never break the silhouette
				h +=
					(fbm2(dx * ASTEROID.lumpFreq + 9, dy * ASTEROID.lumpFreq) - 0.47) *
					ASTEROID.lumpAmp *
					dome
				for (const crater of craters) {
					const cd = Math.hypot(dx - crater.x, dy - crater.y) / crater.r
					if (cd < 1.2) {
						if (cd < 1) h -= crater.depth * (1 - smoothstep(cd)) * dome
						// the raised lip around the bowl
						h += crater.depth * 0.4 * Math.max(0, 1 - Math.abs(cd - 0.95) / 0.25) * dome
					}
				}
				heights[y * res + x] = h
			}
		}

		// pass 2: normals from the gradient, lit by the planet's key light
		const light = PLANET.light
		const lmag = Math.hypot(light[0], light[1], light[2]) || 1
		const lx = light[0] / lmag
		const ly = light[1] / lmag
		const lz = light[2] / lmag
		const at = (x, y, fallback) => {
			if (x < 0 || y < 0 || x >= res || y >= res) return fallback
			const h = heights[y * res + x]
			return h < 0 ? fallback : h
		}

		for (let y = 0; y < res; y++) {
			for (let x = 0; x < res; x++) {
				const idx = y * res + x
				const h = heights[idx]
				if (h < 0) continue
				const i = idx * 4

				const g = ASTEROID.gradientScale
				const nx = (at(x - 1, y, h) - at(x + 1, y, h)) * g
				const ny = (at(x, y - 1, h) - at(x, y + 1, h)) * g
				const nmag = Math.hypot(nx, ny, 1)
				const diff = Math.max(0, (nx * lx + ny * ly + lz) / nmag)
				// banded light levels — facets, not gradients
				const shade =
					Math.round(
						(PLANET.ambient + (1 - PLANET.ambient) * diff) * ASTEROID.shadeBands
					) / ASTEROID.shadeBands

				// regolith patches: two albedos mixed in large blotches
				const dx = (x + 0.5 - half) / half
				const dy = (y + 0.5 - half) / half
				const albedo =
					fbm2(dx * ASTEROID.patchFreq + 31, dy * ASTEROID.patchFreq) > 0.47
						? ASTEROID.albedoLight
						: ASTEROID.albedoDark
				d[i] = albedo[0] * shade
				d[i + 1] = albedo[1] * shade
				d[i + 2] = albedo[2] * shade
				d[i + 3] = 255
			}
		}
		ctx.putImageData(img, 0, 0)
	}

	onMounted(() => {
		seed = Math.floor(Math.random() * 1e5) + 1
		draw()
	})
</script>

<style scoped lang="scss">
	.asteroid {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: auto;
		// keep the upscaled rock blocky rather than smoothly interpolated
		image-rendering: pixelated;
		pointer-events: none;
	}
</style>

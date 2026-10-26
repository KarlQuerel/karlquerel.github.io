<template>
	<!-- The world under the ship: the Earth's limb across the foot of the frame, the Moon up over its
	     night side. Painted once per frame size off the main thread; each leans at its own depth and
	     rises into place once first painted. -->
	<div class="orbit" :class="{ 'orbit--up': up }" :style="riseStyle" aria-hidden="true">
		<canvas ref="moonEl" class="orbit__layer" :style="moonStyle" />
		<canvas
			ref="earthEl"
			class="orbit__layer"
			:style="earthStyle"
			@transitionend.self="onRisen"
		/>
	</div>
</template>

<script setup>
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { useFrameReshape } from '@/composables/useFrameReshape'
	import { snapCell } from '@/composables/usePixelCell'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { GAME_HOLDING } from '@/constants/game'
	import { PLANET } from '@/constants/planet'
	import { paintGlobe, paintMoon } from '@/js/intro/earthArt'
	import { planetDisc } from '@/js/planetShader'
	import HoldingWorker from '@/js/holding.worker.js?worker'

	const { earth: E, moon: M, rise: R } = GAME_HOLDING
	const emit = defineEmits(['risen'])
	const earthEl = ref(null)
	const moonEl = ref(null)
	const earthStyle = ref({})
	const moonStyle = ref({})
	const riseStyle = { '--rise-ms': `${R.ms}ms`, '--cover-ms': `${R.coverMs}ms` }

	// The rise starts on the first paint, two frames on so the layers are laid out below first.
	const up = ref(false)
	let risen = false
	function rise() {
		if (up.value) return
		if (prefersReducedMotion()) {
			up.value = true
			onRisen()
			return
		}
		requestAnimationFrame(() => requestAnimationFrame(() => (up.value = true)))
	}
	function onRisen(event) {
		if (risen || (event && event.propertyName !== 'transform')) return
		risen = true
		emit('risen')
	}

	// The frame in cells: the globe's sprite (its disc PLANET.discRadius of the side) and the window of
	// it the frame shows, bled by the lean so the limb never shows an edge; and the Moon's own sprite.
	function layout() {
		const cell = snapCell(E.cellPx)
		const W = window.innerWidth
		const H = window.innerHeight
		const cols = Math.ceil(W / cell)
		const rows = Math.ceil(H / cell)
		const res = 2 * Math.round((E.radius * cols) / PLANET.discRadius / 2)
		const { radius, center } = planetDisc(res)
		const bleed = Math.ceil(E.depth / cell)
		// the frame row the limb crests on, and the first row painted: the air above it
		const crest = Math.round(E.top * rows)
		const top = crest - E.air.depth - 1
		const win = {
			x0: center - Math.round(E.x * cols) - bleed,
			y0: Math.round(center - radius) - crest + top,
			w: cols + 2 * bleed,
			h: rows - top + bleed,
		}
		const moonRes = 2 * Math.round((M.radius * Math.min(W, H)) / cell) + 2
		return { key: `${W}x${H}@${cell}`, W, H, cell, res, bleed, top, win, moonRes }
	}

	const px = v => `${v}px`
	function place({ W, H, cell, bleed, top, win, moonRes }) {
		earthStyle.value = {
			left: px(-bleed * cell),
			top: px(top * cell),
			width: px(win.w * cell),
			height: px(win.h * cell),
			'--depth': E.depth,
			'--rise': px(Math.round(R.earth * H)),
		}
		const side = moonRes * cell
		moonStyle.value = {
			left: px(Math.round(M.at[0] * W - side / 2)),
			top: px(Math.round(M.at[1] * H - side / 2)),
			width: px(side),
			height: px(side),
			'--depth': M.depth,
			'--rise': px(Math.round(R.moon * H)),
		}
	}

	function blit(canvas, data, w, h) {
		canvas.width = w
		canvas.height = h
		canvas.getContext('2d').putImageData(new ImageData(data, w, h), 0, 0)
	}

	let worker = null
	let current = null
	function onPainted({ data }) {
		// a newer size is already on its way
		if (data.key !== current.key) return
		blit(earthEl.value, data.globe, current.win.w, current.win.h)
		blit(moonEl.value, data.disc, current.moonRes, current.moonRes)
		rise()
	}

	function paint() {
		const L = layout()
		if (L.key === current?.key) return
		current = L
		place(L)
		const earth = {
			res: L.res,
			spin: E.spin,
			light: E.light,
			air: E.air,
			detail: E.detail,
			win: L.win,
		}
		if (worker) worker.postMessage({ key: L.key, earth, moon: { res: L.moonRes } })
		else
			onPainted({
				data: {
					key: L.key,
					globe: paintGlobe(L.res, earth, L.win),
					disc: paintMoon(L.moonRes),
				},
			})
	}

	// A worker that cannot run must not take the scene down: the paint comes back to this thread.
	function dropWorker() {
		worker?.terminate()
		worker = null
	}

	onMounted(() => {
		try {
			worker = new HoldingWorker()
			worker.onmessage = onPainted
			worker.onerror = () => {
				dropWorker()
				current = null
				paint()
			}
		} catch {
			worker = null
		}
		paint()
	})
	onBeforeUnmount(dropWorker)
	useFrameReshape(() => ({ w: current?.W ?? 0, h: current?.H ?? 0 }), paint)
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.orbit {
		position: fixed;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	// The rise rides `transform`, the lean `translate`, so the two compose. Each canvas gets its own
	// compositor layer, so the move never repaints the art. The light is up by 60%: the Moon starts in
	// frame and would otherwise pop in.
	.orbit__layer {
		position: absolute;
		image-rendering: pixelated;
		opacity: 0;
		filter: brightness(0);
		transform: translateY(var(--rise, 0));
		transition:
			transform var(--rise-ms) $ease-drift,
			opacity var(--cover-ms) linear,
			filter calc(var(--rise-ms) * 0.6) linear;
		will-change: transform, translate;
		@include lean;
	}

	.orbit--up .orbit__layer {
		opacity: 1;
		filter: none;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.orbit__layer {
			transition: none;
		}
	}
</style>

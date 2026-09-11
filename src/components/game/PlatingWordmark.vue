<template>
	<!-- The name discovered plate by plate, then held with its glint. Plays once. -->
	<canvas ref="el" class="plating" :style="sizeStyle" aria-hidden="true" />
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { GAME_HOLDING, GAME_WORDMARK } from '@/constants/game'
	import { hash1 } from '@/js/pixelNoise'
	import { layoutWordmark, paintPlating, platesOf } from '@/js/wordmark'

	const emit = defineEmits(['built'])
	const P = GAME_HOLDING.plating
	const layout = layoutWordmark(GAME_WORDMARK)
	const plates = platesOf(layout, P)
	const cols = layout.cols + 2 * P.pad
	const rows = layout.rows + 2 * P.pad

	// one line always: the cell comes from the frame width, snapped to whole device pixels
	const el = ref(null)
	const cell = ref(P.cellMax)
	const sizeStyle = computed(() => ({
		width: `${cols * cell.value}px`,
		height: `${rows * cell.value}px`,
	}))
	function fit() {
		const dpr = window.devicePixelRatio || 1
		const raw = Math.min(P.cellMax, (window.innerWidth * P.span) / cols)
		cell.value = Math.max(1 / dpr, Math.floor(raw * dpr) / dpr)
	}
	const onResize = useRafThrottle(fit)

	// Two phases: `step` counts plates landed in the build, then the hold runs the glint for good.
	const state = { landed: 0, hot: new Set(), glint: -1, sparks: [] }
	let phase = 'build'
	let phaseAt = 0
	let step = -1
	let frame = 0
	const sparkLife = []

	function paint() {
		const ctx = el.value.getContext('2d')
		paintPlating(ctx, layout, plates, GAME_WORDMARK, GAME_HOLDING.weld, state, P.pad, P.pad)
	}

	// each plate that lands throws sparks off its centre, a few cells out in every direction
	function land(rank) {
		const [cx, cy] = plates.centres[rank]
		for (let i = 0; i < P.sparks; i++) {
			const a = hash1(rank * 7 + i, P.seed) * Math.PI * 2
			const r = 2 + hash1(rank * 7 + i + 3, P.seed) * 4
			state.sparks.push([Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r)])
			sparkLife.push(step + P.sparkSteps)
		}
	}

	function build(now) {
		const next = Math.floor((now - phaseAt) / P.stepMs)
		if (next === step) return false
		for (step = step + 1; step <= next && state.landed < plates.count; step++)
			land(state.landed++)
		step = next
		state.hot = new Set([...Array(P.hotSteps)].map((_, i) => state.landed - 1 - i))
		while (sparkLife.length && sparkLife[0] <= step) {
			sparkLife.shift()
			state.sparks.shift()
		}
		if (state.landed === plates.count && !sparkLife.length) {
			phase = 'hold'
			phaseAt = now
			state.hot = new Set()
			emit('built')
		}
		return true
	}

	function hold(now) {
		const { every, step: pace } = GAME_WORDMARK.glint
		const t = (now - phaseAt) % (every + pace * (layout.cols + layout.rows))
		const next = t < every ? -1 : Math.floor((t - every) / pace)
		if (next === state.glint) return false
		state.glint = next
		return true
	}

	const phases = { build, hold }
	function tick(now) {
		if (!phaseAt) phaseAt = now
		if (phases[phase](now)) paint()
		frame = requestAnimationFrame(tick)
	}

	onMounted(() => {
		fit()
		el.value.width = cols
		el.value.height = rows
		if (prefersReducedMotion()) {
			state.landed = plates.count
			paint()
			emit('built')
		} else frame = requestAnimationFrame(tick)
		window.addEventListener('resize', onResize, { passive: true })
	})
	onBeforeUnmount(() => {
		window.removeEventListener('resize', onResize)
		if (frame) cancelAnimationFrame(frame)
	})
</script>

<style scoped lang="scss">
	.plating {
		display: block;
		image-rendering: pixelated;
	}
</style>

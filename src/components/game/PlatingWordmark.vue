<template>
	<!-- The name discovered plate by plate, then held with its glint. Plays once. With `lit`, the cut
	     lights up around the cursor. -->
	<canvas
		ref="el"
		class="plating"
		:style="sizeStyle"
		aria-hidden="true"
		v-on="
			lit
				? {
						pointermove: aim,
						pointerdown: aim,
						pointerleave: release,
						pointercancel: release,
					}
				: {}
		"
	/>
</template>

<script setup>
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { usePixelCell } from '@/composables/usePixelCell'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { GAME_WORDMARK } from '@/constants/game'
	import { hash1 } from '@/js/pixelNoise'
	import { layoutWordmark, paintPlating, platesOf } from '@/js/wordmark'

	const props = defineProps({
		// false holds the name still, already built: only its glint runs
		build: { type: Boolean, default: true },
		// the most CSS px a cell may take on this page; unset, the plating's own cap
		cellMax: { type: Number, default: 0 },
		// the cut answers the cursor
		lit: { type: Boolean, default: false },
	})
	const emit = defineEmits(['built'])
	const P = GAME_WORDMARK.plating
	const layout = layoutWordmark(GAME_WORDMARK)
	const plates = platesOf(layout, P)
	const cols = layout.cols + 2 * P.pad
	const rows = layout.rows + 2 * P.pad

	// one line always: the cell comes from the frame width, snapped to whole device pixels
	const el = ref(null)
	const { sizeStyle } = usePixelCell(cols, rows, {
		span: P.span,
		cellMax: props.cellMax || P.cellMax,
	})

	// Two phases: `step` counts plates landed in the build, then the hold runs the glint for good.
	const state = { landed: 0, hot: new Set(), glint: -1, sparks: [] }
	let phase = 'build'
	let phaseAt = 0
	let step = -1
	let frame = 0
	// live sparks as { x, y, ux, uy, born }: a plate centre, a unit heading and a birth time
	let flying = []

	function paint() {
		const ctx = el.value.getContext('2d')
		paintPlating(ctx, layout, plates, GAME_WORDMARK, GAME_WORDMARK.weld, state, P.pad, P.pad)
	}

	// The seam's light: the cursor's column in the layout's cells, then a tone at a time out once it leaves.
	const S = GAME_WORDMARK.seam
	let aimed = false
	let leftAt = 0
	function aim(event) {
		const box = el.value.getBoundingClientRect()
		state.beam = { x: ((event.clientX - box.left) / box.width) * cols - P.pad, ebb: 0 }
		leftAt = 0
		aimed = true
		if (!frame) paint()
	}
	function release() {
		if (!state.beam) return
		leftAt = performance.now()
		// no loop under reduced motion: out at once
		if (!frame) {
			state.beam = null
			paint()
		}
	}
	function ebbing(now) {
		if (!leftAt) return false
		const ebb = Math.max(0, Math.floor((now - leftAt) / S.ebbMs))
		if (ebb >= S.tones.length) {
			state.beam = null
			leftAt = 0
			return true
		}
		if (ebb === state.beam.ebb) return false
		state.beam.ebb = ebb
		return true
	}

	// each plate that lands throws sparks off its centre, one heading each
	function land(rank, now) {
		const [x, y] = plates.centres[rank]
		for (let i = 0; i < P.sparks; i++) {
			const a = hash1(rank * 7 + i, P.seed) * Math.PI * 2
			flying.push({ x, y, ux: Math.cos(a), uy: Math.sin(a), born: now })
		}
	}

	// sparks coast on whole cells, so the grid quantises the drift; true while any are left to draw
	function drift(now) {
		const { from, to, life, cools } = P.drift
		const { spark, cool } = GAME_WORDMARK.weld
		const had = state.sparks.length
		flying = flying.filter(s => now - s.born < life)
		state.sparks = flying.map(s => {
			const t = (now - s.born) / life
			const r = from + t * (to - from)
			return [
				Math.round(s.x + s.ux * r),
				Math.round(s.y + s.uy * r),
				t < cools ? spark : cool,
			]
		})
		return had > 0
	}

	function landing(now) {
		const moved = drift(now)
		const next = Math.floor((now - phaseAt) / P.stepMs)
		if (next === step) return moved
		for (step = step + 1; step <= next && state.landed < plates.count; step++)
			land(state.landed++, now)
		step = next
		state.hot = new Set([...Array(P.hotSteps)].map((_, i) => state.landed - 1 - i))
		if (state.landed === plates.count) {
			phase = 'hold'
			phaseAt = now
			state.hot = new Set()
			emit('built')
		}
		return true
	}

	function hold(now) {
		const moved = drift(now)
		const { every, step: pace } = GAME_WORDMARK.glint
		// offset by `every` so the first sweep runs the moment the last plate lands
		const t = (now - phaseAt + every) % (every + pace * (layout.cols + layout.rows))
		const next = t < every ? -1 : Math.floor((t - every) / pace)
		if (next === state.glint) return moved
		state.glint = next
		return true
	}

	const phases = { build: landing, hold }
	function tick(now) {
		if (!phaseAt) phaseAt = now
		const moved = phases[phase](now)
		const ebbed = ebbing(now)
		if (moved || ebbed || aimed) paint()
		aimed = false
		frame = requestAnimationFrame(tick)
	}

	onMounted(() => {
		el.value.width = cols
		el.value.height = rows
		if (!props.build) {
			state.landed = plates.count
			phase = 'hold'
		}
		if (prefersReducedMotion()) {
			state.landed = plates.count
			paint()
		} else frame = requestAnimationFrame(tick)
		if (state.landed === plates.count) emit('built')
	})
	onBeforeUnmount(() => {
		if (frame) cancelAnimationFrame(frame)
	})
</script>

<style scoped lang="scss">
	.plating {
		display: block;
		image-rendering: pixelated;
	}
</style>

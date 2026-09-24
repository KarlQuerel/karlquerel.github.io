<template>
	<div class="terminal-matrix" @click="close">
		<canvas ref="canvasRef" class="terminal-matrix__canvas" />
		<span class="terminal-matrix__hint">press any key to exit</span>
	</div>
</template>

<script setup>
	import { ref, onMounted, onBeforeUnmount } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { useWindowListener } from '@/composables/useWindowListener'
	import {
		MATRIX_FONT_SIZE as FONT_SIZE,
		MATRIX_GLYPHS as GLYPHS,
		MATRIX_RESTART_HOLD,
		MATRIX_STILL_POSITION,
		MATRIX_STILL_TEXT,
		MATRIX_TRAIL_FILL,
	} from '@/constants/terminal'

	// Phosphor digital-rain overlay for the `matrix` command; closes on the first key press or click.
	const props = defineProps({
		color: { type: String, required: true },
	})
	const emit = defineEmits(['close'])

	const canvasRef = ref(null)
	let ctx = null
	let rafId = null
	let columns = 0
	let drops = []

	const setup = () => {
		const canvas = canvasRef.value
		if (!canvas?.parentElement) return
		canvas.width = canvas.parentElement.clientWidth
		canvas.height = canvas.parentElement.clientHeight
		columns = Math.max(1, Math.floor(canvas.width / FONT_SIZE))
		drops = Array.from({ length: columns }, () =>
			Math.floor(Math.random() * (canvas.height / FONT_SIZE))
		)
		ctx = canvas.getContext('2d')
		ctx.font = `${FONT_SIZE}px monospace`
	}

	const draw = () => {
		const canvas = canvasRef.value
		if (!canvas || !ctx) return
		ctx.fillStyle = MATRIX_TRAIL_FILL
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = props.color
		for (let i = 0; i < columns; i++) {
			const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
			ctx.fillText(glyph, i * FONT_SIZE, drops[i] * FONT_SIZE)
			if (drops[i] * FONT_SIZE > canvas.height && Math.random() > MATRIX_RESTART_HOLD)
				drops[i] = 0
			drops[i]++
		}
		rafId = requestAnimationFrame(draw)
	}

	const close = () => emit('close')
	const onKey = event => {
		event.preventDefault()
		event.stopPropagation()
		close()
	}

	// setup reallocates the drops array and clears the canvas: coalesce drag-resize into one rebuild
	useWindowListener('resize', useRafThrottle(setup))
	// capture phase, so the terminal input never sees the exit key
	useWindowListener('keydown', onKey, true)

	onMounted(() => {
		setup()
		if (!prefersReducedMotion()) draw()
		else if (ctx) ctx.fillText(MATRIX_STILL_TEXT, ...MATRIX_STILL_POSITION)
	})

	onBeforeUnmount(() => {
		if (rafId) cancelAnimationFrame(rafId)
	})
</script>

<style lang="scss" scoped>
	@use '@/styles/mixins' as *;

	.terminal-matrix {
		position: absolute;
		inset: 0;
		z-index: 10;
		background: $black;
		@include cursor-interactive;
		overflow: hidden;
	}

	.terminal-matrix__canvas {
		display: block;
		width: 100%;
		height: 100%;
	}

	.terminal-matrix__hint {
		position: absolute;
		bottom: 0.75rem;
		left: 50%;
		transform: translateX(-50%);
		color: var(--phosphor);
		font-family: $font-terminal;
		font-size: $type-prose-sm;
		opacity: 0.7;
		pointer-events: none;
		text-shadow: 0 0 4px currentColor;
	}
</style>

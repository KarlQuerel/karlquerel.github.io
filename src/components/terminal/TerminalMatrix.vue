<template>
	<div class="terminal-matrix" @click="close">
		<canvas ref="canvasRef" class="terminal-matrix__canvas" />
		<span class="terminal-matrix__hint">press any key to exit</span>
	</div>
</template>

<script setup>
	import { ref, onMounted, onBeforeUnmount } from 'vue'

	// Phosphor digital-rain overlay summoned by the `matrix` command. Self
	// contained: draws to a canvas filling the terminal window and closes on the
	// first key press or click.
	const props = defineProps({
		color: { type: String, default: '#33ff66' },
	})
	const emit = defineEmits(['close'])

	const FONT_SIZE = 14
	const GLYPHS = 'アイウエオカキクケコサシスセソ0123456789ABCDEFZ'.split('')

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
		// Translucent black wash leaves fading trails behind each glyph.
		ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = props.color
		for (let i = 0; i < columns; i++) {
			const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
			ctx.fillText(glyph, i * FONT_SIZE, drops[i] * FONT_SIZE)
			if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0
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

	onMounted(() => {
		setup()
		const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
		if (reduce) {
			if (ctx) ctx.fillText('wake up...', 20, 30)
		} else {
			draw()
		}
		window.addEventListener('keydown', onKey, true)
		window.addEventListener('resize', setup)
	})

	onBeforeUnmount(() => {
		if (rafId) cancelAnimationFrame(rafId)
		window.removeEventListener('keydown', onKey, true)
		window.removeEventListener('resize', setup)
	})
</script>

<style lang="scss" scoped>
	.terminal-matrix {
		position: absolute;
		inset: 0;
		z-index: 10;
		background: #000;
		cursor: pointer;
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
		font-size: 0.8rem;
		opacity: 0.7;
		pointer-events: none;
		text-shadow: 0 0 4px currentColor;
	}
</style>

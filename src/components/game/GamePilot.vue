<template>
	<!-- Dev only: the corridor rebuilt in three.js, to judge rigged characters in the game's pixel look. -->
	<div class="pilot">
		<canvas ref="canvas" class="pilot__canvas" aria-hidden="true" />
		<BootCover :progress="bootProgress" :ceiling="bootCeiling" :done="!booting" />
		<p v-if="!moved" class="pilot__hint">{{ INTRO_WALK_HINT }}</p>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useArtCanvas } from '@/composables/useArtCanvas'
	import { useWindowListener } from '@/composables/useWindowListener'
	import BootCover from '@/components/BootCover.vue'
	import { createCorridorPilot } from '@/js/pilot/corridorPilot'
	import { PILOT, PILOT_BOOT } from '@/constants/game/pilot'
	import { WALK_KEYS } from '@/constants/intro/walk'
	import { INTRO_WALK_HINT } from '@/data/gameIntro'

	const WALKING = new Set(Object.values(WALK_KEYS).flat())
	const canvas = ref(null)
	const moved = ref(false)
	const input = { keys: new Set(), turn: [0, 0] }
	const pilot = createCorridorPilot()

	const { booting, bootProgress, bootCeiling } = useArtCanvas(canvas, {
		webgl2: true,
		bootWeights: PILOT_BOOT,
		cellPx: () => PILOT.cellPx,
		build: pilot.build,
		resize: pilot.resize,
		release: pilot.release,
		frame(dt) {
			if (pilot.walk.moved) moved.value = true
			return pilot.frame(dt, input)
		},
	})

	// a click takes the mouse for looking, Esc gives it back
	const locked = () => document.pointerLockElement === canvas.value
	useWindowListener('pointerdown', e => {
		if (e.target === canvas.value && !locked())
			canvas.value.requestPointerLock()?.catch?.(() => {})
	})
	useWindowListener('pointermove', e => {
		if (!locked()) return
		input.turn[0] += e.movementX
		input.turn[1] += e.movementY
	})
	useWindowListener(
		'keydown',
		e => {
			if (!WALKING.has(e.code)) return
			input.keys.add(e.code)
			e.preventDefault()
		},
		// not passive: the arrows must not also scroll
		{}
	)
	useWindowListener('keyup', e => input.keys.delete(e.code))
	useWindowListener('blur', () => input.keys.clear())
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;

	.pilot {
		position: fixed;
		inset: 0;
		background: $black;
		overflow: hidden;
	}

	// sized by useArtCanvas: whole device pixels per art pixel
	.pilot__canvas {
		position: fixed;
		display: block;
		image-rendering: pixelated;
	}

	.pilot__hint {
		position: fixed;
		left: 50%;
		bottom: 9vh;
		margin: 0;
		translate: -50% 0;
		font-family: $font-pixel;
		font-size: $type-prose-sm;
		letter-spacing: 1px;
		white-space: nowrap;
		color: $flyby-ink;
		pointer-events: none;
		@include flyby-shadow;
	}
</style>

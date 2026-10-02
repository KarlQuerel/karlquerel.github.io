<template>
	<!-- Shot 8, the crossing: the chart is the picture (board.frag.glsl), this is the board of ten
	     lights over it. Yours stays lit; the rest go out one by one. -->
	<div class="board">
		<div class="board__panel">
			<div class="board__lights" :style="gridStyle">
				<span
					v-for="ship in ships"
					:key="ship"
					class="board__light"
					:class="{
						'board__light--out': out.has(ship),
						'board__light--yours': ship === INTRO_BOARD.yours,
					}"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { BOARD } from '@/constants/intro/board'
	import { INTRO_BOARD } from '@/data/gameIntro'
	import { LOST_ORDER, goneAt } from '@/js/intro/board'

	const props = defineProps({
		// shot-local seconds at a tenth
		clock: { type: Number, required: true },
	})

	const ships = Array.from({ length: INTRO_BOARD.ships }, (_, i) => i + 1)
	const gridStyle = { '--cols': BOARD.cols }
	const out = computed(() => new Set(LOST_ORDER.slice(0, goneAt(props.clock))))
</script>

<style scoped lang="scss">
	@use 'palette:' as palette;
	@use '@/styles/mixins' as *;

	.board {
		position: fixed;
		inset: 0;
		z-index: 2;
		pointer-events: none;
	}

	// the board: an inset on the chart, top right, clear of the telemetry corner below it
	.board__panel {
		position: absolute;
		top: 4.5rem;
		right: 2rem;
		@include void-panel(rgba(palette.$void, 0.72));
		padding: 1rem 1.25rem;
	}

	// one row of ten
	.board__lights {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		gap: 8px;
	}

	// a lit lamp: one hard square with its own glow, going dark on a step, never a fade
	.board__light {
		width: 16px;
		height: 16px;
		background: palette.$ember;
		border: 1px solid rgba($black, 0.6);
		box-shadow: 0 0 6px rgba(palette.$ember, 0.55);
	}

	.board__light--out {
		background: palette.$iron;
		box-shadow: none;
	}

	// yours: white-hot, and it blinks like the cursor it is
	.board__light--yours {
		background: $white;
		box-shadow: 0 0 8px rgba($white, 0.8);
		animation: board-blink 1s step-end infinite;
	}

	@keyframes board-blink {
		50% {
			background: palette.$glow;
		}
	}

	// a phone lays the chart bottom to top, so the board takes the top of the frame
	@media (max-width: $breakpoint-mobile) {
		.board__panel {
			top: 3.6rem;
			left: 50%;
			right: auto;
			transform: translateX(-50%);
			padding: 0.75rem 1rem;
		}

		.board__lights {
			gap: 5px;
		}

		.board__light {
			width: 12px;
			height: 12px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.board__light--yours {
			animation: none;
		}
	}
</style>

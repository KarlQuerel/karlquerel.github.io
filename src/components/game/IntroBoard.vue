<template>
	<!-- Shot 8, the crossing: the chart is the picture (board.frag.glsl), this is its annotation and
	     the board of ten lights. Yours stays lit; the rest go out one by one as the counter runs up. -->
	<div class="board">
		<span class="board__mark board__mark--sol" :style="solAt">{{ BOARD.solLabel }}</span>
		<span
			v-for="ring in rings"
			:key="ring.label"
			class="board__mark board__mark--ring"
			:style="ring.at"
			>{{ ring.label }}</span
		>
		<!-- every ship named on its marker; a lost one keeps its name where it went dark -->
		<span
			v-for="mark in marks"
			:key="mark.ship"
			class="board__mark board__mark--ship"
			:class="{
				'board__mark--yours': mark.yours,
				'board__mark--lost': mark.lost,
				'board__mark--hidden': !mark.shown,
			}"
			:style="mark.at"
			>{{ INTRO_BOARD.prefix }}{{ mark.ship }}</span
		>

		<div class="board__panel">
			<p class="board__head">
				<span class="board__ship">{{ INTRO_HUD.ship }}</span>
				<span class="board__days">{{ INTRO_HUD.day }} {{ days }}</span>
			</p>
			<div class="board__lights" :style="gridStyle">
				<span
					v-for="ship in ships"
					:key="ship"
					class="board__lamp"
					:class="{
						'board__lamp--out': out.has(ship),
						'board__lamp--yours': ship === INTRO_BOARD.yours,
					}"
				>
					<span class="board__light" />
					<span class="board__num">{{ String(ship).padStart(2, '0') }}</span>
				</span>
			</div>
			<p v-for="ship in log" :key="ship" class="board__log">
				{{ INTRO_BOARD.prefix }}{{ ship }}: {{ INTRO_BOARD.lost }}
			</p>
		</div>
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { BOARD } from '@/constants/intro/board'
	import { INTRO_BOARD, INTRO_HUD } from '@/data/gameIntro'
	import {
		LOST_ORDER,
		cameraLayout,
		chartPoint,
		daysAt,
		destOf,
		goneAt,
		progressAt,
		toViewport,
	} from '@/js/intro/board'

	const props = defineProps({
		// shot-local seconds at a tenth
		clock: { type: Number, required: true },
	})

	const ships = Array.from({ length: INTRO_BOARD.ships }, (_, i) => i + 1)
	const gridStyle = { '--cols': BOARD.cols }

	// the labels sit on the chart the shader draws, so they follow the frame's shape and its camera
	const aspect = ref(window.innerWidth / window.innerHeight)
	useWindowListener('resize', () => (aspect.value = window.innerWidth / window.innerHeight))
	const layout = computed(() => cameraLayout(aspect.value, props.clock))
	const at = uv => toViewport(uv, aspect.value)

	const solAt = computed(() => at(layout.value.sol))
	// each ring is labelled where it crosses the lower edge of the fan
	const rings = computed(() =>
		BOARD.rings.map((r, i) => ({
			label: `${BOARD.ringLy[i]} ${BOARD.ringUnit}`,
			at: at(chartPoint(layout.value, r, -BOARD.chart.spread)),
		}))
	)
	const gone = computed(() => goneAt(props.clock))
	const out = computed(() => new Set(LOST_ORDER.slice(0, gone.value)))

	// each marker creeps out along its route with the counter, on the overlays' tenth-second clock
	const marks = computed(() =>
		ships.map(ship => {
			const [sx, sy] = layout.value.sol
			const [dx, dy] = destOf(layout.value, ship)
			const k = progressAt(ship, props.clock)
			return {
				ship,
				yours: ship === INTRO_BOARD.yours,
				lost: out.value.has(ship),
				shown: k > BOARD.labelFrom,
				at: at([sx + (dx - sx) * k, sy + (dy - sy) * k]),
			}
		})
	)
	const log = computed(() =>
		LOST_ORDER.slice(Math.max(0, gone.value - BOARD.logLines), gone.value)
	)
	const days = computed(() =>
		Math.round(INTRO_BOARD.days * daysAt(props.clock)).toLocaleString('en-US')
	)
</script>

<style scoped lang="scss">
	@use 'palette:' as palette;
	@use '@/styles/mixins' as *;

	.board {
		position: fixed;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		font-family: $font-terminal;
		font-size: $type-prose-sm;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	// chart annotation: small, keylined, hung just off the point it names
	// the clock ticks at a tenth of a second; a matching glide keeps the labels on the moving chart
	.board__mark {
		position: absolute;
		transition:
			left 0.1s linear,
			top 0.1s linear;
		white-space: nowrap;
		color: palette.$rime;
		@include pixel-keyline($unit: 1px, $halo: 4px);
	}

	.board__mark--sol {
		color: palette.$sand;
		transform: translate(-50%, 14px);
	}

	.board__mark--ring {
		transform: translate(-50%, 6px);
	}

	.board__mark--ship {
		transform: translate(8px, -140%);
		// a name comes up on two steps, the way the chart plots it
		transition:
			left 0.1s linear,
			top 0.1s linear,
			opacity 0.3s steps(2, end);
	}

	.board__mark--yours {
		color: $yellow;
	}

	.board__mark--lost {
		color: $light-red;
		opacity: 0.7;
	}

	.board__mark--hidden {
		opacity: 0;
	}

	// the board: an inset on the chart, top right, clear of the telemetry corner below it
	.board__panel {
		position: absolute;
		top: 4.5rem;
		right: 2rem;
		@include void-panel(rgba(palette.$void, 0.72));
		padding: 1rem 1.25rem;
		text-align: left;
		white-space: nowrap;
		color: $light-gray;
	}

	.board__head {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		margin-bottom: 0.8rem;
		font-size: inherit;
		color: inherit;
		text-align: left;
	}

	.board__ship {
		color: $yellow;
	}

	// one row of ten, each lamp over its hull number
	.board__lights {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		gap: 8px;
	}

	.board__lamp {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}

	.board__num {
		color: palette.$frost;
	}

	// a lit lamp: one hard square with its own glow, going dark on a step, never a fade
	.board__light {
		width: 16px;
		height: 16px;
		background: palette.$ember;
		border: 1px solid rgba($black, 0.6);
		box-shadow: 0 0 6px rgba(palette.$ember, 0.55);
	}

	.board__lamp--out .board__light {
		background: palette.$iron;
		box-shadow: none;
	}

	.board__lamp--out .board__num {
		color: $light-red;
	}

	// yours: white-hot, and it blinks like the cursor it is
	.board__lamp--yours .board__light {
		background: $white;
		box-shadow: 0 0 8px rgba($white, 0.8);
		animation: board-blink 1s step-end infinite;
	}

	.board__lamp--yours .board__num {
		color: $yellow;
	}

	@keyframes board-blink {
		50% {
			background: palette.$glow;
		}
	}

	.board__log {
		margin-top: 0.5rem;
		font-size: inherit;
		text-align: left;
		color: $light-red;

		& + & {
			margin-top: 0.2rem;
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

		.board__head {
			gap: 1rem;
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
		.board__lamp--yours .board__light {
			animation: none;
		}
	}
</style>

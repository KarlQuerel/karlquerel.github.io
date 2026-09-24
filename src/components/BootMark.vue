<template>
	<svg class="mark" :class="{ 'mark--full': full }" :viewBox="VIEW_BOX" aria-hidden="true">
		<defs>
			<g id="boot-body">
				<rect v-for="px in PIXELS" :key="px.k" :x="px.x" :y="px.y" width="1" height="1" />
			</g>
			<clipPath id="boot-fill">
				<rect x="0" :y="ROWS - rows" :width="COLS" :height="rows" />
			</clipPath>
			<clipPath id="boot-edge">
				<rect x="0" :y="ROWS - rows" :width="COLS" :height="rows ? 1 : 0" />
			</clipPath>
		</defs>
		<g class="mark__rim">
			<rect v-for="px in OUTLINE" :key="px.k" :x="px.x" :y="px.y" width="1" height="1" />
		</g>
		<use class="mark__ink" href="#boot-body" />
		<use class="mark__lit" clip-path="url(#boot-fill)" href="#boot-body" />
		<use class="mark__edge" clip-path="url(#boot-edge)" href="#boot-body" />
	</svg>
</template>

<script setup>
	import { computed } from 'vue'
	import { K_GRID } from '@/constants/boot'

	const props = defineProps({
		// how much of the mark is lit, 0..1
		fill: { type: Number, required: true },
		full: { type: Boolean, default: false },
	})

	const ROWS = K_GRID.length
	const COLS = K_GRID[0].length
	const cell = (x, y) => ({ x, y, k: `${x},${y}` })
	const PIXELS = K_GRID.flatMap((row, y) =>
		[...row].flatMap((c, x) => (c === '#' ? [cell(x, y)] : []))
	)
	// the favicon's dark contour, derived rather than copied: every empty cell touching the body
	const NEAR = [-1, 0, 1]
	const inBody = (x, y) => K_GRID[y]?.[x] === '#'
	const OUTLINE = []
	for (let y = -1; y <= ROWS; y++)
		for (let x = -1; x <= COLS; x++)
			if (!inBody(x, y) && NEAR.some(dy => NEAR.some(dx => inBody(x + dx, y + dy))))
				OUTLINE.push(cell(x, y))
	// one cell of padding all round, where the contour lives
	const VIEW_BOX = `-1 -1 ${COLS + 2} ${ROWS + 2}`

	// The fill quantises to the mark's rows, so it climbs a row at a time. Floor, so 100 is true.
	const rows = computed(() => Math.floor(Math.min(1, props.fill) * ROWS))
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;

	.mark {
		position: relative;
		// the old 9-column width scaled up for the contour's two extra columns
		width: clamp(96px, 19.5vw, 160px);
		height: auto;
		// adjacent rects otherwise show hairline seams where they meet
		shape-rendering: crispEdges;
	}

	// the favicon's dark rim, so the mark reads as the logo and not just a letter
	.mark__rim {
		fill: $flyby-void;
	}

	.mark__ink {
		fill: rgba($flyby-ink, 0.2);
	}

	.mark__lit {
		fill: $yellow;
	}

	// the row being written blinks like a cursor: two held frames, no fade
	.mark__edge {
		fill: $white;
		animation: mark-blink 0.9s step-end infinite;
	}

	// full brightness the instant it is full, then the cover goes
	.mark--full .mark__lit {
		fill: $white;
	}

	.mark--full .mark__edge {
		animation: none;
	}

	@keyframes mark-blink {
		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mark__edge {
			animation: none;
		}
	}
</style>

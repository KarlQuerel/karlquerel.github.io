<template>
	<svg
		class="pixel-icon"
		:viewBox="`0 0 ${cols} ${rows}`"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<rect
			v-for="cell in cells"
			:key="cell.key"
			:x="cell.x"
			:y="cell.y"
			width="1"
			height="1"
			:fill="cell.fill"
		/>
	</svg>
</template>

<script setup>
	import { computed } from 'vue'
	import { PIXEL_ICONS, PIXEL_PALETTE } from '@/constants/pixelIcons'

	const props = defineProps({
		name: { type: String, required: true },
	})

	const grid = computed(() => PIXEL_ICONS[props.name] ?? [])
	const rows = computed(() => grid.value.length)
	const cols = computed(() => grid.value[0]?.length ?? 0)

	// One <rect> per opaque cell; transparent cells are dropped.
	const cells = computed(() =>
		grid.value.flatMap((row, y) =>
			[...row].flatMap((char, x) => {
				const fill = PIXEL_PALETTE[char]
				return fill ? [{ key: `${x}-${y}`, x, y, fill }] : []
			})
		)
	)
</script>

<style scoped lang="scss">
	.pixel-icon {
		display: block;
		width: 100%;
		height: 100%;
		image-rendering: pixelated;
		shape-rendering: crispEdges;
	}
</style>

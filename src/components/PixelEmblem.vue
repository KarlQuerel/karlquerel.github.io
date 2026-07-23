<template>
	<!-- Large ghosted pixel-art emblem floating on the empty side of a timeline
	     card — the milestone's story as an item sprite. Decorative: the card text
	     tells the story, so it's aria-hidden. Sprites live as char grids in
	     constants/emblems.js and render as run-length rects; fills are classes
	     derived from theme tokens, so no hex lives in the markup. -->
	<span class="pixel-emblem" aria-hidden="true">
		<svg
			class="pixel-emblem__svg"
			:viewBox="`0 0 ${size.w} ${size.h}`"
			shape-rendering="crispEdges"
		>
			<rect
				v-for="(r, i) in rects"
				:key="i"
				:class="`px-${r.c}`"
				:x="r.x"
				:y="r.y"
				:width="r.w"
				height="1"
			/>
		</svg>
	</span>
</template>

<script setup>
	import { computed } from 'vue'
	import { EMBLEM_PIXEL_MAPS } from '@/constants/emblems'

	const props = defineProps({
		emblem: { type: String, required: true },
	})

	const rows = computed(() => EMBLEM_PIXEL_MAPS[props.emblem] ?? [])
	const size = computed(() => ({ w: rows.value[0]?.length ?? 0, h: rows.value.length }))

	// merge horizontal runs of one colour into single rects to keep the DOM lean
	const rects = computed(() => {
		const out = []
		rows.value.forEach((row, y) => {
			for (let x = 0; x < row.length; ) {
				const c = row[x]
				if (c === '.') {
					x += 1
					continue
				}
				let w = 1
				while (row[x + w] === c) w += 1
				out.push({ x, y, w, c })
				x += w
			}
		})
		return out
	})
</script>

<style scoped lang="scss">
	@use 'sass:color';

	.pixel-emblem {
		display: block;
	}

	.pixel-emblem__svg {
		display: block;
		width: 100%;
		height: auto;
	}

	// shared sprite palette: base tokens plus derived shade/light steps
	.px-K {
		fill: color.scale($black, $lightness: 25%);
	}
	.px-S {
		fill: $black;
	}
	.px-N {
		fill: $phosphor-green;
	}
	.px-G {
		fill: $yellow;
	}
	.px-g {
		fill: color.scale($yellow, $lightness: -35%);
	}
	.px-Y {
		fill: color.scale($yellow, $lightness: 42%);
	}
	.px-W {
		fill: $white;
	}
	.px-w {
		fill: $light-gray;
	}
	.px-d {
		fill: color.scale($light-gray, $lightness: -35%);
	}
	.px-A {
		fill: $azure;
	}
	.px-a {
		fill: color.scale($azure, $lightness: -30%);
	}
	.px-E {
		fill: color.scale($azure, $lightness: 35%);
	}
	.px-M {
		fill: $mint;
	}
	.px-m {
		fill: color.scale($mint, $lightness: -30%);
	}
	.px-e {
		fill: color.scale($mint, $lightness: 35%);
	}
	.px-R {
		fill: $light-red;
	}
	.px-r {
		fill: color.scale($light-red, $lightness: -30%);
	}
	.px-q {
		fill: color.scale($light-red, $lightness: 35%);
	}
</style>

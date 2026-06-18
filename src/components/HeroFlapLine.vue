<template>
	<p class="hero-line" :class="`hero-line--${align}`">
		<template v-for="(cell, i) in cells" :key="i + ':' + cell.glyph">
			<span
				v-if="cell.glyph !== ' '"
				class="flap-char"
				:class="{
					'flap-char--accent': cell.accent,
					'flap-char--settled': cell.settled,
				}"
				>{{ cell.glyph }}</span
			>
			<template v-else>{{ ' ' }}</template>
		</template>
		<span class="sr-only">{{ lineText }}</span>
	</p>
</template>

<script setup>
	import { computed, toRef } from 'vue'
	import { useSplitFlap } from '../composables/useSplitFlap.js'

	const props = defineProps({
		// Array of { text, accent? } segments to flap into place.
		line: { type: Array, required: true },
		// Horizontal alignment of the settled text: 'left' | 'center' | 'right'.
		align: { type: String, default: 'center' },
	})

	const lineRef = toRef(props, 'line')
	const { cells } = useSplitFlap(lineRef)

	// Plain-text label for assistive tech — the flap glyphs are decorative.
	const lineText = computed(() => lineRef.value.map(segment => segment.text).join(''))
</script>

<style scoped lang="scss">
	.hero-line {
		margin: 0;
		font-size: clamp(1.4rem, 4.5vw, 3rem);
		line-height: 1.4;
		letter-spacing: -0.01em;
		color: $white;
		// Wrap only between words, keeping each word's letters as an unbreakable run
		// of inline-block cells — readable at any screen size.
		white-space: normal;
	}

	.hero-line--left {
		text-align: left;
	}

	.hero-line--center {
		text-align: center;
	}

	.hero-line--right {
		text-align: right;
	}

	.flap-char {
		display: inline-block;
		// Stepped mechanical flap replayed on each glyph change via the span :key.
		animation: flapTick 45ms steps(2, end);
	}

	.flap-char--settled {
		animation: none;
		transform: none;
	}

	.flap-char--accent {
		font-family: $font-pixel;
		color: $yellow;
		// Slightly smaller because Press Start 2P runs visually larger than the body font.
		font-size: 0.82em;
		text-shadow:
			0 0 6px rgba($yellow, 0.65),
			0 0 14px rgba($yellow, 0.35);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@keyframes flapTick {
		0% {
			transform: translateY(-12%);
		}
		100% {
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.flap-char {
			animation: none;
		}
	}
</style>

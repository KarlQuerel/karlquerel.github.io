<template>
	<h1 class="page-heading" :class="{ 'page-heading--flanked': $slots.left || $slots.right }">
		<span v-if="$slots.left" class="page-heading__slot page-heading__slot--left">
			<slot name="left" />
		</span>
		<span class="page-heading__text">
			<!-- optional first line stacks above without a <br> -->
			<span v-if="line1" class="page-heading__line">{{ line1 }}</span
			><span class="page-heading__line"
				><!-- `lead` carries its own trailing space; between-tag whitespace is stripped
				-->{{ lead }}<span class="page-heading__accent">{{ accent }}</span></span
			>
		</span>
		<span v-if="$slots.right" class="page-heading__slot page-heading__slot--right">
			<slot name="right" />
		</span>
	</h1>
</template>

<script setup>
	defineProps({
		// text before the accent — keep the trailing space that separates the two
		lead: { type: String, required: true },
		// final word, rendered in yellow
		accent: { type: String, required: true },
		// optional line above the lead (the About hub greeting uses it)
		line1: { type: String, default: '' },
	})
</script>

<style scoped lang="scss">
	// The one page heading for the whole site: white pixel caps, last word yellow.
	.page-heading {
		margin: 1.75rem 0 0;
		font-family: $font-pixel;
		font-size: $heading-pixel-size;
		font-weight: normal;
		line-height: 1.5;
		text-transform: uppercase;
		// defer to the container instead of the global `p, h1 { text-align: center }`
		text-align: inherit;
		color: $white;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
		animation: heading-in 0.35s steps(4, end) both;
	}

	// steps up a whole 8px multiple rather than scaling through it
	@media (min-width: #{$breakpoint-desktop}) {
		.page-heading {
			font-size: $heading-pixel-size-lg;
		}
	}

	// icon-flanked variant: title holds the centre column, sprites sit either side
	.page-heading--flanked {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: center;
		column-gap: clamp(0.5rem, 1.5vw, 1rem);
	}

	.page-heading__slot {
		display: flex;
		align-items: center;
		justify-content: center;
		justify-self: center;
	}

	.page-heading__line {
		display: block;
	}

	.page-heading__accent {
		color: $yellow;
		text-shadow: 0 0 12px rgba($yellow, 0.45);
	}

	@keyframes heading-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.page-heading {
			animation: none;
		}
	}
</style>

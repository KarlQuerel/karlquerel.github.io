<template>
	<component :is="tag" class="page-heading">
		<!-- `lead` carries its own trailing space; between-tag whitespace is stripped
		-->{{ lead }}<span class="page-heading__accent">{{ accent }}</span>
	</component>
</template>

<script setup>
	defineProps({
		// heading level: h1 on standalone pages, h2 for stations within the landing
		tag: { type: String, default: 'h1' },
		// text before the accent — keep the trailing space that separates the two
		lead: { type: String, required: true },
		// final word, rendered in yellow
		accent: { type: String, required: true },
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

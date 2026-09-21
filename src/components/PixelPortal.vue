<template>
	<!-- icon-over-label tile for the arrival's contact channels (JourneyArrival) -->
	<a
		class="portal"
		:href="href"
		:target="blank ? '_blank' : undefined"
		:rel="blank ? 'noopener noreferrer' : undefined"
	>
		<span class="portal__icon">
			<img :src="image" alt="" class="portal__img" />
		</span>
		<span class="portal__label">{{ label }}</span>
	</a>
</template>

<script setup>
	defineProps({
		label: { type: String, required: true },
		image: { type: String, required: true },
		href: { type: String, required: true },
		blank: { type: Boolean, default: false },
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	$portal-radius: 4rem;
	$portal-icon-size: 5.5rem;
	$portal-pad-x: 1.4rem;
	$portal-pad-y: 0.9rem;
	// a step below $heading-pixel-size so page headings stay dominant
	$portal-label-size: px8(2);
	// Phone sizes: three tiles share one line, so the icon comes down and the padding with it.
	$portal-icon-size-mobile: 3.75rem;
	$portal-pad-mobile: 0.5rem;
	// One 8px step. Press Start 2P is drawn at 8px, so this is its native size, not a shrunk 16.
	$portal-label-size-mobile: px8(1);
	// The resting rim: one whole pixel, so it stays one on a retina screen too.
	$rim: 1px;
	$rim-colour: rgba($yellow, 0.85);

	.portal {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.1rem;
		// Fixed tile width so every tile in a row matches regardless of label length.
		width: calc(#{$portal-icon-size} + #{$portal-pad-x} * 2);
		padding: $portal-pad-y $portal-pad-x;
		text-decoration: none;
		// no plate behind the icon — the sprite sits straight on the sky
		@include void-button($bg: transparent);
	}

	// Separate rule so it overrides the mixin's radius without trailing it.
	.portal {
		border-radius: $portal-radius;
	}

	// Borderless: cancel the mixin's hover frame/lift so feedback lives on the icon + label.
	.portal,
	.portal:hover,
	.portal:focus-visible,
	.portal:active {
		border-color: transparent;
		box-shadow: none;
		transform: none;
	}

	// The bloom lives on the wrapper and the keyline on the sprite, so hover adds to the rest state
	// instead of replacing it: one filter cannot do both, and swapping them made the rim blink out.
	.portal__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: $portal-icon-size;
		height: auto;
		transition:
			transform 0.35s ease,
			filter 0.35s ease;
	}

	.portal__img {
		width: $portal-icon-size;
		height: auto;
		display: block;
		// the sprite is art pixels, not a photo: keep the grid hard the way every other surface does
		image-rendering: pixelated;
		// Rim-lit at rest, so the tile reads as a live control. It carries no frame, no plate and no
		// lift, and a bare grey shape with none of those is the shape of a disabled one whatever the
		// label says. Four hard offsets and no blur: the scene bands its colour, it does not glow.
		filter: drop-shadow($rim 0 0 $rim-colour) drop-shadow(-$rim 0 0 $rim-colour)
			drop-shadow(0 $rim 0 $rim-colour) drop-shadow(0 (-$rim) 0 $rim-colour);
	}

	.portal:hover .portal__icon,
	.portal:focus-visible .portal__icon {
		transform: scale(1.09) translateY(-5px);
		filter: drop-shadow(0 0 10px rgba($yellow, 0.8)) drop-shadow(0 0 24px rgba($yellow, 0.4));
		animation: icon-bloom 1.8s ease-in-out infinite;
	}

	@keyframes icon-bloom {
		0%,
		100% {
			filter: drop-shadow(0 0 8px rgba($yellow, 0.55))
				drop-shadow(0 0 18px rgba($yellow, 0.28));
		}
		50% {
			filter: drop-shadow(0 0 13px rgba($yellow, 0.9))
				drop-shadow(0 0 30px rgba($yellow, 0.5));
		}
	}

	.portal__label {
		// Natural width on one line: the fixed tile lets a long label overflow symmetrically.
		white-space: nowrap;
		font-family: $font-pixel;
		font-size: $portal-label-size;
		letter-spacing: 1px;
		color: $text-interactive;
		transition:
			color 0.35s ease,
			text-shadow 0.35s ease;
	}

	.portal:hover .portal__label,
	.portal:focus-visible .portal__label {
		color: $yellow;
		text-shadow: 0 0 12px rgba($yellow, 0.6);
	}

	// Reduced-motion: drop the icon scale and the hover pulse; the resting rim and the gold label read.
	@media (prefers-reduced-motion: reduce) {
		.portal:hover .portal__icon,
		.portal:focus-visible .portal__icon {
			transform: none;
			animation: none;
		}
	}

	// In a row on a phone the tile drops its fixed width, and the label drops a whole 8px step so
	// the longest of them still fits its own tile. The icons alone were too easy to misread once
	// they all went to the same grey.
	@media (max-width: $breakpoint-mobile) {
		.portal {
			width: auto;
			gap: 0.4rem;
			padding: $portal-pad-mobile;
		}

		.portal__icon,
		.portal__img {
			width: $portal-icon-size-mobile;
		}

		.portal__label {
			font-size: $portal-label-size-mobile;
		}
	}
</style>

<template>
	<!-- icon-over-label tile shared by the About hub (button) and Contact links (anchor) -->
	<component
		:is="href ? 'a' : 'button'"
		class="portal"
		:type="href ? undefined : 'button'"
		:href="href || undefined"
		:target="href && blank ? '_blank' : undefined"
		:rel="href && blank ? 'noopener noreferrer' : undefined"
	>
		<span class="portal__icon">
			<img :src="image" alt="" class="portal__img" />
		</span>
		<span class="portal__label">{{ label }}</span>
	</component>
</template>

<script setup>
	defineProps({
		label: { type: String, required: true },
		image: { type: String, required: true },
		// present → renders as a link; absent → a button (parent handles @click)
		href: { type: String, default: '' },
		blank: { type: Boolean, default: false },
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	$portal-radius: 4rem;
	$portal-icon-size: 5.5rem;
	$portal-pad-x: 1.4rem;
	$portal-pad-y: 0.9rem;
	// Fixed tile width (icon + horizontal padding) so every tile is the same size
	// regardless of label length — keeps icon spacing identical across the About
	// hub and Contact, and lets a long label overflow the tile symmetrically.
	$portal-tile-width: $portal-icon-size + $portal-pad-x * 2;
	// a step below $heading-pixel-size so page headings stay dominant
	$portal-label-size: clamp(0.85rem, 2.1vw, 1.1rem);

	.portal {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.1rem;
		width: $portal-tile-width;
		padding: $portal-pad-y $portal-pad-x;
		text-decoration: none;
		@include void-button(
			$bg: radial-gradient(
					125% 125% at 50% 38%,
					rgba(0, 0, 0, 0.55) 0%,
					rgba(0, 0, 0, 0.18) 68%,
					rgba(0, 0, 0, 0) 100%
				)
		);
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
		// Natural width, kept on one line: the fixed-width tile lets a long label
		// overflow symmetrically (centered over the icon) without widening the tile.
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

	// Reduced-motion: drop the icon scale + pulse; the static glow + yellow hover label still read.
	@media (prefers-reduced-motion: reduce) {
		.portal:hover .portal__icon,
		.portal:focus-visible .portal__icon {
			transform: none;
			animation: none;
		}
	}
</style>

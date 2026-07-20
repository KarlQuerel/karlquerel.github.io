<template>
	<!-- icon-over-label tile shared by the About hub (button) and Contact links (anchor) -->
	<component
		:is="href ? 'a' : 'button'"
		class="portal"
		:class="{ 'portal--compact': compact }"
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
		// scaled-down tile, for one standing apart from a row it must not compete with
		compact: { type: Boolean, default: false },
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	$portal-radius: 4rem;
	$portal-icon-size: 5.5rem;
	$portal-pad-x: 1.4rem;
	$portal-pad-y: 0.9rem;
	// a step below $heading-pixel-size so page headings stay dominant
	$portal-label-size: clamp(0.85rem, 2.1vw, 1.1rem);

	// Sizes travel as custom properties so a variant can rescale the whole tile
	// from one place; the defaults below are the full-size row tile.
	.portal {
		--portal-icon: #{$portal-icon-size};
		--portal-pad-x: #{$portal-pad-x};
		--portal-pad-y: #{$portal-pad-y};
		--portal-label: #{$portal-label-size};
		--portal-gap: 1.1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--portal-gap);
		// Fixed tile width (icon + horizontal padding) so every tile in a row is the
		// same size regardless of label length — keeps icon spacing identical across
		// the About hub and Contact, and lets a long label overflow symmetrically.
		width: calc(var(--portal-icon) + var(--portal-pad-x) * 2);
		padding: var(--portal-pad-y) var(--portal-pad-x);
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

	.portal--compact {
		--portal-icon: 3.4rem;
		--portal-pad-x: 1rem;
		--portal-pad-y: 0.7rem;
		--portal-label: clamp(0.6rem, 1.5vw, 0.75rem);
		--portal-gap: 0.8rem;
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
		width: var(--portal-icon);
		height: auto;
		transition:
			transform 0.35s ease,
			filter 0.35s ease;
	}

	.portal__img {
		width: var(--portal-icon);
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
		font-size: var(--portal-label);
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

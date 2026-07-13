<template>
	<!-- the only persistent chrome: a pixel star summoning the nav overlay; it flips into the close cue and stays above the dim (z 50 > 40) -->
	<button
		class="nav-toggle"
		:class="{ 'is-open': open, 'is-scrolled': hidden }"
		type="button"
		:aria-expanded="open"
		aria-controls="site-navbar"
		:aria-label="open ? 'Hide navigation' : 'Show navigation'"
		@click="$emit('toggle')"
	>
		<span class="nav-toggle__star" aria-hidden="true" />
		<span class="nav-toggle__label" aria-hidden="true">Menu</span>
	</button>
</template>

<script setup>
	import { useHideOnScroll } from '../composables/useHideOnScroll'

	defineProps({ open: { type: Boolean, default: false } })
	defineEmits(['toggle'])

	// "MENU" shows only at the top of the page and fades once you scroll
	const { hidden } = useHideOnScroll()
</script>

<style scoped lang="scss">
	// centred in both states — the star flares in place; the nav links drop in below it
	.nav-toggle {
		position: fixed;
		top: 0.8rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3.75rem;
		height: 3.75rem;
		padding: 0;
		background: none;
		border: 0;
		// strip the shared void-button frame; this control is just the bare star
		border-radius: 0;
		box-shadow: none;
		cursor: pointer;
		// resting cream, $yellow on hover; the glow lives on the star + halo, never the button box
		color: #fff3d6;
		transition: color 0.25s steps(3, end);
	}

	.nav-toggle:hover,
	.nav-toggle:focus-visible {
		color: $yellow;
	}

	// Breathing halo — marks the star as interactive, not decoration.
	.nav-toggle::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 78px;
		height: 78px;
		margin: -39px 0 0 -39px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba($yellow, 0.55) 0%, rgba($yellow, 0) 68%);
		opacity: 0.6;
		pointer-events: none;
		z-index: -1;
		animation: nav-breathe 2.6s ease-in-out infinite;
	}

	@keyframes nav-breathe {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(0.82);
		}
		50% {
			opacity: 0.85;
			transform: scale(1.18);
		}
	}

	// backing chip sits below the halo (z -2 < -1) so the bloom glows over the black
	.nav-toggle::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 60px;
		height: 60px;
		margin: -30px 0 0 -30px;
		background: $black;
		border-radius: $void-radius;
		z-index: -2;
		pointer-events: none;
	}

	// dim at page top, bright on hover, faded once scrolled (.is-scrolled), gone while open
	.nav-toggle__label {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%) translateY(0.3rem);
		font-family: $font-pixel;
		font-size: 0.6rem;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: $yellow;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		// yellow bloom + tight dark shadow keeps contrast over bright starfield patches
		text-shadow:
			0 0 10px rgba($yellow, 0.7),
			0 2px 4px rgba(0, 0, 0, 0.85);
		transition:
			opacity 0.2s steps(3, end),
			text-shadow 0.2s steps(3, end);
	}

	.nav-toggle:not(.is-open):not(.is-scrolled) .nav-toggle__label {
		opacity: 0.9;
	}

	.nav-toggle:not(.is-open):hover .nav-toggle__label,
	.nav-toggle:not(.is-open):focus-visible .nav-toggle__label {
		opacity: 1;
		text-shadow:
			0 0 14px rgba($yellow, 0.95),
			0 2px 4px rgba(0, 0, 0, 0.85);
	}

	// no focus ring in any state — the star's glow marks focus instead
	.nav-toggle:focus,
	.nav-toggle:focus-visible {
		outline: none;
	}

	// 4-point star: box-shadow copies form the arms + shoulders; currentColor tints with the button
	$p: 5px;
	.nav-toggle__star {
		position: relative;
		width: $p;
		height: $p;
		background: currentColor;
		box-shadow:
			0 #{$p * -4},
			0 #{$p * -3},
			0 #{$p * -2},
			0 #{$p * -1},
			0 #{$p * 1},
			0 #{$p * 2},
			0 #{$p * 3},
			0 #{$p * 4},
			#{$p * -4} 0,
			#{$p * -3} 0,
			#{$p * -2} 0,
			#{$p * -1} 0,
			#{$p * 1} 0,
			#{$p * 2} 0,
			#{$p * 3} 0,
			#{$p * 4} 0,
			#{$p * -1} #{$p * -1},
			#{$p * 1} #{$p * -1},
			#{$p * -1} #{$p * 1},
			#{$p * 1} #{$p * 1};
		rotate: 0deg;
		scale: 1.1;
		// drop-shadow traces the star's own silhouette (box-shadow arms included), not the button
		filter: drop-shadow(0 0 6px rgba($yellow, 0.7));
		transition:
			rotate 0.3s steps(3, end),
			scale 0.3s steps(3, end),
			filter 0.25s steps(3, end);
	}

	.nav-toggle:hover .nav-toggle__star,
	.nav-toggle:focus-visible .nav-toggle__star {
		filter: drop-shadow(0 0 9px rgba($yellow, 0.9));
	}

	// ring exists only under .is-open so the burst replays each open and never fires on close
	.nav-toggle__star::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 8px;
		height: 8px;
		margin: -4px 0 0 -4px;
		border: 2px solid currentColor;
		border-radius: 50%;
		opacity: 0;
		pointer-events: none;
	}

	// rotate 45° into an ✕, brighten, and hold — reads as a settled close cue
	.nav-toggle.is-open {
		color: $yellow;
	}

	.nav-toggle.is-open .nav-toggle__star {
		rotate: 45deg;
		scale: 1.4;
		filter: drop-shadow(0 0 9px rgba($yellow, 0.85));
	}

	.nav-toggle.is-open .nav-toggle__star::after {
		animation: supernova 0.5s steps(4, end) 1;
	}

	@keyframes supernova {
		from {
			opacity: 0.9;
			transform: scale(0.3);
		}
		to {
			opacity: 0;
			transform: scale(5);
		}
	}

	@media (max-width: $breakpoint-mobile) {
		.nav-toggle {
			top: 0.55rem;
		}
	}

	// reduced motion: kill twinkle/flip/burst; the static open/closed states still read
	@media (prefers-reduced-motion: reduce) {
		.nav-toggle__star,
		.nav-toggle.is-open .nav-toggle__star,
		.nav-toggle.is-open .nav-toggle__star::after {
			animation: none;
			transition: none;
		}

		// Freeze the halo into a steady glow so the star still stands out.
		.nav-toggle::before {
			animation: none;
			opacity: 0.6;
			transform: none;
		}
	}
</style>

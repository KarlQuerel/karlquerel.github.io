<template>
	<!-- The only persistent chrome: a pixel star — one of the backdrop's own stars
	     pulled forward — that summons the nav overlay (see SiteNavbar.vue). On open
	     it flares 45° into a brighter, held star and throws a one-shot supernova
	     ring; the flip doubles as the overlay's "close" (✕) cue. Stays above the
	     dim backdrop (z 50 > 40) so it keeps working while the menu is open. -->
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

	// Show the "MENU" label only at the top of a page; it fades away once you scroll
	// down and stays gone until you return to the top. The star itself stays put.
	const { hidden } = useHideOnScroll()
</script>

<style scoped lang="scss">
	// Centred at the top in both states — the star flares in place rather than
	// jumping to a corner. The revealed nav links drop in just below it (see
	// .site-chrome-bar--floating) so they never collide.
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
		// Square off — and strip the frame from — the shared void-button base that
		// every bare <button> inherits; this control is just the bare star.
		border-radius: 0;
		box-shadow: none;
		cursor: pointer;
		// Resting cream; shifts to $yellow on hover / focus. The glow lives on the
		// star itself (plus the halo) — never on the button box — so it hugs the star
		// shape instead of tracing the black chip's rectangle.
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

	// Borderless black backing chip, built on the shared $void radius. Sits one layer
	// below the halo (z -2 < the halo's z -1) so the yellow bloom glows *over* the
	// black instead of being hidden behind it — the stack is chip → halo → star.
	// Contrast over bright page content is handled separately.
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

	// "MENU" sits under the star: legible (dim) only at the top of a page so the
	// affordance is announced, full-bright on hover / focus, faded out once you
	// scroll away from the top (.is-scrolled) so it doesn't trail over content, and
	// gone while open (the flipped star reads as close).
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
		// Yellow bloom for the glow + a tight dark shadow so the text keeps its
		// contrast over bright starfield patches, not just the void.
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

	// No focus box in any state — keyboard focus is shown by the star's glow
	// brightening (see the star filter above) instead of a frame. `:focus` (not just
	// `:focus-visible`) is targeted on purpose: a mouse click fires `:focus`
	// without `:focus-visible`, and NES.css's global `button:focus` paints a
	// rounded `-webkit-focus-ring-color` outline that would otherwise show.
	.nav-toggle:focus,
	.nav-toggle:focus-visible {
		outline: none;
	}

	// A 4-point pixel star: this base pixel is the core; the box-shadow copies are
	// its four arms (single-pixel tips that widen to a 3-pixel band near the core)
	// plus four diagonal shoulders. That concave "pinched" silhouette — narrow
	// tips, wider middle — is what reads as a star instead of a plus. Colour is
	// `currentColor`, so the whole star tints with the button on hover / open.
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
		// Glow lives here, not on the button: drop-shadow traces the star's own
		// silhouette (box-shadow arms included), so it reads as the star lighting up.
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

	// The supernova shockwave: a ring that bursts out of the core. The rule (and so
	// the animation) exists only under .is-open, so it replays on every open and
	// never fires on close or first paint.
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

	// Flare open: rotate the star 45° into an ✕, brighten, and hold — the ✕ reads
	// as a settled "close" cue.
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

	// Kill the idle twinkle, the flip transition and the burst for anyone who asks
	// for less motion; the static open/closed star states still read clearly.
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

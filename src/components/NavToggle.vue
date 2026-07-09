<template>
	<!-- The only persistent chrome: a pixel star — one of the backdrop's own stars
	     pulled forward — that summons the nav overlay (see SiteNavbar.vue). On open
	     it flares 45° into a brighter, held star and throws a one-shot supernova
	     ring; the flip doubles as the overlay's "close" (✕) cue. Stays above the
	     dim backdrop (z 50 > 40) so it keeps working while the menu is open. -->
	<button
		class="nav-toggle"
		:class="{ 'is-open': open }"
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
	defineProps({ open: { type: Boolean, default: false } })
	defineEmits(['toggle'])
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
		width: 3rem;
		height: 3rem;
		padding: 0;
		background: none;
		border: 0;
		// Square off — and strip the frame from — the shared void-button base that
		// every bare <button> inherits; this control is just the bare star.
		border-radius: 0;
		box-shadow: none;
		cursor: pointer;
		// Bright and faintly self-lit so it reads as an interactive star against
		// the dark starfield instead of dissolving into it.
		color: #fff3d6;
		filter: drop-shadow(0 0 6px rgba($yellow, 0.55));
		transition:
			color 0.25s steps(3, end),
			filter 0.25s steps(3, end);
	}

	.nav-toggle:hover,
	.nav-toggle:focus-visible {
		color: $yellow;
		filter: drop-shadow(0 0 12px rgba($yellow, 0.85));
	}

	// Breathing halo — marks the star as interactive, not decoration.
	.nav-toggle::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 46px;
		height: 46px;
		margin: -23px 0 0 -23px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba($yellow, 0.5) 0%, rgba($yellow, 0) 68%);
		opacity: 0.5;
		pointer-events: none;
		z-index: -1;
		animation: nav-breathe 2.6s ease-in-out infinite;
	}

	@keyframes nav-breathe {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(0.82);
		}
		50% {
			opacity: 0.72;
			transform: scale(1.15);
		}
	}

	// "MENU" on hover / keyboard focus; hidden while open (the flipped star reads as close).
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
		text-shadow: 0 0 8px rgba($yellow, 0.5);
		transition: opacity 0.2s steps(3, end);
	}

	.nav-toggle:not(.is-open):hover .nav-toggle__label,
	.nav-toggle:not(.is-open):focus-visible .nav-toggle__label {
		opacity: 1;
	}

	// No focus box in any state — keyboard focus is shown by the star lighting up
	// (the yellow glow above) instead of a frame. `:focus` (not just
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
	$p: 3px;
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
		transition:
			rotate 0.3s steps(3, end),
			scale 0.3s steps(3, end);
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
		filter: drop-shadow(0 0 7px rgba($yellow, 0.7));
	}

	.nav-toggle.is-open .nav-toggle__star {
		rotate: 45deg;
		scale: 1.4;
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
			opacity: 0.5;
			transform: none;
		}
	}
</style>

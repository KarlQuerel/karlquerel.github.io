<template>
	<!-- Homepage-only control: the persistent navbar is stripped on the landing
	     (see App.vue) and this button reveals it on demand. A pixel arrow (the
	     same motif as the hero's scroll cue) points down to summon the bar and
	     flips up to hide it. -->
	<button
		class="nav-toggle"
		:class="{ 'is-open': open }"
		type="button"
		data-no-spark
		:aria-expanded="open"
		aria-controls="site-navbar"
		:aria-label="open ? 'Hide navigation' : 'Show navigation'"
		@click="$emit('toggle')"
	>
		<span class="nav-toggle__arrow" aria-hidden="true" />
	</button>
</template>

<script setup>
	defineProps({ open: { type: Boolean, default: false } })
	defineEmits(['toggle'])
</script>

<style scoped lang="scss">
	// Centred at the top in both states — the arrow flips in place rather than
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
		width: 2.6rem;
		height: 2.6rem;
		padding: 0;
		background: none;
		border: 0;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.6);
		transition:
			color 0.25s steps(3, end),
			filter 0.25s steps(3, end);
	}

	.nav-toggle:hover,
	.nav-toggle:focus-visible {
		color: $yellow;
		filter: drop-shadow(0 0 8px rgba($yellow, 0.6));
	}

	.nav-toggle:focus-visible {
		outline: 2px solid rgba(255, 255, 255, 0.75);
		outline-offset: 3px;
	}

	// A downward pixel triangle (5-3-1 rows) built from box-shadow copies of this
	// base pixel — the base sits at the triangle's centre so a 180° flip keeps it
	// put and just points it up. `rotate`/`translate` are separate properties so
	// the flip and the idle bob compose instead of fighting.
	$p: 4px;
	.nav-toggle__arrow {
		width: $p;
		height: $p;
		background: currentColor;
		box-shadow:
			#{$p * -2} #{$p * -1},
			#{$p * -1} #{$p * -1},
			0 #{$p * -1},
			#{$p} #{$p * -1},
			#{$p * 2} #{$p * -1},
			#{$p * -1} 0,
			#{$p} 0,
			0 #{$p};
		rotate: 0deg;
		transition: rotate 0.25s steps(3, end);
		animation: arrowBob 1.9s steps(3, end) infinite;
	}

	// Flip to point up; the bob stops so the ✕-equivalent reads as settled.
	.nav-toggle.is-open .nav-toggle__arrow {
		rotate: 180deg;
		animation: none;
	}

	@keyframes arrowBob {
		0%,
		100% {
			translate: 0 0;
		}
		50% {
			translate: 0 2px;
		}
	}

	@media (max-width: $breakpoint-mobile) {
		.nav-toggle {
			top: 0.55rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-toggle__arrow {
			animation: none;
			transition: none;
		}
	}
</style>

<template>
	<!-- Shared fixed backdrop behind every page except the game: a drifting
	     parallax pixel starfield over the black body. Purely decorative. -->
	<div class="space-bg" aria-hidden="true" />
</template>

<script setup></script>

<style scoped lang="scss">
	// Full-viewport layer pinned behind all content (negative z-index keeps it
	// under the navbar/footer/main without needing a per-page wrapper).
	.space-bg {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}

	// Two pure-CSS dot layers drift at different speeds (parallax). Both tiles
	// share a 260px height so pixelStarDrift loops each seamlessly by one tile.
	.space-bg::before,
	.space-bg::after {
		content: '';
		position: absolute;
		// Bleed past the edges so the repeating tiles never reveal a seam mid-drift.
		inset: -2px;
	}

	// Far layer: small, dim, slow.
	.space-bg::before {
		background-image:
			radial-gradient(1.5px 1.5px at 20px 30px, rgba($white, 0.75) 99%, transparent 100%),
			radial-gradient(1.5px 1.5px at 130px 80px, rgba($white, 0.5) 99%, transparent 100%),
			radial-gradient(1.5px 1.5px at 70px 170px, rgba($white, 0.6) 99%, transparent 100%),
			radial-gradient(1.5px 1.5px at 185px 210px, rgba($yellow, 0.65) 99%, transparent 100%),
			radial-gradient(1.5px 1.5px at 40px 235px, rgba($white, 0.55) 99%, transparent 100%);
		background-size: 220px 260px;
		animation: pixelStarDrift 90s linear infinite;
	}

	// Near layer: bigger, brighter, faster — reads as closer.
	.space-bg::after {
		background-image:
			radial-gradient(2px 2px at 60px 50px, rgba($white, 0.9) 99%, transparent 100%),
			radial-gradient(2px 2px at 230px 120px, rgba($yellow, 0.8) 99%, transparent 100%),
			radial-gradient(2px 2px at 150px 200px, rgba($white, 0.8) 99%, transparent 100%),
			radial-gradient(2px 2px at 285px 30px, rgba($white, 0.7) 99%, transparent 100%);
		background-size: 320px 260px;
		animation: pixelStarDrift 55s linear infinite;
	}

	@keyframes pixelStarDrift {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 0 -260px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.space-bg::before,
		.space-bg::after {
			animation: none;
		}
	}
</style>

<template>
	<!-- Shared fixed backdrop behind every page except the game: a drifting
	     parallax pixel starfield over the black body, plus the occasional pixel
	     shooting star streaking across. Purely decorative. -->
	<div class="space-bg" aria-hidden="true">
		<div
			v-for="star in shootingStars"
			:key="star.id"
			class="shooting-star"
			:style="star.style"
			@animationend="removeStar(star.id)"
		/>
	</div>
</template>

<script setup>
	import { ref, onMounted, onBeforeUnmount } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'

	// Sparse, tasteful comet streaks. Tints echo the starfield palette; weighted
	// toward plain white so the effect stays understated.
	const STAR_TINTS = ['#ffffff', '#ffffff', '#ffffff', '#00ccff', '#ffbd2e']
	const MIN_GAP_MS = 5500
	const MAX_GAP_MS = 14000

	const shootingStars = ref([])
	let nextId = 0
	let timer = 0

	function rand(min, max) {
		return min + Math.random() * (max - min)
	}

	function spawnStar() {
		// Skip while the tab is hidden — paused CSS animations never fire
		// `animationend`, so the elements would otherwise pile up off-screen.
		if (document.visibilityState === 'visible') {
			const id = nextId++
			shootingStars.value.push({
				id,
				style: {
					'--y': `${rand(0, 50)}%`,
					'--x': `${rand(-5, 55)}%`,
					'--angle': `${rand(12, 40)}deg`,
					'--len': `${rand(46, 86)}px`,
					'--travel': `${rand(90, 125)}vw`,
					'--dur': `${rand(0.7, 1.25)}s`,
					'--peak': rand(0.6, 0.95).toFixed(2),
					'--tint': STAR_TINTS[Math.floor(Math.random() * STAR_TINTS.length)],
				},
			})
		}
		scheduleNext()
	}

	function scheduleNext() {
		timer = window.setTimeout(spawnStar, rand(MIN_GAP_MS, MAX_GAP_MS))
	}

	function removeStar(id) {
		shootingStars.value = shootingStars.value.filter(star => star.id !== id)
	}

	onMounted(() => {
		if (prefersReducedMotion()) return
		scheduleNext()
	})

	onBeforeUnmount(() => window.clearTimeout(timer))
</script>

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

	// A comet: a crisp pixel head (::after) trailing a fading streak (background
	// gradient), rotated to its travel angle and flung across the viewport once.
	.shooting-star {
		position: absolute;
		top: var(--y);
		left: var(--x);
		width: var(--len);
		height: 2px;
		color: var(--tint);
		background: linear-gradient(to left, currentColor, transparent);
		opacity: 0;
		transform: rotate(var(--angle));
		transform-origin: center;
		image-rendering: pixelated;
		animation: shootingStar var(--dur) linear forwards;
	}

	.shooting-star::after {
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		width: 3px;
		height: 3px;
		margin-top: -1px;
		background: currentColor;
	}

	@keyframes shootingStar {
		0% {
			transform: rotate(var(--angle)) translateX(0);
			opacity: 0;
		}
		12% {
			opacity: var(--peak);
		}
		85% {
			opacity: var(--peak);
		}
		100% {
			transform: rotate(var(--angle)) translateX(var(--travel));
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.space-bg::before,
		.space-bg::after {
			animation: none;
		}
	}
</style>

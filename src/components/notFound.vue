<template>
	<div class="content">
		<h1 class="not-found-title" :style="driftStyle">
			<span>Page</span>
			<span>not</span>
			<span>found</span>
		</h1>
	</div>
</template>

<script setup>
	// Each visit gets a fresh wandering path, so the text never drifts the same
	// way twice. Three random waypoints feed the CSS keyframe via custom props.
	const rand = (min, max) => min + Math.random() * (max - min)

	const driftStyle = {
		'--x1': `${rand(-10, 10)}vw`,
		'--y1': `${rand(-8, 8)}vh`,
		'--r1': `${rand(-8, 8)}deg`,
		'--x2': `${rand(-10, 10)}vw`,
		'--y2': `${rand(-8, 8)}vh`,
		'--r2': `${rand(-8, 8)}deg`,
		'--x3': `${rand(-10, 10)}vw`,
		'--y3': `${rand(-8, 8)}vh`,
		'--r3': `${rand(-8, 8)}deg`,
	}
</script>

<style lang="scss" scoped>
	.not-found-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		font-size: 1.5rem;
		line-height: 1.1;
		color: $white;
		text-transform: uppercase;
		margin: 0;
		// Slow zero-gravity drift through a randomised set of waypoints, so the
		// text floats away on a different path every visit.
		animation: notFoundDrift 11s ease-in-out infinite;
		will-change: transform;
	}

	@keyframes notFoundDrift {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(var(--x1), var(--y1)) rotate(var(--r1));
		}
		50% {
			transform: translate(var(--x2), var(--y2)) rotate(var(--r2));
		}
		75% {
			transform: translate(var(--x3), var(--y3)) rotate(var(--r3));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.not-found-title {
			animation: none;
		}
	}
</style>

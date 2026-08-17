<template>
	<!-- pixel-art down arrow: this base pixel is the top-centre; box-shadow copies fan
	     out a 5x3 triangle. Bobs on its own clock, so the beat is stepped. Decorative. -->
	<span class="pixel-arrow" aria-hidden="true" />
</template>

<style scoped lang="scss">
	$arrow-pixel: 9px;

	.pixel-arrow {
		display: block;
		width: $arrow-pixel;
		height: $arrow-pixel;
		background: currentColor;
		box-shadow:
			#{$arrow-pixel * -2} 0,
			#{$arrow-pixel * -1} 0,
			#{$arrow-pixel} 0,
			#{$arrow-pixel * 2} 0,
			#{$arrow-pixel * -1} #{$arrow-pixel},
			0 #{$arrow-pixel},
			#{$arrow-pixel} #{$arrow-pixel},
			0 #{$arrow-pixel * 2};
		animation: arrowBob 1s steps(3, end) infinite;
	}

	@keyframes arrowBob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(0.35rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pixel-arrow {
			animation: none;
		}
	}
</style>

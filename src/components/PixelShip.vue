<template>
	<!-- pixel-art rocket, nose up: one base pixel per element, box-shadow copies fan
	     out the sprite (same technique as PixelArrow) — no image asset needed.
	     Shared by the hero launch beat and the landing page's flight. Decorative. -->
	<span class="pixel-ship" aria-hidden="true">
		<span class="pixel-ship__hull" />
		<span class="pixel-ship__flame" />
	</span>
</template>

<style scoped lang="scss">
	$px: 5px;

	// explicit box (9 x 12 cells) so consumers can centre and rotate the sprite
	.pixel-ship {
		position: relative;
		display: block;
		width: $px * 9;
		height: $px * 12;
	}

	.pixel-ship__hull {
		position: absolute;
		top: 0;
		left: $px * 4;
		width: $px;
		height: $px;
		background: $light-red; // base pixel = the nose tip
		box-shadow:
			// upper hull
			#{-$px} #{$px} $light-gray,
			0 #{$px} $light-gray,
			#{$px} #{$px} $light-gray,
			#{-$px} #{$px * 2} $light-gray,
			0 #{$px * 2} $light-gray,
			#{$px} #{$px * 2} $light-gray,
			#{-$px * 2} #{$px * 3} $light-gray,
			#{-$px} #{$px * 3} $light-gray,
			0 #{$px * 3} $light-gray,
			#{$px} #{$px * 3} $light-gray,
			#{$px * 2} #{$px * 3} $light-gray,
			// window row
			#{-$px * 2} #{$px * 4} $light-gray,
			#{-$px} #{$px * 4} $light-blue,
			0 #{$px * 4} $light-blue,
			#{$px} #{$px * 4} $light-blue,
			#{$px * 2} #{$px * 4} $light-gray,
			// lower hull
			#{-$px * 2} #{$px * 5} $light-gray,
			#{-$px} #{$px * 5} $light-gray,
			0 #{$px * 5} $light-gray,
			#{$px} #{$px * 5} $light-gray,
			#{$px * 2} #{$px * 5} $light-gray,
			#{-$px * 2} #{$px * 6} $light-gray,
			#{-$px} #{$px * 6} $light-gray,
			0 #{$px * 6} $light-gray,
			#{$px} #{$px * 6} $light-gray,
			#{$px * 2} #{$px * 6} $light-gray,
			#{-$px * 3} #{$px * 7} $light-gray,
			#{-$px * 2} #{$px * 7} $light-gray,
			#{-$px} #{$px * 7} $light-gray,
			0 #{$px * 7} $light-gray,
			#{$px} #{$px * 7} $light-gray,
			#{$px * 2} #{$px * 7} $light-gray,
			#{$px * 3} #{$px * 7} $light-gray,
			// skirt + fins
			#{-$px * 4} #{$px * 8} $light-red,
			#{-$px * 3} #{$px * 8} $light-gray,
			#{-$px * 2} #{$px * 8} $light-gray,
			#{-$px} #{$px * 8} $light-gray,
			0 #{$px * 8} $light-gray,
			#{$px} #{$px * 8} $light-gray,
			#{$px * 2} #{$px * 8} $light-gray,
			#{$px * 3} #{$px * 8} $light-gray,
			#{$px * 4} #{$px * 8} $light-red,
			#{-$px * 4} #{$px * 9} $light-red,
			#{-$px * 3} #{$px * 9} $light-red,
			#{-$px * 2} #{$px * 9} $light-gray,
			#{-$px} #{$px * 9} $light-gray,
			0 #{$px * 9} $light-gray,
			#{$px} #{$px * 9} $light-gray,
			#{$px * 2} #{$px * 9} $light-gray,
			#{$px * 3} #{$px * 9} $light-red,
			#{$px * 4} #{$px * 9} $light-red;
	}

	// exhaust: flickers in chunky steps beneath the skirt
	.pixel-ship__flame {
		position: absolute;
		top: $px * 10;
		left: $px * 4;
		width: $px;
		height: $px;
		background: $yellow;
		box-shadow:
			#{-$px} 0 $yellow,
			#{$px} 0 $yellow,
			0 #{$px} $light-red;
		animation: shipFlameFlicker 0.24s steps(2, end) infinite;
	}

	@keyframes shipFlameFlicker {
		0%,
		100% {
			transform: scaleY(1);
			opacity: 1;
		}
		50% {
			transform: scaleY(0.6);
			opacity: 0.75;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pixel-ship__flame {
			animation: none;
		}
	}
</style>

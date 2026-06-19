<template>
	<ol class="timeline">
		<li
			v-for="item in CAREER_TIMELINE"
			:key="item.year + item.title"
			v-reveal
			class="timeline-item"
			:class="{ 'is-current': item.current }"
		>
			<!-- Scenery in the grassland gutters; pops in with the card on scroll. -->
			<img
				v-for="(prop, p) in item.scenery"
				:key="p"
				class="timeline-scenery"
				:class="`is-${prop.side}`"
				:src="SCENERY_SPRITES[prop.key].src"
				:style="{
					'--scenery-w': `${SCENERY_SPRITES[prop.key].w}px`,
					'--scenery-top': prop.top,
					'--scenery-i': p,
				}"
				alt=""
				aria-hidden="true"
			/>
			<span class="timeline-node" aria-hidden="true" />
			<div class="timeline-card">
				<span class="timeline-year">{{ item.year }}</span>
				<h2 class="timeline-title">{{ item.title }}</h2>
				<span class="timeline-place">{{ item.place }}</span>
				<p class="timeline-summary">{{ item.summary }}</p>
			</div>
		</li>
	</ol>
</template>

<script setup>
	import { CAREER_TIMELINE, SCENERY_SPRITES } from '@/data/about'
	import { reveal as vReveal } from '@/directives/reveal'
</script>

<style scoped lang="scss">
	// Geometry for the rail + node so everything lines up off one source.
	$rail-x: 1.4rem; // horizontal centre of the dirt path
	$path-width: 1.6rem; // width of the pixel dirt trail
	$node-size: 1rem; // square marker on the path
	$card-gap: 1.5rem; // breathing room between path and card

	.timeline {
		position: relative;
		width: min(40rem, 94vw);
		margin: 0 auto;
		padding: 0;
		list-style: none;
		text-align: left;
	}

	// The rail: a pixel dirt trail running down the spine of the world.
	.timeline::before {
		content: '';
		position: absolute;
		top: 0.6rem;
		bottom: 0.6rem;
		left: $rail-x;
		width: $path-width;
		transform: translateX(-50%);
		background: url('/assets/about/path-tile.png') repeat-y center top;
		background-size: $path-width auto;
		image-rendering: pixelated;
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.35);
	}

	.timeline-item {
		position: relative;
		padding: 0 0 1.75rem ($rail-x + $card-gap);
		opacity: 0;
		transform: translateX(-8px);
	}

	.timeline-item.is-visible {
		animation: item-in 0.4s steps(4, end) forwards;
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	/***	SCENERY		***/
	// Pixel props parked in the grassland gutters either side of the column.
	// Hidden until the parent item reveals, then they pop up from the ground.
	.timeline-scenery {
		position: absolute;
		top: var(--scenery-top, 20%);
		width: var(--scenery-w, 48px);
		height: auto;
		image-rendering: pixelated;
		opacity: 0;
		transform: translateY(8px) scale(0.6);
		transform-origin: bottom center;
		pointer-events: none;
	}

	.timeline-scenery.is-left {
		right: calc(100% + 0.5rem);
	}

	.timeline-scenery.is-right {
		left: calc(100% + 0.5rem);
	}

	.timeline-item.is-visible .timeline-scenery {
		animation: scenery-pop 0.45s steps(3, end) forwards;
		// Stagger each prop just behind the card so the world fills in.
		animation-delay: calc(0.18s + var(--scenery-i, 0) * 0.12s);
	}

	// Square node sitting on the trail, ringed in black so it reads as a marker.
	.timeline-node {
		position: absolute;
		top: 0.75rem;
		left: $rail-x;
		width: $node-size;
		height: $node-size;
		transform: translateX(-50%);
		background: $yellow;
		box-shadow:
			0 0 0 3px $black,
			3px 3px 0 0 rgba(0, 0, 0, 0.5);
	}

	/***	CARD		***/
	.timeline-card {
		position: relative;
		padding: 0.9rem 1rem 1rem;
		background: rgba(0, 0, 0, 0.7);
		border: 4px solid $yellow;
		box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 0.5);
		text-align: left;
	}

	// Short tick bridging the trail node to the card.
	.timeline-card::before {
		content: '';
		position: absolute;
		top: 1rem;
		left: -$card-gap;
		width: $card-gap;
		height: 4px;
		background: $yellow;
	}

	.timeline-year {
		display: inline-block;
		margin-bottom: 0.55rem;
		padding: 0.25rem 0.5rem;
		font-family: $font-pixel;
		font-size: clamp(0.55rem, 1.6vw, 0.75rem);
		color: $black;
		background: $yellow;
		box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.4);
	}

	.timeline-title {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 2vw, 0.85rem);
		line-height: 1.5;
		color: $yellow;
	}

	.timeline-place {
		display: block;
		margin-top: 0.4rem;
		font-family: $font-pixel;
		font-size: clamp(0.4rem, 1.2vw, 0.5rem);
		color: rgba(255, 255, 255, 0.7);
	}

	.timeline-summary {
		margin: 0.6rem 0 0;
		font-size: clamp(0.8rem, 1.8vw, 0.95rem);
		line-height: 1.6;
		text-align: left;
		color: rgba(255, 255, 255, 0.85);
	}

	/***	CURRENT MILESTONE		***/
	.is-current .timeline-node {
		box-shadow:
			0 0 0 3px $black,
			0 0 12px 3px rgba(255, 189, 46, 0.85);
		animation: node-blink 1.1s steps(2, jump-none) infinite;
	}

	.is-current .timeline-card {
		box-shadow:
			6px 6px 0 0 rgba(0, 0, 0, 0.5),
			0 0 0 2px $yellow inset;
	}

	@keyframes item-in {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes scenery-pop {
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes node-blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
		100% {
			opacity: 1;
		}
	}

	// On narrow screens the grassland gutters vanish — drop the props so they
	// never spill across the cards or force a horizontal scroll.
	@media (max-width: $breakpoint-mobile) {
		.timeline-scenery {
			display: none;
		}
	}

	// Honour reduced-motion: show everything, kill the animation.
	@media (prefers-reduced-motion: reduce) {
		.timeline-item,
		.timeline-scenery {
			opacity: 1;
			transform: none;
			animation: none;
		}

		.is-current .timeline-node {
			animation: none;
		}
	}
</style>

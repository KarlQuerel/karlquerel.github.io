<template>
	<div class="content about">
		<header class="about-head">
			<h1 class="about-name">KARL QUEREL</h1>
			<p v-for="(line, i) in ABOUT_INTRO" :key="i" class="about-intro">{{ line }}</p>
		</header>

		<ol class="timeline">
			<li
				v-for="(item, i) in CAREER_TIMELINE"
				:key="item.year + item.title"
				class="timeline-item"
				:class="{ 'is-current': item.current }"
				:style="{ '--delay': `${i * 90}ms` }"
			>
				<span class="timeline-node" aria-hidden="true" />
				<div class="timeline-card">
					<span class="timeline-year">{{ item.year }}</span>
					<h2 class="timeline-title">{{ item.title }}</h2>
					<span class="timeline-place">{{ item.place }}</span>
					<p class="timeline-summary">{{ item.summary }}</p>
				</div>
			</li>
		</ol>
	</div>
</template>

<script setup>
	import { ABOUT_INTRO, CAREER_TIMELINE } from '@/data/about'
</script>

<style scoped lang="scss">
	// Geometry for the rail + node so everything lines up off one source.
	$rail-x: 1.25rem; // horizontal centre of the vertical line
	$node-size: 1rem; // square node on the rail
	$card-gap: 1.5rem; // breathing room between rail and card

	.about {
		gap: 2.5rem;
		padding: 2.5rem 1rem 4rem;
	}

	/***	HEADER		***/
	.about-name {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(1rem, 4vw, 1.8rem);
		line-height: 1.5;
		letter-spacing: 2px;
		color: $yellow;
		text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.6);
	}

	.about-intro {
		max-width: 42ch;
		margin: 0.5rem auto 0;
		font-size: clamp(0.85rem, 2vw, 1rem);
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.85);
	}

	/***	TIMELINE		***/
	.timeline {
		position: relative;
		width: min(40rem, 94vw);
		margin: 0 auto;
		padding: 0;
		list-style: none;
		text-align: left;
	}

	// The rail: a dashed yellow line so it reads as stepped 8-bit pixels.
	.timeline::before {
		content: '';
		position: absolute;
		top: 0.6rem;
		bottom: 0.6rem;
		left: $rail-x;
		width: 4px;
		transform: translateX(-50%);
		background: repeating-linear-gradient(
			to bottom,
			$yellow 0,
			$yellow 8px,
			transparent 8px,
			transparent 15px
		);
	}

	.timeline-item {
		position: relative;
		padding: 0 0 1.75rem ($rail-x + $card-gap);
		opacity: 0;
		transform: translateX(-8px);
		animation: item-in 0.4s steps(4, end) forwards;
		animation-delay: var(--delay, 0ms);
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	// Square node sitting on the rail, ringed in black so the dashes don't bleed.
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
		background: rgba(0, 0, 0, 0.55);
		border: 4px solid $yellow;
		box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 0.5);
		text-align: left;
	}

	// Short tick bridging the rail node to the card.
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

	// Honour reduced-motion: show everything, kill the animation.
	@media (prefers-reduced-motion: reduce) {
		.timeline-item {
			opacity: 1;
			transform: none;
			animation: none;
		}

		.is-current .timeline-node {
			animation: none;
		}
	}
</style>

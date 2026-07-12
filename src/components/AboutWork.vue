<template>
	<ol class="timeline">
		<li
			v-for="item in CAREER_TIMELINE"
			:key="item.year + item.title"
			v-reveal
			class="timeline-item"
			:class="{ 'is-current': item.current }"
		>
			<span class="timeline-year">{{ item.year }}</span>
			<div class="timeline-body">
				<h2 class="timeline-title">{{ item.title }}</h2>
				<span class="timeline-place">{{ item.place }}</span>
				<p class="timeline-summary">{{ item.summary }}</p>
			</div>
		</li>
	</ol>
</template>

<script setup>
	import { CAREER_TIMELINE } from '@/data/about'
	import { reveal as vReveal } from '@/directives/reveal'
</script>

<style scoped lang="scss">
	// Editorial-ledger career timeline: a right-aligned year column, a hairline rule
	// (the single rail) carrying a small dot per entry, then the content. Soft shadows,
	// no blink; gold is reserved for the current milestone.
	$year-w: 3.5rem;
	$col-gap: 1.5rem;
	$rule-x: $year-w + $col-gap * 0.5;

	.timeline {
		position: relative;
		width: min(40rem, 94vw);
		margin: 0 auto;
		padding: 0;
		list-style: none;
		text-align: left;
	}

	.timeline::before {
		content: '';
		position: absolute;
		top: 0.4rem;
		bottom: 0.4rem;
		left: $rule-x;
		width: 1px;
		background: rgba(255, 255, 255, 0.18);
	}

	.timeline-item {
		position: relative;
		display: grid;
		grid-template-columns: $year-w 1fr;
		column-gap: $col-gap;
		padding-bottom: 1.9rem;
		opacity: 0;
		transform: translateX(-8px);
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	.timeline-item.is-visible {
		animation: item-in 0.4s steps(4, end) forwards;
	}

	// Small refined dot on the rule, aligned with the title line.
	.timeline-item::before {
		content: '';
		position: absolute;
		top: 0.5rem;
		left: $rule-x;
		width: 5px;
		height: 5px;
		transform: translateX(-50%);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.35);
	}

	.timeline-year {
		grid-column: 1;
		padding-top: 0.15rem;
		text-align: right;
		font-family: $font-pixel;
		font-size: clamp(0.5rem, 1.4vw, 0.65rem);
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.5);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	.timeline-body {
		grid-column: 2;
	}

	.timeline-title {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 1.9vw, 0.8rem);
		line-height: 1.5;
		color: $white;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
	}

	.timeline-place {
		display: block;
		margin-top: 0.35rem;
		font-family: $font-pixel;
		font-size: clamp(0.4rem, 1.2vw, 0.5rem);
		color: rgba(255, 255, 255, 0.5);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	.timeline-summary {
		margin: 0.55rem 0 0;
		font-size: clamp(0.8rem, 1.8vw, 0.95rem);
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.8);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.95);
	}

	.timeline-item.is-current .timeline-title {
		color: $yellow;
	}

	.timeline-item.is-current .timeline-year {
		color: rgba($yellow, 0.85);
	}

	.timeline-item.is-current::before {
		background: $yellow;
		box-shadow: 0 0 8px 1px rgba($yellow, 0.7);
	}

	// `item-in` keyframes are global (see _animations.scss).
	@media (prefers-reduced-motion: reduce) {
		.timeline-item {
			opacity: 1;
			transform: none;
			animation: none;
		}
	}
</style>

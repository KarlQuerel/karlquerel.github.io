<template>
	<ol class="ztl">
		<li
			v-for="(item, i) in CAREER_TIMELINE"
			:key="item.year + item.title"
			v-reveal
			class="ztl-item"
			:class="[i % 2 === 0 ? 'is-left' : 'is-right', { 'is-current': item.current }]"
		>
			<p v-if="item.chapter" class="ztl-chapter">{{ item.chapter }}</p>
			<div class="ztl-card">
				<span class="ztl-year">{{ item.year }}</span>
				<span class="ztl-kind" :class="`ztl-kind--${item.type}`">{{
					CAREER_TYPE_LABELS[item.type]
				}}</span>
				<h2 class="ztl-title">{{ item.title }}</h2>
				<span class="ztl-school">{{ item.place }}</span>
				<span class="ztl-location">
					<PixelFlag :country="item.flag" />
					{{ item.location }}
				</span>
				<p v-if="item.summary" class="ztl-summary">{{ item.summary }}</p>
			</div>
		</li>
	</ol>
</template>

<script setup>
	import { CAREER_TIMELINE, CAREER_TYPE_LABELS } from '@/data/about'
	import { reveal as vReveal } from '@/directives/reveal'
	import PixelFlag from '@/components/PixelFlag.vue'
</script>

<style scoped lang="scss">
	// zigzag timeline: borderless cards alternating left/right, gold reserved for the current milestone
	$slide: 28px;
	// single vertical rhythm for every line in a card
	$row-gap: 0.35rem;

	.ztl {
		width: min(52rem, 94vw);
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}

	.ztl-item {
		padding-bottom: 2.4rem;
	}

	.ztl-item:last-child {
		padding-bottom: 0;
	}

	// chapter break: pixel-dash rule on the centerline marking the finance → software era split
	.ztl-chapter {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 0 0 2.4rem;
		font-family: $font-pixel;
		font-size: clamp(0.44rem, 1.3vw, 0.56rem);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba($yellow, 0.72);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
		opacity: 0;
	}

	.ztl-chapter::before,
	.ztl-chapter::after {
		content: '';
		flex: 1;
		height: 2px;
		background: repeating-linear-gradient(
			to right,
			rgba(255, 255, 255, 0.28) 0 6px,
			transparent 6px 12px
		);
	}

	.ztl-item.is-visible .ztl-chapter {
		animation: card-in 0.5s steps(6, end) forwards;
	}

	// one gap carries the rhythm; is-left / is-right set the alignment side + slide-in origin
	.ztl-card {
		display: flex;
		flex-direction: column;
		gap: $row-gap;
		padding: 0.9rem 1.2rem;
		// hidden until v-reveal marks it visible
		opacity: 0;
	}

	.is-left .ztl-card {
		align-items: flex-start;
		text-align: left;
		background: radial-gradient(
			80% 130% at 6% 50%,
			rgba(0, 0, 0, 0.68) 0%,
			rgba(0, 0, 0, 0.4) 52%,
			rgba(0, 0, 0, 0) 100%
		);
		transform: translateX(-$slide);
	}

	.is-right .ztl-card {
		align-items: flex-end;
		text-align: right;
		background: radial-gradient(
			80% 130% at 94% 50%,
			rgba(0, 0, 0, 0.68) 0%,
			rgba(0, 0, 0, 0.4) 52%,
			rgba(0, 0, 0, 0) 100%
		);
		transform: translateX($slide);
	}

	// slide home on reveal; the page-wide overflow-x clip (_layout.scss) absorbs the offset
	.ztl-item.is-visible .ztl-card {
		animation: card-in 0.5s steps(6, end) forwards;
	}

	@keyframes card-in {
		to {
			opacity: 1;
			transform: none;
		}
	}

	// muted gold beat down the zigzag; the current milestone brightens to full gold
	.ztl-year {
		font-family: $font-pixel;
		font-size: clamp(0.5rem, 1.4vw, 0.65rem);
		line-height: 1.4;
		letter-spacing: 0.12em;
		color: rgba($yellow, 0.72);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	// per-type kicker in cool phosphor hues, kept clear of the gold "current" signal
	.ztl-kind {
		font-family: $font-pixel;
		font-size: clamp(0.4rem, 1.2vw, 0.5rem);
		line-height: 1.4;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	.ztl-kind--study {
		color: $tag-education;
	}

	.ztl-kind--job {
		color: $tag-experience;
	}

	.ztl-title {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 1.9vw, 0.8rem);
		line-height: 1.4;
		color: $white;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
	}

	// stepped down from full white so the title stays the single headline
	.ztl-school {
		font-family: $font-pixel;
		font-size: clamp(0.52rem, 1.5vw, 0.64rem);
		line-height: 1.4;
		color: rgba(255, 255, 255, 0.72);
		text-shadow: 0 1px 5px rgba(0, 0, 0, 0.95);
	}

	// Pixel flag + city on one row; is-right puts the flag on the outer edge.
	.ztl-location {
		display: flex;
		align-items: center;
		gap: 0.5em;
		line-height: 1.2;
		font-family: $font-pixel;
		font-size: clamp(0.42rem, 1.2vw, 0.52rem);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: $light-gray;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	.is-right .ztl-location {
		flex-direction: row-reverse;
	}

	// standout milestones only; readable VT323 so a full sentence reads as a caption, not a wall
	.ztl-summary {
		margin: 0;
		// the global `p { text-align: center }` (_layout.scss) would otherwise centre it
		text-align: inherit;
		font-family: $font-terminal;
		font-size: clamp(1rem, 2.2vw, 1.2rem);
		line-height: 1.3;
		color: rgba(255, 255, 255, 0.7);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.95);
	}

	// Current milestone: gold title + year.
	.is-current .ztl-title {
		color: $yellow;
	}

	.is-current .ztl-year {
		color: $yellow;
	}

	@media (prefers-reduced-motion: reduce) {
		.ztl-card,
		.ztl-chapter {
			opacity: 1;
		}

		// match is-left / is-right specificity or the side offset never clears
		.is-left .ztl-card,
		.is-right .ztl-card {
			transform: none;
		}

		.ztl-item.is-visible .ztl-card,
		.ztl-item.is-visible .ztl-chapter {
			animation: none;
		}
	}
</style>

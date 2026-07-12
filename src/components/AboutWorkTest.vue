<template>
	<ol class="ztl">
		<li
			v-for="(item, i) in CAREER_TIMELINE"
			:key="item.year + item.title"
			v-reveal
			class="ztl-item"
			:class="[i % 2 === 0 ? 'is-left' : 'is-right', { 'is-current': item.current }]"
		>
			<div class="ztl-card">
				<span class="ztl-year">{{ item.year }}</span>
				<h2 class="ztl-title">{{ item.title }}</h2>
				<span class="ztl-place">{{ item.place }}</span>
				<p class="ztl-summary">{{ item.summary }}</p>
			</div>
		</li>
	</ol>
</template>

<script setup>
	import { CAREER_TIMELINE } from '@/data/about'
	import { reveal as vReveal } from '@/directives/reveal'
</script>

<style scoped lang="scss">
	// Zigzag timeline (test layout): full-width borderless cards stacked down the
	// page, their content alternating left / right so the titles zigzag. No rail —
	// the alternating alignment carries the rhythm. Each card is "borderless" (a
	// soft dark glow anchored to its side, never a frame) and slides in from that
	// side on scroll. Gold is reserved for the current milestone.
	$slide: 28px;

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

	// Full-width borderless card: no frame, just a soft dark glow anchored to the
	// card's side to keep the text legible over the starfield.
	.ztl-card {
		padding: 0.9rem 1.2rem;
		// Hidden until scrolled into view; the per-side offset lives on is-left /
		// is-right so each card slides in from its own side.
		opacity: 0;
	}

	.is-left .ztl-card {
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
		text-align: right;
		background: radial-gradient(
			80% 130% at 94% 50%,
			rgba(0, 0, 0, 0.68) 0%,
			rgba(0, 0, 0, 0.4) 52%,
			rgba(0, 0, 0, 0) 100%
		);
		transform: translateX($slide);
	}

	// Revealed on scroll (v-reveal adds is-visible): slide home from the side.
	// `overflow-x` is clipped page-wide (see _layout.scss) so the offset never
	// spawns a horizontal scrollbar.
	.ztl-item.is-visible .ztl-card {
		animation: card-in 0.5s steps(6, end) forwards;
	}

	@keyframes card-in {
		to {
			opacity: 1;
			transform: none;
		}
	}

	.ztl-year {
		display: block;
		font-family: $font-pixel;
		font-size: clamp(0.5rem, 1.4vw, 0.65rem);
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.5);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	.ztl-title {
		margin: 0.4rem 0 0;
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 1.9vw, 0.8rem);
		line-height: 1.5;
		color: $white;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
	}

	.ztl-place {
		display: block;
		margin-top: 0.35rem;
		font-family: $font-pixel;
		font-size: clamp(0.4rem, 1.2vw, 0.5rem);
		color: rgba(255, 255, 255, 0.5);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	.ztl-summary {
		margin: 0.55rem 0 0;
		// Follow the card's side alignment — the global `p { text-align: center }`
		// (see _layout.scss) would otherwise centre every summary.
		text-align: inherit;
		font-size: clamp(0.8rem, 1.8vw, 0.95rem);
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.8);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.95);
	}

	// Current milestone: gold title + year, matching the WORK timeline.
	.is-current .ztl-title {
		color: $yellow;
	}

	.is-current .ztl-year {
		color: rgba($yellow, 0.85);
	}

	@media (prefers-reduced-motion: reduce) {
		.ztl-card {
			opacity: 1;
		}

		// Match the is-left / is-right specificity so the per-side slide offset is
		// actually cleared (a bare `.ztl-card` rule would lose to it).
		.is-left .ztl-card,
		.is-right .ztl-card {
			transform: none;
		}

		.ztl-item.is-visible .ztl-card {
			animation: none;
		}
	}
</style>

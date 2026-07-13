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
	// Zigzag career timeline: full-width borderless cards stacked down the page, their
	// content alternating left / right so the titles zigzag. No rail — the alternating
	// alignment carries the rhythm. Each card is "borderless" (a soft dark glow anchored
	// to its side, never a frame) and slides in from that side on scroll. Gold is
	// reserved for the current milestone.
	$slide: 28px;
	// Single vertical rhythm for every line in a card — change here to retune spacing
	// everywhere at once.
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

	// One flex column with a single gap so every line shares the same vertical rhythm —
	// no per-element margins to drift out of sync. is-left / is-right set the side each
	// row aligns to (and the slide-in origin).
	.ztl-card {
		display: flex;
		flex-direction: column;
		gap: $row-gap;
		padding: 0.9rem 1.2rem;
		// Hidden until scrolled into view; the per-side offset lives on is-left /
		// is-right so each card slides in from its own side.
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

	// Muted gold accent on every card — a consistent "beat" down the zigzag that
	// reinforces the timeline without competing with the white title. The current
	// milestone brightens to full gold (see .is-current below).
	.ztl-year {
		font-family: $font-pixel;
		font-size: clamp(0.5rem, 1.4vw, 0.65rem);
		line-height: 1.4;
		letter-spacing: 0.12em;
		color: rgba($yellow, 0.72);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	// Category kicker — small caps, coloured per milestone type. Cool phosphor hues
	// (kept clear of the gold accent) so the category reads as a quiet tag, subordinate
	// to the gold "current" signal.
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

	// School — stepped down from full white so the degree title stays the single
	// headline; it's a strong subhead, not a co-equal white line.
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

	// Reserved for standout milestones only (e.g. the 42 pivot). Set in the readable
	// VT323 console font — not the blocky pixel face — so a full sentence reads as a
	// soft caption instead of a wall, and dimmed so it never rivals the title.
	.ztl-summary {
		margin: 0;
		// Follow the card's side alignment — the global `p { text-align: center }`
		// (see _layout.scss) would otherwise centre every summary.
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

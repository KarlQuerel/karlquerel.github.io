<template>
	<ol class="ztl">
		<li
			v-for="item in ROWS"
			:key="item.from + item.title"
			v-reveal
			class="ztl-item"
			:class="{ 'is-current': item.current }"
		>
			<p v-if="item.chapter" class="ztl-chapter">{{ item.chapter }}</p>
			<div class="ztl-row">
				<!-- emblem = the timeline node -->
				<div class="ztl-art">
					<span class="ztl-tick ztl-tick--start">{{ item.from }}</span>
					<span class="ztl-badge" :class="`ztl-badge--${item.type}`">
						<PixelEmblem :emblem="item.emblem" class="ztl-emblem" />
					</span>
					<span v-if="item.end" class="ztl-tick ztl-tick--end">{{ item.end }}</span>
				</div>
				<div class="ztl-card">
					<span class="ztl-kind" :class="`ztl-kind--${item.type}`">{{
						CAREER_TYPE_LABELS[item.type]
					}}</span>
					<h2 class="ztl-title">{{ item.title }}</h2>
					<span class="ztl-school" :class="`ztl-school--${item.type}`">{{
						item.place
					}}</span>
					<span class="ztl-location">
						<PixelFlag :country="item.flag" />
						{{ item.location }}
					</span>
					<p v-if="item.detail" class="ztl-detail">{{ item.detail }}</p>
				</div>
			</div>
		</li>
	</ol>
</template>

<script setup>
	import { CAREER_TIMELINE, CAREER_TYPE_LABELS } from '@/data/about'
	import { reveal as vReveal } from '@/directives/reveal'
	import PixelFlag from '@/components/PixelFlag.vue'
	import PixelEmblem from '@/components/PixelEmblem.vue'

	// A closing year is dropped when the next entry opens on it, so a shared boundary is
	// drawn once — the surviving tick is the next row's start. What's left is a strictly
	// increasing axis; only the open-ended current role still carries a closing tick.
	const ROWS = CAREER_TIMELINE.map((item, i) => ({
		...item,
		end: CAREER_TIMELINE[i + 1]?.from === item.to ? null : item.to,
	}))
</script>

<style scoped lang="scss">
	@use 'sass:color';
	@use '@/styles/mixins' as *;

	$row-gap: 0.3rem;
	$rail-w: 3px;
	$badge: clamp(2.6rem, 6.5vw, 3.4rem);
	$emblem-ghost: 0.88;
	$tick-gap: 0.25rem;
	$chevron: 2ch; // the '> ' prefix, exact in the monospace terminal face

	.ztl {
		// column + text gutter come from the shared About tokens, set on `.about`
		--rail-center: 2rem;
		position: relative;
		width: var(--about-column);
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}

	// dashed gold spine threading every node
	.ztl::before {
		content: '';
		position: absolute;
		left: var(--rail-center);
		transform: translateX(-50%);
		top: 1.5rem;
		bottom: 1.5rem;
		width: $rail-w;
		background: repeating-linear-gradient(
			to bottom,
			rgba($yellow, 0.45) 0 6px,
			transparent 6px 12px
		);
	}

	// all of this lands under the caption, so it reads as the caption's own padding
	.ztl-item {
		position: relative;
		padding-bottom: 1.5rem;
	}

	.ztl-item:last-child {
		padding-bottom: 0;
	}

	// chapter break: dashed rules flank the label and cut across the rail. Both flanks
	// take flex: 1, so the label centres on the column on its own.
	.ztl-chapter {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 0.4rem 0 2rem;
		font-family: $font-pixel;
		font-size: $type-title;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: $yellow;
		text-shadow:
			0 1px 4px rgba(0, 0, 0, 0.95),
			0 0 14px rgba($yellow, 0.45);
		opacity: 0;
	}

	.ztl-chapter::before,
	.ztl-chapter::after {
		content: '';
		flex: 1;
		height: 3px;
		background: repeating-linear-gradient(
			to right,
			rgba($yellow, 0.5) 0 6px,
			transparent 6px 12px
		);
	}

	.ztl-row {
		@include void-scrim($at: 34% 50%);
		position: relative;
		min-height: 4.6rem;
		padding: 0.4rem 0 0.4rem var(--about-gutter);
		opacity: 0;
	}

	// badge rides the rail, centred against the text block. Years hang off it rather than
	// stacking with it, so the badge holds its place whether or not this row closes a period.
	.ztl-art {
		position: absolute;
		left: var(--rail-center);
		top: 50%;
		transform: translate(-50%, -50%);
	}

	// opaque so each tick punches a gap in the dashed spine behind it
	.ztl-tick {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		// the badge is the containing block, so a multi-word tick would wrap inside it
		white-space: nowrap;
		font-family: $font-pixel;
		font-size: $type-label;
		line-height: 1;
		letter-spacing: 0.08em;
		padding: 0.2rem 0.15rem;
		background: rgba(0, 0, 0, 0.85);
		color: rgba($yellow, 0.72);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	.ztl-tick--start {
		bottom: 100%;
		margin-bottom: $tick-gap;
	}

	.ztl-tick--end {
		top: 100%;
		margin-top: $tick-gap;
	}

	.ztl-badge {
		@include void-panel(rgba(0, 0, 0, 0.55));
		display: block;
		width: $badge;
		height: $badge;
		// tight padding lets the sprite fill the frame
		padding: 0.16rem;
	}

	// type-tinted frame doubles as the education / experience signal
	.ztl-badge--study {
		border: 2px solid rgba($tag-education, 0.6);
		background:
			linear-gradient(0deg, rgba($tag-education, 0.16), rgba($tag-education, 0.16)),
			rgba(0, 0, 0, 0.6);
	}

	.ztl-badge--job {
		border: 2px solid rgba($tag-experience, 0.6);
		background:
			linear-gradient(0deg, rgba($tag-experience, 0.16), rgba($tag-experience, 0.16)),
			rgba(0, 0, 0, 0.6);
	}

	// contain via SVG preserveAspectRatio so every sprite fits the same square
	.ztl-emblem {
		display: block;
		width: 100%;
		height: 100%;
		opacity: $emblem-ghost;
	}

	.ztl-badge :deep(.pixel-emblem__svg) {
		height: 100%;
	}

	.ztl-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: $row-gap;
		text-align: left;
	}

	.ztl-kind {
		font-family: $font-pixel;
		font-size: $type-label;
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
		font-size: $type-title;
		line-height: 1.4;
		color: $white;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
	}

	// school / employer — type-tinted so the institution reads as its own beat instead
	// of trailing off under the white title
	.ztl-school {
		// prose face, not display: institution names are read, and Press Start 2P
		// mangles the accents in "Grand Lycée Franco-Libanais" at this size
		font-family: $font-terminal;
		font-size: $type-prose-sm;
		line-height: 1.5;
		text-shadow: 0 1px 5px rgba(0, 0, 0, 0.95);
	}

	.ztl-school--study {
		color: $tag-education;
	}

	.ztl-school--job {
		// lifted off $tag-experience: the raw purple is too dark for a whole line of type
		color: color.scale($tag-experience, $lightness: 38%);
	}

	.ztl-location {
		display: flex;
		align-items: center;
		gap: 0.5em;
		line-height: 1.2;
		font-family: $font-terminal;
		font-size: $type-prose-sm;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: $light-gray;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	// caption closing the card. The terminal face keeps it subordinate to the pixel
	// type above it, and the chevron echoes the terminal voice used across the site.
	.ztl-detail {
		// 64ch of text plus the hanging chevron; the About column caps this well before it bites
		max-width: calc(64ch + #{$chevron});
		// the card's flex gap is tuned for pixel type; the caption wants a touch more air
		margin: 0.35rem 0 0;
		font-family: $font-terminal;
		// a whole step below the LIFE prose: captions stay secondary, and 11px is the
		// only crisp size under Departure Mono's 22px
		font-size: $type-prose-sm;
		line-height: 1.45;
		// global `p` is centred (_layout.scss) — the card reads as a left-aligned stack
		text-align: left;
		// captions soft-wrap to the column; `pretty` only trims a last-line orphan, where
		// `balance` would shorten every line to match and leave the caption floating short
		text-wrap: pretty;
		// hanging indent: wrapped lines sit under the text, not back under the chevron,
		// the way a wrapped command hangs off a terminal prompt
		padding-left: $chevron;
		text-indent: -$chevron;
		color: $text-caption;
		text-shadow: 0 1px 5px rgba(0, 0, 0, 0.95);
	}

	.ztl-detail::before {
		content: '> ';
		color: rgba($yellow, 0.7);
	}

	.is-current .ztl-badge {
		border: 2px solid rgba($yellow, 0.7);
		background:
			linear-gradient(0deg, rgba($yellow, 0.16), rgba($yellow, 0.16)), rgba(0, 0, 0, 0.6);
		box-shadow: 0 0 12px rgba($yellow, 0.35);
	}

	.is-current .ztl-title {
		color: $yellow;
	}

	.is-current .ztl-tick {
		color: $yellow;
	}

	.ztl-item.is-visible .ztl-row,
	.ztl-item.is-visible .ztl-chapter {
		animation: card-in 0.5s steps(6, end) forwards;
	}

	@keyframes card-in {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (max-width: $breakpoint-mobile) {
		.ztl {
			--rail-center: 1.6rem;
		}

		.ztl-badge {
			width: 2.6rem;
			height: 2.6rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ztl-row,
		.ztl-chapter {
			opacity: 1;
			transform: none;
		}

		.ztl-item.is-visible .ztl-row,
		.ztl-item.is-visible .ztl-chapter {
			animation: none;
		}
	}
</style>

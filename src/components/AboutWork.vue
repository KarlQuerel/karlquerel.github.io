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
					<!-- country stamped on the node, where the eye lands first -->
					<PixelFlag :country="item.flag" class="ztl-flag" />
					<span v-if="item.end" class="ztl-tick ztl-tick--end">{{ item.end }}</span>
				</div>
				<div class="ztl-card">
					<p class="ztl-kind" :class="`ztl-kind--${item.type}`">
						{{ CAREER_TYPE_LABELS[item.type] }}
						<span class="ztl-span">{{ item.from }} – {{ item.to }}</span>
					</p>
					<h3 class="ztl-title">{{ item.title }}</h3>
					<component
						:is="item.url ? 'a' : 'span'"
						:href="item.url"
						:target="item.url && '_blank'"
						:rel="item.url && 'noopener'"
						class="ztl-school"
						:class="`ztl-school--${item.type}`"
					>
						{{ item.place }}
					</component>
					<!-- the flag on the badge names the country; the text only adds the city -->
					<span class="ztl-location">
						{{ item.city }}<span class="sr-only">, {{ item.country }}</span>
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

	// A closing year is dropped when the next entry opens on it, so a shared boundary is drawn once.
	const ROWS = CAREER_TIMELINE.map((item, i) => {
		const [city, country] = item.location.split(', ')
		return {
			...item,
			city,
			country,
			end: CAREER_TIMELINE[i + 1]?.from === item.to ? null : item.to,
		}
	})
</script>

<style scoped lang="scss">
	@use 'sass:color';
	@use '@/styles/mixins' as *;

	$row-gap: 0.3rem;
	$badge: clamp(2.6rem, 6.5vw, 3.4rem);
	$emblem-ghost: 0.88;
	$tick-gap: 0.25rem;

	.ztl {
		// column + text gutter come from the shared tokens set on the WORK station
		--rail-center: 2rem;
		position: relative;
		width: var(--about-column);
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}

	// No spine here: the journey's route (JourneyRoute) runs through the timeline at --rail-center.

	// all of this lands under the caption, so it reads as the caption's own padding
	.ztl-item {
		position: relative;
		padding-bottom: 1.5rem;
	}

	.ztl-item:last-child {
		padding-bottom: 0;
	}

	// chapter break: dashed rules flank the label; both flanks take flex: 1, so the label self-centres
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
		position: relative;
		min-height: 4.6rem;
		padding: 0.4rem 0 0.4rem var(--about-gutter);
		opacity: 0;
	}

	// badge rides the rail, centred on the text block; years hang off it so the badge holds its place
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
		border-radius: 30px;
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
		border-radius: 30px;
	}

	// stamped on the badge's lower-right shoulder, clear of the closing tick hanging under it
	.ztl-flag {
		position: absolute;
		right: -0.3rem;
		bottom: -0.1rem;
		--flag-height: clamp(0.85rem, 2.1vw, 1.1rem);
		--flag-shadow:
			0 0 0 2px rgba(0, 0, 0, 0.9), 0 0 0 3px rgba(255, 255, 255, 0.22),
			0 2px 4px rgba(0, 0, 0, 0.9);
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

	// The hover lands on the ROW, not the badge: the badge is aria-hidden, and a 2.6rem target is small.
	@mixin node-lit($c, $k: 1) {
		border-color: rgba($c, 0.6 + 0.35 * $k);
		box-shadow:
			0 0 0 2px rgba($c, 0.45 * $k),
			0 0 0 5px rgba($c, 0.2 * $k),
			0 0 0 9px rgba($c, 0.07 * $k);
	}

	// Stepped, like every other transition the hand drives here.
	@media (hover: hover) {
		.ztl-badge {
			transition:
				border-color 0.2s steps(3, end),
				box-shadow 0.2s steps(3, end);
		}

		.ztl-emblem {
			transition: opacity 0.2s steps(3, end);
		}

		// off its ghost and up to full ink, so the sprite reads as switched on
		.ztl-row:hover .ztl-emblem {
			opacity: 1;
		}

		// the years are the node's own label, so they come up with it
		.ztl-tick {
			transition: color 0.2s steps(3, end);
		}

		.ztl-row:hover .ztl-tick {
			color: $yellow;
		}

		.ztl-row:hover .ztl-badge--study {
			@include node-lit($tag-education);
		}

		.ztl-row:hover .ztl-badge--job {
			@include node-lit($tag-experience);
		}

		// the current post already wears the yellow; hovering it just turns it up
		.is-current .ztl-row:hover .ztl-badge {
			@include node-lit($yellow);
		}

		@media (prefers-reduced-motion: reduce) {
			.ztl-badge,
			.ztl-emblem {
				transition: none;
			}
		}
	}

	.ztl-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: $row-gap;
		padding: 0.75rem 1rem;
		text-align: left;
		// the same borderless dark wash the LIFE cards carry
		background: rgba(0, 0, 0, 0.3);
		border-radius: 30px;
	}

	.ztl-kind {
		display: flex;
		flex-wrap: wrap;
		gap: 0 1.2em;
		margin: 0;
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

	// the years, dimmed next to the kind: the ticks anchor the rail, this line answers "how long"
	.ztl-span {
		color: rgba($light-gray, 0.7);
	}

	// prose face, not display: Press Start 2P advances a full 1em per glyph, so a degree ate three lines
	.ztl-title {
		margin: 0;
		font-family: $font-terminal;
		font-size: $type-prose;
		line-height: 1.4;
		color: $white;
		text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
	}

	// school / employer — type-tinted so the institution reads as its own beat
	.ztl-school {
		// prose face: institution names are read, and Press Start 2P mangles the accents at this size
		font-family: $font-terminal;
		font-size: $type-prose-md;
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

	// linked institutions keep their tint; the underline only appears in hand
	a.ztl-school {
		text-decoration: none;
	}

	a.ztl-school:hover,
	a.ztl-school:focus-visible {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.ztl-location {
		display: block;
		line-height: 1.2;
		font-family: $font-terminal;
		font-size: $type-prose-sm;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: $light-gray;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95);
	}

	// caption closing the card: the terminal face keeps it subordinate to the pixel type above
	.ztl-detail {
		// the About column caps this well before it bites
		max-width: 64ch;
		// a half-step off the stack above: still the card's own last line, not a footnote under it
		margin: 0.4rem 0 0;
		font-family: $font-terminal;
		// A step below the LIFE prose: at the 11px floor this was the smallest type in the station.
		font-size: $type-prose-md;
		line-height: 1.45;
		// global `p` is centred (_layout.scss) — the card reads as a left-aligned stack
		text-align: left;
		// `pretty` only trims a last-line orphan, where `balance` would leave the caption floating short
		text-wrap: pretty;
		color: $text-caption;
		text-shadow: 0 1px 5px rgba(0, 0, 0, 0.95);
	}

	.is-current .ztl-badge {
		border: 2px solid;
		background:
			linear-gradient(0deg, rgba($yellow, 0.16), rgba($yellow, 0.16)), rgba(0, 0, 0, 0.6);
		// rings, not a 12px bloom: it was the one blurred glow in a scene that quantises everything else
		@include node-lit($yellow, 0.45);
	}

	.is-current .ztl-title {
		color: $yellow;
	}

	// the "Now" tick hangs where the stamp sits, so the stamp climbs the shoulder to clear it
	.is-current .ztl-flag {
		right: -0.55rem;
		bottom: 0.3rem;
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

		// 22px wrapped long degrees onto three lines; 16px is the only other size this face reads at
		.ztl-title {
			font-size: $type-prose-md;
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

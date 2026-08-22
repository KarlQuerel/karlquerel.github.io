<template>
	<!-- Progress rail: one diamond per station along a track that fills as the
	     journey passes them. Every stop is a same-page anchor, so it doubles as
	     the landing page's navigation. -->
	<nav class="rail" aria-label="Journey sections">
		<div class="rail__track" :style="trackStyle">
			<span class="rail__fill" aria-hidden="true" />
			<RouterLink
				v-for="(stop, i) in JOURNEY_STOPS"
				:key="stop.to"
				:to="stop.to"
				class="rail__stop"
				:class="{ 'is-here': i === active }"
				:aria-current="i === active ? 'true' : undefined"
			>
				<span class="rail__diamond" aria-hidden="true" />
				<span class="rail__label">{{ stop.label }}</span>
			</RouterLink>
		</div>
	</nav>
</template>

<script setup>
	import { computed } from 'vue'
	import { RouterLink } from 'vue-router'
	import { JOURNEY_STOPS } from '@/constants/navigation'

	const props = defineProps({
		// index of the station currently in view
		active: { type: Number, default: 0 },
	})

	// how far down the track the lit segment reaches
	const trackStyle = computed(() => ({
		'--rail-progress': props.active / Math.max(1, JOURNEY_STOPS.length - 1),
	}))
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	$rail-diamond: 8px;
	$rail-gap: 0.65rem;
	// vertical padding on each stop: the diamond stays 8px, the tap target does not
	$rail-stop-pad: 0.35rem;
	// the track runs under the diamonds' centre line, between the outer two
	$rail-track-x: calc(#{$rail-diamond} / 2 - 1px);
	$rail-track-inset: calc(#{$rail-stop-pad} + #{$rail-diamond} / 2);

	.rail {
		position: fixed;
		left: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		z-index: 20;
	}

	// Carries the stops and the track art. Separate from .rail so the mobile
	// scrim below can pad the outside without shifting the track off the diamonds.
	.rail__track {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: $rail-gap;
	}

	// unlit track behind the diamonds
	.rail__track::before {
		content: '';
		position: absolute;
		left: $rail-track-x;
		top: $rail-track-inset;
		bottom: $rail-track-inset;
		width: 2px;
		background: rgba($white, 0.16);
	}

	// the stretch already flown, lit
	.rail__fill {
		position: absolute;
		left: $rail-track-x;
		top: $rail-track-inset;
		width: 2px;
		height: calc((100% - #{$rail-track-inset} * 2) * var(--rail-progress, 0));
		background: rgba($yellow, 0.75);
		box-shadow: 0 0 6px rgba($yellow, 0.4);
		transition: height 0.25s steps(4, end);
	}

	.rail__stop {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: $rail-stop-pad 0;
		text-decoration: none;
		color: $text-interactive;
	}

	// Invisible hit area, grown past the 8px glyph. A pseudo-element rather than
	// padding, so the diamond stays put on the track line.
	.rail__stop::after {
		content: '';
		position: absolute;
		inset: -0.15rem -0.35rem;
	}

	.rail__diamond {
		flex: none;
		width: $rail-diamond;
		height: $rail-diamond;
		background: rgba($white, 0.35);
		// a pixel square turned 45° — the void system's waypoint glyph
		transform: rotate(45deg);
		transition:
			background 0.2s steps(3, end),
			box-shadow 0.2s steps(3, end);
	}

	// Labels stay up rather than waiting on hover: the rail is the only way to
	// reach the stations, so it has to read as navigation at a glance.
	.rail__label {
		font-family: $font-pixel;
		font-size: px8(1);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		white-space: nowrap;
		// keyline, not a drop shadow: the labels cross the planet's lit limb
		@include pixel-keyline($unit: 1px, $halo: 4px);
		opacity: 0.55;
		transition:
			opacity 0.2s steps(3, end),
			color 0.2s steps(3, end);
	}

	.rail__stop:hover .rail__diamond,
	.rail__stop:focus-visible .rail__diamond {
		background: $yellow;
	}

	.rail__stop:hover .rail__label,
	.rail__stop:focus-visible .rail__label {
		opacity: 1;
		color: $yellow;
	}

	.is-here .rail__diamond {
		background: $yellow;
		box-shadow: 0 0 8px rgba($yellow, 0.6);
	}

	.is-here .rail__label {
		opacity: 1;
		color: $yellow;
	}

	// Phones keep the rail — with the nav trimmed it is the only route to the
	// stations — but a left rail fights the reading column at this width, so it
	// turns into a horizontal strip pinned along the bottom, out of the text and
	// inside thumb reach. Labels go; the diamonds and the lit track carry it.
	@media (max-width: $breakpoint-mobile) {
		.rail {
			@include void-panel(rgba($black, 0.55));

			& {
				// bottom-left, opposite corner to the pinned bug chip
				left: 1rem;
				top: auto;
				bottom: 1rem;
				transform: none;
				padding: 0.5rem 0.7rem;
			}
		}

		.rail__track {
			flex-direction: row;
			gap: 1.4rem;
		}

		// same track, laid on its side: ends at the outer diamonds' centres
		.rail__track::before,
		.rail__fill {
			left: calc(#{$rail-diamond} / 2);
			top: calc(#{$rail-track-inset} - 1px);
			bottom: auto;
			height: 2px;
		}

		.rail__track::before {
			right: calc(#{$rail-diamond} / 2);
			width: auto;
		}

		.rail__fill {
			width: calc((100% - #{$rail-diamond}) * var(--rail-progress, 0));
			transition: width 0.25s steps(4, end);
		}

		.rail__label {
			display: none;
		}

		// no label to widen the row, so the hit area carries the whole target —
		// the gap stays wider than the expansion, so neighbours never overlap
		.rail__stop::after {
			inset: -0.65rem -0.65rem;
		}
	}
</style>

<template>
	<!-- Final approach, pinned for the whole runway: the planet (PlanetStage,
	     behind) flattens into a horizon while the contact portals surface. -->
	<div class="arrival">
		<PlanetEntry :progress="progress" />
		<!-- the air rushing past on the way in: the same field the departure flies
		     through, so the two ends of the trip read as one piece of motion -->
		<FlightDust :travel="dustTravel" :fade="dustFade" :heat="dustHeat" />
		<div class="arrival__content">
			<header class="arrival__head arrival__reveal" :class="revealClass(0)">
				<PageTitle tag="h2" :lead="CONTACT_HEADING.lead" :accent="CONTACT_HEADING.accent" />
			</header>

			<ul class="arrival__channels">
				<li
					v-for="(channel, i) in CONTACT_CHANNELS"
					:key="channel.key"
					class="arrival__reveal"
					:class="revealClass(i + 1)"
				>
					<PixelPortal
						:label="channel.label"
						:image="channel.icon"
						:href="channel.href"
						:blank="channel.blank"
					/>
				</li>
			</ul>

			<!-- a console's title menu, not a web button: one item today, CONTINUE joins it once the game saves -->
			<RouterLink
				class="arrival__menu arrival__reveal"
				:class="revealClass(MENU_INDEX)"
				:to="GAME_MENU.to"
			>
				<svg
					class="arrival__cursor"
					viewBox="0 0 4 7"
					shape-rendering="crispEdges"
					aria-hidden="true"
				>
					<rect x="0" y="0" width="1" height="7" />
					<rect x="1" y="1" width="1" height="5" />
					<rect x="2" y="2" width="1" height="3" />
					<rect x="3" y="3" width="1" height="1" />
				</svg>
				{{ GAME_MENU.label }}
			</RouterLink>

			<!-- secondary action, pinned to the pin (not the page): only present at the planet -->
			<a
				class="arrival__report arrival__reveal"
				:class="revealClass(REPORT_INDEX)"
				:href="BUG_REPORT.issueUrl"
				:aria-label="BUG_REPORT.ariaLabel"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img class="arrival__report-icon" :src="BUG_REPORT.icon" alt="" />
				{{ BUG_REPORT.label }}
			</a>
		</div>
	</div>
</template>

<script setup>
	import { computed, ref, watch } from 'vue'
	import { RouterLink } from 'vue-router'
	import { ARRIVAL } from '@/constants/journey'
	import { BUG_REPORT, CONTACT_CHANNELS, CONTACT_HEADING, GAME_MENU } from '@/data/contact'
	import { riseFall, smoothstep } from '@/js/math'
	import FlightDust from './FlightDust.vue'
	import PageTitle from './PageTitle.vue'
	import PixelPortal from './PixelPortal.vue'
	import PlanetEntry from './PlanetEntry.vue'

	const props = defineProps({
		// 0 → entry begins, 1 → landed (portals live)
		progress: { type: Number, default: 0 },
	})

	// Travel is what turns a mote into a streak, so it climbs across the whole entry.
	const dustTravel = computed(() => props.progress * ARRIVAL.dustTravel)
	const dustFade = computed(() =>
		smoothstep(riseFall(props.progress, ARRIVAL.dustFrom, ARRIVAL.dustFull, ARRIVAL.dustOut))
	)

	// the burn: the same field rides the ember ramp while the air bites hardest
	const dustHeat = computed(() =>
		smoothstep(riseFall(props.progress, ARRIVAL.heatFrom, ARRIVAL.heatFull, ARRIVAL.heatOut))
	)

	// Behind the heading and every portal: the menu, then the chip last of all.
	const MENU_INDEX = CONTACT_CHANNELS.length + 1
	const REPORT_INDEX = MENU_INDEX + 1

	// One item's place in the queue: it is up once the surface window reaches it.
	const threshold = index => ARRIVAL.contactFadeStart + index * ARRIVAL.contactStagger
	const revealed = index => props.progress > threshold(index)

	// Scrolling back up plays the pop backwards, but only for a tile that has actually been up.
	const peak = ref(0)
	watch(
		() => props.progress,
		p => (peak.value = Math.max(peak.value, p))
	)
	const revealClass = index => ({
		'is-up': revealed(index),
		'is-down': !revealed(index) && peak.value > threshold(index),
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.arrival {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
	}

	// clear sky above the horizon carries the heading + portals; fills the pin so the chip can anchor
	.arrival__content {
		position: absolute;
		inset: 0;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: $page-pad-top 1rem 0;
		// full-screen layer over the scene: only the controls inside it take the pointer
		pointer-events: none;
	}

	.arrival__channels li,
	.arrival__report {
		pointer-events: auto;
	}

	// The surface content lands tile by tile, each on its own clock once its threshold is crossed.
	$pop-rise: 40px;
	$pop-squash: 0.72;
	$pop-span: 0.45s;
	$pop-steps: 5;

	.arrival__reveal {
		// hidden, not just transparent: a tile off-stage must not catch a click or a tab stop
		visibility: hidden;
		opacity: 0;
		translate: 0 $pop-rise;
		scale: $pop-squash;
	}

	// An animation, not a transition: pinned-chip's own hover transition would win the property.
	.arrival__reveal.is-up {
		visibility: visible;
		animation: arrival-pop $pop-span steps($pop-steps, end) forwards;
	}

	@keyframes arrival-pop {
		to {
			opacity: 1;
			translate: none;
			scale: 1;
		}
	}

	// the pop backwards: only `from` is declared, so it settles into the base off-stage state
	.arrival__reveal.is-down {
		animation: arrival-drop $pop-span steps($pop-steps, end) forwards;
	}

	@keyframes arrival-drop {
		from {
			visibility: visible;
			opacity: 1;
			translate: none;
			scale: 1;
		}
	}

	// keeps the fade, drops the travel: with no offset to start from, only opacity animates
	@media (prefers-reduced-motion: reduce) {
		.arrival__reveal {
			translate: none;
			scale: 1;
		}
	}

	// No page-head scrim here: its dark box edges harshly against the light dusk sky.
	.arrival__head {
		margin: 0 auto;
		padding: 1.75rem 1.5rem 2rem;
	}

	.arrival__head :deep(.page-heading) {
		@include pixel-keyline;
	}

	// the accent word's own shadow would replace the border, so it takes it too
	.arrival__head :deep(.page-heading__accent) {
		@include pixel-keyline($halo: 0.5em, $halo-colour: rgba($yellow, 0.5));
	}

	.arrival__channels {
		list-style: none;
		@include portal-row;
	}

	// Pixel caps behind a blinking cursor, no frame: the keyline holds it off the sky like the heading.
	.arrival__menu {
		pointer-events: auto;
		display: inline-flex;
		// baseline, not center: the caps stand on the baseline and the cursor is exactly their 7 cells tall
		align-items: baseline;
		gap: 1rem;
		// a clear beat under the portals: the menu is its own thing, not a fourth label
		margin-top: 3.5rem;
		padding: 0.5rem 0.9rem;
		font-family: $font-pixel;
		font-size: px8(3);
		letter-spacing: 1px;
		text-transform: uppercase;
		text-decoration: none;
		// yellow at rest, unlike the white portal labels: the accent colour is what the eye lands on
		color: $yellow;
		transition: color 0.3s ease;
		@include pixel-keyline($unit: 1px, $halo: 6px, $halo-colour: rgba($yellow, 0.5));
	}

	// the selected item goes to full white, as a console menu highlights the row in hand
	.arrival__menu:hover,
	.arrival__menu:focus-visible {
		outline: none;
		color: $white;
	}

	.arrival__cursor {
		position: relative;
		// the face draws its caps one cell above the baseline; the cursor climbs the same cell
		top: -0.125em;
		width: 0.5em;
		height: 0.875em;
		fill: $yellow;
		// zero-blur shadows on every side: the keyline, for a shape text-shadow cannot reach
		filter: drop-shadow(1px 0 0 $black) drop-shadow(-1px 0 0 $black) drop-shadow(0 1px 0 $black)
			drop-shadow(0 -1px 0 $black);
		animation: cursor-blink 1s steps(1, end) infinite;
	}

	// the cursor settles on the item in hand
	.arrival__menu:hover .arrival__cursor,
	.arrival__menu:focus-visible .arrival__cursor {
		animation: none;
	}

	@keyframes cursor-blink {
		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.arrival__cursor {
			animation: none;
		}
	}

	.arrival__report {
		@include pinned-chip;

		// pinned to the pin, not the viewport: it arrives and leaves with the planet
		& {
			position: absolute;
		}
	}

	.arrival__report-icon {
		width: 1.6em;
		height: auto;
	}

	@media (max-width: $breakpoint-mobile) {
		// the pin can't scroll, so the stacked portals must fit a phone viewport
		.arrival__content {
			padding-top: $chrome-clearance-mobile;
		}

		.arrival__channels {
			& {
				margin-top: 1rem;
				gap: 1.5rem;
			}
		}

		// the bottom row is already the rail and the chip, so the menu stays in flow, tight under the
		// portals and one pixel step down to fit the frame
		.arrival__menu {
			margin-top: 0.75rem;
			font-size: px8(2);
		}
	}
</style>

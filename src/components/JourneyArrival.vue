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
	import { ARRIVAL } from '@/constants/journey'
	import { BUG_REPORT, CONTACT_CHANNELS, CONTACT_HEADING } from '@/data/contact'
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

	// The chip is the last thing out, behind the heading and every portal.
	const REPORT_INDEX = CONTACT_CHANNELS.length + 1

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
	}
</style>

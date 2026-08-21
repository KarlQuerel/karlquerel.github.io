<template>
	<!-- Final approach, pinned for the whole runway: the planet (PlanetStage,
	     behind) flattens into a horizon while the contact portals surface. -->
	<div class="arrival">
		<PlanetEntry :progress="progress" />
		<!-- the air rushing past on the way in: the same field the departure flies
		     through, so the two ends of the trip read as one piece of motion -->
		<FlightDust :travel="dustTravel" :fade="dustFade" />
		<div class="arrival__content" :style="contentStyle">
			<header class="arrival__head">
				<PageTitle tag="h2" :lead="CONTACT_HEADING.lead" :accent="CONTACT_HEADING.accent" />
			</header>

			<ul class="arrival__channels">
				<li v-for="channel in CONTACT_CHANNELS" :key="channel.key">
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
				class="arrival__report"
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
	import { computed } from 'vue'
	import { ARRIVAL } from '@/constants/journey'
	import { BUG_REPORT, CONTACT_CHANNELS, CONTACT_HEADING } from '@/data/contact'
	import { clamp01, smoothstep } from '@/js/math'
	import FlightDust from './FlightDust.vue'
	import PageTitle from './PageTitle.vue'
	import PixelPortal from './PixelPortal.vue'
	import PlanetEntry from './PlanetEntry.vue'

	const props = defineProps({
		// 0 → entry begins, 1 → landed (portals live)
		progress: { type: Number, default: 0 },
	})

	// Travel is what turns a mote into a streak, so it climbs across the whole entry.
	// The fade brings the field up as the descent bites and takes it out once we are
	// under the deck — streaks past that point would read as still falling.
	const dustTravel = computed(() => props.progress * ARRIVAL.dustTravel)
	const dustFade = computed(() => {
		const up = clamp01(
			(props.progress - ARRIVAL.dustFrom) / (ARRIVAL.dustFull - ARRIVAL.dustFrom)
		)
		const out = clamp01(
			(ARRIVAL.dustOut - props.progress) / (ARRIVAL.dustOut - ARRIVAL.dustFull)
		)
		return smoothstep(Math.min(up, out))
	})

	const contentT = computed(() =>
		clamp01(
			(props.progress - ARRIVAL.contactFadeStart) /
				(ARRIVAL.contactFadeEnd - ARRIVAL.contactFadeStart)
		)
	)
	// hidden (not just transparent) until the fade starts, so the links can't
	// catch clicks or focus mid-approach
	const contentStyle = computed(() => ({
		opacity: contentT.value.toFixed(3),
		visibility: contentT.value > 0 ? null : 'hidden',
		pointerEvents: contentT.value > 0.5 ? null : 'none',
	}))
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.arrival {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
	}

	// clear sky above the horizon carries the heading + portals; fills the pin so
	// the report chip can anchor to its true corner
	.arrival__content {
		position: absolute;
		inset: 0;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: $page-pad-top 1rem 0;
	}

	// No page-head scrim here: its dark box edges harshly against the light dusk sky.
	// The keyline carries the contrast instead — over a bright horizon and a lit ridge,
	// the words need holding off the scene from every side.
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

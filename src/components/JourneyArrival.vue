<template>
	<!-- Final approach, pinned for the whole runway: the planet (PlanetStage,
	     behind) flattens into a horizon while the contact portals surface. -->
	<div class="arrival">
		<PlanetEntry :progress="progress" />
		<!-- the air rushing past on the way in: the same field the departure flies
		     through, so the two ends of the trip read as one piece of motion -->
		<FlightDust :travel="dustTravel" :fade="dustFade" />
		<div class="arrival__content">
			<header class="arrival__head" :style="revealStyle(0)">
				<PageTitle tag="h2" :lead="CONTACT_HEADING.lead" :accent="CONTACT_HEADING.accent" />
			</header>

			<ul class="arrival__channels">
				<li
					v-for="(channel, i) in CONTACT_CHANNELS"
					:key="channel.key"
					:style="revealStyle(i + 1)"
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
				class="arrival__report"
				:style="revealStyle(REPORT_INDEX)"
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
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { ARRIVAL } from '@/constants/journey'
	import { BUG_REPORT, CONTACT_CHANNELS, CONTACT_HEADING } from '@/data/contact'
	import { backOut, clamp01, smoothstep } from '@/js/math'
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

	// The chip is the last thing out, behind the heading and every portal.
	const REPORT_INDEX = CONTACT_CHANNELS.length + 1

	const still = prefersReducedMotion()

	// One item's slice of the surface window, by its place in the queue: it fades up
	// while it rises and springs out of its squash, so the row lands tile by tile.
	function revealStyle(index) {
		const start = ARRIVAL.contactFadeStart + index * ARRIVAL.contactStagger
		const t = clamp01((props.progress - start) / ARRIVAL.contactItemSpan)
		// hidden (not just transparent) before its turn, so a tile still off-stage
		// can't catch a click or a tab stop
		if (t <= 0) return { visibility: 'hidden' }
		// reduced motion keeps the fade and drops the travel: pop pinned at its target
		const pop = still ? 1 : backOut(t)
		return {
			opacity: smoothstep(t).toFixed(3),
			translate: `0 ${((1 - pop) * ARRIVAL.contactRise).toFixed(2)}px`,
			scale: (ARRIVAL.contactSquash + (1 - ARRIVAL.contactSquash) * pop).toFixed(3),
		}
	}
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
		// full-screen layer over the scene: only the controls inside it take the pointer
		pointer-events: none;
	}

	.arrival__channels li,
	.arrival__report {
		pointer-events: auto;
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

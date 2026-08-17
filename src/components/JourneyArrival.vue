<template>
	<!-- Final approach, pinned for the whole runway: the planet (PlanetStage,
	     behind) flattens into a horizon while the contact portals surface. -->
	<div class="arrival">
		<PlanetEntry :progress="progress" />
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
	import { clamp01 } from '@/js/math'
	import PageTitle from './PageTitle.vue'
	import PixelPortal from './PixelPortal.vue'
	import PlanetEntry from './PlanetEntry.vue'

	const props = defineProps({
		// 0 → entry begins, 1 → landed (portals live)
		progress: { type: Number, default: 0 },
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

	// no page-head scrim here: its dark box edges harshly against the light dusk
	// sky — the heading's own text-shadow carries the contrast on the surface
	.arrival__head {
		margin: 0 auto;
		padding: 1.75rem 1.5rem 2rem;
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

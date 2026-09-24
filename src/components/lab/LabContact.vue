<template>
	<!-- inert until it has landed: at opacity 0 its links would still take focus -->
	<div class="end" :style="endStyle" :inert="landed <= CONTACT_REVEAL.interactive">
		<h2>
			{{ CONTACT_HEADING.lead }}<em>{{ CONTACT_HEADING.accent }}</em>
		</h2>
		<div class="portals">
			<a
				v-for="(channel, i) in CONTACT_CHANNELS"
				:key="channel.key"
				class="portal"
				:class="{ on: portalOn(i) }"
				:href="channel.href"
				:target="channel.blank ? '_blank' : null"
				:rel="channel.blank ? 'noopener' : null"
			>
				{{ channel.label }}
			</a>
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { CONTACT_CHANNELS, CONTACT_HEADING } from '@/data/contact'
	import { CONTACT_REVEAL } from '@/constants/flyby'

	const props = defineProps({
		// how far the arrival has got, 0..1
		landed: { type: Number, required: true },
	})

	const endStyle = computed(() => ({ opacity: props.landed }))
	// the portals lift in one at a time
	const portalOn = i =>
		props.landed > CONTACT_REVEAL.portalStart + i * CONTACT_REVEAL.portalStagger
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;

	.end {
		position: fixed;
		inset: auto 0 0 0;
		z-index: 4;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		padding-bottom: 14vh;
	}

	h2 {
		font-size: clamp(11px, 2.4vw, 18px);
		line-height: 1.6;
		@include flyby-shadow(3px);

		em {
			font-style: normal;
			color: $flyby-hot;
		}
	}

	.portals {
		display: flex;
		gap: 18px;
		flex-wrap: wrap;
		justify-content: center;
	}

	// Hard pixel chrome, not the site's void-button: this is the look the lab is testing.
	.portal {
		display: block;
		padding: 14px 18px;
		font-size: 9px;
		color: $flyby-ink;
		text-decoration: none;
		background: rgba($flyby-panel, 0.8);
		border: 3px solid $flyby-ink;
		box-shadow: 5px 5px 0 $black;
		transform: translateY(14px);
		opacity: 0;
		transition:
			transform 0.18s steps(3),
			opacity 0.18s steps(3),
			color 0.1s steps(2),
			border-color 0.1s steps(2);

		&.on {
			transform: none;
			opacity: 1;
		}

		&:hover,
		&:focus-visible {
			color: $flyby-hot;
			border-color: $flyby-hot;
			outline: none;
		}

		&:focus-visible {
			box-shadow:
				5px 5px 0 $black,
				0 0 0 3px $flyby-hot;
		}
	}

	@media (max-width: $flyby-compact) {
		.portal {
			padding: 11px 12px;
			font-size: 8px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.portal {
			transition: none;
		}
	}
</style>

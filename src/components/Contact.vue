<template>
	<div class="content contact">
		<h1 class="contact-name">
			{{ CONTACT_HEADING.lead
			}}<span class="contact-accent">{{ CONTACT_HEADING.accent }}</span>
		</h1>

		<ul class="contact-list">
			<li
				v-for="(channel, i) in CONTACT_CHANNELS"
				:key="channel.key"
				class="contact-item"
				:style="{ '--contact-i': i }"
			>
				<PixelPortal
					:label="channel.label"
					:image="channel.icon"
					:href="channel.href"
					:blank="channel.blank"
				/>
			</li>
		</ul>

		<div class="contact-report">
			<PixelPortal
				compact
				:label="BUG_REPORT.label"
				:image="BUG_REPORT.icon"
				:href="BUG_REPORT.issueUrl"
				blank
			/>
		</div>
	</div>
</template>

<script setup>
	import { BUG_REPORT, CONTACT_CHANNELS, CONTACT_HEADING } from '@/data/contact'
	import PixelPortal from './PixelPortal.vue'
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// Per-item entrance stagger: each card animates in after the previous.
	$contact-stagger: 90ms;

	// Same shell as .about: scrollable, min full height, top padding clears the star toggle.
	.contact {
		min-height: 100dvh;
		gap: 2rem;
		padding: 3.6rem 1rem 4rem;
	}

	// Matches the About greeting: white pixel caps with the last word accented yellow.
	.contact-name {
		// mirrors .about-head's inner top padding so the heading sits clear of the MENU hint
		margin: 1.75rem 0 0;
		font-family: $font-pixel;
		font-size: $heading-pixel-size;
		line-height: 1.5;
		text-transform: uppercase;
		color: $white;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}

	.contact-accent {
		color: $yellow;
		text-shadow: 0 0 12px rgba($yellow, 0.45);
	}

	// Same portal row as the About hub: icon tiles wrapping around the centre.
	.contact-list {
		list-style: none;
		@include portal-row;
	}

	// Set apart from the channel row: a secondary action, not a fourth way to reach me.
	.contact-report {
		margin-top: 2.5rem;
	}

	.contact-item {
		opacity: 0;
		transform: translateX(-8px);
		animation: item-in 0.4s steps(4, end) forwards;
		animation-delay: calc(var(--contact-i, 0) * #{$contact-stagger});
	}

	// `item-in` keyframes are global (see _animations.scss).
	@media (prefers-reduced-motion: reduce) {
		.contact-item {
			opacity: 1;
			transform: none;
			animation: none;
		}
	}
</style>

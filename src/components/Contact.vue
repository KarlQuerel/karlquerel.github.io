<template>
	<div class="content contact">
		<header class="contact-head">
			<PageTitle :lead="CONTACT_HEADING.lead" :accent="CONTACT_HEADING.accent" />
		</header>

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
	import PageTitle from './PageTitle.vue'
	import PixelPortal from './PixelPortal.vue'
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// Per-item entrance stagger: each card animates in after the previous.
	$contact-stagger: 90ms;

	.contact {
		@include page-shell($pad-bottom: 4rem);
	}

	.contact-head {
		@include page-head;
	}

	// Same portal row as the About hub: icon tiles wrapping around the centre.
	.contact-list {
		list-style: none;
		@include portal-row;

		// with the report row below, the pair centres under the pinned heading
		& {
			margin-top: auto;
		}
	}

	// Set apart from the channel row: a secondary action, not a fourth way to reach me.
	.contact-report {
		margin: 2.5rem 0 auto;
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

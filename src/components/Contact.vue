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

		<a
			class="contact-report"
			:href="BUG_REPORT.issueUrl"
			:aria-label="BUG_REPORT.ariaLabel"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img class="contact-report__icon" :src="BUG_REPORT.icon" alt="" />
			{{ BUG_REPORT.label }}
		</a>
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
		// bottom clears the pinned report chip
		@include page-shell($pad-bottom: 5rem);
	}

	.contact-head {
		@include page-head;
	}

	// Same portal row as the About hub: icon tiles wrapping around the centre.
	.contact-list {
		list-style: none;
		@include portal-row;

		// centre in the space left under the pinned heading
		& {
			margin-block: auto;
		}
	}

	// A secondary action, not a fourth way to reach me — pinned as chrome (like
	// About's Back) so the mobile portal column can't push it below the fold.
	.contact-report {
		@include pinned-chip;
	}

	.contact-report__icon {
		width: 1.6em;
		height: auto;
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

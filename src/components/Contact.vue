<template>
	<div class="content contact">
		<h1 class="contact-name">CONTACT</h1>

		<ul class="contact-list">
			<li
				v-for="(channel, i) in CONTACT_CHANNELS"
				:key="channel.key"
				class="contact-item"
				:style="{ '--contact-i': i }"
			>
				<a
					class="contact-card"
					:href="channel.href"
					:target="channel.blank ? '_blank' : undefined"
					:rel="channel.blank ? 'noopener noreferrer' : undefined"
				>
					<span class="contact-channel">{{ channel.channel }}</span>
					<span class="contact-value">{{ channel.value }}</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { CONTACT_CHANNELS } from '@/data/contact'
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// Per-item entrance stagger: each card animates in after the previous.
	$contact-stagger: 90ms;

	.contact {
		gap: 2.5rem;
		padding: 2.5rem 1rem 4rem;
	}

	.contact-name {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(1rem, 4vw, 1.8rem);
		line-height: 1.5;
		letter-spacing: 2px;
		color: $yellow;
		text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.6);
	}

	.contact-list {
		width: min(40rem, 94vw);
		margin: 0 auto;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		text-align: center;
	}

	.contact-item {
		opacity: 0;
		transform: translateX(-8px);
		animation: item-in 0.4s steps(4, end) forwards;
		animation-delay: calc(var(--contact-i, 0) * #{$contact-stagger});
	}

	// Same "window onto the void" language as every other button on the site:
	// a hairline frame that kindles a warm yellow bloom and lifts on hover. A
	// touch darker than the default fill so the two-line text stays legible.
	.contact-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.1rem 1.2rem 1.2rem;
		text-decoration: none;
		@include void-button($lift: -3px, $bg: rgba(0, 0, 0, 0.5));
	}

	.contact-channel {
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 2vw, 0.85rem);
		line-height: 1.5;
		color: $yellow;
	}

	.contact-value {
		font-size: clamp(0.8rem, 1.8vw, 0.95rem);
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.85);
		word-break: break-word;
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

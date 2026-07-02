<template>
	<div class="content contact">
		<header class="contact-head">
			<h1 class="contact-name">CONTACT</h1>
			<p v-for="(line, i) in CONTACT_INTRO" :key="i" class="contact-intro">{{ line }}</p>
		</header>

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
	import { CONTACT_INTRO, CONTACT_CHANNELS } from '@/data/contact'
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// Per-item entrance stagger: each card animates in after the previous.
	$contact-stagger: 90ms;

	.contact {
		gap: 2.5rem;
		padding: 2.5rem 1rem 4rem;
	}

	/***	HEADER		***/
	.contact-name {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(1rem, 4vw, 1.8rem);
		line-height: 1.5;
		letter-spacing: 2px;
		color: $yellow;
		text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.6);
	}

	.contact-intro {
		max-width: 42ch;
		margin: 0.5rem auto 0;
		font-size: clamp(0.85rem, 2vw, 1rem);
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.85);
	}

	/***	LINKS		***/
	.contact-list {
		width: min(40rem, 94vw);
		margin: 0 auto;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		text-align: left;
	}

	.contact-item {
		opacity: 0;
		transform: translateX(-8px);
		animation: item-in 0.4s steps(4, end) forwards;
		animation-delay: calc(var(--contact-i, 0) * #{$contact-stagger});
	}

	// Mirrors the About timeline card: dark panel, 4px yellow border, offset shadow.
	.contact-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.9rem 1rem 1rem;
		background: rgba(0, 0, 0, 0.55);
		border: 4px solid $yellow;
		box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 0.5);
		text-decoration: none;
	}

	// Stepped 8-bit hover/focus: an inner yellow ring, no smooth easing.
	.contact-card:hover,
	.contact-card:focus-visible {
		outline: none;
		box-shadow:
			$panel-shadow,
			0 0 0 2px $yellow inset;
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
	// Honour reduced-motion: show everything, kill the animation.
	@media (prefers-reduced-motion: reduce) {
		.contact-item {
			opacity: 1;
			transform: none;
			animation: none;
		}
	}
</style>

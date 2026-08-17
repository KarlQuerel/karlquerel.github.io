<template>
	<!-- Progress rail: one diamond per station, lit as the journey passes it.
	     Labels surface on hover; the diamonds are same-page anchors. -->
	<nav class="rail" aria-label="Journey sections">
		<router-link
			v-for="(stop, i) in STOPS"
			:key="stop.to"
			:to="stop.to"
			class="rail__stop"
			:class="{ 'is-here': i === active }"
			:aria-label="stop.label"
		>
			<span class="rail__diamond" aria-hidden="true" />
			<span class="rail__label" aria-hidden="true">{{ stop.label }}</span>
		</router-link>
	</nav>
</template>

<script setup>
	import { NAVBAR_LINKS } from '@/constants/navigation'

	defineProps({
		// index of the station currently in view
		active: { type: Number, default: 0 },
	})

	// the journey's own stations; other pages don't ride this rail
	const STOPS = [
		{ to: '/#top', label: 'Home' },
		...NAVBAR_LINKS.filter(link => link.to.startsWith('/#')),
	]
</script>

<style scoped lang="scss">
	// desktop-only chrome: on phones it would crowd the reading column
	.rail {
		display: none;
	}

	@media (min-width: #{$breakpoint-desktop}) {
		.rail {
			position: fixed;
			left: 1.2rem;
			top: 50%;
			transform: translateY(-50%);
			z-index: 20;
			display: flex;
			flex-direction: column;
			gap: 1.2rem;
		}
	}

	.rail__stop {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		text-decoration: none;
		color: $text-interactive;
	}

	.rail__diamond {
		flex: none;
		width: 8px;
		height: 8px;
		background: rgba($white, 0.3);
		// a pixel square turned 45° — the void system's waypoint glyph
		transform: rotate(45deg);
		transition:
			background 0.2s steps(3, end),
			box-shadow 0.2s steps(3, end);
	}

	.rail__label {
		font-family: $font-pixel;
		font-size: px8(1);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		text-shadow: 0 1px 4px rgba($black, 0.9);
		opacity: 0;
		transition: opacity 0.2s steps(3, end);
	}

	.rail__stop:hover .rail__diamond,
	.rail__stop:focus-visible .rail__diamond {
		background: $yellow;
	}

	.rail__stop:hover .rail__label,
	.rail__stop:focus-visible .rail__label {
		opacity: 1;
		color: $yellow;
	}

	.is-here .rail__diamond {
		background: $yellow;
		box-shadow: 0 0 8px rgba($yellow, 0.6);
	}
</style>

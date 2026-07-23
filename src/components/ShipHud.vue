<template>
	<!-- POV cockpit HUD the eyes open onto. The canopy stays transparent so the
	     fixed starfield shows through; only the RESPOND button is interactive. -->
	<div class="hud">
		<div class="hud__vignette" aria-hidden="true" />
		<div class="hud__frame" aria-hidden="true" />

		<header class="hud__status" aria-hidden="true">
			<p class="hud__ship">{{ HERO_WAKE.ship }}</p>
			<p v-for="(readout, i) in HERO_WAKE.readouts" :key="i" class="hud__readout">
				{{ readout }}
			</p>
		</header>

		<aside class="hud__alarms" aria-hidden="true">
			<p
				v-for="(alarm, i) in HERO_WAKE.alarms"
				:key="i"
				class="hud__alarm"
				:style="{ '--blink-delay': `${i * 0.4}s` }"
			>
				<span class="hud__alarm-dot" />{{ alarm }}
			</p>
		</aside>

		<div class="hud__alert-stack">
			<p class="hud__alert" aria-hidden="true">{{ HERO_WAKE.alert }}</p>
			<button class="hud__respond" type="button" @click="emit('launch')">
				{{ HERO_WAKE.respond }}
			</button>
		</div>

		<p class="sr-only">{{ HERO_WAKE.srNarration }}</p>
	</div>
</template>

<script setup>
	import { HERO_WAKE } from '../data/heroLines.js'

	const emit = defineEmits(['launch'])
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.hud {
		position: absolute;
		inset: 0;
		font-family: $font-pixel;
	}

	// pulsing red alert wash around the edges — the "everything is wrong" light
	.hud__vignette {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(
			ellipse at center,
			transparent 52%,
			rgba($light-red, 0.22) 100%
		);
		animation: hudAlertPulse 1.6s steps(2, end) infinite;
	}

	// canopy struts: four corner braces drawn with borders, no imagery yet
	.hud__frame {
		position: absolute;
		inset: clamp(0.8rem, 3vmin, 2rem);
		pointer-events: none;

		&::before,
		&::after {
			content: '';
			position: absolute;
			width: clamp(2.5rem, 8vmin, 5rem);
			height: clamp(2.5rem, 8vmin, 5rem);
			border: 2px solid rgba($white, 0.25);
		}

		&::before {
			top: 0;
			left: 0;
			border-right: none;
			border-bottom: none;
		}

		&::after {
			bottom: 0;
			right: 0;
			border-left: none;
			border-top: none;
		}
	}

	.hud__status {
		@include void-panel;
		position: absolute;
		top: clamp(1.2rem, 5vmin, 3rem);
		left: clamp(1.2rem, 5vmin, 3rem);
		padding: 0.9rem 1.1rem;
		text-align: left;
	}

	.hud__ship {
		margin: 0 0 0.7em;
		font-size: clamp(0.6rem, 1.6vw, 0.85rem);
		color: $yellow;
		text-align: left;
	}

	.hud__readout {
		margin: 0 0 0.6em;
		font-size: clamp(0.45rem, 1.2vw, 0.6rem);
		color: $text-interactive;
		text-align: left;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.hud__alarms {
		@include void-panel(rgba($light-red, 0.08));
		position: absolute;
		top: clamp(1.2rem, 5vmin, 3rem);
		right: clamp(1.2rem, 5vmin, 3rem);
		padding: 0.9rem 1.1rem;
		border-color: rgba($light-red, 0.35);
	}

	.hud__alarm {
		display: flex;
		align-items: center;
		gap: 0.6em;
		margin: 0 0 0.7em;
		font-size: clamp(0.45rem, 1.2vw, 0.6rem);
		color: $light-red;
		text-align: left;
		// staggered so the wall of warnings never blinks in unison
		animation: hudAlarmBlink 1.2s steps(2, end) infinite;
		animation-delay: var(--blink-delay, 0s);

		&:last-child {
			margin-bottom: 0;
		}
	}

	.hud__alarm-dot {
		width: 0.5em;
		height: 0.5em;
		flex-shrink: 0;
		background: $light-red;
	}

	.hud__alert-stack {
		position: absolute;
		left: 50%;
		bottom: clamp(2.5rem, 12vmin, 6rem);
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.2rem;
	}

	.hud__alert {
		margin: 0;
		font-size: clamp(0.7rem, 2.4vw, 1.2rem);
		letter-spacing: 0.18em;
		color: $light-red;
		text-shadow: 0 0 18px rgba($light-red, 0.5);
		animation: hudAlarmBlink 0.9s steps(2, end) infinite;
	}

	.hud__respond {
		padding: 0.9rem 2.2rem;
		font-family: $font-pixel;
		font-size: clamp(0.65rem, 2vw, 0.95rem);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		// last: the mixin emits nested states, so trailing declarations would warn
		@include void-button($lift: -2px, $bg: rgba($black, 0.55));
	}

	@keyframes hudAlertPulse {
		0%,
		100% {
			opacity: 0.55;
		}
		50% {
			opacity: 1;
		}
	}

	@keyframes hudAlarmBlink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.25;
		}
	}

	@media (max-width: $breakpoint-mobile) {
		// stack the two panels vertically so they never overlap on phones
		.hud__alarms {
			top: auto;
			bottom: clamp(11rem, 38vmin, 15rem);
			right: 1rem;
		}

		.hud__status {
			left: 1rem;
			top: 4.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hud__vignette,
		.hud__alarm,
		.hud__alert {
			animation: none;
		}
	}
</style>

<template>
	<!-- The world around the card: a caption bottom-left, instruments bottom-right, the news crawl
	     under them, and the ship's public address up under the visor. -->
	<div v-if="world" class="world" aria-hidden="true">
		<p v-if="world.lower" class="world__lower">
			<span class="world__title">{{ world.lower.title }}</span>
			<span class="world__sub">{{ world.lower.sub }}</span>
		</p>
		<ul v-if="world.data" class="world__data">
			<li v-for="(line, i) in lines" :key="i">{{ line }}</li>
		</ul>
		<div v-if="world.ticker" class="world__ticker">
			<p class="world__crawl">{{ crawl }}</p>
		</div>
		<p v-if="world.pa && clock >= world.pa.at" class="world__pa">
			{{ world.pa.text.slice(0, shown) }}
		</p>
	</div>
</template>

<script setup>
	import { computed, watch } from 'vue'
	import { useTypewriter } from '@/composables/useTypewriter'
	import { INTRO_WORLD } from '@/data/gameWorld'
	import { INTRO_CARD } from '@/constants/intro/timeline'
	import { ramp } from '@/js/math'

	const props = defineProps({
		// the shot on screen, and its clock at a tenth of a second
		shotKey: { type: String, required: true },
		clock: { type: Number, required: true },
	})

	const world = computed(() => INTRO_WORLD[props.shotKey] ?? null)

	// a readout's {v}, run across its span of the shot
	const lines = computed(() =>
		(world.value?.data ?? []).map(({ text, from, to, digits, span }) => {
			if (from === undefined) return text
			const v = from + (to - from) * ramp(props.clock, span[0], span[1])
			return text.replace(
				'{v}',
				v.toLocaleString('en-US', {
					maximumFractionDigits: digits,
					minimumFractionDigits: digits,
				})
			)
		})
	)

	const crawl = computed(() => (world.value?.ticker ?? []).join('  ·  '))

	const { shown, start } = useTypewriter({ delayMs: 0, charMs: INTRO_CARD.charMs })
	watch(
		() => world.value?.pa && props.clock >= world.value.pa.at,
		on => on && start(world.value.pa.text.length),
		{ immediate: true }
	)
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.world {
		position: fixed;
		inset: 0;
		z-index: 3;
		pointer-events: none;
		font-family: $font-terminal;
		font-size: $type-prose-sm;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		text-align: left;
		color: $light-gray;
		@include pixel-keyline($unit: 1px, $halo: 4px);
	}

	// every line comes up on two steps, the way an instrument does
	.world__lower,
	.world__data {
		position: absolute;
		bottom: 5vh;
		margin: 0;
		list-style: none;
		animation: world-in 0.5s steps(2, end) both;
	}

	.world__lower {
		left: 4vw;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding-left: 0.7rem;
		border-left: 2px solid $yellow;
		font-size: inherit;
		text-align: left;
	}

	.world__title {
		color: $white;
	}

	.world__sub {
		color: $text-caption;
		opacity: 0.8;
	}

	.world__data {
		right: 4vw;
		text-align: right;
		line-height: 2;
	}

	// the crawl sits along the very bottom, under the caption and the instruments
	.world__ticker {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		padding: 0.35rem 0;
		background: rgba($black, 0.55);
		border-top: 1px solid rgba($yellow, 0.35);
	}

	.world__crawl {
		display: inline-block;
		margin: 0;
		padding-left: 100%;
		white-space: nowrap;
		font-size: inherit;
		color: $yellow;
		animation: world-crawl 26s linear infinite;
	}

	// high, under the visor's top edge: the bottom of a POV frame belongs to the hands
	.world__pa {
		position: absolute;
		left: 50%;
		top: 13vh;
		width: min(30rem, 56vw);
		margin: 0;
		transform: translateX(-50%);
		font-size: inherit;
		text-align: center;
		line-height: 1.8;
		color: $text-caption;
	}

	@keyframes world-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes world-crawl {
		to {
			transform: translateX(-100%);
		}
	}

	@media (max-width: $breakpoint-mobile) {
		.world__lower,
		.world__data {
			bottom: 4.5vh;
		}
		.world__data {
			display: none;
		}
		// the phone's readouts own the top, and its hands are small: between them and the card
		.world__pa {
			top: auto;
			bottom: 30vh;
			width: 80vw;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.world__lower,
		.world__data {
			animation: none;
		}
		.world__crawl {
			animation: none;
			padding-left: 1rem;
		}
	}
</style>

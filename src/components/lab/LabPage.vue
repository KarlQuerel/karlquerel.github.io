<template>
	<div class="flyby" :class="{ 'flyby--flat': !supported }">
		<canvas ref="canvas" class="flyby__canvas" aria-hidden="true" />

		<!-- covers the gap between mount and the first frame; reports what the boot
		     actually did rather than animating a guess -->
		<BootCover :progress="bootProgress" :ceiling="bootCeiling" :done="!booting" />

		<LabChrome :mark-on="markOn" :leg="leg" :wake="wake" />

		<div class="doc">
			<section
				v-for="beat in LAB_BEATS"
				:key="beat.key"
				class="beat"
				:class="`beat--${beat.key}`"
			>
				<!-- the name is drawn into the scene, so keep a real heading for readers -->
				<h1 v-if="beat.key === 'still'" class="sr-only">{{ LAB_TITLE }}</h1>
				<div v-if="beat.lines" class="card">
					<p class="kicker">{{ beat.kicker }}</p>
					<h2>
						{{ beat.lead }}<em>{{ beat.accent }}</em>
					</h2>
					<p v-for="line in beat.lines" :key="line">{{ line }}</p>
				</div>
			</section>
		</div>

		<p class="hint" :style="hintStyle" aria-hidden="true">▼</p>

		<LabContact :landed="landed" />
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { useFlyby } from '@/composables/useFlyby'
	import BootCover from '@/components/BootCover.vue'
	import LabChrome from './LabChrome.vue'
	import LabContact from './LabContact.vue'
	import { LAB_BEATS, LAB_TITLE } from '@/data/labBeats'

	const canvas = ref(null)
	const { supported, booting, bootProgress, bootCeiling, leg, wake, hint, arrive, markOn } =
		useFlyby(canvas)

	// With no WebGL there is no flight to arrive from, so the contact block is simply always up.
	const landed = computed(() => (supported.value ? arrive.value : 1))
	const hintStyle = computed(() => ({ opacity: supported.value ? hint.value : 0 }))
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;

	.flyby {
		// Sampled off the opening frame: on a slow GPU the first paint is this gradient, not a black card.
		background: $flyby-ground;
		color: $flyby-ink;
		font-family: $font-pixel;
		// `#app` centres text site-wide; the flight's copy column is read down the left edge
		text-align: left;
	}

	// Sized from the renderer's resize(): whole device pixels per art pixel, which 100vw cannot promise.
	.flyby__canvas {
		position: fixed;
		display: block;
		image-rendering: pixelated;
		z-index: 0;
	}

	// a context that failed after it was created would otherwise sit there as a black box
	.flyby--flat .flyby__canvas {
		display: none;
	}

	.doc {
		position: relative;
		z-index: 2;
	}

	.beat {
		display: flex;
		align-items: center;
		pointer-events: none;
	}

	// Section heights are the flight plan, solved rather than chosen: centre_vh = s*900 + 50, each
	// section starting where the last ended. The reveals own 0.19..0.26 and 0.48..0.66, so WORK
	// centres at s=0.33 between them and LIFE at s=0.75. The first section is exactly one screen.
	.beat--still {
		height: 100vh;
	}
	.beat--work {
		height: 494vh;
	}
	.beat--life {
		height: 262vh;
	}
	.beat--entry {
		height: 144vh;
	}

	// No flight to scroll through, so the runway collapses to something readable.
	.flyby--flat .beat {
		height: auto;
		min-height: 60vh;
	}

	// One column, always left: the flight fills the frame by the end, so a fixed reading position wins.
	.card {
		position: relative;
		max-width: calc(30rem + 12vw);
		padding: 22px 6vw;

		&::before {
			content: '';
			position: absolute;
			inset: -5vh 0;
			z-index: -1;
			background: linear-gradient(
				90deg,
				rgba($flyby-void, 0.94) 0 46%,
				rgba($flyby-void, 0.75) 46% 70%,
				rgba($flyby-void, 0.4) 70% 86%,
				rgba($flyby-void, 0) 86%
			);
			// fade the shade out top and bottom, or it reads as a black box on the opening frame
			mask-image: linear-gradient(180deg, transparent, $black 30%, $black 70%, transparent);
		}
	}

	.kicker {
		font-size: 8px;
		letter-spacing: 2px;
		color: $flyby-hot;
		margin-bottom: 12px;
		@include flyby-shadow;
	}

	h2 {
		font-size: clamp(11px, 2.2vw, 22px);
		line-height: 1.6;
		@include flyby-shadow(3px);

		em {
			font-style: normal;
			color: $flyby-hot;
		}
	}

	// `text-align` too: the global `p, h1` rule centres every paragraph, and an element rule beats it.
	p {
		font-size: 11px;
		line-height: 2;
		color: $flyby-dim;
		margin-top: 16px;
		text-align: left;
		@include flyby-shadow;
	}

	// A lone chevron, no caption: it says "below" without writing on the photograph.
	.hint {
		position: fixed;
		left: 50%;
		bottom: 6vh;
		font-size: 16px;
		color: $flyby-hot;
		z-index: 3;
		@include flyby-shadow;
		// self-running, so it steps: a two-frame beckon
		animation: hint-beckon 1.1s steps(2, end) infinite;
	}

	@keyframes hint-beckon {
		from {
			transform: translate(-50%, 0);
		}
		to {
			transform: translate(-50%, 8px);
		}
	}

	// the flight itself is scroll-scrubbed, so it only moves when the reader does
	@media (prefers-reduced-motion: reduce) {
		.hint {
			animation: none;
			transform: translateX(-50%);
		}
	}

	@media (max-width: $flyby-compact) {
		// The card fills a narrow frame, so the scrim has to hold further across it.
		.card::before {
			background: linear-gradient(
				90deg,
				rgba($flyby-void, 0.95) 0 76%,
				rgba($flyby-void, 0.8) 76% 92%,
				rgba($flyby-void, 0) 92%
			);
		}
		p {
			font-size: 10px;
		}
	}
</style>

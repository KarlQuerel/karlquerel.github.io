<template>
	<div class="flyby" :class="{ 'flyby--flat': !supported }">
		<canvas ref="canvas" class="flyby__canvas" aria-hidden="true" />

		<!-- covers the gap between mount and the first frame; reports what the boot
		     actually did rather than animating a guess -->
		<LabBoot :progress="bootProgress" :ceiling="bootCeiling" :done="!booting" />

		<!-- Fixed chrome: the name is gone from ~17% of the scroll, and contact was ten screens away. -->
		<div class="chrome">
			<button class="chrome__mark" :class="{ on: markOn }" type="button" @click="toTop">
				Karl Querel
			</button>
			<button class="chrome__link" type="button" @click="toEnd">CONTACT</button>
		</div>

		<!-- Flight instrument, and the only thing that says the page is ten screens long -->
		<p class="hud" :style="hudStyle" aria-hidden="true">{{ leg }}</p>

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

		<div class="end" :style="endStyle">
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
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { useFlyby } from '@/composables/useFlyby'
	import LabBoot from '@/components/lab/LabBoot.vue'
	import { LAB_BEATS, LAB_TITLE } from '@/data/labBeats'
	import { CONTACT_CHANNELS, CONTACT_HEADING } from '@/data/contact'

	// how far into the arrival each portal lifts in, so they land one at a time
	const PORTAL_START = 0.3
	const PORTAL_STAGGER = 0.15

	const canvas = ref(null)
	const { supported, booting, bootProgress, bootCeiling, leg, wake, hint, arrive, markOn } =
		useFlyby(canvas)

	// With no WebGL there is no flight to arrive from, so the contact block is simply always up.
	const landed = computed(() => (supported.value ? arrive.value : 1))

	const hudStyle = computed(() => ({ opacity: wake.value }))
	const hintStyle = computed(() => ({ opacity: supported.value ? hint.value : 0 }))
	const endStyle = computed(() => ({
		opacity: landed.value,
		pointerEvents: landed.value > 0.6 ? 'auto' : 'none',
	}))
	const portalOn = i => landed.value > PORTAL_START + i * PORTAL_STAGGER

	// Straight to the arrival: the scroll ease flies the whole path, so the shortcut is also the tour.
	const toEnd = () => window.scrollTo(0, document.documentElement.scrollHeight)
	const toTop = () => window.scrollTo(0, 0)
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

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.kicker {
		font-size: 8px;
		letter-spacing: 2px;
		color: $flyby-hot;
		margin-bottom: 12px;
		text-shadow:
			2px 2px 0 $black,
			$flyby-outline;
	}

	h1 {
		font-size: clamp(16px, 4vw, 33px);
		line-height: 1.5;
		text-shadow:
			3px 3px 0 $black,
			$flyby-outline;
	}

	h2 {
		font-size: clamp(11px, 2.2vw, 22px);
		line-height: 1.6;
		text-shadow:
			3px 3px 0 $black,
			$flyby-outline;

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
		text-shadow:
			2px 2px 0 $black,
			$flyby-outline;
	}

	// A lone chevron, no caption: it says "below" without writing on the photograph.
	.hint {
		position: fixed;
		left: 50%;
		bottom: 6vh;
		font-size: 16px;
		color: $flyby-hot;
		z-index: 3;
		text-shadow:
			2px 2px 0 $black,
			$flyby-outline;
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

	.end {
		position: fixed;
		inset: auto 0 0 0;
		z-index: 4;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		padding-bottom: 14vh;

		h2 {
			font-size: clamp(11px, 2.4vw, 18px);
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
		background: rgba(#111826, 0.8);
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

	.chrome {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 5;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		padding: 20px 6vw;
		font-size: 8px;
		line-height: 1.8;
		pointer-events: none;
	}

	.chrome__mark,
	.chrome__link {
		pointer-events: auto;
		margin: 0;
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		color: $flyby-dim;
		text-decoration: none;
		cursor: pointer;
		text-shadow:
			2px 2px 0 $black,
			$flyby-outline;
		transition: color 0.1s steps(2);

		&:hover,
		&:focus-visible {
			color: $flyby-hot;
			outline: none;
		}
	}

	// Bottom left, opposite the readout, and raised only once the title has gone past.
	.chrome__mark {
		position: fixed;
		left: 6vw;
		bottom: 5vh;
		opacity: 0;
		transition:
			opacity 0.25s steps(3),
			color 0.1s steps(2);

		&.on {
			opacity: 1;
		}
	}

	.hud {
		position: fixed;
		right: 6vw;
		bottom: 5vh;
		z-index: 5;
		margin: 0;
		font-size: 8px;
		color: $flyby-dim;
		white-space: pre;
		text-shadow:
			2px 2px 0 $black,
			$flyby-outline;
		pointer-events: none;
	}

	@media (max-width: 520px) {
		.chrome,
		.hud {
			font-size: 7px;
		}
		.chrome__mark,
		.hud {
			bottom: 3vh;
		}
	}

	// the flight itself is scroll-scrubbed, so it only moves when the reader does
	@media (prefers-reduced-motion: reduce) {
		.portal {
			transition: none;
		}
		.hint {
			animation: none;
			transform: translateX(-50%);
		}
	}

	@media (max-width: 720px) {
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
		.portal {
			padding: 11px 12px;
			font-size: 8px;
		}
	}
</style>

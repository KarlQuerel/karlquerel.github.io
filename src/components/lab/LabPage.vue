<template>
	<div class="flyby" :class="{ 'flyby--flat': !supported }">
		<canvas ref="canvas" class="flyby__canvas" aria-hidden="true" />

		<!-- covers the gap between mount and the first frame; reports what the boot
		     actually did rather than animating a guess -->
		<LabBoot :progress="bootProgress" :ceiling="bootCeiling" :done="!booting" />

		<!-- Fixed chrome. Two things the flight was missing as a portfolio: the name is
		     gone from about 17% of the scroll, where the title passes the camera, and the
		     only way to reach Karl was ten screens away at the end. -->
		<div class="chrome">
			<button class="chrome__mark" :class="{ on: markOn }" type="button" @click="toTop">
				Karl Querel
			</button>
			<div class="chrome__nav">
				<span class="chrome__links">
					<a class="chrome__link" :href="LAB_SOURCE_URL" target="_blank" rel="noopener">
						SOURCE
					</a>
					<button class="chrome__link" type="button" @click="toEnd">CONTACT</button>
				</span>
				<span v-if="supported" class="chrome__spec">{{ spec }}</span>
			</div>
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

		<p class="hint" :style="hintStyle" aria-hidden="true">Scroll to begin<b>▼</b></p>

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
	import { LAB_BEATS, LAB_SOURCE_URL, LAB_TITLE } from '@/data/labBeats'
	import { CONTACT_CHANNELS, CONTACT_HEADING } from '@/data/contact'

	// how far into the arrival each portal lifts in, so they land one at a time
	const PORTAL_START = 0.3
	const PORTAL_STAGGER = 0.15

	const canvas = ref(null)
	const {
		supported,
		booting,
		bootProgress,
		bootCeiling,
		leg,
		wake,
		hint,
		arrive,
		markOn,
		shaderLines,
	} = useFlyby(canvas)

	// Counted, not claimed: the shader is right there in the bundle, so measure it.
	const spec = computed(() => `webgl1 · ${shaderLines.value}-line shader · 0 deps`)

	// With no WebGL there is no flight to arrive from, so the contact block is simply
	// always up rather than waiting on a scroll position nothing is driving.
	const landed = computed(() => (supported.value ? arrive.value : 1))

	const hudStyle = computed(() => ({ opacity: wake.value }))
	const hintStyle = computed(() => ({ opacity: supported.value ? hint.value : 0 }))
	const endStyle = computed(() => ({
		opacity: landed.value,
		pointerEvents: landed.value > 0.6 ? 'auto' : 'none',
	}))
	const portalOn = i => landed.value > PORTAL_START + i * PORTAL_STAGGER

	// Straight to the arrival. The scroll ease flies the whole path getting there, so
	// the shortcut is also the fastest tour of the thing it is skipping.
	const toEnd = () => window.scrollTo(0, document.documentElement.scrollHeight)
	const toTop = () => window.scrollTo(0, 0)
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;

	.flyby {
		// Sampled off the opening frame: on a slow GPU the first paint is this gradient
		// rather than a black card, and the canvas lands on top of something close.
		background: $flyby-ground;
		color: $flyby-ink;
		font-family: $font-pixel;
		// `#app` centres text site-wide; the flight's copy column is read down the left
		// edge, so it opts out the way SportPage does
		text-align: left;
	}

	// Sized and placed from the renderer's resize(): the element has to be a whole
	// number of device pixels per art pixel, which 100vw/100vh cannot promise.
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

	// Section heights are the flight plan, and they are solved rather than chosen. A card
	// sits at its section's centre and is on screen for about a screen of scroll either
	// side of it, so the height that puts a card at scroll fraction s is what places it:
	// centre_vh = s*900 + 50, and each section starts where the last one ended. The two
	// reveals own 0.19..0.26 (over the ridge) and 0.48..0.66 (the corridor moon letting
	// go of the destination); text over either of those is text competing with the thing
	// it came to introduce. So: WORK centres at s=0.33, in the clear water between them,
	// and LIFE at s=0.75, over the destination once it has arrived. The first section is
	// exactly one screen: any taller and its card centres below the fold.
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

	// One column, always left. The flight fills the frame from every angle by the end,
	// so a fixed reading position beats alternating sides that the planets keep landing
	// on. The scrim is banded rather than smooth, to sit with the renderer's own colour
	// quantisation, and runs to the viewport edge so it reads as shade, not as a box.
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
			// fade the shade out top and bottom too, or it reads as a black box on the
			// opening frame where there is nothing behind it that needs covering
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

	// `text-align` too: the global `p, h1` rule in _layout.scss centres every paragraph
	// on the site, and a direct element rule beats the root's inherited value.
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

	.hint {
		position: fixed;
		left: 50%;
		bottom: 6vh;
		transform: translateX(-50%);
		font-size: 8px;
		color: $flyby-dim;
		z-index: 3;
		text-align: center;
		text-shadow:
			2px 2px 0 $black,
			$flyby-outline;

		b {
			display: block;
			margin-top: 8px;
			color: $flyby-hot;
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

	// Hard pixel chrome rather than the site's void-button: this is the look the lab is
	// testing, and softening it here would be testing the site's look instead.
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
		gap: 16px;
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

	// Bottom left, opposite the readout: the copy column scrolls up through the top left
	// on its way out, and a wordmark there ends up interleaved between two lines of it.
	// Raised only once the title itself has gone past, so the opening frame still gives
	// nothing away.
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

	.chrome__nav {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 6px;
		text-align: right;
	}

	.chrome__links {
		display: flex;
		gap: 16px;
	}

	// The claim the page is making, in counted numbers rather than adjectives - the
	// shader line count is read off the shader at runtime, so it cannot drift.
	.chrome__spec {
		color: $flyby-faint;
		text-shadow: 2px 2px 0 $black;
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
	}

	@media (max-width: 720px) {
		// The card fills a narrow frame, so the scrim has to hold much further across it:
		// the copy now lands at the ring pass, where the bands behind it are the brightest
		// thing in the flight.
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

<template>
	<!-- The intro cinematic: three.js shots cut together, a typed card held over each run of them, then black and
	     the ship. A shot still to build is a slate on black. Any key or a click skips it. -->
	<div class="intro" :style="introStyle" @pointerdown="leave">
		<canvas ref="canvas" class="intro__canvas" aria-hidden="true" />
		<BootCover :progress="bootProgress" :ceiling="bootCeiling" :done="!booting" />
		<!-- each layer keyed by name: left to Vue, they all took the number 0, and card 0 took the slate's element -->
		<div v-if="!booting && slate && !hushed" key="slate" class="intro__slate">
			<p class="intro__slate-line">{{ INTRO_SLATES[slate] }}</p>
		</div>
		<div v-if="whiteout" key="white" class="intro__white" />
		<div
			v-if="!booting && !over && !hushed"
			:key="`card${card}`"
			class="intro__card"
			:class="{ 'intro__card--out': fading }"
		>
			<TypedReadout :line="{ ...INTRO_CARDS[card], ...INTRO.type }" start />
		</div>
		<p v-if="!booting" key="skip" class="intro__skip">{{ INTRO_SKIP_HINT }}</p>
		<div v-if="over || hushed" key="black" class="intro__black" />
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useArtCanvas } from '@/composables/useArtCanvas'
	import { useWindowListener } from '@/composables/useWindowListener'
	import BootCover from '@/components/BootCover.vue'
	import TypedReadout from './TypedReadout.vue'
	import { createIntroCinematic } from '@/js/pilot/introCinematic'
	import { INTRO } from '@/constants/game/intro'
	import { PILOT } from '@/constants/game/pilot'
	import { INTRO_END } from '@/constants/game/scenes'
	import { INTRO_CARDS, INTRO_SKIP_HINT, INTRO_SLATES } from '@/data/gameIntro'

	const { cuts } = INTRO
	const introStyle = { '--fade-s': `${INTRO.fadeS}s`, '--flash-s': `${cuts.flash.s}s` }
	const canvas = ref(null)
	const card = ref(0)
	const slate = ref(null)
	const fading = ref(false)
	const over = ref(false)
	// a shot coming in out of white, or held black with its card waiting
	const whiteout = ref(false)
	const hushed = ref(false)
	const intro = createIntroCinematic()

	const router = useRouter()
	let left = false
	function leave() {
		if (left) return
		left = true
		router.replace({ query: { [INTRO_END]: null } })
	}

	const { booting, bootProgress, bootCeiling } = useArtCanvas(canvas, {
		webgl2: true,
		bootWeights: intro.boot,
		cellPx: () => PILOT.cellPx,
		build: intro.build,
		resize: intro.resize,
		release: intro.release,
		frame(dt) {
			const drew = intro.frame(dt)
			const cue = intro.cue()
			card.value = cue.card
			slate.value = cue.slate ?? null
			fading.value = cue.cardLeft < INTRO.fadeS
			whiteout.value = cue.cut === 'flash' && cue.into < cuts.flash.s
			hushed.value = cue.cut === 'black' && cue.into < cuts.black.s
			over.value = cue.past > 0
			if (cue.past > INTRO.blackS) leave()
			return drew
		},
	})

	useWindowListener('keydown', e => {
		if (!e.repeat) leave()
	})
</script>

<style scoped lang="scss">
	@use 'palette:' as palette;
	@use '@/styles/flyby' as *;

	.intro {
		position: fixed;
		inset: 0;
		background: $black;
		overflow: hidden;
	}

	// sized by useArtCanvas: whole device pixels per art pixel
	.intro__canvas {
		position: fixed;
		display: block;
		image-rendering: pixelated;
	}

	// the card low in the frame, under the globe's crown; it fades out in steps, as the site's reveals do
	.intro__card {
		position: fixed;
		left: 50%;
		bottom: 12vh;
		width: min(80vw, 56rem);
		translate: -50% 0;
		text-align: center;
		pointer-events: none;
		transition: opacity var(--fade-s) steps(4, end);
	}

	.intro__card--out {
		opacity: 0;
	}

	// the game's hard outline, not the readout's glow: the globe behind is as bright as the words
	.intro__card :deep(.readout),
	.intro__card :deep(.readout__accent) {
		@include flyby-shadow;
	}

	.intro__card :deep(.readout) {
		color: $flyby-ink;
	}

	.intro__skip {
		position: fixed;
		right: 2rem;
		bottom: 2rem;
		margin: 0;
		font-family: $font-pixel;
		font-size: $type-prose-sm;
		letter-spacing: 1px;
		color: $flyby-ink;
		pointer-events: none;
		@include flyby-shadow;
	}

	.intro__slate,
	.intro__white,
	.intro__black {
		position: fixed;
		inset: 0;
		background: $black;
	}

	// the bomb's light carried over the cut, going out in steps; reduced motion makes it a plain cut
	.intro__white {
		background: palette.$star;
		pointer-events: none;
		animation: whiteout var(--flash-s) steps(4, end) forwards;

		@media (prefers-reduced-motion: reduce) {
			display: none;
		}
	}

	@keyframes whiteout {
		to {
			opacity: 0;
		}
	}

	// a shot still to build, named mid-frame in the terminal's voice, clear of the card below
	.intro__slate {
		display: grid;
		place-items: center;
		pointer-events: none;
	}

	.intro__slate-line {
		max-width: min(70vw, 40rem);
		margin: 0;
		font-family: $font-terminal;
		font-size: $type-prose-sm;
		letter-spacing: 0.08em;
		text-align: center;
		text-transform: uppercase;
		color: $light-gray;
	}
</style>

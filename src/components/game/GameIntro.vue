<template>
	<!-- The intro: the storyboard's shots on one art canvas, the cards and the visor over it. -->
	<div class="intro" :class="{ 'intro--flat': !supported, 'intro--shake': shaking }">
		<canvas ref="canvas" class="intro__canvas" aria-hidden="true" />
		<BootCover :progress="bootProgress" :ceiling="bootCeiling" :done="!booting" />
		<!-- the incoming shot's overlays wait until its picture has mostly taken the frame -->
		<template v-if="settled">
			<IntroCard :text="card" :visor="!!hud" />
			<IntroHud v-if="hud" v-bind="hud" />
			<IntroWorld v-if="shot" :shot-key="shot.key" :clock="clock" />
			<IntroBoard v-if="shot?.key === 'board'" :clock="clock" />
			<IntroChoice
				v-if="choice"
				:options="choice.options"
				@pick="choose(choice.key, $event)"
			/>
			<div v-if="shot?.key === 'title'" class="intro__title">
				<PlatingWordmark @built="built = true" />
				<TypedReadout :line="INTRO_ACT" :start="built" />
			</div>
		</template>
		<!-- the black a cut goes through, over everything but the chrome -->
		<div class="intro__cut" :class="{ 'intro__cut--on': marks.black }" aria-hidden="true" />
		<button v-if="shot && !last" class="intro__skip" type="button" @click="skip">
			{{ INTRO_SKIP }}
		</button>
		<p v-if="paused" class="intro__inspect">
			{{ INTRO_INSPECT.label }} {{ shot?.key }} {{ pausedAt.toFixed(2) }}s
			<span>{{ INTRO_INSPECT.hint }}</span>
		</p>
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { useIntro } from '@/composables/useIntro'
	import BootCover from '@/components/BootCover.vue'
	import IntroBoard from './IntroBoard.vue'
	import IntroCard from './IntroCard.vue'
	import IntroChoice from './IntroChoice.vue'
	import IntroHud from './IntroHud.vue'
	import IntroWorld from './IntroWorld.vue'
	import PlatingWordmark from './PlatingWordmark.vue'
	import TypedReadout from './TypedReadout.vue'
	import { INTRO_CRASH, INTRO_INSPECT } from '@/constants/intro/timeline'
	import { INTRO_ACT, INTRO_SKIP } from '@/data/gameIntro'

	const canvas = ref(null)
	const {
		supported,
		booting,
		bootProgress,
		bootCeiling,
		shot,
		card,
		marks,
		clock,
		settled,
		hud,
		choice,
		last,
		skip,
		choose,
		paused,
		pausedAt,
	} = useIntro(canvas)

	// the crash shakes the whole frame until the cut to black
	const shaking = computed(() => shot.value?.key === 'crash' && !marks.value.black)
	const shakePx = `${INTRO_CRASH.shakePx}px`
	const built = ref(false)
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.intro {
		position: fixed;
		inset: 0;
		background: $black;
		overflow: hidden;
		// the wipe is a drag, and on a phone a drag must not scroll
		touch-action: none;
	}

	// Sized by the renderer: whole device pixels per art pixel, which 100vw cannot promise.
	.intro__canvas {
		position: fixed;
		display: block;
		image-rendering: pixelated;
		z-index: 0;
	}

	.intro--flat .intro__canvas {
		display: none;
	}

	// impact: the frame thrown about on a stepped clock, never eased
	.intro--shake {
		animation: intro-shake 0.18s steps(3, end) infinite;
	}

	@keyframes intro-shake {
		0% {
			translate: v-bind(shakePx) 0;
		}
		33% {
			translate: calc(v-bind(shakePx) * -1) calc(v-bind(shakePx) * 0.6);
		}
		66% {
			translate: calc(v-bind(shakePx) * 0.5) calc(v-bind(shakePx) * -1);
		}
		100% {
			translate: 0 v-bind(shakePx);
		}
	}

	.intro__title {
		position: fixed;
		inset: 0;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
	}

	.intro__cut {
		position: fixed;
		inset: 0;
		z-index: 8;
		background: $black;
		opacity: 0;
		pointer-events: none;
	}

	.intro__cut--on {
		opacity: 1;
	}

	// top right, opposite the way home: the bottom corners belong to the hands
	.intro__skip {
		@include pinned-chip;

		& {
			top: 0.6rem;
			right: 0.6rem;
			bottom: auto;
		}
	}

	// dev inspection readout, over everything, clear of the hands and the skip chip
	.intro__inspect {
		position: fixed;
		top: 0.6rem;
		left: 50%;
		z-index: 9;
		translate: -50% 0;
		margin: 0;
		font-family: $font-terminal;
		font-size: $type-prose-md;
		color: $yellow;
		text-align: center;
		pointer-events: none;

		span {
			display: block;
			color: $light-gray;
			font-size: $type-prose-sm;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.intro--shake {
			animation: none;
		}
	}
</style>

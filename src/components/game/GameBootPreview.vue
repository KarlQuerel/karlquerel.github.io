<template>
	<!-- Dev server only: the game's loader on its own, played again and again on a pretend boot, each step as long
	     as its share of the chosen screen's real boot weights over the load time. -->
	<div class="boot-preview">
		<GameBoot
			:key="run"
			:progress="progress"
			:ceiling="ceiling"
			:done="done"
			:screen="screen"
			@gone="rest"
		/>
		<form class="boot-preview__panel" @submit.prevent>
			<label class="boot-preview__field">
				{{ words.screen }}
				<select v-model="screen" class="boot-preview__control">
					<option v-for="key in SCREENS" :key="key" :value="key">{{ key }}</option>
				</select>
			</label>
			<label class="boot-preview__field">
				{{ words.load }} {{ loadS.toFixed(1) }} {{ words.seconds }}
				<input
					v-model.number="loadS"
					class="boot-preview__control"
					type="range"
					:min="range.min"
					:max="range.max"
					:step="range.step"
					@change="replay"
				/>
			</label>
			<button type="button" class="boot-preview__replay" @click="replay">
				{{ words.replay }}
			</button>
		</form>
	</div>
</template>

<script setup>
	import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
	import GameBoot from './GameBoot.vue'
	import { BOOT_PREVIEW } from '@/constants/game/bootPreview'
	import { GAME_BOOT } from '@/data/gameIntro'

	const { words, loadS: range } = BOOT_PREVIEW
	const SCREENS = Object.keys(GAME_BOOT.checks)
	const screen = ref(SCREENS[0])
	const loadS = ref(range.start)
	// a new run remounts the loader, so its clock and its fade start over
	const run = ref(0)
	const progress = ref(0)
	const ceiling = ref(0)
	const done = ref(false)
	let timer = 0

	// One pretend boot, as useArtCanvas reports a real one: while a step runs the ceiling is where it will land,
	// and once it lands the progress catches up.
	function play() {
		window.clearTimeout(timer)
		const weights = Object.values(BOOT_PREVIEW.weights[screen.value])
		const total = weights.reduce((sum, w) => sum + w, 0)
		let landed = 0
		progress.value = 0
		done.value = false
		const step = k => {
			if (k === weights.length) {
				done.value = true
				return
			}
			ceiling.value = (landed + weights[k]) / total
			timer = window.setTimeout(
				() => {
					landed += weights[k]
					progress.value = landed / total
					step(k + 1)
				},
				(weights[k] / total) * loadS.value * 1000
			)
		}
		step(0)
	}

	function replay() {
		run.value++
		play()
	}

	function rest() {
		timer = window.setTimeout(replay, BOOT_PREVIEW.restS * 1000)
	}

	watch(screen, replay)
	onMounted(play)
	onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.boot-preview {
		position: fixed;
		inset: 0;
		background: $black;
	}

	// over the loader, low in the frame, out of the checks' way
	.boot-preview__panel {
		position: fixed;
		left: 50%;
		bottom: 1.2rem;
		z-index: $z-index-chrome;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem 1.6rem;
		padding: 0.6rem 1rem;
		translate: -50% 0;
		font-family: $font-terminal;
		font-size: $type-prose-md;
		color: $light-gray;
		@include void-panel;
	}

	.boot-preview__field {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		white-space: nowrap;
	}

	.boot-preview__control {
		font: inherit;
		accent-color: $yellow;
	}

	select.boot-preview__control {
		padding: 0.1rem 0.4rem;
		color: inherit;
		@include void-panel;
	}

	.boot-preview__replay {
		padding: 0.2rem 0.8rem;
		font: inherit;
		@include void-button;
	}
</style>

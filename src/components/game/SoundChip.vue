<template>
	<!-- The title screen's one sound control: its music, on unless a visitor turned it off. -->
	<button v-if="canPlay" type="button" class="sound-chip" :aria-pressed="soundOn" @click="toggle">
		{{ soundOn ? SOUND.labels.on : SOUND.labels.off }}
	</button>
</template>

<script setup>
	import { onBeforeUnmount, onDeactivated, onMounted, watch } from 'vue'
	import { useSound } from '@/composables/useSound'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { GAME_HOLDING } from '@/constants/game'
	import { SOUND } from '@/constants/sound'
	import { createAmbient } from '@/js/ambient'

	const props = defineProps({
		// the music opens quietly until this, then swells to full over `entrance` ({ delayMs, ms })
		cue: { type: Boolean, default: true },
		entrance: { type: Object, default: undefined },
	})
	const { arrival } = GAME_HOLDING.ambient
	// before the cue, the quiet opening; after it, the usual quick fade
	const comeIn = () => play(props.cue ? undefined : arrival)

	const canPlay = 'AudioContext' in window
	const { soundOn, setSound } = useSound()
	let ambient = null

	// made as soon as the music is wanted, so the loop is fetched and decoded while the scene comes in
	const prepare = () => (ambient ??= createAmbient(GAME_HOLDING.ambient))
	const play = entry => prepare().play(entry)
	const pause = () => ambient?.pause()

	// On but held back by the browser, the chip starts the music rather than turning it off.
	function toggle() {
		if (soundOn.value && !ambient?.playing) return play()
		setSound(!soundOn.value)
		if (soundOn.value) play()
		else pause()
	}

	// Browsers hold sound until a gesture: the music opens with the page when a click brought the
	// visitor here, otherwise on their first click or key. The chip's own click is its toggle's.
	function wake(event) {
		if (!soundOn.value || ambient?.playing || event.target.closest?.('.sound-chip')) return
		comeIn()
	}
	useWindowListener('pointerdown', wake)
	useWindowListener('keydown', wake)
	onMounted(() => soundOn.value && comeIn())
	// the swell starts from wherever the opening has got to, so the two ramps join without a step
	watch(
		() => props.cue,
		on => on && soundOn.value && play(props.entrance)
	)

	// a hidden tab goes quiet, and comes back as it was
	function onVisibility() {
		if (document.hidden) pause()
		else if (soundOn.value && ambient) play()
	}
	onMounted(() => document.addEventListener('visibilitychange', onVisibility))

	function close() {
		document.removeEventListener('visibilitychange', onVisibility)
		ambient?.close()
		ambient = null
	}
	onDeactivated(close)
	onBeforeUnmount(close)
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.sound-chip {
		@include pinned-chip;

		& {
			top: 0.6rem;
			right: 0.6rem;
			bottom: auto;
			cursor: pointer;
		}
	}
</style>

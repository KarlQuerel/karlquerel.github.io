<template>
	<!-- The title screen's one sound control: its music, on unless a visitor turned it off. -->
	<button v-if="canPlay" type="button" class="sound-chip" :aria-pressed="soundOn" @click="toggle">
		{{ soundOn ? SOUND.labels.on : SOUND.labels.off }}
	</button>
</template>

<script setup>
	import { onBeforeUnmount, onDeactivated, onMounted } from 'vue'
	import { useSound } from '@/composables/useSound'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { GAME_HOLDING } from '@/constants/game'
	import { SOUND } from '@/constants/sound'
	import { createAmbient } from '@/js/ambient'

	const canPlay = 'AudioContext' in window
	const { soundOn, setSound } = useSound()
	let ambient = null

	const play = () => (ambient ??= createAmbient(GAME_HOLDING.ambient)).play()
	const pause = () => ambient?.pause()

	// On but held back by the browser, the chip starts the music rather than turning it off.
	function toggle() {
		if (soundOn.value && !ambient?.playing) return play()
		setSound(!soundOn.value)
		if (soundOn.value) play()
		else pause()
	}

	// Browsers hold sound until a gesture: the music starts with the page when a click brought the
	// visitor here, otherwise on their first click or key. The chip's own click is its toggle's.
	function wake(event) {
		if (!soundOn.value || ambient?.playing || event.target.closest?.('.sound-chip')) return
		play()
	}
	useWindowListener('pointerdown', wake)
	useWindowListener('keydown', wake)
	onMounted(() => soundOn.value && play())

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

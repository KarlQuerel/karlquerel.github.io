<template>
	<!-- The title screen's overlay: the plated name and the start prompt, lifted off centre like the holding
	     screen's, and the music. Once `up`, a key starts the game: the name comes apart and the music fades. -->
	<div ref="titleRef" class="intro-title">
		<TitleCard
			:shown="up"
			:prompt="GAME_HOLDING.start"
			:leaving="started"
			:span="MENU.span"
			@in="named = true"
			@stripped="emit('done')"
		/>
	</div>
	<SoundChip :class="{ 'intro-title__chip--wait': !named || started }" :hushed="started" />
</template>

<script setup>
	import { ref } from 'vue'
	import { usePointerParallax } from '@/composables/usePointerParallax'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { GAME_HOLDING } from '@/constants/game'
	import { MENU } from '@/constants/intro/menu'
	import SoundChip from './SoundChip.vue'
	import TitleCard from './TitleCard.vue'

	const props = defineProps({
		// the camera rests: the name rises, and a key may start the game
		up: { type: Boolean, default: false },
	})
	// the name has come apart after a key
	const emit = defineEmits(['done'])

	const titleRef = ref(null)
	usePointerParallax(titleRef)
	const named = ref(false)
	const started = ref(false)
	useWindowListener('keydown', () => {
		if (!props.up || started.value) return
		started.value = true
	})
</script>

<style scoped lang="scss">
	// over the picture, under the cards; lifted off centre, so the globe has the foot of the frame
	.intro-title {
		position: fixed;
		inset: 0;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem 14vh;
	}

	// the music's chip appears with the name, in two steps, and goes with the start
	.sound-chip {
		transition: opacity 0.3s steps(2, end);
	}

	.intro-title__chip--wait {
		opacity: 0;
		pointer-events: none;
	}
</style>

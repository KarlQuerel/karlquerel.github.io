<template>
	<!-- /under-construction, where /game lands until GAME_SHIPPED: the plated name held still over the
	     Earth, the ship's status under it. Once the game is open a desktop goes on to /game, whose first
	     shot is the title screen; a phone stays here to be told it cannot play. -->
	<div class="content holding" :style="parallaxStyle">
		<HomeChip :class="{ 'holding__chip--wait': !shown }" />
		<SoundChip :class="{ 'holding__chip--wait': !shown }" />
		<h1 class="sr-only">{{ GAME_WORDMARK.text }}</h1>
		<!-- the entrance: the world rises, then the name rises and fades in, then the status -->
		<HoldingEarth @risen="risen = true" />
		<TitleCard
			:shown="risen"
			:line="open ? GAME_HOLDING.mobile : GAME_HOLDING.readout"
			@in="shown = true"
		/>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { usePointerParallax } from '@/composables/usePointerParallax'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { GAME_HOLDING, GAME_WORDMARK } from '@/constants/game'
	import { board } from '@/js/game/boarding'
	import HomeChip from '../HomeChip.vue'
	import HoldingEarth from './HoldingEarth.vue'
	import SoundChip from './SoundChip.vue'
	import TitleCard from './TitleCard.vue'

	const { parallaxStyle } = usePointerParallax()
	const risen = ref(false)
	// the name is in place: the way home shows
	const shown = ref(false)

	// once the game is open (shipped, or the dev server), a key still boards a tablet with a keyboard
	const open = import.meta.env.GAME_SHIPPED || import.meta.env.DEV
	const router = useRouter()
	if (open) {
		useWindowListener('keydown', () => {
			board()
			router.push('/game')
		})
	}
</script>

<style scoped lang="scss">
	// lifted off centre, so the limb has the foot of the frame to itself
	.holding {
		padding: 0 1rem 14vh;
	}

	// the corner chips appear with the name, in two steps
	.home-chip,
	.sound-chip {
		transition: opacity 0.3s steps(2, end);
	}

	.holding__chip--wait {
		opacity: 0;
	}
</style>

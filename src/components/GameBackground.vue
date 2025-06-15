<template>
	<div
		class="game-background"
		:class="{
			'fade-to-black': showCinematics && !shouldMoveBackground && !isFirstSequence,
			'first-message-block': showCinematics && !shouldMoveBackground && isFirstSequence,
			'second-message-block': shouldMoveBackground && !showThirdMessageBlock,
			'third-message-block': showThirdMessageBlock && !showFourthMessageBlock,
			'fourth-message-block': showFourthMessageBlock,
			'initial-load': isInitialLoad,
			'show-game': showGame,
		}"
	>
		<div class="background-overlay"></div>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue'

	defineProps({
		showCinematics: {
			type: Boolean,
			default: false,
		},
		shouldMoveBackground: {
			type: Boolean,
			default: false,
		},
		showThirdMessageBlock: {
			type: Boolean,
			default: false,
		},
		showFourthMessageBlock: {
			type: Boolean,
			default: false,
		},
		isInitialLoad: {
			type: Boolean,
			default: true,
		},
		showGame: {
			type: Boolean,
			default: false,
		},
		isFirstSequence: {
			type: Boolean,
			default: true,
		},
	})
</script>

<style lang="scss" scoped>
	.game-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: $black;
		z-index: 1;
		transition: all 1s ease-in-out;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: url('/assets/game/menu-background.gif');
			background-size: 210% auto;
			background-position: 0% 85%;
			opacity: 0;
			transition: all 2s ease-in-out;
			z-index: 1;
		}

		&.initial-load::before {
			animation: initialFadeIn 10s ease-in forwards;
		}

		&.show-game::before {
			opacity: 1;
		}

		&.fade-to-black::before {
			background-position: 0% 0%;
			opacity: 0;
			transition: all 3s ease-in-out;
		}
		// HERE fix fade to black before castle scroll down + gif size image
		&.first-message-block::before {
			background-image: url('/assets/game/castle.gif');
			background-size: cover;
			background-position: center top;
			opacity: 1;
			z-index: 1;
			transition: opacity 2s ease-in-out;
			animation: castleScrollDown 20s linear forwards;
		}

		&.second-message-block::before {
			background-image: url('/assets/game/dead.gif');
			background-size: 100% 100%;
			background-position: center;
			opacity: 1;
			z-index: 1;
			transition: all 4s ease-in-out;
		}

		&.third-message-block::before {
			background-image: url('/assets/game/mountains.gif');
			background-size: cover;
			background-position: center;
			opacity: 1;
			z-index: 1;
			transition: all 4s ease-in-out;
		}

		&.fourth-message-block::before {
			background-image: url('/assets/game/menu-background.gif');
			background-size: 100% 100%;
			background-position: 0% 0%;
			opacity: 1;
			z-index: 1;
			transition: all 7s ease-in-out;
		}
	}

	.background-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.15);
		pointer-events: none;
		z-index: 2;
	}

	@keyframes initialFadeIn {
		from {
			opacity: 0;
			background-size: 210% auto;
			background-position: 0% 0%;
		}
		to {
			opacity: 1;
			background-size: 210% auto;
			background-position: 0% 85%;
		}
	}

	@keyframes castleScrollDown {
		from {
			background-position: center top;
		}
		to {
			background-position: center bottom;
		}
	}
</style>

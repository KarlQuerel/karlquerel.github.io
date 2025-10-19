<template>
	<div
		class="game-background"
		:class="{
			'initial-load': isInitialLoad,
			'show-game': showGame,
			'fade-to-black': isTransitioningToCinematics,
			'sequence-0': showCinematics && currentSequence === 0,
			'sequence-1': showCinematics && currentSequence === 1,
			'sequence-2': showCinematics && currentSequence === 2,
			'sequence-3': showCinematics && currentSequence === 3,
		}"
	>
		<div class="background-overlay" />
	</div>
</template>

<script setup>
	defineProps({
		showCinematics: {
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
		isTransitioningToCinematics: {
			type: Boolean,
			default: false,
		},
		currentSequence: {
			type: Number,
			default: 0,
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

		// Simple fade to black when transitioning to cinematics
		&.fade-to-black::before {
			opacity: 0;
			transition: opacity 2s ease-in-out;
		}

		// Sequence 0: City landscape (first message block)
		&.sequence-0::before {
			background-image: url('/assets/game/landscape/city-looped.gif');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			opacity: 1;
			z-index: 1;
			transition: opacity 8s ease-in-out;
		}

		// Sequence 1: Smoke landscape (second message block)
		&.sequence-1::before {
			background-image: url('/assets/game/landscape/smoke.gif');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			opacity: 1;
			z-index: 1;
			transition: all 8s ease-in-out;
		}

		// Sequence 2: Forest landscape (third message block)
		&.sequence-2::before {
			background-image: url('/assets/game/landscape/forest1.gif');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			opacity: 1;
			z-index: 1;
			transition: all 8s ease-in-out;
		}

		// Sequence 3: Menu background (fourth message block - title screen)
		&.sequence-3::before {
			background-image: url('/assets/game/menu-background.gif');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			opacity: 1;
			z-index: 1;
			transition: all 3s ease-in-out;
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
</style>

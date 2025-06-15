<template>
	<div
		class="game-background"
		:class="{
			'fade-to-black': fadeToBlack,
			'first-message-block': showFirstMessageBlock,
			'second-message-block': showSecondMessageBlock,
			'third-message-block': showThirdMessageBlock,
			'fourth-message-block': showFourthMessageBlock,
			'fifth-message-block': showFifthMessageBlock,
			'game-started': gameStarted,
		}"
	>
		<div class="background-overlay"></div>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue'

	defineProps({
		fadeToBlack: {
			type: Boolean,
			default: false,
		},
		showFirstMessageBlock: {
			type: Boolean,
			default: false,
		},
		showSecondMessageBlock: {
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
		showFifthMessageBlock: {
			type: Boolean,
			default: false,
		},
		gameStarted: {
			type: Boolean,
			default: false,
		},
	})
</script>

<style lang="scss" scoped>
	.game-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: $black;
		transition: all 2s ease;
		z-index: 1;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			transition: opacity 2s ease;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
		}

		&.fade-to-black {
			background: $black;
			&::before {
				opacity: 0;
			}
		}

		&.first-message-block {
			&::before {
				background-image: url('/assets/backgrounds/castle.gif');
				opacity: 1;
				z-index: 1001;
			}
		}

		&.second-message-block {
			&::before {
				background-image: url('/assets/backgrounds/castle.gif');
				opacity: 1;
			}
		}

		&.third-message-block {
			&::before {
				background-image: url('/assets/backgrounds/castle.gif');
				opacity: 1;
			}
		}

		&.fourth-message-block {
			&::before {
				background-image: url('/assets/backgrounds/castle.gif');
				opacity: 1;
			}
		}

		&.fifth-message-block {
			&::before {
				background-image: url('/assets/backgrounds/castle.gif');
				opacity: 1;
			}
		}

		&.game-started {
			&::before {
				background-image: url('/assets/backgrounds/castle.gif');
				opacity: 1;
			}
		}
	}

	.background-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		pointer-events: none;
		z-index: 2;
	}
</style>

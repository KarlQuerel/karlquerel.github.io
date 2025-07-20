<template>
	<div
		class="menu-container"
		:class="{ 'fade-to-black': isTransitioningToCinematics }"
		v-show="!showCinematics"
	>
		<div class="menu-content">
			<h1 class="pixel-title">The<br /><span class="fading-text">Fading</span><br />Crown</h1>
			<div class="menu-buttons">
				<button
					class="pixel-button"
					@click="handleButtonClick('start-cinematics')"
					:disabled="!menuButtonsReady"
				>
					Start Game
				</button>
				<button
					class="pixel-button"
					@click="handleButtonClick('show-credits')"
					:disabled="!menuButtonsReady"
				>
					Credits
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useAudioManager } from '../../composables/game/useAudioManager'

	defineProps({
		showCinematics: {
			type: Boolean,
			required: true,
		},
		menuButtonsReady: {
			type: Boolean,
			required: true,
		},
		isTransitioningToCinematics: {
			type: Boolean,
			required: true,
		},
	})

	const emit = defineEmits(['start-cinematics', 'show-credits'])
	const { playClickSound } = useAudioManager()

	const handleButtonClick = async event => {
		await playClickSound()
		emit(event)
	}
</script>

<style lang="scss" scoped>
	.menu-container {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100vw;
		position: relative;
		z-index: 10;
		transition: opacity 2s ease-in-out;

		&.fade-to-black {
			opacity: 0;
		}
	}

	.menu-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 5vw;
		position: relative;
		right: 17.5vw;
		z-index: 10;
	}

	.pixel-title {
		font-size: 4rem;
		color: $yellow;
		opacity: 0;
		letter-spacing: 15px;
		text-transform: uppercase;
		text-shadow: 5px 5px 5px $black;
		width: 100%;
		font-weight: bold;
		text-align: left;
		animation: titleSlide 5s ease-out 10s forwards;
		position: relative;
		z-index: 10;
	}

	.fading-text {
		animation: FadeAnimation 5s ease-out infinite 5s;
	}

	.menu-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		opacity: 0;
		animation: simpleFadeIn 5s ease-in 12s forwards;
		width: 60%;
		position: relative;
		z-index: 10;
	}

	.pixel-button {
		font-size: 1.2rem;
		width: 100%;
		color: $yellow;
		background: rgba(0, 0, 0, 0.7);
		border: 3px solid $yellow;
		transition: all 0.3s ease;
		text-transform: uppercase;
		position: relative;
		overflow: hidden;
		border-radius: 10px;

		&:hover {
			background: $yellow;
			color: $black;
			transform: scale(1.1);
		}

		&:active {
			transform: scale(0.95);
		}

		&:disabled {
			opacity: 0;
			cursor: not-allowed;
			pointer-events: none;
			transform: none;
		}
	}

	@keyframes titleSlide {
		0% {
			opacity: 0;
			transform: translateX(-100px);
			letter-spacing: 30px;
		}
		100% {
			opacity: 1;
			transform: translateX(0);
			letter-spacing: 15px;
		}
	}

	@keyframes FadeAnimation {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.2;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes simpleFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.pixel-title {
			font-size: 2.5rem;
			letter-spacing: 10px;
		}

		.menu-buttons {
			width: 180px;
		}

		.pixel-button {
			font-size: 1.2rem;
			padding: 0.4rem 1.5rem;
		}
	}
</style>

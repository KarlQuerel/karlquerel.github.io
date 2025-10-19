<template>
	<div class="game-cinematics">
		<div class="cinematics-container" :class="{ 'fade-out': shouldFadeOut }">
			<!-- Single container for all messages in sequence -->
			<div v-if="!isFourthSequence" class="cinematics-message" ref="messageContainer">
				<!-- TypeIt will populate this with all messages sequentially -->
			</div>

			<!-- Title Screen -->
			<div v-if="isFourthSequence" class="title-screen">
				<div class="title">The <span class="fading-text">Fading</span> Crown</div>
				<div class="continue-section">
					<div class="coming-soon">Coming Soon</div>
					<button
						class="continue-button"
						@click="handleContinue"
						:disabled="!showContinueButton"
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, nextTick, watch, ref } from 'vue'
	import { useCinematicsTypewriter } from '@/composables/game/useCinematicsTypewriter'
	import { useCinematicsAudio } from '@/composables/game/useCinematicsAudio'

	const emit = defineEmits(['fade-complete', 'cinematics-complete', 'advance-sequence'])

	const messageContainer = ref(null)

	const {
		currentSequence,
		shouldFadeOut,
		showContinueButton,
		currentMessages,
		isFourthSequence,
		startSequence,
	} = useCinematicsTypewriter()

	const { initAudioPool, playTypingSound, stopAllAudio } = useCinematicsAudio()

	onMounted(() => {
		initAudioPool()
		// Start the first sequence
		nextTick(() => {
			if (messageContainer.value) {
				startSequence([messageContainer.value], playTypingSound, stopAllAudio)
			}
		})
	})

	// Watch for sequence changes to emit advance-sequence event and start new sequence
	watch(currentSequence, newSequence => {
		console.log('Sequence changed to:', newSequence)
		if (newSequence > 0) {
			emit('advance-sequence')

			// Start the new sequence after a short delay
			setTimeout(() => {
				nextTick(() => {
					if (messageContainer.value) {
						console.log(
							'Starting sequence:',
							newSequence,
							'with messages:',
							currentMessages.value
						)
						startSequence([messageContainer.value], playTypingSound, stopAllAudio)
					}
				})
			}, 500)
		}
	})

	// Watch for cinematics completion
	watch(showContinueButton, show => {
		if (show) {
			emit('cinematics-complete')
		}
	})

	const handleContinue = () => {
		emit('fade-complete')
	}
</script>

<style lang="scss" scoped>
	.game-cinematics {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.cinematics-container {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		transition: opacity 1s ease-out;
		will-change: opacity, transform;

		&.fade-out {
			opacity: 0;
			pointer-events: none;
		}
	}

	.cinematics-message {
		position: relative;
		width: 90vw;
		left: 50%;
		bottom: 50%;
		transform: translate(-50%, -50%);
		color: $yellow;
		font-size: 1.5vw;
		text-shadow: 0 0 10px $black;
		z-index: 1001;
		text-align: center;
		text-transform: uppercase;
		will-change: opacity, transform;
		filter: contrast(1.5) saturate(1.5);
		min-height: 2rem; // Ensure space for TypeIt cursor
	}

	.title-screen {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		z-index: 1001;
	}

	.title {
		position: relative;
		bottom: 25vh;
		font-size: 4.5rem !important;
		letter-spacing: 0.5rem;
		text-shadow: 0 0 10px $black;
		text-transform: uppercase;
		opacity: 0;
		color: $yellow;
		animation: TitleEntrance 7s ease-out forwards;
	}

	.fading-text {
		animation: FadeAnimation 5s ease-out infinite 5s;
	}

	@keyframes TitleEntrance {
		0% {
			opacity: 0;
			transform: translateY(100px) scale(0.5);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
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

	//HERE FOR THE CONTINUE BUTTON
	@keyframes PulseAnimation {
		0% {
			text-shadow: 0 0 10px $black;
			transform: scale(1);
		}
		50% {
			text-shadow: 0 0 20px $black;
			transform: scale(1.01);
		}
		100% {
			text-shadow: 0 0 10px $black;
			transform: scale(1);
		}
	}

	.continue-section {
		position: relative;
		bottom: 20vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.coming-soon {
		font-size: 2.5rem;
		color: $light-blue;
		text-transform: uppercase;
		letter-spacing: 0.25rem;
		opacity: 0;
		text-shadow: 0 0 30px $black;
		animation: comingSoonEntrance 3s ease-out 10s forwards;
	}

	.continue-button {
		font-size: 1.5rem;
		color: $yellow;
		background: rgba(0, 0, 0, 0.7);
		border: 3px solid $yellow;
		padding: 1rem 2rem;
		text-transform: uppercase;
		letter-spacing: 0.25rem;
		cursor: pointer;
		transition: all 0.3s ease;
		border-radius: 10px;
		opacity: 0;
		animation: buttonEntrance 2s ease-out 12s forwards;

		&:hover:not(:disabled) {
			background: $yellow;
			color: $black;
			transform: scale(1.1);
			box-shadow: 0 0 20px $yellow;
		}

		&:active:not(:disabled) {
			transform: scale(0.95);
		}

		&:disabled {
			opacity: 0;
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	@keyframes comingSoonEntrance {
		0% {
			opacity: 0;
			transform: translateY(30px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes buttonEntrance {
		0% {
			opacity: 0;
			transform: translateY(30px) scale(0.8);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>

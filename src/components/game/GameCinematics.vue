<template>
	<div class="game-cinematics">
		<div class="cinematics-container" :class="{ 'fade-out': shouldFadeOut }">
			<!-- Text Sequences -->
			<div
				v-for="(message, index) in currentMessages"
				:key="message.messageId"
				class="cinematics-message"
				:style="{ animationDelay: `${message.startDelay}s` }"
			>
				<span
					class="letter"
					v-for="(letter, letterIndex) in message.text"
					:key="letterIndex"
					:style="{
						animationDelay: `${message.startDelay + letterIndex * LETTER_DELAY}s`,
					}"
					@animationend="onLetterAnimationEnd(index, letterIndex)"
				>
					{{ letter === ' ' ? '\u00A0' : letter }}
				</span>
			</div>

			<!-- Title Screen -->
			<div v-if="isFourthSequence" class="title-screen">
				<div class="title">The <span class="fading-text">Fading</span> Crown</div>
				<div class="coming-soon">Coming Soon</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, watch } from 'vue'
	import { useCinematicsSequence } from '@/composables/game/useCinematicsSequence'
	import { useCinematicsAudio } from '@/composables/game/useCinematicsAudio'
	import { CINEMATICS_CONFIG } from '@/data/cinematicsData'

	const emit = defineEmits(['fade-complete'])

	const { LETTER_DELAY, FADE_OUT_DELAY } = CINEMATICS_CONFIG

	const { currentMessages, shouldFadeOut, isFourthSequence, nextSequence } =
		useCinematicsSequence()

	const { initAudioPool, playTypingSound } = useCinematicsAudio()

	onMounted(() => {
		initAudioPool()
		setupAudioForMessages()
	})

	const setupAudioForMessages = () => {
		currentMessages.value.forEach(message => {
			setTimeout(() => {
				playTypingSound(message.messageDuration)
			}, message.startDelay * 1000)
		})
	}

	watch(
		currentMessages,
		() => {
			if (currentMessages.value.length > 0 && !isFourthSequence.value) {
				setupAudioForMessages()
			}
		},
		{ deep: true }
	)

	const onLetterAnimationEnd = (messageIndex, letterIndex) => {
		const message = currentMessages.value[messageIndex]
		if (!message) return

		// Check if this is the last letter of the last message
		const isLastMessage = messageIndex === currentMessages.value.length - 1
		const isLastLetter = letterIndex === message.text.length - 1

		if (isLastMessage && isLastLetter) {
			setTimeout(() => {
				shouldFadeOut.value = true
				emit('fade-complete')

				setTimeout(() => {
					const hasNext = nextSequence()
					if (!hasNext) {
						// Final sequence completed
						setTimeout(() => {
							emit('fade-complete')
						}, FADE_OUT_DELAY * 1000)
					}
				}, CINEMATICS_CONFIG.TIMEOUT_BETWEEN_BLOCKS)
			}, FADE_OUT_DELAY * 1000)
		}
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
		opacity: 1;
		text-shadow: 0 0 10px $black;
		z-index: 1001;
		text-align: center;
		text-transform: uppercase;
		will-change: opacity, transform;
		filter: contrast(1.5) saturate(1.5);
	}

	.letter {
		display: inline-block;
		opacity: 0;
		animation: fadeIn 1s ease-in forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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

	//HERE TO REMOVE AND REPLACE WITH THE CONTINUE BUTTON
	.coming-soon {
		position: relative;
		bottom: 20vh;
		font-size: 2.5rem;
		color: $light-blue;
		text-transform: uppercase;
		letter-spacing: 0.25rem;
		opacity: 0;
		text-shadow: 0 0 30px $black;
		animation: comingSoonEntrance 3s ease-out 10s forwards;
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
</style>

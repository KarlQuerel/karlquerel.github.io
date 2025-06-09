<template>
	<div class="game-cinematics">
		<div class="cinematics-container" :class="{ 'fade-out': shouldFadeOut }">
			<div 
				v-for="(message, index) in currentMessages" 
				:key="index" 
				class="cinematics-message"
				:style="{ animationDelay: `${message.startDelay}s` }"
			>
				<template v-if="message.parts">
					<template v-for="(part, partIndex) in message.parts" :key="partIndex">
						<span 
							class="letter" 
							v-for="(letter, letterIndex) in part.text" 
							:key="letterIndex"
							:class="part.color"
							:style="{ animationDelay: `${message.startDelay + (partIndex * 0.05)}s` }"
							@animationend="onLetterAnimationEnd(index, partIndex, letterIndex, message.parts.length)"
						>
							{{ letter === ' ' ? '\u00A0' : letter }}
						</span>
					</template>
				</template>
				<template v-else>
					<span 
						class="letter" 
						v-for="(letter, letterIndex) in message.text" 
						:key="letterIndex"
						:style="{ animationDelay: `${message.startDelay + (letterIndex * 0.05)}s` }"
						@animationend="onLetterAnimationEnd(index, 0, letterIndex, 1)"
					>
						{{ letter === ' ' ? '\u00A0' : letter }}
					</span>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['fade-complete'])

const BASE_DELAY = 4
const LETTER_DELAY = 0.05
const MESSAGE_GAP = 1.5
const FADE_OUT_DELAY = 1


const firstMessages = [
	{ text: 'Ryn was once a powerful and thriving land' },
	{ text: 'Its banners flew proudly from golden spires' },
	{ text: 'Scholars, kings, and saints walked the same halls' },
	{ text: 'Its prosperity matched only by the wisdom of its people' },
	{ text: 'Alas, those days are long gone' }
]

const tofinish = [
	{ text: 'The royal bloodline has faded into legend' },
	{ text: 'Political schemes have bled the kingdom dry' },
	{ text: 'Noble houses squabble over ruins' },
	{ text: 'Common folk pray to silent gods' },
	{ text: 'Bandits and mercenaries have overrun the Royal Guard' },
	{ text: 'Chaos threatens the realm' }
]

const secondMessages = [
	{ text: 'Yet hope remains... Rumors of a rightful heir' },
	{ text: 'Have emerged from the East' },
	{ text: 'Steward Varric, keeper of Ryn\'s throne' },
	{ text: 'Sent me on a secret mission to find' },
	{ text: 'The last of the royal bloodline' },
]

const currentMessages = ref([])
const shouldFadeOut = ref(false)
const isSecondSequence = ref(false)

// Calculate start delays for messages
const calculateDelays = (messages) => {
	return messages.map((message, index) => {
		const previousMessages = messages.slice(0, index)
		const totalPreviousDelay = previousMessages.reduce((acc, msg) => {
			const totalLength = msg.parts 
				? msg.parts.reduce((sum, part) => sum + part.text.length, 0)
				: msg.text.length
			return acc + (totalLength * LETTER_DELAY) + MESSAGE_GAP
		}, 0)
		
		return {
			...message,
			startDelay: BASE_DELAY + totalPreviousDelay
		}
	})
}

// Initialize first sequence
currentMessages.value = calculateDelays(firstMessages)

const onLetterAnimationEnd = (messageIndex, partIndex, letterIndex, totalParts) => {
	// If this is the last letter of the last part of the last message
	if (messageIndex === currentMessages.value.length - 1 && 
		partIndex === totalParts - 1 && 
		letterIndex === (currentMessages.value[messageIndex].parts 
			? currentMessages.value[messageIndex].parts[partIndex].text.length - 1
			: currentMessages.value[messageIndex].text.length - 1)) {
		console.log('Last letter animation ended');
		if (!isSecondSequence.value) {
			// Wait a bit before starting fade out
			setTimeout(() => {
				shouldFadeOut.value = true
				// Start second sequence after fade out
				setTimeout(() => {
					shouldFadeOut.value = false
					isSecondSequence.value = true
					currentMessages.value = calculateDelays(secondMessages)
				}, 500) // Small delay before starting second sequence
			}, FADE_OUT_DELAY * 1000)
		} else {
			// After second sequence completes, wait and then fade out
			setTimeout(() => {
				shouldFadeOut.value = true
				// Emit event after fade out completes
				setTimeout(() => {
					emit('fade-complete')
				}, 2000) // Match the fade-out transition duration
			}, FADE_OUT_DELAY * 1000)
		}
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
	transition: opacity 2s ease-out;

	&.fade-out {
		opacity: 0;
	}
}

.cinematics-message {
	position: relative;
	width: 100%;
	color: $yellow;
	font-size: 1.5rem;
	opacity: 1;
	text-shadow: 0 0 10px $black;
	z-index: 1001;
	text-align: center;
	text-transform: uppercase;
}

.letter {
	display: inline-block;
	opacity: 0;
	animation: fadeIn 1s ease-in forwards;

	&.highlight-red {
		color: $light-red;
		text-shadow: 0 0 10px $light-red;
	}
	&.highlight-green {
		color: $dark-green;
		text-shadow: 0 0 10px $dark-green;
	}
	&.highlight-purple {
		color: $purple;
		text-shadow: 0 0 10px $purple;
	}
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

@keyframes messageSlideInLeft {
	from {
		opacity: 0;
		transform: translate(-100%, -50%);
	}
	to {
		opacity: 1;
		transform: translate(-50%, -50%);
	}
}

@keyframes messageSlideInRight {
	from {
		opacity: 0;
		transform: translate(0%, -50%);
	}
	to {
		opacity: 1;
		transform: translate(-50%, -50%);
	}
}

.game-cinematics-content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	color: $yellow;
	opacity: 0;
	animation: fadeIn 2s ease-in forwards;
	text-shadow: 0 0 10px $retro-green;
	z-index: 1001;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
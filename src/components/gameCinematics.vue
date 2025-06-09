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
import { ref, computed, nextTick, onMounted } from 'vue'

const emit = defineEmits(['fade-complete'])

const BASE_DELAY = 3
const LETTER_DELAY = 0.05
const MESSAGE_GAP = 0.8
const FADE_OUT_DELAY = 1


const firstMessages = [
	{ text: 'Ryn was once a powerful and thriving land' },
	{ text: 'Its banners flew proudly from golden spires' },
	{ text: 'Scholars, kings, and saints walked the same halls' },
	{ text: 'Its prosperity matched only by the wisdom of its people' },
	{ text: 'Alas, those days are long gone...' }
]

const secondMessages = [
	{ text: 'The royal bloodline has faded into legend' },
	{ text: 'Political schemes have bled the kingdom dry' },
	{ text: 'Noble houses squabble over ruins' },
	{ text: 'Common folk pray to silent gods' },
	{ text: 'Bandits have overrun the Royal Guard' },
	{ text: 'Chaos threatens the realm...' }
]

const thirdMessages = [
	{ text: 'Yet hope remains!' },
	{ text: 'Rumors of a rightful heir' },
	{ text: 'Have emerged from the East' },
	{ text: 'Steward Varric, keeper of Ryn\'s throne' },
	{ text: 'Sent me on a secret mission to restore...' }
]

const fourthMessages = [
	{ text: 'The Fading Crown' },
]

const currentMessages = ref([])
const shouldFadeOut = ref(false)
const isSecondSequence = ref(false)
const isThirdSequence = ref(false)
const audioPool = ref([])
const POOL_SIZE = 5
let currentAudioIndex = 0
const lastSoundTime = ref(0)
const SOUND_INTERVAL = 2000

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

// Update the onMounted to create audio pool
onMounted(() => {
	// Create a pool of audio elements
	for (let i = 0; i < POOL_SIZE; i++) {
		const audio = new Audio('/assets/sound/typing.mp3')
		audio.volume = 1
		
		// Add detailed event listeners for each audio element
		audio.addEventListener('canplaythrough', () => {
			console.log(`Audio element ${i} loaded and ready`)
		})
		
		audio.addEventListener('playing', () => {
			console.log(`Audio element ${i} started playing`)
		})
		
		audio.addEventListener('ended', () => {
			console.log(`Audio element ${i} finished playing`)
		})
		
		audio.addEventListener('error', (e) => {
			console.error(`Audio element ${i} error:`, e)
		})

		// Test each audio element directly
		audio.play()
			.then(() => {
				console.log(`Test play successful for audio element ${i}`)
				// Immediately pause it
				audio.pause()
				audio.currentTime = 0
			})
			.catch(e => {
				console.error(`Test play failed for audio element ${i}:`, e)
			})

		audioPool.value.push(audio)
	}
	console.log('Audio pool created with', POOL_SIZE, 'elements')
})

// Update the typewriter function with more logging
const typewriter = (message, partIndex, letterIndex, totalParts) => {
	if (letterIndex < message.text.length) {
		// Play typing sound every second
		const now = Date.now()
		if (now - lastSoundTime.value >= SOUND_INTERVAL) {
			if (audioPool.value.length > 0) {
				const audio = audioPool.value[currentAudioIndex]
				console.log(`Attempting to play audio element ${currentAudioIndex}`)
				audio.currentTime = 0
				audio.play()
					.then(() => console.log(`Successfully started playing audio element ${currentAudioIndex}`))
					.catch(e => console.error(`Failed to play audio element ${currentAudioIndex}:`, e))
				currentAudioIndex = (currentAudioIndex + 1) % POOL_SIZE
				lastSoundTime.value = now
			}
		}

		if (message.parts) {
			message.parts[partIndex].displayedText = message.text.slice(0, letterIndex + 1)
		} else {
			message.displayedText = message.text.slice(0, letterIndex + 1)
		}
		setTimeout(() => {
			typewriter(message, partIndex, letterIndex + 1, totalParts)
		}, LETTER_DELAY * 1000)
	} else {
		onLetterAnimationEnd(
			currentMessages.value.indexOf(message),
			partIndex,
			letterIndex - 1,
			totalParts
		)
	}
}

const onLetterAnimationEnd = (messageIndex, partIndex, letterIndex, totalParts) => {
	if (messageIndex === currentMessages.value.length - 1 && 
		partIndex === totalParts - 1 && 
		letterIndex === (currentMessages.value[messageIndex].parts 
			? currentMessages.value[messageIndex].parts[partIndex].text.length - 1
			: currentMessages.value[messageIndex].text.length - 1)) {
		if (!isSecondSequence.value) {
			// First sequence to second sequence
			setTimeout(() => {
				shouldFadeOut.value = true
				emit('fade-complete')
				setTimeout(() => {
					shouldFadeOut.value = false
					isSecondSequence.value = true
					currentMessages.value = []
					nextTick(() => {
						currentMessages.value = calculateDelays(secondMessages)
					})
				}, 500)
			}, FADE_OUT_DELAY * 1000)
		} else if (!isThirdSequence.value) {
			// Second sequence to third sequence
			setTimeout(() => {
				shouldFadeOut.value = true
				emit('fade-complete')
				setTimeout(() => {
					shouldFadeOut.value = false
					isThirdSequence.value = true
					currentMessages.value = []
					nextTick(() => {
						currentMessages.value = calculateDelays(thirdMessages)
					})
				}, 500)
			}, FADE_OUT_DELAY * 1000)
		} else {
			// After third sequence completes
			setTimeout(() => {
				shouldFadeOut.value = true
				setTimeout(() => {
					emit('fade-complete')
				}, 500)
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
	transition: opacity 1s ease-out;
	will-change: opacity, transform;

	&.fade-out {
		opacity: 0;
		pointer-events: none;
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
	will-change: opacity, transform;
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
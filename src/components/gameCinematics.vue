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
import { ref, computed, nextTick, onMounted, watch } from 'vue'

const emit = defineEmits(['fade-complete'])

const BASE_DELAY = 3
const LETTER_DELAY = 0.05
const MESSAGE_GAP = 0.8
const FADE_OUT_DELAY = 1

const firstMessages = [
	{ 
		text: 'Ryn was once a powerful and thriving land',
		parts: [
			{ text: 'Ryn', color: 'purple' },
			{ text: ' was once a powerful and thriving land' }
		]
	},
	{ text: 'Its banners flew proudly from golden spires' },
	{ text: 'Scholars, kings, and saints walked the same halls' },
	{ text: 'Its prosperity matched only by the wisdom of its people' },
	{ 
		text: 'Alas, those days are long gone...',
		parts: [
			{ text: 'Alas, those days are ' },
			{ text: 'long gone', color: 'red' },
			{ text: '...' }
		]
	},
	
]

const secondMessages = [
	{ text: 'The royal bloodline has faded into legend' },
	{ text: 'Political schemes have bled the kingdom dry' },
	{ text: 'Noble houses squabble over ruins' },
	{ text: 'Common folk pray to silent gods' },
	{ text: 'Bandits have overrun the Royal Guard' },
	{ 
		text: 'Chaos threatens the realm...',
		parts: [
			{ text: 'Chaos ', color: 'red' },
			{ text: 'threatens the realm...' }
		]
	},
]

const thirdMessages = [
	{
		text: 'Yet hope remains!',
		parts: [
			{ text: 'Yet ' },
			{ text: 'hope', color: 'blue' },
			{ text: ' remains!' }
		]
	},
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

// Track which messages have already played their typing sound
const playedMessages = ref(new Set())
const activeAudioLoops = ref(new Map()) // Track active audio loops per message

const calculateDelays = (messages) => {
	const result = messages.map((message, index) => {
		const previousMessages = messages.slice(0, index)
		const totalPreviousDelay = previousMessages.reduce((acc, msg) => {
			const totalLength = msg.parts 
				? msg.parts.reduce((sum, part) => sum + part.text.length, 0)
				: msg.text.length
			return acc + (totalLength * LETTER_DELAY) + MESSAGE_GAP
		}, 0)
		
		const startDelay = BASE_DELAY + totalPreviousDelay
		const messageDuration = (message.parts 
			? message.parts.reduce((sum, part) => sum + part.text.length, 0)
			: message.text.length) * LETTER_DELAY
		
		return {
			...message,
			startDelay,
			messageDuration,
			messageId: `${Date.now()}-${index}` // Unique ID for tracking
		}
	})
	return result;
}

// Initialize first sequence
currentMessages.value = calculateDelays(firstMessages)

onMounted(() => {
	// Create audio pool
	for (let i = 0; i < POOL_SIZE; i++) {
		const audio = new Audio('/assets/sound/typing.mp3')
		audio.volume = 1
		audio.preload = 'auto'
		audio.load()
		audioPool.value.push(audio)
	}
	
	// Set up timers for each message's typing sound
	setupMessageTimers()
})

// Function to start looping audio for a specific message
const startTypingAudioLoop = (messageId, duration) => {
	if (playedMessages.value.has(messageId)) {
		return // Already started for this message
	}
	
	playedMessages.value.add(messageId)
	
	if (audioPool.value.length > 0) {
		const audio = audioPool.value[currentAudioIndex]
		audio.currentTime = 0
		audio.loop = true // Enable looping
		
		const playPromise = audio.play()
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					console.log(`Starting looped typing sound for message: ${messageId}`)
					// Store the audio reference so we can stop it later
					activeAudioLoops.value.set(messageId, audio)
					
					// Stop the loop after the message duration
					setTimeout(() => {
						stopTypingAudioLoop(messageId)
					}, duration * 1000)
				})
				.catch(e => {
					console.error(`Failed to play typing sound:`, e)
					audio.load()
				})
		}
		
		currentAudioIndex = (currentAudioIndex + 1) % POOL_SIZE
	}
}

// Function to stop looping audio for a specific message
const stopTypingAudioLoop = (messageId) => {
	const audio = activeAudioLoops.value.get(messageId)
	if (audio) {
		audio.loop = false
		audio.pause()
		audio.currentTime = 0
		activeAudioLoops.value.delete(messageId)
		console.log(`Stopped looped typing sound for message: ${messageId}`)
	}
}

// Set up timers for each message's typing sound
const setupMessageTimers = () => {
	currentMessages.value.forEach((message) => {
		// Start looping sound when message starts typing (at startDelay time)
		setTimeout(() => {
			startTypingAudioLoop(message.messageId, message.messageDuration)
		}, message.startDelay * 1000)
	})
}

// Watch for message changes and set up new timers
watch(currentMessages, (newMessages) => {
	if (newMessages.length > 0) {
		// Stop any currently playing audio loops
		activeAudioLoops.value.forEach((audio, messageId) => {
			stopTypingAudioLoop(messageId)
		})
		// Clear the played messages set for new sequence
		playedMessages.value.clear()
		// Set up timers for new messages
		nextTick(() => {
			setupMessageTimers()
		})
	}
}, { deep: true })

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

	&.red {
		color: $light-red;
	}
	&.green {
		color: $dark-green;
	}
	&.purple {
		color: $purple;
	}
	&.blue {
		color: $light-blue;
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
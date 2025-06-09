<template>
	<div class="game-cinematics">
		<div class="cinematics-container" :class="{ 'fade-out': shouldFadeOut }">
			<template v-if="!isFourthSequence">
				<div 
					v-for="(message, index) in currentMessages" 
					:key="index" 
					class="cinematics-message"
					:style="{ animationDelay: `${message.startDelay}s` }"
				>
					<span 
						class="letter" 
						v-for="(letter, letterIndex) in message.text" 
						:key="letterIndex"
						:style="{ animationDelay: `${message.startDelay + (letterIndex * 0.05)}s` }"
						@animationend="onLetterAnimationEnd(index, 0, letterIndex, 1)"
					>
						{{ letter === ' ' ? '\u00A0' : letter }}
					</span>
				</div>
			</template>
			<template v-else>
				<div class="title">
					The <span class="fading-text">Fading</span> Crown
				</div>
				<!-- HERE TO REMOVE AND REPLACE WITH THE CONTINUE BUTTON -->
				<div class="coming-soon">
					Coming Soon
				</div>
			</template>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'

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
	{ text: 'Sent me on a secret mission to restore' }
]



const currentMessages = ref([])
const shouldFadeOut = ref(false)
const isSecondSequence = ref(false)
const isThirdSequence = ref(false)
const isFourthSequence = ref(false)
const audioPool = ref([])
const POOL_SIZE = 5
let currentAudioIndex = 0

const playedMessages = ref(new Set())
const activeAudioLoops = ref(new Map())

const calculateDelays = (messages) => {
	const result = messages.map((message, index) => {
		const previousMessages = messages.slice(0, index)
		const totalPreviousDelay = previousMessages.reduce((acc, msg) => {
			const totalLength = msg.text.length
			return acc + (totalLength * LETTER_DELAY) + MESSAGE_GAP
		}, 0)
		
		const startDelay = BASE_DELAY + totalPreviousDelay
		const messageDuration = message.text.length * LETTER_DELAY
		
		return {
			...message,
			startDelay,
			messageDuration,
			messageId: `${Date.now()}-${index}`
		}
	})
	return result;
}

currentMessages.value = calculateDelays(firstMessages)

onMounted(() => {
	for (let i = 0; i < POOL_SIZE; i++) {
		const audio = new Audio('/assets/sound/typing.mp3')
		audio.volume = 0.4
		audio.preload = 'auto'
		audio.load()
		audioPool.value.push(audio)
	}
	
	setupMessageTimers()
})

const startTypingAudioLoop = (messageId, duration) => {
	if (playedMessages.value.has(messageId)) {
		return
	}
	
	playedMessages.value.add(messageId)
	
	if (audioPool.value.length > 0) {
		const audio = audioPool.value[currentAudioIndex]
		audio.currentTime = 0
		audio.loop = true
		
		const playPromise = audio.play()
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					activeAudioLoops.value.set(messageId, audio)
					
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

const stopTypingAudioLoop = (messageId) => {
	const audio = activeAudioLoops.value.get(messageId)
	if (audio) {
		audio.loop = false
		audio.pause()
		audio.currentTime = 0
		activeAudioLoops.value.delete(messageId)
	}
}

const setupMessageTimers = () => {
	currentMessages.value.forEach((message) => {
		setTimeout(() => {
			startTypingAudioLoop(message.messageId, message.messageDuration)
		}, message.startDelay * 1000)
	})
}

watch(currentMessages, (newMessages) => {
	if (newMessages.length > 0) {
		activeAudioLoops.value.forEach((audio, messageId) => {
			stopTypingAudioLoop(messageId)
		})
		playedMessages.value.clear()
		nextTick(() => {
			if (!isFourthSequence.value) {
				setupMessageTimers()
			}
		})
	}
}, { deep: true })

const onLetterAnimationEnd = (messageIndex, partIndex, letterIndex, totalParts) => {
	if (messageIndex === currentMessages.value.length - 1 && 
		partIndex === totalParts - 1 && 
		letterIndex === currentMessages.value[messageIndex].text.length - 1) {
		if (!isSecondSequence.value) {
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
		} else if (!isFourthSequence.value) {
			setTimeout(() => {
				shouldFadeOut.value = true
				emit('fade-complete')
				setTimeout(() => {
					shouldFadeOut.value = false
					isFourthSequence.value = true
				}, 500)
			}, FADE_OUT_DELAY * 1000)
		} else {
			setTimeout(() => {
				shouldFadeOut.value = true
				setTimeout(() => {
					emit('fade-complete')
				}, 500)
			}, FADE_OUT_DELAY * 1000)
		}
	}
}

const setupDramaticEntrance = () => {
	nextTick(() => {
		const dramaticLetters = document.querySelectorAll('.dramatic-letter');
		dramaticLetters.forEach((letter, index) => {
			letter.style.setProperty('--letter-index', index);
		});
	});
};
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
	font-size: clamp(1rem, 1.75rem, 2rem);
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
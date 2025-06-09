<template>
	<div v-if="isMobile" class="mobile-message">
		<div class="mobile-content">
			<h2>Sorry, this game is not available on mobile devices</h2>
			<p>Please use a  <span class="highlight">desktop computer</span> for the best experience</p>
		</div>
	</div>
	<div v-else style="overflow: hidden; height: 100vh;">
		<div v-if="!showGame" class="pre-game-screen">
			<div class="pre-game-content">
				<h2 class="pre-game-title">For the best experience<br>turn on your <span class="highlight">sound</span> before starting</h2>
				<button class="sound-button pixel-button" @click="startMenu">SOUND IS ON!</button>
			</div>
		</div>
		<div v-else class="game-container" ref="gameContainer" :class="{ 'first-message-block': showCinematics && !shouldMoveBackground, 'second-message-block': shouldMoveBackground && !showThirdMessageBlock, 'third-message-block': showThirdMessageBlock && !showFourthMessageBlock, 'fourth-message-block': showFourthMessageBlock, 'initial-load': isInitialLoad, 'show-game': showGame }">
			<div v-if="!showCinematics" class="menu-container">
				<h1 class="pixel-title">The<br>Fading<br>Crown</h1>
				<div class="menu-buttons">
					<button v-if="menuButtonsReady" class="pixel-button" @click="launchCinematics">Start Game</button>
					<!-- HERE TO DO: Add options button -->
					<!-- <button class="pixel-button">Options</button> -->
					<button v-if="menuButtonsReady" class="pixel-button" @click="showCreditsHandler">Credits</button>
				</div>
			</div>
			<GameCinematics v-if="showCinematics" @fade-complete="onFadeComplete" />
			<CreditsModal :is-visible="showCredits" @close="showCredits = false" />
		</div>
	</div>
	<audio ref="bgMusic" loop>
		<source src="/assets/music/menu-wow.mp3" type="audio/mpeg">
	</audio>
	<audio ref="clickSound">
		<source src="/assets/sound/button-press.wav" type="audio/mpeg">
	</audio>
</template>

<script setup>


import { ref, onMounted, onUnmounted } from 'vue';
import GameCinematics from './gameCinematics.vue';
import CreditsModal from './CreditsModal.vue';

const bgMusic = ref(null);
const clickSound = ref(null);
const showGame = ref(false);
const isMobile = ref(false);
const showCinematics = ref(false);
const gameContainer = ref(null);
const shouldMoveBackground = ref(false);
const showCredits = ref(false);
const isInitialLoad = ref(true);
const showThirdMessageBlock = ref(false);
const showFourthMessageBlock = ref(false);
const menuButtonsReady = ref(false);


const checkMobile = () => {
	const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	isMobile.value = mobileRegex.test(navigator.userAgent) || window.innerWidth <= 768;
};


const launchCinematics = async () => {
    await playClickSound();
    showCinematics.value = true;
    if (gameContainer.value) {
        gameContainer.value.classList.add('first-message-block');
    }
};

const onFadeComplete = () => {
    if (showCinematics.value && !shouldMoveBackground.value) {
        shouldMoveBackground.value = true;
    } else if (showCinematics.value && shouldMoveBackground.value && !showThirdMessageBlock.value) {
        showThirdMessageBlock.value = true;
    } else if (showCinematics.value && showThirdMessageBlock.value && !showFourthMessageBlock.value) {
        showFourthMessageBlock.value = true;
    } else if (showCinematics.value && showFourthMessageBlock.value) {
        // All sequences complete, reset states
        showCinematics.value = false;
        shouldMoveBackground.value = false;
        showThirdMessageBlock.value = false;
        showFourthMessageBlock.value = false;
        showGame.value = true;
    }
};

const startMenu = async () => {
	showGame.value = true;
	if (bgMusic.value) {
		try {
			bgMusic.value.volume = 1;
			await bgMusic.value.play();
		} catch (error) {
			console.error('Error playing music:', error);
		}
	} else {
		console.error('Audio element not found');
	}
};

const playClickSound = async () => {
	if (clickSound.value) {
		try {
			clickSound.value.currentTime = 0;
			await clickSound.value.play();
		} catch (error) {
			console.error('Error playing click sound:', error);
		}
	}
};

const showCreditsHandler = async () => {
    await playClickSound();
    showCredits.value = true;
};

onMounted(() => {
	checkMobile();
	window.addEventListener('resize', checkMobile);
	if (bgMusic.value) {
		bgMusic.value.volume = 1;
	} else {
		console.error('Audio element not found on mount');
	}
	if (clickSound.value) {
		clickSound.value.volume = 1;
		clickSound.value.load();
	}

	setTimeout(() => {
		isInitialLoad.value = false;
		menuButtonsReady.value = true;
	}, 12000);
});

onUnmounted(() => {
	window.removeEventListener('resize', checkMobile);
	if (bgMusic.value) {
		bgMusic.value.pause();
		bgMusic.value.currentTime = 0;
	}
	if (clickSound.value) {
		clickSound.value.pause();
		clickSound.value.currentTime = 0;
	}
});
</script>

<style lang="scss" scoped>
.mobile-message {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: $black;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 3000;
}

.mobile-content {
	text-align: center;
	padding: 2rem;
	background: rgba(0, 0, 0, 0.9);
	border-radius: 15px;
	border: 3px solid $retro-green;
	box-shadow: 
		0 0 50px $retro-green,
		inset 0 0 20px rgba(0, 255, 0, 0.1);
	max-width: 80%;

	h2 {
		color: $yellow;
		font-size: 1.5rem;
		margin-bottom: 1rem;
		text-shadow: 0 0 10px $retro-green;
	}

	p {
		color: $retro-green;
		font-size: 1.2rem;
		text-shadow: 0 0 5px $retro-green;
	}
}

.pre-game-screen {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2000;
	height: 100vh;
	width: 100vw;
}

.pre-game-content {
	text-align: center;
	padding: 3rem;
	background: $black;
	border-radius: 15px;
	border: 3px solid $retro-green;
	box-shadow: 
		0 0 50px $retro-green,
		inset 0 0 20px rgba(0, 255, 0, 0.1);
	max-width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.pre-game-title {
	color: $yellow;
	font-size: 1.2rem;
	margin-bottom: 2rem;
	text-transform: uppercase;
}

.highlight {
	color: $retro-green;
	font-weight: bold;
}

.pre-game-button {
	font-size: 1.8rem;
	color: $retro-green;
	background: transparent;
	border: 3px solid $retro-green;
	padding: 1.5rem 3rem;
	cursor: pointer;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 3px;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(0, 255, 0, 0.2),
			transparent
		);
		transition: 0.5s;
	}

	&:hover {
		background: rgba(0, 255, 0, 0.1);
		text-shadow: 0 0 10px $retro-green;
		box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);

		&::before {
			left: 100%;
		}
	}

	&:active {
		transform: scale(0.95);
	}
}

@keyframes scaleIn {
	from {
		transform: scale(0.8);
		opacity: 0;
	}
	to {
		transform: scale(1);
		opacity: 1;
	}
}

.game-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 95vw;
	height: 95vh;
	background: $black;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	border: 3px dashed $retro-green;
	border-radius: 10px;
	box-shadow:
		0 0 100px $retro-green,
		inset 0 0 20px rgba(0, 255, 0, 0.1);
	margin: 5vh;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('/assets/img/menu-background.gif');
		background-size: 250% auto;
		background-position: 0% 85%;
		opacity: 0;
		transition: background-position 4s ease-in-out, background-size 4s ease-in-out;
	}

	&.initial-load::before {
		animation: initialFadeIn 10s ease-in forwards;
	}

	&.show-game::before {
		opacity: 1;
	}

	&.first-message-block::before {
		background-size: 325% auto;
		background-position: 55% 55%;
		transition: background-position 4s ease-in-out, background-size 4s ease-in-out;
	}

	&.second-message-block::before {
		background-size: 300% auto;
		background-position: 90% 65%;
		transition: background-position 4s ease-in-out, background-size 4s ease-in-out;
	}

	&.third-message-block::before {
		background-size: 205% auto;
		background-position: 90% 25%;
		transition: background-position 4s ease-in-out, background-size 4s ease-in-out;
	}

	&.fourth-message-block::before {
		background-size: 100% auto;
		background-position: 0% -5%;
		transition: background-position 7s ease-in-out, background-size 7s ease-in-out;
	}

}

@keyframes initialFadeIn {
	from {
		opacity: 0;
		background-size: 500% auto;
		background-position: 0% 0%;
	}
	to {
		opacity: 1;
		background-size: 250% auto;
		background-position: 0% 85%;
	}
}

.menu-container {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	bottom: 5rem;
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
	position: relative;
	top: 50%;
	right: 22.5vw;
	text-align: left;
	animation: titleSlide 5s ease-out 10s forwards;
}

.menu-buttons {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	opacity: 0;
	animation: simpleFadeIn 5s ease-in 12s forwards;
	position: relative;
	top: 10rem;
	right: 27.5vw;
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
}

@keyframes simpleFadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(600px);
		scale: 0.5;
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (max-width: 768px) {
	.pixel-title {
		font-size: 2.5rem;
	}

	.pixel-button {
		font-size: 1.2rem;
		padding: 0.4rem 1.5rem;
	}
}

.sound-button {
	width: 50%;
	color: $retro-green;
	border: 3px solid $retro-green;

	&:hover {
		background: $retro-green;
	}
}

.title-slide {
	animation: titleSlide 5s ease-out forwards;
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

</style>

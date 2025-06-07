<template>
	<div class="game-container">
		<div class="game-content">
			<h1 class="pixel-title">The Last Steward</h1>
			<div class="menu-buttons">
				<!-- <button class="pixel-button">START GAME</button>
				<button class="pixel-button">OPTIONS</button>
				<button class="pixel-button">CREDITS</button> -->
			</div>
		</div>
		<audio ref="bgMusic" loop>
			<source src="/assets/music/menu.mp3" type="audio/mpeg">
		</audio>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const bgMusic = ref(null);

onMounted(() => {
	// Start playing when component is mounted
	if (bgMusic.value) {
		bgMusic.value.volume = 1; // Set initial volume to 50%
		bgMusic.value.play().catch(error => {
			console.log('Audio playback failed:', error);
		});
	}
});

onUnmounted(() => {
	if (bgMusic.value) {
		bgMusic.value.pause();
		bgMusic.value.currentTime = 0;
	}
});
</script>

<style lang="scss" scoped>
.game-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 95vw;
	height: 95vh;
	background: $black;
	background-image: url('/assets/img/menu.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;

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
}

.game-content {
	text-align: center;
}

.pixel-title {
	font-size: 4rem;
	color: $yellow;
	margin-bottom: 30rem;
	opacity: 0;
	animation: fadeIn 10s ease-in forwards;
	letter-spacing: 25px;
	text-transform: uppercase;
	background-color: rgba(0, 0, 0, 0.8);
	// padding: 1rem;
	border-radius: 10px;
	// box-shadow: 0 0 10px $retro-green;
}

.menu-buttons {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	opacity: 0;
	animation: fadeIn 1s ease-in forwards 1s;
}

.pixel-button {
	font-size: 1.5rem;
	color: $retro-green;
	background: transparent;
	border: 2px solid $retro-green;
	padding: 0.5rem 2rem;
	cursor: pointer;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 2px;
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
		box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);

		&::before {
			left: 100%;
		}
	}

	&:active {
		transform: scale(0.95);
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
</style>
  
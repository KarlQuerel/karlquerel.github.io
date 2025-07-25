<template>
	<div v-if="isVisible" class="credits-modal-overlay" @click.self="close">
		<div class="credits-modal">
			<button class="close-button" @click="close">×</button>
			<div class="credits-content">
				<h2 class="credits-title">Credits</h2>
				<div class="credits-section">
					<h3>Artwork</h3>
					<p>Fatih Emir</p>
					<p>Kryssalian</p>
					<p>Vertibirdo</p>
					<p>v78</p>
				</div>
				<div class="credits-section">
					<h3>Music</h3>
					<p>World of Warcraft</p>
					<h3>Everything Else</h3>
					<p>Karl Querel</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps, defineEmits } from 'vue'

	defineProps({
		isVisible: {
			type: Boolean,
			required: true,
		},
	})

	const emit = defineEmits(['close'])

	const playClickSound = async () => {
		const clickSound = new Audio('/assets/sound/button-press.wav')
		clickSound.volume = 1
		try {
			await clickSound.play()
		} catch (error) {
			console.error('Error playing click sound:', error)
		}
	}

	const close = async () => {
		await playClickSound()
		emit('close')
	}
</script>

<style lang="scss" scoped>
	.credits-modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2000;
		animation: fadeIn 0.3s ease-out;
	}

	.credits-modal {
		position: fixed;
		top: 20%;
		background: $black;
		background-image: url('/assets/game/credits.gif');
		background-size: cover;
		background-position: 100% 50%;
		background-repeat: no-repeat;
		border: 2px dashed $yellow;
		border-radius: 15px;
		padding: 2rem;
		width: 100%;
		height: 75%;
		max-width: 90%;
		overflow-y: auto;
		box-shadow: 0 0 20px $yellow;
		animation: slideIn 0.3s ease-out;

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background: $black;
		}

		&::-webkit-scrollbar-thumb {
			background: $yellow;
			border-radius: 4px;
		}
	}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		color: $retro-green;
		font-size: 2rem;
		cursor: auto;
		padding: 0.5rem;
		line-height: 1;
		transition: color 0.3s ease;

		&:hover {
			color: $yellow;
		}
	}

	.credits-content {
		color: $retro-green;
		text-align: left;
	}

	.credits-title {
		font-size: 2rem;
		text-align: center;
		color: $yellow;
		text-transform: uppercase;
		text-shadow: 0 0 10px $black;
	}

	.credits-section {
		h3 {
			color: $yellow;
			font-size: 2.75vh;
			text-transform: uppercase;
			text-shadow: 0 0 10px $black;
			margin-top: 3rem;
		}

		p,
		li {
			color: $retro-green;
			text-align: left;
			font-size: 2.5vh;
			text-transform: uppercase;
			text-shadow: 0 0 10px $black;
		}

		ul {
			list-style-type: none;

			li {
				position: relative;
			}
		}
		p {
			margin: 1rem 0;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateY(-20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>

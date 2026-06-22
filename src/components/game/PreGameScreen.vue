<template>
	<div v-if="!showGame" class="pre-game-screen">
		<div class="pre-game-content">
			<h2 class="pre-game-title">
				This game is currently<br />
				<span class="highlight">in development</span>
			</h2>
			<h2 class="pre-game-title">
				For the best experience<br />turn on your
				<span class="highlight">sound</span> before starting
			</h2>
			<button class="pixel-button" @click="$emit('start-game')">Sound is on!</button>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		showGame: {
			type: Boolean,
			required: true,
		},
	})

	defineEmits(['start-game'])
</script>

<style lang="scss" scoped>
	.pre-game-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: $z-game-modal;
		height: 100%;
		width: 100%;
	}

	.pre-game-content {
		text-align: center;
		padding: 3rem;
		background: $black;
		border-radius: 15px;
		border: 3px solid $light-gray;
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
		color: $light-gray;
		font-weight: bold;
	}

	.pixel-button {
		font-size: 1.2rem;
		width: 50%;
		color: $light-gray;
		background: rgba(0, 0, 0, 0.7);
		border: 3px solid $light-gray;
		transition: all 0.3s ease;
		text-transform: uppercase;
		position: relative;
		overflow: hidden;
		border-radius: 10px;

		&:hover {
			background: $light-gray;
			color: $black;
			transform: scale(1.1);
		}

		&:active {
			transform: scale(0.95);
		}
	}
</style>

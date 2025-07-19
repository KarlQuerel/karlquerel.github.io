<template>
	<div v-if="isLoading" class="loading-screen">
		<div class="loading-content">
			<h2 class="loading-title">Loading Assets</h2>
			<div class="loading-bar-container">
				<div class="loading-bar" :style="{ width: `${loadingProgress}%` }" />
			</div>
			<div class="loading-text">{{ loadingProgress }}% Complete</div>
			<div class="loading-details">{{ loadedAssets }} / {{ totalAssets }} assets loaded</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	loadingProgress: {
		type: Number,
		required: true,
	},
	loadedAssets: {
		type: Number,
		required: true,
	},
	totalAssets: {
		type: Number,
		required: true,
	},
})
</script>

<style lang="scss" scoped>
	.loading-screen {
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

	.loading-content {
		text-align: center;
		padding: 3rem;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 15px;
		border: 3px solid $retro-green;
		box-shadow: 0 0 50px $retro-green;
		max-width: 500px;
		width: 90%;
	}

	.loading-title {
		color: $yellow;
		font-size: 2rem;
		margin-bottom: 2rem;
		text-transform: uppercase;
		letter-spacing: 3px;
	}

	.loading-bar-container {
		width: 100%;
		height: 20px;
		background: rgba(0, 0, 0, 0.5);
		border: 2px solid $retro-green;
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.loading-bar {
		height: 100%;
		background: linear-gradient(90deg, $retro-green, $yellow);
		transition: width 0.3s ease;
		border-radius: 8px;
	}

	.loading-text {
		color: $retro-green;
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	.loading-details {
		color: $yellow;
		font-size: 0.9rem;
		opacity: 0.8;
	}
</style>

<template>
	<div v-if="isMobile" class="mobile-message">
		<div class="mobile-content">
			<h2>Not available on mobile devices</h2>
			<p>
				Please use a <span class="highlight">desktop computer</span> for the best experience
			</p>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)

const checkMobile = () => {
	const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
	isMobile.value = mobileRegex.test(navigator.userAgent) || window.innerWidth <= 768
}

onMounted(() => {
	checkMobile()
	window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
	window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss" scoped>
	.mobile-message {
		position: fixed;
		top: 10vh;
		left: 0;
		width: 100vw;
		height: 90vh;
		background: $black;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1001;
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
			font-size: 1.75rem;
			margin-bottom: 1rem;
			text-shadow: 0 0 10px $retro-green;
		}

		p {
			color: $white;
			font-size: 1.5rem;
			text-shadow: 0 0 5px $retro-green;
			margin: 0 0 0 0;
		}
	}

	.highlight {
		color: $retro-green;
		font-weight: bold;
	}
</style>

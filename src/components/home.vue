<template>
	<div class="terminal-container">
		<Terminal />
	</div>
</template>

<script setup>
import Terminal from './terminal.vue'
</script>

<style lang="scss" scoped>
	.terminal-container {
		width: 100vw;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		margin-top: 5rem;
	}

	@media (max-width: 768px) {
		.terminal-container {
			padding: 1rem;
		}
	}
</style>

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
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		// Clear the fixed-bottom footer so the terminal's bottom stays visible.
		padding-bottom: var(--site-chrome-bar-height);
	}
</style>

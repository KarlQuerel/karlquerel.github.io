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
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

<template>
	<div class="content">
		<div class="nes-container is-dark is-rounded">
			<p>Under Construction</p>
		</div>

		<ClickCounter />
	</div>
</template>

<script setup>
	import ClickCounter from './clickCounter.vue'
</script>

<style lang="scss" scoped>
	.nes-container.is-dark {
		background-color: rgba(0, 0, 0, 0.5) !important;
		border: $void-border !important;
		border-radius: $void-radius !important;
		margin-bottom: 1rem !important;
		text-transform: uppercase !important;
	}
</style>

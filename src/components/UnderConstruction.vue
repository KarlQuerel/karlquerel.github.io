<template>
	<div class="content">
		<div class="uc-panel">
			<p>Under Construction</p>
		</div>

		<ClickCounter />
	</div>
</template>

<script setup>
	import ClickCounter from './ClickCounter.vue'
</script>

<style lang="scss" scoped>
	@use '@/styles/mixins' as *;

	.uc-panel {
		margin-bottom: 1rem;
		padding: 1.5rem 1.2rem;
		text-align: center;
		text-transform: uppercase;
		@include void-panel;
	}
</style>

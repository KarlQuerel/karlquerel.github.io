<template>
	<!-- the journey's corner-chip idiom on chromeless pages: one quiet way home -->
	<RouterLink class="home-chip" :to="HOME_LINK.to">{{ HOME_LINK.label }}</RouterLink>
</template>

<script setup>
	import { RouterLink } from 'vue-router'
	import { HOME_LINK } from '@/constants/navigation'
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.home-chip {
		@include pinned-chip;

		& {
			top: 0.6rem;
			left: 0.6rem;
			right: auto;
			bottom: auto;
		}
	}
</style>

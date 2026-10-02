<template>
	<!-- The choices a shot waits on: a row of labels, the site's buttons, over the picture. -->
	<div class="choice">
		<button
			v-for="option in options"
			:key="option.label"
			class="choice__option"
			type="button"
			@click="emit('pick', option.key)"
		>
			{{ option.label }}
		</button>
	</div>
</template>

<script setup>
	defineProps({
		// [{ key, label }]: key is what the pick reports
		options: { type: Array, required: true },
	})
	const emit = defineEmits(['pick'])
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.choice {
		position: fixed;
		left: 50%;
		bottom: 22vh;
		z-index: 4;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		width: min(40rem, 92vw);
		transform: translateX(-50%);
	}

	.choice__option {
		@include void-button;
		padding: 0.9rem 1.3rem;
		font-family: $font-pixel;
		font-size: $type-title;
		letter-spacing: 1px;
	}
</style>

<template>
	<div class="content">
		<div class="nes-container is-dark is-rounded">
			<p>Under Construction</p>
			<img
				src="/assets/img/construction.gif"
				alt="construction GIF"
				class="construction-gif"
			/>
			<p />
		</div>

		<!-- Clicker Button -->
		<ClickCounter />
	</div>
</template>

<script>
	import ClickCounter from './clickCounter.vue'

	export default {
		name: 'UnderConstruction',
		components: {
			ClickCounter,
		},
	}
</script>

<style lang="scss" scoped>
	.small-font {
		font-size: 1rem !important;
	}

	.nes-container.is-dark {
		background-color: rgba(0, 0, 0, 0.5) !important;
		border: 0.3vh dashed $retro-green !important;
		border-radius: 20px !important;
		margin-bottom: 1rem !important;
		text-transform: uppercase !important;
	}

	.construction-gif {
		max-width: 100%;
		height: auto;
		margin: 0.5rem 0;
		border-radius: 10px;
	}
</style>

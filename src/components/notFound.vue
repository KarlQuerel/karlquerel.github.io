<template>
	<div class="content">
		<div class="nes-container is-dark is-rounded">
			<img src="/assets/img/yako-not-found.gif" alt="lost yako" />
			<h1>Page not found</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFound',
}
</script>

<style lang="scss" scoped>
	.nes-container.is-dark {
		background-color: $black;
		border-radius: 15px;
		border: 3px solid $retro-green;
		box-shadow:
			0 0 50px $retro-green,
			inset 0 0 20px rgba(0, 255, 0, 0.1);
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;

		img {
			width: 20vw;
			height: auto;
			max-height: 40vh;
			object-fit: contain;
		}

		h1 {
			font-size: 2rem;
			color: $white;
			text-shadow: 3px 3px 10px $retro-green;
			margin: 0;
		}

		@media (max-width: 1024px) {
			img {
				width: 30vw;
			}
		}

		@media (max-width: 768px) {
			img {
				width: 40vw;
			}
		}
	}
</style>

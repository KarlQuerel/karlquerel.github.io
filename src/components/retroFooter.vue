<template>
	<footer class="footer">
		<div class="footer-copyright">
			<span>&copy; 2025 Karl Querel - All rights reserved</span>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
	.footer {
		background: rgba(0, 0, 0, 0.9);
		border: 0.3vh dashed $retro-green;
		border-bottom: 0;
		border-radius: 20px 20px 0 0;
		position: fixed;
		bottom: 0;
		z-index: 1020;
		width: fit-content;
		min-width: 200px;
		max-width: 90%;
		min-height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	.footer-copyright {
		font-size: clamp(0.5rem, 2vw, 0.7rem);
		text-align: center;
		color: $white;
		white-space: nowrap;
		padding: 0 0.5rem;
	}

	@media (max-width: 1024px) {
		.footer {
			min-width: 180px;
			max-width: 85%;
			min-height: 35px;
		}
	}

	@media (max-width: 768px) {
		.footer {
			min-width: 160px;
			max-width: 95%;
			min-height: 30px;
			padding: 0 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.footer {
			min-width: 140px;
			max-width: 95%;
			min-height: 25px;
			border-radius: 0;
		}
	}
</style>

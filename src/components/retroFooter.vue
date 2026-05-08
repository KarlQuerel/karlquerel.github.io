<template>
	<footer
		class="footer"
		:class="{ 'footer-hidden': !footerVisibility.isVisible.value }"
		data-nosnippet
	>
		<div class="footer-copyright">
			<span>&copy; 2026 Karl Querel - All rights reserved</span>
		</div>
	</footer>
</template>

<script setup>
	import { inject, ref } from 'vue'

	const footerVisibility = inject('footerVisibility', {
		isVisible: ref(true),
		toggleFooter: () => {},
		hideFooter: () => {},
		showFooter: () => {},
	})
</script>

<style lang="scss" scoped>
	.footer {
		background: rgba(0, 0, 0, 0.9);
		border-top: 0.1vh solid $retro-green;
		border-bottom: 0;
		border-left: 0;
		border-right: 0;

		border-radius: 0;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1020;
		width: 100%;

		min-height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
		box-sizing: border-box;

		transition:
			all 0.3s ease,
			transform 0.5s ease;

		&.footer-hidden {
			transform: translateY(100%);
		}
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
			min-height: 35px;
		}
	}

	@media (max-width: 768px) {
		.footer {
			min-height: 30px;
			padding: 0 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.footer {
			min-height: 25px;
		}
	}
</style>

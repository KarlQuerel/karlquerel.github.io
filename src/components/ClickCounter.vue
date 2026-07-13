<template>
	<div>
		<p v-if="loading">Loading...</p>

		<div v-else class="counter-panel">
			<p class="counter-panel__title">Waste your time</p>

			<button id="clicker" type="button" @click="incrementCounter">
				ONE CLICK AT A TIME
			</button>

			<p>
				<span>{{ counter }}</span>
			</p>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { loadClicks, updateClicks } from '../js/firebase-setup.js'

	const counter = ref(null)
	const loading = ref(true)

	onMounted(async () => {
		try {
			counter.value = await loadClicks()
		} catch {
			// Firebase unavailable — show 0 rather than hanging on "Loading..." forever
			counter.value = 0
		} finally {
			loading.value = false
		}
	})

	async function incrementCounter() {
		counter.value++

		try {
			await updateClicks()
		} catch {
			counter.value--
		}
	}
</script>

<style lang="scss" scoped>
	@use '@/styles/mixins' as *;

	#clicker {
		width: 60%;
		padding: 0.9rem 1.2rem;
		font-family: $font-pixel;
		font-size: clamp(0.55rem, 1.6vw, 0.8rem);
		letter-spacing: 1px;
		line-height: 1.6;
		@include void-button($lift: -2px);
	}

	@media (max-width: #{$breakpoint-tablet}) {
		#clicker {
			width: 100%;
		}
	}

	.counter-panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.2rem;
		padding: 1.6rem 1.4rem;
		text-align: center;
		text-transform: uppercase;
		@include void-panel;
	}

	.counter-panel__title {
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 1.8vw, 0.8rem);
		color: $yellow;
	}
</style>

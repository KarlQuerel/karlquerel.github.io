<template>
	<div>
		<p v-if="loading">Loading...</p>

		<div v-else>
			<!-- NES Button inside the container -->
			<div class="nes-container is-dark with-title is-centered is-rounded">
				<p class="title">Waste your time</p>

				<!-- Button for clicking -->
				<button id="clicker" class="nes-btn is-normal small-font" @click="incrementCounter">
					ONE CLICK AT A TIME
				</button>

				<!-- Display the counter -->
				<p>
					<span>{{ counter }}</span>
				</p>
			</div>
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
			// Firebase unavailable (offline, blocked, misconfigured) — show 0
			// rather than hanging on "Loading..." forever.
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
	.small-font {
		font-size: 1rem !important;
	}

	.nes-container.is-dark {
		background-color: rgba(255, 255, 255, 0.1) !important;
		border: 0.1vh solid $light-gray !important;
		border-radius: 20px !important;
		text-transform: uppercase !important;
	}
</style>

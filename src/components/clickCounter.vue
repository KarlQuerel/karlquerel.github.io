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

<script>
	import { loadClicks, updateClicks } from '../js/firebase-setup.js'

	export default {
		name: 'ClickCounter',
		data() {
			return {
				counter: null,
				loading: true,
			}
		},
		async mounted() {
			this.counter = await loadClicks()
			this.loading = false
		},
		methods: {
			async incrementCounter() {
				this.counter++

				try {
					await updateClicks()
				} catch (e) {
					this.counter--
				}
			},
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
		text-transform: uppercase !important;
	}
</style>

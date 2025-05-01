<template>
	<div>
		<p v-if="loading">Loading...</p>

		<div v-else>
			<!-- NES Button inside the container -->
			<div class="nes-container is-dark with-title is-centered is-rounded">
				<p class="title">Waste your time!</p>

				<!-- Button for clicking -->
				<button id="clicker" class="nes-btn is-primary small-font" @click="incrementCounter">
					One click at a time
				</button>

				<!-- Display the counter -->
				<p><span>{{ counter }}</span></p>
			</div>
		</div>
	</div>
</template>

<script>
import { loadClicks, updateClicks } from '../js/firebase-setup.js';

export default {
  name: 'ClickCounter',
  data() {
	return {
		counter: null,
		loading: true,
		};
	},
async mounted() {
	this.counter = await loadClicks();
	this.loading = false;
	},
	methods: {
	async incrementCounter() {
		this.counter = await updateClicks();
		},
	},
};
</script>

<style scoped>
.small-font {
  font-size: 1rem !important;
}
</style>

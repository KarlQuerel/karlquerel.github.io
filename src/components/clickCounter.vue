<template>
	<div>
		<p v-if="loading">Loading...</p>

		<div v-else>
			<button id="clicker" class="nes-btn is-error" @click="incrementCounter">
			CLICK ME
			</button>

			<p>Wasting time...</p>
			<p>One click at a time</p>
			<p><span>{{ counter }}</span></p>
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

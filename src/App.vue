<template>
	<div id="app">	<!-- Centralized container -->
	<!-- Background Animation -->
	<div id="particles-js"></div>

	<!-- Main Content -->
	<div class="content">
		<h1>Under Construction</h1>
		<p>This site is currently being built. Stay tuned for more!</p>

		<!-- Social Buttons -->
		<div class="share">
		<a href="mailto:karlquerel@gmail.com" target="_blank">
			<i class="nes-icon gmail is-large"></i>
		</a>
		<a href="https://github.com/KarlQuerel" target="_blank">
			<i class="nes-icon github is-large"></i>
		</a>
		<a href="https://www.linkedin.com/in/karlquerel" target="_blank">
			<i class="nes-icon linkedin is-large"></i>
		</a>
		</div>

		<!-- Clicker Button -->
		<button id="clicker" class="nes-btn is-error" @click="incrementCounter">
		CLICK ME
		</button>
		<p>How many brave souls have summoned their mighty index finger?</p>
		<p><span>{{ counter }}</span></p>
	</div>
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
	return {
		counter: 0
	};
	},
	methods: {
	incrementCounter() {
		this.counter += 1;
	}
	}
};
</script>
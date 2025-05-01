<template>
	<div id="app">	<!-- Centralized container -->
	<!-- Background Animation -->
	<div id="particles-js"></div>

	<!-- Main Content -->
	<div class="content">
		<h1>🔨 Under Construction 🔨</h1>
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
		<ClickCounter />
	</div>
	</div>
</template>

<script>

import ClickCounter from './components/clickCounter.vue';

export default {
	name: 'App',
	components: {
		ClickCounter
	}
};
</script>
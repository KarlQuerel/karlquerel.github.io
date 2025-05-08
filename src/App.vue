<template>
	<div id="app">	<!-- Centralized container -->

	<!-- HERE -->
		<!-- <SideNav /> -->
	<!-- Background Animation -->
	<div id="particles-js"></div>

	<!-- Main Content -->
	<div class="content">
		<div class="nes-container is-dark is-rounded">
			<p>Under Construction</p>
			<p> </p>

		</div>

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
import SideNav from './components/sideNav.vue';

export default {
	name: 'App',
	components: {
		ClickCounter,
		SideNav,
	}
};
</script>
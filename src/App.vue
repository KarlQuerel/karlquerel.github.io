<template>
	<!-- Centralized container -->
	<div id="app">

		<!-- Background Animation -->
		<div id="particles-js"></div>

		<!-- This is where route components (Home, NotFound, etc.) get injected -->
		<RetroNavbar />
		<router-view/>

	</div>
</template>

<script>

import RetroNavbar from './components/retroNavbar.vue';

export default {
	name: 'App',
	components: {
		RetroNavbar
	}
};
</script>
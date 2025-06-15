<template>
	<!-- Centralized container -->
	<div id="app">

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
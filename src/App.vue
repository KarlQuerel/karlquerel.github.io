<template>
	<!-- Centralized container -->
	<div id="app">

		<!-- Background Animation -->
		<div id="particles-js"></div>

		<!-- This is where route components (Home, NotFound, etc.) get injected -->
		<router-view/>

	</div>
</template>

<script>

export default {
	name: 'App',
};
</script>
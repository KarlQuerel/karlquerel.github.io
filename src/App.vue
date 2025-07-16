<template>
	<!-- Centralized container -->
	<div id="app">
		<RetroNavbar />
		<router-view />
		<RetroFooter />
	</div>
</template>

<script>
	import RetroNavbar from './components/retroNavbar.vue'
	import RetroFooter from './components/retroFooter.vue'

	export default {
		name: 'App',
		components: {
			RetroNavbar,
			RetroFooter,
		},
	}
</script>

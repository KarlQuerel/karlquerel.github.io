<template>
	<!-- Centralized container -->
	<div id="app">
		<RetroNavbar />
		<router-view />
		<RetroFooter />
	</div>
</template>

<script>
	import { ref, provide } from 'vue'
	import RetroNavbar from './components/retroNavbar.vue'
	import RetroFooter from './components/retroFooter.vue'

	export default {
		name: 'App',
		components: {
			RetroNavbar,
			RetroFooter,
		},
		setup() {
			const isFooterVisible = ref(true)

			provide('footerVisibility', {
				isVisible: isFooterVisible,
				toggleFooter: () => {
					isFooterVisible.value = !isFooterVisible.value
				},
				hideFooter: () => {
					isFooterVisible.value = false
				},
				showFooter: () => {
					isFooterVisible.value = true
				},
			})
		},
	}
</script>

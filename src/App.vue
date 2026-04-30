<template>
	<!-- Centralized container -->
	<div id="app">
		<RetroNavbar v-if="shouldShowRetroNavbar" />
		<router-view />
		<RetroFooter />
	</div>
</template>

<script>
	import { ref, provide, computed } from 'vue'
	import { useRoute } from 'vue-router'
	import RetroNavbar from './components/retroNavbar.vue'
	import RetroFooter from './components/retroFooter.vue'

	export default {
		name: 'App',
		components: {
			RetroNavbar,
			RetroFooter,
		},
		setup() {
			const route = useRoute()
			const isFooterVisible = ref(true)
			const shouldShowRetroNavbar = computed(() => route.path !== '/test')

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

			return {
				shouldShowRetroNavbar,
			}
		},
	}
</script>

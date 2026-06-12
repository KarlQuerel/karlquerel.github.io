<template>
	<div class="app-root">
		<SiteNavbar v-if="shouldShowSiteNavbar" />
		<main class="app-main">
			<router-view />
		</main>
		<SiteFooter />
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import SiteNavbar from './components/SiteNavbar.vue'
	import SiteFooter from './components/SiteFooter.vue'

	const SCROLLABLE_PATHS = ['/', '/sport']
	const LANDING_PATH = '/'

	const route = useRoute()
	const shouldShowSiteNavbar = computed(() => {
		const path = route.path.replace(/\/$/, '') || '/'
		return path !== LANDING_PATH
	})
	const isPageScrollable = computed(() => {
		const path = route.path.replace(/\/$/, '') || '/'
		return SCROLLABLE_PATHS.includes(path)
	})

	watch(
		isPageScrollable,
		scrollable => {
			document.documentElement.classList.toggle('page-scrollable', scrollable)
			if (!scrollable) {
				window.scrollTo(0, 0)
			}
		},
		{ immediate: true },
	)

	onBeforeUnmount(() => {
		document.documentElement.classList.remove('page-scrollable')
	})
</script>

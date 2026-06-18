<template>
	<div class="app-root">
		<SiteHeaderAnimation />
		<SiteNavbar />
		<main class="app-main">
			<router-view />
		</main>
		<SiteFooter />
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import SiteHeaderAnimation from './components/SiteHeaderAnimation.vue'
	import SiteNavbar from './components/SiteNavbar.vue'
	import SiteFooter from './components/SiteFooter.vue'
	import { useClickSpark } from './composables/useClickSpark'

	const SCROLLABLE_PATHS = ['/', '/sport']

	useClickSpark()

	const route = useRoute()
	const normalizedPath = () => route.path.replace(/\/$/, '') || '/'
	const isPageScrollable = computed(() => SCROLLABLE_PATHS.includes(normalizedPath()))

	watch(
		isPageScrollable,
		scrollable => {
			document.documentElement.classList.toggle('page-scrollable', scrollable)
			if (!scrollable) {
				window.scrollTo(0, 0)
			}
		},
		{ immediate: true }
	)

	onBeforeUnmount(() => {
		document.documentElement.classList.remove('page-scrollable')
	})
</script>

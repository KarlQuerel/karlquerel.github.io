<template>
	<div id="app" :class="{ 'app--scrollable': isPageScrollable }">
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

	const SCROLLABLE_PATHS = ['/test']

	const route = useRoute()
	const shouldShowSiteNavbar = computed(() => route.path !== '/test')
	const isPageScrollable = computed(() => SCROLLABLE_PATHS.includes(route.path))

	function syncPageScrollClass(scrollable) {
		document.documentElement.classList.toggle('page-scrollable', scrollable)
	}

	watch(
		isPageScrollable,
		scrollable => {
			syncPageScrollClass(scrollable)
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

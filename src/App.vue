<template>
	<div class="app-root">
		<!-- Teleported outside #app so `page-scrollable` toggles can't re-rasterise the fixed starfield -->
		<Teleport to="body">
			<SpaceBackground v-if="showChrome" />
		</Teleport>
		<main class="app-main">
			<!-- keep the heavy landing alive so its canvas + planet build only once -->
			<router-view v-slot="{ Component }">
				<keep-alive :include="KEPT_ALIVE_VIEWS">
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</main>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import SpaceBackground from './components/SpaceBackground.vue'

	const SCROLLABLE_PATHS = ['/', '/sport', '/lab']

	// Unlisted pages with no site chrome at all — no drifting starfield behind the
	// text. Reached by URL, so nothing to navigate from.
	// /lab is here for a different reason than /sport: it paints its own sky in a
	// shader and carries its own chrome, so the site's would only be drawn underneath.
	const BARE_PATHS = ['/sport', '/lab']

	// Component names (see defineOptions) kept mounted across navigation.
	const KEPT_ALIVE_VIEWS = ['HomeJourney']

	const route = useRoute()
	const normalizedPath = () => route.path.replace(/\/$/, '') || '/'
	const isPageScrollable = computed(() => SCROLLABLE_PATHS.includes(normalizedPath()))
	const showChrome = computed(() => !BARE_PATHS.includes(normalizedPath()))

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

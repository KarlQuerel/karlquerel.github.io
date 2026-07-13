<template>
	<div class="app-root">
		<!-- Teleported outside #app so `page-scrollable` toggles can't re-rasterise the fixed starfield -->
		<Teleport to="body">
			<SpaceBackground />
		</Teleport>
		<!-- no persistent chrome; NavToggle summons the navbar -->
		<!-- explicit :duration — the transition lives on a ::before, which Vue can't auto-detect -->
		<transition name="nav-overlay" :duration="420">
			<SiteNavbar v-if="navOpen" @close="navOpen = false" />
		</transition>
		<main class="app-main">
			<!-- keep the heavy landing alive so its canvas + planet build only once -->
			<router-view v-slot="{ Component }">
				<keep-alive :include="KEPT_ALIVE_VIEWS">
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</main>
		<NavToggle :open="navOpen" @toggle="navOpen = !navOpen" />
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, ref, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import SpaceBackground from './components/SpaceBackground.vue'
	import SiteNavbar from './components/SiteNavbar.vue'
	import NavToggle from './components/NavToggle.vue'
	import { useAmbientAudio } from './composables/useAmbientAudio'

	const SCROLLABLE_PATHS = ['/', '/sport', '/about']

	// Component names (see defineOptions) kept mounted across navigation.
	const KEPT_ALIVE_VIEWS = ['HeroIntro']

	const { init: initAmbientAudio } = useAmbientAudio()
	initAmbientAudio()

	const route = useRoute()
	const normalizedPath = () => route.path.replace(/\/$/, '') || '/'
	const isPageScrollable = computed(() => SCROLLABLE_PATHS.includes(normalizedPath()))

	// modal overlay; links emit `close` so it never lands over the next page
	const navOpen = ref(false)

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

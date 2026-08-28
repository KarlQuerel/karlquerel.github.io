<template>
	<div class="app-root">
		<!-- Teleported outside #app so `page-scrollable` toggles can't re-rasterise the fixed starfield -->
		<Teleport to="body">
			<SpaceBackground v-if="showChrome" />
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
		<NavToggle v-if="showToggle" :open="navOpen" @toggle="navOpen = !navOpen" />
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, ref, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import SpaceBackground from './components/SpaceBackground.vue'
	import SiteNavbar from './components/SiteNavbar.vue'
	import NavToggle from './components/NavToggle.vue'

	const SCROLLABLE_PATHS = ['/', '/preview', '/sport', '/lab']

	// Unlisted pages with no site chrome at all — no drifting starfield behind the
	// text, no MENU toggle over it. Reached by URL, so nothing to navigate from.
	// /lab is here for a different reason than /sport: it paints its own sky in a
	// shader and carries its own chrome, so the site's would only be drawn underneath.
	const BARE_PATHS = ['/sport', '/lab']

	// The journey carries its own navigation — the rail and the corner chips — so
	// the star toggle stays out of its sky instead of duplicating them over the prose.
	const SELF_NAV_PATHS = ['/']

	// Component names (see defineOptions) kept mounted across navigation.
	const KEPT_ALIVE_VIEWS = ['HeroIntro', 'HomeJourney']

	const route = useRoute()
	const normalizedPath = () => route.path.replace(/\/$/, '') || '/'
	const isPageScrollable = computed(() => SCROLLABLE_PATHS.includes(normalizedPath()))
	const showChrome = computed(() => !BARE_PATHS.includes(normalizedPath()))
	const showToggle = computed(
		() => showChrome.value && !SELF_NAV_PATHS.includes(normalizedPath())
	)

	// modal overlay; links emit `close` so it never lands over the next page
	const navOpen = ref(false)

	// arriving on a self-navigating page any other way (e.g. browser back) would
	// strand an open overlay with no toggle to dismiss it
	watch(showToggle, shown => {
		if (!shown) navOpen.value = false
	})

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

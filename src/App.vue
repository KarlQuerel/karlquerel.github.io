<template>
	<div class="app-root">
		<SpaceBackground />
		<!-- The landing is kept immersive: its chrome is stripped and replaced by
		     the single summon glyph in <MenuOverlay>. Every other page keeps the
		     persistent header, navbar, and footer. -->
		<SiteHeaderAnimation v-if="!isHome" />
		<transition name="nav-slide">
			<SiteNavbar v-if="!isHome || navOpen" :floating="isHome" />
		</transition>
		<main class="app-main">
			<router-view />
		</main>
		<NavToggle v-if="isHome" :open="navOpen" @toggle="navOpen = !navOpen" />
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, ref, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import SpaceBackground from './components/SpaceBackground.vue'
	import SiteHeaderAnimation from './components/SiteHeaderAnimation.vue'
	import SiteNavbar from './components/SiteNavbar.vue'
	import NavToggle from './components/NavToggle.vue'
	import { useClickSpark } from './composables/useClickSpark'
	import { useAmbientAudio } from './composables/useAmbientAudio'

	const SCROLLABLE_PATHS = ['/', '/sport', '/about']

	useClickSpark()

	const { init: initAmbientAudio } = useAmbientAudio()
	initAmbientAudio()

	const route = useRoute()
	const normalizedPath = () => route.path.replace(/\/$/, '') || '/'
	const isPageScrollable = computed(() => SCROLLABLE_PATHS.includes(normalizedPath()))
	const isHome = computed(() => normalizedPath() === '/')

	// The homepage nav starts hidden and is summoned by <NavToggle>. Reset it on
	// every navigation so returning to the landing always starts collapsed.
	const navOpen = ref(false)
	watch(
		() => route.path,
		() => (navOpen.value = false)
	)

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

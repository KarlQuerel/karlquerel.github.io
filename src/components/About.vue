<template>
	<div class="content about">
		<header class="about-head">
			<h1 class="about-name">KARL QUEREL</h1>
			<p v-for="(line, i) in ABOUT_INTRO" :key="i" class="about-intro">{{ line }}</p>
		</header>

		<nav class="about-tabs" role="tablist" aria-label="About sections">
			<button
				v-for="tab in TABS"
				:key="tab.id"
				class="about-tab"
				:class="{ 'is-active': tab.id === activeTab }"
				type="button"
				role="tab"
				:aria-selected="tab.id === activeTab"
				@click="selectTab(tab.id)"
			>
				{{ tab.label }}
			</button>
		</nav>

		<component :is="activeComponent" :key="activeTab" class="about-panel" />
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { ABOUT_INTRO } from '@/data/about'
	import AboutWork from './AboutWork.vue'
	import AboutLife from './AboutLife.vue'

	// `work` is the default; the active tab lives in the URL (?tab=life) so it is
	// shareable and survives refresh / back-button.
	const TABS = [
		{ id: 'work', label: 'WORK', component: AboutWork },
		{ id: 'life', label: 'LIFE', component: AboutLife },
	]

	const route = useRoute()
	const router = useRouter()

	const activeTab = computed(() => (route.query.tab === 'life' ? 'life' : 'work'))
	const activeComponent = computed(() => TABS.find(tab => tab.id === activeTab.value).component)

	function selectTab(id) {
		if (id === activeTab.value) return
		router.push({ query: id === 'work' ? {} : { tab: id } })
	}
</script>

<style scoped lang="scss">
	// The whole /about page is the RPG overworld: a seamless grassland backdrop.
	.about {
		gap: 2rem;
		padding: 2.5rem 1rem 4rem;
		background: url('/assets/about/grass-tile.png') repeat;
		background-size: 64px 64px;
		image-rendering: pixelated;
	}

	/***	HEADER		***/
	// Sits on a dark pixel panel so the intro stays legible over busy grass.
	.about-head {
		max-width: min(46rem, 94vw);
		margin: 0 auto;
		padding: 1.25rem 1.25rem 1.5rem;
		background: rgba(0, 0, 0, 0.6);
		border: 4px solid $yellow;
		box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 0.5);
	}

	.about-name {
		margin: 0;
		font-family: $font-pixel;
		font-size: clamp(1rem, 4vw, 1.8rem);
		line-height: 1.5;
		letter-spacing: 2px;
		color: $yellow;
		text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.6);
	}

	.about-intro {
		max-width: 42ch;
		margin: 0.5rem auto 0;
		font-size: clamp(0.85rem, 2vw, 1rem);
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.9);
	}

	/***	TABS		***/
	.about-tabs {
		display: flex;
		justify-content: center;
		gap: 0.6rem;
	}

	.about-tab {
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 1.8vw, 0.8rem);
		letter-spacing: 1px;
		padding: 0.7rem 1.3rem;
		color: $yellow;
		background: rgba(0, 0, 0, 0.65);
		border: 4px solid $yellow;
		box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}

	.about-tab:not(.is-active):hover {
		background: rgba(255, 189, 46, 0.18);
	}

	// Active tab reads as a pressed, filled pixel button.
	.about-tab.is-active {
		color: $black;
		background: $yellow;
		transform: translate(2px, 2px);
		box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.5);
	}

	@media (prefers-reduced-motion: reduce) {
		.about-tab.is-active {
			transform: none;
		}
	}
</style>

<template>
	<div class="content about">
		<header class="about-head">
			<p :key="activeTab ?? 'hub'" class="about-intro about-lead">
				{{ activeTab ? ABOUT_INTRO[activeTab] : ABOUT_INTRO.greeting }}
			</p>
		</header>

		<!-- Neutral landing: choose-your-path portal cards. -->
		<div v-if="!activeTab" class="about-hub" role="group" aria-label="Choose a section">
			<button
				v-for="tab in TABS"
				:key="tab.id"
				class="portal"
				type="button"
				@click="selectTab(tab.id)"
			>
				<i class="nes-icon is-large" :class="ABOUT_HUB[tab.id].icon" aria-hidden="true" />
				<span class="portal__label">{{ tab.label }}</span>
				<span class="portal__blurb">{{ ABOUT_HUB[tab.id].blurb }}</span>
			</button>
		</div>

		<!-- A path is chosen: tab bar + panel. -->
		<template v-else>
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
		</template>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { ABOUT_INTRO, ABOUT_HUB } from '@/data/about'
	import AboutWork from './AboutWork.vue'
	import AboutLife from './AboutLife.vue'

	// The active path lives in the URL (?tab=work | ?tab=life) so it is shareable
	// and survives refresh / back-button. No tab param → the neutral landing hub.
	const TABS = [
		{ id: 'work', label: 'WORK', component: AboutWork },
		{ id: 'life', label: 'LIFE', component: AboutLife },
	]

	const route = useRoute()
	const router = useRouter()

	const activeTab = computed(() => {
		const tab = route.query.tab
		return tab === 'work' || tab === 'life' ? tab : null
	})
	const activeComponent = computed(
		() => TABS.find(tab => tab.id === activeTab.value)?.component ?? null
	)

	function selectTab(id) {
		if (id === activeTab.value) return
		router.push({ query: { tab: id } })
	}
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// Backdrop (the drifting starfield) is the shared <SpaceBackground> layer.
	// Fill the visible band between the top chrome (header + navbar) and the
	// fixed footer so .content's justify-content:center centres the panels
	// vertically; taller tabs (WORK / LIFE) overflow this floor and scroll.
	.about {
		min-height: calc(
			100dvh - var(--site-header-height) - var(--site-chrome-bar-height) - var(
					--site-chrome-bar-height
				)
		);
		gap: 2rem;
		padding: 2.5rem 1rem 4rem;
	}

	/***	HEADER		***/
	// Sits on a dark pixel panel so the intro stays legible over the starfield.
	.about-head {
		max-width: min(46rem, 94vw);
		margin: 0 auto;
		padding: 1.25rem 1.25rem 1.5rem;
		@include pixel-panel(rgba(0, 0, 0, 0.6));
	}

	.about-intro {
		max-width: 42ch;
		margin: 0.5rem auto 0;
		font-size: clamp(0.85rem, 2vw, 1rem);
		line-height: 1.65;
		text-align: center;
		color: rgba(255, 255, 255, 0.9);
	}

	.about-intro:first-child {
		margin-top: 0;
	}

	// One header line: white, centred. Re-mounts on every path change (keyed) so
	// the stepped 8-bit fade replays as the copy swaps hub → WORK → LIFE.
	.about-lead {
		color: $white;
		animation: intro-swap 0.35s steps(4, end) both;
	}

	@keyframes intro-swap {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/***	HUB (choose your path)		***/
	.about-hub {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
		width: min(40rem, 94vw);
		margin: 0 auto;
	}

	.portal {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.9rem;
		padding: 1.75rem 1.25rem;
		color: rgba(255, 255, 255, 0.9);
		cursor: pointer;
		@include pixel-panel(rgba(0, 0, 0, 0.65));
	}

	// Stepped, tactile press — lift on hover, sink on click. No smooth easing.
	.portal:hover {
		background: rgba($yellow, 0.14);
		transform: translate(-2px, -2px);
		box-shadow: 8px 8px 0 0 rgba(0, 0, 0, 0.5);
	}

	.portal:active {
		transform: translate(2px, 2px);
		box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.5);
	}

	.portal__label {
		font-family: $font-pixel;
		font-size: clamp(0.75rem, 2.4vw, 1rem);
		letter-spacing: 1px;
		color: $yellow;
	}

	.portal__blurb {
		max-width: 22ch;
		font-size: clamp(0.72rem, 1.7vw, 0.85rem);
		line-height: 1.55;
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
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
		background: rgba($yellow, 0.18);
	}

	// Active tab reads as a pressed, filled pixel button.
	.about-tab.is-active {
		color: $black;
		background: $yellow;
		transform: translate(2px, 2px);
		box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.5);
	}

	@media (max-width: $breakpoint-mobile) {
		.about-hub {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.about-lead {
			animation: none;
		}

		.about-tab.is-active {
			transform: none;
		}
	}
</style>

<template>
	<div class="content about">
		<header class="about-head">
			<p :key="activeTab ?? 'hub'" class="about-intro about-lead">
				{{ activeTab ? ABOUT_INTRO[activeTab] : ABOUT_INTRO.greeting }}
			</p>
		</header>

		<div v-if="!activeTab" class="about-hub" role="group" aria-label="Choose a section">
			<button
				v-for="tab in TABS"
				:key="tab.id"
				class="portal"
				type="button"
				@click="selectTab(tab.id)"
			>
				<span class="portal__icon">
					<img :src="tab.image" alt="" class="portal__img" />
				</span>
				<span class="portal__label">{{ tab.label }}</span>
			</button>
		</div>

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
	import { ABOUT_INTRO } from '@/data/about'
	import AboutWork from './AboutWork.vue'
	import AboutLife from './AboutLife.vue'

	// Tab state lives in the URL (?tab=work|life) so it survives refresh and is shareable.
	const TABS = [
		{ id: 'work', label: 'WORK', image: '/assets/about/briefcase.png', component: AboutWork },
		{
			id: 'life',
			label: 'LIFE',
			image: '/assets/about/ps1-controller.png',
			component: AboutLife,
		},
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

	$portal-radius: 4rem;

	.about {
		min-height: 100dvh;
		gap: 2rem;
		padding: 3.6rem 1rem 4rem;
	}

	.about-head {
		max-width: min(46rem, 94vw);
		margin: 0 auto;
		padding: 1.75rem 1.5rem 2rem;
		background: radial-gradient(
			120% 130% at 50% 50%,
			rgba(0, 0, 0, 0.72) 0%,
			rgba(0, 0, 0, 0.45) 55%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.about-intro {
		max-width: 42ch;
		margin: 0.5rem auto 0;
		font-size: clamp(0.95rem, 2.2vw, 1.15rem);
		line-height: 1.75;
		text-align: center;
		color: $white;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}

	.about-intro:first-child {
		margin-top: 0;
	}

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

	.about-hub {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2.25rem;
		width: min(42rem, 94vw);
		margin: 0 auto;
		padding: 0.5rem;
	}

	.portal {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.1rem;
		padding: 2.75rem 1.5rem;
		@include void-button(
			$bg: radial-gradient(
					125% 125% at 50% 38%,
					rgba(0, 0, 0, 0.55) 0%,
					rgba(0, 0, 0, 0.18) 68%,
					rgba(0, 0, 0, 0) 100%
				)
		);
	}

	// Separate rule so it overrides the mixin's radius without trailing it.
	.portal {
		border-radius: $portal-radius;
	}

	// Transparent (not unset) so the hover/focus border reveal adds no layout shift.
	.portal:not(:hover):not(:focus-visible) {
		border-color: transparent;
	}

	.portal__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 4.5rem;
		height: 4.5rem;
		transition: filter 0.4s ease;
	}

	// Landscape rasters run wider than the square icon box.
	.portal__img {
		width: 5.5rem;
		height: auto;
		display: block;
	}

	.portal:hover .portal__icon,
	.portal:focus-visible .portal__icon {
		filter: drop-shadow(0 0 8px rgba($yellow, 0.5));
	}

	.portal__label {
		font-family: $font-pixel;
		font-size: clamp(0.75rem, 2.4vw, 1rem);
		letter-spacing: 1px;
		color: $yellow;
		transition: text-shadow 0.4s ease;
	}

	.portal:hover .portal__label,
	.portal:focus-visible .portal__label {
		text-shadow: 0 0 12px rgba($yellow, 0.55);
	}

	.about-tabs {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
	}

	.about-tab {
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 1.8vw, 0.8rem);
		letter-spacing: 1px;
		padding: 0.7rem 1.4rem;
		@include void-button($lift: -2px);
	}

	.about-tab.is-active {
		color: $yellow;
		background: rgba($yellow, 0.06);
		border-color: rgba($yellow, 0.5);
		box-shadow:
			0 0 20px rgba($yellow, 0.15),
			0 0 0 1px rgba($yellow, 0.3) inset;
		text-shadow: 0 0 10px rgba($yellow, 0.4);
	}

	@media (max-width: $breakpoint-mobile) {
		.about-hub {
			grid-template-columns: 1fr;
		}
	}

	// The void-button lift's reduced-motion handling lives in the mixin.
	@media (prefers-reduced-motion: reduce) {
		.about-lead {
			animation: none;
		}
	}
</style>

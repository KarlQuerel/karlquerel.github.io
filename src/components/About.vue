<template>
	<div class="content about">
		<header class="about-head" :class="{ 'about-head--tab': activeTab }">
			<!-- staggered pivot: each sentence block alternates sides, echoing the zigzag below -->
			<p
				v-for="(group, gi) in introGroups"
				:key="`${activeTab}-${gi}`"
				class="intro-step about-lead"
				:class="gi % 2 === 0 ? 'is-left' : 'is-right'"
				:style="{ animationDelay: gi ? `${gi * 0.15}s` : null }"
			>
				<!-- segments carry their own spacing — between-tag whitespace is stripped -->
				<template v-for="(seg, i) in group" :key="i"
					><span v-if="seg.hl" class="about-intro__hl">{{ seg.text }}</span
					><template v-else>{{ seg.text }}</template></template
				>
			</p>
			<p v-if="!activeTab" class="about-intro about-lead about-greeting">
				<span class="about-greeting__line">{{ ABOUT_INTRO.greetingLine1 }}</span>
				<span class="about-greeting__line">
					{{ ABOUT_INTRO.greetingLead
					}}<span class="about-name">{{ ABOUT_INTRO.greetingName }}</span>
				</span>
			</p>
		</header>

		<div v-if="!activeTab" class="about-hub" role="group" aria-label="Choose a section">
			<PixelPortal
				v-for="tab in TABS"
				:key="tab.id"
				:label="tab.label"
				:image="tab.image"
				@click="selectTab(tab.id)"
			/>
		</div>

		<template v-else>
			<!-- order: -1 hoists it above the intro; sticky keeps "back" reachable while a panel scrolls -->
			<button class="about-back" type="button" @click="goToHub">
				<span class="about-back__icon" aria-hidden="true"><i /><i /></span>
				Back
			</button>

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
	import PixelPortal from './PixelPortal.vue'

	// tab state lives in the URL (?tab=work|life) so it survives refresh and is shareable
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
		return TABS.some(t => t.id === tab) ? tab : null
	})
	const activeComponent = computed(
		() => TABS.find(tab => tab.id === activeTab.value)?.component ?? null
	)

	// intro segments split into sentence blocks at {br} markers, one block per zigzag step
	const introGroups = computed(() => {
		if (!activeTab.value) return []
		const groups = [[]]
		for (const seg of ABOUT_INTRO[activeTab.value]) {
			if (seg.br) groups.push([])
			else groups.at(-1).push(seg)
		}
		return groups.filter(group => group.length)
	})

	function selectTab(id) {
		if (id === activeTab.value) return
		router.push({ query: { tab: id } })
	}

	// Clear the tab query to return to the hub (greeting + section portals).
	function goToHub() {
		router.push({ query: {} })
	}
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.about {
		// --back-top clears the star toggle + MENU hint (cf. .about-back)
		--pad-top: 3.6rem;
		--back-top: 7rem;
		min-height: 100dvh;
		gap: 2rem;
		padding: var(--pad-top) 1rem 4rem;
	}

	// On short mobile viewports the column overflows and starts at the padding, so the
	// greeting must clear the star + MENU hint on its own (cf. --back-top).
	@media (max-width: $breakpoint-mobile) {
		.about {
			--pad-top: 5.25rem;
		}
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

	// tab mode: the centered glow gives way to per-sentence side glows (cf. .intro-step)
	.about-head--tab {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: min(52rem, 94vw);
		max-width: none;
		padding: 0;
		background: none;
	}

	// one sentence per step; side-anchored glow borrowed from the timeline cards
	.intro-step {
		max-width: 42ch;
		margin: 0;
		padding: 0.9rem 1.2rem;
		font-size: clamp(0.8rem, 1.8vw, 0.95rem);
		line-height: 1.75;
		text-wrap: balance;
		color: $white;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}

	.intro-step.is-left {
		align-self: flex-start;
		text-align: left;
		background: radial-gradient(
			80% 130% at 6% 50%,
			rgba(0, 0, 0, 0.68) 0%,
			rgba(0, 0, 0, 0.4) 52%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.intro-step.is-right {
		align-self: flex-end;
		text-align: right;
		background: radial-gradient(
			80% 130% at 94% 50%,
			rgba(0, 0, 0, 0.68) 0%,
			rgba(0, 0, 0, 0.4) 52%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.about-intro {
		max-width: 42ch;
		margin: 0.5rem auto 0;
		font-size: clamp(0.8rem, 1.8vw, 0.95rem);
		line-height: 1.75;
		text-align: center;
		// even out the centered rag so the block reads as one deliberate shape
		text-wrap: balance;
		color: $white;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}

	.about-intro:first-child {
		margin-top: 0;
	}

	.about-name,
	.about-intro__hl {
		color: $yellow;
		text-shadow: 0 0 12px rgba($yellow, 0.45);
	}

	// Bigger two-line hub greeting; each line is a block so they stack without a <br>.
	.about-greeting {
		font-size: $heading-pixel-size;
		line-height: 1.5;
		text-transform: uppercase;
	}

	.about-greeting__line {
		display: block;
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
		@include portal-row;
	}

	// z 30 stays under the nav overlay (40) and star (50)
	.about-back {
		order: -1;
		align-self: center;
		position: sticky;
		top: var(--back-top);
		// rest exactly at the sticky offset, else sticky shoves the button down into the intro
		margin-top: calc(var(--back-top) - var(--pad-top));
		z-index: 30;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2.2vw, 1rem);
		letter-spacing: 1px;
		text-transform: uppercase;
		padding: 0.5rem 0.9rem;
		// Keep it legible over whatever panel content scrolls behind it.
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
		@include void-button($lift: -2px, $bg: rgba(0, 0, 0, 0.55));

		// borderless chip: drop the void frame and its hover/active inset ring, keep the glow
		& {
			border: 0;
		}

		&:hover,
		&:focus-visible {
			box-shadow: 0 0 28px rgba($yellow, 0.18);
		}

		&:active {
			box-shadow: 0 0 16px rgba($yellow, 0.12);
		}
	}

	// twin "rewind" triangles, em-sized so they scale with the label
	.about-back__icon {
		display: inline-flex;
		gap: 0.15em;
		flex: none;
		transition: transform 0.2s steps(3, end);
	}

	.about-back__icon i {
		width: 0;
		height: 0;
		border-top: 0.42em solid transparent;
		border-bottom: 0.42em solid transparent;
		border-right: 0.42em solid currentColor;
	}

	.about-back:hover .about-back__icon,
	.about-back:focus-visible .about-back__icon {
		transform: translateX(-3px);
	}

	@media (prefers-reduced-motion: reduce) {
		.about-lead {
			animation: none;
		}
	}
</style>

<template>
	<!-- Dev server only: jump to any shot. A plain link reloads, so the shot boots as `?shot=` opens it. -->
	<details class="scenes">
		<summary class="scenes__toggle">{{ SCENE_MENU.label }}</summary>
		<nav class="scenes__panel">
			<section>
				<h2>{{ SCENE_MENU.pilot.group }}</h2>
				<a :href="`?${SCENE_MENU.pilot.param}`">{{ SCENE_MENU.pilot.label }}</a>
			</section>
			<section v-for="group in groups" :key="group.label">
				<h2>{{ group.label }}</h2>
				<a v-for="key in group.keys" :key="key" :href="`?shot=${key}`">{{ key }}</a>
			</section>
			<RouterLink :to="SCENE_MENU.holding.to">{{ SCENE_MENU.holding.label }}</RouterLink>
		</nav>
	</details>
</template>

<script setup>
	import { RouterLink } from 'vue-router'
	import { INTRO_SHOTS } from '@/js/intro/index.js'
	import { SCENE_MENU } from '@/constants/intro/timeline'

	const { flat, rebuild } = SCENE_MENU
	const keys = toRebuild =>
		INTRO_SHOTS.map(s => s.key).filter(key => rebuild.keys.includes(key) === toRebuild)
	const groups = [
		{ label: flat, keys: keys(false) },
		{ label: rebuild.label, keys: keys(true) },
	]
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// under the way home, clear of the skip chips on the right
	.scenes__toggle {
		@include pinned-chip;

		& {
			top: 3rem;
			left: 0.6rem;
			right: auto;
			bottom: auto;
			list-style: none;
			cursor: pointer;
		}
	}

	.scenes__panel {
		position: fixed;
		top: 5.6rem;
		left: 0.6rem;
		z-index: $z-index-chrome;
		max-height: calc(100vh - 6.6rem);
		overflow-y: auto;
		padding: 0.6rem 0.9rem;
		text-align: left;
		font-family: $font-terminal;
		font-size: $type-prose-md;
		@include void-panel;

		h2 {
			margin: 0.4rem 0 0.2rem;
			font-family: $font-pixel;
			font-size: $type-prose-sm;
			color: $yellow;
		}

		a {
			display: block;
			color: $light-gray;
			text-decoration: none;

			&:hover,
			&:focus-visible {
				color: $yellow;
			}
		}
	}
</style>

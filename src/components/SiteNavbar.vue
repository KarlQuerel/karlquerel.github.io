<template>
	<nav class="site-chrome-bar site-chrome-bar--sticky-top" aria-label="Main navigation">
		<div class="site-chrome-links">
			<router-link to="/" class="site-chrome-link">Home</router-link>
			<router-link to="/about" class="site-chrome-link">About</router-link>
			<router-link to="/terminal" class="site-chrome-link">for the nerds</router-link>
			<!-- Under Construction link hidden for now — keep for later
			<router-link to="/under_construction" class="site-chrome-link"
				>Under Construction</router-link
			>
			-->
			<button
				type="button"
				class="site-chrome-audio"
				:class="{ 'is-off': !enabled }"
				:aria-pressed="enabled"
				:aria-label="enabled ? 'Mute ambient music' : 'Play ambient music'"
				:title="enabled ? 'Mute ambient music' : 'Play ambient music'"
				data-no-spark
				@click="toggle"
			>
				<span aria-hidden="true">♪</span>
			</button>
		</div>
	</nav>
</template>

<script setup>
	import { useAmbientAudio } from '../composables/useAmbientAudio'

	const { enabled, toggle } = useAmbientAudio()
</script>

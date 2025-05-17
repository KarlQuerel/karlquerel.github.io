<template>
	<div class="content">
		<div class="nes-container is-dark is-rounded">
			<p>Under Construction</p>
			<p> </p>
		</div>

		<!-- Social Buttons -->
		<div class="share">
		<a href="mailto:karlquerel@gmail.com" target="_blank">
			<i class="nes-icon gmail is-large"></i>
		</a>
		<a href="https://github.com/KarlQuerel" target="_blank">
			<i class="nes-icon github is-large"></i>
		</a>
		<a href="https://www.linkedin.com/in/karlquerel" target="_blank">
			<i class="nes-icon linkedin is-large"></i>
		</a>
		</div>

		<!-- Clicker Button -->
		<ClickCounter />
	</div>
  </template>

<script>

import ClickCounter from './clickCounter.vue';

export default {
	name: 'UnderConstruction',
	components: {
		ClickCounter
	}
};
</script>

<style scoped>
.small-font {
  font-size: 1rem !important;
}

.nes-container.is-dark
{
	background-color: #000000;
}
</style>
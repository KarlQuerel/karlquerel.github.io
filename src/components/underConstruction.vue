<template>
	<div class="content">
		<div class="nes-container is-dark is-rounded">
			<p>Under Construction</p>
			<p> </p>
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

<style lang="scss" scoped>


.small-font {
  font-size: 1rem !important;
}

.nes-container.is-dark
{
	background-color: #000000;
	border: 0.3vh dashed $retro-green;
	border-radius: 20px;
	margin-bottom: 10rem;
	text-transform: uppercase;
}
</style>
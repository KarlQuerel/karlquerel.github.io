<template>
	<!-- The game, being built from nothing. Reached at /game on the dev server only: a
	     build sends visitors to /under-construction and leaves this page out of the
	     bundle (src/constants/game.js). -->
	<div class="content">
		<HomeChip />
	</div>
</template>

<script setup>
	import HomeChip from '../HomeChip.vue'
</script>

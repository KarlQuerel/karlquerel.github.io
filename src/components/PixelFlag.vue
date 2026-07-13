<template>
	<!-- Tiny pixel-art national flag — a spot of colour that anchors each timeline
	     card's location and breaks up the white text. Decorative: the adjacent
	     location text already names the country, so it's aria-hidden. crispEdges keeps
	     the pixels hard; fills are driven by classes so no hex lives in the markup. -->
	<span class="pixel-flag" aria-hidden="true">
		<svg
			v-if="country === 'france'"
			class="pixel-flag__svg"
			viewBox="0 0 3 2"
			shape-rendering="crispEdges"
		>
			<rect class="c-fr-blue" x="0" y="0" width="1" height="2" />
			<rect class="c-white" x="1" y="0" width="1" height="2" />
			<rect class="c-fr-red" x="2" y="0" width="1" height="2" />
		</svg>
		<svg
			v-else-if="country === 'switzerland'"
			class="pixel-flag__svg"
			viewBox="0 0 8 8"
			shape-rendering="crispEdges"
		>
			<rect class="c-ch-red" x="0" y="0" width="8" height="8" />
			<rect class="c-white" x="3" y="1" width="2" height="6" />
			<rect class="c-white" x="1" y="3" width="6" height="2" />
		</svg>
		<svg
			v-else-if="country === 'spain'"
			class="pixel-flag__svg"
			viewBox="0 0 12 8"
			shape-rendering="crispEdges"
		>
			<rect class="c-es-red" x="0" y="0" width="12" height="2" />
			<rect class="c-es-yellow" x="0" y="2" width="12" height="4" />
			<rect class="c-es-red" x="0" y="6" width="12" height="2" />
		</svg>
		<svg
			v-else-if="country === 'lebanon'"
			class="pixel-flag__svg"
			viewBox="0 0 12 8"
			shape-rendering="crispEdges"
		>
			<rect class="c-lb-red" x="0" y="0" width="12" height="2" />
			<rect class="c-white" x="0" y="2" width="12" height="4" />
			<rect class="c-lb-red" x="0" y="6" width="12" height="2" />
			<!-- Cedar: a stacked green triangle + trunk in the white band. -->
			<rect class="c-lb-green" x="5" y="2" width="2" height="1" />
			<rect class="c-lb-green" x="4" y="3" width="4" height="1" />
			<rect class="c-lb-green" x="3" y="4" width="6" height="1" />
			<rect class="c-lb-green" x="5" y="5" width="2" height="1" />
		</svg>
	</span>
</template>

<script setup>
	defineProps({
		country: { type: String, required: true },
	})
</script>

<style scoped lang="scss">
	.pixel-flag {
		display: inline-flex;
		flex: none;
		height: clamp(0.6rem, 1.7vw, 0.8rem);
		// Crisp 1px frame + a soft drop so the flag reads as a chip on the starfield.
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.22),
			0 1px 3px rgba(0, 0, 0, 0.9);
	}

	.pixel-flag__svg {
		display: block;
		width: auto;
		height: 100%;
	}

	.c-white {
		fill: $white;
	}
	.c-fr-blue {
		fill: $flag-fr-blue;
	}
	.c-fr-red {
		fill: $flag-fr-red;
	}
	.c-ch-red {
		fill: $flag-ch-red;
	}
	.c-lb-red {
		fill: $flag-lb-red;
	}
	.c-lb-green {
		fill: $flag-lb-green;
	}
	.c-es-red {
		fill: $flag-es-red;
	}
	.c-es-yellow {
		fill: $flag-es-yellow;
	}
</style>

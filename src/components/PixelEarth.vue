<template>
	<!-- Tiny 16×16 pixel-art Earth (procedurally generated — see tmp/gen-earth.mjs):
	     ocean with a darker rim for the sphere edge, continents, and shaded land on
	     the shadow side. Fills its container (size it on the parent); decorative. -->
	<svg class="pixel-earth" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
		<g class="pixel-earth__sea">
			<rect x="6" y="1" width="3" height="1" />
			<rect x="6" y="2" width="2" height="1" />
			<rect x="7" y="3" width="1" height="1" />
			<rect x="8" y="4" width="1" height="1" />
			<rect x="12" y="4" width="1" height="1" />
			<rect x="1" y="5" width="2" height="1" />
			<rect x="7" y="5" width="3" height="1" />
			<rect x="12" y="5" width="2" height="1" />
			<rect x="1" y="6" width="3" height="1" />
			<rect x="7" y="6" width="3" height="1" />
			<rect x="12" y="6" width="2" height="1" />
			<rect x="1" y="7" width="2" height="1" />
			<rect x="8" y="7" width="2" height="1" />
			<rect x="13" y="7" width="1" height="1" />
			<rect x="1" y="8" width="2" height="1" />
			<rect x="9" y="8" width="1" height="1" />
			<rect x="13" y="8" width="1" height="1" />
			<rect x="1" y="9" width="1" height="1" />
			<rect x="3" y="9" width="1" height="1" />
			<rect x="9" y="9" width="2" height="1" />
			<rect x="13" y="9" width="1" height="1" />
			<rect x="2" y="10" width="2" height="1" />
			<rect x="9" y="10" width="2" height="1" />
			<rect x="12" y="10" width="1" height="1" />
			<rect x="2" y="11" width="2" height="1" />
			<rect x="8" y="11" width="5" height="1" />
			<rect x="7" y="12" width="5" height="1" />
			<rect x="6" y="13" width="4" height="1" />
		</g>
		<g class="pixel-earth__sea-deep">
			<rect x="4" y="0" width="7" height="1" />
			<rect x="3" y="1" width="2" height="1" />
			<rect x="11" y="1" width="1" height="1" />
			<rect x="2" y="2" width="1" height="1" />
			<rect x="12" y="2" width="1" height="1" />
			<rect x="1" y="3" width="1" height="1" />
			<rect x="13" y="3" width="1" height="1" />
			<rect x="0" y="4" width="2" height="1" />
			<rect x="13" y="4" width="2" height="1" />
			<rect x="0" y="5" width="1" height="1" />
			<rect x="14" y="5" width="1" height="1" />
			<rect x="0" y="6" width="1" height="1" />
			<rect x="14" y="6" width="1" height="1" />
			<rect x="0" y="7" width="1" height="1" />
			<rect x="14" y="7" width="1" height="1" />
			<rect x="0" y="8" width="1" height="1" />
			<rect x="14" y="8" width="1" height="1" />
			<rect x="0" y="9" width="1" height="1" />
			<rect x="14" y="9" width="1" height="1" />
			<rect x="0" y="10" width="2" height="1" />
			<rect x="13" y="10" width="2" height="1" />
			<rect x="1" y="11" width="1" height="1" />
			<rect x="13" y="11" width="1" height="1" />
			<rect x="2" y="12" width="1" height="1" />
			<rect x="12" y="12" width="1" height="1" />
			<rect x="3" y="13" width="1" height="1" />
			<rect x="10" y="13" width="2" height="1" />
			<rect x="4" y="14" width="1" height="1" />
			<rect x="6" y="14" width="5" height="1" />
		</g>
		<g class="pixel-earth__land">
			<rect x="5" y="1" width="1" height="1" />
			<rect x="9" y="1" width="2" height="1" />
			<rect x="3" y="2" width="3" height="1" />
			<rect x="8" y="2" width="4" height="1" />
			<rect x="2" y="3" width="5" height="1" />
			<rect x="8" y="3" width="5" height="1" />
			<rect x="2" y="4" width="6" height="1" />
			<rect x="9" y="4" width="3" height="1" />
			<rect x="3" y="5" width="4" height="1" />
			<rect x="10" y="5" width="2" height="1" />
			<rect x="4" y="6" width="3" height="1" />
			<rect x="10" y="6" width="2" height="1" />
			<rect x="3" y="7" width="5" height="1" />
			<rect x="10" y="7" width="2" height="1" />
			<rect x="3" y="8" width="6" height="1" />
			<rect x="10" y="8" width="1" height="1" />
			<rect x="2" y="9" width="1" height="1" />
			<rect x="4" y="9" width="5" height="1" />
			<rect x="4" y="10" width="5" height="1" />
			<rect x="4" y="11" width="4" height="1" />
			<rect x="3" y="12" width="4" height="1" />
			<rect x="4" y="13" width="2" height="1" />
		</g>
		<g class="pixel-earth__land-dark">
			<rect x="12" y="7" width="1" height="1" />
			<rect x="11" y="8" width="2" height="1" />
			<rect x="11" y="9" width="2" height="1" />
			<rect x="11" y="10" width="1" height="1" />
			<rect x="5" y="14" width="1" height="1" />
		</g>
	</svg>
</template>

<style scoped lang="scss">
	// Local palette — vivid but earthy, this sprite only. Two ocean + two land shades
	// give the globe depth without muddying it at tiny sizes.
	$sea: #2b8cff;
	$sea-deep: #135fc4;
	$land: #46c257;
	$land-dark: #2f8f43;

	.pixel-earth {
		display: block;
		width: 100%;
		height: 100%;
	}

	.pixel-earth__sea rect {
		fill: $sea;
	}

	.pixel-earth__sea-deep rect {
		fill: $sea-deep;
	}

	.pixel-earth__land rect {
		fill: $land;
	}

	.pixel-earth__land-dark rect {
		fill: $land-dark;
	}
</style>

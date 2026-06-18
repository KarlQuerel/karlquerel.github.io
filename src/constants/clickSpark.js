/***	CLICK SPARK		***/
// Configuration for the pointer "spark" burst (see useClickSpark.js).
// A reproduction of the click animation on eduardbodak.com: on every left
// click a small fan of bars shoots out from the cursor and shrinks away.
//
// The animation itself (timing, geometry, colour) lives in CSS —
// see src/styles/_click-spark.scss. These values only drive the JS side.

export const CLICK_SPARK = {
	// Number of bars per burst, fanned out one ANGLE_STEP_DEG apart.
	SPARK_COUNT: 4,
	// Rotation applied to bar `i` is ANGLE_STEP_DEG * i (so -45, -90, -135, -180).
	ANGLE_STEP_DEG: -45,
	// Ignore repeat clicks for this long after a burst, so rapid clicks don't spam.
	COOLDOWN_MS: 120,
	// Remove the bar from the DOM this long after it is created.
	LIFETIME_MS: 800,
	// CSS class carrying the base style + animation.
	CLASS_NAME: 'spark',
	// Custom property each bar reads to know its fan angle.
	ANGLE_VAR: '--spark-angle',
	// Clicks inside an element carrying this attribute produce no spark.
	IGNORE_ATTRIBUTE: 'data-no-spark',
	// Only run on devices with a precise hovering pointer (skip touchscreens).
	POINTER_QUERY: '(hover: hover) and (pointer: fine)',
}

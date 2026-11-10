// Shot 2: the dying Earth as flat layers. The globe and the Moon are painted once (earthLayers.glsl);
// this pass only slides them, each by its depth and by whole canvas pixels, so an art pixel (uH.z
// canvas pixels) glides rather than jumps. The swollen sun stands in the sky beside them, drawn here at
// the canvas's full resolution (star() in star.glsl), behind the Moon and the globe.
// uP.xy = the pan (x right, y down), uP.z = the star's clock; uH.xy = the planet and Moon sides in art
// pixels, uH.z = canvas pixels per art pixel.

void main(){
  vec2 cell = screenCell();
  vec2 pan = uP.xy;
  vec3 col = skyLayer(cell, pan, uH.z);
  col = star(col, cell, place(SUN_AT, pan, SUN_DEPTH), SUN_R*min(uRes.x, uRes.y), SUN_AGE, uP.z, 1.0);
  col = earthLayers(col, cell, place(PLANET_AT, pan, PLANET_DEPTH), place(MOON_AT, pan, MOON_DEPTH));
  gl_FragColor = vec4(col, 1.0);
}

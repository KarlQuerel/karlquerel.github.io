// Flat-layer shots: painted layers slid by whole cells, the contact scene's way, so no pixel is ever
// re-cut. A painted layer reads its dither in its own cells, so it travels with it; what is re-cut every
// frame (the sky's band under a zoom, the star) dithers on the screen's own grid, so a seam glides
// over a pattern that stays put instead of crawling. Preceded by the palette and the sky's constants
// (js/intro/sky.js).

// 0..1 to a step on an n-colour ramp, its seams dithered on `cell`
float rampStep(float x, float n, vec2 cell){
  float g = clamp(x, 0.0, 1.0)*(n - 1.0);
  float i = floor(g);
  float t = clamp((g - i - 0.5)/0.3 + 0.5, 0.0, 1.0);
  return min(i + step(bayer4(cell) + 0.001, t), n - 1.0);
}
// cells counted from the top left, the way sprites are painted
vec2 screenCell(){ return vec2(floor(gl_FragCoord.x), uRes.y - 1.0 - floor(gl_FragCoord.y)); }
// where a layer's anchor (a share of the frame) lands this frame: whole cells only
vec2 place(vec2 at, vec2 pan, float depth){ return floor(at*uRes + pan*depth + 0.5); }

// One star tile laid at art scale, slid `off` canvas pixels and zoomed by `zoom` about `c`: a star keeps
// its art pixel's size and lands on whole canvas pixels, so a zoom spreads the field instead of swelling
// it. `turned` reads the tile transposed, so two layers of it never line up.
vec4 tileStar(vec2 cell, vec2 off, float art, vec2 c, float zoom, bool turned){
  vec2 b = floor(((cell - c)/zoom + c - off)/art);
  vec2 p = floor((b*art + off - c)*zoom + c);
  if (cell.x >= p.x + art || cell.y >= p.y + art) return vec4(0.0);
  return texture2D(uSky, (mod(turned ? b.yx + 97.0 : b, SKY_TILE) + 0.5)/SKY_TILE);
}

// The sky behind everything: the galaxy's band in three dithered steps over the void, then the star
// tile at two depths. A star shows once `rise` passes it. `art` is canvas pixels per art pixel: each
// layer slides by whole canvas pixels, its art stays coarse. The view zooms by `zoom` about `c`.
vec3 skyView(vec2 cell, vec2 pan, float rise, float art, vec2 c, float zoom){
  // the band is read at the screen's own art pixels, so a zoom widens it without blocking it out,
  // and dithered on them, so its seams glide
  vec2 a = floor(cell/art);
  vec2 w = ((a + 0.5)*art - c)/zoom + c - floor(pan*GALAXY_DEPTH + 0.5);
  float v = (w.y - w.x*0.32)/uRes.y;
  float band = exp(-pow((v - 0.25)*3.4, 2.0))*(0.3 + 0.7*fbm2(w/(70.0*art)));
  float bs = rampStep(band*0.85*rise, 4.0, a);
  vec3 col = bs < 0.5 ? VOID : bs < 1.5 ? INK : bs < 2.5 ? SLATE : SHALE;
  vec4 sa = tileStar(cell, floor(pan*SKY_DEPTHS.x + 0.5), art, c, zoom, false);
  vec4 sb = tileStar(cell, floor(pan*SKY_DEPTHS.y + 0.5), art, c, zoom, true);
  if (sa.a > 0.0 && sa.a <= rise) col = sa.rgb;
  if (sb.a > 0.0 && sb.a <= rise) col = sb.rgb;
  return col;
}
vec3 skyLayer(vec2 cell, vec2 pan, float rise, float art){ return skyView(cell, pan, rise, art, vec2(0.0), 1.0); }

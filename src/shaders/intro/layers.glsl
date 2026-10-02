// Flat-layer shots: painted layers slid by whole cells, the contact scene's way, so no pixel is ever
// re-cut. Every layer reads its dither and noise in its own cell coordinates, so they travel with it.
// Preceded by the palette and the sky's constants (js/intro/sky.js).

float bayer4(vec2 a){ return bayer2(0.5*a)*0.25 + bayer2(a); }

// 0..1 to a step on an n-colour ramp, its seams dithered on the layer's own grid
float rampStep(float x, float n, vec2 cell){
  float g = clamp(x, 0.0, 1.0)*(n - 1.0);
  float i = floor(g);
  float t = clamp((g - i - 0.5)/0.3 + 0.5, 0.0, 1.0);
  return min(i + step(bayer4(cell) + 0.001, t), n - 1.0);
}
// light through red: the sun's own ramp, from rust to cream
vec3 fire(float x, vec2 cell){
  float i = rampStep(x, 9.0, cell);
  return i < 0.5 ? RUST : i < 1.5 ? OCHRE : i < 2.5 ? BRICK : i < 3.5 ? CLAY : i < 4.5 ? FLARE
    : i < 5.5 ? AMBER : i < 6.5 ? DUNE : i < 7.5 ? SAND : GLOW;
}

// cells counted from the top left, the way sprites are painted
vec2 screenCell(){ return vec2(floor(gl_FragCoord.x), uRes.y - 1.0 - floor(gl_FragCoord.y)); }
// where a layer's anchor (a share of the frame) lands this frame: whole cells only
vec2 place(vec2 at, vec2 pan, float depth){ return floor(at*uRes + pan*depth + 0.5); }

// The sky behind everything: the galaxy's band in three dithered steps over the void, then the star
// tile at two depths, the nearer one turned so the two never line up. A star shows once `rise` passes it.
vec3 skyLayer(vec2 cell, vec2 pan, float rise){
  vec2 g = cell - floor(pan*GALAXY_DEPTH + 0.5);
  float v = (g.y - g.x*0.32)/uRes.y;
  float band = exp(-pow((v - 0.25)*3.4, 2.0))*(0.3 + 0.7*fbm2(g/70.0));
  float bs = rampStep(band*0.85*rise, 4.0, g);
  vec3 col = bs < 0.5 ? VOID : bs < 1.5 ? INK : bs < 2.5 ? SLATE : SHALE;
  vec4 sa = texture2D(uSky, (mod(cell - floor(pan*SKY_DEPTHS.x + 0.5), SKY_TILE) + 0.5)/SKY_TILE);
  vec4 sb = texture2D(uSky, (mod(cell.yx + 97.0 - floor(pan.yx*SKY_DEPTHS.y + 0.5), SKY_TILE) + 0.5)/SKY_TILE);
  if (sa.a > 0.0 && sa.a <= rise) col = sa.rgb;
  if (sb.a > 0.0 && sb.a <= rise) col = sb.rgb;
  return col;
}

// The sun as the earth shot draws it, in its own cells: hard corona rings that widen with `vis` (how
// clear of a limb it is), a rust and ochre halo past them, and the disc. The sun shot opens on it.
vec3 sunRings(vec3 col, vec2 q, float sr, float vis){
  float d = length(q);
  float corona = 0.62*exp(-(d - sr)/sr)*(0.45 + 0.55*vis);
  float halo = 0.9*exp(-(d - sr)/(sr*4.0))*(0.7 + 0.3*vis);
  float hs = rampStep(halo*2.0 - 0.5, 3.0, q);
  if (corona > 0.1) col = fire(corona, q);
  else if (hs > 0.5) col = hs < 1.5 ? RUST : OCHRE;
  if (d < sr){
    float spot = step(0.72, fbm2(q/sr*3.0 + 1.7));
    col = fire(0.6 + 0.4*(1.0 - d/sr) - spot*0.15, q);
  }
  return col;
}

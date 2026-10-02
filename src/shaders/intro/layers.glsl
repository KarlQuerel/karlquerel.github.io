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

// --- The Sun: one star for every shot that shows it, the earth shot's small one, the sun shot's limb
// and the giant over the fields, so a cut between two of them hands over the same pixels. Measured in
// its own cells q from its centre at radius r; age 0 is yellow-white, 1 a red giant; `phase` is the
// star's own clock in seconds, carried across the cuts; `corona` 0..1 scales what stands off the limb.

// the star's ten steps, rust to white
vec3 starRamp(float i){
  return i < 0.5 ? RUST : i < 1.5 ? OCHRE : i < 2.5 ? BRICK : i < 3.5 ? CLAY : i < 4.5 ? FLARE
    : i < 5.5 ? AMBER : i < 6.5 ? DUNE : i < 7.5 ? SAND : i < 8.5 ? GLOW : STAR;
}
// a position on that ramp, rounded to a step and dithered only across a narrow seam
vec3 starStep(float x, vec2 cell){
  float i = floor(x);
  float up = step(bayer4(cell) + 0.001, clamp((x - i - 0.5)/STAR_SEAM + 0.5, 0.0, 1.0));
  return starRamp(clamp(i + up, 0.0, 9.0));
}

// F1 and F2 to a lattice of points that wander on their own clocks: the convection cells boiling
vec2 boil(vec3 p, float t){
  vec3 i = floor(p), f = fract(p);
  float f1 = 9.0, f2 = 9.0;
  for (int z = -1; z <= 1; z++)
  for (int y = -1; y <= 1; y++)
  for (int x = -1; x <= 1; x++){
    vec3 g = vec3(float(x), float(y), float(z));
    vec3 h = vec3(hash13(i + g), hash13(i + g + 11.3), hash13(i + g + 27.1));
    float d = length(g + 0.5 + 0.4*sin(t*STAR_BOIL + 6.2831*h) - f);
    if (d < f1){ f2 = f1; f1 = d; } else if (d < f2) f2 = d;
  }
  return vec2(f1, f2);
}

// the ramp the disc spans at this age: low end at the limb, high end at the brightest granule
vec2 starSpan(float age){ return vec2(mix(4.6, 0.4, age), mix(9.3, 6.2, age)); }

vec3 star(vec3 col, vec2 q, float r, float age, float phase, float corona){
  float d = length(q);
  if (d > r + min(r, STAR_REACH)*2.6) return col;
  vec2 span = starSpan(age);
  if (d >= r){
    // the corona: three hard bands whose edges wander with the angle and the clock, one checker past them
    vec2 dir = q/d;
    // the corona's reach stops growing past a frame-filling star, so a limb seen close stays crisp
    float x = (d - r)/min(r, STAR_REACH);
    float wob = fbm3(vec3(dir*2.6, phase*0.07));
    float c = exp(-x*mix(10.0, 4.5, wob))*(0.55 + 0.6*wob)*corona;
    if (c > 0.62) col = starStep(span.x + 1.6, q);
    else if (c > 0.36) col = starStep(span.x + 0.6, q);
    else if (c > 0.2) col = starStep(span.x - 0.5, q);
    else if (c > 0.11 && bayer4(q) < 0.5) col = RUST;
    else {
      // seen from far off, a small star blooms: two thin checkers of rust round it, gone as it nears
      float bloom = exp(-x/1.1)*corona*(1.0 - smoothstep(30.0, 80.0, r));
      if (bloom > 0.3 && bayer4(q) < 0.25 || bloom > 0.16 && bayer4(q) < 0.0625) col = RUST;
    }
    return col;
  }
  // onto the sphere, turning slowly, so the cells crowd toward the limb and ride across it
  vec2 n2 = q/r;
  float z = sqrt(max(0.0, 1.0 - dot(n2, n2)));
  float a = phase*STAR_SPIN;
  vec3 p = vec3(n2.x*cos(a) + z*sin(a), n2.y, -n2.x*sin(a) + z*cos(a));
  // granules: their size is fixed on the sphere, so they swell with the star; lanes a cell wide
  // past STAR_REACH the cells split, so a limb seen close keeps a granulation a few cells wide
  float k = STAR_CELLS*sqrt(max(1.0, r/STAR_REACH));
  vec2 w = boil(p*k, phase);
  float cellPx = r/k;
  float detail = smoothstep(2.5, 6.0, cellPx);
  // a lane breaks where the slow field runs hot, so the cells read as a boil, not as tiles
  float mottle = fbm3(p*2.2 + phase*0.02);
  float lane = step((w.y - w.x)*cellPx, 0.9)*step(mottle, 0.56)*detail;
  float core = step(w.x, 0.28)*detail;
  float v = 0.74 + 0.05*core - 0.12*w.x*detail + 0.5*(mottle - 0.5) - 0.2*lane;
  // spots, fixed on the surface
  for (int s = 0; s < 3; s++){
    float fs = float(s);
    vec3 sd = normalize(vec3(sin(fs*2.4 + 0.6), (fs - 1.0)*0.38, cos(fs*2.4 + 0.6)));
    float ang = acos(clamp(dot(p, sd), -1.0, 1.0));
    float rad = 0.06 + 0.025*fs;
    if (ang < rad) v -= 0.55;
    else if (ang < rad*1.9) v -= 0.25;
  }
  // too small to show its cells, a star reads by its heat alone
  v += 0.22*(1.0 - detail);
  // limb darkening, deeper as the star cools and puffs out
  v *= mix(1.0, pow(z, 0.5), 0.45 + 0.3*age);
  return starStep(mix(span.x, span.y, clamp(v, 0.0, 1.0)), q);
}

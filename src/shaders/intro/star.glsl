// The Sun: one star for every shot that shows it, the earth shot's small one, the sun shot's limb, the
// giant over the fields and through the corridor's glass, so a cut between two of them hands over the
// same pixels. `cell` is the screen cell, `c` the star's centre on it and `r` its radius, in pixels; age
// 0 is yellow-white, 1 a red giant; `phase` is the star's own clock in seconds, carried across the cuts;
// `corona` 0..1 scales what stands off the limb. Its dither sits on the screen, so a star that grows or
// slides changes only where its seams fall. Follows common.glsl, the palette and the STAR_ constants
// (STAR_CHUNK in js/intro/sky.js).

// the star's eleven steps, rust to white
vec3 starRamp(float i){
  return i < 0.5 ? RUST : i < 1.5 ? OCHRE : i < 2.5 ? BRICK : i < 3.5 ? CLAY : i < 4.5 ? FLARE
    : i < 5.5 ? AMBER : i < 6.5 ? DUNE : i < 7.5 ? SAND : i < 8.5 ? EMBER : i < 9.5 ? GLOW : STAR;
}
// 0..1, how hard the shot drives the star: contrast on its granules, and its light flooding the dark
float STAR_HEAT = 0.0;
// a position on the ramp, rounded to a step and dithered only across a narrow seam
vec3 starStep(float x, vec2 cell){
  float i = floor(x);
  float up = step(bayer4(cell) + 0.001, clamp((x - i - 0.5)/STAR_SEAM + 0.5, 0.0, 1.0));
  return starRamp(clamp(i + up, 0.0, 10.0));
}
// the ramp the disc spans at this age: low end at the limb, high end at the brightest granule
vec2 starSpan(float age){ return mix(STAR_SPAN_YOUNG, STAR_SPAN_GIANT, age); }

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
// One octave of granulation, `k` cells across the sphere: a soft bright blob round each cell's centre,
// the surface between them dark, so the cells read as a boil and never as a web of lines. About
// zero on average, so octaves stack.
float granules(vec3 p, float k, float t){
  vec2 w = boil(p*k, t);
  return 0.5 - smoothstep(0.0, 0.8, w.x);
}
// sunspots, fixed on the surface in two belts: a dark umbra inside a ragged penumbra
float sunspot(vec3 p){
  float lat = abs(p.y);
  float belt = smoothstep(STAR_BELT.x - 0.05, STAR_BELT.x + 0.05, lat)*(1.0 - smoothstep(STAR_BELT.y - 0.05, STAR_BELT.y + 0.05, lat));
  if (belt <= 0.0) return 0.0;
  float s = fbm(p*3.5 + 31.0)*belt;
  float frill = (noise3(p*40.0) - 0.5)*0.1;
  float pen = smoothstep(0.60, 0.63, s + frill);
  float umb = smoothstep(0.65, 0.68, s + frill*0.5);
  return STAR_SPOT.x*pen + (STAR_SPOT.y - STAR_SPOT.x)*umb;
}

vec3 star(vec3 col, vec2 cell, vec2 c, float r, float age, float phase, float corona){
  vec2 q = cell - c;
  float d = length(q);
  // the corona's reach stops growing past a frame-filling star, so a limb seen close stays crisp
  float reach = min(r, STAR_REACH);
  if (d > r + reach*STAR_CORONA.z) return col;
  vec2 span = starSpan(age);
  // a far star reads by its heat alone: a white core, its texture faint
  float far = 1.0 - smoothstep(STAR_FAR.x, STAR_FAR.y, r);
  if (d >= r){
    // the corona: tongues of flame off the limb, shaped on the star's own clock, and the glow dying
    // out into the dark on the screen's dither; a few long faint rays through it, dithered only, gone
    // once the star is close
    vec2 dir = q/max(d, 1.0);
    float x = (d - r)/reach;
    float tongue = pow(clamp(fbm3(vec3(dir*2.5, phase*0.11))*1.9 - 0.45, 0.0, 1.0), 1.6);
    tongue += 0.5*(fbm3(vec3(dir*7.0 + 3.1, phase*0.19)) - 0.4)*smoothstep(50.0, 220.0, r);
    tongue = clamp(tongue, 0.0, 1.0);
    float flood = 1.0 + STAR_HEAT*STAR_HEAT_K.y;
    float g = exp(-x/(STAR_CORONA.x*(0.15 + 0.85*tongue)*flood))*min(1.0, (0.55 + 0.45*tongue)*(1.0 + 0.4*STAR_HEAT));
    float ray = smoothstep(0.8, 0.95, noise3(vec3(dir*14.0 + 9.0, phase*0.03)))
      *(1.0 - smoothstep(STAR_RAY_FADE.x, STAR_RAY_FADE.y, r));
    g = max(g, 0.3*ray*exp(-x/(STAR_CORONA.y*flood)))*corona;
    // the near glow steps down the ramp from the limb's step, brighter in a tongue, to rust, then
    // dithers out
    const float knee = 0.35;
    if (g > knee) return starStep((max(span.x - 0.4, 0.0) + tongue)*(g - knee)/(1.0 - knee), cell);
    if (bayer8(cell) < g/knee) return RUST;
    return col;
  }
  // onto the sphere, turning slowly, so the cells crowd toward the limb and ride across it
  vec2 n2 = q/r;
  float z = sqrt(max(0.0, 1.0 - dot(n2, n2)));
  float a = phase*STAR_SPIN;
  vec3 p = vec3(n2.x*cos(a) + z*sin(a), n2.y, -n2.x*sin(a) + z*cos(a));
  // granulation in octaves fixed on the sphere, so a push in magnifies the cells rather than
  // re-cutting them; finer ones come in as they get a few pixels wide
  float k = STAR_CELLS, gran = 0.0, amp = 1.0;
  for (int o = 0; o < 3; o++){
    float px = r/k;
    if (px < 2.0) break;
    gran += amp*granules(p, k, phase + float(o)*7.0)*smoothstep(2.0, 6.0, px);
    k *= STAR_SPLIT;
    amp *= 0.55;
  }
  // broad faculae drifting over it, and the spots; a far star shows its heat, hardly its texture
  float mottle = fbm3(p*2.2 + phase*0.02) - 0.5;
  float v = 0.78 + 0.22*far + 0.26*mottle*(1.0 - 0.5*far) + 0.2*gran*(1.0 - far)
    - sunspot(p)*(1.0 - 0.6*far);
  // limb darkening, deeper as the star cools and puffs out
  v *= mix(1.0, pow(z, 0.6), STAR_LIMB.x + STAR_LIMB.y*age + 0.15*far);
  // the heat: the granules' contrast
  v = 0.5 + (v - 0.5)*(1.0 + STAR_HEAT*STAR_HEAT_K.x);
  return starStep(mix(span.x, span.y, clamp(v, 0.0, 1.0)), cell);
}

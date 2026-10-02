// Shot 3: the sun. It opens on the earth shot's own sun, drawn the earth shot's way and held there
// through the cut, then closes on it, a plain disc handing over to
// the painted one (js/intro/sunArt.js); then three painted states, the swell between two crossfading in
// the Bayer order under a flare. The corona, the prominences, Mercury and the ejection are live, all
// measured in cells from the disc's centre.
// uP = approach 0..1, radius in cells, Mercury's transit 0..1, the ejection 0..1; uQ.xy = the sky's pan,
// uQ.z = seconds, uQ.w = the state 0..2; uH.xyz = the sprites' sides, uH.w = the painted disc's reveal.

const vec2 SUN_AT = __SUN_AT__;
const vec2 EARTH_SUN_AT = __EARTH_SUN_AT__;

// state i's sprite, centred on the disc
vec4 stateSprite(float i, vec2 q){
  float S = i < 0.5 ? uH.x : i < 1.5 ? uH.y : uH.z;
  float ox = i < 0.5 ? 0.0 : i < 1.5 ? uH.x : uH.x + uH.y;
  vec2 l = q + floor(S*0.5);
  if (l.x < 0.0 || l.y < 0.0 || l.x >= S || l.y >= S) return vec4(0.0);
  return texture2D(uMask, (vec2(ox, 0.0) + l + 0.5)/vec2(uH.x + uH.y + uH.z, uH.z));
}

// A prominence: an arch of plasma standing off the limb, `da` radians from its foot, at height h (radii).
float arch(float da, float h, float w, float hm, float seed, float t){
  if (da > w) return 0.0;
  float u = da/w;
  // the arch leans and wanders: no prominence is a clean parabola
  float bend = (fbm3(vec3(u*3.0 + seed, 0.0, t*0.12 + seed)) - 0.5)*0.35;
  float top = hm*(1.0 - u*u)*(1.0 + bend);
  float thick = 0.02 + 0.05*(1.0 - u*u);
  float spine = step(abs(h - top), 0.012);
  float sheath = step(abs(h - top), thick)*step(0.5, fbm3(vec3(da*14.0 + seed, h*22.0, t*0.35 + seed)));
  return max(spine, sheath*0.6)*step(h, hm + 0.05);
}

void main(){
  vec2 cell = screenCell();
  float r = uP.y, t = uQ.z, s = uQ.w;
  float age = s*0.5;
  // the flare that carries a swell: strongest halfway through it
  float flare = sin(PI*fract(min(s, 1.999)))*step(0.001, fract(s));
  vec2 c = floor(mix(EARTH_SUN_AT, SUN_AT, uP.x)*uRes + 0.5);
  vec2 q = cell - c;
  float d = length(q);
  vec2 dir = d > 1e-4 ? q/d : vec2(1.0, 0.0);
  float ang = atan(q.y, q.x);
  // out from the limb, in radii
  float x = (d - r)/r;

  // the stars, eaten by the glare round the disc once the camera has closed in
  vec3 sky = skyLayer(cell, uQ.xy, 1.0);
  vec3 col = sky;
  float glare = (1.0 - smoothstep(r*1.4, r*2.6, d))*uP.x;
  if (bayer4(cell) < glare) col = VOID;

  // --- outside the limb: the corona, its streamers, and the prominences standing off it
  vec2 wd = normalize(dir + 0.35*vec2(fbm3(vec3(dir*1.7, 3.0)) - 0.5, fbm3(vec3(dir*1.7, 9.0)) - 0.5));
  float streak = fbm3(vec3(wd*3.0, x*1.2 - t*0.05))*0.65 + fbm3(vec3(wd*9.0, x*3.0 + t*0.08))*0.35;
  float sector = smoothstep(0.3, 0.62, fbm3(vec3(wd*1.4, 21.0)));
  float rays = exp(-x*mix(3.2, 1.8, sector))*step(0.52, streak)*(0.35 + 0.9*sector)*0.8;
  // a few solid steps hugging the limb, then dither that thins outward; a swell's flare pushes it out
  float ring = exp(-x*9.0/(1.0 + 1.5*flare));
  float haze = exp(-x*2.2/(1.0 + flare))*0.45;
  if (d >= r){
    if (ring > 0.12) col = fire(ring*mix(0.95, 0.7, age) + mix(0.2, 0.0, age) + 0.25*flare, q);
    else if (bayer4(q) < max(rays, haze)*mix(1.0, 0.8, age)) col = rays > haze ? (age > 0.5 ? BRICK : CLAY) : RUST;
    float prom = 0.0;
    for (int i = 0; i < 3; i++){
      float fi = float(i);
      float foot = fi*2.1 + 0.6 + t*0.015;
      float da = abs(mod(ang - foot + PI, 2.0*PI) - PI);
      float hm = 0.11 + 0.07*sin(t*0.35 + fi*2.0) + 0.05*age;
      prom = max(prom, arch(da, x, 0.28 + 0.1*fi, hm, fi*7.0, t));
    }
    if (prom > 0.0 && uP.x > 0.99) col = fire(mix(0.75, 0.5, age) + 0.2*prom, q);
  }

  // --- the disc: the plain one on the approach, the painted states once it has closed in
  vec3 plain = fire(0.6 + 0.4*(1.0 - d/r), q);
  float i0 = floor(min(s, 1.999));
  vec4 now = stateSprite(i0, q);
  vec4 next = stateSprite(i0 + 1.0, q);
  vec4 painted = bayer8(cell) < s - i0 ? next : now;
  if (bayer8(cell) < uH.w){
    // a swell runs the limb out ahead of the next state: that band is the flare's plasma, not sky
    if (painted.a > 0.5) col = painted.rgb;
    else if (d < r) col = fire(mix(0.85, 0.65, age) + 0.15*flare, q);
  } else if (d < r) col = plain;

  // Mercury in transit: a hard dark dot crossing the young disc, the only thing for scale
  vec2 mp = floor(vec2(mix(-1.15, 1.15, uP.z), -(0.18 - 0.22*uP.z))*r + 0.5);
  if (uP.z > 0.0 && uP.z < 1.0 && d < r && length(q - mp) < max(1.5, r*0.0065)) col = PITCH;

  // The ejection: a loop of plasma torn off the upper-right limb, swelling as it leaves, in strands.
  float ej = uP.w;
  if (ej > 0.0 && ej < 1.0){
    vec2 edir = normalize(vec2(0.93, -0.36));
    vec2 eq = q - edir*r*(1.02 + ej*0.75);
    float er = r*(0.06 + ej*0.42);
    float ed = length(eq);
    float ea = atan(eq.y, eq.x);
    bool front = dot(eq/max(ed, 1e-4), edir) > -0.15;
    bool fibre = fbm3(vec3(ea*7.0, ed/r*10.0, t*0.6)) > 0.55;
    // two threads of the shell, never a clean ring
    bool shell = abs(ed - er*(1.0 + 0.08*sin(ea*9.0 + t))) < max(1.0, er*0.06);
    bool inner = abs(ed - er*0.72) < max(1.0, er*0.04) && fbm3(vec3(ea*11.0, 4.0, t*0.8)) > 0.6;
    float fade = (1.0 - ej)*smoothstep(0.0, 0.06, ej);
    if (front && fibre && (shell || inner) && bayer4(q) < fade*1.5) col = fire(mix(0.85, 0.55, age), q);
  }

  // across the cut and into the approach the sun is the earth shot's own, handing over cell by cell
  if (bayer8(cell) >= uP.x) col = sunRings(sky, q, r, 1.0);

  gl_FragColor = vec4(col, 1.0);
}

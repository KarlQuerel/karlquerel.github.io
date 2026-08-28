precision highp float;
uniform vec2  uRes;
uniform vec3  uCamPos, uRight, uUp, uFwd;
uniform float uFocal, uEntry, uProg;
uniform vec2  uLook;    // pointer deflection, for the layers drawn in screen space
uniform vec3  uSun;
// Eight slots, of which four carry the flight and four are only ever scenery. A body
// costs one ray-sphere test on a ray that misses it - three flops - and the marching,
// which is all the cost, still only runs for the one that ends up nearest. So the budget
// buys spread rather than frame time.
const int NB = 12;
uniform vec4  uB[NB];   // center.xyz, radius
uniform vec4  uBP[NB];  // paletteId, spin, ringInner, ringOuter
uniform vec3  uRingN;
const int NR = 3;       // rocks on the corridor, always marched, never gated
uniform vec4  uRock[NR];    // centre.xyz, radius
uniform vec4  uRockSpin[NR];  // (cos,sin) of the spin, then of the tumble
// The belt. Spheres rather than marched rocks: at a degree across a lumpy silhouette is a
// pixel or two of difference and costs sixty raymarch steps to say it, so the whole field
// here comes in under the price of one of the three rocks. The count is settled at runtime
// against the GPU's uniform budget - see where this gets compiled - because the spec only
// promises a fragment shader sixteen vec4s and this asks for a good deal more.
const int NBELT = __BELT_COUNT__;
uniform vec4  uBelt[NBELT];   // centre.xyz, radius
uniform float uBeltSpin;

// quantisation is what makes it pixel art; too few levels makes it a poster
const float LEVELS = 22.0;

// Aerial perspective, borrowed. There is no fog in space, but contrast against a star
// field does fall away with distance and the eye reads faint as far. With no distance term
// at all - and there was none - a two-degree disc a hundred and sixty units out was
// rendered as crisply and as saturated as a nine-degree one at twenty, so the whole system
// flattened onto a single plane: five bodies in one frame read as a diorama instead of as
// depth. Near things are left alone, the falloff only opening past HAZE_NEAR, so the ridge
// that owns the opening frame is untouched by it.
// The far end is set by what the flight actually needs to hide rather than by anything
// physical: a body past 170 units is one the reader has not been introduced to yet, and it
// should read as a rumour, not as a second planet the same apparent size as the one they
// are looking at. Moving the destination further out to buy that spacing does not work -
// the gap and the size of its eventual reveal are the same ratio, so widening one shrinks
// the other, and a ten-radii gap costs the arrival five degrees of the eight it has now.
// The near end never moves: everything inside 30 units is a pass, and passes are the point.
const float HAZE_NEAR = 30.0;
const float HAZE_FAR = 175.0;
const float HAZE_MAX = 0.93;
const vec3 VOID_TINT = vec3(0.055, 0.062, 0.105);
vec3 farOff(vec3 c, float d){
  return mix(c, VOID_TINT, smoothstep(HAZE_NEAR, HAZE_FAR, d)*HAZE_MAX);
}

// --- ordered dithering (4x4/8x8 bayer, no bit ops in GLSL ES 1.00)
float bayer2(vec2 a){ a = floor(a); return fract(a.x/2.0 + a.y*a.y*0.75); }
float bayer8(vec2 a){ return bayer2(0.25*a)*0.0625 + bayer2(0.5*a)*0.25 + bayer2(a); }

float hash13(vec3 p){
  p = fract(p*0.3183099 + vec3(0.71,0.113,0.419));
  p *= 17.0;
  return fract(p.x*p.y*p.z*(p.x+p.y+p.z));
}
float noise3(vec3 x){
  vec3 i = floor(x), f = fract(x);
  f = f*f*(3.0-2.0*f);
  float a = mix(mix(mix(hash13(i+vec3(0,0,0)), hash13(i+vec3(1,0,0)), f.x),
                    mix(hash13(i+vec3(0,1,0)), hash13(i+vec3(1,1,0)), f.x), f.y),
                mix(mix(hash13(i+vec3(0,0,1)), hash13(i+vec3(1,0,1)), f.x),
                    mix(hash13(i+vec3(0,1,1)), hash13(i+vec3(1,1,1)), f.x), f.y), f.z);
  return a;
}
float fbm(vec3 p){
  float s = 0.0, a = 0.5;
  for (int o = 0; o < 5; o++){ s += a*noise3(p); p *= 2.02; a *= 0.5; }
  return s;
}
float fbm3(vec3 p){
  float s = 0.0, a = 0.5;
  for (int o = 0; o < 3; o++){ s += a*noise3(p); p *= 2.13; a *= 0.5; }
  return s;
}
// ridged noise reads as crater rims and scarps on airless bodies
float ridged(vec3 p){
  float s = 0.0, a = 0.5;
  for (int o = 0; o < 3; o++){ s += a*(1.0 - abs(2.0*noise3(p) - 1.0)); p *= 2.17; a *= 0.5; }
  return s;
}
// surface relief at one scale - same field feeds the colour bands and the normal,
// so the shading lines up with the terrain instead of floating over it
float detail(vec3 sp, float f, float ocean){
  return ocean > 0.0 ? fbm3(sp*f) : ridged(sp*f);
}

// --- the hero asteroid. Marched rather than traced: a real rock's outline is lumpy,
// and a circle in silhouette is the one thing that gives a sphere away.
float rockRadius(vec3 dir, float seed){
  vec3 ax = vec3(1.26, 0.66, 0.92);                     // elongated, not round
  float r = inversesqrt(dot(dir*dir/(ax*ax), vec3(1.0)));
  r += 0.30*(ridged(dir*1.4 + seed) - 0.5);             // big bites out of the outline
  r += 0.14*(fbm3(dir*3.6 + seed*1.7) - 0.5);
  r += 0.05*(fbm3(dir*9.0 + seed) - 0.5);
  for (int i = 0; i < 3; i++){                          // craters: bowl plus raised rim
    float fi = float(i) + seed;
    vec3 c = normalize(vec3(hash13(vec3(fi,1.0,2.0)), hash13(vec3(fi,3.0,4.0)),
                            hash13(vec3(fi,5.0,6.0))) - 0.5);
    float a = dot(dir, c);
    float w = 0.80 + 0.12*hash13(vec3(fi,7.0,8.0));
    r -= 0.17*smoothstep(w - 0.16, 1.0, a);
    r += 0.05*smoothstep(w - 0.20, w - 0.09, a)*(1.0 - smoothstep(w - 0.09, w, a));
  }
  return r;
}
// Into the rock's own frame: a spin about the vertical, then a turn end over end. One
// axis reads as something on a lathe; two, at rates that do not divide into each other,
// is what a rock with no reason to be balanced actually does.
vec3 rockLocal(vec3 q, vec4 rot){
  vec3 a = vec3(q.x*rot.x + q.z*rot.y, q.y, -q.x*rot.y + q.z*rot.x);
  return vec3(a.x, a.y*rot.z + a.z*rot.w, -a.y*rot.w + a.z*rot.z);
}
// and back out of it again - rockLocal is a rotation, so its inverse is its transpose
vec3 rockWorld(vec3 v, vec4 rot){
  vec3 a = vec3(v.x, v.y*rot.z - v.z*rot.w, v.y*rot.w + v.z*rot.z);
  return vec3(a.x*rot.x - a.z*rot.y, a.y, a.x*rot.y + a.z*rot.x);
}
float rockDist(vec3 wp, vec4 rk, vec4 rot){
  vec3 q = wp - rk.xyz;
  vec3 dir = normalize(rockLocal(q, rot));
  // seed off the position too, or every rock of a given size is the same rock
  return length(q) - rk.w*rockRadius(dir, rk.w*7.0 + rk.x*0.37 + rk.z*0.11);
}
float traceRock(vec3 ro, vec3 rd, vec4 rk, vec4 rot){
  if (rk.w <= 0.0) return -1.0;
  vec3 oc = ro - rk.xyz;                     // bounding sphere: a miss costs three flops
  float R = rk.w*1.75;
  float b = dot(oc, rd), c2 = dot(oc, oc) - R*R;
  float h = b*b - c2;
  if (h < 0.0) return -1.0;
  float t = max(-b - sqrt(h), 0.02), tEnd = -b + sqrt(h);
  for (int i = 0; i < 60; i++){
    float d = rockDist(ro + rd*t, rk, rot);
    if (d < 0.004*t) return t;
    t += d*0.55;
    if (t > tEnd) return -1.0;
  }
  return -1.0;
}
vec3 rockNormal(vec3 wp, vec4 rk, vec4 rot){
  vec2 e = vec2(0.010, 0.0);
  float d0 = rockDist(wp, rk, rot);
  return normalize(vec3(rockDist(wp + e.xyy, rk, rot) - d0,
                        rockDist(wp + e.yxy, rk, rot) - d0,
                        rockDist(wp + e.yyx, rk, rot) - d0));
}

// --- per-world palettes (band colours low -> high elevation)
void palette(float pid, out vec3 c1, out vec3 c2, out vec3 c3, out vec3 c4, out vec3 c5,
             out float sea, out float ocean){
  if (pid < 0.5){            // the ringed world: rust and basalt, airless
    c1 = vec3(28,22,26); c2 = vec3(66,38,36); c3 = vec3(118,58,42);
    c4 = vec3(158,92,58); c5 = vec3(172,142,118);
    sea = 0.46; ocean = 0.0;
  } else if (pid < 1.5){     // destination: sulphur flats over dark olive basins
    c1 = vec3(10,24,16); c2 = vec3(38,70,32); c3 = vec3(116,138,38);
    c4 = vec3(178,178,58); c5 = vec3(228,222,148);
    sea = 0.49; ocean = 1.0;
  } else if (pid < 2.5){     // the near moon: cold grey basalt, no air at all
    c1 = vec3(26,26,30); c2 = vec3(58,58,64); c3 = vec3(92,92,98);
    c4 = vec3(134,134,140); c5 = vec3(186,186,192);
    sea = 0.46; ocean = 0.0;
  } else if (pid < 3.5){     // the corridor moon: iron, colder and darker than that one -
    c1 = vec3(16,19,26); c2 = vec3(38,44,58); c3 = vec3(66,74,92);   // it has to read as
    c4 = vec3(98,106,124); c5 = vec3(142,150,168);                   // its own body, not
    sea = 0.46; ocean = 0.0;                                         // as the ridge again
  // The scenery worlds. Four of the five bodies the flight actually touches are grey or
  // rust, which is the other half of why the system read as one object repeated: same
  // hue, same size, one behind the other. These are the ones that are only ever looked
  // at, so they are the ones that can afford to be a different colour.
  } else if (pid < 4.5){     // pale ice: the one bright body in the flight
    c1 = vec3(58,72,96); c2 = vec3(104,126,156); c3 = vec3(158,182,206);
    c4 = vec3(206,224,238); c5 = vec3(240,248,255);
    sea = 0.44; ocean = 0.0;
  } else if (pid < 5.5){     // the far giant: banded ochre. ocean=1 buys the latitude
    c1 = vec3(72,44,26); c2 = vec3(126,84,40); c3 = vec3(186,140,66);  // banding and the
    c4 = vec3(224,188,120); c5 = vec3(246,228,186);                    // cloud shell, which
    sea = 0.47; ocean = 1.0;                                           // is what a gas
  } else if (pid < 6.5){     // deep rust, well below the corridor          giant is
    c1 = vec3(30,14,14); c2 = vec3(74,30,26); c3 = vec3(122,52,38);
    c4 = vec3(160,84,54); c5 = vec3(198,140,102);
    sea = 0.47; ocean = 0.0;
  } else if (pid < 7.5){     // verdigris rock: cold green, nothing else in the scene is
    c1 = vec3(18,30,28); c2 = vec3(40,66,58); c3 = vec3(70,104,88);
    c4 = vec3(108,146,120); c5 = vec3(158,190,166);
    sea = 0.46; ocean = 0.0;
  } else if (pid < 8.5){     // blue-grey ice giant, for the ones far enough out that the
    c1 = vec3(22,34,52); c2 = vec3(46,72,104); c3 = vec3(84,122,158);   // haze has most of
    c4 = vec3(130,168,198); c5 = vec3(184,212,232);                     // them anyway
    sea = 0.48; ocean = 1.0;
  } else {                   // warm tan: dust and old rock, the plainest body out here
    c1 = vec3(34,28,22); c2 = vec3(78,64,48); c3 = vec3(124,104,78);
    c4 = vec3(166,144,110); c5 = vec3(206,190,158);
    sea = 0.46; ocean = 0.0;
  }
  c1/=255.0; c2/=255.0; c3/=255.0; c4/=255.0; c5/=255.0;
}

// five bands. The shoreline shoulder stays tight so coasts read as edges;
// the ones above it are wider, because scrub does not stop on a line.
vec3 bands(vec3 c1, vec3 c2, vec3 c3, vec3 c4, vec3 c5, float sea, float n, float shore){
  vec3 col = mix(c1, c2, smoothstep(sea-0.17, sea-0.05, n));
  col = mix(col, c3, smoothstep(sea-shore, sea+shore, n));
  col = mix(col, c4, smoothstep(sea+0.045, sea+0.105, n));
  col = mix(col, c5, smoothstep(sea+0.15, sea+0.215, n));
  return col;
}

// star cells track the art grid, so a star stays one pixel however fine the grid gets
vec3 stars(vec3 rd){
  vec3 col = vec3(0.0);
  float base = uRes.y*0.45;
  for (int L = 0; L < 3; L++){
    float sc = base*(1.0 + float(L)*1.45);
    vec3 c = floor(rd*sc);
    float h = hash13(c + float(L)*31.7);
    if (h > 0.9955 - float(L)*0.0007){
      vec3 j = vec3(hash13(c+1.3), hash13(c+2.7), hash13(c+3.1)) - 0.5;
      float d = length(fract(rd*sc) - 0.5 - j*0.6);
      float b = smoothstep(0.30, 0.0, d) * (0.35 + 0.65*hash13(c+7.7));
      vec3 tint = mix(vec3(0.72,0.80,1.0), vec3(1.0,0.86,0.68), hash13(c+9.1));
      col += tint*b;
    }
  }
  // galactic band
  float band = exp(-pow(abs(rd.y*2.2 + rd.x*0.5), 2.0)*3.0);
  col += vec3(0.16,0.17,0.28) * band * (0.25 + 0.75*fbm3(rd*7.0));
  return col;
}

// ring opacity at radius r: two noise scales for fine gaps, one wide division
float ringDensity(float r, float ri, float ro){
  if (ro <= 0.0 || r < ri || r > ro) return 0.0;
  float u = (r - ri)/(ro - ri);
  float g = fbm3(vec3(r*3.4, 0.0, 0.0))*0.64 + fbm3(vec3(r*12.0, 0.0, 0.0))*0.36;
  float a = smoothstep(0.42, 0.58, g);
  a *= 1.0 - 0.94*exp(-pow((u - 0.46)*16.0, 2.0));
  return a * smoothstep(0.0, 0.05, u) * smoothstep(1.0, 0.90, u);
}

// ring shadow cast onto the planet
float ringShadow(vec3 p, vec3 c, float ri, float ro){
  if (ro <= 0.0) return 1.0;
  float dn = dot(uRingN, uSun);
  if (abs(dn) < 0.001) return 1.0;
  float t = dot(c - p, uRingN)/dn;
  if (t < 0.0) return 1.0;
  float r = length((p + uSun*t) - c);
  return 1.0 - 0.66*ringDensity(r, ri, ro);
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag - 0.5*uRes)/uRes.y;
  vec3 rd = normalize(uv.x*uRight + uv.y*uUp + uFocal*uFwd);
  vec3 ro = uCamPos;

  vec3 col = stars(rd);

  // the sun: disc + bloom
  float sd = max(dot(rd, uSun), 0.0);
  col += vec3(1.0,0.82,0.52)*smoothstep(0.99986, 0.99996, sd)*2.4;
  col += vec3(0.95,0.55,0.26)*pow(sd, 26.0)*0.14;

  // --- nearest sphere
  float best = 1e9; int hit = -1;
  for (int i = 0; i < NB; i++){
    if (uB[i].w <= 0.0) continue;
    vec3 oc = ro - uB[i].xyz;
    float b = dot(oc, rd);
    float c2 = dot(oc, oc) - uB[i].w*uB[i].w;
    float h = b*b - c2;
    if (h < 0.0) continue;
    float t = -b - sqrt(h);
    if (t > 0.0 && t < best){ best = t; hit = i; }
  }

  // --- ring plane (slot 0 only), composited by depth
  float ringT = 1e9; float ringA = 0.0; vec3 ringC = vec3(0.0);
  if (uBP[0].w > 0.0){
    float dn = dot(rd, uRingN);
    if (abs(dn) > 0.0005){
      float t = dot(uB[0].xyz - ro, uRingN)/dn;
      if (t > 0.0){
        vec3 p = ro + rd*t;
        float r = length(p - uB[0].xyz);
        float dens = ringDensity(r, uBP[0].z, uBP[0].w);
        if (dens > 0.004){
          ringT = t;
          // grain resolves into individual shards up close
          float grain = 0.55 + 0.45*fbm3(p*vec3(2.4,9.0,2.4)*(1.0 + 8.0/max(t,0.6)));
          // edge-on the band thins to a line, so fade with the grazing angle
          ringA = dens*grain*(0.30 + 0.70*smoothstep(0.0, 0.10, abs(dn)));
          // planet shadow on the ring
          vec3 oc = p - uB[0].xyz;
          float bb = dot(oc, uSun);
          float cc = dot(oc,oc) - uB[0].w*uB[0].w;
          float hh = bb*bb - cc;
          float lit = (hh > 0.0 && -bb - sqrt(hh) > 0.0) ? 0.30 : 1.0;
          ringC = mix(vec3(0.40,0.36,0.34), vec3(0.80,0.74,0.68), grain)*lit;
        }
      }
    }
  }

  if (hit >= 0){
    int H = hit;
    vec3 c = vec3(0.0); float rad = 0.0; vec4 pp = vec4(0.0);
    for (int i = 0; i < NB; i++){ if (i == H){ c = uB[i].xyz; rad = uB[i].w; pp = uBP[i]; } }

    vec3 p = ro + rd*best;
    vec3 n = normalize(p - c);

    // spin the surface under fixed lighting
    float s = pp.y, cs = cos(s), ss = sin(s);
    vec3 sp = vec3(n.x*cs + n.z*ss, n.y, -n.x*ss + n.z*cs);

    vec3 c1,c2,c3,c4,c5; float sea, ocean;
    palette(pp.x, c1,c2,c3,c4,c5, sea, ocean);

    // detail LOD: a close pass has to resolve relief that orbit never shows,
    // so extra octaves fade in with altitude measured in body radii
    float alt = length(ro - c)/rad - 1.0;
    float near = smoothstep(6.0, 0.05, alt);
    float close = smoothstep(0.90, 0.04, alt);
    // one mid scale always on: crater fields and coastlines are visible from orbit
    float e = fbm(sp*3.2) + (detail(sp, 11.0, ocean) - 0.5)*0.11;
    // the detail scale climbs as we drop, so the ground never smears into mud
    // the ceiling is where an octave stops being terrain and starts being speckle:
    // past it the features land inside one art pixel and just alias
    float dFreq = mix(ocean > 0.0 ? 17.0 : 15.0, 78.0, close);
    if (near > 0.0){
      e += (detail(sp, dFreq, ocean) - 0.5)*0.16*near;
      e += (ridged(sp*dFreq*3.0) - 0.5)*0.062*near*near;
      e += (fbm3(sp*dFreq*6.6) - 0.5)*0.022*near*near;
    }
    // Banded by latitude rather than blotched into continents. Blue water beside tan
    // land is Earth's own palette, and the shapes read as Earth however they are
    // coloured - breaking the layout matters as much as breaking the hues.
    if (ocean > 0.0) e = mix(e, 0.30 + 0.34*e + 0.17*sin(sp.y*7.5 + fbm3(sp*2.4)*2.6), 0.72);
    vec3 base = bands(c1,c2,c3,c4,c5, sea, e, ocean > 0.0 ? 0.014 : 0.030);

    // relief shading from the elevation gradient - a smooth sphere gives it away
    if (near > 0.0){
      vec3 t1 = normalize(cross(n, vec3(0.0,1.0,0.001)));
      vec3 t2 = cross(n, t1);
      float h = 0.1/dFreq;   // a tenth of a noise cell, whatever scale we are at
      float ea = detail(sp + t1*h, dFreq, ocean) - detail(sp - t1*h, dFreq, ocean);
      float eb = detail(sp + t2*h, dFreq, ocean) - detail(sp - t2*h, dFreq, ocean);
      // ease the relief off as we drop in, or per-pixel shading turns to static
      n = normalize(n - (t1*ea + t2*eb)*mix(3.0, 1.7, close)*near);
    }

    float ndl = dot(n, uSun);
    float day = max(ndl, 0.0);
    // airless bodies stay flat toward the terminator instead of rolling off as a cosine
    float shade = 0.09 + 0.91*mix(pow(day, 0.75), day, ocean);
    shade *= ringShadow(p, c, pp.z, pp.w);

    // cloud shell, drifting ahead of the ground
    if (ocean > 0.0){
      vec3 cq = vec3(sp.x*cs*1.0 + 4.1, sp.y, sp.z)*3.1 + vec3(s*0.35,0.0,0.0);
      float cn = fbm3(cq)*0.70 + fbm3(cq*4.7)*0.30;
      float ca = smoothstep(0.52, 0.66, cn)*0.80;
      base = mix(base, vec3(0.87,0.90,0.60), ca);
      // cloud tops catch the light a beat before the ground does
      shade += ca*day*0.10;
    }
    // specular glint off open water
    if (ocean > 0.0 && e < sea){
      vec3 hv = normalize(uSun - rd);
      base += vec3(0.96,1.0,0.62)*pow(max(dot(n,hv),0.0), 90.0)*0.55;
    }
    vec3 lit = base*shade;

    // atmosphere: forward-scattering rim, warm at the terminator
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    float term = smoothstep(0.35, 0.0, abs(ndl));
    // each world declares its own air: the rock has barely any, the brine world cyan
    vec3 haze = mix(vec3(0.34,0.44,0.72), vec3(0.44,0.70,0.26), ocean);
    vec3 dusk = mix(vec3(1.0,0.52,0.28), vec3(1.0,0.68,0.32), ocean);
    vec3 atmo = mix(haze, dusk, term);
    lit += atmo*rim*(0.20 + 0.80*day)*(0.35 + 0.65*ocean);

    col = farOff(lit, best);
  }

  // --- the rocks, each composited by depth against everything above and each other
  for (int i = 0; i < NR; i++){
    vec4 rot = uRockSpin[i];
    float tr = traceRock(ro, rd, uRock[i], rot);
    if (tr > 0.0 && tr < best){
      best = tr;
      vec3 hp = ro + rd*tr;
      vec3 n = rockNormal(hp, uRock[i], rot);
      vec3 q = hp - uRock[i].xyz;
      vec3 lp = rockLocal(q, rot);
      vec3 base = mix(vec3(0.24,0.23,0.25), vec3(0.56,0.52,0.48), fbm3(lp*3.4));
      base = mix(base, vec3(0.40,0.34,0.29), smoothstep(0.45,0.80,ridged(lp*9.0))*0.5);
      float day = max(dot(n, uSun), 0.0);
      float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
      col = farOff(base*(0.07 + 0.98*day) + vec3(0.42,0.50,0.66)*rim*0.14, tr);
    }
  }

  // the belt, composited by depth against everything above and against itself
  for (int i = 0; i < NBELT; i++){
    vec4 bk = uBelt[i];
    if (bk.w <= 0.0) continue;
    // Ellipsoids, not spheres. A field of perfect balls reads as marbles however it is lit,
    // and a circle in silhouette is the one thing that gives a sphere away - the same reason
    // the three hero rocks are marched. At a degree across, three unequal axes tumbling on
    // two of them is most of what marching would have bought, for a linear transform instead
    // of sixty steps. Shape, spin and colour are hashed off the rock's own position, so none
    // of it costs a uniform.
    float ha = hash13(bk.xyz*0.7 + 3.0);
    float hb = hash13(bk.xyz*0.7 + 11.0);
    float hc = hash13(bk.xyz*0.7 + 23.0);
    vec3 axes = vec3(1.34, 0.70, 0.98) + 0.46*vec3(ha, hb, hc) - 0.23;
    float sa = uBeltSpin*(0.5 + ha*1.9), sb = uBeltSpin*(0.35 + hb*1.5);
    vec4 rot = vec4(cos(sa), sin(sa), cos(sb), sin(sb));
    vec3 ol = rockLocal(ro - bk.xyz, rot)/axes;
    vec3 dl = rockLocal(rd, rot)/axes;      // a direction, not a point: rockLocal is linear
    float aa = dot(dl, dl), bb = dot(ol, dl), cc = dot(ol, ol) - bk.w*bk.w;
    float hh = bb*bb - aa*cc;
    if (hh < 0.0) continue;
    float t = (-bb - sqrt(hh))/aa;
    if (t <= 0.0 || t >= best) continue;
    best = t;
    vec3 pl = ol + dl*t;                    // the hit, in the rock's own round space
    vec3 n = normalize(rockWorld(pl/axes, rot));
    vec3 sp = normalize(pl);
    // three rough classes, the way a belt has them: dark and carbonaceous, rusty, or pale
    // and metallic. One grey for everything is the other half of why this read as gravel.
    vec3 tint = hc < 0.55 ? vec3(0.20,0.19,0.20)
              : hc < 0.85 ? vec3(0.33,0.23,0.18)
                          : vec3(0.45,0.44,0.42);
    vec3 base = mix(tint, tint*1.95 + 0.05, fbm3(sp*3.1 + bk.xyz*0.07));
    base = mix(base, tint*0.68, smoothstep(0.45,0.80,ridged(sp*7.0))*0.5);
    float day = max(dot(n, uSun), 0.0);
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    col = farOff(base*(0.06 + 1.02*day) + vec3(0.42,0.50,0.66)*rim*0.12, t);
  }

  // The ring goes last, so it is composited against whatever ended up nearest, sphere or
  // rock. Drawn before the rocks it was only ever tested against the spheres, which is why
  // a rock behind the ring drew straight over it.
  if (ringA > 0.0 && ringT < best) col = mix(col, farOff(ringC, ringT), clamp(ringA, 0.0, 1.0));

  // ------------------------------------------------ atmospheric entry
  if (uEntry > 0.0){
    float E = uEntry;
    // dusk sky swallows the stars
    vec3 top = mix(vec3(0.05,0.10,0.06), vec3(0.08,0.20,0.10), E);
    vec3 low = mix(vec3(0.38,0.34,0.12), vec3(0.94,0.84,0.30), smoothstep(0.2,0.9,E));
    vec3 sky = mix(low, top, smoothstep(-0.28, 0.40, uv.y));
    // hold the fade back: the ground below should stay readable well into the burn
    col = mix(col, sky, smoothstep(0.04, 0.42, E));

    // wisps streaming past on the way down, well above the main deck
    float wisps = smoothstep(0.06, 0.22, E)*smoothstep(0.60, 0.38, E);
    for (int k = 0; k < 2; k++){
      float fk = float(k);
      float ph = fract(E*2.3 + fk*0.33);
      float z = mix(3.0, 0.44, ph);
      vec2 q = uv/z + vec2(fk*3.7, -0.55 + ph*1.9);
      // a second octave: one blob per deck reads as fog once the grid is this fine
      float d = fbm3(vec3(q*3.8, fk*5.0 + 11.0))*0.72 + fbm3(vec3(q*13.0, fk*5.0 + 3.0))*0.28;
      float a = smoothstep(0.53, 0.61, d) * smoothstep(0.0,0.15,ph) * smoothstep(1.0,0.82,ph);
      col = mix(col, vec3(0.84,0.86,0.62)*(0.55 + 0.45*d), a*0.85*wisps);
    }

    // plasma on the shield: hottest high up, spent before the deck closes in
    float heat = smoothstep(0.04,0.20,E)*smoothstep(0.46,0.26,E);
    float vig = smoothstep(0.30, 0.85, length(uv*vec2(0.85,1.25)));
    col += vec3(1.0,0.44,0.16)*heat*vig*0.55;
    col += vec3(1.0,0.80,0.55)*heat*0.04;

    // the ground, uncovered as the deck lets go of it: three ridge bands in parallax
    float land = smoothstep(0.48, 0.70, E);
    if (land > 0.0){
      for (int k = 0; k < 3; k++){
        float fk = float(k)*0.5;
        float freq = mix(6.0, 2.0, fk);
        float amp  = mix(0.045, 0.15, fk);
        float horizon = -0.06 - fk*0.10 + (1.0-land)*0.26;
        // The ridgelines are drawn in screen space, so the camera's rotation never
        // reached them: on the way down the starfield answered the pointer and the ground
        // sat still. Shifting the sample does it here, and dividing by freq means the near
        // bands travel further than the far ones, which is the whole point of doing it.
        float sway = uLook.x*0.10;
        float lift = -uLook.y*0.016*(0.4 + fk);
        float hgt = horizon + lift + amp*(fbm3(vec3(uv.x*freq + fk*34.0 + uProg*0.6 + sway, 0.0, fk*6.0))*1.6 - 0.35);
        if (uv.y < hgt){
          vec3 body = mix(vec3(0.18,0.24,0.12), vec3(0.05,0.09,0.05), fk);
          float tex = 0.80 + 0.40*fbm3(vec3(uv.x*7.0 + fk*10.0, uv.y*7.0, fk*4.0));
          float crest = smoothstep(0.018, 0.0, hgt - uv.y);
          col = mix(body*tex, mix(vec3(0.68,0.62,0.22), vec3(0.30,0.30,0.14), fk), crest);
        }
      }
    }

    // air stacked along the horizon, thickest just after breakout
    float band = exp(-pow((uv.y + 0.06)*5.5, 2.0));
    col = mix(col, vec3(0.72,0.62,0.46),
              band*0.34*smoothstep(0.46,0.60,E)*smoothstep(1.0,0.72,E));

    // Inside the deck. Everything above is still being drawn underneath - this is what
    // hides it, and letting go of it is the reveal.
    float inCloud = smoothstep(0.20, 0.34, E)*smoothstep(0.66, 0.50, E);
    if (inCloud > 0.0){
      // the deck streams upward past a diving camera, so advect the noise with descent
      vec2 q = uv*vec2(1.0, 0.72) + vec2(0.0, -E*3.4);
      float t1 = fbm3(vec3(q*3.0, E*5.0));
      float t2 = fbm3(vec3(q*8.0 + 4.0, E*9.0));
      float t3 = fbm3(vec3(q*19.0 - 2.0, E*14.0));
      float murk = t1*0.55 + t2*0.30 + t3*0.15;
      // Sunlit at the top of the deck, unlit underneath. That gradient is the whole
      // trick: without it the screen is a grey card, with it you are inside weather.
      float lift = smoothstep(-0.5, 0.45, uv.y);
      vec3 fog = mix(vec3(0.20,0.19,0.23), vec3(0.97,0.86,0.72),
                     clamp(lift*0.8 + murk*0.6 - 0.18, 0.0, 1.0));
      col = mix(col, fog, inCloud*0.94);
    }
  }

  // ------------------------------------------------ pixel-art finish
  col = pow(clamp(col, 0.0, 1.0), vec3(0.92));                     // gentle lift
  float dth = (bayer8(frag) - 0.5)/LEVELS;                          // ordered dither
  col = floor(clamp(col + dth, 0.0, 1.0)*(LEVELS-1.0) + 0.5)/(LEVELS-1.0);
  gl_FragColor = vec4(col, 1.0);
}

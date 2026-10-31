#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
// Prepended to every intro shot: the uniform contract (see js/intro/introPass.js), the noise the
// shots are built from, and the same pixel-art finish, so every shot lands on one grid.
uniform vec2  uRes;
uniform float uTime;   // seconds into this shot
uniform vec2  uLook;   // pointer deflection, -1..1, +y down the screen
uniform vec2  uPtr;    // pointer over the grid, 0..1, y up
uniform vec4  uP, uQ, uR, uS;  // the shot's own parameters, set by its module
uniform vec4  uH;      // hands: x = state (0 grip, 1 reach, 2 hold), y = item, z = on, w = lift
uniform vec4  uGame;      // the game: x O2, y HULL, z SIGNAL (0 to 100), w the wrist readout raised 0..1
uniform vec4  uSuit;      // the suit: x the visor fogged 0..1 (breath after a run), y z w spare
uniform sampler2D uMask;
// the shared star tile (js/intro/sky.js), on its own unit
uniform sampler2D uSky;

// quantisation is what makes it pixel art; too few levels makes it a poster
const float LEVELS = 22.0;
const float PI = 3.14159265;

// --- ordered dithering (8x8 bayer, no bit ops in GLSL ES 1.00)
float bayer2(vec2 a){ a = floor(a); return fract(a.x/2.0 + a.y*a.y*0.75); }
float bayer8(vec2 a){ return bayer2(0.25*a)*0.0625 + bayer2(0.5*a)*0.25 + bayer2(a); }

float hash11(float p){ p = fract(p*0.1031); p *= p + 33.33; return fract(p*(p + p)); }
float hash12(vec2 p){ vec3 q = fract(vec3(p.xyx)*0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y)*q.z); }
float hash13(vec3 p){
  p = fract(p*0.3183099 + vec3(0.71,0.113,0.419));
  p *= 17.0;
  return fract(p.x*p.y*p.z*(p.x+p.y+p.z));
}
float noise2(vec2 x){
  vec2 i = floor(x), f = fract(x);
  f = f*f*(3.0-2.0*f);
  return mix(mix(hash12(i), hash12(i+vec2(1,0)), f.x), mix(hash12(i+vec2(0,1)), hash12(i+vec2(1,1)), f.x), f.y);
}
float noise3(vec3 x){
  vec3 i = floor(x), f = fract(x);
  f = f*f*(3.0-2.0*f);
  return mix(mix(mix(hash13(i+vec3(0,0,0)), hash13(i+vec3(1,0,0)), f.x),
                 mix(hash13(i+vec3(0,1,0)), hash13(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i+vec3(0,0,1)), hash13(i+vec3(1,0,1)), f.x),
                 mix(hash13(i+vec3(0,1,1)), hash13(i+vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm2(vec2 p){
  float s = 0.0, a = 0.5;
  for (int o = 0; o < 4; o++){ s += a*noise2(p); p = p*2.03 + 17.0; a *= 0.5; }
  return s;
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
// ridged noise reads as crater rims, scarps and cracked ground
float ridged(vec3 p){
  float s = 0.0, a = 0.5;
  for (int o = 0; o < 3; o++){ s += a*(1.0 - abs(2.0*noise3(p) - 1.0)); p *= 2.17; a *= 0.5; }
  return s;
}

// --- 2D signed distances, for the silhouettes and the hands
float sdBox(vec2 p, vec2 b){ vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
float sdRBox(vec2 p, vec2 b, float r){ return sdBox(p, b - r) - r; }
float sdSeg(vec2 p, vec2 a, vec2 b, float r){
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
  return length(pa - ba*h) - r;
}
float sdBox3(vec3 p, vec3 b){ vec3 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0); }

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
  float band = exp(-pow(abs(rd.y*2.2 + rd.x*0.5), 2.0)*3.0);
  col += vec3(0.16,0.17,0.28) * band * (0.25 + 0.75*fbm3(rd*7.0));
  return col;
}

// the frame's uv: y spans -0.5..0.5, x by aspect; the look tilts it a hair
vec2 frameUV(vec2 frag){ return (frag - 0.5*uRes)/uRes.y; }

// gentle lift, ordered dither, then the palette's worth of levels: the pixel-art finish
vec3 finish(vec3 col, vec2 frag){
  col = pow(clamp(col, 0.0, 1.0), vec3(0.92));
  float dth = (bayer8(frag) - 0.5)/LEVELS;
  return floor(clamp(col + dth, 0.0, 1.0)*(LEVELS-1.0) + 0.5)/(LEVELS-1.0);
}

// --- stencils: a 3x5 pixel font, each glyph fifteen bits read row by row from the top (bit y*3 + x)
float glyphBit(float code, vec2 c){
  if (c.x < 0.0 || c.x > 2.0 || c.y < 0.0 || c.y > 4.0) return 0.0;
  return mod(floor(code/exp2(c.y*3.0 + c.x)), 2.0);
}
float digitCode(float d){
  if (d < 0.5) return 31599.0;
  if (d < 1.5) return 29850.0;
  if (d < 2.5) return 29671.0;
  if (d < 3.5) return 31207.0;
  if (d < 4.5) return 18925.0;
  if (d < 5.5) return 31183.0;
  if (d < 6.5) return 31695.0;
  if (d < 7.5) return 18727.0;
  if (d < 8.5) return 31727.0;
  return 31215.0;
}

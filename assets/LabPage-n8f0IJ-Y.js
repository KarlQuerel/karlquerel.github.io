import{B as e,C as t,D as n,E as r,L as i,R as a,S as o,T as s,V as c,f as l,g as u,h as d,l as f,p,v as m,w as h,y as g,z as _}from"./vendor-CrIEX35D.js";import{d as v,f as y,i as b,r as x,t as S,u as C}from"./math-MWUoj_4F.js";import{d as w,f as T,g as ee,h as te,m as E,o as ne,p as re,u as D}from"./index-QlGM6pob.js";import{_ as O,a as ie,f as k,g as A,h as j,i as M,l as ae,m as N,n as P,o as F,p as I,r as L,s as R,t as oe,u as z,v as B,y as V}from"./gl-D0apTfDK.js";var H=Math.PI/180,U=[{c:[10.15,4,-60],r:3,pid:0,spin:.9,ring:[4.3,7.2]},{c:[14,-3,-186],r:6,pid:1,spin:.2,ring:[0,0]},{c:[10.25,-6,-25],r:12,pid:2,spin:.12,ring:[0,0]},{c:[8.55,-1.17,-148.2],r:3.68,pid:3,spin:.16,ring:[0,0]},{c:[1.39,36.34,-142.55],r:1.42,pid:4,spin:.27,ring:[0,0]},{c:[66.5,-1.5,-222.5],r:1.16,pid:7,spin:.33,ring:[0,0]},{c:[-29.96,82.6,-472.12],r:3.17,pid:8,spin:.06,ring:[0,0]},{c:[-42,47,-345],r:3.04,pid:9,spin:.09,ring:[0,0]},{c:[73.69,5.31,-229.16],r:2.18,pid:6,spin:.14,ring:[0,0]},{orbit:{about:0,r:7.6,phase:.205,sweep:-.09},r:.56,pid:2,spin:.41,ring:[0,0]},{c:[19.55,-11.67,-152.7],r:1.08,pid:4,spin:.35,ring:[0,0]},{c:[18.36,13.33,-218.77],r:2.07,pid:2,spin:.19,ring:[0,0]}],W=[{c:[4.2,-1.6,-104.5],r:1.3,spin:3.1,tumble:1.9},{c:[3.2,4.86,-83.17],r:1.24,spin:4.3,tumble:2.9},{c:[-1,-2,-125],r:1.9,spin:2.3,tumble:3.7}],se=[U[0],U[1]],G=[{s:0,p:[10,2.6,24]},{s:.123,p:[10,3.4,18]},{s:.194,p:[9.8,6,4]},{s:.255,p:[7.8,8.6,-20]},{s:.306,p:[6.9,6.4,-44]},{s:.356,p:[3.8,4.4,-61.2]},{s:.415,p:[3.4,2.4,-78]},{s:.475,p:[3,1.2,-103]},{s:.519,p:[2.6,-.1,-118]},{s:.6,p:[2.8,-.7,-136]},{s:.7,p:[4.6,-1.1,-158]},{s:.78,p:[8,-1.5,-168]},{s:.86,p:[11.6,-2.2,-174]},{s:.93,p:[13.4,-2.8,-176.5]},{s:1,p:[14,-3,-179.1]}],K=[{s:0,b:0,w:0},{s:.24,b:0,w:.08},{s:.3,b:0,w:.24},{s:.345,b:0,w:0},{s:.78,b:1,w:.25},{s:.88,b:1,w:.45},{s:1,b:1,w:.55}],q=[0,1,0],ce=O([.82,.3,.48]),J=O([.2,1,.13]),Y=1/Math.tan(58*Math.PI/360),le=.87,ue=.03,de=.09,fe=1500,pe=30*H,me=6*H,he=.06,ge=.025,_e=.7,X=.045,ve=.055,ye=.055,be=.5,xe=.14,Z={name:[`Karl`,`Querel`],role:`Software Engineer`,size:40,roleSize:16,w:8.05,gap:20,nameY:46,roleY:94,tex:[512,128],font:`"Press Start 2P", monospace`,ink:`#f4f8ff`,edge:`#05070e`,at:.1777},Se=[.4128,-.1081],Ce={near:.34,span:.36},we=.38,Te=.35,Ee=.25,De=.42,Oe=1.7,ke={context:.04,scene:.22,programs:.16,typeface:.08,frame:.5},Ae=1500,je=[[.12,`standing by`],[.27,`climb out`],[.4,`ring pass`],[.66,`close pass`],[.87,`approach`],[2,`entry`]],Me=.06,Ne=.2,Pe=.955,Fe=.035,Ie={interactive:.6,portalStart:.3,portalStagger:.15},Le=O(I(J,q)),Re=I(J,Le);function ze(e,t){if(!e.orbit)return e.c;let n=(e.orbit.phase+e.orbit.sweep*t)*2*Math.PI,r=k(A(Le,Math.cos(n)*e.orbit.r),A(Re,Math.sin(n)*e.orbit.r));return k(U[e.orbit.about].c,r)}function Be(e,t){let n=0;for(;n<e.length-2&&t>e[n+1].s;)n++;return n}var Ve=G.map((e,t)=>{let n=G[Math.max(0,t-1)],r=G[Math.min(G.length-1,t+1)];return A(V(r.p,n.p),1/(r.s-n.s||1))});function Q(e){let t=Be(G,e),n=G[t+1].s-G[t].s||1,r=x((e-G[t].s)/n),i=[];for(let e=0;e<3;e++)i[e]=b(G[t].p[e],G[t+1].p[e],Ve[t][e],Ve[t+1][e],n,r);return i}function He(e){let t=Be(K,e),n=C(x((e-K[t].s)/(K[t+1].s-K[t].s||1)));return{b0:K[t].b,b1:K[t+1].b,w0:K[t].w,w1:K[t+1].w,t:n}}var Ue=e=>V(Q(Math.min(1,e+X)),Q(Math.max(0,e-X))),We=e=>O(Ue(e)),Ge=e=>Math.hypot(...Ue(e))/(2*X);function Ke(e,t){let n=O(I(We(e),q)),r=V(We(Math.min(1,e+he)),We(Math.max(0,e-he))),i=N(r,n)/(2*he),a=t?me:pe;return Math.max(-a,Math.min(a,Math.atan(Ge(e)*i/fe)))}var qe=()=>({angle:0,vel:0,settled:!0});function Je(e,t,n){let r=81*(t-e.angle)-2*_e*9*e.vel;return e.vel+=r*n,e.angle+=e.vel*n,e.settled=Math.abs(e.vel)<2e-4&&Math.abs(t-e.angle)<2e-4,e.angle}function Ye(e,t,n,r,i,a){let o=C(x((e-ue)/de)),s=Q(e),c=Q(Math.min(1,e+X)),l=Q(Math.max(0,e-X)),u=O(V(c,l)),d=u,f=He(e),p=e=>O(V(se[e].c,s));if(f.b0===f.b1){let e=j(f.w0,f.w1,f.t);e>0&&(u=B(u,p(f.b0),e))}else{let e=f.w0*(1-f.t),t=f.w1*f.t;e>0&&(u=B(u,p(f.b0),e)),t>0&&(u=B(u,p(f.b1),t))}if(!r){let e=ve*(.4+.6*o),r=O(I(u,q));u=O(k(u,k(A(r,t*e),A(I(r,u),-n*e))))}let m=Je(i,Ke(Math.min(1,e+ge),r),a),h=O(I(d,q)),g=I(h,d),_=Math.cos(m),v=Math.sin(m),y=I(O(k(A(h,_),A(g,v))),d),b=I(u,y),S=Math.hypot(...b)>1e-4?O(b):O(I(u,q)),w=I(S,u),T=x((e-le)/(1-le)),ee=C(x(T/.4))*C(x((.95-T)/.4)),te=t=>(Math.sin(e*9e3+t)+Math.sin(e*23e3+t*3))*.0016*ee;S=O(k(S,[0,te(1),0])),w=O(k(w,[te(2),0,0]));let E=be*(1-C(x(e/xe)));return{eye:r||E<=0?s:k(s,k(A(S,t*E),A(w,-n*E))),fwd:u,right:S,up:w,travel:d,entry:T,wake:o,speed:Math.hypot(...V(c,l))/(2*X)}}var Xe=`attribute vec2 aP;
void main() { gl_Position = vec4(aP, 0.0, 1.0); }
`,Ze=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2  uRes;
uniform vec3  uCamPos, uRight, uUp, uFwd;
uniform float uFocal, uEntry, uProg;
uniform vec2  uLook;    // pointer deflection, for the layers drawn in screen space
uniform vec3  uSun;
// Twelve slots, of which four carry the flight and eight are only ever scenery. A body
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

// Planetshine off the destination: its dayside is a second, green lamp over the last
// third of the corridor. Falls off with the disc's solid angle, so it only pays within
// a few tens of units - exactly the stretch flown beside it - and is strongest where
// the shone-on face actually sees the lit half.

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

// The same geometry as the hero rocks, marched for a body a fraction of their size. Two
// things have to scale with the rock or a belt rock renders as a smooth blob: the hit
// epsilon, which at the hero rocks' flat 0.004*t is wider than a 0.3-unit rock eighty
// units out, so the march "arrives" the moment it enters the bounding sphere; and the
// normal's sample offset, for the same reason. Fewer steps than traceRock because there
// is far less rock to cross.
float traceBelt(vec3 ro, vec3 rd, vec4 rk, vec4 rot){
  vec3 oc = ro - rk.xyz;
  float R = rk.w*1.75;
  float b = dot(oc, rd), c2 = dot(oc, oc) - R*R;
  float h = b*b - c2;
  if (h < 0.0) return -1.0;
  float sh = sqrt(h);
  float t = max(-b - sh, 0.02), tEnd = -b + sh;
  float eps = min(0.004*t, 0.02*rk.w);
  for (int i = 0; i < 36; i++){
    float d = rockDist(ro + rd*t, rk, rot);
    if (d < eps) return t;
    t += d*0.6;
    if (t > tEnd) return -1.0;
  }
  return -1.0;
}
vec3 beltNormal(vec3 wp, vec4 rk, vec4 rot){
  vec2 e = vec2(0.012*rk.w, 0.0);
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

// Planetshine off the destination: its dayside is a second, green lamp over the last
// third of the corridor. Falls off with the disc's solid angle, so it only pays within
// a few tens of units - exactly the stretch flown beside it - and is strongest where
// the shone-on face actually sees the lit half.
vec3 destShine(vec3 p, vec3 n){
  vec3 q = uB[1].xyz - p;
  float d2 = dot(q, q);
  // Solid-angle falloff, lifted and capped: raw inverse-square is honest but lands
  // under one quantisation level (1/22) on everything but the very nearest rock, and
  // light the dither eats is light nobody was paid for. The cap keeps the gravel
  // passed right at the limb from reading as if it were floodlit.
  float k = min(uB[1].w*uB[1].w/max(d2, 1.0)*7.0, 0.85);
  if (k < 0.03) return vec3(0.0);
  vec3 l = q*inversesqrt(d2);
  float dayside = 0.5*(1.0 - dot(l, uSun));
  return vec3(0.42,0.52,0.20) * (max(dot(n, l), 0.0) * k * dayside);
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
          ringC = mix(vec3(0.40,0.36,0.34), vec3(0.80,0.74,0.68), grain);
          // Which face this is. From the sunward side the shards backscatter - the warm
          // look. From the shadow side the dense bands block their own light and go
          // dark, and only the thin fringes glow by transmission, brightest looking
          // sunward, which is what forward scattering is. The camera crosses the plane
          // at s=0.356, so the flip is a lighting event the flight actually earns.
          if (dot(uRingN, uSun) * dot(uRingN, ro - uB[0].xyz) < 0.0){
            float thin = clamp(dens*(1.0 - dens)*4.0, 0.0, 1.0);
            float fscat = 0.35 + 0.65*pow(max(dot(rd, uSun), 0.0), 6.0);
            ringC = mix(ringC*0.16, vec3(0.58,0.62,0.72)*fscat, thin*0.8);
          }
          ringC *= lit;
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
    // Specular glint off open water, gated to the brine world: a mirror flash needs
    // a liquid surface, and the giants' ocean flag buys banding and cloud, not a sea.
    if (ocean > 0.0 && pp.x < 1.5 && e < sea){
      vec3 hv = normalize(uSun - rd);
      base += vec3(0.96,1.0,0.62)*pow(max(dot(n,hv),0.0), 90.0)*0.55;
    }
    vec3 lit = base*shade;
    // the destination lights its own neighbourhood - night sides included
    if (H != 1) lit += base*destShine(p, n);

    // atmosphere: forward-scattering rim, warm at the terminator
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    float term = smoothstep(0.35, 0.0, abs(ndl));
    // each world declares its own air: the rock has barely any, the brine world cyan
    vec3 haze = mix(vec3(0.34,0.44,0.72), vec3(0.44,0.70,0.26), ocean);
    vec3 dusk = mix(vec3(1.0,0.52,0.28), vec3(1.0,0.68,0.32), ocean);
    vec3 atmo = mix(haze, dusk, term);
    // airless bodies keep only a whisper of it: regolith has no sky to glow
    lit += atmo*rim*(0.20 + 0.80*day)*(0.12 + 0.88*ocean);

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
      col = farOff(base*(0.07 + 0.98*day) + base*destShine(hp, n)
                   + vec3(0.42,0.50,0.66)*rim*0.14, tr);
    }
  }

  // The belt. One marched rock per ray, not a field of analytic ones.
  //
  // These were ellipsoids: cheap, and they tumbled, but three smooth axes is still a
  // smooth thing, and beside the marched hero rocks they read as pebbles. The fix is not
  // to march all of them - that would be a hundred sixty-step loops per pixel - but that
  // a ray only ever lands on one of them. So the loop is now a bounding-sphere scan for
  // whichever rock is nearest, a dozen flops each with no hashes and no trigonometry,
  // and the winner alone is marched through exactly the rockRadius the hero rocks use.
  // Real silhouettes and real craters, at one march per pixel however big the field is -
  // and the per-rock cost that scales with the count went DOWN, because the hashes and
  // the two sines that used to run for every rock on every pixel now run once.
  float bt = best;
  vec3 bc = vec3(0.0);
  float br = 0.0;
  for (int i = 0; i < NBELT; i++){
    vec4 bk = uBelt[i];
    if (bk.w <= 0.0) continue;
    vec3 oc = ro - bk.xyz;
    float R = bk.w*1.75;                    // the most rockRadius can bulge
    float b = dot(oc, rd), c2 = dot(oc, oc) - R*R;
    float h = b*b - c2;
    if (h < 0.0) continue;
    float t = -b - sqrt(h);
    if (t <= 0.0 || t >= bt) continue;
    bt = t; bc = bk.xyz; br = bk.w;
  }
  if (br > 0.0){
    // shape, spin and colour hashed off the rock's own position, so none of it costs a
    // uniform - and now paid once per pixel instead of once per rock per pixel
    float ha = hash13(bc*0.7 + 3.0);
    float hb = hash13(bc*0.7 + 11.0);
    float hc = hash13(bc*0.7 + 23.0);
    float sa = uBeltSpin*(0.5 + ha*1.9), sb = uBeltSpin*(0.35 + hb*1.5);
    vec4 rot = vec4(cos(sa), sin(sa), cos(sb), sin(sb));
    vec4 rk = vec4(bc, br);
    float t = traceBelt(ro, rd, rk, rot);
    if (t > 0.0 && t < best){
      best = t;
      vec3 hp = ro + rd*t;
      vec3 n = beltNormal(hp, rk, rot);
      vec3 sp = rockLocal(hp - bc, rot)/br;   // in units of the rock, so size never matters
      // three rough classes, the way a belt has them: dark and carbonaceous, rusty, or
      // pale and metallic. One grey for everything is what made this read as gravel.
      vec3 tint = hc < 0.55 ? vec3(0.20,0.19,0.20)
                : hc < 0.85 ? vec3(0.33,0.23,0.18)
                            : vec3(0.45,0.44,0.42);
      vec3 base = mix(tint, tint*1.95 + 0.05, fbm3(sp*3.1 + bc*0.07));
      base = mix(base, tint*0.68, smoothstep(0.45,0.80,ridged(sp*9.0))*0.5);
      float day = max(dot(n, uSun), 0.0);
      float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
      col = farOff(base*(0.06 + 1.02*day) + base*destShine(hp, n)
                   + vec3(0.42,0.50,0.66)*rim*0.12, t);
    }
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
`,Qe=240,$e=Array.from({length:241},(e,t)=>Q(t/Qe));function et(e){let t=0;for(;t<239&&$e[t+1][2]>e;)t++;let n=$e[t],r=$e[t+1],i=Math.min(1,Math.max(0,(n[2]-e)/(n[2]-r[2]||1)));return[n[0]+(r[0]-n[0])*i,n[1]+(r[1]-n[1])*i]}function tt(e){let t=new Float32Array(e*4),n=777,r=()=>(n=Math.imul(n,1664525)+1013904223>>>0)/4294967296,i=e=>{let[t,n]=et(e[2]),r=e[0]-t,i=e[1]-n,a=Math.hypot(r,i);if(a>=7)return e;if(a<.001)return[t+7,n,e[2]];let o=7/a;return[t+r*o,n+i*o,e[2]]},a=O(I(J,[0,0,1])),o=e=>{let[t,n]=et(e),i=7+r()*r()*39,o=r()*Math.PI*2,s=k(A(a,Math.cos(o)*i),A(J,Math.sin(o)*i*De));return[t+s[0],n+s[1],e+s[2]]},s=[];for(let e=0;e<14;e++)s.push(o(-(85+r()*97)));for(let n=0;n<e;n++){let e;if(r()<.72){let t=s[r()*14|0],n=5+r()*16;e=[t[0]+(r()*2-1)*n,t[1]+(r()*2-1)*n*.5,t[2]+(r()*2-1)*n*1.6]}else e=o(-(85+r()*97));let a=r(),c=i(e);t.set([c[0],c[1],c[2],.09+a*a*a*.62],n*4)}return t}var nt=[`uRes`,`uCamPos`,`uRight`,`uUp`,`uFwd`,`uFocal`,`uEntry`,`uProg`,`uLook`,`uSun`,`uRingN`,`uB[0]`,`uBP[0]`,`uRock[0]`,`uRockSpin[0]`,`uBelt[0]`,`uBeltSpin`],rt=Math.PI*2,it=e=>Math.max(0,Math.min(70,e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)-52));function at(e,t){let n=M(e,Xe,Ze.replace(`__BELT_COUNT__`,String(Math.max(1,t)))),r=F(e,oe),i=R(e,n,nt),a=e.getAttribLocation(n,`aP`),o=new Float32Array(U.length*4),s=new Float32Array(U.length*4),c=new Float32Array(W.length*4),l=new Float32Array(W.length*4);U.forEach((e,t)=>{o.set([...ze(e,0),e.r],t*4),s.set([e.pid,0,e.ring[0],e.ring[1]],t*4)}),t&&(e.useProgram(n),e.uniform4fv(i.uBelt,tt(t)));function u(u,d,f,p,m){U.forEach((e,t)=>{s[t*4+1]=e.spin*d*rt,e.orbit&&o.set(ze(e,d),t*4)}),W.forEach((e,t)=>{c.set(e.c,t*4),c[t*4+3]=e.r;let n=e.spin*d*rt,r=e.tumble*d*rt;l.set([Math.cos(n),Math.sin(n),Math.cos(r),Math.sin(r)],t*4)}),e.useProgram(n),L(e,r,a,2),e.uniform2f(i.uRes,m.width,m.height),e.uniform3fv(i.uCamPos,u.eye),e.uniform3fv(i.uRight,u.right),e.uniform3fv(i.uUp,u.up),e.uniform3fv(i.uFwd,u.fwd),e.uniform1f(i.uFocal,Y),e.uniform1f(i.uEntry,u.entry),e.uniform1f(i.uProg,d),e.uniform2f(i.uLook,f,p),e.uniform3fv(i.uSun,ce),e.uniform3fv(i.uRingN,J),e.uniform4fv(i.uB,o),e.uniform4fv(i.uBP,s),e.uniform4fv(i.uRock,c),e.uniform4fv(i.uRockSpin,l),t&&e.uniform1f(i.uBeltSpin,d*rt*Oe),e.disable(e.BLEND),e.drawArrays(e.TRIANGLES,0,6)}function d(){e.deleteBuffer(r),e.deleteProgram(n)}return{draw:u,release:d}}var ot=`attribute vec3 aSeed;
attribute float aTail;
uniform vec3 uCamPos, uRight, uUp, uFwd, uStreak;
uniform float uFocal, uAspect, uBox;
varying float vA;
void main(){
  // Motes sit still in the world and wrap into a box that follows the camera. Built in
  // camera space instead, as they were, they ride the view: turn the camera and the
  // whole field turns with it, which is why the streaks never answered a turn.
  vec3 rel = mod(aSeed*uBox - uCamPos, uBox) - uBox*0.5;
  vec3 q = rel - uStreak*aTail;          // the tail trails along the way we are going
  float z = dot(q, uFwd);
  if (z < 0.25){ gl_Position = vec4(2.0,2.0,2.0,1.0); vA = 0.0; return; }
  vec2 s = uFocal*vec2(dot(q, uRight), dot(q, uUp))/z;
  gl_Position = vec4(2.0*s.x/uAspect, 2.0*s.y, 0.0, 1.0);
  gl_PointSize = 1.0;
  // fade at the edge of the box, so wrapping never shows as a pop
  vA = smoothstep(uBox*0.5, uBox*0.18, length(rel))*smoothstep(0.25, 1.8, z);
}
`,st=`precision mediump float;
varying float vA;
uniform float uFade;
void main(){ gl_FragColor = vec4(vec3(0.78,0.85,1.0)*vA*uFade, 1.0); }
`,ct=[`uCamPos`,`uRight`,`uUp`,`uFwd`,`uFocal`,`uAspect`,`uBox`,`uStreak`,`uFade`];function lt(){let e=new Float32Array(5400),t=new Float32Array(1800);for(let n=0;n<900;n++){let r=[Math.random(),Math.random(),Math.random()];for(let i=0;i<2;i++)e.set(r,n*6+i*3),t[n*2+i]=i*we}return{seeds:e,tails:t}}function ut(e){let t=M(e,ot,st),n=R(e,t,ct),r=e.getAttribLocation(t,`aSeed`),i=e.getAttribLocation(t,`aTail`),{seeds:a,tails:o}=lt(),s=F(e,a),c=F(e,o);function l(a,o){let l=x(a.speed/320)*(1-x(a.entry/Te))*a.wake;if(l<=.01)return;e.useProgram(t),L(e,s,r,3),L(e,c,i,1),e.uniform3fv(n.uCamPos,a.eye),e.uniform3fv(n.uRight,a.right),e.uniform3fv(n.uUp,a.up),e.uniform3fv(n.uFwd,a.fwd),e.uniform1f(n.uFocal,Y),e.uniform1f(n.uAspect,o.width/o.height),e.uniform1f(n.uBox,22);let u=x(a.speed/900)*4+Ee;e.uniform3fv(n.uStreak,A(a.travel,u)),e.uniform1f(n.uFade,l),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE),e.drawArrays(e.LINES,0,1800)}function u(){e.deleteBuffer(s),e.deleteBuffer(c),e.deleteProgram(t)}return{draw:l,release:u}}var dt=`// The title stands in the world on its own plane, sixteen units ahead of where the
// camera rests. It is not an overlay: the flight closes on it, magnifies it, and
// passes between the two words of the name, which is the moment the page admits it
// was never flat.
// uAnchor is the point in the texture the plane hangs from - the middle of that gap -
// rather than its centre, so capping the width on a narrow viewport pivots there and
// the flight still threads the same hole.
attribute vec2 aUV;
uniform vec3 uCamPos, uRight, uUp, uFwd, uTPos, uTRight, uTUp;
uniform vec2 uAnchor, uSnap;
uniform float uFocal, uAspect, uTW, uTH;
varying vec2 vUV;
void main(){
  vec3 world = uTPos + uTRight*((aUV.x - uAnchor.x)*uTW) + uTUp*((uAnchor.y - aUV.y)*uTH);
  vec3 rel = world - uCamPos;
  float z = dot(rel, uFwd);
  vUV = aUV;
  if (z < 0.3){ gl_Position = vec4(2.0,2.0,2.0,1.0); return; }
  vec2 s = uFocal*vec2(dot(rel, uRight), dot(rel, uUp))/z;
  // uSnap lands the anchor on an art-pixel boundary; see where it is computed
  gl_Position = vec4(2.0*s.x/uAspect + uSnap.x, 2.0*s.y + uSnap.y, 0.0, 1.0);
}
`,ft=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUV;
uniform sampler2D uTex;
uniform float uFade;
void main(){
  vec4 t = texture2D(uTex, vUV);
  if (t.a < 0.02) discard;
  gl_FragColor = vec4(t.rgb, t.a)*uFade;   // premultiplied: colour fades with alpha
}
`,pt=Z.tex[0],mt=Q(Z.at),ht=[((Z.tex[0]-(Z.name.join(``).length*Z.size+Z.gap))/2+Z.name[0].length*Z.size+Z.gap+Se[0]*Z.size)/Z.tex[0],(Z.nameY+Se[1]*Z.size)/Z.tex[1]],gt=O(V(Q(X),Q(0))),_t=O(I(gt,q)),$={pos:mt,rest:Math.hypot(...V(mt,G[0].p)),anchor:ht,wide:Math.max(ht[0],1-ht[0]),right:_t,up:I(_t,gt)};function vt(e){return Math.min(Z.w,.43*$.rest*e/(Y*$.wide))}function yt(e,t){let n=Math.max(320,Math.round(Y*e*t/$.rest));return[n,Math.round(n/4)]}function bt([e,t]){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.width/pt,i=Math.max(8,Math.round(Z.size*r)),a=Math.max(5,Math.round(Z.roleSize*r)),o=Math.round(Z.gap*r),s=Math.round(Z.nameY*r),c=Math.round(Z.roleY*r),l=Math.round((n.width-(Z.name.join(``).length*i+o))/2),u=n.getContext(`2d`);u.textBaseline=`middle`;let d=(e,t,n,r)=>{u.font=`${t}px ${Z.font}`;let i=Math.max(1,Math.round(t/8));u.fillStyle=Z.edge;for(let t=-i;t<=i;t++)for(let a=-i;a<=i;a++)u.fillText(e,n+t,r+a);u.fillStyle=Z.ink,u.fillText(e,n,r)},[f,p]=Z.name;d(f,i,l,s),d(p,i,l+f.length*i+o,s);let m=Z.name.join(``).length*i+o;return d(Z.role,a,Math.round(l+m/2-Z.role.length*a/2),c),n}var xt=[`uCamPos`,`uRight`,`uUp`,`uFwd`,`uTPos`,`uTRight`,`uTUp`,`uAnchor`,`uSnap`,`uFocal`,`uAspect`,`uTW`,`uTH`,`uFade`],St=(e,t)=>Math.round(e*t/2)*2/t-e;function Ct(e){let t=M(e,dt,ft),n=R(e,t,xt),r=e.getAttribLocation(t,`aUV`),i=F(e,P),a=e.createTexture(),o=Z.w,s=null;function c(){s&&(e.bindTexture(e.TEXTURE_2D,a),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,bt(s)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE))}function l(e){o=vt(e.width/e.height);let t=yt(o,e.height);s&&t[0]===s[0]||(s=t,c())}function u(c,l){let u=V($.pos,c.eye),d=N(u,c.fwd),f=C(x((d-Ce.near)/Ce.span));if(f<=.01)return;let p=l.width/l.height;e.useProgram(t),L(e,i,r,2),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a),e.uniform3fv(n.uCamPos,c.eye),e.uniform3fv(n.uRight,c.right),e.uniform3fv(n.uUp,c.up),e.uniform3fv(n.uFwd,c.fwd),e.uniform3fv(n.uTPos,$.pos),e.uniform3fv(n.uTRight,$.right),e.uniform3fv(n.uTUp,$.up),e.uniform2fv(n.uAnchor,$.anchor),e.uniform1f(n.uFocal,Y),e.uniform1f(n.uAspect,p),e.uniform1f(n.uTW,o),e.uniform1f(n.uTH,o*s[1]/s[0]),e.uniform1f(n.uFade,f),e.uniform2f(n.uSnap,St(2*Y*N(u,c.right)/d/p,l.width),St(2*Y*N(u,c.up)/d,l.height)),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.drawArrays(e.TRIANGLES,0,6)}function d(){e.deleteBuffer(i),e.deleteTexture(a),e.deleteProgram(t)}return{resize:l,upload:c,draw:u,release:d}}var wt=Symbol(`stale build`),Tt=()=>new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(e)));function Et(e,{bootWeights:n={frame:1},build:r,frame:a,resize:c,release:l,cellPx:u}){let d=Object.keys(n),f=i(!0),p=i(!0),m=i(0),g=i(n[d[0]]),_={width:0,height:0},y=null,b=null,x=0,S=!1,C=!0,w=0,ne=0,D=0,O=0,k=0,A=null,j={start:0,frames:0};function M(){let e=window.devicePixelRatio||1,t=Math.round(window.innerWidth*e),n=Math.round(window.innerHeight*e),r=u?.(),i=Math.round(r?r*e:n/560),a=Math.max(2,i+D);_.width=Math.max(160,Math.ceil(t/a)),_.height=Math.max(120,Math.ceil(n/a)),y.width=_.width,y.height=_.height,y.style.width=`${_.width*a/e}px`,y.style.height=`${_.height*a/e}px`,y.style.left=`${-Math.floor((_.width*a-t)/2)/e}px`,y.style.top=`${-Math.floor((_.height*a-n)/2)/e}px`,b.viewport(0,0,_.width,_.height),c?.(_)}function ae(e){let t=k?Math.min(E,(e-k)/1e3):re;return k=e,a(t,e)}function N(e){if(!ae(e)){j.start=0,++O<30?w=requestAnimationFrame(N):F();return}if(O=0,w=requestAnimationFrame(N),!j.start){j.start=e,j.frames=0;return}if(++j.frames<45)return;let t=(e-j.start)/45;if(j.start=0,t>30&&D<2)D++;else if(t<20&&D>0)D--;else return;M()}function P(){S&&C&&!p.value&&!w&&(w=requestAnimationFrame(N))}function F(){cancelAnimationFrame(w),w=0,k=0,j.start=0}function I(e){let t=0;return async r=>{if(p.value){t+=n[r],m.value=t;let e=n[d[d.indexOf(r)+1]]??0;g.value=Math.min(1,t+e)}if(await Tt(),e!==x||b.isContextLost())throw wt}}async function L(){let e=++x,t=I(e);try{if(await Tt(),e!==x)return;await r(b,t),S=!0,M(),ae(performance.now()),b.readPixels(0,0,1,1,b.RGBA,b.UNSIGNED_BYTE,new Uint8Array(4)),await t(d[d.length-1])}catch(t){if(t===wt||e!==x||b.isContextLost())return;console.error(t),W();return}p.value=!1,P()}function R(e){e.preventDefault(),x++,S=!1,F(),p.value&&(ne=setTimeout(W,te))}function oe(){clearTimeout(ne),L()}function z(){B(),H()}function B(){A?.removeEventListener(`change`,z),A=window.matchMedia(ee(window.devicePixelRatio||1)),A.addEventListener(`change`,z)}function V(){A?.removeEventListener(`change`,z),A=null}function H(){S&&(M(),P())}function U(){x++,S=!1,F(),V(),y?.removeEventListener(`webglcontextlost`,R),y?.removeEventListener(`webglcontextrestored`,oe),clearTimeout(ne),b&&=(l?.(b),ie(b),null)}function W(){f.value=!1,p.value=!1,U()}return v(`resize`,H),s(()=>{if(y=e.value,b=y?.getContext(`webgl`,T),!b){W();return}y.addEventListener(`webglcontextlost`,R),y.addEventListener(`webglcontextrestored`,oe),B(),L()}),h(()=>{C=!1,F(),V()}),o(()=>{C||(C=!0,b&&(B(),H(),P()))}),t(U),{supported:f,booting:p,bootProgress:m,bootCeiling:g,grid:_,wake:P,refit:H}}function Dt(){return document.fonts?Promise.race([document.fonts.load(`${Z.size}px ${Z.font}`).catch(()=>{}),new Promise(e=>setTimeout(e,Ae))]):Promise.resolve()}function Ot(){let e=document.documentElement.scrollHeight-window.innerHeight;return x(e>0?window.scrollY/e:0)}function kt(e){let t=i(je[0][1]),n=i(0),r=i(1),a=i(0),o=i(!1),s=y(),c=null,l=null,u=-1,d=qe(),f={x:0,y:0,tx:0,ty:0};async function p(e,t){let n=it(e);await t(`context`);let r=at(e,n);await t(`scene`);let i=ut(e),a=Ct(e);c={scene:r,dust:i,title:a},await t(`programs`),await Dt(),await t(`typeface`),document.fonts?.ready.then(()=>{c?.title!==a||e.isContextLost()||(a.upload(),u=-1,T())}).catch(()=>{})}function m(e){let t=Ot();l===null&&(l=t),l=S(l,t,e,ne),Math.abs(t-l)<4e-5&&(l=t);let n=l;f.x+=(f.tx-f.x)*ye,f.y+=(f.ty-f.y)*ye;let r=Math.abs(f.tx-f.x)>8e-4||Math.abs(f.ty-f.y)>8e-4||!d.settled;if(Math.abs(n-u)<2e-5&&!r)return!1;u=n;let i=Ye(n,f.x,f.y,s,d,e);return c.scene.draw(i,n,f.x,f.y,w),c.title.draw(i,w),c.dust.draw(i,w),h(n,i.wake),!0}function h(e,i){r.value=x(1-e/Me),n.value=i;let s=Math.round(e*10),c=`${`=`.repeat(s)}${`-`.repeat(10-s)}`,l=String(Math.round(e*100)).padStart(3);t.value=`${je.find(t=>e<t[0])[1]}  [${c}] ${l}%`,o.value=e>Ne,a.value=x((e-Pe)/Fe)}let{supported:g,booting:_,bootProgress:b,bootCeiling:C,grid:w,wake:T}=Et(e,{bootWeights:ke,build:p,frame:m,resize(e){c.title.resize(e),u=-1},release(){for(let e of Object.values(c??{}))e.release();c=null}});return v(`scroll`,T),s||v(`pointermove`,e=>{e.pointerType===`mouse`&&(f.tx=e.clientX/window.innerWidth*2-1,f.ty=e.clientY/window.innerHeight*2-1,T())}),{supported:g,booting:_,bootProgress:b,bootCeiling:C,leg:t,wake:n,hint:r,arrive:a,markOn:o}}var At={class:`chrome`},jt=[`inert`],Mt=w({__name:`LabChrome`,props:{markOn:{type:Boolean,required:!0},leg:{type:String,required:!0},wake:{type:Number,required:!0}},setup(t){let n=t,i=l(()=>({opacity:n.wake})),a=()=>window.scrollTo(0,document.documentElement.scrollHeight),o=()=>window.scrollTo(0,0);return(n,s)=>(r(),u(f,null,[p(`div`,At,[p(`button`,{class:_([`chrome__mark`,{on:t.markOn}]),inert:!t.markOn,type:`button`,onClick:o},` Karl Querel `,10,jt),p(`button`,{class:`chrome__link`,type:`button`,onClick:a},`CONTACT`)]),p(`p`,{class:`hud`,style:e(i.value),"aria-hidden":`true`},c(t.leg),5)],64))}},[[`__scopeId`,`data-v-fdb2d3a3`]]),Nt=[`inert`],Pt={class:`portals`},Ft=[`href`,`target`,`rel`],It=w({__name:`LabContact`,props:{landed:{type:Number,required:!0}},setup(t){let i=t,o=l(()=>({opacity:i.landed})),s=e=>i.landed>Ie.portalStart+e*Ie.portalStagger;return(i,l)=>(r(),u(`div`,{class:`end`,style:e(o.value),inert:t.landed<=a(Ie).interactive},[p(`h2`,null,[m(c(a(z).lead),1),p(`em`,null,c(a(z).accent),1)]),p(`div`,Pt,[(r(!0),u(f,null,n(a(ae),(e,t)=>(r(),u(`a`,{key:e.key,class:_([`portal`,{on:s(t)}]),href:e.href,target:e.blank?`_blank`:null,rel:e.blank?`noopener`:null},c(e.label),11,Ft))),128))])],12,Nt))}},[[`__scopeId`,`data-v-e6a6ca56`]]),Lt=[{key:`still`},{key:`work`,kicker:`01 · RING PASS`,lead:`How I got `,accent:`here`,lines:[`Traded gold, oil, and petrochemicals across EMEA.`,`Rebooted from scratch. Deep dive into C and Unix.`,`Building the software behind EV charging and renewable energy.`]},{key:`life`,kicker:`02 · CLOSE PASS`,lead:`Off the `,accent:`clock`,lines:[`I come from a multicultural background.`,`I have been moving around ever since. The countries changed, but what I do with my free time didn’t.`]},{key:`entry`}],Rt=`Karl Querel — Software Engineer`,zt={class:`doc`},Bt={key:0,class:`sr-only`},Vt={key:1,class:`card`},Ht={class:`kicker`},Ut=w({__name:`LabPage`,setup(t){let o=i(null),{supported:s,booting:h,bootProgress:v,bootCeiling:y,leg:b,wake:x,hint:S,arrive:C,markOn:w}=kt(o),T=l(()=>s.value?C.value:1),ee=l(()=>({opacity:s.value?S.value:0}));return(t,i)=>(r(),u(`div`,{class:_([`flyby`,{"flyby--flat":!a(s)}])},[p(`canvas`,{ref_key:`canvas`,ref:o,class:`flyby__canvas`,"aria-hidden":`true`},null,512),g(D,{progress:a(v),ceiling:a(y),done:!a(h)},null,8,[`progress`,`ceiling`,`done`]),g(Mt,{"mark-on":a(w),leg:a(b),wake:a(x)},null,8,[`mark-on`,`leg`,`wake`]),p(`div`,zt,[(r(!0),u(f,null,n(a(Lt),e=>(r(),u(`section`,{key:e.key,class:_([`beat`,`beat--${e.key}`])},[e.key===`still`?(r(),u(`h1`,Bt,c(a(Rt)),1)):d(``,!0),e.lines?(r(),u(`div`,Vt,[p(`p`,Ht,c(e.kicker),1),p(`h2`,null,[m(c(e.lead),1),p(`em`,null,c(e.accent),1)]),(r(!0),u(f,null,n(e.lines,e=>(r(),u(`p`,{key:e},c(e),1))),128))])):d(``,!0)],2))),128))]),p(`p`,{class:`hint`,style:e(ee.value),"aria-hidden":`true`},`▼`,4),g(It,{landed:T.value},null,8,[`landed`])],2))}},[[`__scopeId`,`data-v-e684aa51`]]);export{Ut as default};
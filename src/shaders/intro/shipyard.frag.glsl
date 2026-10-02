// The orbital yard at L4: the ten Hermes ships docked along one truss that ends in a lit terminus,
// finished under the red sun, Earth's limb below. Each hull carries its number; one is still caged
// in scaffolding.
// uP = camera xyz, reveal. uQ = look yaw, look pitch, the path's own yaw, the bank. uH.x = the
// closing climb's tilt (this shot has no hands).

// --- the palette, by name (constants/palette.js)
const vec3 GRAPHITE = vec3( 58, 64, 78)/255.0;
const vec3 GUN      = vec3( 88, 96,112)/255.0;
const vec3 PEWTER   = vec3(140,148,162)/255.0;
const vec3 BRUSHED  = vec3(158,166,180)/255.0;
const vec3 SILVER   = vec3(200,206,216)/255.0;
const vec3 PITCH    = vec3( 13, 15, 22)/255.0;
const vec3 IRON     = vec3( 24, 29, 42)/255.0;
const vec3 STEEL    = vec3( 31, 38, 53)/255.0;
const vec3 ZINC     = vec3( 40, 48, 66)/255.0;
const vec3 FROST    = vec3( 66, 79,102)/255.0;
const vec3 RIME     = vec3( 96,112,140)/255.0;
const vec3 RUST     = vec3( 84, 46, 44)/255.0;
const vec3 OCHRE    = vec3(124, 60, 48)/255.0;
const vec3 CLAY     = vec3(158, 76, 54)/255.0;
const vec3 AMBER    = vec3(190,108, 70)/255.0;
const vec3 DUNE     = vec3(202,130, 87)/255.0;
const vec3 STONE    = vec3(110, 94, 90)/255.0;
const vec3 BONE     = vec3(150,132,124)/255.0;
const vec3 CHALK    = vec3(188,170,158)/255.0;
const vec3 HAZE     = vec3(172,120,104)/255.0;
const vec3 EMBER    = vec3(255,189, 46)/255.0;
const vec3 GLOW     = vec3(255,231,196)/255.0;
const vec3 INK      = vec3( 22, 17, 30)/255.0;

// the dying sun: off frame right and a little beyond the ships, so every edge facing it is a rim
const vec3 SUN = vec3(0.821, 0.451, -0.350);
const vec3 SUNLIGHT = vec3(1.0, 0.62, 0.44);
const float FOCAL = 1.92;

// the yard: ships every SPACING along -z, docked at SHIP_X beside the truss at x = 0
// SHIPS is the fleet, INTRO_BOARD.ships in data/gameIntro.js: keep the two in step
const float SPACING = 9.0;
const float SHIP_X = 2.3;
const float SHIPS = 10.0;
const float MAX_T = 170.0;
// where the truss ends, a little past the last cradle, and the ship still in its scaffold
const float TRUSS_END = -(SHIPS - 1.0)*SPACING - 5.0;
const float SCAFFOLD = 3.0;
// the hull numbers: a 3x5 digit font, digit d lit at bit row*3 + col
const float DIGIT0 = 31599.0, DIGIT1 = 29850.0, DIGIT2 = 29671.0, DIGIT3 = 31207.0, DIGIT4 = 18925.0;
const float DIGIT5 = 31183.0, DIGIT6 = 31695.0, DIGIT7 = 18727.0, DIGIT8 = 31727.0, DIGIT9 = 31215.0;

// Earth under the yard: a big sphere far below, so only its limb and a band of ground show
const vec3 EARTH_C = vec3(-6.0, -101.0, -28.0);
const float EARTH_R = 90.0;

float mat;

float sdCapZ(vec3 p, float z0, float z1, float r){
  return length(vec3(p.xy, p.z - clamp(p.z, z0, z1))) - r;
}
float sdSeg3(vec3 p, vec3 a, vec3 b, float r){
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
  return length(pa - ba*h) - r;
}

// the truss: four chords, a frame and a diagonal on every face each bay, from the near end to the cap
float truss(vec3 p){
  float z0 = 12.0;
  float bound = sdBox3(p - vec3(0.0, 0.0, (z0 + TRUSS_END)*0.5), vec3(0.42, 0.42, (z0 - TRUSS_END)*0.5));
  if (bound > 0.3) return bound;
  vec2 c = abs(p.xy) - 0.3;
  float d = max(abs(c.x), abs(c.y)) - 0.045;
  float pz = mod(p.z, 0.9) - 0.45;
  float frame = max(abs(pz) - 0.035, abs(max(abs(p.x), abs(p.y)) - 0.3) - 0.035);
  float fx = max(abs(abs(p.x) - 0.3) - 0.022, sdSeg(vec2(p.y, pz), vec2(-0.3, -0.45), vec2(0.3, 0.45), 0.022));
  float fy = max(abs(abs(p.y) - 0.3) - 0.022, sdSeg(vec2(p.x, pz), vec2(-0.3, 0.45), vec2(0.3, -0.45), 0.022));
  return max(min(min(d, frame), min(fx, fy)), bound);
}

// One ship in its own frame, nose toward -z. `v` varies it: some carry the ring, dishes differ.
// `caged` wraps it in the scaffold of a ship not yet signed off.
float ship(vec3 q, float v, bool caged, out float m){
  float bound = sdBox3(q, vec3(1.05, 1.15, 3.1));
  m = 1.0;
  if (bound > 0.4) return bound;
  float hull = sdCapZ(q, -2.05, 1.8, 0.3);
  float spine = sdBox3(q - vec3(0.0, 0.31, -0.3), vec3(0.11, 0.05, 1.5));
  float d = min(hull, spine);
  // gold-foil wrapped tanks amidships
  float tanks = sdCapZ(vec3(abs(q.x) - 0.3, q.y + 0.12, q.z - 1.0), -0.5, 0.5, 0.15);
  if (tanks < d){ d = tanks; m = 3.0; }
  // the ring: the envoy's cryo section, spun on a hub
  float ring = sdBox(vec2(length(q.xy) - 0.78, q.z + 0.35), vec2(0.05, 0.1));
  float spokes = min(sdBox3(q - vec3(0.0, 0.0, -0.35), vec3(0.78, 0.035, 0.035)),
                     sdBox3(q - vec3(0.0, 0.0, -0.35), vec3(0.035, 0.78, 0.035)));
  float rd = min(ring, spokes);
  if (v > 0.35 && rd < d){ d = rd; m = 7.0; }
  // radiators: thin fins off both flanks
  float fins = sdBox3(vec3(abs(q.x) - 0.72, q.y, q.z - 0.55), vec3(0.4, 0.012, 0.22));
  if (fins < d){ d = fins; m = 4.0; }
  // engine block and three bells flaring aft
  float block = sdBox3(q - vec3(0.0, 0.0, 1.95), vec3(0.26, 0.26, 0.18));
  if (block < d){ d = block; m = 2.0; }
  vec3 e = q - vec3(0.0, 0.0, 2.15);
  vec2 bx = vec2(abs(e.x) - 0.15, e.y + 0.08);
  float bz = clamp(e.z/0.55, 0.0, 1.0);
  float bell = max(min(length(bx), length(vec2(e.x, e.y - 0.16))) - mix(0.07, 0.14, bz), abs(e.z - 0.27) - 0.27)*0.8;
  if (bell < d){ d = bell; m = 2.0; }
  // the transmitter: a mast and a dish looking home, the one thing this ship exists to use
  vec3 D = vec3(0.0, 0.82, -1.25);
  float mast = sdSeg3(q, vec3(0.0, 0.3, -1.25), D, 0.035);
  vec3 nd = normalize(vec3(0.35 + v*0.4, 0.8, 0.3 - v*0.5));
  vec3 w = q - D;
  float a = dot(w, nd);
  float r = length(w - nd*a);
  float dish = max(abs(a - r*r*0.75) - 0.018, r - 0.44)*0.7;
  float horn = sdSeg3(q, D, D + nd*0.34, 0.016);
  float ant = min(min(mast, horn), dish);
  if (ant < d){ d = ant; m = 5.0; }
  // the cradle: two arms back to the truss and a clamp round the hull
  vec3 cz = vec3(q.x, q.y, abs(q.z - 0.1) - 1.35);
  float arm = sdBox3(cz - vec3(-1.3, 0.0, 0.0), vec3(1.0, 0.05, 0.05));
  float clamp1 = max(max(abs(length(cz.xy) - 0.36) - 0.035, abs(cz.z) - 0.06), cz.x - 0.15);
  float cr = min(arm, clamp1);
  if (cr < d){ d = cr; m = 0.0; }
  if (caged){
    // four rails down the corners of a box round the hull, a hoop every half unit
    vec3 c = vec3(abs(q.x) - 0.62, abs(q.y) - 0.62, q.z);
    float rails = length(c.xy) - 0.028;
    float hoopZ = mod(q.z, 0.5) - 0.25;
    float hoop = max(abs(hoopZ) - 0.022, abs(max(abs(q.x), abs(q.y)) - 0.62) - 0.022);
    float cage = max(min(rails, hoop), abs(q.z + 0.2) - 1.9);
    if (cage < d){ d = cage; m = 0.0; }
  }
  return d;
}

// the truss's end: a docking node and a beacon mast, so the line stops rather than fading out
float terminus(vec3 p){
  vec3 q = p - vec3(0.0, 0.0, TRUSS_END);
  float node = sdBox3(q, vec3(0.62, 0.62, 0.42));
  float mast = sdSeg3(q, vec3(0.0, 0.62, 0.0), vec3(0.0, 1.5, 0.0), 0.05);
  return min(node, mast);
}

float digitBits(float d){
  return d < 0.5 ? DIGIT0 : d < 1.5 ? DIGIT1 : d < 2.5 ? DIGIT2 : d < 3.5 ? DIGIT3 : d < 4.5 ? DIGIT4
       : d < 5.5 ? DIGIT5 : d < 6.5 ? DIGIT6 : d < 7.5 ? DIGIT7 : d < 8.5 ? DIGIT8 : DIGIT9;
}
// Ship k's number (01..10) stencilled on the flank that faces the yard's camera side: `u` runs
// along the hull toward the nose, `v` up it, both in hull units. 1 where paint is.
float hullNumber(float k, float u, float v){
  const float CELL = 0.075;
  vec2 g = floor(vec2(u, v)/CELL);
  if (g.y < 0.0 || g.y > 4.0 || g.x < 0.0 || g.x > 6.0 || abs(g.x - 3.0) < 0.5) return 0.0;
  float n = k + 1.0;
  float digit = g.x < 3.0 ? floor(n/10.0) : mod(n, 10.0);
  float col = g.x < 3.0 ? g.x : g.x - 4.0;
  float bit = (4.0 - g.y)*3.0 + col;
  return mod(floor(digitBits(digit)/exp2(bit)), 2.0);
}

// three tugs working the near docks, drifting on slow loops
vec3 tugAt(float i){
  float t = uTime*(0.22 + i*0.05) + i*2.1;
  return vec3(1.1 + 1.6*sin(t), 0.9 + 0.35*i + 0.2*sin(t*1.7), -2.5 - i*6.0 + 1.4*cos(t));
}

float scene(vec3 p){
  float d = truss(p);
  mat = 0.0;
  vec3 q = p - vec3(SHIP_X, 0.0, 0.0);
  float k = clamp(floor(-q.z/SPACING + 0.5), 0.0, SHIPS - 1.0);
  q.z += k*SPACING;
  float m;
  float s = ship(q, hash11(k*7.3 + 1.0), abs(k - SCAFFOLD) < 0.5, m);
  if (s < d){ d = s; mat = m; }
  float tm = terminus(p);
  if (tm < d){ d = tm; mat = 0.0; }
  for (int i = 0; i < 3; i++){
    float t = sdBox3(p - tugAt(float(i)), vec3(0.09, 0.06, 0.12));
    if (t < d){ d = t; mat = 6.0; }
  }
  return d;
}

vec3 normalAt(vec3 p, float t){
  vec2 e = vec2(1.0, -1.0)*(0.0012*t + 0.0015);
  return normalize(e.xyy*scene(p + e.xyy) + e.yyx*scene(p + e.yyx) +
                   e.yxy*scene(p + e.yxy) + e.xxx*scene(p + e.xxx));
}

float shadowAt(vec3 p){
  float s = 1.0, t = 0.03;
  for (int i = 0; i < 20; i++){
    float h = scene(p + SUN*t);
    s = min(s, 10.0*h/t);
    t += clamp(h, 0.03, 0.5);
    if (s < 0.02 || t > 7.0) break;
  }
  return clamp(s, 0.0, 1.0);
}

// Earth from the earth shot, seen close: its elevation and bands at a finer scale
float elev(vec3 sp){
  float e = fbm(sp*5.5 + 3.7);
  e += (ridged(sp*19.0 + 4.8) - 0.5)*0.11;
  e += (fbm3(sp*44.0 + 3.7) - 0.5)*0.045;
  return e;
}
vec3 ground(float e, float sea, float dust){
  vec3 col = mix(STEEL, ZINC, smoothstep(sea-0.18, sea-0.07, e));
  col = mix(col, FROST, smoothstep(sea-0.06, sea-0.015, e));
  col = mix(col, RIME, smoothstep(sea-0.015, sea, e));
  col = mix(col, DUNE, smoothstep(sea-0.006, sea+0.006, e));
  col = mix(col, mix(RUST, OCHRE, dust), smoothstep(sea+0.008, sea+0.03, e));
  col = mix(col, CLAY, smoothstep(sea+0.07, sea+0.12, e));
  col = mix(col, STONE, smoothstep(sea+0.13, sea+0.17, e));
  col = mix(col, BONE, smoothstep(sea+0.18, sea+0.22, e));
  return col;
}

vec3 earth(vec3 ro, vec3 rd, out float hitT){
  hitT = 1e9;
  vec3 oc = ro - EARTH_C;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - EARTH_R*EARTH_R;
  float h = b*b - c;
  // closest approach, for the air past the limb
  float closest = sqrt(max(dot(oc, oc) - b*b, 0.0));
  if (h < 0.0 || -b - sqrt(h) < 0.0){
    float up = (closest - EARTH_R)/(EARTH_R*0.035);
    if (up > 1.0 || b > 0.0) return vec3(-1.0);
    vec3 cp = normalize(ro + rd*(-b) - EARTH_C);
    float lit = clamp(dot(cp, SUN)*1.4 + 0.35, 0.0, 1.0);
    return vec3(-2.0, pow(1.0 - up, 1.5)*(0.2 + 0.8*lit), lit);
  }
  hitT = -b - sqrt(h);
  vec3 n = normalize(ro + rd*hitT - EARTH_C);
  float spin = uTime*0.004;
  vec3 sp = vec3(n.x*cos(spin) + n.z*sin(spin), n.y, -n.x*sin(spin) + n.z*cos(spin));
  const float SEA = 0.5;
  float e = elev(sp);
  float land = smoothstep(SEA - 0.004, SEA + 0.004, e);
  vec3 base = ground(e, SEA, smoothstep(0.42, 0.62, fbm3(sp*9.0 + 11.0)));
  float cloud = smoothstep(0.47, 0.57, fbm3(sp*vec3(9.0, 24.0, 9.0) + 4.1 + uTime*0.003)*0.65 + fbm3(sp*40.0)*0.35)*0.9;
  // relief from the elevation gradient, so ranges throw shadow and coasts read as edges
  vec3 t1 = normalize(cross(n, vec3(0.0, 0.0, 1.0)));
  vec3 t2 = cross(n, t1);
  float hh = 0.0015;
  vec3 nr = normalize(n - (t1*(elev(sp + t1*hh) - e) + t2*(elev(sp + t2*hh) - e))*(1.0/hh)*0.004*land);
  float ndl = dot(n, SUN);
  float day = max(dot(nr, SUN), 0.0);
  base = mix(base, CHALK, cloud);
  vec3 col = base*(0.04 + 1.25*pow(day, 0.7))*SUNLIGHT;
  // the sun's mirror in open water: what makes a sea read as a sea from orbit
  vec3 hv = normalize(SUN - rd);
  col += SUNLIGHT*pow(max(dot(n, hv), 0.0), 70.0)*(1.0 - land)*(1.0 - cloud)*0.9;
  // the night side: what is left of the cities, still burning
  float night = smoothstep(0.06, -0.08, ndl);
  col += INK*0.4*night;
  vec3 cellp = floor(sp*260.0);
  float city = step(0.9, hash13(cellp + 3.0))*smoothstep(0.52, 0.64, fbm3(sp*18.0 + 21.0))*land*(1.0 - cloud*0.7);
  col += EMBER*city*night*(0.45 + 0.55*hash13(cellp + 7.0));
  // air along the limb, warm where the terminator crosses it
  float rim = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
  float term = smoothstep(0.3, 0.0, abs(ndl));
  col += mix(HAZE*0.5, vec3(1.0, 0.5, 0.3), term)*rim*0.4*(0.12 + 0.88*day);
  return col;
}

// a work light: one art pixel, drawn if it sits in front of whatever the ray found
float focal;
float dotAt(vec3 P, vec3 ro, vec3 right, vec3 up, vec3 fwd, vec2 uv, float depth){
  vec3 rel = P - ro;
  float z = dot(rel, fwd);
  if (z < 0.2 || length(rel) > depth + 0.06) return 0.0;
  vec2 s = focal*vec2(dot(rel, right), dot(rel, up))/z;
  float px = length((s - uv)*uRes.y);
  return smoothstep(1.2, 0.4, px) + 0.22*smoothstep(3.2, 0.8, px);
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frameUV(frag);
  vec3 ro = uP.xyz;

  // the head: down the line of ships, turned a little by the pointer
  // portrait: turn toward the line's vanishing point and lift the head off the planet
  float narrow = 1.0 - clamp((uRes.x/uRes.y - 0.5)/0.8, 0.0, 1.0);
  float yaw = mix(-0.30, -0.10, narrow) + uQ.z - uLook.x*uQ.x;
  float pitch = mix(-0.15, -0.04, narrow) + uH.x - uLook.y*uQ.y;
  vec3 fwd = normalize(vec3(sin(yaw)*cos(pitch), sin(pitch), -cos(yaw)*cos(pitch)));
  vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, fwd);
  // the bank: the head rolls into the pass and back out of it
  float cr = cos(uQ.w), sr = sin(uQ.w);
  vec3 r0 = right;
  right = r0*cr + up*sr;
  up = up*cr - r0*sr;
  // a portrait frame widens the lens rather than cropping the yard to one ship
  focal = FOCAL*clamp(uRes.x/uRes.y*1.15, 0.62, 1.0);
  vec3 rd = normalize(uv.x*right + uv.y*up + focal*fwd);

  // behind everything: stars, then Earth and its air
  vec3 col = stars(rd)*0.75;
  float earthT;
  vec3 e = earth(ro, rd, earthT);
  if (e.x == -2.0) col = mix(col, mix(RUST*0.8, HAZE, e.z), e.y);
  else if (e.x >= 0.0) col = e;

  // the yard: march only where the ray crosses its box
  vec3 bmin = vec3(-0.8, -1.3, TRUSS_END - 1.0), bmax = vec3(3.6, 2.0, 12.0);
  vec3 inv = 1.0/rd;
  vec3 t0 = (bmin - ro)*inv, t1 = (bmax - ro)*inv;
  vec3 tn = min(t0, t1), tf = max(t0, t1);
  float tNear = max(max(tn.x, tn.y), max(tn.z, 0.0));
  float tFar = min(min(tf.x, tf.y), min(tf.z, MAX_T));
  float hitT = 1e9;
  if (tNear < tFar){
    float t = tNear;
    for (int i = 0; i < 110; i++){
      vec3 p = ro + rd*t;
      float d = scene(p);
      if (d < 0.0012*t){ hitT = t; break; }
      t += d*0.9;
      if (t > tFar) break;
    }
  }

  if (hitT < 1e8){
    vec3 p = ro + rd*hitT;
    float m = mat;
    vec3 n = normalAt(p, hitT);
    // panels: brushed steel plates with dark seams, foil in amber, dish and fins bright
    vec3 base = mix(GUN, BRUSHED, step(0.45, hash13(floor(p*vec3(3.0, 3.0, 1.6)))));
    if (m < 0.5) base = mix(GRAPHITE, PEWTER, 0.35 + 0.3*hash13(floor(p*4.0)));
    else if (m < 1.5){
      base = mix(PEWTER, SILVER, step(0.55, hash13(floor(p*vec3(5.0, 5.0, 2.2)))));
      // seams between the hull plates
      vec3 g = fract(p*vec3(5.0, 5.0, 2.2));
      base *= 1.0 - 0.3*step(0.93, max(g.x, g.z));
      // the hull number, forward on the flank toward the camera: the yard reads 01 to 10
      vec3 hq = p - vec3(SHIP_X, 0.0, 0.0);
      float hk = clamp(floor(-hq.z/SPACING + 0.5), 0.0, SHIPS - 1.0);
      hq.z += hk*SPACING;
      if (hq.x > 0.12) base = mix(base, CLAY*0.95, hullNumber(hk, -hq.z - 1.02, hq.y + 0.19));
    }
    else if (m < 2.5) base = GRAPHITE*0.9;
    else if (m < 3.5) base = mix(OCHRE, AMBER, fbm3(p*18.0));
    else if (m < 4.5) base = mix(STEEL, FROST, 0.5);
    else if (m < 5.5) base = SILVER;
    else if (m < 6.5) base = mix(GUN, CHALK, 0.4);
    else base = mix(PEWTER, BRUSHED, step(0.5, fract(atan(p.y, p.x - SHIP_X)*3.8)));

    float ndl = max(dot(n, SUN), 0.0);
    float sh = ndl > 0.0 ? shadowAt(p + n*0.01) : 0.0;
    // earthshine from below, and a little sky
    // shadows in vacuum go nearly black: a warm bounce off Earth below, a cold whisper from space
    vec3 amb = vec3(0.26, 0.15, 0.12)*max(-n.y, 0.0)*0.35 + vec3(0.035, 0.05, 0.085);
    vec3 lit = base*(amb + SUNLIGHT*ndl*sh*1.15);
    // the rim: every edge turned toward the sun catches it
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0)*smoothstep(-0.15, 0.35, dot(n, SUN));
    lit += SUNLIGHT*rim*0.55*(0.4 + 0.6*sh);
    // sun glints off the dishes
    vec3 hv = normalize(SUN - rd);
    lit += SUNLIGHT*pow(max(dot(n, hv), 0.0), 60.0)*sh*(m > 4.5 && m < 5.5 ? 1.2 : 0.35);
    // distance falls into the void, like the lab's farOff
    float haze = smoothstep(18.0, 150.0, hitT)*0.92;
    col = mix(lit, mix(IRON, RUST*0.5, 0.3), haze);
  }

  float depth = min(hitT, earthT);
  // Work lights: four on each of the near ships, one on every ship down the line.
  float step2 = floor(uTime*2.0);
  vec3 lights = vec3(0.0);
  for (int k = 0; k < 4; k++){
    float fk = float(k);
    vec3 c = vec3(SHIP_X, 0.0, -fk*SPACING);
    for (int j = 0; j < 4; j++){
      float fj = float(j);
      vec3 off = j == 0 ? vec3(0.0, 0.38, -2.0) : j == 1 ? vec3(0.0, 0.88, -1.25)
               : j == 2 ? vec3(0.9, 0.0, -0.35) : vec3(-0.9, 0.06, 1.45);
      float on = step(0.3, hash11(step2*0.13 + fk*3.1 + fj*1.7));
      vec3 tint = j == 1 ? vec3(1.0, 0.25, 0.2) : EMBER;
      lights += tint*on*dotAt(c + off, ro, right, up, fwd, uv, depth);
    }
  }
  // the far ships: a mast light and a nav light each, all the way to the last one
  for (int k = 4; k < 10; k++){
    float fk = float(k);
    vec3 c = vec3(SHIP_X, 0.88, -fk*SPACING - 1.25);
    float on = step(0.25, hash11(floor(uTime*1.5 + fk*0.37)*0.11 + fk));
    lights += mix(EMBER, GLOW, hash11(fk))*on*dotAt(c, ro, right, up, fwd, uv, depth);
    lights += vec3(1.0, 0.25, 0.2)*0.7*dotAt(c + vec3(0.9, -0.88, 0.9), ro, right, up, fwd, uv, depth);
  }
  // the terminus beacon: a slow red pulse on two steps, where the yard ends
  float beacon = step(0.5, fract(uTime*0.7));
  lights += vec3(1.0, 0.22, 0.16)*1.4*beacon*dotAt(vec3(0.0, 1.55, TRUSS_END), ro, right, up, fwd, uv, depth);
  // welding on the near docks: a white-hot core flickering on its own clock, sparks thrown off it
  for (int k = 0; k < 3; k++){
    float fk = float(k);
    vec3 w = vec3(SHIP_X + 0.32, 0.1 - fk*0.12, -fk*SPACING + 0.4 - fk*0.9);
    float wstep = floor(uTime*9.0 + fk*5.0);
    float on = step(0.35, hash11(wstep*0.07 + fk));
    lights += GLOW*1.6*on*dotAt(w, ro, right, up, fwd, uv, depth);
    for (int s = 0; s < 5; s++){
      float fs = float(s);
      float age = fract(uTime*1.3 + fs*0.21 + fk*0.4);
      vec3 dir = normalize(vec3(hash11(fs + fk*9.0) - 0.5, hash11(fs*2.0 + fk) - 0.35, hash11(fs*3.0 + fk*5.0) - 0.5));
      vec3 sp = w + dir*age*0.55;
      lights += EMBER*(1.0 - age)*on*dotAt(sp, ro, right, up, fwd, uv, depth);
    }
  }
  // the tugs' thrusters, flicking on in short stepped pulses
  for (int i = 0; i < 3; i++){
    float fi = float(i);
    float on = step(0.55, hash11(floor(uTime*6.0) + fi*13.0));
    lights += vec3(0.6, 0.8, 1.0)*on*dotAt(tugAt(fi) + vec3(0.0, 0.0, 0.14), ro, right, up, fwd, uv, depth);
  }
  col += lights;
  // the sun just off frame right: glare creeping in from that edge
  col += SUNLIGHT*pow(max(dot(rd, SUN), 0.0), 10.0)*0.28;

  gl_FragColor = vec4(finish(col*uP.w, frag), 1.0);
}

// The astronaut's EVA gloves in POV, appended to the shots that show them. vec4 hands(uv): rgb and
// coverage, composited by the shot before finish(). Reads uH (state, item, on, follow), uLook,
// uPtr, uTime. Each glove is a height field of real parts (sleeve, wrist ring, gauntlet, back of
// the hand, fingers, thumb) in a hand space: wrist ring at the origin, y into the scene, the right
// hand seen from behind. Normals come off the height, a cavity term darkens the creases.

const vec3 HD_PITCH = vec3(13.0, 15.0, 22.0)/255.0;
const vec3 HD_IRON = vec3(24.0, 29.0, 42.0)/255.0;
const vec3 HD_STEEL = vec3(31.0, 38.0, 53.0)/255.0;
const vec3 HD_ZINC = vec3(40.0, 48.0, 66.0)/255.0;
const vec3 HD_FROST = vec3(66.0, 79.0, 102.0)/255.0;
const vec3 HD_RIME = vec3(96.0, 112.0, 140.0)/255.0;
const vec3 HD_GRAPHITE = vec3(58.0, 64.0, 78.0)/255.0;
const vec3 HD_GUN = vec3(88.0, 96.0, 112.0)/255.0;
const vec3 HD_PEWTER = vec3(140.0, 148.0, 162.0)/255.0;
const vec3 HD_SILVER = vec3(200.0, 206.0, 216.0)/255.0;
const vec3 HD_STAR = vec3(1.0);
const vec3 HD_ASH = vec3(66.0, 58.0, 68.0)/255.0;
const vec3 HD_STONE = vec3(110.0, 94.0, 90.0)/255.0;
const vec3 HD_BONE = vec3(150.0, 132.0, 124.0)/255.0;
const vec3 HD_CHALK = vec3(188.0, 170.0, 158.0)/255.0;
const vec3 HD_CREAM = vec3(214.0, 200.0, 190.0)/255.0;
const vec3 HD_LINEN = vec3(238.0, 230.0, 216.0)/255.0;
const vec3 HD_RUST = vec3(84.0, 46.0, 44.0)/255.0;
const vec3 HD_GARNET = vec3(104.0, 52.0, 66.0)/255.0;
const vec3 HD_BRICK = vec3(141.0, 68.0, 51.0)/255.0;
const vec3 HD_FLARE = vec3(174.0, 92.0, 62.0)/255.0;
const vec3 HD_EMBER = vec3(255.0, 189.0, 46.0)/255.0;
const vec3 HD_RED = vec3(255.0, 95.0, 86.0)/255.0;

// materials, picked by whichever part stands highest at a point
const float HD_SLEEVE = 0.0;
const float HD_RING = 1.0;
const float HD_GAUNT = 2.0;
const float HD_BACK = 3.0;
const float HD_FINGER = 4.0;
const float HD_CAP = 5.0;
const float HD_STRAP = 6.0;

// the ring of knuckles, where the fingers leave the back of the hand
const float HD_KNUCKLE = 0.128;
// the far lean of the forearms: the gloves come in from the corners toward the middle
const float HD_TILT = 0.30;

// a capsule seen from above: its distance, and the height of its round top
float hdTube(vec2 p, vec2 a, vec2 b, float r, float lift, out float h){
  float ax = sdSeg(p, a, b, 0.0);
  h = lift + sqrt(max(0.0, r*r - ax*ax));
  return ax - r;
}

// keep the higher part: its height and material win
void hdTop(float h, float d, float m, inout float H, inout float M){
  if (d < 0.0 && h > H){ H = h; M = m; }
}

// A finger: knuckle k, a direction, a length, a radius. curl folds it: the first phalanx
// foreshortens as it turns away, the rest drops behind it out of sight.
void hdFinger(float i, float curl, out vec2 k, out vec2 j, out vec2 t, out float r){
  // index, middle, ring, little: x across the back, the lean of each, the reach of each
  float x = -0.039 + i*0.026;
  float lean = i < 0.5 ? -0.13 : i < 1.5 ? -0.035 : i < 2.5 ? 0.06 : 0.18;
  float len = i < 0.5 ? 0.074 : i < 1.5 ? 0.083 : i < 2.5 ? 0.077 : 0.060;
  float lift = i < 0.5 ? 0.003 : i < 1.5 ? 0.006 : i < 2.5 ? 0.002 : -0.009;
  r = i < 0.5 ? 0.0138 : i < 1.5 ? 0.0142 : i < 2.5 ? 0.0134 : 0.0116;
  // a closed hand pulls the fingers together and straight
  lean *= 1.0 - 0.8*curl;
  r *= 1.0 + 0.16*curl;
  vec2 dir = vec2(sin(lean), cos(lean));
  k = vec2(x*(1.0 - 0.08*curl), HD_KNUCKLE + lift*(1.0 + curl));
  j = k + dir*len*0.52*(1.0 - 0.34*curl);
  t = j + mix(dir*len*0.48, vec2(dir.x*0.01, -0.012), curl);
}

// The glove's height field at p: the highest part's height and material, the silhouette
// distance, and the distance down the finger to the nearest tip (for the rubber caps).
float hdField(vec2 p, float curl, out float M, out float sil){
  float H = 0.0;
  M = -1.0;
  float h;
  // the suit's sleeve: wide at the frame edge, narrowing into the ring, folds across it
  float w = mix(0.074, 0.106, clamp((-0.055 - p.y)/0.30, 0.0, 1.0));
  float dx = abs(p.x - 0.01*p.y) - w;
  float ds = max(dx, p.y + 0.045);
  float fold = sin(p.y*88.0 + 3.0*noise2(p*18.0))*0.5 + 0.5;
  h = 0.050*sqrt(clamp(-dx/0.04, 0.0, 1.0)) + 0.007*fold;
  sil = ds;
  hdTop(h, ds, HD_SLEEVE, H, M);
  // the wrist disconnect: a machined ring, higher than the cloth either side of it
  float dr = sdRBox(p - vec2(0.0, -0.050), vec2(0.082, 0.017), 0.007);
  h = 0.030 + 0.034*sqrt(max(0.0, 1.0 - (p.x/0.084)*(p.x/0.084)));
  sil = min(sil, dr);
  hdTop(h, dr, HD_RING, H, M);
  // the gauntlet: the glove's quilted cuff, flaring very slightly toward the ring
  float dg = sdRBox(p - vec2(0.0, -0.004), vec2(0.066 - 0.05*p.y, 0.030), 0.016);
  h = 0.018 + 0.036*sqrt(clamp(-dg/0.035, 0.0, 1.0));
  sil = min(sil, dg);
  hdTop(h, dg, HD_GAUNT, H, M);
  // the back of the hand: a cushion, its knuckle ridge standing up as the hand closes
  float db = sdRBox(p - vec2(0.0, 0.074), vec2(0.060 - 0.04*(p.y - 0.08), 0.056), 0.024);
  h = 0.026 + 0.030*sqrt(clamp(-db/0.03, 0.0, 1.0)) + 0.014*curl*smoothstep(0.05, 0.125, p.y);
  sil = min(sil, db);
  float hb = h;
  hdTop(h, db, HD_BACK, H, M);
  // the restraint strap across the back, a hair proud of the cloth
  float strap = abs(p.y - 0.064 - 0.16*p.x) - 0.0075;
  if (db < -0.004 && strap < 0.0) hdTop(hb + 0.004, -1.0, HD_STRAP, H, M);
  // four fingers, knuckle bulge, two phalanges, a rubber cap on each tip
  for (int n = 0; n < 4; n++){
    float fi = float(n);
    vec2 k, j, t; float r;
    hdFinger(fi, curl, k, j, t, r);
    float lift = 0.030 + 0.010*curl;
    float d1 = hdTube(p, k, j, r, lift, h);
    sil = min(sil, d1);
    hdTop(h, d1, HD_FINGER, H, M);
    // the far phalanx drops out of sight as the hand closes
    float d2 = hdTube(p, j, t, r*0.93, lift - 0.034*curl, h);
    float cap = length(p - t) < 0.019 && curl < 0.5 ? 1.0 : 0.0;
    sil = min(sil, d2);
    hdTop(h, d2, cap > 0.5 ? HD_CAP : HD_FINGER, H, M);
    // the knuckles: the first always a bump, the second standing up on a fist
    float dk = length(p - k) - r*1.06;
    hdTop(lift + 0.001 + sqrt(max(0.0, pow(r*1.06, 2.0) - dot(p - k, p - k))), dk, HD_FINGER, H, M);
    float dj = length(p - j) - r*1.02;
    hdTop(lift + 0.003*curl + sqrt(max(0.0, pow(r*1.02, 2.0) - dot(p - j, p - j))), dj, HD_FINGER, H, M);
  }
  // the thumb, from the inner side of the hand: out when open, wrapped across when closed
  vec2 tb = vec2(-0.054, 0.052);
  vec2 tj = mix(vec2(-0.084, 0.090), vec2(-0.078, 0.094), curl);
  vec2 tt = mix(vec2(-0.090, 0.130), vec2(-0.052, 0.116), curl);
  float tl = mix(0.018, 0.022, curl);
  float d1 = hdTube(p, tb, tj, 0.0165, tl, h);
  sil = min(sil, d1);
  hdTop(h, d1, HD_FINGER, H, M);
  float d2 = hdTube(p, tj, tt, 0.0148, tl + 0.004, h);
  sil = min(sil, d2);
  hdTop(h, d2, length(p - tt) < 0.017 ? HD_CAP : HD_FINGER, H, M);
  return H;
}

float hdHeight(vec2 p, float curl){
  float m, s;
  return hdField(p, curl, m, s);
}

// a ramp of up to six colours, indexed by a dithered light level
vec3 hdFabric(float i){
  return i < 0.5 ? HD_ASH : i < 1.5 ? HD_STONE : i < 2.5 ? HD_BONE : i < 3.5 ? HD_CHALK : i < 4.5 ? HD_CREAM : HD_LINEN;
}
vec3 hdMetal(float i){
  return i < 0.5 ? HD_IRON : i < 1.5 ? HD_GRAPHITE : i < 2.5 ? HD_GUN : i < 3.5 ? HD_PEWTER : i < 4.5 ? HD_SILVER : HD_STAR;
}
vec3 hdRubber(float i){
  return i < 1.5 ? HD_PITCH : i < 2.5 ? HD_IRON : i < 3.5 ? HD_GRAPHITE : i < 4.5 ? HD_GUN : HD_PEWTER;
}
// the anodised band: red on the right wrist, blue on the left, as a real suit tells them apart
vec3 hdBand(float i, float mirror){
  if (mirror > 0.0) return i < 1.5 ? HD_RUST : i < 2.5 ? HD_GARNET : i < 3.5 ? HD_BRICK : i < 4.5 ? HD_FLARE : HD_RED;
  return i < 1.5 ? HD_IRON : i < 2.5 ? HD_STEEL : i < 3.5 ? HD_ZINC : i < 4.5 ? HD_FROST : HD_RIME;
}

// what the right hand holds: 1 wrench, 2 med-kit, 3 cutter; distance and colour
float hdItem(vec2 p, float item, out vec3 col, out float glow){
  col = HD_PEWTER;
  glow = 0.0;
  if (item < 0.5) return 1e3;
  if (item < 1.5){
    // an adjustable wrench through the fist, head up and out
    float d = sdSeg(p, vec2(-0.010, 0.050), vec2(0.012, 0.212), 0.0085);
    vec2 h = p - vec2(0.016, 0.232);
    float head = length(h*vec2(1.0, 1.15)) - 0.024;
    head = max(head, -sdBox(h - vec2(0.0, 0.022), vec2(0.0085, 0.024)));
    d = min(d, head);
    float s = p.x - (p.y - 0.05)*0.14;
    col = s < -0.004 ? HD_SILVER : s < 0.003 ? HD_PEWTER : HD_GUN;
    if (abs(p.y - 0.17) < 0.012 && head > 0.0) col = HD_GRAPHITE;
    return d;
  }
  if (item < 2.5){
    // the med-kit hangs off the thumb by its strap
    vec2 q = p - vec2(-0.132, 0.020);
    float d = sdRBox(q, vec2(0.044, 0.034), 0.007);
    float cross = min(sdBox(q, vec2(0.0045, 0.018)), sdBox(q, vec2(0.018, 0.0045)));
    float s = q.y + q.x*0.4;
    col = cross < 0.0 ? HD_RED : s > 0.012 ? HD_LINEN : s > -0.012 ? HD_CREAM : HD_CHALK;
    if (abs(q.y - 0.020) < 0.003) col = HD_GUN;
    d = min(d, sdSeg(p, vec2(-0.078, 0.110), vec2(-0.118, 0.052), 0.0045));
    return d;
  }
  // the plasma cutter: a ribbed grip, a nozzle, a lit tip
  float d = sdSeg(p, vec2(-0.008, 0.050), vec2(0.010, 0.196), 0.0115);
  d = min(d, sdSeg(p, vec2(0.010, 0.196), vec2(0.013, 0.222), 0.0065));
  vec2 tip = p - vec2(0.014, 0.232);
  float t = length(tip) - 0.0085;
  d = min(d, t);
  float s = p.x - (p.y - 0.05)*0.12;
  col = t < 0.0 ? HD_EMBER : s < -0.004 ? HD_PEWTER : s < 0.004 ? HD_GUN : HD_GRAPHITE;
  if (abs(mod(p.y, 0.022) - 0.011) < 0.0025 && p.y > 0.14 && p.y < 0.19 && t > 0.0) col = HD_IRON;
  glow = smoothstep(0.05, 0.0, length(tip));
  return d;
}

// Stitching: a dotted line along the given distance field, a shade down from the cloth.
float hdStitch(float d, float along, float cell){
  return step(abs(d), 0.6*cell)*step(0.5, fract(along*140.0));
}

// One glove at p (hand space). mirror flips the light for the left hand. Returns rgb + coverage.
vec4 hdDraw(vec2 p, float curl, float item, float mirror, float cell){
  if (p.x < -0.19 || p.x > 0.20 || p.y > 0.30 || p.y < -0.62) return vec4(0.0);
  float M, sil;
  float H = hdField(p, curl, M, sil);
  vec3 icol; float iglow;
  float di = hdItem(p, item, icol, iglow);
  if (sil > 0.0 && di > 0.0) return vec4(0.0);
  // the item: in front above the fist, inside it below the knuckles
  if (di < 0.0 && (p.y > HD_KNUCKLE + 0.016 || sil > 0.0)){
    return vec4(di > -cell ? HD_PITCH : icol + iglow*0.4, 1.0);
  }
  // the surface: slope off the height field, the light from the upper left of the frame
  float e = cell*1.5;
  float hx = hdHeight(p + vec2(e, 0.0), curl);
  float hy = hdHeight(p + vec2(0.0, e), curl);
  vec3 n = normalize(vec3(-(hx - H)/e, -(hy - H)/e, 1.0));
  n.x *= mirror;
  vec3 L = normalize(vec3(-0.55, 0.60, 0.58));
  float diff = max(dot(n, L), 0.0);
  // creases and gaps: the surface around a point stands above it
  float r = 0.010;
  float around = hdHeight(p + vec2(r, 0.0), curl) + hdHeight(p - vec2(r, 0.0), curl)
               + hdHeight(p + vec2(0.0, r), curl) + hdHeight(p - vec2(0.0, r), curl);
  float cavity = clamp((around*0.25 - H)*28.0, 0.0, 0.55);
  float lit = (0.22 + 0.86*diff)*(1.0 - cavity);
  // the scene lights the far edge a little, which is what stops it reading as a sticker
  lit += 0.18*pow(1.0 - n.z, 2.0)*step(0.0, n.y);
  float grain = noise2(p*420.0) - 0.5;
  float dth = (bayer8(gl_FragCoord.xy) - 0.5)*0.6;
  vec3 col;
  if (M == HD_RING){
    // machined steel, a hard specular line, the anodised band round its middle and three bolts
    float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 18.0);
    float lv = clamp(floor((lit*0.9 + spec*0.9)*5.0 + dth), 0.0, 5.0);
    float band = abs(p.y + 0.050) - 0.0055;
    col = band < 0.0 ? hdBand(lv, mirror) : hdMetal(lv);
    for (int b = 0; b < 3; b++){
      vec2 bolt = vec2(-0.052 + float(b)*0.052, -0.050 + 0.0115*(b == 1 ? 1.0 : -1.0));
      if (length(p - bolt) < 0.0048) col = length(p - bolt - vec2(-0.0015, 0.0015)) < 0.002 ? HD_SILVER : HD_GRAPHITE;
    }
  } else if (M == HD_CAP){
    float lv = clamp(floor(lit*5.2 + dth + grain*0.6), 0.0, 5.0);
    col = hdRubber(lv);
  } else if (M == HD_STRAP){
    float lv = clamp(floor(lit*4.4 + dth), 0.0, 5.0);
    col = hdRubber(lv);
    // the buckle, on the thumb side
    vec2 bq = p - vec2(-0.040, 0.058);
    if (abs(bq.x) < 0.009 && abs(bq.y - 0.16*bq.x) < 0.010) col = abs(bq.x) > 0.005 || abs(bq.y - 0.16*bq.x) > 0.006 ? HD_PEWTER : HD_GRAPHITE;
  } else {
    // the cloth: layered white fabric, the sleeve a shade down, grain in the weave
    float lv = lit*6.0 + dth + grain*0.22 - (M == HD_SLEEVE ? 0.8 : 0.0);
    lv = clamp(floor(lv), 0.0, 5.0);
    float st = 0.0;
    if (M == HD_GAUNT){
      // quilting: two sets of diagonal stitched lines
      float a = fract((p.x + p.y)*38.0) - 0.5;
      float b = fract((p.x - p.y)*38.0) - 0.5;
      st = max(hdStitch(a/38.0, p.x - p.y, cell), hdStitch(b/38.0, p.x + p.y, cell));
    } else if (M == HD_BACK){
      // seams running from the cuff to between the fingers
      for (int s = 0; s < 3; s++){
        float sx = -0.024 + float(s)*0.024;
        float ds = sdSeg(p, vec2(sx*0.7, 0.036), vec2(sx, HD_KNUCKLE - 0.006), 0.0);
        st = max(st, hdStitch(ds, p.y, cell));
      }
    } else if (M == HD_SLEEVE){
      // a zip seam up the sleeve and the suit's patch on the left arm
      st = hdStitch(p.x - 0.034 - 0.01*p.y, p.y, cell);
    }
    lv = max(0.0, lv - st*1.5);
    col = hdFabric(lv);
    // the checklist on the left cuff: a small bound pad, pages lined
    if (mirror < 0.0 && M == HD_SLEEVE){
      vec2 c = p - vec2(0.004, -0.112);
      if (abs(c.x) < 0.036 && abs(c.y) < 0.030){
        col = abs(c.x) > 0.032 || abs(c.y) > 0.026 ? HD_GRAPHITE
            : abs(c.y - 0.022) < 0.002 ? HD_GUN
            : fract(c.y*120.0) < 0.3 && abs(c.x) < 0.026 ? HD_STONE
            : lit > 0.6 ? HD_LINEN : HD_CREAM;
      }
    }
  }
  // one cell of line on the outer silhouette only: the folds inside are drawn by the light
  if (sil > -cell) col = HD_PITCH;
  return vec4(col, 1.0);
}

vec2 hdRot(vec2 q, float a){
  float c = cos(a), s = sin(a);
  return vec2(q.x*c + q.y*s, -q.x*s + q.y*c);
}

vec4 hands(vec2 uv){
  if (uH.z <= 0.0) return vec4(0.0);
  float A = uRes.x/uRes.y;
  // a portrait frame gets smaller gloves tucked into its corners, so the two never meet
  float sc = min(1.0, A/1.25)*1.55;
  float inset = 0.20*sc;
  float rise = -0.5*(1.0 - uH.z);
  // breathing, and a little lag behind the head turn
  float breath = sin(uTime*1.35)*0.004*sc;
  vec2 lean = vec2(-uLook.x, uLook.y)*0.014;
  float base = -0.5 + 0.075*sc + rise + breath;
  vec2 anchorR = vec2(A*0.5 - inset, base) + lean;
  vec2 anchorL = vec2(-A*0.5 + inset, base + 0.004*sc*sin(uTime*1.35 + 0.8)) + lean;
  float tiltR = HD_TILT + 0.018*sin(uTime*0.9);
  if (uH.w > 0.0){
    // wiping: the middle fingertip goes where the pointer is
    vec2 pt = vec2((uPtr.x - 0.5)*A, uPtr.y - 0.5);
    vec2 reach = vec2(-sin(tiltR), cos(tiltR))*0.17*sc;
    anchorR = mix(anchorR, pt - reach, uH.w);
  }
  float state = uH.x;
  // hold is a three-quarter fist round the item
  float curl = state < 1.0 ? 1.0 - state : (state - 1.0)*(uH.y > 1.5 && uH.y < 2.5 ? 1.0 : 0.9);
  float cell = 1.0/(uRes.y*sc);
  vec4 r = hdDraw(hdRot((uv - anchorR)/sc, tiltR), curl, uH.y, 1.0, cell);
  if (r.a > 0.0) return r;
  vec2 pl = (uv - anchorL)/sc;
  return hdDraw(hdRot(vec2(-pl.x, pl.y), HD_TILT), curl, 0.0, -1.0, cell);
}

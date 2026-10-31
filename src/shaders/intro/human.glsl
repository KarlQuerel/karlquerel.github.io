// The envoy suit's kit, for the shots that show it: the player's own legs and boots and the empty
// suits hung in the lockers (corridor.frag.glsl), built from tapered SDF parts solved with two-bone
// IK and blended with a smooth union. A suit hangs in its own frame: x the way it faces, y up from
// the deck, z to its right. Materials: 27 its white second skin, 19 its hard white parts, 26 its
// lines of cold light, 28 its dark seams and soles, 30 the helmet's visor. huWalker is the flat
// profile figure the cryo shot's far catwalk uses.

float huCone(vec3 p, vec3 a, vec3 b, float ra, float rb){
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
  return length(pa - ba*h) - mix(ra, rb, h);
}
float huEll(vec3 p, vec3 r){
  float k0 = length(p/r);
  float k1 = length(p/(r*r));
  return k0*(k0 - 1.0)/k1;
}
float huBox(vec3 p, vec3 b, float r){
  vec3 d = abs(p) - b + r;
  return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0) - r;
}
// smooth union that keeps the material of whichever part is actually nearest
void huAdd(inout vec3 r, float d, float m, float k){
  float h = clamp(0.5 + 0.5*(d - r.x)/k, 0.0, 1.0);
  bool mine = d < r.z;
  r.x = mix(d, r.x, h) - k*h*(1.0 - h);
  if (mine){ r.z = d; r.y = m; }
}
// hard union: a strap, a fitting, a prop
void huPut(inout vec3 r, float d, float m){
  if (d < r.x){ r.x = d; r.y = m; }
  r.z = min(r.z, d);
}

// Two-bone IK: from the root toward the target, bending toward the pole. The reach is clamped,
// and `tip` is where the end of the chain actually lands.
vec3 huIK(vec3 a, vec3 c, float l1, float l2, vec3 pole, out vec3 tip){
  vec3 v = c - a;
  float len = max(length(v), 0.001);
  vec3 dir = v/len;
  float d = clamp(len, 0.05, l1 + l2 - 0.002);
  tip = a + dir*d;
  float x = (l1*l1 - l2*l2 + d*d)/(2.0*d);
  float h = sqrt(max(l1*l1 - x*x, 0.0));
  vec3 pv = pole - dir*dot(pole, dir);
  pv = dot(pv, pv) > 1e-6 ? normalize(pv) : vec3(0.0, 1.0, 0.0);
  return a + dir*x + pv*h;
}

vec3 huYaw(vec3 q, float a){
  float c = cos(a), s = sin(a);
  return vec3(c*q.x + s*q.z, q.y, -s*q.x + c*q.z);
}

// The helmet, shelved or set down: a white shell with a dark visor set back into a window cut in its
// front. The face would look along +x.
const float HU_VISOR = 30.0;
// the ankle joint's height over the deck in a boot (GAIT.leg.boot in js/intro/walk.js keeps in step)
const float HU_ANKLE = 0.08;
vec2 helmetAt(vec3 h){
  vec3 q = h - vec3(0.01, 0.02, 0.0);
  float dome = huEll(q, vec3(0.19, 0.185, 0.175));
  // the visor: a dark plate set back into a window cut in the front of the shell
  float win = huBox(q - vec3(0.2, -0.01, 0.0), vec3(0.1, 0.075, 0.1), 0.035);
  vec2 r = vec2(max(dome, -win), 19.0);
  float visor = max(dome + 0.012, win);
  if (visor < r.x) r = vec2(visor, HU_VISOR);
  return r;
}

// a dark seam ring round a limb at c, the limb running along u
float huSeam(vec3 q, vec3 c, vec3 u, float radius, float width){
  vec3 d = q - c;
  return max(length(d - u*dot(d, u)) - radius, abs(dot(d, u)) - width);
}

// A leg from the hip to the ankle in material m: a full thigh, the knee, a shin with its calf
// behind, fullest a third of the way down; F is the way the foot points.
void huLeg(inout vec3 r, vec3 q, vec3 hip, vec3 knee, vec3 ankle, vec3 F, float m){
  vec3 us = normalize(ankle - knee);
  vec3 mid = mix(hip, knee, 0.45);
  huAdd(r, huCone(q, hip, mid, 0.088, 0.08), m, 0.05);
  huAdd(r, huCone(q, mid, knee, 0.08, 0.058), m, 0.04);
  huAdd(r, length(q - knee) - 0.058, m, 0.02);
  vec3 back = -normalize(F - us*dot(F, us));
  vec3 calf = mix(knee, ankle, 0.35) + back*0.012;
  huAdd(r, huCone(q, knee + back*0.005, calf, 0.056, 0.062), m, 0.035);
  huAdd(r, huCone(q, calf, ankle, 0.062, 0.036), m, 0.03);
}

// The leg in the suit: its skin over the leg, a seam round the knee, a line of light down the
// outside of the leg (sd says which side); F is the way the boot points.
void huLegSuit(inout vec3 r, vec3 q, vec3 hip, vec3 knee, vec3 ankle, vec3 F, float sd){
  vec3 ut = normalize(knee - hip), us = normalize(ankle - knee);
  huLeg(r, q, hip, knee, ankle, F, 27.0);
  huPut(r, huSeam(q, knee, normalize(ut + us), 0.061, 0.006), 28.0);
  vec3 st = -cross(ut, F)*sd, ss = -cross(us, F)*sd;
  huPut(r, huCone(q, mix(hip, knee, 0.15) + st*0.083, mix(hip, knee, 0.88) + st*0.058, 0.007, 0.007), 26.0);
  huPut(r, huCone(q, mix(knee, ankle, 0.15) + ss*0.056, mix(knee, ankle, 0.75) + ss*0.04, 0.006, 0.006), 26.0);
}

// The mag boot about the ankle: a solid foot block whose top slopes down to the toe, on a thick dark
// sole with a heel, and a straight shaft up the shin to a dark cuff with a ring of light under it.
// b is the point in the boot's frame (across, up, ahead) from the ankle joint.
void huBoot(inout vec3 r, vec3 b){
  float foot = huBox(b - vec3(0.0, -0.03, 0.045), vec3(0.028, 0.018, 0.11), 0.03);
  foot = max(foot, b.y + 0.005 + 0.25*(b.z - 0.06));
  huAdd(r, foot, 19.0, 0.01);
  huAdd(r, max(length(b.xz - vec2(0.0, -0.012)) - 0.06, abs(b.y - 0.08) - 0.09), 19.0, 0.02);
  huPut(r, huBox(b - vec3(0.0, 0.013 - HU_ANKLE, 0.045), vec3(0.046, 0.008, 0.128), 0.005), 28.0);
  huPut(r, huBox(b - vec3(0.0, 0.022 - HU_ANKLE, -0.06), vec3(0.042, 0.012, 0.028), 0.006), 28.0);
  huPut(r, huSeam(b, vec3(0.0, 0.165, -0.012), vec3(0.0, 1.0, 0.0), 0.061, 0.008), 28.0);
  huPut(r, huSeam(b, vec3(0.0, 0.148, -0.012), vec3(0.0, 1.0, 0.0), 0.061, 0.003), 26.0);
}

// An empty envoy suit on a hanger, its pelvis hung at `hang`: the torso sagged flat, legs and arms
// hanging straight, gloves on, no helmet (that sits on a shelf). Returns vec3(distance, material, -).
vec3 huSuit(vec3 f, float hang){
  // the room the suit takes: nothing to evaluate until the ray is close
  float bound = huBox(f - vec3(0.12, hang*0.5 + 0.45, 0.0), vec3(0.62, hang*0.5 + 0.55, 0.5), 0.05);
  if (bound > 0.1) return vec3(bound, 0.0, bound);
  float build = 0.95, flatten = 0.78, kJ = 0.045;
  vec3 P = vec3(0.0, hang, 0.0);
  vec3 C = vec3(-0.01, hang + 0.38, 0.0);
  vec3 r = vec3(1e9, 0.0, 1e9);
  // torso: the pelvis with the glutes behind it, a waist narrower than hips and chest, the ribcage
  // flaring up into a chest that is wider than it is deep, all sagged flat
  vec3 Wst = P + vec3(0.0, 0.18, 0.0);
  huAdd(r, huEll(f - P - vec3(0.0, 0.03, 0.0), vec3(0.105, 0.11, 0.155)), 27.0, kJ);
  huAdd(r, huEll(vec3(f.x, f.y, abs(f.z)) - P - vec3(-0.055, 0.0, 0.07), vec3(0.075, 0.085, 0.075)), 27.0, 0.04);
  huAdd(r, huEll(f - Wst, vec3(0.1*flatten, 0.1, 0.13*build)), 27.0, 0.06);
  huAdd(r, huCone(f, Wst, C - vec3(0.0, 0.06, 0.0), 0.09, 0.12), 27.0, 0.06);
  huAdd(r, huEll(f - C, vec3(0.115*flatten, 0.15, 0.17*build)), 27.0, kJ);
  // legs: thigh 0.45, shin 0.44, hanging straight to the boots, which point a little out
  for (int i = 0; i < 2; i++){
    float sg = i == 0 ? -1.0 : 1.0;
    vec3 hip = P + vec3(0.0, 0.0, sg*0.092);
    vec3 ankle;
    vec3 knee = huIK(hip, hip + vec3(0.04, -0.84, sg*0.01), 0.45, 0.44, vec3(1.0, 0.0, sg*0.08), ankle);
    vec3 bf = normalize(vec3(1.0, 0.0, sg*0.2));
    huLegSuit(r, f, hip, knee, ankle, bf, sg);
    vec3 d = f - ankle;
    huBoot(r, vec3(dot(d, vec3(bf.z, 0.0, -bf.x)), d.y, dot(d, bf)));
  }
  // arms: upper 0.29, forearm 0.26, hanging at the sides; the trapezius down from the neck, the
  // deltoid over the shoulder, a forearm fullest below the elbow, a flat glove with its thumb to
  // the front, a seam round the elbow, a band of light round the wrist
  for (int i = 0; i < 2; i++){
    float sg = i == 0 ? -1.0 : 1.0;
    vec3 sh = C + vec3(-0.012, 0.115, sg*0.18*build);
    vec3 wrist;
    vec3 elbow = huIK(sh, sh + vec3(0.03, -0.53, sg*0.05), 0.29, 0.26, vec3(-0.3, -1.0, sg*0.6), wrist);
    huAdd(r, huCone(f, C + vec3(-0.015, 0.16, 0.0), sh + vec3(0.0, 0.025, -sg*0.02), 0.055, 0.04), 27.0, 0.05);
    huAdd(r, huEll(f - sh - vec3(0.0, 0.0, sg*0.01), vec3(0.065, 0.075, 0.06)), 27.0, kJ);
    huAdd(r, huCone(f, sh, elbow, 0.05, 0.042), 27.0, kJ*0.8);
    vec3 fore = mix(elbow, wrist, 0.3);
    huAdd(r, huCone(f, elbow, fore, 0.042, 0.047), 27.0, 0.03);
    huAdd(r, huCone(f, fore, wrist, 0.047, 0.03), 27.0, 0.03);
    vec3 fd = normalize(wrist - elbow);
    vec3 hw = normalize(cross(fd, vec3(0.0, 0.0, sg)));
    vec3 hn = cross(fd, hw);
    vec3 hd = f - (wrist + fd*0.05);
    huAdd(r, huEll(vec3(dot(hd, fd), dot(hd, hw), dot(hd, hn)), vec3(0.056, 0.042, 0.017)), 27.0, 0.015);
    huAdd(r, huCone(f, wrist + fd*0.015 - hw*0.03, wrist + fd*0.05 - hw*0.058, 0.013, 0.01), 27.0, 0.012);
    huPut(r, huSeam(f, elbow, normalize(normalize(elbow - sh) + fd), 0.045, 0.005), 28.0);
    huPut(r, huSeam(f, wrist - fd*0.012, fd, 0.036, 0.006), 26.0);
  }
  // a hard yoke over the upper chest with a line of light down the sternum, the collar the helmet
  // locks to with its lit front rim, a slim dark belt with its status light
  huPut(r, max(huEll(f - C - vec3(0.01, 0.08, 0.0), vec3(0.125, 0.1, 0.185*build)), 0.03 - (f.x - C.x)), 19.0);
  huPut(r, huBox(f - C - vec3(0.136, 0.035, 0.0), vec3(0.005, 0.045, 0.004), 0.002), 26.0);
  vec2 cr = vec2(length(f.xz - C.xz), f.y - C.y);
  huPut(r, max(cr.x - 0.125, abs(cr.y - 0.18) - 0.02), 19.0);
  huPut(r, max(max(abs(cr.x - 0.121) - 0.007, abs(cr.y - 0.198) - 0.004), C.x - f.x), 26.0);
  huPut(r, huEll(f - P - vec3(0.0, 0.1, 0.0), vec3(0.126, 0.018, 0.168)), 28.0);
  huPut(r, huBox(f - P - vec3(0.124, 0.1, 0.0), vec3(0.008, 0.005, 0.04), 0.003), 26.0);
  return r;
}

// A figure walking, drawn flat in profile (for the far catwalk): phase runs 0..1 per stride.
// Returns the silhouette's signed distance in the plane, x forward, y up from the deck.
float huWalker(vec2 b, float phase){
  float a = phase*6.28318;
  float bob = 0.02*abs(cos(a));
  vec2 P = vec2(0.0, 0.93 + bob);
  vec2 C = P + vec2(0.02, 0.4);
  float d = sdSeg(b, P, C, 0.12);
  d = min(d, length((b - C - vec2(0.0, 0.03))/vec2(1.0, 1.35))*0.9 - 0.13);
  d = min(d, sdSeg(b, C + vec2(0.0, 0.14), C + vec2(0.02, 0.24), 0.045));
  d = min(d, length((b - C - vec2(0.03, 0.33))/vec2(0.9, 1.15)) - 0.1);
  for (int i = 0; i < 2; i++){
    float ph = a + float(i)*3.14159;
    // the leg swings from the hip; the knee bends on the way forward, the foot lifts
    float swing = 0.38*sin(ph);
    vec2 foot = vec2(swing, 0.07 + 0.07*max(cos(ph + 1.2), 0.0));
    vec2 v = foot - P;
    float len = min(length(v), 0.88);
    vec2 dir = normalize(v);
    float x = len*0.5;
    float h = sqrt(max(0.44*0.44 - x*x, 0.0));
    vec2 knee = P + dir*x + vec2(-dir.y, dir.x)*h;
    vec2 ankle = P + dir*len;
    float shade = i == 0 ? 0.0 : 0.012;
    d = min(d, sdSeg(b, P, knee, 0.07 - shade));
    d = min(d, sdSeg(b, knee, ankle, 0.05 - shade));
    d = min(d, sdSeg(b, ankle, ankle + vec2(0.11, -0.02), 0.035));
    // the arm swings against its leg
    vec2 sh = C + vec2(-0.01, 0.12);
    vec2 elbow = sh + vec2(-0.2*sin(ph)*0.5, -0.28);
    vec2 hand = elbow + vec2(-0.2*sin(ph) + 0.08, -0.24);
    d = min(d, sdSeg(b, sh, elbow, 0.045 - shade));
    d = min(d, sdSeg(b, elbow, hand, 0.038 - shade));
  }
  return d;
}

// --- the player's own body, for the shots walked in first person
const float HU_THIGH = 0.41;
const float HU_SHIN = 0.4;
const float HU_TOE_OUT = 0.1;       // how far each boot turns out from straight ahead
const float HU_STRIDE_TWIST = 0.15; // the pelvis swivels this far (rad per unit) to bring the leading boot's hip forward
vec2 huU(vec2 a, vec2 b){ return a.x < b.x ? a : b; }

// The player's own body under the eye, seen by looking down: hips turned the way the boots stand, the
// torso halfway to where the head looks, legs from the hips to the boots where the walk set them down
// (uR left, uS right: across, ahead, lift, yaw, in the head's frame). In that frame x runs to the
// right, y up from the ground at floorY, z ahead. The head's lean is uQ.x across, uP.y up.
vec2 huPlayer(vec3 p, float floorY){
  vec2 d = p.xz - vec2(uQ.y, uP.x);
  if (dot(d, d) > 1.0) return vec2(1e9, 0.0);
  float s = sin(uQ.z), c = cos(uQ.z);
  vec3 q = vec3(c*d.x - s*d.y, p.y - floorY, s*d.x + c*d.y);
  vec2 g = vec2(uQ.x, uP.y);
  // the pelvis faces between the boots and swivels with the stride, the leading boot's hip forward
  float hipYaw = atan(sin(uR.w) + sin(uS.w), cos(uR.w) + cos(uS.w));
  float pelvisYaw = hipYaw - HU_STRIDE_TWIST*(uS.y - uR.y);
  vec2 hipAhead = vec2(sin(pelvisYaw), cos(pelvisYaw));
  vec3 tq = q - vec3(g.x, g.y, -0.24);
  float ts = sin(0.5*hipYaw), tc = cos(0.5*hipYaw);
  tq.xz = vec2(tc*tq.x - ts*tq.z, ts*tq.x + tc*tq.z);
  vec2 r = vec2(1e9, 0.0);
  vec3 trunk = vec3(1e9, 0.0, 1e9);
  for (int i = 0; i < 2; i++){
    vec4 f = i == 0 ? uR : uS;
    float sd = i == 0 ? -1.0 : 1.0;
    vec3 hip = vec3(g.x + hipAhead.y*sd*0.1, 0.9 + g.y, -0.16 - hipAhead.x*sd*0.1);
    // the boot points a little out and rolls: up on its toe as the body leaves it behind, heel first
    // as it reaches ahead to land
    float yaw = f.w + sd*HU_TOE_OUT;
    vec3 F = vec3(sin(yaw), 0.0, cos(yaw));
    vec3 R = vec3(F.z, 0.0, -F.x);
    vec3 foot = vec3(f.x, HU_ANKLE + f.z, f.y);
    float ahead = dot(foot.xz - hip.xz, hipAhead);
    float roll = ahead < 0.0 ? clamp((-ahead - 0.12)*1.6, 0.0, 0.9) : -clamp((ahead - 0.18)*1.8, 0.0, 0.5);
    vec3 pivot = foot + F*(roll > 0.0 ? 0.19 : -0.08) - vec3(0.0, HU_ANKLE, 0.0);
    vec3 Fr = F*cos(roll) - vec3(0.0, sin(roll), 0.0);
    vec3 Ur = vec3(0.0, cos(roll), 0.0) + F*sin(roll);
    vec3 v = foot - pivot;
    vec3 rolled = pivot + Fr*dot(v, F) + Ur*v.y + R*dot(v, R);
    // the leg bears the weight on a soft knee (js/intro/gait.js sets the pelvis that much short of
    // straight); a boot the leg can no longer reach, left behind, lifts off the deck with it
    vec3 ankle;
    vec3 knee = huIK(hip, rolled, HU_THIGH, HU_SHIN, F, ankle);
    // the suit's leg and its mag boot (human.glsl), the plates turned the way the boot points
    vec3 leg = vec3(1e9, 0.0, 1e9);
    huLegSuit(leg, q, hip, knee, ankle, F, sd);
    vec3 b = q - ankle;
    huBoot(leg, vec3(dot(b, R), dot(b, Ur), dot(b, Fr)));
    huAdd(trunk, leg.x, leg.y, 0.012);
  }
  // the trunk, wider than it is deep: the pelvis the legs hang from, a waist narrower than hips and
  // chest, the ribcage flaring up into a chest that starts a hand under the chin; x right, z ahead
  // the pelvis sits forward over the hips, so the thighs come out from under the belly, not ahead of it
  vec3 Pv = vec3(0.0, 0.88, 0.075), Wst = vec3(0.0, 1.05, 0.03), Ch = vec3(0.0, 1.24, 0.0);
  // the pelvis stays inside the span of the thighs: narrow at the sides, the belly in front
  huAdd(trunk, huEll(tq - Pv - vec3(0.0, 0.03, 0.0), vec3(0.125, 0.115, 0.1)), 27.0, 0.035);
  huAdd(trunk, huEll(tq - Wst, vec3(0.12, 0.1, 0.09)), 27.0, 0.05);
  huAdd(trunk, huCone(tq, Wst, Ch - vec3(0.0, 0.06, 0.0), 0.1, 0.125), 27.0, 0.06);
  huAdd(trunk, huEll(tq - Ch, vec3(0.17, 0.15, 0.115)), 27.0, 0.045);
  r = huU(r, trunk.xy);
  // the suit's hard parts: a yoke over the upper chest, a slim dark belt at the waist with its light
  r = huU(r, vec2(max(huEll(tq - vec3(0.0, 1.32, 0.01), vec3(0.175, 0.09, 0.12)), 0.02 - tq.z), 19.0));
  r = huU(r, vec2(huEll(tq - vec3(0.0, 0.99, 0.06), vec3(0.135, 0.018, 0.118)), 28.0));
  r = huU(r, vec2(huBox(tq - vec3(0.0, 0.99, 0.182), vec3(0.04, 0.005, 0.01), 0.003), 26.0));
  return r;
}

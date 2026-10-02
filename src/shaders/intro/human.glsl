// People, for the shots that show them: an articulated skeleton of tapered SDF parts, solved with
// two-bone IK and blended with a smooth union. A figure stands in its own frame: x the way it faces,
// y up from the deck, z to its right. Returns vec3(distance, material, -).
// Outfits: 0 EVA suit, helmet on; 1 EVA suit, bare head; 2 coverall and cap; 3 medic;
// 4 an empty suit on a hanger; 5 the cooling undersuit.
// Materials: 1 suit, 2 helmet shell, 3 pack, 4 skin, 5 coverall, 6 dark fittings and boots,
// 7 visor, 8 chest lamp, 9 belt, 14 medic's uniform, 16 hair, 17 undersuit.

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

// wl/wr: where each wrist reaches, in the figure's frame. pose = (weight shift -1..1 onto the left
// or right leg, seat height (0 standing; for an empty suit, the pelvis height it hangs at), build
// 0.85..1.15, head pitch). look = (head yaw, seed, -, -).
vec3 huFigure(vec3 f, vec3 wl, vec3 wr, vec4 pose, vec4 look, float outfit){
  bool eva = outfit < 1.5 || outfit > 3.5 && outfit < 4.5;
  bool empty = outfit > 3.5 && outfit < 4.5;
  float seat = pose.y;
  float build = pose.z;
  float s = empty ? 0.0 : pose.x;
  float sat = (!empty && seat > 0.0) ? 1.0 : 0.0;
  float pelvisY = empty ? seat : (sat > 0.5 ? seat + 0.08 : 0.95);
  // the room the figure takes: nothing to evaluate until the ray is close
  float bound = huBox(f - vec3(0.12, pelvisY*0.5 + 0.45, 0.0), vec3(0.62, pelvisY*0.5 + 0.55, 0.5), 0.05);
  if (bound > 0.1) return vec3(bound, 0.0, bound);

  float bulk = eva ? 0.03 : 0.0;
  float breathe = empty ? 0.0 : 0.006*sin(uTime*1.7 + look.y*6.0);
  vec3 P = vec3(0.0, pelvisY, 0.035*s);
  vec3 C = vec3(-0.01, pelvisY + 0.38 + breathe, -0.015*s);
  vec3 r = vec3(1e9, 0.0, 1e9);
  float mBody = outfit < 1.5 || empty ? 1.0 : outfit < 2.5 ? 5.0 : outfit < 3.5 ? 14.0 : 17.0;
  float kJ = 0.045;

  // torso: pelvis, belly, a chest that is wider than it is deep; an empty suit sags flat
  float flatten = empty ? 0.78 : 1.0;
  huAdd(r, huEll(f - P - vec3(0.0, 0.03, 0.0), vec3(0.105 + bulk, 0.11, 0.155 + bulk)), mBody, kJ);
  huAdd(r, huCone(f, P + vec3(0.0, 0.08, 0.0), C - vec3(0.0, 0.07, 0.0), 0.125 + bulk, 0.135 + bulk), mBody, kJ);
  huAdd(r, huEll(f - C, vec3((0.112 + bulk)*flatten, 0.16, (0.165 + bulk)*build)), mBody, kJ);

  // legs: thigh 0.45, shin 0.44, knees forward; the weight leg straight, the free one eased
  for (int i = 0; i < 2; i++){
    float sg = i == 0 ? -1.0 : 1.0;
    float w = clamp(s*sg, 0.0, 1.0);
    vec3 hip = P + vec3(0.0, 0.02*s*sg, sg*0.092);
    vec3 foot;
    vec3 pole = vec3(1.0, 0.0, sg*0.08);
    if (empty) foot = hip + vec3(0.04, -0.84, sg*0.01);
    else if (sat > 0.5){ foot = vec3(0.4, 0.075, sg*0.13); pole = vec3(1.0, 1.0, 0.0); }
    else foot = vec3(mix(0.075, 0.0, w), 0.075, sg*mix(0.15, 0.085, w) + 0.02*s);
    vec3 ankle;
    vec3 knee = huIK(hip, foot, 0.45, 0.44, pole, ankle);
    huAdd(r, huCone(f, hip, knee, 0.078 + bulk, 0.056 + bulk), mBody, kJ);
    huAdd(r, huCone(f, knee, ankle, 0.056 + bulk, 0.04 + bulk*0.8), mBody, kJ*0.7);
    // EVA bellows: a ring of bulk at the knee
    if (eva) huAdd(r, length(f - knee) - (0.085 + 0.006*sin(dot(f - knee, normalize(ankle - hip))*90.0)), mBody, 0.02);
    // the boot, toe forward and a little out
    vec3 toe = ankle + vec3(0.1, -0.035, sg*0.02);
    huPut(r, huCone(f, ankle + vec3(-0.02, -0.02, 0.0), toe, 0.048 + bulk*0.6, 0.038 + bulk*0.5) , empty ? mBody : 6.0);
  }

  // arms: upper 0.29, forearm 0.26
  for (int i = 0; i < 2; i++){
    float sg = i == 0 ? -1.0 : 1.0;
    vec3 sh = C + vec3(-0.012, 0.115 - 0.012*s*sg, sg*0.18*build);
    vec3 target = i == 0 ? wl : wr;
    if (empty) target = sh + vec3(0.03, -0.53, sg*0.05);
    vec3 wrist;
    // elbows hang down and a little out, the way arms rest against a body
    vec3 elbow = huIK(sh, target, 0.29, 0.26, vec3(-0.3, -1.0, sg*0.6), wrist);
    huAdd(r, length(f - sh) - (0.062 + bulk), mBody, kJ);
    huAdd(r, huCone(f, sh, elbow, 0.052 + bulk, 0.042 + bulk), mBody, kJ*0.8);
    huAdd(r, huCone(f, elbow, wrist, 0.042 + bulk, 0.032 + bulk*0.8), mBody, kJ*0.6);
    if (eva) huAdd(r, length(f - elbow) - (0.066 + 0.005*sin(dot(f - elbow, normalize(wrist - sh))*100.0)), mBody, 0.018);
    // the hand, a flattened mitt along the forearm; gloved on a suit, bare otherwise
    vec3 fd = normalize(wrist - elbow);
    huAdd(r, huCone(f, wrist, wrist + fd*0.085, 0.034 + bulk*0.6, 0.026 + bulk*0.5), eva ? mBody : 4.0, 0.02);
  }

  // neck and head: the head a seventh and a half of the body, turned and pitched on the neck
  vec3 H = C + vec3(0.02, 0.325, 0.0);
  if (!empty){
    huAdd(r, huCone(f, C + vec3(0.0, 0.13, 0.0), H - vec3(0.005, 0.08, 0.0), 0.054, 0.046), eva ? 6.0 : 4.0, 0.03);
    vec3 q = huYaw(f - H, look.x);
    float cp = cos(pose.w), sp = sin(pose.w);
    q.xy = vec2(cp*q.x + sp*q.y, -sp*q.x + cp*q.y);
    if (outfit < 0.5){
      // the helmet: a bubble on a neck ring, its visor facing the way the head does
      float helm = length(q - vec3(0.01, 0.0, 0.0)) - 0.165;
      bool visor = q.x > 0.05 && abs(q.y + 0.01) < 0.085 && abs(q.z) < 0.12;
      huPut(r, helm, visor ? 7.0 : 2.0);
    } else {
      float head = huEll(q, vec3(0.098, 0.118, 0.082));
      head = min(head, huEll(q - vec3(0.045, -0.07, 0.0), vec3(0.055, 0.05, 0.058)));
      bool hair = q.y > 0.015 - 0.25*max(-q.x, 0.0) && q.x < 0.06;
      huPut(r, head, hair ? 16.0 : 4.0);
      if (outfit > 1.5 && outfit < 2.5){
        // the cap and its brim
        huPut(r, huEll(q - vec3(0.0, 0.07, 0.0), vec3(0.103, 0.06, 0.088)), 6.0);
        huPut(r, huEll(q - vec3(0.085, 0.052, 0.0), vec3(0.07, 0.012, 0.075)), 6.0);
      }
    }
  }

  if (eva){
    // the neck ring the helmet locks to, the pack, the chest box with its lamp, and the hose
    huPut(r, huCone(f, C + vec3(0.0, 0.16, 0.0), C + vec3(0.0, 0.2, 0.0), 0.13, 0.13), 6.0);
    if (!empty){
      huPut(r, huBox(f - C - vec3(-0.215, -0.03, 0.0), vec3(0.085, 0.26, 0.17*build), 0.035), 3.0);
      huPut(r, huBox(f - C - vec3(0.16, -0.09, 0.02), vec3(0.04, 0.06, 0.085), 0.015), 6.0);
      huPut(r, huBox(f - C - vec3(0.2, -0.07, 0.07), vec3(0.008, 0.02, 0.02), 0.004), 8.0);
      vec3 hp = C + vec3(-0.13, 0.05, 0.2*build);
      vec3 hm = C + vec3(0.04, -0.02, 0.24*build);
      huPut(r, min(huCone(f, hp, hm, 0.017, 0.017), huCone(f, hm, C + vec3(0.17, -0.1, 0.09), 0.017, 0.017)), 6.0);
    }
  } else if (outfit > 1.5 && outfit < 2.5){
    // the coverall's belt
    float belt = huEll(f - P - vec3(0.0, 0.09, 0.0), vec3(0.118, 0.022, 0.168));
    huPut(r, belt, 9.0);
  }
  // cloth hangs in folds, heaviest on an empty suit
  r.x += (empty ? 0.012 : 0.004)*(noise3(f*vec3(9.0, 22.0, 9.0)) - 0.5);
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

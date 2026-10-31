// Acts II and III: the candidate world's surface, walked. A heightfield of rolling ground with a
// ridge across the far end and a lake in a bowl to the left, the pod down where it fell, the local
// star low behind the envoy and the world's moon high ahead, on the corridor's grid and palette with
// the same edge pass. The colours come from the generated palette chunk (SAND, STONE...).
// uP = [z, head rise, scan progress, helmet open], uQ = [head sway, x, heading, pitch], uR/uS the boots
// (across, ahead, lift, yaw), uB[0] = [eye height over the ground, dish taken, fronds alive, sample taken],
// uB[1] = [depth under water, the ground under the player, -, -]. The envoy's own body comes from human.glsl.

uniform vec4 uB[2];
const float WATER = 0.0;
const float FOCAL = 0.85;
const float ROLL = 0.2;
const float FAR = 260.0;
const vec3 SUN = normalize(vec3(0.45, 0.5, -0.6));
const vec3 MOON = normalize(vec3(-0.45, 0.42, 0.78));
const float MOON_R = 0.075;

// the ground, kept in step with js/game/terrain.js (the numbers in constants/game/surface.js)
float terrain(vec2 p){
  float h = 1.6*sin(p.x*0.11 + 0.3)*cos(p.y*0.09 + 1.1)
          + 0.7*sin(p.x*0.27 + 2.0)*cos(p.y*0.23 + 0.4)
          + 0.25*sin(p.x*0.8 + 0.9)*cos(p.y*0.7 + 2.3);
  float r = (p.y - 45.0)/9.0;
  h += 12.0*exp(-r*r)*(0.8 + 0.2*sin(p.x*0.15));
  vec2 l = (p - vec2(-25.0, 15.0))/12.0;
  h -= 4.0*exp(-2.0*dot(l, l));
  // a ring of mountains far round the plain, broken by the long waves
  float m = (length(p) - 150.0)/28.0;
  h += 30.0*exp(-m*m)*(0.6 + 0.4*sin(atan(p.y, p.x)*7.0));
  return h;
}
// how deep the bowl runs here: inside the lake's rim the water stands over the ground
float bowl(vec2 p){ vec2 l = (p - vec2(-25.0, 15.0))/12.0; return exp(-2.0*dot(l, l)); }

vec2 opU(vec2 a, vec2 b){ return a.x < b.x ? a : b; }
float sdCone(vec3 p, vec3 a, vec3 b, float ra, float rb){
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
  return length(pa - ba*h) - mix(ra, rb, h);
}

// the fronds round the lake's far shore, and the rocks: a table, so each is drawn once
vec2 frondAt(int i){
  if (i == 0) return vec2(-22.0, 27.0);
  if (i == 1) return vec2(-18.5, 25.0);
  if (i == 2) return vec2(-25.5, 29.0);
  if (i == 3) return vec2(-20.0, 30.5);
  if (i == 4) return vec2(-15.0, 22.0);
  return vec2(-28.0, 25.5);
}
vec3 rockAt(int i){
  if (i == 0) return vec3(6.0, -1.0, 9.0);
  if (i == 1) return vec3(-7.0, 0.8, 14.0);
  if (i == 2) return vec3(12.0, 1.4, 26.0);
  if (i == 3) return vec3(-3.0, 0.7, 36.0);
  return vec3(18.0, 1.1, 2.0);
}

// what stands on the ground: 1 the pod, 2 its dish (until taken), 3 the fronds, 4 rock, and the envoy
// (the suit's materials, 19 and up)
vec2 objects(vec3 p){
  vec2 r = huPlayer(p, uB[1].y);
  // the pod, on its side where it came down, half sunk in the dust
  vec3 q = p - vec3(3.0, terrain(vec2(3.0, -4.0)) + 0.15, -4.0);
  r = opU(r, vec2(length(q - vec3(clamp(q.x, -0.9, 0.9), 0.0, 0.0)) - 0.5, 1.0));
  // the dish by it: a shallow bowl on a stub, until it is taken
  if (uB[0].y < 0.5){
    vec3 d = p - vec3(1.6, terrain(vec2(1.6, -3.0)) + 0.55, -3.0);
    float dish = max(length(d.xz) - 0.65, abs(d.y - 0.12*dot(d.xz, d.xz)) - 0.03);
    r = opU(r, vec2(min(dish, sdCone(d, vec3(0.0, -0.55, 0.0), vec3(0.0), 0.05, 0.05)), 2.0));
  }
  for (int i = 0; i < 6; i++){
    vec2 c = frondAt(i);
    vec3 f = p - vec3(c.x, terrain(c), c.y);
    if (dot(f.xz, f.xz) > 4.0) continue;
    float fr = 1e9;
    for (int k = 0; k < 4; k++){
      float fk = float(k) + float(i)*0.7;
      vec3 tip = vec3(sin(fk*2.1)*0.55, 1.3 + 0.35*cos(fk*1.3), cos(fk*2.1)*0.55);
      fr = min(fr, sdCone(f, vec3(0.0, -0.1, 0.0), tip, 0.09, 0.015));
    }
    r = opU(r, vec2(fr, 3.0));
  }
  for (int i = 0; i < 5; i++){
    vec3 c = rockAt(i);
    vec3 g = p - vec3(c.x, terrain(c.xz) + c.y*0.3, c.z);
    r = opU(r, vec2(length(g/vec3(1.0, 0.7, 0.85))*0.7 - c.y, 4.0));
  }
  return r;
}

// the sky: pale and warm, the star low behind, the moon high ahead with its seas
vec3 sky(vec3 rd){
  float y = rd.y;
  vec3 col = mix(SAND, CREAM, smoothstep(-0.05, 0.22, y));
  col = mix(col, CHALK, smoothstep(0.22, 0.9, y));
  // thin high streaks, in bands
  float streak = step(0.62, fbm3(vec3(rd.x*3.0, rd.y*14.0, rd.z*3.0) + 2.0))*smoothstep(0.05, 0.3, y)*smoothstep(0.8, 0.4, y);
  col = mix(col, LINEN, 0.5*streak);
  float s = dot(rd, SUN);
  col += GLOW*smoothstep(0.9975, 0.9992, s) + EMBER*0.2*pow(max(s, 0.0), 40.0);
  float m = dot(rd, MOON);
  if (m > cos(MOON_R)){
    vec3 across = normalize(rd - MOON*m);
    // the seas in steps, the lit side toward the star
    float sea = step(0.52, fbm3(rd*38.0));
    float lit = 0.55 + 0.45*smoothstep(-0.3, 0.3, dot(across*sqrt(1.0 - m*m)/sin(MOON_R), SUN));
    col = mix(BONE, STONE, sea)*lit;
  }
  return col;
}

// a few steps toward the star: in the ground's own shadow or not
float shadow(vec3 p){
  for (int i = 1; i <= 5; i++){
    float d = float(i*i)*0.7;
    vec3 q = p + SUN*d;
    if (terrain(q.xz) > q.y) return 0.35;
  }
  return 1.0;
}

vec3 terrainNormal(vec2 p){
  float e = 0.12;
  return normalize(vec3(terrain(p - vec2(e, 0.0)) - terrain(p + vec2(e, 0.0)), 2.0*e, terrain(p - vec2(0.0, e)) - terrain(p + vec2(0.0, e))));
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frameUV(frag);

  float yaw = uQ.z + uLook.x*0.11;
  float pitch = uQ.w - uLook.y*0.06;
  vec3 fwd = vec3(sin(yaw)*cos(pitch), sin(pitch), cos(yaw)*cos(pitch));
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 up = cross(fwd, right);
  float cr = cos(uQ.x*ROLL), sr = sin(uQ.x*ROLL);
  vec3 rr = right*cr - up*sr;
  up = up*cr + right*sr;
  right = rr;
  vec3 rd = normalize(uv.x*right + uv.y*up + FOCAL*fwd);
  vec3 ro = vec3(uQ.y, uB[0].x + uP.y, uP.x) + right*uQ.x;

  // the march: the ground by height, what stands on it by distance
  float t = 0.0, dt = 0.08, lh = 0.0, ly = 0.0;
  vec3 p = ro;
  vec2 obj = vec2(1e9, 0.0);
  bool ground = false;
  for (int i = 0; i < 170; i++){
    p = ro + rd*t;
    float h = terrain(p.xz);
    if (p.y < h){
      t = t - dt + dt*(ly - lh)/((ly - lh) - (p.y - h) + 1e-6);
      p = ro + rd*t;
      ground = true;
      break;
    }
    vec2 o = objects(p);
    if (o.x < 0.02){ obj = o; break; }
    lh = h; ly = p.y;
    dt = clamp(0.014*t + 0.06, 0.06, 4.0);
    dt = min(dt, max(o.x, 0.03));
    t += dt;
    if (t > FAR) break;
  }
  bool hitObj = obj.y > 0.5;
  bool sky_ = !ground && !hitObj;

  // the lake: the water plane where the ground is under it
  bool under = ro.y < WATER;
  float tw = rd.y != 0.0 ? (WATER - ro.y)/rd.y : -1.0;
  vec3 pw = ro + rd*tw;
  bool water = tw > 0.0 && (sky_ || tw < t) && terrain(pw.xz) < WATER && bowl(pw.xz) > 0.3;

  vec3 n = vec3(0.0, 1.0, 0.0);
  vec3 col;
  if (sky_ && !water){
    col = sky(rd);
    t = FAR;
  } else {
    if (ground) n = terrainNormal(p.xz);
    else if (hitObj){
      vec2 e = vec2(0.01, 0.0);
      n = normalize(vec3(objects(p + e.xyy).x - objects(p - e.xyy).x, objects(p + e.yxy).x - objects(p - e.yxy).x, objects(p + e.yyx).x - objects(p - e.yyx).x));
    }
    vec3 base;
    float gloss = 0.0;
    if (ground){
      float slope = 1.0 - n.y;
      float patch = fbm3(p*0.35);
      base = mix(STONE, BONE, step(0.5, patch));
      // wind ripples across the flat dust, in lines
      float ripple = step(0.6, fract((p.x*0.35 + p.z*0.9 + 0.8*noise3(p*0.25))*2.2));
      base = mix(base, mix(base, ASH, 0.16), ripple*smoothstep(0.16, 0.04, slope));
      base = mix(base, mix(BASALT, SHALE, step(0.5, fbm3(p*0.9 + 3.0))), smoothstep(0.2, 0.42, slope));
      // mud round the shore, a pale cap on the ridge
      base = mix(base, CLAY, smoothstep(1.4, 0.2, p.y - WATER)*step(0.08, bowl(p.xz)));
      base = mix(base, CHALK, 0.5*smoothstep(8.0, 11.0, p.y));
    } else if (obj.y > 18.5){
      // the suit: its white skin, hard white parts, lines of light, dark seams and soles
      if (obj.y < 19.5){ base = mix(SILVER, STAR, 0.55); gloss = 0.7; }
      else if (obj.y < 26.5){ base = PITCH; gloss = 0.0; }
      else if (obj.y < 27.5){ base = mix(SILVER, STAR, 0.3); gloss = 0.3; }
      else base = GRAPHITE*0.5;
    } else if (obj.y < 1.5){ base = mix(PEWTER, SILVER, 0.5); gloss = 0.6; }
    else if (obj.y < 2.5){ base = SILVER; gloss = 0.8; }
    else if (obj.y < 3.5) base = uB[0].z > 0.5 ? mix(SHALE, FOAM, step(1.0, p.y - terrain(p.xz))) : ASH;
    else base = mix(BASALT, RUST, step(0.5, fbm3(p*1.3)));
    float sh = ground ? shadow(p + n*0.2) : 1.0;
    float diff = max(dot(n, SUN), 0.0)*sh;
    // the suit, white under a pale sky, takes far more of the sky's light than the dust does
    float skyLit = obj.y > 18.5 ? 0.75*(0.6 + 0.4*n.y) : 0.32;
    col = base*(mix(SAND, CHALK, 0.5)*skyLit + GLOW*0.95*diff);
    if (hitObj && obj.y > 25.5 && obj.y < 26.5) col = mix(RIME, STAR, 0.75)*1.4;
    col += gloss*GLOW*pow(max(dot(reflect(rd, n), SUN), 0.0), 30.0)*0.6;
    if (water){
      // the surface: the sky in it, the bottom's tint through it
      vec3 wn = normalize(vec3(0.0, 1.0, 0.0) + 0.02*vec3(sin(pw.x*2.1 + uTime*0.4), 0.0, cos(pw.z*1.7 + uTime*0.3)));
      float fres = pow(1.0 - max(dot(wn, -rd), 0.0), 3.0);
      col = mix(mix(DEEP, TIDE, 0.6), sky(reflect(rd, wn)), 0.08 + 0.55*fres);
      // a line of foam where the water meets the ground
      float shore = WATER - terrain(pw.xz);
      col = mix(col, FOAM, step(shore, 0.12)*step(0.0, shore));
      col += GLOW*pow(max(dot(reflect(rd, wn), SUN), 0.0), 60.0)*0.5;
      t = tw;
      n = wn;
    }
  }
  if (under){
    // under the lake: the water's own dark, the surface a pale ceiling
    float d = sky_ || (tw > 0.0 && tw < t) ? tw : t;
    if (tw > 0.0 && tw < t && rd.y > 0.0){ col = mix(FOAM, LINEN, 0.5); t = tw; }
    col = mix(col, mix(DEEP, BRINE, 0.5), 1.0 - exp(-d*0.14));
  } else {
    col = mix(col, mix(SAND, CREAM, 0.6), (1.0 - exp(-t*0.011))*0.8);
  }

  // the scanner: a line sweeping down the view, lighting the fronds it has passed
  if (uP.z > 0.0){
    float line = 0.5 - uP.z;
    col = mix(col, GLOW, 0.9*step(abs(uv.y - line), 0.005));
    if (hitObj && obj.y > 2.5 && obj.y < 3.5 && uv.y > line) col = mix(col, EMBER, uB[0].z > 0.5 ? 0.7 : 0.25);
  }

  vec4 hd = hands(uv);
  col = hdVisor(mix(col, hd.rgb, hd.a), uv);
  gl_FragColor = edgeCell(snapIndex(col, frag), t, n, hd.a < 0.5);
}

// Shot 5: the chamber. The camera sits low at the back of the hall; the swollen sun through the
// window wall is the only light, so everything in the room is a silhouette with a lit rim.
// Back to front: the dead city and the sun through the glass, the far wall with its columns,
// banners and the emblem oculus, the coffered vault, the beams, the speaker on the
// rostrum, five tiers of delegates split by two aisles.
// uP = (hands clock s, stepped; dust clock s, stepped; first hand at s; span of the waves s)
// uQ = (speaker's arm stage 0..2, -, the push down the aisle 0..1, -)

const vec3 PITCH = vec3(13.0, 15.0, 22.0)/255.0;
const vec3 SOOT  = vec3(17.0, 21.0, 31.0)/255.0;
const vec3 RUST  = vec3(84.0, 46.0, 44.0)/255.0;
const vec3 GARNET = vec3(104.0, 52.0, 66.0)/255.0;
const vec3 BRICK = vec3(141.0, 68.0, 51.0)/255.0;
const vec3 FLARE = vec3(174.0, 92.0, 62.0)/255.0;
const vec3 AMBER = vec3(190.0, 108.0, 70.0)/255.0;
const vec3 DUNE  = vec3(202.0, 130.0, 87.0)/255.0;
const vec3 EMBER = vec3(255.0, 189.0, 46.0)/255.0;
const vec3 GLOW  = vec3(255.0, 231.0, 196.0)/255.0;

// the window wall: tall arches. The swollen sun is wider than the wall: its limb crosses the
// outer windows, the middle ones look straight into the photosphere.
const vec2  SUN = vec2(0.0, -0.06);
const float SUN_R = 0.44;
const float SILL = -0.24;
const float WIN_TOP = 0.19;
const float WIN_W = 0.058;
const float WIN_PITCH = 0.2;
const float MULLION = 0.0045;
const float COL_W = 0.03;
const int   RAY_STEPS = 24;
// the emblem: a round oculus over the middle arch, its grille the Confederate's globe and laurel
const vec2  OC = vec2(0.0, 0.365);
const float OC_R = 0.05;
// eye level: the far tiers' heads converge on it, so they stand against the glass
const float HORIZON = 0.09;
const int   TIERS = 5;
// the hall as a box under a flattened barrel vault: the far wall at Z_WALL, the vault springing at
// VAULT_Y with half-width VAULT_A and rise VAULT_B, all in eye-height units; FOCAL is the lens
const float Z_WALL = 6.0;
const float FOCAL = 1.2;
const float VAULT_Y = 1.05;
const float VAULT_A = 3.6;
const float VAULT_B = 0.76;
// light off the huge low disc climbs steeply through the oculus and lands on the crown
const float BEAM_CLIMB = 0.9;

float pb_y(vec2 p){ return p.y; }

float windowSD(vec2 p){
  float xi = clamp(floor(p.x/WIN_PITCH + 0.5), -3.0, 3.0);
  vec2 q = vec2(p.x - xi*WIN_PITCH, p.y);
  float body = sdBox(q - vec2(0.0, (SILL + WIN_TOP)*0.5), vec2(WIN_W, (WIN_TOP - SILL)*0.5));
  float arch = length(q - vec2(0.0, WIN_TOP)) - WIN_W;
  return min(body, arch);
}

// glass: the arch cut by its mullion and two transoms
float windowMask(vec2 p){
  float m = step(windowSD(p), 0.0);
  float xi = clamp(floor(p.x/WIN_PITCH + 0.5), -3.0, 3.0);
  float qx = p.x - xi*WIN_PITCH;
  m *= step(MULLION, abs(qx));
  m *= step(MULLION, abs(p.y - 0.08));
  m *= step(MULLION, abs(p.y + 0.1));
  return m;
}

float star5(vec2 p, float r){
  // folded into one of five wedges, then a line from the tip to the notch
  float a = atan(p.x, p.y);
  float w = 6.2831853/5.0;
  a = mod(a + w*0.5, w) - w*0.5;
  vec2 q = length(p)*vec2(abs(sin(a)), cos(a));
  vec2 tip = vec2(0.0, r), notch = vec2(r*0.38*sin(w*0.5), r*0.38*cos(w*0.5));
  vec2 e = notch - tip, v = q - tip;
  float h = clamp(dot(v, e)/dot(e, e), 0.0, 1.0);
  float s = sign(e.x*v.y - e.y*v.x);
  return length(v - e*h)*s;
}

// Where the oculus grille lets light through: the gaps of the globe, the laurel leaves, the star.
float emblemOpen(vec2 p){
  vec2 c = p - OC;
  float r = length(c);
  if (r > OC_R) return 0.0;
  float bw = 0.0028;
  float rg = 0.03;
  float open = 0.0;
  if (r < rg - bw*1.4){
    float bars = step(abs(c.y), bw) + step(abs(abs(c.y) - rg*0.52), bw) + step(abs(c.x), bw);
    float mer = sqrt(max(0.0, 1.0 - (c.y/rg)*(c.y/rg)));
    bars += step(abs(abs(c.x) - rg*0.55*mer), bw);
    open = step(bars, 0.0);
  }
  // laurel: leaves round the globe, two branches meeting at a knot below, the star above
  float ang = atan(c.x, c.y);
  float mid = rg + 0.012, hw = 0.0085;
  if (abs(r - mid) < hw && abs(ang) > 0.42 && abs(ang) < 2.85){
    float a = fract(abs(ang)*2.9) - 0.5;
    float rr = (r - mid)/hw;
    open = max(open, step(length(vec2(a*2.4, rr - a*1.1)), 0.78));
  }
  open = max(open, step(star5(c - vec2(0.0, 0.041), 0.0105), 0.0));
  return open;
}

// the sky through the glass: dust, the disc, its glow, and the dead city standing against it
vec3 sky(vec2 p){
  // heat off the stone and the disc: the far view swims a little on the dust clock
  p.x += 0.0016*sin(p.y*140.0 + uP.y*5.0 + fbm2(p*30.0)*4.0);
  float h = clamp((p.y - SILL)/(WIN_TOP + 0.3 - SILL), 0.0, 1.0);
  vec3 c = mix(FLARE, RUST*0.75, h*h);
  float bands = fbm2(vec2(p.x*2.5, p.y*16.0 + 3.0));
  c *= 0.78 + 0.44*bands;
  float d = length(p - SUN);
  // the limb boils: the edge wanders with the same noise as the granulation
  float edge = SUN_R + 0.012*(fbm2(vec2(atan(p.y - SUN.y, p.x - SUN.x)*3.0, uP.y*0.05)) - 0.5);
  float disc = step(d, edge);
  float limb = smoothstep(edge, edge*0.35, d);
  float gran = fbm2(p*22.0 + vec2(0.0, uP.y*0.02));
  float lanes = smoothstep(0.35, 0.6, gran);
  vec3 sunc = mix(BRICK*1.35, mix(AMBER, EMBER, 0.6), limb*(0.5 + 0.5*lanes));
  float band = 0.5 + 0.5*sin(p.y*150.0 + fbm2(vec2(p.x*9.0, p.y*40.0))*5.0);
  sunc *= 1.0 - 0.3*band*smoothstep(0.55, -0.3, (p.y - SUN.y)/SUN_R);
  c = mix(c, sunc, disc);
  c += AMBER*exp(-max(d - edge, 0.0)*12.0)*0.8*(1.0 - disc);

  // The city: two rows of towers, the far one lost in the haze, a plaza left open behind the
  // rostrum so the speaker reads. Dead windows, a few beacons still blinking on the roofs.
  vec3 haze = mix(RUST, FLARE, 0.55);
  for (int L = 0; L < 2; L++){
    float fl = float(L);
    float w = mix(0.011, 0.017, fl);
    float cx = floor(p.x/w);
    float hh = hash12(vec2(cx, 11.0 + fl*5.0));
    float plaza = smoothstep(0.03, 0.16, abs(p.x));
    float top = mix(0.06, 0.075, fl) + (hh*hh)*mix(0.075, 0.06, fl)*plaza - (1.0 - plaza)*0.05;
    // a spire on one tower in six
    float fx = fract(p.x/w);
    if (hash12(vec2(cx, 3.0 + fl)) > 0.83) top += 0.035*step(abs(fx - 0.5), 0.12);
    // stepped setbacks near the roof
    top -= 0.008*step(abs(fx - 0.5), 0.5)*step(0.5, hash12(vec2(cx, 7.0)))*step(0.34, abs(fx - 0.5));
    if (p.y < top){
      vec3 tower = mix(haze*0.72, RUST*0.4, fl);
      tower *= 0.9 + 0.12*step(0.5, fract(p.y*260.0))*step(0.2, abs(fx - 0.5));
      c = mix(c, tower, 1.0);
      // beacons on the tallest roofs, blinking on the dust clock
      vec2 bq = vec2(p.x - (cx + 0.5)*w, p.y - top + 0.004);
      float on = step(0.5, fract(uP.y*0.5 + hh*3.7));
      if (hh > 0.7) c += EMBER*step(length(bq*vec2(1.0, 1.4)), 0.0025)*on*0.9;
    }
  }
  // transports crossing the haze, their lamps the only thing moving out there
  for (int k = 0; k < 3; k++){
    float fk = float(k);
    float x = fract(hash11(fk + 2.0) + uP.y*(0.012 + 0.01*fk)*(mod(fk, 2.0) < 0.5 ? 1.0 : -1.0))*1.6 - 0.8;
    float y = 0.16 + 0.05*fk + 0.01*sin(uP.y*0.4 + fk);
    c += GLOW*step(length((p - vec2(x, y))*vec2(0.7, 1.4)), 0.0026);
  }
  return c;
}

// Columns between the arches: fluted drums, lit on both flanks by the windows either side.
float columnAt(vec2 p, out float qx){
  float xi = floor(p.x/WIN_PITCH);
  qx = p.x - (xi + 0.5)*WIN_PITCH;
  float cap = step(abs(p.y - 0.232), 0.012)*step(abs(qx), COL_W*1.35);
  return max(step(abs(qx), COL_W)*step(p.y, 0.245), cap);
}

vec3 wall(vec2 p, float lit){
  float tex = fbm2(p*26.0);
  vec3 c = SOOT*(0.55 + 0.6*tex);
  // courses of stone, faint
  c *= 0.9 + 0.12*step(0.08, fract(p.y*55.0));
  float cornice = step(abs(p.y - 0.258), 0.006);
  c *= 1.0 + 0.8*cornice;
  float d = max(windowSD(p), 0.0);
  c += FLARE*exp(-d*22.0)*0.4 + RUST*0.28*smoothstep(0.45, -0.1, pb_y(p));
  // the oculus moulding catches what comes through it
  float r = length(p - OC);
  float ring = step(OC_R, r)*step(r, OC_R + 0.008);
  c = mix(c, mix(SOOT, FLARE, 0.45), ring);
  c += FLARE*exp(-max(r - OC_R, 0.0)*40.0)*0.35*(1.0 - ring);
  return c;
}

// The vault: a ray from the eye up into the flattened barrel. Returns the colour, or a < 0 alpha
// when the pixel is still on the far wall.
vec4 vault(vec2 p){
  vec3 d = vec3(p.x, p.y - HORIZON, FOCAL);
  float a = (d.x/VAULT_A)*(d.x/VAULT_A) + (d.y/VAULT_B)*(d.y/VAULT_B);
  float b = -2.0*d.y*VAULT_Y/(VAULT_B*VAULT_B);
  float cc = (VAULT_Y/VAULT_B)*(VAULT_Y/VAULT_B) - 1.0;
  float disc = b*b - 4.0*a*cc;
  if (disc < 0.0){
    // past the vault's flank: the side wall, in the dark
    return p.y > HORIZON + FOCAL*VAULT_Y/Z_WALL ? vec4(SOOT*0.4, 1.0) : vec4(0.0, 0.0, 0.0, -1.0);
  }
  float t = (-b + sqrt(disc))/(2.0*a);
  vec3 P = d*t;
  if (P.z > Z_WALL || P.y < VAULT_Y) return vec4(0.0, 0.0, 0.0, -1.0);
  // coffers: sixteen round the arch, a row every 0.55 along the hall
  float phi = atan((P.y - VAULT_Y)/VAULT_B, P.x/VAULT_A);
  vec2 g = vec2(phi/3.14159*16.0, P.z/0.55);
  vec2 f = fract(g);
  float rib = step(min(f.x, f.y), 0.14);
  float inner = step(min(min(f.x, f.y), min(1.0 - f.x, 1.0 - f.y)), 0.3);
  // bounce from the glowing wall: nothing near the eye, a warm dusk toward the far end
  float bounce = smoothstep(1.5, Z_WALL, P.z);
  vec3 c = SOOT*0.55 + RUST*0.5*bounce;
  c *= rib > 0.5 ? 1.25 : (inner > 0.5 ? 0.85 : 0.6);
  // the rib's face toward the wall catches it
  c += FLARE*0.22*bounce*step(0.86, f.y)*(1.0 - rib);
  // the emblem's light, thrown up onto the crown through the oculus
  vec2 Q = vec2(P.x, P.y - BEAM_CLIMB*(Z_WALL - P.z));
  vec2 qs = vec2(Q.x*FOCAL/Z_WALL, HORIZON + Q.y*FOCAL/Z_WALL);
  float pat = emblemOpen(qs);
  float pool = exp(-pow(length(qs - OC)/OC_R, 2.0)*1.2);
  c += mix(FLARE, DUNE, 0.5)*(pat*0.75 + pool*0.12);
  // fall into darkness toward the eye
  c *= 0.35 + 0.65*bounce;
  return vec4(c, 1.0);
}

// screen-space beams: what the glass and the oculus let through, gathered toward the sun
float rays(vec2 p){
  vec2 dir = SUN - p;
  float acc = 0.0, w = 1.0;
  for (int i = 0; i < RAY_STEPS; i++){
    vec2 s = p + dir*((float(i) + 0.5)/float(RAY_STEPS));
    float bright = 0.3 + 0.7*exp(-length(s - SUN)*2.5);
    float through = max(step(windowSD(s), 0.0), step(length(s - OC), OC_R)*0.8);
    acc += through*bright*w;
    w *= 0.955;
  }
  return acc/float(RAY_STEPS);
}

// A banner hung on each column, swaying a little from its rod: dark cloth, a swallowtail, a disc.
float banner(vec2 p, float lit, out float edge){
  float xi = floor(p.x/WIN_PITCH);
  float cx = (xi + 0.5)*WIN_PITCH;
  float top = 0.22, len = 0.22;
  float down = clamp((top - p.y)/len, 0.0, 1.0);
  float sway = 0.004*sin(uTime*0.55 + xi*1.9)*down*down;
  float qx = p.x - cx - sway;
  float w = 0.017;
  float tail = top - len + 0.018*(1.0 - abs(qx)/w);
  float m = step(abs(qx), w)*step(p.y, top)*step(tail, p.y);
  edge = m*step(w - 0.0025, abs(qx));
  return m;
}

// --- people, as silhouettes: every part a small SDF, joined by min()
vec2 rot2(vec2 v, float a){ float c = cos(a), sn = sin(a); return vec2(c*v.x - sn*v.y, sn*v.x + c*v.y); }
float sdEll(vec2 q, vec2 r){ return (length(q/r) - 1.0)*min(r.x, r.y); }
// a torso: half-width w0 at y0 widening to w1 at y1
float sdTrap(vec2 q, float y0, float y1, float w0, float w1){
  float w = mix(w0, w1, clamp((q.y - y0)/(y1 - y0), 0.0, 1.0));
  return max(abs(q.x) - w, max(y0 - q.y, q.y - y1));
}
// An open hand off the wrist along `dir`: palm, the fingers together, the thumb on side `ts`.
float sdHand(vec2 q, vec2 wrist, vec2 dir, float z, float ts){
  vec2 l = vec2(dot(q - wrist, vec2(dir.y, -dir.x)), dot(q - wrist, dir));
  float palm = sdRBox(l - vec2(0.0, 0.55*z), vec2(0.45*z, 0.55*z), 0.22*z);
  float fingers = sdRBox(l - vec2(0.03*z, 1.5*z), vec2(0.38*z, 0.52*z), 0.2*z);
  float thumb = sdSeg(l, vec2(ts*0.36*z, 0.45*z), vec2(ts*1.05*z, 0.95*z), 0.17*z);
  return min(min(palm, fingers), thumb);
}
// An arm from the shoulder: the upper arm at a1 from vertical (outward on `side`), the forearm at a2.
float sdArm(vec2 q, vec2 sh, float a1, float a2, float side, float s, float hz){
  vec2 el = sh + 0.031*s*vec2(side*sin(a1), cos(a1));
  vec2 wr = el + 0.027*s*vec2(side*sin(a2), cos(a2));
  float d = min(sdSeg(q, sh, el, 0.0058*s), sdSeg(q, el, wr, 0.0047*s));
  return min(d, sdHand(q, wr, normalize(wr - el), 0.0095*s*hz, -side));
}

// A head and what is on it, seen from behind. hc the centre, turn -1..1 how far it looks round.
float sdHead(vec2 q, vec2 hc, float s, float hair, float turn){
  vec2 r = vec2(0.0118, 0.0145)*s;
  float d = sdEll(q - hc, r);
  float look = sign(turn)*step(0.3, abs(turn));
  if (look != 0.0){
    // in profile: the nose and the chin break the outline on the side it looks to
    d = min(d, length(q - hc - vec2(look*0.0118*s, -0.001*s)) - 0.0032*s);
    d = min(d, sdEll(q - hc - vec2(look*0.0075*s, -0.0108*s), vec2(0.0062, 0.0042)*s));
  } else if (hair < 0.45){
    // short hair: the ears show
    d = min(d, sdEll(vec2(abs(q.x - hc.x) - 0.0122*s, q.y - hc.y + 0.001*s), vec2(0.0024, 0.0042)*s));
  }
  if (hair > 0.45 && hair < 0.66){
    // long hair down over the collar
    d = min(d, sdRBox(q - hc - vec2(0.0, -0.013*s), vec2(0.0118*s, 0.014*s), 0.006*s));
  } else if (hair >= 0.66 && hair < 0.76){
    d = min(d, length(q - hc - vec2(0.0, 0.016*s)) - 0.0058*s);            // a bun
  } else if (hair >= 0.76 && hair < 0.85){
    // a hood: wider, peaked, falling to the shoulders
    d = min(sdEll(q - hc - vec2(0.0, 0.002*s), vec2(0.0165, 0.0185)*s),
            sdTrap(q - hc, -0.03*s, -0.002*s, 0.02*s, 0.013*s));
  } else if (hair >= 0.85 && hair < 0.92){
    // a cap: a flatter crown and a brim
    d = min(d, sdEll(q - hc - vec2(0.0, 0.008*s), vec2(0.0128, 0.0085)*s));
    d = min(d, sdRBox(q - hc - vec2(0.004*s, 0.0055*s), vec2(0.0165*s, 0.0022*s), 0.001*s));
  }
  return d;
}

// The speaker, standing behind the lectern: coat, sloped shoulders, a head, the left hand on the
// lectern and the right arm coming up in stages to an open hand above the head.
float speaker(vec2 p, float stage){
  float s = 0.95;
  vec2 q = p - vec2(0.004, 0.052);
  float d = sdTrap(q, 0.0, 0.081*s, 0.019*s, 0.02*s);                        // the coat
  d = min(d, sdTrap(q, 0.0, 0.02*s, 0.024*s, 0.019*s));                      // its skirt
  d = min(d, sdSeg(q, vec2(-0.007, 0.08)*s, vec2(-0.021, 0.071)*s, 0.0062*s));
  d = min(d, sdSeg(q, vec2(0.007, 0.08)*s, vec2(0.021, 0.071)*s, 0.0062*s));
  d = min(d, sdBox(q - vec2(0.0, 0.084*s), vec2(0.0055, 0.008)*s));
  // a plain head: at this distance ears read as a hat
  d = min(d, sdHead(q, vec2(0.0, 0.099*s), s*0.82, 0.95, 0.0));
  // the left hand forward onto the lectern's edge
  vec2 lel = vec2(-0.025, 0.05)*s;
  d = min(d, sdSeg(q, vec2(-0.021, 0.071)*s, lel, 0.0058*s));
  d = min(d, sdSeg(q, lel, vec2(-0.012, 0.034)*s, 0.0048*s));
  float a1 = stage < 0.5 ? 2.9 : (stage < 1.5 ? 1.35 : 0.3);
  float a2 = stage < 0.5 ? 3.0 : (stage < 1.5 ? 0.25 : 0.08);
  // shoulder to wrist about a third of his height, the hand to scale
  return step(min(d, sdArm(q, vec2(0.021, 0.071)*s, a1, a2, 1.0, s*0.72, 1.0)), 0.0);
}

// One seat: its back, and whoever sits in it. q is relative to the seat centre on the tier's edge.
float seat(vec2 q, float i, float k, float s, float pitch, float uc, float clock, float from, float span){
  float h = hash12(vec2(i, k*7.0 + 1.0));
  float h2 = hash12(vec2(i*3.0 + 5.0, k));
  float h3 = hash12(vec2(i*1.7 + 9.0, k*3.0 + 2.0));
  float hair = hash12(vec2(i*2.3 + 1.0, k*5.0 + 4.0));
  float build = 0.86 + 0.3*hash12(vec2(i, k + 11.0));
  bool aisle = abs(abs(uc) - 0.34*s) < 0.03*s;
  float d = 1e5;
  // the aisles are empty but for someone standing in one now and then
  if (aisle && h < 0.8) return d;
  if (!aisle){
    d = sdRBox(q - vec2(0.0, 0.016*s), vec2(pitch*0.43, 0.016*s), 0.005*s);   // the seat back
    if (h3 < 0.05) return d;                                                   // an empty seat
  }
  bool standing = aisle || h3 < 0.12;
  float up = standing ? 0.032*s : (hash12(vec2(i, k + 21.0)) - 0.5)*0.008*s;
  // the talkers: a pair leans in and turns to each other on a slow stepped beat
  float side = h < 0.5 ? -1.0 : 1.0;
  bool talker = h2 > 0.8 && h2 < 0.9;
  float lean = talker ? side*0.2 : (h - 0.5)*0.12;
  vec2 l = rot2(q - vec2(0.0, 0.015*s), -lean) + vec2(0.0, 0.015*s) - vec2(0.0, up);
  float turn = talker ? side : (h > 0.72 ? floor(hash12(vec2(i, floor(clock*0.5 + h*7.0)))*2.999) - 1.0 : 0.0);

  float w1 = 0.021*s*build;
  d = min(d, sdTrap(l, standing ? -0.02*s : 0.012*s, 0.054*s, 0.016*s*build, w1));
  d = min(d, sdSeg(l, vec2(-0.0075*s, 0.061*s), vec2(-w1, 0.052*s), 0.0062*s));
  d = min(d, sdSeg(l, vec2(0.0075*s, 0.061*s), vec2(w1, 0.052*s), 0.0062*s));
  d = min(d, sdBox(l - vec2(0.0, 0.064*s), vec2(0.0052*s, 0.008*s)));
  d = min(d, sdHead(l, vec2(turn*0.0015*s, 0.079*s), s, hair, turn));
  // a couple: one arm round the neighbour's shoulders
  if (talker && h3 > 0.5){
    vec2 a0 = vec2(side*w1, 0.053*s);
    vec2 a1 = vec2(side*pitch*0.62, 0.064*s);
    vec2 a2 = vec2(side*(pitch + 0.012*s), 0.054*s);
    d = min(d, min(sdSeg(l, a0, a1, 0.0055*s), sdSeg(l, a1, a2, 0.005*s)));
  }
  // the vote: a sweep along the tier, tiers staggered, a few never voting, couples busy
  float sweep = mod(k, 2.0) < 0.5 ? fract(uc*0.75 + 0.5) : fract(-uc*0.75 + 0.5);
  float when = from + span*(0.12*k + 0.5*sweep + h2*0.14);
  float stage = (h2 > 0.93 || talker) ? 0.0 : clamp(floor((clock - when)*4.0) + 1.0, 0.0, 2.0);
  if (stage > 0.0){
    // the arm goes up in two stepped stages, each voter at their own angle, swaying on the clock
    float sway = 0.06*sin(clock*1.7 + h*6.2831);
    float a1 = stage < 1.5 ? 1.3 : 0.25 + 0.4*h3 + sway;
    float a2 = stage < 1.5 ? 0.15 : 0.04 + 0.2*hair + sway;
    d = min(d, sdArm(l, vec2(side*w1*0.9, 0.054*s), a1, a2, side, s, 1.0));
  }
  return d;
}

// One tier of delegates seen from behind: the dark front of the tier and, above it, the people.
// Each pixel looks at its own seat and the two beside it, so a lean or an arm can cross over.
float tier(vec2 p, float s, float base0, float curve, float k, float clock, float from, float span){
  float base = base0 + curve*p.x*p.x;
  float body = step(p.y, base);
  if (p.y < base || p.y > base + 0.17*s) return body;
  float pitch = 0.052*s;
  float i0 = floor(p.x/pitch - 0.37*k);
  float d = 1e5;
  for (int j = -1; j <= 1; j++){
    float i = i0 + float(j);
    float uc = (i + 0.5 + 0.37*k)*pitch;
    d = min(d, seat(vec2(p.x - uc, p.y - base), i, k, s, pitch, uc, clock, from, span));
  }
  return max(body, step(d, 0.0));
}

// The push down the aisle. Every layer is scaled about the horizon by its own depth (the wall at
// PUSH_WALL, the tiers nearer), the camera rises so near tiers sink out of frame faster than far
// ones, and a small tilt keeps the emblem in shot. Mirrored in constants/intro/chamber.js.
const float PUSH_WALL = 11.0;
const float PUSH_DIST = 2.4;
const float PUSH_TILT = 0.08;
const float PUSH_RISE = 0.06;

// a layer at depth z, seen from the pushed camera: back into the layer's own frame units
vec2 pushed(vec2 uv, float z, float D){
  float c = D*PUSH_DIST;
  float s = z/(z - c);
  float shift = -PUSH_TILT*D - PUSH_RISE*D*(PUSH_WALL - PUSH_DIST*D)/(z - c);
  vec2 T = vec2(0.0, HORIZON);
  return T + (uv - T - vec2(0.0, shift))/s;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frameUV(frag);
  float D = uQ.z;
  // the room leans against the cursor: the far wall hardly at all, the near tiers the most
  vec2 lean = vec2(uLook.x, -uLook.y);
  float sWall = PUSH_WALL/(PUSH_WALL - PUSH_DIST*D);
  vec2 pb = pushed(uv, PUSH_WALL, D) - lean*0.004;

  vec3 col;
  float glass = 0.0;
  vec4 vlt = vault(pb);
  if (vlt.a > 0.0){
    col = vlt.rgb;
  } else {
    glass = windowMask(pb);
    float emb = emblemOpen(pb);
    float light = max(glass, emb);
    col = mix(wall(pb, light), sky(pb), light);
    // columns and their banners stand in front of the wall, rimmed by the glass either side
    float qx;
    float colm = columnAt(pb, qx);
    if (colm > 0.0){
      float n = qx/(COL_W*1.35);
      float flank = pow(abs(n), 3.0);
      float flute = 0.85 + 0.15*step(0.5, fract(n*5.0));
      col = (SOOT*0.9 + FLARE*0.55*flank)*flute;
      col += AMBER*0.4*step(0.9, abs(n))*step(pb.y, 0.225);
    }
    float bEdge;
    float bm = banner(pb, light, bEdge);
    if (bm > 0.0){
      // deep red cloth in its own shadow, folds catching the glow from the glass either side
      float xi = floor(pb.x/WIN_PITCH);
      float bx = (pb.x - (xi + 0.5)*WIN_PITCH)/0.017;
      float fold = 0.75 + 0.35*step(0.0, sin(bx*6.0 + 1.0));
      vec3 cloth = GARNET*0.5*fold;
      // the Confederate disc and a gold band near the tail
      vec2 dq = pb - vec2((xi + 0.5)*WIN_PITCH, 0.08);
      float ring = step(abs(length(dq) - 0.0085), 0.0018);
      cloth = mix(cloth, AMBER*0.8, ring + step(abs(pb.y - 0.035), 0.002)*0.8);
      col = mix(cloth, mix(FLARE, AMBER, 0.6), bEdge*0.9);
    }
  }

  // dust hangs in the beams, streaked along them, drifting on its own clock
  float beam = rays(pb);
  vec2 toSun = pb - SUN;
  float streak = 0.6 + 0.6*fbm2(vec2(atan(toSun.y, toSun.x)*16.0, length(toSun)*3.0 - uP.y*0.04));
  float dust = 0.55 + 0.45*fbm2(pb*6.0 + vec2(uP.y*0.05, -uP.y*0.03));
  vec3 rayCol = mix(FLARE, DUNE, 0.4)*beam*dust*streak;
  col += rayCol*(1.0 - glass*0.7);
  vec2 mc = floor((pb + vec2(uP.y*0.006, uP.y*0.011))*uRes.y*0.5);
  float mote = step(0.992, hash12(mc + 3.0))*smoothstep(0.25, 0.6, beam);
  col += DUNE*mote*1.4;

  vec3 farHaze = mix(RUST, FLARE, 0.35)*0.62;
  // the speaker against the middle window, rimmed like everyone else
  float thick = 1.6/uRes.y/sWall;
  if (speaker(pb, uQ.x) > 0.0){
    float mEdge = speaker(pb + normalize(SUN - pb)*thick, uQ.x);
    float behind = dot(col, vec3(0.3, 0.5, 0.2));
    col = mix(mix(PITCH, farHaze, 0.45), mix(AMBER, GLOW, behind), (1.0 - mEdge)*(0.2 + 1.6*behind));
  }
  // the rostrum: a raised dais and a lectern
  float ros = min(sdRBox(pb - vec2(0.0, 0.025), vec2(0.07, 0.03), 0.006),
                  sdBox(pb - vec2(0.0, 0.07), vec2(0.018, 0.018)));
  col = mix(col, mix(PITCH, farHaze, 0.5) + rayCol*0.35, step(ros, 0.0));

  // the tiers, far to near
  for (int k = 0; k < TIERS; k++){
    float kf = float(k)/float(TIERS - 1);
    float s = mix(0.5, 1.3, kf*kf*0.55 + kf*0.45);
    float headY = HORIZON - 0.47*pow(kf, 1.15);
    float base = headY - 0.079*s;
    float curve = mix(0.06, 0.28, kf);
    float haze = 0.72*pow(1.0 - kf, 1.4);
    float zk = mix(9.5, 2.9, kf);
    float sk = zk/(zk - PUSH_DIST*D);
    vec2 pk = pushed(uv, zk, D) + lean*mix(0.006, 0.026, kf);
    float m = tier(pk, s, base, curve, float(k), uP.x, uP.z, uP.w);
    if (m > 0.0){
      // lit rim: the edge that faces the glass, as bright as what stands behind it
      vec2 ts = normalize(SUN - pk);
      float mEdge = tier(pk + ts*thick*sWall/sk, s, base, curve, float(k), uP.x, uP.z, uP.w);
      float behind = dot(col, vec3(0.3, 0.5, 0.2));
      float rim = (1.0 - mEdge)*(0.12 + 1.9*behind)*(1.0 - haze*0.6);
      vec3 body = mix(PITCH, farHaze, haze) + rayCol*haze*1.2;
      // the aisle stairs: step noses catching a little light, a floor lamp at each end
      float tb = base + curve*pk.x*pk.x;
      float ax = abs(abs(pk.x) - 0.34*s);
      if (ax < 0.028*s && pk.y < tb){
        float rise = (tb - pk.y)/(0.014*s);
        float nose = step(fract(rise), 0.22);
        body = mix(body, farHaze*0.9 + rayCol*0.3, nose*0.7);
        float lampA = step(length(vec2(ax - 0.024*s, (fract(rise) - 0.1)*0.014*s)), 0.0028*s);
        body += EMBER*0.8*lampA*step(rise, 6.0)*step(1.5, float(k))*step(0.5, mod(floor(rise), 2.0));
      }
      col = mix(body, mix(AMBER, GLOW, behind), rim);
    }
  }

  // the corners fall off: the only light is ahead
  col *= 1.0 - 0.3*smoothstep(0.4, 0.95, length(uv*vec2(0.8, 1.15)));
  gl_FragColor = vec4(finish(col, frag), 1.0);
}

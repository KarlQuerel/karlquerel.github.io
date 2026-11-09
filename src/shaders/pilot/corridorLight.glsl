// The corridor pilot's light, the intro corridor's (shaders/intro/corridor.frag.glsl) carried over: the
// upper lines of light (a segment each side between each pair of ribs, the three nearest the shaded point),
// the door, the weld's spark, the drone's eye, the nearest bay's light, the Earth and the sun through the
// glass span (the crew and the player shadowing the sun's), a rim on what stands in the bays, the dark
// under their feet, then the haze; and crSpaceLight() for what hangs outside the hull. All in the shader's
// frame (eye level y = 0, x mirrored from three's): crFrame() takes a world point there, crWorld() brings it
// back.
// Colours as the shader used them, the palette's sRGB values unconverted; crToLinear() hands the result
// back to three, whose pixel pass converts it again. Self-contained (no common.glsl), so a model's own
// material can take it too. CR_* layout comes from PILOT_SET as defines, the palette as constants.

uniform float uCrPlayerZ;   // the lines wake round the player
uniform float uCrClock;     // seconds, for the stepped clocks
uniform float uCrDoor;      // the door's glow, 0..1
uniform float uCrLit;       // the lockers lit, 0..1
uniform sampler2D uSunShadow;   // the crew's and the player's depth seen from the sun
uniform mat4 uSunShadowMatrix;  // three's world to that view
uniform vec2 uCrFeet[CR_FEET];  // where each of them stands, three's x and z
uniform vec4 uSpaceLamp;        // a drone's eye outside the hull: where, in the shader's frame, and how bright
varying vec3 vCrWorld;

const vec3 CR_LINE = mix(RIME, STAR, 0.75);
// the light from outside: the dying Earth's rust, and the swollen sun's
const vec3 CR_EARTH_LIGHT = mix(BRICK, AMBER, 0.55)*CR_EARTH_SHINE;
const vec3 CR_SUN_LIGHT = mix(GLOW, EMBER, 0.5)*CR_SUN_GAIN;
// the weld spark's hot white
const vec3 CR_SPARK = vec3(0.78, 0.88, 1.0);

vec3 crFrame(vec3 w){ return vec3(-w.x, w.y + CR_FLOOR, w.z); }
vec3 crWorld(vec3 p){ return vec3(-p.x, p.y - CR_FLOOR, p.z); }
vec3 crTurn(vec3 v){ return vec3(-v.x, v.y, v.z); }
float crHash(float p){ p = fract(p*0.1031); p *= p + 33.33; return fract(p*(p + p)); }
vec3 crToLinear(vec3 c){
  c = max(c, 0.0);
  return mix(c/12.92, pow((c + 0.055)/1.055, vec3(2.4)), step(0.04045, c));
}
vec3 crToSrgb(vec3 c){
  c = max(c, 0.0);
  return mix(c*12.92, 1.055*pow(c, vec3(1.0/2.4)) - 0.055, step(0.0031308, c));
}

// the lines burn brightest round the player and a few metres ahead, dim with distance, settle behind
float crLineWake(float z){ return 0.3 + 0.7*smoothstep(7.0, 0.0, abs(z - (uCrPlayerZ + 2.5)) - 2.5); }
// a segment between two ribs: now and then one buzzes
float crLineOn(float k){
  if (crHash(k*7.31 + 0.5) > 0.08) return 1.0;
  return step(0.2, crHash(k*3.7 + floor(uCrClock*9.0)));
}
bool crInSpan(float z){ return z > CR_SPAN_Z0 && z < CR_SPAN_Z1; }
// bay k is the glass span: no room, no opening, no light of its own
bool crIsSpan(float k){ return abs(k - CR_SPAN_BAY) < 0.5; }
bool crIsBlister(float k){ return abs(k - CR_BLISTER_BAY) < 0.5; }
float crBayDepth(float k){ return crIsBlister(k) ? CR_BLISTER_DEPTH : CR_BAY_DEPTH; }
// the middle of each upper cut, on this side of the corridor; along the deck's edge in the glass span
vec3 crLineAt(float sd, float z){
  if (crInSpan(z)) return vec3(sd*(CR_W - CR_CHAMFER - CR_SPAN_LINE_INSET), CR_FLOOR + 0.02, z);
  return vec3(sd*(CR_W - 0.25*CR_CHAMFER), CR_CEIL - 0.75*CR_CHAMFER, z);
}
// the sun through the span's left-hand panes: whether the ray from p toward it leaves by the glass, not
// by a rib, the ceiling or the hull either side of the span
float crSunThrough(vec3 p){
  if (CR_SUN.x >= 0.0 || p.x <= -CR_W) return 0.0;
  vec3 q = p + CR_SUN*(-CR_W - p.x)/CR_SUN.x;
  float rib = abs(fract(q.z/CR_RIB_EVERY) - 0.5)*CR_RIB_EVERY;
  return step(CR_FLOOR, q.y)*step(q.y, CR_CEIL - CR_SPAN_FRAME)*step(0.07 + CR_SPAN_FRAME, rib)
    *step(CR_SPAN_Z0, q.z)*step(q.z, CR_SPAN_Z1);
}

// whether the sun reaches p past the crew and the player, p looked up off its surface along n so a body
// never shades itself where it faces the light
float crSunShadow(vec3 p, vec3 n){
  vec4 s = uSunShadowMatrix*vec4(crWorld(p + n*CR_SHADOW_LIFT), 1.0);
  vec3 c = s.xyz/s.w*0.5 + 0.5;
  if (any(lessThan(c, vec3(0.0))) || any(greaterThan(c, vec3(1.0)))) return 1.0;
  return step(c.z - CR_SHADOW_BIAS, texture2D(uSunShadow, c.xy).x);
}
// the deck darkens round each one's feet, where the lamps hardly reach under them
float crUnderfoot(vec3 p, vec3 n){
  if (n.y < 0.5 || p.y > CR_FLOOR + 0.05) return 1.0;
  vec2 w = crWorld(p).xz;
  float lit = 1.0;
  for (int i = 0; i < CR_FEET; i++)
    lit *= 1.0 - CR_FOOT_DARK*smoothstep(CR_FOOT_RADIUS, 0.0, distance(w, uCrFeet[i]));
  return lit;
}

float crBayZ(float k){ return CR_BAY_FIRST + k*CR_BAY_EVERY; }
float crBaySide(float k){ return mod(k, 2.0) > 0.5 ? 1.0 : -1.0; }
float crBayIndex(float z){ return clamp(floor((z - CR_BAY_FIRST)/CR_BAY_EVERY + 0.5), 0.0, CR_BAYS - 1.0); }
// each bay's own light: white suit-up, cool medical, the Earth's in the glass span, a dim comms room, the
// red window
vec3 crBayTint(float k){
  if (crIsSpan(k)) return CR_EARTH_LIGHT*0.3;
  if (k < 0.5) return mix(RIME, SILVER, 0.55);
  if (k < 1.5) return mix(RIME, SILVER, 0.4)*0.8;
  if (k < 2.5) return mix(SILVER, GLOW, 0.65)*0.85;
  if (k < 3.5) return mix(FROST, RIME, 0.6)*0.7;
  return mix(BRICK, AMBER, 0.6)*0.75;
}
// the weld's spark, in bursts on its own clock
float crWeld(){ return step(0.55, crHash(floor(uCrClock*24.0))); }

// How a surface is lit, in the shader's frame: p and n its point and normal, base its colour, emit its
// own light; gloss for highlights on hard shells; bath > 0 for what stands in the corridor and its bays
// (bathed in the nearest bay's light from every side), rim for a backlit edge against that light.
vec3 crLight(vec3 p, vec3 n, vec3 base, vec3 emit, float gloss, float bath, float rim){
  vec3 ro = crFrame(cameraPosition);
  vec3 rd = normalize(p - ro);
  float t = length(p - ro);
  float k = crBayIndex(p.z);
  float bz = crBayZ(k), side = crBaySide(k);
  bool inRoom = abs(p.x) > CR_W + 0.01;
  // the spare suits in the lockers wait in the dark until the lockers come up, then lit from inside
  vec3 suitLight = vec3(0.0);
  bool inLocker = bath > 0.0 && p.z > CR_DOOR_Z - 1.0;
  if (inLocker){
    base *= mix(0.2, 1.0, uCrLit);
    emit *= mix(0.25, 1.0, uCrLit);
    suitLight = mix(RIME, SILVER, 0.6)*uCrLit*(0.35 + 0.65*max(n.y, 0.0))*0.6;
  }

  vec3 col = base*0.03*vec3(0.9, 1.0, 1.2);
  float seg = floor(p.z/CR_RIB_EVERY);
  for (int i = -1; i <= 1; i++){
    float kk = seg + float(i);
    float z0 = kk*CR_RIB_EVERY + 0.1, z1 = z0 + CR_RIB_EVERY - 0.2;
    if (z1 < CR_BACK_Z || z0 > CR_DOOR_Z) continue;
    float on = crLineOn(kk)*crLineWake(clamp(p.z, z0, z1))*(crInSpan(clamp(p.z, z0, z1)) ? CR_SPAN_LINE_GAIN : 1.0);
    for (int j = 0; j < 2; j++){
      vec3 L = crLineAt(j == 0 ? -1.0 : 1.0, clamp(p.z, z0, z1)) - p;
      float d2 = dot(L, L);
      L *= inversesqrt(d2);
      col += base*CR_LINE*on*(max(dot(n, L), 0.0) + 0.12)*1.5/(1.0 + 1.4*d2);
      col += gloss*CR_LINE*on*pow(max(dot(reflect(rd, n), L), 0.0), 40.0)/(1.0 + 1.4*d2);
    }
  }
  // the door ahead
  vec3 Ld = CR_DOOR_POS - p;
  float dd2 = dot(Ld, Ld);
  Ld *= inversesqrt(dd2);
  col += base*GLOW*uCrDoor*max(dot(n, Ld), 0.0)*2.6/(1.0 + 0.06*dd2);
  col += gloss*GLOW*uCrDoor*pow(max(dot(reflect(rd, n), Ld), 0.0), 40.0)*0.8/(1.0 + 0.06*dd2);
  if (n.y > 0.9) col += GLOW*uCrDoor*pow(max(dot(reflect(rd, n), Ld), 0.0), 14.0)*0.25/(1.0 + 0.03*dd2);
  // the weld's spark: a hard little light that flickers the wall
  vec3 Ls = CR_WELD - p;
  float ds2 = dot(Ls, Ls);
  Ls *= inversesqrt(ds2);
  col += base*CR_SPARK*crWeld()*max(dot(n, Ls), 0.0)*12.0/(1.0 + 20.0*ds2);
  // the drone's eye: a soft cold pool on the wall it works at
  vec3 Lr = CR_DRONE_LAMP - p;
  float dr2 = dot(Lr, Lr);
  Lr *= inversesqrt(dr2);
  col += base*CR_LINE*max(dot(n, Lr), 0.0)*0.8/(1.0 + 8.0*dr2);
  // the bay's light: white rooms, and the red Earth's in the observation bay
  vec3 Lb = vec3(side*(CR_W + crBayDepth(k) - 0.05), -0.3, bz) - p;
  float db2 = dot(Lb, Lb);
  Lb *= inversesqrt(db2);
  float vis = crIsSpan(k) ? 0.0 : inRoom ? 1.0 : 0.4*smoothstep(CR_BAY_HALF + 1.2, CR_BAY_HALF, abs(p.z - bz));
  vec3 bayCol = crBayTint(k);
  col += base*bayCol*max(dot(n, Lb), 0.0)*3.0/(1.0 + 0.3*db2)*vis;
  col += gloss*bayCol*pow(max(dot(reflect(rd, n), Lb), 0.0), 30.0)*1.2*vis;
  // through the glass span: the Earth's light from below the left hand on what faces it, glowing a little
  // past the span's ends, and the sun's in hard patches wherever its rays come in through the panes
  float earthLit = smoothstep(CR_SPAN_Z0 - CR_EARTH_SPILL, CR_SPAN_Z0 + 0.5, p.z)*smoothstep(CR_SPAN_Z1 + CR_EARTH_SPILL, CR_SPAN_Z1 - 0.5, p.z);
  vec3 Le = normalize(vec3(-CR_EARTH_AIM.x, CR_EARTH_AIM.y, CR_EARTH_AIM.z));
  col += base*CR_EARTH_LIGHT*(max(dot(n, Le), 0.0) + 0.15)*earthLit*(inRoom ? 0.0 : 1.0);
  col += base*CR_SUN_LIGHT*max(dot(n, CR_SUN), 0.0)*crSunThrough(p)*crSunShadow(p, n);
  if (bath > 0.0){
    // what stands about is bathed in the bay's light from every side, not only from behind
    col += base*bayCol*(0.35 + 0.25*max(dot(n, vec3(-side, 0.3, -0.4)), 0.0))*bath;
    if (rim > 0.0){
      float edge = pow(1.0 - max(dot(n, -rd), 0.0), 2.0);
      vec3 from = inLocker ? vec3(0.0, 0.0, 1.0) : vec3(side, 0.0, 0.0);
      float lit = inLocker ? uCrLit : 1.0;
      vec3 rimCol = inLocker ? mix(RIME, SILVER, 0.6) : k > 3.5 ? mix(AMBER, GLOW, 0.3) : mix(bayCol, SILVER, 0.5);
      col = mix(col, rimCol, edge*lit*rim*(0.4 + 0.6*max(dot(n, from), 0.0)));
    }
  }
  col = col*crUnderfoot(p, n) + emit + base*suitLight;

  // the air: haze with distance, warmed where the door's light hangs in it
  vec3 toDoor = normalize(CR_DOOR_POS - ro);
  float dd = max(dot(rd, toDoor), 0.0);
  float hz = 1.0 - exp(-t*0.065);
  col = mix(col, IRON*0.9 + GLOW*0.16*uCrDoor*pow(dd, 6.0), hz*0.85);
  col += GLOW*pow(dd, 90.0)*uCrDoor*0.35*smoothstep(2.0, 8.0, t);
  return col;
}

// What hangs outside the hull, lit as the shipyard shot lights its ships: the sun, the Earth's rust from
// below, a cold whisper from the void, the escort drone's eye close by (but not on the drone round it), and
// every edge turned to the sun catching it
vec3 crSpaceLight(vec3 p, vec3 n, vec3 base, vec3 emit){
  vec3 rd = normalize(p - crFrame(cameraPosition));
  vec3 Le = normalize(vec3(-CR_EARTH_AIM.x, CR_EARTH_AIM.y, CR_EARTH_AIM.z));
  vec3 Ll = uSpaceLamp.xyz - p;
  float dl2 = dot(Ll, Ll);
  vec3 col = base*(CR_SUN_LIGHT*CR_SPACE_SUN*max(dot(n, CR_SUN), 0.0)
    + CR_EARTH_LIGHT*CR_SPACE_EARTH*max(dot(n, Le), 0.0) + mix(FROST, RIME, 0.5)*CR_SPACE_AMBIENT
    + CR_LINE*uSpaceLamp.w*max(dot(n, Ll*inversesqrt(dl2)), 0.0)/(1.0 + CR_SPACE_LAMP_FALL*dl2)
      *smoothstep(CR_SPACE_LAMP_CLEAR, 2.0*CR_SPACE_LAMP_CLEAR, sqrt(dl2)));
  float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0)*smoothstep(-0.15, 0.35, dot(n, CR_SUN));
  return col + CR_SUN_LIGHT*CR_SPACE_RIM*rim + emit;
}

// Shot 6: the corridor the player walks in POV to the lit door, past the bays where the other envoys
// get ready, to the three lockers beside it. Raymarched: the corridor is a box, the bays rooms off it.
// uP = [z, step phase, door glow, lockers lit], uQ = [pace (the bob dies as we stop), x, heading, pitch].
// Bays, alternating left and right: suit-up, medical, mess, comms, and the window on the red Earth.
// The people come from human.glsl, the colours from the generated snapPalette.
// With WRECK defined the same source draws act I's opener (js/intro/wreck.js): HERMES-8's spine,
// the same corridor make, wrecked in orbit. The power is dead but for the red emergency lamps and the
// head lamp, the bays are empty, the second pod drifts loose with its sleeper inside (uB), and a breach
// in the ceiling opens on space. A change to the corridor lands in both.

const float W = 1.6;             // half-width; the eye is at y = 0
const float FLOOR = -1.6;
const float CEIL = 1.0;
const float DOOR_Z = 35.0;
const float BACK_Z = -3.5;       // the sealed hatch behind the walk's start
const float RIB_EVERY = 2.0;
const float RIB_IN = 0.08;
const float BAY_FIRST = 5.0;
const float BAY_EVERY = 6.0;
const float BAYS = 5.0;
const float BAY_HALF = 1.5;      // a wide opening onto a shallow room: its lit wall shows from afar
const float BAY_DEPTH = 1.5;
const float LINTEL = 0.3;
const float STRIP_EVERY = 3.0;
const float FOCAL = 0.85;        // ~61 degrees tall: a helmet's view
const float BOB = 0.025;         // the head's rise and fall over a step
const float SWAY = 0.02;         // and its lean over the boot that carries the weight
const float THIGH = 0.41;
const float SHIN = 0.4;
const float LEG = THIGH + SHIN - 0.002;   // as far as huIK reaches
const vec3 DOOR_POS = vec3(0.55, -0.5, DOOR_Z - 0.1);
const vec3 VENT = vec3(W - 0.16, CEIL - 0.16, 7.3);
const vec3 BEACON_L = vec3(0.07, FLOOR + 2.16, DOOR_Z - 0.02);
const vec3 BEACON_R = vec3(1.03, FLOOR + 2.16, DOOR_Z - 0.02);
#ifdef WRECK
const float LAMP_REST = 0.0;     // what a ceiling lamp still glows when its strip is off
const float HULL_T = 0.12;       // the hull plate the breach is torn through
const vec4 BREACH = vec4(-0.15, 14.6, 0.85, 1.25);   // its centre (x, z) and half-size across the ceiling
#else
const float LAMP_REST = 0.14;
#endif

// PALETTE, the ship's cold metal and the two lights it is lit by
const vec3 PITCH = vec3(13.0, 15.0, 22.0)/255.0;
const vec3 SOOT = vec3(17.0, 21.0, 31.0)/255.0;
const vec3 IRON = vec3(24.0, 29.0, 42.0)/255.0;
const vec3 STEEL = vec3(31.0, 38.0, 53.0)/255.0;
const vec3 ZINC = vec3(40.0, 48.0, 66.0)/255.0;
const vec3 FROSTC = vec3(66.0, 79.0, 102.0)/255.0;
const vec3 RIME = vec3(96.0, 112.0, 140.0)/255.0;
const vec3 GRAPHITE = vec3(58.0, 64.0, 78.0)/255.0;
const vec3 GUN = vec3(88.0, 96.0, 112.0)/255.0;
const vec3 PEWTER = vec3(140.0, 148.0, 162.0)/255.0;
const vec3 BRUSHED = vec3(158.0, 166.0, 180.0)/255.0;
const vec3 SILVER = vec3(200.0, 206.0, 216.0)/255.0;
const vec3 STAR = vec3(1.0);
const vec3 EMBER = vec3(255.0, 189.0, 46.0)/255.0;
const vec3 GLOW = vec3(255.0, 231.0, 196.0)/255.0;
const vec3 STONE = vec3(110.0, 94.0, 90.0)/255.0;
const vec3 BONE = vec3(150.0, 132.0, 124.0)/255.0;
const vec3 RUST = vec3(84.0, 46.0, 44.0)/255.0;
const vec3 BRICK = vec3(141.0, 68.0, 51.0)/255.0;
const vec3 AMBER = vec3(190.0, 108.0, 70.0)/255.0;
const vec3 TIDE = vec3(76.0, 48.0, 58.0)/255.0;
#ifdef WRECK
// the emergency lamps' red, and the head lamp's cold white
const vec3 ALARM = vec3(174.0, 72.0, 52.0)/255.0;
const vec3 LAMP = vec3(214.0, 214.0, 212.0)/255.0;
const vec3 GARNET = vec3(104.0, 52.0, 66.0)/255.0;
#endif

// --- stencils: a 3x5 pixel font, each glyph fifteen bits read row by row from the top
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
float charCode(float s, float i){
  if (s < 0.5){
    if (i < 0.5) return 15211.0;
    if (i < 1.5) return 29391.0;
    if (i < 2.5) return 29263.0;
    if (i < 3.5) return 23277.0;
    if (i < 4.5) return 0.0;
    if (i < 5.5) return 31207.0;
    return 0.0;
  }
  if (s < 1.5){
    if (i < 0.5) return 29263.0;
    if (i < 1.5) return 23275.0;
    if (i < 2.5) return 9389.0;
    if (i < 3.5) return 31599.0;
    if (i < 4.5) return 0.0;
    if (i < 5.5) return 5393.0;
    return 0.0;
  }
  if (s < 2.5){
    if (i < 0.5) return 17492.0;
    if (i < 1.5) return 0.0;
    if (i < 2.5) return 29263.0;
    if (i < 3.5) return 23275.0;
    if (i < 4.5) return 9389.0;
    if (i < 5.5) return 31599.0;
    return 0.0;
  }
  if (s < 3.5){
    if (i < 0.5) return 29263.0;
    if (i < 1.5) return 23275.0;
    if (i < 2.5) return 9389.0;
    if (i < 3.5) return 31599.0;
    return 0.0;
  }
  if (s < 4.5){
    if (i < 0.5) return 23533.0;
    if (i < 1.5) return 29391.0;
    if (i < 2.5) return 23275.0;
    if (i < 3.5) return 23549.0;
    if (i < 4.5) return 29391.0;
    if (i < 5.5) return 31183.0;
    return 0.0;
  }
  // s = 5 + k: BAY 1 to BAY 5
  if (i < 0.5) return 15083.0;
  if (i < 1.5) return 23530.0;
  if (i < 2.5) return 9389.0;
  if (i < 3.5) return 0.0;
  if (i < 4.5) return digitCode(s - 4.0);
  return 0.0;
}
// string s at q, in glyph cells: x along the line, y rows down from the top; 4 cells per char
float stencil(float s, float len, vec2 q){
  if (q.x < 0.0 || q.y < 0.0 || q.x >= len*4.0 || q.y >= 5.0) return 0.0;
  float i = floor(q.x/4.0);
  return glyphBit(charCode(s, i), floor(vec2(q.x - i*4.0, q.y)));
}
// a two-digit number, for the frame plates
float number2(float n, vec2 q){
  if (q.x < 0.0 || q.y < 0.0 || q.x >= 8.0 || q.y >= 5.0) return 0.0;
  float i = floor(q.x/4.0);
  float d = i < 0.5 ? floor(n/10.0) : mod(n, 10.0);
  return glyphBit(digitCode(d), floor(vec2(q.x - i*4.0, q.y)));
}

vec2 opU(vec2 a, vec2 b){ return a.x < b.x ? a : b; }

// Materials: 1 suit, 2 helmet shell, 3 pack, 4 skin, 5 coverall, 6 dark fittings, 7 visor,
// 8 chest lamp, 9 belt, 10 mattress, 11 vitals monitor, 12 furniture, 13 brushed rail,
// 14 medic's uniform, 15 console screen, 16 hair, 17 undersuit, 18 a spare suit in its locker.

#ifndef WRECK
// a figure's frame from the bay's (rx, y, z): standing at `at`, facing angle a (0 = into the room)
vec3 huAt(vec3 q, vec2 at, float a){
  vec2 d = vec2(q.x - at.x, q.z - at.y);
  vec2 fw = vec2(cos(a), sin(a));
  return vec3(dot(d, fw), q.y, dot(d, vec2(-fw.y, fw.x)));
}
// the idle drift every person has: a slow weight shift, a turn of the head
float idle(float seed, float rate){ return sin(uTime*rate + seed*5.1); }
vec3 relaxed(float sg){ return vec3(0.05, 0.86, sg*0.23); }
#endif
// a helmet set down or carried: the bubble, its visor facing +x
vec2 helmetAt(vec3 h){
  return vec2(length(h) - 0.165, h.x > 0.05 && abs(h.y + 0.01) < 0.085 && abs(h.z) < 0.12 ? 7.0 : 2.0);
}

#ifndef WRECK
// Who stands in the bays, j-th of bay k: a table, so huFigure is called once, in bayContents' loop
// (inlined at every figure it took Mesa over a minute, then failed to link). `at` is (rx, z) in the
// bay's frame, `face` the way they face, `held` what they hold: a kind for heldBy, then its place in
// their frame. An outfit below zero ends the bay.
struct Person { vec2 at; float face; vec3 wl; vec3 wr; vec4 pose; vec4 look; float outfit; vec4 held; };
const vec4 NOTHING = vec4(0.0);
Person person(float k, int j){
  if (k < 0.5){
    // suit-up: one with the helmet under an arm, one being fitted by a technician, spare suits racked
    if (j == 0) return Person(vec2(0.5, -0.2), PI - 0.5, relaxed(-1.0), vec3(0.13, 1.03, 0.27), vec4(0.6 + 0.15*idle(1.0, 0.4), 0.0, 1.05, 0.0), vec4(-0.25 + 0.3*idle(1.0, 0.23), 1.0, 0.0, 0.0), 1.0, vec4(1.0, 0.13, 1.14, 0.36));
    if (j == 1) return Person(vec2(0.72, 0.75), PI, vec3(0.05, 1.0, -0.36), vec3(0.05, 1.0, 0.36), vec4(-0.3, 0.0, 1.0, 0.0), vec4(0.1*idle(2.0, 0.3), 2.0, 0.0, 0.0), 0.0, NOTHING);
    if (j == 2) return Person(vec2(1.12, 1.35), -2.3, vec3(0.34, 1.22, -0.08), vec3(0.36, 1.3, 0.08), vec4(0.4, 0.0, 0.95, -0.15), vec4(0.0, 3.0, 0.0, 0.0), 2.0, NOTHING);
    if (j < 6) return Person(vec2(1.36, -0.45 - float(j - 3)*0.48), PI, vec3(0.0), vec3(0.0), vec4(0.0, 1.02, 0.95, 0.0), vec4(0.0, float(j - 3), 0.0, 0.0), 4.0, vec4(2.0, 0.0, 1.58, 0.0));
  } else if (k < 1.5){
    // medical: an envoy sat on the edge of the bed being checked, the medic with a tablet
    if (j == 0) return Person(vec2(0.98, 0.25), PI, vec3(0.3, 0.8, -0.13), vec3(0.28, 0.82, 0.14), vec4(0.0, 0.69, 1.0, -0.18), vec4(0.15*idle(4.0, 0.2), 4.0, 0.0, 0.0), 1.0, NOTHING);
    if (j == 1) return Person(vec2(0.5, 0.9), -0.93, vec3(0.3, 1.08, -0.06), vec3(0.3, 1.1, 0.08), vec4(0.5 + 0.2*idle(5.0, 0.35), 0.0, 0.92, -0.25), vec4(0.0, 5.0, 0.0, 0.0), 3.0, vec4(4.0, 0.36, 1.13, 0.01));
  } else if (k < 2.5){
    // the mess: two at the table with their cups, a technician on a break by the wall
    if (j == 0) return Person(vec2(0.36, -0.25), 0.0, vec3(0.33, 0.8, -0.12), vec3(0.14, 1.12 + 0.03*idle(6.0, 0.5), 0.1), vec4(0.0, 0.45, 1.05, 0.05), vec4(0.2*idle(6.0, 0.25), 6.0, 0.0, 0.0), 5.0, vec4(3.0, 0.2, 1.14, 0.06));
    if (j == 1) return Person(vec2(1.32, 0.3), PI, vec3(0.3, 0.8, -0.13), vec3(0.3, 0.8, 0.13), vec4(0.0, 0.45, 0.88, 0.0), vec4(0.3 + 0.25*idle(7.0, 0.3), 7.0, 0.0, 0.0), 5.0, NOTHING);
    if (j == 2) return Person(vec2(1.2, -1.0), PI - 0.7, relaxed(-1.0), vec3(0.22, 1.12, 0.1), vec4(0.8 + 0.1*idle(8.0, 0.3), 0.0, 1.0, 0.0), vec4(-0.3*idle(8.0, 0.2), 8.0, 0.0, 0.0), 2.0, vec4(3.0, 0.28, 1.13, 0.1));
  } else if (k < 3.5){
    // comms: a technician at the console with a hand to the headset, an envoy reading over the shoulder
    if (j == 0) return Person(vec2(0.8, -0.3), 0.0, vec3(0.42, 0.8, -0.12), vec3(0.0, 1.28, 0.16), vec4(0.0, 0.5, 0.95, 0.1), vec4(0.1*idle(9.0, 0.3), 9.0, 0.0, 0.0), 2.0, NOTHING);
    if (j == 1) return Person(vec2(0.45, 0.55), 0.15, vec3(0.16, 1.18, 0.1), vec3(0.15, 1.2, -0.08), vec4(0.5 + 0.15*idle(10.0, 0.3), 0.0, 1.05, 0.0), vec4(-0.2 + 0.2*idle(10.0, 0.2), 10.0, 0.0, 0.0), 0.0, NOTHING);
  } else {
    // the window: two at the glass, looking out at what they are leaving
    if (j == 0) return Person(vec2(0.95, -0.35), 0.0, relaxed(-1.0), vec3(0.43, 1.03, 0.18), vec4(-0.6, 0.0, 1.0, 0.0), vec4(0.0, 11.0, 0.0, 0.0), 0.0, NOTHING);
    if (j == 1) return Person(vec2(0.7, 0.75), -0.25, relaxed(-1.0), relaxed(1.0), vec4(0.5 + 0.1*idle(12.0, 0.25), 0.0, 0.92, 0.05), vec4(-0.35 + 0.1*idle(12.0, 0.2), 12.0, 0.0, 0.0), 1.0, NOTHING);
  }
  return Person(vec2(0.0), 0.0, vec3(0.0), vec3(0.0), vec4(0.0), vec4(0.0), -1.0, NOTHING);
}
// what a person holds, in their frame: 1 a helmet under the arm, 2 the hanger an empty suit is on,
// 3 a cup, 4 a tablet
vec2 heldBy(vec3 f, vec4 held){
  vec3 h = f - held.yzw;
  if (held.x < 0.5) return vec2(1e9, 0.0);
  if (held.x < 1.5) return helmetAt(h);
  if (held.x < 2.5) return vec2(huCone(h, vec3(0.0), vec3(0.0, 0.44, 0.0), 0.012, 0.012), 6.0);
  if (held.x < 3.5) return vec2(huCone(h, vec3(0.0), vec3(0.0, 0.08, 0.0), 0.03, 0.028), 13.0);
  return vec2(huBox(h, vec3(0.012, 0.085, 0.12), 0.006), h.x < 0.0 ? 15.0 : 6.0);
}
#endif

float bayZ(float k){ return BAY_FIRST + k*BAY_EVERY; }
float baySide(float k){ return mod(k, 2.0) > 0.5 ? 1.0 : -1.0; }
float bayIndex(float z){ return clamp(floor((z - BAY_FIRST)/BAY_EVERY + 0.5), 0.0, BAYS - 1.0); }
// each bay's own light: white suit-up, cool medical, warm mess, a dim comms room, the red window
vec3 bayTint(float k){
  if (k < 0.5) return mix(RIME, SILVER, 0.55);
  if (k < 1.5) return mix(RIME, SILVER, 0.4)*0.8;
  if (k < 2.5) return mix(SILVER, GLOW, 0.65)*0.85;
  if (k < 3.5) return mix(FROSTC, RIME, 0.6)*0.7;
  return mix(BRICK, AMBER, 0.6)*0.75;
}
// how bright its lit panel wall burns
float bayPanel(float k){ return k < 0.5 ? 1.35 : k < 1.5 ? 0.95 : k < 2.5 ? 1.0 : 0.5; }
float ribAt(float z){ return step(abs(fract(z/RIB_EVERY) - 0.5)*RIB_EVERY, 0.07); }

// everything standing in the bay nearest p, in the bay's own frame: rx 0 at the opening, 1.5 at
// the back wall, so a figure at rx0 facing the corridor has f.x = rx0 - rx
vec2 bayContents(vec3 p){
  float k = bayIndex(p.z);
  float bz = bayZ(k), side = baySide(k);
  // the room's box: nothing to test until the ray is near it
  float bound = sdBox3(p - vec3(side*(W + 0.8), FLOOR + 1.15, bz), vec3(0.8, 1.15, 1.5));
  if (bound > 0.25) return vec2(bound, 0.0);
  float rx = side*p.x - W;
  float y = p.y - FLOOR;
  float z = p.z - bz;
  vec2 r = vec2(1e9, 0.0);
  vec3 q = vec3(rx, y, z);
#ifndef WRECK
  // the people, and what they hold: the one call of huFigure in the shader
  for (int j = 0; j < 6; j++){
    Person who = person(k, j);
    if (who.outfit < 0.0) break;
    vec3 f = huAt(q, who.at, who.face);
    r = opU(r, huFigure(f, who.wl, who.wr, who.pose, who.look, who.outfit).xy);
    r = opU(r, heldBy(f, who.held));
  }
#endif
  // the furniture
  if (k < 0.5){
    // the rail the spare suits hang from
    r = opU(r, vec2(length(vec2(rx - 1.36, y - 2.02)) - 0.025, 6.0));
  } else if (k < 1.5){
    // the bed and its monitor, a helmet set down on the mattress
    vec3 b = vec3(1.15 - rx, y, z - 0.6);
    r = opU(r, vec2(huBox(b - vec3(0.0, 0.62, 0.0), vec3(0.32, 0.07, 0.6), 0.03), 10.0));
    r = opU(r, vec2(huBox(b - vec3(0.0, 0.29, 0.0), vec3(0.27, 0.26, 0.5), 0.02), 6.0));
    vec3 m = vec3(1.4 - rx, y, z - 1.22);
    r = opU(r, vec2(huCone(m, vec3(0.0), vec3(0.0, 1.08, 0.0), 0.02, 0.02), 6.0));
    float scr = huBox(m - vec3(0.0, 1.26, 0.0), vec3(0.035, 0.16, 0.23), 0.01);
    r = opU(r, vec2(scr, m.x > 0.02 ? 11.0 : 6.0));
    r = opU(r, helmetAt(q - vec3(1.02, 0.85, 1.0)));
  } else if (k < 2.5){
    // the table on its post, two benches, a cup left on the table
    r = opU(r, vec2(huBox(q - vec3(0.85, 0.74, 0.0), vec3(0.3, 0.025, 0.6), 0.01), 12.0));
    r = opU(r, vec2(huCone(q, vec3(0.85, 0.0, 0.0), vec3(0.85, 0.72, 0.0), 0.05, 0.05), 6.0));
    r = opU(r, vec2(min(huBox(q - vec3(0.38, 0.43, 0.0), vec3(0.11, 0.025, 0.62), 0.01), huBox(q - vec3(1.3, 0.43, 0.0), vec3(0.11, 0.025, 0.62), 0.01)), 12.0));
    r = opU(r, vec2(huCone(q, vec3(1.0, 0.765, 0.38), vec3(1.0, 0.85, 0.38), 0.03, 0.028), 13.0));
  } else if (k < 3.5){
    // the console and its screen, a stool
    r = opU(r, vec2(huBox(q - vec3(1.32, 0.38, -0.1), vec3(0.18, 0.38, 0.9), 0.02), 12.0));
    vec3 sc = q - vec3(1.43, 1.12, -0.1);
    r = opU(r, vec2(huBox(sc, vec3(0.04, 0.3, 0.85), 0.01), sc.x < -0.02 ? 15.0 : 6.0));
    r = opU(r, vec2(min(huCone(q, vec3(0.8, 0.0, -0.3), vec3(0.8, 0.46, -0.3), 0.03, 0.03), huBox(q - vec3(0.8, 0.48, -0.3), vec3(0.14, 0.02, 0.14), 0.02)), 6.0));
  } else {
    // the rail along the glass
    r = opU(r, vec2(max(length(vec2(rx - 1.38, y - 1.02)) - 0.028, abs(z) - 1.4), 13.0));
  }
  return r;
}

// pipes and a cable tray along the top of both walls
float pipes(vec3 p){
  float ax = abs(p.x);
  float a = length(vec2(ax - (W - 0.16), p.y - (CEIL - 0.16))) - 0.065;
  float b = length(vec2(ax - (W - 0.36), p.y - (CEIL - 0.1))) - 0.04;
  float c = sdBox(vec2(ax - (W - 0.62), p.y - (CEIL - 0.07)), vec2(0.13, 0.022));
  return min(min(a, b), c);
}

#ifndef WRECK
// the suits hanging in the lockers, one per role, each helmet on the shelf above it
float lockerSuit(vec3 p){
  if (p.z < DOOR_Z - 1.0) return 1e9;
  const float S = 1.2;
  float d = 1e9;
  for (int i = 0; i < 3; i++){
    vec3 f = vec3(DOOR_Z + 0.32 - p.z, p.y - FLOOR, p.x + 1.21 - float(i)*0.5)*S;
    float suit = huFigure(f, vec3(0.0), vec3(0.0), vec4(0.0, 0.95, 0.95, 0.0), vec4(0.0, float(i), 0.0, 0.0), 4.0).x;
    suit = min(suit, huCone(f, vec3(0.0, 1.5, 0.0), vec3(0.0, 1.9, 0.0), 0.012, 0.012));
    suit = min(suit, length(f - vec3(0.02, 2.07, 0.0)) - 0.165);
    suit = min(suit, huBox(f - vec3(0.0, 1.89, 0.0), vec3(0.2, 0.015, 0.22), 0.005));
    d = min(d, suit/S);
  }
  return d;
}
#endif

// three locker cells left of the door, the door's own threshold right of centre
float lockerCell(vec3 p){
  float cell = floor((p.x + 1.46)/0.5);
  float lx = fract((p.x + 1.46)/0.5)*0.5;
  bool inCell = cell >= 0.0 && cell <= 2.0 && lx > 0.04 && lx < 0.46;
  return (inCell && p.y > FLOOR + 0.05 && p.y < FLOOR + 2.0) ? 1.0 : 0.0;
}
float doorAt(vec3 p){ return (p.x > 0.15 && p.x < 0.95 && p.y < FLOOR + 2.1) ? 1.0 : 0.0; }
float recess(vec3 p){ return lockerCell(p)*0.45 + doorAt(p)*0.12; }

#ifdef WRECK
// the breach's torn outline across the ceiling, signed: negative inside the hole
float breach(vec2 xz){
  vec2 q = (xz - BREACH.xy)/BREACH.zw;
  float a = atan(q.y, q.x);
  float torn = 0.16*sin(a*5.0 + 1.3) + 0.08*sin(a*11.0 + 0.4) + 0.05*sin(a*23.0);
  return (length(q) - 1.0 - torn)*min(BREACH.z, BREACH.w);
}
#endif

// the shell: positive inside the corridor and its rooms, the distance to the nearest wall
float shell(vec3 p){
  float inset = RIB_IN*ribAt(p.z);
#ifdef WRECK
  // the ceiling is a plate HULL_T thick with the breach cut through it; above it, open space
  float hole = breach(p.xz);
  float plate = max(CEIL - inset - p.y, p.y - CEIL - HULL_T);
  if (hole < 0.0) plate = length(vec2(-hole, max(max(CEIL - inset - p.y, p.y - CEIL - HULL_T), 0.0)));
  if (p.y > CEIL + HULL_T) return plate;
  float d = min(plate, p.y - FLOOR);
#else
  float d = min(CEIL - inset - p.y, p.y - FLOOR);
#endif
  float k = bayIndex(p.z);
  float bz = bayZ(k), side = baySide(k);
  float dz = BAY_HALF - abs(p.z - bz);
  bool slot = dz > 0.0 && p.y < CEIL - LINTEL && p.x*side > 0.0;
  float dx = (slot ? W + BAY_DEPTH : W - inset) - abs(p.x);
  if (abs(p.x) > W){
    dx = min(dx, min(dz, CEIL - LINTEL - p.y));
  } else if (slot){
    float gap = W - abs(p.x);
    dx = min(dx, min(length(vec2(gap, max(dz, 0.0))), length(vec2(gap, CEIL - LINTEL - p.y))));
  }
  return min(d, dx);
}

// The head and the body under it over a step (uP.y): lowest as a boot lands, highest mid-step, leaning
// over the boot on the deck (an even turn has the left one up). x across, y up.
vec2 gaitLean(){ return vec2(SWAY*sin(0.5*uP.y), -BOB*cos(uP.y))*uQ.x; }

// The player's own body under the eye, seen by looking down: the suit's torso turned with the head,
// legs from its hips to the boots where the walk set them down (uR left, uS right: across, ahead,
// lift, yaw, in the torso's frame). In that frame x runs to the right, y up from the deck, z ahead.
vec2 body(vec3 p){
  vec2 d = p.xz - vec2(uQ.y, uP.x);
  if (dot(d, d) > 1.0) return vec2(1e9, 0.0);
  float s = sin(uQ.z), c = cos(uQ.z);
  vec3 q = vec3(c*d.x - s*d.y, p.y - FLOOR, s*d.x + c*d.y);
  vec2 g = gaitLean();
  vec2 r = vec2(huBox(q - vec3(g.x, 1.13 + g.y, -0.2), vec3(0.19, 0.27, 0.12), 0.08), 1.0);
  for (int i = 0; i < 2; i++){
    vec4 f = i == 0 ? uR : uS;
    vec3 foot = vec3(f.x, 0.09 + f.z, f.y);
    vec3 hip = vec3(g.x + (i == 0 ? -0.1 : 0.1), 0.9 + g.y, -0.16);
    // a leg on the deck stays near straight, its hip dropping as far as the boot needs: only a lifted
    // boot bends the knee, out over its toe
    vec2 span = foot.xz - hip.xz;
    hip.y = min(hip.y, foot.y + sqrt(max(LEG*LEG - dot(span, span), 0.0)));
    vec2 toe = vec2(sin(f.w), cos(f.w));
    vec3 ankle;
    vec3 knee = huIK(hip, foot, THIGH, SHIN, vec3(toe.x, 0.0, toe.y), ankle);
    float leg = min(huCone(q, hip, knee, 0.085, 0.07), huCone(q, knee, ankle, 0.068, 0.055));
    r = opU(r, vec2(leg, 1.0));
    vec3 b = q - foot + vec3(0.0, 0.03, 0.0);
    b = vec3(toe.y*b.x - toe.x*b.z, b.y, toe.x*b.x + toe.y*b.z) - vec3(0.0, 0.0, 0.06);
    r = opU(r, vec2(huBox(b, vec3(0.055, 0.05, 0.12), 0.03), 6.0));
  }
  return r;
}

#ifdef WRECK
// The second pod, torn from its mounts (js/intro/drift.js): uB[0].xyz its centre, uB[1] its turn as a
// quaternion. In its own frame the long axis is x, the window the +y face, the sleeper's head at +x;
// drawn to WRECK.pod's size in constants/intro/wreck.js. Materials: 20 shell, 21 window, 22 frozen blood.
uniform vec4 uB[2];
const vec3 CRACK = vec3(0.42, 0.3, 0.12);   // where the lid is cracked, in the pod's frame
vec3 unturn(vec4 q, vec3 v){ vec3 u = -q.xyz; return v + 2.0*cross(u, cross(u, v) + q.w*v); }
vec3 podFrame(vec3 p){ return unturn(uB[1], p - uB[0].xyz); }
vec2 pod(vec3 p){
  float far = length(p - uB[0].xyz) - 1.3;
  if (far > 0.25) return vec2(far, 0.0);
  vec3 q = podFrame(p);
  vec2 r = vec2(huBox(q, vec3(1.05, 0.26, 0.34), 0.1), 20.0);
  r = opU(r, vec2(huEll(q - vec3(0.0, 0.16, 0.0), vec3(0.86, 0.18, 0.29)), 21.0));
  // the stubs of the mounts it tore off
  r = opU(r, vec2(min(huBox(q - vec3(0.55, -0.34, 0.0), vec3(0.06, 0.08, 0.2), 0.01), huBox(q - vec3(-0.55, -0.34, 0.0), vec3(0.06, 0.08, 0.2), 0.01)), 20.0));
  // frozen blood seeping from the crack: beads drifting off, shrinking, and gone
  for (int i = 0; i < 9; i++){
    float fi = float(i);
    float life = fract(uTime*0.04 + fi*0.137);
    vec3 dir = normalize(vec3(sin(fi*2.1), 0.6 + 0.4*fract(fi*0.71), cos(fi*1.7)));
    vec3 c = CRACK + dir*(0.03 + 0.6*life) + 0.02*vec3(sin(uTime*0.7 + fi), cos(uTime*0.5 + fi*1.3), sin(uTime*0.6 + fi*2.0));
    r = opU(r, vec2(length(q - c) - mix(0.022, 0.006, life)*(0.7 + 0.6*fract(fi*0.37)), 22.0));
  }
  return r;
}

// loose panels turning in the air, on their own slow clocks rather than the drift's physics
vec2 debris(vec3 p){
  float d = 1e9;
  for (int i = 0; i < 6; i++){
    float fi = float(i);
    vec3 c = vec3(sin(fi*2.7)*0.9, -0.7 + 1.1*fract(fi*0.37), 2.5 + fi*5.1);
    c += 0.2*vec3(sin(uTime*0.21 + fi), sin(uTime*0.17 + fi*1.7), sin(uTime*0.13 + fi*2.3));
    vec3 q = p - c;
    float far = length(q) - 0.3;
    if (far > 0.2){ d = min(d, far); continue; }
    float a = uTime*(0.25 + 0.08*fi) + fi;
    float b = uTime*(0.17 + 0.05*fi) + fi*2.0;
    q.xy = mat2(cos(a), sin(a), -sin(a), cos(a))*q.xy;
    q.yz = mat2(cos(b), sin(b), -sin(b), cos(b))*q.yz;
    d = min(d, huBox(q, vec3(0.22, 0.012, 0.14), 0.004));
  }
  return vec2(d, 12.0);
}
#endif

// what stands in the corridor: the bays' contents, the spare suits as a material of their own, the player
vec2 contents(vec3 p){
#ifdef WRECK
  return opU(opU(bayContents(p), pod(p)), opU(debris(p), body(p)));
#else
  return opU(opU(bayContents(p), vec2(lockerSuit(p), 18.0)), body(p));
#endif
}

// a strip's state on a stepped clock: a few of them flicker, the rest hold; in the wreck one buzzes
// back on now and then and the rest are dead
float stripOn(float k){
#ifdef WRECK
  if (abs(k - 4.0) > 0.5) return 0.0;
  return step(0.55, hash11(floor(uTime*11.0)))*step(0.4, hash11(floor(uTime*0.9) + 7.0));
#else
  if (hash11(k*7.31 + 0.5) > 0.2) return 1.0;
  return step(0.3, hash11(k*3.7 + floor(uTime*9.0)));
#endif
}

// the red Earth and the yard's work lights through the observation glass, laid out round A, the
// way you look through that pane, so the view holds from wherever the walk sees it
// a world seen from orbit over col: centred on C, RR its angular size as a sine, lit from L
vec3 planetOver(vec3 col, vec3 rd, vec3 C, float RR, vec3 L){
  float b = dot(rd, C);
  float h = b*b - (1.0 - RR*RR);
  // the air round the limb, glowing where the swollen sun lights it
  float ang = acos(clamp(b, -1.0, 1.0)) - asin(RR);
  col += mix(BRICK, AMBER, 0.5)*exp(-max(ang, 0.0)*28.0)*0.9;
  if (h > 0.0){
    vec3 P = rd*(b - sqrt(h));
    vec3 N = normalize(P - C);
    float land = smoothstep(0.48, 0.56, fbm3(N*4.0 + 3.0));
    vec3 ground = mix(TIDE*0.8, mix(RUST, BRICK, fbm3(N*9.0)), land);
    float cloud = smoothstep(0.58, 0.7, fbm3(N*6.0 + vec3(9.0, 0.0, 0.0)));
    ground = mix(ground, BONE, cloud*0.6);
    float day = max(dot(N, L), 0.0);
    float rim = pow(1.0 - max(dot(N, -rd), 0.0), 3.0);
    col = ground*(0.05 + 1.1*day)*vec3(1.1, 0.85, 0.75) + AMBER*rim*(0.25 + 0.75*day);
  }
  return col;
}

vec3 outside(vec3 rd, vec3 A){
  vec3 U = vec3(0.0, 1.0, 0.0);
  vec3 Rt = normalize(cross(A, U));
  vec3 col = planetOver(stars(rd)*0.8, rd, normalize(A - U*0.72 + Rt*0.25), 0.7, normalize(U*0.75 - A*0.35 - Rt*0.3));
#ifndef WRECK
  // the yard: a sagging string of work lights and two hulls in their frames
  vec3 base = normalize(A + U*0.1);
  vec3 v = normalize(Rt + U*0.18);
  vec3 w = normalize(cross(base, v));
  float u = dot(rd, v), s = dot(rd, w);
  if (dot(rd, base) > 0.8){
    for (int i = 0; i < 14; i++){
      float fi = float(i) - 6.5;
      vec2 lp = vec2(fi*0.055, -0.03 + 0.0016*fi*fi);
      float on = step(0.22, hash11(float(i)*3.1 + floor(uTime*2.0)));
      float dd = length(vec2(u, s) - lp);
      col += mix(EMBER, STAR, step(0.5, hash11(float(i)))) *smoothstep(0.006, 0.0, dd)*on*1.4;
    }
    for (int j = 0; j < 2; j++){
      vec2 c = j == 0 ? vec2(-0.12, -0.075) : vec2(0.16, -0.06);
      vec2 hl = j == 0 ? vec2(0.11, 0.012) : vec2(0.07, 0.009);
      vec2 q = vec2(u, s) - c;
      if (abs(q.x) < hl.x && abs(q.y) < hl.y){
        col = mix(PITCH, GUN*0.8, step(hl.y*0.4, q.y));
        if (fract(q.x*90.0) < 0.2 && q.y < 0.0) col += EMBER*0.5;
      }
    }
  }
#endif
  return col;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frameUV(frag);

  // the player's walk, the pointer turning the head on top; the eyes keep the view level, so the step
  // only carries the head, never tips it
  float yaw = uQ.z + uLook.x*0.11;
  float pitch = uQ.w - uLook.y*0.06;
  vec3 fwd = vec3(sin(yaw)*cos(pitch), sin(pitch), cos(yaw)*cos(pitch));
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 up = cross(fwd, right);
  vec3 rd = normalize(uv.x*right + uv.y*up + FOCAL*fwd);
  vec2 lean = gaitLean();
  vec3 ro = vec3(uQ.y, lean.y, uP.x) + right*lean.x;

  // The march, and once it lands six more passes of the same loop for the taps the shading takes on
  // the contents: a normal's four, the occlusion along it, the deck's contact shadow. One loop, so
  // the figures are inlined once in the whole shader (a second copy cost Mesa another second).
  float t = 0.0;
  int tap = 0;
  vec3 p = ro;
  vec2 bc = vec2(1e9, 0.0);
  vec3 cn = vec3(0.0);
  float ao = 1.0, shade = 1.0;
  for (int i = 0; i < 102; i++){
    vec3 e = tap == 1 ? vec3(1.0, -1.0, -1.0) : tap == 2 ? vec3(-1.0, -1.0, 1.0) : tap == 3 ? vec3(-1.0, 1.0, -1.0) : vec3(1.0);
    vec3 at = tap == 0 ? ro + rd*t : tap < 5 ? p + 0.004*e : tap == 5 ? p + normalize(cn)*0.06 : p + vec3(0.0, 0.08, 0.0);
    vec2 c = contents(at);
    if (tap == 0){
      float d = min(min(shell(at), pipes(at)), min(min(DOOR_Z + recess(at) - at.z, at.z - BACK_Z), c.x));
#ifdef WRECK
      // out through the breach there is nothing left to hit
      if (at.y > CEIL + HULL_T) d = 0.5 + 0.3*t;
#endif
      if (d < 0.002 + 0.0015*t || t > 45.0 || i == 95){ p = at; bc = c; tap = 1; }
      else t += d*0.72;
    }
    else if (tap < 5){ cn += e*c.x; tap++; }
    else if (tap == 5){ ao = clamp(0.35 + 0.65*c.x/0.06, 0.35, 1.0); tap++; }
    else { shade = mix(0.3, 1.0, smoothstep(0.0, 0.22, c.x)); break; }
  }

#ifdef WRECK
  // out through the breach: space, and the candidate world turning below the wreck
  if (p.y > CEIL + HULL_T){
    vec3 sky = planetOver(stars(rd)*0.8, rd, normalize(vec3(-0.35, 0.8, 0.5)), 0.62, normalize(vec3(0.8, 0.3, -0.4)));
    vec4 hs = hands(uv);
    gl_FragColor = edgeCell(snapIndex(mix(sky, hs.rgb, hs.a), frag), CELL_FAR, vec3(0.0, -1.0, 0.0), hs.a < 0.5);
    return;
  }
  // the emergency lamps' pulse, on a stepped clock
  float alarm = 0.3 + 0.7*step(0.5, fract(uTime*0.6));
#endif

  // --- which surface: the same terms as the march, at the hit
  float inset = RIB_IN*ribAt(p.z);
  float k = bayIndex(p.z);
  float bz = bayZ(k), side = baySide(k);
  float dz = BAY_HALF - abs(p.z - bz);
  bool inRoom = abs(p.x) > W + 0.01;
  float dFloor = p.y - FLOOR;
  float dCeil = CEIL - inset - p.y;
  float dWall = (inRoom ? W + BAY_DEPTH : W - inset) - abs(p.x);
  float dSide = inRoom ? min(dz, CEIL - LINTEL - p.y) : 1e9;
  float dPipe = pipes(p);
  float dEnd = DOOR_Z + recess(p) - p.z;
  float dBack = p.z - BACK_Z;
  float dm = min(min(min(dFloor, dCeil), min(dWall, dSide)), min(min(bc.x, dPipe), min(dEnd, dBack)));
  bool onSuit = dm == bc.x && bc.y > 17.5 && bc.y < 18.5;
  bool onFig = dm == bc.x && !onSuit;

  vec3 n = vec3(0.0, 1.0, 0.0);
  vec3 base = GUN;
  vec3 emit = vec3(0.0);
  float rimK = 0.0;      // silhouettes: a backlit edge instead of a lit face
  vec3 col_suitLight = vec3(0.0);
  float rib = ribAt(p.z);
  float grime = 0.8 + 0.4*fbm3(p*1.7);
  // worn paint: stencils flake where the deck is walked and the walls are scuffed
  float wear = 0.35 + 0.65*smoothstep(0.3, 0.45, fbm3(p*9.0));

  if (dm == dFloor){
    n = vec3(0.0, 1.0, 0.0);
    // grating either side of a plated walkway, with cross bars
    float walkway = step(abs(p.x), 0.55);
    float slots = step(fract(p.z*7.0), 0.42);
    float bars = step(0.93, fract(p.x*1.25 + 0.5));
    base = mix(mix(GRAPHITE*0.7, SOOT*0.8, slots), GUN, bars*(1.0 - slots));
    base = mix(base, mix(GRAPHITE, STEEL, step(0.95, fract(p.z*0.5))), walkway);
    base *= grime;
    // CRYO and a chevron painted on the walkway, twice; read walking forward
    float paint = 0.0;
    for (int j = 0; j < 4; j++){
      float z0 = 4.6 + float(j)*7.8;
      paint = max(paint, stencil(3.0, 4.0, vec2((p.x + 0.45)/0.06, (z0 + 0.45 - p.z)/0.09)));
      float cz = p.z - (z0 + 0.62);
      paint = max(paint, step(abs(cz - (0.28 - abs(p.x)*0.7)), 0.06)*step(abs(p.x), 0.38)*step(-0.3, cz));
    }
    base = mix(base, EMBER*0.55*grime, paint*wear);
    // contact shadow: the deck darkens under feet, benches and beds
    base *= shade;
    // hazard stripes across the threshold of the door
    if (p.z > DOOR_Z - 0.75 && p.z < DOOR_Z - 0.3){
      base = mix(PITCH, EMBER*0.6, step(0.5, fract((p.x + p.z)*2.2)))*grime;
    }
  } else if (dm == dCeil){
    n = vec3(0.0, -1.0, 0.0);
    base = mix(GRAPHITE*0.55, SOOT, max(step(abs(abs(p.x) - 1.02), 0.08), step(abs(p.x), 0.3)))*grime;
    // the lamps: a housing, a diffuser behind a grille, on their stepped clocks
    float ks = floor((p.z - 1.5)/STRIP_EVERY + 0.5);
    float sz = ks*STRIP_EVERY + 1.5;
    vec2 lq = vec2(abs(p.x), abs(p.z - sz));
    if (lq.x < 0.27 && lq.y < 0.7 && rib < 0.5){
      base = GRAPHITE*0.8;
      if (lq.x < 0.19 && lq.y < 0.6){
        float on = stripOn(ks);
        float grille = step(0.3, fract(p.z*9.0))*step(0.02, 0.19 - lq.x);
        float spine = step(lq.x, 0.018);
        emit = mix(RIME, STAR, 0.45)*(LAMP_REST + 0.62*on)*grille*(1.0 - spine);
        base = mix(STEEL, GUN, grille);
      }
    }
  } else if (dm == dPipe){
    float ax = abs(p.x);
    vec2 c1 = vec2(W - 0.16, CEIL - 0.16), c2 = vec2(W - 0.36, CEIL - 0.1);
    vec2 q = vec2(ax, p.y);
    float which = length(q - c1) < 0.075 ? 1.0 : length(q - c2) < 0.05 ? 2.0 : 3.0;
    vec2 nn2 = which == 1.0 ? normalize(q - c1) : which == 2.0 ? normalize(q - c2) : vec2(0.0, -1.0);
    n = normalize(vec3(nn2.x*sign(p.x), nn2.y, 0.0));
    base = which == 1.0 ? GUN*0.8 : which == 2.0 ? mix(EMBER*0.35, GRAPHITE, 0.5) : SOOT*1.4;
    // clamps at every frame, and the cables in the tray
    if (abs(fract(p.z/RIB_EVERY) - 0.5)*RIB_EVERY < 0.05) base = GRAPHITE*0.6;
    if (which == 3.0) base = mix(base, mix(STEEL, GRAPHITE, step(0.5, fract(ax*40.0))), 0.5);
    base *= grime;
  } else if (dm == dWall && !inRoom){
    n = vec3(-sign(p.x), 0.0, 0.0);
    vec2 panel = floor(vec2(p.z, (p.y + 0.3)*1.4));
    float seam = max(step(0.95, fract(p.z)), step(0.94, fract((p.y + 0.3)*1.4)));
    float tone = 0.8 + 0.4*hash12(panel + sign(p.x)*7.0);
    base = mix(GUN*0.6*tone, STEEL*0.8, seam)*grime;
    base = mix(base, STEEL*0.9*grime, step(p.y, FLOOR + 0.35));
    float pipe = step(abs(p.y - 0.62), 0.06);
    base = mix(base, mix(GRAPHITE, PEWTER, step(0.62, p.y))*0.9, pipe);
    float edge = step(abs(fract(p.z/RIB_EVERY) - 0.5)*RIB_EVERY, 0.03);
    base = mix(base, mix(GRAPHITE*0.7, BRUSHED*0.8, edge)*(0.85 + 0.3*fbm3(p*6.0)), rib);
    // wall stencils, read facing the wall: +z runs to the right on the left wall, to the left on the right
    bool left = p.x < 0.0;
    float along = left ? p.z : -p.z;
    float paint = 0.0;
    if (rib < 0.5){
      float z0 = left ? 7.2 : -4.58;
      paint = stencil(0.0, 6.0, vec2((along - z0)/0.06, (0.35 - p.y)/0.06));
      float z1 = left ? 10.6 : -14.68;
      paint = max(paint, stencil(left ? 1.0 : 2.0, 6.0, vec2((along - z1)/0.06, (0.35 - p.y)/0.06)));
      // the bay's number, just short of its opening
      if (side*p.x > 0.0){
        float zl = left ? bz - 2.25 : -(bz - 1.585);
        paint = max(paint, stencil(5.0 + k, 5.0, vec2((along - zl)/0.035, (0.5 - p.y)/0.035)));
      }
      // the frame number on a plate after every rib
      float fr = floor(p.z/RIB_EVERY);
      float fz = p.z - fr*RIB_EVERY;
      if (fz > 0.1 && fz < 0.34 && p.y > -0.38 && p.y < -0.22){
        base = PITCH*1.4;
        float fx = left ? (fz - 0.13)/0.024 : (0.31 - fz)/0.024;
        paint = max(paint, number2(fr + 10.0, vec2(fx, (-0.24 - p.y)/0.024)));
      }
    }
    base = mix(base, SILVER*0.62*grime, paint*wear);
    float panelLight = step(abs(p.z - (bz - BAY_HALF - 0.4)), 0.07)*step(abs(p.y - 0.22), 0.11)*step(0.0, p.x*side);
#ifdef WRECK
    // on the emergency circuit now: red, pulsing
    emit += ALARM*1.4*alarm*panelLight;
    base = mix(base, ALARM*0.5, panelLight);
#else
    emit += EMBER*0.7*panelLight;
    base = mix(base, EMBER*0.5, panelLight);
#endif
    float stripe = step(abs(p.y + 0.55), 0.028)*(1.0 - rib);
    base = mix(base, EMBER*0.45, stripe);
    emit += EMBER*0.08*stripe;
  } else if (dm == dWall && inRoom){
    n = vec3(-side, 0.0, 0.0);
    if (k > 3.5){
      // the observation window: the red Earth and the yard beyond mullions
      bool pane = abs(p.z - bz) < 1.25 && p.y > FLOOR + 0.5 && p.y < CEIL - LINTEL - 0.12;
      float mull = step(abs(abs(p.z - bz) - 0.42), 0.035);
      if (pane && mull < 0.5){
        base = vec3(0.0);
        emit = outside(rd, vec3(side, 0.0, 0.0))*0.95 + SILVER*0.04;
      } else {
        base = GRAPHITE*0.45*grime;
      }
    } else {
      // a lit panel wall, louvred, the light the envoys stand against
      float louvre = 0.72 + 0.28*step(0.22, fract(p.y*5.0 + 0.1));
      float fall = 0.6 + 0.4*smoothstep(FLOOR, CEIL - LINTEL, p.y);
      base = ZINC;
      emit = mix(mix(SILVER, STAR, 0.5), bayTint(k)*1.3, 0.35)*louvre*fall*bayPanel(k);
#ifdef WRECK
      // the bays' panels died with the power: dark louvres
      base = ZINC*0.6*louvre;
      emit = vec3(0.0);
#endif
    }
  } else if (dm == dSide){
    bool wall = dz < CEIL - LINTEL - p.y;
    n = wall ? vec3(0.0, 0.0, -sign(p.z - bz)) : vec3(0.0, -1.0, 0.0);
    float rx = side*p.x - W;
    if (k > 3.5 && wall && p.z > bz && rx > 0.12 && rx < 1.38 && p.y > FLOOR + 0.5 && p.y < CEIL - LINTEL - 0.12 && step(abs(rx - 0.75), 0.035) < 0.5){
      base = vec3(0.0);
      emit = outside(rd, normalize(vec3(side*0.6, 0.0, 0.8)))*0.95 + SILVER*0.04;
    } else if (k > 3.5){
      base = GRAPHITE*0.4*grime;
    } else {
      float louvre = 0.72 + 0.28*step(0.22, fract(p.y*5.0 + 0.1));
      float fall = 0.6 + 0.4*smoothstep(FLOOR, CEIL - LINTEL, p.y);
      base = ZINC;
      emit = wall ? mix(mix(SILVER, STAR, 0.4), bayTint(k)*1.3, 0.35)*louvre*fall*bayPanel(k)*0.7 : mix(RIME, SILVER, 0.5)*0.7;
#ifdef WRECK
      base = ZINC*0.6*louvre;
      emit = vec3(0.0);
#endif
    }
  } else if (dm == dBack){
    // the bulkhead behind: the hatch we came in by, sealed, in the door's striped frame
    n = vec3(0.0, 0.0, 1.0);
    float seam = max(step(0.96, fract(p.x + 0.3)), step(0.95, fract(p.y*1.4 + 0.3)));
    base = mix(GUN*0.6, STEEL*0.8, seam)*grime;
    float hatch = max(abs(p.x) - 0.45, p.y - (FLOOR + 2.0));
    if (hatch < 0.0) base = mix(GRAPHITE*0.8, STEEL, step(0.94, fract(p.y*2.5)))*grime;
    else if (hatch < 0.1) base = mix(EMBER*0.75, PITCH, step(0.5, fract((p.x + p.y)*5.0)));
  } else if (onFig){
    n = normalize(cn);
    float mat = bc.y;
    rimK = 1.0;
#ifdef WRECK
    // seen from a hand's width away the weave's blotches read as a pattern: only a hint of it
    float cloth = 0.95 + 0.1*noise3(p*40.0);
#else
    float cloth = 0.85 + 0.3*noise3(p*40.0);
#endif
    if (mat < 1.5) base = mix(BONE, SILVER, 0.45)*0.8*cloth;
    else if (mat < 2.5) base = BRUSHED*0.62;
    else if (mat < 3.5) base = mix(GRAPHITE, BONE*0.7, 0.35);
    else if (mat < 4.5) base = mix(STONE, AMBER, 0.25)*0.85;
    else if (mat < 5.5) base = mix(STEEL, ZINC, 0.5)*1.6*cloth;
    else if (mat < 6.5) base = GRAPHITE*0.7;
    else if (mat < 7.5){
      // the visor's gold film: the room's light in a streak, a glint of the corridor
      base = PITCH*0.6;
      emit = EMBER*0.07 + GLOW*0.7*pow(max(dot(reflect(rd, n), vec3(0.0, 0.6, 0.8)), 0.0), 12.0);
      rimK = 0.0;
    }
    else if (mat < 8.5){ base = GRAPHITE; emit = EMBER*0.55*step(0.5, fract(uTime*1.5)); }
    else if (mat < 9.5){ base = mix(RUST, GRAPHITE, 0.3); }
    else if (mat < 10.5) base = SILVER*0.5;
    else if (mat < 11.5){
      // the vitals monitor: a trace stepping across, two bars under it
      vec2 s = vec2((p.z - (bz + 1.22))/0.23, (p.y - (FLOOR + 1.26))/0.16);
      float tick = floor(uTime*8.0)/8.0;
      float x = fract(s.x*0.5 + 0.5 - tick*0.25);
      float beat = exp(-pow((x - 0.5)*18.0, 2.0))*0.55 - exp(-pow((x - 0.56)*22.0, 2.0))*0.25;
      float trace = step(abs(s.y - 0.25 - beat), 0.09);
      float bars = step(s.y, -0.35)*step(-0.8, s.y)*step(abs(fract(s.x*2.0) - 0.5), 0.35)*step(fract(s.x*2.0 + 0.5), 0.3 + 0.5*hash11(floor(s.x*2.0) + floor(uTime*2.0)));
      base = SOOT;
      emit = RIME*0.3 + mix(RIME, SILVER, 0.5)*trace*1.2 + EMBER*bars*0.8;
      rimK = 0.0;
    }
    else if (mat < 12.5) base = GRAPHITE*0.9*grime;
    else if (mat < 13.5) base = BRUSHED*0.7;
    else if (mat < 14.5) base = mix(RIME, SILVER, 0.55)*cloth;
    else if (mat < 15.5){
      // a screen: lines of text scrolling up on a stepped clock, a cursor row lit amber
      float row = floor(p.y*34.0 + floor(uTime*3.0));
      float line = step(0.35, fract(p.y*34.0))*step(0.3, hash11(row*1.7))*step(fract(p.z*6.0 + hash11(row)*3.0), 0.3 + 0.6*hash11(row*3.1));
      base = SOOT;
      emit = FROSTC*0.25 + mix(RIME, SILVER, 0.5)*line*0.7 + EMBER*0.5*line*step(0.9, hash11(row*5.3));
      rimK = 0.0;
    }
    else if (mat < 16.5) base = mix(PITCH, RUST, 0.35 + 0.3*hash11(floor(p.z*3.0)));
    else if (mat < 17.5){
      // the cooling undersuit: pale knit crossed by its dark tubing
      base = mix(BONE*0.85, mix(BONE*0.85, GRAPHITE, 0.6), step(0.9, fract(p.y*24.0 + 0.4*sin(p.x*26.0 + p.z*26.0))))*cloth;
    }
#ifdef WRECK
    else if (mat < 20.5){
      // the pod's shell: brushed panels rimed with frost, CRYO 02 down its flank
      vec3 g = podFrame(p);
      base = mix(mix(PEWTER, BRUSHED, 0.5)*0.75, GRAPHITE*0.8, step(0.96, fract(g.x*2.2 + 0.5)));
      base = mix(base, RIME, 0.35*smoothstep(0.45, 0.7, fbm3(g*14.0)));
      // read left to right from either flank
      vec2 sq = vec2(-g.x*sign(g.z), 0.05 - g.y)/0.035;
      float paint = max(stencil(3.0, 4.0, sq + vec2(17.7, 0.0)), number2(2.0, sq + vec2(0.9, 0.0)))*step(0.3, abs(g.z));
      base = mix(base, PITCH, paint);
      rimK = 0.0;
    }
    else if (mat < 21.5){
      // The window. Under the frost the sleeper lies on their back, head to +x, one arm raised; the
      // hand they pressed to the glass from inside is the one sharp thing, the frost melted round it
      // and smeared where it slid. Hand and crack sit on the -z half, the half the tilt turns to the
      // player.
      vec2 h = podFrame(p).xz;
      float body = min(length(h - vec2(0.6, 0.0)) - 0.1, sdSeg(h, vec2(0.44, 0.0), vec2(-0.12, 0.0), 0.16));
      body = min(body, min(sdSeg(h, vec2(-0.12, 0.07), vec2(-0.8, 0.08), 0.075), sdSeg(h, vec2(-0.12, -0.07), vec2(-0.8, -0.09), 0.075)));
      body = min(body, min(sdSeg(h, vec2(0.4, -0.16), vec2(0.24, -0.11), 0.05), sdSeg(h, vec2(0.4, 0.16), vec2(0.1, 0.2), 0.045)));
      vec3 inside = mix(GUN*0.55, PITCH*0.4, step(body, 0.0));
      vec2 hp = h - vec2(0.16, -0.1);
      float hand = (length(hp/vec2(0.065, 0.055)) - 1.0)*0.055;
      for (int j = 0; j < 4; j++){
        float fj = float(j);
        vec2 knuckle = vec2(0.05, -0.036 + fj*0.024);
        hand = min(hand, sdSeg(hp, knuckle, knuckle + vec2(0.085 - abs(fj - 1.5)*0.014, (fj - 1.5)*0.01), 0.011));
      }
      hand = min(hand, sdSeg(hp, vec2(0.0, -0.05), vec2(0.04, -0.09), 0.012));
      float edge = smoothstep(0.55, 1.0, max(abs(h.x)/0.86, abs(h.y)/0.29));
      float frost = clamp(0.3 + 0.35*fbm3(vec3(h*11.0, 2.0)) + 0.4*edge, 0.0, 1.0)*smoothstep(0.0, 0.05, hand);
      frost *= 1.0 - 0.55*step(abs(hp.y), 0.045)*step(-0.22, hp.x)*step(hp.x, 0.0)*step(0.5, fract(hp.y*55.0));
      // a grey frost, so the pale hand is the brightest thing on the glass
      base = mix(inside, mix(FROSTC, RIME, 0.6)*0.9, frost);
      if (hand < 0.0) base = hand > -0.007 ? PITCH : mix(SILVER, BONE, 0.4)*0.65;
      // the crack, jagged from the lid's corner toward the hand
      float crack = min(sdSeg(h, CRACK.xz, vec2(0.33, 0.02), 0.0), min(sdSeg(h, vec2(0.33, 0.02), vec2(0.27, -0.04), 0.0), sdSeg(h, vec2(0.27, -0.04), vec2(0.22, -0.02), 0.0)));
      base = mix(base, crack < 0.004 ? PITCH : SILVER, step(crack, 0.008));
      rimK = 0.0;
    }
    else {
      // frozen blood: dark red beads, each with a glint of the head lamp
      base = mix(GARNET, RUST, 0.4)*0.8;
      emit = LAMP*0.7*pow(max(dot(reflect(rd, n), -rd), 0.0), 16.0);
      rimK = 0.0;
    }
#endif
    base *= ao;
  } else if (onSuit){
    n = normalize(cn);
    // the spare suits, lit from inside their lockers once the lockers come up
    base = mix(BONE, SILVER, 0.45)*mix(0.12, 0.55, uP.w)*(0.85 + 0.3*noise3(p*40.0));
    col_suitLight = mix(RIME, SILVER, 0.6)*uP.w*(0.35 + 0.65*max(n.y, 0.0))*0.6;
    rimK = 2.0;
  } else {
    // the end wall: the lockers, the door in its striped frame, the mission's patch and its name
    n = vec3(0.0, 0.0, -1.0);
    float locker = lockerCell(p);
    float door = doorAt(p);
    float seam = max(step(0.96, fract(p.x + 0.3)), step(0.95, fract(p.y*1.4 + 0.3)));
    base = mix(GUN*0.6, STEEL*0.8, seam)*grime;
    if (locker > 0.5){
      base = SOOT;
      float fall = 0.35 + 0.65*smoothstep(FLOOR, FLOOR + 2.0, p.y);
      emit = mix(RIME, SILVER, 0.5)*fall*uP.w*1.2;
    } else if (door > 0.5){
      float core = smoothstep(0.55, 0.0, abs(p.x - 0.55)/0.4);
      float slat = 0.7 + 0.3*step(0.35, fract(p.y*5.0));
      float lift = 0.75 + 0.25*smoothstep(FLOOR, FLOOR + 2.1, p.y);
#ifdef WRECK
      // the door is dead, jammed shut
      base = STEEL*0.7*slat;
#else
      // bright enough to land on the palette's lit end: lower, it snaps to tan and stops reading as light
      emit = GLOW*(0.7 + 0.5*core)*(0.6 + 0.5*uP.z)*slat*lift;
      base = GLOW*0.15;
#endif
    } else {
      float frame = step(0.0, 0.1 - max(max(0.15 - p.x, p.x - 0.95), p.y - (FLOOR + 2.1)));
      float chev = step(0.5, fract((p.x + p.y)*5.0));
      base = mix(base, mix(EMBER*0.75, PITCH, chev), frame);
      // the patch: a world, its orbit and a ship on it, in a gold ring
      vec2 pc = p.xy - vec2(-0.7, 0.71);
      float r = length(pc);
      if (r < 0.215){
        base = r > 0.2 ? PITCH : r > 0.17 ? EMBER*0.7 : mix(IRON, STEEL, smoothstep(-0.17, 0.17, pc.y));
        if (r < 0.17){
          float planet = length(pc - vec2(-0.03, -0.04)) - 0.075;
          if (planet < 0.0) base = mix(RUST, AMBER, step(0.0, dot(normalize(pc - vec2(-0.03, -0.04)), vec2(0.6, 0.8))));
          vec2 oc = (pc - vec2(-0.03, -0.04))*vec2(1.0, 2.6);
          float orbit = abs(length(oc) - 0.125);
          if (orbit < 0.012 && !(planet < 0.0 && oc.y > 0.0)) base = SILVER*0.8;
          if (length(pc - vec2(0.09, 0.03)) < 0.018) base = STAR;
        }
        base *= 0.6 + 0.4*wear;
      }
      // HERMES over the door
      float name = stencil(4.0, 6.0, vec2((p.x - 0.16)/0.034, (0.86 - p.y)/0.034));
      base = mix(base, SILVER*0.7, name*(0.6 + 0.4*wear));
#ifndef WRECK
      // the beacons on the frame's top corners, turning on a stepped clock
      float bl = length(p.xy - BEACON_L.xy), br = length(p.xy - BEACON_R.xy);
      if (min(bl, br) < 0.05){
        float ph = fract(uTime*0.8 + (bl < br ? 0.0 : 0.5));
        base = EMBER*0.3;
        emit = EMBER*(0.25 + 1.1*step(ph, 0.25));
      }
#endif
    }
  }

  // --- light: the strips overhead, the door ahead, and the bays' spill
  vec3 col = base*0.03*vec3(0.9, 1.0, 1.2);
  vec3 stripCol = mix(RIME, STAR, 0.7);
  float ks = floor((p.z - 1.5)/STRIP_EVERY + 0.5);
  for (int i = -1; i <= 1; i++){
    float kk = ks + float(i);
    float sz = kk*STRIP_EVERY + 1.5;
    if (sz < BACK_Z || sz > DOOR_Z - 0.5) continue;
    vec3 c = vec3(0.0, CEIL - 0.03, sz + clamp(p.z - sz, -0.6, 0.6));
    vec3 L = c - p;
    float d2 = dot(L, L);
    L *= inversesqrt(d2);
    col += base*stripCol*stripOn(kk)*(max(dot(n, L), 0.0) + 0.12)*2.2/(1.0 + 1.6*d2);
  }
  vec3 Ld = DOOR_POS - p;
  float dd2 = dot(Ld, Ld);
  Ld *= inversesqrt(dd2);
  col += base*GLOW*uP.z*max(dot(n, Ld), 0.0)*2.6/(1.0 + 0.06*dd2);
  if (dm == dFloor) col += GLOW*uP.z*pow(max(dot(reflect(rd, n), Ld), 0.0), 14.0)*0.25/(1.0 + 0.03*dd2);
#ifdef WRECK
  {
    // the head lamp: a cone from the eye, the only white light left
    float cone = smoothstep(0.82, 0.96, dot(rd, fwd));
    // held below white at arm's length, or the frost and the hand on the glass burn out
    col += base*LAMP*(0.15 + 0.85*cone)*max(dot(n, -rd), 0.0)*1.4/(1.0 + 0.05*t*t);
    // the nearest emergency lamp, beside its bay's opening
    vec3 La = vec3(side*(W - 0.05), 0.22, bz - BAY_HALF - 0.4) - p;
    float da2 = dot(La, La);
    La *= inversesqrt(da2);
    col += base*ALARM*alarm*(max(dot(n, La), 0.0) + 0.12)*3.2/(1.0 + 0.35*da2);
    // the world's light falling through the breach
    vec3 Lw = vec3(BREACH.x, CEIL + 1.2, BREACH.y) - p;
    float dw2 = dot(Lw, Lw);
    Lw *= inversesqrt(dw2);
    col += base*mix(BONE, AMBER, 0.4)*max(dot(n, Lw), 0.0)*6.0/(1.0 + 0.15*dw2);
  }
#else
  // the bay's light: white rooms, and the red Earth's light in the observation bay
  {
    vec3 bp = vec3(side*(W + BAY_DEPTH - 0.05), -0.3, bz);
    vec3 Lb = bp - p;
    float db2 = dot(Lb, Lb);
    Lb *= inversesqrt(db2);
    float vis = inRoom ? 1.0 : 0.4*smoothstep(BAY_HALF + 1.2, BAY_HALF, abs(p.z - bz));
    vec3 bayCol = bayTint(k);
    col += base*bayCol*max(dot(n, Lb), 0.0)*3.0/(1.0 + 0.3*db2)*vis;
    // what stands in a bay is bathed in its light from every side, not only from behind
    if (onFig) col += base*bayCol*(0.35 + 0.25*max(dot(n, vec3(-side, 0.3, -0.4)), 0.0));
    if (rimK > 0.0){
      float rim = pow(1.0 - max(dot(n, -rd), 0.0), 2.0);
      vec3 from = rimK > 1.5 ? vec3(0.0, 0.0, 1.0) : vec3(side, 0.0, 0.0);
      float lit = rimK > 1.5 ? uP.w : 1.0;
      vec3 rimCol = rimK > 1.5 ? mix(RIME, SILVER, 0.6) : k > 3.5 ? mix(AMBER, GLOW, 0.3) : mix(bayTint(k), SILVER, 0.5);
      col = mix(col, rimCol, rim*lit*(0.4 + 0.6*max(dot(n, from), 0.0)));
    }
  }
#endif
  col += emit + base*col_suitLight;

  // --- the air: haze with distance, warmed where the door's light hangs in it
  vec3 toDoor = normalize(DOOR_POS - ro);
  float dd = max(dot(rd, toDoor), 0.0);
  float hz = 1.0 - exp(-t*0.065);
#ifdef WRECK
  // no air left to hold light: the dark simply swallows the far end
  vec3 hazeCol = PITCH*0.5;
#else
  vec3 hazeCol = IRON*0.9 + GLOW*0.16*uP.z*pow(dd, 6.0);
#endif
  col = mix(col, hazeCol, hz*0.85);
  col += GLOW*pow(dd, 90.0)*uP.z*0.35*smoothstep(2.0, 8.0, t);
#ifndef WRECK
  // the beacons' flash hanging in the air
  for (int j = 0; j < 2; j++){
    vec3 B = j == 0 ? BEACON_L : BEACON_R;
    float on = step(fract(uTime*0.8 + float(j)*0.5), 0.25);
    float a = max(dot(rd, normalize(B - ro)), 0.0);
    col += EMBER*on*(pow(a, 900.0)*0.6 + pow(a, 120.0)*0.08);
  }
#endif

  // steam from a pipe joint, in bursts on a stepped clock
  {
    float burst = step(0.4, hash11(floor(uTime*0.8) + 3.0));
    if (burst > 0.0){
      float puff = floor(uTime*6.0)/6.0;
      vec3 dir = normalize(vec3(-0.45, -1.0, 0.2));
      float dens = 0.0;
      for (int j = 0; j < 6; j++){
        float s = (float(j) + 0.5)/6.0;
        vec3 A = VENT + dir*s*1.1 + vec3(0.0, 0.0, 0.08*sin(puff*7.0 + s*5.0));
        float ta = dot(A - ro, rd);
        if (ta > 0.0 && ta < t){
          float r = 0.05 + 0.2*s;
          float dist = length(ro + rd*ta - A);
          dens += exp(-dist*dist/(r*r))*(1.0 - s*0.8);
        }
      }
      float grain = 0.6 + 0.8*noise3(vec3(uv*40.0, puff*3.0));
      col = mix(col, mix(RIME, SILVER, 0.6), clamp(dens*0.28*grain, 0.0, 0.6));
    }
  }

  // what the edge pass needs of this cell: its colour, its depth and facing; the hands keep their own edges
  vec4 hd = hands(uv);
  col = mix(col, hd.rgb, hd.a);
  gl_FragColor = edgeCell(snapIndex(col, frag), t, n, hd.a < 0.5);
}

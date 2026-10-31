// Shot 6: the corridor the player walks in POV to the lit door, past the bays the crew has just
// left, to the three lockers beside it. Raymarched: the corridor is an octagon, its corners cut
// top and bottom, four lines of light running its length (two in the upper cuts, two at the deck's
// edge) that wake around the player; the bays are rooms off it, each framed in its own light.
// uP = [z, head rise over the legs, door glow, lockers lit], uQ = [head sway across, x, heading, pitch].
// Bays, alternating left and right: suit-up, medical, mess, comms, and the window on the red Earth.
// The spare suits and the player's own legs come from human.glsl, the colours from the generated snapPalette.
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
const float CHAMFER = 0.5;       // the octagon's cut, top and bottom corners; a bay's opening stops where the upper one begins
const float LINTEL = CHAMFER;
const float LINE_W = 0.045;      // the light lines' width
const float FOCAL = 0.85;        // ~61 degrees tall: a helmet's view
const float ROLL = 0.2;          // the head rolls this far (rad per unit of sway) over the boot it leans on
const float FIG_FACETS = 2.0;   // a figure's normal snaps to this many steps per axis: flat facets, not a gradient
const vec3 DOOR_POS = vec3(0.55, -0.5, DOOR_Z - 0.1);
// the repair job: an open wall panel between the medical and mess bays (its centre, on the left wall,
// between ribs), the opening's half height and half length, and where the drone's weld tip works
const vec3 PANEL = vec3(-W, -0.3, 13.5);
const vec2 PANEL_HALF = vec2(0.42, 0.3);
const vec3 WELD_AT = PANEL + vec3(0.07, 0.11, -0.11);
const vec3 SPARK = vec3(0.78, 0.88, 1.0);
const float HOLO_S = 0.6;           // the crew profile over the comms plate stands this tall, as a share of a person
#ifdef WRECK
const float HULL_T = 0.12;       // the hull plate the breach is torn through
const vec4 BREACH = vec4(-0.15, 14.6, 0.85, 1.25);   // its centre (x, z) and half-size across the ceiling
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
const vec3 LAMP = vec3(214.0, 214.0, 212.0)/255.0;
const vec3 ALARM = vec3(174.0, 72.0, 52.0)/255.0;
const vec3 GARNET = vec3(104.0, 52.0, 66.0)/255.0;
#endif

// --- stencils, in the 3x5 font common.glsl declares
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

// the lines of light: cold white; they burn brightest round the player and a few metres ahead, dim
// with distance, and settle again behind
const vec3 LINE = mix(RIME, STAR, 0.75);
float lineWake(float z){ return 0.3 + 0.7*smoothstep(7.0, 0.0, abs(z - (uP.x + 2.5)) - 2.5); }
// a line segment between two ribs: in the wreck all but one are dead, and that one buzzes back now and then
float lineOn(float k){
#ifdef WRECK
  if (abs(k - 7.0) > 0.5) return 0.0;
  return step(0.55, hash11(floor(uTime*11.0)))*step(0.4, hash11(floor(uTime*0.9) + 7.0));
#else
  if (hash11(k*7.31 + 0.5) > 0.08) return 1.0;
  return step(0.2, hash11(k*3.7 + floor(uTime*9.0)));
#endif
}
// where the upper lines run: the middle of each upper cut, on this side of the corridor
vec3 lineAt(float sd, float z){ return vec3(sd*(W - 0.25*CHAMFER), CEIL - 0.75*CHAMFER, z); }

// Materials: the envoy suit's from human.glsl (27 white skin, 19 hard white parts, 26 lines of cold
// light, 28 dark seams and soles, 30 the helmet's visor), the bays' own: 6 dark fittings,
// 10 mattress, 11 vitals monitor, 12 furniture, 13 brushed rail, 15 console screen, 32 the world
// hologram, 34 the crew hologram, 35 its projector's ring and the relay light; the repair job's 36 open
// cavity and 37 weld spark.

#ifndef WRECK
// a suit's frame from the bay's (rx, y, z): hung at `at`, facing angle a (0 = into the room)
vec3 huAt(vec3 q, vec2 at, float a){
  vec2 d = vec2(q.x - at.x, q.z - at.y);
  vec2 fw = vec2(cos(a), sin(a));
  return vec3(dot(d, fw), q.y, dot(d, vec2(-fw.y, fw.x)));
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
float bayPanel(float k){ return k < 0.5 ? 1.0 : k < 1.5 ? 0.95 : k < 2.5 ? 1.0 : 0.5; }
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
  // the spare suits racked in the suit-up bay, hung from the rail by their rods
  if (k < 0.5) for (int j = 0; j < 3; j++){
    vec3 f = huAt(q, vec2(1.36, -0.45 - float(j)*0.48), PI);
    r = opU(r, huSuit(f, 1.02).xy);
    r = opU(r, vec2(huCone(f - vec3(0.0, 1.58, 0.0), vec3(0.0), vec3(0.0, 0.44, 0.0), 0.012, 0.012), 6.0));
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
    // the console and its screen, a stool; the candidate world turning above the console as a
    // hologram, drawn on every other row of the grid so it stays two colours deep
    r = opU(r, vec2(huBox(q - vec3(1.32, 0.38, -0.1), vec3(0.18, 0.38, 0.9), 0.02), 12.0));
    if (mod(floor(gl_FragCoord.y), 2.0) < 0.5) r = opU(r, vec2(length(q - vec3(1.1, 1.4, -0.1)) - 0.2, 32.0));
    vec3 sc = q - vec3(1.43, 1.12, -0.1);
    r = opU(r, vec2(huBox(sc, vec3(0.04, 0.3, 0.85), 0.01), sc.x < -0.02 ? 15.0 : 6.0));
    r = opU(r, vec2(min(huCone(q, vec3(0.8, 0.0, -0.3), vec3(0.8, 0.46, -0.3), 0.03, 0.03), huBox(q - vec3(0.8, 0.48, -0.3), vec3(0.14, 0.02, 0.14), 0.02)), 6.0));
    // a crew profile turning over the projector plate by the console, a recording on its own clock,
    // drawn on every other row like the world above the console
    vec2 pl = q.xz - vec2(0.6, 0.65);
    r = opU(r, vec2(max(length(pl) - 0.22, abs(q.y - 0.02) - 0.02), 6.0));
    r = opU(r, vec2(max(abs(length(pl) - 0.2) - 0.01, abs(q.y - 0.045) - 0.004), 35.0));
    if (mod(floor(gl_FragCoord.y), 2.0) < 0.5){
      vec3 f = huYaw(q - vec3(0.6, 0.05, 0.65), floor(uTime*4.0)*0.1)/HOLO_S;
      vec3 h = huSuit(f, 0.95);
      h.x = min(h.x, huCone(f, vec3(-0.01, 1.46, 0.0), vec3(0.005, 1.575, 0.0), 0.06, 0.05));
      h.x = min(h.x, length(f - vec3(0.01, 1.655, 0.0)) - 0.105);
      r = opU(r, vec2(h.x*HOLO_S, 34.0));
    }
  } else {
    // the rail along the glass
    r = opU(r, vec2(max(length(vec2(rx - 1.38, y - 1.02)) - 0.028, abs(z) - 1.4), 13.0));
  }
  return r;
}

#ifndef WRECK
// the suits hanging in the lockers, one per role, each helmet on the shelf above it
vec2 lockerSuit(vec3 p){
  if (p.z < DOOR_Z - 1.0) return vec2(1e9, 0.0);
  const float S = 1.2;
  vec2 d = vec2(1e9, 0.0);
  for (int i = 0; i < 3; i++){
    vec3 f = vec3(DOOR_Z + 0.32 - p.z, p.y - FLOOR, p.x + 1.21 - float(i)*0.5)*S;
    vec2 suit = huSuit(f, 0.95).xy;
    suit = opU(suit, vec2(huCone(f, vec3(0.0, 1.5, 0.0), vec3(0.0, 1.9, 0.0), 0.012, 0.012), 6.0));
    suit = opU(suit, helmetAt(f - vec3(0.02, 2.07, 0.0)));
    suit = opU(suit, vec2(huBox(f - vec3(0.0, 1.89, 0.0), vec3(0.2, 0.015, 0.22), 0.005), 6.0));
    suit.x /= S;
    d = opU(d, suit);
  }
  return d;
}
#endif

// The repair job: the panel off the wall and leaning beside the opening, the cable guts and a relay
// behind, the drone hovering at the opening with its tool on a jointed arm, its weld tip sparking on
// its own clock. In the wreck the panel is still open and the drone lies on the deck beneath it.
vec2 repair(vec3 p){
  vec3 q = (p - PANEL)*vec3(-sign(PANEL.x), 1.0, 1.0);   // x into the corridor, y up, z along
  float bound = huBox(q - vec3(0.45, -0.4, 0.3), vec3(0.6, 1.1, 1.0), 0.0);
  if (bound > 0.1) return vec2(bound, 0.0);
  vec2 r = vec2(huBox(q - vec3(0.005, 0.0, 0.0), vec3(0.012, PANEL_HALF.x, PANEL_HALF.y), 0.003), 36.0);
  for (int i = 0; i < 4; i++){
    float fi = float(i);
    float y = -0.3 + fi*0.18;
    r = opU(r, vec2(huCone(q, vec3(0.03, y, -0.28), vec3(0.03, y + 0.03*sin(fi*1.7), 0.28), 0.012, 0.012), i == 1 ? 13.0 : 28.0));
  }
  r = opU(r, vec2(huBox(q - vec3(0.03, 0.12, 0.12), vec3(0.025, 0.05, 0.07), 0.005), 6.0));
  r = opU(r, vec2(huBox(q - vec3(0.055, 0.14, 0.14), vec3(0.004, 0.006, 0.006), 0.002), 35.0));
  // the panel, leaning on the wall beside the opening, its foot on the deck's chamfer
  vec3 lq = q - vec3(0.16, -0.85, 0.9);
  lq.xy = vec2(0.93*lq.x + 0.36*lq.y, -0.36*lq.x + 0.93*lq.y);
  r = opU(r, vec2(huBox(lq, vec3(0.012, PANEL_HALF.x, PANEL_HALF.y), 0.004), 12.0));
#ifdef WRECK
  // down on the deck, on its side, the arm limp
  vec3 bq = q - vec3(0.7, -1.22, 0.15);
  bq.xy = vec2(0.95*bq.x - 0.3*bq.y, 0.3*bq.x + 0.95*bq.y);
  r = opU(r, vec2(huBox(bq, vec3(0.1, 0.06, 0.09), 0.025), 19.0));
  r = opU(r, vec2(huBox(bq - vec3(0.0, -0.045, 0.0), vec3(0.102, 0.012, 0.092), 0.004), 28.0));
  r = opU(r, vec2(huCone(q, vec3(0.6, -1.2, 0.15), vec3(0.35, -1.29, 0.0), 0.02, 0.012), 28.0));
  r = opU(r, vec2(length(q - vec3(0.33, -1.29, -0.01)) - 0.015, 37.0));
#else
  // hovering at the opening, a slight bob on a stepped clock
  vec3 bq = q - vec3(0.45, 0.05 + 0.012*sin(floor(uTime*6.0)*0.42), 0.0);
  r = opU(r, vec2(huBox(bq, vec3(0.1, 0.06, 0.09), 0.025), 19.0));
  r = opU(r, vec2(huBox(bq - vec3(0.0, -0.045, 0.0), vec3(0.102, 0.012, 0.092), 0.004), 28.0));
  r = opU(r, vec2(huBox(bq - vec3(-0.06, 0.065, -0.05), vec3(0.012, 0.006, 0.012), 0.003), 26.0));
  r = opU(r, vec2(huCone(q, bq + vec3(-0.1, -0.03, -0.02), vec3(0.09, 0.1, -0.1), 0.02, 0.012), 28.0));
  r = opU(r, vec2(length(q - (WELD_AT - PANEL)*vec3(-sign(PANEL.x), 1.0, 1.0)) - 0.02, 37.0));
#endif
  return r;
}

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
  // the octagon: the upper corners are cut all along (a bay's opening stops where the cut begins),
  // the lower ones outside the openings, where the deck runs on into the room
  if (abs(p.x) <= W){
    d = min(d, (W + CEIL - CHAMFER - abs(p.x) - p.y)*0.7071 - inset);
    if (!slot) d = min(d, (W - FLOOR - CHAMFER - abs(p.x) + p.y)*0.7071 - inset);
  }
  return min(d, dx);
}

// The head's lean across (uQ.x, over the boot bearing the weight) and its rise (uP.y) from the eye's
// rest, as js/intro/gait.js rides the stance leg. x across, y up. The body under it is huPlayer.
vec2 gaitLean(){ return vec2(uQ.x, uP.y); }

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
// what stands in the corridor: the bays' contents, the spare suits in the lockers, the player
vec2 contents(vec3 p){
#ifdef WRECK
  return opU(opU(bayContents(p), pod(p)), opU(opU(debris(p), repair(p)), huPlayer(p, FLOOR)));
#else
  return opU(opU(bayContents(p), lockerSuit(p)), opU(repair(p), huPlayer(p, FLOOR)));
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

// the weld's spark, in bursts on its own clock
float weld(){ return step(0.55, hash11(floor(uTime*24.0))); }
// the one direction the observation bay's glass looks out along, whichever pane: the same sky through both
vec3 outboard(float side){ return normalize(vec3(side, 0.0, 0.45)); }
vec3 outside(vec3 rd, vec3 A){
  vec3 U = vec3(0.0, 1.0, 0.0);
  vec3 Rt = normalize(cross(A, U));
  vec3 col = planetOver(stars(rd)*0.8, rd, normalize(A - U*0.72), 0.7, normalize(U*0.75 - A*0.35 - Rt*0.3));
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
  // the head rolls a hair toward the boot it leans over
  vec2 lean = gaitLean();
  float cr = cos(lean.x*ROLL), sr = sin(lean.x*ROLL);
  vec3 rr = right*cr - up*sr;
  up = up*cr + right*sr;
  right = rr;
  vec3 rd = normalize(uv.x*right + uv.y*up + FOCAL*fwd);
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
      float d = min(shell(at), min(min(DOOR_Z + recess(at) - at.z, at.z - BACK_Z), c.x));
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
  bool slotHit = dz > 0.0 && p.y < CEIL - LINTEL && p.x*side > 0.0;
  float dChamU = inRoom ? 1e9 : (W + CEIL - CHAMFER - abs(p.x) - p.y)*0.7071 - inset;
  float dChamL = inRoom || slotHit ? 1e9 : (W - FLOOR - CHAMFER - abs(p.x) + p.y)*0.7071 - inset;
  float dEnd = DOOR_Z + recess(p) - p.z;
  float dBack = p.z - BACK_Z;
  float dm = min(min(min(dFloor, dCeil), min(dWall, dSide)), min(min(bc.x, min(dChamU, dChamL)), min(dEnd, dBack)));
  bool onFig = dm == bc.x;
  // the spare suits in the lockers wait in the dark until the lockers come up
  bool inLocker = onFig && p.z > DOOR_Z - 1.0;

  vec3 n = vec3(0.0, 1.0, 0.0);
  vec3 base = GUN;
  vec3 emit = vec3(0.0);
  float rimK = 0.0;      // silhouettes: a backlit edge instead of a lit face
  float gloss = 0.0;     // hard shells: the lights' highlights on them
  vec3 col_suitLight = vec3(0.0);
  float rib = ribAt(p.z);
  float grime = 0.85 + 0.3*fbm3(p*1.7);
  // worn paint: what is still painted flakes where the deck is walked and the walls are scuffed
  float wear = 0.35 + 0.65*smoothstep(0.3, 0.45, fbm3(p*9.0));
  // the line segment between ribs this point is in, and how awake the lines are here
  float seg = floor(p.z/RIB_EVERY);
  float wake = lineWake(p.z);
#ifdef WRECK
  float alarm = 0.3 + 0.7*step(0.5, fract(uTime*0.6));
#endif

  if (dm == dFloor){
    n = vec3(0.0, 1.0, 0.0);
    // a flush plated deck: a walkway plate down the middle, panels either side, fine seams between
    float walkway = step(abs(p.x), 0.55);
    float seam = max(step(0.96, fract(p.z)), step(abs(abs(p.x) - 0.55), 0.02));
    base = mix(mix(GRAPHITE*0.72, GUN*0.8, walkway), STEEL*0.7, seam)*grime;
    // CRYO written on the walkway in light, and three chevrons after it that light one after the
    // other toward the door; read walking forward
    float word = 0.0, chev = 0.0;
    float beat = mod(floor(uTime*2.5), 3.0);
    for (int j = 0; j < 4; j++){
      float z0 = 4.6 + float(j)*7.8;
      word = max(word, stencil(3.0, 4.0, vec2((p.x + 0.45)/0.06, (z0 + 0.45 - p.z)/0.09)));
      for (int i = 0; i < 3; i++){
        float cz = p.z - (z0 + 0.62 + float(i)*0.26);
        float on = step(abs(cz - (0.2 - abs(p.x)*0.6)), 0.045)*step(abs(p.x), 0.34)*step(-0.22, cz);
        chev = max(chev, on*(0.35 + 0.65*step(abs(beat - float(i)), 0.5)));
      }
    }
#ifdef WRECK
    base = mix(base, GRAPHITE*0.5, max(word, chev));
#else
    base = mix(base, PITCH, max(word, step(0.01, chev)));
    emit += LINE*(0.8*word + chev)*wake;
    // a line of the door's light across the deck at the threshold
    emit += GLOW*(0.5 + 0.5*uP.z)*step(abs(p.z - (DOOR_Z - 0.55)), 0.025)*step(abs(p.x - 0.55), 0.48);
#endif
    // contact shadow: the deck darkens under feet, benches and beds
    base *= shade;
  } else if (dm == dCeil){
    n = vec3(0.0, -1.0, 0.0);
    // flush panels, a spine seam down the middle
    base = mix(GRAPHITE*0.55, SOOT, max(step(abs(abs(p.x) - 0.6), 0.02), step(abs(p.x), 0.03)))*grime;
  } else if (dm == dChamU || dm == dChamL){
    // the octagon's cuts, and the lines of light along them: the upper ones mid-face, the lower ones at
    // the deck's edge, both broken at every rib; the top of a bay's jamb light sits on the upper cut
    bool upper = dm == dChamU;
    n = normalize(vec3(-sign(p.x), upper ? -1.0 : 1.0, 0.0));
    float along = (upper ? p.y - (CEIL - CHAMFER) : (FLOOR + CHAMFER) - p.y)*1.4142;
    float panel = 0.8 + 0.4*hash12(vec2(seg, sign(p.x)*(upper ? 3.0 : 5.0)));
    base = mix(GUN*0.55*panel, GRAPHITE*0.7, rib)*grime;
    float line = step(abs(along - (upper ? 0.5*CHAMFER*1.4142 : 0.85*CHAMFER*1.4142)), 0.5*LINE_W)*(1.0 - rib);
    float on = lineOn(seg);
#ifdef WRECK
    if (upper) emit += LINE*on*line;
    else emit += ALARM*1.3*alarm*line;
    base = mix(base, upper ? GRAPHITE*0.6 : ALARM*0.3, line);
#else
    emit += LINE*(0.25 + 1.1*on*wake)*line;
    base = mix(base, PITCH, line);
    float jamb = step(abs(p.z - bz), BAY_HALF + 0.06)*step(0.0, p.x*side)*step(along, 0.06)*float(upper);
    emit += bayTint(k)*1.3*jamb;
    base = mix(base, bayTint(k)*0.4, jamb);
#endif
  } else if (dm == dWall && !inRoom){
    n = vec3(-sign(p.x), 0.0, 0.0);
    vec2 panel = floor(vec2(p.z, (p.y + 0.3)*1.4));
    float seam = max(step(0.95, fract(p.z)), step(0.94, fract((p.y + 0.3)*1.4)));
    float tone = 0.8 + 0.4*hash12(panel + sign(p.x)*7.0);
    base = mix(GUN*0.6*tone, STEEL*0.8, seam)*grime;
    float edge = step(abs(fract(p.z/RIB_EVERY) - 0.5)*RIB_EVERY, 0.03);
    base = mix(base, mix(GRAPHITE*0.7, BRUSHED*0.8, edge)*(0.85 + 0.3*fbm3(p*6.0)), rib);
    // wall stencils, read facing the wall: +z runs to the right on the left wall, to the left on the right
    bool left = p.x < 0.0;
    float along = left ? p.z : -p.z;
    // the words are light: the deck's signs, the bay's number in the bay's own colour, the frame
    // number on its plate after every rib; in the wreck they are dark paint
    float paint = 0.0, bayPaint = 0.0;
    if (rib < 0.5){
      float z0 = left ? 7.2 : -4.58;
      paint = stencil(0.0, 6.0, vec2((along - z0)/0.06, (0.35 - p.y)/0.06));
      float z1 = left ? 10.6 : -14.68;
      paint = max(paint, stencil(left ? 1.0 : 2.0, 6.0, vec2((along - z1)/0.06, (0.35 - p.y)/0.06)));
      if (side*p.x > 0.0){
        float zl = left ? bz - 2.25 : -(bz - 1.585);
        bayPaint = stencil(5.0 + k, 5.0, vec2((along - zl)/0.035, (0.5 - p.y)/0.035));
      }
      float fr = floor(p.z/RIB_EVERY);
      float fz = p.z - fr*RIB_EVERY;
      if (fz > 0.1 && fz < 0.34 && p.y > -0.38 && p.y < -0.22){
        base = PITCH*1.4;
        float fx = left ? (fz - 0.13)/0.024 : (0.31 - fz)/0.024;
        paint = max(paint, number2(fr + 10.0, vec2(fx, (-0.24 - p.y)/0.024)));
      }
    }
    // the jamb: a line of the bay's light down each side of its opening
    float jamb = step(0.0, p.x*side)*step(abs(abs(p.z - bz) - BAY_HALF - 0.03), 0.03)*step(p.y, CEIL - LINTEL);
#ifdef WRECK
    base = mix(base, GRAPHITE*0.7*grime, max(paint, bayPaint)*wear);
    // the jamb on the emergency circuit now: red, pulsing
    emit += ALARM*1.4*alarm*jamb;
    base = mix(base, ALARM*0.5, jamb);
#else
    base = mix(base, PITCH, max(paint, bayPaint));
    emit += LINE*0.9*paint*wake + bayTint(k)*1.3*bayPaint;
    emit += bayTint(k)*1.3*jamb;
    base = mix(base, bayTint(k)*0.4, jamb);
#endif
  } else if (dm == dWall && inRoom){
    n = vec3(-side, 0.0, 0.0);
    if (k > 3.5){
      // the observation window: the red Earth and the yard beyond mullions
      bool pane = abs(p.z - bz) < 1.25 && p.y > FLOOR + 0.5 && p.y < CEIL - LINTEL - 0.12;
      float mull = step(abs(abs(p.z - bz) - 0.42), 0.035);
      if (pane && mull < 0.5){
        base = vec3(0.0);
        emit = outside(rd, outboard(side))*0.95 + SILVER*0.04;
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
      emit = outside(rd, outboard(side))*0.95 + SILVER*0.04;
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
    n = normalize(floor(normalize(cn)*FIG_FACETS + 0.5));
    float mat = bc.y;
    rimK = 1.0;
    if (mat < 6.5) base = GRAPHITE*0.7;
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
    else if (mat < 15.5){
      // a screen: lines of text scrolling up on a stepped clock, a cursor row lit amber
      float row = floor(p.y*34.0 + floor(uTime*3.0));
      float line = step(0.35, fract(p.y*34.0))*step(0.3, hash11(row*1.7))*step(fract(p.z*6.0 + hash11(row)*3.0), 0.3 + 0.6*hash11(row*3.1));
      base = SOOT;
      emit = FROSTC*0.25 + mix(RIME, SILVER, 0.5)*line*0.7 + EMBER*0.5*line*step(0.9, hash11(row*5.3));
      rimK = 0.0;
    }
    else if (mat < 19.5){ base = mix(SILVER, STAR, 0.55); gloss = 0.7; }
    else if (mat > 25.5 && mat < 26.5){
      // the suit's own lights: they burn on its own power, in the wreck too
      base = PITCH;
      emit = mix(RIME, STAR, 0.75)*1.4;
      rimK = 0.0;
    }
    else if (mat > 26.5 && mat < 27.5){ base = mix(SILVER, STAR, 0.3); gloss = 0.3; }
    else if (mat > 27.5 && mat < 28.5) base = GRAPHITE*0.5;
    else if (mat > 29.5 && mat < 30.5){ base = GRAPHITE*0.4; gloss = 1.2; }
    else if (mat > 31.5 && mat < 32.5){
      // the comms hologram: the candidate world, its land lit, turning in steps on its own clock
      vec3 N = normalize(p - vec3(side*(W + 1.1), FLOOR + 1.4, bz - 0.1));
      float land = smoothstep(0.48, 0.56, fbm3(huYaw(N, floor(uTime*5.0)*0.09)*4.0 + 3.0));
      base = vec3(0.0);
      emit = mix(RIME, STAR, 0.5)*(0.35 + 0.75*land)*(0.6 + 0.4*max(N.x*side, 0.0));
      rimK = 0.0;
    }
    else if (mat > 33.5 && mat < 34.5){
      // the crew profile over the comms plate: flat light, flickering on a stepped clock; in the wreck
      // the projector only manages a burst now and then
      base = vec3(0.0);
#ifdef WRECK
      emit = mix(RIME, STAR, 0.5)*1.4*step(0.93, hash11(floor(uTime*7.0)));
#else
      emit = mix(RIME, STAR, 0.5)*(1.4 + 0.3*step(0.6, hash11(floor(uTime*9.0))));
#endif
      rimK = 0.0;
    }
    else if (mat > 34.5 && mat < 35.5){
      // the projector's ring and the relay's light: lit on the ship's power, dead in the wreck
      base = PITCH;
#ifndef WRECK
      emit = mix(RIME, STAR, 0.5)*1.4;
#endif
      rimK = 0.0;
    }
    else if (mat > 35.5 && mat < 36.5){
      // the open panel's cavity: black behind the guts
      base = PITCH*0.5;
      rimK = 0.0;
    }
    else if (mat > 36.5 && mat < 37.5){
      // the weld tip: a hot white spark in bursts on its own clock, cold in the wreck
      base = PITCH;
#ifndef WRECK
      emit = SPARK*3.0*weld();
#endif
      rimK = 0.0;
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
    // two tones of occlusion, not a gradient
    base *= ao < 0.75 ? 0.6 : 1.0;
    if (inLocker){
      // lit from inside the locker once it comes up
      base *= mix(0.2, 1.0, uP.w);
      emit *= mix(0.25, 1.0, uP.w);
      col_suitLight = mix(RIME, SILVER, 0.6)*uP.w*(0.35 + 0.65*max(n.y, 0.0))*0.6;
      rimK = 2.0;
    }
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
      // the door's frame, a band of its own warm light
      float frame = step(0.0, 0.1 - max(max(0.15 - p.x, p.x - 0.95), p.y - (FLOOR + 2.1)));
#ifdef WRECK
      base = mix(base, STEEL*0.8, frame);
#else
      emit += GLOW*(0.45 + 0.5*uP.z)*frame;
      base = mix(base, GLOW*0.2, frame);
#endif
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
      // HERMES over the door, in light
      float name = stencil(4.0, 6.0, vec2((p.x - 0.16)/0.034, (0.86 - p.y)/0.034));
#ifdef WRECK
      base = mix(base, GRAPHITE*0.7, name);
#else
      base = mix(base, PITCH, name);
      emit += GLOW*0.9*name;
#endif
    }
  }

  // --- light: the upper lines, a segment between each pair of ribs on both sides, the door ahead,
  // and the bays' spill
  vec3 col = base*0.03*vec3(0.9, 1.0, 1.2);
  for (int i = -1; i <= 1; i++){
    float kk = seg + float(i);
    float z0 = kk*RIB_EVERY + 0.1, z1 = z0 + RIB_EVERY - 0.2;
    if (z1 < BACK_Z || z0 > DOOR_Z) continue;
    float on = lineOn(kk)*lineWake(clamp(p.z, z0, z1));
    for (int j = 0; j < 2; j++){
      vec3 L = lineAt(j == 0 ? -1.0 : 1.0, clamp(p.z, z0, z1)) - p;
      float d2 = dot(L, L);
      L *= inversesqrt(d2);
      col += base*LINE*on*(max(dot(n, L), 0.0) + 0.12)*1.5/(1.0 + 1.4*d2);
      col += gloss*LINE*on*pow(max(dot(reflect(rd, n), L), 0.0), 40.0)*1.0/(1.0 + 1.4*d2);
    }
  }
  vec3 Ld = DOOR_POS - p;
  float dd2 = dot(Ld, Ld);
  Ld *= inversesqrt(dd2);
  col += base*GLOW*uP.z*max(dot(n, Ld), 0.0)*2.6/(1.0 + 0.06*dd2);
  col += gloss*GLOW*uP.z*pow(max(dot(reflect(rd, n), Ld), 0.0), 40.0)*0.8/(1.0 + 0.06*dd2);
  if (dm == dFloor) col += GLOW*uP.z*pow(max(dot(reflect(rd, n), Ld), 0.0), 14.0)*0.25/(1.0 + 0.03*dd2);
#ifdef WRECK
  {
    // the head lamp: a cone from the eye, the only white light left
    float cone = smoothstep(0.82, 0.96, dot(rd, fwd));
    // held below white at arm's length, or the frost and the hand on the glass burn out
    // on its battery (uP.w): full when the envoy wakes, a glow once it is spent
    col += base*LAMP*uP.w*(0.15 + 0.85*cone)*max(dot(n, -rd), 0.0)*1.4/(1.0 + 0.05*t*t);
    col += gloss*LAMP*uP.w*cone*pow(max(dot(reflect(rd, n), -rd), 0.0), 40.0)*0.8/(1.0 + 0.05*t*t);
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
  // the weld's spark: a hard little light that throws the drone's shadow and flickers the wall
  {
    vec3 Ls = WELD_AT - p;
    float ds2 = dot(Ls, Ls);
    Ls *= inversesqrt(ds2);
    col += base*SPARK*weld()*max(dot(n, Ls), 0.0)*12.0/(1.0 + 20.0*ds2);
  }
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
    col += gloss*bayCol*pow(max(dot(reflect(rd, n), Lb), 0.0), 30.0)*1.2*vis;
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
  // what the edge pass needs of this cell: its colour, its depth and facing; the hands keep their own edges
  vec4 hd = hands(uv);
  col = hdVisor(mix(col, hd.rgb, hd.a), uv);
  gl_FragColor = edgeCell(snapIndex(col, frag), t, n, hd.a < 0.5);
}

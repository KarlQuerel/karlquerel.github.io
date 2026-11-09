// The corridor pilot's surfaces, the intro corridor's (shaders/intro/corridor.frag.glsl) carried over onto
// meshes: each mesh knows which surface it is (CR_KIND), so where the shader asked which wall a ray hit,
// this draws that wall's paint, words and light at the fragment's point in the shader's frame. Follows
// common.glsl (hash, fbm, glyphs, stars) and corridorLight.glsl (the frame, the bays, crLight).
// Kinds: 0 deck, 1 ceiling, 2 upper cut, 3 lower cut, 4 wall, 5 a bay's back wall, 6 a bay's sides and
// ceiling, 7 the bulkhead behind, 8 the door wall, 9 a thing standing about (uBase, uEmit, uGloss, uRim),
// 10 the vitals monitor, 11 a console screen, 12 the comms world hologram, 13 a crew recording, 14 the
// weld tip. uCenter/uHalf place what draws about its own middle; uEarth is the Earth through the glass.

varying vec3 vCrNormal;
uniform vec3 uBase;
uniform vec3 uEmit;
uniform float uGloss;
uniform float uRim;
uniform vec3 uCenter;
uniform vec2 uHalf;
uniform sampler2D uEarth;
uniform vec3 uEarthDisc;

const float CR_LINTEL = CR_CHAMFER;

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

float ribAt(float z){ return step(abs(fract(z/CR_RIB_EVERY) - 0.5)*CR_RIB_EVERY, 0.07); }
// how bright a bay's lit panel wall burns
float bayPanel(float k){ return k < 0.5 ? 1.0 : k < 1.5 ? 0.95 : k < 2.5 ? 1.0 : 0.5; }
vec3 yaw(vec3 q, float a){ float c = cos(a), s = sin(a); return vec3(c*q.x + s*q.z, q.y, -s*q.x + c*q.z); }

// three locker cells left of the door, the doorway right of centre
float lockerCell(vec3 p){
  float cell = floor((p.x + CR_LOCKER_EDGE)/CR_LOCKER_PITCH);
  float lx = fract((p.x + CR_LOCKER_EDGE)/CR_LOCKER_PITCH)*CR_LOCKER_PITCH;
  bool inCell = cell >= 0.0 && cell <= CR_LOCKER_COUNT - 1.0 && lx > CR_LOCKER_INSET && lx < CR_LOCKER_PITCH - CR_LOCKER_INSET;
  return (inCell && p.y > CR_FLOOR + CR_LOCKER_BOTTOM && p.y < CR_FLOOR + CR_LOCKER_TOP) ? 1.0 : 0.0;
}
float doorAt(vec3 p){ return (p.x > CR_DOOR_X0 && p.x < CR_DOOR_X1 && p.y < CR_FLOOR + CR_DOOR_TOP) ? 1.0 : 0.0; }

// The Earth through the glass: the holding screen's Earth of 3812 painted as a disc (uEarth; its centre,
// radius and side in cells in uEarthDisc), hung in the sky along CR_EARTH_AIM (out through this bay's glass,
// up, along), each view ray read off the disc by its angle from the middle, so the globe holds still in the
// sky as the walk goes by. Its own colour where its disc or air covers the ray (a = 1), the stars elsewhere.
vec4 earthView(vec3 rd, float side){
  vec3 U = vec3(0.0, 1.0, 0.0);
  vec3 C = normalize(vec3(side*CR_EARTH_AIM.x, CR_EARTH_AIM.y, CR_EARTH_AIM.z));
  vec3 Uc = normalize(U - C*dot(U, C));
  vec3 Rc = cross(Uc, C);
  vec3 v = rd - C*dot(rd, C);
  float th = acos(clamp(dot(rd, C), -1.0, 1.0));
  vec2 dir = vec2(dot(v, Rc), -dot(v, Uc))/max(length(v), 1e-5);
  vec2 cell = floor(uEarthDisc.x + dir*th/CR_EARTH_RADIUS*uEarthDisc.y);
  if (uEarthDisc.z > 0.0 && min(cell.x, cell.y) >= 0.0 && max(cell.x, cell.y) < uEarthDisc.z){
    vec4 e = texture2D(uEarth, (cell + 0.5)/uEarthDisc.z);
    if (e.a > 0.5) return vec4(e.rgb, 1.0);
  }
  return vec4(stars(rd)*0.8, 0.0);
}
// a bay's lit panel wall, louvred, the light the crew stands against
vec3 louvres(vec3 p, float k, float mixAt){
  float louvre = 0.72 + 0.28*step(0.22, fract(p.y*5.0 + 0.1));
  float fall = 0.6 + 0.4*smoothstep(CR_FLOOR, CR_CEIL - CR_LINTEL, p.y);
  return mix(mix(SILVER, STAR, mixAt), crBayTint(k)*1.3, 0.35)*louvre*fall*bayPanel(k);
}

void main(){
  vec3 p = crFrame(vCrWorld);
  vec3 n = normalize(crTurn(vCrNormal));
  vec3 rd = normalize(p - crFrame(cameraPosition));
  float k = crBayIndex(p.z);
  float bz = crBayZ(k), side = crBaySide(k);
  float rib = ribAt(p.z);
  float grime = 0.85 + 0.3*fbm3(p*1.7);
  // worn paint: what is still painted flakes where the deck is walked and the walls are scuffed
  float wear = 0.35 + 0.65*smoothstep(0.3, 0.45, fbm3(p*9.0));
  // the line segment between ribs this point is in, and how awake the lines are here
  float seg = floor(p.z/CR_RIB_EVERY);
  float wake = crLineWake(p.z);
  vec3 base = GUN;
  vec3 emit = vec3(0.0);
  float gloss = 0.0, bath = 0.0, rim = 0.0;

#if CR_KIND == 0
  // a flush plated deck: a walkway plate down the middle, panels either side, fine seams between
  float walkway = step(abs(p.x), 0.55);
  float seam = max(step(0.96, fract(p.z)), step(abs(abs(p.x) - 0.55), 0.02));
  base = mix(mix(GRAPHITE*0.72, GUN*0.8, walkway), STEEL*0.7, seam)*grime;
  // CRYO written on the walkway in light, and three chevrons after it that light one after the other
  // toward the door; read walking forward
  float word = 0.0, chev = 0.0;
  float beat = mod(floor(uCrClock*2.5), 3.0);
  for (int j = 0; j < 4; j++){
    float z0 = 4.6 + float(j)*7.8;
    word = max(word, stencil(3.0, 4.0, vec2((p.x + 0.45)/0.06, (z0 + 0.45 - p.z)/0.09)));
    for (int i = 0; i < 3; i++){
      float cz = p.z - (z0 + 0.62 + float(i)*0.26);
      float on = step(abs(cz - (0.2 - abs(p.x)*0.6)), 0.045)*step(abs(p.x), 0.34)*step(-0.22, cz);
      chev = max(chev, on*(0.35 + 0.65*step(abs(beat - float(i)), 0.5)));
    }
  }
  base = mix(base, PITCH, max(word, step(0.01, chev)));
  emit += CR_LINE*(0.8*word + chev)*wake;
  // a line of the door's light across the deck at the threshold
  emit += GLOW*(0.5 + 0.5*uCrDoor)*step(abs(p.z - (CR_DOOR_Z - 0.55)), 0.025)*step(abs(p.x - CR_DOOR_POS.x), 0.48);
#elif CR_KIND == 1
  // flush panels, a spine seam down the middle
  base = mix(GRAPHITE*0.55, SOOT, max(step(abs(abs(p.x) - 0.6), 0.02), step(abs(p.x), 0.03)))*grime;
#elif CR_KIND == 2 || CR_KIND == 3
  // the octagon's cuts, and the lines of light along them: the upper ones mid-face, the lower ones at
  // the deck's edge, both broken at every rib; the top of a bay's jamb light sits on the upper cut
  bool upper = CR_KIND == 2;
  float along = (upper ? p.y - (CR_CEIL - CR_CHAMFER) : (CR_FLOOR + CR_CHAMFER) - p.y)*1.4142;
  float panel = 0.8 + 0.4*hash12(vec2(seg, sign(p.x)*(upper ? 3.0 : 5.0)));
  base = mix(GUN*0.55*panel, GRAPHITE*0.7, rib)*grime;
  float line = step(abs(along - (upper ? 0.5 : 0.85)*CR_CHAMFER*1.4142), 0.5*CR_LINE_W)*(1.0 - rib);
  emit += CR_LINE*(0.25 + 1.1*crLineOn(seg)*wake)*line;
  base = mix(base, PITCH, line);
  float jamb = step(abs(p.z - bz), CR_BAY_HALF + 0.06)*step(0.0, p.x*side)*step(along, 0.06)*float(upper);
  emit += crBayTint(k)*1.3*jamb;
  base = mix(base, crBayTint(k)*0.4, jamb);
#elif CR_KIND == 4
  vec2 panel = floor(vec2(p.z, (p.y + 0.3)*1.4));
  float seam = max(step(0.95, fract(p.z)), step(0.94, fract((p.y + 0.3)*1.4)));
  float tone = 0.8 + 0.4*hash12(panel + sign(p.x)*7.0);
  base = mix(GUN*0.6*tone, STEEL*0.8, seam)*grime;
  float edge = step(abs(fract(p.z/CR_RIB_EVERY) - 0.5)*CR_RIB_EVERY, 0.03);
  base = mix(base, mix(GRAPHITE*0.7, BRUSHED*0.8, edge)*(0.85 + 0.3*fbm3(p*6.0)), rib);
  // wall stencils, read facing the wall: +z runs to the right on the left wall, to the left on the right
  bool left = p.x < 0.0;
  float along = left ? p.z : -p.z;
  // the words are light: the deck's signs, the bay's number in the bay's own colour, the frame number
  // on its plate after every rib
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
    float fr = floor(p.z/CR_RIB_EVERY);
    float fz = p.z - fr*CR_RIB_EVERY;
    if (fz > 0.1 && fz < 0.34 && p.y > -0.38 && p.y < -0.22){
      base = PITCH*1.4;
      float fx = left ? (fz - 0.13)/0.024 : (0.31 - fz)/0.024;
      paint = max(paint, number2(fr + 10.0, vec2(fx, (-0.24 - p.y)/0.024)));
    }
  }
  // the jamb: a line of the bay's light down each side of its opening
  float jamb = step(0.0, p.x*side)*step(abs(abs(p.z - bz) - CR_BAY_HALF - 0.03), 0.03)*step(p.y, CR_CEIL - CR_LINTEL);
  base = mix(base, PITCH, max(paint, bayPaint));
  emit += CR_LINE*0.9*paint*wake + crBayTint(k)*1.3*bayPaint;
  emit += crBayTint(k)*1.3*jamb;
  base = mix(base, crBayTint(k)*0.4, jamb);
#elif CR_KIND == 5
  if (k > 3.5){
    // the observation window: the red Earth and the yard beyond mullions
    bool pane = abs(p.z - bz) < 1.25 && p.y > CR_FLOOR + 0.5 && p.y < CR_CEIL - CR_LINTEL - 0.12;
    float mull = step(abs(abs(p.z - bz) - 0.65), 0.035);
    if (pane && mull < 0.5){
      vec4 sky = earthView(rd, side);
      // the Earth's cells as painted, untouched by the corridor's air and its palette
      if (sky.a > 0.5){ gl_FragColor = vec4(crToLinear(sky.rgb), CR_EXACT); return; }
      base = vec3(0.0);
      emit = sky.rgb*0.95 + SILVER*0.04;
    } else base = GRAPHITE*0.45*grime;
  } else {
    base = ZINC;
    emit = louvres(p, k, 0.5);
  }
#elif CR_KIND == 6
  bool wall = abs(n.z) > 0.5;
  float rx = side*p.x - CR_W;
  if (k > 3.5 && wall && p.z > bz && rx > 0.12 && rx < 1.38 && p.y > CR_FLOOR + 0.5 && p.y < CR_CEIL - CR_LINTEL - 0.12 && step(abs(rx - 0.75), 0.035) < 0.5){
    vec4 sky = earthView(rd, side);
    if (sky.a > 0.5){ gl_FragColor = vec4(crToLinear(sky.rgb), CR_EXACT); return; }
    base = vec3(0.0);
    emit = sky.rgb*0.95 + SILVER*0.04;
  } else if (k > 3.5){
    base = GRAPHITE*0.4*grime;
  } else {
    base = ZINC;
    emit = wall ? louvres(p, k, 0.4)*0.7 : mix(RIME, SILVER, 0.5)*0.7;
  }
#elif CR_KIND == 7
  // the bulkhead behind: the hatch we came in by, sealed, in the door's striped frame
  float seam = max(step(0.96, fract(p.x + 0.3)), step(0.95, fract(p.y*1.4 + 0.3)));
  base = mix(GUN*0.6, STEEL*0.8, seam)*grime;
  float hatch = max(abs(p.x) - 0.45, p.y - (CR_FLOOR + 2.0));
  if (hatch < 0.0) base = mix(GRAPHITE*0.8, STEEL, step(0.94, fract(p.y*2.5)))*grime;
  else if (hatch < 0.1) base = mix(EMBER*0.75, PITCH, step(0.5, fract((p.x + p.y)*5.0)));
#elif CR_KIND == 8
  // the end wall: the lockers, the door in its frame of light, the mission's patch and its name
  float seam = max(step(0.96, fract(p.x + 0.3)), step(0.95, fract(p.y*1.4 + 0.3)));
  base = mix(GUN*0.6, STEEL*0.8, seam)*grime;
  if (lockerCell(p) > 0.5){
    base = SOOT;
    float fall = 0.35 + 0.65*smoothstep(CR_FLOOR, CR_FLOOR + CR_LOCKER_TOP, p.y);
    emit = mix(RIME, SILVER, 0.5)*fall*uCrLit*1.2;
  } else if (doorAt(p) > 0.5){
    float doorHalf = 0.5*(CR_DOOR_X1 - CR_DOOR_X0);
    float core = smoothstep(0.55, 0.0, abs(p.x - CR_DOOR_POS.x)/doorHalf);
    float slat = 0.7 + 0.3*step(0.35, fract(p.y*5.0));
    float lift = 0.75 + 0.25*smoothstep(CR_FLOOR, CR_FLOOR + CR_DOOR_TOP, p.y);
    // bright enough to land on the palette's lit end: lower, it snaps to tan and stops reading as light
    emit = GLOW*(0.7 + 0.5*core)*(0.6 + 0.5*uCrDoor)*slat*lift;
    base = GLOW*0.15;
  } else {
    // the door's frame, a band of its own warm light
    float frame = step(0.0, 0.1 - max(max(CR_DOOR_X0 - p.x, p.x - CR_DOOR_X1), p.y - (CR_FLOOR + CR_DOOR_TOP)));
    emit += GLOW*(0.45 + 0.5*uCrDoor)*frame;
    base = mix(base, GLOW*0.2, frame);
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
    base = mix(base, PITCH, name);
    emit += GLOW*0.9*name;
  }
#elif CR_KIND == 9
  base = uBase;
  emit = uEmit;
  gloss = uGloss;
  bath = 1.0;
  rim = uRim;
#elif CR_KIND == 10
  // the vitals monitor: a trace stepping across, two bars under it
  vec3 c = crFrame(uCenter);
  vec2 s = vec2((p.z - c.z)/uHalf.x, (p.y - c.y)/uHalf.y);
  float tick = floor(uCrClock*8.0)/8.0;
  float x = fract(s.x*0.5 + 0.5 - tick*0.25);
  float beat = exp(-pow((x - 0.5)*18.0, 2.0))*0.55 - exp(-pow((x - 0.56)*22.0, 2.0))*0.25;
  float trace = step(abs(s.y - 0.25 - beat), 0.09);
  float bars = step(s.y, -0.35)*step(-0.8, s.y)*step(abs(fract(s.x*2.0) - 0.5), 0.35)*step(fract(s.x*2.0 + 0.5), 0.3 + 0.5*hash11(floor(s.x*2.0) + floor(uCrClock*2.0)));
  base = SOOT;
  emit = RIME*0.3 + mix(RIME, SILVER, 0.5)*trace*1.2 + EMBER*bars*0.8;
  bath = 1.0;
#elif CR_KIND == 11
  // a screen: lines of text scrolling up on a stepped clock, a cursor row lit amber
  float row = floor(p.y*34.0 + floor(uCrClock*3.0));
  float line = step(0.35, fract(p.y*34.0))*step(0.3, hash11(row*1.7))*step(fract(p.z*6.0 + hash11(row)*3.0), 0.3 + 0.6*hash11(row*3.1));
  base = SOOT;
  emit = FROST*0.25 + mix(RIME, SILVER, 0.5)*line*0.7 + EMBER*0.5*line*step(0.9, hash11(row*5.3));
  bath = 1.0;
#elif CR_KIND == 12
  // the comms hologram: the candidate world, its land lit, turning in steps on its own clock, drawn on
  // every other row of the grid so it stays two colours deep
  if (mod(floor(gl_FragCoord.y), 2.0) > 0.5) discard;
  vec3 N = normalize(p - crFrame(uCenter));
  float land = smoothstep(0.48, 0.56, fbm3(yaw(N, floor(uCrClock*5.0)*0.09)*4.0 + 3.0));
  base = vec3(0.0);
  emit = mix(RIME, STAR, 0.5)*(0.35 + 0.75*land)*(0.6 + 0.4*max(N.x*side, 0.0));
#elif CR_KIND == 13
  // a crew member's recording: flat light, flickering on a stepped clock, on every other row
  if (mod(floor(gl_FragCoord.y), 2.0) > 0.5) discard;
  base = vec3(0.0);
  emit = mix(RIME, STAR, 0.5)*(1.4 + 0.3*step(0.6, hash11(floor(uCrClock*9.0))));
#elif CR_KIND == 14
  // the weld tip: a hot white spark in bursts on its own clock
  base = PITCH;
  emit = CR_SPARK*3.0*crWeld();
#endif
  gl_FragColor = vec4(crToLinear(crLight(p, n, base, emit, gloss, bath, rim)), 1.0);
}

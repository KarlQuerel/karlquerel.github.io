// The corridor pilot's surfaces, the intro corridor's (shaders/intro/corridor.frag.glsl) carried over onto
// meshes: each mesh knows which surface it is (CR_KIND), so where the shader asked which wall a ray hit,
// this draws that wall's paint, words and light at the fragment's point in the shader's frame. Follows
// common.glsl (hash, fbm, glyphs, stars), the Sun (star.glsl) and corridorLight.glsl (the frame, the bays,
// crLight).
// Kinds: 0 deck, 1 ceiling, 2 upper cut, 3 lower cut, 4 wall, 5 a bay's back wall, 6 a bay's sides and
// ceiling, 7 the bulkhead behind, 8 the door wall, 9 a thing standing about (uBase, uEmit, uGloss, uRim),
// 10 the vitals monitor, 12 the mission table's world hologram, 13 a crew recording, 14 the weld tip, 15
// the glass span's panes, 16 a floating glass pane, 17 a projector's beam, 18 a glass canopy. uCenter/uHalf place what draws about its own middle; uEarth is the
// Earth through the glass.

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
float bayPanel(float k){ return k < 0.5 ? 0.45 : k < 1.5 ? 0.95 : k < 2.5 ? 1.0 : 0.22; }
vec3 yaw(vec3 q, float a){ float c = cos(a), s = sin(a); return vec3(c*q.x + s*q.z, q.y, -s*q.x + c*q.z); }

// three locker cells left of the door, the doorway right of centre
float lockerCell(vec3 p){
  float cell = floor((p.x + CR_LOCKER_EDGE)/CR_LOCKER_PITCH);
  float lx = fract((p.x + CR_LOCKER_EDGE)/CR_LOCKER_PITCH)*CR_LOCKER_PITCH;
  bool inCell = cell >= 0.0 && cell <= CR_LOCKER_COUNT - 1.0 && lx > CR_LOCKER_INSET && lx < CR_LOCKER_PITCH - CR_LOCKER_INSET;
  return (inCell && p.y > CR_FLOOR + CR_LOCKER_BOTTOM && p.y < CR_FLOOR + CR_LOCKER_TOP) ? 1.0 : 0.0;
}
float doorAt(vec3 p){ return (p.x > CR_DOOR_X0 && p.x < CR_DOOR_X1 && p.y < CR_FLOOR + CR_DOOR_TOP) ? 1.0 : 0.0; }

// where the view ray falls about a body hung along C: its angle off C's middle (rad), toward C's right and
// down as the world's up stands over it, so the body holds still in the sky as the walk goes by
vec2 skyOffset(vec3 rd, vec3 C){
  vec3 Uc = normalize(vec3(0.0, 1.0, 0.0) - C*C.y);
  vec3 v = rd - C*dot(rd, C);
  float th = acos(clamp(dot(rd, C), -1.0, 1.0));
  return vec2(dot(v, cross(Uc, C)), -dot(v, Uc))/max(length(v), 1e-5)*th;
}
// The Earth through the glass: the holding screen's Earth of 3812 painted as a disc (uEarth; its centre,
// radius and side in cells in uEarthDisc), hung in the sky off the left hand along CR_EARTH_AIM (out, up,
// along). Its own colour where its disc or air covers the ray (a = 1).
vec4 earthView(vec3 rd){
  vec3 C = normalize(vec3(-CR_EARTH_AIM.x, CR_EARTH_AIM.y, CR_EARTH_AIM.z));
  vec2 cell = floor(uEarthDisc.x + skyOffset(rd, C)/CR_EARTH_RADIUS*uEarthDisc.y);
  if (uEarthDisc.z > 0.0 && min(cell.x, cell.y) >= 0.0 && max(cell.x, cell.y) < uEarthDisc.z){
    vec4 e = texture2D(uEarth, (cell + 0.5)/uEarthDisc.z);
    if (e.a > 0.5) return vec4(e.rgb, 1.0);
  }
  return vec4(0.0);
}
// The swollen sun along CR_SUN, the intro's star() on the art grid's own scale: its disc and corona in the
// palette's colours (a = 1), nothing elsewhere. Its cells hold still in the sky, its dither on the screen;
// its corona's dither thins out to nothing by CR_SUN_GLARE radii, so the sky past the glare stays black.
vec4 sunView(vec3 rd){
  float cells = uRes.y/CR_FOV;
  float r = CR_SUN_RADIUS*cells;
  vec2 cell = floor(gl_FragCoord.xy);
  vec2 q = floor(skyOffset(rd, CR_SUN)*cells);
  if (hash12(cell) < smoothstep(0.5*CR_SUN_GLARE, CR_SUN_GLARE, length(q)/r)) return vec4(0.0);
  vec3 s = star(vec3(-1.0), cell, cell - q, r, CR_SUN_AGE, uCrClock, CR_SUN_CORONA);
  return s.x < 0.0 ? vec4(0.0) : vec4(s, 1.0);
}
// a pane onto space: the Earth's and the sun's cells as painted (a = 1, written out untouched by the
// corridor's air and palette), or the stars, drowned in the sun's glare round it, with a sheen that grows
// toward a grazing look, so glass seen edge-on still reads
vec4 outside(vec3 rd, vec3 n){
  vec4 earth = earthView(rd);
  if (earth.a > 0.5) return earth;
  vec4 sun = sunView(rd);
  if (sun.a > 0.5) return sun;
  float glare = smoothstep(CR_SUN_RADIUS, CR_SUN_RADIUS*CR_SUN_GLARE, acos(clamp(dot(rd, CR_SUN), -1.0, 1.0)));
  float graze = pow(1.0 - abs(dot(n, rd)), 3.0);
  return vec4(stars(rd)*0.76*glare + SILVER*0.04 + mix(FROST, RIME, 0.5)*0.45*graze, 0.0);
}
// the blister's frames over a face `size` m: panes about CR_BLISTER_PITCH, framed at their edges
float blisterFrame(vec2 q, vec2 size){
  vec2 count = max(floor(size/CR_BLISTER_PITCH + 0.5), 1.0);
  vec2 g = abs(fract(q*count/size + 0.5) - 0.5)*size/count;
  return step(min(g.x, g.y), CR_BLISTER_FRAME);
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
  // a pane onto space here, drawn by outside() once the surface is done; out from a bay's opening; a bay
  // wall's height
  bool glass = false;
  float rx = side*p.x - CR_W;
  float wallTop = CR_CEIL - CR_LINTEL - CR_FLOOR;

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
  // in the glass span the lines of light run along the deck's edge, broken at every rib
  if (crInSpan(p.z)){
    float edgeLine = step(abs(abs(p.x) - (CR_W - CR_CHAMFER - CR_SPAN_LINE_INSET)), 0.5*CR_LINE_W)*(1.0 - rib);
    emit += CR_LINE*(0.25 + 1.1*crLineOn(seg)*wake)*CR_SPAN_LINE_GAIN*edgeLine;
    base = mix(base, PITCH, edgeLine);
  }
  // the blister's floor: a strip of glass along its outer edge
  if (crIsBlister(k) && rx > CR_BLISTER_DEPTH - CR_BLISTER_FLOOR){
    vec2 q = vec2(rx - (CR_BLISTER_DEPTH - CR_BLISTER_FLOOR), p.z - bz + CR_BAY_HALF);
    glass = blisterFrame(q, vec2(CR_BLISTER_FLOOR, 2.0*CR_BAY_HALF)) < 0.5;
    if (!glass) base = GRAPHITE*0.7*grime;
  }
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
  float jamb = step(abs(p.z - bz), CR_BAY_HALF + 0.06)*step(0.0, p.x*side)*step(along, 0.06)*float(upper && !crIsSpan(k));
  emit += crBayTint(k)*1.3*jamb;
  base = mix(base, crBayTint(k)*0.4, jamb);
  // the left-hand lower cut's ports between the ribs, the Earth at your feet
  float ribGap = abs(fract(p.z/CR_RIB_EVERY) - 0.5)*CR_RIB_EVERY;
  glass = !upper && p.x < 0.0 && along > CR_PORT_ALONG.x && along < CR_PORT_ALONG.y && ribGap > CR_PORT_INSET;
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
    if (side*p.x > 0.0 && !crIsSpan(k)){
      // between the two ribs short of the opening, clear of both
      float mid = bz - 1.5*CR_RIB_EVERY, reach = 10.0*0.035;
      float zl = left ? mid - reach : -(mid + reach);
      bayPaint = stencil(5.0 + k, 5.0, vec2((along - zl)/0.035, (0.5 - p.y)/0.035));
    }
    float fr = floor(p.z/CR_RIB_EVERY);
    float fz = p.z - fr*CR_RIB_EVERY;
    if (fz > 0.1 && fz < 0.34 && p.y > -0.38 && p.y < -0.22){
      base = PITCH*1.4;
      float fx = left ? (fz - 0.13)/0.024 : (0.31 - fz)/0.024;
      paint = max(paint, number2(fr + 10.0, vec2(fx, (-0.24 - p.y)/0.024)));
    }
    // the departures board: the ten ships in two columns of five, HERMES, its number and its light, lit
    // steady once sealed, ours blinking, the rest dark
    if (!left && p.z > CR_BOARD_Z0 && p.z < CR_BOARD_Z1 && p.y < CR_BOARD_TOP && p.y > CR_BOARD_TOP - 36.0*CR_BOARD_CELL){
      base = PITCH*1.3;
      vec2 q = vec2(CR_BOARD_Z1 - p.z, CR_BOARD_TOP - p.y)/CR_BOARD_CELL - 1.0;
      float col = floor(q.x/42.0), row = floor(q.y/7.0);
      vec2 c = q - vec2(col*42.0, row*7.0);
      float ship = col*5.0 + row + 1.0;
      if (min(q.x, q.y) >= 0.0 && col < 2.0 && row < 5.0){
        paint = max(paint, max(stencil(4.0, 6.0, c), number2(ship, c - vec2(26.0, 0.0))));
        if (c.x >= 36.0 && c.x < 39.0 && c.y < 5.0){
          bool ours = abs(ship - CR_BOARD_OURS) < 0.5;
          float on = ours ? step(0.5, fract(uCrClock*1.2)) : step(ship, CR_BOARD_SEALED + 0.5)*0.8;
          base = PITCH;
          emit += (ours ? EMBER : mix(RIME, SILVER, 0.5))*on;
        }
      }
    }
  }
  // the jamb: a line of the bay's light down each side of its opening
  float jamb = step(0.0, p.x*side)*step(abs(abs(p.z - bz) - CR_BAY_HALF - 0.03), 0.03)*step(p.y, CR_CEIL - CR_LINTEL)*float(!crIsSpan(k));
  base = mix(base, PITCH, max(paint, bayPaint));
  emit += CR_LINE*0.9*paint*wake + crBayTint(k)*1.3*bayPaint;
  emit += crBayTint(k)*1.3*jamb;
  base = mix(base, crBayTint(k)*0.4, jamb);
#elif CR_KIND == 5
  if (crIsBlister(k)){
    // the blister's outer wall: glass, framed
    glass = blisterFrame(vec2(p.z - bz + CR_BAY_HALF, p.y - CR_FLOOR), vec2(2.0*CR_BAY_HALF, wallTop)) < 0.5;
    if (!glass) base = GRAPHITE*0.7*grime;
  } else if (k < 0.5){
    // the seed vault: a wall of drawers lit from inside, the odd one dark, the pulled one a black hole
    vec2 q = vec2(p.z - bz + CR_VAULT_ALONG, p.y - CR_FLOOR - CR_VAULT_Y0)/CR_VAULT_CELL;
    vec2 cell = floor(q);
    vec2 f = fract(q)*CR_VAULT_CELL;
    if (min(q.x, q.y) < 0.0 || q.x >= 2.0*CR_VAULT_ALONG/CR_VAULT_CELL.x || p.y > CR_FLOOR + CR_VAULT_Y1)
      base = GRAPHITE*0.5*grime;
    else if (min(f.x, f.y) < CR_VAULT_SEAM) base = PITCH;
    else if (max(abs(cell.x - CR_VAULT_PULLED.x), abs(cell.y - CR_VAULT_PULLED.y)) < 0.5) base = vec3(0.0);
    else {
      // each front frosted glass lit from behind, its pull a line of light along its foot
      float lit = step(hash12(cell + 3.1), CR_VAULT_LIT);
      base = ZINC;
      emit = mix(FROST, SILVER, 0.3 + 0.5*hash12(cell))*lit*0.6 + CR_LINE*0.7*lit*step(f.y, CR_VAULT_SEAM + 0.012);
    }
  } else {
    base = ZINC;
    emit = louvres(p, k, 0.5);
  }
#elif CR_KIND == 6
  bool wall = abs(n.z) > 0.5;
  if (crIsBlister(k)){
    // the blister's sides and ceiling: glass, framed
    vec2 q = wall ? vec2(rx, p.y - CR_FLOOR) : vec2(rx, p.z - bz + CR_BAY_HALF);
    glass = rx > 0.0 && blisterFrame(q, vec2(CR_BLISTER_DEPTH, wall ? wallTop : 2.0*CR_BAY_HALF)) < 0.5;
    if (!glass) base = GRAPHITE*0.7*grime;
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
#elif CR_KIND == 12
  // the mission table's hologram: the candidate world, its land lit, turning in steps on its own clock, drawn on
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
#elif CR_KIND == 15
  // the glass span's panes: the Earth off the left hand (the window bay's side) and the stars, framed
  // along the ribs and along the octagon's corners, wall to cut
  float ribGap = abs(fract(p.z/CR_RIB_EVERY) - 0.5)*CR_RIB_EVERY - 0.07;
  float corner;
  if (abs(n.y) < 0.1) corner = min(p.y - (CR_FLOOR + CR_CHAMFER), (CR_CEIL - CR_CHAMFER) - p.y);
  else {
    float a = n.y < 0.0 ? p.y - (CR_CEIL - CR_CHAMFER) : (CR_FLOOR + CR_CHAMFER) - p.y;
    corner = min(a, CR_CHAMFER - a)*1.4142;
  }
  glass = min(ribGap, corner) > CR_SPAN_FRAME;
  if (!glass) base = GRAPHITE*0.7*grime;
#elif CR_KIND == 16
  // a floating glass pane: a screen's text scrolling up in light on every other row, the room through it
  if (mod(floor(gl_FragCoord.y), 2.0) > 0.5) discard;
  float row = floor(p.y*34.0 + floor(uCrClock*3.0));
  float line = step(0.35, fract(p.y*34.0))*step(0.3, hash11(row*1.7))*step(fract((p.z + p.x)*6.0 + hash11(row)*3.0), 0.3 + 0.6*hash11(row*3.1));
  base = vec3(0.0);
  emit = mix(FROST, RIME, 0.5)*0.55 + mix(RIME, SILVER, 0.5)*line*1.2 + EMBER*0.7*line*step(0.9, hash11(row*5.3));
#elif CR_KIND == 17
  // a projector's beam: light rising from its plate and fading, one cell in four so the room shows through,
  // on the rows a recording leaves empty so the figure in it keeps its own
  vec2 cell = floor(gl_FragCoord.xy);
  if (mod(cell.y, 2.0) < 0.5 || mod(cell.x + floor(cell.y*0.5), 2.0) > 0.5) discard;
  float rise = clamp((p.y - crFrame(uCenter).y)/uHalf.y, 0.0, 1.0);
  base = vec3(0.0);
  emit = mix(RIME, STAR, 0.4)*0.6*(1.0 - rise);
#elif CR_KIND == 18
  // a glass canopy: a faint sheen, brighter toward a grazing look, on the rows a recording leaves empty
  if (mod(floor(gl_FragCoord.y), 2.0) < 0.5) discard;
  base = vec3(0.0);
  emit = mix(FROST, RIME, 0.5)*(0.3 + 0.7*pow(1.0 - abs(dot(n, rd)), 2.0));
#endif
  if (glass){
    vec4 sky = outside(rd, n);
    if (sky.a > 0.5){ gl_FragColor = vec4(crToLinear(sky.rgb), CR_EXACT); return; }
    base = vec3(0.0);
    emit = sky.rgb;
  }
  gl_FragColor = vec4(crToLinear(crLight(p, n, base, emit, gloss, bath, rim)), 1.0);
}

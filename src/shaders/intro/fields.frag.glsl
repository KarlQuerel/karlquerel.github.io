// Shot 4: BURNING EVERYTHING. The dead farm as flat layers (js/intro/fieldsArt.js), slid sideways by
// whole cells as the camera trucks: the farm on the horizon a little, the ground row by row by its own
// depth, the harvester and the tree most. It opens on the giant sun (star() in layers.glsl) with the
// land below the frame; the land rises into place under it. Live: the dusk,
// the sun, the smoke, the fire fronts, the windmill's blades, the fence, embers, ash.
// uP.x = the truck in cells at depth 1, uP.y = the land's drop in cells, uP.z = seconds, uP.w = the
// sun's clock; uQ.x = the sun's radius, uQ.y = its slide; uH.x = the layers' margin.

__LAYOUT__

// set once in main(): every helper below reads them
vec2 SC;
float SR, HZ, SPAN, LIFT, T;

// layer i of the atlas at this screen cell, slid by `depth` and dropped by `drop` rows
vec4 layer(float i, vec2 cell, float depth, float drop){
  float H = uRes.y;
  float y = cell.y - floor(drop + 0.5);
  if (y < 0.0) return vec4(0.0);
  vec2 size = vec2(uRes.x + 2.0*uH.x, 4.0*H);
  vec2 tex = vec2(cell.x + uH.x - floor(uP.x*depth + 0.5), y + i*H);
  return texture2D(uMask, (tex + 0.5)/size);
}

// the dusk's nine steps, and a position on them rounded with a narrow dithered seam
vec3 duskRamp(float i){
  return i < 0.5 ? BASALT : i < 1.5 ? GARNET : i < 2.5 ? RUST : i < 3.5 ? BRICK : i < 4.5 ? CLAY
    : i < 5.5 ? FLARE : i < 6.5 ? AMBER : i < 7.5 ? DUNE : SAND;
}
vec3 dusk(float x, vec2 cell){
  float g = clamp(x, 0.0, 1.0)*8.0;
  float i = floor(g);
  return duskRamp(min(8.0, i + step(bayer4(cell) + 0.001, clamp((g - i - 0.5)/0.3 + 0.5, 0.0, 1.0))));
}

// A smoke column off the fields: it leans downwind, widens as it climbs, and its billows climb with it.
vec3 plume(vec3 col, vec2 cell, vec4 c, float i){
  float up = HZ + LIFT - cell.y;
  if (up < 0.0) return col;
  float cx = c.x*uRes.x + uP.x*DEPTHS.y + up*c.y + (noise2(vec2(up/40.0, i*7.0)) - 0.5)*18.0;
  float w = c.z + up*c.w;
  float n = fbm3(vec3((cell.x - cx)/16.0, (cell.y + T*SMOKE_CLIMB)/14.0, i*3.1 + T*0.05));
  float body = (1.0 - abs(cell.x - cx)/w)*(0.5 + n)*min(1.0, up/6.0);
  if (body < 0.42) return col;
  // dark against the dusk, its edge backlit rust where it crosses the sun
  bool lit = length(cell - SC) < SR*1.05;
  if (body > 0.72) return BASALT;
  if (body > 0.55) return lit ? RUST : SHALE;
  return bayer4(cell) < 0.5 ? (lit ? BRICK : SHALE) : col;
}

// A fire front across the stubble at distance z (m), from world x to x (m), flames h (m) tall.
// Tongues flicker upward column by column; the base is a char line with coals in it.
vec3 front(vec3 col, vec2 cell, vec4 f, float i){
  float H = uRes.y;
  float foc = FOCAL*H*0.5;
  float k = foc*EYE/(f.x*SPAN);
  float pw = f.x/foc;
  float base = floor(HZ + k*SPAN + LIFT + 0.5);
  float hc = f.w/pw;
  float dy = base - cell.y;
  if (dy > hc*1.6) return col;
  if (dy < -0.5){
    // the ground it has already crossed, burnt black for CHAR metres toward the camera, still smouldering
    float rk = (cell.y - floor(LIFT + 0.5) + 0.5 - HZ)/SPAN;
    float rz = foc*EYE/(rk*SPAN);
    float rx = (cell.x - floor(uP.x*GROUND_NEAR*rk + 0.5) - VANISH*uRes.x)*rz/foc;
    float edge = CHAR*(0.6 + 0.4*noise2(vec2(rx*1.5, i)));
    if (rz < f.x - edge || rx < f.y || rx > f.z || abs(rx - CHANNEL.x) < CHANNEL.y) return col;
    float hot = hash12(floor(vec2(rx*12.0, rz*12.0)));
    if (hot < 0.025) return EMBER;
    if (hot < 0.06) return BRICK;
    return bayer4(cell) < 0.35 + 0.5*(f.x - rz)/edge ? VOID : BASALT;
  }
  // the column in the ground's own cells, so the flames ride the row they burn on
  float cx = cell.x - floor(uP.x*GROUND_NEAR*k + 0.5);
  float wx = (cx - VANISH*uRes.x)*pw;
  float end = min(wx - f.y, f.z - wx);
  if (end < 0.0 || abs(wx - CHANNEL.x) < CHANNEL.y) return col;
  if (dy < 0.5) return hash12(vec2(cx, i)) < 0.3 ? GLOW : EMBER;
  // tongues: a peaky height per column, clumped, each swaying on its own clock
  float w = max(1.0, hc*0.08);
  float clump = noise2(vec2(cx/(w*6.0), T*0.8 + i*13.0));
  float tongue = 0.6*noise2(vec2(cx/(w*1.6), T*2.6 + i*5.0)) + 0.4*noise2(vec2(cx/(w*0.7), T*4.1));
  float tall = hc*(0.06 + 0.94*pow(tongue, 1.6)*(0.35 + 0.65*clump))*smoothstep(0.0, 1.2, end);
  // licks tear off the tips and rise on their own
  float lick = noise2(vec2(cx/(w*1.2), (dy - T*hc*2.2)/max(2.0, hc*0.22)));
  float u = dy/max(tall, 1.0);
  // smoke banks up behind the flames, thinning as it climbs
  bool gone = (u > 1.0 && !(u < 1.45 && lick > 0.72)) || (u > 0.55 && lick < (u - 0.55)*0.9);
  if (gone) return bayer4(cell) < 0.45*(1.0 - dy/(hc*1.2)) ? BASALT : col;
  // white heat only deep in a tall tongue's core
  if (u < 0.4 && tall > hc*0.45) return GLOW;
  return u < 0.62 ? EMBER : u < 0.86 ? AMBER : FLARE;
}

void main(){
  vec2 cell = screenCell();
  float W = uRes.x, H = uRes.y;
  T = uP.z;
  LIFT = uP.y;
  HZ = floor(HORIZON*H + 0.5);
  SPAN = H - HZ;
  SR = uQ.x;
  SC = floor(SUN_AT*uRes + 0.5) + vec2(floor(uQ.y + 0.5), 0.0);

  // --- the dusk and the sun, shimmering in bands over the horizon
  float above = HZ + LIFT - cell.y;
  float heat = 1.0 - smoothstep(0.0, 0.14*H, above);
  vec2 sky = cell + vec2(floor(sin(cell.y*0.9 + T*5.0)*1.4 + 0.5)*step(0.2, heat)*step(0.0, above), 0.0);
  float rise = clamp(1.0 - above/HZ, 0.0, 1.0);
  vec3 col = dusk(mix(DUSK.x, DUSK.y, pow(rise, 1.6)), sky);
  col = star(col, sky - SC, SR, 1.0, uP.w, 1.0);

  // --- smoke off the fields, then the farm on the horizon in front of it
__SMOKE__
  vec4 f = layer(1.0, cell, DEPTHS.y, LIFT);
  if (f.a > 0.5) col = f.rgb;
  vec2 hub = vec2(floor(WINDMILL.x*W + uP.x*DEPTHS.y + 0.5), HZ + floor(LIFT + 0.5) - floor(WINDMILL.y*H + 0.5));
  float bl = WINDMILL.z*H;
  for (int k = 0; k < 4; k++){
    float ang = T*1.6 + float(k)*PI*0.5;
    vec2 tip = hub + vec2(cos(ang), sin(ang))*bl;
    vec2 pa = cell - hub, ba = tip - hub;
    float u = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
    // a sail that widens toward its tip
    if (length(pa - ba*u) < 0.6 + 1.6*u*u) col = u > 0.85 ? CLAY : GARNET;
  }

  // --- the ground, each row on its own depth so the near ground slides past the far
  float gy = cell.y - floor(LIFT + 0.5);
  if (gy >= HZ){
    vec4 g = layer(0.0, cell, GROUND_NEAR*(gy + 0.5 - HZ)/SPAN, LIFT);
    if (g.a > 0.5) col = g.rgb;
  }

  // --- the fire fronts, far to near
__FIRES__

  // --- the fence down the channel: posts at their own depth, a wire between their tops
  vec2 prev = vec2(-1.0);
  for (int i = 0; i < FENCE_POSTS; i++){
    float s = float(i)/float(FENCE_POSTS - 1);
    float z = FENCE.y*pow(FENCE.z/FENCE.y, s);
    // the ground's pinhole: the row a distance lands on, and a cell's width there in metres
    float fo = FOCAL*H*0.5;
    float k = fo*EYE/(z*SPAN);
    float pw = z/fo;
    vec2 base = vec2(floor(VANISH*W + FENCE.x/pw + uP.x*GROUND_NEAR*k + 0.5), floor(HZ + k*SPAN + LIFT + 0.5));
    float top = base.y - max(2.0, floor(FENCE.w/pw));
    float wide = max(1.0, floor(0.09/pw));
    if (cell.x >= base.x && cell.x < base.x + wide && cell.y >= top && cell.y <= base.y)
      col = cell.x < base.x + 1.0 ? BRICK : BASALT;
    vec2 tp = vec2(base.x, top + 1.0);
    if (prev.x >= 0.0 && sdSeg(cell, prev, tp, 0.0) < 0.5) col = BASALT;
    prev = tp;
  }

  // --- the harvester, then the tree, nearest of all and rising fastest
  vec4 h = layer(2.0, cell, DEPTHS.z, LIFT);
  if (h.a > 0.5) col = h.rgb;
  vec4 tr = layer(3.0, cell, DEPTHS.w, LIFT*NEAR_RISE);
  if (tr.a > 0.5) col = tr.rgb;

  // --- embers rising off the fields, ash drifting down: one cell each
  for (int i = 0; i < EMBERS; i++){
    float fi = float(i);
    float x0 = hash11(fi + 0.13)*W;
    float sp = mix(EMBER_SPEED.x, EMBER_SPEED.y, hash11(fi + 0.71));
    bool ash = mod(fi, 3.0) < 1.0;
    float y = ash ? mod(T*EMBER_SPEED.z + hash11(fi + 0.37)*H, H)
                  : H - mod(T*sp + hash11(fi + 0.37)*H*1.3, H*1.3);
    vec2 p = floor(vec2(x0 + sin(T*1.3 + fi)*4.0 + (ash ? T*6.0 : 0.0), y));
    if (p == cell) col = ash ? STONE : (hash11(fi + 0.9) < 0.3 ? GLOW : EMBER);
  }

  gl_FragColor = vec4(col, 1.0);
}

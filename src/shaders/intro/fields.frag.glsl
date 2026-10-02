// Shot 4: BURNING EVERYTHING. The dead farm as flat layers (js/intro/fieldsArt.js), slid sideways by
// whole cells as the camera trucks: the sky barely, the farm on the horizon a little, the ground row by
// row by its own depth, the harvester and the tree most. Live on top: the windmill's blades, the fence
// down the channel, heat shimmer over the horizon, embers rising and ash coming down.
// uP.x = the truck in cells at depth 1, uP.z = seconds; uH.x = the layers' margin.

__LAYOUT__

// layer i of the atlas, at this screen cell, slid by `depth`; rows of the layer line up with the screen's
vec4 layer(float i, vec2 cell, float depth){
  float H = uRes.y;
  vec2 size = vec2(uRes.x + 2.0*uH.x, 4.0*H);
  vec2 tex = vec2(cell.x + uH.x - floor(uP.x*depth + 0.5), cell.y + i*H);
  return texture2D(uMask, (tex + 0.5)/size);
}

void main(){
  vec2 cell = screenCell();
  float W = uRes.x, H = uRes.y, t = uP.z;
  float hz = floor(HORIZON*H + 0.5);
  float span = H - hz;

  // --- sky and ground: the sky on its own slow depth, shimmering in bands over the horizon; each
  // ground row on its own depth, so the near ground slides past the far
  vec4 a;
  if (cell.y < hz){
    float heat = 1.0 - smoothstep(0.0, 0.14*H, hz - cell.y);
    float wave = floor(sin(cell.y*0.9 + t*5.0)*1.4 + 0.5)*step(0.2, heat);
    a = layer(0.0, cell + vec2(wave, 0.0), DEPTHS.x);
  } else {
    a = layer(0.0, cell, GROUND_NEAR*(cell.y + 0.5 - hz)/span);
  }
  vec3 col = a.rgb;

  // --- the farm on the horizon, and the windmill's blades turning on it
  vec4 f = layer(1.0, cell, DEPTHS.y);
  if (f.a > 0.5) col = f.rgb;
  vec2 hub = vec2(floor(WINDMILL.x*W + uP.x*DEPTHS.y + 0.5), hz - floor(WINDMILL.y*H + 0.5));
  float bl = WINDMILL.z*H;
  for (int k = 0; k < 4; k++){
    float ang = t*1.6 + float(k)*PI*0.5;
    vec2 tip = hub + vec2(cos(ang), sin(ang))*bl;
    vec2 pa = cell - hub, ba = tip - hub;
    float u = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
    // a sail that widens toward its tip
    if (length(pa - ba*u) < 0.6 + 1.6*u*u) col = u > 0.85 ? CLAY : GARNET;
  }

  // --- the fence down the channel: posts at their own depth, a wire between their tops
  vec2 prev = vec2(-1.0);
  for (int i = 0; i < FENCE_POSTS; i++){
    float s = float(i)/float(FENCE_POSTS - 1);
    float z = FENCE.y*pow(FENCE.z/FENCE.y, s);
    // the ground's pinhole: the row a distance lands on, and a cell's width there in metres
    float f = FOCAL*H*0.5;
    float k = f*EYE/(z*span);
    float pw = z/f;
    vec2 base = vec2(floor(VANISH*W + FENCE.x/pw + uP.x*GROUND_NEAR*k + 0.5), floor(hz + k*span));
    float top = base.y - max(2.0, floor(FENCE.w/pw));
    float wide = max(1.0, floor(0.09/pw));
    if (cell.x >= base.x && cell.x < base.x + wide && cell.y >= top && cell.y <= base.y)
      col = cell.x < base.x + 1.0 ? BRICK : BASALT;
    vec2 tp = vec2(base.x, top + 1.0);
    if (prev.x >= 0.0 && sdSeg(cell, prev, tp, 0.0) < 0.5) col = BASALT;
    prev = tp;
  }

  // --- the harvester, then the tree, nearest of all
  vec4 h = layer(2.0, cell, DEPTHS.z);
  if (h.a > 0.5) col = h.rgb;
  vec4 tr = layer(3.0, cell, DEPTHS.w);
  if (tr.a > 0.5) col = tr.rgb;

  // --- embers rising off the fields, ash drifting down: one cell each
  for (int i = 0; i < EMBERS; i++){
    float fi = float(i);
    float x0 = hash11(fi + 0.13)*W;
    float sp = mix(EMBER_SPEED.x, EMBER_SPEED.y, hash11(fi + 0.71));
    bool ash = mod(fi, 3.0) < 1.0;
    float y = ash ? mod(t*EMBER_SPEED.z + hash11(fi + 0.37)*H, H)
                  : H - mod(t*sp + hash11(fi + 0.37)*H*1.3, H*1.3);
    vec2 p = floor(vec2(x0 + sin(t*1.3 + fi)*4.0 + (ash ? t*6.0 : 0.0), y));
    if (p == cell) col = ash ? STONE : (hash11(fi + 0.9) < 0.3 ? GLOW : EMBER);
  }

  gl_FragColor = vec4(col, 1.0);
}

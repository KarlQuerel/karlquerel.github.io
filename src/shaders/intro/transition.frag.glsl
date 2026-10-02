// Between two shots: both are drawn to textures on the art grid and this picks, per cell, which
// one shows. uP.x = progress 0..1, uP.y = kind (see constants/intro/transitions.js). Both frames are
// already finished, so nothing here re-quantises them: every kind keeps the shots' own pixels.
uniform sampler2D uA, uB;

vec3 at(sampler2D t, vec2 cell){ return texture2D(t, (cell + 0.5)/uRes).rgb; }

void main(){
  vec2 cell = floor(gl_FragCoord.xy);
  float p = clamp(uP.x, 0.0, 1.0);
  float kind = uP.y;
  vec3 col;
  if (kind < 0.5){
    // dissolve: an ordered crossfade, cells handed over in the 8x8 Bayer order, so it reads as a fade
    col = bayer8(cell) < p ? at(uB, cell) : at(uA, cell);
  } else if (kind < 1.5){
    // through black, the 16-bit way: every cell steps down to the darkest palette colour near it,
    // one step at a time, the frame swaps in the black, and the new one steps up out of it
    float k = floor(abs(p*2.0 - 1.0)*8.0)/8.0;
    col = nearestPalette((p < 0.5 ? at(uA, cell) : at(uB, cell))*k);
  } else if (kind < 2.5){
    // burn: the dissolve front glows ember as it eats the old frame
    float o = noise2(cell/14.0)*0.7 + bayer8(cell)*0.3;
    float d = o - (p*1.3 - 0.15);
    col = d < 0.0 ? at(uB, cell) : at(uA, cell);
    if (d >= 0.0 && d < 0.03) col = GLOW;
    else if (d >= 0.0 && d < 0.09) col = EMBER;
  } else if (kind < 3.5){
    // mosaic: the old frame coarsens into blocks, swaps, and the new one resolves
    float m = 1.0 - abs(p*2.0 - 1.0);
    float size = exp2(floor(m*5.0));
    vec2 c = floor(cell/size)*size + floor(size*0.5);
    c = min(c, uRes - 1.0);
    col = p < 0.5 ? at(uA, c) : at(uB, c);
  } else if (kind < 4.5){
    // blink: two lids close on three steps, the frame swaps behind them, they open
    float m = floor((1.0 - abs(p*2.0 - 1.0))*3.0 + 0.001)/3.0;
    float v = abs(gl_FragCoord.y/uRes.y - 0.5)*2.0;
    col = v > 1.0 - m*1.02 ? VOID : (p < 0.5 ? at(uA, cell) : at(uB, cell));
  } else {
    // flash: white out in ordered steps, then the new frame out of the white
    float m = 1.0 - abs(p*2.0 - 1.0);
    col = bayer8(cell) < m ? LINEN : (p < 0.5 ? at(uA, cell) : at(uB, cell));
  }
  gl_FragColor = vec4(col, 1.0);
}

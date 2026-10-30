// The edge pass over an edged shot's cells (edgeCells.glsl): a cell standing in front of what lies
// beside it goes a shade darker, the outline; a convex crease a shade lighter, the glint. Both land
// back on the palette, and both fade out toward EDGE_FAR, where the haze already holds the scene.
uniform sampler2D uG;

const float EDGE_FAR = 16.0;
// how far behind the flat line a neighbour must sit to make an outline, as a share of the cell's own
// inverse depth; how far turned two faces must be to make a crease, how flat each face must run on
// (a pipe or a helmet turns all the way round and has no crease), and how proud the cell must stand
const float EDGE_STEP = 0.06;
const float EDGE_TURN = 0.25;
const float EDGE_FLAT = 0.97;
const float EDGE_BULGE = 0.002;
// which face of a crease takes the glint: the one turned up, and a little across, so it is one cell wide
const vec3 EDGE_SIDE = vec3(0.3, 1.0, 0.2);
const float EDGE_INK = 0.42;
const float EDGE_GLINT = 1.6;

struct Cell { float index; float w; vec3 n; bool edged; };

// a cell as written: its index, its inverse depth (straight across a flat face), its facing
Cell cellAt(vec2 frag){
  vec4 c = floor(texture2D(uG, frag/uRes)*255.0 + 0.5);
  float index = floor(c.r/8.0);
  float g = (c.g*8.0 + c.r - index*8.0)/2047.0;
  return Cell(index, 1.0/(CELL_NEAR*exp(g*log(CELL_FAR/CELL_NEAR))), facingOf(c.b), c.a > 0.5);
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  Cell c = cellAt(frag);
  vec3 col = palColor(c.index);
  float near = smoothstep(EDGE_FAR, EDGE_FAR*0.5, 1.0/c.w);
  if (!c.edged || near <= 0.0){
    gl_FragColor = vec4(col, 1.0);
    return;
  }
  float outline = 0.0, crease = 0.0;
  for (int i = 0; i < 4; i++){
    vec2 o = i == 0 ? vec2(1.0, 0.0) : i == 1 ? vec2(-1.0, 0.0) : i == 2 ? vec2(0.0, 1.0) : vec2(0.0, -1.0);
    Cell a = cellAt(frag + o);
    Cell b = cellAt(frag - o);
    // a neighbour well behind the line its far side draws through this cell lies past a silhouette
    outline = max(outline, step(EDGE_STEP*c.w, 2.0*c.w - b.w - a.w));
    // a crease seen from outside: two flat faces turned apart, this cell nearer than both neighbours
    vec3 beyond = cellAt(frag + 2.0*o).n;
    float faces = step(EDGE_FLAT, dot(c.n, b.n))*step(EDGE_FLAT, dot(a.n, beyond));
    float turned = step(EDGE_TURN, 1.0 - dot(c.n, a.n));
    float proud = step(EDGE_BULGE*c.w, 2.0*c.w - a.w - b.w);
    crease = max(crease, faces*turned*proud*step(0.0, dot(c.n - a.n, EDGE_SIDE)));
  }
  if (outline > 0.0) col = palColor(nearestIndex(col*mix(1.0, EDGE_INK, near)));
  else if (crease > 0.0) col = palColor(nearestIndex(col*mix(1.0, EDGE_GLINT, near)));
  gl_FragColor = vec4(col, 1.0);
}

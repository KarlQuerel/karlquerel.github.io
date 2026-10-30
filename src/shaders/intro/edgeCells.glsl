// A cell as an edged shot hands it to the edge pass (js/intro/edgePass.js): its palette index and its
// depth in r and g, the way its surface faces in b, and in a whether edges apply to it (not the hands).
// The depth is logarithmic over 11 bits, the 3 that r has left under an index of at most 32 colours.
const float CELL_NEAR = 0.25;
const float CELL_FAR = 48.0;

// the surface's facing folded onto an octahedron round y, 4 bits a side
float facingCode(vec3 n){
  n /= abs(n.x) + abs(n.y) + abs(n.z);
  vec2 p = n.xz;
  if (n.y < 0.0) p = (1.0 - abs(p.yx))*vec2(p.x < 0.0 ? -1.0 : 1.0, p.y < 0.0 ? -1.0 : 1.0);
  vec2 q = floor((p*0.5 + 0.5)*15.0 + 0.5);
  return q.x*16.0 + q.y;
}
vec3 facingOf(float code){
  float qx = floor(code/16.0);
  vec2 p = vec2(qx, code - qx*16.0)/15.0*2.0 - 1.0;
  vec3 n = vec3(p.x, 1.0 - abs(p.x) - abs(p.y), p.y);
  if (n.y < 0.0) n.xz = (1.0 - abs(n.zx))*vec2(n.x < 0.0 ? -1.0 : 1.0, n.z < 0.0 ? -1.0 : 1.0);
  return normalize(n);
}

vec4 edgeCell(float index, float depth, vec3 n, bool edged){
  float q = floor(clamp(log(depth/CELL_NEAR)/log(CELL_FAR/CELL_NEAR), 0.0, 1.0)*2047.0 + 0.5);
  float hi = floor(q/8.0);
  return vec4((index*8.0 + q - hi*8.0)/255.0, hi/255.0, facingCode(n)/255.0, edged ? 1.0 : 0.0);
}

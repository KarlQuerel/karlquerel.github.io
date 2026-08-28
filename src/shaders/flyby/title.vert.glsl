// The title stands in the world on its own plane, sixteen units ahead of where the
// camera rests. It is not an overlay: the flight closes on it, magnifies it, and
// passes between the two words of the name, which is the moment the page admits it
// was never flat.
// uAnchor is the point in the texture the plane hangs from - the middle of that gap -
// rather than its centre, so capping the width on a narrow viewport pivots there and
// the flight still threads the same hole.
attribute vec2 aUV;
uniform vec3 uCamPos, uRight, uUp, uFwd, uTPos, uTRight, uTUp;
uniform vec2 uAnchor, uSnap;
uniform float uFocal, uAspect, uTW, uTH;
varying vec2 vUV;
void main(){
  vec3 world = uTPos + uTRight*((aUV.x - uAnchor.x)*uTW) + uTUp*((uAnchor.y - aUV.y)*uTH);
  vec3 rel = world - uCamPos;
  float z = dot(rel, uFwd);
  vUV = aUV;
  if (z < 0.3){ gl_Position = vec4(2.0,2.0,2.0,1.0); return; }
  vec2 s = uFocal*vec2(dot(rel, uRight), dot(rel, uUp))/z;
  // uSnap lands the anchor on an art-pixel boundary; see where it is computed
  gl_Position = vec4(2.0*s.x/uAspect + uSnap.x, 2.0*s.y + uSnap.y, 0.0, 1.0);
}

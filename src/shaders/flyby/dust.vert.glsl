attribute vec3 aSeed;
attribute float aTail;
uniform vec3 uCamPos, uRight, uUp, uFwd, uStreak;
uniform float uFocal, uAspect, uBox;
varying float vA;
void main(){
  // Motes sit still in the world and wrap into a box that follows the camera. Built in
  // camera space instead, as they were, they ride the view: turn the camera and the
  // whole field turns with it, which is why the streaks never answered a turn.
  vec3 rel = mod(aSeed*uBox - uCamPos, uBox) - uBox*0.5;
  vec3 q = rel - uStreak*aTail;          // the tail trails along the way we are going
  float z = dot(q, uFwd);
  if (z < 0.25){ gl_Position = vec4(2.0,2.0,2.0,1.0); vA = 0.0; return; }
  vec2 s = uFocal*vec2(dot(q, uRight), dot(q, uUp))/z;
  gl_Position = vec4(2.0*s.x/uAspect, 2.0*s.y, 0.0, 1.0);
  gl_PointSize = 1.0;
  // fade at the edge of the box, so wrapping never shows as a pop
  vA = smoothstep(uBox*0.5, uBox*0.18, length(rel))*smoothstep(0.25, 1.8, z);
}

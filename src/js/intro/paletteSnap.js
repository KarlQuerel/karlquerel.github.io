// The contact scene's colour for a shot drawn in GLSL: every cell lands on a PALETTE colour, and the
// Bayer checker only fills a narrow seam where two colours meet, as seamIndex does along a ridge ramp.

import { PALETTE } from '../../constants/palette.js'

const glsl = ([r, g, b]) => `vec3(${r}.0, ${g}.0, ${b}.0)/255.0`

// GLSL for snapPalette(col, frag) over the named colours; `seam` is the checker's half-width as a
// share of the way from one colour to the next (ENTRY.ridgeSeam)
export const paletteSnap = (names, seam) => `
const float PAL_SEAM = ${seam.toFixed(3)};
// the channels weighted as the eye weighs them, or a dark blue passes for black
const vec3 PAL_EYE = vec3(0.55, 0.77, 0.34);
void palTry(vec3 col, vec3 c, inout vec3 a, inout vec3 b, inout float da, inout float db){
  vec3 e = (col - c)*PAL_EYE;
  float d = dot(e, e);
  if (d < da){ db = da; b = a; da = d; a = c; }
  else if (d < db){ db = d; b = c; }
}
vec3 snapPalette(vec3 col, vec2 frag){
  col = pow(clamp(col, 0.0, 1.0), vec3(0.92));
  vec3 a = vec3(0.0), b = vec3(0.0);
  float da = 1e9, db = 1e9;
${names.map(name => `  palTry(col, ${glsl(PALETTE[name])}, a, b, da, db);`).join('\n')}
  // how far col sits from its nearest colour toward the next one: the seam is around halfway
  vec3 ab = (b - a)*PAL_EYE;
  float s = dot((col - a)*PAL_EYE, ab)/max(dot(ab, ab), 1e-6);
  float over = clamp((s - 0.5 + PAL_SEAM)/(2.0*PAL_SEAM), 0.0, 1.0);
  float bayer4 = bayer2(0.5*frag)*0.25 + bayer2(frag) + 1.0/32.0;
  return bayer4 < over ? b : a;
}
`

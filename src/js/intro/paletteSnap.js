// The contact scene's colour for a shot drawn in GLSL: every cell lands on a PALETTE colour, and the
// Bayer checker only fills a narrow seam where two colours meet, as seamIndex does along a ridge ramp.
// A colour is also its index in `names`, for a pass that works on the snapped cells afterwards.

import { PALETTE } from '../../constants/palette.js'

const glsl = ([r, g, b]) => `vec3(${r}.0, ${g}.0, ${b}.0)/255.0`

// GLSL for snapPalette(col, frag) over the named colours, and under it snapIndex(col, frag),
// nearestIndex(col) and palColor(i); `seam` is the checker's half-width as a share of the way from
// one colour to the next (ENTRY.ridgeSeam). With `consts`, each colour is also a constant under its
// own name in capitals (SAND, STONE...), so a shader never copies a palette value.
export const paletteSnap = (names, seam, consts = false) => `
${consts ? names.map(name => `const vec3 ${name.toUpperCase()} = ${glsl(PALETTE[name])};`).join('\n') : ''}
const float PAL_SEAM = ${seam.toFixed(3)};
// the channels weighted as the eye weighs them, or a dark blue passes for black
const vec3 PAL_EYE = vec3(0.55, 0.77, 0.34);
vec3 palColor(float i){
${names
	.slice(0, -1)
	.map((name, i) => `  if (i < ${i}.5) return ${glsl(PALETTE[name])};`)
	.join('\n')}
  return ${glsl(PALETTE[names.at(-1)])};
}
void palTry(vec3 col, vec3 c, float i, inout vec3 a, inout vec3 b, inout vec2 ia, inout float da, inout float db){
  vec3 e = (col - c)*PAL_EYE;
  float d = dot(e, e);
  if (d < da){ db = da; b = a; ia.y = ia.x; da = d; a = c; ia.x = i; }
  else if (d < db){ db = d; b = c; ia.y = i; }
}
// the two colours nearest col and their indices, nearest first
void palPair(vec3 col, out vec3 a, out vec3 b, out vec2 ia){
  a = vec3(0.0);
  b = vec3(0.0);
  ia = vec2(0.0);
  float da = 1e9, db = 1e9;
${names.map((name, i) => `  palTry(col, ${glsl(PALETTE[name])}, ${i}.0, a, b, ia, da, db);`).join('\n')}
}
float snapIndex(vec3 col, vec2 frag){
  col = pow(clamp(col, 0.0, 1.0), vec3(0.92));
  vec3 a, b;
  vec2 ia;
  palPair(col, a, b, ia);
  // how far col sits from its nearest colour toward the next one: the seam is around halfway
  vec3 ab = (b - a)*PAL_EYE;
  float s = dot((col - a)*PAL_EYE, ab)/max(dot(ab, ab), 1e-6);
  float over = clamp((s - 0.5 + PAL_SEAM)/(2.0*PAL_SEAM), 0.0, 1.0);
  float bayer4 = bayer2(0.5*frag)*0.25 + bayer2(frag) + 1.0/32.0;
  return bayer4 < over ? ia.y : ia.x;
}
float nearestIndex(vec3 col){
  vec3 a, b;
  vec2 ia;
  palPair(pow(clamp(col, 0.0, 1.0), vec3(0.92)), a, b, ia);
  return ia.x;
}
vec3 snapPalette(vec3 col, vec2 frag){ return palColor(snapIndex(col, frag)); }
`

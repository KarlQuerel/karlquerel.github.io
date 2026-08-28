precision mediump float;
varying float vA;
uniform float uFade;
void main(){ gl_FragColor = vec4(vec3(0.78,0.85,1.0)*vA*uFade, 1.0); }

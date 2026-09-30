#version 300 es
// The planet's surface, one cell per fragment: a port of the sweep in planetShader.js, which stays the reference.
precision highp float;
precision highp int;

// __PLANET__

uniform uint uSeed;
uniform vec4 uBasins[BASIN_COUNT];
// storm centre (xyz) and cos(radius); the rainbands' tangent basis
uniform vec4 uStorm;
uniform vec2 uU1;
uniform vec3 uU2;
uniform float uBandPhase;
// per picture: ground and cloud rotations (cos, sin), the yawed light, its half-vector, its tilted twin
uniform vec2 uSpin;
uniform vec2 uCloud;
uniform vec3 uLight;
uniform vec3 uHalf;
uniform vec3 uLightT;
uniform float uThin;

out vec4 fragColor;

const int BAYER4[16] = int[](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);

// uint arithmetic wraps like Math.imul, so the terrain matches the CPU sweep's
float hash3(int ix, int iy, int iz) {
	uint n = uint(ix) * 374761393u;
	n += uint(iy) * 668265263u;
	n += uint(iz) * 1274126177u;
	n += uSeed * 951274213u;
	n ^= n >> 13u;
	n *= 1274126177u;
	n ^= n >> 16u;
	return float(n) / 4294967295.0;
}

float smoothstep01(float t) {
	return t * t * (3.0 - 2.0 * t);
}

float noise3(vec3 p) {
	vec3 i = floor(p);
	vec3 f = p - i;
	ivec3 c = ivec3(i);
	float u = smoothstep01(f.x);
	float v = smoothstep01(f.y);
	float w = smoothstep01(f.z);
	float x00 = mix(hash3(c.x, c.y, c.z), hash3(c.x + 1, c.y, c.z), u);
	float x10 = mix(hash3(c.x, c.y + 1, c.z), hash3(c.x + 1, c.y + 1, c.z), u);
	float x01 = mix(hash3(c.x, c.y, c.z + 1), hash3(c.x + 1, c.y, c.z + 1), u);
	float x11 = mix(hash3(c.x, c.y + 1, c.z + 1), hash3(c.x + 1, c.y + 1, c.z + 1), u);
	return mix(mix(x00, x10, v), mix(x01, x11, v), w);
}

float fbm(vec3 p, int octaves) {
	float sum = 0.0;
	float amp = 0.5;
	float freq = 1.0;
	for (int o = 0; o < octaves; o++) {
		sum += amp * noise3(vec3(p.x * freq + float(o * 19), p.y * freq, p.z * freq));
		freq *= 2.0;
		amp *= 0.5;
	}
	return sum;
}

float elevation(vec3 p) {
	float n = fbm(p * NOISE_SCALE, 4);
	for (int b = 0; b < BASIN_COUNT; b++) {
		vec4 bs = uBasins[b];
		float d = dot(p, bs.xyz);
		if (d > bs.w) n -= BASIN_DEPTH * smoothstep01((d - bs.w) / (1.0 - bs.w));
	}
	return n;
}

int bandAt(float n, float thr) {
	for (int i = 0; i < BAND_COUNT - 1; i++) {
		float edge = EDGES[i];
		if (n < edge - BAND_BLEND) return i;
		if (n < edge + BAND_BLEND) return (n - edge + BAND_BLEND) / (2.0 * BAND_BLEND) > thr ? i + 1 : i;
	}
	return BAND_COUNT - 1;
}

int ditherIndex(float lit, int levels, float thr) {
	float v = lit * float(levels - 1);
	float i = floor(v);
	int up = v - i > thr ? 1 : 0;
	return clamp(int(i) + up, 0, levels - 1);
}

// Cloud cover at a cloud-space point, with the storm's falloff and warped noise handed back.
float cloudCoverAt(vec3 c, out float stormT, out float stormN) {
	stormT = 0.0;
	stormN = 0.0;
	if (uThin >= 1.0) return 0.0;
	vec3 w = c;
	float bump = 0.0;
	vec3 s = uStorm.xyz;
	float d = dot(c, s);
	if (d > uStorm.w) {
		float t = (d - uStorm.w) / (1.0 - uStorm.w);
		stormT = t;
		float t2 = t * t;
		float a = STORM_SWIRL * t2;
		float ca = cos(a);
		float sa = sin(a);
		w = c * ca + cross(s, c) * sa + s * (d * (1.0 - ca));
		vec3 pr = c - s * d;
		float phi = atan(dot(pr, uU2), pr.x * uU1.x + pr.z * uU1.y);
		float band = STORM_BAND_MIN + (1.0 - STORM_BAND_MIN) *
			(0.5 + 0.5 * sin(STORM_ARMS * phi + STORM_ARM_TWIST * (1.0 - t) + uBandPhase));
		float t4 = t2 * t2;
		float t8 = t4 * t4;
		bump = STORM_BOOST * t2 * band - STORM_EYE_DROP * t8 * t8;
	}
	float cn = fbm(vec3(w.x * CLOUD_SCALE + 41.0, w.y * CLOUD_SCALE, w.z * CLOUD_SCALE), CLOUD_OCTAVES) + bump;
	if (stormT > 0.0) stormN = cn;
	if (cn <= CLOUD_COVER - CLOUD_BLEND) return 0.0;
	float op = bump > 0.0 ? CLOUD_OPACITY + (1.0 - CLOUD_OPACITY) * min(1.0, bump * STORM_SOLIDIFY) : CLOUD_OPACITY;
	float cover = cn >= CLOUD_COVER + CLOUD_BLEND
		? op
		: smoothstep01((cn - CLOUD_COVER + CLOUD_BLEND) / (2.0 * CLOUD_BLEND)) * op;
	return cover * (1.0 - uThin);
}

void main() {
	int x = int(gl_FragCoord.x);
	// the CPU sweep's rows run top-down
	int y = RES - 1 - int(gl_FragCoord.y);
	float dx = (float(x) + 0.5 - CENTER) / RADIUS;
	float dy = (float(y) + 0.5 - CENTER) / RADIUS;
	float d2 = dx * dx + dy * dy;
	float haloReach = 1.0 + HALO_WIDTH;

	if (d2 > 1.0) {
		float dist = sqrt(d2);
		if (dist >= haloReach) {
			fragColor = vec4(0.0);
			return;
		}
		float up = (dist - 1.0) / HALO_WIDTH;
		int at = min(int(up * float(SHELL_COUNT)), SHELL_COUNT - 1);
		vec4 sh = SHELL[at];
		float inv = 1.0 / dist;
		float nl = max(0.0, (dx * inv * uLight.x + dy * inv * uLight.y + SHELL_TWILIGHT) / (1.0 + SHELL_TWILIGHT));
		float alpha = clamp(floor(sh.a * (SHELL_NIGHT + (1.0 - SHELL_NIGHT) * nl)), 0.0, 255.0);
		fragColor = vec4(sh.rgb, alpha) / 255.0;
		return;
	}

	float dz = sqrt(1.0 - d2);
	float diff = max(0.0, dx * uLight.x + dy * uLight.y + dz * uLight.z);

	float ny = dy * COS_T - dz * SIN_T;
	float nz = dy * SIN_T + dz * COS_T;
	float sx = dx * uSpin.x + nz * uSpin.y;
	float sz = -dx * uSpin.y + nz * uSpin.x;
	float n = elevation(vec3(sx, ny, sz));

	float thr = (float(BAYER4[(y & 3) * 4 + (x & 3)]) + 0.5) / 16.0;

	float inStorm;
	float stormTex;
	float cover = cloudCoverAt(vec3(dx * uCloud.x + nz * uCloud.y, ny, -dx * uCloud.y + nz * uCloud.x), inStorm, stormTex);
	bool onCloud = cover > thr;
	int band = bandAt(n, thr);

	float relief = 1.0 + (n - SEA_LEVEL) * RELIEF;
	int lvl = ditherIndex(diff * relief, LEVELS, thr) + ditherIndex(d2 * d2 * diff, RIM_LEVELS, thr);

	if (onCloud && inStorm > 0.0) {
		float tex = clamp((stormTex - CLOUD_COVER) * STORM_TEX_GAIN, 0.0, 1.0);
		lvl += ditherIndex(inStorm * diff * tex, STORM_WHITEN_LEVELS, thr);
	}

	bool shaded = false;
	if (!onCloud && diff > 0.0) {
		vec3 o = vec3(dx, ny, nz) + uLightT * SHADOW_OFFSET;
		float ignoreT;
		float ignoreN;
		shaded = cloudCoverAt(vec3(o.x * uCloud.x + o.z * uCloud.y, o.y, -o.x * uCloud.y + o.z * uCloud.x), ignoreT, ignoreN) > thr;
		if (shaded) lvl = max(0, lvl - SHADOW_DROP);
	}

	if (!onCloud && !shaded && n < SEA_LEVEL) {
		float sd = max(0.0, dx * uHalf.x + dy * uHalf.y + dz * uHalf.z);
		float s2 = sd * sd;
		float s4 = s2 * s2;
		float s8 = s4 * s4;
		if (s8 * s8 * OCEAN_GLOSS > thr) lvl = LEVELS - 1;
	}

	lvl = min(lvl, LEVELS - 1);
	vec3 col = onCloud ? CLOUD_RAMP[lvl] : RAMPS[band * LEVELS + lvl];
	fragColor = vec4(col / 255.0, 1.0);
}

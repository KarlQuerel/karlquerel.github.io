#!/usr/bin/env python3
"""Draws the site's mouse cursor sprites into public/assets/cursor/.

Not part of the build — run it by hand after changing a value below, then commit
the PNGs it writes. It exists because these sprites are parametric, not hand-drawn:
without it nobody can nudge the roundness or recolour a band without redrawing the
whole thing from scratch.

    pip install --user Pillow && python3 scripts/gen-cursor.py

The shape is a broad swept blade taken from a reference cursor: a wide triangle with
a shallow scoop across its shortest (back) edge. Three concentric tone bands give it
the thickness that reads as solid glass rather than a flat sticker — a flat rim looks
like a sticker, the darker inner wall is what sells the material.
"""

import math
import pathlib

from PIL import Image, ImageDraw, ImageFilter

OUT = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'assets' / 'cursor'

# Sprite size in CSS px. The ceiling is ~32: past it Safari and Firefox quietly fall
# back to the OS cursor, so this must not grow.
W, H = 30, 32
# Supersample factor. The bevel is a gradient, so it is drawn big and downsampled.
SS = 8
# Emitted pixel densities. 3x matters on phones and high-end laptops, where a 2x
# sprite would be upscaled and lose the crispness the rest of this is for.
DENSITIES = (1, 2, 3)

# Corner rounding, in CSS px of blur before the mask is thresholded. Rounds every
# corner evenly, which a polygon join cannot.
ROUND = 4.2
# Curve on the back edge, as a fraction of its chord. Shallow reads as a drawn blade;
# pulled deep it becomes the notch every OS arrow has and stops looking deliberate.
SCOOP = 0.18
# Tip sits beyond the corner so ROUND's blur leaves a point rather than a blunt nub.
TIP, RIGHT, BOTTOM = (0.2, -0.5), (28.6, 16.0), (9.2, 31.2)
# Where the three tone bands start, inset from the silhouette.
BANDS = (0.0, 1.3, 2.5)

# Tones, all from src/styles/_variables.scss so the cursor is the same metal as the
# sprites. The rim is lit and the body is dark: a dark rim disappears against the void.
NEAR_WHITE = (236, 240, 246)
SILVER = (200, 206, 216)
PEWTER = (140, 148, 162)
GUN = (88, 96, 112)
GRAPHITE = (58, 64, 78)
IRON = (24, 29, 42)

# bezel, inner wall, core — rest, then hover inverts it, then press dims the body.
STATES = {
	'blade': (NEAR_WHITE, GUN, GRAPHITE),
	'blade-active': (IRON, GUN, NEAR_WHITE),
	'blade-press': (IRON, GUN, PEWTER),
}


def _bezier(p0, ctrl, p1, steps=90):
	return [
		(
			(1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * ctrl[0] + t * t * p1[0],
			(1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * ctrl[1] + t * t * p1[1],
		)
		for t in (i / steps for i in range(steps + 1))
	]


def _path(inset):
	"""The silhouette, pulled `inset` px toward its centroid."""
	tip, right, bottom = TIP, RIGHT, BOTTOM
	cx = (tip[0] + right[0] + bottom[0]) / 3
	cy = (tip[1] + right[1] + bottom[1]) / 3

	def pull(p):
		d = math.hypot(p[0] - cx, p[1] - cy)
		return (p[0] + (cx - p[0]) / d * inset, p[1] + (cy - p[1]) / d * inset) if d else p

	tip, right, bottom = pull(tip), pull(right), pull(bottom)
	chord = math.hypot(right[0] - bottom[0], right[1] - bottom[1])
	mid = ((right[0] + bottom[0]) / 2, (right[1] + bottom[1]) / 2)
	nx, ny = -(bottom[1] - right[1]) / chord, (bottom[0] - right[0]) / chord
	ctrl = (mid[0] + nx * SCOOP * chord * 2, mid[1] + ny * SCOOP * chord * 2)
	pts = [tip, right] + _bezier(right, ctrl, bottom)[1:] + [bottom]
	return [(x * SS, y * SS) for x, y in pts]


def _mask(inset):
	m = Image.new('L', (W * SS, H * SS), 0)
	ImageDraw.Draw(m).polygon(_path(inset), fill=255)
	# blur-then-threshold rounds the corners; a polygon join only chamfers them
	return m.filter(ImageFilter.GaussianBlur(ROUND * SS * 0.5)).point(
		lambda v: 255 if v >= 128 else 0
	)


def render(tones, density):
	size = (W * SS, H * SS)
	im = Image.new('RGBA', size, (0, 0, 0, 0))
	for inset, colour in zip(BANDS, tones):
		im = Image.composite(Image.new('RGBA', size, colour + (255,)), im, _mask(inset))
	return im.resize((W * density, H * density), Image.LANCZOS)


def main():
	OUT.mkdir(parents=True, exist_ok=True)
	for name, tones in STATES.items():
		for density in DENSITIES:
			suffix = '' if density == 1 else f'@{density}x'
			path = OUT / f'{name}{suffix}.png'
			render(tones, density).save(path, optimize=True)
			print(f'  {path.relative_to(OUT.parent.parent.parent)}  {W * density}x{H * density}')


if __name__ == '__main__':
	main()

"""The EVA rack on the corridor wall: two docks for the packs the crew wear outside. Each dock is a panel
ringed with light and a pad the pack floats over. One pack is in: a single gunmetal shell, its edges
chamfered, split once across the shoulders, the split lit amber from inside like the suits' lights. The
other dock is empty, its ring amber and its pad dark, while the spacewalker is out.

    blender -b --factory-startup -P scripts/blender/evaRack.py
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kit import chamfered, cut, export, hover, inset, plate, tube  # noqa: E402

PLATE = 0.035
# each dock's middle along the wall, and whether its pack is in
DOCKS = ((-0.29, True), (0.29, False))
# the pad the pack floats over: its middle out from the wall and height, its radius
PAD = (0.115, 0.93, 0.085)
# the pack from the front, [(along from its middle, up)]; its back and face out from the wall, the chamfer
# round its face, and its lit split: the height, the gap's half and how far the light sits behind the face
SHELL = [(-0.12, 1.66), (0.12, 1.66), (0.16, 1.62), (0.15, 1.12), (0.1, 1.0), (-0.1, 1.0), (-0.15, 1.12), (-0.16, 1.62)]
BACK, FACE, CHAMFER = 0.075, 0.17, 0.018
SPLIT, GAP, SUNK = 1.5, 0.008, 0.004


def pack(z):
    shell = [(z + dz, y) for dz, y in SHELL]
    light = cut(cut(shell, SPLIT - GAP, above=True), SPLIT + GAP, above=False)
    hover(
        [
            plate("body", cut(shell, SPLIT - GAP, above=False), BACK, FACE, "armour", chamfer=CHAMFER),
            plate("cap", cut(shell, SPLIT + GAP, above=True), BACK, FACE, "armour", chamfer=CHAMFER),
            plate("split", inset(light, 0.001), BACK, FACE - SUNK, "suitLight"),
        ]
    )


def dock(i, z, docked):
    outline = chamfered(z - 0.25, z + 0.25, 0.7, 1.9, 0.06)
    plate(f"panel{i}", outline, PLATE, PLATE + 0.01, "furniture")
    ring = [(PLATE + 0.02, y, q) for q, y in inset(outline, 0.03)]
    tube(f"ring{i}", ring, 0.01, "light" if docked else "suitLight", bend=False, sides=1, closed=True)
    x, y, r = PAD
    tube(f"pad{i}", [(x, y - 0.03, z), (x, y, z)], r, "fitting", bend=False, sides=2)
    tube(f"padLight{i}", [(x, y, z), (x, y + 0.004, z)], r * 0.75, "lamp" if docked else "seam", bend=False, sides=2)
    if docked:
        pack(z)


plate("backplate", chamfered(-0.6, 0.6, 0.62, 1.98, 0.12), 0, PLATE, "fitting")
for i, (z, docked) in enumerate(DOCKS):
    dock(i, z, docked)
export("EvaRack")

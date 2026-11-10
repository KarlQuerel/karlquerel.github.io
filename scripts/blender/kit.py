"""What the game's Blender props share: shapes placed in the game's frame and exported as GLB.

Each material is named for a PILOT_MATS paint. The game swaps it for that paint by name, so the colours
set here are only for looking at the model in Blender. Run a prop's script with Blender, not Python:

    blender -b --factory-startup -P scripts/blender/<prop>.py [-- <dir to save the .blend in>]

The game's frame: x out from the wall, y up from the deck, z along the wall, in metres.
"""

import json
import os
import subprocess
import sys

import bmesh
import bpy
from mathutils import Vector

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODELS = os.path.join(ROOT, "public", "assets", "game", "models")

# PILOT_MATS and PALETTE read from the game's own source, so no colour is copied here
_READ = (
    "import { PILOT_MATS } from './src/constants/game/pilot.js';"
    "import { PALETTE } from './src/constants/palette.js';"
    "console.log(JSON.stringify({ mats: PILOT_MATS, palette: PALETTE }))"
)
GAME = json.loads(
    subprocess.run(
        ["node", "--input-type=module", "-e", _READ],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=True,
    ).stdout
)

bpy.ops.wm.read_factory_settings(use_empty=True)


def _linear(spec):
    """A PILOT_MATS colour, [name, k] or [a, b, t, k], as Blender's linear RGBA."""
    a, b, t, k = (spec[0], spec[0], 0, spec[1]) if len(spec) == 2 else spec
    ca, cb = GAME["palette"][a], GAME["palette"][b]
    srgb = [min(1, (x + (y - x) * t) * k / 255) for x, y in zip(ca, cb)]
    return [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb] + [1]


def paint(key):
    """The material for a PILOT_MATS key, made once; an unknown key fails here, not in the game."""
    if key in bpy.data.materials:
        return bpy.data.materials[key]
    spec = GAME["mats"][key]
    m = bpy.data.materials.new(key)
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = m.diffuse_color = _linear(spec["base"])
    if "emit" in spec:
        bsdf.inputs["Emission Color"].default_value = _linear(spec["emit"])
        bsdf.inputs["Emission Strength"].default_value = 1
    return m


def at(p):
    """A game-frame point in Blender's frame, which the glTF export turns back."""
    return Vector((p[0], -p[2], p[1]))


def _solid(name, bm, mat, smooth=False):
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    for face in mesh.polygons:
        face.use_smooth = smooth
    mesh.materials.append(paint(mat))
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    return obj


def chamfered(z0, z1, y0, y1, c):
    """A rectangle's outline on the wall, its corners cut `c` at 45 degrees like the corridor's."""
    return [
        (z0 + c, y0),
        (z1 - c, y0),
        (z1, y0 + c),
        (z1, y1 - c),
        (z1 - c, y1),
        (z0 + c, y1),
        (z0, y1 - c),
        (z0, y0 + c),
    ]


def _edges(outline):
    return zip(outline, outline[1:] + outline[:1])


def inset(outline, d):
    """A convex `outline` with every edge moved `d` inward."""
    turn = 1 if sum(z0 * y1 - z1 * y0 for (z0, y0), (z1, y1) in _edges(outline)) > 0 else -1
    lines = []
    for (z0, y0), (z1, y1) in _edges(outline):
        dz, dy = z1 - z0, y1 - y0
        n = turn * d / (dz * dz + dy * dy) ** 0.5
        lines.append(((z0 - dy * n, y0 + dz * n), (dz, dy)))
    corners = []
    for (p, u), (q, v) in zip(lines[-1:] + lines[:-1], lines):
        t = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / (u[0] * v[1] - u[1] * v[0])
        corners.append((p[0] + t * u[0], p[1] + t * u[1]))
    return corners


def cut(outline, y, above):
    """The part of `outline` above (or below) height `y`."""
    keep = (lambda p: p[1] >= y) if above else (lambda p: p[1] <= y)
    out = []
    for p, q in _edges(outline):
        if keep(p):
            out.append(p)
        if keep(p) != keep(q):
            out.append((p[0] + (y - p[1]) / (q[1] - p[1]) * (q[0] - p[0]), y))
    return out


def plate(name, outline, x0, x1, mat, chamfer=0.0):
    """A plate on the wall: `outline` [(z, y), ...] on x0 out to x1, its front edge cut `chamfer` at 45 degrees."""
    rings = [(x0, outline), (x1, outline)]
    if chamfer:
        rings[1:] = [(x1 - chamfer, outline), (x1, inset(outline, chamfer))]
    bm = bmesh.new()
    loops = [[bm.verts.new(at((x, y, z))) for z, y in ring] for x, ring in rings]
    bm.faces.new(loops[0])
    bm.faces.new(loops[-1][::-1])
    for a, b in zip(loops, loops[1:]):
        for i in range(len(a)):
            j = (i + 1) % len(a)
            bm.faces.new((a[i], a[j], b[j], b[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return _solid(name, bm, mat)


def hover(objects):
    """`objects` hung under one node named `hover`, which the game bobs."""
    node = bpy.data.objects.new("hover", None)
    bpy.context.collection.objects.link(node)
    for obj in objects:
        obj.parent = node
    return node


def tube(name, points, r, mat, bend=True, sides=1, closed=False):
    """A tube `r` round through `points`, curving through them when it `bend`s (a cable) or straight from
    one to the next (a rod), back to the first when `closed`; `sides` 0, 1, 2 make it 4, 6, 8 sided."""
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth, curve.bevel_resolution, curve.use_fill_caps = r, sides, not closed
    curve.resolution_u = 6
    if bend:
        spline = curve.splines.new("BEZIER")
        spline.bezier_points.add(len(points) - 1)
        for point, p in zip(spline.bezier_points, points):
            point.co = at(p)
            point.handle_left_type = point.handle_right_type = "AUTO"
    else:
        spline = curve.splines.new("POLY")
        spline.points.add(len(points) - 1)
        for point, p in zip(spline.points, points):
            point.co = (*at(p), 1)
    spline.use_cyclic_u = closed
    shape = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(shape)
    mesh = bpy.data.meshes.new_from_object(shape.evaluated_get(bpy.context.evaluated_depsgraph_get()))
    bpy.data.objects.remove(shape)
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bpy.data.meshes.remove(mesh)
    return _solid(name, bm, mat, smooth=bend)


def export(name):
    """Writes public/assets/game/models/<name>.glb, and <name>.blend into the folder given after `--`."""
    bpy.ops.export_scene.gltf(
        filepath=os.path.join(MODELS, f"{name}.glb"),
        export_format="GLB",
        export_apply=True,
    )
    if "--" in sys.argv:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.join(sys.argv[sys.argv.index("--") + 1], f"{name}.blend"))

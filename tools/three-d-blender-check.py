"""Independent Blender GLB import/rig/morph/material and multi-view render probe."""

from pathlib import Path
import hashlib
import json
import sys
import time
import bpy
from mathutils import Vector


def main():
    args = sys.argv[sys.argv.index('--') + 1 :]
    source, out = Path(args[0]), Path(args[1])
    out.mkdir(parents=True, exist_ok=False)
    before = hashlib.sha256(source.read_bytes()).hexdigest()
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(source))
    objects = list(bpy.context.scene.objects)
    meshes = [o for o in objects if o.type == 'MESH']
    rigs = [o for o in objects if o.type == 'ARMATURE']
    shape_names = sorted(
        {key.name for o in meshes if o.data.shape_keys for key in o.data.shape_keys.key_blocks}
    )
    if not rigs or not meshes or not {'blinkLeft', 'blinkRight', 'aa'}.issubset(shape_names):
        raise ValueError('E_3D_BLENDER_RIG')
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE_NEXT'
    scene.render.resolution_x = 768
    scene.render.resolution_y = 768
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.view_settings.view_transform = 'Standard'
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    world = bpy.data.worlds.new('ResearchWorld')
    world.use_nodes = True
    world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.25, 0.22, 0.3, 1)
    world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.8
    scene.world = world
    for name, position, energy in [('Key', (2, -3, 4), 600), ('Fill', (-3, -1, 2), 300)]:
        data = bpy.data.lights.new(name, 'AREA')
        data.energy = energy
        data.shape = 'DISK'
        data.size = 4
        light = bpy.data.objects.new(name, data)
        scene.collection.objects.link(light)
        light.location = position
        light.rotation_euler = (
            (Vector((0, 0, 1.5)) - light.location).to_track_quat('-Z', 'Y').to_euler()
        )
    camera_data = bpy.data.cameras.new('ResearchCamera')
    camera = bpy.data.objects.new('ResearchCamera', camera_data)
    scene.collection.objects.link(camera)
    scene.camera = camera
    camera_data.type = 'ORTHO'
    camera_data.ortho_scale = 1.3
    photos = []

    def shot(name, location):
        camera.location = location
        camera.rotation_euler = (
            (Vector((0, 0, 1.5)) - camera.location).to_track_quat('-Z', 'Y').to_euler()
        )
        scene.render.filepath = str(out / (name + '.png'))
        start = time.perf_counter()
        bpy.ops.render.render(write_still=True)
        photos.append(
            {
                'view': name,
                'sha256': hashlib.sha256((out / (name + '.png')).read_bytes()).hexdigest(),
                'renderMs': (time.perf_counter() - start) * 1000,
            }
        )

    # Imported animation remains present, but neutral first avoids mistaking animation sampling for rest shape.
    for rig in rigs:
        if rig.animation_data:
            rig.animation_data.action = None
        for bone in rig.pose.bones:
            bone.rotation_mode = 'QUATERNION'
            bone.rotation_quaternion = (1, 0, 0, 0)
    for obj in meshes:
        if obj.data.shape_keys:
            obj.data.shape_keys.animation_data_clear()
            for key in obj.data.shape_keys.key_blocks:
                key.value = 0
    for name, position in [
        ('front', (0, -3, 1.5)),
        ('side', (3, 0, 1.5)),
        ('rear', (0, 3, 1.5)),
        ('threequarter', (2.2, -2.2, 1.55)),
    ]:
        shot(name, position)
    for obj in meshes:
        if obj.data.shape_keys:
            obj.data.shape_keys.key_blocks['blinkLeft'].value = 1
            obj.data.shape_keys.key_blocks['blinkRight'].value = 1
    shot('blink', (0, -3, 1.5))
    for obj in meshes:
        if obj.data.shape_keys:
            obj.data.shape_keys.key_blocks['blinkLeft'].value = 0
            obj.data.shape_keys.key_blocks['blinkRight'].value = 0
            obj.data.shape_keys.key_blocks['aa'].value = 1
    shot('mouth', (0, -3, 1.5))
    head = next(b for rig in rigs for b in rig.pose.bones if b.name == 'head')
    head.rotation_mode = 'XYZ'
    head.rotation_euler[2] = 0.4
    shot('head', (0, -3, 1.5))
    body_names = ['chest', 'leftUpperArm', 'leftLowerArm', 'rightUpperArm', 'rightLowerArm']
    weighted = {name: 0 for name in body_names}
    for obj in meshes:
        indices = {group.index: group.name for group in obj.vertex_groups}
        for vertex in obj.data.vertices:
            for group in vertex.groups:
                name = indices.get(group.group)
                if name in weighted and group.weight > 0.01:
                    weighted[name] += 1
        if obj.data.shape_keys:
            for key in obj.data.shape_keys.key_blocks:
                key.value = 0
    for name in body_names:
        for rig in rigs:
            for bone in rig.pose.bones:
                bone.rotation_mode = 'XYZ'
                bone.rotation_euler = (0, 0, 0)
            bone = rig.pose.bones.get(name)
            if bone:
                bone.rotation_euler[2] = 0.5
        shot(name, (0, -3, 1.5))
    result = {
        'passed': len(set(p['sha256'] for p in photos)) >= 11 and all(weighted.values()),
        'target': 'Official portable Blender',
        'version': bpy.app.version_string,
        'sourceSha256': before,
        'sourceUnchanged': hashlib.sha256(source.read_bytes()).hexdigest() == before,
        'meshCount': len(meshes),
        'armatureCount': len(rigs),
        'boneCount': sum(len(r.data.bones) for r in rigs),
        'shapeKeys': shape_names,
        'bodyWeightedVertices': weighted,
        'materials': [m.name for m in bpy.data.materials],
        'imageCount': len(bpy.data.images),
        'views': photos,
        'ourAppRequired': False,
        'ourFrameServerRequired': False,
        'physicalDevicesOpened': False,
        'productionQualityAcceptance': False,
    }
    (out / 'report.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print('PHASE31_BLENDER_PASS' if result['passed'] else 'E_3D_BLENDER_VIEWS')


if __name__ == '__main__':
    main()

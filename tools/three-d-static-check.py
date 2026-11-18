"""Independent six-axis inspection of a learned static mesh, without assuming a humanoid rig."""
from pathlib import Path
import hashlib
import json
import sys
import bpy
from mathutils import Vector

args = sys.argv[sys.argv.index('--')+1:]
source, out = Path(args[0]), Path(args[1])
out.mkdir(parents=True, exist_ok=False)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
meshes = [obj for obj in bpy.context.scene.objects if obj.type == 'MESH']
unlit = '--unlit' in args
if unlit:
    for obj in meshes:
        material = bpy.data.materials.new('DiagnosticVertexColor')
        material.use_nodes = True
        nodes = material.node_tree.nodes
        nodes.clear()
        color = nodes.new('ShaderNodeVertexColor')
        color.layer_name = obj.data.color_attributes[0].name
        emission = nodes.new('ShaderNodeEmission')
        output = nodes.new('ShaderNodeOutputMaterial')
        material.node_tree.links.new(color.outputs['Color'], emission.inputs['Color'])
        material.node_tree.links.new(emission.outputs[0], output.inputs['Surface'])
        obj.data.materials.clear()
        obj.data.materials.append(material)
        for polygon in obj.data.polygons:
            polygon.material_index = 0
corners = [obj.matrix_world @ Vector(point) for obj in meshes for point in obj.bound_box]
lo = Vector([min(p[k] for p in corners) for k in range(3)])
hi = Vector([max(p[k] for p in corners) for k in range(3)])
center, size = (lo+hi)/2, max(hi-lo)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE_NEXT'
scene.render.resolution_x = scene.render.resolution_y = 768
scene.render.resolution_percentage = 100
scene.render.film_transparent = True
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.view_settings.view_transform = 'Standard'
world = bpy.data.worlds.new('ResearchWorld')
world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Strength'].default_value = .8
scene.world = world
camera_data = bpy.data.cameras.new('ResearchCamera')
camera_data.type = 'ORTHO'
camera_data.ortho_scale = size*1.15
camera = bpy.data.objects.new('ResearchCamera', camera_data)
scene.collection.objects.link(camera)
scene.camera = camera
photos = []
for name, axis in [('positive-x', (1, 0, 0)), ('negative-x', (-1, 0, 0)),
                   ('positive-y', (0, 1, 0)), ('negative-y', (0, -1, 0)),
                   ('positive-z', (0, 0, 1)), ('negative-z', (0, 0, -1))]:
    camera.location = center+Vector(axis)*size*3
    camera.rotation_euler = (center-camera.location).to_track_quat('-Z', 'Y').to_euler()
    light_data = bpy.data.lights.new('ViewLight', 'AREA')
    light_data.energy, light_data.size = 700, size*3
    light = bpy.data.objects.new('ViewLight', light_data)
    scene.collection.objects.link(light)
    light.location, light.rotation_euler = camera.location, camera.rotation_euler
    scene.render.filepath = str(out/(name+'.png'))
    bpy.ops.render.render(write_still=True)
    photos.append({'view': name, 'sha256': hashlib.sha256((out/(name+'.png')).read_bytes()).hexdigest()})
    bpy.data.objects.remove(light, do_unlink=True)
report = {'passed': len(meshes) > 0 and len({p['sha256'] for p in photos}) == 6,
          'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'target': 'Official Blender',
          'version': bpy.app.version_string, 'meshCount': len(meshes), 'views': photos,
          'boneCount': sum(len(obj.data.bones) for obj in scene.objects if obj.type == 'ARMATURE'),
          'morphTargets': sum(max(0, len(obj.data.shape_keys.key_blocks)-1) if obj.data.shape_keys else 0 for obj in meshes),
          'ourAppRequired': False, 'ourFrameServerRequired': False, 'physicalDevicesOpened': False,
          'diagnosticUnlitVertexColors': unlit, 'sourceModelMaterialModified': False,
          'orientation': 'Raw learned output, six axes; humanoid Y-up orientation not accepted',
          'productionQualityAccepted': False}
(out/'report.json').write_text(json.dumps(report, indent=2)+'\n', encoding='utf-8')
print('PHASE31_STATIC_MESH_CHECK_COMPLETE')

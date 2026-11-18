"""Pinned local TripoSR experiment. Source remains immutable; CPU extraction adapter is explicit."""
from pathlib import Path
import argparse
import hashlib
import json
import os
import socket
import sys
import time
import types
import zipfile

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT/'.local/research31'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--resolution', type=int, choices=[128, 256], default=128)
    args = parser.parse_args()
    source, out = Path(args.source), Path(args.output)
    out.mkdir(parents=True, exist_ok=False)
    stage, started = 'verify', time.perf_counter()
    try:
        receipt = json.loads((BASE/'triposr-receipt.json').read_text())
        for entry in receipt['downloads']:
            if hashlib.sha256((BASE/entry['file']).read_bytes()).hexdigest() != entry['sha256']:
                raise ValueError('E_3D_RESEARCH_HASH')
        with zipfile.ZipFile(BASE/'triposr-source.zip') as zipped:
            prefix = 'TripoSR-'+receipt['sourceCommit']+'/'
            for name in zipped.namelist():
                relative = name[len(prefix):]
                if relative.startswith('tsr/') and name.endswith('.py') and (BASE/'triposr-source'/relative).read_bytes() != zipped.read(name):
                    raise ValueError('E_3D_SOURCE_CHANGED')
        os.environ.update(HF_HUB_OFFLINE='1', HF_HUB_DISABLE_IMPLICIT_TOKEN='1', HF_HUB_DISABLE_TELEMETRY='1',
                          HF_HOME=str(BASE/'hf-cache'), TRANSFORMERS_OFFLINE='1')
        sys.path.insert(0, str(BASE/'triposr-source'))
        stage = 'imports'
        import numpy as np
        import torch
        import transformers
        import huggingface_hub
        from PIL import Image
        from omegaconf import OmegaConf
        from skimage.measure import marching_cubes

        def no_network(*_args, **_kwargs):
            raise ValueError('E_3D_INFERENCE_NETWORK')

        socket.socket.connect = no_network

        def local_config(repo_id, filename, **_kwargs):
            if repo_id != 'facebook/dino-vitb16' or filename != 'config.json':
                raise ValueError('E_3D_OFFLINE_CONFIG')
            return str(BASE/'triposr-weights/dino-config.json')

        huggingface_hub.hf_hub_download = local_config
        rembg = types.ModuleType('rembg')
        rembg.remove = no_network  # Input already has alpha; upstream background removal is not invoked.
        sys.modules['rembg'] = rembg
        mcubes = types.ModuleType('torchmcubes')

        def cpu_surface(field, level):
            vertices, faces, _, _ = marching_cubes(field.cpu().numpy(), level=level, gradient_direction='ascent')
            # Upstream helper reverses torchmcubes' ZYX coordinates back to XYZ.
            return torch.from_numpy(vertices[:, [2, 1, 0]].copy()), torch.from_numpy(faces.astype(np.int64).copy())

        mcubes.marching_cubes = cpu_surface
        sys.modules['torchmcubes'] = mcubes
        from tsr.system import TSR
        from tsr.utils import resize_foreground
        if not torch.cuda.is_available():
            raise ValueError('E_3D_CUDA_REQUIRED_FOR_MEASUREMENT')
        torch.manual_seed(31)
        torch.cuda.reset_peak_memory_stats()
        stage = 'load'
        cfg = OmegaConf.load(BASE/'triposr-weights/config.yaml')
        OmegaConf.resolve(cfg)
        model = TSR(cfg)
        state = torch.load(BASE/'triposr-weights/model.ckpt', map_location='cpu', weights_only=True)
        model.load_state_dict(state, strict=True)
        del state
        model = model.eval().to('cuda')
        model.renderer.set_chunk_size(8192)
        torch.cuda.synchronize()
        load_seconds = time.perf_counter()-started
        image = Image.open(source).convert('RGBA')
        if image.getextrema()[3][0] == 255:
            raise ValueError('E_3D_ALPHA_REQUIRED')
        rgba = np.asarray(resize_foreground(image, .85), dtype=np.float32)/255
        rgb = rgba[:, :, :3]*rgba[:, :, 3:4]+.5*(1-rgba[:, :, 3:4])
        image = Image.fromarray((rgb*255).astype(np.uint8))
        stage = 'inference'
        begin = time.perf_counter()
        with torch.inference_mode():
            codes = model([image], device='cuda')
        torch.cuda.synchronize()
        inference_seconds = time.perf_counter()-begin
        stage = 'extract'
        begin = time.perf_counter()
        meshes = model.extract_mesh(codes, True, resolution=args.resolution)
        torch.cuda.synchronize()
        extraction_seconds = time.perf_counter()-begin
        mesh = meshes[0]
        mesh.fix_normals(multibody=True)
        mesh.export(out/'model.glb')
        report = {'passed': len(mesh.vertices) > 1000 and len(mesh.faces) > 1000,
                  'candidate': 'TripoSR', 'sourceCommit': receipt['sourceCommit'], 'modelRevision': receipt['modelRevision'],
                  'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'sourceImagesUploaded': False,
                  'loadAndVerifySeconds': load_seconds, 'inferenceSeconds': inference_seconds, 'extractionSeconds': extraction_seconds,
                  'wallSeconds': time.perf_counter()-started, 'peakVRAMAllocatedBytes': torch.cuda.max_memory_allocated(),
                  'peakVRAMReservedBytes': torch.cuda.max_memory_reserved(), 'gpu': torch.cuda.get_device_name(),
                  'torchVersion': torch.__version__, 'transformersVersion': transformers.__version__,
                  'resolution': args.resolution, 'chunkSize': 8192, 'vertices': len(mesh.vertices), 'triangles': len(mesh.faces),
                  'bounds': mesh.bounds.tolist(), 'watertight': bool(mesh.is_watertight),
                  'rig': False, 'expressions': False, 'sideRearGroundTruth': False,
                  'adaptations': ['Transformers 4.44.2 for Python 3.12 wheels', 'scikit-image CPU marching cubes instead of torchmcubes CUDA extension',
                                  'RGBA input bypasses unused rembg dependency', 'local pinned DINO config; network connections disabled during inference'],
                  'upstreamSourceModified': False, 'researchOnly': True, 'productionQualityAccepted': False}
        (out/'report.json').write_text(json.dumps(report, indent=2)+'\n', encoding='utf-8')
        print('Local learned reconstruction experiment completed; not an animated avatar')
    except Exception as error:
        code = str(error) if str(error).startswith('E_3D_') and len(str(error)) < 80 else 'E_3D_LEARNED_'+stage.upper()
        (out/'failure.json').write_text(json.dumps({'passed': False, 'stage': stage, 'code': code, 'exceptionType': type(error).__name__,
                                                   'sourceImagesUploaded': False, 'researchOnly': True}, indent=2)+'\n', encoding='utf-8')
        print(code)
        raise SystemExit(1)


if __name__ == '__main__':
    main()

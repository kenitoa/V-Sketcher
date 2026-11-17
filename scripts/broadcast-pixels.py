"""Read avatar-only OBS PNGs; never capture desktop, camera or microphone."""
import hashlib
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image


def metrics(path):
    image = np.asarray(Image.open(path).convert('RGBA'))
    alpha = image[:, :, 3]
    return {'width': int(image.shape[1]), 'height': int(image.shape[0]), 'visiblePixels': int((alpha > 0).sum()), 'transparentPixels': int((alpha == 0).sum()), 'partialAlphaPixels': int(((alpha > 0) & (alpha < 255)).sum()), 'pixelSha256': hashlib.sha256(image.tobytes()).hexdigest()}


def composite(source, actual, level):
    avatar = np.asarray(Image.open(source).convert('RGBA'), dtype=np.float32)
    observed = np.asarray(Image.open(actual).convert('RGBA'), dtype=np.float32)
    alpha = avatar[:, :, 3:4] / 255
    # OBS source PNG RGB is its linear premultiplied texture encoded as sRGB.
    # Compare the real OBS scene with source-over in that space, not straight PNG alpha.
    def linear(value):
        value = np.asarray(value) / 255
        return np.where(value <= .04045, value/12.92, ((value+.055)/1.055)**2.4)
    combined = np.clip(linear(avatar[:, :, :3]) + linear(level) * (1-alpha), 0, 1)
    expected = np.rint(255*np.where(combined <= .0031308, combined*12.92, 1.055*combined**(1/2.4)-.055))
    error = np.max(np.abs(expected-observed[:, :, :3]), axis=2)
    empty = avatar[:, :, 3] == 0
    return {'comparison': 'linear-premultiplied-source-over-sRGB', 'meanRGBError': float(error.mean()), 'p99RGBError': float(np.percentile(error, 99)), 'backgroundPixelsCorrect': bool(np.all(observed[:, :, :3][empty] == level)), 'fractionWithin2': float((error <= 2).mean()), 'passed': bool(np.all(observed[:, :, :3][empty] == level) and (error <= 2).mean() >= .99)}


if __name__ == '__main__':
    result = composite(sys.argv[2], sys.argv[3], int(sys.argv[4])) if sys.argv[1] == 'composite' else metrics(Path(sys.argv[1]))
    print(json.dumps(result))

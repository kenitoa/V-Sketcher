"""Inspect avatar-only OBS PNG bytes; never receives camera frames or user audio."""

import io
import json
import sys

from PIL import Image

data = sys.stdin.buffer.read(16 * 1024 * 1024 + 1)
if len(data) > 16 * 1024 * 1024:
    raise SystemExit('E_OBS_PNG_LIMIT')
image = Image.open(io.BytesIO(data)).convert('RGBA')
alpha = image.getchannel('A')
histogram = alpha.histogram()
total = image.width * image.height
visible = total - histogram[0]
transparent = histogram[0]
bounds = alpha.getbbox()
print(
    json.dumps(
        {
            'passed': bool(bounds and visible > 16384 and transparent > total * 0.2),
            'visiblePixels': visible,
            'transparentPixels': transparent,
            'bounds': bounds,
            'dimensions': list(image.size),
            'scope': 'nonempty avatar and transparent background, not final art quality',
        }
    )
)

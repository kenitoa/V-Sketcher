/** Keep only the alpha needed for picking, rather than retaining decoded RGBA images. */
export function copyAlphaRows(
  rgba: Uint8ClampedArray | Uint8Array,
  plane: Uint8Array,
  width: number,
  startRow: number,
): void {
  if (
    !Number.isInteger(width) ||
    width < 1 ||
    !Number.isInteger(startRow) ||
    startRow < 0 ||
    rgba.length % (width * 4) !== 0 ||
    startRow * width + rgba.length / 4 > plane.length
  ) {
    throw new Error('E_ALPHA_ROWS');
  }
  const offset = startRow * width;
  for (let index = 0; index < rgba.length / 4; index++)
    plane[offset + index] = rgba[index * 4 + 3]!;
}

export function alphaAt(
  plane: Uint8Array,
  width: number,
  height: number,
  u: number,
  v: number,
): number {
  const x = Math.floor(u * width),
    y = Math.floor(v * height);
  if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || y < 0 || x >= width || y >= height)
    return 0;
  return plane[y * width + x] ?? 0;
}

export function textureAlpha(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  width: number,
  height: number,
): Uint8Array {
  if (!width || !height) throw new Error('E_ALPHA_IMAGE');
  const plane = new Uint8Array(width * height);
  const rows = Math.min(height, Math.max(1, Math.floor((1024 * 1024) / (width * 4))));
  const rgba = new Uint8Array(width * rows * 4);
  const previous = gl.getParameter(gl.READ_FRAMEBUFFER_BINDING) as WebGLFramebuffer | null;
  const framebuffer = gl.createFramebuffer();
  if (!framebuffer) throw new Error('E_ALPHA_FRAMEBUFFER');
  try {
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.READ_FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
      throw new Error('E_ALPHA_FRAMEBUFFER');
    for (let row = 0; row < height; row += rows) {
      const count = Math.min(rows, height - row);
      gl.readPixels(0, row, width, count, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
      copyAlphaRows(rgba.subarray(0, width * count * 4), plane, width, row);
    }
    return plane;
  } finally {
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, previous);
    gl.deleteFramebuffer(framebuffer);
  }
}

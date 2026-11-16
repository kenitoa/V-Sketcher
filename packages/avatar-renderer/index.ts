import { NEUTRAL, parameters, validateScene, type PreviewScene, type Parameters } from '../scene-core';

const vertex = `#version 300 es
in vec2 position; in vec2 uv; out vec2 texCoord;
uniform vec2 canvasSize; uniform vec2 fit; uniform float angle; uniform float shift;
void main(){vec2 p=position-canvasSize*.5; float c=cos(angle),s=sin(angle);p=mat2(c,-s,s,c)*p;p.x+=shift;
gl_Position=vec4(p/canvasSize*vec2(2.,-2.)*fit,0.,1.);texCoord=uv;}`;
const fragment = `#version 300 es
precision highp float;in vec2 texCoord;uniform sampler2D artwork;uniform float opacity;out vec4 color;
void main(){color=texture(artwork,texCoord)*opacity;}`;
interface Texture { texture: WebGLTexture; width: number; height: number; }
export class AvatarRenderer {
  readonly gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private textures = new Map<string, Texture>();
  private buffer: WebGLBuffer;
  private frameCount = 0;
  private current: Parameters = { ...NEUTRAL };
  constructor(private canvas: HTMLCanvasElement, private scene: PreviewScene) {
    validateScene(scene);
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!gl) throw new Error('E_WEBGL_UNAVAILABLE'); this.gl = gl;
    const compile = (type: number, source: string): WebGLShader => {
      const shader = gl.createShader(type); if (!shader) throw new Error('E_SHADER_CREATE');
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('E_SHADER_COMPILE'); return shader;
    };
    const program = gl.createProgram(); if (!program) throw new Error('E_SHADER_CREATE');
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('E_SHADER_LINK'); this.program = program;
    const buffer = gl.createBuffer(); if (!buffer) throw new Error('E_RENDER_BUFFER'); this.buffer = buffer;
    gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    for (const [name, offset] of [['position', 0], ['uv', 8]] as const) {
      const location = gl.getAttribLocation(program, name); gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 16, offset);
    }
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  }
  async load(base: string): Promise<void> {
    for (const path of new Set(this.scene.layers.flatMap(layer => Object.values(layer.states)))) {
      const image = new Image(); image.src = new URL(path, base).href; await image.decode();
      const texture = this.gl.createTexture(); if (!texture) throw new Error('E_TEXTURE_CREATE');
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
      this.textures.set(path, { texture, width: image.naturalWidth, height: image.naturalHeight });
    }
  }
  draw(input: Partial<Parameters> = NEUTRAL): void {
    this.current = parameters(input); const gl = this.gl; const [width, height] = this.scene.canvas;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.useProgram(this.program);
    const scale = Math.min(this.canvas.width / width, this.canvas.height / height);
    gl.uniform2f(gl.getUniformLocation(this.program, 'canvasSize'), width, height);
    gl.uniform2f(gl.getUniformLocation(this.program, 'fit'), scale * width / this.canvas.width, scale * height / this.canvas.height);
    gl.uniform1f(gl.getUniformLocation(this.program, 'angle'), this.current.head_roll * Math.PI / 180 * 3);
    gl.uniform1f(gl.getUniformLocation(this.program, 'shift'), this.current.head_yaw * width * .012);
    for (const layer of [...this.scene.layers].sort((a, b) => a.z - b.z || a.id.localeCompare(b.id))) {
      let paths: [string, number][];
      if (layer.bind && layer.states.open && layer.states.closed) {
        const t = layer.bind.startsWith('eye') ? Number(this.current[layer.bind] > .55) : this.current[layer.bind];
        paths = [[layer.states.closed, 1 - t], [layer.states.open, t]];
      } else paths = [[Object.values(layer.states)[0]!, 1]];
      for (const [path, opacity] of paths) {
        if (opacity <= 0) continue; const tex = this.textures.get(path); if (!tex) throw new Error('E_TEXTURE_MISSING');
        const [x, y] = layer.origin; const x1 = x + tex.width; const y1 = y + tex.height;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x,y,0,0,x1,y,1,0,x1,y1,1,1,x,y,0,0,x1,y1,1,1,x,y1,0,1]), gl.DYNAMIC_DRAW);
        gl.bindTexture(gl.TEXTURE_2D, tex.texture); gl.uniform1f(gl.getUniformLocation(this.program, 'opacity'), opacity * layer.opacity); gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    }
    this.frameCount++;
  }
  report(): Record<string, unknown> {
    this.draw(this.current); this.gl.finish();
    const pixels = new Uint8Array(this.canvas.width * this.canvas.height * 4); this.gl.readPixels(0, 0, this.canvas.width, this.canvas.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);
    let visible = 0; let transparent = 0; for (let i = 3; i < pixels.length; i += 4) { if (pixels[i]! > 0) visible++; else transparent++; }
    return { webgl2: true, version: this.gl.getParameter(this.gl.VERSION), renderer: this.gl.getParameter(this.gl.RENDERER),
      textureCount: this.textures.size, layers: this.scene.layers.length, submittedFrames: this.frameCount,
      visiblePixels: visible, transparentPixels: transparent, glError: this.gl.getError(),
      scope: 'Static/limited planar premium preview; not complete character rigging, live tracking or performance gate' };
  }
  dispose(): void { for (const value of this.textures.values()) this.gl.deleteTexture(value.texture); this.gl.deleteBuffer(this.buffer); this.gl.deleteProgram(this.program); }
}

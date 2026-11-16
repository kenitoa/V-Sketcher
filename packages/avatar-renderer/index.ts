import { NEUTRAL,parameters,validateScene,type PreviewScene,type Parameters,type PreviewLayer } from '../scene-core';
import { transform,inverse } from '../coordinates';
import { activeTextures } from '../editor-view';
import { deformPoint,dynamicMatrix,barycentric } from '../motion/geometry';
const vertex = `#version 300 es
in vec2 position;in vec2 uv;in float weight;in vec2 minimumDelta;in vec2 maximumDelta;out vec2 texCoord;
uniform vec2 canvasSize;uniform vec2 fit;uniform vec2 pivot;uniform float yaw;uniform float roll;uniform float smoothCurve;uniform mat3 dynamic;
void main(){vec2 p=(dynamic*vec3(position,1.)).xy;float angle=roll*weight;float c=cos(angle),s=sin(angle);p-=pivot;p=mat2(c,s,-s,c)*p+pivot;
float t=abs(yaw);t=mix(t,t*t*(3.-2.*t),smoothCurve);p+=mix(maximumDelta,minimumDelta,step(yaw,-.0000001))*t;
gl_Position=vec4((p-canvasSize*.5)/canvasSize*vec2(2.,-2.)*fit,0.,1.);texCoord=uv;}`;
const fragment = `#version 300 es
precision highp float;in vec2 texCoord;uniform sampler2D artwork;uniform float opacity;uniform vec4 crop;uniform vec4 tint;out vec4 color;
vec3 hsv(vec3 c){float hi=max(c.r,max(c.g,c.b)),lo=min(c.r,min(c.g,c.b)),d=hi-lo,h=0.;if(d>.00001){if(hi==c.r)h=(c.g-c.b)/d;else if(hi==c.g)h=2.+(c.b-c.r)/d;else h=4.+(c.r-c.g)/d;}return vec3(fract(h/6.+1.),hi>.00001?d/hi:0.,hi);}
vec3 rgb(vec3 c){vec3 p=abs(fract(vec3(c.x)+vec3(0.,2./3.,1./3.))*6.-3.);return c.z*mix(vec3(1.),clamp(p-1.,0.,1.),c.y);}
void main(){if(texCoord.x<crop.x||texCoord.y<crop.y||texCoord.x>=crop.z||texCoord.y>=crop.w)discard;vec4 c=texture(artwork,texCoord);if(c.a>.00001&&abs(tint.x)>.00001){vec3 v=hsv(c.rgb/c.a);bool inside=tint.y<=tint.z?(v.x>=tint.y&&v.x<=tint.z):(v.x>=tint.y||v.x<=tint.z);if(inside&&v.y>=tint.w){v.x=fract(v.x+tint.x/360.+1.);c.rgb=rgb(v)*c.a;}}color=c*opacity;}`;
interface Texture { texture:WebGLTexture;width:number;height:number;image:HTMLImageElement; }
interface Batch { buffer:WebGLBuffer;data:Float32Array;count:number;crop:[number,number,number,number]; }
export class AvatarRenderer {
  readonly gl:WebGL2RenderingContext; private program:WebGLProgram; private textures = new Map<string,Texture>(); private batches = new Map<string,Batch>();
  private frameCount = 0; private current:Parameters = { ...NEUTRAL }; private disposed = false; private uploads = 0;
  constructor(private canvas:HTMLCanvasElement,private scene:PreviewScene) {
    validateScene(scene); const gl = canvas.getContext('webgl2',{ alpha:true,premultipliedAlpha:true,antialias:true }); if (!gl) throw new Error('E_WEBGL_UNAVAILABLE'); this.gl = gl;
    const compile = (type:number,source:string):WebGLShader => { const shader = gl.createShader(type); if (!shader) throw new Error('E_SHADER_CREATE'); gl.shaderSource(shader,source); gl.compileShader(shader); if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error('E_SHADER_COMPILE'); return shader; };
    const program = gl.createProgram(); if (!program) throw new Error('E_SHADER_CREATE'); const vs = compile(gl.VERTEX_SHADER,vertex); const fs = compile(gl.FRAGMENT_SHADER,fragment); gl.attachShader(program,vs); gl.attachShader(program,fs); gl.linkProgram(program); gl.deleteShader(vs); gl.deleteShader(fs); if (!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error('E_SHADER_LINK'); this.program = program;
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
  }
  async load(base:string):Promise<void> {
    const gl = this.gl;
    for (const path of new Set(this.scene.layers.flatMap(l => Object.values(l.states)))) {
      const same=[...this.textures.entries()].find(([key])=>key.split('?')[0]===path.split('?')[0])?.[1];if(same){this.textures.set(path,same);continue;}
      const image = new Image(); image.src = new URL(path,base).href; await image.decode(); if (this.disposed) return;
      const texture = gl.createTexture(); if (!texture) throw new Error('E_TEXTURE_CREATE'); gl.bindTexture(gl.TEXTURE_2D,texture);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
      this.textures.set(path,{ texture,width:image.naturalWidth,height:image.naturalHeight,image });
    }
    for (const layer of this.scene.layers) for (const path of new Set(Object.values(layer.states))) {
      const tex = this.textures.get(path)!; const geometry = layer.geometry?.[path]; const crop = geometry?.crop ?? { x:0,y:0,width:tex.width,height:tex.height }; const matrix = geometry?.matrix ?? [1,0,0,1,...layer.origin] as [number,number,number,number,number,number];
      if (crop.x+crop.width>tex.width || crop.y+crop.height>tex.height) throw new Error('E_ASSET_GEOMETRY');
      const mesh = layer.mesh; const back = inverse(matrix); const corners = [[crop.x,crop.y],[crop.x+crop.width,crop.y],[crop.x+crop.width,crop.y+crop.height],[crop.x,crop.y+crop.height]].map(([x,y]) => { const p = transform(matrix,{ x:x!,y:y! }); return { position:[p.x,p.y],weight:0,minimum:[0,0],maximum:[0,0] }; });
      const source = mesh?.vertices ?? corners; const triangles = mesh?.triangles ?? [0,1,2,0,2,3]; const data = new Float32Array(triangles.flatMap(i => { const v = source[i]!; const uv = transform(back,{ x:v.position[0]!,y:v.position[1]! }); return [v.position[0]!,v.position[1]!,uv.x/tex.width,uv.y/tex.height,v.weight,...v.minimum,...v.maximum]; }));
      if ([...data].some(v => !Number.isFinite(v))) throw new Error('E_SCENE_MESH');
      const buffer = gl.createBuffer(); if (!buffer) throw new Error('E_RENDER_BUFFER'); gl.bindBuffer(gl.ARRAY_BUFFER,buffer); gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW); this.uploads++;
      this.batches.set(layer.id+'|'+path,{ buffer,data,count:triangles.length,crop:[crop.x/tex.width,crop.y/tex.height,(crop.x+crop.width)/tex.width,(crop.y+crop.height)/tex.height] });
    }
  }
  draw(input:Partial<Parameters> = {}):void {
    this.current = parameters({ ...(this.scene.defaults ?? NEUTRAL),...input }); const gl = this.gl; const [width,height] = this.scene.canvas; gl.viewport(0,0,this.canvas.width,this.canvas.height); gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); gl.useProgram(this.program);
    const fit = Math.min(this.canvas.width/width,this.canvas.height/height); gl.uniform2f(gl.getUniformLocation(this.program,'canvasSize'),width,height); gl.uniform2f(gl.getUniformLocation(this.program,'fit'),fit*width/this.canvas.width,fit*height/this.canvas.height);
    for (const layer of this.ordered()) {
      const color=layer.color;gl.uniform4f(gl.getUniformLocation(this.program,'tint'),color?.hueDegrees??0,color?.minimumHue??0,color?.maximumHue??1,color?.minimumSaturation??1);
      const m = layer.mesh; const dynamic = dynamicMatrix(layer,this.current); gl.uniformMatrix3fv(gl.getUniformLocation(this.program,'dynamic'),false,new Float32Array([dynamic[0],dynamic[1],0,dynamic[2],dynamic[3],0,dynamic[4],dynamic[5],1]));
      gl.uniform2f(gl.getUniformLocation(this.program,'pivot'),m?.pivot[0] ?? 0,m?.pivot[1] ?? 0); gl.uniform1f(gl.getUniformLocation(this.program,'yaw'),m?.yaw ? this.current.head_yaw : 0); gl.uniform1f(gl.getUniformLocation(this.program,'roll'),m?.roll ? this.current.head_roll*m.maxRollDegrees*Math.PI/180 : 0); gl.uniform1f(gl.getUniformLocation(this.program,'smoothCurve'),m?.curve === 'smoothstep' ? 1 : 0);
      for (const [path,opacity] of activeTextures(layer,this.current)) { if (opacity<=0) continue; const tex = this.textures.get(path); const batch = this.batches.get(layer.id+'|'+path); if (!tex || !batch) throw new Error('E_TEXTURE_MISSING');
        gl.bindBuffer(gl.ARRAY_BUFFER,batch.buffer); for (const [name,size,offset] of [['position',2,0],['uv',2,8],['weight',1,16],['minimumDelta',2,20],['maximumDelta',2,28]] as const) { const at = gl.getAttribLocation(this.program,name); gl.enableVertexAttribArray(at); gl.vertexAttribPointer(at,size,gl.FLOAT,false,36,offset); }
        gl.uniform4fv(gl.getUniformLocation(this.program,'crop'),batch.crop); gl.bindTexture(gl.TEXTURE_2D,tex.texture); gl.uniform1f(gl.getUniformLocation(this.program,'opacity'),opacity*layer.opacity); gl.drawArrays(gl.TRIANGLES,0,batch.count);
      }
    } this.frameCount++;
  }
  private ordered():PreviewLayer[] { return [...this.scene.layers].sort((a,b) => a.z-b.z || (a.id<b.id ? -1 : a.id>b.id ? 1 : 0)); }
  private points(layer:PreviewLayer,batch:Batch):{ x:number;y:number;u:number;v:number }[] { const d = batch.data; const points = []; for (let i=0;i<d.length;i+=9) { const p = deformPoint(layer,{ x:d[i]!,y:d[i+1]! },d[i+4]!,{ x:d[i+5]!,y:d[i+6]! },{ x:d[i+7]!,y:d[i+8]! },this.current); points.push({ ...p,u:d[i+2]!,v:d[i+3]! }); } return points; }
  selectionBounds(id:string):{ x:number;y:number;width:number;height:number } | null { const layer = this.scene.layers.find(l => l.id===id); if (!layer) return null; const batch = this.batches.get(id+'|'+Object.values(layer.states)[0]); if (!batch) return null; const points = this.points(layer,batch); const x = Math.min(...points.map(p => p.x)); const y = Math.min(...points.map(p => p.y)); return { x,y,width:Math.max(...points.map(p => p.x))-x,height:Math.max(...points.map(p => p.y))-y }; }
  hitTest(point:{ x:number;y:number }):string | null {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1; const ctx = canvas.getContext('2d',{ willReadFrequently:true }); if (!ctx) return null;
    for (const layer of this.ordered().reverse()) for (const [path,weight] of activeTextures(layer,this.current)) { if (weight*layer.opacity<=.01) continue; const tex = this.textures.get(path); const batch = this.batches.get(layer.id+'|'+path); if (!tex || !batch) continue; const vertices = this.points(layer,batch);
      for (let i=0;i<vertices.length;i+=3) { const a = vertices[i]!; const b = vertices[i+1]!; const c = vertices[i+2]!; const k = barycentric(point,a,b,c); if (!k) continue; const u = k[0]*a.u+k[1]*b.u+k[2]*c.u; const v = k[0]*a.v+k[1]*b.v+k[2]*c.v; if (u<batch.crop[0] || u>=batch.crop[2] || v<batch.crop[1] || v>=batch.crop[3]) continue;
        ctx.clearRect(0,0,1,1); ctx.drawImage(tex.image,Math.floor(u*tex.width),Math.floor(v*tex.height),1,1,0,0,1,1); if (ctx.getImageData(0,0,1,1).data[3]!*weight*layer.opacity>8) return layer.id;
      }
    } return null;
  }
  report():Record<string,unknown> { this.draw(this.current); const gl = this.gl; gl.finish(); const pixels = new Uint8Array(this.canvas.width*this.canvas.height*4); gl.readPixels(0,0,this.canvas.width,this.canvas.height,gl.RGBA,gl.UNSIGNED_BYTE,pixels); let visible = 0; let digest = 2166136261; for (let i=0;i<pixels.length;i++) { digest = Math.imul(digest^pixels[i]!,16777619); if (i%4===3 && pixels[i]!>0) visible++; }
    return { webgl2:true,version:gl.getParameter(gl.VERSION),renderer:gl.getParameter(gl.RENDERER),textureCount:new Set(this.textures.values()).size,layers:this.scene.layers.length,submittedFrames:this.frameCount,projectModel:this.scene.model ?? null,visiblePixels:visible,transparentPixels:this.canvas.width*this.canvas.height-visible,glError:gl.getError(),pixelHash:(digest>>>0).toString(16),meshLayers:this.scene.layers.filter(l => l.mesh).length,staticBufferUploads:this.uploads,scope:'Shared GPU triangle deformation and authored state blend; not automatic rigging, live tracking or M0 performance approval' };
  }
  dispose():void { if (this.disposed) return; this.disposed = true; for (const tex of new Set(this.textures.values())) this.gl.deleteTexture(tex.texture); for (const batch of this.batches.values()) this.gl.deleteBuffer(batch.buffer); this.textures.clear(); this.batches.clear(); this.gl.deleteProgram(this.program); }
}

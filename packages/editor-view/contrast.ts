export type RGB = [number,number,number];
export function contrastRatio(a:RGB,b:RGB):number {
  const luminance = (rgb:RGB):number => rgb.map(v => { if (!Number.isFinite(v) || v<0 || v>255) throw new Error('E_COLOR_VALUE'); const c = v/255; return c <= .04045 ? c/12.92 : ((c+.055)/1.055)**2.4; }).reduce((sum,c,i) => sum+c*[.2126,.7152,.0722][i]!,0);
  const x = luminance(a); const y = luminance(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}

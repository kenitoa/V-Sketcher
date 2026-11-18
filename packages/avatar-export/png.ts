import {deflateSync,inflateSync} from 'node:zlib';
export interface Pixels {width:number;height:number;rgba:Buffer;}
export function crc32(bytes:Buffer):number {
 let crc=0xffffffff;for(const v of bytes){crc^=v;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;
}
function chunk(name:string,data:Buffer){const type=Buffer.from(name),head=Buffer.alloc(4),tail=Buffer.alloc(4);head.writeUInt32BE(data.length);tail.writeUInt32BE(crc32(Buffer.concat([type,data])));return Buffer.concat([head,type,data,tail]);}
export function encodePNG(p:Pixels):Buffer {
 if(p.rgba.length!==p.width*p.height*4)throw new Error('E_AVATAR_TEXTURE');
 const h=Buffer.alloc(13);h.writeUInt32BE(p.width);h.writeUInt32BE(p.height,4);h[8]=8;h[9]=6;
 const rows=Buffer.alloc((p.width*4+1)*p.height);for(let y=0;y<p.height;y++)p.rgba.copy(rows,y*(p.width*4+1)+1,y*p.width*4,(y+1)*p.width*4);
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',h),chunk('IDAT',deflateSync(rows)),chunk('IEND',Buffer.alloc(0))]);
}
/** Strict bounded RGB/RGBA PNG decoder. JPEG is canonicalized by the host first. */
export function decodePNG(bytes:Buffer):Pixels {
 if(!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw new Error('E_AVATAR_TEXTURE');
 let offset=8,width=0,height=0,channels=0,ended=false,header=false;const parts:Buffer[]=[];
 while(offset+12<=bytes.length){const length=bytes.readUInt32BE(offset),name=bytes.toString('ascii',offset+4,offset+8);if(length>67108864||offset+length+12>bytes.length)throw new Error('E_AVATAR_TEXTURE');const data=bytes.subarray(offset+8,offset+8+length);if(crc32(bytes.subarray(offset+4,offset+8+length))!==bytes.readUInt32BE(offset+8+length))throw new Error('E_AVATAR_TEXTURE');
  if(name==='IHDR'){if(header||offset!==8||length!==13)throw new Error('E_AVATAR_TEXTURE');header=true;width=data.readUInt32BE(0);height=data.readUInt32BE(4);channels=data[9]===6?4:data[9]===2?3:0;if(!width||!height||width>4096||height>4096||data[8]!==8||!channels||data[10]||data[11]||data[12])throw new Error('E_AVATAR_TEXTURE');}
  else if(name==='IDAT'){if(!header)throw new Error('E_AVATAR_TEXTURE');parts.push(data);}else if(name==='IEND'){ended=true;offset+=length+12;break;}else if(name[0]===name[0]?.toUpperCase())throw new Error('E_AVATAR_TEXTURE');offset+=length+12;
 }
 if(!ended||offset!==bytes.length||!parts.length)throw new Error('E_AVATAR_TEXTURE');const stride=width*channels,raw=inflateSync(Buffer.concat(parts),{maxOutputLength:(stride+1)*height});if(raw.length!==(stride+1)*height)throw new Error('E_AVATAR_TEXTURE');const scan=Buffer.alloc(stride*height),rgba=Buffer.alloc(width*height*4);
 for(let y=0;y<height;y++){const kind=raw[y*(stride+1)]!;if(kind>4)throw new Error('E_AVATAR_TEXTURE');for(let x=0;x<stride;x++){const a=x>=channels?scan[y*stride+x-channels]!:0,b=y?scan[(y-1)*stride+x]!:0,c=y&&x>=channels?scan[(y-1)*stride+x-channels]!:0,p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);scan[y*stride+x]=(raw[y*(stride+1)+x+1]!+(kind===0?0:kind===1?a:kind===2?b:kind===3?Math.floor((a+b)/2):pa<=pb&&pa<=pc?a:pb<=pc?b:c))&255;}}
 for(let i=0;i<width*height;i++){rgba[i*4]=scan[i*channels]!;rgba[i*4+1]=scan[i*channels+1]!;rgba[i*4+2]=scan[i*channels+2]!;rgba[i*4+3]=channels===4?scan[i*channels+3]!:255;}return {width,height,rgba};
}

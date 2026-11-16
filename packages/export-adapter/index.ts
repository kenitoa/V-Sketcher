/** Read-only INP container inspection, not the later product scene exporter. */
export function inspectInp(data: Buffer): { textures: number; parameters: string[]; nodeIds: number[] } {
  let offset = 0;
  const take = (length: number): Buffer => { if (!Number.isSafeInteger(length) || length < 0 || offset + length > data.length) throw new Error('E_INP_TRUNCATED'); const result = data.subarray(offset, offset + length); offset += length; return result; };
  const number = (): number => take(4).readUInt32BE();
  if (!take(8).equals(Buffer.from('TRNSRTS\0'))) throw new Error('E_INP_HEADER');
  const length = number(); if (length > 4 * 1024 * 1024) throw new Error('E_INP_LIMIT');
  const document = JSON.parse(take(length).toString('utf8')) as { nodes: { uuid: number; textures?: number[]; children?: unknown[] }; param: { name: string; bindings: { node: number }[] }[] };
  if (!take(8).equals(Buffer.from('TEX_SECT'))) throw new Error('E_INP_TEXTURES');
  const count = number(); if (count > 1024) throw new Error('E_INP_LIMIT');
  for (let i = 0; i < count; i++) { const size = number(); if (size > 128 * 1024 * 1024) throw new Error('E_INP_LIMIT'); const type = take(1)[0]; const image = take(size); if (type !== 0 || !image.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) throw new Error('E_INP_ENCODING'); }
  const ids = new Set<number>();
  const visit = (node: typeof document.nodes): void => {
    if (!Number.isSafeInteger(node.uuid) || node.uuid < 0 || ids.has(node.uuid)) throw new Error('E_INP_NODE'); ids.add(node.uuid);
    if (node.textures?.some(v => v !== 0xffffffff && (!Number.isInteger(v) || v < 0 || v >= count))) throw new Error('E_INP_REFERENCE');
    for (const child of node.children ?? []) visit(child as typeof document.nodes);
  }; visit(document.nodes);
  const names = new Set<string>();
  for (const parameter of document.param) { if (names.has(parameter.name) || parameter.bindings.some(v => !ids.has(v.node))) throw new Error('E_INP_BINDING'); names.add(parameter.name); }
  if (offset < data.length) {
    if (!take(8).equals(Buffer.from('EXT_SECT'))) throw new Error('E_INP_EXTENSION');
    const count = number(); if (count > 128) throw new Error('E_INP_LIMIT');
    for (let i = 0; i < count; i++) { take(number()); take(number()); }
  }
  if (offset !== data.length) throw new Error('E_INP_TRAILING');
  return { textures: count, parameters: [...names], nodeIds: [...ids] };
}

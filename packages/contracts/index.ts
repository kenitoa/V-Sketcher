import Ajv from 'ajv';

export const PROTOCOL_VERSION = 1;
export const MAX_MESSAGE_BYTES = 64 * 1024;
export type Operation = 'ping' | 'validate-runtime' | 'shutdown';
export interface RequestEnvelope {
  protocol: 1; requestId: string; projectId: string; revision: number; generation: number;
  operation: Operation;
}
export interface ResponseEnvelope {
  protocol: 1; requestId: string; projectId: string; revision: number; generation: number;
  ok: boolean; result?: Record<string, unknown>; error?: { code: string };
}
const identity = {
  protocol: { const: 1 }, requestId: { type: 'string', pattern: '^[A-Za-z0-9-]{1,64}$' },
  projectId: { type: 'string', pattern: '^[A-Za-z0-9-]{1,64}$' },
  revision: { type: 'integer', minimum: 0 }, generation: { type: 'integer', minimum: 0 }
};
const ajv = new Ajv({ allErrors: false, strict: true });
const requestValidator = ajv.compile<RequestEnvelope>({ type: 'object', additionalProperties: false,
  properties: { ...identity, operation: { enum: ['ping', 'validate-runtime', 'shutdown'] } },
  required: [...Object.keys(identity), 'operation'] });
const responseValidator = ajv.compile<ResponseEnvelope>({ type: 'object', additionalProperties: false,
  properties: { ...identity, ok: { type: 'boolean' }, result: { type: 'object' },
    error: { type: 'object', additionalProperties: false, properties: { code: { type: 'string', pattern: '^E_[A-Z_]{1,48}$' } }, required: ['code'] } },
  required: [...Object.keys(identity), 'ok'],
  oneOf: [{ properties: { ok: { const: true }, result: { type: 'object' }, error: false }, required: ['result'] },
    { properties: { ok: { const: false }, error: { type: 'object' }, result: false }, required: ['error'] }] });

export function parseRequest(value: unknown): RequestEnvelope {
  if (!requestValidator(value)) throw new Error('E_PROTOCOL_REQUEST');
  return value;
}
export function parseResponse(line: string): ResponseEnvelope {
  if (Buffer.byteLength(line, 'utf8') > MAX_MESSAGE_BYTES) throw new Error('E_PROTOCOL_SIZE');
  let value: unknown;
  try { value = JSON.parse(line); } catch { throw new Error('E_PROTOCOL_JSON'); }
  if (!responseValidator(value)) throw new Error('E_PROTOCOL_RESPONSE');
  return value;
}
export function matches(request: RequestEnvelope, response: ResponseEnvelope): boolean {
  return ['requestId', 'projectId', 'revision', 'generation'].every(key =>
    request[key as keyof RequestEnvelope] === response[key as keyof ResponseEnvelope]);
}
export interface BuildProfile { channel: 'development' | 'test' | 'release'; version: string; protocol: 1; }
export interface StudioInfo { name: string; version: string; channel: BuildProfile['channel']; features: { creation: false; tracking: false; preview: true; projects:true }; }

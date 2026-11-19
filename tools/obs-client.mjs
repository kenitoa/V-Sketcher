import WebSocket from 'ws';
import { createHash } from 'node:crypto';
/** Official obs-websocket RPC1. Credentials and response text never enter logs. */
export class OBSClient {
  constructor(socket) {
    this.socket = socket;
    this.serial = 0;
    this.pending = new Map();
    socket.on('message', (raw) => {
      try {
        const m = JSON.parse(String(raw));
        if (m.op === 7) {
          const p = this.pending.get(m.d.requestId);
          if (p) {
            this.pending.delete(m.d.requestId);
            clearTimeout(p.timer);
            if (m.d.requestStatus.result) p.resolve(m.d.responseData ?? {});
            else p.reject(new Error('E_OBS_REQUEST_' + String(m.d.requestStatus.code)));
          }
        }
      } catch {
        /* ignore unrelated events */
      }
    });
    socket.on('error', () => {});
    socket.on('close', () => {
      for (const p of this.pending.values()) {
        clearTimeout(p.timer);
        p.reject(new Error('E_OBS_CLOSED'));
      }
      this.pending.clear();
    });
  }
  static async connect({ port, password }) {
    const socket = new WebSocket(`ws://127.0.0.1:${port}`, { origin: 'http://127.0.0.1' });
    const receive = () =>
      new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          socket.terminate();
          reject(new Error('E_OBS_TIMEOUT'));
        }, 10000);
        socket.once('message', (raw) => {
          clearTimeout(timer);
          resolve(JSON.parse(String(raw)));
        });
        socket.once('error', () => {
          clearTimeout(timer);
          reject(new Error('E_OBS_CONNECT'));
        });
      });
    const hello = await receive();
    if (hello.op !== 0) throw new Error('E_OBS_PROTOCOL');
    const d = { rpcVersion: 1, eventSubscriptions: 0 };
    if (hello.d.authentication) {
      const a = hello.d.authentication,
        sha = (v) => createHash('sha256').update(v).digest('base64');
      d.authentication = sha(sha(password + a.salt) + a.challenge);
    }
    const identified = receive();
    socket.send(JSON.stringify({ op: 1, d }));
    if ((await identified).op !== 2) throw new Error('E_OBS_IDENTIFY');
    return new OBSClient(socket);
  }
  request(requestType, requestData = {}) {
    const requestId = String(++this.serial);
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error('E_OBS_TIMEOUT'));
      }, 15000);
      this.pending.set(requestId, { resolve, reject, timer });
      this.socket.send(JSON.stringify({ op: 6, d: { requestId, requestType, requestData } }));
    });
  }
  async screenshot(sourceName) {
    const r = await this.request('GetSourceScreenshot', { sourceName, imageFormat: 'png' });
    if (!r.imageData?.startsWith('data:image/png;base64,')) throw new Error('E_OBS_IMAGE');
    return Buffer.from(r.imageData.split(',')[1], 'base64');
  }
  close() {
    this.socket.close();
  }
}

import { exportContentHash } from './identity';
import { CONVERTER_VERSION } from '../export-check/types';
import { basename } from 'node:path';
import { randomUUID } from 'node:crypto';
import type { CompatibilityService } from '../export-check/service';
import type { TargetOptions } from '../export-check/types';
import type { FileInput } from '../image-export/service';
import type { InputBasis } from '../execution/changes';
import { parameters, type Parameters } from '../scene-core';
import { convertAvatar, type ConvertedAvatar } from './converter';
import { nativePreview } from './preview';
import { parseINP, sha } from './inp';
import { targetHash, writeINP } from './atomic';
import type { AvatarTicket, AvatarReceipt } from './types';
export interface PrivateExportRecord {
  path: string;
  receipt: AvatarReceipt;
}
export interface AvatarHost {
  validateReceipt?: (basis: InputBasis, contentFingerprint: string) => boolean;
  running?: () => boolean;
  compatibility: CompatibilityService;
  validate: (basis: InputBasis) => boolean;
  canonicalize: (bytes: Buffer) => Buffer;
  choose: (name: string) => Promise<string | null>;
  locate: () => Promise<string | null>;
  records: () => Promise<PrivateExportRecord[]>;
  persist: (records: PrivateExportRecord[]) => Promise<void>;
  reveal: (file: string) => void;
  write?: typeof writeINP;
}
export class AvatarExportService {
  private preparingDone: Promise<void> | null = null;
  private writingDone: Promise<void> | null = null;
  private lastCommittedTicket: string | null = null;
  private historyQueue: Promise<void> = Promise.resolve();
  private generation = 0;
  private requestId: string | null = null;
  private controller: AbortController | null = null;
  private prepared: {
    ticket: AvatarTicket;
    avatar: ConvertedAvatar;
    input: FileInput;
    parsed: ReturnType<typeof parseINP>;
  } | null = null;
  private writing = false;
  private preparing = false;
  constructor(private host: AvatarHost) {}
  private current(r: AvatarReceipt): boolean {
    return this.host.validateReceipt
      ? this.host.validateReceipt(r.basis, r.contentFingerprint)
      : this.host.validate(r.basis);
  }
  private updateRecords<T>(update: (records: PrivateExportRecord[]) => Promise<T>): Promise<T> {
    const result = this.historyQueue.then(async () => {
      const records = await this.host.records();
      const value = await update(records);
      await this.host.persist(records);
      return value;
    });
    this.historyQueue = result.then(
      () => {},
      () => {},
    );
    return result;
  }
  async prepare(
    id: string,
    checkId: string,
    options: TargetOptions,
    demo: boolean,
  ): Promise<AvatarTicket> {
    if (this.writing || this.preparing) throw new Error('E_AVATAR_BUSY');
    if (this.host.running?.()) throw new Error('E_AVATAR_DEFER');
    if (!/^[a-f0-9-]{36}$/.test(id) || typeof demo !== 'boolean')
      throw new Error('E_AVATAR_REQUEST');
    this.close();
    this.preparing = true;
    const generation = this.generation,
      controller = new AbortController();
    this.controller = controller;
    this.requestId = id;
    let complete!: () => void;
    const done = new Promise<void>((r) => {
      complete = r;
    });
    this.preparingDone = done;
    try {
      const { input, check } = this.host.compatibility.pin(checkId, options),
        avatar = await convertAvatar(input, check, demo, this.host.canonicalize, controller.signal);
      if (generation !== this.generation || controller.signal.aborted)
        throw new Error('E_AVATAR_CANCELLED');
      const ticket: AvatarTicket = {
        id,
        basis: input.basis,
        sha256: sha(avatar.bytes),
        bytes: avatar.bytes.length,
        report: avatar.report,
      };
      this.prepared = { ticket, avatar, input, parsed: parseINP(avatar.bytes) };
      return structuredClone(ticket);
    } catch (e) {
      if (generation === this.generation) this.close();
      throw e;
    } finally {
      this.preparing = false;
      complete();
      if (this.preparingDone === done) this.preparingDone = null;
    }
  }
  preview(id: string, input: Parameters, expressionId: string | null) {
    const p = this.prepared;
    if (!p || p.ticket.id !== id) throw new Error('E_AVATAR_STALE');
    if (Object.keys(input).sort().join(',') !== 'eye_left,eye_right,head_roll,head_yaw,mouth')
      throw new Error('E_AVATAR_REQUEST');
    return nativePreview(
      p.parsed,
      p.input.project,
      parameters(input),
      expressionId,
      (i) => `assets/avatar-export/${id}/${i}.png`,
    );
  }
  resource(path: string): Buffer | null {
    const p = this.prepared;
    if (!p) return null;
    const match = new RegExp('^assets/avatar-export/' + p.ticket.id + '/([0-9]+)\\.png$').exec(
      path,
    );
    return match ? (p.parsed.textures[Number(match[1])] ?? null) : null;
  }
  async save(id: string, reviewedSha: string): Promise<AvatarReceipt | null> {
    const p = this.prepared;
    if (this.writing || this.preparing) throw new Error('E_AVATAR_BUSY');
    if (this.host.running?.()) throw new Error('E_AVATAR_DEFER');
    if (
      !p ||
      p.ticket.id !== id ||
      p.ticket.sha256 !== reviewedSha ||
      !this.host.validate(p.ticket.basis)
    )
      throw new Error('E_AVATAR_STALE');
    this.writing = true;
    let complete!: () => void;
    const done = new Promise<void>((r) => {
      complete = r;
    });
    this.writingDone = done;
    try {
      const path = await this.host.choose(
        'character-r' + p.ticket.basis.revision + '-' + p.ticket.sha256.slice(0, 8) + '.inp',
      );
      if (!path) return null;
      if (
        this.prepared !== p ||
        !this.host.validate(p.ticket.basis) ||
        this.controller?.signal.aborted
      )
        throw new Error('E_AVATAR_STALE');
      const expected = await targetHash(path);
      await (this.host.write ?? writeINP)(path, p.avatar.bytes, expected, this.controller!.signal);
      this.lastCommittedTicket = id;
      const receipt: AvatarReceipt = {
        contentFingerprint: exportContentHash(p.input.project),
        id: randomUUID(),
        name: basename(path),
        bytes: p.ticket.bytes,
        sha256: p.ticket.sha256,
        basis: structuredClone(p.ticket.basis),
        created: new Date().toISOString(),
        targetVersion: p.avatar.report.targetVersion,
        converterVersion: p.avatar.report.converterVersion,
        state: 'WRITTEN',
        newerEdits: !this.host.validate(p.ticket.basis),
        confirmation: null,
        fileState: 'PRESENT',
        current: this.host.validate(p.ticket.basis),
      };
      receipt.current = this.current(receipt);
      receipt.newerEdits = !receipt.current;
      try {
        await this.updateRecords(async (history) => {
          history.push({ path, receipt });
          if (history.length > 50) history.splice(0, history.length - 50);
        });
      } catch {
        /* The file is committed. Surface success and a distinct history warning. */ receipt.historyWarning =
          'E_AVATAR_HISTORY';
      }
      return receipt;
    } finally {
      this.writing = false;
      complete();
      if (this.writingDone === done) this.writingDone = null;
    }
  }
  async list(): Promise<AvatarReceipt[]> {
    await this.historyQueue;
    const records = await this.host.records(),
      result: AvatarReceipt[] = [];
    for (const r of records) {
      let actual: string | null = null;
      try {
        actual = await targetHash(r.path);
      } catch {
        /* private path/error never enters reply */
      }
      const receipt = structuredClone(r.receipt);
      receipt.fileState =
        actual === null ? 'MISSING' : actual === receipt.sha256 ? 'PRESENT' : 'CHANGED';
      receipt.current =
        receipt.fileState === 'PRESENT' &&
        receipt.converterVersion === CONVERTER_VERSION &&
        receipt.targetVersion === '0.8.7' &&
        this.current(receipt);
      receipt.newerEdits = !receipt.current;
      result.push(receipt);
    }
    return result.reverse();
  }
  async confirm(id: string, version: string): Promise<AvatarReceipt> {
    if (this.writing || this.preparing) throw new Error('E_AVATAR_BUSY');
    if (version !== '0.8.7') throw new Error('E_AVATAR_VERSION');
    return this.updateRecords(async (records) => {
      const r = records.find((v) => v.receipt.id === id);
      if (
        !r ||
        r.receipt.converterVersion !== CONVERTER_VERSION ||
        r.receipt.targetVersion !== version ||
        (await targetHash(r.path)) !== r.receipt.sha256 ||
        !this.current(r.receipt)
      )
        throw new Error('E_AVATAR_STALE');
      r.receipt.confirmation = {
        method: 'USER_CONFIRMED',
        targetVersion: version,
        sha256: r.receipt.sha256,
        at: new Date().toISOString(),
      };
      return structuredClone(r.receipt);
    });
  }
  async relocate(id: string): Promise<AvatarReceipt | null> {
    if (this.writing || this.preparing) throw new Error('E_AVATAR_BUSY');
    const path = await this.host.locate();
    if (!path) return null;
    return this.updateRecords(async (records) => {
      const r = records.find((v) => v.receipt.id === id);
      if (!r) throw new Error('E_AVATAR_STALE');
      if ((await targetHash(path)) !== r.receipt.sha256) throw new Error('E_AVATAR_CHANGED');
      r.path = path;
      r.receipt.name = basename(path);
      r.receipt.fileState = 'PRESENT';
      return structuredClone(r.receipt);
    });
  }

  async reveal(id: string) {
    const record = (await this.host.records()).find((r) => r.receipt.id === id);
    if (!record || (await targetHash(record.path)) !== record.receipt.sha256)
      throw new Error('E_AVATAR_CHANGED');
    this.host.reveal(record.path);
  }
  async cancel(id: string) {
    if (this.requestId !== id)
      return { cancelled: false, committed: this.lastCommittedTicket === id };
    const pending = [this.preparingDone, this.writingDone].filter(
      (v): v is Promise<void> => v !== null,
    );
    this.close();
    await Promise.all(pending);
    return {
      cancelled: this.lastCommittedTicket !== id,
      committed: this.lastCommittedTicket === id,
    };
  }
  close() {
    ++this.generation;
    this.controller?.abort();
    this.controller = null;
    this.requestId = null;
    this.prepared = null;
  }
  stats() {
    return {
      prepared: this.prepared !== null,
      preparing: this.preparing,
      writing: this.writing,
      resources: this.prepared?.parsed.textures.length ?? 0,
    };
  }
}

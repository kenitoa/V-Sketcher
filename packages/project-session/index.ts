import {DetailSession} from '../detail-editor/session';
import {assertSimpleSafe} from '../detail-editor/model';
import {SplitSession} from '../split-image/session';
import type {SplitProcessor} from '../split-image/types';
import {saveParts} from '../split-image/export';
import {CorrectionSession} from '../single-image/correction-session';
import {assertCatalog,startAssembly,selectItem,removeSlot,adjustPart,linkEyes,resetAdjustment,type Catalog} from '../parts-library';
import {StructureSession} from '../single-image/session';
import { InputSession } from '../image-input/session';
import type { InputProcessor } from '../image-input/types';
import { readFile, mkdir } from 'node:fs/promises';
import { join, basename, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { Workflow } from '../workflow';
import { createProject, assertProject, type Project, type SourceType } from '../project-model';
import { projectToPreview } from '../project-model/preview';
import { authorRig } from '../motion';
import { originalScene } from '../editor-view';
import type { PreviewScene } from '../scene-core';
import { ResourceCache } from '../project-storage/cache';
import { ProjectCatalog, type RecoveryRecord } from '../project-storage/catalog';
import { readBundle, encodeBundle, decodeBundle, sha256, type LoadedBundle } from '../project-storage/archive';
import { atomicBundle, storageError, type AtomicOptions } from '../project-storage/atomic';
import {editExpressions} from '../expression-control';
import { contentKey, duplicateProject, EditHistory } from './history';
import { parseSessionCommand, type SessionView, type SessionCommand, type SessionReply, type RecoveryComparison } from './contracts';
export type LeaveDecision = 'save' | 'discard' | 'cancel';
export interface ProjectDialogs { chooseDetailTexture?():Promise<string|null>; chooseSplit?(kind:'folder'|'2dparts'):Promise<string|null>;saveSplit?(suggested:string):Promise<string|null>; chooseImage?():Promise<string | null>; openProject():Promise<string | null>; saveProject(suggested:string):Promise<string | null>; relinkImage():Promise<string | null>; unsaved(name:string):Promise<LeaveDecision>; }
export interface SessionOptions { splitProcessor?:SplitProcessor;splitExample?:Buffer; parts?:{catalog:Catalog;bytes:ReadonlyMap<string,Buffer>}; inputProcessor?:InputProcessor; dataDir:string; dialogs:ProjectDialogs; bundled:Project; bundledBytes:ReadonlyMap<string,Buffer>; now?:()=>number; autoTimers?:boolean; saveFault?:AtomicOptions['fault']; }
interface Document { detail:DetailSession; split?:SplitSession; correction?:CorrectionSession;structure?:StructureSession;input?:InputSession; loadedMinor:number;upgradeSource:string | null;id:string; flow:Workflow; history:EditHistory; target:string | null; expectedHash:string | null; savedKey:string | null; label:string; mode:'editable'; available:Set<string>; unresolved:Set<string>; lastRecoveryAt:string | null; recoveryKey:string | null; }
export class ProjectSession {
  private viewSequence = 0;
  readonly cache:ResourceCache; readonly catalog:ProjectCatalog;
  private document:Document | null = null; private readOnly:LoadedBundle | null = null; private readOnlyLabel = '';
  private listeners = new Set<()=>void>(); private lastError:string | null = null; private saving:Promise<boolean> | null = null;
  private autoPromise:Promise<void> | null = null; private timer:ReturnType<typeof setTimeout> | null = null; private lastEdit = 0; private lastAuto = 0;
  private retryAutoAt = 0;
  private readonly now:()=>number; private grants = new Map<string,Map<string,Project['assets'][number]>>(); private transitioning = false; private stopped = false;
  constructor(private options:SessionOptions) { if(options.parts)assertCatalog(options.parts.catalog); this.now = options.now ?? Date.now; this.cache = new ResourceCache(join(options.dataDir,'cache')); this.catalog = new ProjectCatalog(join(options.dataDir,'projects')); }
  async init():Promise<void> { await mkdir(this.options.dataDir,{ recursive:true }); await this.catalog.init(); }
  subscribe(listener:()=>void):()=>void { this.listeners.add(listener); return () => this.listeners.delete(listener); }
  private emit():void { for (const listener of this.listeners) { try { listener(); } catch { /* UI observer does not own document state */ } } }
  private editable():Document { if (!this.document || this.readOnly || this.transitioning || this.stopped) throw new Error('E_SESSION_READ_ONLY'); return this.document; }
  private dirty(doc = this.document):boolean { return !!doc && (doc.target === null || doc.savedKey !== contentKey(doc.flow.project())); }
  private scene(project:Project,available:Set<string>,token:string):PreviewScene | null {
    const copy = structuredClone(project); for (const part of copy.parts) if (part.textures.some(t => !available.has(t.assetId))) part.visible = false;
    const allowed = new Map<string,Project['assets'][number]>(); for (const asset of project.assets) if (available.has(asset.id)) allowed.set(`${asset.fingerprint.sha256}.${asset.mediaType === 'image/png' ? 'png' : 'jpg'}`,asset);
    this.grants.set(token,allowed);
    try { const result = projectToPreview(copy,asset => `assets/session/${token}/${asset.fingerprint.sha256}.${asset.mediaType === 'image/png' ? 'png' : 'jpg'}${asset.producer.name.startsWith('atelier-luna') ? '?asset='+asset.id : ''}`); return result.layers.length ? result : null; } catch { return null; }
  }
  async resource(token:string,name:string):Promise<Buffer | null> { const asset = this.grants.get(token)?.get(name); return (asset?await this.cache.read(asset):null)??this.document?.input?.resource(token,name)??this.document?.split?.resource(token,name)??null; }
  view():SessionView {
    const d = this.document; const p = d?.flow.project() ?? null; const scene = d && p ? this.scene(p,d.available,d.id) : null;
    const renderKey = scene ? sha256(Buffer.from(JSON.stringify({ canvas:scene.canvas,layers:scene.layers }))) : 'empty';
    const original = p?.assets.find(a => a.id === (p.inputPreparation?.normalizedAssetId ?? p.inputAssetIds[0]) && d?.available.has(a.id));
    const candidate=d?.structure?.preview()??null;if(d&&!candidate)this.grants.delete(d.id+'-structure');const structure=d?.structure?{...d.structure.view(),project:candidate,scene:candidate?this.scene(candidate,new Set(candidate.assets.map(a=>a.id)),d.id+'-structure'):null}:null;
    const corrected=d?.correction?.preview()??null;if(d&&!corrected)this.grants.delete(d.id+'-correction');const correction=d?.correction?{...d.correction.view(),project:corrected,scene:corrected?this.scene(corrected,new Set(corrected.assets.map(a=>a.id)),d.id+'-correction'):null}:null;
    const splitCandidate=d?.split?.preview()??null;if(d&&!splitCandidate)this.grants.delete(d.id+'-split');const split=d?.split?{...d.split.view(),project:splitCandidate,scene:splitCandidate?this.scene(splitCandidate,new Set(splitCandidate.assets.map(a=>a.id)),d.id+'-split'):null}:null;
    const detailCandidate=d?.detail.preview()??null;if(d&&!detailCandidate)this.grants.delete(d.id+'-detail');const detail=d?{...d.detail.view(),project:detailCandidate,scene:detailCandidate?this.scene(detailCandidate,new Set([...d.available,...d.detail.view().extraAssetIds]),d.id+'-detail'):null}:null;
    return { detail,split,correction,structure,partsCatalog:this.options.parts?.catalog??null,input:d?.input?.view() ?? null,sequence:++this.viewSequence,sessionId:d?.id ?? null,mode:this.readOnly ? 'read-only' : d ? 'editable' : 'empty',project:p,label:d?.label ?? this.readOnlyLabel,dirty:this.dirty(),saving:this.saving !== null,canUndo:!this.saving && !!d?.history.canUndo,canRedo:!this.saving && !!d?.history.canRedo,
      scene,originalScene:original && p && d ? originalScene([p.canvas.width,p.canvas.height],{ x:original.dimensions.width,y:original.dimensions.height },`assets/session/${d.id}/${original.fingerprint.sha256}.${original.mediaType === 'image/png' ? 'png' : 'jpg'}`) : null,jobs:d?.flow.view().jobs ?? [],renderKey,issues:d && p ? p.assets.filter(a => !d.available.has(a.id) || d.unresolved.has(a.id)).map(a => ({ assetId:a.id,code:'E_RESOURCE_MISSING' })) : [],errorCode:this.lastError,lastRecoveryAt:d?.lastRecoveryAt ?? null,
      recent:this.catalog.recent().map(({ id,displayName,openedAt,sourceType }) => ({ id,displayName,openedAt,sourceType })),
      recoveries:this.catalog.recoveries().slice(0,30).map(r => ({ id:r.id,displayName:r.displayName,revision:r.revision,createdAt:r.createdAt,kind:r.kind,reason:r.reason,originalLabel:r.sourcePath ? basename(r.sourcePath) : null,pending:r.pending })),
      readOnlyName:this.readOnly ? String((this.readOnly.raw as { displayName?:unknown } | null)?.displayName ?? '지원 범위가 다른 프로젝트') : null };
  }
  private async permission():Promise<{ doc:Document | null; revision:number; discard:boolean } | null> {
    if (this.saving) await this.saving; const d = this.document; d?.history.settle();
    if (!d || !this.dirty(d)) return { doc:d,revision:d?.flow.project().revision ?? -1,discard:false };
    const answer = await this.options.dialogs.unsaved(d.flow.project().displayName);
    if (answer === 'cancel') return null;
    if (answer === 'save' && !await this.save(false)) return null;
    return { doc:d,revision:d.flow.project().revision,discard:answer === 'discard' };
  }
  private async activate(project:Project | null,bundle:LoadedBundle | null,target:string | null,permit:Awaited<ReturnType<ProjectSession['permission']>>,restored = false):Promise<boolean> {
    if (!permit) return false;
    if (this.document !== permit.doc || this.document && this.document.flow.project().revision !== permit.revision) { permit = await this.permission(); if (!permit) return false; }
    this.transitioning = true;
    try {
      const previous = this.document;
      if (this.autoPromise) { try { await this.autoPromise; } catch { /* transition permission already determines save/discard intent */ } }
      if (bundle && project) await this.cache.ingest(bundle);
      const available = project ? await this.cache.available(project) : new Set<string>();
      if (previous && previous.flow.project().revision !== permit.revision) throw new Error('E_EDIT_STALE');
      if (previous) { previous.detail.dispose();previous.correction?.dispose();previous.split?.dispose();previous.structure?.dispose();previous.input?.dispose();await previous.flow.close(); if (permit.discard || !this.dirty(previous)) { try { await this.catalog.acknowledge(previous.flow.project().projectId); } catch { /* valid snapshots remain available */ } } this.grants.delete(previous.id);this.grants.delete(previous.id+'-structure');this.grants.delete(previous.id+'-correction');this.grants.delete(previous.id+'-split'); }
      this.cancelTimer(); this.document = null; this.readOnly = null; this.readOnlyLabel = '';
      if (bundle?.mode === 'read-only') { this.readOnly = bundle; this.readOnlyLabel = target ? basename(target) : '읽기 전용'; }
      else if (project) {
        const flow = new Workflow(project); const complete = available.size === project.assets.length && !bundle?.issues.length;
        flow.subscribe(() => this.emit());
        this.document = { detail:null as unknown as DetailSession, loadedMinor:project.schemaVersion.minor,upgradeSource:null,id:randomUUID(),flow,history:new EditHistory(flow),target:!restored && complete ? target : null,expectedHash:!restored && complete ? bundle?.fileHash ?? null : null,
          savedKey:target && !restored && complete ? contentKey(project) : null,label:restored ? '복구본 · 새 파일로 저장' : target ? basename(target) : '저장 위치 없음',mode:'editable',available,unresolved:new Set(bundle?.issues.map(issue => issue.assetId) ?? []),lastRecoveryAt:null,recoveryKey:null };
        const d=this.document;d.detail=new DetailSession({flow,cache:this.cache,current:()=>this.document===d&&!this.stopped,checkpoint:()=>this.checkpoint('Before detailed edit apply'),commit:async next=>{d.history.change('Apply reviewed detailed edit',p=>{const stable=new Set(['projectId','sourceType','createdAt','modifiedAt','revision','savedRevision']);for(const key of Object.keys(p))if(!stable.has(key)&&!Object.hasOwn(next,key))delete (p as unknown as Record<string,unknown>)[key];for(const [key,value] of Object.entries(next))if(!stable.has(key))(p as unknown as Record<string,unknown>)[key]=structuredClone(value);});d.available=await this.cache.available(d.flow.project());this.changed();},emit:()=>this.emit()},this.options.splitProcessor);if(this.options.splitProcessor)d.split=new SplitSession({token:d.id,flow,cache:this.cache,current:()=>this.document===d&&!this.stopped,checkpoint:()=>this.checkpoint('Before split parts apply'),commit:async next=>{d.history.change('Apply confirmed split parts',p=>{for(const field of ['assets','parts','groups','parameters','partBindings','inputBindings','expressions','motion','canvas','inputAssetIds','provenance','schemaVersion','split'] as const)(p as unknown as Record<string,unknown>)[field]=structuredClone(next[field]);delete p.structure;delete p.assembly;delete p.inputPreparation;});d.available=await this.cache.available(d.flow.project());d.unresolved.clear();this.changed();},emit:()=>this.emit()},this.options.splitProcessor);if(this.options.inputProcessor?.structure)d.correction=new CorrectionSession({flow,cache:this.cache,current:()=>this.document===d&&!this.stopped,checkpoint:()=>this.checkpoint('Before selected correction apply'),commit:async change=>{d.history.change('Apply selected corrections',change);d.available=await this.cache.available(d.flow.project());this.changed();},emit:()=>this.emit()},this.options.inputProcessor);if(this.options.inputProcessor?.structure)d.structure=new StructureSession({flow,cache:this.cache,current:()=>this.document===d&&!this.stopped,checkpoint:()=>this.checkpoint('Before automatic structure apply'),commit:async change=>{d.history.change('Apply automatic structure',change);d.available=await this.cache.available(d.flow.project());this.changed();},emit:()=>this.emit()},this.options.inputProcessor);if(this.options.inputProcessor && this.options.dialogs.chooseImage)d.input=new InputSession({ flow,cache:this.cache,current:()=>this.document===d && !this.stopped,checkpoint:()=>this.checkpoint('그림/영역 변경 전'),commit:async change=>{d.history.change('그림 대상 적용',change);d.available=await this.cache.available(d.flow.project());d.unresolved.clear();this.changed();},emit:()=>this.emit() },this.options.inputProcessor,()=>this.options.dialogs.chooseImage!());
        if (target && !restored) { try { await this.catalog.addRecent(target,project); } catch { /* opening is independent from recent-list persistence */ } }
      }
      this.lastError = null; this.lastEdit = this.now(); this.lastAuto = this.now(); this.scheduleAuto(); this.emit(); return true;
    } finally { this.transitioning = false; }
  }
  async newProject(name:string,sourceType:SourceType):Promise<boolean> { const permit = await this.permission(); if (!permit) return false; return this.activate(createProject(name.trim() || '새 프로젝트',sourceType),null,null,permit); }
  dropImage(file:string):SessionReply { const active=this.editable();if(active.split?.view().busy||active.structure?.view().busy||active.correction?.view().busy)throw new Error('E_INPUT_STRUCTURE_BUSY');const input=active.input;if(!input)throw new Error('E_INPUT_UNAVAILABLE');input.drop(file);return {view:this.view()}; }
  async openFile(file:string):Promise<boolean> { const bundle = await readBundle(file,true); const permit = await this.permission(); if (!permit) return false; return this.activate(bundle.project,bundle,resolve(file),permit); }
  async save(saveAs:boolean):Promise<boolean> {
    if (this.saving) return this.saving; const d = this.editable(); d.history.settle();
    const operation = async ():Promise<boolean> => {
      let target = !saveAs ? d.target : null;
      if (!target) { target = await this.options.dialogs.saveProject(d.flow.project().displayName+'.2dsketch'); if (!target) return false; }
      target = resolve(target); if (d.upgradeSource && target.toLowerCase()===d.upgradeSource.toLowerCase()) throw new Error('E_SAVE_MIGRATION_TARGET'); if (!target.toLowerCase().endsWith('.2dsketch') || target.startsWith('\\\\')) throw new Error('E_SAVE_PATH');
      const snapshot = d.flow.project(); const resources = await this.cache.bytes(snapshot);
      const sameTarget = d.target !== null && target.toLowerCase() === d.target.toLowerCase(); let expected = sameTarget ? d.expectedHash : null;
      if (!sameTarget) { try { expected = sha256(await readFile(target)); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; } }
      const bytes = await encodeBundle(snapshot,resources,'manual');
      const receipt = await atomicBundle(target,bytes,{ expectedHash:expected,...(this.options.saveFault ? { fault:this.options.saveFault } : {}),backup:async original => {
        const old = await decodeBundle(original,false); if (!old.project) throw new Error('E_SAVE_ORIGINAL_VERSION'); await this.catalog.record(old.project,old.resources,'manual',target,'이전 정상 저장본',original);
      } });
      d.loadedMinor = snapshot.schemaVersion.minor; d.upgradeSource = null; d.flow.acknowledgeSaved(snapshot.revision); d.target = target; d.expectedHash = receipt.hash; d.savedKey = contentKey(snapshot); d.unresolved.clear(); d.label = basename(target);
      this.lastError = receipt.warning;
      try { await this.catalog.addRecent(target,snapshot); if (!this.dirty(d)) await this.catalog.acknowledge(snapshot.projectId); } catch { this.lastError = 'E_CATALOG_WRITE'; }
      return true;
    };
    this.saving = operation().catch(error => { this.lastError = storageError(error); d.flow.setAxis('save','SAVE_FAILED'); throw new Error(this.lastError); }).finally(() => { this.saving = null; this.scheduleAuto(); this.emit(); });
    this.emit(); return this.saving;
  }
  private cancelTimer():void { if (this.timer) clearTimeout(this.timer); this.timer = null; }
  private scheduleAuto():void {
    this.cancelTimer(); if (this.options.autoTimers === false || !this.document || !this.dirty() || this.stopped || this.document.recoveryKey === contentKey(this.document.flow.project())) return;
    const delay = Math.max(0,Math.max(this.retryAutoAt,Math.min(this.lastEdit+15000,this.lastAuto+60000))-this.now());
    this.timer = setTimeout(() => { this.timer = null; void this.autosaveDue().catch(error => { this.lastError = storageError(error); this.retryAutoAt = this.now()+30000; this.scheduleAuto(); this.emit(); }); },delay); this.timer.unref();
  }
  async autosaveDue(force = false):Promise<void> {
    if (this.autoPromise) return this.autoPromise; const d = this.document;
    if (!d || !this.dirty(d) || d.recoveryKey === contentKey(d.flow.project()) || !force && this.now() < Math.min(this.lastEdit+15000,this.lastAuto+60000)) return;
    const snapshot = d.flow.project();
    this.autoPromise = (async () => { const resources = await this.cache.bytes(snapshot); const record = await this.catalog.record(snapshot,resources,'autosave',d.target,'자동 복구본'); if (this.document === d) { d.lastRecoveryAt = record.createdAt; d.recoveryKey = contentKey(snapshot); } this.lastAuto = this.now(); })().finally(() => { this.autoPromise = null; this.scheduleAuto(); this.emit(); });
    return this.autoPromise;
  }
  private changed():void { this.lastEdit = this.now(); const d = this.document; if (d && d.target && d.loadedMinor<d.flow.project().schemaVersion.minor) { d.upgradeSource = d.target; d.target = null; d.expectedHash = null; d.label = '이전 프로젝트의 변환본 · 새 파일로 저장'; } if (d) d.flow.setAxis('save',this.dirty(d) ? 'DIRTY' : 'CLEAN'); this.lastError = null; this.scheduleAuto(); this.emit(); }
  private async checkpoint(reason:string):Promise<void> { const d = this.editable(); const p = d.flow.project(); const record = await this.catalog.record(p,await this.cache.bytes(p),'checkpoint',d.target,reason); d.lastRecoveryAt = record.createdAt; d.recoveryKey = contentKey(p); this.emit(); }
  private async edit(command:Extract<SessionCommand,{ type:'edit' }>):Promise<void> {
    const d = this.editable();if(command.target==='part-translate-x'&&d.flow.project().parts.find(v=>v.id===command.id)?.library)throw new Error('E_PARTS_RANGE'); if (command.groupId === null && d.flow.project().revision !== command.expectedRevision) throw new Error('E_EDIT_STALE');
    if (command.target === 'part-role') { await this.checkpoint('부위 역할 변경 전'); if (d.flow.project().revision !== command.expectedRevision) throw new Error('E_EDIT_STALE'); }
    d.history.change('프로젝트 편집',p => {
      if (command.target === 'project-name') { if (typeof command.value !== 'string') throw new Error('E_EDIT_VALUE'); p.displayName = command.value.trim() || '새 프로젝트'; return; }
      if (command.target === 'expression-value') { const expression = p.expressions.find(e => e.id === command.id); const target = expression?.values.find(v => v.parameterId === command.parameterId); if (!target || typeof command.value !== 'number') throw new Error('E_EDIT_TARGET'); target.value = command.value; return; }
      const part = p.parts.find(v => v.id === command.id); if (!part) throw new Error('E_EDIT_TARGET');
      if (command.target === 'part-name' && typeof command.value === 'string') part.displayName = command.value.trim();
      else if (command.target === 'part-role' && typeof command.value === 'string') part.role = command.value as Project['parts'][number]['role'];
      else if (command.target === 'part-opacity' && typeof command.value === 'number') part.opacity = command.value;
      else if (command.target === 'part-translate-x' && typeof command.value === 'number') part.localTransform[4] = command.value;
      else throw new Error('E_EDIT_VALUE');
    },command.groupId); this.changed();
  }
  private async sample():Promise<void> {
    const d = this.editable(); const revision = d.flow.project().revision; await this.checkpoint('예제 캐릭터 삽입 전'); const source = this.options.bundled;
    for (const asset of source.assets) { const data = this.options.bundledBytes.get(asset.id); if (!data) throw new Error('E_SAMPLE_RESOURCE'); await this.cache.put(asset,data); }
    if (this.document !== d || d.flow.project().revision !== revision) throw new Error('E_EDIT_STALE');
    d.history.change('고급 예제 캐릭터',draft => { for (const field of ['canvas','assets','parts','groups','parameters','partBindings','inputBindings','expressions','runtimeProfile','broadcastProfiles','exportProfiles','inputAssetIds'] as const) (draft as unknown as Record<string,unknown>)[field] = structuredClone(source[field]); if (source.motion) { draft.schemaVersion.minor = Math.max(draft.schemaVersion.minor,source.schemaVersion.minor); draft.motion = structuredClone(source.motion); } else delete draft.motion; delete draft.expressionSettings; delete draft.inputPreparation;delete draft.assembly;delete draft.structure;delete draft.split;draft.provenance = { preparation:'Bundled authored example; not route-specific automatic preparation',limitations:source.provenance.limitations }; });
    d.available = await this.cache.available(d.flow.project()); d.unresolved.clear(); this.changed();
  }
  private async relink(assetId:string):Promise<void> {
    const d = this.editable(); const asset = d.flow.project().assets.find(a => a.id === assetId); if (!asset) throw new Error('E_EDIT_TARGET');
    const file = await this.options.dialogs.relinkImage(); if (!file) return; await this.cache.put(asset,await readFile(file)); d.unresolved.delete(assetId); d.available = await this.cache.available(d.flow.project()); this.lastError = null; this.emit();
  }
  private record(id:string):RecoveryRecord { const record = this.catalog.recoveries().find(r => r.id === id); if (!record) throw new Error('E_RECOVERY_UNKNOWN'); return record; }
  private async comparison(id:string):Promise<RecoveryComparison> {
    for (const key of this.grants.keys()) if (key.startsWith('recovery-') || key.startsWith('saved-')) this.grants.delete(key);
    const record = this.record(id); const recovered = await readBundle(this.catalog.file(id),false); if (!recovered.project) throw new Error('E_RECOVERY_VERSION'); await this.cache.ingest(recovered);
    const recoveredScene = this.scene(recovered.project,await this.cache.available(recovered.project),'recovery-'+id);
    let saved:RecoveryComparison['saved'] = null;
    if (record.sourcePath) { try { const original = await readBundle(record.sourcePath,false); if (original.project) { await this.cache.ingest(original); saved = { label:basename(record.sourcePath),revision:original.project.revision,modifiedAt:original.project.modifiedAt,scene:this.scene(original.project,await this.cache.available(original.project),'saved-'+id) }; } } catch { /* original unavailable; verified recovery remains usable */ } }
    return { recovered:{ label:record.displayName,revision:recovered.project.revision,modifiedAt:recovered.project.modifiedAt,scene:recoveredScene },saved };
  }
  private checkResources():void {
    const d = this.editable(); this.lastError = null;
    const job = d.flow.start({ key:'resource-integrity',label:'저장에 필요한 이미지 확인',kind:'check',processingVersion:'1.0.0',settings:{ scope:'local-resource-hash' },
      steps:[{ id:'verify-resources',version:'1.0.0',cache:'none',cancellable:true,run:async ctx => { let done = 0; for (const asset of ctx.input.assets) { ctx.checkpoint(); if (!await this.cache.read(asset)) throw new Error('E_RESOURCE_MISSING'); done++; ctx.progress(done/ctx.input.assets.length); await new Promise<void>(resolve => setImmediate(resolve)); } return { checked:done }; } }],
      collect:(_input,identity) => ({ identity,outcome:{ kind:'checked',reportId:'local-resources',dependencies:['resources:*'] } }) }); this.watchCheck(d,job.jobId);
  }
  private watchCheck(d:Document,id:string):void { void d.flow.wait(id).then(async result => { if (this.document !== d) return; d.available = await this.cache.available(d.flow.project()); if (result.state === 'FAILED') this.lastError = result.errorCode; this.emit(); }).catch(() => {}); }
  async dispatch(input:unknown):Promise<SessionReply> {
    try {
      const command = parseSessionCommand(input); let value:string | undefined; let preview:RecoveryComparison | undefined;
      if(['sample','parts-start','parts-select','parts-remove','parts-adjust','parts-link','parts-reset','structure-start','structure-apply','structure-retry','correction-start','correction-apply','correction-retry','split-edit','split-prepare','split-apply','input-apply','prepare-motion'].includes(command.type))assertSimpleSafe(this.editable().flow.project());
      if(command.type.startsWith('detail-')){this.lastError=null;const c=command as Extract<SessionCommand,{type:`detail-${string}`}>;const d=this.editable();if(c.type==='detail-open')d.detail.open(c.location);else if(c.type==='detail-prepare')d.detail.prepare(c.operation,c.expectedRevision);else if(c.type==='detail-apply')await d.detail.apply(c.draftId,c.expectedRevision);else if(c.type==='detail-cancel')d.detail.cancel();else if(c.type==='detail-import'){if(!this.options.dialogs.chooseDetailTexture)throw new Error('E_DETAIL_IMPORT_UNAVAILABLE');if(c.expectedRevision!==d.flow.project().revision)throw new Error('E_DETAIL_STALE');const file=await this.options.dialogs.chooseDetailTexture();if(this.document!==d||c.expectedRevision!==d.flow.project().revision)throw new Error('E_DETAIL_STALE');if(file)d.detail.importTexture(file,c.partId,c.state,c.expectedRevision);}}
      else if(command.type.startsWith('split-')){const c=command as Extract<SessionCommand,{type:`split-${string}`}>;const d=this.editable();if(!d.split||d.flow.project().sourceType!=='split-image')throw new Error('E_SPLIT_ROUTE');if(d.input?.view().busy||d.structure?.view().busy||d.correction?.view().busy)throw new Error('E_SPLIT_BUSY');
       if(c.type==='split-load'){if(c.kind==='example'){if(!this.options.splitExample)throw new Error('E_SPLIT_SOURCE');d.split.startBytes(this.options.splitExample);}else {if(!this.options.dialogs.chooseSplit)throw new Error('E_SPLIT_SOURCE');const rev=d.flow.project().revision;const path=await this.options.dialogs.chooseSplit(c.kind);if(this.document!==d||rev!==d.flow.project().revision)throw new Error('E_INPUT_STALE');if(path)d.split.startFile(path,c.kind);}}
       else if(c.type==='split-edit')d.split.edit();else if(c.type==='split-prepare')d.split.prepare(c.draftId,c.config,c.expectedRevision);else if(c.type==='split-apply')await d.split.apply(c.draftId,c.config,c.expectedRevision);else if(c.type==='split-cancel')d.split.cancel();else if(c.type==='split-discard')d.split.discard();else if(c.type==='split-retry')d.split.retry();else if(c.type==='split-export'){if(!this.options.dialogs.saveSplit)throw new Error('E_SPLIT_EXPORT_PATH');const target=await this.options.dialogs.saveSplit(d.flow.project().displayName+'.2dparts');if(target){const bytes=await d.split.export();const receipt=await saveParts(target,bytes);d.split.exportedFile(receipt.label);}}
      }
      else if(command.type==='correction-start'||command.type==='correction-apply'||command.type==='correction-cancel'||command.type==='correction-retry'){const d=this.editable();if(!d.correction)throw new Error('E_CORRECTION_SOURCE');if(d.split?.view().busy||d.input?.view().busy||d.structure?.view().busy)throw new Error('E_INPUT_STRUCTURE_BUSY');if(command.type==='correction-start')d.correction.start(command.request,command.expectedRevision);else if(command.type==='correction-apply')await d.correction.apply(command.keys,command.expectedRevision);else if(command.type==='correction-retry')d.correction.retry(command.expectedRevision);else d.correction.cancel();}
      else if(command.type==='structure-start'||command.type==='structure-apply'||command.type==='structure-cancel'||command.type==='structure-retry'){const d=this.editable();if(!d.structure)throw new Error('E_INPUT_UNAVAILABLE');if(d.split?.view().busy||d.input?.view().busy||d.correction?.view().busy)throw new Error('E_INPUT_STRUCTURE_BUSY');if(command.type==='structure-start')d.structure.start(command.completion,command.expectedRevision);else if(command.type==='structure-apply')await d.structure.apply(command.expectedRevision);else if(command.type==='structure-retry')d.structure.retry(command.expectedRevision);else d.structure.cancel();}
      else if(command.type==='parts-start'||command.type==='parts-select'||command.type==='parts-remove'||command.type==='parts-adjust'||command.type==='parts-link'||command.type==='parts-reset'){const d=this.editable();const source=this.options.parts;if(!source)throw new Error('E_PARTS_UNAVAILABLE');const c=source.catalog;if(d.flow.project().revision!==command.expectedRevision)throw new Error('E_EDIT_STALE');if(['parts-start','parts-select','parts-remove'].includes(command.type))await this.checkpoint('파츠 변경 전');if(command.type==='parts-start')for(const a of c.assets){const bytes=source.bytes.get(a.id);if(!bytes)throw new Error('E_PARTS_RESOURCE');await this.cache.put(a,bytes);}if(this.document!==d||d.flow.project().revision!==command.expectedRevision)throw new Error('E_EDIT_STALE');d.history.change('파츠 조합',p=>{if(command.type==='parts-start')startAssembly(p,c);else if(command.type==='parts-select')selectItem(p,c,command.itemId);else if(command.type==='parts-remove')removeSlot(p,c,command.slot);else if(command.type==='parts-adjust')adjustPart(p,c,command.value);else if(command.type==='parts-link')linkEyes(p,c,command.linked,command.anchor);else resetAdjustment(p,c,command.key);});d.available=await this.cache.available(d.flow.project());this.changed();}
      else if (['import-image','input-cancel','input-retry','input-apply'].includes(command.type)) { const active=this.editable();if(active.split?.view().busy||active.structure?.view().busy||active.correction?.view().busy)throw new Error('E_INPUT_STRUCTURE_BUSY');const input=active.input;if(!input)throw new Error('E_INPUT_UNAVAILABLE');if(command.type==='import-image')await input.choose();else if(command.type==='input-cancel')input.cancel();else if(command.type==='input-retry')input.retry();else if(command.type==='input-apply')await input.apply(command.draftId,command.selection); }
      else if (command.type === 'new') await this.newProject(command.name,command.sourceType);
      else if (command.type === 'open') { const file = await this.options.dialogs.openProject(); if (file) await this.openFile(file); }
      else if (command.type === 'recent') { const entry = this.catalog.recent().find(r => r.id === command.id); if (!entry) throw new Error('E_RECENT_UNKNOWN'); await this.openFile(entry.path); }
      else if (command.type === 'remove-recent') await this.catalog.removeRecent(command.id);
      else if (command.type === 'save' || command.type === 'save-as') await this.save(command.type === 'save-as');
      else if (command.type === 'close') { const permit = await this.permission(); if (permit) await this.activate(null,null,null,permit); }
      else if (command.type === 'begin-group') value = this.editable().history.begin(command.label);
      else if (command.type === 'end-group') { this.editable().history.finish(command.id,command.commit); this.changed(); }
      else if (command.type === 'edit') await this.edit(command);
      else if (command.type === 'undo' || command.type === 'redo') { const d = this.editable(); if (command.type === 'undo') d.history.undo(); else d.history.redo(); this.changed(); }
      else if (command.type === 'sample') await this.sample();
      else if(command.type==='tracking-settings'){const d=this.editable();if(d.flow.project().revision!==command.expectedRevision)throw new Error('E_EDIT_STALE');d.history.change('Tracking mapping',p=>{p.schemaVersion.minor=Math.max(9,p.schemaVersion.minor);p.tracking=structuredClone(command.value);});this.changed();}
      else if(command.type==='expression-edit'){const d=this.editable();if(d.flow.project().revision!==command.expectedRevision)throw new Error('E_EDIT_STALE');await this.checkpoint('Before expression edit');if(this.document!==d||d.flow.project().revision!==command.expectedRevision)throw new Error('E_EDIT_STALE');d.history.change('Expression edit',p=>editExpressions(p,command.operation,randomUUID));this.changed();}
      else if (['prepare-motion','motion-settings','motion-parameter'].includes(command.type)) {
        if (command.type !== 'prepare-motion' && command.type !== 'motion-settings' && command.type !== 'motion-parameter') throw new Error('E_SESSION_COMMAND');
        const d = this.editable(); if (command.expectedRevision !== d.flow.project().revision) throw new Error('E_EDIT_STALE');
        if (command.type === 'prepare-motion') { await this.checkpoint('움직임 연결 준비 전'); if (command.expectedRevision !== d.flow.project().revision) throw new Error('E_EDIT_STALE'); }
        d.history.change('움직임 설정',p => {
          if (command.type === 'prepare-motion') { p.schemaVersion.minor = Math.max(1,p.schemaVersion.minor); p.motion = authorRig(p); }
          else if (command.type === 'motion-settings') { if (!p.motion) throw new Error('E_MOTION_UNSUPPORTED'); p.motion.settings = { strength:command.strength,smoothingMs:command.smoothingMs,pose:structuredClone(command.pose) }; }
          else { const param = p.parameters.find(v => v.id === command.id); if (!param) throw new Error('E_REFERENCE_MISSING'); Object.assign(param,{ min:command.min,neutral:command.neutral,max:command.max }); if (!(param.min<param.max && param.min<=param.neutral && param.neutral<=param.max)) throw new Error('E_PARAMETER_RANGE');
            const clamp = (v:number) => Math.max(param.min,Math.min(param.max,v)); for (const e of p.expressions) for (const v of e.values) if (v.parameterId===param.id) v.value = clamp(v.value); for (const b of p.inputBindings) if (b.parameterId===param.id) b.fallback.value = clamp(b.fallback.value); for (const v of p.motion?.settings.pose ?? []) if (v.parameterId===param.id) v.value = clamp(v.value);
          }
        }); this.changed();
      }
      else if (command.type === 'check-resources') this.checkResources();
      else if (command.type === 'cancel-task') { const d=this.editable();if(d.input?.view().jobId===command.id)d.input.cancel();else d.flow.cancel(command.id); }
      else if (command.type === 'retry-task') { const d = this.editable(); if(d.input?.view().jobId===command.id)d.input.retry();else { const job = d.flow.retry(command.id); this.lastError = null; this.watchCheck(d,job.jobId); } }
      else if (command.type === 'checkpoint') await this.checkpoint('사용자 복구 지점');
      else if (command.type === 'relink') await this.relink(command.assetId);
      else if (command.type === 'preview-recovery') preview = await this.comparison(command.id);
      else if (command.type === 'original') { const record = this.record(command.id); if (!record.sourcePath) throw new Error('E_RECOVERY_ORIGINAL'); if (await this.openFile(record.sourcePath)) await this.catalog.acknowledge(record.projectId); }
      else if (command.type === 'recover') { const record = this.record(command.id); const bundle = await readBundle(this.catalog.file(record.id),false); if (!bundle.project) throw new Error('E_RECOVERY_VERSION'); const permit = await this.permission(); if (permit) await this.activate(bundle.project,bundle,null,permit,true); }
      else if (command.type === 'duplicate') {
        const permit = await this.permission(); if (permit) { const d = this.editable(); const clone = duplicateProject(d.flow.project()); const target = await this.options.dialogs.saveProject(clone.displayName+'.2dsketch');
          if (target) { if (d.upgradeSource && resolve(target).toLowerCase()===d.upgradeSource.toLowerCase()) throw new Error('E_SAVE_MIGRATION_TARGET'); if (!target.toLowerCase().endsWith('.2dsketch') || target.startsWith('\\\\')) throw new Error('E_SAVE_PATH'); const bytes = await encodeBundle(clone,await this.cache.bytes(clone),'manual'); let expected:string | null = null; try { expected = sha256(await readFile(target)); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
            await atomicBundle(target,bytes,{ expectedHash:expected,backup:async old => { const b = await decodeBundle(old,false); if (!b.project) throw new Error('E_SAVE_ORIGINAL_VERSION'); await this.catalog.record(b.project,b.resources,'manual',target,'복제 전 정상본',old); } }); await this.activate((await decodeBundle(bytes,false)).project,await decodeBundle(bytes,false),resolve(target),permit); }
        }
      }
      this.emit(); return { view:this.view(),...(value ? { value } : {}),...(preview ? { preview } : {}) };
    } catch (error) { this.lastError = storageError(error); this.emit(); return { view:this.view() }; }
  }
  async requestClose():Promise<boolean> { const permit = await this.permission(); if (!permit) return false; if (this.autoPromise) { try { await this.autoPromise; } catch { /* explicit discard or successful manual save governs leaving */ } } if (this.document !== permit.doc || this.document && this.document.flow.project().revision !== permit.revision) return false; if (this.document && permit.discard) await this.catalog.acknowledge(this.document.flow.project().projectId); return true; }
  async shutdown():Promise<void> { this.stopped = true; this.cancelTimer(); if (this.saving) await this.saving; if (this.autoPromise) { try { await this.autoPromise; } catch { /* shutdown follows an explicit save/discard guard */ } } if (this.document) { this.document.detail.dispose();this.document.split?.dispose();this.document.correction?.dispose();this.document.structure?.dispose();this.document.input?.dispose();await this.document.flow.close(); } this.listeners.clear(); this.grants.clear(); }
}

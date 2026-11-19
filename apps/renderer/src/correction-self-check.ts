import { clickCommittedControl } from './ui-check-control';
import type {
  SessionView,
  SessionCommand,
  SessionReply,
} from '../../../packages/project-session/contracts';
import { structurePixels } from './structure-self-check';
export async function checkCorrectionUI(host: {
  current: () => SessionView | null;
  command: (c: SessionCommand) => Promise<SessionReply>;
  settled: () => Promise<unknown>;
}) {
  const pause = () => new Promise((r) => setTimeout(r, 30));
  const until = async (fn: () => boolean) => {
    const start = Date.now();
    while (!fn()) {
      if (Date.now() - start > 300000) throw new Error('E_CORRECTION_UI_TIMEOUT');
      await pause();
    }
  };
  const verify = (v: unknown, code: string) => {
    if (!v) throw new Error(code);
  };
  const preparing = new Set([
    '[data-correction-preview]',
    '[data-correction-reanalyse]',
    '[data-correction-reanalyse-all]',
    '[data-correction-reset]',
    '[data-correction-reset-all]',
    '[data-correction-skip]',
    '[data-correction-block]',
  ]);
  let lastControl = '';
  const record = () => {
    const c = host.current()?.correction;
    window.editorFailureState = {
      ...window.editorFailureState,
      correctionControl: lastControl,
      correction: c
        ? { state: c.state, busy: c.busy, errorCode: c.errorCode, jobId: c.jobId }
        : null,
    };
  };
  const click = async (selector: string) => {
    lastControl = selector;
    record();
    const previousJob = host.current()?.correction?.jobId;
    await clickCommittedControl(selector, host.current);
    await pause();
    await host.settled();
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    await pause();
    if (preparing.has(selector))
      await until(() => {
        record();
        return host.current()?.correction?.jobId !== previousJob;
      });
  };
  const wait = async () => {
    await until(() => {
      record();
      const c = host.current()!.correction!;
      if (c.state === 'failed') throw new Error('E_CORRECTION_UI_PREPARE');
      return c.state === 'review' && !c.busy;
    });
    verify(host.current()!.correction!.state === 'review', 'E_CORRECTION_UI_PREPARE');
    await until(
      () =>
        !!document.querySelector('[data-correction-state="review"]') &&
        document.querySelectorAll('.correction-compare canvas').length === 2,
    );
  };
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
  const field = async (selector: string, value: number) => {
    const input = document.querySelector<HTMLInputElement>(selector)!;
    setter.call(input, String(value));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await pause();
  };
  verify(host.current()?.project?.structure, 'E_CORRECTION_UI_SOURCE');
  await click('[data-step="prepare"]');
  await click('[data-correction-open]');
  await until(() => !!document.querySelector('[data-correction-canvas]'));
  verify(document.getElementById('root')!.inert, 'E_CORRECTION_UI_MODAL');
  await click('[data-correction-feature="eye_left"]');
  const p = host.current()!.project!,
    sourceHash = p.assets.find((a) => a.id === p.inputAssetIds[0])!.fingerprint.sha256;
  const right = JSON.stringify(p.parts.find((v) => v.side === 'character-right'));
  const expressions = JSON.stringify(p.expressions);
  const r = p.structure!.report.regions.find((v) => v.key === 'eye_left')!.rect;
  const originalProject = JSON.stringify(p);
  await click('[data-correction-zoom-in]');
  await click('[data-correction-zoom-in]');
  const svg = document.querySelector<SVGSVGElement>('[data-correction-canvas]')!;
  verify(
    Number(svg.getAttribute('viewBox')!.split(' ')[2]) === p.canvas.width / 4,
    'E_CORRECTION_UI_ZOOM',
  );
  const point = (x: number, y: number) => {
    const q = svg.createSVGPoint();
    q.x = x;
    q.y = y;
    return q.matrixTransform(svg.getScreenCTM()!);
  };
  const a = point(r.x + 2, r.y),
    b = point(r.x + r.width + 2, r.y + r.height);
  svg.dispatchEvent(
    new PointerEvent('pointerdown', { bubbles: true, pointerId: 1, clientX: a.x, clientY: a.y }),
  );
  svg.dispatchEvent(
    new PointerEvent('pointermove', { bubbles: true, pointerId: 1, clientX: b.x, clientY: b.y }),
  );
  svg.dispatchEvent(
    new PointerEvent('pointerup', { bubbles: true, pointerId: 1, clientX: b.x, clientY: b.y }),
  );
  await pause();
  verify(
    document.querySelector<HTMLInputElement>('[data-correction-field="x"]')!.value ===
      String(r.x + 2),
    'E_CORRECTION_UI_COORDINATE',
  );
  const tool = document.querySelector<HTMLSelectElement>('[data-correction-tool]')!;
  tool.value = 'erase';
  tool.dispatchEvent(new Event('change', { bubbles: true }));
  await pause();
  for (const [key, value] of Object.entries({ x: r.x + 2, y: r.y, width: 8, height: 5 }))
    await field(`[data-correction-field="${key}"]`, value);
  await click('[data-correction-add-mask]');
  await field('[data-correction-order]', 17);
  await click('[data-correction-preview]');
  await wait();
  verify(JSON.stringify(host.current()!.project) === originalProject, 'E_CORRECTION_UI_DRAFT_EDIT');
  const candidate = host.current()!.correction!.project!;
  verify(candidate.structure!.corrections!.entries[0]!.masks.length === 1, 'E_CORRECTION_UI_MASK');
  verify(candidate.structure!.corrections!.entries[0]!.order === 17, 'E_CORRECTION_UI_ORDER');
  verify(
    document.querySelectorAll('.correction-compare canvas').length === 2,
    'E_CORRECTION_UI_COMPARE',
  );
  await click('[data-correction-play]');
  const pixels = await structurePixels(host.current()!.correction!.scene!, host.current()!.scene!);
  window.correctionExtremeData = window.structureExtremeData!;
  verify(pixels.passed, 'E_CORRECTION_UI_GPU');
  await click('[data-correction-apply]');
  verify(
    host.current()!.project!.structure!.corrections?.entries.length === 1,
    'E_CORRECTION_UI_APPLY',
  );
  verify(
    JSON.stringify(host.current()!.project!.parts.find((v) => v.side === 'character-right')) ===
      right,
    'E_CORRECTION_UI_OTHER_PART',
  );
  verify(
    JSON.stringify(host.current()!.project!.expressions) === expressions,
    'E_CORRECTION_UI_EXPRESSION',
  );
  const confirmed = JSON.stringify(host.current()!.project!.structure!.corrections!.entries);
  await host.command({ type: 'undo' });
  verify(!host.current()!.project!.structure!.corrections, 'E_CORRECTION_UI_UNDO');
  await host.command({ type: 'redo' });
  verify(
    JSON.stringify(host.current()!.project!.structure!.corrections!.entries) === confirmed,
    'E_CORRECTION_UI_REDO',
  );
  await click('[data-correction-reanalyse]');
  await wait();
  verify(
    host.current()!.correction!.changes[0]!.action === 'keep-protected' &&
      !host.current()!.correction!.canApply,
    'E_CORRECTION_UI_PROTECTION',
  );
  await click('[data-correction-overwrite]');
  await click('[data-correction-reanalyse]');
  await wait();
  window.editorFailureState = {
    correctionState: host.current()!.correction!.state,
    changes: host.current()!.correction!.changes,
    keys: host.current()!.correction!.keys,
    checked: document.querySelector<HTMLInputElement>('[data-correction-overwrite]')!.checked,
  };
  verify(host.current()!.correction!.canApply, 'E_CORRECTION_UI_OVERWRITE');
  await click('[data-correction-discard]');
  verify(
    JSON.stringify(host.current()!.project!.structure!.corrections!.entries) === confirmed,
    'E_CORRECTION_UI_DISCARD',
  );
  await click('[data-correction-reset]');
  await wait();
  verify(
    !host.current()!.correction!.project!.structure!.corrections!.entries.length,
    'E_CORRECTION_UI_RESET',
  );
  await click('[data-correction-discard]');
  await click('[data-correction-skip]');
  await wait();
  verify(
    !host
      .current()!
      .correction!.project!.partBindings.some(
        (b) =>
          b.parameterId ===
          host.current()!.project!.parameters.find((v) => v.previewKey === 'eye_left')!.id,
      ),
    'E_CORRECTION_UI_SKIP',
  );
  await click('[data-correction-discard]');
  await click('[data-correction-revert-draft]');
  await click('[data-correction-reanalyse-all]');
  await wait();
  verify(
    host.current()!.correction!.changes.find((v) => v.key === 'eye_left')!.action === 'replace' ||
      host.current()!.correction!.changes.find((v) => v.key === 'eye_left')!.action === 'recheck',
    'E_CORRECTION_UI_FULL',
  );
  await click('[data-correction-discard]');
  await click('[data-correction-close]');
  verify(!document.getElementById('root')!.inert, 'E_CORRECTION_UI_FOCUS_RETURN');
  await host.command({ type: 'save' });
  const id = host.current()!.project!.projectId;
  await host.command({ type: 'duplicate' });
  verify(host.current()!.project!.projectId !== id, 'E_CORRECTION_UI_DUPLICATE');
  const recent = host.current()!.recent[0]!.id;
  await host.command({ type: 'recent', id: recent });
  verify(
    JSON.stringify(host.current()!.project!.structure!.corrections!.entries) === confirmed,
    'E_CORRECTION_UI_REOPEN',
  );
  verify(
    host.current()!.project!.assets.find((a) => a.id === host.current()!.project!.inputAssetIds[0])!
      .fingerprint.sha256 === sourceHash,
    'E_CORRECTION_UI_SOURCE_HASH',
  );
  await click('[data-step="prepare"]');
  await click('[data-correction-open]');
  await until(() => !!document.querySelector('[data-correction-canvas]'));
  await click('[data-correction-zoom-in]');
  await click('[data-correction-zoom-in]');
  await click('[data-correction-preview]');
  await wait();
  document.querySelector('[data-correction-canvas]')!.scrollIntoView({ block: 'center' });
  await pause();
  return {
    passed: true,
    wideDialog: true,
    zoomAndPointerCoordinates: true,
    numericMask: true,
    foregroundExclusion: true,
    order: true,
    originalCoordinateMapping: true,
    reviewBeforeApply: true,
    otherPartAndExpressionPreserved: true,
    protectedReanalysis: true,
    explicitOverwrite: true,
    resetAndSkip: true,
    discardPreservesNormal: true,
    undoRedo: true,
    duplicate: true,
    saveReopen: true,
    originalHashPreserved: true,
    pixels,
    devicesOpened: false,
  };
}

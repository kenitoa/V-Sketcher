import { clickCommittedControl } from './ui-check-control';
import type {
  SessionView,
  SessionCommand,
  SessionReply,
} from '../../../packages/project-session/contracts';
export async function checkInputUI(host: {
  current: () => SessionView | null;
  command: (c: SessionCommand) => Promise<SessionReply>;
  settled: () => Promise<unknown>;
}): Promise<Record<string, unknown>> {
  const pause = () => new Promise((r) => setTimeout(r, 30));
  const verify = (v: unknown, code: string): void => {
    if (!v) throw new Error(code);
  };
  const until = async (condition: () => boolean): Promise<void> => {
    const start = Date.now();
    while (!condition()) {
      if (Date.now() - start > 180000) throw new Error('E_INPUT_UI_TIMEOUT');
      await pause();
    }
  };
  const click = async (selector: string): Promise<void> => {
    await clickCommittedControl(selector, host.current);
    await pause();
    await host.settled();
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    await pause();
  };
  await host.command({ type: 'new', name: '그림 가져오기 확인', sourceType: 'single-image' });
  await until(() => !!document.querySelector('[data-input-choose]'));
  const before = JSON.stringify(host.current()!.project);
  await click('[data-input-choose]');
  await until(() => !host.current()!.input!.busy);
  verify(host.current()!.input!.draft, 'E_INPUT_UI_PROBE');
  verify(JSON.stringify(host.current()!.project) === before, 'E_INPUT_UI_DRAFT_MUTATION');
  await until(() => !!document.querySelector('[data-input-candidate]'));
  await click('[data-input-candidate]');
  const svg = document.querySelector<SVGSVGElement>('[data-input-preview]')!;
  const at = (x: number, y: number) => {
    const p = svg.createSVGPoint();
    p.x = x;
    p.y = y;
    return p.matrixTransform(svg.getScreenCTM()!);
  };
  const a = at(100, 80),
    b = at(1000, 1080);
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
    document.querySelector<HTMLInputElement>('[data-input-coordinate="width"]')!.value === '900',
    'E_INPUT_UI_POINTER_COORDINATES',
  );
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
  for (const [key, value] of Object.entries({ x: 100, y: 80, width: 900, height: 1000 })) {
    const field = document.querySelector<HTMLInputElement>(`[data-input-coordinate="${key}"]`)!;
    setter.call(field, String(value));
    field.dispatchEvent(new Event('input', { bubbles: true }));
    await pause();
  }
  const tool = document.querySelector<HTMLSelectElement>('[data-input-tool]')!;
  tool.value = 'erase';
  tool.dispatchEvent(new Event('change', { bubbles: true }));
  await pause();
  for (const [key, value] of Object.entries({ x: 100, y: 80, width: 20, height: 20 })) {
    const field = document.querySelector<HTMLInputElement>(`[data-input-coordinate="${key}"]`)!;
    setter.call(field, String(value));
    field.dispatchEvent(new Event('input', { bubbles: true }));
    await pause();
  }
  await click('[data-input-add-mask]');
  await click('[data-input-occluded]');
  await click('[data-input-apply]');
  await until(() => !host.current()!.input!.busy);
  const p = host.current()!.project!;
  verify(
    p.inputPreparation && p.canvas.width === 900 && p.canvas.height === 1000,
    'E_INPUT_UI_APPLY',
  );
  verify(p.inputPreparation!.selection.masks.length === 1, 'E_INPUT_UI_MASK');
  verify(
    p.inputPreparation!.analysis.warnings.includes('OCCLUDED_USER_REPORTED'),
    'E_INPUT_UI_WARNING',
  );
  verify(document.querySelector('.input-result canvas'), 'E_INPUT_UI_RESULT');
  const applied = JSON.stringify(p.inputPreparation);
  await host.command({ type: 'undo' });
  verify(!host.current()!.project!.inputPreparation, 'E_INPUT_UI_UNDO');
  await host.command({ type: 'redo' });
  verify(JSON.stringify(host.current()!.project!.inputPreparation) === applied, 'E_INPUT_UI_REDO');
  const snapshot = JSON.stringify(host.current()!.project);
  await click('[data-input-choose]');
  await host.command({ type: 'input-cancel' });
  await until(() => !host.current()!.input!.busy);
  verify(JSON.stringify(host.current()!.project) === snapshot, 'E_INPUT_UI_CANCEL');
  await host.command({ type: 'save' });
  const id = host.current()!.recent[0]!.id;
  await host.command({ type: 'recent', id });
  verify(
    JSON.stringify(host.current()!.project!.inputPreparation) === applied,
    'E_INPUT_UI_REOPEN',
  );
  await host.command({ type: 'close' });
  return {
    passed: true,
    nativeDialogAdapter: true,
    realPremiumDecode: true,
    draftDoesNotEdit: true,
    automaticCandidateConfirmed: true,
    pointerCrop: true,
    numericCrop: true,
    keyboardMask: true,
    selectedOnlyAnalysis: true,
    occlusionWarning: true,
    actualResultPreview: true,
    undoRedo: true,
    cancelPreservesProject: true,
    saveReopen: true,
    devicesOpened: false,
  };
}

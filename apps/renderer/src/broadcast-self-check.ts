import type {
  SessionView,
  SessionCommand,
  SessionReply,
} from '../../../packages/project-session/contracts';
import type { RunRuntime } from './run-runtime';
import { defaultRunPreferences } from '../../../packages/execution';
import { settings } from '../../../packages/expression-control';
import { clickCommittedControl } from './ui-check-control';
export function broadcastCheck(host: {
  current: () => SessionView | null;
  command: (c: SessionCommand) => Promise<SessionReply>;
  settled: () => Promise<unknown>;
  runtime: RunRuntime;
}) {
  const r = host.runtime,
    pause = (ms = 70) => new Promise((resolve) => setTimeout(resolve, ms)),
    current = () => host.current()!.project!;
  const until = async (fn: () => unknown) => {
    const end = performance.now() + 65000;
    while (!fn()) {
      if (performance.now() > end) throw new Error('E_BROADCAST_UI_TIMEOUT');
      await pause();
    }
  };
  const click = async (selector: string) => {
    await clickCommittedControl(selector, host.current);
    await host.settled();
    await pause();
  };
  return async (action: string, value?: unknown): Promise<Record<string, unknown>> => {
    if (action === 'prepare') {
      await r.stop();
      if (document.querySelector('[data-run-close]')) await click('[data-run-close]');
      const route = value as 'parts' | 'single-image' | 'split-image';
      await host.command({ type: 'new', name: '방송 출력 · ' + route, sourceType: route });
      await click('[data-step="prepare"]');
      if (route === 'parts')
        await host.command({ type: 'parts-start', expectedRevision: current().revision });
      else if (route === 'single-image') {
        await host.command({ type: 'import-image' });
        await until(() => !host.current()!.input!.busy);
        const d = host.current()!.input!.draft!;
        await host.command({
          type: 'input-apply',
          draftId: d.id,
          selection: {
            rect: { x: 0, y: 0, ...d.probe.size },
            masks: [],
            occluded: false,
            backgroundTolerance: null,
          },
        });
        await until(() => !host.current()!.input!.busy);
        await host.command({
          type: 'structure-start',
          expectedRevision: current().revision,
          completion: 'estimated',
        });
        await until(() => !host.current()!.structure!.busy);
        await host.command({ type: 'structure-apply', expectedRevision: current().revision });
      } else {
        await click('[data-split-load="example"]');
        await until(
          () => !host.current()!.split!.busy && document.querySelector('[data-split-prepare]'),
        );
        await click('[data-split-prepare]');
        await until(() => !host.current()!.split!.busy);
        await click('[data-split-apply]');
        await click('[data-split-close]');
      }
      const mouth = current().parameters.find((p) => p.previewKey === 'mouth')!;
      await host.command({
        type: 'expression-edit',
        expectedRevision: current().revision,
        operation: {
          kind: 'save',
          id: null,
          name: '방송 미소',
          values: [{ parameterId: mouth.id, value: mouth.max, locked: true }],
          transitionMs: 0,
          releaseMs: 100,
          release: 'live-input',
        },
      });
      const expression = current().expressions.at(-1)!;
      await host.command({
        type: 'expression-edit',
        expectedRevision: current().revision,
        operation: {
          kind: 'settings',
          value: { ...settings(current()), shortcuts: [expression.id, null, null] },
        },
      });
      await host.command({ type: 'save' });
      await r.configure(defaultRunPreferences());
      await click('[data-run-open]');
      await click('[data-run-start]');
      await until(() => r.active);
      await click('[data-output-start]');
      await until(() => document.querySelector('[data-output-state="SOURCE_READY"]'));
    } else if (action === 'edit') {
      if (document.querySelector('[data-run-edit]')) await click('[data-run-edit]');
      await host.command({
        type: 'edit',
        target: 'part-opacity',
        id: current().parts[0]!.id,
        parameterId: null,
        value: current().parts[0]!.opacity === 0.6 ? 0.35 : 0.6,
        expectedRevision: current().revision,
        groupId: null,
      });
    } else if (action === 'apply') {
      if (!(await r.applyChanges(host.current()!))) throw new Error('E_BROADCAST_APPLY');
    } else if (action === 'save') await host.command({ type: 'save' });
    else if (action === 'motion') r.player.play('all', true);
    else if (action === 'neutral') {
      r.player.stop();
      if (r.player.controls.snapshot().activeId) r.action('release');
      if (r.player.neutralHold) r.action('neutral');
      if (r.hidden) r.action('hide');
      await pause(200);
    } else if (action === 'expression') {
      r.player.stop();
      r.action('expression-1');
    } else if (action === 'hide') r.action('hide');
    else if (action === 'input-loss') {
      r.player.stop();
      r.player.controls.recoveryEnabled = true;
      const values = new Map(r.lease!.project.parameters.map((p) => [p.id, p.max]));
      r.player.feedCamera(values, performance.now());
      await pause(80);
    } else if (action === 'stop') await r.stop();
    else if (action === 'panel') {
      if (!document.querySelector('[data-run-panel]')) await click('[data-run-open]');
      document.querySelector('[data-broadcast-panel]')?.scrollIntoView({ block: 'start' });
    }
    await pause();
    return {
      active: r.active,
      hidden: r.hidden,
      lastAction: r.lastAction,
      runId: r.lease?.requestId ?? null,
      runRevision: r.lease?.revision ?? null,
      workRevision: current()?.revision,
      savedRevision: host.current()?.savedRevision,
      dirty: host.current()?.dirty,
      frame: r.player.frame(performance.now()).parameters,
      output: await window.studio.broadcast.view(),
      surfaces: r.surface.stats().live,
    };
  };
}

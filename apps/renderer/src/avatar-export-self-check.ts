import type {
  SessionView,
  SessionCommand,
  SessionReply,
} from '../../../packages/project-session/contracts';
import { NEUTRAL, type Parameters } from '../../../packages/scene-core';
import { AvatarRenderer } from '../../../packages/avatar-renderer';
import { clickCommittedControl } from './ui-check-control';
import { CONVERTER_VERSION } from '../../../packages/export-check/types';
export async function checkAvatarExportUI(host: {
  current: () => SessionView | null;
  command: (c: SessionCommand) => Promise<SessionReply>;
  settled: () => Promise<unknown>;
}) {
  const current = () => host.current()!.project!,
    pause = (ms = 60) => new Promise((r) => setTimeout(r, ms));
  let stage = 'prepare',
    requests = 0;
  const original = navigator.mediaDevices.getUserMedia;
  const verify = (v: unknown, code: string) => {
    if (!v) throw new Error(code);
  };
  const until = async (fn: () => unknown) => {
    const end = performance.now() + 180000;
    while (!fn()) {
      if (performance.now() > end) throw new Error('E_AVATAR_UI_TIMEOUT');
      await pause();
    }
  };
  const click = async (selector: string) => {
    stage = selector;
    window.editorFailureState = { avatarStage: stage };
    await clickCommittedControl(selector, host.current);
    await host.settled();
    await pause();
  };
  const set = async (selector: string, value: string) => {
    const e = document.querySelector<HTMLInputElement | HTMLSelectElement>(selector)!;
    verify(e, 'E_AVATAR_UI_CONTROL');
    if (e instanceof HTMLSelectElement) {
      e.value = value;
      e.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(e, value);
      e.dispatchEvent(new Event('input', { bubbles: true }));
    }
    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  };
  const artifacts: {
      route: string;
      label: string;
      original: string;
      converted: string;
      target: string;
    }[] = [],
    outputs: Record<string, unknown>[] = [],
    routes: Record<string, unknown>[] = [];
  Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
    configurable: true,
    value: async () => {
      requests++;
      throw new DOMException('Denied', 'NotAllowedError');
    },
  });
  try {
    for (const route of ['parts', 'single-image', 'split-image'] as const) {
      await host.command({ type: 'new', sourceType: route, name: '외부 아바타 · ' + route });
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
      const mouth = current().parameters.find((p) => p.previewKey === 'mouth')!,
        left = current().parameters.find((p) => p.previewKey === 'eye_left')!;
      await host.command({
        type: 'expression-edit',
        expectedRevision: current().revision,
        operation: {
          kind: 'save',
          id: null,
          name: '내보내기 표정',
          values: [
            { parameterId: mouth.id, value: mouth.max, locked: true },
            { parameterId: left.id, value: left.min, locked: true },
          ],
          transitionMs: 100,
          releaseMs: 200,
          release: 'live-input',
        },
      });
      await click('[data-file-output-open]');
      await click('[data-file-tab="target"]');
      await click('[data-export-remember]');
      await until(() =>
        current().exportProfiles.some((p) => p.converterVersion === CONVERTER_VERSION),
      );
      await click('[data-export-inspect]');
      await until(() => !!document.querySelector('[data-export-result]'));
      verify(
        document.querySelector('[data-export-result]')?.getAttribute('data-export-status') ===
          'WARNING',
        'E_AVATAR_PREFLIGHT',
      );
      await click('[data-export-ack]');
      await until(() =>
        document.querySelector('[data-export-ack]')?.textContent?.includes('확인됨'),
      );
      const options = {
        targetId: 'inochi-session-0.8.7-inp',
        parameterMap: current().exportProfiles[0]!.parameterMap,
      };
      const build = async () => {
        await click('[data-avatar-prepare]');
        await until(
          () =>
            !!document.querySelector('[data-avatar-ticket]') &&
            !document.querySelector<HTMLButtonElement>('[data-avatar-prepare]')!.disabled,
        );
        verify(
          document.querySelector<HTMLButtonElement>('[data-avatar-save]')!.disabled,
          'E_AVATAR_REVIEW_REQUIRED',
        );
      };
      await build();
      const ticket = document.querySelector<HTMLElement>('[data-avatar-ticket]')!,
        ticketId = ticket.dataset.avatarId!;
      verify(ticketId, 'E_AVATAR_TICKET');
      const originalSceneReply = await window.studio.compatibility.inspect(
        'working',
        current().projectId,
        current().revision,
        options,
      );
      verify(originalSceneReply.ok && originalSceneReply.result?.scene, 'E_AVATAR_SOURCE_SCENE');
      const sourceScene = originalSceneReply.result!.scene!;
      // Original and converted references use the same canvas and explicit test inputs.
      const canvas = document.createElement('canvas');
      canvas.width = 480;
      canvas.height = 600;
      const sourceRenderer = new AvatarRenderer(canvas, sourceScene);
      await sourceRenderer.load(document.baseURI);
      const states: { label: string; values: Parameters; expression: string | null }[] = [
        { label: 'neutral', values: { ...NEUTRAL }, expression: null },
        {
          label: 'eyes-closed',
          values: { ...NEUTRAL, eye_left: 0, eye_right: 0 },
          expression: null,
        },
        {
          label: 'middle',
          values: { ...NEUTRAL, eye_left: 0.5, eye_right: 0.5, mouth: 0.5 },
          expression: null,
        },
        { label: 'mouth-open', values: { ...NEUTRAL, mouth: 1 }, expression: null },
        {
          label: 'head-negative',
          values: { ...NEUTRAL, head_yaw: -1, head_roll: -1 },
          expression: null,
        },
        {
          label: 'head-positive',
          values: { ...NEUTRAL, head_yaw: 1, head_roll: 1 },
          expression: null,
        },
        {
          label: 'expression',
          values: { ...NEUTRAL, eye_left: 0, mouth: 1 },
          expression: current().expressions.at(-1)!.id,
        },
      ];
      const targetCanvas = document.createElement('canvas');
      targetCanvas.width = 1024;
      targetCanvas.height = 1024;
      let targetRenderer: AvatarRenderer | null = null;
      const captureStates = async (sourceRenderer: AvatarRenderer, version: number) => {
        for (const state of states) {
          for (const [key, value] of Object.entries(state.values))
            await set('[data-avatar-input="' + key + '"]', String(value));
          if (state.expression) await set('[data-avatar-expression]', state.expression);
          await until(
            () =>
              document.querySelector<HTMLCanvasElement>('[data-avatar-preview]')?.dataset
                .nativePose ===
              JSON.stringify(state.values) + ':' + state.expression,
          );
          sourceRenderer.draw(state.values);
          const native = await window.studio.avatar.preview(
            document.querySelector<HTMLElement>('[data-avatar-ticket]')!.dataset.avatarId!,
            state.values,
            state.expression,
          );
          verify(native.ok && native.scene, 'E_NATIVE_TARGET_REFERENCE');
          if (!targetRenderer) {
            targetRenderer = new AvatarRenderer(targetCanvas, native.scene!, 'mipmapped');
            await targetRenderer.load(document.baseURI);
          } else await targetRenderer.setNativeScene(native.scene!, document.baseURI);
          targetRenderer.draw(NEUTRAL, undefined, 0.5);
          const target = targetCanvas.toDataURL('image/png');
          artifacts.push({
            route,
            label: (version === 1 ? '' : 'v2-') + state.label,
            target,
            original: canvas.toDataURL('image/png'),
            converted: (() => {
              const output: { data: string | null } = { data: null };
              document
                .querySelector('[data-avatar-preview]')!
                .dispatchEvent(new CustomEvent('avatar-capture', { detail: output }));
              verify(output.data, 'E_AVATAR_CAPTURE');
              return output.data!;
            })(),
          });
        }
      };
      await captureStates(sourceRenderer, 1);

      // Reinspection above invalidated only the preflight grant, not this immutable compiled input.
      await click('[data-avatar-reviewed]');
      await click('[data-avatar-save]');
      await until(() =>
        document.querySelector('[data-avatar-message]')?.textContent?.includes('INP 저장 완료'),
      );
      const first = (await window.studio.avatar.list()).receipts![0]!;
      verify(!first.confirmation, 'E_AVATAR_NO_AUTO_CONFIRM');
      outputs.push({ route, version: 1, ...first });
      await set('[data-avatar-version]', '0.9.0');
      await click('[data-avatar-confirm="' + first.id + '"]');
      await until(() =>
        document
          .querySelector('[data-avatar-message]')
          ?.textContent?.includes('버전이 0.8.7과 다릅니다'),
      );
      await set('[data-avatar-version]', '0.8.7');
      await click('[data-avatar-confirm="' + first.id + '"]');
      await until(() =>
        document.querySelector('[data-avatar-history]')?.textContent?.includes('사용자 외부 확인'),
      );
      await host.command({
        type: 'edit',
        target: 'part-opacity',
        id: current().parts[0]!.id,
        parameterId: null,
        value: 0.92,
        expectedRevision: current().revision,
        groupId: null,
      });
      await until(
        () =>
          document.querySelector('[data-export-result]')?.getAttribute('data-export-status') ===
          'STALE',
      );
      verify(
        (await window.studio.avatar.save(ticketId, ticket.dataset.avatarSha!)).errorCode ===
          'E_AVATAR_STALE',
        'E_AVATAR_STALE_FILE',
      );
      await click('[data-avatar-refresh]');
      await until(() =>
        document.querySelector('[data-avatar-history]')?.textContent?.includes('과거 결과 기록'),
      );
      verify(
        (await window.studio.avatar.list()).receipts?.find((v) => v.id === first.id)?.current ===
          false,
        'E_AVATAR_CONFIRM_STALE',
      );
      await click('[data-export-inspect]');
      await until(
        () =>
          document.querySelector('[data-export-result]')?.getAttribute('data-export-status') ===
          'WARNING',
      );
      await click('[data-export-ack]');
      await until(() =>
        document.querySelector('[data-export-ack]')?.textContent?.includes('확인됨'),
      );
      await build();
      const secondSource = await window.studio.compatibility.inspect(
        'working',
        current().projectId,
        current().revision,
        options,
      );
      verify(secondSource.ok && secondSource.result?.scene, 'E_AVATAR_UPDATED_SOURCE');
      sourceRenderer.dispose();
      const secondRenderer = new AvatarRenderer(canvas, secondSource.result!.scene!);
      await secondRenderer.load(document.baseURI);
      await captureStates(secondRenderer, 2);
      secondRenderer.dispose();
      secondRenderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
      (targetRenderer as AvatarRenderer | null)?.dispose();
      (targetRenderer as AvatarRenderer | null)?.gl
        .getExtension('WEBGL_lose_context')
        ?.loseContext();
      targetRenderer = null;
      await click('[data-avatar-reviewed]');
      await click('[data-avatar-save]');
      await until(() =>
        document.querySelector('[data-avatar-message]')?.textContent?.includes('INP 저장 완료'),
      );
      const latest = (await window.studio.avatar.list()).receipts![0]!;
      verify(
        latest.sha256 !== first.sha256 && !latest.confirmation && latest.current,
        'E_AVATAR_REEXPORT',
      );
      outputs.push({ route, version: 2, ...latest });
      await click('.file-output-dialog .close');
      await host.command({ type: 'save' });
      const recent = host.current()!.recent[0]!.id;
      await host.command({ type: 'close' });
      await host.command({ type: 'recent', id: recent });
      verify(
        current().exportProfiles.some((p) => p.converterVersion === CONVERTER_VERSION),
        'E_AVATAR_PROFILE_ROUNDTRIP',
      );
      verify(
        (await window.studio.avatar.list()).receipts?.find((v) => v.id === latest.id)?.current,
        'E_AVATAR_SAVED_CONTENT_CURRENT',
      );
      routes.push({
        route,
        passed: true,
        actualRoutePreparation: true,
        conversionPreview: true,
        referenceStates: states.length,
        reviewRequired: true,
        realINPWrite: true,
        staleRejected: true,
        reexport: true,
        oldConfirmationStale: true,
        targetVersionRejected: true,
        settingsReopened: true,
      });
      if (route !== 'split-image') await host.command({ type: 'close' });
    }
    await click('[data-file-output-open]');
    await click('[data-file-tab="target"]');
    await click('[data-export-inspect]');
    await until(
      () =>
        document.querySelector('[data-export-result]')?.getAttribute('data-export-status') ===
        'WARNING',
    );
    await click('[data-export-ack]');
    await until(() => document.querySelector('[data-export-ack]')?.textContent?.includes('확인됨'));
    await click('[data-avatar-prepare]');
    await click('[data-avatar-cancel]');
    await until(() =>
      document.querySelector('[data-avatar-message]')?.textContent?.includes('취소 완료'),
    );
    verify(!document.querySelector('[data-avatar-ticket]'), 'E_AVATAR_CANCELLED_UI');
    await click('[data-avatar-prepare]');
    await until(() => !!document.querySelector('[data-avatar-ticket]'));
    await until(
      () =>
        document.querySelector<HTMLCanvasElement>('[data-avatar-preview]')?.dataset.nativePose ===
        JSON.stringify(NEUTRAL) + ':null',
    );
    document.querySelector('[data-avatar-ticket]')!.scrollIntoView({ block: 'start' });
    return {
      passed: true,
      routes,
      outputs,
      artifacts,
      deviceRequests: requests,
      physicalDevicesOpened: false,
      programmaticConfirmationOnly: true,
      actualExternalRuntimeVerified: false,
      m0: 'HOLD',
      cancelledBuild: true,
    };
  } finally {
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
      configurable: true,
      value: original,
    });
  }
}

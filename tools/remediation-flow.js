window.remediationFlow = async (route, version) => {
  const s = window.studio,
    pause = (ms) => new Promise((r) => setTimeout(r, ms)),
    assert = (value, code) => {
      if (!value) throw Error(code);
    },
    view = () => s.projects.view();
  const click = async (selector) => {
    const element = document.querySelector(selector);
    assert(element, 'E_LINEAR_CONTROL');
    element.click();
    await pause(150);
  };
  const wait = async (fn) => {
    const end = Date.now() + 30000;
    while (!(await fn())) {
      if (Date.now() > end) throw Error('E_LINEAR_WAIT');
      await pause(50);
    }
  };
  if (version === 1) {
    // The app's initial three-route UI preparation already created and saved these exact projects.
    // Reopen that project rather than creating a fourth unsaved project after the test dialog queue is consumed.
    await window.broadcastCheckStep('stop');
    if (document.querySelector('[data-run-close]')) await click('[data-run-close]');
    const recent = (await view()).recent.find((item) => item.sourceType === route);
    assert(recent, 'E_LINEAR_PREPARED_PROJECT');
    await s.projects.command({ type: 'close' });
    await s.projects.command({ type: 'recent', id: recent.id });
    await pause(250);
  }
  let v = await view(),
    p = v.project;
  assert(p.sourceType === route, 'E_LINEAR_ROUTE');
  const id = p.projectId;
  const originalAssets = p.assets.map((a) => a.fingerprint.sha256);
  await window.broadcastCheckStep('stop');
  if (document.querySelector('[data-run-close]')) await click('[data-run-close]');
  const restored = await s.projects.command({
    type: 'edit',
    target: 'part-opacity',
    id: p.parts[0].id,
    parameterId: null,
    value: 1,
    expectedRevision: p.revision,
    groupId: null,
  });
  assert(!restored.view.errorCode, restored.view.errorCode ?? 'E_LINEAR_RESTORE');
  p = (await view()).project;
  if (version === 1) {
    const mouth = p.parameters.find((item) => item.previewKey === 'mouth'),
      eye = p.parameters.find((item) => item.previewKey === 'eye_left');
    assert(mouth && eye, 'E_LINEAR_EXPRESSION_PARAMETERS');
    const expression = await s.projects.command({
      type: 'expression-edit',
      expectedRevision: p.revision,
      operation: {
        kind: 'save',
        id: null,
        name: '선형 검증 눈·입 표정',
        values: [
          { parameterId: mouth.id, value: mouth.max, locked: true },
          { parameterId: eye.id, value: eye.min, locked: true },
        ],
        transitionMs: 100,
        releaseMs: 200,
        release: 'live-input',
      },
    });
    assert(!expression.view.errorCode, expression.view.errorCode ?? 'E_LINEAR_EXPRESSION');
    p = (await view()).project;
    const configured = await s.projects.command({
      type: 'expression-edit',
      expectedRevision: p.revision,
      operation: {
        kind: 'settings',
        value: { ...p.expressionSettings, shortcuts: [p.expressions.at(-1).id, null, null] },
      },
    });
    assert(!configured.view.errorCode, configured.view.errorCode ?? 'E_LINEAR_EXPRESSION_SETTINGS');
    p = (await view()).project;
  }
  let roleCorrectionVerified = false;
  if (route === 'split-image') {
    const part = p.parts[0],
      role = part.role;
    await s.projects.command({
      type: 'edit',
      target: 'part-role',
      id: part.id,
      parameterId: null,
      value: role === 'custom' ? 'accessory' : 'custom',
      expectedRevision: p.revision,
      groupId: null,
    });
    p = (await view()).project;
    await s.projects.command({
      type: 'edit',
      target: 'part-role',
      id: part.id,
      parameterId: null,
      value: role,
      expectedRevision: p.revision,
      groupId: null,
    });
    p = (await view()).project;
    assert(p.parts.find((item) => item.id === part.id).role === role, 'E_LINEAR_ROLE_REPAIR');
    roleCorrectionVerified = true;
  }
  const beforeCorrection = p.revision,
    appearance =
      p.parts.find((item) => item.role === 'accessory') ??
      p.parts.find((item) => item.role === 'hair-front') ??
      p.parts.find((item) => item.role === 'body') ??
      p.parts.find((item) => item.role === 'mouth') ??
      p.parts[0];
  const opacityValue = version === 1 ? 0.98 : 0.96;
  const opacity = await s.projects.command({
    type: 'edit',
    target: 'part-opacity',
    id: appearance.id,
    parameterId: null,
    value: opacityValue,
    expectedRevision: p.revision,
    groupId: null,
  });
  assert(!opacity.view.errorCode, opacity.view.errorCode ?? 'E_LINEAR_CORRECTION');
  p = (await view()).project;
  assert(
    p.revision > beforeCorrection &&
      p.parts.find((item) => item.id === appearance.id).opacity === opacityValue,
    'E_LINEAR_CORRECTION_NOT_APPLIED',
  );
  if (!p.parts[0].library) {
    const moved = await s.projects.command({
      type: 'edit',
      target: 'part-translate-x',
      id: p.parts[0].id,
      parameterId: null,
      value: p.parts[0].localTransform[4] + version,
      expectedRevision: p.revision,
      groupId: null,
    });
    assert(!moved.view.errorCode, moved.view.errorCode ?? 'E_LINEAR_TRANSLATION');
  }
  await s.projects.command({ type: 'save' });
  v = await view();
  const savedRevision = v.project.revision,
    recent = v.recent[0].id;
  assert(!v.errorCode, v.errorCode ?? 'E_LINEAR_SAVE_ERROR');
  assert(!v.dirty && v.savedRevision === savedRevision, 'E_LINEAR_SAVED');
  await s.projects.command({ type: 'close' });
  await s.projects.command({ type: 'recent', id: recent });
  await pause(250);
  v = await view();
  p = v.project;
  assert(
    p.projectId === id &&
      p.revision === savedRevision &&
      JSON.stringify(p.assets.map((a) => a.fingerprint.sha256)) === JSON.stringify(originalAssets),
    'E_LINEAR_REOPEN',
  );
  await click('[data-run-open]');
  await click('[data-run-start]');
  await wait(async () => (await window.broadcastCheckStep('state')).active);
  let state = await window.broadcastCheckStep('state');
  assert(state.runRevision === p.revision, 'E_LINEAR_RUN_REVISION');
  await s.broadcast.start(state.runId);
  const settings = {
    format: 'png',
    width: 1024,
    height: 1024,
    transparent: true,
    background: '#f5f2ed',
    scale: 1,
    x: 0,
    y: 0,
    crop: { left: 0, right: 0, top: 0, bottom: 0 },
    pose: 'neutral',
    expressionId: null,
  };
  const image = await s.image.prepare({
    id: crypto.randomUUID(),
    source: 'working',
    projectId: id,
    revision: p.revision,
    settings,
    live: null,
  });
  assert(image.ok && image.ticket, 'E_LINEAR_PNG');
  const png = await s.image.save(image.ticket.id);
  assert(png.ok && png.receipt, 'E_LINEAR_PNG_SAVE');
  await s.image.release(image.ticket.id);
  // INP conversion intentionally defers while executing. Follow the actual product stop/export/restart policy.
  await window.broadcastCheckStep('stop');
  const options = {
    targetId: 'inochi-session-0.8.7-inp',
    parameterMap: p.parameters.map((item) => ({
      parameterId: item.id,
      targetName: item.previewKey ?? item.semantic ?? item.id,
    })),
  };
  let check = await s.compatibility.inspect('working', id, p.revision, options);
  assert(check.ok && check.result.status !== 'BLOCKED', 'E_LINEAR_PREFLIGHT');
  if (check.result.status === 'WARNING')
    check = await s.compatibility.acknowledge(
      check.result.id,
      check.result.signature,
      check.result.warningScope,
      options,
    );
  assert(check.ok, 'E_LINEAR_ACK');
  const avatar = await s.avatar.prepare(crypto.randomUUID(), check.result.id, options, true);
  assert(avatar.ok && avatar.ticket, avatar.errorCode ?? 'E_LINEAR_AVATAR');
  const artifacts = await RemediationRef.references(
    avatar.ticket.id,
    check.result.scene,
    p.expressions.at(-1).id,
  );
  const written = await s.avatar.save(avatar.ticket.id, avatar.ticket.sha256);
  assert(written.ok && written.receipt, written.errorCode ?? 'E_LINEAR_INP_SAVE');
  const current = (await s.avatar.list()).receipts.find((item) => item.id === written.receipt.id);
  assert(current.current && !current.confirmation, 'E_LINEAR_CURRENT');
  const history = (await s.avatar.list()).receipts.filter(
    (item) => item.basis.projectId === id && item.id !== written.receipt.id,
  );
  if (version === 2)
    assert(history.length > 0 && history.every((item) => !item.current), 'E_LINEAR_STALE_HISTORY');
  await s.projects.command({ type: 'save' });
  await click('[data-run-start]');
  await wait(async () => (await window.broadcastCheckStep('state')).active);
  state = await window.broadcastCheckStep('state');
  await s.broadcast.start(state.runId);
  return {
    passed: true,
    route,
    version,
    projectId: id,
    createdBySameAppThreeRoutePreparation: true,
    sourceRevision: p.revision,
    savedRevision,
    runRevision: state.runRevision,
    sourceAssetsUnchanged: true,
    sameProjectReopened: true,
    correctionApplied: true,
    roleCorrectionVerified,
    png: png.receipt,
    avatar: written.receipt,
    artifacts: artifacts.map((item) => ({
      ...item,
      route,
      label: (version === 2 ? 'v2-' : '') + item.label,
    })),
    olderResultsStale: version === 2,
    programmaticReview: true,
    humanObservation: false,
    physicalDevicesOpened: false,
    output: state.output,
  };
};

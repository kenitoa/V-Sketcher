// Completion evidence controls. No network, camera, signing or publication capability.
import { assessRelease, requiredChecks } from './release-controls.mjs';
export const pendingTasks = Object.freeze(
  [
    ['T-260', 'physical2d', ['T-267', 'T-270']],
    ['T-267', 'physical2d', []],
    ['T-270', 'integration', ['T-267']],
    ['T-274', 'endurance', ['T-267']],
    ['T-275', 'cycles', []],
    ['T-276', 'latency', ['T-267']],
    ['T-277', 'load', ['T-267']],
    ['T-280', 'risk', ['T-270', 'T-274', 'T-275', 'T-276', 'T-277']],
    ['T-282', 'usability', []],
    ['T-283', 'usability', ['T-282']],
    ['T-284', 'guidance', ['T-282', 'T-283']],
    ['T-288', 'cleanWindows', []],
    ['T-290', 'trial', ['T-288']],
    ['T-291', 'fixes', ['T-290']],
    ['T-295', 'release', ['T-260', 'T-280', 'T-284', 'T-288', 'T-291']],
    ['T-296', 'candidate', ['T-295']],
    ['T-297', 'distribution', ['T-296']],
    ['T-298', 'feedback', ['T-297']],
    ['T-299', 'update', ['T-298']],
    ['T-307', 'threeD', []],
  ].map(([id, kind, dependsOn]) =>
    Object.freeze({ id, kind, dependsOn: Object.freeze(dependsOn) }),
  ),
);
export const routes = Object.freeze(['parts', 'single-image', 'split-image']);
export function emptyMeasurements(kind) {
  const templates = {
    physical2d: {
      cameraModels: null,
      microphoneModels: null,
      frames: null,
      validFaceRatio: null,
      cameraUnplugTrials: null,
      microphoneUnplugTrials: null,
      lossMaxMs: null,
      neutralMaxMs: null,
      recoveryMaxMs: null,
      actualHuman: false,
      permissionDenied: false,
      deviceBusy: false,
      noDevice: false,
      multipleFaces: false,
      noiseAndSpeechSeparated: false,
      unrelatedSaveAndOutputRemainUsable: false,
      rawMediaStored: null,
    },
    integration: {
      initialACPassed: null,
      initialFTPassed: null,
      openCriticalFailures: null,
      openQualityFailures: null,
      affectedRoutesRechecked: false,
      physicalTrackingVerified: false,
    },
    endurance: {
      runs: routes.map((route) => ({
        route,
        durationMs: null,
        samples: null,
        actualCamera: false,
        actualMicrophone: false,
        obsX264Recording: false,
        frameMetricsRecorded: false,
        cpuMemoryGpuTemperatureRecorded: false,
        abnormalStops: null,
        recoveryFailures: null,
        rssGrowthMiB: null,
        baselineRssMiB: null,
      })),
    },
    cycles: {
      cycles: null,
      actualDevices: false,
      processTreeMeasured: false,
      gpuMeasured: false,
      abnormalTemporaryFilesChecked: false,
      projectSwitches: false,
      leakedTracks: null,
      leakedAudioContexts: null,
      unboundedMemoryGrowth: null,
      unreclaimedTemporaryFiles: null,
    },
    latency: {
      softwareMs: [],
      independentMs: [],
      referenceFPS: null,
      actualCamera: false,
      obsDrawCompleteAck: false,
      frameIdsCorrelated: false,
      clockOffsetsMeasured: false,
      independentPhysicalMeasurement: false,
      missingRatio: null,
      stallsOver100ms: null,
    },
    load: {
      distinctInputs: null,
      repetitions: null,
      allRoutes: false,
      actualDevices: false,
      concurrentOBS: false,
      maximumSupportedInputs: false,
      qualityRestore: false,
      cancelControlsResponsive: false,
      analysisP95Ms: null,
      cancelP95Ms: null,
      criticalFailures: null,
    },
    risk: {
      openDataLoss: null,
      openPrivacyExposure: null,
      openExternalRuntimeFailure: null,
      openPerformanceFailure: null,
      currentCandidateReviewed: false,
    },
    guidance: {
      observedIssues: null,
      reobservedNovices: null,
      beforeAfterLinked: false,
      changedBuildLinked: false,
      sameTasksReobserved: false,
      unresolvedBlockingGuidance: null,
    },
    cleanWindows: {
      freshProvisionedWindows: false,
      provisionReceiptVerified: false,
      developerToolsAbsent: false,
      installPassed: false,
      updatePassed: false,
      firstRunPassed: false,
      frozenWorkerInsideBundle: false,
      unicodeSpacePath: false,
      projectCopyPreserved: false,
      protectionsIntact: false,
      securityBypasses: null,
    },
    trial: {
      actualRecipients: null,
      classifiedEnvironments: null,
      consentedFeedback: false,
      installationCovered: false,
      firstUseCovered: false,
      broadcastCovered: false,
      exportCovered: false,
      rightsAndTrialSafetyReviewed: false,
    },
    fixes: {
      actualTrialIncidentsLinked: false,
      reproducedBeforeFix: false,
      affectedRoutesRetested: false,
      externalTargetRetested: false,
      openRequiredTrialDefects: null,
    },
    release: {
      releaseChecks: requiredChecks.map((id) => ({
        id,
        status: 'NOT_RUN',
        candidateSha256: null,
        evidence: [],
      })),
      openM0Revalidations: null,
      allACFTPassed: false,
      allArtworkGatesPassed: false,
      signedCandidate: false,
      rightsReviewed: false,
    },
    candidate: {
      fullPackagedRegression: false,
      allInventoriedBytesVerified: false,
      actualOBSAllRoutes: false,
      officialExternalTarget: false,
      versionMatched: false,
      signedCandidate: false,
      previousFrozenCandidateUnchanged: false,
      packageMismatches: null,
    },
    distribution: {
      actualDistributionPerformed: false,
      downloadVerified: false,
      supportInformationLive: false,
      releaseNotesLive: false,
      installationPathVerified: false,
      signatureVerified: false,
      unresolvedReleaseBlockers: null,
    },
    feedback: {
      observationHours: null,
      afterActualRelease: false,
      consentRespected: false,
      environmentClassification: false,
      noviceObstaclesClassified: false,
      failedCasesIncluded: false,
    },
    update: {
      actualPostReleaseIncident: false,
      fixReproducedAndVerified: false,
      regressionPassed: false,
      recoveryInstructions: false,
      releaseNotes: false,
      actualUpdateProvided: false,
      downloadVerified: false,
      unresolvedPriorityIncidents: null,
    },
    threeD: {
      cameraModels: null,
      microphoneModels: null,
      actionsPerPart: null,
      correctPartRatio: null,
      validFaceRatio: null,
      validBodyAndArmsRatio: null,
      actualHuman: false,
      actualSpeech: false,
      actualOBS: false,
      transparentAvatarOnly: false,
      faceEyesMouthTorsoBothArms: false,
      sourcePartPreparationVerified: false,
      lossRecoveryVerified: false,
      rawMediaStored: null,
      oppositePartFailures: null,
      tearsOrHoles: null,
    },
  };
  if (!templates[kind]) throw Error('E_COMPLETION_KIND');
  return structuredClone(templates[kind]);
}
const sha = (v) => typeof v === 'string' && /^[a-f0-9]{64}$/.test(v);
const finite = (v) => typeof v === 'number' && Number.isFinite(v) && v >= 0;
const need = (ok, code) => {
  if (!ok) throw Error(code);
};
export function percentile(values, q) {
  need(values.length > 0 && values.every(finite), 'E_COMPLETION_SAMPLES');
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.max(0, Math.ceil(q * sorted.length) - 1)];
}
export function safeRelative(value) {
  return (
    typeof value === 'string' &&
    /^evidence\/[A-Za-z0-9._/-]+$/.test(value) &&
    value.split('/').every((v) => v && v !== '.' && v !== '..')
  );
}
export function privacyCheck(value) {
  const walk = (v, key = '') => {
    need(
      ![
        'password',
        'accessToken',
        'deviceId',
        'groupId',
        'cameraFrame',
        'pcm',
        'email',
        'contact',
        'participantName',
      ].includes(key),
      'E_COMPLETION_PRIVATE_FIELD',
    );
    if (typeof v === 'string')
      need(
        v.length <= 2000 &&
          !/(?:(?<![A-Za-z])[A-Za-z]:[\\/]|\\\\|data:(?:image|audio)|Bearer\s|https?:\/\/[^\s]*\?|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)/i.test(
            v,
          ),
        'E_COMPLETION_PRIVATE_VALUE',
      );
    else if (Array.isArray(v)) {
      need(v.length <= 100000, 'E_COMPLETION_SIZE');
      v.forEach((x) => walk(x));
    } else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, k);
  };
  walk(value);
  return true;
}
function date(value, now) {
  const time = typeof value === 'string' ? Date.parse(value) : NaN;
  need(Number.isFinite(time) && time <= now + 60000, 'E_COMPLETION_TIME');
  return time;
}
function common(record, candidate, now) {
  need(record?.format === '2dsketcher-completion/1', 'E_COMPLETION_FORMAT');
  privacyCheck(record);
  const allowed =
    record.kind === 'novice-session'
      ? [
          'format',
          'kind',
          'candidate',
          'participantId',
          'firstRoute',
          'consent',
          'novice',
          'origin',
          'observerRole',
          'startedAt',
          'finishedAt',
          'collectedAt',
          'events',
          'segmentsMs',
          'corrections',
          'correctedParts',
          'followups',
          'outcome',
        ]
      : [
          'format',
          'kind',
          'candidate',
          'taskId',
          'origin',
          'collectedAt',
          'review',
          'artifacts',
          'measurements',
        ];
  need(
    Object.keys(record).every((key) => allowed.includes(key)),
    'E_COMPLETION_FIELDS',
  );
  need(
    record.candidate?.version === candidate.version &&
      sha(record.candidate?.sha256) &&
      record.candidate.sha256 === candidate.sha256,
    'E_COMPLETION_CANDIDATE',
  );
  need(['instrumented', 'direct-observation'].includes(record.origin), 'E_COMPLETION_PROVENANCE');
  date(record.collectedAt, now);
}
export function evaluateStudy(records, candidate, now = Date.now()) {
  const seen = new Set(),
    groups = Object.fromEntries(routes.map((r) => [r, []]));
  for (const r of records) {
    common(r, candidate, now);
    need(r.kind === 'novice-session', 'E_COMPLETION_STUDY');
    need(
      /^U29-\d{3,4}$/.test(r.participantId) && !seen.has(r.participantId),
      'E_COMPLETION_PARTICIPANT',
    );
    seen.add(r.participantId);
    need(
      routes.includes(r.firstRoute) &&
        r.consent === true &&
        r.novice === true &&
        r.origin === 'direct-observation',
      'E_COMPLETION_STUDY_ORIGIN',
    );
    need(r.observerRole === 'independent-observer', 'E_COMPLETION_OBSERVER');
    const start = date(r.startedAt, now),
      end = date(r.finishedAt, now);
    need(end >= start, 'E_COMPLETION_TIME');
    need(
      Array.isArray(r.events) &&
        r.events.length > 0 &&
        r.events.every((e) => finite(e.elapsedMs) && e.elapsedMs <= end - start + 5000),
      'E_COMPLETION_EVENTS',
    );
    const times = r.events.map((e) => e.elapsedMs);
    need(
      times.every((v, i) => i === 0 || v >= times[i - 1]),
      'E_COMPLETION_EVENTS',
    );
    need(
      ['wait', 'active', 'blocked', 'pause'].every((k) => finite(r.segmentsMs?.[k])),
      'E_COMPLETION_SEGMENTS',
    );
    need(Object.keys(r.segmentsMs).length === 4, 'E_COMPLETION_SEGMENTS');
    need(
      Math.abs(Object.values(r.segmentsMs).reduce((a, b) => a + b, 0) - (end - start)) <= 5000,
      'E_COMPLETION_SEGMENTS',
    );
    need(
      Number.isInteger(r.corrections) &&
        r.corrections >= 0 &&
        Number.isInteger(r.correctedParts) &&
        r.correctedParts >= 0,
      'E_COMPLETION_CORRECTIONS',
    );
    need(
      r.events.filter((e) => e.kind === 'correction').length === r.corrections &&
        new Set(r.events.filter((e) => e.kind === 'correction').map((e) => e.part)).size ===
          r.correctedParts,
      'E_COMPLETION_CORRECTIONS',
    );
    need(['success', 'blocked', 'abandoned'].includes(r.outcome), 'E_COMPLETION_OUTCOME');
    const facts = Object.fromEntries(
      ['first-motion', 'saved-reopened', 'obs-received', 'independent-runtime'].map((kind) => [
        kind,
        r.events.find((e) => e.kind === kind && e.outcome === 'success')?.elapsedMs ?? null,
      ]),
    );
    const assisted = r.events.some((e) => e.kind === 'hint' || e.kind === 'proxy-click');
    const unassisted = r.outcome === 'success' && !assisted && Object.values(facts).every(finite);
    const independentTimes = Object.fromEntries(
      Object.entries(facts).map(([kind, at]) => [
        kind,
        finite(at) &&
        !r.events.some((e) => ['hint', 'proxy-click'].includes(e.kind) && e.elapsedMs <= at)
          ? at
          : null,
      ]),
    );
    const firstWindowEnded = now - start >= 7 * 86400000;
    const saved = r.events.find((e) => e.kind === 'saved-reopened' && e.outcome === 'success');
    const savedAt = saved ? start + saved.elapsedMs : null;
    const repeatWindowEnded = savedAt !== null && now - savedAt >= 14 * 86400000;
    const follow = r.followups ?? [];
    need(Array.isArray(follow), 'E_COMPLETION_FOLLOWUP');
    let reused = false;
    for (const f of follow) {
      const at = date(f.at, now);
      need(
        at >= end && ['reopened-and-reused', 'failed', 'not-used'].includes(f.outcome),
        'E_COMPLETION_FOLLOWUP',
      );
      if (
        savedAt !== null &&
        at - savedAt >= 14 * 86400000 &&
        f.outcome === 'reopened-and-reused' &&
        f.directObservation === true
      )
        reused = true;
    }
    groups[r.firstRoute].push({
      id: r.participantId,
      unassisted,
      firstWindowEnded,
      repeatWindowEnded,
      reused,
      corrections: r.corrections,
      facts: independentTimes,
    });
  }
  const summaries = routes.map((route) => {
    const rows = groups[route];
    return {
      route,
      participants: rows.length,
      closedFirstWindow: rows.filter((r) => r.firstWindowEnded).length,
      unassisted: rows.filter((r) => r.unassisted && r.firstWindowEnded).length,
      firstMotion: rows.filter((r) => r.firstWindowEnded && finite(r.facts['first-motion'])).length,
      firstMotionMedianMs: rows.some((r) => finite(r.facts['first-motion']))
        ? percentile(
            rows.filter((r) => finite(r.facts['first-motion'])).map((r) => r.facts['first-motion']),
            0.5,
          )
        : null,
      obs: rows.filter((r) => r.firstWindowEnded && finite(r.facts['obs-received'])).length,
      obsMedianMs: rows.some((r) => finite(r.facts['obs-received']))
        ? percentile(
            rows.filter((r) => finite(r.facts['obs-received'])).map((r) => r.facts['obs-received']),
            0.5,
          )
        : null,
      external: rows.filter((r) => r.firstWindowEnded && finite(r.facts['independent-runtime']))
        .length,
      correctionMedian: rows.length
        ? percentile(
            rows.map((r) => r.corrections),
            0.5,
          )
        : null,
      correctionP90: rows.length
        ? percentile(
            rows.map((r) => r.corrections),
            0.9,
          )
        : null,
      closedRepeatWindow: rows.filter((r) => r.repeatWindowEnded).length,
      reused: rows.filter((r) => r.repeatWindowEnded && r.reused).length,
    };
  });
  const passed = summaries.every(
    (r) =>
      r.participants >= 10 &&
      r.closedFirstWindow === r.participants &&
      r.firstMotion / r.participants >= 0.8 &&
      r.firstMotionMedianMs <= 600000 &&
      r.obs / r.participants >= 0.8 &&
      r.obsMedianMs <= 1200000 &&
      r.external / r.participants >= 0.8 &&
      r.correctionMedian <= 3 &&
      r.correctionP90 <= 8 &&
      r.closedRepeatWindow === r.participants &&
      r.reused / r.participants >= 0.6,
  );
  return {
    passed,
    participants: records.length,
    routes: summaries,
    identityIndependentlyCertified: false,
    source: 'operator-attested direct observation; no video or voice collected',
  };
}
export function evaluateReceipt(r, candidate, now = Date.now()) {
  common(r, candidate, now);
  const task = pendingTasks.find((t) => t.id === r.taskId);
  need(task && r.kind === task.kind, 'E_COMPLETION_TASK');
  need(
    r.review?.verdict === 'PASS' &&
      ['independent-observer', 'test-operator'].includes(r.review?.role),
    'E_COMPLETION_REVIEW',
  );
  need(
    Array.isArray(r.artifacts) &&
      r.artifacts.length > 0 &&
      r.artifacts.every((a) => safeRelative(a.path) && sha(a.sha256)),
    'E_COMPLETION_ARTIFACT',
  );
  const m = r.measurements ?? {},
    yes = (...keys) => keys.every((k) => m[k] === true),
    zero = (...keys) => keys.every((k) => m[k] === 0),
    atLeast = (v, min) => finite(v) && v >= min;
  const numbers = (value) => {
    if (typeof value === 'number') need(finite(value), 'E_COMPLETION_MEASUREMENT');
    else if (Array.isArray(value)) value.forEach(numbers);
    else if (value && typeof value === 'object') Object.values(value).forEach(numbers);
  };
  numbers(m);
  let passed = false;
  switch (task.kind) {
    case 'physical2d':
      passed =
        atLeast(m.cameraModels, 2) &&
        atLeast(m.microphoneModels, 2) &&
        atLeast(m.frames, 300) &&
        finite(m.validFaceRatio) &&
        m.validFaceRatio >= 0.9 &&
        m.validFaceRatio <= 1 &&
        atLeast(m.cameraUnplugTrials, 10) &&
        atLeast(m.microphoneUnplugTrials, 10) &&
        finite(m.lossMaxMs) &&
        m.lossMaxMs <= 500 &&
        finite(m.neutralMaxMs) &&
        m.neutralMaxMs <= 1500 &&
        finite(m.recoveryMaxMs) &&
        m.recoveryMaxMs <= 1000 &&
        yes(
          'actualHuman',
          'permissionDenied',
          'deviceBusy',
          'noDevice',
          'multipleFaces',
          'noiseAndSpeechSeparated',
          'unrelatedSaveAndOutputRemainUsable',
        ) &&
        zero('rawMediaStored');
      break;
    case 'integration':
      passed =
        atLeast(m.initialACPassed, 15) &&
        atLeast(m.initialFTPassed, 21) &&
        zero('openCriticalFailures', 'openQualityFailures') &&
        yes('affectedRoutesRechecked', 'physicalTrackingVerified');
      break;
    case 'endurance':
      passed =
        Array.isArray(m.runs) &&
        routes.every((route) =>
          m.runs.some(
            (x) =>
              x.route === route &&
              atLeast(x.durationMs, 7200000) &&
              atLeast(x.samples, 7200) &&
              x.actualCamera === true &&
              x.actualMicrophone === true &&
              x.obsX264Recording === true &&
              x.frameMetricsRecorded === true &&
              x.cpuMemoryGpuTemperatureRecorded === true &&
              x.abnormalStops === 0 &&
              x.recoveryFailures === 0 &&
              finite(x.rssGrowthMiB) &&
              finite(x.baselineRssMiB) &&
              x.rssGrowthMiB <= Math.max(128, x.baselineRssMiB * 0.1),
          ),
        );
      break;
    case 'cycles':
      passed =
        atLeast(m.cycles, 60) &&
        yes(
          'actualDevices',
          'processTreeMeasured',
          'gpuMeasured',
          'abnormalTemporaryFilesChecked',
          'projectSwitches',
        ) &&
        zero(
          'leakedTracks',
          'leakedAudioContexts',
          'unboundedMemoryGrowth',
          'unreclaimedTemporaryFiles',
        );
      break;
    case 'latency':
      passed =
        Array.isArray(m.softwareMs) &&
        m.softwareMs.length >= 90 &&
        percentile(m.softwareMs, 0.95) <= 200 &&
        Array.isArray(m.independentMs) &&
        m.independentMs.length >= 90 &&
        percentile(m.independentMs, 0.95) <= 200 &&
        atLeast(m.referenceFPS, 120) &&
        yes(
          'actualCamera',
          'obsDrawCompleteAck',
          'frameIdsCorrelated',
          'clockOffsetsMeasured',
          'independentPhysicalMeasurement',
        ) &&
        finite(m.missingRatio) &&
        m.missingRatio <= 0.01 &&
        zero('stallsOver100ms');
      break;
    case 'load':
      passed =
        atLeast(m.distinctInputs, 30) &&
        atLeast(m.repetitions, 3) &&
        yes(
          'allRoutes',
          'actualDevices',
          'concurrentOBS',
          'maximumSupportedInputs',
          'qualityRestore',
          'cancelControlsResponsive',
        ) &&
        finite(m.analysisP95Ms) &&
        m.analysisP95Ms <= 30000 &&
        finite(m.cancelP95Ms) &&
        m.cancelP95Ms <= 200 &&
        zero('criticalFailures');
      break;
    case 'risk':
      passed =
        zero(
          'openDataLoss',
          'openPrivacyExposure',
          'openExternalRuntimeFailure',
          'openPerformanceFailure',
        ) && yes('currentCandidateReviewed');
      break;
    case 'guidance':
      passed =
        atLeast(m.observedIssues, 1) &&
        atLeast(m.reobservedNovices, 1) &&
        yes('beforeAfterLinked', 'changedBuildLinked', 'sameTasksReobserved') &&
        zero('unresolvedBlockingGuidance');
      break;
    case 'cleanWindows':
      passed =
        yes(
          'freshProvisionedWindows',
          'provisionReceiptVerified',
          'developerToolsAbsent',
          'installPassed',
          'updatePassed',
          'firstRunPassed',
          'frozenWorkerInsideBundle',
          'unicodeSpacePath',
          'projectCopyPreserved',
          'protectionsIntact',
        ) && zero('securityBypasses');
      break;
    case 'trial':
      passed =
        atLeast(m.actualRecipients, 1) &&
        atLeast(m.classifiedEnvironments, 1) &&
        yes(
          'consentedFeedback',
          'installationCovered',
          'firstUseCovered',
          'broadcastCovered',
          'exportCovered',
          'rightsAndTrialSafetyReviewed',
        );
      break;
    case 'fixes':
      passed =
        yes(
          'actualTrialIncidentsLinked',
          'reproducedBeforeFix',
          'affectedRoutesRetested',
          'externalTargetRetested',
        ) && zero('openRequiredTrialDefects');
      break;
    case 'release':
      passed =
        assessRelease(candidate, m.releaseChecks).decision === 'READY_FOR_REVIEW' &&
        m.releaseChecks.every((c) =>
          c.evidence.every((e) =>
            r.artifacts.some((a) => a.path === e.path && a.sha256 === e.sha256),
          ),
        ) &&
        zero('openM0Revalidations') &&
        yes('allACFTPassed', 'allArtworkGatesPassed', 'signedCandidate', 'rightsReviewed');
      break;
    case 'candidate':
      passed =
        yes(
          'fullPackagedRegression',
          'allInventoriedBytesVerified',
          'actualOBSAllRoutes',
          'officialExternalTarget',
          'versionMatched',
          'signedCandidate',
          'previousFrozenCandidateUnchanged',
        ) && zero('packageMismatches');
      break;
    case 'distribution':
      passed =
        yes(
          'actualDistributionPerformed',
          'downloadVerified',
          'supportInformationLive',
          'releaseNotesLive',
          'installationPathVerified',
          'signatureVerified',
        ) && zero('unresolvedReleaseBlockers');
      break;
    case 'feedback':
      passed =
        atLeast(m.observationHours, 1) &&
        yes(
          'afterActualRelease',
          'consentRespected',
          'environmentClassification',
          'noviceObstaclesClassified',
          'failedCasesIncluded',
        );
      break;
    case 'update':
      passed =
        yes(
          'actualPostReleaseIncident',
          'fixReproducedAndVerified',
          'regressionPassed',
          'recoveryInstructions',
          'releaseNotes',
          'actualUpdateProvided',
          'downloadVerified',
        ) && zero('unresolvedPriorityIncidents');
      break;
    case 'threeD':
      passed =
        atLeast(m.cameraModels, 2) &&
        atLeast(m.microphoneModels, 2) &&
        atLeast(m.actionsPerPart, 20) &&
        finite(m.correctPartRatio) &&
        m.correctPartRatio >= 0.95 &&
        m.correctPartRatio <= 1 &&
        finite(m.validFaceRatio) &&
        m.validFaceRatio >= 0.9 &&
        m.validFaceRatio <= 1 &&
        finite(m.validBodyAndArmsRatio) &&
        m.validBodyAndArmsRatio >= 0.9 &&
        m.validBodyAndArmsRatio <= 1 &&
        yes(
          'actualHuman',
          'actualSpeech',
          'actualOBS',
          'transparentAvatarOnly',
          'faceEyesMouthTorsoBothArms',
          'sourcePartPreparationVerified',
          'lossRecoveryVerified',
        ) &&
        zero('rawMediaStored', 'oppositePartFailures', 'tearsOrHoles');
      break;
    default:
      need(false, 'E_COMPLETION_KIND');
  }
  return {
    taskId: r.taskId,
    passed: !!passed,
    artifactHashesVerified: false,
    operatorAttested: true,
  };
}
export function assessTasks(proofs, study) {
  const result = new Map();
  function visit(id, stack = new Set()) {
    if (result.has(id)) return result.get(id);
    need(!stack.has(id), 'E_COMPLETION_DEPENDENCY');
    const task = pendingTasks.find((t) => t.id === id);
    need(task, 'E_COMPLETION_TASK');
    const next = new Set(stack).add(id),
      deps = task.dependsOn.map((d) => visit(d, next));
    const own =
      task.kind === 'usability'
        ? study?.passed === true
        : proofs.some((p) => p.taskId === id && p.passed && p.artifactHashesVerified);
    const blockers = deps.filter((d) => d.status !== 'PASS').map((d) => d.id);
    const row = {
      ...task,
      status: own ? (blockers.length ? 'BLOCKED' : 'PASS') : 'NOT_RUN',
      blockers,
    };
    result.set(id, row);
    return row;
  }
  return pendingTasks.map((t) => visit(t.id));
}

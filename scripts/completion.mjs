// One entry point for the remaining 26–31 work. Local files only; never publishes.
import {
  createReadStream,
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  realpathSync,
  statSync,
  statfsSync,
  copyFileSync,
} from 'node:fs';
import { resolve, join, relative, isAbsolute, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  pendingTasks,
  privacyCheck,
  evaluateReceipt,
  evaluateStudy,
  assessTasks,
  emptyMeasurements,
} from '../tools/completion-controls.mjs';
import { compileProbe } from '../tools/completion-native.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const need = (v, code) => {
  if (!v) throw Error(code);
};
const hash = async (p) => {
  const h = createHash('sha256');
  for await (const chunk of createReadStream(p)) h.update(chunk);
  return h.digest('hex');
};
const within = (parent, path) => {
  const r = relative(parent, path);
  return !!r && !isAbsolute(r) && !r.split(/[\\/]/).includes('..');
};
const fresh = (p) => {
  need(within(root, p) && !existsSync(p), 'E_COMPLETION_OUTPUT');
  mkdirSync(p, { recursive: true });
  return p;
};
const save = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + '\n', { flag: 'wx' });
const zip = resolve(
  'out/make/zip/win32/x64/2DSketcher-win32-x64-' + read('package.json').version + '.zip',
);
async function candidate() {
  need(existsSync(zip), 'E_COMPLETION_PACKAGE_MISSING');
  const c = { version: read('package.json').version, sha256: await hash(zip) };
  const current = join('evidence/candidates', c.version, 'package.json');
  const proof = read(
    existsSync(current) ? current : 'evidence/remediation26-31/package-02/package.json',
  );
  need(
    proof.passed && proof.appVersion === c.version && proof.zip.sha256 === c.sha256,
    'E_COMPLETION_PACKAGE_STALE',
  );
  return c;
}
const routeInstructions = {
  physical2d: '실제 사람·웹캠/마이크 각 2종, 권한/점유·복수 얼굴·소음·물리 손실/복귀를 관찰한다.',
  integration: '초기 AC 15개·FT 21개와 원화/추적 결함을 수정 후 해당 경로로 재검증한다.',
  endurance: '각 제작 경로 2시간, 실제 장치·OBS x264 녹화와 1초 자원/프레임 표본을 수집한다.',
  cycles: '실제 장치·프로젝트 전환과 프로세스 트리/GPU/비정상 종료 임시 파일 누적을 검사한다.',
  latency:
    '카메라 프레임 ID→OBS draw ACK와 120FPS 이상 독립 물리 계측을 각각 90사건 이상 수집한다.',
  load: '지원 입력 30개×3회와 최대 입력·장치/OBS 동시 부하·품질 복원을 검사한다.',
  risk: '현재 후보의 데이터/개인정보/외부/성능 미해결 위험이 0인지 검토한다.',
  usability:
    '관찰 화면으로 실제 초보자 30명·경로별 첫 사용 10명, 7/14일 창과 실패/도움을 함께 기록한다.',
  guidance: '관찰된 막힘→변경 빌드→같은 과제의 새 직접 관찰을 연결한다.',
  cleanWindows:
    '시험 키트를 새 Windows에서 실행하고 별도 OS 준비 증거와 업데이트·프로젝트 보존 관찰을 연결한다.',
  trial: '실제 제한 시험 수신·동의한 피드백을 환경/설치/첫 사용/방송/외부별로 분류한다.',
  fixes: '실제 시험 결함을 재현·수정하고 영향받은 제작 경로와 외부 대상을 재검증한다.',
  release:
    '기존 release-controls의 모든 AC/M0/PERF/RUN/ART/OUT/UX/권리/서명 게이트를 같은 후보에 연결한다.',
  candidate: '전체 포터블 회귀·인벤토리·세 경로 OBS·공식 외부 구동·실제 서명을 재검증한다.',
  distribution: '승인된 후보의 실제 다운로드/설치/서명과 공개 안내·지원 경로를 확인한다.',
  feedback: '실제 배포 이후 동의한 오류/환경/초보자 막힘과 실패 사례를 수집한다.',
  update: '실제 배포 후 우선 결함을 수정하고 회귀/복구/안내를 갖춘 업데이트 제공을 확인한다.',
  threeD:
    '얼굴·눈·입·몸통·양팔을 각각 관찰하고 원화 부위 준비·반대 부위 격리·실제 OBS와 손실 복귀를 확인한다.',
};
async function plan(out, c) {
  const text = readFileSync('docs/Todo', 'utf8');
  const open = [...text.matchAll(/^- \[ \] (T-\d+)\b/gm)].map((m) => m[1]);
  const rows = pendingTasks.map((t) => ({
    ...t,
    todoOpen: open.includes(t.id),
    instructions: routeInstructions[t.kind],
    template: 'templates/' + (t.kind === 'usability' ? 'study' : t.id) + '.json',
  }));
  save(join(out, 'plan.json'), {
    format: '2dsketcher-completion-plan/1',
    candidate: c,
    tasks: rows,
    taskCount: rows.length,
    automaticPublication: false,
    automaticTodoChanges: false,
    m0: 'HOLD',
    release: 'HOLD',
  });
  mkdirSync(join(out, 'templates'));
  for (const t of pendingTasks.filter((t) => t.kind !== 'usability'))
    save(join(out, 'templates', t.id + '.json'), {
      format: '2dsketcher-completion/1',
      candidate: c,
      taskId: t.id,
      kind: t.kind,
      origin: null,
      collectedAt: null,
      review: { verdict: null, role: null },
      artifacts: [],
      measurements: emptyMeasurements(t.kind),
    });
  save(join(out, 'templates', 'study.json'), {
    format: '2dsketcher-study-index/1',
    candidate: c,
    records: [],
    observationComplete: false,
  });
}
async function kit(out, c) {
  const disk = statfsSync(out);
  need(disk.bavail * disk.bsize >= statSync(zip).size * 2 + 2 * 1024 ** 3, 'E_COMPLETION_SPACE');
  await plan(out, c);
  copyFileSync(zip, join(out, 'candidate.zip'));
  const old = resolve('out/make/zip/win32/x64/2DSketcher-win32-x64-0.22.0.zip');
  const previous =
    existsSync(old) && old !== zip ? { version: '0.22.0', sha256: await hash(old) } : null;
  if (previous) {
    need(
      previous.sha256 === read('evidence/phase29/run-05/review.json').zip.sha256,
      'E_COMPLETION_PREVIOUS_HASH',
    );
    copyFileSync(old, join(out, 'previous.zip'));
  }
  const html = readFileSync('tools/completion-console.html', 'utf8').replace(
    '__CANDIDATE__',
    JSON.stringify(c),
  );
  writeFileSync(join(out, 'Observation.html'), html, { flag: 'wx' });
  const native = resolve('.local/completion-native-' + Date.now());
  fresh(native);
  const compiled = compileProbe(native);
  copyFileSync(compiled, join(out, 'Run-CleanWindows.exe'));
  writeFileSync(
    join(out, 'Run-CleanWindows.cmd'),
    '@echo off\r\n"%~dp0Run-CleanWindows.exe" %*\r\n',
    { flag: 'wx' },
  );
  for (const name of ['29-observation-protocol.md', '05-release-gates.md'])
    copyFileSync(join('docs/planning', name), join(out, name));
  const instructions = `# 20개 잔여 작업 실행 키트\n\n후보 ${c.version}, SHA-256 ${c.sha256}\n\n1. Observation.html을 브라우저로 열면 익명 관찰 타이머·막힘·도움·7/14일 재관찰 JSON을 기록할 수 있습니다. 얼굴/음성·개인 이름·연락처를 받지 않고 네트워크 전송도 없습니다. 개발자 자동 시험은 초보자 관찰로 세지 않습니다.\n2. 새 Windows에서 PowerShell로 .\\Run-CleanWindows.cmd을 실행합니다. 관리자 권한·정책 해제·개발 도구 설치를 요구하지 않습니다. 정책이 실행을 막으면 환경 실패로 기록하며 Bypass를 사용하지 않습니다.\n3. candidate.zip과 previous.zip은 각각 새 폴더에 풉니다. 이전 프로젝트 사본을 새 버전에서 저장/재열기하고 이전 원본 해시를 비교합니다. 현재 빌드는 서명되지 않았으며 새 OS/업데이트 관찰 전에는 T-288 완료가 아닙니다.\n4. plan.json의 20개 작업·의존 관계와 templates/의 빈 양식에 직접 측정·관찰과 증거 경로/해시를 연결합니다. 모든 양식은 미측정 상태로 시작합니다. 각 kind의 measurement 필드는 저장소 tools/completion-controls.mjs와 docs/planning/26-31-completion.md를 따릅니다.\n5. 저장소로 결과를 가져온 뒤 tools\\complete.cmd review <결과 폴더>를 실행합니다. 다른 후보·가짜/합성 출처·누락/변조 파일·미경과 관찰창은 합격으로 올리지 않습니다. 정상 JSON만 evidence/ 안의 새 폴더에 보관하고 개인 경로나 원시 매체를 가져오지 마세요.\n\n이 키트는 검증 준비이며 실제 사용자/새 OS/6시간 경과/배포 후 사건을 만들지 않습니다. 공개 배포·서명·push 기능이 없습니다. 세 제작 경로·프리미엄 원화·로컬 실행/방송·독립 내보내기·필수 3D/자체 모델과 M0 HOLD는 유지합니다.\n`;
  writeFileSync(join(out, 'README.md'), instructions, { flag: 'wx' });
  const files = [];
  for (const name of readdirSync(out).filter((n) => statSync(join(out, n)).isFile()))
    files.push({ name, sha256: await hash(join(out, name)) });
  save(join(out, 'kit-manifest.json'), {
    format: '2dsketcher-completion-kit/1',
    candidate: c,
    previous,
    files,
    published: false,
    signed: false,
  });
}
async function review(input, out, c) {
  const base = realpathSync(resolve(input));
  need(within(root, base) && !within(out, base), 'E_COMPLETION_INPUT');
  const reports = [],
    studies = [],
    invalid = [],
    sources = [];
  const files = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      need(!e.isSymbolicLink(), 'E_COMPLETION_LINK');
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.json')) files.push(p);
      need(files.length <= 500, 'E_COMPLETION_FILES');
    }
  };
  walk(base);
  for (const p of files) {
    try {
      need(statSync(p).size <= 2 * 1024 * 1024, 'E_COMPLETION_SIZE');
      const r = read(p);
      if (r.format !== '2dsketcher-completion/1') continue;
      const source = {
        id: 'record-' + String(files.indexOf(p) + 1).padStart(3, '0'),
        sha256: await hash(p),
      };
      if (r.kind === 'novice-session') {
        studies.push(r);
        sources.push(source);
        continue;
      }
      const evaluated = evaluateReceipt(r, c);
      for (const a of r.artifacts) {
        const ap = realpathSync(resolve(a.path));
        need(within(resolve('evidence'), ap), 'E_COMPLETION_ARTIFACT_ROOT');
        need((await hash(ap)) === a.sha256, 'E_COMPLETION_ARTIFACT_HASH');
        if (ap.endsWith('.json')) {
          need(statSync(ap).size <= 8 * 1024 * 1024, 'E_COMPLETION_SIZE');
          privacyCheck(read(ap));
        }
      }
      evaluated.artifactHashesVerified = true;
      reports.push(evaluated);
      sources.push(source);
    } catch (e) {
      invalid.push({
        file: 'record-' + String(files.indexOf(p) + 1).padStart(3, '0'),
        code: /^E_[A-Z_]+$/.test(e.message) ? e.message : 'E_COMPLETION_INVALID',
      });
    }
  }
  let study = { passed: false, participants: 0 };
  try {
    study = evaluateStudy(studies, c);
  } catch (e) {
    invalid.push({
      file: 'study',
      code: /^E_[A-Z_]+$/.test(e.message) ? e.message : 'E_COMPLETION_STUDY',
    });
  }
  // Conflicting receipts cannot turn a failure into a pass by adding a later success.
  const conflicted = new Set(reports.filter((r) => !r.passed).map((r) => r.taskId));
  const accepted = reports.filter((r) => !conflicted.has(r.taskId));
  const tasks = assessTasks(accepted, study),
    allPassed = !invalid.length && tasks.every((t) => t.status === 'PASS');
  save(join(out, 'review.json'), {
    candidate: c,
    tasks,
    study,
    invalid,
    sources,
    allTwentyPassed: allPassed,
    operatorAttestationsRequireRealObservation: true,
    automaticTodoChanges: false,
    published: false,
  });
  console.log(
    'Completion review: ' +
      tasks.filter((t) => t.status === 'PASS').length +
      '/20 PASS; invalid records ' +
      invalid.length,
  );
  if (!allPassed) process.exitCode = 2;
}
async function local(out) {
  const disk = statfsSync(out);
  need(disk.bavail * disk.bsize >= 2 * 1024 ** 3, 'E_COMPLETION_SPACE');
  const specs = [
    [
      'required',
      process.env.ComSpec ?? 'C:\\Windows\\System32\\cmd.exe',
      ['/d', '/c', 'tools\\dev.cmd run check'],
    ],
    ['completion-console', process.execPath, ['scripts/completion-console-check.mjs']],
  ];
  const results = [];
  for (const [id, cmd, args] of specs) {
    const log = join(out, id + '.log');
    const { openSync, closeSync } = await import('node:fs');
    const fd = openSync(log, 'wx');
    try {
      const code = await new Promise((yes, no) => {
        const child = spawn(cmd, args, {
          cwd: root,
          env: process.env,
          windowsHide: true,
          stdio: ['ignore', fd, fd],
        });
        child.once('error', no);
        child.once('exit', yes);
      });
      results.push({ id, exitCode: code, passed: code === 0 });
      if (code !== 0) break;
    } finally {
      closeSync(fd);
    }
  }
  save(join(out, 'local.json'), {
    stages: results,
    passed: results.length === specs.length && results.every((r) => r.passed),
    humanObservation: false,
    cleanWindows: false,
    published: false,
  });
  need(results.length === specs.length && results.every((r) => r.passed), 'E_COMPLETION_LOCAL');
}
try {
  const action = process.argv[2] ?? 'plan';
  need(['plan', 'kit', 'review', 'local'].includes(action), 'E_COMPLETION_COMMAND');
  const c = await candidate();
  const stamp = new Date().toISOString().replaceAll(/[:.]/g, '-');
  const output = resolve(
    action === 'kit'
      ? '.local/completion26-31/kit-' + stamp
      : action === 'local'
        ? '.local/completion26-31/check-' + stamp
        : 'evidence/completion26-31/' + action + '-' + stamp,
  );
  fresh(output);
  if (action === 'review') {
    need(process.argv[3], 'E_COMPLETION_INPUT');
    await review(process.argv[3], output, c);
  } else if (action === 'local') await local(output);
  else if (action === 'kit') await kit(output, c);
  else await plan(output, c);
  console.log('Completion ' + action + ' ready: ' + relative(root, output).replaceAll('\\', '/'));
} catch (error) {
  console.error(/^E_[A-Z_]+$/.test(error.message) ? error.message : 'E_COMPLETION_FAILED');
  process.exitCode = 1;
}

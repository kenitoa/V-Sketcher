# 제품 개발 기반과 모듈 경계

실행 경로는 sandbox renderer → 제한된 preload → Electron main → 전용 stdio Python worker입니다. renderer에는 Node·shell·파일시스템·임의 작업 실행 권한이 없습니다. 사용자 자산을 추가하는 기능은 아직 없으며, main은 고정된 번들 리소스와 자체 프로필만 사용합니다. WebGL2 렌더러는 앱과 별도 투명 출력 HTML이 공유하지만, 출력 HTML을 OBS에 전달하는 서버/연결은 후속 작업입니다.

| 책임 | 현재 코드/계약 | 06의 검증 범위 |
|---|---|---|
| 입력 | `packages/pipeline` InputPort/3개 InputRoute | 계약만 정의, 파일 선택/생성 미구현 |
| 분석 | AnalysisPort, `worker/main.py` | 독립 프로세스·프로토콜·모델 로드, 실제 영상/음성 분석 미연결 |
| 편집 | EditorPort, `packages/jobs` ResultGate | 교차 프로젝트/이전 리비전/취소/중복 결과 차단, 편집 명령·저장은 후속 |
| 움직임 | MotionPort, `packages/scene-core` | 5개 정규화 매개변수·유한값/범위, 현재 샘플 애니메이션만 연결 |
| 실행 | RuntimePort, `packages/avatar-renderer` | 7개 GPU 텍스처·투명 합성·제한된 평면 회전, 완전한 변형/리깅 아님 |
| 출력 | OutputPort, `apps/renderer/src/output.ts` | 같은 렌더러를 쓰는 투명 canvas 진입점, 방송 전달 미구현 |
| 변환 | ExportPort, `packages/export-adapter` | 실제 INP 바이트/텍스처/참조/매개변수 검사, 제품 exporter 미구현 |
| 호스트/보안 | `apps/desktop` | custom protocol, 권한 거부, 출처 검증 IPC, worker 종료 |
| 진단 | `packages/diagnostics` | 허용 필드만 JSONL·회전, 민감 원문 제외 |

모듈은 장치/화면과 공통 모델을 분리합니다. 입력·분석·변환은 immutable resource ID와 해시를 교환하고 개인 파일 경로를 공통 결과에 넣지 않습니다. 포트는 후속 기능의 소유권을 정한 TypeScript 계약이며 제공 중인 기능이 아닙니다. 모든 미래 비동기 편집 결과는 `JobIdentity`의 프로젝트·리비전·실행 세대와 취소 상태를 확인한 후 적용해야 합니다. 현재 worker wire는 이 기반의 최소 subset입니다.

stdio wire v1은 UTF-8 JSON 한 줄이며 최대 64 KiB입니다. requestId/projectId/revision/generation/protocol을 왕복 검증하고 알 수 없는 키/작업/버전을 거부합니다. 작업은 ping·validate-runtime·shutdown 3개뿐이며 arbitrary path/command 인수가 없습니다. 일반 요청 10초, native 모델 검증 60초 제한을 적용합니다. 응답 ID나 리비전이 맞지 않으면 적용하지 않습니다. 잘못된 JSON/너무 큰 프레임은 실패 처리하고, worker 종료는 대기 중 요청을 실패시킵니다. 종료 ACK 후 프로세스 close를 기다리며 남으면 kill fallback을 사용합니다. 작업별 payload·progress·취소 메시지 및 디스크 저장 계약은 후속 기능 구현 때 버전 검토와 함께 추가해야 합니다.

renderer↔main에는 info/health 읽기 두 개만 노출합니다. sandbox·contextIsolation·webSecurity를 켜고 Node integration을 끕니다. `sketcher://app`의 고정 정적 리소스만 제공하며 경로 이탈을 거부합니다. navigation·새 창·장치 권한·renderer 외부 HTTP/WS 요청을 거부합니다. 장치 권한 UI와 명시적 시작은 후속 런타임 기능에서 구현합니다. 이 구성은 전체 OS 네트워크 차단을 뜻하지 않습니다.

| 프로필 | 선택 명령 | UI/진단 |
|---|---|---|
| development | `run dev` | 개발 표시·개발자 도구 허용, 정상 앱 창 |
| test | `run build:test`, `node scripts/smoke.mjs` | 시험 표시·명시적 self-check 사용 |
| release | `run build`/`run make` | 개발 표시/DevTools 비활성, 사용자용 앱 정보만 제공 |

프로필은 빌드 시 고정된 `runtime-config.json`으로 구분합니다. self-check는 명시적 CLI 인수로만 시작하는 숨겨진 자동 검증 경로이며 기본 배포 화면에는 시험 제어 UI가 없습니다. 기초 미리보기임을 표시하고 제작 버튼은 비활성입니다. 창의 실제 캡처와 읽기 전용 앱 검사로 WebGL·투명 픽셀·IPC·앱 정보 대화상자·개발 기능 노출·번들 worker를 확인합니다.

기본 로그는 프로필의 logs/events.jsonl이며 1 MiB 초과 시 최대 4개 이전 파일로 회전합니다. timestamp/event, 작업/요청 ID, 버전/프로토콜, durationMs/byteCount/exitCode, 제한된 E_* 코드만 허용합니다. native stderr는 바이트 수만 기록합니다. 임의 메시지·stack·장치 원본·개인 경로·secret은 저장하지 않습니다. 로그 수집/전송 기능과 원격 분석은 없습니다.

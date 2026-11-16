# 개발과 변경 검토

작업 전 [AGENTS.md](AGENTS.md), [Todo](docs/Todo), PRD 및 현재 결정 기록을 읽습니다. 최초 Git 기준점은 01~05 문서·실험을 보존합니다. 이후 변경은 기능이나 검증 목적별로 나누고 `git diff --check`, `git status`, 필수 검사를 확인합니다. 원격 저장소 등록·push·릴리스는 이 작업의 범위에 포함하지 않습니다.

일반 소스는 LF를 사용합니다. 해시로 동결한 `experiments/**`와 `evidence/**`에는 Git 줄바꿈 필터를 적용하지 않습니다. 최초 Git 추가 시 자동 정규화됐던 실험 파일의 index도 실제 원본 바이트로 복원해 별도 보존 commit으로 남겼습니다. 디스크의 실험 원본은 수정하지 않습니다.

`apps/`는 데스크톱과 화면, `packages/`는 공통 계약·상태·렌더링, `worker/`는 분석 작업 프로세스입니다. `assets/product/`만 제품 샘플로 선언하며 `experiments/`는 과거 실험 근거입니다. `docs/`는 요구사항과 결정, `evidence/phase06/`는 개인정보를 제외한 검증 보고서입니다. 빌드·캐시·모델 원본 다운로드·가상환경·대용량 배포본은 Git에서 제외합니다. 원본 실험 파일을 새 제품 코드처럼 수정하거나 런타임에서 참조하지 않습니다.

일반 변경은 `tools/dev.cmd run check`로 TypeScript 엄격 검사, Ruff의 실행 오류 검사, 계약/무결성/상태/진단/실제 INP 검사, worker 프로토콜 검사와 시험 빌드를 실행합니다. 정적 검사 규칙은 `scripts/check.mjs`에 있습니다. 스타일 검사만으로 기능 검증을 대체하지 않습니다. 패키지·의존성·런타임 경로 변경에는 `run make`와 `run package:check`도 필요합니다. 외부 INP 검사는 실제 동작·표현 보존 검사의 선행 조건이며 외부 프로그램 구동 완료를 뜻하지 않습니다.

현재 공통 모델 검사는 [07 계약](docs/architecture/project-model.md), 작업/트랜잭션은 [08 계약](docs/architecture/workflow.md)을 따릅니다. schema 변경 시 `generate-project-validators.mjs`를 실행해 사전 생성 파일을 함께 변경합니다. 원본/생성 불일치는 필수 검사와 빌드를 실패시킵니다. 이전 phase의 evidence를 덮어쓰지 말고 현재 패키지 증거 경로를 명시합니다. 현재 CI는 `verify-structure.mjs`로 필수 검사와 실제 Electron UI를 함께 실행합니다. 일반 `verify-model.mjs` 결과는 `.local/model-verification/`에 두어 과거 07 보고서를 덮어쓰지 않습니다.

CI는 `.github/workflows/foundation.yml`에 같은 명령으로 구성했습니다. Windows 2025 runner, 정확한 Python 버전, 로컬 Node 및 잠금 의존성을 사용하며 Action은 공식 태그의 commit SHA로 고정합니다. 호스팅 CI를 실행했다는 주장은 실제 run이 있을 때만 기록합니다. 이 저장소는 아직 원격에 업로드하지 않았습니다. CI에는 배포·서명·게시 단계가 없습니다.

의존성 갱신은 버전·공식 출처·해시·모델 조건을 함께 검토합니다. Node는 `.node-version`, `.npmrc`, `package.json`, `package-lock.json`, bootstrap의 검증 값을 함께 갱신합니다. Python은 `worker/requirements-win-py314.lock`의 wheel/hash를 갱신하고 새 가상환경에서 설치합니다. Python 빌드 도구까지 잠겨 있지만 모두 런타임에 포함되는 것은 아닙니다. 배포 통지는 `scripts/notices.py`와 패키지 내부 `resources/notices`를 확인합니다.

기본 진단에는 원본 이미지·음성·카메라 프레임·API 키·개인 경로·임의 오류 문자열을 기록하지 않습니다. 새로운 IPC 작업에는 버전·ID·크기·취소·리비전 규칙과 부정 입력 검사를 추가합니다. 아직 없는 제작 기능의 버튼을 완료된 것처럼 활성화하거나 실험 애니메이션을 실제 추적으로 표시하지 않습니다.

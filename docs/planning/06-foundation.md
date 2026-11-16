# 06. 제품 코드와 개발·검증 기반 구성

| 항목 | 결과 |
|---|---|
| 대상 | T-051~060, 사용자 지시에 따른 06 전체 수행 |
| 기준일 | 2026-11-16 |
| 제품 기반 버전 | 0.1.0 / wire protocol 1 / 문서 v0.7 |
| 실행 범위 | Windows x64, Electron/React·공유 WebGL2·독립 Python worker |
| M0 | **HOLD 유지**, M0-R01~05 OPEN |
| 재현 안내 | [README](../../README.md), [개발 규칙](../../CONTRIBUTING.md) |

## 작업별 산출물과 판정

| 작업 | 구현/구성 | 완료 근거 |
|---|---|---|
| T-051 | 로컬 Git 기준점, AGENTS/CONTRIBUTING, LF·바이너리 분류, 산출물 제외 | 과거 01~05를 기준 commit으로 보존, 새 코드/문서/자산의 변경 추적. 원격 등록/push 없음 |
| T-052 | 실제 Electron 앱·React 시작 화면·고급 PNG 미리보기·WebGL2·worker | [새 개발 설치 재현](../../evidence/phase06/reproducibility.json), [실제 배포 화면](../../evidence/phase06/release-studio.png) |
| T-053 | 프로젝트 로컬 Node 24.22.3/npm 11.19.1, 정확한 버전/integrity npm lock, Python 3.14.10용 28개 wheel/hash, 모델 SHA | 새 폴더/새 Node/새 venv에서 bootstrap→npm ci→check→앱 smoke. API 키/개인 절대경로 설정 없음 |
| T-054 | [모듈 책임/포트/연결 규약](../architecture/foundation.md), 버전/ID/리비전/generation 검사, 작업 결과 gate | 7개 책임의 TypeScript 포트와 main/renderer/worker 구현 경계. 아직 없는 제작 기능을 포트 구현 완료로 세지 않음 |
| T-055 | [자산 정책](../architecture/assets.md), 7개 고급 텍스처 provenance/hash, 모델 캐시/번들 분리, dependency NOTICE | [패키지 감사](../../evidence/phase06/package-audit.json): ASAR 개발/실험 코드 제외, 배포 파일별 SHA/크기 |
| T-056 | development/test/release 빌드 프로필, release DevTools 차단·개발 배지 제외 | 두 번의 release 검사 모두 diagnosticsVisible=false. 기본 화면은 사용자 앱 정보만 표시 |
| T-057 | TypeScript strict·Ruff 오류 검사·계약/프로세스/파일 검사·시험 빌드, 고정 Windows CI | [워크플로](../../.github/workflows/foundation.yml), 새 개발 환경에서 동일 로컬 검사 통과. **호스팅 CI는 미실행** |
| T-058 | 8개 Node/3개 Python 검사 그룹, 실제 INP fixture, 실제 worker subprocess와 실패 주입 | malformed/oversize/버전·ID·리비전·취소·교차 프로젝트·중복·텍스처 참조·투명도·native bundle 검사. 후속 프로젝트 저장/실제 외부 표현 검증은 남음 |
| T-059 | 공통 DiagnosticLog, 안전 event/field whitelist, JSONL 회전, stderr 바이트만 기록 | 작업/요청 ID·버전·제한된 오류 코드 기록. secret/path/원음/영상/임의 오류 원문 제외 검사가 실제 파일·프로세스에서 통과 |
| T-060 | 포터블 ZIP/EXE와 자체 Python/모델, 같은 PC의 한글·공백 경로에 패키지 복사 | [실행 1](../../evidence/phase06/packaged-run-1.json), [실행 2](../../evidence/phase06/packaged-run-2.json): 새 프로필, 시스템 전용 PATH, 앱/worker 시작·모델 로드·정상 종료 |

현재 앱은 완성된 제작기가 아닌 **제품 개발 기반**이다. 기본 샘플은 고급 초상화와 수동 작성된 눈/입 표정 패치를 GPU 합성하고 제한된 평면 동작을 보여준다. 화면에는 샘플 미리보기·입력 장치 연결 전·제작 준비 중을 표시하고 세 제작 버튼을 비활성으로 둔다. 출력 HTML은 같은 렌더러를 사용하지만 OBS 전달 서버·추적·내보내기 제품 기능은 연결하지 않았다. T-061 이후를 체크하지 않는다.

## 실제 검증과 환경 차이

기준 PC는 Windows 11 Pro build 26300, i5-13420H/32 GB/RTX 4050 Laptop이다. 기존 전역 Node/Python과 분리된 새 프로젝트 폴더에 Node와 Python venv를 설치하고 잠금 의존성으로 전체 필수 검사와 실제 앱 smoke를 실행했다. npm 전이 의존 159개와 Python 빌드 환경 29개(pip 포함)를 inventory에 기록한다. 이 수치는 번들에 동일 개수의 패키지가 모두 들어간다는 뜻이 아니다.

배포본은 개발 자료가 없는 독립 복사 폴더에서 PATH를 Windows System32만 남기고, node/npm/python/py가 발견되지 않는지 먼저 확인했다. 두 개의 빈 사용자 프로필에서 앱과 worker를 실행했다. 실제 번들 Python 3.14.10·native 의존성·얼굴 모델이 로드되고 worker의 주요 모듈 파일이 번들 내부에 있음을 확인했다. WebGL2의 유색/투명 픽셀·GL 오류 없음·앱 정보 대화상자·제한된 preload·release 배지 비노출과 종료 ACK/프로세스 close도 검사했다. 카메라/마이크를 열지 않았고, OS 전체 네트워크를 끄지는 않았다. renderer의 외부 요청은 앱 정책으로 차단한다.

사용자는 별도 PC/VM 질문에 **“별도 환경은 없고 이 PC에서 검증해 주세요”**라고 답했다. 이에 T-060의 이번 종료 확인을 **동일 PC에서 개발 도구 경로를 제거한 패키지 실행**으로 한정했다. Windows Sandbox는 비활성이고 별도 Windows는 사용하지 않았다. 기존 OS DLL·GPU 드라이버·설치 런타임은 유지되므로 “개발 도구가 설치된 적 없는 새 Windows에서 합격”으로 해석하지 않는다. 새 Windows·장치·오프라인·장시간·실제 프로젝트 통합은 M0-R05와 출시 게이트에 남는다.

검증 자동화는 앱 소유 webContents의 명시적 self-check와 capturePage를 사용했다. 실제 기본 화면 캡처를 검수했으나 사람이 마우스/키보드로 전체 사용자 과제를 완료한 시험은 아니다. 테스트에 필요한 창은 숨겨서 실행하고 시험 옵션을 기본 배포 UI에 노출하지 않는다.

## M0 환류와 배포 경계

| 기존 위험 | 이번에 추가한 근거 | 남은 조건 |
|---|---|---|
| M0-R01 | 앱에서 실제 공유 WebGL2와 GPU 텍스처/알파 표시 | 3경로 완전한 변형·실제 OBS CEF·동시 부하·30FPS/지연/장시간 검증 |
| M0-R02 | 고급 원화/표정 샘플을 제품 자산으로 분리·표시 | 진짜 분리 파츠 라이브러리·자동 준비/보완·동작 품질·말소리/소음 |
| M0-R03 | 시작 화면·세 경로·상태/제약 표시 | 실제 초보자 3명 과제와 후속 출시 표본 |
| M0-R04 | 기존 실제 INP 바이트·텍스처·5개 제어 검사 | 내부/외부 의미 보존·고개 변형·독립 사용/라이브 장치 |
| M0-R05 | 실제 앱/worker/모델 포장·같은 PC 격리 실행·IPC 실패 처리 | 새 Windows·오프라인·제품 저장/리비전 통합·취소/장치·전원/디스크 실패 |

5개 OPEN을 닫지 않으며 30FPS·자동 리깅·방송 연결·M1 또는 출시 합격으로 확대하지 않는다. 사용자가 06 전체를 지시했으므로 필요한 개발 기반은 수행했으나 이전 HOLD를 제품 통과로 바꾸지 않는다.

패키지는 `out/2DSketcher-win32-x64/2DSketcher.exe` 및 `out/make/zip/win32/x64/2DSketcher-win32-x64-0.1.0.zip`이다. 전자는 폴더 전체가 필요하고 후자는 압축 해제 후 실행한다. 서명·설치 프로그램·공개 배포 조건 검토는 완료하지 않았다. 패키지의 파일 해시는 감사 보고서에, 코드/문서/검증 해시는 [06 산출물 manifest](../../evidence/phase06/artifact-manifest.json)에 기록한다. [최종 감사](../../evidence/phase06/audit.json)는 문서/작업/요구사항 ID·링크·역사 보존 검사이며 별도의 제품 기능 시험 수로 더하지 않는다.

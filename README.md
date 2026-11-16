# 2DSketcher

Windows용 버추얼 캐릭터 제작 도구입니다. **0.7.0 미리보기**는 PNG/JPEG 원본 보존·방향/색상 정리·대상 선택·자르기/배경/마스크 보정과 공통 편집 화면을 제공합니다. 가져온 그림은 확인한 영역의 정적 원화로 연결되며 자동 분리·리깅은 후속입니다. 고급 예제에서는 저장 가능한 삼각망·가중치의 GPU 눈/입·제한 고개와 장치 없는 재생·기본 자세를 시험할 수 있습니다. 자원 포함 ZIP 저장·복구·되돌리기, 공통 모델 1.2·WebGL2·독립 Python worker를 사용합니다. 실시간 추적·OBS 연결은 후속이며 보조 흔들림은 초기 미제공입니다. [PRD](docs/PRD.md)·[Todo](docs/Todo)를 따르며 M0는 HOLD입니다.

개발 환경은 Windows x64, Python **3.14.10 x64**, Git입니다. 최초 준비에는 인터넷이 필요하며 Node와 Python 패키지는 프로젝트 안에 설치됩니다. PowerShell 실행 정책 변경과 전역 npm 설치는 필요하지 않습니다.

```powershell
python scripts/bootstrap.py
tools/dev.cmd ci
tools/dev.cmd run check
tools/dev.cmd run dev
```

이미 다른 Python 버전이 기본값이면 Python 3.14.10 실행 파일로 첫 명령을 실행하세요. Node 24.22.3/npm 11.29.1, Electron 45.3.3 및 전체 의존성은 잠금 파일을 사용합니다. `bootstrap.py`는 기존 환경의 Python 버전도 검사합니다. API 키와 `.env` 파일은 필요하지 않습니다.

Windows 패키지와 격리 실행 검증:

```powershell
tools/dev.cmd run make
tools/dev.cmd run package:check -- --evidence-dir=evidence/phase12
```

EXE는 `out/2DSketcher-win32-x64/2DSketcher.exe`, ZIP은 `out/make/zip/win32/x64/`에 생성됩니다. ZIP을 풀 때 폴더 전체를 유지해야 합니다. Electron과 Python·라이브러리·얼굴 모델이 포함되어 사용자의 Node/Python 설치를 요구하지 않습니다. 서명·설치 프로그램·공개 배포 승인을 완료한 제품은 아닙니다.

검증 명령은 새 프로필과 한글·공백 경로에서 두 번 실행하고 PATH를 Windows 시스템 도구만 남겨 제한합니다. 카메라·마이크를 켜지 않고 모델 로드·GPU 좌표·IPC·작업 상태·실제 프로젝트 파일 저장/복구 UI·종료 취소·정상 종료를 확인합니다. 파일 선택은 self-check 전용 adapter를 사용합니다. **현재 PC의 OS/DLL/드라이버는 유지되므로 새 Windows 시험을 대신했다는 주장을 하지 않습니다.** 현재 결과는 `evidence/phase12/`, 이전 06~11 결과는 동결 보존합니다. 명시적 evidence 인수가 없으면 패키지 검사는 `.local/smoke/package/`에 기록합니다. 개인 경로가 포함될 수 있는 개발 로그와 임시 실행본은 `.local/`에 보관합니다.

시작 화면에서 제작 경로와 이름을 선택해 초안을 만들고 **고급 예제 넣기**를 누르면 현재 편집/저장 기능을 사용할 수 있습니다. 저장·다른 이름 저장·복제·열기는 실제 `.2dsketch` 파일을 만듭니다. 빠진 이미지는 같은 원본 파일을 다시 지정해 연결합니다. 자동 복구는 명시적 저장과 구분되며 **복구본**에서 기존 저장본과 비교해 선택합니다. 복구한 내용은 새 파일로 저장합니다. [사용 방법과 검증 범위](docs/planning/11-common-motion.md)를 확인하세요.

**자료 준비 → 그림 파일 선택**에서 RGB/RGBA 8bit PNG·RGB JPEG 한 장을 가져옵니다. 각 변 256~4096px·64MiB 이내이며 확장자와 실제 데이터·손상·자원을 검사합니다. 대상 번호/영역을 확인하고 사각 마스크·단색 배경을 조절해 **선택 영역 분석·적용**을 누르세요. 적용 전에는 기존 프로젝트가 바뀌지 않고, 적용 후에도 원본·이력은 보존됩니다. [가져오기 사용법·한계](docs/planning/12-image-input.md)를 확인하세요.

**움직임 시험**에서는 준비된 다섯 제어의 슬라이더·예제 재생·반복·중지를 사용할 수 있습니다. 시험 입력은 이력/파일을 바꾸지 않고, 명시적으로 저장한 세기·부드러움·기본 자세만 편집에 포함됩니다. 이전 1.0/1.1도 읽으며 모델을 업그레이드한 변환본은 다른 파일로 저장합니다.

`.local/toolchain/node-v24.22.3-win-x64/node.exe scripts/verify-input.mjs`는 108개 검사 그룹, 실제 그림 읽기·EXIF/ICC·대상/마스크/원본·프로세스 취소와 앱 선택/적용·저장 왕복 및 기존 GPU/움직임/공통 UI 검사를 실행합니다. self-check 창을 잠시 표시하며 배포 검사는 기본 창과 1080×720 창을 확인합니다. `run dev`의 “작업 상태 시험”은 고정 입력 모의 작업이고 release에는 시험 버튼이 없습니다. 추적/방송·M0 성능·물리적 디스크 고갈/전원 차단 검증은 후속입니다.

[개발 규칙](CONTRIBUTING.md) · [공통 모델](docs/architecture/project-model.md) · [작업/트랜잭션](docs/architecture/workflow.md) · [프로젝트 저장/복구](docs/architecture/project-session.md) · [공통 편집 화면](docs/architecture/common-editor.md) · [움직임 평가](docs/architecture/motion.md) · [자산 정책](docs/architecture/assets.md) · [11 완료 근거](docs/planning/11-common-motion.md)

[그림 입력 구조](docs/architecture/image-input.md) · [12 완료 근거](docs/planning/12-image-input.md)

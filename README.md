# 2DSketcher

Windows용 버추얼 캐릭터 제작 도구입니다. **0.18.0 미리보기**는 실행 캐릭터를 OBS 33.0.1 브라우저 소스에 투명 출력합니다. 실행 중 작업본 편집·검증한 실행본 적용·프로젝트 유지/전환과 출력 설정/복구를 제공합니다. 세 제작 경로·고급 원화·모델 1.9·WebGL2·내장 worker를 사용합니다. **T-190 실제 카메라·T-209 실제 전역 키 확인은 미완료**이며 [M0는 HOLD](docs/planning/05-m0-review.md)입니다. 독립 아바타 내보내기는 후속입니다.

개발 환경은 Windows x64, Python **3.14.10 x64**, Git입니다. 최초 준비에는 인터넷이 필요하며 Node와 Python 패키지는 프로젝트 안에 설치됩니다. PowerShell 실행 정책 변경과 전역 npm 설치는 필요하지 않습니다.

```powershell
python scripts/bootstrap.py
tools/dev.cmd ci
tools/dev.cmd run check
tools/dev.cmd run dev
```

이미 다른 Python 버전이 기본값이면 Python 3.14.10 실행 파일로 첫 명령을 실행하세요. Node 24.22.3/npm 11.19.1, Electron 45.3.3 및 전체 의존성은 잠금 파일을 사용합니다. `bootstrap.py`는 기존 환경의 Python 버전도 검사합니다. API 키와 `.env` 파일은 필요하지 않습니다.

Windows 패키지와 격리 실행 검증:

```powershell
tools/dev.cmd run make
.local/toolchain/node-v24.22.3-win-x64/node.exe scripts/broadcast-package-check.mjs --evidence-dir=.local/qa-broadcast-new
```

EXE는 `out/2DSketcher-win32-x64/2DSketcher.exe`, ZIP은 `out/make/zip/win32/x64/`에 생성됩니다. ZIP을 풀 때 폴더 전체를 유지해야 합니다. Electron과 Python·라이브러리·얼굴 모델이 포함되어 사용자의 Node/Python 설치를 요구하지 않습니다. 서명·설치 프로그램·공개 배포 승인을 완료한 제품은 아닙니다.

패키지 검증은 새 프로필·한글/공백 경로·Windows 시스템만 남긴 PATH에서 기본/1080×720 두 번 실행합니다. 세 실제 제작 경로의 로컬 출력·알파·움직임/표정/숨김·동시 편집/저장/교체·입력/생산 중단·GPU 실패·설정/주소/연결 복구를 확인합니다. 실제 별도 OBS의 소스/장면 캡처 검증과 이전 기능 전체 개발 앱 회귀는 별도 기록입니다. **현재 PC의 OS/DLL/드라이버는 유지되므로 새 Windows 시험을 대신하지 않습니다.** 현재 결과는 `evidence/phase23/`, 이전 06~22 근거는 동결 보존합니다. 재실행은 새 폴더를 사용하세요. 파일 선택은 self-check adapter를 사용하고 개인 경로가 포함될 수 있는 개발 로그·임시 실행본은 `.local/`에 보관합니다.

**실행 준비**에서 모드와 필요한 장치만 확인하고 시작하세요. **실행 유지·편집하기**로 돌아오면 작업본·저장본·실행본을 구분해 표시합니다. **변경 검사·준비 → 적용/취소**로 외형을 반영하며, 구조/프로젝트 변경은 실행 상태 재시작을 확인합니다. 새 준비가 실패하면 기존 캐릭터를 계속 표시합니다. 무거운 분석·가져오기·큰 파일은 실행을 중지한 뒤 처리합니다. [22단계 사용법·검증 범위](docs/planning/22-runtime-changes.md), [교체·소유권·고정 입력 계약](docs/architecture/runtime-changes.md).

실행 화면의 **방송 출력 → 출력 준비 → OBS 연결 주소 복사**로 브라우저 소스를 추가하세요. 앱 준비·페이지 렌더 응답·사용자 외부 확인을 구분합니다. 설정 변경/직전 복원·출력 다시 연결·주소 재발급·미표시/불투명/잘림/정지 진단을 제공합니다. 실제 OBS 시험의 키 입력은 앱 초점 범위이며 PC 전역 키 실증을 대신하지 않습니다. [23단계 사용법·근거](docs/planning/23-broadcast.md), [로컬 출력 계약](docs/architecture/broadcast.md).

21단계는 T-201~208·T-210 검증 완료, **T-209 실제 전역 키 입력 확인 대기**입니다. OS 등록/해제와 자동 앱 키 검사를 실제 전역 키 배달 확인으로 대신하지 않습니다.

**파츠로 만들기 → 기본 파츠 조합 준비**에서 얼굴·머리·눈·입·의상·장식을 고르고, 부위를 선택해 허용된 조절 범위 안에서 바꾸세요. 표정/입력 매개변수는 보존되며 제거/재장착 시 끊긴 연결과 제한을 안내합니다. **이 조합으로 움직임 시험**에서 확인하고 프로젝트로 저장·복제해 재사용합니다. [파츠 사용법/검수 범위](docs/planning/13-parts-library.md), [64조합 화면](evidence/phase13/parts-contact.png)을 확인하세요. 기존 **고급 예제 넣기**는 별도의 전체 초상/수동 표정 패치 예제입니다.

저장·다른 이름 저장·복제·열기는 실제 `.2dsketch` 파일을 만듭니다. 빠진 이미지는 같은 원본 파일을 다시 지정해 연결합니다. 자동 복구는 명시적 저장과 구분되며 **복구본**에서 기존 저장본과 비교해 선택합니다. 복구한 내용은 새 파일로 저장합니다.

**자료 준비 → 그림 파일 선택**에서 RGB/RGBA 8bit PNG·RGB JPEG 한 장을 가져옵니다. 각 변 256~4096px·64MiB 이내이며 확장자와 실제 데이터·손상·자원을 검사합니다. 대상 번호/영역을 확인하고 사각 마스크·단색 배경을 조절해 **선택 영역 분석·적용**을 누르세요. 적용 전에는 기존 프로젝트가 바뀌지 않고, 적용 후에도 원본·이력은 보존됩니다. [가져오기 사용법·한계](docs/planning/12-image-input.md)를 확인하세요.

**그림 한 장 → 선택 영역 분석·적용 → 눈·입과 제한 고개 자동 준비**에서 먼저 가능한 움직임을 확인합니다. 추정 영역/원본을 비교하고 **비교한 자동 결과 적용**을 누르세요. 추정 표정 없는 대체안·폐기·취소/명시적 재시도를 제공합니다. 머리/몸통의 완전 분리·숨은 원래 표정 복원·큰 회전은 제공하지 않습니다. [자동 구조화 사용법/편차](docs/planning/14-single-image.md)를 확인하세요.

자동 결과를 적용한 뒤 **모양 고치기 · 넓은 보정 화면 열기**에서 원화의 눈/입 위치·크기와 사각 경계/가림·앞뒤 순서를 고칩니다. 확대/드래그/수치·부위 시험으로 확인하고 **체크한 새 결과만 적용**하세요. 재분석은 수동 보정을 기본 보호하며 명시적 덮어쓰기 후보·폐기·자동 복원도 비교 후 적용합니다. [보정 사용법과 범위](docs/planning/15-corrections.md)를 확인하세요.

**움직임 시험**에서는 준비된 다섯 제어의 슬라이더·예제 재생·반복·중지를 사용할 수 있습니다. 시험 입력은 이력/파일을 바꾸지 않고, 명시적으로 저장한 세기·부드러움·기본 자세만 편집에 포함됩니다. 이전 1.0~1.8도 읽으며 모델을 업그레이드한 변환본은 다른 파일로 저장합니다.

`.local/toolchain/node-v24.22.3-win-x64/node.exe scripts/verify-input-recovery.mjs`는 261개 검사 그룹과 실제 보정/보호/선택 적용 UI·자동 구조화/보정 GPU 각 25상태·파츠 64조합/1,472프레임·색상/alpha/금색 보존·기존 입력/움직임/편집/저장 회귀 검사를 실행합니다. self-check 창을 표시하며 배포 검사는 기본 창과 1080×720 창을 확인합니다. `run dev`의 “작업 상태 시험”은 고정 입력 모의 작업이고 release에는 시험 버튼이 없습니다. 독립 ART-01 평가·추적/방송·M0 성능·물리적 디스크 고갈/전원 차단 검증은 후속입니다.

[개발 규칙](CONTRIBUTING.md) · [공통 모델](docs/architecture/project-model.md) · [작업/트랜잭션](docs/architecture/workflow.md) · [프로젝트 저장/복구](docs/architecture/project-session.md) · [공통 편집 화면](docs/architecture/common-editor.md) · [움직임 평가](docs/architecture/motion.md) · [자산 정책](docs/architecture/assets.md) · [11 완료 근거](docs/planning/11-common-motion.md)

[그림 입력 구조](docs/architecture/image-input.md) · [12 완료 근거](docs/planning/12-image-input.md)

[파츠 구조](docs/architecture/parts-library.md) · [13 완료 근거](docs/planning/13-parts-library.md) · [자산/생성 프롬프트](assets/product/parts/generation-record.json)

[한 장 구조화](docs/architecture/single-image.md) · [14 완료 근거](docs/planning/14-single-image.md) · [원화/표정 비교](evidence/phase14/quality-comparison.png)

[보정·선택 적용 구조](docs/architecture/corrections.md) · [15 완료 근거](docs/planning/15-corrections.md) · [보정 원화 비교](evidence/phase15/correction-comparison.png)

**분리 그림**에서 PNG 폴더나 `.2dparts`를 열고 배치·역할·캐릭터 좌우·부모를 확인한 뒤 후보를 준비해 비교/적용합니다. `.2dparts` 저장은 원본과 배치 자료 교환이며 독립 아바타 내보내기가 아닙니다. [16 사용법·검증 범위](docs/planning/16-split-image.md) · [형식 계약](docs/architecture/split-image.md). 패키지 검사는 세 제작 경로의 표정/로컬 제작 흐름+기반 코어 범위이며 이전 경로는 전체 개발 앱 회귀로 확인합니다.

**세부 부위·연결·변형**에서 같은 부위의 역할/계층/순서·기준점/망 점/영향/변위·매개변수 연결을 편집합니다. 최소/중립/최대와 영향을 비교한 뒤 적용하고, 부위별로 복원합니다. [17 사용법·검증](docs/planning/17-detail-editor.md) · [세부 편집 계약](docs/architecture/detail-editor.md). M2 제작 기반의 기술 점검이며 표정/제어와 M2 종료는 18단계에서 확인합니다.

**표정·입력 제어**에서 저장할 항목/값/고정 범위를 선택하고 이름을 붙입니다. 표정 적용·해제와 합성 입력은 프로젝트 값을 바꾸지 않습니다. 입 우선 입력·대체·자동 깜빡임·앱 안 단축키를 설정하고, 대상 변경 표정은 다시 연결/제거로 수선합니다. [사용법·M2 로컬 제작 종료 검토](docs/planning/18-expressions.md), [전체 검사 근거](evidence/phase18/verification.json), [배포본/문서 감사](evidence/phase18/audit.json)를 확인하세요.

**카메라·추적 보정**에서 실제 웹캠을 연결하고 영상 수신/얼굴 검출/대상 추적을 구분해 확인합니다. 원본 영상은 이 화면에만 선택적으로 표시하며 캐릭터/프로젝트/기본 로그에 넣지 않습니다. 안정된 중립 후보는 확인 후 적용하고 취소/실패 시 이전 기준을 유지합니다. [사용법·실제 재검증 상태](docs/planning/19-camera-tracking.md) · [기술 계약](docs/architecture/camera-tracking.md).

**마이크·입력 복구**에서 소음 기준 측정/검토 적용·감도·세기·평활과 입 우선 모드를 조절합니다. 유효 무음과 실패를 구분하며 한 장치의 중지가 다른 입력을 끄지 않습니다. 입력 만료 후 기본 동작으로 완화하고 새 입력으로 부드럽게 돌아갑니다. 자동 재연결은 하지 않으며 장치 재선택 후 연결 버튼으로 복구합니다. 녹음·원음 재생·방송 오디오 전송은 하지 않습니다. [20단계 사용법/검증 범위](docs/planning/20-input-recovery.md), [시간/수명/저장 계약](docs/architecture/input-recovery.md).

# Phase 03 — 세 입력 경로의 2D 움직임 시제품

파츠 조합·한 장 그림·분리 그림을 같은 `Project` 구조로 바꾸고 같은 `engine.render`에서 눈·입·고개를 조절한다. PNG 프레임·움직이는 APNG·저장 가능한 실험 프로젝트·위치/영역 보정 화면을 제공한다. **제한된 표본의 가능성 검증 시제품**이며 완성 제품·모든 그림 지원·방송 연결·외부 호환 내보내기 기능은 아니다.

[03 검증 결과](../../docs/planning/03-feasibility.md)에서 T-021~030의 근거와 실패·제한을 확인할 수 있다. 고급 원화는 phase02의 원본을 그대로 읽으며 새로 ImageGen을 호출하지 않는다.

## 1. 실행

저장소 루트의 PowerShell에서 실행한다. 이번 환경은 Windows 11 x64, Python 3.14.10이다.

```powershell
python -m venv .venv-phase03
.\.venv-phase03\Scripts\python.exe -m pip install --require-hashes -r experiments/phase03/requirements-win-py314.lock
.\.venv-phase03\Scripts\python.exe -m pip check
.\.venv-phase03\Scripts\python.exe experiments/phase03/setup_model.py
powershell -NoProfile -ExecutionPolicy Bypass -File experiments/phase03/start.ps1
```

처음 모델 준비에만 네트워크가 필요하다. 공식 저장소의 고정 Face Landmarker 모델을 내려받아 `models/source.json`의 SHA-256을 확인한다. 모델 파일은 git 제외 대상이다. 학습·카메라·마이크 입력은 사용하지 않는다. 모델 다운로드가 불가능해도 이미 저장된 실험 프로젝트는 재분석 없이 열어 움직일 수 있다.

격리 환경의 잠금 파일은 **Windows CPython 3.14용 19개 휠**을 고정한다. 설치할 OpenCV 배포판은 `opencv-contrib-python` 하나이며 같은 `cv2`를 덮어쓰는 `opencv-python`을 함께 설치하지 않는다. 패키지·모델·후보의 채택은 이번 실험용이며 제품 스택 선정은 T-048에서 수행한다.

Windows의 한글 절대 경로에서 네이티브 모델 파일 읽기가 실패하는 문제가 있어, 검증한 모델 바이트를 `model_asset_buffer`로 전달한다. 현재 한글 작업 경로에서 실행을 확인했다.

## 2. 화면 사용법

1. 자료 유형과 입력을 골라 **선택 자료 불러오기**를 누른다. 기본 저장본은 고급 원화 HQ-001이다.
2. 왼눈·오른눈·입·고개 슬라이더 또는 **예제 재생**으로 움직임을 확인한다. 고개는 3D 회전이 아닌 제한된 평면 변형이다.
3. 한 장 그림에서 **눈·입 표시점을 끌어서 수정**을 켜고 표시점을 드래그한다. 영역 배율을 바꾸고 **영역 크기 적용**으로 크기도 수정할 수 있다.
4. 선택한 눈·입이 실제로 가려져 있으면 **가려짐 표시/해제**로 표시한다. `restrict`는 해당 동작 제한, `mirror`는 보이는 반대 눈의 대칭 추정, `inpaint`는 주변 픽셀로 빈 영역을 채우는 비교 모드다. 보완은 원래 숨은 그림의 복원이 아니다.
5. 파츠 경로에서는 **파츠 색·크기 교체 시험**으로 별도 앞머리 변형 자산을 적용하고 기존 제어를 재사용한다.
6. **프로젝트 저장 / F5**로 `results/projects/user-…/project.json`과 텍스처를 저장한다. **저장본 열기**로 다시 확인한다. 입력 원본은 덮어쓰지 않는다.

색상·위치 기준선의 불확실한 제안은 자동으로 눈·입에 연결하지 않는다. 사용자가 위치를 보정해 확인한 부위만 연결한다. 복수 얼굴이면 대상 선택 창에서 캐릭터를 명시적으로 고른다. 실패한 입력을 불러와도 기존 프로젝트를 유지한다.

`weighted`는 아래쪽 몸체를 고정하고 위쪽에 평면 회전·이동을 가중 적용한다. `rigid`는 전체를 함께 움직이는 비교 방식이다. 원본 비교 스위치는 한 장 입력의 원화 확인용이며, 출력 프레임에 보정 표시점은 포함하지 않는다.

## 3. 명령행에서 세 경로 재현

```powershell
.\.venv-phase03\Scripts\python.exe experiments/phase03/cli.py import --route parts --output experiments/phase03/results/local-parts
.\.venv-phase03\Scripts\python.exe experiments/phase03/cli.py import --route single --input experiments/phase02/assets/single/S-001.png --output experiments/phase03/results/local-single
.\.venv-phase03\Scripts\python.exe experiments/phase03/cli.py import --route split --input experiments/phase02/assets/split/L-001.json --output experiments/phase03/results/local-split
.\.venv-phase03\Scripts\python.exe experiments/phase03/cli.py render --project experiments/phase03/results/local-single/project.json --eye-left 0 --eye-right 0 --mouth 0.5 --head-roll 0.3 --output experiments/phase03/results/local-single/frame.png
```

세 경로 모두 같은 `render` 명령과 매개변수를 사용한다. 복수 얼굴의 첫 가져오기는 종료 코드 2와 후보 좌표를 반환하며, `--target 0` 등 명시적인 선택을 추가한다. CLI에는 표시 UI·카메라 연결이 필요 없다.

`parts`는 준비된 PARTS-001 라이브러리를 사용한다. `split`의 시험 형식은 PNG 이미지 묶음과 `canvas/layers/origin/z/role/side` JSON이다. 그룹은 중첩 불투명도만 시험하며 변환·블렌드 효과를 모두 지원하는 레이어 파일 형식은 아니다. PSD·MOC3·INP 지원으로 해석하지 않는다.

## 4. 검증 명령과 근거

```powershell
.\.venv-phase03\Scripts\python.exe experiments/phase03/run_suite.py
.\.venv-phase03\Scripts\python.exe experiments/phase03/ui_smoke.py
```

`run_suite.py`는 실제 정지 이미지 인식·세 경로 변환·합성·최소/중립/최대 동작·저장/재열기·변형 비교·파츠 교체·보완·눈/입 보정·분리 구조 오류를 실행한다. 02의 원본 파일 50개 해시도 재확인한다. 예상된 거부 결과는 정상 검증에 포함되며 ‘모든 그림을 변환했다’는 뜻이 아니다.

`ui_smoke.py`는 실제 Tk 위젯·콜백의 좌표 변환·슬라이더·드래그·영역 크기·가림 표시·저장/재열기·경로 선택·오류 시 현재 작업 유지·창 내 버튼 배치를 **같은 프로세스에서** 검사한다. Computer Use의 네이티브 연결 도우미가 없어 실제 OS 마우스로 창을 조작하는 검수는 수행하지 못했다. 초보 사용자 관찰도 별도다.

| 결과 | 내용 |
|---|---|
| `results/verification.json` | 실행 코드·구성·환경·모델·입력 해시와 기술 검증 결과 |
| `results/ui-integration.json` | Tk 위젯 통합 검사와 직접 마우스 검수의 한계 |
| `results/recognition.json` | 한 장 입력 18건×두 후보의 성공·일부 실패·실패, 좌표 제안·확인 필요 |
| `results/three-routes.png` | 세 경로의 최소·중립·중간·최대·깜빡임 비교 |
| `results/premium-motion.png` | 고급 원화의 같은 상태 비교. 품질 합격 증거와 구분 |
| `results/renders/*/motion.apng` | 무손실 색상 APNG 미리보기. 원본 해상도 PNG 프레임은 같은 폴더 |
| `results/deformation.json` | 두 평면 변형의 실제 CPU 시간·몸체 영향 |
| `results/completion.json` | 명시적으로 위치·가림을 확인한 뒤 수행한 보완 비교. 자동 인식 성공과 분리 |
| `results/correction.json` | 눈·입 위치 오류를 의도적으로 주입한 뒤 복구한 통제 실험 |
| `results/split.json`, `results/common-contract.json` | 분리 입력별 보존·누락·오류와 공통 데이터 계약 |
| `results/projects/*/project.json` | 원본/준비 사본·부위·파라미터·보정·출처를 가진 저장본 |

## 5. 알려진 한계

- 검사한 고급 원화의 중립 얼굴 불투명 픽셀 보존과 눈 감기·입 안·가닥 경계의 완성도는 별개다. 동적 상태는 추정이며 제품 품질 통과로 선언하지 않는다.
- GrabCut 기준선은 미세 머리카락의 정교한 알파 매팅을 보장하지 않는다. HQ-002에는 입력 자체의 색 번짐도 있다.
- 가려진 부위는 자동 위치가 틀릴 수 있다. 보완 비교는 통제 스크립트가 알려진 절차 그림 좌표로 세 부위 위치·가림 상태를 API에 4회 설정한 조건이다. 실제 사용자의 4회 마우스 보정 관찰이 아니다. 대칭 눈은 원래 눈과 다를 수 있고 인페인팅만으로 눈·입 구조를 생성하지 못한다.
- 고개 기본 ±6° 기울기와 얼굴 폭 4.5%의 좌우 이동은 시험 구성이다. 가림 입력은 정규화 ±0.35로 제한한다. 입 벌림도 단일 그림에서는 0.65로 제한한다.
- CPU 렌더 시간은 표시 FPS·추적·방송 지연이 아니다. 렌더러 최적화·방송 동시 부하·외부 형식은 후속 실험이다.
- 생성 JSON은 실험 스키마이며 제품 저장 형식을 확정하지 않는다. 프로토타입 전체의 강제 종료 복구·보안·모든 입력 무결성을 보증하지 않는다.

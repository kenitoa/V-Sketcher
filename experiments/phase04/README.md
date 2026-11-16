# Phase04 — 실제 추적·OBS·독립 외부 아바타 실행

04 초기 가능성 실험이다. 기본 데모는 고급 원화 **PREMIUM-003**이며, 단순 도형 PARTS-001은 구조 회귀용이다. [검증 보고서](../../docs/planning/04-tracking-broadcast-export.md)에 실제 결과·품질·성능·호환 한계를 기록했다. 30FPS 제품 성능이나 완전 자동 리깅을 달성한 데모가 아니다.

## 이 환경에서 바로 실행

프로젝트 루트의 PowerShell에서:

```powershell
# 실제 웹캠/기본 마이크 + 고급 캐릭터 + 격리 OBS 소스, 기본 60초
./.venv-phase04/Scripts/python.exe experiments/phase04/demo.py --mode live

# 카메라/마이크를 열지 않고 기록된 매개변수로 출력 검토
./.venv-phase04/Scripts/python.exe experiments/phase04/demo.py --mode replay

# 우리 앱/서버 없이 공식 Inochi Session에 고급 INP 직접 열기
./.venv-phase04/Scripts/python.exe experiments/phase04/demo.py --mode external
```

live/replay는 OBS의 별도 소스 프로젝터를 연다. 투명 출력 주소는 `http://127.0.0.1:18764`이고 Browser Source 크기는 640×640이다. 첫 3초 정면을 보며 중립을 잡는다. `Ctrl+C` 또는 지정 시간이 지나면 장치·서버를 닫는다. 공개 방송을 시작하지 않는다. `external`에서의 움직임은 파일 안에 담긴 데모 루프이며 외부 앱의 웹캠 바인딩이 아니다. 창을 최소화하면 관찰/창 캡처가 멈출 수 있으므로 독립 동작 확인 때는 창을 열어 둔다.

이 PC에서는 PowerShell 실행 정책이 `.ps1` 실행을 차단하므로 위의 **직접 Python 명령을 기본 경로**로 검증했다. 선택용 `start.ps1`도 제공하지만 실행 정책을 변경하거나 우회하지 않는다. OBS가 비정상 종료 안내로 대기하면 그 실험용 창을 정상적으로 열어 처리해야 하며, 제거된 `--disable-shutdown-check` 플래그로 해결하지 않는다.

## 새 Windows 환경 준비

Python 3.14 x64가 필요하다. 기존 사용자 OBS/Inochi 설치·프로필을 사용하지 않는다.

```powershell
python -m venv .venv-phase04
./.venv-phase04/Scripts/python.exe -m pip install --require-hashes -r experiments/phase04/requirements-win-py314.lock
./.venv-phase04/Scripts/python.exe -m pip check
./.venv-phase04/Scripts/python.exe experiments/phase03/setup_model.py
./.venv-phase04/Scripts/python.exe experiments/phase04/setup_tools.py
./.venv-phase04/Scripts/python.exe experiments/phase04/build_premium.py
```

`setup_tools.py`는 `tools/sources.json`의 공식 버전·SHA-256을 확인한 뒤 폴더 안에만 압축을 푼다. OBS ZIP 약 224MB, Session ZIP 약 20MB다. 다운로드·도구·설정·개인 비밀값은 `.gitignore`로 제외했다. 새 기기 전체 재설치 시험은 아직 하지 않았다. 모델/원화/검증 기록의 해시를 확인하고 재생성 대신 보존 자산을 사용한다.

## 검증 실행

```powershell
# 의미 있는 제어·공통 계약·바이너리·실제 산출물 검사
./.venv-phase04/Scripts/python.exe experiments/phase04/verify.py

# 장치 실제 해제/복귀: 카메라를 사용하는 우리 데모를 먼저 종료
./.venv-phase04/Scripts/python.exe experiments/phase04/device_recovery.py

# 마이크: 사람이 각 구간 안내를 인지한 뒤 별도로 실행
./.venv-phase04/Scripts/python.exe experiments/phase04/mic_probe.py quiet
./.venv-phase04/Scripts/python.exe experiments/phase04/mic_probe.py speech
./.venv-phase04/Scripts/python.exe experiments/phase04/mic_probe.py noise

# live 데모가 30초 이상 실행되는 동안 별도 터미널에서 OBS 부하 측정
./.venv-phase04/Scripts/python.exe experiments/phase04/measure_obs.py --seconds 30 --out local-load.json

# 캐릭터만 있는 장면에서 실제 로컬 x264 인코딩 부하까지 측정
./.venv-phase04/Scripts/python.exe experiments/phase04/measure_obs.py --seconds 30 --record --out local-encoded.json
```

장치 시험의 재실행은 이전 `results` 파일을 갱신하므로 보존 결과를 비교할 때 먼저 복사한다. `tracking.py --out ...`, `runtime.py --out ...`, `measure_obs.py --out ...`으로 별도 결과 이름을 정할 수 있다. 마이크는 원음 저장 없이 RMS를 기록한다. `.local/recordings`는 **아바타 출력만** 담은 로컬 녹화이며 마이크·데스크톱 오디오는 음소거된다. 네트워크 송출을 시험하지 않는다.

## 주요 파일과 증거

| 파일 | 역할 |
|---|---|
| `tracking.py` | 실제 MediaPipe VIDEO/DirectShow, RMS, 중립·sign/gain·손실·복귀 제어 |
| `runtime.py`, `preview_renderer.py` | 공통 프로젝트, lossless 부위 crop, 캐시된 고급 상태/제한 평면 출력, avatar-only loopback 서버 |
| `build_premium.py` | 생성 원화/추가 상태에서 직접 지정한 눈·입 패치를 공통 Project/Part로 가져옴. 자동 리깅으로 주장하지 않음 |
| `export_inp.py` | 내장 PNG·uint UUID·normalized parameters·native animation·Session extension을 갖는 INP |
| `demo.py`, `start.ps1` | 사용자 기본 진입점. 고급 자산·격리 OBS·독립 Session 실행 |
| `obs_control.py`, `measure_obs.py` | 인증된 공식 OBS API·실제 소스 캡처·합성/로컬 인코딩 부하 |
| `verify_external.py`, `verify_alpha.py` | 우리 앱 없는 독립 움직임, 두 실제 OBS 배경에서 투명도 검사 |
| `exports/PREMIUM-003.inp` | 대상 프로그램이 직접 읽는 독립 아바타. 프로젝트 JSON이나 이미지 폴더로 대체하지 않음 |
| `results/external-premium.gif` | 실제 공식 외부 실행창의 움직임 |
| `results/obs-encoded-load.json` | 실제 카메라·고급 캐릭터·OBS·x264/MKV 인코딩 동시 측정 |
| `results/artifact-manifest.json` | 최종 코드·자산·선정 증거의 고정 해시와 이전 자산 보존 검사 |

`results/external-session-first.png`·`external-premium-first.png` 등 초기 캡처에는 도형 회귀 자산·알파 변환 결함이 남아 있다. 최종 기본 아트/합격 증거가 아니며, 결함을 찾은 기록으로만 보존했다. 가려진 창에서 모든 프레임이 같았던 실패 캡처를 독립 동작 통과로 세지 않았다. 최종 판정은 `external-independent.json`의 `pass`·현재 모델 해시와 실제 변화 캡처를 따른다.

# 05. 제품 구현 스택·의존 요소 선정

| 항목 | 기록 |
|---|---|
| 연결 | T-048, DEC-01/05/06/07/09/10/12 |
| 결정일 / 담당 | 2026-11-16 / Codex |
| 판정 | **구현 착수 스택 선정 완료**, 새 제품 스택의 빌드·GPU 성능·포장 실행은 미검증. [M0 HOLD](./05-m0-review.md)를 해제하지 않음 |
| 재현 자료 | [npm/PyPI 공식 레지스트리 조회](../../experiments/phase05/results/package-research.json), [Node 공식 배포 조회](../../experiments/phase05/results/node-research.json), [04 실행 의존 해시](../../experiments/phase04/requirements-win-py314.lock) |

## 1. 채택 구조와 이유

**Electron + TypeScript/React UI, 공유 WebGL2 렌더러, 별도 Python 분석·추적 worker, 로컬 OBS Browser Source, INP exporter**를 채택한다. 이미 실행한 Python 추적·파일 분석과 내보내기 지식을 재사용하면서 렌더링·표시·방송 소스의 매 프레임 CPU 픽셀 처리/PNG 전송을 제거하기 위한 선택이다. 새 구조로 30FPS가 나온다고 아직 주장하지 않는다.

| 책임 | 선택 | 경계·검증할 사항 |
|---|---|---|
| 앱 수명·파일·장치 작업 관리 | Electron main / Node | 파일 대화상자·worker 실행/종료·저장·복구·출력 프로필. UI의 임의 OS 호출을 허용하지 않음 |
| 제작·보정·안내 UI | React + TypeScript + Vite | 세 입력 경로를 같은 편집 상태/명령으로 합류. local-only 콘텐츠와 제한된 preload API. UI를 방송 소스로 캡처하지 않음 |
| 공통 데이터/동작 평가 | TypeScript `scene-core` + JSON Schema 2020-12/Ajv | 안정된 부위/자산 ID·원본 좌표·망·상태·곡선·정규화 제어·리비전·출처·손실. 특정 INP 스키마를 내부 모델로 쓰지 않음 |
| 앱/OBS 실제 렌더 | 같은 WebGL2 `avatar-renderer` | 텍스처 상주·삼각망·곡선·가중 변형·premultiplied alpha 합성. 자산/scene hash와 renderer 버전으로 일치 확인. App Chromium과 OBS CEF의 공통 기능만 사용 |
| 그림 디코드·분석·얼굴/마이크 입력 | Python worker | MediaPipe/OpenCV/Pillow/sounddevice의 검증 버전. 불변 입력과 ID/리비전이 있는 결과. 렌더 프레임 생성은 맡기지 않음 |
| worker IPC | main이 묶음 EXE를 `child_process.spawn`으로 실행, stdin/stdout 프레이밍 | executable 경로 고정, `shell:false`, stderr 진단 분리, 메시지 길이·프로토콜·스키마 검사, 취소 세대·시간 제한. 임의 명령/피클/코드 실행 금지 |
| OBS 연결 | main의 loopback HTTP + `ws` | 아바타 자산과 다섯 제어/scene 변경만 전달. 전체 PNG 30장을 매초 만들지 않음. OBS 자동화는 선택적 기존 WebSocket 어댑터 |
| 외부 내보내기 | 독립 INP adapter / Python exporter 출발 | 고정 SDK v0.8.6 매핑, 바이너리/텍스처/파라미터 검사, 같은 리비전의 내부/외부 비교. 구동 중 우리 worker/서버가 필요하면 독립 내보내기 실패 |
| worker 패키지 | PyInstaller `onedir` | Python·DLL·모델·NOTICE를 동반하고 개발 환경 없이 실행. 임시 self-extraction 비용을 피하려고 onefile은 첫 선택에서 제외 |
| 앱 패키지 | Electron Forge ZIP / Windows x64 | `2DSketcher.exe` 한 진입점+리소스/worker. 실제 Windows에서 제작·새 Windows에서 실행 시험. 서명·무결성·라이선스 자료는 공개 배포 선행 조건 |

WebGL2는 [Khronos의 고정 2.0.0 사양](https://registry.khronos.org/webgl/specs/2.0.0/)을 공통 API 기준으로 삼는다. 특정 GPU의 지원·CEF 기능·프레임 성능은 사양 존재와 별개로 시험한다. 소프트웨어 렌더러로 내려간 환경은 초기 성능 지원 범위로 세지 않는다. WebGPU·네이티브 Spout 공유 텍스처는 첫 스택에 넣지 않는다.

## 2. 버전 기준선

2026-11-16 공식 배포/레지스트리에서 조회한 다음 버전을 **첫 구현의 최상위 의존 기준선**으로 정한다. 이번에는 제품 npm 설치·전체 lockfile 생성·Electron 다운로드·worker EXE 빌드를 하지 않았다. T-053에서 `npm ci`/Python 해시 설치 가능한 전이 의존 lock과 모델/도구 해시를 고정하고, 충돌이 있으면 변경 사유를 이 결정에 남긴다. 단순 조회를 설치·실행 성공으로 세지 않는다.

| 요소 | 선택 버전 | 상태 / 선택 근거 |
|---|---|---|
| 개발 Node / npm | 24.22.3 LTS / 11.19.1 | [공식 배포 index](https://nodejs.org/dist/index.json)의 2026-11-10 배포. 사용자 설치 요구가 아닌 개발 도구 |
| Electron | 45.3.3 | 공식 npm metadata·[해당 버전 MIT 라이선스](https://github.com/electron/electron/blob/v45.3.3/LICENSE). 새 빌드/CEF 차이 재검증 필요 |
| TypeScript | 7.0.2 | 공식 npm 배포 기준. strict 타입·직렬화 계약에 사용. 실제 도구 조합 빌드는 T-053 검증 |
| React / react-dom | 19.3.1 / 19.3.1 | 두 버전 정합 고정. 상태/UI 계층에 한정하며 per-frame React rerender를 렌더 루프로 쓰지 않음 |
| Vite | 8.3.8 | UI·공통 렌더러 자산 빌드. 실행 시 개발 서버를 사용자 PC에 띄우지 않음 |
| Electron Forge CLI / maker-zip | 8.0.1 / 8.0.1 | [ZIP maker 공식 안내](https://www.electronforge.io/config/makers/zip). 앱 배포 형태와 일치 |
| Ajv / ws | 8.20.0 / 8.23.0 | 스키마 검사 / local WebSocket. 공개 API 서버 용도로 확장하지 않음 |
| Python | 3.14.10 x64, 일반 CPython | 03~04에서 실제 동작한 interpreter. free-threaded ABI·다른 major/minor는 별도 검증 |
| MediaPipe / 모델 | 1.2.3 / Face Landmarker float16 v1 | 실제 CPU 추적 약 29.6FPS. 모델 SHA `64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff`. 한글 경로는 model bytes loading으로 대응 |
| OpenCV / Pillow | opencv-contrib-python 5.0.0.93 / 13.0.0 | 디코드·분석·참조 비교. OpenCV 배포를 중복 설치하지 않음 |
| sounddevice | 0.5.6 | 실제 MME RMS 확인. 장치 선택/소음 보정·다른 장비는 재검증 |
| PyInstaller | 6.22.3 | 공식 지원 Python 범위에 3.14 포함. [운영 방식](https://pyinstaller.org/en/stable/operating-mode.html)의 self-contained 폴더 배포를 선택. 해당 worker bundling은 미수행 |
| 외부 검증 대상 | OBS 33.0.1 / WebSocket 5.7.6, Inochi Session v0.8.7 / SDK v0.8.6 | 실험 버전 고정. 시스템에 프로그램을 이미 설치했다고 가정하거나 제품에 동봉하지 않음 |

04의 전체 Python lock은 비교·실험 재현용으로 보존한다. 제품 worker에서 필요 없는 Tk 데모·실험용 UI·측정 라이브러리를 사용자 기능으로 싣지 않는다. 간접 의존을 임의 삭제해 설치를 깨뜨리지 않으며 실제 import/수집 검증 후 빌드 목록을 정한다. 외부 앱·모델·분석/렌더 코드가 바뀌면 기존 성공 기록을 재사용하지 않는다.

## 3. 사용 조건·배포 검토

다음은 공식 metadata/라이선스를 확인해 선정에 반영한 범위이며, 완성 배포물의 전이 의존·폰트·코덱·아트 권리 검토가 끝났다는 선언이 아니다.

| 구성 | 확인한 조건 | 배포/교체 대응 |
|---|---|---|
| Electron, React, Vite, Forge, Ajv, ws | 공식 registry의 MIT 표기. Electron 자체와 묶인 Chromium/Node·제3자 구성은 별도 고지 자료가 존재 | upstream LICENSE/NOTICE·전체 dependency inventory를 릴리스와 함께 보관. Electron 자체 MIT만으로 모든 번들 파일을 동일 조건으로 취급하지 않음 |
| TypeScript | 공식 registry Apache-2.0 | 개발 도구/배포 포함 여부를 구분하고 필요한 고지를 보존 |
| Python/NumPy/MediaPipe/OpenCV/Pillow/sounddevice 및 간접 의존 | 기존 [02 후보/조건 조사](./02-candidates.md), 04 lock, 공식 registry의 Apache-2.0/MIT-CMU/MIT 등 표기 | interpreter·wheel의 LICENSE/NOTICE·DLL/PortAudio/코덱·실제 모델 카드까지 정확한 버전별 inventory 필요. 코드와 모델의 조건을 구분 |
| PyInstaller | GPL 2.0 계열 및 배포 번들에 대한 예외·일부 파일 Apache-2.0을 [공식 문서](https://pyinstaller.org/en/stable/license.html)에서 확인 | worker를 묶는 도구로 선택. 각 의존의 조건이 사라지는 것은 아님. 도구 수정본을 배포하면 그 수정본 조건도 따로 검토 |
| INP adapter / Inochi2D | [v0.8.6 SDK BSD-2-Clause](https://github.com/Inochi2D/inochi2d/blob/v0.8.6/LICENSE), 모델 자산의 권리와 구분 | 런타임/공식 브랜드 실행기는 동봉하지 않음. 참조/차용 코드가 있으면 해당 고지 유지. 우리 exporter와 독립 원본 자산의 출처를 보존 |
| OBS | 별도 GPL 배포 프로그램, 브라우저 소스와 선택적 공식 API 연결 | 실행기를 제품에 묶지 않음. 별도 공식 설치 안내. OBS 버전 변경은 소스·알파·성능/인코딩 호환 재검증 |
| 고급 아트 | 현재 개발용 ImageGen 원화/표정·프롬프트·출처/해시 기록 | 64개 제품 조합의 최종 아트·폰트·이용 조건은 별도 확보. 사용자 자료를 자동 학습/공유 자산으로 전환하지 않음 |

## 4. 비교 후 채택하지 않은 대안

| 대안 | 장점 | 최초 선택에서 제외한 이유 / 다시 검토할 조건 |
|---|---|---|
| Python/Tk + Pillow/OpenCV per-frame + PNG HTTP | 03~04의 실행·회귀·분석 증거가 이미 있음 | 고급 자산+OBS 14.08FPS로 부족. 구조 참고/CPU 정답 비교만 유지. GPU 전환이 실패하면 이 경로를 낮은 품질의 제품 기본으로 되돌리지 않음 |
| PySide6/Qt Quick + GPU | Python 재사용, [Qt의 GPU scene graph](https://doc.qt.io/qt-6/qtquick-visualcanvas-scenegraph-renderer.html)로 하드웨어 합성 가능 | OBS 브라우저 렌더러와 다른 실행/셰이더 경로 및 Qt 모듈별 LGPL/GPL/상용 조건 검토가 추가됨. WebGL/CEF 공통 경로가 성능/표현에 실패하면 실제 비교 실험 후 다시 연다. Qt 성능이 나쁘다고 결론내린 것은 아님 |
| C#/WPF + D3D 또는 C++/Qt | Windows 네이티브 통합·GPU 제어 | 현재 분석/추적을 새 binding/interop로 옮기는 비용, OBS와 다른 렌더 경로를 이번 최소 구현에 추가하지 않음. 실측 없는 성능 우열을 주장하지 않음 |
| Inochi2D를 내부 프로젝트/실행기 전체로 사용 | 외부와 표현을 맞출 수 있음 | 내부 구조의 외부 스키마 종속, 기존 Python/편집 흐름과의 경계, 다른 장기 출력 경로의 변화 부담. 형식 adapter로 먼저 고정 |
| Cubism/VTube Studio | 별도 사용자 생태계·표현 후보 | moc3 생성 경로와 별도 SDK/배포 조건·실제 파일 구동이 미검증. 파라미터 송신으로 독립 내보내기를 대체할 수 없음 |
| 서버 추적/분석, WebGPU, Spout/NDI | 별도 가속·전송 선택지 | 현재 로컬 요구와 검증되지 않은 의존/설치/호환/자료 이동이 늘어남. 성능 실패의 원인이 확인됐을 때 대안별 실험을 새로 연다 |

## 5. 구현 경계·교체 위험

렌더러는 `SceneSnapshot + ParameterFrame → RGBA` 계약만 소유한다. 추적이 MediaPipe인지 마이크인지, 입력이 세 경로 중 어느 것인지에 따라 렌더러를 나누지 않는다. 모델/추적을 바꿔도 정규화 제어 계약은 유지하고 export adapter는 schema capability를 보고 변환한다.

디스크 원본은 straight-alpha/sRGB와 원래 바이트를 보존한다. 편집용 파생·GPU premultiplied 표현·INP의 내장 표현을 각각 `alphaMode/colorSpace/sourceHash`로 구분한다. GPU에 올린 변환 결과를 원본 파일에 덮어쓰지 않는다. 컬러·알파 변환의 독립 참조와 두 실제 배경 비교를 통과시킨다.

worker의 메시지/작업 ID·리비전·취소 규약을 먼저 고정하고 교체 가능한 프로세스 경계로 둔다. Electron `utilityProcess`는 [Node 프로세스용 API](https://www.electronjs.org/docs/latest/api/utility-process)이므로 Python EXE 실행에 같은 API를 쓴다고 가정하지 않는다. 무거운 작업이 멈춰도 렌더/손실 감시/복구 버튼은 살아 있어야 한다.

Electron renderer는 `nodeIntegration:false`, `contextIsolation:true`, sandbox, CSP와 제한된 IPC·외부 링크 allowlist를 적용한다. 원본 JSON/이미지/외부 URL이 OS 실행 권한을 얻지 않도록 main에서 검증한다. [Electron 공식 보안 안내](https://www.electronjs.org/docs/latest/tutorial/security)를 구현 기준으로 사용한다. 이는 사용자에게 추가 보안 확인 팝업을 반복 표시하라는 뜻이 아니다.

Electron은 [최근 안정 major 3개를 지원](https://www.electronjs.org/docs/latest/tutorial/electron-timelines)하므로 선택 버전을 영구 고정하지 않는다. 배포 시 보안 업데이트·지원 종료를 확인하고 패치를 검토한다. major/CEF/GPU backend·모델·외부 프로그램 변경은 자동 렌더/부하/내보내기 재검증 조건이다. 모든 교체는 원본 프로젝트·마지막 정상 빌드와 호환 기록을 보존한다.

**다음 검증:** M0-R01은 같은 고급 scene을 실제 Electron/OBS GPU 경로에서 3회 측정한다. M0-R04는 공통 움직임과 INP의 표현/독립 활용을 다시 비교한다. M0-R05는 worker·모델·패키지가 개발 도구 없는 Windows에서 동작하는지 확인한다. 이 결과 전에는 CPU 시제품의 검사를 새 스택의 검증으로 옮겨 쓰지 않는다.

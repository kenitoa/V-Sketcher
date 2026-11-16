# 04. 추적·방송·외부 내보내기의 초기 가능성 검증

| 항목 | 기록 |
|---|---|
| 작성 / 담당 | 2026-11-16 / Codex, 사용자가 실제 표정·고개·음성 입력 및 외부 화면 관찰에 참여 |
| 연결 | T-031~040, F-TRK-001~004, F-MOT-005, F-BRD-001~002, F-EXP-002~005, DEC-01/05/06/07/11 |
| 실제 구현 | [실험 코드·실행 안내](../../experiments/phase04/README.md), 공통 Project/Part와 다섯 매개변수 재사용 |
| 결론 | 실제 웹캠 추적→고급 캐릭터→OBS 소스 수신과, 앱 종료 후 공식 Inochi Session의 독립 움직임을 확인했다. 04의 초기 가능성 검증을 완료했다. |
| 완료의 범위 | 측정·실행·손실 확인의 완료다. 30FPS·고급 리깅 품질·완전 자동 제작·전체 외부 호환·제품 출시의 합격이 아니다. 05단계의 최종 기술 선택은 미수행이다. |

## 1. 장비·환경과 실제 관찰

Windows 11 Pro 10.0.26300, i5-13420H, RAM 약 31.71GiB, Intel UHD와 RTX 4050 Laptop 환경에서 실행했다. 기존 [02 장비 기록](../../experiments/phase02/results/environment-current.json)을 이어 사용했다. 실제 입력은 HD Webcam의 640×480 DirectShow 프레임과 기본 **내장 마이크 배열**의 MME 모노 44,100Hz다. UR-001의 과거 헤드셋 사용 경험과 이번에 연결된 마이크를 혼동하지 않는다. 헤드셋 자체는 이번 시험 대상이 아니다.

별도 `.venv-phase04`에 Python 3.14.10, MediaPipe 1.2.3, opencv-contrib-python 5.0.0.93, Pillow 13.0.0, sounddevice 0.5.6, websocket-client 1.9.2, psutil 7.2.2를 설치했다. [해시 고정 의존 목록](../../experiments/phase04/requirements-win-py314.lock)과 `pip check`로 확인했다. MediaPipe 모델은 03의 고정 SHA-256을 검사한 뒤 메모리 버퍼로 읽는다.

[공식 OBS Studio 33.0.1](https://github.com/obsproject/obs-studio/releases/tag/33.0.1)과 [공식 Inochi Session v0.8.7](https://github.com/Inochi2D/inochi-session/releases/tag/v0.8.7)을 프로젝트 실험 폴더의 포터블 도구로 실행했다. OBS WebSocket은 5.7.6 / RPC 1이다. [다운로드 출처·SHA-256](../../experiments/phase04/tools/sources.json)을 보존하고, 사용자 기존 OBS 설정과 별도 프로필·장면·앱 데이터 폴더를 사용했다. OBS API는 인증을 켰으며 비밀번호·설정·대용량 도구는 추적 대상에서 제외했다. 카메라/마이크 원본 영상·PCM은 저장하지 않았다.

Windows UI 제어 도구는 연결·재시도·세션 재초기화 후에도 native pipe 연결 오류가 나 직접 마우스 조작을 수행하지 못했다. OBS의 [공식 WebSocket 요청](https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md)과 Inochi의 파일 인자 실행을 사용했다. 사용자는 외부 창을 앞으로 열어 **움직임이 보임**을 확인했고, 이후 실제 창 캡처에서도 변화가 잡혔다. 감춰지거나 최소화된 창의 정지 캡처를 동작 증거로 사용하지 않았다.

[사용자 관찰 기록](../../experiments/phase04/results/human-observations.json)에 다음을 구분했다.

- 첫 45초에는 실제 표정·고개 입력을 했다. 사용자가 **음성 시험은 하지 않았음**을 밝혔으므로 이 파일의 `speech/noise` 시간 구간은 요청 타임라인일 뿐 음성 종류의 정답이 아니다.
- 후속 음성은 조용히 있기→말하기→키보드/손뼉 소음을 각각 8초씩 별도로 안내해 측정했고, 사용자가 **세 구간 모두 진행함**을 확인했다.
- 고급 캐릭터의 Inochi Session 창에서 사용자가 움직임을 관찰했다. 같은 모델의 독립 실행 시퀀스도 보존했다.

## 2. 카메라 추적·제어·복구 — T-031/032/034

[Face Landmarker Python 공식 안내](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/python)의 VIDEO 모드로 blendshape와 변환 행렬을 읽었다. 프레임은 추론 뒤 버리고 좌표·음량·처리 시간·매개변수만 기록했다.

| 항목 | 실제 결과 / 해석 |
|---|---|
| 첫 실제 입력 | 약 45초, 1,331프레임, 얼굴 발견 1,313프레임, 약 29.6FPS |
| 캡처 대기 | 중앙값 19.62ms / p95 35.81ms. 센서 노출·디스플레이 지연을 포함한 전체 지연이 아님 |
| 추론 | 중앙값 12.30ms / p95 19.08ms |
| 관찰된 범위 | 왼/오른 눈 감김 최대 0.766/0.734, jawOpen 최대 0.0382, yaw -40.62~+6.76°, roll -5.39~+19.36°. 이 사람·이 세션의 관측 범위이며 추적기의 보장 범위가 아님 |
| 접근·권한 | 이 Python 프로세스에서 실제 카메라·마이크 열기에 성공. 권한 거부 상태로 전환하거나 OS 보안 설정을 바꾸지 않음. 실패 시 해당 API만으로 권한 거부와 장치 점유를 확정 분류하지 않음 |
| 장치 점유 | 첫 DirectShow 핸들을 유지한 채 두 번째 핸들도 열기·프레임 읽기에 성공. 이 드라이버 결과이며 모든 기기·앱 조합의 공유 보장이 아님 |
| 중립 보정 | 초기 유효 얼굴 샘플의 yaw/roll 중앙값을 차감. 런타임 첫 3초를 사용. 눈 1·입 0·고개 0이 공통 중립 |
| 방향·세기 | yaw 30°, roll 25° 기준 정규화, 축별 gain/sign 조절, jawOpen gain 12. 눈 0~1·입 0~1·고개 -1~1로 제한. 단일 그림 등의 기존 프로젝트 제한도 적용 |
| 손실·복귀 | 얼굴이 없으면 0.3초 유예 후 중립으로 완화. 마이크 모드에서는 마이크만 입을 소유하고 끊기면 입을 닫음 |
| 실제 재연결 | 캡처 핸들 해제→실시간 중립 전환 2초→다시 열기. 복귀 후 51프레임을 읽고 그중 29프레임에서 얼굴 발견. 2초 후 중립 오차 약 9.35×10⁻¹² |
| 복귀 결함 수정 | 긴 장치 대기를 평활화 dt로 그대로 쓰면 한 번에 값이 변했다. dt와 갱신 변화량을 제한한 뒤 실제 최대 변화량 0.2/갱신. 물리 USB 분리·OS 권한 철회 시험과 구분 |

근거: [live-input.json](../../experiments/phase04/results/live-input.json), [device-recovery.json](../../experiments/phase04/results/device-recovery.json), [tracking.py](../../experiments/phase04/tracking.py), [제어·복구 검사](../../experiments/phase04/results/verification.json). 이후 수정본의 실제 고급 캐릭터 입력은 `runtime-final-live.json`에도 기록했다.

## 3. 마이크 입 반응 — T-033

`sounddevice.InputStream`의 실제 콜백에서 RMS만 계산했다. 세 구간 모두 344블록, 콜백 오류 0이었다. 같은 실제 측정값을 threshold 0.005/0.015/0.03/0.06 및 gain으로 다시 계산해 입 반응 차이를 확인했다. 여기서 활성 비율은 **음성 인식 정확도**가 아니라 RMS 문턱을 넘은 표본 비율이다.

| 사용자 수행 구간 | RMS 중앙값 / p95 | threshold .005 활성 | threshold .015 활성 |
|---|---|---|---|
| 조용히 8초 | 0.000816 / 0.001608 | 0% | 0% |
| 말하기 8초 | 0.000931 / 0.009341 | 10.10% | 4.23% |
| 소음 8초 | 0.000686 / 0.003571 | 2.26% | 0% |

문턱을 올리면 이번 작은 소음을 억제하지만 말하기의 반응도 줄었다. 이번 입력의 큰 피크는 0.337까지였으며 낮은 소리 대부분은 문턱 아래였다. 따라서 감도 조절 가능성은 확인했으나 **RMS만으로 말소리와 큰 주변 소음을 구분할 수 없다**. 음성 품질·발화 검출·다른 마이크·지속 소음의 합격 근거로 사용하지 않는다. 초기 .015는 이 측정에서 약한 말소리에 둔감하므로 제품 기본값으로 확정하지 않았다. 사용자별 소음 보정·게이트·VAD 비교를 T-043/047/048의 판단 자료로 넘긴다.

실제 측정: [조용함](../../experiments/phase04/results/mic-quiet.json) · [말하기](../../experiments/phase04/results/mic-speech.json) · [소음](../../experiments/phase04/results/mic-noise.json). [입 제어 재생](../../experiments/phase04/results/mic-mouth-replay.json)은 기록된 **RMS 값의 재생**이며 원음 녹음 재생이 아니다. gain 변경과 입력 손실의 입 닫힘도 자동 검사했다.

## 4. 사용자 노출 자산의 품질 수정

사용자가 단순 도형 캐릭터의 낮은 품질을 지적했다. 이후 구조 회귀용 PARTS-001을 사용자 데모 기본값에서 제외하고, ImageGen으로 고급 원화와 눈 감기·말하기 상태를 마련했다. **04의 기본 데모·방송·외부 실행은 PREMIUM-003**이다. 고급 자산을 문서에만 두지 않고 실제 출력에 연결했다.

- 원본: [neutral.png](../../experiments/phase04/assets/premium/neutral.png), [blink-speaking.png](../../experiments/phase04/assets/premium/blink-speaking.png), 각각 실제 1254×1254 RGBA.
- 실제 렌더: [눈 감기](../../experiments/phase04/results/premium-blink.png), [말하기](../../experiments/phase04/results/premium-speaking.png), [OBS 소스](../../experiments/phase04/results/obs-final-load-source.png).
- [프롬프트·출처](../../experiments/phase04/assets/premium/generation-prompts.md), [파생 자원·수동 영역·해시](../../experiments/phase04/assets/premium/import.json)를 보존했다. 도구가 실제 모델 식별자를 제공하지 않으므로 GPT Image 2.0으로 생성했다고 단정하지 않는다.

정교한 얼굴·머리카락·의상 디테일을 유지하는 원화/표정 텍스처를 사용하지만, **완전 분리 리깅은 아니다**. 전체 초상 1부위와 직접 지정한 눈/입 패치 3부위다. 추가 상태의 생성·영역 지정·feather 처리가 필요했으며 자동 한 장 리깅·초보자 완주 증거로 세지 않는다. 일부 가는 색 경계와 원화의 253/255 알파가 남는다. 얼굴 표정 사이의 질감/형태 연속성, 물리·입 모양·옆면·머리카락 독립 움직임은 제품 품질 검증 대상이다. NFR-ART-01을 최종 합격으로 바꾸지 않았다.

## 5. OBS 수신·투명도·부하 — T-035/036

실행기는 `127.0.0.1:18764`에서 **아바타 RGBA PNG와 투명 canvas**만 제공한다. 편집 UI·웹캠 프레임·마이크 원음을 제공하는 경로가 없다. OBS Browser Source가 그 주소를 직접 읽는다. 서버 시작 여부와 별도로 OBS의 실제 `GetSourceScreenshot`·통계·장면 합성을 확인했다.

실제 어두운 배경 RGB(17,34,51) 및 밝은 배경 RGB(234,226,238)을 OBS color source로 캐릭터 뒤에 놓았다. 캐릭터 밖의 네 지점 모두 각 배경색과 정확히 일치했다. [두 배경 검증](../../experiments/phase04/results/obs-alpha-composite.json), [어두운 배경 실제 OBS](../../experiments/phase04/results/alpha-dark-obs.png), [밝은 배경 실제 OBS](../../experiments/phase04/results/alpha-light-obs.png). 소스 PNG에는 완전 투명·부분 알파가 실제 남는다. 검은 배경을 그려 넣은 캐릭터가 아니다.

| 실제 30초 실행 조건 | 고유 캐릭터 FPS | 렌더+PNG 중앙값 / p95 | PNG 발행→첫 브라우저 디코드 ACK 중앙값 / p95 |
|---|---|---|---|
| 512px 구조 회귀, 기존 weighted CPU + 카메라 + OBS | 9.03 | 104.11 / 166.27ms | 26.74 / 44.05ms |
| 640px 고급 자산, 캐시된 상태+제한된 평면 움직임 + 카메라 + OBS, Inochi도 실행 중 | 11.00 | 83.86 / 135.06ms | 41.34 / 71.24ms |
| 수정본 640px 고급 자산 + 실제 카메라 + OBS, Inochi 종료 | 13.57 | 66.87 / 111.13ms | 37.79 / 61.03ms |
| 고급 자산 + 실제 카메라 + OBS 로컬 x264/MKV 인코딩 | 14.08 | 65.43 / 102.77ms | 31.53 / 54.48ms |

마지막 조건에서 OBS는 903 합성 프레임 / 건너뜀 0, 자체 보고 CPU 평균 약 2.20%·메모리 최대 약 537.93MiB였다. psutil의 **한 코어를 100%로 보는 별도 척도**에서는 Python 평균 81.24%, OBS 26.35%, 브라우저 자식 16.82%였다. 서로 다른 CPU 척도를 섞지 않는다. 시스템 전체 CPU 평균 60.57%였고 기존 앱이 실행된 환경이므로 전체 사용량을 이 시제품만의 부하로 해석하지 않는다. NVIDIA 단일 시점은 GPU 9%·메모리 335MiB였으며 추적/합성 알고리즘을 GPU로 가속했다는 뜻이 아니다.

OBS 설정은 1920×1080 캔버스, 1280×720 출력, 30FPS다. **OBS 30FPS와 캐릭터의 새로운 프레임 13.57FPS는 다르다.** 브라우저 ACK는 렌더 완료 후 PNG 소비 지연으로, 센서 노출→캐릭터→디스플레이 또는 네트워크 송출의 전체 지연이 아니다. 서로 다른 파이프라인/해상도의 앞선 시험을 동일 조건의 최적화 배수로 비교하지 않는다.

이어서 실제 OBS의 로컬 x264/MKV 녹화를 병행한 [인코딩 부하 기록](../../experiments/phase04/results/obs-encoded-load.json)을 남겼다. OBS 합성 904프레임·건너뜀 0, 캐릭터 고유 14.08FPS였다. 실제 파일은 muxer가 닫힌 뒤 약 1.80MB이며 OpenCV에서 1280×720·30FPS·926프레임으로 열고 네 시점의 서로 다른 프레임을 디코드했다. [영상 검사](../../experiments/phase04/results/recording-inspection.json)와 [아바타 출력 영상](../../experiments/phase04/results/captured-avatar-only.mkv)에 근거를 남겼다. 장면은 캐릭터 소스 하나만 활성화하고 모든 기본 마이크·데스크톱 오디오를 음소거했다. 송출 서버에 접속하거나 인터넷 방송을 시작하지 않았다. 저장 영상은 캐릭터 합성 결과이며 카메라 원본/원음 녹화가 아니다. 공개 방송·네트워크 품질·장시간 발열·다른 인코더·1080p 캐릭터 출력은 미검증이다. 시점·실제 입력·주변 앱 부하가 다르므로 13.57→14.08을 인코딩에 의한 성능 개선으로 해석하지 않는다. 인코딩 기록의 프로세스 표본에는 `demo.py` Python이 빠져 있어 Python 자원 비교는 앞선 `obs-final-load.json`을 사용한다. 후속 측정기는 이 누락을 수정했다.

초기 녹화 요청은 성공 응답만 오고 실제 출력이 시작되지 않아 실패로 처리했다. OBS 33의 `user.ini` 첫 실행 설정과 프로필 변경 후 출력기 재초기화를 보완하고, 실제 `outputActive`·파일 존재·디코드를 확인한 뒤에만 인코딩 결과로 채택했다. 첫 숨겨진 마법사 및 가려진 창 캡처 문제를 30FPS나 호환 성공으로 세지 않는다. 제거된 구형 `--disable-shutdown-check` 옵션은 최종 실행 명령에서 사용하지 않는다. 강제 종료했던 자체 포터블 인스턴스의 실행 표식만 로컬 보관 폴더로 옮겼으며 사용자 기존 설치는 변경하지 않았다.

**판정:** 실제 OBS 전달·투명 합성·동시 부하의 초기 검증은 완료했다. 30FPS·지연·고급 표현의 제품 목표는 미달/추가 검증이다. [원자료](../../experiments/phase04/results/obs-final-load.json), [고급 캐릭터 실제 입력](../../experiments/phase04/results/runtime-final-live.json), [측정 코드](../../experiments/phase04/measure_obs.py)를 T-047/048/050의 성능 개선 및 M0 재검토 근거로 넘긴다.

## 6. 실제 외부 내보내기·독립 실행 — T-037/038

[SDK v0.8.6의 실제 INP 로더](https://github.com/Inochi2D/inochi2d/blob/v0.8.6/source/inochi2d/fmt/package.d)와 [Session v0.8.7의 파일 인자 로딩](https://github.com/Inochi2D/inochi-session/blob/v0.8.7/source/session/windows/main.d)을 확인해 Python 내보내기 코드를 작성했다. 최신 개발 브랜치의 GUID 형식과 배포 실행기가 요구하는 uint UUID 형식을 혼용하지 않았다.

실제 [PREMIUM-003.inp](../../experiments/phase04/exports/PREMIUM-003.inp)는 7개 PNG 상태 텍스처, 4개의 논리 부위, 5개 제어, 약 4초짜리 눈·입·고개 데모를 포함한다. 텍스처와 애니메이션이 파일 안에 있어 Python·PNG 서버·편집 프로젝트가 실행에 필요하지 않다. [매핑·변환 손실](../../experiments/phase04/exports/PREMIUM-003.mapping.json)을 함께 기록했다.

두 결함을 실제 대상 실행에서 찾아 고쳤다. 일반 straight-alpha PNG를 그대로 넣으면 패치가 밝은 사각형으로 보이므로 대상 SDK의 혼합 방식에 맞춰 **RGB를 알파로 미리 곱해 내장**했다. 또한 추적 구역이 비활성일 때 발생하는 Session Sleep 이벤트가 독립 데모를 중단하지 않도록 Load로 시작한 루프의 중단 설정을 수정했다. 이는 외부 웹캠 추적 설정을 완료한 것이 아니다.

실행 절차는 우리 런타임 종료→로컬 프레임 서버 포트 닫힘 확인→공식 Session EXE에 INP 파일 경로 전달→움직임 관찰이다. [독립 실행 기록](../../experiments/phase04/results/external-independent.json)은 우리 Python 런타임 프로세스 0·서버 닫힘·16장 중 15장의 캐릭터 영역 변화·실제 INP 해시 일치를 담는다. [움직이는 창 캡처 GIF](../../experiments/phase04/results/external-premium.gif), [말하기 상태의 실제 대상](../../experiments/phase04/results/external-premium-01.png)도 보존했다. 사용자가 창을 열어 움직임을 직접 확인했다. 창이 감춰졌을 때 얻은 정지 캡처 두 번은 실패로 판단하고 완료 근거에서 제외했다.

## 7. 호환 차이와 내부 데이터 수정 필요 — T-039

| 내부 항목 | 외부 상태 | 실제 대응·손실 / 필요한 설계 |
|---|---|---|
| 원화·부위 상태 텍스처 | 보존+변환 | 이미지 내용을 내장하되 straight RGBA→premultiplied RGB. 원본 PNG는 변경하지 않는다. 내부 스키마에 alphaMode/colorSpace·원본/내장 해시를 구분해야 함 |
| 캔버스·좌표·겹침 | 변환 | 중앙 기준 정점, uint UUID, 음의 zsort로 대응. stable part ID와 대상 ID 매핑·단위·축 규약 필요 |
| 눈/입 상태 | 제한 보존 | 명시적 open/closed 그림은 opacity 바인딩. 03의 연속 눈 압축이나 preview의 눈 임계 전환과 외부 crossfade는 동일한 변형이 아님. 상태 그림·보간 정책·중립값을 데이터로 분리해야 함 |
| 다섯 정규화 제어 | 보존+단위 변환 | 눈/입 0~1, 고개 -1~1. 대상 translation/radian과 대응. 대상별 스케일·방향·범위 메타데이터 필요 |
| 고개 weighted 변형 | 손실 | 픽셀별 몸체 고정 변형을 전체 그룹의 ±18px 이동·±8° 회전으로 근사. 내부 빠른 preview는 ±1.2% 캔버스 이동·±3°라 범위도 다름. 실제 머리 회전·옆면 복원 아님. 동일 표현을 약속하려면 공통 망/제어점 또는 명시적 변환 제한 필요 |
| 표정/동작 | 제한 보존 | 눈 감기·입 열기·고개 동작을 내장 keyframe 애니메이션으로 검증. 고급 감정·음소별 입 모양·물리·표정 우선순위 미검증. sparse override·기준값·출력별 capability가 필요 |
| 웹캠·마이크·중립 보정 | 미포함 | 우리 앱의 장치/추적 연결은 대상 파일에 자동 이전하지 않음. 대상의 추적 설정과 별도 바인딩 검증 필요 |
| 편집 기능·출처·자동 준비 | 미포함 | INP는 이번 실행 결과용이다. 우리 프로젝트의 재분석·교체·실행 이력·편집 복원 묶음을 대체하지 않음 |
| 다른 외부 제품/형식 | 차단/미검증 | Live2D moc3 생성·VTube Studio·상용 도구 호환을 약속하지 않음. 별도 기술·권한·실행 검증 필요 |

따라서 Inochi2D/Session은 **실제 가능성이 확인된 후보**로 남긴다. 제품 스택·초기 지원 형식의 최종 확정은 T-044/048/049에서 수행한다. 공통 매개변수와 손실을 명시하는 구조를 유지하며 앱 내 실행과 외부 실행 중 어느 하나도 필수 범위에서 제거하지 않는다.

## 8. 재현과 종료 — T-040

1. 저장된 고급 원화·추가 표정 입력→명시적 영역과 공통 Project/Part로 준비→눈/입 상태 실제 렌더→실제 웹캠 추적과 제어 연결→loopback RGBA→공식 OBS Browser Source 수신·투명 합성·부하 측정. `runtime-final-live.json`, `runtime-encoded-final-live.json`은 실제 카메라 세션이다. 후자는 성공한 로컬 인코딩 세션과 짝을 이룬다.
2. `replay` 명령은 첫 실제 입력의 **파생 매개변수** 재생이며 새로운 라이브 추적 시험으로 세지 않는다. 장치 없이 동일 결과를 검토하는 용도다.
3. 독립 외부 검증은 우리 앱/서버가 꺼진 상태에서 내장 INP 애니메이션을 공식 Session이 재생한다. 우리 앱이 계속 그림을 보내는 방송 경로와 구분한다.

[40개 기술 검사](../../experiments/phase04/results/verification.json)는 방향/세기·중립·손실·긴 장치 대기·비정상 값·세 경로 공통 계약·외부 바이너리·premultiplied alpha·실제 장치 재연결·마이크 구간·독립 실행·두 배경 투명도·실제 인코딩/디코드 증거를 확인한다. 03 소스와 02 자산은 보존했다. [최종 산출물 해시 목록](../../experiments/phase04/results/artifact-manifest.json)과 [실행 안내](../../experiments/phase04/README.md)에서 재현 조건을 확인한다.

T-031~040의 초기 실험은 완료했다. 남은 핵심 위험은 30FPS 미달, 고급 원화의 동적 품질/알파, 완전 자동 리깅과 초보자 보정, 실제 음성에 맞는 입 반응, 외부에서의 라이브 장치 바인딩, 인코더/장시간/물리 장치·권한 예외다. 05를 자동 완료하거나 M0/출시 통과로 처리하지 않는다.

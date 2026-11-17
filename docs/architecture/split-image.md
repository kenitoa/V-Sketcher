# 분리 PNG 계약과 연결 모델

앱 0.11.0, 프로젝트 모델 1.6, `.2dparts` 자료 묶음 1.0의 계약이다. DEC-03의 PNG 폴더와 ZIP 형식을 구현한다. PSD/PSB 직접 읽기, 임의 혼합 모드·효과·그룹 변환은 지원하지 않는다.

## 입력 계약

PNG 폴더는 공통 캔버스 또는 잘린 조각을 받는다. `manifest.json`이 없으면 좌표·역할·좌우·순서의 부재를 보고하고 배치 화면에서 확인한다. 서로 다른 크기의 조각은 중앙 배치를 제안하되 미확인으로 남긴다. 숨김 여부를 파일에서 알 수 없으면 기본 표시 상태도 사용자가 바꿀 수 있다. 이름만으로 역할을 확정하지 않는다. PNG 이외 파일은 누락 목록으로 보여 주고 확인을 요구한다.

`.2dparts`는 ZIP 안에 UTF-8 `manifest.json`과 선언한 PNG를 갖는다. 경로는 NFC 상대 경로이고 `/`만 사용한다. 예:

```json
{
  "format": "2dparts",
  "schemaVersion": {"major": 1, "minor": 0},
  "canvas": {"width": 1024, "height": 1280},
  "layers": [{
    "id": "head", "name": "머리", "path": "images/head.png",
    "origin": [300, 200], "z": 10, "role": "head", "side": "center",
    "visible": true, "opacity": 1, "group": "face", "parent": null,
    "usage": "primary", "variantOf": null, "state": "default", "blendMode": "normal"
  }],
  "groups": [{"id": "face", "name": "얼굴", "parent": null, "visible": true, "opacity": 1}],
  "hashes": {"images/head.png": "<해당 PNG의 SHA-256 64자리>"}
}
```

`id/path`는 필수이고 `origin/z/role/side`가 없으면 미확인 항목으로 돌린다. 캔버스는 256~4096px, 좌표는 좌상단 원점의 원본 px(+x 오른쪽/+y 아래), origin은 -8192~8192, z는 정수 -100000~100000이다. z 오름차순 후 source ID 순서로 합성한다. 프로젝트에서는 이 순서를 고유 drawOrder로 변환하고 원래 z도 분리 기록에 보존한다.

역할은 base/body/head/hair-front/hair-back/eye/mouth/accessory/custom, 좌우는 character-left/character-right/center/none이다. 캐릭터 왼쪽은 정면 그림 오른쪽이다. 미러는 화면만 반전한다. `usage`는 primary/auxiliary/alternative이며 대체 그림은 같은 역할·좌우의 대표 눈/입을 `variantOf`로 참조하고 open/closed/middle 상태를 갖는다. 대체 레이어 자체는 숨기고 대표 부위의 실제 텍스처 상태로 연결한다. primary의 default는 눈 open, 입 closed로 해석한다. 없는 표정 그림은 생성하지 않는다.

normal source-over와 pass-through 그룹 opacity를 지원한다. 조상 그룹의 opacity를 각 레이어에 곱하며 숨김 그룹/부모는 자손 표시를 억제한다. Photoshop의 isolated group opacity나 그룹 변환과 동일하다고 주장하지 않는다. 부모 부위 연결과 화면 그룹은 별도이며 누락 참조·두 종류 순환을 적용 전에 고친다.

## 제한과 검증

1~64레이어, 그룹 최대 128, ZIP 엔트리 최대 1024, ZIP 256MiB·해제 합계 512MiB·manifest 1MiB·PNG 64MiB 이내다. PNG는 정지 RGB/RGBA 8bit, 각 변 1~4096px, 최대 16,777,216픽셀이다. 작은 눈·빈 조각을 위해 레이어 최소 1px를 허용하며 한 장 초상 입력 최소 256px는 바꾸지 않는다. 합산 디코드 RGBA 256MiB와 공통 렌더러의 GPU/프레임버퍼 예산을 검사한다. 품질을 조용히 축소하지 않는다.

ZIP 중앙 디렉터리를 먼저 검사하고 그 후 제한된 스트림으로 읽어 CRC·실제 크기·선언 SHA-256을 확인한다. 절대/상위/역슬래시/드라이브/예약 이름·대소문자 충돌·심볼릭 링크·암호화·비선언 파일·중복 ID·알 수 없는 속성은 거부한다. 폴더는 깊이/개수/크기와 파일 변경 여부를 검사하고 링크를 따라가지 않는다. 실제 PNG 디코딩·ICC→sRGB 변환은 별도 Python 프로세스에서 수행한다. APNG·회전 EXIF·손상·팔레트·다른 비트 깊이는 명시적으로 차단한다. 원본 바이트는 보존한다.

## 공통 모델·작업·저장

원본 original-image와 sRGB part-texture를 별도 ID/해시로 보관하고 개별 source ID/이름/원점/z·추정 근거를 `split.draft`에 남긴다. 빈·숨김·동명 레이어는 삭제하지 않는다. 표시된 대표와 보조 레이어만 제한 고개에 합류한다. 머리 기준 최대 3° roll·얼굴 폭 2% yaw의 평면 움직임이며 몸체는 고정한다. 머리가 없는 구조는 전체 그림 기준의 제한 고개로 안내한다. 눈/입 상태가 없으면 해당 제어를 연결하지 않고 제한 확인 후 진행한다.

초안→준비 후보→명시적 적용이다. worker/캐시 준비는 정상 프로젝트를 바꾸지 않는다. draft ID·설정 전체 키·프로젝트 revision·문서/취소 세대를 확인하고 checkpoint 후 한 번의 이력으로 적용한다. undo/redo는 분리 기록도 함께 복원한다. 매개변수 ID·표정·입력 설정·움직임 설정은 유지한다. 재안내는 기존 ID를 유지하며 고급 망 변경이나 변형 연결이 있으면 덮어쓰기를 차단한다. 세부 망/연결 편집은 17단계, 표정 UI 합류는 T-179/180에서 검증한다.

`.2dsketch`는 공통 모델·움직임·원본·자원을 저장한다. `.2dparts` 저장은 원본 PNG와 현재 배치/역할/그룹/상태 참조를 담은 자료 교환이다. 움직임/표정/이력 또는 독립 아바타 실행 파일이 아니다. 기존 대상은 먼저 검증하고 고유 백업을 남긴 뒤 같은 볼륨의 검증된 임시 파일로 교체한다. 손상된 기존 대상은 덮어쓰지 않는다. 표현할 수 없는 비이동 변환은 자료 내보내기를 차단한다.

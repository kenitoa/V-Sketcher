# 07. 공통 프로젝트·리소스·좌표·참조 모델 구현

| 항목 | 결과 |
|---|---|
| 대상 / 기준일 | T-061~070 / 2026-11-16 |
| 제품/스키마 | 앱 0.2.0, 공통 모델 1.0, worker/wire는 기존 버전 유지 |
| 판정 범위 | 세 입력 경로를 담는 실제 공통 모델과 파일/좌표 검사, 앱/출력 렌더러 연결 |
| 상태 | 07 완료. M0 HOLD·5개 OPEN, T-071 이후 미완료 |

## 작업별 완료 근거

| 작업 | 구현과 확인 |
|---|---|
| T-061 | createProject/readProject/serializeProject: ID·표시 이름·세 sourceType·UTC 생성/편집 시각·스키마 버전. 같은 이름의 서로 다른 프로젝트와 이름 변경 시험 |
| T-062 | editProject/acknowledgeSave/isDirty: 현재/저장 리비전 분리, 저장 중 뒤따른 편집의 dirty 유지, 오래된 ACK/미래 리비전 거부, 실패 편집의 원본 보존 |
| T-063 | Asset 부모 DAG와 kind/origin/fingerprint/버전/색·알파/처리·권한 메타데이터. 원본→자동 보완→수동 편집의 직렬화 왕복과 원본 보존 |
| T-064 | 부위/그룹 ID·이름·캐릭터 좌우·부모·텍스처·z-order. 중복 이름·이름 변경 후 ID 참조 유지, 동일 겹침 순서의 안정된 ID 보조 순서 |
| T-065 | 원본/편집/로컬/프로젝트/화면/출력 affine 변환. crop·회전·부모·zoom/pan·mirror·출력 기준값과 400개 왕복. 실제 GPU 이동/crop 픽셀 비교 통과 |
| T-066 | Parameter/PartBinding/InputBinding과 기기 보정 문서 분리, 순간 입력 매핑/clamp/누락 대체. 표정 범위·변환 성분/범위·명시적 상태 연결 저장 |
| T-067 | Expression/runtime/broadcast/export 프로필과 설정 리비전/대상 버전·이름 매핑. 왕복 후 보존 및 프로젝트 안 기기 ID 거부 |
| T-068 | 순환(자산/부위/그룹)·중복 ID·삭제/누락 참조·부적합 리소스 버전·모호한 입력/변환·표정 범위·외부 매핑 충돌 검사 |
| T-069 | 상대 경로/realpath·SHA/크기·읽기 변경·기초 형식·리소스 버전/스키마 검사. 실제 파일 이동·다른 내용·프로젝트 폴더 복사·동일 내용 재연결·junction 차단, 새 minor read-only 보존/major 차단 |
| T-070 | 기존 parts/single/split의 실제 준비 결과를 같은 Project 모델로 변환하고 모든 파일·참조·렌더러 adapter 확인. 기본 고급 샘플도 공통 모델로 표시 |

구현 계약과 실행 방법은 [공통 모델 설명](../architecture/project-model.md)을 따릅니다. 코드는 [project-model](../../packages/project-model/index.ts), [coordinates](../../packages/coordinates/index.ts), [project-io](../../packages/project-io/index.ts), [실제 검사](../../tests/project.test.ts)에 있습니다.

## 검증 결과와 보존

[자동 검사 보고](../../evidence/phase07/verification.json): TypeScript strict·Ruff·사전 생성 검사기 일치, **Node 22개 + Python 3개 = 25개 검사 그룹 통과**. 기존 06의 11개를 포함하며 07에서 14개 Node 그룹을 추가했습니다. 수백 개 내부 수치/실패 사례를 별도 기능 완료 수로 부풀리지 않습니다.

[입력 변환 출처](../../evidence/phase07/example-import.json)는 과거 프로젝트와 모든 실제 입력 텍스처의 해시, 경로별 자산/부위 수, 기존 side 정규화 근거를 기록합니다. 새로운 자동 준비를 실행했다고 주장하지 않습니다. 구조용 세 경로 fixture는 tests 아래 개발 전용이며 기본 화면은 계속 고급 아트입니다. 고급 샘플은 원본 두 장의 출처 참조를 추가해 9개 자산을 보관하고 실제 GPU에는 7개 상태 텍스처/4부위를 표시합니다.

[배포 실행 1](../../evidence/phase07/packaged-run-1.json)·[실행 2](../../evidence/phase07/packaged-run-2.json)·[패키지 감사](../../evidence/phase07/package-audit.json): 새 프로필과 한글/공백 경로, 개발 도구가 없는 PATH에서 공통 모델 1.0 로드·GPU 이동/자르기·고급 화면·번들 worker/모델·정상 종료를 확인했습니다. 사용자와 합의한 동일 PC 격리 범위이며 새 Windows 합격이 아닙니다. 카메라/마이크를 열지 않았고 OBS를 연결하지 않았습니다. [배포 화면](../../evidence/phase07/release-studio.png)을 검수했습니다.

[문서·해시 감사](../../evidence/phase07/audit.json)와 [산출물 manifest](../../evidence/phase07/artifact-manifest.json)는 410개 Todo 중 첫 70개만 체크, 52개 기능·12개 PD·15개 AC 유지, 02~06 역사 근거 보존, 코드/입력/패키지 해시를 확인합니다. 호스팅 CI는 구성만 갱신했으며 실제 run은 없습니다. 이전 06 보고서와 코드는 당시 버전에 대한 근거로 보존하고 07 보고서를 별도로 추가했습니다.

## 후속 범위

프로젝트 생성·파일 선택·재연결 UI, ZIP 안전 저장/백업/복구/undo, 비동기 취소와 편집 트랜잭션은 08~09에서 연결합니다. 이번 동기 모델 편집은 해당 전체 기능의 완료가 아닙니다. 장치 식별자와 보정 문서도 실제 장치 선택/영구 저장 기능은 후속입니다.

변환 연결의 데이터 형식은 있으나 완전한 가중 망/회전 변형 런타임은 구현하지 않았습니다. 현재 preview adapter는 지원하는 상태 혼합과 affine 배치만 처리하며 미지원 transform binding·premultiplied 입력은 명시적으로 거부합니다. 파일 검사 역시 전체 이미지 디코더·악성 파일 격리·OS 파일 샌드박스를 대신하지 않습니다. 외부 파생 프로젝트 전체의 연결 검사는 해당 파일을 읽는 후속 기능이 필요합니다.

세 제작 경로 UI와 자동 준비·고급 파츠 라이브러리·실제 추적/음성·OBS 전달·외부 표현 보존·새 Windows·성능·초보자 검증은 계속 남아 있습니다. M0-R01/R05에 실제 모델/GPU/파일 근거를 추가했지만 **M0-R01~05 OPEN을 닫지 않았습니다**. 07 완료를 M1 또는 출시 합격으로 확대하지 않습니다.

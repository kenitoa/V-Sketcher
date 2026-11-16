# 공통 프로젝트 모델 1.0

구현은 `packages/project-model`(순수 데이터/검증/입력 매핑), `packages/coordinates`(좌표), `packages/project-io`(호스트 파일 검사)에 있습니다. renderer는 파일 모듈을 가져오지 않습니다. 앱과 출력 HTML 모두 `preview-project.json`을 검증한 다음 같은 preview adapter를 사용합니다. 모델과 파일 검사 API의 구현이며, 프로젝트 생성·재연결·저장 UI는 후속 09단계입니다.

## 식별자와 리비전

`projectId`와 각 부위/리소스/그룹/매개변수/연결/표정/프로필 ID는 표시 이름·파일명과 독립입니다. ID는 프로젝트 안에서 중복을 금지하고, 표시 이름의 중복은 허용합니다. 역할 좌우는 캐릭터 기준입니다. 그룹은 편집/표시 묶음이고 움직임 부모는 별도 `parentId`입니다. 겹침 순서는 drawOrder 후 ID의 코드 순으로 고정합니다.

`createProject`는 세 입력 유형 중 하나와 UTC ISO 시각, schemaVersion 1.0, revision 0/savedRevision null을 만듭니다. `editProject`는 복사본을 검증하고 성공할 때 리비전을 올려 반환합니다. 원본이나 ID/생성 시각/입력 경로를 바꾸지 않습니다. `acknowledgeSave(project, snapshotRevision)`는 저장한 스냅샷의 리비전만 기록하므로 저장 중 뒤따른 편집은 dirty로 남습니다. 오래된 저장 ACK로 savedRevision을 되돌릴 수 없습니다. 이는 리비전 규칙이며 실제 디스크 저장 성공을 만들어내는 API가 아닙니다.

## 자산과 참조

Asset은 immutable ID, 원본/파생 종류, imported/bundled/auto-preparation/auto-completion/manual-edit/generated 출처, 부모 자산 ID 배열, SHA256·바이트 수·버전, 이미지 형식/크기/색·알파, 원본 영역과 편집 변환, 처리기 버전·이용 정보 상태를 보관합니다. 자동 준비·가림 보완·수동 편집은 원본에 덮어쓰는 대신 부모 참조를 가진 별도 자산입니다. 같은 바이트를 공유해도 이력의 의미는 별도 ID로 보존할 수 있습니다.

부위는 상태별 assetId+assetVersion과 assetToLocal 변환을 참조합니다. 원본/파생 DAG, 부위 부모, 그룹 부모의 순환·누락, 모든 ID 중복, 삭제된 자산/매개변수/표정, 잘못된 버전·중복 상태·모호한 바인딩을 검사합니다. 오류는 코드와 상대 논리 위치를 반환합니다. 실제 파일 존재·내용 검사는 호스트의 별도 단계입니다.

경로는 `resources/` 아래의 상대 경로이며 절대 경로·이탈·역슬래시·ADS·예약 장치 이름·인코딩 우회·끝 점/공백·대소문자 충돌을 거부합니다. 기본 내용 주소는 `resources/<sha256>.png`입니다. bundle preview는 이 논리 리소스를 배포 manifest의 `assets/preview/<sha256>.png`로 해석하므로 원본 기기 경로를 사용하지 않습니다.

`inspectProjectResources`는 realpath 범위, 파일 종류/크기, 스트림 SHA·읽기 중 변경, PNG 서명/IHDR 크기 또는 JPEG 서명을 확인합니다. 전체 이미지 디코드 검사는 후속 입력 처리 단계입니다. `findRelinkCandidates`는 사용자가 지정한 후보 목록만 검사하고, `relinkAsset`는 동일 바이트의 후보만 연결합니다. ID·버전·출처를 유지하고 리비전만 증가합니다. 다른 내용은 changed로 구분하며 자동 채택하지 않습니다. 실제 파일 이동·전체 프로젝트 폴더 복사·변조·junction 이탈을 임시 작업 폴더에서 시험했습니다. 이 API를 OS 전체 파일 접근에 대한 보안 샌드박스로 보장하지는 않습니다.

## 좌표 계약

픽셀 경계 좌표, 왼쪽 위 원점, 오른쪽 +X/아래 +Y를 사용합니다. affine `[a,b,c,d,tx,ty]`는 x'=ax+cy+tx, y'=bx+dy+ty이며 A×B는 B를 먼저 적용합니다. 양의 회전은 화면에서 시계 방향입니다.

1. source → edited: 자산의 sourceToEdited. 원본 영역 자르기/확대와 원본 보정점의 관계를 보존합니다.
2. edited → local: 상태별 assetToLocal. 서로 다른 크기의 표정 텍스처도 같은 부위에 배치합니다.
3. local → project: 부위 localTransform과 부모 행렬의 연쇄입니다. 그룹은 이 변환에 개입하지 않습니다.
4. project → screen: 종횡비 fit, CSS 픽셀 기준 zoom/pan/선택적 미러입니다.
5. project → output: 출력 region과 해상도의 contain/cover 변환입니다. 화면 확대·미러와 독립입니다.

`CoordinateMap`은 어느 두 공간 사이도 변환·역변환합니다. 화면 좌표는 논리 CSS 픽셀로, 장치 픽셀 비율은 canvas 크기를 설정하는 호스트의 책임입니다. singular/nonfinite 행렬을 거부합니다. crop/부모 회전/확대/이동/미러/letterbox의 고정 기준값과 400개 affine 왕복을 검사했습니다. GPU에서는 실제 고급 자산의 18픽셀 이동과 반쪽 crop을 기준 픽셀과 비교합니다(채널 오차 허용 3/255). 완전한 가중 변형이나 실시간 성능 검사는 아닙니다.

## 입력과 프로필

Parameter는 ID·의미·단위·min/neutral/max를 가집니다. PartBinding은 상태 양끝 또는 변환 성분과 출력 범위를 보관합니다. InputBinding은 논리 입력 소스/항목, 입력 범위·방향·gain/offset·smoothingMs·누락 대체/복귀 정보를 보관합니다. `mapInputs`는 별도 MachineSettings의 보정 범위를 사용해 기기 값을 캐릭터 값으로 매핑하고 clamp/fallback을 적용합니다. 시간 필터와 복귀 애니메이션 실행은 추후 런타임에서 구현합니다.

표정은 대상 매개변수 ID/값·고정·전환/해제 정책을, runtime은 모드/미러/대체 표정을, 방송은 해상도/FPS/투명/region/fit을, export는 대상/버전/변환기·매개변수 이름 매핑을 보관합니다. `cameraId`, `microphoneId`와 기기별 보정은 분리된 MachineSettings 문서에만 허용하며 프로젝트 스키마에 넣으면 거부합니다. 프로필 정의가 실제 장치 실행·OBS 연결·파일 내보내기 구현을 뜻하지는 않습니다.

## 스키마와 보안

현재 지원 버전은 major 1/minor 0이며 앱·worker·wire 버전과 독립입니다. 새 major는 차단하고, 높은 minor는 모르는 필드를 그대로 보존하는 read-only 결과만 반환합니다. 해당 결과에는 편집용 Project 객체가 없고 현재 writer로 다시 저장할 수 없습니다. 과거 지원 버전이 아직 없으므로 임의 자동 migration은 제공하지 않습니다. JSON은 최대 16MiB/깊이 32이며 현재 스키마는 추가 필드를 거부합니다. 자산 최대 1024, 부위 64, 이미지/캔버스 한 변 4096 등의 상한을 적용합니다.

Ajv 2020-12 검사기를 빌드 시 생성해 `structure.generated.ts`에 고정합니다. CI와 빌드는 원본 schema와 생성 파일의 일치를 검사합니다. renderer가 동적으로 검증 코드를 생성하지 않으므로 CSP의 eval 제한을 유지합니다. [Ajv 공식 보안 지침](https://ajv.js.org/security.html)의 사전 생성 방식을 따랐습니다. 생성 명령은 고정 Node 24의 [TypeScript type stripping](https://nodejs.org/download/release/v24.14.0/docs/api/typescript.html)을 사용하며 별도 TypeScript 정적 검사도 수행합니다.

```powershell
.local/toolchain/node-v24.22.3-win-x64/node.exe scripts/generate-project-validators.mjs
tools/dev.cmd run check
.local/toolchain/node-v24.22.3-win-x64/node.exe scripts/verify-model.mjs
```

세 경로 fixture는 과거 준비 결과의 검증된 복사본입니다. single의 원본→준비→패치, split의 원본 레이어→파생, parts의 제공 텍스처 참조를 보존합니다. 이 fixture는 개발 전용이며 배포 화면에 표시하지 않습니다. 고급 화면은 원화 2개와 7개 실제 텍스처를 포함한 공통 모델을 사용합니다. 변환 과정에서 발견한 과거 mouth의 잘못된 side 값은 center로 정규화하고 근거에 기록했으며 역사 파일은 그대로 보존했습니다.

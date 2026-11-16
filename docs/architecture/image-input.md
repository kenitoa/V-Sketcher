# 로컬 그림 입력과 선택 영역

Electron main이 파일 선택·읽기 권한을 소유한다. UI 명령에는 경로 대신 draft ID와 제한된 선택 데이터만 있다. 드롭은 sandbox preload의 `webUtils.getPathForFile`에서 네이티브 File을 확인해 main으로 전달하고 원시 경로를 UI로 돌려주지 않는다. [Electron webUtils](https://www.electronjs.org/docs/latest/api/web-utils), [sandbox preload의 모듈 범위](https://www.electronjs.org/docs/latest/tutorial/sandbox)를 따른다.

`InputSession`은 프로젝트/리비전/세대와 연결된 한 입력 작업을 소유한다. 읽은 원본의 불변 스냅샷을 전용 임시 폴더에 기록하고 Python worker의 `--image-input` 진입점을 실행한다. 신뢰된 호스트만 작업/경로를 구성하며 shell을 사용하지 않는다. stdout은 64KiB로 제한하고 원시 stderr를 정상 로그에 남기지 않는다. AbortSignal·60초 제한은 프로세스 종료를 요청하고 close 이후 임시 폴더를 정리한다. 기존 실시간 worker와 장치를 공유하지 않는다.

probe는 파일/형식/디코드/색상/방향 검사와 후보 제안이다. 결과 미리보기는 활성 draft의 해시 URL로만 제공하며 프로젝트 자원/편집 이력을 만들지 않는다. 선택 확정은 정리 사본 좌표의 crop·마스크/배경 처리를 적용한 뒤 최대 1024px에서 얼굴/제한을 확인한다. 분석기가 실패하면 직접 선택과 명시적 경고로 진행하고 자동 부위 연결을 주장하지 않는다.

성공한 선택은 checkpoint 이후 CAS를 다시 확인하고 4개 자원·한 개 정적 base 부위·`inputPreparation`을 하나의 편집 단위로 적용한다. 이전 자산은 남기고 기존 부위·매개변수/표정·입력/움직임 바인딩을 교체해 오래된 분석이 새 원본에 적용되지 않게 한다. 파생 registry의 분석/참조/geometry/runtime/호환/내보내기 의존성은 기존 transaction 규칙으로 무효화한다. 실패/취소/다른 프로젝트/오래된 리비전은 현재 프로젝트를 변경하지 않는다.

모델 1.2는 원본→정리 행렬, 정리 좌표의 선택/마스크, 실제 정수 crop, 분석 크기·얼굴 경계·경고를 저장한다. 자원은 원본→정리→선택→분석의 부모 참조와 각각의 source→canvas 변환을 가진다. 스키마·참조·크기·영역·역행렬을 검증하며 undo/redo는 선택 필드의 추가/삭제도 복원한다. 1.0/1.1 읽기와 새 minor 읽기 전용 정책을 유지하며 버전이 올라간 원본 파일은 덮어쓰지 않는다.

원본 바이트는 ZIP에 포함되며 EXIF/ICC 메타데이터도 그대로 남는다. 원본 비교는 브라우저 EXIF 자동 방향 처리와 raw 크기의 불일치를 피하기 위해 방향/색상 정리본 전체를 표시한다. 편집 미리보기와 마스크는 SVG viewBox의 역 screen CTM을 사용해 letterbox·표시 크기가 달라도 같은 좌표를 쓴다. 적용된 PNG를 공통 GPU 렌더러로 표시하므로 보정 결과와 실제 저장 그림을 구분하지 않는다.

지원/예산·실제 확인·제한은 [12 완료 기록](../planning/12-image-input.md)을 따른다. 분리 묶음/부위 인식/자동 리깅/출력 품질은 이 입력 기반의 통과로 완료 처리하지 않는다.

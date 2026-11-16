# 자산·샘플·대용량 결과 관리

| 위치 | 용도 | Git | 제품 포함 |
|---|---|---|---|
| `assets/product/preview/` | 고급 미리보기 상태 PNG 7개+원화 2개, SHA 이름 | 포함 | 포함 |
| `assets/product/manifest.json`, `preview-scene.json` | 원본 출처·해시·레이어 규약 | 포함 | scene과 텍스처만 화면 리소스로 포함, 출처는 notices |
| `worker/resources/model-source.json` | 정확한 모델 URL·SHA·조건 | 포함 | notices에 포함 |
| `.local/models/` | 얼굴 모델 다운로드 캐시 | 제외 | PyInstaller가 지정 모델만 포함 |
| `experiments/phase02~05/` | 검증 입력/코드/관찰 결과 | 기존 근거 보존 | 제외 |
| `.local/staged-assets/`, `dist/` | 검증한 자산·빌드 중간물 | 제외 | 필요한 빌드 결과만 ASAR 포함 |
| `.local/build/worker/` | Python·native 라이브러리·모델 | 제외 | resources/worker로 포함 |
| `node_modules/`, `.venv-product/`, `.local/toolchain/` | 개발 도구·의존성 | 제외 | Node는 production 의존성만, Python은 PyInstaller 분석 결과만 포함 |
| `out/`, `.local/isolated/` | 배포본·격리 복사본 | 제외 | 전달용 결과 |
| `evidence/phase06/` | 비식별 보고서·확인 화면·해시 | 포함 | 제외 |
| `assets/product/preview-project.json` | 실제 공통 모델 1.0 고급 샘플 | 포함 | 포함 |
| `tests/fixtures/common-model/` | 세 경로 준비 결과의 구조/파일 검사 | 포함 | 제외 |
| `evidence/phase07/` | 공통 모델·GPU·패키지 검증 | 포함 | 제외 |

`provision.py`는 manifest 해시가 맞는 9개 자산과 공통 모델을 스테이징합니다. 실제 renderer는 7개 상태 텍스처를 로드하며 원화 2개는 출처 관계를 보존합니다. 앱 실행 중에는 experiments나 개발 캐시를 읽지 않습니다. 현재 샘플은 전체 초상화에 수동 작성된 눈·입 표정 패치를 합성하는 미리보기이며, 완성된 고급 분리 파츠 라이브러리 또는 자동 리깅 결과가 아닙니다. 아트 생성 기록과 원본 provenance는 빌드 통지에 함께 보존합니다.

모델·Electron 배포파일·Node 도구는 공식 출처와 해시를 검증합니다. npm 잠금 파일은 integrity를, Python 잠금 파일은 호환 wheel의 SHA256을 보유합니다. 최초 설치 이후 패키지 실행은 다운로드를 요구하지 않습니다. 모든 의존성과 생성 아트의 공개 재배포 조건 최종 검토는 출시 게이트로 남아 있습니다. `NOTICE.md`는 공개 배포 허가가 아닙니다.

새 대용량 산출물은 원본/파생/재생성 가능 여부를 먼저 기록하고 `.local/` 또는 `out/`에 둡니다. 근거는 요약·고정 입력·해시로 보존하고 임의 영상을 반복해서 Git에 추가하지 않습니다. 패키지 감사는 ASAR에 실험·시험·스크립트·개발 도구가 유입되지 않았는지 검사하고 실제 배포 파일별 크기·SHA를 기록합니다.

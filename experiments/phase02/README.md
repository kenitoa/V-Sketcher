# Phase 02 검증 준비 도구

T-011~020의 실험 입력·환경·평가 기록을 준비한다. 자동 리깅·제품 렌더러·추적·OBS 연결·외부 내보내기를 구현한 프로그램은 아니다. 자세한 완료 근거는 [02 준비 기록](../../docs/planning/02-readiness.md), 후보는 [공식 자료 조사](../../docs/planning/02-candidates.md), 평가 계약은 [평가·재현 절차](../../docs/planning/02-evaluation.md)를 따른다.

## 환경 생성

저장소 루트의 PowerShell에서 각 명령을 순서대로 실행한다. 확인한 환경은 Windows 11 x64 / CPython 3.14.10 / Pillow 13.0.0이다.

```powershell
python -m venv .venv-lab
.\.venv-lab\Scripts\python.exe -m pip install --require-hashes -r experiments/phase02/requirements-win-py314.lock
.\.venv-lab\Scripts\python.exe -m pip check
```

잠금 파일은 Windows CPython 3.14 amd64 휠의 SHA-256을 고정한다. 다른 Python·OS에서는 이 잠금을 그대로 적용하지 않고 별도 환경 ID·아티팩트 해시를 기록한다. 일반 버전 목록은 `requirements.txt`, 휠 출처·해시는 `results/dependency-artifact.json`이다. 활성화 스크립트 없이 가상 환경 Python 경로를 직접 사용한다. 제품 Python 버전·스택은 아직 선정하지 않았다.

## 장비 기록

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File experiments/phase02/collect-environment.ps1
```

실행 프로세스에만 스크립트 정책을 적용하며 시스템 정책을 변경하지 않는다. 이 수집기는 장치 목록·드라이버·OS·사양·도구 버전·표준 OBS 경로 여부만 읽는다. 카메라/마이크를 열거나 녹화·녹음하지 않는다. 기본 출력 `results/environment-current.json`을 비교 실험의 고정 환경 증거로 보관할 때 별도 파일명과 환경 ID를 사용한다. 다른 이름·ID로 저장하려면 `-OutputPath`·`-EnvironmentId`를 전달하고 검사에 `--environment`로 해당 파일을 지정한다.

## 자료 생성·검사

```powershell
.\.venv-lab\Scripts\python.exe experiments/phase02/lab.py build
.\.venv-lab\Scripts\python.exe experiments/phase02/lab.py verify
```

`build`는 도형 기반 캐릭터·파츠·분리 구조·의도적 오류 입력을 결정적으로 만든다. `assets/premium/`의 고급 원화는 저장 파일을 읽기만 하며 다시 생성하지 않는다. 그 파일들은 ImageGen으로 생성·편집한 결과이며 프롬프트만으로 픽셀 재현을 보장하지 않는다. manifest의 출처·파생 관계·허용 목적·파일 해시를 함께 보존한다.

기대 결과는 **29/29 입력별 예상 검사 결과 일치**, **50/50 파일 해시 일치**, **L-001/L-009 좌표 표현 등가**다. 실제 결과는 `results/readiness-001.json`에 기록한다. 손상·빈 이미지와 잘못된 구조가 예상한 오류로 탐지되는 것을 포함한 준비 검사 결과다.

S-016은 디코딩 가능한 불투명 빈 그림이므로 의미상 캐릭터가 없다는 판단은 하지 않는다. L-010은 구조상 유효하지만 시각적으로 순서가 틀린 사례다. HQ-002는 실제 알파가 있어도 일부 색 번짐이 있는 스트레스 사례다. 파일 검사 통과를 품질·지원 통과로 사용하지 않는다. 시험 도구의 4,194,304픽셀 제한은 과대한 테스트 자원 사용을 막는 로컬 설정이며 제품 지원 상한이 아니다.

## 새 실험 기록

```powershell
.\.venv-lab\Scripts\python.exe experiments/phase02/lab.py new-run --input HQ-001 --id local-hq001-001
```

`results/local-hq001-001.json`에 입력·구성·코드 해시를 가진 `not_run` 기록을 만든다. 같은 ID는 덮어쓰지 않는다. `local-*` 결과는 기본 git 제외 대상이며 공유할 결과는 개인 정보·자산 동의를 확인해 적절한 이름으로 보관한다. 예시는 `results/example-HQ001-not-run.json`이다. 후보·모델·환경 JSON 해시·버전·절차·예상 결과를 채운 뒤 실행하고 실제 결과를 기록한다. `null` 측정값은 미측정을 뜻하며 0이나 성공으로 바꾸지 않는다.

## 파일 지도

| 위치 | 내용 |
|---|---|
| `lab.py`, `config.json` | 준비 자료 생성·검사·새 실행 기록, 고정 시험 구성 |
| `collect-environment.ps1` | 민감 식별자와 원본 입력을 제외한 장비 수집 |
| `assets/RIGHTS.md`, `assets/manifest.json` | 출처·허용 목적·샘플/파일 무결성 |
| `assets/single/` | S-001~016 경계·오류 입력 |
| `assets/split/`, `assets/parts/` | L-001~010 및 PARTS-001, 파츠 상태·좌표·오류 |
| `assets/premium/` | HQ-001 고급 원화, HQ-002 알파 경계 스트레스, 생성 프롬프트·출처 |
| `fixture-contact-sheet.png` | 절차 제작 단일 그림 세트의 확인용 미리보기 |
| `run-template.json` | 제품 가능성 실험에 사용할 미실행 평가 양식 |
| `results/` | 준비 검사·재생성·의존 파일·장비·공식 자료 접근 기록 |

이 폴더에 배포 제품이나 제3자 SDK·모델을 묶지 않았다. `.venv-lab`과 캐시는 저장소에 포함하지 않는다. 실제 모델 실행·OBS 수신·외부 대상 구동은 후속 03~04 실험에서 별도 환경·버전·결과로 기록한다.

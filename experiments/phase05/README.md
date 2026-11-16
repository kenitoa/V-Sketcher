# Phase05 — 초기 지원·기술·출시 기준 결정

T-041~050의 결정·설계·M0 검토 자료다. 제품 기능 구현이나 새 스택의 성능 합격을 표시하지 않는다. **05 완료 / M0 HOLD**를 각각 기록한다.

- [DEC-01~12](../../docs/planning/05-decisions.md): 운영체제·포터블 배포, 세 입력·고급 파츠·움직임, OBS/INP, 저장/복구, 동시성·로컬 처리·단축키.
- [선정 스택](../../docs/planning/05-stack.md): Electron/TypeScript·공유 WebGL2·Python worker, 공식 버전/조건·대안·교체 위험.
- [판정 계약](../../docs/planning/05-release-gates.md): 장비·해상도·30FPS/지연/자원/2시간·고급 아트·초보자 표본·실패 규칙.
- [M0 검토](../../docs/planning/05-m0-review.md): 실패/미측정에 대한 HOLD와 M0-R01~05의 실제 재검증 조건.
- [기계 판독 결정](./decisions.json): 12개 채택 정책, 새 스택의 제품 검증 미완료, 26개 게이트·5개 OPEN 반환 항목.

## 실행

새 제품 의존을 설치하지 않고 기존 실험 Python의 표준 라이브러리로 정책을 확인한다. 카메라·마이크·전역 키·OBS를 열지 않는다.

```powershell
./.venv-phase04/Scripts/python.exe experiments/phase05/policy_harness.py
./.venv-phase04/Scripts/python.exe experiments/phase05/build_records.py
./.venv-phase04/Scripts/python.exe experiments/phase05/audit.py
```

`policy_harness.py`는 검증한 `phase05/.local/policy-*` 안에만 작은 가상 묶음을 만든다. 실제 사용자 파일을 읽거나 지우지 않는다. 원본 역할의 자원은 **텍스트 바이트인 정책 fixture**이며 그림 디코더·리깅/아트의 시험 입력이 아니다. 임시 flush/백업/교체 전후 실패, ZIP 경로·원래 이름/해시/예산·버전·writer 충돌과 교차 프로젝트/취소/오래된 리비전·프레임 경계·저장/내보내기 스냅샷을 시험한다.

31개 통과는 정책 primitive/model의 근거다. 디스크를 실제로 가득 채우거나 전원을 끄지 않았고, Electron/Python 실제 IPC·제품 저장 UI·OS 전역 단축키 시험을 수행한 것도 아니다. 실제 통합은 M0-R05 및 후속 기능 작업이다.

`build_records.py`는 검토한 계약을 JSON으로 기록하고, 04의 실제 FPS를 읽어 새 GPU 엔진에 그 성공을 재사용하지 않도록 상태를 나눈다. `audit.py`는 410개 Todo/완료 범위, 기능·방향·수용 ID, 결정/반환 항목·링크·이전 자산/실험 보존을 확인한다. 감사 결과는 제품 기능 테스트 개수로 합치지 않는다.

공식 registry를 조회한 패키지/Node 결과는 `results/package-research.json`, `results/node-research.json`에 있다. 선택한 버전은 첫 구현 기준선이며 전이 lock·새 제품 바이너리를 생성한 것이 아니다. 이전 02~04 코드·원본·실험 결과를 수정하지 않는다. 문서의 후속 버전 갱신은 이전 frozen manifest가 가리키는 과거 문서 hash와 다를 수 있다.

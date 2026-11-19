"""Update checkboxes only after the final remediation review exists and passed."""

from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
review = json.loads(
    (ROOT / 'evidence/remediation26-31/review-02/review.json').read_text(encoding='utf-8')
)
assert review['passedLocalRemediation'] and len(review['newlyCompleted']) == 14
todo = ROOT / 'docs/Todo'
text = todo.read_text(encoding='utf-8')
for task in review['newlyCompleted']:
    original = '- [ ] ' + task + ' '
    checked = '- [x] ' + task + ' '
    assert text.count(original) + text.count(checked) == 1
    text = text.replace(original, checked, 1)
text = re.sub(
    r'^- \[x\] T-271 .*$',
    '- [x] T-271 저장 중 공간 부족·권한·경로 오류를 유발한다. 완료: 마지막 정상본과 재시도·다른 위치 저장이 동작한다. [실제 ENOSPC 9건·정상/복구본·재시도·다른 Windows 위치](../evidence/remediation26-31/space-03/space.json), [기존 실제 권한/경로·제품 오류 주입](../evidence/phase28/run-02/storage.json). 새 부족 공간 시험은 Windows 저장 백엔드 API→전용 WSL tmpfs 경계이며 사용자 UNC 저장 지원·NTFS 전원 상실 승인이 아님',
    text,
    count=1,
    flags=re.M,
)
notes = {
    '## 27.': '**26 일괄 보완 — 2026-11-19:** T-251~259를 현재 근거로 완료했다. [일괄 작업·범위](./planning/26-31-remediation.md), [최종 검토](../evidence/remediation26-31/review-01/review.json). 0.22.1의 두 새 포터블 설정 프로필·최소 진단/원화 불변·실제 장치 자원 해제·72회 MediaStream 반복과 개발/배포 worker 양성 대조를 구분했다. 정상 실제 얼굴/발화·M3 종료 조건이 남아 T-260·26 전체·M0 HOLD는 유지한다.\n\n',
    '## 28.': '**27 선형 보완 — 2026-11-19:** T-262~265 완료. [세 실제 제작 경로의 동일 프로젝트 보정/저장/재열기·두 버전 PNG/INP·실제 OBS 18화면·제품 종료 뒤 공식 대상 6회](../evidence/remediation26-31/linear-06/linear.json), [분리 역할 변경·복원 영속 체크포인트](../evidence/remediation26-31/roles-02/role-proof.json). 예제 제어의 종단 연결이며 실제 사람 입력·물리 분리·독립 사용성/성능은 T-267/270에 남긴다. 27 전체 완료나 M0 PASS로 확대하지 않는다.\n\n',
    '## 29.': '**28 공간 부족 보완 — 2026-11-19:** T-271 완료. [실제 32MiB 파일시스템 ENOSPC 9건](../evidence/remediation26-31/space-03/space.json)과 기존 권한/경로·오류 주입을 결합했다. [장치 반복](../evidence/remediation26-31/media-02/media.json)·[새 패치 worker 반복](../evidence/remediation26-31/media-04/media.json)은 T-275의 추가 근거이나 2시간/경로·물리 손실·결합 GPU/전체 지연·출시 위험은 미완료다. 새 0.22.1은 실제 EPERM 복구 목록 교체를 유한 재시도로 보완했고 384개 필수 검사와 두 포터블 설정 시험을 통과했다. 28 전체·출시 HOLD 유지.\n\n',
}
for anchor, note in notes.items():
    assert text.count(anchor) == 1
    note = (
        note.replace('review-01/review.json', 'review-02/review.json')
        .replace('linear-06/linear.json', 'linear-08/linear.json')
        .replace('roles-02/role-proof.json', 'roles-03/role-proof.json')
    )
    prefix = note.split(' — ')[0]
    start = text.find(prefix)
    if start >= 0:
        end = text.index(anchor, start)
        text = text[:start] + note + text[end:]
    else:
        text = text.replace(anchor, note + anchor, 1)
completed = len(re.findall(r'^- \[x\] T-', text, re.M))
assert completed == 288 and len(re.findall(r'^- \[[ x]\] T-', text, re.M)) == 410
text = re.sub(
    r'^\| 버전 \|.*$',
    '| 버전 | v0.30 — 26~31 일괄 보완·앱 0.22.1·미충족 실증 조건 유지 |',
    text,
    count=1,
    flags=re.M,
)
text = re.sub(
    r'^\| 기준 \|.*$',
    '| 기준 | [PRD.md](./PRD.md) v0.30, [Function.md](./Function.md) v0.30 |',
    text,
    count=1,
    flags=re.M,
)
text = re.sub(
    r'^\| 작업 식별 \|.*$',
    '| 작업 식별 | 전체 410개 중 완료 288개·미완료 122개. 26~31은 60개 중 40개 완료·20개 미완료. 개별 체크/근거를 따르며 T-190/T-209/T-260/T-307·M0/출시 HOLD 유지 |',
    text,
    count=1,
    flags=re.M,
)
history = '| v0.30 | 2026-11-19 | 26~31 일괄 보완: T-251~259/262~265/271 추가 완료. 복구 목록 EPERM 유한 재시도 패치 0.22.1·384개 필수 검사·두 새 포터블 설정 프로필·실제 ENOSPC 9건·72회 MediaStream·동일 프로젝트 종단/공식 대상 6회. 실제 사람/새 Windows/장시간/출시 후 근거 미충족 20개는 유지. M0/출시 HOLD·기존 원본 ZIP/실패 기록 보존. |\n'
if '| v0.30 | 2026-11-19 |' not in text:
    text = text.rstrip() + '\n' + history
todo.write_text(text, encoding='utf-8')
for name, anchor in [
    ('PRD.md', '## 25. 용어 정리'),
    ('Function.md', '## 25. 기능 구현 완료 판정과 변경 관리'),
]:
    file = ROOT / 'docs' / name
    text = file.read_text(encoding='utf-8')
    text = re.sub(
        r'^\| 문서 버전 \|.*$',
        '| 문서 버전 | v0.30 — 26~31 보완·0.22.1 복구 목록 수정·실증 경계 반영 |',
        text,
        count=1,
        flags=re.M,
    )
    field = '문서 상태' if name == 'PRD.md' else '구현 상태'
    text = re.sub(
        r'^\| ' + field + r' \|.*$',
        '| '
        + field
        + ' | 앱 0.22.1·모델 1.9. 26~31의 14개 작업을 근거로 추가 완료. 실제 입력·장시간/전체 지연·초보자·깨끗한 Windows·출시 후 운영 20개는 미완료. T-190/T-209/T-260/T-307·M0 HOLD/5 OPEN·초기 2D/3D 출시 HOLD 유지 |',
        text,
        count=1,
        flags=re.M,
    )
    text = text.replace(
        '| 기준 문서 | [PRD.md](./PRD.md) v0.29,', '| 기준 문서 | [PRD.md](./PRD.md) v0.30,', 1
    )
    block = '### 26~31 일괄 보완과 0.22.1 검증\n\n[일괄 보완·실행 경계](./planning/26-31-remediation.md), [새 검토](../evidence/remediation26-31/review-01/review.json)에 따라 설정 T-251~259, 동일 프로젝트 세 경로 T-262~265, 실제 공간 부족 T-271을 완료했다. 복구 목록의 일시 EPERM을 유한 재시도로 보완한 0.22.1은 384개 필수 검사와 두 새 포터블 설정 프로필을 통과했다. 원래 0.22.0 고정 ZIP을 보존했다. 실제 얼굴/발화/양팔·물리 손실, 경로별 2시간/전체 지연, 실제 초보자 30명·경과 관찰, 깨끗한 Windows, 배포/출시 후 사건은 자동 시험으로 만들지 않고 미완료로 유지한다. 세 제작 경로·프리미엄 원화·앱 실행/방송·독립 내보내기·필수 3D/자체 모델 생성과 M0 HOLD는 유지한다.\n\n'
    assert text.count(anchor) == 1
    block = block.replace('review-01/review.json', 'review-02/review.json')
    start = text.find('### 26~31 일괄 보완과 0.22.1 검증')
    if start >= 0:
        text = text[:start] + block + text[text.index(anchor, start) :]
    else:
        text = text.replace(anchor, block + anchor, 1)
    if '| v0.30 | 2026-11-19 |' not in text:
        text = text.rstrip() + '\n' + history
    file.write_text(text, encoding='utf-8')
print('Todo/PRD/Function updated: 14 new completions, 20 evidence-dependent items remain')

# 파츠 카탈로그·조합·GPU 상태

카탈로그는 한 규격의 12개 항목과 27개 상태 자원, 13개 PNG 해시/좌표/썸네일·허용 범위를 가진다. 호스트가 모든 파일을 로컬 제품 자산에서 읽고 검증한 뒤 `ProjectSession`에 제공한다. renderer에는 상대 리소스/메타데이터만 전달하며 임의 파츠 파일 경로를 명령으로 받지 않는다. 이전 전체 초상 샘플의 9개 PNG는 별도 manifest로 그대로 보존한다.

모델 1.3의 `assembly`는 카탈로그 ID/버전·선택 항목/버전·좌우 연동·조절·제한을 저장한다. 각 실제 부위의 `library`는 항목/버전/템플릿 키를, `color`는 hue 이동/범위/최소 채도를 보관한다. 자원/영역/변환과 버전이 카탈로그와 다르면 교체를 차단하고 현재 표현을 유지한다. unknown minor 읽기 전용·이전 1.0~1.2 보호 변환 정책은 기존 저장 경로를 사용한다.

파츠 준비/교체/제거는 영구 checkpoint 후 현재 세션·리비전을 다시 확인하고 한 history transaction으로 적용한다. 교체는 키가 같은 부위 ID와 유효한 transform 바인딩, 공통 parameter ID/범위·입력/감도·표정·기본 자세를 유지한다. 사용자 이름/불투명도/표시 여부를 보존하고 새 상태 연결을 준비한다. 제거는 해당 부위의 참조만 끊고 제한을 표시한다. 재장착은 기존 의미 parameter를 이용하며 전용 연결의 자동 복원을 꾸며 내지 않는다.

세 상태 state-blend의 `middleState`는 선택 필드다. 기존 두 상태와 하위 모델도 그대로 읽으며, 새 눈은 closed/half/open, 입은 closed/smile/open으로 두 구간 연속 보간한다. 같은 PNG에서 다른 sourceRegion을 읽는 상태는 `?asset=<id>`가 붙은 고유 URL로 geometry/batch를 구분한다. 실제 image/GL texture는 query를 제외한 원본 파일별로 공유하고 dispose도 실제 texture마다 한 번 수행한다. 서로 다른 상태의 crop이 같은 파일명 때문에 덮어써지지 않는다.

색조는 fragment shader에서 premultiplied sample을 straight color로 바꾸고, 지정 hue/채도 범위만 이동한 뒤 원래 alpha로 돌아온다. 선·하이라이트/피부/금속의 범위를 제외하며 매 프레임 PNG를 가공하지 않는다. 같은 공통 mesh/기준점/가중치가 부모 관계와 제한된 고개를 평가한다. 기준 얼굴 폭은 라이브러리의 344px 계약을 사용한다.

저장/복제에는 실제 파츠 그림과 역할·상태·조절·연동/움직임이 포함된다. 별도 프리셋 서버나 설치된 카탈로그의 절대 경로에 의존하지 않는다. 기본 64조합과 제한 범위의 확인, 독립 평가/전체 출시·외부 통합의 경계는 [13 완료 기록](../planning/13-parts-library.md)·[아트 규약](../planning/13-parts-art-standard.md)을 따른다.

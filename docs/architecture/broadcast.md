# 로컬 방송 출력 계약

앱 0.18.0 · 프로젝트 1.9 · [사용법과 검증 범위](../planning/23-broadcast.md).

`packages/broadcast`는 출력 설정·프레임·확인 이력과 UI 계약을 정의한다. `BroadcastServer`는 메인 프로세스가 소유하며 명시적인 출력 준비에서만 loopback 리스너를 연다. OFF 상태에도 이미 열린 페이지에 투명 상태를 줄 수 있고 앱 종료에 소켓·타이머·자산을 해제한다. `broadcast-ipc.ts`의 start/설정/중지/주소 복사 등은 원래 앱의 main frame만 호출할 수 있다. HTTP 읽기 클라이언트는 편집·장치·출력 설정 API를 호출할 수 없다.

`ProjectSession.broadcastSnapshot`은 공개 확인이 끝난 현재 실행 ID만 받아 실행 scene을 복제하고 사용한 자산의 해시 검증 바이트만 고정한다. 읽기 후에도 실행본 동일성을 다시 확인한다. 프로젝트 이름·model 메타데이터·개인 경로를 제거하고 그림 참조를 해당 출력 ID/asset/hash의 로컬 경로로 바꾼다. 새 프레임이 새 실행 ID를 가리키면 검증된 출력 사본을 비동기 준비한 뒤 최신 프레임과 함께 교체한다. 준비 중의 이전 실행본과 그 자산은 유지하며 취소/오래된 실행 결과는 거부한다.

RunRuntime의 공통 MotionPlayer가 표정·입력 우선순위를 평가한 후 최대 30회/초 정규화 제어값과 숨김을 전달한다. 메인은 현재 실행 ID·정수 시퀀스·다섯 매개변수·숨김을 검증한다. 자산과 제어 외의 카메라 JPEG/PCM/편집 명령을 출력 상태에 넣지 않는다. 생산 프레임 1초 만료 시 `frame:null`을 주며 브라우저도 자체 만료와 fetch 실패에서 투명하게 지운다.

페이지는 `output.html`·`output.ts`·공통 AvatarRenderer를 쓴다. 새 실행본/설정은 별도 canvas/WebGL2에서 로드한 뒤 통째로 교체하고 기존 GPU 자원을 정리한다. 크기·위치·잘림은 출력 viewport/scissor에만 적용하며 편집기/프로젝트 좌표를 바꾸지 않는다. 실패 시 사용자용 오류를 그리지 않고 투명 화면과 제한된 ACK만 제공한다. ACK는 최대 16개 클라이언트·4초 만료·1KiB 제한이며 same-origin/현재 실행/설정 버전을 검사한다. 페이지 소비는 외부 OBS 자동 확인이 아니다.

서버는 정확한 127.0.0.1 Host/포트·loopback 접속·32바이트 난수 capability를 검사한다. 상대 경로에서 query/percent/backslash/상위 경로를 거부하고 현재/직전 그림 Map과 빌드된 JS/CSS 및 출력 HTML만 제공한다. `no-store`, `no-referrer`, `nosniff`, same-origin CSP와 CORS 미허용을 적용한다. 정상 로그·일반 OutputView에는 URL을 넣지 않는다. 기기 프로필은 임시 파일→rename으로 저장하며 실패하면 이전 활성 설정을 유지한다. 설정 변경/복원/주소 회전은 단조 증가 버전으로 이전 확인을 무효화한다.

외부 확인은 대상/버전·설정 버전·실행 ID·시각·alpha/motion/expression/shortcut 체크의 기록이다. 제품의 일반 API는 `USER_CONFIRMED`만 기록하고 자동 관찰이라고 표시하지 않는다. 실제 OBS 자동 검증은 개발 도구와 별도 evidence이며 일반 사용자 확인과 섞지 않는다. 앱 초점 키 주입의 통과는 실제 OS 전역 키 T-209 완료가 아니다.

개발 도구는 `scripts/verify-broadcast.mjs`, `scripts/broadcast-package-check.mjs`, `tools/obs-client.mjs`, `tools/obs-broadcast-check.mjs`다. self-check CLI에서만 파일 기반 허용 명령 브리지를 사용하며 일반 앱/HTTP에는 이를 노출하지 않는다. OBS 본체·개발 도구·WebSocket 비밀값은 배포본에 넣지 않는다. 기존 실험/근거는 불변이며 재실행은 새 출력 폴더에 기록한다.

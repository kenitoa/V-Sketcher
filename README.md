# 2DSketcher

Windows용 버추얼 캐릭터 제작 도구의 개발 기반입니다. 현재 실행되는 앱은 고급 캐릭터 샘플을 WebGL2로 표시하고, 독립 Python 작업 프로세스와 통신하는 **0.1.0 기반 미리보기**입니다. 세 제작 경로·리깅·실시간 추적·OBS 연결·프로젝트 저장은 후속 구현 대상입니다. 전체 요구사항은 [PRD](docs/PRD.md), 작업 상태는 [Todo](docs/Todo)를 따릅니다. M0는 HOLD입니다.

개발 환경은 Windows x64, Python **3.14.10 x64**, Git입니다. 최초 준비에는 인터넷이 필요하며 Node와 Python 패키지는 프로젝트 안에 설치됩니다. PowerShell 실행 정책 변경과 전역 npm 설치는 필요하지 않습니다.

```powershell
python scripts/bootstrap.py
tools/dev.cmd ci
tools/dev.cmd run check
tools/dev.cmd run dev
```

이미 다른 Python 버전이 기본값이면 Python 3.14.10 실행 파일로 첫 명령을 실행하세요. Node 24.22.3/npm 11.19.1, Electron 45.3.3 및 전체 의존성은 잠금 파일을 사용합니다. `bootstrap.py`는 기존 환경의 Python 버전도 검사합니다. API 키와 `.env` 파일은 필요하지 않습니다.

Windows 패키지와 격리 실행 검증:

```powershell
tools/dev.cmd run make
tools/dev.cmd run package:check
```

EXE는 `out/2DSketcher-win32-x64/2DSketcher.exe`, ZIP은 `out/make/zip/win32/x64/`에 생성됩니다. ZIP을 풀 때 폴더 전체를 유지해야 합니다. Electron과 Python·라이브러리·얼굴 모델이 포함되어 사용자의 Node/Python 설치를 요구하지 않습니다. 서명·설치 프로그램·공개 배포 승인을 완료한 제품은 아닙니다.

검증 명령은 새 프로필과 한글·공백 경로에서 두 번 실행하고 PATH를 Windows 시스템 도구만 남겨 제한합니다. 실제 카메라·마이크를 켜지 않고 모델 로드·화면·IPC·정상 종료를 확인합니다. **현재 PC의 OS/DLL/드라이버는 유지되므로 새 Windows 시험을 대신했다는 주장을 하지 않습니다.** 결과는 `evidence/phase06/`, 개인 경로가 포함될 수 있는 개발 로그와 임시 실행본은 `.local/`에 보관합니다.

[개발 규칙](CONTRIBUTING.md) · [모듈/연결 규약](docs/architecture/foundation.md) · [자산 정책](docs/architecture/assets.md) · [06 완료 근거](docs/planning/06-foundation.md)

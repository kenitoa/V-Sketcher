# PREMIUM-003 생성·편집 기록

2026-11-16. 사용자가 기존 단순 도형 실행 화면의 낮은 품질을 지적해, **실제 04 데모·OBS·외부 실행 자산을 교체**했다. 기본 제공 `image_gen.imagegen` 도구를 사용했으며 CLI/API 키를 사용하지 않았다. 도구는 실제 모델 식별자를 노출하지 않아 ‘GPT Image 2.0을 사용했다’고 단정하지 않는다. 사용자 요구는 그 수준의 고급 시각 품질이다.

참조는 이 프로젝트에서 앞서 ImageGen으로 만든 HQ-002뿐이다. 타인의 캐릭터·사용자 개인 사진·외부 원화를 가져오지 않았다. 프로젝트 개발·기술 실험·시각 검토·문서용 자산이다. 최종 제품의 라이선스 검토나 완성 리깅 승인을 대신하지 않는다.

## 1. neutral.png

편집 대상: `experiments/phase02/assets/premium/HQ-002-alpha-edge-stress.png`. 옵션 `transparent_background=true`.

```text
Use case: precise-object-edit. Edit target is the supplied lavender-haired adult anime virtual streamer. Produce a production-quality neutral avatar, preserving her exact beautiful adult facial identity, open purple eyes, very finely rendered eyelashes and hair strands, purple rose and golden hair jewelry, intricate opaque high-neck purple embroidered gown, soft expensive fabric and restrained cinematic lighting. CRITICAL: improve the rough outer alpha boundary into a completely clean professional transparent cutout. Remove all neon magenta, pink fringe, stray pixels, jagged spots, halos and dirty edges. Hair wisps should be fine naturally colored lavender, not bright pink. Centered front-facing waist-up character, whole head and silhouette visible with generous transparent padding on ALL sides. Keep eyes open, lips softly closed, neutral friendly expression. No circle, no background, no checkerboard, no text, no UI. Rich polished high-end anime illustration with nuanced materials and delicate lines, absolutely no simplification into clipart or flat cartoon. Deliver one aligned finished character texture on true transparent alpha, ideally square 1536 or higher.
```

실제 출력은 **1254×1254** RGBA이며 프롬프트의 희망 해상도와 구분한다. 원본은 `C:/Users/abc20/.codex/generated_images/01a1e2e7-1e51-7342-afa9-97afefd2fc82/exec-95b64a8b-1b68-4072-98ca-ab35fbb246d5.png`에 남겨 두고 프로젝트로 복사했다. 가는 외곽 색 번짐 및 내부 253/255 알파가 남아 있으므로 깨끗한 경계의 정답 자산이나 NFR-ART-01 최종 합격으로 세지 않는다.

## 2. blink-speaking.png

편집 대상: 위 `neutral.png`. 옵션 `transparent_background=true`.

```text
Use case: precise-object-edit. This is an animation state texture of the supplied premium adult lavender-haired virtual streamer. Change ONLY her eyes and mouth: BOTH EYES FULLY CLOSED in a delicate natural blink, with elegant curved eyelid lines and detailed eyelashes; lips slightly OPEN speaking, showing a small dark natural mouth interior and a hint of upper teeth, believable beautiful anime speaking face, not an exaggerated black oval. ABSOLUTELY preserve the exact camera framing, entire canvas size, character position and proportions, hair silhouette, rose, jewelry, skin colors, head angle, outfit, every embroidery, light, body and transparent alpha outside the face. The new state MUST align pixel-for-pixel as closely as possible with the source for layered animation. Do not zoom, rotate, shift, redesign, add text or background. Retain premium highly detailed illustration quality.
```

실제 출력은 1254×1254 RGBA다. 원본 생성 파일 `exec-3011cef1-887a-4fc7-a9e9-f9daa6a88fdc.png`는 같은 기본 생성 폴더에 보존하고 프로젝트로 복사했다. 표정 외의 영역도 미세하게 재생성될 수 있으므로, 앱에서는 수동으로 정한 눈·입 영역만 추가 상태로 가져온다. 몸체 전체를 두 이미지 사이에서 교차하지 않는다.

## 파생과 실제 사용

`build_premium.py`는 저장된 두 입력을 읽고 직접 지정한 영역과 feather alpha를 공통 부위 자원으로 만든다. 원본 생성 PNG를 덮어쓰지 않는다. 이는 제품 시제품의 자산 가져오기·상태 준비 절차이며 자동 리깅 결과로 주장하지 않는다. `import.json`에 두 원본 해시와 수동 영역을 기록했다.

기본 실행은 이 고급 자산을 사용한다. `export_inp.py`는 대상 SDK의 혼합 방식에 맞춰 내장 텍스처만 premultiplied RGB로 변환한다. 실제 외부 프로그램에서 보였던 밝은 패치 사각형이 수정된 것을 캡처로 확인했다. 외곽 원화 결함과 내보내기 구현이 만든 알파 결함을 구분한다. 최종 저장 자산과 실제 출력의 해시는 `results/artifact-manifest.json`을 따른다.

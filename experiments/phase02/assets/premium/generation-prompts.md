# 고품질 샘플 생성 기록

2026-11-16, 사용자 추가 지시: “이미지의 경우에는 … 고급지게 해야 돼. GPT Image 2.0느낌이 나와야 돼”. 기본 제공 ImageGen 도구를 사용했다. 도구는 실제 모델 식별자를 노출하지 않으므로 `GPT Image 2.0`으로 생성했다고 단정하지 않는다.

프로젝트에 복사한 최종 파일은 `HQ-001-premium-portrait.png`와 `HQ-002-alpha-edge-stress.png`다. 원본 생성 파일은 기본 생성 위치에 보존했다. 재생성은 비결정적이므로 실험 재현은 이 파일의 고정 SHA-256을 기준으로 한다. 자산을 조용히 재생성·교체하지 않는다.

## HQ-001 최종 생성 프롬프트

투명 배경 옵션: `false`. 외부 참조 이미지 없음.

```text
Use case: stylized-concept. Asset type: high-end original adult 2D virtual streamer character illustration, production visual benchmark. The user's quality brief is luxurious, sophisticated, premium GPT Image 2.0-like finish, not clipart or a flat avatar-maker sample. Create one beautiful original adult female character front-facing, head and upper torso, poised gentle neutral closed-mouth expression, both eyes clearly open. Premium contemporary anime art with delicate confident linework, richly nuanced soft shading, naturally luminous skin, very detailed irises and eyelashes, fine individual hair strands within coherent flowing hair masses, an elegant fully clothed high-neck outfit with restrained intricate embroidery, believable fabric, beautifully balanced design. No huge weapons or floating effects. Head and all hair fully within the square canvas with generous quiet padding, shoulders naturally framed, no hands obscuring the face. Soft studio illumination and carefully controlled color harmony. BACKGROUND MUST BE OPAQUE uniform soft warm light gray with absolutely clean painted edges, no transparency, no magenta fringe, no green-screen color, no checkerboard. Refined professional commercial character key art, intentionally suitable for later measuring whether automatic rigging preserves the original face, hair, costume and line quality. One character only, original fictional design, no text, logo, watermark, UI, border, sprite sheet or collage.
```

검토: 원화 인상·세부 묘사를 비교할 고품질 입력 후보로 채택했다. 상단 여백이 좁고 하단은 상반신 크롭이므로 완전한 전신·모든 방향 복원 기준으로 사용하지 않는다.

## HQ-002 원본 생성 프롬프트

투명 배경 옵션: `true`. 외부 참조 이미지 없음. 아래로 생성한 원본을 `imagegen-draft-001`로 식별한다.

```text
Use case: stylized-concept. Asset type: premium original 2D virtual streamer character portrait, a real production-quality visual benchmark for the 2DSketcher project. Primary request: sophisticated, luxurious, exceptionally polished illustration with the detail, visual coherence and finish the user associates with GPT Image 2.0. Subject: one original clearly adult virtual streamer character, front-facing head and upper torso, friendly poised neutral expression, both eyes fully open and unobscured, mouth gently closed, symmetrical relaxed posture. Style/medium: premium contemporary anime illustration with elegant anatomy, delicate confident line work, expressive detailed irises, individually resolved hair strands and larger readable hair masses, luminous layered shading, restrained glossy highlights, refined clothing design with convincing fabric, seams and tasteful small decorative details. Art direction must feel expensive and cohesive, never like simple geometric clip art, a flat placeholder, a cheap avatar maker or plastic 3D. Composition/framing: square canvas, full head and hairstyle plus shoulders and upper torso fully inside frame, generous clear padding, no hand in front of face, no cropped hair tips, clear separation of eyes, mouth, hair and collar so later rigging-quality preservation can be assessed. Lighting: soft flattering studio light, subtle depth and natural material separation. Backdrop: genuine transparent alpha with crisp refined cutout edges and no baked-in shadow or checkerboard. Constraints: one character only; original fictional design; no text, logo, watermark, UI, border, collage or contact sheet. This is a single finished original illustration, not a sprite sheet or separated parts.
```

## HQ-002 최종 편집 프롬프트

위 원본만 편집 대상으로 전달했다. 투명 배경 옵션: `true`.

```text
Use case: precise-object-edit. Edit target: the supplied premium adult virtual streamer illustration. Preserve the exact character identity, beautiful face, eye shape and color, original lavender hair, refined detailed line work, opulent rose hair ornament and overall premium anime rendering. Correct production issues only: zoom out so the entire top and all hair tips have clear transparent padding on every side, complete the lower portrait with a deliberate clean upper-torso silhouette rather than abruptly clipping details, and remove every magenta/pink edge artifact and all stray opaque specks around the cutout. Give the clothing an elegant opaque high-neck bodice covering the upper chest, preserving the high-end fabric, lace trim, gold embroidery and jewel craftsmanship. Maintain a poised friendly closed-mouth neutral face, both open eyes fully visible. Genuine clean transparent alpha background, no colored backdrop, no checkerboard, no fringe, no cast shadow, no text or watermark. One final polished production illustration. Rendering should remain exceptionally sophisticated, with no simplification to flat shapes.
```

검토: 수정 후에도 일부 얇은 경계에 색 번짐·반점이 보인다. 결함을 숨기지 않고 **경계 스트레스 입력**으로만 채택했다. 깨끗한 알파 경계의 정답 이미지나 최종 제품 아트로 승인하지 않았다. 원본 자체의 결함과 후속 알고리즘이 새로 만든 결함을 구분한다.

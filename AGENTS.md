# 2DSketcher working rules

- Read `docs/Todo`, PRD, Function and the current planning decision before changing scope.
- Preserve three creation routes, premium artwork, local execution/broadcast, independent export and the mandatory long-term features.
- M0 remains HOLD until its actual revalidation criteria pass. Foundation checks do not complete later product features.
- Keep historical experiment code/assets/results immutable. Add a new run rather than relabeling old evidence.
- Product code lives in `apps/`, `packages/`, and `worker/`; developer tooling in `scripts/` and `tools/`.
- Use `tools\dev.cmd run check` for the required local gate. Changes to packaging also require a packaged self-check.
- Never place credentials, camera frames, microphone PCM, personal paths or unfiltered error strings in normal logs.
- Default visible artwork must use the premium preview assets. Structural diagram fixtures are development-only.
- Never disable OS execution policy or application sandboxing to make a check pass.
- Do not spawn sub-agents unless the user explicitly requests delegation.
- Do not publish, push, sign or deploy as part of a local build task. Keep version-control changes reviewable.

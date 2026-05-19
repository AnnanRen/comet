# Comet Remotion Bilibili Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Chinese Comet Remotion video into a white-background, light-tech product video that better fits Bilibili while preserving the WHAT + HOW + five-stage workflow story.

**Architecture:** Keep the current one-composition, multi-scene Remotion structure in `video/src`, but rewrite the design system, scene copy, and scene layouts. Centralize the new white-theme tokens in `colors.ts`, keep sequencing in `CometIntro.tsx`, and refactor each scene so the visual language is consistent and the story flows from pain points to workflow to CTA.

**Tech Stack:** Remotion, React, TypeScript, `@remotion/transitions`

---

## File Structure

| Operation | File | Responsibility |
|------|------|------|
| Modify | `D:\Project\Comet\video\src\colors.ts` | Replace dark palette with white-background light-tech design tokens |
| Modify | `D:\Project\Comet\video\src\CometIntro.tsx` | Keep scene order, update global background and transition rhythm if needed |
| Modify | `D:\Project\Comet\video\src\scenes\TitleScene.tsx` | Brand-led opening with Chinese value proposition |
| Modify | `D:\Project\Comet\video\src\scenes\ProblemScene.tsx` | “Chaos to structure” transition scene |
| Modify | `D:\Project\Comet\video\src\scenes\DualStarScene.tsx` | Productized WHAT/HOW/Comet relationship scene |
| Modify | `D:\Project\Comet\video\src\scenes\PipelineScene.tsx` | Core five-stage horizontal workflow belt |
| Modify | `D:\Project\Comet\video\src\scenes\FeaturesScene.tsx` | Three key product advantages scene |
| Modify | `D:\Project\Comet\video\src\scenes\QuickStartScene.tsx` | White-background lightweight terminal onboarding scene |
| Modify | `D:\Project\Comet\video\src\scenes\OutroScene.tsx` | Premium CTA closing scene |
| Optional Modify | `D:\Project\Comet\video\src\Root.tsx` | Only if duration or composition metadata must change |
| Verify | `D:\Project\Comet\video\package.json` | Discover preview / render commands already available |

---

## Task 1: Lock The New Global Visual System

**Files:**
- Modify: `D:\Project\Comet\video\src\colors.ts`
- Modify: `D:\Project\Comet\video\src\CometIntro.tsx`
- Verify: `D:\Project\Comet\video\package.json`

- [ ] **Step 1: Read the existing video package scripts before changing implementation assumptions**

Run:

```powershell
Get-Content D:\Project\Comet\video\package.json
```

Expected:

- A `scripts` section with at least one preview or Remotion command
- Confirmation of the package manager and local render workflow

- [ ] **Step 2: Add the new white-background palette in `colors.ts`**

Replace the current export with a light-system token map like:

```ts
export const COLORS = {
  bg: "#f7fafe",
  bgSoft: "#eef4fb",
  surface: "#ffffff",
  surfaceAlt: "#f3f7fc",
  line: "#d7e4f2",
  lineStrong: "#bfd5ea",
  text: "#0f172a",
  textMuted: "#5f6b7a",
  accent: "#1d7ff2",
  accentSoft: "#dbeafe",
  accentStrong: "#0f5fcc",
  openspec: "#f59e0b",
  openspecSoft: "#fff3d6",
  superpowers: "#10b981",
  superpowersSoft: "#daf7ed",
  success: "#16a34a",
  dangerSoft: "#fee2e2",
  shadow: "0 18px 50px rgba(29, 127, 242, 0.10)",
};
```

- [ ] **Step 3: Update the composition wrapper to use the new background and calmer transitions**

In `D:\Project\Comet\video\src\CometIntro.tsx`, make the outer fill use the new light palette:

```tsx
<AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
```

Also import the color tokens if the file does not already do so:

```tsx
import { COLORS } from "./colors";
```

If transitions feel too aggressive during preview, standardize on:

```tsx
timing={linearTiming({ durationInFrames: 16 })}
```

for the non-hero transitions.

- [ ] **Step 4: Run a fast type check or build after the token/global wrapper changes**

Run one of:

```powershell
pnpm --dir D:\Project\Comet\video build
```

or, if the package exposes a direct Remotion lint/build script:

```powershell
pnpm --dir D:\Project\Comet\video exec tsc --noEmit
```

Expected:

- PASS with no TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add video/src/colors.ts video/src/CometIntro.tsx
git commit -m "feat(video): add white light-tech visual system"
```

---

## Task 2: Rebuild The Opening Story Arc

**Files:**
- Modify: `D:\Project\Comet\video\src\scenes\TitleScene.tsx`
- Modify: `D:\Project\Comet\video\src\scenes\ProblemScene.tsx`

- [ ] **Step 1: Rewrite `TitleScene` copy and layout into a brand-led opening**

Replace the current ASCII-logo-first layout with:

```tsx
const eyebrow = "Comet Workflow";
const title = "把 AI 开发，变成一条可执行的流程。";
const brand = "Comet";
const subtitle = "OpenSpec + Superpowers 双星开发工作流";
```

Use a layout shape similar to:

```tsx
<AbsoluteFill
  style={{
    backgroundColor: COLORS.bg,
    padding: "120px 140px",
    justifyContent: "center",
  }}
>
  <div style={{ fontSize: 18, letterSpacing: 3, color: COLORS.textMuted }}>
    {eyebrow}
  </div>
  <div style={{ marginTop: 28, fontSize: 84, fontWeight: 800, color: COLORS.text, lineHeight: 1.08 }}>
    {title}
  </div>
  <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18 }}>
    <div style={{ width: 88, height: 4, borderRadius: 999, backgroundColor: COLORS.accent }} />
    <div style={{ fontSize: 42, fontWeight: 700, color: COLORS.accentStrong }}>
      {brand}
    </div>
  </div>
  <div style={{ marginTop: 18, fontSize: 28, color: COLORS.textMuted }}>
    {subtitle}
  </div>
</AbsoluteFill>
```

- [ ] **Step 2: Replace the `ProblemScene` list-of-pains with a “chaos to structure” composition**

Use four short problem tags:

```ts
const problems = ["需求变更", "设计脱节", "执行失焦", "归档缺失"];
const conclusion = "问题不是 AI 不够强，而是流程没有被组织起来。";
```

Build the scene in two layers:

```tsx
<div style={{ display: "flex", gap: 16, flexWrap: "wrap", maxWidth: 980 }}>
  {problems.map((item) => (
    <div
      key={item}
      style={{
        padding: "16px 22px",
        borderRadius: 999,
        backgroundColor: COLORS.surface,
        border: `1px solid ${COLORS.line}`,
        color: COLORS.textMuted,
      }}
    >
      {item}
    </div>
  ))}
</div>
<div style={{ marginTop: 56, fontSize: 44, fontWeight: 700, color: COLORS.text, lineHeight: 1.3 }}>
  {conclusion}
</div>
```

Animate the chips from offset positions first, then fade and align them before revealing the conclusion.

- [ ] **Step 3: Run a one-frame render or preview check for the first two scenes**

Run:

```powershell
pnpm --dir D:\Project\Comet\video exec remotion still CometIntro --frame=45 --output=D:\Project\Comet\video\tmp-opening.png
```

Expected:

- A rendered still with a white background
- Readable headline hierarchy
- No dark-theme leftovers from `TitleScene` or `ProblemScene`

- [ ] **Step 4: Commit**

```bash
git add video/src/scenes/TitleScene.tsx video/src/scenes/ProblemScene.tsx
git commit -m "feat(video): rebuild opening scenes for bilibili brand style"
```

---

## Task 3: Rebuild The Core Product Explanation Scenes

**Files:**
- Modify: `D:\Project\Comet\video\src\scenes\DualStarScene.tsx`
- Modify: `D:\Project\Comet\video\src\scenes\PipelineScene.tsx`
- Modify: `D:\Project\Comet\video\src\scenes\FeaturesScene.tsx`

- [ ] **Step 1: Rebuild `DualStarScene` as responsibility cards instead of glowing planets**

Use structured data:

```ts
const leftCard = {
  label: "WHAT",
  title: "OpenSpec",
  desc: "定义需求、维护 spec 生命周期、负责归档闭环",
  tone: COLORS.openspec,
  toneSoft: COLORS.openspecSoft,
};

const rightCard = {
  label: "HOW",
  title: "Superpowers",
  desc: "负责深度设计、计划拆解、执行与验证",
  tone: COLORS.superpowers,
  toneSoft: COLORS.superpowersSoft,
};
```

Use a center module:

```tsx
<div
  style={{
    padding: "24px 32px",
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.lineStrong}`,
    boxShadow: COLORS.shadow,
  }}
>
  <div style={{ fontSize: 18, color: COLORS.textMuted }}>Workflow Orchestration</div>
  <div style={{ marginTop: 10, fontSize: 36, fontWeight: 800, color: COLORS.accentStrong }}>
    Comet
  </div>
</div>
```

- [ ] **Step 2: Rebuild `PipelineScene` into a horizontal activation belt**

Use five compact steps:

```ts
const phases = [
  { name: "Open", cmd: "/comet-open", result: "形成 proposal 与 tasks" },
  { name: "Design", cmd: "/comet-design", result: "沉淀 Design Doc 与 delta spec" },
  { name: "Build", cmd: "/comet-build", result: "推进实现计划与代码提交" },
  { name: "Verify", cmd: "/comet-verify", result: "完成验证与收尾决策" },
  { name: "Archive", cmd: "/comet-archive", result: "同步 spec 并完成归档" },
];
```

Use a belt layout like:

```tsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18, width: "100%" }}>
  {phases.map((phase, index) => (
    <div
      key={phase.name}
      style={{
        borderRadius: 22,
        backgroundColor: COLORS.surface,
        border: `1px solid ${isActive ? COLORS.accent : COLORS.line}`,
        boxShadow: isActive ? COLORS.shadow : "none",
        padding: "24px 20px",
      }}
    >
      <div style={{ fontSize: 14, color: COLORS.textMuted }}>0{index + 1}</div>
      <div style={{ marginTop: 10, fontSize: 28, fontWeight: 800, color: COLORS.text }}>{phase.name}</div>
      <div style={{ marginTop: 10, fontSize: 16, color: COLORS.accentStrong, fontFamily: "monospace" }}>{phase.cmd}</div>
      <div style={{ marginTop: 16, fontSize: 18, color: COLORS.textMuted, lineHeight: 1.5 }}>{phase.result}</div>
    </div>
  ))}
</div>
```

- [ ] **Step 3: Rewrite `FeaturesScene` to focus on three memorable product advantages**

Replace the four equal cards with three points:

```ts
const features = [
  { kicker: "28", title: "支持 28 个 AI 平台", desc: "从 Claude Code、Codex 到 Cursor，接入方式保持统一。" },
  { kicker: "1", title: "一条命令完成初始化", desc: "用 comet init 连接平台、技能与工作目录。" },
  { kicker: "Auto", title: "状态守护、校验与归档自动化", desc: "让流程推进、验证和收尾更稳定，不靠人工记忆。" },
];
```

Use an asymmetrical layout:

```tsx
<div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr 0.8fr", gap: 20 }}>
```

so the `28` card becomes the anchor visual.

- [ ] **Step 4: Run preview/build verification on the core explanation scenes**

Run:

```powershell
pnpm --dir D:\Project\Comet\video exec tsc --noEmit
```

Then run:

```powershell
pnpm --dir D:\Project\Comet\video exec remotion still CometIntro --frame=720 --output=D:\Project\Comet\video\tmp-core.png
```

Expected:

- PASS type check
- A mid-video still showing the new pipeline or product explanation scene in the white theme

- [ ] **Step 5: Commit**

```bash
git add video/src/scenes/DualStarScene.tsx video/src/scenes/PipelineScene.tsx video/src/scenes/FeaturesScene.tsx
git commit -m "feat(video): rebuild core product explanation scenes"
```

---

## Task 4: Rebuild Quick Start And CTA

**Files:**
- Modify: `D:\Project\Comet\video\src\scenes\QuickStartScene.tsx`
- Modify: `D:\Project\Comet\video\src\scenes\OutroScene.tsx`

- [ ] **Step 1: Rewrite `QuickStartScene` as a white-background onboarding module**

Keep the three commands:

```ts
const commands = [
  "$ npm install -g @rpamis/comet",
  "$ cd your-project",
  "$ comet init",
];
```

But move them into a light code module:

```tsx
<div
  style={{
    width: "100%",
    maxWidth: 980,
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.line}`,
    boxShadow: COLORS.shadow,
    overflow: "hidden",
  }}
>
  <div style={{ padding: "18px 24px", backgroundColor: COLORS.bgSoft, borderBottom: `1px solid ${COLORS.line}` }}>
    <div style={{ fontSize: 18, color: COLORS.textMuted }}>3 步接入 Comet</div>
  </div>
  <div style={{ padding: "30px 34px", fontFamily: "monospace", fontSize: 26, color: COLORS.text }}>
```

Replace the success strings with:

```ts
"✓ OpenSpec 已就绪"
"✓ Superpowers 已就绪"
"✓ Comet 工作流已连接"
```

- [ ] **Step 2: Rewrite `OutroScene` into a premium product closing frame**

Use:

```ts
const closing = "让 WHAT 与 HOW，在同一条流程里闭环。";
const install = "npm install -g @rpamis/comet";
const link = "github.com/rpamis/comet";
```

Use a layout like:

```tsx
<AbsoluteFill style={{ backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center", padding: "120px 140px" }}>
  <div style={{ fontSize: 54, fontWeight: 800, color: COLORS.text, textAlign: "center", lineHeight: 1.2 }}>
    {closing}
  </div>
  <div style={{ marginTop: 42, padding: "20px 32px", borderRadius: 20, backgroundColor: COLORS.surface, border: `1px solid ${COLORS.lineStrong}` }}>
    <code style={{ fontSize: 30, color: COLORS.accentStrong, fontFamily: "monospace" }}>{install}</code>
  </div>
  <div style={{ marginTop: 28, fontSize: 22, color: COLORS.textMuted }}>{link}</div>
</AbsoluteFill>
```

- [ ] **Step 3: Run a late-frame still render to verify the closing rhythm**

Run:

```powershell
pnpm --dir D:\Project\Comet\video exec remotion still CometIntro --frame=1650 --output=D:\Project\Comet\video\tmp-outro.png
```

Expected:

- White closing frame
- CTA centered and readable
- No old dark glow artifacts

- [ ] **Step 4: Commit**

```bash
git add video/src/scenes/QuickStartScene.tsx video/src/scenes/OutroScene.tsx
git commit -m "feat(video): rebuild onboarding and closing scenes"
```

---

## Task 5: Final Sequence Tuning And Verification

**Files:**
- Modify: `D:\Project\Comet\video\src\CometIntro.tsx`
- Optional Modify: `D:\Project\Comet\video\src\Root.tsx`

- [ ] **Step 1: Tune sequence durations only if preview shows pacing issues**

If the new layouts need more breathing room, adjust sequence durations in `CometIntro.tsx` with this priority:

```tsx
<TransitionSeries.Sequence durationInFrames={180}>
  <TitleScene />
</TransitionSeries.Sequence>
<TransitionSeries.Sequence durationInFrames={220}>
  <ProblemScene />
</TransitionSeries.Sequence>
<TransitionSeries.Sequence durationInFrames={280}>
  <DualStarScene />
</TransitionSeries.Sequence>
<TransitionSeries.Sequence durationInFrames={360}>
  <PipelineScene />
</TransitionSeries.Sequence>
<TransitionSeries.Sequence durationInFrames={260}>
  <FeaturesScene />
</TransitionSeries.Sequence>
<TransitionSeries.Sequence durationInFrames={220}>
  <QuickStartScene />
</TransitionSeries.Sequence>
<TransitionSeries.Sequence durationInFrames={220}>
  <OutroScene />
</TransitionSeries.Sequence>
```

If the total changes materially, update `Root.tsx`:

```tsx
durationInFrames={1740}
```

or whatever the recomputed total actually is.

- [ ] **Step 2: Run the complete video verification**

Run:

```powershell
pnpm --dir D:\Project\Comet\video exec tsc --noEmit
```

Then run the local preview command discovered in Task 1 and manually verify:

- White background is consistent across all scenes
- Chinese headline wrapping is clean
- Pipeline scene is readable at 1920x1080
- Quick Start code panel is legible
- Title and Outro feel like the same product language

If the project exposes a render command, run a low-risk export or still render:

```powershell
pnpm --dir D:\Project\Comet\video exec remotion still CometIntro --frame=900 --output=D:\Project\Comet\video\tmp-verify.png
```

- [ ] **Step 3: Remove temporary local verification files if they were created**

Run:

```powershell
Remove-Item D:\Project\Comet\video\tmp-opening.png,D:\Project\Comet\video\tmp-core.png,D:\Project\Comet\video\tmp-outro.png,D:\Project\Comet\video\tmp-verify.png -ErrorAction SilentlyContinue
```

Expected:

- No temporary preview PNGs left in `video\`

- [ ] **Step 4: Commit**

```bash
git add video/src/CometIntro.tsx video/src/Root.tsx
git commit -m "feat(video): tune pacing and verify remotion refresh"
```

---

## Self-Review

### Spec Coverage

- White-background light-tech design: Task 1
- Brand-led opening and stronger Chinese messaging: Task 2
- WHAT/HOW/Comet relationship: Task 3
- Five-stage workflow as the visual peak: Task 3
- Three key value points: Task 3
- Lightweight quick start: Task 4
- Premium CTA ending: Task 4
- Pacing and final verification: Task 5

No spec gap remains.

### Placeholder Scan

- No `TODO`, `TBD`, or “implement later” placeholders remain.
- Each task includes exact file paths, exact commands, and concrete code direction.

### Type Consistency

- `COLORS` token naming is consistent across all tasks.
- Scene names match the current codebase.
- `CometIntro` remains the composition id used by the verification commands.

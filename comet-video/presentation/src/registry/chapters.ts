import type { ChapterDef } from "./types";
import RealProblemChapter from "../chapters/01-real-problem/RealProblem";
import { narrations as realProblemNarrations } from "../chapters/01-real-problem/narrations";
import CometPositioningChapter from "../chapters/02-comet-positioning/CometPositioning";
import { narrations as cometPositioningNarrations } from "../chapters/02-comet-positioning/narrations";
import FiveStageFlowChapter from "../chapters/03-five-stage-flow/FiveStageFlow";
import { narrations as fiveStageFlowNarrations } from "../chapters/03-five-stage-flow/narrations";
import ResumeEntryChapter from "../chapters/04-resume-entry/ResumeEntry";
import { narrations as resumeEntryNarrations } from "../chapters/04-resume-entry/narrations";
import LightweightStateMachineChapter from "../chapters/05-lightweight-state-machine/LightweightStateMachine";
import { narrations as lightweightStateMachineNarrations } from "../chapters/05-lightweight-state-machine/narrations";
import InstallAndRoutesChapter from "../chapters/06-install-and-routes/InstallAndRoutes";
import { narrations as installAndRoutesNarrations } from "../chapters/06-install-and-routes/narrations";
import ReferenceValueChapter from "../chapters/07-reference-value/ReferenceValue";
import { narrations as referenceValueNarrations } from "../chapters/07-reference-value/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "real-problem",
    title: "AI Coding 长任务的断点问题",
    narrations: realProblemNarrations,
    Component: RealProblemChapter,
  },
  {
    id: "comet-positioning",
    title: "Comet 的组合定位",
    narrations: cometPositioningNarrations,
    Component: CometPositioningChapter,
  },
  {
    id: "five-stage-flow",
    title: "五阶段如何串起来",
    narrations: fiveStageFlowNarrations,
    Component: FiveStageFlowChapter,
  },
  {
    id: "resume-entry",
    title: "/comet 主入口和长任务恢复",
    narrations: resumeEntryNarrations,
    Component: ResumeEntryChapter,
  },
  {
    id: "lightweight-state-machine",
    title: ".comet.yaml 和阶段守护",
    narrations: lightweightStateMachineNarrations,
    Component: LightweightStateMachineChapter,
  },
  {
    id: "install-and-routes",
    title: "安装、平台分发和快捷路径",
    narrations: installAndRoutesNarrations,
    Component: InstallAndRoutesChapter,
  },
  {
    id: "reference-value",
    title: "组合 Skill 的参考价值",
    narrations: referenceValueNarrations,
    Component: ReferenceValueChapter,
  },
];

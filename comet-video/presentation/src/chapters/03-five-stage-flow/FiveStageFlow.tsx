import { useRef } from "react";
import type { ChapterStepProps } from "../../registry/types";
import { HighlightedTitle } from "../../components/HighlightedTitle";
import { useSceneAnimations } from "../../hooks/useSceneAnimations";
import "./FiveStageFlow.css";

const phases = [
  {
    id: "open",
    command: "comet-open",
    owner: "OpenSpec",
    outputs: ["proposal.md", "design.md", "tasks.md"],
    note: "固定这次要改什么",
  },
  {
    id: "design",
    command: "comet-design",
    owner: "Superpowers",
    outputs: ["Design Doc", "delta spec", "risks"],
    note: "把边界、方案、风险讲清楚",
  },
  {
    id: "build",
    command: "comet-build",
    owner: "Superpowers",
    outputs: ["plan", "TDD", "subagents"],
    note: "按计划进入工程实现",
  },
  {
    id: "verify",
    command: "comet-verify",
    owner: "Both",
    outputs: ["tests", "report", "finish"],
    note: "验证需求与实现是否对齐",
  },
  {
    id: "archive",
    command: "comet-archive",
    owner: "OpenSpec",
    outputs: ["main spec", "archive", "frontmatter"],
    note: "把变更同步回知识库",
  },
];

const projectTree = [
  {
    label: "platform skills",
    root: ".claude/skills/",
    files: ["comet/SKILL.md", "comet/scripts/comet-guard.sh", "openspec-*/SKILL.md", "brainstorming/SKILL.md"],
  },
  {
    label: "OpenSpec — WHAT",
    root: "openspec/changes/<name>/",
    files: [".openspec.yaml", ".comet.yaml", "proposal.md", "specs/<capability>/spec.md"],
  },
  {
    label: "Superpowers — HOW",
    root: "docs/superpowers/",
    files: ["specs/YYYY-MM-DD-topic-design.md", "plans/YYYY-MM-DD-feature.md"],
  },
];

function SceneShell({
  code,
  kicker,
  title,
  children,
}: {
  code: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fs-scene scene-pad">
      <div className="fs-topline">
        <div>
          <div className="kicker">{kicker}</div>
          <h1><HighlightedTitle text={title} /></h1>
        </div>
        <div className="fs-code label-mono">{code}</div>
      </div>
      <hr className="rule" />
      {children}
    </div>
  );
}

function PhaseCard({
  phase,
  index,
  active = false,
  compact = false,
}: {
  phase: (typeof phases)[number];
  index: number;
  active?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "fs-phase-card",
        "card",
        active ? "is-active" : "",
        compact ? "is-compact" : "",
      ].join(" ")}
    >
      <span className="label-mono">0{index + 1}</span>
      <strong>{phase.id}</strong>
      <em>{phase.command}</em>
      {!compact && (
        <>
          <small>{phase.owner}</small>
          <div className="fs-output-list">
            {phase.outputs.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FiveStageFlow({ step }: ChapterStepProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  useSceneAnimations(sceneRef);

  if (step === 0) {
    return (
      <SceneShell
        code="COMET / FIVE PHASES"
        kicker="WORKFLOW MAP"
        title="完整流程拆成五个阶段"
      >
        <div className="fs-map-shell" ref={sceneRef}>
          <div className="fs-map">
            {phases.map((phase, idx) => (
              <div key={phase.id} data-animate="flip-in">
                <PhaseCard phase={phase} index={idx} compact />
              </div>
            ))}
          </div>
          <div className="fs-flow-caption" data-animate="blur-in">
            <span className="label-mono">auto trigger</span>
            <strong>5阶段流转自动触发</strong>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step >= 1 && step <= 5) {
    const idx = step - 1;
    const phase = phases[idx]!;
    return (
      <SceneShell
        code={`PHASE 0${idx + 1} / ${phase.command.toUpperCase()}`}
        kicker={phase.owner}
        title={phase.command}
      >
        <div className="fs-focus-layout" ref={sceneRef}>
          <div className="fs-focus-left" data-animate="scale-in">
            <PhaseCard phase={phase} index={idx} active />
          </div>
          <div className="fs-focus-right">
            <div className="fs-owner-card card" data-animate="slide-right">
              <span className="label-mono">owner</span>
              <strong>{phase.owner}</strong>
              <p>{phase.note}</p>
            </div>
            <div className="fs-artifacts">
              {phase.outputs.map((item) => (
                <div className="fs-artifact" key={item} data-animate="pop">
                  <span />
                  <b>{item}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 6) {
    return (
      <SceneShell
        code="DONE / NOT JUST CODE"
        kicker="COMPLETION CHECK"
        title="需求不是代码写完就结束"
      >
        <div className="fs-not-done" ref={sceneRef}>
          <div className="fs-stop-card card" data-animate="slide-left">
            <span className="label-mono">not enough</span>
            <strong>code done</strong>
          </div>
          <div className="fs-stop-card card" data-animate="slide-left">
            <span className="label-mono">not enough</span>
            <strong>tasks checked</strong>
          </div>
          <div className="fs-stop-card card is-right" data-animate="pop">
            <span className="label-mono">required</span>
            <strong>state aligned</strong>
          </div>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell
      code="PROJECT STRUCTURE"
      kicker="INIT OUTPUT"
      title="Comet 会把工作区分成三层结构"
    >
      <div className="fs-structure" ref={sceneRef}>
        <div className="fs-tree-card card" data-animate="slide-left">
          <span className="label-mono">your-project/</span>
          {projectTree.map((group) => (
            <div className="fs-tree-group" key={group.root} data-animate="reveal">
              <strong>{group.root}</strong>
              {group.files.map((file) => (
                <code key={file}>{file}</code>
              ))}
            </div>
          ))}
        </div>
        <div className="fs-structure-notes">
          {projectTree.map((group, idx) => (
            <div className="fs-structure-note card" key={group.label} data-animate="slide-right">
              <span className="label-mono">0{idx + 1}</span>
              <strong>{group.label}</strong>
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

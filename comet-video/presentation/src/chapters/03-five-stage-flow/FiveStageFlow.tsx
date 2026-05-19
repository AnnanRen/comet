import type { ChapterStepProps } from "../../registry/types";
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
          <h1>{title}</h1>
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

function FocusPhase({ idx }: { idx: number }) {
  const phase = phases[idx]!;
  return (
    <div className="fs-focus-layout">
      <div className="fs-focus-left">
        <PhaseCard phase={phase} index={idx} active />
      </div>
      <div className="fs-focus-right">
        <div className="fs-owner-card card">
          <span className="label-mono">owner</span>
          <strong>{phase.owner}</strong>
          <p>{phase.note}</p>
        </div>
        <div className="fs-artifacts">
          {phase.outputs.map((item) => (
            <div className="fs-artifact" key={item}>
              <span />
              <b>{item}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FiveStageFlow({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <SceneShell
        code="COMET / FIVE PHASES"
        kicker="WORKFLOW MAP"
        title="完整流程拆成五个阶段"
      >
        <div className="fs-map">
          {phases.map((phase, idx) => (
            <PhaseCard key={phase.id} phase={phase} index={idx} compact />
          ))}
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
        <FocusPhase idx={idx} />
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
        <div className="fs-not-done">
          <div className="fs-stop-card card">
            <span className="label-mono">not enough</span>
            <strong>code done</strong>
          </div>
          <div className="fs-stop-card card">
            <span className="label-mono">not enough</span>
            <strong>tasks checked</strong>
          </div>
          <div className="fs-stop-card card is-right">
            <span className="label-mono">required</span>
            <strong>state aligned</strong>
          </div>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell
      code="CLOSED LOOP"
      kicker="CONSISTENT STATE"
      title="需求、实现、验证、归档回到一致状态"
    >
      <div className="fs-loop">
        {phases.map((phase, idx) => (
          <div className="fs-loop-node" key={phase.id}>
            <span className="label-mono">0{idx + 1}</span>
            <strong>{phase.id}</strong>
          </div>
        ))}
        <div className="fs-loop-core">
          <span className="label-mono">Comet</span>
          <b>五阶段闭环</b>
        </div>
      </div>
    </SceneShell>
  );
}

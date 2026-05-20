import type { ChapterStepProps } from "../../registry/types";
import { HighlightedTitle } from "../../components/HighlightedTitle";
import "./CometPositioning.css";

const whatItems = ["需求是什么", "提案怎么写", "Spec 怎么变更", "最后怎么归档"];
const howItems = ["头脑风暴", "技术设计", "实现计划", "执行", "验证收尾"];
const contextItems = [
  { lane: "WHAT", items: ["proposal", "spec lifecycle", "archive state"] },
  { lane: "HOW", items: ["brainstorming", "design doc", "execution plan"] },
];
const triggerItems = [
  { phase: "open", skill: "OpenSpec" },
  { phase: "design", skill: "Superpowers" },
  { phase: "build", skill: "Superpowers" },
  { phase: "verify", skill: "Both" },
];
const repoUrl = "github.com/rpamis/comet";

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
    <div className="cp-scene scene-pad">
      <div className="cp-topline">
        <div>
          <div className="kicker">{kicker}</div>
          <h1><HighlightedTitle text={title} /></h1>
        </div>
        <div className="cp-code label-mono">{code}</div>
      </div>
      <hr className="rule" />
      {children}
    </div>
  );
}

function CapabilityCard({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="cp-cap-card card">
      <span className="label-mono">{label}</span>
      <strong>{title}</strong>
      <div className="cp-cap-list">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function CometPositioning({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <SceneShell
        code="COMET / POSITION"
        kicker="NOT A NEW METHODOLOGY"
        title="稳定组合，而不是重写一套"
      >
        <div className="cp-position">
          <div className="cp-position-mark">
            <div className="cp-big-word hero-num">COMET</div>
            <div className="cp-repo-chip card">
              <span className="label-mono">project</span>
              <strong>{repoUrl}</strong>
            </div>
          </div>
          <div className="cp-intro-proof card">
            <img src="/img/Comet-introduce.png" alt="Comet introduction poster" />
            <div>
              <span className="label-mono">role</span>
              <p>把 OpenSpec 和 Superpowers 的能力放进同一条开发轨道。</p>
            </div>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 1) {
    return (
      <SceneShell
        code="OPENSPEC / WHAT"
        kicker="WHAT SIDE"
        title="OpenSpec 管需求世界"
      >
        <div className="cp-capability-layout">
          <CapabilityCard label="WHAT" title="OpenSpec" items={whatItems} />
          <div className="cp-side-axis">
            <span>proposal</span>
            <span>spec lifecycle</span>
            <span>archive</span>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 2) {
    return (
      <SceneShell
        code="SUPERPOWERS / HOW"
        kicker="HOW SIDE"
        title="Superpowers 管执行方法"
      >
        <div className="cp-capability-layout is-how">
          <CapabilityCard label="HOW" title="Superpowers" items={howItems} />
          <div className="cp-method-ladder">
            {howItems.map((item, idx) => (
              <div key={item} className="cp-method-step">
                <span className="hero-num">{idx + 1}</span>
                <b>{item}</b>
              </div>
            ))}
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 3) {
    return (
      <SceneShell
        code="COMET / DISPATCH LAYER"
        kicker="CONNECTOR"
        title="Comet 把两条线接起来"
      >
        <div className="cp-bridge">
          <div className="cp-bridge-card card is-what">
            <span className="label-mono">WHAT</span>
            <strong>OpenSpec</strong>
            <p>proposal / spec lifecycle / archive</p>
          </div>
          <div className="cp-bridge-core card">
            <span className="label-mono">dispatch</span>
            <b>Comet</b>
            <p>只做组合调度</p>
          </div>
          <div className="cp-bridge-card card is-how">
            <span className="label-mono">HOW</span>
            <strong>Superpowers</strong>
            <p>brainstorm / design / plan / verify</p>
          </div>
          <div className="cp-bridge-line is-left" />
          <div className="cp-bridge-line is-right" />
          <div className="cp-bridge-line is-down" />
          <div className="cp-pulse is-left" />
          <div className="cp-pulse is-right" />
          <div className="cp-output-rail card">
            {["open", "design", "build", "verify", "archive"].map((phase) => (
              <span key={phase}>{phase}</span>
            ))}
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 4) {
    return (
      <SceneShell
        code="RELATION / NOT REPLACEMENT"
        kicker="DESIGN BOUNDARY"
        title="不是替代，是调度"
      >
        <div className="cp-not-replace">
          <div className="cp-relation-card card is-muted">
            <span className="label-mono">does not replace</span>
            <strong>OpenSpec</strong>
          </div>
          <div className="cp-relation-card card is-main">
            <span className="label-mono">coordinates</span>
            <strong>Comet</strong>
            <p>把阶段、状态、Skill 触发点对齐。</p>
          </div>
          <div className="cp-relation-card card is-muted">
            <span className="label-mono">does not replace</span>
            <strong>Superpowers</strong>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 5) {
    return (
      <SceneShell
        code="CONTEXT / ONE THREAD"
        kicker="ONE CONTEXT"
        title="两套能力被接成连续上下文"
      >
        <div className="cp-context">
          {contextItems.map((group) => (
            <div className="cp-context-lane card" key={group.lane}>
              <span className="label-mono">{group.lane}</span>
              {group.items.map((item) => (
                <b key={item}>{item}</b>
              ))}
            </div>
          ))}
          <div className="cp-context-core">
            <span className="label-mono">Comet</span>
            <strong>shared state</strong>
            <p>让需求信息和执行信息在同一条上下文里继续传递。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell
      code="SKILL / CORRECT STAGE"
      kicker="TRIGGER RULE"
      title="正确阶段，触发正确 Skill"
    >
      <div className="cp-trigger-table card">
        {triggerItems.map((item) => (
          <div className="cp-trigger-row" key={item.phase}>
            <span className="label-mono">{item.phase}</span>
            <strong>{item.skill}</strong>
            <em>triggered here</em>
          </div>
        ))}
      </div>
      <div className="cp-final-note">
        <span className="label-mono">positioning</span>
        <p>Comet 的核心不是多一个命令，而是让阶段和能力稳定对应。</p>
      </div>
    </SceneShell>
  );
}

import type { ChapterStepProps } from "../../registry/types";
import "./RealProblem.css";

const lifecycle = ["active spec", "proposal", "tasks", "archive"];
const gaps = ["proposal", "tasks", "design gap", "agent judgment"];
const powers = ["brainstorming", "design doc", "plan", "TDD", "verify"];
const markdown = ["- [x] task done", "- [ ] state?", "phase: unknown"];
const restore = ["read docs", "scan code", "infer phase"];

function RailLabel({ children }: { children: string }) {
  return <span className="rp-rail-label label-mono">{children}</span>;
}

function BlueprintNode({
  label,
  active = false,
  muted = false,
}: {
  label: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={[
        "rp-node",
        active ? "is-active" : "",
        muted ? "is-muted" : "",
      ].join(" ")}
    >
      <span className="rp-node-dot" />
      <span>{label}</span>
    </div>
  );
}

function SceneShell({
  code,
  title,
  kicker,
  children,
}: {
  code: string;
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rp-scene scene-pad">
      <div className="rp-topline">
        <div>
          <div className="kicker">{kicker}</div>
          <h1>{title}</h1>
        </div>
        <div className="rp-code label-mono">{code}</div>
      </div>
      <hr className="rule" />
      {children}
    </div>
  );
}

export default function RealProblem({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <SceneShell
        code="COMET / SYSTEM MAP"
        kicker="AI CODING LONG TASKS"
        title="一条能恢复的开发轨道"
      >
        <div className="rp-track-scene">
          <div className="rp-track">
            {["open", "design", "build", "verify", "archive"].map((item) => (
              <BlueprintNode key={item} label={item} active />
            ))}
          </div>
          <div className="rp-orbit">
            <div className="rp-system-card card">
              <span className="label-mono">WHAT</span>
              <strong>OpenSpec</strong>
              <p>需求、提案、Spec 生命周期、归档</p>
            </div>
            <div className="rp-system-card card">
              <span className="label-mono">HOW</span>
              <strong>Superpowers</strong>
              <p>头脑风暴、技术设计、计划、执行</p>
            </div>
          </div>
          <div className="rp-hero-mark hero-num">01</div>
        </div>
      </SceneShell>
    );
  }

  if (step === 1) {
    return (
      <SceneShell
        code="OPENSPEC / LIFECYCLE"
        kicker="WHAT IS STABLE"
        title="Spec 生命周期已经清楚"
      >
        <div className="rp-lifecycle">
          <RailLabel>OpenSpec</RailLabel>
          <div className="rp-flow-line" />
          {lifecycle.map((item, idx) => (
            <div className="rp-life-item card" key={item}>
              <span className="rp-index label-mono">0{idx + 1}</span>
              <strong>{item}</strong>
              <small>
                {idx === 0
                  ? "当前需求"
                  : idx === 3
                    ? "完成归档"
                    : "变更材料"}
              </small>
            </div>
          ))}
        </div>
        <div className="rp-side-note">
          <span className="label-mono">ARTICLE CUE</span>
          <p>激活中的 Spec 与已归档 Spec，是 OpenSpec 的强项。</p>
        </div>
      </SceneShell>
    );
  }

  if (step === 2) {
    return (
      <SceneShell
        code="OPENSPEC / DESIGN GAP"
        kicker="WHERE IT GETS THIN"
        title="“要做什么”不等于“怎么做”"
      >
        <div className="rp-gap-grid">
          <div className="rp-stack-card card">
            <RailLabel>Artifacts</RailLabel>
            {gaps.slice(0, 2).map((item) => (
              <BlueprintNode key={item} label={item} active />
            ))}
          </div>
          <div className="rp-gap-arrow">
            <span />
            <b>?</b>
          </div>
          <div className="rp-stack-card card is-warning">
            <RailLabel>Engineering detail</RailLabel>
            {gaps.slice(2).map((item) => (
              <BlueprintNode key={item} label={item} active />
            ))}
          </div>
        </div>
        <p className="rp-bottom-caption">
          需求已经立住，但工程设计阶段仍然需要补方案判断。
        </p>
      </SceneShell>
    );
  }

  if (step === 3) {
    return (
      <SceneShell
        code="SUPERPOWERS / EXECUTION"
        kicker="HOW GETS DETAILED"
        title="Superpowers 把实现链路拉细"
      >
        <div className="rp-powers">
          {powers.map((item, idx) => (
            <div className="rp-power-step" key={item}>
              <div className="rp-power-num hero-num">{idx + 1}</div>
              <strong>{item}</strong>
              <div className="rp-power-bar" />
            </div>
          ))}
        </div>
        <div className="rp-equation card">
          <span className="label-mono">HOW</span>
          <p>澄清需求 → 深度设计 → 实现计划 → TDD 执行 → 验证收尾</p>
        </div>
      </SceneShell>
    );
  }

  if (step === 4) {
    return (
      <SceneShell
        code="MARKDOWN / STATE DRIFT"
        kicker="THE MISSING STATE"
        title="文档可读，不代表状态可靠"
      >
        <div className="rp-markdown-board card">
          <div className="rp-md-lines">
            {markdown.map((line, idx) => (
              <code key={line} className={idx === 2 ? "is-alert" : ""}>
                {line}
              </code>
            ))}
          </div>
          <div className="rp-md-meter">
            <span className="label-mono">agent confidence</span>
            <div className="rp-meter-shell">
              <div className="rp-meter-fill" />
            </div>
            <p>Markdown 里有痕迹，但缺少可验证的阶段状态。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell
      code="RESUME / TOKEN COST"
      kicker="BREAKPOINT RECOVERY"
      title="断点恢复不该重新探索现场"
    >
      <div className="rp-restore">
        <div className="rp-laptop card">
          <span className="label-mono">next session</span>
          {restore.map((item) => (
            <BlueprintNode key={item} label={item} active />
          ))}
        </div>
        <div className="rp-token-panel">
          <span className="label-mono">token spent on context recovery</span>
          <div className="rp-token-stack">
            {Array.from({ length: 12 }).map((_, idx) => (
              <span key={idx} style={{ animationDelay: `${idx * 70}ms` }} />
            ))}
          </div>
          <strong>重新理解现场</strong>
          <p>Comet 后续章节会把这个问题收束到状态机和阶段守护。</p>
        </div>
      </div>
    </SceneShell>
  );
}

import type { ChapterStepProps } from "../../registry/types";
import { HighlightedTitle } from "../../components/HighlightedTitle";
import "./RealProblem.css";

const lifecycle = [
  {
    title: "ACTIVE SPEC",
    desc: "当前需求",
    file: "specs/<capability>/spec.md",
    meta: "source of truth",
  },
  {
    title: "PROPOSAL",
    desc: "变更材料",
    file: "changes/<id>/proposal.md",
    meta: "why it changes",
  },
  {
    title: "TASKS",
    desc: "变更材料",
    file: "changes/<id>/tasks.md",
    meta: "what is done",
  },
  {
    title: "ARCHIVE",
    desc: "完成归档",
    file: "archive/<date>-<id>/",
    meta: "closed loop",
  },
];
const gaps = ["proposal", "tasks", "design gap", "agent judgment"];
const powers = ["brainstorming", "design doc", "plan", "TDD", "verify"];
const markdown = ["- [x] task done", "- [ ] state?", "phase: unknown"];
const restore = ["read docs", "scan code", "infer phase"];
const recoveryTrace = [
  { label: "tool", text: "read_file proposal.md / tasks.md", cost: "done" },
  { label: "tool", text: "search repo for changed files", cost: "done" },
  { label: "reason", text: "infer current workflow phase", cost: "uncertain" },
];

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
          <h1><HighlightedTitle text={title} /></h1>
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
        code="COMET / INTRO"
        kicker="OPENSPEC + SUPERPOWERS WORKFLOW"
        title="让 AI 长任务，真的能接着做"
      >
        <div className="rp-comet-intro">
          <div className="rp-comet-core">
            <span className="label-mono">core idea</span>
            <strong>COMET</strong>
            <p>把 OpenSpec 和 Superpowers 最好用的部分结合在一起。</p>
            <div className="rp-comet-rule">不修改原能力，只做组合调度。</div>
            <div className="rp-comet-repo label-mono">github.com/rpamis/comet</div>
          </div>
          <div className="rp-principle-map">
            <div className="rp-principle-card card is-what">
              <span className="label-mono">WHAT</span>
              <strong>OpenSpec</strong>
              <p>保留 Spec 管理、proposal、归档这套长处。</p>
            </div>
            <div className="rp-principle-card card is-how">
              <span className="label-mono">HOW</span>
              <strong>Superpowers</strong>
              <p>保留头脑风暴、深度设计、计划和验证。</p>
            </div>
            <div className="rp-combine-column">
              <div className="rp-principle-line is-top" />
              <div className="rp-principle-line is-bottom" />
              <div className="rp-combine-node card">
                <span className="label-mono">combine only</span>
                <strong>Comet</strong>
                <p>组合调度层</p>
              </div>
              <div className="rp-principle-line is-out" />
            </div>
            <div className="rp-state-rail card">
              {["open", "design", "build", "verify", "archive"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
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
          {lifecycle.map((item, idx) => (
            <div className="rp-life-item card" key={item.title}>
              <div className="rp-life-head">
                <span className="rp-index label-mono">0{idx + 1}</span>
                <b className="label-mono">{item.meta}</b>
              </div>
              <strong>{item.title}</strong>
              <small>{item.desc}</small>
              <code>{item.file}</code>
            </div>
          ))}
          <div className="rp-life-summary card">
            <span className="label-mono">ARTICLE CUE</span>
            <p>激活中的 Spec 与已归档 Spec，是 OpenSpec 的强项。</p>
          </div>
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
          <span className="label-mono">agent recovery trace</span>
          <div className="rp-recovery-console card">
            <div className="rp-console-head">
              <span className="label-mono">agent messages</span>
              <b>rebuilding context...</b>
            </div>
            {recoveryTrace.map((item) => (
              <div className="rp-recovery-row" key={item.label}>
                <span className="label-mono">{item.label}</span>
                <strong>{item.text}</strong>
                <em>{item.cost}</em>
              </div>
            ))}
            <div className="rp-scan-line" />
          </div>
          <div className="rp-context-meter">
            <span className="label-mono">token budget spent before coding</span>
            <div>
              <b />
            </div>
          </div>
          <div className="rp-recovery-note card">
            <span className="label-mono">cost</span>
            <p>编码还没开始，Agent 已经把上下文花在恢复现场上。</p>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

import type { ChapterStepProps } from "../../registry/types";
import { HighlightedTitle } from "../../components/HighlightedTitle";
import "./LightweightStateMachine.css";

const yamlCore = [
  ["workflow", "full"],
  ["phase", "build"],
  ["change", "add-comet-state"],
];

const yamlContext = [
  ["design_doc", "docs/superpowers/specs/...md"],
  ["plan", "docs/superpowers/plans/...md"],
  ["build_mode", "subagent-driven-development"],
  ["isolation", "branch"],
];

const yamlVerify = [
  ["verify_mode", "light"],
  ["verify_result", "pending"],
  ["verified_at", "null"],
  ["archived", "false"],
];

const guardChecks = ["files exist", "phase matches", "tasks complete", "then apply"];
const validationChecks = ["required fields", "enum values", "path refs", "unknown keys"];
const archiveSteps = ["verify entry", "sync specs", "move change", "archived: true"];

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
    <div className="sm-scene scene-pad">
      <div className="sm-topline">
        <div>
          <div className="kicker">{kicker}</div>
          <h1><HighlightedTitle text={title} /></h1>
        </div>
        <div className="sm-code label-mono">{code}</div>
      </div>
      <hr className="rule" />
      {children}
    </div>
  );
}

function YamlPanel({
  rows,
  label = ".comet.yaml",
}: {
  rows: string[][];
  label?: string;
}) {
  return (
    <div className="sm-yaml card">
      <span className="label-mono">{label}</span>
      {rows.map(([key, value]) => (
        <div className="sm-yaml-row" key={key}>
          <b>{key}:</b>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}

function ScriptCard({
  name,
  items,
  active = false,
}: {
  name: string;
  items: string[];
  active?: boolean;
}) {
  return (
    <div className={["sm-script-card", "card", active ? "is-active" : ""].join(" ")}>
      <span className="label-mono">script</span>
      <strong>{name}</strong>
      <div className="sm-script-items">
        {items.map((item) => (
          <em key={item}>{item}</em>
        ))}
      </div>
    </div>
  );
}

export default function LightweightStateMachine({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <SceneShell
        code="STATE / PER CHANGE"
        kicker="LIGHTWEIGHT STATE MACHINE"
        title="每个需求都有自己的执行状态"
      >
        <div className="sm-bound-state">
          <div className="sm-change-card card">
            <span className="label-mono">OpenSpec change</span>
            <strong>add-comet-state</strong>
            <p>需求生命周期仍归 OpenSpec 管理。</p>
          </div>
          <div className="sm-link-line" />
          <div className="sm-state-proof card">
            <img src="/img/Comet-statemachine.png" alt="Comet state machine screenshot" />
            <YamlPanel rows={yamlCore} label="state snapshot" />
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 1) {
    return (
      <SceneShell
        code="YAML / ROUTE"
        kicker="WORKFLOW + PHASE"
        title="workflow 和 phase 决定当前路线"
      >
        <div className="sm-yaml-focus">
          <YamlPanel rows={yamlCore.slice(0, 2)} />
          <div className="sm-phase-map">
            {["design", "build", "verify", "archive"].map((phase) => (
              <div className={phase === "build" ? "is-active" : ""} key={phase}>
                {phase}
              </div>
            ))}
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 2) {
    return (
      <SceneShell
        code="YAML / CONTEXT"
        kicker="RECOVERY CONTEXT"
        title="上下文字段让 Agent 接得上"
      >
        <div className="sm-yaml-wide">
          <YamlPanel rows={yamlContext} />
          <div className="sm-context-note card">
            <span className="label-mono">resume data</span>
            <strong>设计文档、计划、构建模式、隔离方式</strong>
            <p>这些字段让恢复现场不用重新扫一遍项目。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 3) {
    return (
      <SceneShell
        code="YAML / VERIFICATION"
        kicker="VERIFY + ARCHIVE"
        title="验证和归档状态也写进去"
      >
        <div className="sm-yaml-wide">
          <YamlPanel rows={yamlVerify} />
          <div className="sm-status-meter card">
            <span className="label-mono">state confidence</span>
            <strong>可恢复</strong>
            <p>字段不复杂，但足够让 Agent 判断下一步。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 4) {
    return (
      <SceneShell
        code="STATE / SCRIPTED UPDATE"
        kicker="NO HAND EDIT"
        title="状态不是随手改 YAML"
      >
        <div className="sm-scripted">
          <YamlPanel rows={[...yamlCore, ...yamlVerify.slice(1, 2)]} />
          <div className="sm-scripted-rule card">
            <span className="label-mono">rule</span>
            <strong>条件满足，才写回状态</strong>
            <p>阶段流转由脚本控制，减少“看起来完成”的漂移。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 5) {
    return (
      <SceneShell
        code="GUARD / APPLY"
        kicker="PHASE GATE"
        title="comet-guard.sh 是阶段闸门"
      >
        <div className="sm-script-layout">
          <ScriptCard name="comet-guard.sh" items={guardChecks} active />
          <div className="sm-hard-stop card">
            <span className="label-mono">when failed</span>
            <strong>[HARD STOP]</strong>
            <p>条件不满足就停下，只在 --apply 时更新状态。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 6) {
    return (
      <SceneShell
        code="STATE + VALIDATE"
        kicker="YAML SAFETY"
        title="统一接口和校验器防止状态漂移"
      >
        <div className="sm-two-scripts">
          <ScriptCard
            name="comet-state.sh"
            items={["read state", "set field", "check phase", "single interface"]}
            active
          />
          <ScriptCard name="comet-yaml-validate.sh" items={validationChecks} />
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell
      code="ARCHIVE / COMPLETE"
      kicker="ONE COMMAND ARCHIVE"
      title="comet-archive.sh 处理完整归档"
    >
      <div className="sm-archive">
        {archiveSteps.map((item, idx) => (
          <div className="sm-archive-step card" key={item}>
            <span className="label-mono">0{idx + 1}</span>
            <strong>{item}</strong>
          </div>
        ))}
        <div className="sm-dry-run">dry-run preview</div>
      </div>
    </SceneShell>
  );
}

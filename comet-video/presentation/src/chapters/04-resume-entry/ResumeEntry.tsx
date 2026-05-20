import { useRef } from "react";
import type { ChapterStepProps } from "../../registry/types";
import { HighlightedTitle } from "../../components/HighlightedTitle";
import { useSceneAnimations } from "../../hooks/useSceneAnimations";
import "./ResumeEntry.css";

const specs = [
  { name: "add-comet-state", phase: "build", active: true },
  { name: "fix-archive-sync", phase: "verify", active: false },
  { name: "docs-skill-copy", phase: "design", active: false },
];

const phases = ["open", "design", "build", "verify", "archive"];

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
    <div className="re-scene scene-pad">
      <div className="re-topline">
        <div>
          <div className="kicker">{kicker}</div>
          <h1><HighlightedTitle text={title} /></h1>
        </div>
        <div className="re-code label-mono">{code}</div>
      </div>
      <hr className="rule" />
      {children}
    </div>
  );
}

function TerminalLine({
  prompt,
  value,
  active = false,
}: {
  prompt: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className={["re-terminal-line", active ? "is-active" : ""].join(" ")}>
      <span>{prompt}</span>
      <b>{value}</b>
    </div>
  );
}

export default function ResumeEntry({ step }: ChapterStepProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  useSceneAnimations(sceneRef);

  if (step === 0) {
    return (
      <SceneShell
        code="ENTRY / STATUS DETECTION"
        kicker="MAIN COMMAND"
        title="/comet 不是简单菜单"
      >
        <div className="re-command-layout" ref={sceneRef}>
          <div className="re-terminal card" data-animate="slide-left">
            <TerminalLine prompt="$" value="/comet" active />
            <TerminalLine prompt=">" value="detect active spec state" />
            <TerminalLine prompt=">" value="read workflow phase" />
            <TerminalLine prompt=">" value="route next action" />
          </div>
          <div className="re-state-card card" data-animate="slide-right">
            <span className="label-mono">detector</span>
            <strong>当前 Spec 状态</strong>
            <p>入口先判断现场，再决定该进入哪个阶段。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 1) {
    return (
      <SceneShell
        code="RESUME / CONTINUE"
        kicker="LONG TASK RECOVERY"
        title="回来之后，直接继续"
      >
        <div className="re-resume" ref={sceneRef}>
          <div className="re-window card" data-animate="slide-left">
            <span className="label-mono">previous session</span>
            <strong>工具关闭</strong>
            <p>长任务做到一半，上下文中断。</p>
          </div>
          <div className="re-command-chip" data-animate="pop">/comet 继续</div>
          <div className="re-window card is-current" data-animate="slide-right">
            <span className="label-mono">new session</span>
            <strong>回到现场</strong>
            <p>从当前 Spec 状态恢复，而不是重新猜。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 2) {
    return (
      <SceneShell
        code="ACTIVE SPECS / CHOOSE ONE"
        kicker="MULTIPLE ACTIVE SPECS"
        title="多个活跃 Spec 时，先列出来"
      >
        <div className="re-spec-list card" ref={sceneRef}>
          {specs.map((spec, idx) => (
            <div
              className={["re-spec-row", spec.active ? "is-active" : ""].join(
                " ",
              )}
              key={spec.name}
              data-animate="flip-in"
            >
              <span className="label-mono">0{idx + 1}</span>
              <strong>{spec.name}</strong>
              <em>{spec.phase}</em>
            </div>
          ))}
        </div>
        <div className="re-choice-note" data-animate="blur-in">
          <span className="label-mono">selection</span>
          <p>先选具体 change，再进入阶段判断。</p>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell
      code="PHASE / ROUTE FORWARD"
      kicker="NO RE-SCAN"
      title="定位当前阶段，然后从正确位置继续"
    >
      <div className="re-phase-router" ref={sceneRef}>
        {phases.map((phase) => (
          <div
            className={["re-phase-node", phase === "build" ? "is-active" : ""].join(
              " ",
            )}
            key={phase}
            data-animate="pop"
          >
            <span />
            <strong>{phase}</strong>
          </div>
        ))}
      </div>
      <div className="re-resume-result card" data-animate="blur-in">
        <span className="label-mono">resolved state</span>
        <strong>phase: build</strong>
        <p>继续执行，而不是重新探索项目。</p>
      </div>
    </SceneShell>
  );
}

import { useRef } from "react";
import type { ChapterStepProps } from "../../registry/types";
import { HighlightedTitle } from "../../components/HighlightedTitle";
import { useSceneAnimations } from "../../hooks/useSceneAnimations";
import "./ReferenceValue.css";

const preferredParts = ["OpenSpec: Spec 管理", "Superpowers: TDD", "Deep Design", "归档能力"];
const hardProblems = [
  {
    title: "稳定触发嵌套 Skill",
    detail: "让 AI 调用真实 skill，而不是照着说明仿写。",
    tag: "nested skill",
  },
  {
    title: "避免"看起来触发"",
    detail: "用阶段文件和守护脚本确认当前能力真的运行过。",
    tag: "observable state",
  },
  {
    title: "多阶段自动流转",
    detail: "open → design → build → verify → archive 能接续推进。",
    tag: "workflow router",
  },
];
const implementationParts = [
  {
    title: "Skill 调度",
    detail: "根据阶段把请求分发给 OpenSpec 或 Superpowers。",
    file: ".codex/skills/comet/",
  },
  {
    title: "状态机",
    detail: "把当前 change、阶段和恢复信息落到可读状态。",
    file: ".comet.yaml",
  },
  {
    title: "阶段守护",
    detail: "进入关键阶段前先检查依赖产物是否齐全。",
    file: "guard scripts",
  },
  {
    title: "归档自动化",
    detail: "完成后同步 spec，收束 change，不留下半截流程。",
    file: "archive flow",
  },
];
const finalProofs = [
  {
    label: "nested skills",
    title: "真正触发",
    copy: "不是照着描述仿写文件，而是稳定触发 OpenSpec 与 Superpowers 的能力。",
  },
  {
    label: "multi-stage flow",
    title: "自动流转",
    copy: "五阶段流程自动推进，把必要选择留给用户，核心步骤交给工作流。",
  },
  {
    label: "state machine",
    title: "可靠状态",
    copy: ".comet.yaml、guard、archive 脚本一起保证断点恢复和归档正确。",
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
    <div className="rv-scene scene-pad">
      <div className="rv-topline">
        <div>
          <div className="kicker">{kicker}</div>
          <h1><HighlightedTitle text={title} /></h1>
        </div>
        <div className="rv-code label-mono">{code}</div>
      </div>
      <hr className="rule" />
      {children}
    </div>
  );
}

export default function ReferenceValue({ step }: ChapterStepProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  useSceneAnimations(sceneRef);

  if (step === 0) {
    return (
      <SceneShell code="REFERENCE / COMPOSITION" kicker="BEYOND TOOLING" title="Comet 也是组合 Skill 的参考">
        <div className="rv-parts" ref={sceneRef}>
          <div className="rv-skill-proof card" data-animate="scale-in">
            <img src="/img/Comet-skill.png" alt="Comet skill reference screenshot" />
          </div>
          <div className="rv-part-stack">
            {preferredParts.map((part) => (
              <div className="rv-part-card card" key={part} data-animate="flip-in">
                <strong>{part}</strong>
              </div>
            ))}
          </div>
          <div className="rv-parts-note card" data-animate="blur-in">
            <span className="label-mono">preference</span>
            <p>强工具很多，但真实使用常常只需要其中一部分能力。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 1) {
    return (
      <SceneShell code="NESTED SKILLS" kicker="STABLE TRIGGER" title="难点是稳定组合，而不是拼文档">
        <div className="rv-hard" ref={sceneRef}>
          {hardProblems.map((item, idx) => (
            <div className="rv-hard-card card" key={item.title} data-animate="flip-in">
              <span className="label-mono">0{idx + 1}</span>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
              <em>{item.tag}</em>
            </div>
          ))}
        </div>
      </SceneShell>
    );
  }

  if (step === 2) {
    return (
      <SceneShell code="FLOW / AUTOMATION" kicker="MULTI-STAGE" title="多阶段流转不能每步靠提醒">
        <div className="rv-auto" ref={sceneRef}>
          <div className="rv-auto-card card is-human" data-animate="slide-left">
            <span className="label-mono">manual</span>
            <strong>人工提醒</strong>
            <p>每一步都要人接线，流程容易断。</p>
          </div>
          <div className="rv-auto-card card is-system" data-animate="slide-right">
            <span className="label-mono">comet</span>
            <strong>状态机 + 守护脚本</strong>
            <p>必要选择留给用户，核心流程自动推进。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 3) {
    return (
      <SceneShell code="REAL IMPLEMENTATION" kicker="REFERENCE DESIGN" title="参考实现落在四个部件上">
        <div className="rv-impl" ref={sceneRef}>
          {implementationParts.map((part, idx) => (
            <div className="rv-impl-card card" key={part.title} data-animate="flip-in">
              <span className="label-mono">0{idx + 1}</span>
              <strong>{part.title}</strong>
              <p>{part.detail}</p>
              <em>{part.file}</em>
            </div>
          ))}
        </div>
      </SceneShell>
    );
  }

  if (step === 4) {
    return (
      <SceneShell code="SUMMARY" kicker="WHAT + HOW + STATE" title="一句话收束 Comet">
        <div className="rv-summary" ref={sceneRef}>
          <div className="rv-summary-card card" data-animate="slide-left">
            <span className="label-mono">OpenSpec</span>
            <strong>需求有生命周期</strong>
          </div>
          <div className="rv-summary-card card" data-animate="rise">
            <span className="label-mono">Superpowers</span>
            <strong>实现有方法论</strong>
          </div>
          <div className="rv-summary-card card is-main" data-animate="pop">
            <span className="label-mono">Comet</span>
            <strong>流程可恢复、可验证、可归档</strong>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 5) {
    return (
      <SceneShell code="TRY IT" kicker="INSTALL" title="试用 Comet，从两条命令开始">
        <div className="rv-try" ref={sceneRef}>
          <div className="rv-commands card" data-animate="slide-left">
            <div>
              <span>$</span>
              <b>npm install -g @rpamis/comet</b>
            </div>
            <div>
              <span>$</span>
              <b>comet init</b>
            </div>
          </div>
          <div className="rv-try-note card" data-animate="slide-right">
            <span className="label-mono">after init</span>
            <strong>/comet "你的想法"</strong>
            <p>从一个需求开始，Comet 会把它接到完整的 open / design / build / verify / archive 流程。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell code="FINAL CLAIM" kicker="REFERENCE IMPLEMENTATION" title="Comet 留下的是一套组合范式">
      <div className="rv-final" ref={sceneRef}>
        <div className="rv-final-word hero-num" data-animate="scale-in">COMET</div>
        <div className="rv-final-board">
          {finalProofs.map((item, idx) => (
            <div className="rv-final-card card" key={item.label} data-animate="flip-in">
              <span className="label-mono">0{idx + 1} / {item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
        <div className="rv-final-line" />
        <div className="rv-final-claim card" data-animate="blur-in">
          <span className="label-mono">what it proves</span>
          <strong>优秀 Skill 可以被重新组合成稳定工作流</strong>
        </div>
      </div>
    </SceneShell>
  );
}

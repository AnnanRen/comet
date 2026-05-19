import type { ChapterStepProps } from "../../registry/types";
import "./ReferenceValue.css";

const preferredParts = ["OpenSpec: Spec 管理", "Superpowers: TDD", "Deep Design", "归档能力"];
const hardProblems = ["稳定触发嵌套 Skill", "避免“看起来触发”", "多阶段自动流转"];
const implementationParts = ["Skill 调度", "状态机", "阶段守护", "归档自动化"];

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
          <h1>{title}</h1>
        </div>
        <div className="rv-code label-mono">{code}</div>
      </div>
      <hr className="rule" />
      {children}
    </div>
  );
}

export default function ReferenceValue({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <SceneShell code="REFERENCE / COMPOSITION" kicker="BEYOND TOOLING" title="Comet 也是组合 Skill 的参考">
        <div className="rv-parts">
          {preferredParts.map((part) => (
            <div className="rv-part-card card" key={part}>
              <strong>{part}</strong>
            </div>
          ))}
          <div className="rv-parts-note card">
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
        <div className="rv-hard">
          {hardProblems.map((item, idx) => (
            <div className="rv-hard-card card" key={item}>
              <span className="label-mono">0{idx + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </SceneShell>
    );
  }

  if (step === 2) {
    return (
      <SceneShell code="FLOW / AUTOMATION" kicker="MULTI-STAGE" title="多阶段流转不能每步靠提醒">
        <div className="rv-auto">
          <div className="rv-auto-card card is-human">
            <span className="label-mono">manual</span>
            <strong>人工提醒</strong>
            <p>每一步都要人接线，流程容易断。</p>
          </div>
          <div className="rv-auto-card card is-system">
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
        <div className="rv-impl">
          {implementationParts.map((part, idx) => (
            <div className="rv-impl-card card" key={part}>
              <span className="label-mono">0{idx + 1}</span>
              <strong>{part}</strong>
            </div>
          ))}
        </div>
      </SceneShell>
    );
  }

  if (step === 4) {
    return (
      <SceneShell code="SUMMARY" kicker="WHAT + HOW + STATE" title="一句话收束 Comet">
        <div className="rv-summary">
          <div className="rv-summary-card card">
            <span className="label-mono">OpenSpec</span>
            <strong>需求有生命周期</strong>
          </div>
          <div className="rv-summary-card card">
            <span className="label-mono">Superpowers</span>
            <strong>实现有方法论</strong>
          </div>
          <div className="rv-summary-card card is-main">
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
        <div className="rv-commands card">
          <div>
            <span>$</span>
            <b>npm install -g @rpamis/comet</b>
          </div>
          <div>
            <span>$</span>
            <b>comet init</b>
          </div>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell code="FINAL CLAIM" kicker="RESUME MEANS RESUME" title="长任务，不再从重新理解现场开始">
      <div className="rv-final">
        <div className="rv-final-word hero-num">/comet</div>
        <div className="rv-final-card card">
          <span className="label-mono">next step</span>
          <strong>根据当前 Spec 状态继续往下走</strong>
          <p>这就是 Comet 最想解决的问题。</p>
        </div>
      </div>
    </SceneShell>
  );
}

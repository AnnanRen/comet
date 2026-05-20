import type { ChapterStepProps } from "../../registry/types";
import { HighlightedTitle } from "../../components/HighlightedTitle";
import "./InstallAndRoutes.css";

const initSteps = [
  "检测平台配置",
  "选择安装范围",
  "选择 Skill 语言",
  "安装依赖技能",
  "创建工作目录",
];
const hotfixRoute = [
  { phase: "OPEN", title: "定位问题", detail: "跳过头脑风暴，直接记录 bug 与影响面。" },
  { phase: "BUILD", title: "最短修复", detail: "按现有代码路径改动，避免扩大范围。" },
  { phase: "VERIFY", title: "回归验证", detail: "跑测试、检查复现路径是否关闭。" },
  { phase: "ARCHIVE", title: "同步归档", detail: "修复完成后把状态收进 OpenSpec。" },
];
const hotfixSignals = [
  { label: "skip", text: "跳过完整 brainstorm / design" },
  { label: "keep", text: "保留 OpenSpec 状态和归档" },
  { label: "verify", text: "修复必须经过验证收尾" },
];
const repoUrl = "github.com/rpamis/comet";
const cometLogo = String.raw`   ██████╗ ██████╗ ███╗   ███╗███████╗████████╗
  ██╔════╝██╔═══██╗████╗ ████║██╔════╝╚══██╔══╝
  ██║     ██║   ██║██╔████╔██║█████╗     ██║
  ██║     ██║   ██║██║╚██╔╝██║██╔══╝     ██║
  ╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗   ██║
   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝   ╚═╝
            OpenSpec + Superpowers Workflow`;
const initOutput = String.raw`comet init

  Setting up Comet in D:\Project\comet

✔ Install scope: Project (current directory)
✔ Language for Comet skills: 中文
  Language: 中文
✔ Select platforms to set up: Codex

  Installing OpenSpec for: codex
  OpenSpec: installed

  Installing Superpowers for: codex
  Superpowers: installed
  Comet -> Codex: installed (12 files) -> .codex/skills/

  Comet setup complete! (scope: project)

  Installed:
    Codex -> .codex/skills/

  Working directories: docs/superpowers/specs/, docs/superpowers/plans/

  Get started:
    /comet "your idea"  — Start a new change with full workflow
    /comet-hotfix       — Quick bug fix (skip brainstorming)
    /comet-tweak        — Small change (skip brainstorming and plan)`;
const terminalLines = initOutput.split("\n");
const logoLines = cometLogo.split("\n");

function renderTypedLine(line: string, lineIndex: number, offset: number, logo = false) {
  return (
    <span
      className={logo ? "ir-terminal-line is-logo" : "ir-terminal-line"}
      key={`${lineIndex}-${line}`}
      style={{ "--i": offset + lineIndex } as React.CSSProperties}
    >
      {line}
    </span>
  );
}

const platforms = [
  "Claude Code",
  "Cursor",
  "Codex",
  "OpenCode",
  "Windsurf",
  "Cline",
  "RooCode",
  "Continue",
  "GitHub Copilot",
  "Gemini CLI",
  "Qwen Code",
  "Kiro",
  "Trae",
  "Antigravity",
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
    <div className="ir-scene scene-pad">
      <div className="ir-topline">
        <div>
          <div className="kicker">{kicker}</div>
          <h1><HighlightedTitle text={title} /></h1>
        </div>
        <div className="ir-code label-mono">{code}</div>
      </div>
      <hr className="rule" />
      {children}
    </div>
  );
}

function CommandLine({ command }: { command: string }) {
  return (
    <div className="ir-command-line">
      <span>$</span>
      <b>{command}</b>
    </div>
  );
}

function RepoPlate() {
  return (
    <div className="ir-repo-plate card">
      <span className="label-mono">project repo</span>
      <strong>{repoUrl}</strong>
    </div>
  );
}

function TypewriterTerminal() {
  return (
    <div className="ir-type-terminal card" aria-label="comet init output">
      <div className="ir-terminal-bar">
        <span />
        <span />
        <span />
        <b>PowerShell</b>
      </div>
      <div className="ir-terminal-body">
        <pre className="ir-terminal-command">
          {renderTypedLine(terminalLines[0] ?? "", 0, 0)}
        </pre>
        <pre className="ir-terminal-logo">
          {logoLines.map((line, idx) => renderTypedLine(line, idx, 2, true))}
        </pre>
        <pre className="ir-terminal-output">
          {terminalLines
            .slice(2)
            .map((line, idx) =>
              renderTypedLine(line, idx, logoLines.length + idx + 6),
            )}
        </pre>
      </div>
    </div>
  );
}

export default function InstallAndRoutes({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <SceneShell code="INSTALL / CLI" kicker="GET STARTED" title="安装只需要两条命令">
        <div className="ir-install">
          <div className="ir-terminal card">
            <CommandLine command="npm install -g @rpamis/comet" />
            <CommandLine command="cd your-project" />
            <CommandLine command="comet init" />
          </div>
          <div className="ir-install-side">
            <RepoPlate />
            <div className="ir-install-note card">
              <span className="label-mono">entry</span>
              <strong>全局安装，项目内初始化</strong>
              <p>安装路径尽量短，让用户先进入工作流本身。</p>
            </div>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 1) {
    return (
      <SceneShell code="INIT / OPTIONS" kicker="SETUP FLOW" title="初始化先确认平台、范围和语言">
        <div className="ir-init">
          <TypewriterTerminal />
          <div className="ir-init-list">
            {initSteps.slice(0, 3).map((item, idx) => (
              <div className="ir-init-row card" key={item}>
                <span className="label-mono">0{idx + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 2) {
    return (
      <SceneShell code="INIT / DEPLOY" kicker="SKILLS + WORKDIRS" title="依赖技能和工作目录自动就位">
        <div className="ir-deploy">
          <div className="ir-deploy-steps">
            {["OpenSpec skill", "Superpowers skill", "Comet skill", "specs/", "plans/"].map(
              (item, idx) => (
                <div className="ir-deploy-row" key={item}>
                  <span className="label-mono">0{idx + 1}</span>
                  <strong>{item}</strong>
                </div>
              ),
            )}
          </div>
          <div className="ir-image-card card is-small">
            <img src="/img/init.png" alt="Comet init output" />
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 3) {
    return (
      <SceneShell code="PLATFORMS / 28" kicker="DISTRIBUTION" title="28 个 AI Coding 平台统一分发">
        <div className="ir-platforms">
          <div className="ir-platform-grid">
            {platforms.map((platform) => (
              <span key={platform}>{platform}</span>
            ))}
          </div>
          <div className="ir-platform-note card">
            <span className="label-mono">comet init</span>
            <strong>自动放到正确目录</strong>
            <p>不用为每个平台手动处理 Skill 目录结构。</p>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (step === 4) {
    return (
      <SceneShell code="QUICK COMMANDS / 01" kicker="SHORTCUT COMMANDS" title="两个快速命令：先看 hotfix">
        <div className="ir-route">
          <div className="ir-shortcut-label card">
            <div className="ir-route-head">
              <span className="label-mono">quick command</span>
              <b>viewer · fix01</b>
            </div>
            <strong>/comet-hotfix</strong>
            <p>Bug 已明确时，省掉设计分叉，直接进入修复闭环。</p>
          </div>
          {hotfixRoute.map((item, idx) => (
            <div className="ir-route-node card" key={item.phase}>
              <div className="ir-route-head">
                <span className="label-mono">0{idx + 1}</span>
                <b>{item.title}</b>
              </div>
              <strong>{item.phase}</strong>
              <p>{item.detail}</p>
            </div>
          ))}
          <div className="ir-route-caption card">
            <span className="label-mono">best for</span>
            <p>目标明确的 bug 修复。</p>
          </div>
          <div className="ir-hotfix-signals">
            {hotfixSignals.map((item) => (
              <div className="ir-hotfix-signal card" key={item.label}>
                <span className="label-mono">{item.label}</span>
                <strong>{item.text}</strong>
              </div>
            ))}
          </div>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell code="QUICK COMMANDS / 02" kicker="SHORTCUT COMMANDS" title="第二个快速命令：tweak">
      <div className="ir-tweak">
        <div className="ir-tweak-list card">
          <span className="label-mono">/comet-tweak</span>
          {["文案调整", "配置调整", "文档修改", "Prompt 优化"].map((item) => (
            <strong key={item}>{item}</strong>
          ))}
        </div>
        <div className="ir-image-card card is-skill">
          <img src="/img/skill-comet.png" alt="Comet skill running" />
        </div>
      </div>
    </SceneShell>
  );
}

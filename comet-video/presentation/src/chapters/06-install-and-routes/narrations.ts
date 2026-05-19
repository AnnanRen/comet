export const narrations = [
  "安装方式很直接。先全局安装 npm 包。npm install -g @rpamis/comet。然后进入项目目录。执行 comet init。",
  "初始化时，Comet 会检测已有的 AI 平台配置。然后选择安装范围。可以安装到当前项目。也可以安装到用户全局目录。接着选择 Skill 语言。目前支持 English 和中文。",
  "接下来，它会安装 OpenSpec 技能。安装 Superpowers 技能。再把 Comet 技能部署到选定平台。最后创建 docs/superpowers/specs/。以及 docs/superpowers/plans/。",
  "平台支持也做了分发。README 里列了 28 个 AI Coding 平台。包括 Claude Code、Cursor、Codex、OpenCode、Windsurf。也包括 Cline、RooCode、Continue、GitHub Copilot、Gemini CLI。还有 Qwen Code、Kiro、Trae、Antigravity 这些平台。用户不需要为每个平台手动处理目录结构。comet init 会根据平台。把对应 Skill 放到正确位置。",
  "除了完整流程，Comet 还提供两个快速命令。第一个是 /comet-hotfix。如果只是 bug 修复，可以使用它。它会跳过完整头脑风暴。直接走 open、build、verify、archive。适合目标明确的修复任务。",
  "第二个快速命令是 /comet-tweak。如果只是小改动，比如文案调整、配置调整、文档修改，或者 Prompt 优化，可以用这条路径。它比完整流程更轻。",
];

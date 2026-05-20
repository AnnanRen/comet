export const narrations = [
  "安装入口尽量短。先 npm install -g @rpamis/comet。然后进入你的项目，执行 comet init。用户要先进入工作流本身，不应该卡在复杂安装里。",
  "初始化会先确认三件事：平台配置、安装范围、Skill 语言。你可以装到当前项目，也可以装到全局目录。语言也能选中文或 English。",
  "接下来依赖自动就位。OpenSpec skill、Superpowers skill、Comet skill 会部署到选定平台。specs 和 plans 这些工作目录，也会一起创建好。",
  "平台分发也交给 comet init。Claude Code、Cursor、Codex、OpenCode、Windsurf，还有其他 AI Coding 平台，都按自己的目录结构放好。你不用手动搬 Skill 文件。",
  "除了完整流程，还有 /comet-hotfix。Bug 已经明确时，它会跳过完整 brainstorm 和 design，直接走 open、build、verify、archive。适合目标很清楚的修复。",
  "第二个是 /comet-tweak。文案调整、配置调整、文档修改、Prompt 优化，都可以走这条轻路径。它比完整流程更轻，但仍然保留 Comet 的入口和状态管理。",
];

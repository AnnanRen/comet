Comet 是一个面向 AI Coding 长任务的开发工作流。

它不是一套全新的方法论。

更准确地说，它是把 OpenSpec 和 Superpowers 两套能力重新组合。

让需求从打开、设计、构建、验证，到归档，走在同一条轨道上。

---

先看 OpenSpec。

OpenSpec 本身很适合管理 Spec。

它区分激活中的 Spec。

也区分已经归档的 Spec。

需求生命周期这一块，它做得很清楚。

---

但单独使用 OpenSpec 时，会遇到一个问题。

它的 proposal 和 tasks，更偏向管理“要做什么”。

这些文件能把需求立起来。

但在真正进入工程设计时，细节不一定够。

Agent 往往还要补很多方案判断。

---

再看 Superpowers。

Superpowers 很适合做头脑风暴。

它会推动需求澄清。

然后进入深度设计。

再写实现计划，执行 TDD，最后验证和收尾。

这套流程对工程实现很有帮助。

---

但 Superpowers 的设计文档，通常不是一个状态系统。

任务完成之后，状态经常只体现在 Markdown 里。

比如某个 Task 被打了勾。

或者某段计划已经执行过。

这些信息人能看懂。

但下一轮 Agent 不一定能稳定接上。

---

最典型的场景，就是断点恢复。

一个需求做到一半。

AI Coding 工具被关掉。

下一次回来继续时，Agent 往往要重新读文档。

再重新扫描项目代码。

最后再推断现在走到了哪一步。

---

这里浪费的不是一点点时间。

更重要的是上下文会被重新消费。

Token 会花在恢复现场上。

而不是花在继续推进任务上。

Comet 要解决的，就是这个问题。

---

Comet 的定位很明确。

OpenSpec 管 WHAT。

也就是需求是什么。

提案怎么写。

Spec 怎么变更。

最后怎么归档。

---

Superpowers 管 HOW。

也就是怎么头脑风暴。

怎么做技术设计。

怎么写计划。

怎么执行。

怎么验证和收尾。

---

Comet 负责把两者串起来。

它不替代 OpenSpec。

也不替代 Superpowers。

它更像一个调度层。

在正确阶段触发正确的 Skill。

同时把需求上下文和执行上下文接起来。

让两边的信息沿着同一条状态线继续传递。

---

完整流程被拆成五个阶段。

第一步是 `comet-open`。

这一阶段主要调用 OpenSpec。

它负责打开 change。

产出 proposal、design、tasks。

也就是先把“这次要改什么”固定下来。

---

第二步是 `comet-design`。

这一阶段会读取 OpenSpec 的产出物。

然后交给 Superpowers 继续细化。

重点不是马上写代码。

而是做深度设计。

把边界、方案和风险先讲清楚。

---

第三步是 `comet-build`。

这一阶段进入实现。

它会接上 Superpowers 的计划能力。

需要 TDD 的地方就 TDD。

需要拆任务的地方就拆任务。

需要 subagent 的地方，也可以用 subagent 推进。

---

第四步是 `comet-verify`。

这一阶段负责验证和收尾。

OpenSpec 侧会检查需求是否满足。

Superpowers 侧会处理验证报告和完成流程。

两边的 Spec 关系也会在这里对齐。

---

第五步是 `comet-archive`。

这一阶段回到归档。

OpenSpec 的 delta spec 会同步回 main spec。

change 会被移动到归档目录。

Superpowers 侧的设计文档和计划文档，也会补上状态标注。

---

这样一次需求才算真正结束。

不是代码写完就停。

也不是 tasks 勾完就停。

而是需求、实现、验证、归档都回到一致状态。

这也是 Comet 五阶段流程的核心。

---

主入口是 `/comet`。

它不是一个简单菜单。

它会先检测当前 Spec 状态。

如果是一个长任务，中途关闭了 AI Coding 工具。

回来之后，可以直接输入 `/comet 继续`。

---

Comet 会读取当前活跃的 Spec。

如果同时存在多个活跃 Spec。

它会列出来让用户选择。

选定之后，它会判断这个 Spec 当前执行到哪个阶段。

然后从正确位置继续往下走。

---

这个设计对长任务很关键。

长任务最怕的不是某一步执行慢。

而是上下文断掉之后，Agent 重新猜现场。

Comet 让“继续”有明确状态。

恢复任务时，不需要重新探索一遍项目。

---

支撑这件事的，是 Comet 的轻量状态机。

每个 OpenSpec change 都会绑定一个 `.comet.yaml`。

也就是说，每个需求都有自己的执行状态。

状态不是全局混在一起。

而是跟着具体 change 走。

---

`.comet.yaml` 会记录 workflow。

比如当前是完整流程。

还是 hotfix。

还是 tweak。

它也会记录 phase。

也就是当前处在 design、build、verify，还是 archive。

---

它还会记录 design_doc。

记录 plan。

记录 build_mode。

比如是否使用 subagent-driven-development。

还会记录 isolation。

比如当前是否在分支里隔离执行。

---

验证状态也会写进去。

比如 verify_mode。

verify_result。

verified_at。

以及 archived。

这些字段不复杂，但足够让 Agent 恢复当前上下文。

---

关键点在于，这些状态不是让 Agent 随手改 YAML。

Comet 通过脚本更新状态。

只有当某个阶段真的满足退出条件。

脚本才会允许阶段流转。

然后再写回 `.comet.yaml`。

---

`comet-guard.sh` 负责阶段转换守护。

它会检查当前阶段是否可以退出。

如果条件不满足，就停下来。

只有带上 `--apply`。

它才会真正更新 `.comet.yaml`。

---

`comet-state.sh` 是统一状态接口。

Agent 读取或修改 Comet 状态，都通过这个脚本。

这样就不需要到处手写 YAML。

也能减少字段拼错、状态漂移的问题。

---

`comet-yaml-validate.sh` 负责模式校验。

它会检查必填字段。

检查枚举值。

检查引用路径是否存在。

也会发现未知字段和拼写错误字段。

---

`comet-archive.sh` 负责完整归档。

它会先验证入口状态。

然后同步 delta spec 到 main spec。

再移动归档目录。

最后更新 archived 状态。

需要预览时，也支持 dry-run。

---

所以 Comet 更像一个工程化胶水层。

复杂流程写在 Skill 里。

关键状态流转交给脚本。

Agent 不需要只靠阅读长 Prompt 来猜阶段。

它可以通过 Comet 内置命令读取当前状态。

---

安装方式很直接。

先全局安装 npm 包。

`npm install -g @rpamis/comet`

然后进入项目目录。

执行 `comet init`。

---

初始化时，Comet 会检测已有的 AI 平台配置。

然后选择安装范围。

可以安装到当前项目。

也可以安装到用户全局目录。

接着选择 Skill 语言。

目前支持 English 和中文。

---

接下来，它会安装 OpenSpec 技能。

安装 Superpowers 技能。

再把 Comet 技能部署到选定平台。

最后创建 `docs/superpowers/specs/`。

以及 `docs/superpowers/plans/`。

---

平台支持也做了分发。

README 里列了 28 个 AI Coding 平台。

包括 Claude Code、Cursor、Codex、OpenCode、Windsurf。

也包括 Cline、RooCode、Continue、GitHub Copilot、Gemini CLI。

---

还有 Qwen Code、Kiro、Trae、Antigravity 这些平台。

用户不需要为每个平台手动处理目录结构。

`comet init` 会根据平台。

把对应 Skill 放到正确位置。

---

Comet 还提供两条快捷路径。

如果只是 bug 修复，可以使用 `/comet-hotfix`。

它会跳过完整头脑风暴。

直接走 open、build、verify、archive。

适合目标明确的修复任务。

---

如果只是小改动，可以使用 `/comet-tweak`。

比如文案调整。

配置调整。

文档修改。

或者 Prompt 优化。

这条路径比完整流程更轻。

---

Comet 的另一个价值，是提供组合 Skill 的参考。

现在 Skill 市场里有很多强工具。

但实际使用时，用户经常只需要其中一部分能力。

比如用 OpenSpec 管 Spec。

再用 Superpowers 做 TDD 和深度设计。

---

这些能力理论上可以自由组合。

但真正难的是怎么稳定组合。

比如如何触发嵌套 Skill。

而不是让 Agent 只根据 Skill 描述写几个文件。

看起来像触发了，实际上并没有触发。

---

再比如，组合后的 Skill 如何多阶段自动流转。

如果每一步都靠人工提醒，流程就很容易断。

Comet 的五阶段流程，把必要选择留给用户。

核心流程则通过状态机和守护脚本推进。

---

因此，Comet 不只是一个命令行工具。

它也可以作为组合 Skill 的参考实现。

它展示了 Skill 调度。

状态机。

阶段守护。

以及归档自动化，如何在真实项目里落地。

---

总结一下。

OpenSpec 让需求有生命周期。

Superpowers 让实现有方法论。

Comet 把两者串成一条可恢复、可验证、可归档的流程。

---

如果要试用 Comet。

先安装 npm 包。

`npm install -g @rpamis/comet`

然后进入项目。

执行 `comet init`。

---

后续从 `/comet` 开始。

它会根据当前 Spec 状态继续往下走。

Comet 最想解决的事情很简单：

让 AI Coding 的长任务，不再每次都从“重新理解现场”开始。

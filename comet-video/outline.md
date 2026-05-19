# Video Outline

> **主题**：`blueprint`（蓝图）—— 深藏青底 + 青色强调色 + IBM Plex Mono，工程蓝图 / 工业图纸气质，适合系统架构与技术拆解。
> **总时长**：约 11 分 40 秒（口播约 2900 字 ÷ 250 字/分钟）
> **章节数**：7 章 / 46 步

---

## 1. real-problem — AI Coding 长任务的断点问题（6 steps · ~115s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- OpenSpec：管理激活 Spec 和已归档 Spec，需求生命周期清楚 —— 来源 article §为什么需要 Comet / §工作流
- OpenSpec 痛点：proposal 和 tasks 更偏“要做什么”，设计细腻度不如 Superpowers brainstorming —— 来源 article §为什么需要 Comet
- Superpowers 优势：头脑风暴、深度设计、TDD 执行 —— 来源 article §你能学到什么 / §技能
- Superpowers 痛点：Spec 文档通常没有状态化设计，只在 Markdown 里打勾 —— 来源 article §为什么需要 Comet
- 成本：断点恢复时 Agent 重新查看文档和项目代码，造成 Token 浪费 —— 来源 article §为什么需要 Comet

**开发计划**：

- step 1 (~8s) — 开场直接定位 Comet：面向 AI Coding 长任务的组合工作流。
- step 2 (~10s) — OpenSpec 能力板：active spec / archived spec / lifecycle。
- step 3 (~12s) — OpenSpec 痛点板：proposal、tasks、设计判断缺口。
- step 4 (~12s) — Superpowers 能力板：brainstorming、design doc、plan、TDD。
- step 5 (~12s) — Markdown 打勾和真实执行状态之间的落差。
- step 6 (~25s) — 断点恢复场景：Agent 重新读文档、扫代码、消耗 Token，并落到“Comet 要解决这个问题”。

口播节选：
> Comet 是一个面向 AI Coding 长任务的开发工作流。它是把 OpenSpec 和 Superpowers 两套能力重新组合，让需求走在同一条轨道上。

---

## 2. comet-positioning — Comet 的组合定位（7 steps · ~115s）

**信息池**：
- 定位：OpenSpec + Superpowers 双星开发工作流 —— 来源 article 顶部摘要
- OpenSpec 处理 WHAT：大纲、提案、spec 生命周期、归档 —— 来源 article 顶部摘要
- Superpowers 处理 HOW：技术设计、规划、执行、收尾 —— 来源 article 顶部摘要
- Comet：将二者串联为五阶段自动化流水线 —— 来源 article 顶部摘要 / §工作流
- 关键取舍：不是替代两者，而是调度层/胶水层 —— 来源 mark.txt §Comet是什么

**开发计划**：

- step 1 (~10s) — “不是新方法论，是稳定流程组合”的中心命题。
- step 2 (~9s) — WHAT 侧结构图：需求、提案、变更、归档。
- step 3 (~9s) — HOW 侧结构图：头脑风暴、设计、计划、执行、收尾。
- step 4 (~12s) — Comet 作为中间调度层，把两侧用连线接起来。
- step 5 (~10s) — “不是替代两者”的关系图，强调调度层而非重写轮子。
- step 6 (~10s) — WHAT / HOW 两条上下文汇入 Comet shared state，强调状态连续而非五阶段展开。
- step 7 (~10s) — “正确阶段触发正确 Skill”的蓝图式总结。

口播节选：
> Comet 不替代 OpenSpec，也不替代 Superpowers。它更像一个调度层，在正确阶段触发正确的 Skill。

---

## 3. five-stage-flow — 五阶段如何串起来（8 steps · ~155s）

**信息池**：
- 完整流程：`comet-open` → `comet-design` → `comet-build` → `comet-verify` → `comet-archive` —— 来源 mark.txt §Comet是什么 / article §工作流
- `comet-open`：调用 OpenSpec，产出 proposal、design、tasks —— 来源 article §五个阶段
- `comet-design`：总结 OpenSpec 产出物，交给 Superpowers 细化 —— 来源 mark.txt §Comet是什么
- `comet-build`：Superpowers TDD 开发 / 计划执行 —— 来源 mark.txt §Comet是什么 / article §五个阶段
- `comet-verify`：OpenSpec 验证、Superpowers 收尾、两边 Spec 双向关联 —— 来源 mark.txt §Comet是什么
- `comet-archive`：OpenSpec 归档、Superpowers Spec 归档 —— 来源 mark.txt §Comet是什么 / article §五个阶段

**开发计划**：

- step 1 (~8s) — 五阶段流程总览，像工程管线一样横向铺开。
- step 2 (~12s) — `comet-open` 放大：change 打开，proposal/design/tasks 就位。
- step 3 (~13s) — `comet-design` 放大：OpenSpec 产物进入 Superpowers 深度设计。
- step 4 (~13s) — `comet-build` 放大：plan、TDD、subagent-driven-development。
- step 5 (~12s) — `comet-verify` 放大：验证报告、收尾、双向关联。
- step 6 (~12s) — `comet-archive` 放大：delta spec 同步，归档完成。
- step 7 (~10s) — Superpowers 侧设计和计划文档被做状态标注。
- step 8 (~12s) — 整条管线收束成“需求真正结束”的闭环。

口播节选：
> 完整流程被拆成五个阶段。第一步是 comet-open。第二步是 comet-design。第三步是 comet-build。第四步是 comet-verify。第五步是 comet-archive。

---

## 4. resume-entry — `/comet` 主入口和长任务恢复（4 steps · ~80s）

**信息池**：
- 主入口：`/comet` 支持当前 Spec 状态检测 —— 来源 article §为什么需要 Comet / §技能
- 断点命令：`/comet 继续` —— 来源 article §为什么需要 Comet
- 多活跃 Spec：存在多个时列出选择 —— 来源 article §为什么需要 Comet
- 动态识别：判断当前 Spec 执行到哪个阶段并继续 —— 来源 article §为什么需要 Comet

**开发计划**：

- step 1 (~10s) — `/comet` 入口不是菜单，而是状态检测器。
- step 2 (~12s) — `/comet 继续` 场景：长任务中断后重新进入。
- step 3 (~10s) — 多个 active spec 被列成可选队列。
- step 4 (~12s) — 系统定位当前 phase，沿正确阶段继续。

口播节选：
> 长任务最怕的不是某一步执行慢，而是上下文断掉之后，Agent 重新猜现场。Comet 让“继续”有明确状态。

---

## 5. lightweight-state-machine — `.comet.yaml` 和阶段守护（8 steps · ~165s）

**信息池**：
- 每个 OpenSpec change 绑定一个 `.comet.yaml` —— 来源 mark.txt §Comet轻量状态机机制
- 示例字段：workflow、phase、design_doc、plan、build_mode、isolation、verify_mode、verify_result、verified_at、archived —— 来源 article §状态管理
- 状态更新：所有状态和运行阶段都采用脚本更新 —— 来源 article §状态管理
- 阶段退出：检验阶段是否真实完成，达到条件之后才更新状态 —— 来源 article §状态管理
- `comet-guard.sh`：阶段转换守护，`--apply` 自动更新 `.comet.yaml` —— 来源 article §守护与自动化脚本
- `comet-state.sh`：统一状态管理，agent 的专属 YAML 接口 —— 来源 article §守护与自动化脚本
- `comet-yaml-validate.sh`：校验结构和字段值 —— 来源 article §守护与自动化脚本
- `comet-archive.sh`：一键归档，验证状态、同步 specs、移至归档、更新状态 —— 来源 article §守护与自动化脚本

**开发计划**：

- step 1 (~12s) — `.comet.yaml` 与某个 OpenSpec change 绑定，显示“一需求一状态”。
- step 2 (~12s) — workflow / phase 字段高亮，说明当前路线和阶段。
- step 3 (~12s) — design_doc / plan / build_mode / isolation 字段高亮，说明恢复上下文。
- step 4 (~12s) — verify_result / archived 等字段高亮，说明完成状态。
- step 5 (~13s) — `comet-guard.sh` 作为闸门，只有条件满足才允许流转。
- step 6 (~12s) — `comet-state.sh` 与 `comet-yaml-validate.sh` 保证读写和校验一致。
- step 7 (~12s) — 失败场景显示 `[HARD STOP]` 和下一步修复建议。
- step 8 (~13s) — `comet-archive.sh` 走完整归档链路，并显示 dry-run 分支。

口播节选：
> 关键点在于，这些状态不是让 Agent 随手改 YAML。Comet 通过脚本更新状态。

---

## 6. install-and-routes — 安装、平台分发和快捷路径（6 steps · ~115s）

**信息池**：
- 安装命令：`npm install -g @rpamis/comet` —— 来源 article §安装
- 初始化命令：`comet init` —— 来源 article §快速开始
- 初始化动作：检测平台、选择范围、选择语言、安装 OpenSpec/Superpowers、部署 Comet、创建 specs/plans —— 来源 article §快速开始
- 支持平台：28 个 AI 编码平台 —— 来源 article §支持平台
- 快捷路径：`/comet-hotfix` 跳过完整头脑风暴，`/comet-tweak` 用于小调整 —— 来源 article §技能 / §工作流

**开发计划**：

- step 1 (~10s) — 终端输入 `npm install -g @rpamis/comet` 和 `comet init`。
- step 2 (~12s) — init 流程列表：平台、范围、语言、依赖 Skill、工作目录。
- step 3 (~12s) — 28 个平台矩阵，突出 Codex / Claude Code / Cursor / Trae 等。
- step 4 (~10s) — 不同平台的 Skill 目录被自动分发到正确位置。
- step 5 (~12s) — “两个快速命令”作为衔接，展开 `/comet-hotfix`：open → build → verify → archive。
- step 6 (~10s) — 第二个快速命令 `/comet-tweak`：文案、配置、文档、Prompt 优化等轻量改动。

口播节选：
> 初始化时，Comet 会检测已有的 AI 平台配置。然后选择安装范围，再选择 Skill 语言。

---

## 7. reference-value — 这个项目能作为组合 Skill 参考（7 steps · ~140s）

**信息池**：
- Skill 市场有很多优秀项目，但存在偏好性问题，用户可能只喜欢部分功能 —— 来源 article §你能学到什么
- 组合能力：OpenSpec 的 Spec 管理 + Superpowers 的 TDD 驱动编码 —— 来源 article §你能学到什么
- 嵌套 Skill：稳定触发能力，而不是只根据 Skill 描述写文件 —— 来源 article §你能学到什么
- 多阶段流转：除必要用户选择外，核心流程可自动触发；状态机保障状态扭转 —— 来源 article §你能学到什么

**开发计划**：

- step 1 (~18s) — 展示“高 star Skill 的部分能力组合”这一参考价值。
- step 2 (~18s) — 稳定触发嵌套 Skill，不只是根据描述写文件。
- step 3 (~18s) — 多阶段自动流转：必要选择留给用户，核心流程由状态机和守护脚本推进。
- step 4 (~18s) — Comet 作为真实项目参考：Skill 调度、状态机、阶段守护、归档自动化。
- step 5 (~18s) — 总结：OpenSpec 管生命周期，Superpowers 管方法论，Comet 管可恢复流程。
- step 6 (~12s) — 试用 CTA：`npm install -g @rpamis/comet` + `comet init`。
- step 7 (~12s) — 最终主张：AI Coding 长任务不再从“重新理解现场”开始。

口播节选：
> Comet 不只是一个命令行工具。它也可以作为组合 Skill 的参考实现。

---

## 素材清单

### 1. real-problem
- ✓ README 原文（`comet-video/article.md`）
- ⚠️ 可选：真实长任务项目截图或终端恢复现场截图（待提供）

### 2. comet-positioning
- ✓ OpenSpec / Superpowers / Comet 文本标识，可用排版生成
- ⚠️ 可选：OpenSpec 与 Superpowers 项目 logo 或截图（待提供）

### 3. five-stage-flow
- ✓ 五阶段命令和产物信息来自 README / mark.txt
- ⚠️ 可选：真实 `openspec/changes` 目录截图（待提供）

### 4. resume-entry
- ✓ `/comet` 和 `/comet 继续` 文本来自 README / mark.txt

### 5. lightweight-state-machine
- ✓ `.comet.yaml` 字段来自 README 示例
- ⚠️ 可选：真实 `.comet.yaml`、`.openspec.yaml` 截图（待提供）

### 6. install-and-routes
- ✓ README 已提供 `img/select-platform.png`、`img/init.png`、`img/skill-comet.png`
- ⚠️ 需要确认这些图片是否可在介绍视频里直接使用

### 7. reference-value
- ✓ “你能学到什么”段落来自 README

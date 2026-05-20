export const narrations = [
  "完整流程拆成五个阶段。open、design、build、verify、archive。每一段都有自己的命令和产物，不靠 Agent 临场猜下一步。",
  "第一段是 comet-open。这里由 OpenSpec 接手，打开 change，生成 proposal、design 和 tasks。先把这次到底要改什么固定住。",
  "第二段是 comet-design。OpenSpec 的产物会交给 Superpowers 继续细化。重点不是马上写代码，而是先把边界、方案和风险讲清楚。",
  "第三段是 comet-build。这里进入工程实现。计划、TDD、subagent，都在这一段接上。能按计划推进，就不要临时乱跑。",
  "第四段是 comet-verify。这里两边一起收口。测试要过，报告要有，需求和实现也要对齐。不是跑完代码就算验证结束。",
  "第五段是 comet-archive。变更同步回 main spec，change 进入 archive，相关文档也补上状态。到这里，知识库才不会留下半截流程。",
  "所以需求不是代码写完就结束。tasks 勾完也不够。真正结束，是实现、文档和状态都对齐。",
  "初始化之后，项目会被分成三层。平台 Skill 放一层，OpenSpec 的 change 和状态放一层，Superpowers 的设计文档和计划放一层。WHAT、HOW 和工作流状态，各回各的位置。",
];

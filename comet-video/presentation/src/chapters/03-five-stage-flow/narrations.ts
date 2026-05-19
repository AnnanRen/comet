export const narrations = [
  "完整流程被拆成五个阶段。",
  "第一步是 comet-open。这一阶段主要调用 OpenSpec。它负责打开 change。产出 proposal、design、tasks。也就是先把“这次要改什么”固定下来。",
  "第二步是 comet-design。这一阶段会读取 OpenSpec 的产出物。然后交给 Superpowers 继续细化。重点不是马上写代码。而是做深度设计。把边界、方案和风险先讲清楚。",
  "第三步是 comet-build。这一阶段进入实现。它会接上 Superpowers 的计划能力。需要 TDD 的地方就 TDD。需要拆任务的地方就拆任务。需要 subagent 的地方，也可以用 subagent 推进。",
  "第四步是 comet-verify。这一阶段负责验证和收尾。OpenSpec 侧会检查需求是否满足。Superpowers 侧会处理验证报告和完成流程。两边的 Spec 关系也会在这里对齐。",
  "第五步是 comet-archive。这一阶段回到归档。OpenSpec 的 delta spec 会同步回 main spec。change 会被移动到归档目录。Superpowers 侧的设计文档和计划文档，也会补上状态标注。",
  "这样一次需求才算真正结束。不是代码写完就停。也不是 tasks 勾完就停。",
  "而是需求、实现、验证、归档都回到一致状态。这也是 Comet 五阶段流程的核心。",
];

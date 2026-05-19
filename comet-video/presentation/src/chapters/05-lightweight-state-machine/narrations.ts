export const narrations = [
  "支撑这件事的，是 Comet 的轻量状态机。每个 OpenSpec change 都会绑定一个 .comet.yaml。也就是说，每个需求都有自己的执行状态。状态不是全局混在一起。而是跟着具体 change 走。",
  ".comet.yaml 会记录 workflow。比如当前是完整流程。还是 hotfix。还是 tweak。它也会记录 phase。也就是当前处在 design、build、verify，还是 archive。",
  "它还会记录 design_doc。记录 plan。记录 build_mode。比如是否使用 subagent-driven-development。还会记录 isolation。比如当前是否在分支里隔离执行。",
  "验证状态也会写进去。比如 verify_mode。verify_result。verified_at。以及 archived。这些字段不复杂，但足够让 Agent 恢复当前上下文。",
  "关键点在于，这些状态不是让 Agent 随手改 YAML。Comet 通过脚本更新状态。只有当某个阶段真的满足退出条件。脚本才会允许阶段流转。然后再写回 .comet.yaml。",
  "comet-guard.sh 负责阶段转换守护。它会检查当前阶段是否可以退出。如果条件不满足，就停下来。只有带上 --apply。它才会真正更新 .comet.yaml。",
  "comet-state.sh 是统一状态接口。Agent 读取或修改 Comet 状态，都通过这个脚本。这样就不需要到处手写 YAML。也能减少字段拼错、状态漂移的问题。comet-yaml-validate.sh 负责模式校验。它会检查必填字段。检查枚举值。检查引用路径是否存在。也会发现未知字段和拼写错误字段。",
  "comet-archive.sh 负责完整归档。它会先验证入口状态。然后同步 delta spec 到 main spec。再移动归档目录。最后更新 archived 状态。需要预览时，也支持 dry-run。",
];

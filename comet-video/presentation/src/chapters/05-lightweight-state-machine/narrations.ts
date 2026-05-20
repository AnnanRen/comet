export const narrations = [
  "支撑恢复能力的，是这个轻量状态机。每个 OpenSpec change 都绑定自己的状态。也就是说，状态不是全局混在一起，而是跟着具体需求走。",
  ".comet.yaml 里最关键的是 workflow 和 phase。workflow 决定走完整流程、hotfix，还是 tweak。phase 决定现在卡在 design、build、verify，还是 archive。",
  "再往下，是恢复上下文。design doc 在哪，plan 在哪，build mode 是什么，当前是否在隔离分支里。这些字段让 Agent 回来后能接上，而不是重新扫项目。",
  "验证和归档状态也写进去。verify result、verified at、archived，这些字段不复杂，但足够判断下一步是不是可以继续。",
  "关键是，状态不能靠手改 YAML。Comet 要通过脚本写回状态。只有条件真的满足，阶段才允许流转。这样能减少“看起来完成”的状态漂移。",
  "comet-guard.sh 就是阶段闸门。它检查文件是否存在、phase 是否匹配、tasks 是否完成。条件不满足就 HARD STOP。只有带上 --apply，才真正更新状态。",
  "comet-state.sh 提供统一读写接口。comet-yaml-validate.sh 负责校验必填字段、枚举值、路径引用和未知字段。一个负责改，一个负责查，状态就不容易漂。",
  "最后是 comet-archive.sh。它会验证入口状态，同步 specs，移动 change，再把 archived 写成 true。需要先看效果，也可以走 dry-run preview。",
];

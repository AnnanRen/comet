import type { ReactNode } from "react";

const highlightTerms = [
  "comet-archive.sh",
  "comet-guard.sh",
  "AI Coding",
  "AI 长任务",
  "OpenSpec",
  "Superpowers",
  "workflow",
  "archive",
  "verify",
  "design",
  "build",
  "hotfix",
  "open",
  "tweak",
  "Comet",
  "Spec",
  "Skill",
  "YAML",
  "生命周期",
  "怎么做",
  "实现链路",
  "状态可靠",
  "断点恢复",
  "稳定组合",
  "重写",
  "需求世界",
  "执行方法",
  "两条线",
  "调度",
  "连续上下文",
  "正确",
  "五个阶段",
  "代码写完",
  "三层结构",
  "直接继续",
  "活跃",
  "执行状态",
  "phase",
  "上下文",
  "验证",
  "归档",
  "阶段闸门",
  "状态漂移",
  "两条命令",
  "初始化",
  "平台",
  "范围",
  "语言",
  "自动就位",
  "统一分发",
  "组合",
  "拼文档",
  "多阶段流转",
  "参考实现",
  "四个部件",
  "组合范式",
].sort((a, b) => b.length - a.length);

export function HighlightedTitle({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const term = highlightTerms.find((item) => text.startsWith(item, cursor));

    if (!term) {
      parts.push(text[cursor]);
      cursor += 1;
      continue;
    }

    parts.push(<mark key={`${term}-${cursor}`}>{term}</mark>);
    cursor += term.length;
  }

  return <>{parts}</>;
}

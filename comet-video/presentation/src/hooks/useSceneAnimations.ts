import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type AnimateType =
  | "rise"
  | "pop"
  | "slide-left"
  | "slide-right"
  | "blur-in"
  | "flip-in"
  | "scale-in"
  | "reveal";

interface SceneAnimConfig {
  stagger?: number;
  defaultEase?: string;
  defaultDuration?: number;
}

const PRESETS: Record<
  AnimateType,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  rise: {
    from: { opacity: 0, y: 50, scale: 0.97 },
    to: { opacity: 1, y: 0, scale: 1 },
  },
  pop: {
    from: { opacity: 0, scale: 0.7, rotation: -1.5 },
    to: { opacity: 1, scale: 1, rotation: 0 },
  },
  "slide-left": {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  "slide-right": {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },
  "blur-in": {
    from: { opacity: 0, filter: "blur(12px)" },
    to: { opacity: 1, filter: "blur(0px)" },
  },
  "flip-in": {
    from: { opacity: 0, rotateX: 18, scale: 0.92 },
    to: { opacity: 1, rotateX: 0, scale: 1 },
  },
  "scale-in": {
    from: { opacity: 0, scale: 0.88 },
    to: { opacity: 1, scale: 1 },
  },
  reveal: {
    from: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    to: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
  },
};

export function useSceneAnimations(
  ref: React.RefObject<HTMLElement | null>,
  config: SceneAnimConfig = {}
) {
  const { stagger = 0.07, defaultEase = "back.out(1.4)", defaultDuration = 0.7 } = config;
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-animate]");
    if (targets.length === 0) return;

    tlRef.current?.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    const groups = new Map<AnimateType, HTMLElement[]>();
    targets.forEach((t) => {
      const type = (t.dataset.animate ?? "rise") as AnimateType;
      if (!groups.has(type)) groups.set(type, []);
      groups.get(type)!.push(t);
    });

    let globalOffset = 0;
    groups.forEach((elems, type) => {
      const preset = PRESETS[type] ?? PRESETS.rise;
      const localStagger = type === "blur-in" ? 0.12 : stagger;

      tl.fromTo(
        elems,
        { ...preset.from },
        {
          ...preset.to,
          duration: defaultDuration,
          ease: defaultEase,
          stagger: localStagger,
        },
        globalOffset
      );

      globalOffset += 0.08;
    });

    return () => {
      tl.kill();
    };
  }, [ref, stagger, defaultEase, defaultDuration]);
}

import { useCallback, useRef } from "react";
import gsap from "gsap";

export function useStepTransition() {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const transition = useCallback(
    (el: HTMLElement, onMidpoint: () => void) => {
      tlRef.current?.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          tlRef.current = null;
        },
      });
      tlRef.current = tl;

      tl.to(el, {
        opacity: 0,
        filter: "blur(6px)",
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        onComplete: onMidpoint,
      }).fromTo(
        el,
        { opacity: 0, filter: "blur(6px)", scale: 0.98 },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        }
      );
    },
    []
  );

  const entranceOnly = useCallback((el: HTMLElement) => {
    gsap.fromTo(
      el,
      { opacity: 0, filter: "blur(6px)", scale: 0.98 },
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      }
    );
  }, []);

  return { transition, entranceOnly };
}

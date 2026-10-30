"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rawScale = useMotionValue(1);
  const scale = useSpring(rawScale, { stiffness: 240, damping: 24, mass: 0.4 });
  const springX = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (reduceMotion) return;
    const finePointer = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    if (!finePointer.matches) return;

    // The cursor is always mounted; CSS only reveals it on fine pointers.
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      const grow = target?.closest('[data-cursor="grow"], a, button');
      rawScale.set(grow ? 2.35 : 1);
    };

    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [rawScale, reduceMotion, x, y]);

  return (
    <motion.div
      className="cursor"
      style={{ x: springX, y: springY, scale }}
      aria-hidden="true"
    >
      <span className="cursor__ring" />
    </motion.div>
  );
}

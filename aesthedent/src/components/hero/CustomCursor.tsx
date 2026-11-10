"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * A decorative ring that follows the pointer on the home hero.
 *
 * It renders through a portal on <body>: the hero animates with transforms and
 * clips its overflow, which turns a `position: fixed` child into a child of the
 * hero box — the ring was being cropped there and, because the native cursor
 * used to be hidden globally, the page appeared to have no cursor at all. The
 * native cursor is now always visible; this is only an accent on top of it.
 */
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

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      // pointermove can target window/document, which have no closest().
      const target = event.target;
      const grow =
        target instanceof Element
          ? target.closest('[data-cursor="grow"], a, button')
          : null;
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

  // Loaded with ssr: false, so a portal target always exists on the client.
  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="cursor"
      style={{ x: springX, y: springY, scale }}
      aria-hidden="true"
    >
      <span className="cursor__ring" />
    </motion.div>,
    document.body
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={
        reduceMotion
          ? { duration: 0.25, delay }
          : { duration: 0.8, delay, ease: EASE }
      }
    >
      {children}
    </motion.div>
  );
}

export function RevealListItem({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={
        reduceMotion
          ? { duration: 0.25, delay }
          : { duration: 0.75, delay, ease: EASE }
      }
    >
      {children}
    </motion.li>
  );
}

export function MaskedLine({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const maskRef = useRef<HTMLSpanElement>(null);
  // Observe the mask itself: the inner line starts translated outside its
  // overflow-hidden parent, so observing it would never intersect.
  const isInView = useInView(maskRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <span ref={maskRef} className={`masked-line${className ? ` ${className}` : ""}`}>
      <motion.span
        className="masked-line__inner"
        initial={
          reduceMotion ? { opacity: 0, y: "0%" } : { y: "112%", opacity: 1 }
        }
        animate={
          reduceMotion
            ? { opacity: isInView ? 1 : 0, y: "0%" }
            : { y: isInView ? "0%" : "112%", opacity: 1 }
        }
        transition={
          reduceMotion
            ? { duration: 0.25, delay }
            : { duration: 0.9, delay, ease: EASE }
        }
      >
        {children}
      </motion.span>
    </span>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Headline() {
  const reduceMotion = useReducedMotion();

  const lineTransition = (delay: number) =>
    reduceMotion
      ? { duration: 0.25, delay: 0 }
      : { duration: 0.85, delay, ease: EASE };

  return (
    <h1 id="hero-title" className="hero__headline js-reveal">
      <span className="mask-line">
        <motion.span
          className="mask-line__inner hero__kicker"
          initial={reduceMotion ? { opacity: 0 } : { y: "115%" }}
          animate={{ y: 0, opacity: 1 }}
          transition={lineTransition(0.5)}
        >
          Teeth. Skin. Hair. Brows.
        </motion.span>
      </span>
      <span className="mask-line">
        <motion.span
          className="mask-line__inner hero__title"
          initial={reduceMotion ? { opacity: 0 } : { y: "112%" }}
          animate={{ y: 0, opacity: 1 }}
          transition={lineTransition(0.62)}
        >
          One clinic.
        </motion.span>
      </span>
      <span className="mask-line hero__subtitle-mask">
        <motion.span
          className="mask-line__inner hero__subtitle"
          initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
          animate={{ y: 0, opacity: 1 }}
          transition={lineTransition(0.72)}
        >
          Dental, skin, hair and PMU care in Old Town, Bhubaneswar.
        </motion.span>
      </span>
    </h1>
  );
}

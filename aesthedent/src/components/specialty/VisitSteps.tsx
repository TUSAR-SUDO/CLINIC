"use client";

import { motion, useReducedMotion } from "motion/react";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import type { SpecialtyContent } from "@/lib/specialty";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function VisitSteps({ data }: { data: SpecialtyContent }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={`${data.id}-visit`}
      className={`spec-steps spec-steps--${data.id}`}
      aria-labelledby={`${data.id}-steps-title`}
    >
      <div className="spec-steps__inner">
        <header className="spec-steps__head">
          <Reveal>
            <p className="spec-kicker">{data.stepsKicker}</p>
          </Reveal>
          <h2 className="spec-steps__title" id={`${data.id}-steps-title`}>
            <MaskedLine>{data.stepsTitleTop}</MaskedLine>
            <MaskedLine delay={0.08}>
              <em>{data.stepsTitleEm}</em>
            </MaskedLine>
          </h2>
        </header>

        <ol className="spec-steps__list">
          {data.steps.map((step, index) => (
            <motion.li
              key={step.number}
              className="spec-step"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: reduceMotion ? 0.22 : 0.75,
                delay: reduceMotion ? 0 : index * 0.09,
                ease: EASE,
              }}
            >
              <span className="spec-step__number">{step.number}</span>
              <div className="spec-step__body">
                <h3 className={`spec-step__title${step.italic ? " is-italic" : ""}`}>
                  {step.title}
                </h3>
                <p className="spec-step__copy">{step.description}</p>
              </div>
              <motion.span
                className="spec-step__rule"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduceMotion ? 0.2 : 0.9,
                  delay: reduceMotion ? 0 : 0.15 + index * 0.09,
                  ease: EASE,
                }}
                aria-hidden="true"
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

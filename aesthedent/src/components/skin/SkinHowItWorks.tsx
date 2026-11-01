"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { SKIN_STEPS } from "@/lib/skin";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SkinHowItWorks() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section className="skin-how" aria-labelledby="skin-how-title" ref={sectionRef}>
      <div className="skin-how__inner">
        <motion.div
          className="skin-how__media"
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
          }
          whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={
            reduceMotion
              ? { duration: 0.3 }
              : { duration: 1.05, ease: EASE }
          }
        >
          <motion.div className="skin-how__media-inner" style={{ y: reduceMotion ? 0 : imageY }}>
            <Image
              src="/images/skin/how-visit.png"
              alt="Close-up of a serum dropper over a soft blush surface"
              fill
              sizes="(max-width: 1100px) 100vw, 42vw"
              className="skin-how__img"
              quality={86}
            />
          </motion.div>
          <span className="skin-how__media-tint" aria-hidden="true" />
        </motion.div>

        <div className="skin-how__content">
          <Reveal>
            <h2 className="skin-how__kicker" id="skin-how-title">
              HOW A VISIT WORKS
            </h2>
          </Reveal>

          <div className="skin-how__steps">
            {SKIN_STEPS.map((step, index) => (
              <Reveal
                key={step.number}
                className={`skin-step${index > 0 ? " skin-step--divided" : ""}`}
                delay={0.08 + index * 0.12}
              >
                <div className="skin-step__head">
                  <span className="skin-step__num">{step.number}</span>
                  <motion.span
                    className="skin-step__rule"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 + index * 0.12, ease: EASE }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className={`skin-step__title${step.italic ? " is-italic" : ""}`}>
                  {step.title}
                </h3>
                <p className="skin-step__desc">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

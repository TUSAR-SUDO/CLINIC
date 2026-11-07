"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  {
    num: "01",
    title: "Consultation",
    italic: true,
    description: "Talk through your smile, comfort and concerns.",
  },
  {
    num: "02",
    title: "A plan explained to you",
    italic: false,
    description: "A clear treatment plan, explained before we begin.",
  },
  {
    num: "03",
    title: "Treatment at your pace",
    italic: false,
    description: "Careful treatment at a pace that suits you.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="how-section"
      aria-labelledby="dental-how-title"
    >
      <div className="how-section__container">
        <motion.div
          className="how-section__img-frame"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
          }
          whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={
            reduceMotion ? { duration: 0.3 } : { duration: 1.05, ease: EASE }
          }
        >
          <motion.div
            className="how-section__img-inner"
            style={{ y: reduceMotion ? 0 : imageY }}
          >
            <Image
              src="/images/dental/dental-chair.png"
              alt="Aesthédent modern dental suite with a comfortable clinic chair and surgical light"
              fill
              className="how-section__img"
              sizes="(max-width: 1100px) 100vw, 42vw"
              quality={86}
            />
          </motion.div>
        </motion.div>

        <div className="how-section__steps-wrap">
          <Reveal>
            <h2 className="how-section__kicker" id="dental-how-title">
              HOW A VISIT WORKS
            </h2>
          </Reveal>

          <div className="how-section__steps-list">
            {STEPS.map((step, index) => (
              <Reveal
                key={step.num}
                className={`how-step${index > 0 ? " how-step--divided" : ""}`}
                delay={0.08 + index * 0.12}
              >
                <div className="how-step__head">
                  <span className="how-step__num">{step.num}</span>
                  <motion.span
                    className="how-step__rule"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.18 + index * 0.12,
                      ease: EASE,
                    }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className={`how-step__title${step.italic ? " is-italic" : ""}`}>
                  {step.title}
                </h3>
                <p className="how-step__desc">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

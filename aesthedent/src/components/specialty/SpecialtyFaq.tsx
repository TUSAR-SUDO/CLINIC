"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import type { SpecialtyContent } from "@/lib/specialty";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SpecialtyFaq({ data }: { data: SpecialtyContent }) {
  const [openId, setOpenId] = useState<string | null>(data.faqs[0]?.id ?? null);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <section
      id={`${data.id}-faq`}
      className={`spec-faq spec-faq--${data.id}`}
      aria-labelledby={`${data.id}-faq-title`}
    >
      <div className="spec-faq__inner">
        <header className="spec-faq__head">
          <Reveal>
            <p className="spec-kicker">Questions</p>
          </Reveal>
          <h2 className="spec-faq__title" id={`${data.id}-faq-title`}>
            <MaskedLine>Before you</MaskedLine>
            <MaskedLine delay={0.08}>
              <em>come in.</em>
            </MaskedLine>
          </h2>
        </header>

        <div className="spec-faq__list" role="region" aria-label={`${data.label} questions`}>
          {data.faqs.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `${baseId}-${item.id}`;

            return (
              <Reveal key={item.id} delay={index * 0.06}>
                <div className={`spec-faq__item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="spec-faq__trigger"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="spec-faq__question">{item.question}</span>
                    <span className="spec-faq__icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        className="spec-faq__answer-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0.18 : 0.4, ease: EASE }}
                      >
                        <p className="spec-faq__answer">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

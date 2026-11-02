"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import { SKIN_FAQS } from "@/lib/skin";
import BotanicalBranch from "@/components/decor/BotanicalBranch";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SkinFAQ() {
  const [openId, setOpenId] = useState<string | null>(SKIN_FAQS[0].id);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <section className="skin-faq faq-section" id="skin-faq" aria-labelledby="skin-faq-title">
      <motion.div
        className="faq-section__botanical"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [-2, 2, -2], y: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <BotanicalBranch className="skin-faq__branch" />
      </motion.div>

      <div className="faq-section__container">
        <div className="faq-section__header">
          <h2 className="faq-section__title" id="skin-faq-title">
            <MaskedLine>
              FAQ{" "}
              <span className="faq-section__dash" aria-hidden="true">
                —
              </span>
            </MaskedLine>
          </h2>
        </div>

        <div className="faq-section__list" role="region" aria-label="Skin care frequently asked questions">
          {SKIN_FAQS.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `${baseId}-${item.id}`;

            return (
              <Reveal key={item.id} delay={index * 0.08}>
                <div className={`faq-item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-item__trigger"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="faq-item__question">{item.question}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      <span className="faq-item__line" />
                      <span className="faq-item__line faq-item__line--vertical" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        className="faq-item__collapse"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <div className="faq-item__content">
                          <p className="faq-item__answer">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
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

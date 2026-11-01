"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import BotanicalBranch from "@/components/decor/BotanicalBranch";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    id: "checkup-freq",
    q: "How often should I get a check-up?",
    a: "A check-up every six months is a common interval for keeping teeth and gums healthy. We will recommend a schedule for you after examining your teeth and gums.",
  },
  {
    id: "root-canal-pain",
    q: "Is a root canal painful?",
    a: "Modern techniques and local anaesthesia are used to keep treatment comfortable. We will explain the procedure and aftercare before we begin.",
  },
  {
    id: "whitening-duration",
    q: "How long does whitening last?",
    a: "Longevity varies with your diet and daily oral care. We will explain what to expect for your teeth at consultation.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function DentalFAQ() {
  const [openId, setOpenId] = useState<string>("checkup-freq");
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <section
      id="dental-faq"
      className="faq-section dental-faq"
      aria-labelledby="dental-faq-title"
    >
      <motion.div
        className="faq-section__botanical"
        aria-hidden="true"
        animate={
          reduceMotion ? undefined : { rotate: [-1.5, 2, -1.5], y: [0, -6, 0] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <BotanicalBranch className="dental-faq__branch" />
      </motion.div>

      <div className="faq-section__container">
        <div className="faq-section__header">
          <h2 className="faq-section__title" id="dental-faq-title">
            <MaskedLine>
              FAQ{" "}
              <span className="faq-section__dash" aria-hidden="true">
                —
              </span>
            </MaskedLine>
          </h2>
        </div>

        <div
          className="faq-section__list"
          role="region"
          aria-label="Dental frequently asked questions"
        >
          {FAQS.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `${baseId}-${item.id}`;

            return (
              <Reveal key={item.id} delay={index * 0.08}>
                <div className={`faq-item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-item__trigger"
                    onClick={() => setOpenId(isOpen ? "" : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="faq-item__question">{item.q}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      <span className="dental-faq__line" />
                      <span className="dental-faq__line dental-faq__line--vertical" />
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
                          <p className="faq-item__answer">{item.a}</p>
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

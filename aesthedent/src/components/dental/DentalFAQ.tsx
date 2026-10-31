"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    id: "checkup-freq",
    q: "How often should I get a check-up?",
    a: "A check-up every six months helps keep your teeth and gums healthy and lets us catch problems early.",
  },
  {
    id: "root-canal-pain",
    q: "Is a root canal painful?",
    a: "Modern techniques and gentle targeted anesthesia make root canal treatments virtually pain-free, relieving acute pain rather than causing it.",
  },
  {
    id: "whitening-duration",
    q: "How long does whitening last?",
    a: "Professional clinical whitening typically lasts 1 to 3 years depending on dietary habits, coffee consumption, and regular dental hygiene.",
  },
];

export default function DentalFAQ() {
  const [openId, setOpenId] = useState<string>("checkup-freq");

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? "" : id));
  };

  return (
    <section className="faq-section" aria-label="Frequently Asked Questions">
      {/* Decorative Botanical Branch Shadow (Bottom Left) */}
      <div className="faq-section__botanical" aria-hidden="true">
        <Image
          src="/images/dental/botanical-shadow.png"
          alt=""
          width={150}
          height={123}
          className="faq-section__botanical-img"
        />
      </div>

      <div className="faq-section__container">
        {/* Left: Section Headline */}
        <div className="faq-section__header">
          <h2 className="faq-section__title">
            FAQ <span className="faq-section__dash">—</span>
          </h2>
        </div>

        {/* Right: Accordion List */}
        <div className="faq-section__list" role="region" aria-label="Dental FAQs">
          {FAQS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item${isOpen ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-item__trigger"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="faq-item__question">{item.q}</span>
                  <span className="faq-item__icon" aria-hidden="true">
                    {isOpen ? <Minus size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="faq-item__collapse"
                    >
                      <div className="faq-item__content">
                        <p className="faq-item__answer">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

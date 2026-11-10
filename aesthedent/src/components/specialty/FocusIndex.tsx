"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import { CLINIC } from "@/lib/clinic";
import type { SpecialtyContent } from "@/lib/specialty";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FocusIndex({ data }: { data: SpecialtyContent }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = data.focus[active];

  return (
    <section
      id={`${data.id}-focus`}
      className={`spec-focus spec-focus--${data.id}`}
      aria-labelledby={`${data.id}-focus-title`}
    >
      <div className="spec-focus__inner">
        <div className="spec-focus__aside">
          <Reveal>
            <p className="spec-kicker">{data.focusKicker}</p>
          </Reveal>

          <h2 className="spec-focus__title" id={`${data.id}-focus-title`}>
            <MaskedLine>{data.focusTitle}</MaskedLine>
            {data.focusTitleEm ? (
              <MaskedLine delay={0.08}>
                <em>{data.focusTitleEm}</em>
              </MaskedLine>
            ) : null}
          </h2>

          <Reveal delay={0.12}>
            <p className="spec-focus__lede">{data.focusLede}</p>
          </Reveal>

          <Reveal delay={0.18} className="spec-focus__preview-wrap">
            <div className="spec-focus__preview">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={current.id}
                  className="spec-focus__preview-frame"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                  transition={{ duration: reduceMotion ? 0.18 : 0.55, ease: EASE }}
                >
                  <Image
                    src={current.image ?? data.heroImage}
                    alt={current.imageAlt ?? ""}
                    fill
                    sizes="(max-width: 980px) 100vw, 34vw"
                    className="spec-focus__preview-image"
                    style={{ objectPosition: current.imagePosition }}
                    quality={82}
                  />
                </motion.div>
              </AnimatePresence>
              <span className="spec-focus__preview-shade" aria-hidden="true" />
              <span className="spec-focus__preview-label">
                <span>{current.index}</span>
                <span>{current.name}</span>
              </span>
            </div>
          </Reveal>
        </div>

        <div className="spec-focus__list" role="list" aria-label={`${data.label} care`}>
          {data.focus.map((item, index) => {
            const isActive = active === index;
            const panelId = `${data.id}-focus-${item.id}`;

            return (
              <motion.article
                key={item.id}
                role="listitem"
                className={`spec-focus__item${isActive ? " is-active" : ""}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{
                  duration: reduceMotion ? 0.22 : 0.8,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: EASE,
                }}
                onMouseEnter={() => setActive(index)}
              >
                <button
                  type="button"
                  className="spec-focus__row"
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                >
                  <span className="spec-focus__num">{item.index}</span>
                  <span className="spec-focus__row-copy">
                    <span className="spec-focus__name">{item.name}</span>
                    <span className="spec-focus__kicker">{item.kicker}</span>
                  </span>
                  <span className="spec-focus__arrow" aria-hidden="true">
                    <ArrowRight size={17} strokeWidth={1.7} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      id={panelId}
                      className="spec-focus__detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.18 : 0.45, ease: EASE }}
                    >
                      <div className="spec-focus__detail-inner">
                        <p>{item.description}</p>
                        <a href={CLINIC.bookingHref} className="spec-focus__ask">
                          Ask about {item.name.toLowerCase()}
                          <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
                        </a>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

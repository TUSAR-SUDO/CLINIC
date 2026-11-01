"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CLINIC } from "@/lib/clinic";
import { SKIN_SPECIALISTS } from "@/lib/skin";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SkinSpecialists() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const cycle = (direction: -1 | 1) => {
    const next = (active + direction + SKIN_SPECIALISTS.length) % SKIN_SPECIALISTS.length;
    setActive(next);
    cardRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <section
      id="skin-specialists"
      className="skin-specialists dentists-section"
      aria-labelledby="skin-specialists-title"
    >
      <div className="dentists-section__container">
        <div className="dentists-section__header">
          <Reveal>
            <h2 className="dentists-section__kicker" id="skin-specialists-title">
              MEET YOUR
              <br />
              SPECIALISTS
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="dentists-section__controls">
            <button
              type="button"
              className="dentists-section__ctrl-btn"
              onClick={() => cycle(-1)}
              aria-label="Highlight previous specialist"
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="dentists-section__ctrl-btn dentists-section__ctrl-btn--active"
              onClick={() => cycle(1)}
              aria-label="Highlight next specialist"
            >
              <ArrowRight size={16} strokeWidth={1.8} />
            </button>
            <span className="skin-sr-only" aria-live="polite">
              {SKIN_SPECIALISTS[active].name}
            </span>
          </Reveal>
        </div>

        <div className="dentists-section__list">
          {SKIN_SPECIALISTS.map((doctor, index) => (
            <motion.article
              key={doctor.name}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`dentist-card skin-specialist-card${
                active === index ? " is-active" : ""
              }`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: index === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{
                duration: reduceMotion ? 0.25 : 0.8,
                delay: reduceMotion ? 0 : index * 0.1,
                ease: EASE,
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <span className="skin-specialist-card__avatar">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={82}
                  height={82}
                  className="skin-specialist-card__img"
                />
              </span>

              <div className="skin-specialist-card__info">
                <h3 className="skin-specialist-card__name">{doctor.name}</h3>
                <span className="skin-specialist-card__creds">{doctor.credentials}</span>
              </div>

              <a
                href={CLINIC.bookingHref}
                className="skin-specialist-card__action"
                aria-label={`Book an appointment with ${doctor.name}`}
              >
                <ArrowRight size={16} strokeWidth={1.7} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

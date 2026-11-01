"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { CLINIC } from "@/lib/clinic";

const DENTISTS = [
  {
    name: "Dr. Manisha Mohanty",
    qualifications: "BDS, MPH",
    image: "/images/dental/dr-manisha.png",
  },
  {
    name: "Dr. Shruti Rath",
    qualifications: "BDS",
    image: "/images/dental/dr-shruti.png",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MeetDentists() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const cycle = (direction: -1 | 1) => {
    const next = (active + direction + DENTISTS.length) % DENTISTS.length;
    setActive(next);
    cardRefs.current[next]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    <section
      id="dentists"
      className="dentists-section"
      aria-labelledby="dentists-title"
    >
      <div className="dentists-section__container">
        <div className="dentists-section__header">
          <Reveal>
            <h2 className="dentists-section__kicker" id="dentists-title">
              MEET YOUR
              <br />
              DENTISTS
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="dentists-section__controls">
            <button
              type="button"
              onClick={() => cycle(-1)}
              className="dentists-section__ctrl-btn"
              aria-label="Highlight previous dentist"
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => cycle(1)}
              className="dentists-section__ctrl-btn dentists-section__ctrl-btn--active"
              aria-label="Highlight next dentist"
            >
              <ArrowRight size={16} strokeWidth={1.8} />
            </button>
            <span className="sr-only" aria-live="polite">
              Highlighted dentist: {DENTISTS[active].name}
            </span>
          </Reveal>
        </div>

        <div className="dentists-section__list">
          {DENTISTS.map((doctor, index) => (
            <motion.article
              key={doctor.name}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`dentist-card${active === index ? " is-active" : ""}`}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: index === 0 ? -24 : 24 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{
                duration: reduceMotion ? 0.25 : 0.8,
                delay: reduceMotion ? 0 : index * 0.1,
                ease: EASE,
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <div className="dentist-card__avatar-wrap">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={82}
                  height={82}
                  className="dentist-card__avatar"
                />
              </div>

              <div className="dentist-card__info">
                <h3 className="dentist-card__name">{doctor.name}</h3>
                <span className="dentist-card__creds">{doctor.qualifications}</span>
              </div>

              <a
                href={CLINIC.bookingHref}
                className="dentist-card__action"
                aria-label={`Book an appointment with ${doctor.name}`}
              >
                <ArrowRight size={15} strokeWidth={1.8} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

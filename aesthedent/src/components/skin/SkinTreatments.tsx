"use client";

import { useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import { SKIN_ICONS } from "./SkinIcons";
import { SKIN_TREATMENTS, type SkinTreatment } from "@/lib/skin";

const EASE = [0.16, 1, 0.3, 1] as const;

function TreatmentCard({
  treatment,
  index,
  spotlight,
  cardRef,
}: {
  treatment: SkinTreatment;
  index: number;
  spotlight: boolean;
  cardRef: (element: HTMLElement | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = SKIN_ICONS[treatment.icon];
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 190, damping: 24 });
  const springRotateY = useSpring(rotateY, { stiffness: 190, damping: 24 });

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rotateX.set(-(y - 0.5) * 4.5);
    rotateY.set((x - 0.5) * 5.5);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      className={`treatment-card skin-treatment-card treatment-card--${treatment.tone}${
        spotlight ? " is-spotlight" : ""
      }`}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={
        reduceMotion
          ? { duration: 0.25, delay: index * 0.04 }
          : { duration: 0.75, delay: index * 0.07, ease: EASE }
      }
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 900,
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      aria-labelledby={`skin-treatment-${treatment.id}`}
    >
      <div className="treatment-card__head">
        <span className="treatment-card__icon-wrap" aria-hidden="true">
          <Icon className="treatment-card__icon" />
        </span>
        <span className="treatment-card__index">{treatment.index}</span>
      </div>

      <div className="treatment-card__body">
        <h3 className="treatment-card__name" id={`skin-treatment-${treatment.id}`}>
          {treatment.name}
        </h3>
        <p className="treatment-card__desc">{treatment.description}</p>
      </div>

      <span className="treatment-card__glare" aria-hidden="true" />
      <span className="skin-treatment-card__corner" aria-hidden="true" />
    </motion.article>
  );
}

export default function SkinTreatments() {
  const [spotlight, setSpotlight] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const moveSpotlight = (direction: -1 | 1) => {
    const next = (spotlight + direction + SKIN_TREATMENTS.length) % SKIN_TREATMENTS.length;
    setSpotlight(next);
    cardRefs.current[next]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    <section
      id="skin-treatments"
      className="skin-treatments treatments-section"
      aria-labelledby="skin-treatments-title"
    >
      <div className="treatments-section__header">
        <div className="treatments-section__title-col">
          <Reveal>
            <span className="treatments-section__kicker">OUR SKIN CARE</span>
          </Reveal>

          <h2 className="treatments-section__title" id="skin-treatments-title">
            <MaskedLine delay={0.06}>Treatments</MaskedLine>
            <MaskedLine delay={0.12}>for Healthier,</MaskedLine>
            <MaskedLine delay={0.18}>Clearer Skin.</MaskedLine>
          </h2>

          <motion.span
            className="treatments-section__divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            aria-hidden="true"
          />

          <Reveal delay={0.15} className="treatments-section__controls">
            <button
              type="button"
              className="treatments-section__ctrl-btn"
              onClick={() => moveSpotlight(-1)}
              aria-label="Highlight previous skin treatment"
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="treatments-section__ctrl-btn treatments-section__ctrl-btn--active"
              onClick={() => moveSpotlight(1)}
              aria-label="Highlight next skin treatment"
            >
              <ArrowRight size={16} strokeWidth={1.8} />
            </button>
            <span className="skin-sr-only" aria-live="polite">
              {SKIN_TREATMENTS[spotlight].name}
            </span>
          </Reveal>
        </div>

        <div className="treatments-section__grid skin-treatments__grid">
          {SKIN_TREATMENTS.map((treatment, index) => (
            <TreatmentCard
              key={treatment.id}
              treatment={treatment}
              index={index}
              spotlight={spotlight === index}
              cardRef={(element) => {
                cardRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import {
  CheckupToothIcon,
  CleaningToothIcon,
  FillingToothIcon,
  RootCanalIcon,
  CrownsBridgesIcon,
  TeethWhiteningIcon,
} from "./DentalIcons";

interface TreatmentItem {
  id: string;
  index: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "blue" | "blush" | "cream" | "rose";
}

const TREATMENTS: TreatmentItem[] = [
  {
    id: "checkups",
    index: "01",
    name: "Check-ups",
    description: "Regular exams to keep problems small.",
    icon: CheckupToothIcon,
    tone: "blue",
  },
  {
    id: "cleaning",
    index: "02",
    name: "Cleaning",
    description: "Scaling and polishing for fresher gums and teeth.",
    icon: CleaningToothIcon,
    tone: "blush",
  },
  {
    id: "fillings",
    index: "03",
    name: "Fillings",
    description: "Natural-looking repairs for cavities.",
    icon: FillingToothIcon,
    tone: "cream",
  },
  {
    id: "root-canal",
    index: "04",
    name: "Root canal",
    description: "Save a painful tooth with careful treatment.",
    icon: RootCanalIcon,
    tone: "blush",
  },
  {
    id: "crowns-bridges",
    index: "05",
    name: "Crowns and bridges",
    description: "Restore damaged or missing teeth.",
    icon: CrownsBridgesIcon,
    tone: "blue",
  },
  {
    id: "teeth-whitening",
    index: "06",
    name: "Teeth whitening",
    description: "A brighter shade, planned for your teeth.",
    icon: TeethWhiteningIcon,
    tone: "rose",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function TreatmentCard({
  item,
  index,
  spotlight,
  cardRef,
}: {
  item: TreatmentItem;
  index: number;
  spotlight: boolean;
  cardRef: (element: HTMLElement | null) => void;
}) {
  const Icon = item.icon;
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 190, damping: 24 });
  const springRotateY = useSpring(rotateY, { stiffness: 190, damping: 24 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rotateX.set(-(y - 0.5) * 4.2);
    rotateY.set((x - 0.5) * 5);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      className={`treatment-card treatment-card--${item.tone}${
        spotlight ? " is-spotlight" : ""
      }`}
      aria-labelledby={`dental-treatment-${item.id}`}
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
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="treatment-card__head">
        <div className="treatment-card__icon-wrap" aria-hidden="true">
          <Icon className="treatment-card__icon" />
        </div>
        <span className="treatment-card__index">{item.index}</span>
      </div>

      <div className="treatment-card__body">
        <h3 className="treatment-card__name" id={`dental-treatment-${item.id}`}>
          {item.name}
        </h3>
        <p className="treatment-card__desc">{item.description}</p>
      </div>

      <span className="treatment-card__glare" aria-hidden="true" />
      <span className="treatment-card__corner" aria-hidden="true" />
    </motion.article>
  );
}

export default function TreatmentsGrid() {
  const [spotlight, setSpotlight] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const moveSpotlight = (direction: -1 | 1) => {
    const next = (spotlight + direction + TREATMENTS.length) % TREATMENTS.length;
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
      id="dental-treatments"
      className="treatments-section"
      aria-labelledby="dental-treatments-title"
    >
      <div className="treatments-section__header">
        <div className="treatments-section__title-col">
          <Reveal>
            <span className="treatments-section__kicker">OUR DENTAL CARE</span>
          </Reveal>

          <h2 className="treatments-section__title" id="dental-treatments-title">
            <MaskedLine>Treatments</MaskedLine>
            <MaskedLine delay={0.07}>for a Healthier,</MaskedLine>
            <MaskedLine delay={0.14}>Brighter Smile.</MaskedLine>
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
              aria-label="Highlight previous dental treatment"
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="treatments-section__ctrl-btn treatments-section__ctrl-btn--active"
              onClick={() => moveSpotlight(1)}
              aria-label="Highlight next dental treatment"
            >
              <ArrowRight size={16} strokeWidth={1.8} />
            </button>
            <span className="sr-only" aria-live="polite">
              Highlighted treatment: {TREATMENTS[spotlight].name}
            </span>
          </Reveal>
        </div>

        <div className="treatments-section__grid">
          {TREATMENTS.map((item, index) => (
            <TreatmentCard
              key={item.id}
              item={item}
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

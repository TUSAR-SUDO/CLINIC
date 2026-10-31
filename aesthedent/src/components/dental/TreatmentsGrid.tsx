"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
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

function TreatmentCard({ item }: { item: TreatmentItem }) {
  const Icon = item.icon;
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.04);
    setRotateY(x * 0.04);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`treatment-card treatment-card--${item.tone}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      <div className="treatment-card__head">
        <div className="treatment-card__icon-wrap">
          <Icon className="treatment-card__icon" />
        </div>
        <span className="treatment-card__index">{item.index}</span>
      </div>

      <div className="treatment-card__body">
        <h3 className="treatment-card__name">{item.name}</h3>
        <p className="treatment-card__desc">{item.description}</p>
      </div>

      {/* Specular gloss sheen */}
      <span className="treatment-card__glare" aria-hidden="true" />
    </div>
  );
}

export default function TreatmentsGrid() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = direction === "left" ? -320 : 320;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="dental-treatments" className="treatments-section" aria-label="Dental Treatments">
      <div className="treatments-section__header">
        <div className="treatments-section__title-col">
          <span className="treatments-section__kicker">OUR DENTAL CARE</span>
          <h2 className="treatments-section__title">
            Treatments for a Healthier,<br />Brighter Smile.
          </h2>
          <span className="treatments-section__divider" />
          <div className="treatments-section__controls" aria-label="Carousel navigation">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="treatments-section__ctrl-btn"
              aria-label="Previous treatments"
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="treatments-section__ctrl-btn treatments-section__ctrl-btn--active"
              aria-label="Next treatments"
            >
              <ArrowRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="treatments-section__grid" ref={scrollContainerRef}>
          {TREATMENTS.map((item) => (
            <TreatmentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

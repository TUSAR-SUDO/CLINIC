"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Sparkles,
  Shield,
  Scan,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export interface StandardItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  highlights: string[];
}

export const STANDARDS: StandardItem[] = [
  {
    number: "01",
    title: "Pain-Free Comfort & Gentle Pacing",
    subtitle: "Unhurried, Anxiety-Free Care",
    description:
      "We believe dentistry and facial aesthetics should never feel daunting. We use computer-assisted anesthesia delivery, ultra-fine micro-needles, and pause whenever you need.",
    icon: HeartHandshake,
    highlights: [
      "Computer-assisted anesthesia",
      "Ergonomic head and neck support",
      "Treatment at your own pace",
    ],
  },
  {
    number: "02",
    title: "100% Digital 3D Intraoral Scanning",
    subtitle: "Precision Without Discomfort",
    description:
      "Say goodbye to messy silicone impression pastes. Our optical 3D scanners map your teeth and bite in minutes with sub-millimeter clinical accuracy.",
    icon: Scan,
    highlights: [
      "Zero-gag optical wand scans",
      "Instant 3D smile simulation",
      "Precise aligner & crown fit",
    ],
  },
  {
    number: "03",
    title: "Hospital-Grade Class-B Sterilization",
    subtitle: "Rigorous Microbiological Safety",
    description:
      "Every reusable instrument undergoes automated ultrasonic cleaning, vacuum packaging, and 134°C Class-B autoclave sterilization with chemical indicator tracking.",
    icon: Shield,
    highlights: [
      "Multi-stage vacuum autoclaves",
      "Pouches unsealed before your eyes",
      "Daily biological spore monitoring",
    ],
  },
  {
    number: "04",
    title: "Natural Subtlety & Honest Diagnosis",
    subtitle: "Anatomy-First Aesthetic Philosophy",
    description:
      "We will never recommend unnecessary procedures or overfill. Whether it is dental crowns or PMU brows, our work honors your authentic facial anatomy.",
    icon: Sparkles,
    highlights: [
      "Custom facial harmony mapping",
      "Conservative, tissue-saving approach",
      "Detailed written care plans",
    ],
  },
];

export default function ClinicStandards() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="clinic-standards" aria-labelledby="clinic-standards-title">
      <div className="clinic-standards__inner">
        <header className="clinic-standards__head">
          <p className="clinic-standards__eyebrow">The Aesthédent Promise</p>
          <h2 id="clinic-standards-title" className="clinic-standards__title">
            Clinical standards you can <em>feel and trust.</em>
          </h2>
          <p className="clinic-standards__lede">
            Advanced medical technology, unwavering hospital sterilization, and a philosophy
            rooted in natural aesthetic subtlety.
          </p>
        </header>

        <div className="clinic-standards__grid">
          {STANDARDS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.number}
                className="clinic-standards__card"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={
                  reduceMotion
                    ? { duration: 0.2 }
                    : { duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }
                }
              >
                <div className="clinic-standards__card-top">
                  <span className="clinic-standards__card-num">{item.number}</span>
                  <span className="clinic-standards__card-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="clinic-standards__card-body">
                  <h3 className="clinic-standards__card-title">{item.title}</h3>
                  <p className="clinic-standards__card-subtitle">{item.subtitle}</p>
                  <p className="clinic-standards__card-desc">{item.description}</p>
                </div>

                <ul className="clinic-standards__card-list" aria-label="Key highlights">
                  {item.highlights.map((h) => (
                    <li key={h}>
                      <CheckCircle2 size={13} strokeWidth={2} aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


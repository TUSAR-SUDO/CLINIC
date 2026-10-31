"use client";

import React from "react";
import Image from "next/image";

const STEPS = [
  {
    num: "01",
    title: "Consultation",
    italic: true,
  },
  {
    num: "02",
    title: "A plan explained to you",
    italic: false,
  },
  {
    num: "03",
    title: "Treatment at your pace",
    italic: false,
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section" aria-label="How a visit works">
      <div className="how-section__container">
        {/* Left: Luxury Operatory Room Photo */}
        <div className="how-section__visual">
          <div className="how-section__img-frame">
            <Image
              src="/images/dental/dental-chair.png"
              alt="Aesthedent modern dental suite with luxury clinic chair and surgical light"
              fill
              className="how-section__img"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>

        {/* Right: 3-Step Timeline */}
        <div className="how-section__steps-wrap">
          <span className="how-section__kicker">HOW A VISIT WORKS</span>

          <div className="how-section__steps-list">
            {STEPS.map((step) => (
              <div key={step.num} className="how-step">
                <div className="how-step__head">
                  <span className="how-step__num">{step.num}</span>
                  <span className="how-step__rule" />
                </div>
                <h3 className={`how-step__title${step.italic ? " is-italic" : ""}`}>
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

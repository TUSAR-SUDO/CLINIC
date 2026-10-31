"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { CLINIC } from "@/lib/clinic";

export default function MeetDentists() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const amount = direction === "left" ? -280 : 280;
    containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const dentists = [
    {
      name: "Dr. Manisha Mohanty",
      qualifications: "BDS, MPH",
      image: "/images/dental/dr-manisha.png",
      role: "Lead Aesthetic & Dental Specialist",
    },
    {
      name: "Dr. Shruti Rath",
      qualifications: "BDS",
      image: "/images/dental/dr-shruti.png",
      role: "Dental Care & Smile Restoration",
    },
  ];

  return (
    <section id="dentists" className="dentists-section" aria-label="Meet your dentists">
      <div className="dentists-section__container">
        <div className="dentists-section__header">
          <span className="dentists-section__kicker">MEET YOUR DENTISTS</span>
          <div className="dentists-section__controls">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="dentists-section__ctrl-btn"
              aria-label="Previous dentist"
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="dentists-section__ctrl-btn dentists-section__ctrl-btn--active"
              aria-label="Next dentist"
            >
              <ArrowRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="dentists-section__list" ref={containerRef}>
          {dentists.map((doc) => (
            <div
              key={doc.name}
              className="dentist-card"
            >
              <div className="dentist-card__avatar-wrap">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  width={64}
                  height={64}
                  className="dentist-card__avatar"
                />
              </div>

              <div className="dentist-card__info">
                <h3 className="dentist-card__name">{doc.name}</h3>
                <span className="dentist-card__creds">{doc.qualifications}</span>
              </div>

              <a
                href={CLINIC.bookingHref}
                className="dentist-card__action"
                aria-label={`Book appointment with ${doc.name}`}
              >
                <ArrowRight size={15} strokeWidth={1.8} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

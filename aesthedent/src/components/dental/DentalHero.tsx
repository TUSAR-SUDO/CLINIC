"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, ArrowDown } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const COMPANIONS = [
  { id: "skin", name: "Skin", img: "/images/hero/skin.png", href: "/#service-skin" },
  { id: "hair", name: "Hair", img: "/images/hero/hair.png", href: "/#service-hair" },
  { id: "pmu", name: "PMU", img: "/images/hero/pmu.png", href: "/#service-pmu" },
];

export default function DentalHero() {
  const scrollToTreatments = () => {
    document.getElementById("dental-treatments")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="dental-hero" aria-label="Dental Care Introduction">
      {/* Left Vertical Indicator Rail */}
      <aside className="dental-rail" aria-hidden="true">
        <div className="dental-rail__steps">
          <div className="dental-rail__item is-active">
            <span className="dental-rail__dot" />
            <span className="dental-rail__num">01</span>
          </div>
          <div className="dental-rail__line" />
          <div className="dental-rail__item">
            <span className="dental-rail__num">02</span>
          </div>
          <div className="dental-rail__line" />
          <div className="dental-rail__item">
            <span className="dental-rail__num">03</span>
          </div>
          <div className="dental-rail__line" />
          <div className="dental-rail__item">
            <span className="dental-rail__num">04</span>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToTreatments}
          className="dental-rail__scroll"
          aria-label="Scroll to treatments"
        >
          <span>Scroll</span>
          <ArrowDown size={12} className="dental-rail__arrow" />
        </button>
      </aside>

      {/* Main Container */}
      <div className="dental-hero__container">
        {/* Left Column: Typography & CTAs */}
        <div className="dental-hero__content">
          <nav className="dental-hero__breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="dental-hero__bread-link">Home</Link>
            <span className="dental-hero__bread-sep">/</span>
            <span className="dental-hero__bread-current">Dental</span>
          </nav>

          <h1 className="dental-hero__title">
            Dental <span className="dental-hero__dash">—</span>
          </h1>

          <p className="dental-hero__kicker">
            HEALTHY SMILES FOR A BRIGHTER YOU.
          </p>

          <p className="dental-hero__subtitle">
            Comprehensive dental care for every smile — from routine checkups to advanced treatments.
          </p>

          <div className="dental-hero__actions">
            <LiquidMetalButton
              label="Book dental consultation"
              variant="aubergine"
              width={216}
              height={44}
              onClick={() => {
                window.location.href = CLINIC.bookingHref;
              }}
            />

            <a
              href={CLINIC.phone.primaryHref}
              className="dental-hero__call-pill"
              aria-label={`Call clinic at ${CLINIC.phone.primaryDisplay}`}
            >
              <Phone size={13} strokeWidth={2} className="dental-hero__call-icon" />
              <span>Call {CLINIC.phone.primaryDisplay}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Arched Dental Photo + 3 Flush Companion Strips */}
        <div className="dental-hero__stage">
          {/* Main Arched Dental Photo */}
          <div className="dental-hero__arch-card">
            <Image
              src="/images/hero/dental.png"
              alt="Patient with bright healthy smile at Aesthedent"
              fill
              priority
              className="dental-hero__arch-img"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="dental-hero__arch-scrim" />
          </div>

          {/* 3 Companion Panels: Skin, Hair, PMU */}
          <div className="dental-hero__companions" role="region" aria-label="Explore other specialties">
            {COMPANIONS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`dental-companion dental-companion--${item.id}`}
                aria-label={`Explore ${item.name}`}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="dental-companion__img"
                  sizes="120px"
                />
                <div className="dental-companion__scrim" />
                <div className="dental-companion__info">
                  <h3 className="dental-companion__name">{item.name}</h3>
                  <span className="dental-companion__btn" aria-hidden="true">
                    <ArrowRight size={13} strokeWidth={1.8} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

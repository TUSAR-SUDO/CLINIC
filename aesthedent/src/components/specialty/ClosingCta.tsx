"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Magnetic from "@/components/hero/Magnetic";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { CLINIC } from "@/lib/clinic";
import type { SpecialtyContent } from "@/lib/specialty";

const EASE = [0.16, 1, 0.3, 1] as const;

const directionsHref = `https://maps.google.com/?q=${encodeURIComponent(
  `${CLINIC.address.line1}, ${CLINIC.address.line2}, ${CLINIC.address.city} ${CLINIC.address.postalCode}`,
)}`;

export default function ClosingCta({ data }: { data: SpecialtyContent }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={`${data.id}-contact`}
      className={`spec-close spec-close--${data.id}`}
      aria-labelledby={`${data.id}-close-title`}
    >
      <span className="spec-close__word" aria-hidden="true">
        {data.heroWord}
      </span>

      <div className="spec-close__inner">
        <div className="spec-close__copy">
          <Reveal>
            <p className="spec-kicker">Start here</p>
          </Reveal>

          <h2 className="spec-close__title" id={`${data.id}-close-title`}>
            <MaskedLine>Begin with a</MaskedLine>
            <MaskedLine delay={0.08}>
              <em>conversation.</em>
            </MaskedLine>
          </h2>

          <Reveal delay={0.12}>
            <p className="spec-close__lede">
              Tell us what you have been thinking about. We will help you find the right
              appointment and answer what you need before you come in.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="spec-close__actions">
              <Magnetic>
                <LiquidMetalButton
                  label={data.bookingLabel}
                  variant="cream"
                  width={238}
                  height={46}
                  onClick={() => {
                    window.location.href = CLINIC.bookingHref;
                  }}
                />
              </Magnetic>
              <a href={CLINIC.phone.primaryHref} className="spec-close__call">
                <Phone size={14} strokeWidth={1.9} aria-hidden="true" />
                {CLINIC.phone.primaryDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="spec-close__aside">
          <motion.div
            className="spec-close__stamp"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -18, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.25 : 0.9, ease: EASE }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 160 160" className="spec-close__stamp-svg">
              <defs>
                <path
                  id={`${data.id}-stamp-circle`}
                  d="M80,80 m-57,0 a57,57 0 1,1 114,0 a57,57 0 1,1 -114,0"
                />
              </defs>
              <text>
                <textPath href={`#${data.id}-stamp-circle`}>
                  AESTHÉDENT · OLD TOWN · CONSIDERED CARE ·
                </textPath>
              </text>
              <circle cx="80" cy="80" r="35" />
              <path d="M64 80h32M80 64v32" />
            </svg>
          </motion.div>

          <Reveal delay={0.08}>
            <div className="spec-close__visit">
              <span className="spec-close__visit-icon" aria-hidden="true">
                <MapPin size={17} strokeWidth={1.7} />
              </span>
              <div>
                <p className="spec-close__visit-kicker">Visit the clinic</p>
                <address>
                  {CLINIC.address.line1}, {CLINIC.address.line2},
                  <br />
                  {CLINIC.address.city}, {CLINIC.address.state} {CLINIC.address.postalCode}
                </address>
                <a href={directionsHref} target="_blank" rel="noopener noreferrer">
                  Get directions
                  <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

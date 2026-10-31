"use client";

import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { CLINIC } from "@/lib/clinic";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function DentalBottomCta() {
  return (
    <section id="contact-info" className="cta-dual-section" aria-label="Book consultation or visit clinic">
      <div className="cta-dual-section__container">
        {/* Left: Aubergine Consultation Pill */}
        <div className="cta-pill cta-pill--booking">
          <div className="cta-pill__book-left">
            <div className="cta-pill__cal-icon-wrap" aria-hidden="true">
              <Calendar size={22} strokeWidth={1.75} />
            </div>
            <a
              href={CLINIC.bookingHref}
              className="cta-pill__book-title"
              aria-label="Book a dental consultation"
            >
              Book a dental<br />consultation
            </a>
          </div>

          <span className="cta-pill__divider" aria-hidden="true" />

          <div className="cta-pill__call-wrap">
            <a
              href={CLINIC.phone.primaryHref}
              className="cta-pill__call-btn"
              aria-label={`Call clinic at ${CLINIC.phone.primaryDisplay}`}
            >
              <Phone size={13} strokeWidth={2} />
              <span>Call {CLINIC.phone.primaryDisplay}</span>
            </a>
          </div>
        </div>

        {/* Right: Cream Location & Map Pill */}
        <div className="cta-pill cta-pill--location">
          <div className="cta-pill__loc-text">
            <MapPin size={18} strokeWidth={1.8} className="cta-pill__pin-icon" aria-hidden="true" />
            <address className="cta-pill__address">
              {CLINIC.address.line1},<br />
              {CLINIC.address.line2},<br />
              {CLINIC.address.city} {CLINIC.address.postalCode}
            </address>
          </div>

          <div className="cta-pill__map-wrap">
            <Image
              src="/images/dental/map-card.png"
              alt="Map location of Aesthedent Clinic in Old Town, Bhubaneswar"
              width={140}
              height={70}
              className="cta-pill__map-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

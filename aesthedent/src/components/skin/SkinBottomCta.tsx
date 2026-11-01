"use client";

import Image from "next/image";
import { Calendar, MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CLINIC } from "@/lib/clinic";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SkinBottomCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skin-contact" className="cta-dual-section" aria-label="Book a skin consultation or visit the clinic">
      <div className="cta-dual-section__container">
        <motion.div
          className="cta-pill cta-pill--booking skin-booking-pill"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.25 : 0.8, ease: EASE }}
        >
          <div className="cta-pill__book-left">
            <span className="cta-pill__cal-icon-wrap" aria-hidden="true">
              <Calendar size={22} strokeWidth={1.7} />
            </span>
            <a
              href={CLINIC.bookingHref}
              className="cta-pill__book-title"
              aria-label="Book a skin consultation"
            >
              Book a skin
              <br />
              consultation
            </a>
          </div>

          <span className="cta-pill__divider" aria-hidden="true" />

          <div className="cta-pill__call-wrap">
            <a
              href={CLINIC.phone.primaryHref}
              className="cta-pill__call-btn"
              aria-label={`Call the clinic at ${CLINIC.phone.primaryDisplay}`}
            >
              <Phone size={13} strokeWidth={2} aria-hidden="true" />
              <span>Call {CLINIC.phone.primaryDisplay}</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="cta-pill cta-pill--location"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: reduceMotion ? 0.25 : 0.8, delay: 0.08, ease: EASE }}
        >
          <div className="cta-pill__loc-text">
            <MapPin size={18} strokeWidth={1.7} className="cta-pill__pin-icon" aria-hidden="true" />
            <address className="cta-pill__address">
              {CLINIC.address.line1},<br />
              {CLINIC.address.line2},<br />
              {CLINIC.address.city}, {CLINIC.address.state} {CLINIC.address.postalCode}
            </address>
          </div>

          <div className="cta-pill__map-wrap">
            <Image
              src="/images/skin/map-card.png"
              alt="Map location of Aesthedent in Old Town, Bhubaneswar"
              width={132}
              height={61}
              className="cta-pill__map-img"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

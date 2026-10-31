"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { CLINIC, getClinicOpenState, type ClinicOpenState } from "@/lib/clinic";

export default function InfoPill() {
  // The clock is intentionally read after hydration: Next's Cache Components
  // forbids evaluating the current time during prerender.
  const [status, setStatus] = useState<ClinicOpenState | null>(null);

  useEffect(() => {
    const update = () => setStatus(getClinicOpenState());
    update();

    const timer = window.setInterval(update, 30_000);
    const onVisibility = () => {
      if (!document.hidden) update();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const isOpen = status?.isOpen ?? null;
  const dotClass =
    isOpen === null ? "status-dot--pending" : isOpen ? "status-dot--open" : "status-dot--closed";

  return (
    <aside className="info-pill" id="clinic-info" aria-label="Clinic hours and contact">
      <a
        className="info-pill__block info-pill__address-link"
        href={`https://maps.google.com/?q=${encodeURIComponent(
          `${CLINIC.address.line1}, ${CLINIC.address.line2}, ${CLINIC.address.city} ${CLINIC.address.postalCode}`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View clinic on Google Maps"
      >
        <MapPin size={16} strokeWidth={1.6} className="info-pill__pin" aria-hidden="true" />
        <span className="info-pill__address">
          <span>{CLINIC.address.shortLine1}</span>
          <br />
          <span>{CLINIC.address.shortLine2}</span>
        </span>
      </a>

      <span className="info-pill__divider" aria-hidden="true" />

      <span className="info-pill__status" aria-live="polite">
        <span className={`status-dot ${dotClass}`} aria-hidden="true" />
        <span className="info-pill__status-text">
          <strong className="info-pill__status-main">
            {isOpen === null ? "Clinic hours" : isOpen ? "Open now" : "Closed"}
          </strong>
          <span className="info-pill__status-sub">
            {isOpen ? "Open today until 8 PM" : "Opens at 10 AM"}
          </span>
        </span>
      </span>

      <a
        className="info-pill__call-btn"
        href={CLINIC.phone.primaryHref}
        aria-label={`Call Aesthedent on ${CLINIC.phone.primaryDisplay}`}
      >
        <Phone size={14} strokeWidth={1.8} aria-hidden="true" />
        <span className="info-pill__call-text">
          <span className="info-pill__call-action">Call</span>
          <span className="info-pill__call-num">{CLINIC.phone.primaryDisplay}</span>
        </span>
      </a>

      <address className="sr-only">
        {CLINIC.address.line1}, {CLINIC.address.line2}, {CLINIC.address.city},{" "}
        {CLINIC.address.state} {CLINIC.address.postalCode}, India. Phone{" "}
        {CLINIC.phone.primaryDisplay} or {CLINIC.phone.secondaryDisplay}.
      </address>
    </aside>
  );
}

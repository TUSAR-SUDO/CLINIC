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
      <span className="info-pill__status" aria-live="polite">
        <span className={`status-dot ${dotClass}`} aria-hidden="true" />
        <span>{status?.label ?? "Clinic hours"}</span>
      </span>

      <span className="info-pill__divider" aria-hidden="true" />

      <span className="info-pill__block">
        <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />
        <span className="info-pill__address">
          {CLINIC.address.shortLine1}
          <br />
          {CLINIC.address.shortLine2}
        </span>
      </span>

      <span className="info-pill__divider" aria-hidden="true" />

      <a
        className="info-pill__block"
        href={CLINIC.phone.primaryHref}
        aria-label={`Call Aesthedent on ${CLINIC.phone.primaryDisplay}`}
      >
        <Phone size={17} strokeWidth={1.5} aria-hidden="true" />
        <span className="info-pill__call">
          <span>Call</span>
          <span>{CLINIC.phone.primaryDisplay}</span>
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

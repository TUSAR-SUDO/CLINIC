"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import {
  DEFAULT_SERVICE,
  SERVICES,
  type ServiceId,
} from "@/lib/services";

const MOBILE_QUERY = "(max-width: 699px)";

function subscribeToMobile(onChange: () => void) {
  const media = window.matchMedia(MOBILE_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getMobileSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getServerSnapshot = () => false;

const SERVICE_LINK: Partial<Record<ServiceId, string>> = {
  dental: "/dental",
  skin: "/skin",
};

const SERVICE_SUMMARY: Record<ServiceId, string> = {
  dental: "Preventive, cosmetic and restorative care, planned around you.",
  skin: "Medical facials, pigmentation and skin health, planned around you.",
  hair: "Hair-fall care and scalp treatments, planned around you.",
  pmu: "Brows, lips and eyeliner, done with a light hand.",
};

const SERVICE_ACTION: Record<ServiceId, string> = {
  dental: "Explore dental",
  skin: "Explore skin",
  hair: "Ask about hair",
  pmu: "Ask about PMU",
};

export default function MobileServiceShowcase() {
  const [active, setActive] = useState<ServiceId>(DEFAULT_SERVICE);
  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    const handleSelect = (event: Event) => {
      const detail = (event as CustomEvent<ServiceId>).detail;
      if (detail && SERVICES.some((service) => service.id === detail)) {
        setActive(detail);
      }
    };

    // Footer links use #service-* anchors. Keep those links working on mobile
    // by selecting the matching card when the hash changes.
    const applyHash = () => {
      const match = window.location.hash.match(
        /^#service-(dental|skin|hair|pmu)$/,
      );
      if (!match) return;
      const id = match[1] as ServiceId;
      setActive(id);
      window.dispatchEvent(
        new CustomEvent("aesthedent:select-service", { detail: id }),
      );
    };

    window.addEventListener("aesthedent:select-service", handleSelect);
    window.addEventListener("hashchange", applyHash);
    applyHash();

    return () => {
      window.removeEventListener("aesthedent:select-service", handleSelect);
      window.removeEventListener("hashchange", applyHash);
    };
  }, []);

  const service =
    SERVICES.find((item) => item.id === active) ?? SERVICES[0];
  const serviceHref = SERVICE_LINK[service.id];
  const action = SERVICE_ACTION[service.id];

  return (
    <section
      className="mobile-service-showcase"
      aria-label={`${service.name} care`}
      aria-live="polite"
      data-mobile-service={service.id}
    >
      {isMobile && (
        <div className="mobile-service__anchors" aria-hidden="true">
          {SERVICES.map((item) => (
            <span key={item.id} id={`service-${item.id}`} />
          ))}
        </div>
      )}

      <article
        key={service.id}
        className={`mobile-service mobile-service--${service.id}`}
        aria-labelledby="mobile-service-title"
      >
        <div className="mobile-service__media">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(max-width: 699px) calc(100vw - 2.3rem), 1px"
            quality={82}
            priority={service.id === DEFAULT_SERVICE}
            className="mobile-service__image"
            style={{ objectPosition: service.image.position }}
          />
          <div className="mobile-service__scrim" aria-hidden="true" />
          <div className="mobile-service__meta">
            <span>{service.number} / 04</span>
            <span>{service.name} care</span>
          </div>
          <div className="mobile-service__media-title">
            <h2 id="mobile-service-title">{service.name}</h2>
          </div>
        </div>

        <div className="mobile-service__body">
          <p className="mobile-service__descriptor">
            {SERVICE_SUMMARY[service.id]}
          </p>

          <ul
            className="mobile-service__treatments"
            aria-label={`${service.name} treatments`}
          >
            {service.treatments.map((treatment) => (
              <li key={treatment}>{treatment}</li>
            ))}
          </ul>

          <div className="mobile-service__actions">
            {serviceHref ? (
              <Link href={serviceHref} className="mobile-service__link">
                {action}
                <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            ) : (
              <a href="#clinic-info" className="mobile-service__link">
                {action}
                <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}

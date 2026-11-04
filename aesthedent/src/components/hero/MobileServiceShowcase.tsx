"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  DEFAULT_SERVICE,
  SERVICES,
  type ServiceId,
} from "@/lib/services";
import ServiceMarquee from "./ServiceMarquee";

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
  const reduceMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
    getServerSnapshot,
  );

  // Swipe gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    // Detect horizontal swipe > 40px and dominant over vertical
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      const currentIndex = SERVICES.findIndex((s) => s.id === active);
      if (deltaX < 0) {
        // Swipe left -> next service
        const nextIndex = (currentIndex + 1) % SERVICES.length;
        const nextService = SERVICES[nextIndex].id;
        setActive(nextService);
        window.dispatchEvent(
          new CustomEvent("aesthedent:select-service", { detail: nextService }),
        );
      } else {
        // Swipe right -> prev service
        const prevIndex =
          (currentIndex - 1 + SERVICES.length) % SERVICES.length;
        const prevService = SERVICES[prevIndex].id;
        setActive(prevService);
        window.dispatchEvent(
          new CustomEvent("aesthedent:select-service", { detail: prevService }),
        );
      }
    }
  };

  const selectService = (id: ServiceId) => {
    setActive(id);
    window.dispatchEvent(
      new CustomEvent("aesthedent:select-service", { detail: id }),
    );
  };

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

      <ServiceMarquee />

      <div
        className="mobile-service__swipe-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={service.id}
            className={`mobile-service mobile-service--${service.id}`}
            aria-labelledby="mobile-service-title"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.985 }
            }
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mobile-service__media">
              <motion.div
                key={`media-${service.id}`}
                className="mobile-service__image-wrapper"
                initial={reduceMotion ? false : { scale: 1.05, opacity: 0.85 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
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
              </motion.div>
              <div className="mobile-service__scrim" aria-hidden="true" />
              <motion.div
                className="mobile-service__meta"
                initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 }}
              >
                <span>{service.number} / 04</span>
                <span>{service.name} care</span>
              </motion.div>
              <div className="mobile-service__media-title">
                <motion.h2
                  id="mobile-service-title"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.12 }}
                >
                  {service.name}
                </motion.h2>
              </div>
            </div>

            <div className="mobile-service__body">
              <motion.p
                className="mobile-service__descriptor"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.14 }}
              >
                {SERVICE_SUMMARY[service.id]}
              </motion.p>

              <ul
                className="mobile-service__treatments"
                aria-label={`${service.name} treatments`}
              >
                {service.treatments.map((treatment, idx) => (
                  <motion.li
                    key={treatment}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 8, scale: 0.94 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={
                      reduceMotion
                        ? { duration: 0.15 }
                        : {
                            duration: 0.28,
                            delay: 0.16 + idx * 0.04,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                  >
                    {treatment}
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-service__actions">
                {serviceHref ? (
                  <Link href={serviceHref} className="mobile-service__link">
                    <motion.span
                      whileTap={{ scale: 0.96 }}
                      className="mobile-service__link-inner"
                    >
                      {action}
                      <ArrowRight
                        size={15}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </motion.span>
                  </Link>
                ) : (
                  <a href="#clinic-info" className="mobile-service__link">
                    <motion.span
                      whileTap={{ scale: 0.96 }}
                      className="mobile-service__link-inner"
                    >
                      {action}
                      <ArrowRight
                        size={15}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </motion.span>
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Tactile Pagination Dots for one-tap switching & swipe indicator */}
      <div className="mobile-service__pagination" aria-label="Service selector">
        {SERVICES.map((item) => {
          const isSelected = item.id === service.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`mobile-service__dot-btn ${
                isSelected ? "mobile-service__dot-btn--active" : ""
              }`}
              onClick={() => selectService(item.id)}
              aria-label={`Select ${item.name} care`}
              aria-pressed={isSelected}
            >
              <span className="mobile-service__dot-pill" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

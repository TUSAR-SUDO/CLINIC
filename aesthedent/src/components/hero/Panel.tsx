"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import {
  cubicBezier,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import type { Service } from "@/lib/services";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import Magnetic from "./Magnetic";

interface PanelProps {
  service: Service;
  index: number;
  active: boolean;
  compact: boolean;
  onActivate: () => void;
  onToggle: () => void;
}

const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);

/** Specialty pages, once built, are reached from the panel arrow. */
const SERVICE_HREF: Partial<Record<Service["id"], string>> = {
  dental: "/dental",
  skin: "/skin",
};

export default function Panel({
  service,
  index,
  active,
  compact,
  onActivate,
  onToggle,
}: PanelProps) {
  const reduceMotion = useReducedMotion();
  const articleRef = useRef<HTMLElement>(null);
  const canParallaxRef = useRef(false);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const driftX = useSpring(parallaxX, { stiffness: 70, damping: 20, mass: 0.5 });
  const driftY = useSpring(parallaxY, { stiffness: 70, damping: 20, mass: 0.5 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      canParallaxRef.current = finePointer.matches && !reduceMotion;
    };
    sync();
    finePointer.addEventListener("change", sync);
    return () => finePointer.removeEventListener("change", sync);
  }, [reduceMotion]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!canParallaxRef.current || !articleRef.current) return;
    const rect = articleRef.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    parallaxX.set((nx - 0.5) * 12);
    parallaxY.set((ny - 0.5) * 9);
  }

  function resetParallax() {
    parallaxX.set(0);
    parallaxY.set(0);
  }

  const detailsId = `treatments-${service.id}`;
  const titleId = `title-${service.id}`;
  const serviceHref = SERVICE_HREF[service.id];
  const styles = {
    "--image-position": service.image.position,
    "--panel-offset": `${service.offset}px`,
    "--panel-radius": service.radius,
    "--resting-grow": service.restingGrow,
  } as CSSProperties;

  return (
    <motion.article
      ref={articleRef}
      id={`service-${service.id}`}
      className={`panel panel--${service.id} js-reveal${active ? " is-active" : ""}${compact ? " is-compact" : ""}`}
      style={styles}
      data-cursor="grow"
      aria-labelledby={titleId}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0.22 }
          : {
            y: { duration: 0.55, delay: index * 0.05, ease: EASE_OUT },
            opacity: { duration: 0.4, delay: index * 0.05 },
          }
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
      onPointerEnter={(event) => {
        if (!compact && event.pointerType !== "touch") onActivate();
      }}
    >
      <button
        type="button"
        className="panel__hit"
        aria-expanded={active}
        aria-controls={compact ? undefined : detailsId}
        aria-label={`${active ? "Active" : "Select"} ${service.name} treatments`}
        onClick={onToggle}
      />

      <div className="panel__media">
        <motion.div className="panel__drift" style={{ x: driftX, y: driftY }}>
          <div
            className={`panel__zoom${active ? " is-zoomed" : ""}`}
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(max-width: 699px) 45vw, (max-width: 1023px) 42vw, 38vw"
              className="panel__image"
              quality={84}
              loading="eager"
              preload={service.id === "skin"}
              fetchPriority={service.id === "skin" ? "high" : "auto"}
            />
          </div>
        </motion.div>
      </div>

      <div className="panel__scrim" aria-hidden="true" />

      <div className="panel__content">
        <div className="panel__index">
          <span>{service.number}</span>
          <span className="panel__rule" aria-hidden="true" />
        </div>

        <h2 className="panel__title" id={titleId}>
          {service.name}
        </h2>

        <motion.p
          className="panel__descriptor"
          initial={false}
          animate={active || compact ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          style={compact && !active ? { display: "none" } : undefined}
        >
          {service.descriptor}
        </motion.p>

        {/* Circular arrow button underneath descriptor as in Reference Image 2 */}
        {serviceHref ? (
          <Link
            href={serviceHref}
            className="panel__circle-arrow"
            aria-label={`View ${service.name} treatments page`}
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowRight size={13} strokeWidth={1.8} />
          </Link>
        ) : (
          <div className="panel__circle-arrow" aria-hidden="true">
            <ArrowRight size={13} strokeWidth={1.8} />
          </div>
        )}

        {!compact && (
          <motion.div
            className="panel__details"
            id={detailsId}
            aria-hidden={!active}
            inert={!active}
            initial={false}
            animate={active ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="panel__details-inner">
              <motion.ul
                className="panel__list"
                initial={false}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: active ? 0.08 : 0 }}
              >
                {service.treatments.map((treatment) => (
                  <li key={treatment}>{treatment}</li>
                ))}
              </motion.ul>

              <motion.div
                className="panel__actions"
                initial={false}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, delay: active ? 0.14 : 0 }}
              >
                {active && (
                  <Magnetic>
                    <LiquidMetalButton
                      label={service.bookLabel}
                      onClick={() => {
                        window.location.href = CLINIC.bookingHref;
                      }}
                      variant={service.ctaTheme === "dark" ? "aubergine" : "cream"}
                    />
                  </Magnetic>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="panel__rest"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: active || compact ? 0 : 1, scale: active || compact ? 0.8 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <span className="panel__arrow">
            <ArrowRight size={18} strokeWidth={1.4} />
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}

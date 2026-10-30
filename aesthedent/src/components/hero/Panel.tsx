"use client";

import Image from "next/image";
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
  const styles = {
    "--image-position": service.image.position,
    "--panel-offset": `${service.offset}px`,
    flexGrow: active ? 1.9 : service.restingGrow,
  } as CSSProperties;

  return (
    <motion.article
      ref={articleRef}
      id={`service-${service.id}`}
      className={`panel panel--${service.id} js-reveal${active ? " is-active" : ""}${compact ? " is-compact" : ""}`}
      style={styles}
      data-cursor="grow"
      aria-labelledby={titleId}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 74 }}
      animate={{ opacity: 1, y: 0, flexGrow: active ? 1.9 : service.restingGrow }}
      transition={
        reduceMotion
          ? { duration: 0.22 }
          : {
            y: { duration: 0.5, delay: index * 0.055, ease: EASE_OUT },
            opacity: { duration: 0.36, delay: index * 0.055 },
            flexGrow: { type: "spring", stiffness: 150, damping: 24, mass: 0.85 },
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
        aria-controls={detailsId}
        aria-label={`${active ? "Collapse" : "View"} ${service.name} treatments`}
        onClick={onToggle}
      />

      <div className="panel__media">
        <motion.div className="panel__drift" style={{ x: driftX, y: driftY }}>
          <motion.div
            className="panel__zoom"
            animate={{ scale: active ? 1.04 : 1.005 }}
            transition={{ duration: 1.15, ease: EASE_OUT }}
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1023px) 42vw, 38vw"
              className="panel__image"
              quality={84}
              loading="eager"
              preload={service.id === "skin"}
              fetchPriority={service.id === "skin" ? "high" : "auto"}
            />
          </motion.div>
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
        <p className="panel__descriptor">{service.descriptor}</p>

        <div
          className="panel__details"
          id={detailsId}
          aria-hidden={!active}
          inert={!active}
        >
          <div className="panel__details-inner">
            <ul className="panel__list">
              {service.treatments.map((treatment) => (
                <li key={treatment}>{treatment}</li>
              ))}
            </ul>

            <div className="panel__actions">
              <Magnetic>
                <LiquidMetalButton
                  label={service.bookLabel}
                  onClick={() => {
                    window.location.href = CLINIC.bookingHref;
                  }}
                  variant={service.ctaTheme === "dark" ? "aubergine" : "cream"}
                />
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="panel__rest" aria-hidden="true">
          <span className="panel__arrow">
            <ArrowRight size={18} strokeWidth={1.4} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

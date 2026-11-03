"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "motion/react";

// ============================================================================
// TYPES & DEFAULT DATA
// ============================================================================
export interface Hotspot {
  id: string;
  label: string;
  text: string;
  /** Horizontal position as a percentage (0–100) from the top-left of the image */
  x: number;
  /** Vertical position as a percentage (0–100) from the top-left of the image */
  y: number;
  href: string;
}

export interface FaceRevealProps {
  baseSrc?: string;
  revealSrc?: string;
  hotspots?: Hotspot[];
  /** Diameter of the reveal lens in pixels (default: 180) */
  lensSize?: number;
  /** Shows coordinate logger on click and hotspot name markers (default: false) */
  debug?: boolean;
}

export const DEFAULT_HOTSPOTS: Hotspot[] = [
  { id: "forehead", label: "Forehead", text: "Skin care", x: 50, y: 38, href: "#skin" },
  { id: "eyes", label: "Eyes and brows", text: "Brow and eye-line PMU", x: 50, y: 50, href: "#pmu" },
  { id: "lips", label: "Lips", text: "Lip PMU", x: 50, y: 61, href: "#pmu" },
  { id: "jaw", label: "Jaw and smile", text: "Dental care", x: 50, y: 70, href: "#dental" },
  { id: "hair", label: "Flowers and hair", text: "Hair care", x: 18, y: 41, href: "#hair" },
  { id: "hair2", label: "Flowers and hair", text: "Hair care", x: 79, y: 40, href: "#hair" },
];

// Default resting position for the lens on touch devices (centre of the face)
const REST_X_PERCENT = 50;
const REST_Y_PERCENT = 46;

// ============================================================================
// COMPONENT
// ============================================================================
export default function FaceReveal({
  baseSrc = "/images/mural/skin.webp",
  revealSrc = "/images/mural/anatomy.webp",
  hotspots = DEFAULT_HOTSPOTS,
  lensSize = 180,
  debug = false,
}: FaceRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Active hotspot card state (only one open at a time)
  const [activeId, setActiveId] = useState<string | null>(null);

  // Reduced-motion toggle state
  const [reducedShowReveal, setReducedShowReveal] = useState(false);

  // Tracks whether the current user interaction is via touch
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Debug state for last clicked percentage coordinates
  const [debugClick, setDebugClick] = useState<{ x: number; y: number } | null>(null);

  // --------------------------------------------------------------------------
  // Motion Values & Springs for the X-Ray Lens
  // --------------------------------------------------------------------------
  const baseRadius = lensSize / 2;

  // Pointer coordinates in percentages (0–100) relative to the image frame
  const rawX = useMotionValue(REST_X_PERCENT);
  const rawY = useMotionValue(REST_Y_PERCENT);
  // Lens radius in pixels & opacity (0–1)
  const rawRadius = useMotionValue(baseRadius * 0.75);
  const rawOpacity = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 28, mass: 0.6 };
  const scaleSpringConfig = { stiffness: 220, damping: 24 };

  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springRadius = useSpring(rawRadius, scaleSpringConfig);
  const springOpacity = useSpring(rawOpacity, scaleSpringConfig);

  // Sync Motion springs directly to CSS variables on the reveal layer (zero React re-renders)
  useMotionValueEvent(springX, "change", (val) => {
    revealLayerRef.current?.style.setProperty("--x", `${val}%`);
  });

  useMotionValueEvent(springY, "change", (val) => {
    revealLayerRef.current?.style.setProperty("--y", `${val}%`);
  });

  useMotionValueEvent(springRadius, "change", (val) => {
    revealLayerRef.current?.style.setProperty("--r", `${Math.max(0, val)}px`);
  });

  useMotionValueEvent(springOpacity, "change", (val) => {
    if (revealLayerRef.current) {
      revealLayerRef.current.style.opacity = String(Math.max(0, Math.min(1, val)));
    }
  });

  // Detect coarse pointer (touch screen) on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updateTouchMode = (matches: boolean) => {
      setIsTouchDevice(matches);
      if (matches) {
        rawX.set(REST_X_PERCENT);
        rawY.set(REST_Y_PERCENT);
        rawRadius.set(baseRadius * 0.9);
        rawOpacity.set(0.9);
      } else {
        rawOpacity.set(0);
      }
    };

    updateTouchMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => updateTouchMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [baseRadius, rawOpacity, rawRadius, rawX, rawY]);

  // Close open hotspot card when pressing Escape or clicking outside
  useEffect(() => {
    if (!activeId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };

    const handlePointerDownOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDownOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [activeId]);

  // --------------------------------------------------------------------------
  // Pointer & Touch Handlers
  // --------------------------------------------------------------------------
  const updateLensPosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!frameRef.current || prefersReducedMotion) return;
      const rect = frameRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const xPct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const yPct = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

      rawX.set(xPct);
      rawY.set(yPct);
    },
    [prefersReducedMotion, rawX, rawY],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch") return;
      updateLensPosition(e.clientX, e.clientY);
    },
    [updateLensPosition],
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch" || prefersReducedMotion) return;
      rawRadius.set(baseRadius);
      rawOpacity.set(1);
      updateLensPosition(e.clientX, e.clientY);
    },
    [baseRadius, prefersReducedMotion, rawOpacity, rawRadius, updateLensPosition],
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch" || prefersReducedMotion) return;
      rawRadius.set(baseRadius * 0.75);
      rawOpacity.set(0);
    },
    [baseRadius, prefersReducedMotion, rawOpacity, rawRadius],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const touch = e.touches[0];
      if (touch) updateLensPosition(touch.clientX, touch.clientY);
    },
    [prefersReducedMotion, updateLensPosition],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (debug && frameRef.current) {
        const rect = frameRef.current.getBoundingClientRect();
        const xPct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        const yPct = Math.round(((e.clientY - rect.top) / rect.height) * 100);
        setDebugClick({ x: xPct, y: yPct });
        console.log(`[FaceReveal Debug] Click: x=${xPct}%, y=${yPct}%`);
      }
    },
    [debug],
  );

  // --------------------------------------------------------------------------
  // Hotspot card position — edge-aware
  // --------------------------------------------------------------------------
  const getCardPosition = (spot: Hotspot): React.CSSProperties => {
    const isRight = spot.x > 65;
    const isBottom = spot.y > 60;

    return {
      left: isRight ? "auto" : "50%",
      right: isRight ? "calc(100% + 12px)" : "auto",
      top: isBottom ? "auto" : "calc(100% + 12px)",
      bottom: isBottom ? "calc(100% + 12px)" : "auto",
      transform: isRight ? "translateY(-50%)" : isBottom ? "translateX(-50%)" : "translateX(-50%)",
    };
  };

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  // Reduced-motion fallback
  if (prefersReducedMotion) {
    return (
      <div className="fr-reduced" ref={containerRef} aria-label="Face illustration">
        <div className="fr-reduced__image-wrap">
          <img
            src={reducedShowReveal ? revealSrc : baseSrc}
            alt="Illustrated face showing areas of care"
            className="fr-reduced__img"
            width={454}
            height={900}
          />
        </div>
        <button
          className="fr-reduced__toggle"
          onClick={() => setReducedShowReveal((v) => !v)}
          aria-pressed={reducedShowReveal}
        >
          {reducedShowReveal ? "Show base view" : "Show detail view"}
        </button>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="fr"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image frame — mouse + touch tracking */}
      <div
        ref={frameRef}
        className="fr__frame"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onTouchMove={handleTouchMove}
        onClick={handleClick}
        aria-hidden="true"
      >
        {/* Base layer */}
        <img
          src={baseSrc}
          alt="Illustrated face showing areas of care"
          className="fr__base"
          width={454}
          height={900}
          draggable={false}
        />

        {/* Reveal / anatomy layer — revealed via CSS mask */}
        <div
          ref={revealLayerRef}
          className="fr__reveal"
          style={
            {
              "--x": `${REST_X_PERCENT}%`,
              "--y": `${REST_Y_PERCENT}%`,
              "--r": `${baseRadius * 0.75}px`,
            } as React.CSSProperties
          }
        >
          <img
            src={revealSrc}
            alt=""
            aria-hidden="true"
            className="fr__reveal-img"
            width={454}
            height={900}
            draggable={false}
          />
        </div>

        {/* Debug click indicator */}
        {debug && debugClick && (
          <div
            className="fr__debug-marker"
            style={{ left: `${debugClick.x}%`, top: `${debugClick.y}%` }}
            aria-hidden="true"
          >
            {debugClick.x},{debugClick.y}
          </div>
        )}
      </div>

      {/* Hotspot dots */}
      <div className="fr__dots" aria-label="Service areas">
        {hotspots.map((spot, i) => {
          const isActive = activeId === spot.id;

          return (
            <motion.div
              key={spot.id}
              className="fr__dot-wrap"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                delay: 0.7 + i * 0.12,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* The dot button */}
              <button
                className={`fr__dot ${isActive ? "fr__dot--active" : ""}`}
                aria-label={`${spot.label}: ${spot.text}`}
                aria-expanded={isActive}
                aria-haspopup="true"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveId(spot.id); // Always open, never toggle closed on click
                }}
                onMouseEnter={() => setActiveId(spot.id)}
                onMouseLeave={() => {
                  // Small delay so the user can mouse into the card
                  setTimeout(() => {
                    setActiveId((current) => (current === spot.id ? null : current));
                  }, 150);
                }}
                onFocus={() => setActiveId(spot.id)}
                onBlur={() => setActiveId(null)}
              >
                <span className="fr__dot-ring" aria-hidden="true" />
              </button>

              {/* Debug label */}
              {debug && (
                <span className="fr__debug-label" aria-hidden="true">
                  {spot.id}({spot.x},{spot.y})
                </span>
              )}

              {/* Popover card */}
              {isActive && (
                <motion.div
                  className="fr__card"
                  role="tooltip"
                  id={`fr-card-${spot.id}`}
                  style={getCardPosition(spot)}
                  initial={{ opacity: 0, scale: 0.88, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: 6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onMouseEnter={() => setActiveId(spot.id)}
                  onMouseLeave={() => setActiveId(null)}
                >
                  <p className="fr__card-label">{spot.label}</p>
                  <p className="fr__card-text">{spot.text}</p>
                  <a href={spot.href} className="fr__card-link">
                    Learn more
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 6h7M6.5 3l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

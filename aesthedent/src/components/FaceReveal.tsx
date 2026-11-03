"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useVelocity,
} from "motion/react";
import JewellersLoupe from "./mural/JewellersLoupe";
import BotanicalLeaderLine from "./mural/BotanicalLeaderLine";
import AnatomyCalloutOverlay from "./mural/AnatomyCalloutOverlay";
import {
  DEFAULT_HOTSPOTS,
  ANATOMY_LANDMARKS,
  Hotspot,
  AnatomyLandmark,
} from "@/data/faceAnatomyData";

// ============================================================================
// TYPES & PROPS
// ============================================================================
export interface FaceRevealProps {
  baseSrc?: string;
  revealSrc?: string;
  hotspots?: Hotspot[];
  /** Diameter of the reveal lens in pixels (default: 180) */
  lensSize?: number;
  /** Shows coordinate logger on click (default: false) */
  debug?: boolean;
}

// Default resting position for the lens
const REST_X_PERCENT = 50;
const REST_Y_PERCENT = 48;

type ViewMode = "services" | "anatomy";

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
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  // View mode: Clinical Services vs. Authentic Clinic Wall Anatomy Mural
  const [viewMode, setViewMode] = useState<ViewMode>("services");

  // Active hotspot card state
  const [activeId, setActiveId] = useState<string | null>(null);

  // Active anatomy landmark (from mural overlay or label hover)
  const [activeLandmarkId, setActiveLandmarkId] = useState<string | null>(null);

  // Reduced-motion toggle state
  const [reducedShowReveal, setReducedShowReveal] = useState(false);

  // Tracks whether user has manually interacted
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debug state for clicked percentage coordinates
  const [debugClick, setDebugClick] = useState<{ x: number; y: number } | null>(null);

  // --------------------------------------------------------------------------
  // Motion Values & Springs for the X-Ray Lens
  // --------------------------------------------------------------------------
  const baseRadius = lensSize / 2;

  // Pointer coordinates in percentages (0–100)
  const rawX = useMotionValue(REST_X_PERCENT);
  const rawY = useMotionValue(REST_Y_PERCENT);

  // Lens radius in pixels & opacity
  const rawRadius = useMotionValue(baseRadius);
  const rawOpacity = useMotionValue(0.85);

  // Primary lens springs (snappy, buttery)
  const springConfig = { stiffness: 240, damping: 26, mass: 0.6 };
  const scaleSpringConfig = { stiffness: 200, damping: 24 };

  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springRadius = useSpring(rawRadius, scaleSpringConfig);
  const springOpacity = useSpring(rawOpacity, scaleSpringConfig);

  // Secondary softer spring for Jeweller's Loupe parallax
  const loupeSpringConfig = { stiffness: 170, damping: 22, mass: 0.8 };
  const loupeX = useSpring(rawX, loupeSpringConfig);
  const loupeY = useSpring(rawY, loupeSpringConfig);

  // --------------------------------------------------------------------------
  // Feature 4: Velocity-Reactive Lens (Shrinks on fast swipe, blooms on pause)
  // --------------------------------------------------------------------------
  const velX = useVelocity(springX);
  const velY = useVelocity(springY);

  useMotionValueEvent(velX, "change", () => {
    if (prefersReducedMotion || !isUserInteracting) return;
    const vx = velX.get();
    const vy = velY.get();
    const speed = Math.sqrt(vx * vx + vy * vy);

    if (speed > 160) {
      // Fast movement: compress radius slightly for precision feel
      rawRadius.set(baseRadius * 0.88);
    } else if (speed < 15 && isUserInteracting) {
      // Paused / slow inspection: bloom outward
      rawRadius.set(activeId ? baseRadius * 1.25 : baseRadius * 1.08);
    }
  });

  // Sync Motion springs directly to CSS variables on the reveal layer
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

  // --------------------------------------------------------------------------
  // Feature 1: Ambient "Discovery Drift" (Figure-8 Choreography When Idle)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;

    let animFrame: number;
    let startTime: number | null = null;

    const driftLoop = (timestamp: number) => {
      if (!isUserInteracting) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // Hypnotic Lissajous drift curve across key anatomical facial zones
        const targetX = 50 + 13 * Math.sin(elapsed * 0.0009);
        const targetY = 50 + 9 * Math.cos(elapsed * 0.0016);

        rawX.set(targetX);
        rawY.set(targetY);
        rawRadius.set(baseRadius * 0.95);
        rawOpacity.set(0.85);
      }
      animFrame = requestAnimationFrame(driftLoop);
    };

    animFrame = requestAnimationFrame(driftLoop);
    return () => cancelAnimationFrame(animFrame);
  }, [baseRadius, isInView, isUserInteracting, prefersReducedMotion, rawOpacity, rawRadius, rawX, rawY]);

  // Helper to mark user interaction and restart idle countdown
  const noteUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4500); // 4.5s idle threshold before resuming discovery drift
  }, []);

  // --------------------------------------------------------------------------
  // Feature 2: Magnetic Hotspot Snap & Guided Focus
  // --------------------------------------------------------------------------
  const snapToHotspot = useCallback(
    (spot: Hotspot) => {
      noteUserInteraction();
      setActiveId(spot.id);
      setActiveLandmarkId(null);
      rawX.set(spot.x);
      rawY.set(spot.y);
      rawRadius.set(baseRadius * 1.25); // Bloom on focus
      rawOpacity.set(1);
    },
    [baseRadius, noteUserInteraction, rawOpacity, rawRadius, rawX, rawY],
  );

  const snapToLandmark = useCallback(
    (lm: AnatomyLandmark) => {
      noteUserInteraction();
      setActiveLandmarkId(lm.id);
      setActiveId(null);
      rawX.set(lm.origin.x);
      rawY.set(lm.origin.y);
      rawRadius.set(baseRadius * 1.2);
      rawOpacity.set(1);
    },
    [baseRadius, noteUserInteraction, rawOpacity, rawRadius, rawX, rawY],
  );

  // Close open hotspot card when pressing Escape or clicking outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveId(null);
        setActiveLandmarkId(null);
      }
    };

    const handlePointerDownOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveId(null);
        setActiveLandmarkId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDownOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, []);

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
      noteUserInteraction();
      updateLensPosition(e.clientX, e.clientY);
    },
    [noteUserInteraction, updateLensPosition],
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch" || prefersReducedMotion) return;
      noteUserInteraction();
      rawRadius.set(baseRadius);
      rawOpacity.set(1);
      updateLensPosition(e.clientX, e.clientY);
    },
    [baseRadius, noteUserInteraction, prefersReducedMotion, rawOpacity, rawRadius, updateLensPosition],
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch" || prefersReducedMotion) return;
      if (!activeId && !activeLandmarkId) {
        rawRadius.set(baseRadius * 0.85);
      }
    },
    [activeId, activeLandmarkId, baseRadius, rawRadius],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      noteUserInteraction();
      const touch = e.touches[0];
      if (touch) updateLensPosition(touch.clientX, touch.clientY);
    },
    [noteUserInteraction, prefersReducedMotion, updateLensPosition],
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

  // Active spot info
  const activeSpot = useMemo(
    () => hotspots.find((s) => s.id === activeId),
    [activeId, hotspots],
  );

  // --------------------------------------------------------------------------
  // Hotspot Card Positioning
  // --------------------------------------------------------------------------
  const isRightCard = activeSpot ? activeSpot.x > 62 : false;
  const isBottomCard = activeSpot ? activeSpot.y > 60 : false;

  const getCardStyle = (spot: Hotspot): React.CSSProperties => {
    const isRight = spot.x > 62;
    const isBottom = spot.y > 60;

    return {
      left: isRight ? "auto" : "50%",
      right: isRight ? "calc(100% + 18px)" : "auto",
      top: isBottom ? "auto" : "calc(100% + 16px)",
      bottom: isBottom ? "calc(100% + 16px)" : "auto",
      transform: isRight ? "translateY(-50%)" : isBottom ? "translateX(-50%)" : "translateX(-50%)",
    };
  };

  // --------------------------------------------------------------------------
  // Render: Reduced Motion Fallback
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------
  return (
    <motion.div
      ref={containerRef}
      className={`fr ${viewMode === "anatomy" ? "fr--anatomy-mode" : ""}`}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Arched Illustration Frame (Bounds for interaction & overlays) */}
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
        {/* Arched Window (Strictly clips only the base image & X-ray reveal layer) */}
        <div className="fr__window">
          {/* Base skin illustration */}
          <img
            src={baseSrc}
            alt="Illustrated face showing areas of care"
            className="fr__base"
            width={454}
            height={900}
            draggable={false}
          />

          {/* Anatomy reveal layer — revealed via CSS mask */}
          <div
            ref={revealLayerRef}
            className="fr__reveal"
            style={
              {
                "--x": `${REST_X_PERCENT}%`,
                "--y": `${REST_Y_PERCENT}%`,
                "--r": `${baseRadius}px`,
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
        </div>

        {/* Feature 3: Dual-Spring Jeweller's Loupe with Rotating Micro-Type */}
        <JewellersLoupe
          x={loupeX}
          y={loupeY}
          radius={springRadius}
          opacity={springOpacity}
        />

        {/* Feature 5: Botanical Plate Leader Line for Active Hotspot */}
        <AnimatePresence>
          {activeSpot && (
            <BotanicalLeaderLine
              startX={activeSpot.x}
              startY={activeSpot.y}
              isRight={isRightCard}
              isBottom={isBottomCard}
            />
          )}
        </AnimatePresence>

        {/* Authentic Clinic Wall Mural Anatomy Callout Overlay (Unclipped, 3D Pop-Out) */}
        <AnimatePresence>
          {viewMode === "anatomy" && (
            <AnatomyCalloutOverlay
              lensX={springX}
              lensY={springY}
              activeLandmarkId={activeLandmarkId}
              onSelectLandmark={snapToLandmark}
              onHoverLandmark={setActiveLandmarkId}
            />
          )}
        </AnimatePresence>

        {/* Debug Click Indicator */}
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

      {/* Clinical Service Hotspot Dots */}
      {viewMode === "services" && (
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
                  delay: 0.5 + i * 0.1,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Magnetic Interactive Dot */}
                <button
                  className={`fr__dot ${isActive ? "fr__dot--active" : ""}`}
                  aria-label={`${spot.label}: ${spot.text}`}
                  aria-expanded={isActive}
                  aria-haspopup="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    snapToHotspot(spot);
                  }}
                  onMouseEnter={() => snapToHotspot(spot)}
                  onFocus={() => snapToHotspot(spot)}
                >
                  <span className="fr__dot-ring" aria-hidden="true" />
                </button>

                {/* Popover Card */}
                {isActive && (
                  <motion.div
                    className="fr__card"
                    role="tooltip"
                    id={`fr-card-${spot.id}`}
                    style={getCardStyle(spot)}
                    initial={{ opacity: 0, scale: 0.88, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: 6 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <p className="fr__card-label">{spot.label}</p>
                    <p className="fr__card-text">{spot.text}</p>
                    <a href={spot.href} className="fr__card-link">
                      Explore care
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
      )}

      {/* Feature 6: Interactive "Guided Tour" Pill Bar Under the Arch */}
      <div className="fr-tour" aria-label="Interactive guide">
        <div className="fr-tour__pills">
          <button
            className={`fr-tour__pill ${viewMode === "services" && activeId === "forehead" ? "fr-tour__pill--active" : ""
              }`}
            onClick={() => {
              setViewMode("services");
              const spot = hotspots.find((h) => h.id === "forehead");
              if (spot) snapToHotspot(spot);
            }}
          >
            Skin
          </button>

          <button
            className={`fr-tour__pill ${viewMode === "services" && (activeId === "eyes" || activeId === "lips")
                ? "fr-tour__pill--active"
                : ""
              }`}
            onClick={() => {
              setViewMode("services");
              const spot = hotspots.find((h) => h.id === "eyes");
              if (spot) snapToHotspot(spot);
            }}
          >
            PMU
          </button>

          <button
            className={`fr-tour__pill ${viewMode === "services" && activeId === "jaw" ? "fr-tour__pill--active" : ""
              }`}
            onClick={() => {
              setViewMode("services");
              const spot = hotspots.find((h) => h.id === "jaw");
              if (spot) snapToHotspot(spot);
            }}
          >
            Dental
          </button>

          <button
            className={`fr-tour__pill ${viewMode === "services" && activeId === "hair" ? "fr-tour__pill--active" : ""
              }`}
            onClick={() => {
              setViewMode("services");
              const spot = hotspots.find((h) => h.id === "hair");
              if (spot) snapToHotspot(spot);
            }}
          >
            Hair
          </button>

          {/* Mode Switcher Pill: Clinic Wall Mural View */}
          <button
            className={`fr-tour__pill fr-tour__pill--mural ${viewMode === "anatomy" ? "fr-tour__pill--active" : ""
              }`}
            onClick={() => {
              setViewMode((m) => (m === "anatomy" ? "services" : "anatomy"));
              noteUserInteraction();
              rawRadius.set(baseRadius * 1.15);
            }}
            title="Toggle authentic clinic wall mural with vascular & muscular labelling"
          >
            <span className="fr-tour__mural-icon" aria-hidden="true">✦</span>
            Clinic Mural View
          </button>
        </div>
      </div>
    </motion.div>
  );
}

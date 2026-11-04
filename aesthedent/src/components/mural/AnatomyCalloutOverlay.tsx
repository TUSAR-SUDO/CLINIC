"use client";

import React from "react";
import { motion, MotionValue, useMotionValueEvent } from "motion/react";
import { ANATOMY_LANDMARKS, AnatomyLandmark } from "@/data/faceAnatomyData";

interface AnatomyCalloutOverlayProps {
  lensX: MotionValue<number>;
  lensY: MotionValue<number>;
  activeLandmarkId: string | null;
  onSelectLandmark: (landmark: AnatomyLandmark) => void;
  onHoverLandmark: (id: string | null) => void;
}

export default function AnatomyCalloutOverlay({
  lensX,
  lensY,
  activeLandmarkId,
  onSelectLandmark,
  onHoverLandmark,
}: AnatomyCalloutOverlayProps) {
  // Proximity highlight tracking state
  const [nearbyId, setNearbyId] = React.useState<string | null>(null);

  // Compute distance between lens and landmarks without unnecessary re-renders
  useMotionValueEvent(lensX, "change", (currX) => {
    const currY = lensY.get();
    let closestId: string | null = null;
    let minDistance = 15; // percentage radius for proximity illumination

    for (const lm of ANATOMY_LANDMARKS) {
      const dx = currX - lm.origin.x;
      const dy = currY - lm.origin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDistance) {
        minDistance = dist;
        closestId = lm.id;
      }
    }

    if (closestId !== nearbyId) {
      setNearbyId(closestId);
    }
  });

  return (
    <div className="fr-anatomy-overlay" aria-label="Facial anatomy callouts">
      {/* SVG Leader Lines */}
      <svg
        className="fr-anatomy-lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="fr-vein-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="0.8" floodColor="#3D6BB3" floodOpacity="0.6" />
          </filter>
          <filter id="fr-muscle-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="0.8" floodColor="#C45B72" floodOpacity="0.6" />
          </filter>
        </defs>

        {ANATOMY_LANDMARKS.map((lm, idx) => {
          const isHighlighted = lm.id === activeLandmarkId || lm.id === nearbyId;
          const isVein = lm.category === "vein";

          // Calculate an elbow point for architectural callout line
          const elbowX = lm.side === "left"
            ? lm.origin.x - (lm.origin.x - lm.target.x) * 0.55
            : lm.origin.x + (lm.target.x - lm.origin.x) * 0.55;
          const elbowY = lm.target.y;

          const strokeColor = isHighlighted
            ? isVein ? "#27509B" : "#A62B46"
            : isVein ? "rgba(75, 115, 175, 0.45)" : "rgba(185, 100, 115, 0.45)";

          return (
            <g key={lm.id} className="fr-anatomy-line-group">
              {/* Landmark origin pinpoint on face */}
              <circle
                cx={lm.origin.x}
                cy={lm.origin.y}
                r={isHighlighted ? 0.95 : 0.6}
                fill={isHighlighted ? (isVein ? "#1E3D75" : "#8A1830") : strokeColor}
              />

              {/* Connecting leader line extending out to arch edge */}
              <motion.path
                d={`M ${lm.origin.x} ${lm.origin.y} L ${elbowX} ${elbowY} L ${lm.target.x} ${lm.target.y}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isHighlighted ? 0.65 : 0.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={isHighlighted ? (isVein ? "url(#fr-vein-glow)" : "url(#fr-muscle-glow)") : undefined}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 + idx * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              {/* Terminal tick on arch edge where label anchors */}
              <circle
                cx={lm.target.x}
                cy={lm.target.y}
                r={isHighlighted ? 0.75 : 0.45}
                fill={strokeColor}
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Callout Labels (Left fans out left, Right fans out right) */}
      <div className="fr-anatomy-labels">
        {ANATOMY_LANDMARKS.map((lm) => {
          const isHighlighted = lm.id === activeLandmarkId || lm.id === nearbyId;

          return (
            <motion.button
              key={lm.id}
              className={`fr-anatomy-label fr-anatomy-label--${lm.side} ${isHighlighted ? "fr-anatomy-label--active" : ""
                } fr-anatomy-label--${lm.category}`}
              style={{
                left: `${lm.target.x}%`,
                top: `${lm.target.y}%`,
              }}
              onClick={() => onSelectLandmark(lm)}
              onMouseEnter={() => onHoverLandmark(lm.id)}
              onMouseLeave={() => onHoverLandmark(null)}
              aria-label={`${lm.name} (${lm.latinName})`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                zIndex: isHighlighted ? 60 : 15,
              }}
              transition={{ duration: 0.25 }}
            >
              <span className="fr-anatomy-label__name">{lm.name}</span>
              {isHighlighted && (
                <span className="fr-anatomy-label__latin">{lm.latinName}</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

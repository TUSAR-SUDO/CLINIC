"use client";

import React from "react";
import { motion } from "motion/react";

interface BotanicalLeaderLineProps {
  startX: number; // in %
  startY: number; // in %
  isRight: boolean;
  isBottom: boolean;
}

export default function BotanicalLeaderLine({
  startX,
  startY,
  isRight,
  isBottom,
}: BotanicalLeaderLineProps) {
  // Compute SVG elbow path based on card orientation
  const deltaX = isRight ? -16 : 16;
  const deltaY = isBottom ? 14 : -14;
  const elbowX = startX + deltaX * 0.45;
  const elbowY = startY + deltaY * 0.35;
  const endX = startX + deltaX;
  const endY = startY + deltaY;

  return (
    <svg
      className="fr-leader-line"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="fr-botanical-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodColor="#D9A79E" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Origin pinpoint dot */}
      <circle cx={startX} cy={startY} r="0.8" fill="#3A1530" />

      {/* Architectural elbow leader line */}
      <motion.path
        d={`M ${startX} ${startY} L ${elbowX} ${elbowY} L ${endX} ${endY}`}
        fill="none"
        stroke="#D9A79E"
        strokeWidth="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#fr-botanical-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Terminal anchor tick */}
      <motion.circle
        cx={endX}
        cy={endY}
        r="0.55"
        fill="#D9A79E"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.22, duration: 0.15 }}
      />
    </svg>
  );
}

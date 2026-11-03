"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "motion/react";

interface JewellersLoupeProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  radius: MotionValue<number>;
  opacity: MotionValue<number>;
}

export default function JewellersLoupe({
  x,
  y,
  radius,
  opacity,
}: JewellersLoupeProps) {
  // Map percentages to CSS transform translate
  const leftStyle = useTransform(x, (v) => `${v}%`);
  const topStyle = useTransform(y, (v) => `${v}%`);

  return (
    <motion.div
      className="fr-loupe"
      style={{
        left: leftStyle,
        top: topStyle,
        opacity,
      }}
      aria-hidden="true"
    >
      <motion.svg
        className="fr-loupe__svg"
        viewBox="-120 -120 240 240"
        style={{
          width: useTransform(radius, (r) => `${r * 2.1}px`),
          height: useTransform(radius, (r) => `${r * 2.1}px`),
        }}
      >
        <defs>
          {/* Circular path for the micro-type ring */}
          <path
            id="fr-loupe-circle-path"
            d="M 0, -84 A 84,84 0 1,1 0, 84 A 84,84 0 1,1 0, -84"
            fill="none"
          />
          <linearGradient id="fr-loupe-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D9A79E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C4887D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D9A79E" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Outer jeweller's delicate rim */}
        <circle
          cx="0"
          cy="0"
          r="92"
          fill="none"
          stroke="url(#fr-loupe-grad)"
          strokeWidth="1"
          strokeDasharray="4 2"
          opacity="0.8"
        />

        {/* Main lens bezel */}
        <circle
          cx="0"
          cy="0"
          r="86"
          fill="none"
          stroke="#D9A79E"
          strokeWidth="1.2"
          opacity="0.9"
        />

        {/* Rotating micro-type ring */}
        <g className="fr-loupe__rotating-text">
          <text
            className="fr-loupe__text"
            fontSize="7.5"
            letterSpacing="2.5"
            fill="#3A1530"
            opacity="0.75"
          >
            <textPath
              href="#fr-loupe-circle-path"
              startOffset="0%"
            >
              • ART &amp; SCIENCE • AESTHEDENT CLINIC • CLINICAL PRECISION •
            </textPath>
          </text>
        </g>

        {/* Delicate cardinal ticks */}
        <line x1="0" y1="-95" x2="0" y2="-88" stroke="#D9A79E" strokeWidth="1.2" />
        <line x1="0" y1="88" x2="0" y2="95" stroke="#D9A79E" strokeWidth="1.2" />
        <line x1="-95" y1="0" x2="-88" y2="0" stroke="#D9A79E" strokeWidth="1.2" />
        <line x1="88" y1="0" x2="95" y2="0" stroke="#D9A79E" strokeWidth="1.2" />
      </motion.svg>
    </motion.div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Sparkles,
  ShieldCheck,
  Eye,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Info,
} from "lucide-react";

export interface SpaceHotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  detail: string;
}

export interface ClinicSpace {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  hotspots: SpaceHotspot[];
}

export const CLINIC_SPACES: ClinicSpace[] = [
  {
    id: "lounge",
    title: "The Welcome Lounge",
    subtitle: "Acoustic Serenity & Calm Check-in",
    description:
      "Designed with natural French limestone, gentle indirect lighting, and acoustic dampening to immediately quiet the mind before your consultation begins.",
    image: "/images/skin/how-visit.png",
    imageAlt: "Aesthedent welcome lounge and consultation area",
    tags: ["Acoustic dampening", "Botanical air filtration", "Private intake"],
    hotspots: [
      {
        id: "lounge-light",
        x: 48,
        y: 28,
        label: "Diffused Daylighting",
        detail: "Eliminates clinical glare to foster an unhurried, reassuring consultation atmosphere.",
      },
      {
        id: "lounge-intake",
        x: 74,
        y: 65,
        label: "Discreet Intake",
        detail: "Private 1-on-1 discussion alcoves where treatment history and goals stay confidential.",
      },
    ],
  },
  {
    id: "dental-suite",
    title: "Dental Aesthetics Suite",
    subtitle: "Digital Precision & Ergonomic Comfort",
    description:
      "Equipped with contour-molded memory foam dental chairs, digital intraoral 3D scanners, and ceiling monitors for a transparent, stress-free smile design experience.",
    image: "/images/dental/dental-chair.png",
    imageAlt: "Advanced dental treatment chair in Aesthedent clinic",
    tags: ["Memory foam comfort", "Low-noise turbines", "Digital 3D scanning"],
    hotspots: [
      {
        id: "dental-chair",
        x: 35,
        y: 54,
        label: "Ergonomic Dental Chair",
        detail: "Designed to relieve neck and lower back pressure during cosmetic and restorative visits.",
      },
      {
        id: "dental-scanner",
        x: 62,
        y: 38,
        label: "Intraoral 3D Camera",
        detail: "Captures instant digital 3D teeth scans—no uncomfortable traditional putty impressions.",
      },
    ],
  },
  {
    id: "skin-studio",
    title: "Skin & Laser Studio",
    subtitle: "Medical Hygiene & FDA-Cleared Lasers",
    description:
      "A dedicated aesthetic dermatology suite for targeted acne care, pigmentation therapy, medical facials, and collagen rejuvenation planned around individual skin biology.",
    image: "/images/services/skin.png",
    imageAlt: "Medical aesthetic skin care suite",
    tags: ["US-FDA cleared lasers", "Sterile barrier prep", "Chilled handpieces"],
    hotspots: [
      {
        id: "skin-laser",
        x: 52,
        y: 42,
        label: "Targeted Laser Console",
        detail: "Precision wavelength control for hyperpigmentation, acne scarring, and gentle resurfacing.",
      },
      {
        id: "skin-prep",
        x: 28,
        y: 68,
        label: "Sterile Preparation Station",
        detail: "Every medical facial serum and needle is vacuum-sealed and inspected before use.",
      },
    ],
  },
  {
    id: "pmu-studio",
    title: "PMU & Facial Studio",
    subtitle: "Calibrated Lighting & Micro-Sterile Art",
    description:
      "The home of semi-permanent brows, lips, and eyeliner. Features color-calibrated 5500K daylighting so pigments match your exact skin undertones under real sun.",
    image: "/images/mural/skin.webp",
    imageAlt: "Aesthedent PMU facial mapping and mural suite",
    tags: ["5500K True-Light", "Micro-precision needles", "Custom pigment mixing"],
    hotspots: [
      {
        id: "pmu-mapping",
        x: 50,
        y: 38,
        label: "Surgical Facial Mapping",
        detail: "Symmetry and bone structure mapped with micrometers before any pigment is placed.",
      },
      {
        id: "pmu-pigments",
        x: 22,
        y: 50,
        label: "Bio-Compatible Pigments",
        detail: "Heavy-metal-free, medical-grade organic pigments that fade naturally without color turning.",
      },
    ],
  },
  {
    id: "sterilization-lab",
    title: "Sterilization & Safety Lab",
    subtitle: "Hospital-Grade Class-B Autoclave Protocol",
    description:
      "The clinical heart of Aesthedent. Operating on international hospital sterilization protocols with automated multi-cycle ultrasonic washing, vacuum autoclaving, and pouch sealing.",
    image: "/images/dental/botanical-shadow.png",
    imageAlt: "Clinical hygiene and sterilization protocols at Aesthedent",
    tags: ["Class-B vacuum autoclave", "Sealed pouches", "Daily biological spore tests"],
    hotspots: [
      {
        id: "autoclave-cycle",
        x: 48,
        y: 45,
        label: "Class-B Vacuum Autoclave",
        detail: "Hospital standard 134°C pressurized steam eliminates 100% of bacterial and viral spores.",
      },
      {
        id: "sterile-pouch",
        x: 68,
        y: 72,
        label: "Vacuum-Sealed Pouches",
        detail: "Each tool kit is individually sealed and unsealed exclusively in front of the patient.",
      },
    ],
  },
];

export default function ClinicSpacesTour() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const currentSpace = CLINIC_SPACES[activeIndex];

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        // Next
        setActiveIndex((prev) => (prev + 1) % CLINIC_SPACES.length);
        setActiveHotspot(null);
      } else {
        // Prev
        setActiveIndex((prev) => (prev - 1 + CLINIC_SPACES.length) % CLINIC_SPACES.length);
        setActiveHotspot(null);
      }
    }
  };

  return (
    <section className="clinic-spaces" aria-labelledby="clinic-spaces-title">
      <div className="clinic-spaces__inner">
        {/* Header */}
        <div className="clinic-spaces__head">
          <div className="clinic-spaces__head-left">
            <p className="clinic-spaces__kicker">
              <Sparkles size={13} aria-hidden="true" />
              <span>The Clinic Experience</span>
            </p>
            <h2 id="clinic-spaces-title" className="clinic-spaces__title">
              Spaces designed for <em>calm and precision.</em>
            </h2>
          </div>
          <p className="clinic-spaces__head-copy">
            Every room at Aesthedent was built from scratch in Old Town to balance medical-grade
            hygiene with an unhurried, reassuring ambiance. Take a virtual look inside.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="clinic-spaces__tabs" role="tablist" aria-label="Clinic spaces">
          {CLINIC_SPACES.map((space, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={space.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                className={`clinic-spaces__tab ${isSelected ? "clinic-spaces__tab--active" : ""}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setActiveHotspot(null);
                }}
              >
                <span className="clinic-spaces__tab-num">{String(idx + 1).padStart(2, "0")}</span>
                <span className="clinic-spaces__tab-label">{space.title}</span>
                {isSelected && (
                  <motion.span
                    className="clinic-spaces__tab-indicator"
                    layoutId="clinic-space-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Showcase Stage */}
        <div
          className="clinic-spaces__stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpace.id}
              className="clinic-spaces__card"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Media Column with Interactive Hotspots */}
              <div className="clinic-spaces__media">
                <div className="clinic-spaces__frame">
                  <Image
                    src={currentSpace.image}
                    alt={currentSpace.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    className="clinic-spaces__img"
                    priority
                  />
                  <div className="clinic-spaces__scrim" aria-hidden="true" />

                  {/* Hotspots */}
                  {currentSpace.hotspots.map((spot) => {
                    const isOpen = activeHotspot === spot.id;
                    return (
                      <div
                        key={spot.id}
                        className="clinic-spaces__hotspot-wrap"
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      >
                        <button
                          type="button"
                          className={`clinic-spaces__hotspot-pin ${
                            isOpen ? "clinic-spaces__hotspot-pin--active" : ""
                          }`}
                          aria-label={`View detail: ${spot.label}`}
                          aria-expanded={isOpen}
                          onClick={() => setActiveHotspot(isOpen ? null : spot.id)}
                        >
                          <span className="clinic-spaces__hotspot-ring" />
                          <span className="clinic-spaces__hotspot-dot" />
                        </button>

                        {/* Detail Popover Card */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              className="clinic-spaces__popover"
                              initial={{ opacity: 0, scale: 0.92, y: 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.92, y: 6 }}
                              transition={{ duration: 0.22 }}
                            >
                              <div className="clinic-spaces__popover-head">
                                <Info size={12} strokeWidth={2} />
                                <strong>{spot.label}</strong>
                              </div>
                              <p className="clinic-spaces__popover-body">{spot.detail}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="clinic-spaces__hint">
                  <Eye size={13} aria-hidden="true" />
                  <span>Tap glowing pins to inspect clinical features</span>
                </div>
              </div>

              {/* Copy & Details Column */}
              <div className="clinic-spaces__body">
                <div className="clinic-spaces__meta-strip">
                  <span className="clinic-spaces__number">
                    {String(activeIndex + 1).padStart(2, "0")} / 05
                  </span>
                  <span className="clinic-spaces__badge">
                    <ShieldCheck size={13} />
                    Clinical Safety Standard
                  </span>
                </div>

                <h3 className="clinic-spaces__room-title">{currentSpace.title}</h3>
                <p className="clinic-spaces__room-subtitle">{currentSpace.subtitle}</p>

                <p className="clinic-spaces__room-desc">{currentSpace.description}</p>

                <div className="clinic-spaces__tags" aria-label="Room equipment & features">
                  {currentSpace.tags.map((tag) => (
                    <span key={tag} className="clinic-spaces__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="clinic-spaces__nav">
                  <button
                    type="button"
                    className="clinic-spaces__nav-btn"
                    onClick={() => {
                      setActiveIndex(
                        (prev) => (prev - 1 + CLINIC_SPACES.length) % CLINIC_SPACES.length
                      );
                      setActiveHotspot(null);
                    }}
                    aria-label="Previous space"
                  >
                    <ChevronLeft size={18} strokeWidth={1.8} />
                  </button>
                  <span className="clinic-spaces__nav-count">
                    {activeIndex + 1} of {CLINIC_SPACES.length}
                  </span>
                  <button
                    type="button"
                    className="clinic-spaces__nav-btn"
                    onClick={() => {
                      setActiveIndex((prev) => (prev + 1) % CLINIC_SPACES.length);
                      setActiveHotspot(null);
                    }}
                    aria-label="Next space"
                  >
                    <ChevronRight size={18} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

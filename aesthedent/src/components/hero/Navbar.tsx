"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Menu } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { LiquidNavbar, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import SiteMenu from "@/components/site/SiteMenu";
import Logo from "./Logo";
import Magnetic from "./Magnetic";

const DESKTOP_NAV_ITEMS: LiquidNavItem[] = [
  { label: "Dental", fx: "glow" },
  { label: "Skin", fx: "drop" },
  { label: "Hair", fx: "wave" },
  { label: "PMU", fx: "pop" },
  { label: "Doctors", href: "#doctors", fx: "glow" },
  { label: "Contact", href: "#clinic-info", fx: "drop" },
];

const MOBILE_NAV_ITEMS: LiquidNavItem[] = [
  { label: "Dental", fx: "glow" },
  { label: "Skin", fx: "drop" },
  { label: "Hair", fx: "wave" },
  { label: "PMU", fx: "pop" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const [activeNavIndex, setActiveNavIndex] = useState(1); // 1 = Skin (default expanded)
  const [mobileNavIndex, setMobileNavIndex] = useState(1);

  useEffect(() => {
    const handleSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        const key = customEvent.detail.toLowerCase();
        const dIdx = DESKTOP_NAV_ITEMS.findIndex(
          (item) => item.label.toLowerCase() === key,
        );
        if (dIdx !== -1) setActiveNavIndex(dIdx);
        const mIdx = MOBILE_NAV_ITEMS.findIndex(
          (item) => item.label.toLowerCase() === key,
        );
        if (mIdx !== -1) setMobileNavIndex(mIdx);
      }
    };
    window.addEventListener("aesthedent:select-service", handleSelect);
    window.addEventListener("aesthedent:preview-service", handleSelect);
    return () => {
      window.removeEventListener("aesthedent:select-service", handleSelect);
      window.removeEventListener("aesthedent:preview-service", handleSelect);
    };
  }, []);

  const handleNavChange = (index: number, item: LiquidNavItem) => {
    setActiveNavIndex(index);
    const serviceKey = item.label.toLowerCase();
    const mIdx = MOBILE_NAV_ITEMS.findIndex(
      (m) => m.label.toLowerCase() === serviceKey,
    );
    if (mIdx !== -1) setMobileNavIndex(mIdx);

    if (["dental", "skin", "hair", "pmu"].includes(serviceKey)) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("aesthedent:select-service", {
            detail: serviceKey,
          }),
        );
      }
    } else if (serviceKey === "doctors") {
      const el = document.getElementById("doctors");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (serviceKey === "contact") {
      const el = document.getElementById("clinic-info");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleMobileNavChange = (index: number, item: LiquidNavItem) => {
    setMobileNavIndex(index);
    const serviceKey = item.label.toLowerCase();
    const dIdx = DESKTOP_NAV_ITEMS.findIndex(
      (d) => d.label.toLowerCase() === serviceKey,
    );
    if (dIdx !== -1) setActiveNavIndex(dIdx);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aesthedent:select-service", {
          detail: serviceKey,
        }),
      );
    }
  };

  const transition = reduceMotion
    ? { duration: 0.18 }
    : { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.header
      ref={headerRef}
      className="hero__nav js-reveal"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: reduceMotion ? 0 : 0.82 }}
      onAnimationComplete={() => {
        // Drop the transform so no fixed child is ever trapped in this header.
        headerRef.current?.style.setProperty("transform", "none");
      }}
    >
      <div className="hero__nav-main">
        <Logo />

        <div className="nav-center-wrapper">
          <LiquidNavbar
            items={DESKTOP_NAV_ITEMS}
            active={activeNavIndex}
            onChange={handleNavChange}
            tone="light"
            sound={false}
          />
        </div>

        <div className="nav-cta">
          <Magnetic>
            <LiquidMetalButton
              label="Book a visit"
              href={CLINIC.bookingHref}
            />
          </Magnetic>
        </div>

        <button
          type="button"
          className="nav-menu"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={19} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>

      <div className="hero__nav-mobile-strip" aria-label="Quick category navigation">
        <LiquidNavbar
          items={MOBILE_NAV_ITEMS}
          active={mobileNavIndex}
          onChange={handleMobileNavChange}
          tone="light"
          sound={false}
        />
      </div>

      <SiteMenu open={open} onClose={closeMenu} items={CLINIC.nav} />
    </motion.header>
  );
}

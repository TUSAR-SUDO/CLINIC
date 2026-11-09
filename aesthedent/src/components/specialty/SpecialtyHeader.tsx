"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Menu } from "lucide-react";
import Logo from "@/components/hero/Logo";
import Magnetic from "@/components/hero/Magnetic";
import SiteMenu from "@/components/site/SiteMenu";
import {
  LiquidNavbar,
  NimbusIcons,
  type LiquidNavItem,
} from "@/components/ui/liquid-glass-navbar";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { CLINIC } from "@/lib/clinic";
import type { SpecialtyContent } from "@/lib/specialty";

const NAV_ITEMS: LiquidNavItem[] = [
  { label: "Dental", href: "/dental", icon: NimbusIcons.smile, fx: "glow" },
  { label: "Skin", href: "/skin", icon: NimbusIcons.drop, fx: "drop" },
  { label: "Hair", href: "/hair", icon: NimbusIcons.scissors, fx: "wave" },
  { label: "PMU", href: "/pmu", icon: NimbusIcons.eye, fx: "pop" },
  { label: "Our clinic", href: "/our-clinic", icon: NimbusIcons.home, fx: "spin" },
];

const MENU_ITEMS = NAV_ITEMS.map((item) => ({
  label: item.label,
  href: item.href ?? "/",
}));

export default function SpecialtyHeader({ data }: { data: SpecialtyContent }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const dark = data.theme === "dark";

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1241px)");
    const handleChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="spec-header" data-theme={data.theme}>
      <div className="spec-header__inner">
        <Logo href="/" className="spec-header__logo" />

        <div className="spec-header__nav">
          <LiquidNavbar
            items={NAV_ITEMS}
            active={data.navIndex}
            tone={dark ? "dark" : "light"}
            sound={false}
          />
        </div>

        <div className="spec-header__actions">
          <Magnetic className="spec-header__book">
            <LiquidMetalButton
              label="Book a visit"
              variant={dark ? "cream" : "aubergine"}
              width={126}
              height={38}
              href={CLINIC.bookingHref}
            />
          </Magnetic>

          <div className="spec-menu" data-open={open ? "true" : "false"}>
            <button
              type="button"
              className="spec-menu__trigger"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      <motion.span
        className="spec-header__progress"
        style={{ scaleX: reduceMotion ? 1 : progress }}
        aria-hidden="true"
      />

      <SiteMenu
        open={open}
        onClose={() => setOpen(false)}
        items={MENU_ITEMS}
        activeLabel={data.label}
      />
    </header>
  );
}

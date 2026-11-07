"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowRight, Menu, Phone } from "lucide-react";
import Logo from "@/components/hero/Logo";
import Magnetic from "@/components/hero/Magnetic";
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

export default function SpecialtyHeader({ data }: { data: SpecialtyContent }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const dark = data.theme === "dark";

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
              onClick={() => {
                window.location.href = CLINIC.bookingHref;
              }}
            />
          </Magnetic>

          <details className="spec-menu">
            <summary className="spec-menu__trigger">
              <Menu size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>Menu</span>
            </summary>
            <div className="spec-menu__panel">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href ?? "/"}
                  className={`spec-menu__link${
                    item.label.toLowerCase() === data.label.toLowerCase() ? " is-active" : ""
                  }`}
                >
                  {item.label}
                  <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
                </Link>
              ))}
              <a href={CLINIC.phone.primaryHref} className="spec-menu__call">
                <Phone size={14} strokeWidth={1.8} aria-hidden="true" />
                Call {CLINIC.phone.primaryDisplay}
              </a>
            </div>
          </details>
        </div>
      </div>

      <motion.span
        className="spec-header__progress"
        style={{ scaleX: reduceMotion ? 1 : progress }}
        aria-hidden="true"
      />
    </header>
  );
}

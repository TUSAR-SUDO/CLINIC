"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Menu } from "lucide-react";
import Logo from "@/components/hero/Logo";
import Magnetic from "@/components/hero/Magnetic";
import SiteMenu from "@/components/site/SiteMenu";
import { CLINIC } from "@/lib/clinic";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { scrollToSection } from "@/lib/smooth-scroll";

const NAV_LINKS = [
  { label: "Dental", href: "/dental", active: true },
  { label: "Skin", href: "/skin", active: false },
  { label: "Hair", href: "/hair", active: false },
  { label: "PMU", href: "/pmu", active: false },
  { label: "Doctors", href: "#dentists", active: false },
  { label: "Contact", href: "#contact-info", active: false },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function DentalNavbar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const handleHashLink = (href: string) => {
    if (!href.startsWith("#")) return;
    scrollToSection(href.slice(1));
  };

  return (
    <header className="dental-nav-header">
      <motion.div
        className="dental-nav-header__inner"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : { duration: 0.8, ease: EASE, delay: 0.05 }
        }
      >
        <div className="dental-nav-header__logo">
          <Logo href="/" />
        </div>

        <nav className="dental-nav-capsule" aria-label="Specialty navigation">
          {NAV_LINKS.map((link) =>
            link.active ? (
              <span
                key={link.label}
                className="dental-nav-capsule__active"
                aria-current="page"
              >
                {link.label}
              </span>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="dental-nav-capsule__link"
                onClick={(event) => {
                  if (link.href.startsWith("#")) {
                    event.preventDefault();
                    handleHashLink(link.href);
                  }
                }}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="dental-nav-header__cta">
          <Magnetic className="dental-nav-header__book">
            <LiquidMetalButton
              label="Book a visit"
              variant="aubergine"
              width={128}
              height={38}
              href={CLINIC.bookingHref}
            />
          </Magnetic>

          <button
            type="button"
            className="dental-nav-header__menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <Menu size={20} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </motion.div>

      <motion.span
        className="dental-nav-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <SiteMenu
        open={open}
        onClose={() => setOpen(false)}
        items={NAV_LINKS}
        activeLabel="Dental"
      />
    </header>
  );
}

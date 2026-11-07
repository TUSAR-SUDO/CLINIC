"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "@/components/hero/Logo";
import Magnetic from "@/components/hero/Magnetic";
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
  const [sheetOpen, setSheetOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!sheetOpen) return;

    const toggleButton = toggleRef.current;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSheetOpen(false);
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;

      const focusable = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      toggleButton?.focus();
    };
  }, [sheetOpen]);

  const closeMenu = () => setSheetOpen(false);

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
              onClick={() => {
                window.location.href = CLINIC.bookingHref;
              }}
            />
          </Magnetic>

          <button
            ref={toggleRef}
            type="button"
            className="dental-nav-header__menu-btn"
            onClick={() => setSheetOpen((open) => !open)}
            aria-label={sheetOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={sheetOpen}
            aria-controls="dental-mobile-menu"
          >
            {sheetOpen ? (
              <X size={20} strokeWidth={1.6} />
            ) : (
              <Menu size={20} strokeWidth={1.6} />
            )}
          </button>
        </div>
      </motion.div>

      <motion.span
        className="dental-nav-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            id="dental-mobile-menu"
            ref={sheetRef}
            className="dental-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.18 : 0.3, ease: EASE }}
          >
            <div className="dental-menu__head">
              <Logo href="/" onClick={closeMenu} />
              <button
                ref={closeRef}
                type="button"
                className="dental-menu__close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            <motion.nav
              className="dental-menu__nav"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.label}
                  className="dental-menu__row"
                  variants={{
                    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: reduceMotion ? 0.2 : 0.55, ease: EASE },
                    },
                  }}
                >
                  {link.active ? (
                    <span
                      className="dental-menu__link is-active"
                      aria-current="page"
                    >
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className="dental-menu__link"
                      onClick={(event) => {
                        if (link.href.startsWith("#")) {
                          event.preventDefault();
                          closeMenu();
                          window.setTimeout(() => handleHashLink(link.href), 80);
                          return;
                        }
                        closeMenu();
                      }}
                    >
                      {link.label}
                      <ArrowRight size={17} strokeWidth={1.6} aria-hidden="true" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className="dental-menu__actions"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.6,
                delay: reduceMotion ? 0 : 0.32,
                ease: EASE,
              }}
            >
              <a
                href={CLINIC.phone.primaryHref}
                className="dental-menu__call"
                aria-label={`Call the clinic at ${CLINIC.phone.primaryDisplay}`}
              >
                Call {CLINIC.phone.primaryDisplay}
              </a>
              <a
                href={CLINIC.bookingHref}
                className="dental-menu__book"
                onClick={closeMenu}
              >
                Book a visit
                <ArrowRight size={15} strokeWidth={1.7} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "@/components/hero/Logo";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { CLINIC } from "@/lib/clinic";
import { SKIN_NAV } from "@/lib/skin";
import { scrollToSection } from "@/lib/smooth-scroll";

export default function SkinNavbar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const menuButton = menuButtonRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = [
        menuButton,
        ...Array.from(
          sheetRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
        ),
      ].filter((element): element is HTMLElement =>
        Boolean(element && element.offsetParent !== null),
      );
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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  };

  const bookVisit = () => {
    window.location.href = CLINIC.bookingHref;
  };

  return (
    <motion.header
      className="skin-nav-header"
      initial={reduceMotion ? { opacity: 0 } : { y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
      }
    >
      <div className="skin-nav-header__inner">
        <div className="skin-nav-header__logo">
          <Logo href="/" />
        </div>

        <nav className="skin-nav-capsule" aria-label="Specialty navigation">
          {SKIN_NAV.map((link) =>
            "active" in link && link.active ? (
              <span key={link.label} className="skin-nav-capsule__active" aria-current="page">
                {link.label}
              </span>
            ) : link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                className="skin-nav-capsule__link"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.href.slice(1));
                }}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className="skin-nav-capsule__link">
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="skin-nav-header__cta">
          <div className="skin-nav-header__book">
            <LiquidMetalButton
              className="skin-book-button"
              label="Book a visit"
              variant="aubergine"
              width={128}
              height={38}
              onClick={bookVisit}
            />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="skin-nav-header__menu-btn"
            onClick={() => (open ? close() : setOpen(true))}
            aria-label={open ? "Close menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="skin-mobile-sheet"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="skin-mobile-sheet"
            ref={sheetRef}
            className="skin-mobile-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="skin-mobile-sheet__nav" aria-label="Mobile navigation">
              {SKIN_NAV.map((link, index) =>
                "active" in link && link.active ? (
                  <span
                    key={link.label}
                    className="skin-mobile-sheet__link is-active"
                    aria-current="page"
                  >
                    {link.label}
                  </span>
                ) : link.href.startsWith("#") ? (
                  <a
                    key={link.label}
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    className="skin-mobile-sheet__link"
                    onClick={(event) => {
                      event.preventDefault();
                      close();
                      window.setTimeout(() => scrollToSection(link.href.slice(1)), 80);
                    }}
                  >
                    {link.label}
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    className="skin-mobile-sheet__link"
                    onClick={close}
                  >
                    {link.label}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                ),
              )}

              <div className="skin-mobile-sheet__actions">
                <a href={CLINIC.phone.primaryHref} className="skin-mobile-sheet__call">
                  Call {CLINIC.phone.primaryDisplay}
                </a>
                <button type="button" className="skin-mobile-sheet__book" onClick={bookVisit}>
                  Book a visit
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

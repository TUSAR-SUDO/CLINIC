"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { LiquidNavbar, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>(".menu-sheet__close")?.focus();
    }, 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
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
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, closeMenu]);

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
    return () => window.removeEventListener("aesthedent:select-service", handleSelect);
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
      className="hero__nav js-reveal"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: reduceMotion ? 0 : 0.82 }}
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
              onClick={() => {
                window.location.href = CLINIC.bookingHref;
              }}
            />
          </Magnetic>
        </div>

        <button
          ref={triggerRef}
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

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="menu-sheet"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            transition={transition}
          >
            <div className="menu-sheet__head">
              <Logo href="#top" onClick={closeMenu} className="menu-sheet__brand" />
              <button
                type="button"
                className="menu-sheet__close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <nav className="menu-sheet__links" aria-label="Mobile primary">
              {CLINIC.nav.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="menu-sheet__link"
                  onClick={() => {
                    closeMenu();
                    const serviceKey = link.label.toLowerCase();
                    if (["dental", "skin", "hair", "pmu"].includes(serviceKey)) {
                      window.dispatchEvent(
                        new CustomEvent("aesthedent:select-service", {
                          detail: serviceKey,
                        }),
                      );
                    }
                  }}
                >
                  {link.label}
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </a>
              ))}
            </nav>

            <div className="menu-sheet__foot">
              <div className="menu-sheet__meta">
                <span>
                  {CLINIC.address.line1}, {CLINIC.address.line2}
                </span>
                <span>
                  {CLINIC.address.city}, {CLINIC.address.state} {CLINIC.address.postalCode}
                </span>
                <a href={CLINIC.phone.primaryHref}>Call {CLINIC.phone.primaryDisplay}</a>
              </div>
              <a className="cta cta--dark" href={CLINIC.bookingHref} onClick={closeMenu}>
                Book a visit
                <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

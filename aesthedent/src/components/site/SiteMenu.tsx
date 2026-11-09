"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone, X } from "lucide-react";
import Logo from "@/components/hero/Logo";
import { CLINIC } from "@/lib/clinic";
import { scrollToSection } from "@/lib/smooth-scroll";

export interface SiteMenuItem {
  label: string;
  href: string;
}

interface SiteMenuProps {
  open: boolean;
  onClose: () => void;
  items: readonly SiteMenuItem[];
  /** Label of the current page, used for aria-current. */
  activeLabel?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The single mobile menu used by every header.
 *
 * It renders through a portal on <body>: several headers animate with a
 * `transform`, and a transformed ancestor becomes the containing block for
 * `position: fixed` children, which is what used to clamp the sheet to the
 * header's height (126px tall on a 935px viewport).
 */
export default function SiteMenu({
  open,
  onClose,
  items,
  activeLabel,
}: SiteMenuProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const handleHashLink = useCallback(
    (href: string) => {
      onClose();
      const id = href.slice(1);
      window.setTimeout(() => scrollToSection(id), 180);
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    const previousRootOverflow = root.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    root.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
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
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      root.style.overflow = previousRootOverflow;
      const target = restoreFocusRef.current;
      if (target && target !== document.body) {
        target.focus?.();
      } else {
        document
          .querySelector<HTMLElement>('[aria-controls="site-menu"]')
          ?.focus();
      }
    };
  }, [open, onClose]);

  // Unmount on close rather than relying on an exit animation: a lingering
  // opacity-0 node would still swallow every tap on the page underneath.
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      id="site-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.2, ease: EASE }}
    >
      <motion.div
        ref={panelRef}
        className="site-menu__panel"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.12 : 0.34, ease: EASE }}
      >
            <div className="site-menu__head">
              <Logo href="/" onClick={onClose} className="site-menu__brand" />
              <button
                ref={closeRef}
                type="button"
                className="site-menu__close"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            <motion.nav
              className="site-menu__links"
              aria-label="Primary"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.045,
                    delayChildren: reduceMotion ? 0 : 0.08,
                  },
                },
              }}
            >
              {items.map((item, index) => {
                const isActive = item.label === activeLabel;
                const row =
                  item.href.startsWith("#") ? (
                    <a
                      href={item.href}
                      className={`site-menu__link${isActive ? " is-active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        handleHashLink(item.href);
                      }}
                    >
                      <span className="site-menu__label">{item.label}</span>
                      <span className="site-menu__index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`site-menu__link${isActive ? " is-active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={onClose}
                    >
                      <span className="site-menu__label">{item.label}</span>
                      <span className="site-menu__index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  );

                return (
                  <motion.div
                    key={`${item.label}-${item.href}`}
                    variants={{
                      hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: reduceMotion ? 0.12 : 0.5,
                          ease: EASE,
                        },
                      },
                    }}
                  >
                    {row}
                  </motion.div>
                );
              })}
            </motion.nav>

            <div className="site-menu__foot">
              <div className="site-menu__meta">
                <span>
                  {CLINIC.address.line1}, {CLINIC.address.line2}
                </span>
                <span>
                  {CLINIC.address.city}, {CLINIC.address.state}{" "}
                  {CLINIC.address.postalCode}
                </span>
                <span>Open daily until 8:00 pm</span>
              </div>

              <div className="site-menu__actions">
                <a
                  className="site-menu__book"
                  href={CLINIC.bookingHref}
                  onClick={onClose}
                >
                  Book a visit
                  <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
                </a>
                <a
                  className="site-menu__call"
                  href={CLINIC.phone.primaryHref}
                  aria-label={`Call the clinic at ${CLINIC.phone.primaryDisplay}`}
                >
                  <Phone size={15} strokeWidth={1.8} aria-hidden="true" />
                  {CLINIC.phone.primaryDisplay}
                </a>
              </div>
            </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

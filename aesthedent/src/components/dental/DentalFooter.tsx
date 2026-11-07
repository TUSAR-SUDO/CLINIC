"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Logo from "@/components/hero/Logo";
import { scrollToSection } from "@/lib/smooth-scroll";

const LINKS = [
  { label: "Dental", href: "/dental" },
  { label: "Skin", href: "/skin" },
  { label: "Hair", href: "/hair" },
  { label: "PMU", href: "/pmu" },
  { label: "Doctors", href: "#dentists" },
  { label: "Contact", href: "#contact-info" },
];

export default function DentalFooter() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.footer
      className="dental-footer"
      aria-label="Aesthédent footer"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="dental-footer__container">
        <div className="dental-footer__brand">
          <Logo href="/dental" />
          <span className="dental-footer__divider" aria-hidden="true" />
          <span className="dental-footer__tagline">Your one stop destination</span>
        </div>

        <nav className="dental-footer__nav" aria-label="Footer links">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="dental-footer__link"
              onClick={(event) => {
                if (!link.href.startsWith("#")) return;
                event.preventDefault();
                scrollToSection(link.href.slice(1));
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.footer>
  );
}

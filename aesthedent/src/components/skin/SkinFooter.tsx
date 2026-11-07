"use client";

import Link from "next/link";
import Logo from "@/components/hero/Logo";
import { CLINIC } from "@/lib/clinic";
import { scrollToSection } from "@/lib/smooth-scroll";

const FOOTER_LINKS = [
  { label: "Dental", href: "/dental" },
  { label: "Skin", href: "/skin", active: true },
  { label: "Hair", href: "/hair" },
  { label: "PMU", href: "/pmu" },
  { label: "Doctors", href: "#skin-specialists" },
  { label: "Contact", href: "#skin-contact" },
] as const;

export default function SkinFooter() {
  return (
    <footer className="skin-footer" aria-label="Aesthédent footer">
      <div className="skin-footer__inner">
        <div className="skin-footer__brand">
          <Logo href="/" />
          <span className="skin-footer__divider" aria-hidden="true" />
          <span className="skin-footer__tagline">{CLINIC.tagline}</span>
        </div>

        <nav className="skin-footer__nav" aria-label="Footer navigation">
          {FOOTER_LINKS.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                className="skin-footer__link"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.href.slice(1));
                }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`skin-footer__link${"active" in link && link.active ? " is-active" : ""}`}
                aria-current={"active" in link && link.active ? "page" : undefined}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </footer>
  );
}

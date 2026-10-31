"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/hero/Logo";

export default function DentalFooter() {
  const links = [
    { label: "Dental", href: "/dental" },
    { label: "Skin", href: "/#service-skin" },
    { label: "Hair", href: "/#service-hair" },
    { label: "PMU", href: "/#service-pmu" },
    { label: "Doctors", href: "#dentists" },
    { label: "Contact", href: "#clinic-info" },
  ];

  return (
    <footer className="dental-footer" aria-label="Aesthedent Footer">
      <div className="dental-footer__container">
        <div className="dental-footer__brand">
          <Logo />
          <span className="dental-footer__divider" aria-hidden="true" />
          <span className="dental-footer__tagline">Your one stop destination</span>
        </div>

        <nav className="dental-footer__nav" aria-label="Footer links">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="dental-footer__link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

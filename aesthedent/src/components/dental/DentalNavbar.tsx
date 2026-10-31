"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "@/components/hero/Logo";
import { CLINIC } from "@/lib/clinic";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const NAV_LINKS = [
  { label: "Dental", href: "/dental", active: true },
  { label: "Skin", href: "/#service-skin", active: false },
  { label: "Hair", href: "/#service-hair", active: false },
  { label: "PMU", href: "/#service-pmu", active: false },
  { label: "Doctors", href: "#dentists", active: false },
  { label: "Contact", href: "#contact-info", active: false },
];

export default function DentalNavbar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="dental-nav-header" role="banner">
      <div className="dental-nav-header__inner">
        {/* Brand Logo */}
        <Link href="/" className="dental-nav-header__logo" aria-label="Aesthedent Home">
          <Logo />
        </Link>

        {/* Center Nav Capsule - Exact replica of reference image */}
        <nav className="dental-nav-capsule" aria-label="Specialty navigation">
          {NAV_LINKS.map((link) =>
            link.active ? (
              <span key={link.label} className="dental-nav-capsule__active">
                {link.label}
              </span>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="dental-nav-capsule__link"
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right CTA */}
        <div className="dental-nav-header__cta">
          <LiquidMetalButton
            label="Book a visit"
            variant="aubergine"
            width={128}
            height={38}
            onClick={() => {
              window.location.href = CLINIC.bookingHref;
            }}
          />

          <button
            type="button"
            className="dental-nav-header__menu-btn"
            onClick={() => setSheetOpen(!sheetOpen)}
            aria-label={sheetOpen ? "Close menu" : "Open navigation menu"}
          >
            {sheetOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {sheetOpen && (
        <div className="dental-mobile-sheet">
          <nav className="dental-mobile-sheet__nav">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`dental-mobile-sheet__link${item.active ? " is-active" : ""}`}
                onClick={() => setSheetOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="dental-mobile-sheet__cta-wrap">
              <LiquidMetalButton
                label="Book a visit"
                variant="aubergine"
                width={160}
                height={42}
                onClick={() => {
                  window.location.href = CLINIC.bookingHref;
                }}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

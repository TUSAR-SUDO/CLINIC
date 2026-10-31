"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/hero/Logo";
import { CLINIC } from "@/lib/clinic";
import { LiquidNavbar, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const NAV_ITEMS: LiquidNavItem[] = [
  { label: "Dental", href: "/dental" },
  { label: "Skin", href: "/#service-skin" },
  { label: "Hair", href: "/#service-hair" },
  { label: "PMU", href: "/#service-pmu" },
  { label: "Doctors", href: "#dentists" },
  { label: "Contact", href: "#contact-info" },
];

export default function DentalNavbar() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0); // 0 = Dental
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleNavChange = (index: number, item: LiquidNavItem) => {
    setActiveIdx(index);
    if (item.href) {
      if (item.href.startsWith("#")) {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(item.href);
      }
    }
  };

  return (
    <header className="dental-nav-header" role="banner">
      <div className="dental-nav-header__inner">
        <Link href="/" className="dental-nav-header__logo" aria-label="Aesthedent Home">
          <Logo />
        </Link>

        {/* Center Liquid Navbar */}
        <div className="dental-nav-header__center">
          <LiquidNavbar
            items={NAV_ITEMS}
            active={activeIdx}
            onChange={handleNavChange}
            tone="light"
            sound={false}
          />
        </div>

        {/* Right CTA */}
        <div className="dental-nav-header__cta">
          <LiquidMetalButton
            label="Book a visit"
            variant="aubergine"
            width={132}
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
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href || "/"}
                className="dental-mobile-sheet__link"
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

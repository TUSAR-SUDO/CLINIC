import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Phone } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

const CARE_LINKS = [
  { label: "Dental", href: "/dental" },
  { label: "Skin", href: "/skin" },
  { label: "Hair", href: "/hair" },
  { label: "PMU", href: "/pmu" },
  { label: "Our clinic", href: "/our-clinic" },
] as const;

export default function NotFound() {
  return (
    <main id="main" className="system-page">
      <div className="system-page__inner">
        <p className="system-page__eyebrow">404 — Page not found</p>
        <h1 className="system-page__title">
          This page has <em>moved on.</em>
        </h1>
        <p className="system-page__lede">
          The link you followed may be old, or the page may have a new home.
          Everything at Aesthedent is still a few steps away.
        </p>

        <div className="system-page__actions">
          <Link href="/" className="system-page__primary">
            <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
            Back home
          </Link>
          <a href={CLINIC.bookingHref} className="system-page__call">
            <Phone size={14} strokeWidth={1.8} aria-hidden="true" />
            Call {CLINIC.phone.primaryDisplay}
          </a>
        </div>

        <nav className="system-page__care" aria-label="Care pages">
          {CARE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="system-page__care-link">
              {link.label}
              <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}

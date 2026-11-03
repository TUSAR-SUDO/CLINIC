import { ArrowRight } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

export default function MobileHeroCta() {
  return (
    <div className="hero__mobile-cta">
      <a
        className="hero__mobile-book"
        href={CLINIC.bookingHref}
        aria-label="Book a visit by calling the clinic"
      >
        <span>Book a visit</span>
        <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
      </a>
    </div>
  );
}

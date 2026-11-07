"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

interface BookingDockProps {
  bookingLabel: string;
  theme: "dark" | "light";
}

/**
 * Phone-only booking bar. It slides in once the hero is behind you and steps aside
 * for the closing section, so it never covers the primary CTA at the end of the page.
 */
export default function BookingDock({ bookingLabel, theme }: BookingDockProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrolled = window.scrollY;
      // The closing section has its own booking CTA, so the dock steps aside for it.
      const close = document.querySelector(".spec-close");
      const closeInView = close
        ? close.getBoundingClientRect().top < window.innerHeight * 0.85
        : false;
      const next = scrolled > window.innerHeight * 0.6 && !closeInView;
      setVisible((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="spec-dock" data-theme={theme} data-visible={visible ? "true" : "false"}>
      <a className="spec-dock__book" href={CLINIC.bookingHref}>
        {bookingLabel}
        <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
      </a>
      <a
        className="spec-dock__call"
        href={CLINIC.phone.primaryHref}
        aria-label={`Call the clinic at ${CLINIC.phone.primaryDisplay}`}
      >
        <Phone size={16} strokeWidth={1.9} aria-hidden="true" />
      </a>
    </div>
  );
}

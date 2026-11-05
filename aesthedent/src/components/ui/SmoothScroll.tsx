"use client";

import { useEffect, type ReactNode } from "react";
import { registerSmoothScroller } from "@/lib/smooth-scroll";

/**
 * Lenis is a desktop-mouse enhancement, not a phone feature. Touch browsers
 * already have momentum scrolling; routing them through another animation
 * loop makes scrolling heavier and less predictable. Load it only for a fine
 * pointer at desktop widths, and only when motion is welcome.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (
      !window.matchMedia(
        "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
      ).matches
    ) {
      return;
    }

    let disposed = false;
    let frame = 0;
    let lenis: import("lenis").default | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });
      registerSmoothScroller(lenis);

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      registerSmoothScroller(null);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

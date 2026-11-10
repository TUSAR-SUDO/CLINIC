"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { registerSmoothScroller } from "@/lib/smooth-scroll";

/**
 * Lenis is a desktop-mouse enhancement, not a phone feature. Touch browsers
 * already have momentum scrolling; routing them through another animation
 * loop makes scrolling heavier and less predictable. Load it only for a fine
 * pointer at desktop widths, and only when motion is welcome.
 *
 * The intro locks scrolling through the loader's own body lock, so Lenis is
 * never stopped here: stopping it left the `lenis-stopped` class behind and
 * the page could not be scrolled afterwards.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<import("lenis").default | null>(null);

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

    import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      const lenis = new Lenis({
        autoRaf: false,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      lenisRef.current = lenis;
      registerSmoothScroller(lenis);

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      registerSmoothScroller(null);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A client-side route change leaves Lenis' internal position stale, so the
  // new page can start part-way down. Reset it the way the browser would.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}

"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Lenis is loaded only in the browser and only when motion is welcome,
 * keeping it out of the critical bundle.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let frame = 0;
    let lenis: import("lenis").default | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

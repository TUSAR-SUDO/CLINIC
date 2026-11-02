"use client";

type LenisTarget = HTMLElement | string;

interface LenisLike {
  scrollTo: (target: number | LenisTarget, options?: { offset?: number; duration?: number }) => void;
}

let activeLenis: LenisLike | null = null;

export function registerSmoothScroller(lenis: LenisLike | null) {
  activeLenis = lenis;
}

/**
 * Shared helper so in-page navigation runs through the same Lenis instance
 * created by the root SmoothScroll provider. Falls back to native scrolling
 * when Lenis is disabled (reduced motion / unsupported environment).
 */
export function scrollToSection(id: string) {
  if (typeof document === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;

  if (activeLenis) {
    activeLenis.scrollTo(target, { offset: -76, duration: 1.15 });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Back to the top through the same scroller, or natively when it is off. */
export function scrollToTop(immediate = false) {
  if (typeof window === "undefined") return;

  if (activeLenis) {
    activeLenis.scrollTo(0, { duration: immediate ? 0 : 1.15 });
    return;
  }

  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

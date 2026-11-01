"use client";

type LenisTarget = HTMLElement | string;

interface LenisLike {
  scrollTo: (target: LenisTarget, options?: { offset?: number; duration?: number }) => void;
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

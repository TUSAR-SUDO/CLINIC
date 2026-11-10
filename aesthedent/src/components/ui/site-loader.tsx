"use client";

import * as React from "react";
import { BrandGlassReveal } from "@/components/ui/glass-icon-reveal";
import { CLINIC } from "@/lib/clinic";
import { cn } from "@/lib/utils";

interface SiteLoaderContextType {
  isRevealed: boolean;
  isLoaded: boolean;
  skipIntro: () => void;
}

const SiteLoaderContext = React.createContext<SiteLoaderContextType>({
  isRevealed: false,
  isLoaded: false,
  skipIntro: () => {},
});

export const useSiteLoader = () => React.useContext(SiteLoaderContext);

/**
 * The intro is a first-visit moment, not a page transition.
 *
 * The provider sits in the root layout, so every full page load (hard link,
 * refresh, back/forward restore) mounts it again. A session flag makes it play
 * once; afterwards the loader is skipped and the site renders straight away.
 *
 * The flag is read through useSyncExternalStore: the server snapshot is always
 * "not seen", so hydration matches the server HTML, and the client re-renders
 * with the real value a moment later.
 */
const INTRO_KEY = "aesthedent:intro-seen";

const readIntro = () => {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
};

const readIntroOnServer = () => false;

const subscribeIntro = () => () => {};

const rememberIntro = () => {
  try {
    window.sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // Storage can be blocked (private mode); the intro simply plays again.
  }
};

export interface SiteLoaderProviderProps {
  children: React.ReactNode;
}

export function SiteLoaderProvider({ children }: SiteLoaderProviderProps) {
  const seenIntro = React.useSyncExternalStore(
    subscribeIntro,
    readIntro,
    readIntroOnServer
  );
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Derived, so a repeat visit never needs to touch state to skip the intro.
  const revealed = isRevealed || seenIntro;
  const loaded = isLoaded || seenIntro;

  const hasTriggeredRef = React.useRef(false);

  const handleReveal = React.useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    rememberIntro();
    setIsRevealed(true);

    // After the fade-out / reveal transition ends, unmount the loader completely
    setTimeout(() => {
      setIsLoaded(true);
      // Marks this document so any later render keeps the loader hidden.
      document.documentElement.dataset.intro = "seen";
    }, 850);
  }, []);

  const handleSkip = React.useCallback(() => {
    handleReveal();
  }, [handleReveal]);

  React.useEffect(() => {
    // Seen already this session: no timers, no scroll lock, no intro.
    if (seenIntro) return;

    // Respect user's reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      handleReveal();
      return;
    }

    // Safety fallback: if WebGL or texture takes longer, reveal anyway after 3.6s
    const fallbackTimer = setTimeout(() => {
      handleReveal();
    }, 3600);

    // Keyboard listener: Escape key skips intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleReveal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Lock scroll while intro is playing
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [handleReveal, seenIntro]);

  // Restore scroll when revealed
  React.useEffect(() => {
    if (revealed) {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [revealed]);

  const value = React.useMemo(
    () => ({
      isRevealed: revealed,
      isLoaded: loaded,
      skipIntro: handleSkip,
    }),
    [revealed, loaded, handleSkip]
  );

  return (
    <SiteLoaderContext.Provider value={value}>
      {/* The main site content wrapper */}
      <div
        className={cn(
          "site-content-root",
          !revealed ? "site-content-root--hidden" : "site-content-root--revealed"
        )}
      >
        {children}
      </div>

      {/* The Fullscreen Logo Reveal Loading Screen (in initial HTML to prevent flash of site) */}
      {!loaded && (
        <aside
          className={cn("site-loader", revealed && "site-loader--revealing")}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Aesthédent"
          onClick={handleSkip}
        >
          {/* Top Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="site-loader__skip"
            aria-label="Skip intro animation"
          >
            <span>Skip</span>
            <kbd aria-hidden="true">Esc</kbd>
          </button>

          {/* Center Stage: 21st dev Glass Icon Reveal */}
          <div className="site-loader__inner">
            <div className="site-loader__stage" onClick={(e) => e.stopPropagation()}>
              <BrandGlassReveal
                loop={false}
                speed={1.15}
                tileSize={280}
                tuning={{ present: 1.4, startZoom: 2.1 }}
                onComplete={handleReveal}
                className="site-loader__canvas"
                label={`${CLINIC.name} logo reveal`}
              />
            </div>

            {/* Brand Typography */}
            <div className="site-loader__brand">
              <span className="site-loader__wordmark">{CLINIC.name}</span>
              <span className="site-loader__tagline">
                Dental · Skin · Hair · PMU
              </span>
            </div>
          </div>

          {/* Subtle click hint */}
          <div className="site-loader__hint" aria-hidden="true">
            Tap anywhere to enter
          </div>
        </aside>
      )}
    </SiteLoaderContext.Provider>
  );
}

export default SiteLoaderProvider;

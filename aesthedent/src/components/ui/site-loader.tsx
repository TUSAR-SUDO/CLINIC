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

export interface SiteLoaderProviderProps {
  children: React.ReactNode;
}

export function SiteLoaderProvider({ children }: SiteLoaderProviderProps) {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const hasTriggeredRef = React.useRef(false);

  const handleReveal = React.useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsRevealed(true);

    // After the fade-out / reveal transition ends, unmount the loader completely
    setTimeout(() => {
      setIsLoaded(true);
    }, 850);
  }, []);

  const handleSkip = React.useCallback(() => {
    handleReveal();
  }, [handleReveal]);

  React.useEffect(() => {
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
  }, [handleReveal]);

  // Restore scroll when revealed
  React.useEffect(() => {
    if (isRevealed) {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [isRevealed]);

  const value = React.useMemo(
    () => ({
      isRevealed,
      isLoaded,
      skipIntro: handleSkip,
    }),
    [isRevealed, isLoaded, handleSkip]
  );

  return (
    <SiteLoaderContext.Provider value={value}>
      {/* The main site content wrapper */}
      <div
        className={cn(
          "site-content-root",
          !isRevealed ? "site-content-root--hidden" : "site-content-root--revealed"
        )}
      >
        {children}
      </div>

      {/* The Fullscreen Logo Reveal Loading Screen (in initial HTML to prevent flash of site) */}
      {!isLoaded && (
        <aside
          className={cn("site-loader", isRevealed && "site-loader--revealing")}
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

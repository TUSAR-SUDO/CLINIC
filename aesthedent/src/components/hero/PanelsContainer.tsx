"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { DEFAULT_SERVICE, SERVICES, type ServiceId } from "@/lib/services";
import Panel from "./Panel";

const COMPACT_QUERY = "(max-width: 699px)";

function subscribeToCompact(onChange: () => void) {
  const media = window.matchMedia(COMPACT_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getCompactSnapshot = () => window.matchMedia(COMPACT_QUERY).matches;
const getCompactServerSnapshot = () => false;

export default function PanelsContainer() {
  const [selected, setSelected] = useState<ServiceId>(DEFAULT_SERVICE);
  const [hovered, setHovered] = useState<ServiceId | null>(null);
  // On phones no service is opened until the visitor chooses one, so the
  // opening view is four equal cards instead of the desktop default.
  const [mobileSelected, setMobileSelected] = useState<ServiceId | null>(null);
  const compact = useSyncExternalStore(
    subscribeToCompact,
    getCompactSnapshot,
    getCompactServerSnapshot,
  );

  const active = compact ? mobileSelected : (hovered ?? selected);

  useEffect(() => {
    const handleSelect = (e: Event) => {
      const customEvent = e as CustomEvent<ServiceId>;
      if (customEvent.detail) {
        setSelected(customEvent.detail);
        setMobileSelected(customEvent.detail);
        setHovered(null);
      }
    };
    window.addEventListener("aesthedent:select-service", handleSelect);
    return () => window.removeEventListener("aesthedent:select-service", handleSelect);
  }, []);

  const selectService = (id: ServiceId) => {
    setSelected(id);
    setMobileSelected(id);
    setHovered(null);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aesthedent:select-service", {
          detail: id,
        }),
      );
    }
  };

  const previewService = (id: ServiceId) => {
    if (compact) return;
    setHovered(id);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aesthedent:preview-service", {
          detail: id,
        }),
      );
    }
  };

  const endPreview = () => {
    if (compact || hovered === null) return;
    setHovered(null);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aesthedent:preview-service", {
          detail: selected,
        }),
      );
    }
  };

  // Phones use MobileServiceShowcase instead of the four-panel stage.
  if (compact) {
    return null;
  }

  return (
    <div
      className={`hero__stage${compact ? " is-compact" : ""}`}
      role="group"
      aria-label="Aesthedent services"
      onPointerLeave={endPreview}
      onPointerCancel={endPreview}
    >
      {SERVICES.map((service, index) => (
        <Panel
          key={service.id}
          service={service}
          index={index}
          active={active === service.id}
          compact={compact}
          onActivate={() => previewService(service.id)}
          onToggle={() => selectService(service.id)}
        />
      ))}
    </div>
  );
}

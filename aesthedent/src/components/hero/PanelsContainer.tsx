"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SERVICE, SERVICES, type ServiceId } from "@/lib/services";
import Panel from "./Panel";

export default function PanelsContainer() {
  const [selected, setSelected] = useState<ServiceId>(DEFAULT_SERVICE);
  const [hovered, setHovered] = useState<ServiceId | null>(null);
  const [compact, setCompact] = useState(false);

  const active = compact ? selected : (hovered ?? selected);

  useEffect(() => {
    const handleSelect = (e: Event) => {
      const customEvent = e as CustomEvent<ServiceId>;
      if (customEvent.detail) {
        setSelected(customEvent.detail);
        setHovered(null);
      }
    };
    window.addEventListener("aesthedent:select-service", handleSelect);
    return () => window.removeEventListener("aesthedent:select-service", handleSelect);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 699px)");
    const sync = () => {
      setCompact(media.matches);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const selectService = (id: ServiceId) => {
    setSelected(id);
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

  return (
    <div
      className="hero__stage"
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

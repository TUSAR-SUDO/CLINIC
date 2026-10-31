"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SERVICE, SERVICES, type ServiceId } from "@/lib/services";
import Panel from "./Panel";

export default function PanelsContainer() {
  const [active, setActive] = useState<ServiceId>(DEFAULT_SERVICE);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const handleSelect = (e: Event) => {
      const customEvent = e as CustomEvent<ServiceId>;
      if (customEvent.detail) {
        setActive(customEvent.detail);
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
    setActive(id);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("aesthedent:select-service", {
          detail: id,
        }),
      );
    }
  };

  return (
    <div className="hero__stage" role="group" aria-label="Aesthedent services">
      {SERVICES.map((service, index) => (
        <Panel
          key={service.id}
          service={service}
          index={index}
          active={active === service.id}
          compact={compact}
          onActivate={() => selectService(service.id)}
          onToggle={() => selectService(service.id)}
        />
      ))}
    </div>
  );
}

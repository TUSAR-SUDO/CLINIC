"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SERVICE, SERVICES, type ServiceId } from "@/lib/services";
import Panel from "./Panel";

export default function PanelsContainer() {
  const [active, setActive] = useState<ServiceId | null>(DEFAULT_SERVICE);
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
      if (!media.matches) {
        setActive((current) => current ?? DEFAULT_SERVICE);
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="hero__stage" role="group" aria-label="Aesthedent services">
      {SERVICES.map((service, index) => (
        <Panel
          key={service.id}
          service={service}
          index={index}
          active={active === service.id}
          compact={compact}
          onActivate={() => {
            if (!compact) setActive(service.id);
          }}
          onToggle={() =>
            setActive((current) =>
              compact && current === service.id ? null : service.id,
            )
          }
        />
      ))}
    </div>
  );
}

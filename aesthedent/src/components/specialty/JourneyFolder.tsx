"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import { CLINIC } from "@/lib/clinic";
import { scrollToSection } from "@/lib/smooth-scroll";
import type { SpecialtyContent } from "@/lib/specialty";

export default function JourneyFolder({ data }: { data: SpecialtyContent }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(360);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width;
      if (!next) return;
      setWidth(Math.min(400, Math.max(268, Math.round(next))));
    });

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  function handleFileSelect(file: FolderFile) {
    const index = data.folderFiles.findIndex((item) => item.name === file.name);
    if (index < 0) return;
    const target = data.folderTargets[index];
    setOpen(false);
    scrollToSection(target);
    window.requestAnimationFrame(() => {
      const section = document.getElementById(target);
      if (!section) return;
      section.setAttribute("tabindex", "-1");
      section.focus({ preventScroll: true });
    });
  }

  const menu = [
    {
      label: data.bookingLabel,
      onSelect: () => {
        window.location.href = CLINIC.bookingHref;
      },
    },
    {
      label: "Call the clinic",
      onSelect: () => {
        window.location.href = CLINIC.phone.primaryHref;
      },
    },
  ];

  return (
    <section
      id={`${data.id}-folder`}
      className={`spec-folder spec-folder--${data.id}`}
      aria-labelledby={`${data.id}-folder-title`}
    >
      <div className="spec-folder__grid" aria-hidden="true" />

      <div className="spec-folder__inner">
        <div className="spec-folder__copy">
          <Reveal>
            <p className="spec-kicker">{data.folderKicker}</p>
          </Reveal>

          <h2 className="spec-folder__title" id={`${data.id}-folder-title`}>
            <MaskedLine>{data.folderTitleTop}</MaskedLine>
            <MaskedLine delay={0.08}>
              <em>{data.folderTitleEm}</em>
            </MaskedLine>
          </h2>

          <Reveal delay={0.12}>
            <p className="spec-folder__lede">{data.folderLede}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="spec-folder__actions">
              <a className="spec-folder__book" href={CLINIC.bookingHref}>
                {data.bookingLabel}
                <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
              </a>
              <a className="spec-folder__phone" href={CLINIC.phone.primaryHref}>
                <Phone size={15} strokeWidth={1.7} aria-hidden="true" />
                {CLINIC.phone.primaryDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="spec-folder__object">
          <div className="spec-folder__frame" ref={frameRef}>
            <GlassFolder
              label={data.id === "hair" ? "Your hair plan" : "Your PMU plan"}
              meta="3 pages"
              tone={data.theme}
              art={data.folderArt}
              seed={data.id === "hair" ? 11 : 19}
              files={[...data.folderFiles]}
              action="more"
              menu={menu}
              open={open}
              onOpenChange={setOpen}
              onFileSelect={handleFileSelect}
              width={width}
              appear
              appearDelay={100}
            />
          </div>
          <p className="spec-folder__hint">
            <span className="spec-folder__hint-rule" aria-hidden="true" />
            Open the folder
          </p>
        </div>
      </div>
    </section>
  );
}

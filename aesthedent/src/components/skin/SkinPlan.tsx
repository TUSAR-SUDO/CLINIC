"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder";
import type { ArtRecipe } from "@/components/ui/glass-folder-art";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import { CLINIC } from "@/lib/clinic";
import { scrollToSection } from "@/lib/smooth-scroll";

const FOLDER_ART: ArtRecipe = {
  style: "marble",
  colors: ["#3A1530", "#6B2237", "#D9A79E", "#F3EEE8", "#B9CFDB", "#F3EEE8"],
  scale: 0.76,
  warp: 2.9,
  angle: 0.9,
  gloss: 0.3,
  veins: 0.32,
};

const FILES: FolderFile[] = [
  { name: "Your visit", meta: "What to expect" },
  { name: "Treatments", meta: "The menu" },
  { name: "Aftercare", meta: "Common questions" },
];

const TARGETS = ["skin-how", "skin-treatments", "skin-faq"] as const;

export default function SkinPlan() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(340);
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
    const index = FILES.findIndex((item) => item.name === file.name);
    if (index < 0) return;
    const target = TARGETS[index];
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
      label: "Book a skin consultation",
      onSelect: () => {
        scrollToSection("skin-contact");
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
    <section className="skin-plan" aria-labelledby="skin-plan-title" id="skin-plan">
      <div className="skin-plan__grid" aria-hidden="true" />

      <div className="skin-plan__container">
        <div className="skin-plan__copy">
          <Reveal>
            <p className="skin-plan__eyebrow">
              <span className="skin-plan__eyebrow-rule" aria-hidden="true" />
              Your skin journey
            </p>
          </Reveal>

          <h2 className="skin-plan__title" id="skin-plan-title">
            <MaskedLine>Everything,</MaskedLine>
            <MaskedLine>
              <em>in one place.</em>
            </MaskedLine>
          </h2>

          <Reveal delay={0.12}>
            <p className="skin-plan__lede">
              Your visit, your treatment options and your aftercare — gathered into one folder, so the next
              step is always clear. Open it and choose a page to begin.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="skin-plan__actions">
              <a className="skin-plan__book" href={CLINIC.bookingHref}>
                Book a consultation
                <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
              </a>
              <a className="skin-plan__phone" href={CLINIC.phone.primaryHref}>
                <Phone size={15} strokeWidth={1.7} aria-hidden="true" />
                {CLINIC.phone.primaryDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="skin-plan__object">
          <div className="skin-plan__frame" ref={frameRef}>
            <GlassFolder
              label="Your skin plan"
              meta="3 pages"
              tone="light"
              art={FOLDER_ART}
              seed={7}
              files={FILES}
              action="more"
              menu={menu}
              open={open}
              onOpenChange={setOpen}
              onFileSelect={handleFileSelect}
              width={width}
              appear
              appearDelay={120}
            />
          </div>
          <p className="skin-plan__hint">
            <span className="skin-plan__hint-rule" aria-hidden="true" />
            Open the folder
          </p>
        </div>
      </div>
    </section>
  );
}

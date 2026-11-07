"use client";

import { ArrowRight } from "lucide-react";
import { TestimonialGlobe } from "@/components/ui/testimonial-globe";
import { CLINIC } from "@/lib/clinic";
import { PATIENT_STORIES, PATIENT_STORY_LABELS } from "@/lib/testimonials";
import type { SpecialtyContent } from "@/lib/specialty";

export default function CareGlobe({ data }: { data: SpecialtyContent }) {
  return (
    <section
      className={`spec-globe spec-globe--${data.id}`}
      aria-label={`Patient stories at Aesthédent`}
    >
      <TestimonialGlobe
        items={PATIENT_STORIES}
        eyebrow="Patient voices"
        heading={
          <>
            In their <em>own words.</em>
          </>
        }
        caption="A few words from people who have visited Aesthédent from Bhubaneswar and around the world."
        action={
          <a href={CLINIC.bookingHref} className="spec-globe__cta">
            Book a visit
            <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
        }
        labels={PATIENT_STORY_LABELS}
        placeMode="city"
        autoplay
        interval={6500}
        size={430}
        className={`spec-globe__stage spec-globe__stage--${data.theme}`}
      />
    </section>
  );
}

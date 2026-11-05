import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Shield, Scan, HeartHandshake } from "lucide-react";
import Logo from "@/components/hero/Logo";
import TeamLanyardRail from "@/components/ui/team-lanyard-rail";
import { TestimonialGlobe } from "@/components/ui/testimonial-globe";
import ClinicStandards from "@/components/clinic/ClinicStandards";
import SiteFooter from "@/components/site/SiteFooter";
import { CLINIC } from "@/lib/clinic";
import { PATIENT_STORIES, PATIENT_STORY_LABELS } from "@/lib/testimonials";
import { CLINIC_TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "Our Clinic & Members | Team & Standards | Aesthedent",
  description:
    "Meet our doctors and aesthetic team at Aesthedent in Old Town, Bhubaneswar. Dental, skin, hair and PMU care under one roof.",
};

export default function OurClinicPage() {
  return (
    <div className="our-clinic">
      {/* Luminous Top Navigation Bar */}
      <header className="our-clinic__bar">
        <Logo href="/" className="our-clinic__brand" />
        <span className="our-clinic__bar-label">Our clinic & members</span>
        <Link href="/" className="our-clinic__back">
          <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
          <span>Home</span>
        </Link>
      </header>

      <main id="main">
        {/* Hero Section */}
        <section className="our-clinic__hero">
          <p className="our-clinic__eyebrow">Old Town · Bhubaneswar</p>
          <h1 className="our-clinic__title">
            Our clinic,
            <br />
            <em>our members.</em>
          </h1>
          <p className="our-clinic__lede">
            Dental, skin, hair and PMU care under one roof — and a dedicated clinical team
            that keeps the entire visit unhurried, reassuring, and personal from the first hello
            to aftercare.
          </p>

          {/* Quick Trust Badges Strip */}
          <div className="our-clinic__trust-strip" aria-label="Clinic core assurances">
            <div className="our-clinic__trust-pill">
              <Sparkles size={14} aria-hidden="true" />
              <span>4 Specialities Under One Roof</span>
            </div>
            <div className="our-clinic__trust-pill">
              <Shield size={14} aria-hidden="true" />
              <span>Hospital-Grade Class-B Sterilization</span>
            </div>
            <div className="our-clinic__trust-pill">
              <Scan size={14} aria-hidden="true" />
              <span>100% Digital 3D Scanner Accuracy</span>
            </div>
            <div className="our-clinic__trust-pill">
              <HeartHandshake size={14} aria-hidden="true" />
              <span>Unhurried 1-on-1 Consultations</span>
            </div>
          </div>
        </section>

        {/* 1. Meet the Team (Luminous Lanyard Rail in First Position) */}
        <section className="our-clinic__team" aria-labelledby="our-clinic-team-title">
          <div className="our-clinic__team-head">
            <div>
              <p className="our-clinic__kicker">Meet the Team</p>
              <h2 className="our-clinic__h2" id="our-clinic-team-title">
                The people behind <em>your care.</em>
              </h2>
            </div>
            <p className="our-clinic__team-copy">
              Our dental surgeons, aesthetic specialists, and clinic team work together under one
              roof. Hover or drag the rail, pull a badge, or flip it to read credentials and background.
            </p>
          </div>

          <TeamLanyardRail
            items={CLINIC_TEAM}
            className="our-clinic__rail"
            caption="Hover or swipe the rail, pull a badge, or flip it to read more."
            labels={{
              flip: "Click or press Enter to read the profile",
              back: "Click again or press Esc to turn it back",
              show: "Show",
            }}
          />
        </section>

        {/* 2. Clinical Standards & Technology Matrix */}
        <ClinicStandards />

        {/* 3. Patient Stories (Luminous 3D Globe) */}
        <div className="our-clinic__stories">
          <TestimonialGlobe
            items={PATIENT_STORIES}
            eyebrow="Patient Voices"
            heading={
              <>
                Stories from people <em>we&rsquo;ve cared for.</em>
              </>
            }
            caption="Reflections from patients who have visited us in Old Town, Bhubaneswar and across the globe."
            action={
              <a href={CLINIC.bookingHref} className="our-clinic__stories-cta">
                Book a visit
                <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </a>
            }
            labels={PATIENT_STORY_LABELS}
            placeMode="city"
            autoplay
            interval={6000}
            size={440}
            className="our-clinic__globe"
          />
        </div>
      </main>

      {/* Unified Location Map & Footer */}
      <SiteFooter />
    </div>
  );
}

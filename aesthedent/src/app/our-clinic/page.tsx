import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Logo from "@/components/hero/Logo";
import TeamLanyardRail from "@/components/ui/team-lanyard-rail";
import { TestimonialGlobe } from "@/components/ui/testimonial-globe";
import { CLINIC } from "@/lib/clinic";
import { PATIENT_STORIES, PATIENT_STORY_LABELS } from "@/lib/testimonials";
import { CLINIC_TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "Our Clinic | Meet the Team | Aesthedent",
  description:
    "Meet the people and teams behind Aesthedent, the dental, skin, hair and PMU clinic in Old Town, Bhubaneswar.",
  // TODO(clinic): remove noindex and link this page in the navigation once the team is confirmed.
  robots: { index: false, follow: false },
};

export default function OurClinicPage() {
  return (
    <div className="our-clinic">
      <header className="our-clinic__bar">
        <Logo href="/" className="our-clinic__brand" />
        <span className="our-clinic__bar-label">Our clinic</span>
        <Link href="/" className="our-clinic__back">
          <ArrowLeft size={14} strokeWidth={1.7} aria-hidden="true" />
          Home
        </Link>
      </header>

      <main id="main">
        <section className="our-clinic__hero">
          <p className="our-clinic__eyebrow">Old Town · Bhubaneswar</p>
          <h1 className="our-clinic__title">
            The people
            <br />
            <em>behind your care.</em>
          </h1>
          <p className="our-clinic__lede">
            Dental, skin, hair and PMU care under one roof — and a team that keeps the
            whole visit feeling considered, from the first hello to aftercare.
          </p>
        </section>

        <section className="our-clinic__team" aria-labelledby="our-clinic-team-title">
          <div className="our-clinic__team-head">
            <div>
              <p className="our-clinic__kicker">Meet the team</p>
              <h2 className="our-clinic__h2" id="our-clinic-team-title">
                A closer look at <em>the clinic.</em>
              </h2>
            </div>
            <p className="our-clinic__team-copy">
              Some faces you know; some you&apos;ll meet at the clinic. Every badge is
              someone who makes the visit what it is.
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

        <div className="our-clinic__stories">
          <TestimonialGlobe
            items={PATIENT_STORIES}
            eyebrow="Patient stories"
            heading={
              <>
                Stories from people <em>we&rsquo;ve cared for.</em>
              </>
            }
            caption="A few words from people who have visited us from Bhubaneswar and around the world."
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
    </div>
  );
}

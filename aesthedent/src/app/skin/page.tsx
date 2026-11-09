import type { Metadata } from "next";
import SpecialtyHeader from "@/components/specialty/SpecialtyHeader";
import SpecialtyHero from "@/components/specialty/SpecialtyHero";
import FocusIndex from "@/components/specialty/FocusIndex";
import JourneyFolder from "@/components/specialty/JourneyFolder";
import VisitSteps from "@/components/specialty/VisitSteps";
import TestimonialSection from "@/components/site/TestimonialSection";
import CrossLinks from "@/components/specialty/CrossLinks";
import SpecialtyFaq from "@/components/specialty/SpecialtyFaq";
import ClosingCta from "@/components/specialty/ClosingCta";
import BookingDock from "@/components/specialty/BookingDock";
import { CLINIC } from "@/lib/clinic";
import { SKIN_TREATMENTS } from "@/lib/skin";
import { SPECIALTIES } from "@/lib/specialty";

const data = SPECIALTIES.skin;

const title = "Skin Care | Treatments for Healthier, Clearer Skin | Aesthédent";
const description =
  "Personalized skin care at Aesthédent in Old Town, Bhubaneswar. Explore acne care, pigmentation, anti-ageing, skin rejuvenation and medical facials with Dr. Manisha Mohanty and Dr. Shruti Rath.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/skin" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Aesthédent",
    title,
    description,
    url: "/skin",
    images: [
      {
        url: "/images/hero/skin.webp",
        width: 1295,
        height: 1215,
        alt: "Close-up portrait of healthy, luminous skin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero/skin.webp"],
  },
};

const skinSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "MedicalBusiness"],
  name: "Aesthédent Skin Care",
  description:
    "Skin care at Aesthédent, a multi-speciality aesthetic clinic in Old Town, Bhubaneswar.",
  telephone: CLINIC.phone.primaryHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${CLINIC.address.line1}, ${CLINIC.address.line2}`,
    addressLocality: CLINIC.address.city,
    addressRegion: CLINIC.address.state,
    postalCode: CLINIC.address.postalCode,
    addressCountry: CLINIC.address.country,
  },
  areaServed: { "@type": "City", name: CLINIC.address.city },
  employee: CLINIC.doctors.map((doctor) => ({
    "@type": "Person",
    name: doctor.name,
    description: doctor.credentials,
  })),
  availableService: SKIN_TREATMENTS.map((treatment) => ({
    "@type": "MedicalProcedure",
    name: treatment.name,
    description: treatment.description,
  })),
};

export default function SkinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skinSchema) }}
      />
      <div className="spec-page spec-page--skin" id="top">
        <SpecialtyHeader data={data} />
        <main id="main">
          <SpecialtyHero data={data} />
          <FocusIndex data={data} />
          <JourneyFolder data={data} />
          <VisitSteps data={data} />
          <TestimonialSection service="skin" theme="light" />
          <CrossLinks data={data} />
          <SpecialtyFaq data={data} />
          <ClosingCta data={data} />
        </main>
      </div>
      <BookingDock bookingLabel={data.bookingLabel} theme="light" />
    </>
  );
}

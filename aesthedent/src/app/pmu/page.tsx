import type { Metadata } from "next";
import SpecialtyHeader from "@/components/specialty/SpecialtyHeader";
import SpecialtyHero from "@/components/specialty/SpecialtyHero";
import FocusIndex from "@/components/specialty/FocusIndex";
import JourneyFolder from "@/components/specialty/JourneyFolder";
import VisitSteps from "@/components/specialty/VisitSteps";
import CareGlobe from "@/components/specialty/CareGlobe";
import CrossLinks from "@/components/specialty/CrossLinks";
import SpecialtyFaq from "@/components/specialty/SpecialtyFaq";
import ClosingCta from "@/components/specialty/ClosingCta";
import { CLINIC } from "@/lib/clinic";
import { SPECIALTIES } from "@/lib/specialty";

const data = SPECIALTIES.pmu;

const title = "PMU | Brows, Lips & Eyeliner | Aesthedent";
const description =
  "Permanent makeup at Aesthedent in Old Town, Bhubaneswar. Explore brows, lips and eyeliner, planned with you and drawn with restraint.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pmu" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Aesthedent",
    title,
    description,
    url: "/pmu",
    images: [
      {
        url: "/images/hero/pmu.png",
        width: 1295,
        height: 1215,
        alt: "Editorial close-up of an eyebrow and eye at Aesthedent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero/pmu.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "MedicalBusiness"],
  name: "Aesthedent PMU",
  description:
    "Permanent makeup at Aesthedent, a multi-speciality aesthetic clinic in Old Town, Bhubaneswar.",
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
  availableService: data.focus.map((item) => ({
    "@type": "MedicalProcedure",
    name: item.name,
    description: item.description,
  })),
};

export default function PmuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="spec-page spec-page--pmu" id="top">
        <SpecialtyHeader data={data} />
        <main id="main">
          <SpecialtyHero data={data} />
          <FocusIndex data={data} />
          <JourneyFolder data={data} />
          <VisitSteps data={data} />
          <CareGlobe data={data} />
          <CrossLinks data={data} />
          <SpecialtyFaq data={data} />
          <ClosingCta data={data} />
        </main>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import SkinNavbar from "@/components/skin/SkinNavbar";
import SkinHero from "@/components/skin/SkinHero";
import SkinPlan from "@/components/skin/SkinPlan";
import SkinTreatments from "@/components/skin/SkinTreatments";
import SkinHowItWorks from "@/components/skin/SkinHowItWorks";
import SkinSpecialists from "@/components/skin/SkinSpecialists";
import SkinOtherServices from "@/components/skin/SkinOtherServices";
import SkinFAQ from "@/components/skin/SkinFAQ";
import SkinBottomCta from "@/components/skin/SkinBottomCta";
import ScrollProgress from "@/components/skin/ScrollProgress";
import { CLINIC } from "@/lib/clinic";
import { SKIN_TREATMENTS } from "@/lib/skin";

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
        url: "/images/hero/skin.png",
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
    images: ["/images/hero/skin.png"],
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
      <div className="skin-page" id="top">
        <ScrollProgress />
        <SkinNavbar />
        <main id="main">
          <SkinHero />
          <SkinPlan />
          <SkinTreatments />
          <SkinHowItWorks />
          <SkinSpecialists />
          <SkinOtherServices />
          <SkinFAQ />
          <SkinBottomCta />
        </main>
      </div>
    </>
  );
}

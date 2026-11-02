import type { Metadata } from "next";
import DentalNavbar from "@/components/dental/DentalNavbar";
import DentalHero from "@/components/dental/DentalHero";
import TreatmentsGrid from "@/components/dental/TreatmentsGrid";
import HowItWorks from "@/components/dental/HowItWorks";
import MeetDentists from "@/components/dental/MeetDentists";
import OtherServices from "@/components/dental/OtherServices";
import DentalFAQ from "@/components/dental/DentalFAQ";
import DentalBottomCta from "@/components/dental/DentalBottomCta";
import { CLINIC } from "@/lib/clinic";

const title = "Dental Care | Comprehensive Smiles & Treatments | Aesthedent";
const description =
  "Explore dental check-ups, cleaning, fillings, root canal treatment, crowns and bridges, and teeth whitening at Aesthedent in Old Town, Bhubaneswar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/dental" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Aesthedent",
    title,
    description,
    url: "/dental",
    images: [
      {
        url: "/images/hero/dental.png",
        width: 1295,
        height: 1215,
        alt: "Patient with a bright, healthy smile at Aesthedent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero/dental.png"],
  },
};

const dentalSchema = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalBusiness"],
  name: "Aesthedent Dental Care",
  description:
    "Comprehensive dental treatments including exams, root canal, teeth whitening, crowns, and smile design in Old Town, Bhubaneswar.",
  telephone: CLINIC.phone.primaryHref.replace("tel:", ""),
  areaServed: { "@type": "City", name: CLINIC.address.city },
  employee: CLINIC.doctors.map((doctor) => ({
    "@type": "Person",
    name: doctor.name,
    description: doctor.credentials,
  })),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${CLINIC.address.line1}, ${CLINIC.address.line2}`,
    addressLocality: CLINIC.address.city,
    addressRegion: CLINIC.address.state,
    postalCode: CLINIC.address.postalCode,
    addressCountry: CLINIC.address.country,
  },
  medicalSpecialty: "Dentistry",
  availableService: [
    { "@type": "MedicalProcedure", name: "Check-ups & Exams" },
    { "@type": "MedicalProcedure", name: "Scaling & Teeth Cleaning" },
    { "@type": "MedicalProcedure", name: "Restorative Fillings" },
    { "@type": "MedicalProcedure", name: "Root Canal Treatment" },
    { "@type": "MedicalProcedure", name: "Crowns & Bridges" },
    { "@type": "MedicalProcedure", name: "Teeth Whitening" },
  ],
};

export default function DentalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentalSchema) }}
      />
      <div className="dental-page-wrapper" id="top">
        <DentalNavbar />
        <main id="main">
          <DentalHero />
          <TreatmentsGrid />
          <HowItWorks />
          <MeetDentists />
          <OtherServices />
          <DentalFAQ />
          <DentalBottomCta />
        </main>
      </div>
    </>
  );
}


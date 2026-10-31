import type { Metadata } from "next";
import DentalNavbar from "@/components/dental/DentalNavbar";
import DentalHero from "@/components/dental/DentalHero";
import TreatmentsGrid from "@/components/dental/TreatmentsGrid";
import HowItWorks from "@/components/dental/HowItWorks";
import MeetDentists from "@/components/dental/MeetDentists";
import OtherServices from "@/components/dental/OtherServices";
import DentalFAQ from "@/components/dental/DentalFAQ";
import DentalBottomCta from "@/components/dental/DentalBottomCta";
import DentalFooter from "@/components/dental/DentalFooter";
import { CLINIC } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Dental Care | Comprehensive Smiles & Treatments | Aesthedent",
  description:
    "Explore precision dental check-ups, cleaning, fillings, root canals, crowns, bridges, and teeth whitening at Aesthedent Clinic in Old Town, Bhubaneswar.",
};

const dentalSchema = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalBusiness"],
  name: "Aesthedent Dental Care",
  description:
    "Comprehensive dental treatments including exams, root canal, teeth whitening, crowns, and smile design in Old Town, Bhubaneswar.",
  telephone: CLINIC.phone.primaryHref.replace("tel:", ""),
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
      <div className="dental-page-wrapper">
        <DentalNavbar />
        <main id="dental-main">
          <DentalHero />
          <TreatmentsGrid />
          <HowItWorks />
          <MeetDentists />
          <OtherServices />
          <DentalFAQ />
          <DentalBottomCta />
        </main>
        <DentalFooter />
      </div>
    </>
  );
}


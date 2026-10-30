import Hero from "@/components/hero/Hero";
import { CLINIC } from "@/lib/clinic";
import { SERVICES } from "@/lib/services";

/**
 * TODO(clinic): opening hours are still unconfirmed, so no openingHours
 * data is emitted. Add confirmed hours (and geo/url if provided) before launch.
 */
const clinicSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "MedicalClinic"],
  name: CLINIC.name,
  slogan: CLINIC.tagline,
  description:
    "A multi-speciality aesthetic clinic in Old Town, Bhubaneswar offering dental, skin, hair and PMU care.",
  telephone: CLINIC.phone.primaryHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${CLINIC.address.line1}, ${CLINIC.address.line2}`,
    addressLocality: CLINIC.address.city,
    addressRegion: CLINIC.address.state,
    postalCode: CLINIC.address.postalCode,
    addressCountry: CLINIC.address.country,
  },
  areaServed: { "@type": "City", name: "Bhubaneswar" },
  employee: CLINIC.doctors.map((doctor) => ({
    "@type": "Person",
    name: doctor.name,
    description: doctor.credentials,
  })),
  availableService: SERVICES.map((service) => ({
    "@type": "Service",
    name: service.name,
    description: service.descriptor,
    serviceType: service.name,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <main id="main">
        <Hero />
      </main>
    </>
  );
}

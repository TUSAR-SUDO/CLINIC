import DoodleCrewFooter from "@/components/ui/doodle-crew-footer";
import SiteMap from "@/components/site/SiteMap";
import { CLINIC } from "@/lib/clinic";
import { fraunces } from "@/lib/fonts";

const directionsHref = `https://maps.google.com/?q=${encodeURIComponent(
  `${CLINIC.address.line1}, ${CLINIC.address.line2}, ${CLINIC.address.city} ${CLINIC.address.postalCode}`,
)}`;

const COLUMNS = [
  {
    title: "Care",
    links: [
      { label: "Dental", href: "/dental" },
      { label: "Skin", href: "/skin" },
      { label: "Hair", href: "/hair" },
      { label: "PMU", href: "/pmu" },
    ],
  },
  {
    title: "Clinic",
    links: [
      { label: "Home", href: "/" },
      { label: "Our clinic", href: "/our-clinic" },
      { label: "Doctors", href: "/our-clinic#our-clinic-team" },
      { label: "Contact", href: "/#clinic-info" },
      { label: "Book a visit", href: CLINIC.bookingHref },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: CLINIC.address.shortLine1, href: directionsHref },
      { label: CLINIC.address.shortLine2, href: directionsHref },
      { label: "Get directions", href: directionsHref },
    ],
  },
  {
    title: "Call",
    links: [
      { label: CLINIC.phone.primaryDisplay, href: CLINIC.phone.primaryHref },
      { label: CLINIC.phone.secondaryDisplay, href: CLINIC.phone.secondaryHref },
    ],
  },
];

const CREW = [
  { kind: "yeti", letter: 0, seat: "front", offset: -0.32, name: "Bruno", says: "Here for the smiles." },
  { kind: "bird", letter: 1, seat: "top", offset: 0.02, name: "Pip", says: "Just checking in." },
  {
    kind: "mushroom",
    letter: 2,
    seat: "front",
    offset: 0.12,
    scale: 0.95,
    name: "Morel",
    says: "A little care goes a long way.",
  },
  { kind: "kid", letter: 4, seat: "top", offset: -0.05, name: "Juno", says: "Best seat in the clinic." },
  { kind: "ghost", letter: 6, seat: "behind", offset: 0, name: "Boo", says: "No scary appointments here." },
  { kind: "cat", letter: 7, seat: "front", offset: 0.42, flip: true, name: "Patch", says: "Take it slow." },
] as const;

export default function SiteFooter() {
  return (
    <div className="site-footer-region">
      <SiteMap />
      <DoodleCrewFooter
        className="site-footer"
        wordmark="AESTHEDENT"
        brand="Aesthedent"
        blurb="A multi-speciality aesthetic clinic in Old Town, Bhubaneswar — dental, skin, hair and PMU care under one roof."
        tagline="Dental, skin, hair and PMU — considered care, all under one roof."
        columns={COLUMNS}
        actions={[
          { label: "Book a visit", href: CLINIC.bookingHref, icon: "sparkle", variant: "solid" },
          { label: "Call the clinic", href: CLINIC.phone.primaryHref, icon: "heart", variant: "outline" },
        ]}
        crew={[...CREW]}
        doodles={["sparkle", "heart", "star", "spiral", "plane", "bolt"]}
        doodleCount={10}
        copyright="© 2026 Aesthedent · Old Town, Bhubaneswar"
        legal={[]}
        socials={[]}
        palette={{ background: "#2a0e1e", ink: "#f3eee8", accent: "#d9a79e" }}
        fontFamily={fraunces.style.fontFamily}
        serifFamily={fraunces.style.fontFamily}
        tracking={-0.03}
        height="720px"
      />
    </div>
  );
}

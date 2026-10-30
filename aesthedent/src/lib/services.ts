export type ServiceId = "dental" | "skin" | "hair" | "pmu";

export interface Service {
  id: ServiceId;
  number: string;
  name: string;
  descriptor: string;
  /** TODO(clinic): treatment lists are to be confirmed by the clinic. */
  treatments: readonly string[];
  image: {
    src: string;
    alt: string;
    /** Horizontal / vertical object-position for the tall panel crop. */
    position: string;
  };
  theme: "light" | "dark";
  /** Flex-grow while another panel is open. */
  restingGrow: number;
  radius: string;
  offset: number;
  ctaTheme: "dark" | "cream";
  bookLabel: string;
}

export const SERVICES: readonly Service[] = [
  {
    id: "dental",
    number: "01",
    name: "Dental",
    descriptor: "Healthy smiles for a brighter you",
    treatments: ["Check-ups & cleaning", "Aesthetic dentistry", "Smile care", "Braces"],
    image: {
      src: "/images/services/dental.png",
      alt: "Editorial portrait of a woman smiling, representing dental care",
      position: "50% 48%",
    },
    theme: "light",
    restingGrow: 1.03,
    radius: "1.85rem",
    offset: 16,
    ctaTheme: "dark",
    bookLabel: "Book dental consult",
  },
  {
    id: "skin",
    number: "02",
    name: "Skin",
    descriptor: "Healthy skin for a bright you",
    treatments: ["Acne care", "Pigmentation", "Anti-ageing", "Skin rejuvenation", "Medical facials"],
    image: {
      src: "/images/services/skin.png",
      alt: "Editorial portrait of a woman with luminous skin, representing skin care",
      position: "47% 40%",
    },
    theme: "light",
    restingGrow: 1,
    radius: "4.25rem",
    offset: 0,
    ctaTheme: "dark",
    bookLabel: "Book skin consult",
  },
  {
    id: "hair",
    number: "03",
    name: "Hair",
    descriptor: "Stronger hair. Healthier you.",
    treatments: ["Hair-fall care", "Scalp treatments"],
    image: {
      src: "/images/services/hair.png",
      alt: "Editorial close-up of glossy dark hair, representing hair care",
      position: "32% 44%",
    },
    theme: "dark",
    restingGrow: 0.98,
    radius: "1.75rem",
    offset: 30,
    ctaTheme: "cream",
    bookLabel: "Book hair consult",
  },
  {
    id: "pmu",
    number: "04",
    name: "PMU",
    descriptor: "Natural enhancement. Lasting confidence.",
    treatments: ["Brows", "Lips", "Eyeliner"],
    image: {
      src: "/images/services/pmu.png",
      alt: "Editorial close-up of an eyebrow and eye, representing permanent makeup",
      position: "55% 44%",
    },
    theme: "dark",
    restingGrow: 1.14,
    radius: "2.1rem",
    offset: 40,
    ctaTheme: "cream",
    bookLabel: "Book PMU consult",
  },
];

export const DEFAULT_SERVICE: ServiceId = "skin";

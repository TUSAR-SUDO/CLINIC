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
    descriptor: "HEALTHY SMILES FOR A BRIGHTER YOU.",
    treatments: ["Check-ups & cleaning", "Aesthetic dentistry", "Smile care", "Braces"],
    image: {
      src: "/images/services/dental.png",
      alt: "Editorial portrait of a woman smiling, representing dental care",
      position: "50% 48%",
    },
    theme: "light",
    restingGrow: 0.72,
    radius: "24px 24px 0 0",
    offset: 22,
    ctaTheme: "dark",
    bookLabel: "Book dental consult",
  },
  {
    id: "skin",
    number: "02",
    name: "Skin",
    descriptor: "HEALTHY SKIN. FOR A BRIGHT YOU.",
    treatments: ["Acne care", "Pigmentation", "Anti-ageing", "Skin rejuvenation", "Medical facials"],
    image: {
      src: "/images/services/skin.png",
      alt: "Editorial portrait of a woman with luminous skin, representing skin care",
      position: "47% 40%",
    },
    theme: "light",
    restingGrow: 0.72,
    radius: "40px 40px 0 0",
    offset: 0,
    ctaTheme: "dark",
    bookLabel: "Book skin consult",
  },
  {
    id: "hair",
    number: "03",
    name: "Hair",
    descriptor: "STRONGER HAIR. HEALTHIER YOU.",
    treatments: ["Hair-fall care", "Scalp treatments"],
    image: {
      src: "/images/services/hair.png",
      alt: "Editorial close-up of glossy dark hair, representing hair care",
      position: "32% 44%",
    },
    theme: "dark",
    restingGrow: 0.72,
    radius: "20px 20px 0 0",
    offset: 14,
    ctaTheme: "cream",
    bookLabel: "Book hair consult",
  },
  {
    id: "pmu",
    number: "04",
    name: "PMU",
    descriptor: "NATURAL ENHANCEMENT. LASTING CONFIDENCE.",
    treatments: ["Brows", "Lips", "Eyeliner"],
    image: {
      src: "/images/services/pmu.png",
      alt: "Editorial close-up of an eyebrow and eye, representing permanent makeup",
      position: "55% 44%",
    },
    theme: "dark",
    restingGrow: 0.72,
    radius: "24px 24px 0 0",
    offset: 18,
    ctaTheme: "cream",
    bookLabel: "Book PMU consult",
  },
];

export const DEFAULT_SERVICE: ServiceId = "skin";

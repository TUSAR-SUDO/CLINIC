import { CLINIC } from "@/lib/clinic";

/**
 * Content for the skin specialty page.
 *
 * TODO(clinic): treatment descriptions, step copy and FAQ answers are based on
 * the supplied design and should be confirmed word-for-word by the clinic.
 * Nothing here adds reviews, ratings, outcome claims or patient numbers.
 */

export type SkinIconName =
  | "acne"
  | "pigmentation"
  | "anti-ageing"
  | "rejuvenation"
  | "facials"
  | "maintenance";

export type SkinTone = "blush" | "cream" | "blue";

export interface SkinTreatment {
  id: string;
  index: string;
  name: string;
  description: string;
  icon: SkinIconName;
  tone: SkinTone;
}

export const SKIN_TREATMENTS: readonly SkinTreatment[] = [
  {
    id: "acne-care",
    index: "01",
    name: "Acne care",
    description: "Control breakouts and prevent further flare-ups.",
    icon: "acne",
    tone: "blush",
  },
  {
    id: "pigmentation",
    index: "02",
    name: "Pigmentation",
    description: "Reduce dark spots for a more even tone.",
    icon: "pigmentation",
    tone: "cream",
  },
  {
    id: "anti-ageing",
    index: "03",
    name: "Anti-ageing",
    description: "Address fine lines and improve skin firmness.",
    icon: "anti-ageing",
    tone: "blue",
  },
  {
    id: "skin-rejuvenation",
    index: "04",
    name: "Skin rejuvenation",
    description: "Refresh and restore your skin's natural glow.",
    icon: "rejuvenation",
    tone: "cream",
  },
  {
    id: "medical-facials",
    index: "05",
    name: "Medical facials",
    description: "Clinically curated facials for healthier, clearer skin.",
    icon: "facials",
    tone: "blue",
  },
  {
    id: "skin-maintenance",
    index: "06",
    name: "Skin maintenance",
    description: "Ongoing care for long-term skin health.",
    icon: "maintenance",
    tone: "blush",
  },
];

export const SKIN_STEPS = [
  {
    number: "01",
    title: "Consultation",
    italic: true,
    description: "Understand your skin and concerns.",
  },
  {
    number: "02",
    title: "A plan explained to you",
    italic: false,
    description: "A personalized treatment plan, made for your skin.",
  },
  {
    number: "03",
    title: "Treatment at your pace",
    italic: false,
    description: "Expert care with comfort and safety.",
  },
] as const;

export const SKIN_FAQS = [
  {
    id: "skin-checkup",
    question: "How often should I get a check-up?",
    answer:
      "A check-up every six months helps keep the clinic aware of changes in your skin and lets concerns be reviewed early. Your recommended interval may differ depending on your treatment plan.",
  },
  {
    id: "sensitive-skin",
    question: "Is the treatment safe for sensitive skin?",
    answer:
      "Tell us about your skin history and sensitivities at consultation. We will discuss suitable options and whether a patch test is appropriate for the treatment being considered.",
  },
  {
    id: "sessions",
    question: "How many sessions will I need?",
    answer:
      "It depends on your skin and the treatment plan. We will explain the expected number of sessions at consultation and review progress together as we go.",
  },
] as const;

export const SKIN_COMPANIONS = [
  {
    id: "dental",
    name: "Dental",
    image: "/images/hero/dental.png",
    href: "/dental",
    alt: "Editorial portrait of a woman smiling, representing dental care",
  },
  {
    id: "hair",
    name: "Hair",
    image: "/images/hero/hair.png",
    href: "/#service-hair",
    alt: "Editorial close-up of glossy dark hair, representing hair care",
  },
  {
    id: "pmu",
    name: "PMU",
    image: "/images/hero/pmu.png",
    href: "/#service-pmu",
    alt: "Editorial close-up of an eyebrow and eye, representing permanent makeup",
  },
] as const;

export const SKIN_OTHER_SERVICES = [
  {
    id: "dental",
    name: "Dental",
    image: "/images/services/dental.png",
    href: "/dental",
    tone: "light" as const,
    alt: "Editorial portrait of a woman smiling, representing dental care",
  },
  {
    id: "hair",
    name: "Hair",
    image: "/images/services/hair.png",
    href: "/#service-hair",
    tone: "dark" as const,
    alt: "Editorial close-up of glossy dark hair, representing hair care",
  },
  {
    id: "pmu",
    name: "PMU",
    image: "/images/services/pmu.png",
    href: "/#service-pmu",
    tone: "berry" as const,
    alt: "Editorial close-up of an eyebrow and eye, representing permanent makeup",
  },
] as const;

export const SKIN_SPECIALISTS = CLINIC.doctors.map((doctor) => ({
  ...doctor,
  // TODO(clinic): replace the supplied low-resolution portraits with final
  // high-resolution clinic photography when available.
  image: doctor.name.includes("Manisha")
    ? "/images/skin/dr-manisha.png"
    : "/images/skin/dr-shruti.png",
}));

export const SKIN_NAV = [
  { label: "Dental", href: "/dental" },
  { label: "Skin", href: "/skin", active: true },
  { label: "Hair", href: "/#service-hair" },
  { label: "PMU", href: "/#service-pmu" },
  { label: "Doctors", href: "#skin-specialists" },
  { label: "Contact", href: "#skin-contact" },
] as const;

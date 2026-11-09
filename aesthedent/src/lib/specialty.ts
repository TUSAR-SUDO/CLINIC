import type { ArtRecipe } from "@/components/ui/glass-folder-art";

/**
 * Content for the Hair and PMU specialty pages.
 *
 * TODO(clinic): treatment descriptions, visit steps and FAQ answers are written
 * as neutral service copy from the confirmed treatment names. Replace any
 * wording the clinic wants changed before launch. Nothing here adds reviews,
 * ratings, outcome claims or patient numbers.
 */

export type SpecialtyId = "skin" | "hair" | "pmu";
export type SpecialtyTheme = "dark" | "light";

export interface SpecialtyFocus {
  id: string;
  index: string;
  name: string;
  kicker: string;
  description: string;
  imagePosition: string;
}

export interface SpecialtyStep {
  number: string;
  title: string;
  italic?: boolean;
  description: string;
}

export interface SpecialtyFaq {
  id: string;
  question: string;
  answer: string;
}

export interface SpecialtyCrossLink {
  id: string;
  name: string;
  note: string;
  image: string;
  alt: string;
  href: string;
  tone: "light" | "dark" | "accent";
}

export interface SpecialtyContent {
  id: SpecialtyId;
  index: string;
  label: string;
  theme: SpecialtyTheme;
  eyebrow: string;
  titleTop: string;
  titleEm: string;
  lede: string;
  heroImage: string;
  heroAlt: string;
  heroPosition: string;
  heroWord: string;
  heroNote: string;
  ticker: readonly string[];
  focusKicker: string;
  focusTitle: string;
  focusTitleEm: string;
  focusLede: string;
  focus: readonly SpecialtyFocus[];
  folderKicker: string;
  folderTitleTop: string;
  folderTitleEm: string;
  folderLede: string;
  folderArt: ArtRecipe;
  folderFiles: readonly { name: string; meta: string }[];
  folderTargets: readonly string[];
  stepsKicker: string;
  stepsTitleTop: string;
  stepsTitleEm: string;
  steps: readonly SpecialtyStep[];
  crossKicker: string;
  crossTitleTop: string;
  crossTitleEm: string;
  crossLinks: readonly SpecialtyCrossLink[];
  faqs: readonly SpecialtyFaq[];
  bookingLabel: string;
  navIndex: number;
}

export const SPECIALTIES: Record<SpecialtyId, SpecialtyContent> = {
  hair: {
    id: "hair",
    index: "03",
    label: "Hair",
    theme: "dark",
    eyebrow: "03 — Hair & scalp",
    titleTop: "Hair,",
    titleEm: "from the root.",
    lede: "Hair-fall care and scalp treatments, with a consultation first and every step explained.",
    heroImage: "/images/hero/hair.webp",
    heroAlt: "Editorial close-up of glossy dark hair at Aesthédent",
    heroPosition: "32% 44%",
    heroWord: "HAIR",
    heroNote: "Hair · Scalp",
    ticker: [
      "Hair-fall care",
      "Scalp treatments",
      "Consultation first",
      "Explained clearly",
      "Your pace",
    ],
    focusKicker: "The focus",
    focusTitle: "Two ways",
    focusTitleEm: "in.",
    focusLede:
      "Start with the concern, not the treatment. We look at what is happening and explain the options that fit.",
    focus: [
      {
        id: "hair-fall-care",
        index: "01",
        name: "Hair-fall care",
        kicker: "The concern",
        description:
          "A consultation-led look at hair fall and the factors around it, with the next step explained clearly.",
        imagePosition: "22% 42%",
      },
      {
        id: "scalp-treatments",
        index: "02",
        name: "Scalp treatments",
        kicker: "The foundation",
        description:
          "Focused care for the scalp, planned around what we find and kept comfortable throughout.",
        imagePosition: "72% 56%",
      },
    ],
    folderKicker: "The folder",
    folderTitleTop: "Your visit,",
    folderTitleEm: "in one place.",
    folderLede:
      "The conversation, the plan and the questions that come after — gathered into one folder, so the next step is always clear.",
    folderArt: {
      style: "streak",
      colors: ["#160f0d", "#3b241a", "#9c6c4e", "#e6c7a9", "#20130f", "#d9a79e"],
      scale: 0.78,
      warp: 2.35,
      angle: -0.5,
      gloss: 0.36,
      veins: 0.18,
    },
    folderFiles: [
      { name: "Consultation", meta: "Start here" },
      { name: "Your care plan", meta: "Explained" },
      { name: "Aftercare", meta: "Questions" },
    ],
    folderTargets: ["hair-focus", "hair-visit", "hair-faq"],
    stepsKicker: "How it feels",
    stepsTitleTop: "A considered",
    stepsTitleEm: "visit.",
    steps: [
      {
        number: "01",
        title: "Start with the concern",
        italic: true,
        description:
          "Tell us what you have noticed about your hair or scalp. The consultation begins with your questions.",
      },
      {
        number: "02",
        title: "A plan you can follow",
        description:
          "We explain what we can look at, what the options are, and what the next step would mean for you.",
      },
      {
        number: "03",
        title: "Care at your pace",
        description:
          "Nothing is rushed. You leave knowing what happens next and when to ask for help.",
      },
    ],
    crossKicker: "More at Aesthédent",
    crossTitleTop: "Keep",
    crossTitleEm: "looking.",
    crossLinks: [
      {
        id: "skin",
        name: "Skin",
        note: "Acne, pigmentation and skin health.",
        image: "/images/services/skin.webp",
        alt: "Editorial portrait of a woman with luminous skin",
        href: "/skin",
        tone: "light",
      },
      {
        id: "dental",
        name: "Dental",
        note: "Check-ups, smile care and braces.",
        image: "/images/services/dental.webp",
        alt: "Editorial portrait of a woman smiling",
        href: "/dental",
        tone: "dark",
      },
      {
        id: "pmu",
        name: "PMU",
        note: "Brows, lips and eyeliner.",
        image: "/images/services/pmu.webp",
        alt: "Editorial close-up of an eyebrow and eye",
        href: "/pmu",
        tone: "accent",
      },
    ],
    faqs: [
      {
        id: "hair-first-visit",
        question: "What happens at the first visit?",
        answer:
          "We begin with a conversation about your hair, scalp and routine, then explain what we can look at and what the next step would be.",
      },
      {
        id: "hair-prepare",
        question: "Do I need to prepare anything?",
        answer:
          "Bring your questions and, if you have one, a note of any products or treatments you are currently using. We will tell you if anything else is needed.",
      },
      {
        id: "hair-booking",
        question: "How do I book?",
        answer:
          "Call the clinic or use the book-a-visit button. We will help you find the right appointment and answer anything you need before you come in.",
      },
    ],
    bookingLabel: "Book a hair consultation",
    navIndex: 2,
  },
  skin: {
    id: "skin",
    index: "02",
    label: "Skin",
    theme: "light",
    eyebrow: "02 — Skin health",
    titleTop: "Skin,",
    titleEm: "cared for.",
    lede:
      "Skin care that begins with what your skin is doing now, planned with you and explained before anything starts.",
    heroImage: "/images/hero/skin.webp",
    heroAlt: "Close-up portrait of healthy, luminous skin at Aesthédent",
    heroPosition: "58% 42%",
    heroWord: "SKIN",
    heroNote: "Acne · Pigment · Glow",
    ticker: [
      "Acne care",
      "Pigmentation",
      "Anti-ageing",
      "Medical facials",
      "Your pace",
    ],
    focusKicker: "The focus",
    focusTitle: "Three ways",
    focusTitleEm: "in.",
    focusLede:
      "Start with the concern, not the treatment. We look at what your skin is doing and explain the options that fit.",
    focus: [
      {
        id: "skin-acne-care",
        index: "01",
        name: "Acne care",
        kicker: "The concern",
        description:
          "Control breakouts and prevent further flare-ups, with a plan explained before you begin.",
        imagePosition: "30% 36%",
      },
      {
        id: "skin-pigmentation",
        index: "02",
        name: "Pigmentation",
        kicker: "The tone",
        description:
          "Reduce dark spots for a more even tone, reviewed with you as treatment goes on.",
        imagePosition: "62% 44%",
      },
      {
        id: "skin-anti-ageing",
        index: "03",
        name: "Anti-ageing",
        kicker: "The finish",
        description:
          "Address fine lines and improve skin firmness, at a pace that suits your skin.",
        imagePosition: "46% 58%",
      },
    ],
    folderKicker: "The folder",
    folderTitleTop: "Your skin plan,",
    folderTitleEm: "in one place.",
    folderLede:
      "The consultation, your treatment plan and the aftercare questions — gathered into one folder, so the next step is always clear.",
    folderArt: {
      style: "marble",
      colors: ["#5a1b31", "#d9a79e", "#f3eee8", "#b9cfdb", "#e7c3bd", "#7a3b4e"],
      scale: 0.72,
      warp: 2.5,
      angle: 0.4,
      gloss: 0.4,
      veins: 0.22,
    },
    folderFiles: [
      { name: "Consultation", meta: "Start here" },
      { name: "Your skin plan", meta: "Explained" },
      { name: "Aftercare", meta: "Questions" },
    ],
    folderTargets: ["skin-focus", "skin-visit", "skin-faq"],
    stepsKicker: "How it feels",
    stepsTitleTop: "A considered",
    stepsTitleEm: "visit.",
    steps: [
      {
        number: "01",
        title: "Understand your skin",
        italic: true,
        description:
          "Tell us what you have noticed and what you have already tried. The consultation begins with your concerns.",
      },
      {
        number: "02",
        title: "A plan explained to you",
        description:
          "A personalized treatment plan, with the options, the sessions and the next step explained.",
      },
      {
        number: "03",
        title: "Care at your pace",
        description:
          "Nothing is rushed. You leave knowing what happens next and when to ask for help.",
      },
    ],
    crossKicker: "More at Aesthédent",
    crossTitleTop: "Keep",
    crossTitleEm: "looking.",
    crossLinks: [
      {
        id: "dental",
        name: "Dental",
        note: "Check-ups, smile care and braces.",
        image: "/images/services/dental.webp",
        alt: "Editorial portrait of a woman smiling",
        href: "/dental",
        tone: "dark",
      },
      {
        id: "hair",
        name: "Hair",
        note: "Hair-fall care and scalp treatments.",
        image: "/images/services/hair.webp",
        alt: "Editorial close-up of glossy dark hair",
        href: "/hair",
        tone: "dark",
      },
      {
        id: "pmu",
        name: "PMU",
        note: "Brows, lips and eyeliner.",
        image: "/images/services/pmu.webp",
        alt: "Editorial close-up of an eyebrow and eye",
        href: "/pmu",
        tone: "accent",
      },
    ],
    faqs: [
      {
        id: "skin-checkup",
        question: "How often should I get a check-up?",
        answer:
          "A check-up every six months helps keep the clinic aware of changes in your skin and lets concerns be reviewed early. Your recommended interval may differ depending on your treatment plan.",
      },
      {
        id: "skin-sensitive",
        question: "Is the treatment safe for sensitive skin?",
        answer:
          "Tell us about your skin history and sensitivities at consultation. We will discuss suitable options and whether a patch test is appropriate for the treatment being considered.",
      },
      {
        id: "skin-sessions",
        question: "How many sessions will I need?",
        answer:
          "It depends on your skin and the treatment plan. We will explain the expected number of sessions at consultation and review progress together as we go.",
      },
    ],
    bookingLabel: "Book a skin consultation",
    navIndex: 1,
  },
  pmu: {
    id: "pmu",
    index: "04",
    label: "PMU",
    theme: "light",
    eyebrow: "04 — Permanent makeup",
    titleTop: "PMU,",
    titleEm: "the art of less.",
    lede: "Brows, lips and eyeliner, mapped with you and drawn with restraint.",
    heroImage: "/images/hero/pmu.webp",
    heroAlt: "Editorial close-up of an eyebrow and eye at Aesthédent",
    heroPosition: "52% 42%",
    heroWord: "PMU",
    heroNote: "Brows · Lips · Eyeliner",
    ticker: ["Brows", "Lips", "Eyeliner", "Mapped with you", "Drawn with restraint"],
    focusKicker: "The details",
    focusTitle: "Three details.",
    focusTitleEm: "",
    focusLede:
      "The best permanent makeup does not announce itself. We plan the shape, the tone and the finish around what is already yours.",
    focus: [
      {
        id: "pmu-brows",
        index: "01",
        name: "Brows",
        kicker: "The frame",
        description:
          "Shape and definition, mapped around your features before the detail is placed.",
        imagePosition: "56% 24%",
      },
      {
        id: "pmu-lips",
        index: "02",
        name: "Lips",
        kicker: "The colour",
        description:
          "A considered outline and tone, planned with you rather than over you.",
        imagePosition: "22% 64%",
      },
      {
        id: "pmu-eyeliner",
        index: "03",
        name: "Eyeliner",
        kicker: "The line",
        description:
          "Definition drawn with restraint, so the eye still reads as yours.",
        imagePosition: "72% 50%",
      },
    ],
    folderKicker: "The folder",
    folderTitleTop: "Your detail,",
    folderTitleEm: "in one place.",
    folderLede:
      "The shape, the plan and the questions that come after — gathered into one folder, so the next step is always clear.",
    folderArt: {
      style: "marble",
      colors: ["#5a1b31", "#a84560", "#e7c3bd", "#f8eee9", "#2a0c19", "#d9a79e"],
      scale: 0.7,
      warp: 2.8,
      angle: 0.7,
      gloss: 0.42,
      veins: 0.24,
    },
    folderFiles: [
      { name: "Consultation", meta: "Start here" },
      { name: "Your detail plan", meta: "Explained" },
      { name: "Aftercare", meta: "Questions" },
    ],
    folderTargets: ["pmu-focus", "pmu-visit", "pmu-faq"],
    stepsKicker: "How it feels",
    stepsTitleTop: "A precise",
    stepsTitleEm: "visit.",
    steps: [
      {
        number: "01",
        title: "Map the detail",
        italic: true,
        description:
          "Begin with the shape, tone and finish you have in mind. The consultation is where the detail is planned.",
      },
      {
        number: "02",
        title: "Plan the finish",
        description:
          "We explain what the appointment involves, what is being proposed, and what happens afterwards.",
      },
      {
        number: "03",
        title: "Care at your pace",
        description:
          "Nothing is rushed. You leave knowing what happens next and when to ask for help.",
      },
    ],
    crossKicker: "More at Aesthédent",
    crossTitleTop: "Keep",
    crossTitleEm: "looking.",
    crossLinks: [
      {
        id: "hair",
        name: "Hair",
        note: "Hair-fall care and scalp treatments.",
        image: "/images/services/hair.webp",
        alt: "Editorial close-up of glossy dark hair",
        href: "/hair",
        tone: "dark",
      },
      {
        id: "skin",
        name: "Skin",
        note: "Acne, pigmentation and skin health.",
        image: "/images/services/skin.webp",
        alt: "Editorial portrait of a woman with luminous skin",
        href: "/skin",
        tone: "light",
      },
      {
        id: "dental",
        name: "Dental",
        note: "Check-ups, smile care and braces.",
        image: "/images/services/dental.webp",
        alt: "Editorial portrait of a woman smiling",
        href: "/dental",
        tone: "accent",
      },
    ],
    faqs: [
      {
        id: "pmu-consultation",
        question: "Can I start with a consultation?",
        answer:
          "Yes. Start with a conversation about the shape, tone and finish you have in mind. We will explain what the appointment involves and whether it is right for you.",
      },
      {
        id: "pmu-plan",
        question: "Will I know what is being proposed?",
        answer:
          "The consultation is where the look is planned together, including shape, tone and finish. You can ask questions before you decide on anything.",
      },
      {
        id: "pmu-questions",
        question: "What should I ask at my consultation?",
        answer:
          "Ask about the look you want, what the appointment involves, and how the area is cared for afterwards. If anything is unclear, we will explain it before you decide.",
      },
    ],
    bookingLabel: "Book a PMU consultation",
    navIndex: 3,
  },
};

export const SPECIALTY_IDS = ["skin", "hair", "pmu"] as const;

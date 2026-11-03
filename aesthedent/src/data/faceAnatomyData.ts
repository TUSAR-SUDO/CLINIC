export interface Hotspot {
  id: string;
  label: string;
  text: string;
  category: "skin" | "pmu" | "dental" | "hair";
  /** Horizontal position as a percentage (0–100) from the top-left of the image */
  x: number;
  /** Vertical position as a percentage (0–100) from the top-left of the image */
  y: number;
  href: string;
}

export interface AnatomyLandmark {
  id: string;
  name: string;
  latinName: string;
  side: "left" | "right";
  category: "vein" | "muscle";
  /** Facial coordinate (x, y as percentages 0-100 on the portrait image) */
  origin: { x: number; y: number };
  /** Destination anchor for label on portrait container */
  target: { x: number; y: number };
}

export const DEFAULT_HOTSPOTS: Hotspot[] = [
  {
    id: "forehead",
    label: "Forehead",
    text: "Skin health & rejuvenation",
    category: "skin",
    x: 50,
    y: 38,
    href: "/skin",
  },
  {
    id: "eyes",
    label: "Eyes & Brows",
    text: "Microblading & lash-line PMU",
    category: "pmu",
    x: 50,
    y: 50,
    href: "#pmu",
  },
  {
    id: "lips",
    label: "Lips",
    text: "Lip blush & contour PMU",
    category: "pmu",
    x: 50,
    y: 61,
    href: "#pmu",
  },
  {
    id: "jaw",
    label: "Jaw & Smile",
    text: "Smile design & dental aesthetics",
    category: "dental",
    x: 50,
    y: 70,
    href: "/dental",
  },
  {
    id: "hair",
    label: "Scalp & Hairline",
    text: "Hair restoration & scalp therapy",
    category: "hair",
    x: 18,
    y: 41,
    href: "#hair",
  },
  {
    id: "hair2",
    label: "Crown & Flowers",
    text: "Holistic hair nutrition",
    category: "hair",
    x: 79,
    y: 40,
    href: "#hair",
  },
];

/**
 * Authentic vein and muscle callouts matching the physical clinic wall mural
 * Left targets start at x: 4% and grow rightward into whitespace.
 * Right targets anchor at x: 96% and grow leftward into whitespace.
 */
export const ANATOMY_LANDMARKS: AnatomyLandmark[] = [
  // --- Left Side: Vascular (Veins) ---
  {
    id: "supratrochlear-vein",
    name: "Supratrochlear vein",
    latinName: "v. supratrochlearis",
    side: "left",
    category: "vein",
    origin: { x: 44, y: 34 },
    target: { x: 2, y: 26 },
  },
  {
    id: "superficial-temporal-vein",
    name: "Superficial temporal vein",
    latinName: "v. temporalis superficialis",
    side: "left",
    category: "vein",
    origin: { x: 33, y: 39 },
    target: { x: 0, y: 33 },
  },
  {
    id: "supraorbital-vein",
    name: "Supraorbital vein",
    latinName: "v. supraorbitalis",
    side: "left",
    category: "vein",
    origin: { x: 38, y: 44 },
    target: { x: 1, y: 41 },
  },
  {
    id: "angular-vein",
    name: "Angular vein",
    latinName: "v. angularis",
    side: "left",
    category: "vein",
    origin: { x: 43, y: 49 },
    target: { x: 0, y: 49 },
  },
  {
    id: "facial-vein",
    name: "Facial vein",
    latinName: "v. facialis",
    side: "left",
    category: "vein",
    origin: { x: 40, y: 57 },
    target: { x: 2, y: 58 },
  },
  {
    id: "retromandibular-vein",
    name: "Retromandibular vein",
    latinName: "v. retromandibularis",
    side: "left",
    category: "vein",
    origin: { x: 34, y: 64 },
    target: { x: 0, y: 66 },
  },

  // --- Right Side: Facial Muscles ---
  {
    id: "frontalis-muscle",
    name: "Frontalis muscle",
    latinName: "m. frontalis",
    side: "right",
    category: "muscle",
    origin: { x: 58, y: 34 },
    target: { x: 98, y: 27 },
  },
  {
    id: "procerus-muscle",
    name: "Procerus muscle",
    latinName: "m. procerus",
    side: "right",
    category: "muscle",
    origin: { x: 50, y: 41 },
    target: { x: 98, y: 35 },
  },
  {
    id: "orbicularis-oculi",
    name: "Orbicularis oculi",
    latinName: "m. orbicularis oculi",
    side: "right",
    category: "muscle",
    origin: { x: 62, y: 45 },
    target: { x: 99, y: 43 },
  },
  {
    id: "zygomaticus-muscle",
    name: "Zygomaticus muscle",
    latinName: "m. zygomaticus",
    side: "right",
    category: "muscle",
    origin: { x: 60, y: 52 },
    target: { x: 98, y: 51 },
  },
  {
    id: "masseter-muscle",
    name: "Masseter muscle",
    latinName: "m. masseter",
    side: "right",
    category: "muscle",
    origin: { x: 67, y: 58 },
    target: { x: 99, y: 59 },
  },
  {
    id: "buccinator-muscle",
    name: "Buccinator muscle",
    latinName: "m. buccinator",
    side: "right",
    category: "muscle",
    origin: { x: 58, y: 61 },
    target: { x: 98, y: 67 },
  },
  {
    id: "platysma",
    name: "Platysma",
    latinName: "platysma",
    side: "right",
    category: "muscle",
    origin: { x: 61, y: 72 },
    target: { x: 99, y: 75 },
  },
];

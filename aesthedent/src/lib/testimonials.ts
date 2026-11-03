import type {
  GlobeTestimonial,
  TestimonialGlobeLabels,
} from "@/components/ui/testimonial-globe";

/**
 * Placeholder patient stories for the /our-clinic section.
 *
 * These are written as experience-focused examples, not medical or outcome
 * claims. Cities are intentionally spread across the globe so the map reads as
 * a world map rather than a single cluster. Replace every quote, name, city and
 * portrait with verified, consented patient feedback before launch. Ratings are
 * intentionally omitted until the clinic supplies real review data.
 */
export const PATIENT_STORIES: GlobeTestimonial[] = [
  {
    id: "ananya-bhubaneswar",
    quote:
      "The team walked me through every step before we started. I left knowing exactly what happens next — and when to call.",
    name: "Ananya P.",
    role: "Dental care",
    city: "Bhubaneswar",
    country: "IN",
    lat: 20.2961,
    lng: 85.8245,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 1,
  },
  {
    id: "sneha-singapore",
    quote:
      "My brows were mapped carefully before anything began. I appreciated how much time went into getting the shape right.",
    name: "Sneha K.",
    role: "PMU",
    city: "Singapore",
    country: "SG",
    lat: 1.3521,
    lng: 103.8198,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 2,
  },
  {
    id: "aarav-sydney",
    quote:
      "I was nervous about my first consultation. The questions were patient, the plan was clear, and nothing felt rushed.",
    name: "Aarav M.",
    role: "Dental care",
    city: "Sydney",
    country: "AU",
    lat: -33.8688,
    lng: 151.2093,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 3,
  },
  {
    id: "rohan-dubai",
    quote:
      "The clinic was calm, the appointment started on time, and I never felt like a number in a queue.",
    name: "Rohan M.",
    role: "Skin care",
    city: "Dubai",
    country: "AE",
    lat: 25.2048,
    lng: 55.2708,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 4,
  },
  {
    id: "meera-nairobi",
    quote:
      "The follow-up message after my appointment was thoughtful. It made a new city feel a little less unfamiliar.",
    name: "Meera R.",
    role: "Hair care",
    city: "Nairobi",
    country: "KE",
    lat: -1.2921,
    lng: 36.8219,
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 5,
  },
  {
    id: "karan-cape-town",
    quote:
      "I came in with a long list of questions. Every one was answered, and I never felt hurried out of the room.",
    name: "Karan V.",
    role: "Dental care",
    city: "Cape Town",
    country: "ZA",
    lat: -33.9249,
    lng: 18.4241,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 1,
  },
  {
    id: "priya-london",
    quote:
      "They explained the aftercare in plain language and wrote it down for me. That small thing made the visit feel considered.",
    name: "Priya S.",
    role: "Skin care",
    city: "London",
    country: "GB",
    lat: 51.5074,
    lng: -0.1278,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 2,
  },
  {
    id: "nandini-sao-paulo",
    quote:
      "The consultation covered what would help and what would not. That honesty is why I booked the next visit.",
    name: "Nandini B.",
    role: "Skin care",
    city: "São Paulo",
    country: "BR",
    lat: -23.5505,
    lng: -46.6333,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 3,
  },
  {
    id: "debasis-toronto",
    quote:
      "Even with a busy schedule, the team found a time that worked and kept the visit moving without making it feel rushed.",
    name: "Debasis N.",
    role: "Family visit",
    city: "Toronto",
    country: "CA",
    lat: 43.6532,
    lng: -79.3832,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 4,
  },
  {
    id: "vikram-san-francisco",
    quote:
      "A second opinion was easy to arrange, and the team compared the options without pushing me toward one.",
    name: "Vikram S.",
    role: "Dental care",
    city: "San Francisco",
    country: "US",
    lat: 37.7749,
    lng: -122.4194,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&h=160&q=80",
    tone: 5,
  },
];

export const PATIENT_STORY_LABELS: TestimonialGlobeLabels = {
  previous: "Previous patient story",
  next: "Next patient story",
  pin: "Read the patient story from",
  review: "story",
  reviews: "stories",
  average: "average",
  place: "city",
  places: "cities",
};

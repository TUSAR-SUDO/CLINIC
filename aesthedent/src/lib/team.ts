import type { LanyardMember } from "@/components/ui/team-lanyard-rail";
import { CLINIC } from "./clinic";

/**
 * The two doctors are the clinic's confirmed profiles. The four group cards
 * keep the page complete until the wider team is confirmed — replace each
 * one with a named member, portrait and bio as details arrive.
 */
export const CLINIC_TEAM: LanyardMember[] = [
  {
    id: "manisha-mohanty",
    name: "Dr. Manisha Mohanty",
    badgeName: "Manisha Mohanty",
    role: "Dental Surgeon",
    team: "AESTHÉDENT · DENTAL",
    image: "/images/dental/dr-manisha.png",
    bio: "BDS, MPH. Part of the dental care team at Aesthédent in Old Town, Bhubaneswar.",
    tags: ["BDS, MPH", "Dentistry"],
    links: [{ label: "Call the clinic", href: CLINIC.phone.primaryHref }],
    tone: 1,
    drop: 6,
  },
  {
    id: "shruti-rath",
    name: "Dr. Shruti Rath",
    badgeName: "Shruti Rath",
    role: "Dental Surgeon",
    team: "AESTHÉDENT · DENTAL",
    image: "/images/dental/dr-shruti.png",
    bio: "BDS. Part of the dental care team at Aesthédent in Old Town, Bhubaneswar.",
    tags: ["BDS", "Dentistry"],
    links: [{ label: "Call the clinic", href: CLINIC.phone.primaryHref }],
    tone: 2,
    drop: 20,
  },
  {
    id: "front-of-house",
    name: "Front of house",
    role: "Patient care",
    team: "AESTHÉDENT · CLINIC",
    image: "/images/doctors/team-placeholder.svg",
    bio: "The welcome at the door, the handover between appointments, and the calm in between.",
    tags: ["Clinic team"],
    tone: 3,
    drop: 0,
  },
  {
    id: "skin-team",
    name: "Skin team",
    role: "Aesthetic care",
    team: "AESTHÉDENT · SKIN",
    image: "/images/doctors/team-placeholder.svg",
    bio: "Skin consultations, treatments and ongoing care, delivered by the clinic's skin team.",
    tags: ["Skin care"],
    tone: 4,
    drop: 13,
  },
  {
    id: "hair-team",
    name: "Hair team",
    role: "Hair care",
    team: "AESTHÉDENT · HAIR",
    image: "/images/doctors/team-placeholder.svg",
    bio: "Hair restoration and scalp care, with a plan built around the person in the chair.",
    tags: ["Hair care"],
    tone: 5,
    drop: 22,
  },
  {
    id: "pmu-studio",
    name: "PMU studio",
    role: "Permanent makeup",
    team: "AESTHÉDENT · PMU",
    image: "/images/doctors/team-placeholder.svg",
    bio: "Brows, lips and eyeliner, mapped to your features before anything begins.",
    tags: ["Permanent makeup"],
    tone: 1,
    drop: 4,
  },
];

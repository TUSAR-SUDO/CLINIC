/**
 * Single source of truth for Aesthedent's confirmed brand details.
 * Do not add reviews, ratings, awards, patient counts or claims here.
 */
export const CLINIC = {
  name: "Aesthedent",
  tagline: "Your one stop destination",
  address: {
    line1: "265, Giani Zail Singh Rd",
    line2: "Basisthanagar, Old Town",
    city: "Bhubaneswar",
    state: "Odisha",
    postalCode: "751002",
    country: "IN",
    shortLine1: "265 Giani Zail Singh Rd",
    shortLine2: "Old Town, Bhubaneswar",
  },
  phone: {
    primaryDisplay: "96924 85602",
    primaryHref: "tel:+919692485602",
    secondaryDisplay: "88950 86474",
    secondaryHref: "tel:+918895086474",
  },
  /**
   * Hours are intentionally conservative until the clinic confirms its opening time.
   * TODO(clinic): set opensAtHour and replace the "opens tomorrow" copy with the
   * confirmed opening time once supplied.
   */
  hours: {
    timeZone: "Asia/Kolkata",
    closesAtHour: 20,
  },
  doctors: [
    { name: "Dr. Manisha Mohanty", credentials: "BDS, MPH", avatar: "/images/doctors/manisha.svg" },
    { name: "Dr. Shruti Rath", credentials: "BDS", avatar: "/images/doctors/shruti.svg" },
  ],
  /** TODO(clinic): replace with the real booking destination when confirmed. */
  bookingHref: "tel:+919692485602",
  nav: [
    { label: "Dental", href: "#service-dental" },
    { label: "Skin", href: "#service-skin" },
    { label: "Hair", href: "#service-hair" },
    { label: "PMU", href: "#service-pmu" },
    { label: "Doctors", href: "#doctors" },
    { label: "Contact", href: "#clinic-info" },
  ],
} as const;

export type ClinicOpenState = {
  isOpen: boolean;
  label: string;
};

/**
 * The clinic asked for a simple live rule until hours are confirmed:
 * open while the Asia/Kolkata hour is before 20:00, otherwise closed.
 */
export function getClinicOpenState(now: Date = new Date()): ClinicOpenState {
  const hourPart = new Intl.DateTimeFormat("en-GB", {
    timeZone: CLINIC.hours.timeZone,
    hour: "numeric",
    hourCycle: "h23",
  })
    .formatToParts(now)
    .find((part) => part.type === "hour");

  const hour = Number(hourPart?.value ?? "0");

  return hour < CLINIC.hours.closesAtHour
    ? { isOpen: true, label: "Open now" }
    : { isOpen: false, label: "Closed, opens tomorrow" };
}

export const SERVICE_TABS = CLINIC.nav.slice(0, 4);

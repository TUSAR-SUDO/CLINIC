import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

/**
 * TODO(clinic): replace the two placeholder SVGs in /public/images/doctors
 * with real, approved headshots of Dr. Manisha Mohanty and Dr. Shruti Rath.
 */
export default function DoctorsCard() {
  return (
    <aside id="doctors" className="doctors-card" aria-label="Doctors at Aesthedent">
      <span className="doctors-card__avatars" aria-hidden="true">
        {CLINIC.doctors.map((doctor) => (
          <span className="doctors-card__avatar" key={doctor.name}>
            <Image
              src={doctor.avatar}
              alt=""
              width={54}
              height={54}
              unoptimized
              sizes="54px"
            />
          </span>
        ))}
      </span>

      <span className="doctors-card__names">
        {CLINIC.doctors.map((doctor) => (
          <span key={doctor.name}>{doctor.name}</span>
        ))}
      </span>

      <a
        className="doctors-card__arrow"
        href={CLINIC.bookingHref}
        aria-label="Call Aesthedent to book with the doctors"
        title="Call to book"
      >
        <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </aside>
  );
}

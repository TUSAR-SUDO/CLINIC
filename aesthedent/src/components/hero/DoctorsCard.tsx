import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

export default function DoctorsCard() {
  return (
    <aside id="doctors" className="doctors-card" aria-label="Doctors at Aesthedent">
      <div className="doctors-card__left">
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

        <span className="doctors-card__v-divider" aria-hidden="true" />

        <div className="doctors-card__names">
          {CLINIC.doctors.map((doctor) => (
            <span key={doctor.name} className="doctors-card__doctor-name">
              {doctor.name}
            </span>
          ))}
          <span className="doctors-card__subtitle">AESTHETIC & DENTAL CARE</span>
        </div>
      </div>

      <Link
        className="doctors-card__arrow"
        href="/our-clinic#our-clinic-team"
        aria-label="Meet the doctors at Aesthedent"
        title="Meet the team"
      >
        <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
      </Link>
    </aside>
  );
}

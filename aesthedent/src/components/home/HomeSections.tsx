import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import { SERVICES, type ServiceId } from "@/lib/services";

const SERVICE_ROUTES: Partial<Record<ServiceId, string>> = {
  dental: "/dental",
  skin: "/skin",
};

const CARE_NOTES: Record<ServiceId, string> = {
  dental: "Check-ups, smile care and braces.",
  skin: "Acne, pigmentation and skin health.",
  hair: "Hair-fall care and scalp treatments.",
  pmu: "Brows, lips and eyeliner.",
};

const DIRECTIONS_HREF = `https://maps.google.com/?q=${encodeURIComponent(
  `${CLINIC.address.line1}, ${CLINIC.address.line2}, ${CLINIC.address.city} ${CLINIC.address.postalCode}`,
)}`;

function CareItem({ service }: { service: (typeof SERVICES)[number] }) {
  const route = SERVICE_ROUTES[service.id];
  const isCall = !route;
  const action = isCall ? "Call to ask" : "Explore care";

  const inner = (
    <>
      <span className="home-care__number">{service.number}</span>
      <span className="home-care__copy">
        <span className="home-care__name">{service.name}</span>
        <span className="home-care__summary">{CARE_NOTES[service.id]}</span>
      </span>
      <span className="home-care__action">
        <span className="home-care__action-label">{action}</span>
        <span className="home-care__action-icon" aria-hidden="true">
          {isCall ? (
            <Phone size={14} strokeWidth={1.8} />
          ) : (
            <ArrowRight size={15} strokeWidth={1.8} />
          )}
        </span>
      </span>
    </>
  );

  return (
    <li className="home-care__item">
      {route ? (
        <Link
          href={route}
          className="home-care__link"
          aria-label={`Explore ${service.name} care`}
        >
          {inner}
        </Link>
      ) : (
        <a
          href={CLINIC.phone.primaryHref}
          className="home-care__link"
          aria-label={`Call the clinic about ${service.name}`}
        >
          {inner}
        </a>
      )}
    </li>
  );
}

export default function HomeSections() {
  return (
    <div className="home-sections">
      <section className="home-care" id="care" aria-labelledby="home-care-title">
        <div className="home-care__inner">
          <header className="home-care__head">
            <p className="home-care__eyebrow">01 — Care</p>
            <h2 className="home-care__title" id="home-care-title">
              Care, all <em>under one roof.</em>
            </h2>
            <p className="home-care__lede">
              Dental, skin, hair and PMU care, brought together in one clinic in
              Old Town.
            </p>
          </header>

          <ul className="home-care__grid" aria-label="Aesthedent care">
            {SERVICES.map((service) => (
              <CareItem key={service.id} service={service} />
            ))}
          </ul>

          <p className="home-care__footnote">
            Not sure where to start?{" "}
            <a href={CLINIC.phone.primaryHref}>
              Call {CLINIC.phone.primaryDisplay}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="home-visit" id="visit" aria-labelledby="home-visit-title">
        <div className="home-visit__inner">
          <div className="home-visit__copy">
            <p className="home-visit__eyebrow">02 — Visit</p>
            <h2 className="home-visit__title" id="home-visit-title">
              Old Town,
              <br />
              <em>Bhubaneswar.</em>
            </h2>
            <p className="home-visit__lede">
              Find us on Giani Zail Singh Road. Call ahead and we&rsquo;ll help
              you find the right care.
            </p>

            <dl className="home-visit__details">
              <div className="home-visit__detail">
                <dt>Address</dt>
                <dd>
                  <address>
                    {CLINIC.address.line1}, {CLINIC.address.line2},
                    <br />
                    {CLINIC.address.city}, {CLINIC.address.state}{" "}
                    {CLINIC.address.postalCode}
                  </address>
                </dd>
              </div>
              <div className="home-visit__detail">
                <dt>Hours</dt>
                <dd>
                  Until 8 PM
                  <span className="home-visit__detail-note">
                    Call ahead to confirm today&rsquo;s timings.
                  </span>
                </dd>
              </div>
              <div className="home-visit__detail">
                <dt>Call</dt>
                <dd className="home-visit__phones">
                  <a
                    href={CLINIC.phone.primaryHref}
                    aria-label={`Call ${CLINIC.phone.primaryDisplay}`}
                  >
                    {CLINIC.phone.primaryDisplay}
                  </a>
                  <a
                    href={CLINIC.phone.secondaryHref}
                    aria-label={`Call ${CLINIC.phone.secondaryDisplay}`}
                  >
                    {CLINIC.phone.secondaryDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <aside className="home-visit__card" aria-label="Plan your visit">
            <span className="home-visit__card-mark" aria-hidden="true">
              <MapPin size={18} strokeWidth={1.6} />
            </span>
            <p className="home-visit__card-kicker">Plan your visit</p>
            <p className="home-visit__card-title">
              Start with a <em>conversation.</em>
            </p>
            <p className="home-visit__card-copy">
              Tell us what you&rsquo;re thinking about. We&rsquo;ll point you to
              the right care and a time that works.
            </p>
            <div className="home-visit__card-actions">
              <a className="home-visit__card-primary" href={CLINIC.bookingHref}>
                Call to book
                <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a
                className="home-visit__card-secondary"
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
                <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

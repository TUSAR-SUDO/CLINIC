import { SERVICES } from "@/lib/services";

const SEQUENCE = [...SERVICES, ...SERVICES];

/**
 * A slow editorial ribbon used only inside the phone service card.
 * The duplicate group makes the CSS loop seamless; the whole strip is
 * decorative so the service panel itself remains the accessible source.
 */
export default function ServiceMarquee() {
  return (
    <div className="mobile-service-marquee" aria-hidden="true">
      <div className="mobile-service-marquee__track">
        {[0, 1].map((group) => (
          <div className="mobile-service-marquee__group" key={group}>
            {SEQUENCE.map((service, index) => (
              <span
                className="mobile-service-marquee__item"
                key={`${group}-${service.id}-${index}`}
              >
                {service.name}
                <span className="mobile-service-marquee__dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import { ArrowUpRight, MapPin } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

const ADDRESS = `${CLINIC.address.line1}, ${CLINIC.address.line2}, ${CLINIC.address.city} ${CLINIC.address.postalCode}`;
const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
const EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=16&ie=UTF8&iwloc=near&output=embed`;

export default function SiteMap() {
  return (
    <section className="site-map" id="clinic-map" aria-labelledby="site-map-title">
      <div className="site-map__inner">
        <div className="site-map__copy">
          <p className="site-map__eyebrow">Find us</p>
          <h2 className="site-map__title" id="site-map-title">
            Old Town, <em>Bhubaneswar.</em>
          </h2>
          <p className="site-map__address">
            <MapPin size={16} strokeWidth={1.7} aria-hidden="true" />
            <span>
              {CLINIC.address.line1}, {CLINIC.address.line2},
              <br />
              {CLINIC.address.city}, {CLINIC.address.state}{" "}
              {CLINIC.address.postalCode}
            </span>
          </p>
          <a
            className="site-map__directions"
            href={DIRECTIONS_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>

        <div className="site-map__frame">
          <iframe
            title={`Map showing ${CLINIC.name} at ${ADDRESS}`}
            src={EMBED_SRC}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const SERVICES_LIST = [
  {
    id: "skin",
    name: "Skin",
    image: "/images/services/skin.png",
    href: "/#service-skin",
    tagline: "Healthy skin. For a bright you.",
  },
  {
    id: "hair",
    name: "Hair",
    image: "/images/services/hair.png",
    href: "/#service-hair",
    tagline: "Stronger hair. Healthier you.",
  },
  {
    id: "pmu",
    name: "PMU",
    image: "/images/services/pmu.png",
    href: "/#service-pmu",
    tagline: "Natural enhancement. Lasting confidence.",
  },
];

export default function OtherServices() {
  return (
    <section className="more-services" aria-label="Explore other treatments at Aesthedent">
      <div className="more-services__container">
        <div className="more-services__intro">
          <span className="more-services__kicker">MORE AT AESTHEDENT</span>
          <h2 className="more-services__title">
            One Clinic.<br />Multiple Care.
          </h2>
        </div>

        <div className="more-services__cards">
          {SERVICES_LIST.map((srv) => (
            <div
              key={srv.id}
              className="service-capsule"
            >
              <Link href={srv.href} className="service-capsule__link">
                <div className="service-capsule__media">
                  <Image
                    src={srv.image}
                    alt={srv.name}
                    fill
                    className="service-capsule__img"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="service-capsule__scrim" />
                </div>

                <div className="service-capsule__overlay">
                  <h3 className="service-capsule__name">{srv.name}</h3>
                  <span className="service-capsule__arrow" aria-hidden="true">
                    <ArrowRight size={15} strokeWidth={1.8} />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

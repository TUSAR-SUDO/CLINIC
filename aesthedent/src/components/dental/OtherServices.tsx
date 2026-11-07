"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";

const SERVICES_LIST = [
  {
    id: "skin",
    name: "Skin",
    image: "/images/services/skin.png",
    href: "/skin",
    alt: "Editorial portrait of a woman with luminous skin, representing skin care",
  },
  {
    id: "hair",
    name: "Hair",
    image: "/images/services/hair.png",
    href: "/hair",
    alt: "Editorial close-up of glossy dark hair, representing hair care",
  },
  {
    id: "pmu",
    name: "PMU",
    image: "/images/services/pmu.png",
    href: "/pmu",
    alt: "Editorial close-up of an eyebrow and eye, representing permanent makeup",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function OtherServices() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="more-services"
      aria-labelledby="dental-more-title"
    >
      <div className="more-services__container">
        <div className="more-services__intro">
          <Reveal>
            <span className="more-services__kicker">MORE AT AESTHEDENT</span>
          </Reveal>
          <h2 className="more-services__title" id="dental-more-title">
            <MaskedLine>One Clinic.</MaskedLine>
            <MaskedLine delay={0.08}>Multiple Care.</MaskedLine>
          </h2>
        </div>

        <div className="more-services__cards">
          {SERVICES_LIST.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-capsule"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={
                reduceMotion
                  ? { duration: 0.25, delay: index * 0.04 }
                  : { duration: 0.75, delay: index * 0.09, ease: EASE }
              }
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <Link
                href={service.href}
                className="service-capsule__link"
                aria-label={`Explore ${service.name} at Aesthedent`}
              >
                <div className="service-capsule__media">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="service-capsule__img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 30vw"
                    quality={84}
                  />
                  <div className="service-capsule__scrim" aria-hidden="true" />
                </div>

                <div className="service-capsule__overlay">
                  <h3 className="service-capsule__name">{service.name}</h3>
                  <span className="service-capsule__arrow" aria-hidden="true">
                    <ArrowRight size={15} strokeWidth={1.8} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

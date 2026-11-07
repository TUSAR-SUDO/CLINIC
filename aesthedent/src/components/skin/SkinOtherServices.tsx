"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import { SKIN_OTHER_SERVICES } from "@/lib/skin";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SkinOtherServices() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="skin-more more-services" aria-labelledby="skin-more-title">
      <div className="more-services__container">
        <div className="more-services__intro">
          <Reveal>
            <span className="more-services__kicker">MORE AT AESTHÉDENT</span>
          </Reveal>
          <h2 className="more-services__title" id="skin-more-title">
            <MaskedLine>One Clinic.</MaskedLine>
            <MaskedLine delay={0.08}>Multiple Care.</MaskedLine>
          </h2>
        </div>

        <div className="more-services__cards skin-more__cards">
          {SKIN_OTHER_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: reduceMotion ? 0.25 : 0.75,
                delay: reduceMotion ? 0 : index * 0.09,
                ease: EASE,
              }}
            >
              <Link
                href={service.href}
                className={`skin-more-card skin-more-card--${service.tone}`}
                aria-label={`Explore ${service.name} at Aesthédent`}
              >
                <span className="skin-more-card__bg" aria-hidden="true" />
                <span className="skin-more-card__content">
                  <span className="skin-more-card__name">{service.name}</span>
                  <span className="skin-more-card__arrow" aria-hidden="true">
                    <ArrowRight size={15} strokeWidth={1.7} />
                  </span>
                </span>
                <span className="skin-more-card__media">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 30vw"
                    className="skin-more-card__img"
                    quality={82}
                  />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

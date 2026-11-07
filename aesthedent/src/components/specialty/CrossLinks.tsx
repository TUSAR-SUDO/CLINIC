"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { MaskedLine, Reveal } from "@/components/motion/Reveal";
import type { SpecialtyContent } from "@/lib/specialty";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CrossLinks({ data }: { data: SpecialtyContent }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={`spec-more spec-more--${data.id}`}
      aria-labelledby={`${data.id}-more-title`}
    >
      <div className="spec-more__inner">
        <div className="spec-more__head">
          <Reveal>
            <p className="spec-kicker">{data.crossKicker}</p>
          </Reveal>
          <h2 className="spec-more__title" id={`${data.id}-more-title`}>
            <MaskedLine>{data.crossTitleTop}</MaskedLine>
            <MaskedLine delay={0.08}>
              <em>{data.crossTitleEm}</em>
            </MaskedLine>
          </h2>
        </div>

        <div className="spec-more__grid">
          {data.crossLinks.map((item, index) => (
            <motion.div
              key={item.id}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: reduceMotion ? 0.22 : 0.75,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: EASE,
              }}
            >
              <Link
                href={item.href}
                className={`spec-more__card spec-more__card--${item.tone}`}
                aria-label={`Explore ${item.name} at Aesthedent`}
              >
                <span className="spec-more__media">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 980px) 100vw, 30vw"
                    className="spec-more__image"
                    quality={82}
                  />
                </span>
                <span className="spec-more__shade" aria-hidden="true" />
                <span className="spec-more__content">
                  <span className="spec-more__name">{item.name}</span>
                  <span className="spec-more__note">{item.note}</span>
                  <span className="spec-more__arrow" aria-hidden="true">
                    <ArrowRight size={15} strokeWidth={1.8} />
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

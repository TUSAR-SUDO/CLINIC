"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowRight, Phone } from "lucide-react";
import { MaskedLine } from "@/components/motion/Reveal";
import Magnetic from "@/components/hero/Magnetic";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { CLINIC } from "@/lib/clinic";
import { scrollToSection } from "@/lib/smooth-scroll";
import type { SpecialtyContent } from "@/lib/specialty";

const EASE = [0.16, 1, 0.3, 1] as const;

function ThreadLines({ id, reduceMotion }: { id: string; reduceMotion: boolean | null }) {
  if (id === "hair") {
    return (
      <svg
        className="spec-hero__thread"
        viewBox="0 0 560 720"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[
          "M-40 560C80 470 80 330 220 250S430 180 600 80",
          "M-20 610C110 520 100 390 250 300S450 220 590 130",
          "M-30 660C70 590 160 510 210 400S330 270 560 210",
          "M80 740C170 620 130 500 280 400S470 330 590 250",
        ].map((d, index) => (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth={index === 0 ? 1.2 : 0.7}
            strokeLinecap="round"
            opacity={0.42 - index * 0.06}
            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 2.1,
              delay: reduceMotion ? 0 : 0.4 + index * 0.12,
              ease: EASE,
            }}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg
      className="spec-hero__thread spec-hero__thread--pmu"
      viewBox="0 0 560 720"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.ellipse
        cx="360"
        cy="300"
        rx="178"
        ry="236"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.38"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.7, delay: reduceMotion ? 0 : 0.4, ease: EASE }}
      />
      <motion.path
        d="M120 420C210 330 280 330 380 400S510 450 566 390"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.55"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.9, delay: reduceMotion ? 0 : 0.6, ease: EASE }}
      />
    </svg>
  );
}

export default function SpecialtyHero({ data }: { data: SpecialtyContent }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 70, damping: 20, mass: 0.6 });
  const driftY = useSpring(pointerY, { stiffness: 70, damping: 20, mass: 0.6 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageShift = useTransform(scrollYProgress, [0, 1], [0, 74]);
  const copyShift = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const wordShift = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 16);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 12);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={heroRef}
      className={`spec-hero spec-hero--${data.id}`}
      aria-labelledby={`${data.id}-hero-title`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="spec-hero__ambient" aria-hidden="true">
        <span className="spec-hero__orb spec-hero__orb--one" />
        <span className="spec-hero__orb spec-hero__orb--two" />
        <motion.span className="spec-hero__word" style={{ x: wordShift }}>
          {data.heroWord}
        </motion.span>
        <ThreadLines id={data.id} reduceMotion={reduceMotion} />
      </div>

      <div className="spec-hero__inner">
        <motion.div className="spec-hero__copy" style={{ y: copyShift }}>
          <motion.nav
            className="spec-hero__breadcrumb"
            aria-label="Breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{data.label}</span>
          </motion.nav>

          <MaskedLine delay={0.16}>
            <span className="spec-hero__eyebrow">
              <span className="spec-hero__eyebrow-rule" aria-hidden="true" />
              {data.eyebrow}
            </span>
          </MaskedLine>

          <h1 className="spec-hero__title" id={`${data.id}-hero-title`}>
            <MaskedLine delay={0.22}>{data.titleTop}</MaskedLine>
            <MaskedLine delay={0.3}>
              <em>{data.titleEm}</em>
            </MaskedLine>
          </h1>

          <motion.p
            className="spec-hero__lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48, ease: EASE }}
          >
            {data.lede}
          </motion.p>

          <motion.div
            className="spec-hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, ease: EASE }}
          >
            <Magnetic>
              <LiquidMetalButton
                label={data.bookingLabel}
                variant={data.theme === "dark" ? "cream" : "aubergine"}
                width={224}
                height={44}
                href={CLINIC.bookingHref}
              />
            </Magnetic>

            <a
              href={CLINIC.phone.primaryHref}
              className="spec-hero__call"
              aria-label={`Call the clinic at ${CLINIC.phone.primaryDisplay}`}
            >
              <Phone size={13} strokeWidth={2} aria-hidden="true" />
              Call {CLINIC.phone.primaryDisplay}
            </a>
          </motion.div>

          <motion.div
            className="spec-hero__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.76 }}
          >
            <span>{data.index}</span>
            <span className="spec-hero__meta-rule" aria-hidden="true" />
            <span>{data.heroNote}</span>
            <span className="spec-hero__meta-rule" aria-hidden="true" />
            <span>Old Town, Bhubaneswar</span>
          </motion.div>
        </motion.div>

        <div className="spec-hero__stage" ref={stageRef}>
          <motion.figure
            className="spec-hero__frame"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, clipPath: "inset(100% 0% 0% 0%)", scale: 0.97 }
            }
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
            transition={
              reduceMotion
                ? { duration: 0.3, delay: 0.15 }
                : { duration: 1.15, delay: 0.18, ease: EASE }
            }
          >
            <motion.div className="spec-hero__drift" style={{ x: driftX, y: driftY }}>
              <motion.div className="spec-hero__scroll" style={{ y: imageShift }}>
                <Image
                  src={data.heroImage}
                  alt={data.heroAlt}
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className="spec-hero__image"
                  style={{ objectPosition: data.heroPosition }}
                  quality={88}
                />
              </motion.div>
            </motion.div>
            <span className="spec-hero__tint" aria-hidden="true" />
            <span className="spec-hero__frame-rule" aria-hidden="true" />
            <figcaption className="spec-hero__caption">
              <span className="spec-hero__caption-index">{data.index}</span>
              <span>{data.heroNote}</span>
            </figcaption>
          </motion.figure>

          <motion.div
            className="spec-hero__badge"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          >
            <span className="spec-hero__badge-dot" aria-hidden="true" />
            <span>
              Consultation
              <br />
              first
            </span>
          </motion.div>

          <button
            type="button"
            className="spec-hero__scroll-cue"
            onClick={() => scrollToSection(`${data.id}-focus`)}
            aria-label={`Scroll to ${data.label} care`}
          >
            <span>Scroll to explore</span>
            <ArrowDown size={13} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="spec-ticker" aria-hidden="true">
        <div className="spec-ticker__track">
          {[...data.ticker, ...data.ticker].map((item, index) => (
            <span key={`${item}-${index}`} className="spec-ticker__item">
              {item}
              <span className="spec-ticker__star">✦</span>
            </span>
          ))}
        </div>
      </div>

      <a href={`#${data.id}-focus`} className="spec-hero__skip">
        {data.label} care
        <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </section>
  );
}

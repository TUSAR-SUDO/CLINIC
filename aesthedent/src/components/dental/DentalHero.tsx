"use client";

import { useRef, type PointerEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Phone, ArrowRight, ArrowDown } from "lucide-react";
import { MaskedLine } from "@/components/motion/Reveal";
import Magnetic from "@/components/hero/Magnetic";
import { CLINIC } from "@/lib/clinic";
import { scrollToSection } from "@/lib/smooth-scroll";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const COMPANIONS = [
  { id: "skin", name: "Skin", img: "/images/hero/skin.png", href: "/skin" },
  { id: "hair", name: "Hair", img: "/images/hero/hair.png", href: "/hair" },
  { id: "pmu", name: "PMU", img: "/images/hero/pmu.png", href: "/pmu" },
];

const MotionLink = motion.create(Link);

const EASE = [0.16, 1, 0.3, 1] as const;

export default function DentalHero() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 80, damping: 20, mass: 0.5 });
  const driftY = useSpring(pointerY, { stiffness: 80, damping: 20, mass: 0.5 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, 26]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 8);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={heroRef}
      className="dental-hero"
      aria-labelledby="dental-hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.aside
        className="dental-rail"
        aria-label="Dental section progress"
        initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
      >
        <div className="dental-rail__steps" aria-hidden="true">
          <div className="dental-rail__item is-active">
            <span className="dental-rail__dot" />
            <span className="dental-rail__num">01</span>
          </div>
          <span className="dental-rail__line" />
          <div className="dental-rail__item">
            <span className="dental-rail__num">02</span>
          </div>
          <span className="dental-rail__line" />
          <div className="dental-rail__item">
            <span className="dental-rail__num">03</span>
          </div>
          <span className="dental-rail__line" />
          <div className="dental-rail__item">
            <span className="dental-rail__num">04</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("dental-treatments")}
          className="dental-rail__scroll"
          aria-label="Scroll to dental treatments"
        >
          <span>Scroll</span>
          <ArrowDown size={12} className="dental-rail__arrow" />
        </button>
      </motion.aside>

      <div className="dental-hero__container">
        <div className="dental-hero__content">
          <motion.nav
            className="dental-hero__breadcrumb"
            aria-label="Breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/" className="dental-hero__bread-link">
              Home
            </Link>
            <span className="dental-hero__bread-sep" aria-hidden="true">
              /
            </span>
            <span className="dental-hero__bread-current" aria-current="page">
              Dental
            </span>
          </motion.nav>

          <h1 className="dental-hero__title" id="dental-hero-title">
            <MaskedLine delay={0.24}>
              Dental <span className="dental-hero__dash">—</span>
            </MaskedLine>
          </h1>

          <div className="dental-hero__kicker">
            <MaskedLine delay={0.34}>HEALTHY SMILES.</MaskedLine>
            <MaskedLine delay={0.42}>FOR A BRIGHTER YOU.</MaskedLine>
          </div>

          <motion.p
            className="dental-hero__subtitle"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          >
            Comprehensive dental care for every smile — from routine checkups to
            advanced treatments.
          </motion.p>

          <motion.div
            className="dental-hero__actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.66, ease: EASE }}
          >
            <Magnetic>
              <LiquidMetalButton
                label="Book dental consultation"
                variant="aubergine"
                width={216}
                height={44}
                onClick={() => {
                  window.location.href = CLINIC.bookingHref;
                }}
              />
            </Magnetic>

            <a
              href={CLINIC.phone.primaryHref}
              className="dental-hero__call-pill"
              aria-label={`Call the clinic at ${CLINIC.phone.primaryDisplay}`}
            >
              <Phone size={13} strokeWidth={2} className="dental-hero__call-icon" />
              <span>Call {CLINIC.phone.primaryDisplay}</span>
            </a>
          </motion.div>
        </div>

        <div className="dental-hero__stage" ref={stageRef}>
          <motion.div
            className="dental-hero__arch-card"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }
            }
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            transition={
              reduceMotion
                ? { duration: 0.28 }
                : { duration: 1.05, delay: 0.14, ease: EASE }
            }
          >
            <motion.div
              className="dental-hero__arch-drift"
              style={{ x: driftX, y: driftY }}
            >
              <motion.div
                className="dental-hero__arch-scroll"
                style={{ y: reduceMotion ? 0 : scrollShift }}
              >
                <Image
                  src="/images/hero/dental.png"
                  alt="Patient with a bright, healthy smile at Aesthédent"
                  fill
                  preload
                  loading="eager"
                  fetchPriority="high"
                  className="dental-hero__arch-img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 70vw, 46vw"
                  quality={88}
                />
              </motion.div>
            </motion.div>
            <div className="dental-hero__arch-scrim" aria-hidden="true" />
          </motion.div>

          <div
            className="dental-hero__companions"
            role="region"
            aria-label="Explore other specialties"
          >
            {COMPANIONS.map((item, index) => (
              <MotionLink
                key={item.id}
                href={item.href}
                className={`dental-companion dental-companion--${item.id}`}
                aria-label={`Explore ${item.name}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0.25, delay: 0.15 + index * 0.04 }
                    : { duration: 0.85, delay: 0.46 + index * 0.08, ease: EASE }
                }
              >
                <Image
                  src={item.img}
                  alt=""
                  fill
                  className="dental-companion__img"
                  sizes="(max-width: 768px) 33vw, 10vw"
                  quality={84}
                />
                <div className="dental-companion__scrim" aria-hidden="true" />
                <div className="dental-companion__info">
                  <h2 className="dental-companion__name">{item.name}</h2>
                  <span className="dental-companion__btn" aria-hidden="true">
                    <ArrowRight size={13} strokeWidth={1.8} />
                  </span>
                </div>
              </MotionLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

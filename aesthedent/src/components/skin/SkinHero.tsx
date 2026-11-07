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
import { SKIN_COMPANIONS } from "@/lib/skin";
import { scrollToSection } from "@/lib/smooth-scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SkinHero() {
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
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, 34]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 14);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={heroRef}
      className="skin-hero"
      aria-labelledby="skin-hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <aside className="skin-rail" aria-hidden="true">
        <div className="skin-rail__steps">
          {["01", "02", "03", "04"].map((number, index) => (
            <div key={number} className="skin-rail__group">
              <span className={`skin-rail__item${index === 0 ? " is-active" : ""}`}>
                {index === 0 && <span className="skin-rail__dot" />}
                <span className="skin-rail__num">{number}</span>
              </span>
              {index < 3 && <span className="skin-rail__line" />}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="skin-rail__scroll"
          onClick={() => scrollToSection("skin-treatments")}
          aria-label="Scroll to skin treatments"
        >
          <span>Scroll</span>
          <ArrowDown size={12} className="skin-rail__arrow" />
        </button>
      </aside>

      <div className="skin-hero__container">
        <div className="skin-hero__content">
          <motion.nav
            className="skin-hero__breadcrumb"
            aria-label="Breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link href="/" className="skin-hero__bread-link">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="skin-hero__bread-current" aria-current="page">
              Skin
            </span>
          </motion.nav>

          <h1 id="skin-hero-title" className="skin-hero__title">
            <MaskedLine delay={0.38}>
              Skin <span className="skin-hero__dash">—</span>
            </MaskedLine>
          </h1>

          <div className="skin-hero__kicker">
            <MaskedLine delay={0.48}>HEALTHY SKIN.</MaskedLine>
            <MaskedLine delay={0.56}>FOR A BRIGHT YOU.</MaskedLine>
          </div>

          <motion.p
            className="skin-hero__subtitle"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
          >
            Personalized skin care that treats, restores and brings out your natural glow.
          </motion.p>

          <motion.div
            className="skin-hero__actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.84, ease: EASE }}
          >
            <Magnetic>
              <LiquidMetalButton
                className="skin-book-button"
                label="Book skin consultation"
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
              className="skin-hero__call-pill"
              aria-label={`Call the clinic at ${CLINIC.phone.primaryDisplay}`}
            >
              <Phone size={13} strokeWidth={2} aria-hidden="true" />
              <span>Call {CLINIC.phone.primaryDisplay}</span>
            </a>
          </motion.div>
        </div>

        <div className="skin-hero__stage" ref={stageRef}>
          <span className="skin-hero__wash" aria-hidden="true" />

          <motion.div
            className="skin-hero__arch"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, clipPath: "inset(100% 0% 0% 0%)", scale: 0.98 }
            }
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
            transition={
              reduceMotion
                ? { duration: 0.3, delay: 0.2 }
                : { duration: 1.05, delay: 0.22, ease: EASE }
            }
          >
            <motion.div className="skin-hero__drift" style={{ x: driftX, y: driftY }}>
              <motion.div
                className="skin-hero__scroll-drift"
                style={{ y: reduceMotion ? 0 : scrollShift }}
              >
                <Image
                  src="/images/hero/skin.webp"
                  alt="Close-up portrait of a woman with healthy, luminous skin"
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 70vw, 42vw"
                  className="skin-hero__arch-img"
                  quality={88}
                />
              </motion.div>
            </motion.div>
            <span className="skin-hero__arch-tint" aria-hidden="true" />
          </motion.div>

          <div className="skin-hero__companions" role="region" aria-label="Explore other specialties">
            {SKIN_COMPANIONS.map((companion, index) => (
              <motion.a
                key={companion.id}
                href={companion.href}
                className={`skin-companion skin-companion--${companion.id}`}
                aria-label={`Explore ${companion.name}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0.25, delay: 0.2 }
                    : { duration: 0.85, delay: 0.55 + index * 0.08, ease: EASE }
                }
              >
                <Image
                  src={companion.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 32vw, 10vw"
                  className="skin-companion__img"
                  quality={82}
                />
                <span className="skin-companion__scrim" aria-hidden="true" />
                <span className="skin-companion__info">
                  <span className="skin-companion__name">{companion.name}</span>
                  <span className="skin-companion__arrow" aria-hidden="true">
                    <ArrowRight size={13} strokeWidth={1.7} />
                  </span>
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

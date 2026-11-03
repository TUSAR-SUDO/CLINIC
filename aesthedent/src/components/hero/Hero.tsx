"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import Navbar from "./Navbar";
import Headline from "./Headline";
import PanelsContainer from "./PanelsContainer";
import MobileHeroCta from "./MobileHeroCta";
import MobileServiceShowcase from "./MobileServiceShowcase";
import BotanicalForeground from "./BotanicalForeground";
import DoctorsCard from "./DoctorsCard";
import InfoPill from "./InfoPill";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Navbar />
      <Headline />
      <MobileHeroCta />
      <PanelsContainer />
      <MobileServiceShowcase />
      <BotanicalForeground />

      <motion.footer
        className="hero__footer js-reveal"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : { duration: 0.55, delay: 0.9, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <DoctorsCard />
        <InfoPill />
      </motion.footer>

      <div className="grain" aria-hidden="true" />
      <CustomCursor />
    </section>
  );
}

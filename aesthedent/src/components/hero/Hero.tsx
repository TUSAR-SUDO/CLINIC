"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import Navbar from "./Navbar";
import Headline from "./Headline";
import PanelsContainer from "./PanelsContainer";
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
      <PanelsContainer />
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

      <div className="mobile-bar" aria-label="Quick contact and booking">
        <a className="mobile-bar__call" href={CLINIC.phone.primaryHref}>
          <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
          <span>Call</span>
        </a>
        <a className="mobile-bar__book" href={CLINIC.bookingHref}>
          <span>Book a visit</span>
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>

      <div className="grain" aria-hidden="true" />
      <CustomCursor />
    </section>
  );
}

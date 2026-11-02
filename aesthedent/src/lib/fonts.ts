import { Fraunces, Geist } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

export const geist = Geist({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-geist-sans",
  display: "swap",
});

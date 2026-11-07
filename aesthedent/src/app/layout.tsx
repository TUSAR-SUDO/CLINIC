import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import SiteFooter from "@/components/site/SiteFooter";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { fraunces, geist } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import "@/styles/skin.css";
import "@/styles/our-clinic.css";
import "@/styles/specialty.css";
import "@/styles/specialty-mobile.css";
import "@/styles/system.css";

const siteUrl = SITE_URL;

const title = "Aesthédent — Dental, Skin, Hair & PMU in Old Town, Bhubaneswar";
const description =
  "Aesthédent is a multi-speciality aesthetic clinic in Old Town, Bhubaneswar, offering dental, skin, hair and PMU care. Book a visit with Dr. Manisha Mohanty and Dr. Shruti Rath.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Aesthédent",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Aesthédent",
    title,
    description,
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aesthédent — dental, skin, hair and PMU care in Old Town, Bhubaneswar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3EEE8",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${geist.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}

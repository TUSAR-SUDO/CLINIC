import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import SiteFooter from "@/components/site/SiteFooter";
import SmoothScroll from "@/components/ui/SmoothScroll";
import SiteLoaderProvider from "@/components/ui/site-loader";
import { fraunces, geist } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import "@/styles/site-loader.css";
import "@/styles/lenis.css";
import "@/styles/skin.css";
import "@/styles/our-clinic.css";
import "@/styles/specialty.css";
import "@/styles/specialty-mobile.css";
import "@/styles/site-menu.css";
import "@/styles/press.css";
import "@/styles/testimonials.css";
import "@/styles/type-system.css";
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
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${geist.variable}`}
      /* The intro script sets data-intro before hydration; that attribute is intentional. */
      suppressHydrationWarning
    >
      <body>
        {/* Marks repeat visits before first paint so the intro never replays. */}
        <Script id="intro-seen" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("aesthedent:intro-seen")==="1"){document.documentElement.dataset.intro="seen";}}catch(e){}`}
        </Script>
        <noscript>
          <style>{`
            .site-loader { display: none !important; }
            .site-content-root { opacity: 1 !important; transform: none !important; pointer-events: auto !important; }
          `}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteLoaderProvider>
          <SmoothScroll>
            {children}
            <SiteFooter />
          </SmoothScroll>
        </SiteLoaderProvider>
      </body>
    </html>
  );
}

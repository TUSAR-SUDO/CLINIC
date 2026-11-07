# Aesthédent

Multi-speciality aesthetic clinic site for Aesthédent, Old Town, Bhubaneswar — dental, skin, hair and PMU care.

Built with Next.js (App Router), React and TypeScript. Styling is plain CSS in `src/styles`, using the cream / aubergine identity with Fraunces for display type.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run lint
npx tsc --noEmit
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, four care panels, face hotspots, doctors card, clinic info |
| `/dental` | Dental speciality |
| `/skin` | Skin speciality |
| `/hair` | Hair speciality |
| `/pmu` | Permanent makeup speciality |
| `/our-clinic` | Clinic story and team (`#our-clinic-team` anchor) |
| `/sitemap.xml`, `/robots.txt` | Generated from `src/app/sitemap.ts` and `src/app/robots.ts` |

In-page anchors: home `#doctors`, `#clinic-info`, `#top`; dental `#dentists`, `#contact-info`; skin `#skin-specialists`, `#skin-contact`; our clinic `#our-clinic-team`.

## Configuration

Copy `.env.example` to `.env.local` and set:

```
NEXT_PUBLIC_SITE_URL=https://your-production-domain
```

`src/lib/site.ts` reads this for canonical URLs, Open Graph metadata, `sitemap.xml` and `robots.txt`. It falls back to `http://localhost:3000`; set it before deploying so metadata points at the real domain.

Booking CTAs use `CLINIC.bookingHref` in `src/lib/clinic.ts` (currently `tel:+919692485602`). Clinic address, phone numbers and navigation live in the same file.

## Brand

The clinic name is written **Aesthédent** everywhere (note the accent). It lives in `CLINIC.name`
and the brand surfaces read from there or from `Logo`.

| Asset | Used for |
| --- | --- |
| `public/images/logo/aesthedent-mark.png` | Navbar, specialty headers, footer, glass reveal — transparent 512px mark |
| `public/images/logo/aesthedent-icon.png` | Cream-backed square, the source for `src/app/icon.png` (favicon) |
| `public/og.png` | Open Graph / Twitter card |
| `public/images/logo/logo.png` | The supplied original artwork |

`src/components/hero/Logo.tsx` is the single lockup (mark + wordmark + tagline);
`src/components/ui/glass-icon-reveal.tsx` is the WebGL glass reveal, preset as `BrandGlassReveal`
and used on `/our-clinic`.

## Specialty pages on phones

`/hair` and `/pmu` share components in `src/components/specialty` and styles in
`src/styles/specialty.css` (layout) plus `src/styles/specialty-mobile.css` (the phone pass,
scoped to `max-width: 767px`). The mobile layer adds the sticky booking dock
(`BookingDock.tsx`), the drawn timeline for the visit steps, the swipeable cross-link rail and
scroll-linked image drift. It only runs where the browser supports `animation-timeline: view()`;
everything else falls back to the existing `motion/react` reveals, and all of it respects
`prefers-reduced-motion`.

## Content still to supply

These are intentionally generic placeholders and should be replaced before launch:

- Doctor and team names, credentials, bios and photos (`src/app/our-clinic/page.tsx`, `src/components/hero/DoctorsCard.tsx`)
- Detailed treatment lists for all four care pages (`src/lib/specialty.ts`)
- Equipment and facility details
- Patient testimonial stories (`src/lib/testimonials.ts`)

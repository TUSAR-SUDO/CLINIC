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

`/skin`, `/hair` and `/pmu` share components in `src/components/specialty` and styles in
`src/styles/specialty.css` (layout) plus `src/styles/specialty-mobile.css` (the phone pass,
scoped to `max-width: 767px`). The mobile layer adds the sticky booking dock
(`BookingDock.tsx`), the drawn timeline for the visit steps, the swipeable cross-link rail and
scroll-linked image drift. It only runs where the browser supports `animation-timeline: view()`;
everything else falls back to the existing `motion/react` reveals, and all of it respects
`prefers-reduced-motion`.

All three pages read their copy from `SPECIALTIES` in `src/lib/specialty.ts`; `/skin` was
rebuilt on this system, so its old bespoke sections were removed. The dental and skin CTA
blocks still share rules in `src/styles/skin.css` (`.cta-pill`, `.treatments-section`,
`.faq-item`), so that stylesheet stays imported even though the skin-specific `.skin-*` rules
are now unused.

## Typography

Fraunces (display) and Geist (text) are the only families in the build. `src/styles/type-system.css`
is imported last and pins the shared type tokens: one Fraunces variable-axis setting
(`"opsz" 96, "SOFT" 45, "WONK" 0`), one italic emphasis weight, and one eyebrow size/tracking.
Pages keep their own sizes and layouts; they no longer override the optical axes, so the same
face reads the same on every route.

## Testimonials

`src/components/site/TestimonialSection.tsx` is shared by all four care pages and renders
infinite testimonial columns, after the 21st.dev "testimonials columns" pattern: quote cards
drift slowly in opposite directions behind a soft edge fade, pause on hover or keyboard focus,
and are plain CSS `transform` animations, so nothing here needs WebGL. Each page reads its own
slice of `SERVICE_STORIES` in `src/lib/testimonials.ts` and passes its own theme
(`theme="dark"` on `/hair`). A pool with fewer than three consented stories renders as a
single pull quote instead of looping one sentence — hair and PMU are still in that state.

## Content still to supply

These are intentionally generic placeholders and should be replaced before launch:

- Doctor and team names, credentials, bios and photos (`src/app/our-clinic/page.tsx`, `src/components/hero/DoctorsCard.tsx`)
- Detailed treatment lists for all four care pages (`src/lib/specialty.ts`)
- Equipment and facility details
- Patient testimonial stories (`src/lib/testimonials.ts`) — hair and PMU have one placeholder
  quote each, so their sections render as a single pull quote until the clinic supplies more

## Site intro

The logo reveal plays once per browser session, not on every page load.
`SiteLoaderProvider` reads a session flag (`aesthedent:intro-seen`) through
`useSyncExternalStore`, and a small `beforeInteractive` script in the root layout
sets `data-intro="seen"` on `<html>` before first paint, so a repeat load never
flashes the loader or locks scroll. A new tab or a new session replays the intro;
to make it once ever instead, swap `sessionStorage` for `localStorage` in
`src/components/ui/site-loader.tsx`.

## Production checklist

**Already in the app**

- Security headers in `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, HSTS, COOP; `poweredByHeader: false`;
  immutable caching for hashed `/_next/static` assets.
- `robots.ts` and `sitemap.ts` are generated by the app.
- `next/font` self-hosts Fraunces and Geist — no third-party font requests.
- JSON-LD is built from static, local data only; no user input reaches `dangerouslySetInnerHTML`.
- Every external link opens with `rel="noopener noreferrer"`; there are no forms,
  API routes or cookies, so there is no server-side input surface yet.

**Still needed before launch (owner decisions)**

1. **Content-Security-Policy.** Skipped in the config because the app inlines JSON-LD
   and the pre-paint intro script; add a nonce-based policy through the root layout.
2. **Real booking.** `CLINIC.bookingHref` is currently `tel:+919692485602`.
3. **Legal pages.** Privacy notice, terms and a cookie statement (analytics will need consent).
4. **Error monitoring and analytics** (e.g. Sentry plus a privacy-friendly analytics tool).
5. **Clinic content still marked TODO.** Opening hour, treatment lists, and the hair and PMU
   testimonial placeholders.
6. **Two undersized images.** `skin|dental/map-card.png` renders at 140x70 from a 132x61 file,
   and the doctor avatars render at 60px from 67px files; the clinic should supply larger originals.
7. **Domain, DNS and HTTPS** for `SITE_URL`, then a Lighthouse run on the deployed origin.

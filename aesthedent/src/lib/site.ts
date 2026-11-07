/**
 * Public origin used for canonical metadata, robots and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL to the production domain before deploying.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

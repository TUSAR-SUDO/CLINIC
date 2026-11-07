import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/dental", changeFrequency: "monthly", priority: 0.9 },
  { path: "/skin", changeFrequency: "monthly", priority: 0.9 },
  { path: "/hair", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pmu", changeFrequency: "monthly", priority: 0.9 },
  { path: "/our-clinic", changeFrequency: "monthly", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: new URL(route.path, `${SITE_URL}/`).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

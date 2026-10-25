import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://1horizon-ai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}

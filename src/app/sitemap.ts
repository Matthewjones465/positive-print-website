import type { MetadataRoute } from "next";

const SITE_URL = "https://www.positivepp.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/catalogue`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}

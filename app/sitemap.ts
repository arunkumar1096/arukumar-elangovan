import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  const caseStudies = [
    "Merlin-AI",
    "proof-ops",
  ];

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    ...caseStudies.map((slug) => ({
      url: `${baseUrl}/case-study/${slug}`,
      lastModified: new Date(),
      priority: 0.9,
    })),
  ];
}

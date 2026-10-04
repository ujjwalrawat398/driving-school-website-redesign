import type { MetadataRoute } from "next";
import { getPosts, getServices } from "@/db/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://apexdrive.academy";
  const [services, posts] = await Promise.all([getServices(), getPosts()]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/instructors",
    "/pricing",
    "/areas",
    "/gallery",
    "/faqs",
    "/reviews",
    "/blog",
    "/book",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

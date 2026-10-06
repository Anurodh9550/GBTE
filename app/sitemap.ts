import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { COURSES } from "@/lib/courses";
import { NEWS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/admissions",
    "/placements",
    "/success-stories",
    "/scholarships",
    "/campus",
    "/news",
    "/faq",
    "/contact",
    "/apply",
    "/brochure",
    "/compare",
    "/counselling",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE.url}${path || "/"}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...COURSES.map((c) => ({
      url: `${SITE.url}/courses/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...NEWS.map((n) => ({
      url: `${SITE.url}/news/${n.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

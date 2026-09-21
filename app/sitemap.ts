import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import fs from "fs/promises";
import path from "path";

const BASE_URL = "https://alexandraaleksiuk.com";

const staticPaths = [
  "",
  "/aboutMe",
  "/dyplomy",
  "/blogs",
  "/consultation",
  "/supervision",
  "/therapy-group",
  "/linktree",
] as const;

async function getBlogSlugs(): Promise<string[]> {
  try {
    const fileContent = await fs.readFile(
      path.join(process.cwd(), "blogs.json"),
      "utf-8"
    );
    const data = JSON.parse(fileContent) as {
      blogs: { slug: string; isPublished: boolean; publishDate?: string }[];
    };
    return data.blogs.filter((b) => b.isPublished).map((b) => b.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getBlogSlugs();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticPaths) {
      const isHome = route === "";
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: isHome || route === "/blogs" ? "weekly" : "monthly",
        priority: isHome ? 1 : route === "/consultation" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l === "uk" ? "uk-UA" : "ru-RU", `${BASE_URL}/${l}${route}`])
          ),
        },
      });
    }

    for (const slug of blogSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/blogs/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l === "uk" ? "uk-UA" : "ru-RU",
              `${BASE_URL}/${l}/blogs/${slug}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}

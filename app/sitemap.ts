import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import fs from "fs/promises";
import path from "path";

const BASE_URL = "https://alexandraaleksiuk.com";

const staticPaths: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/aboutMe", changeFrequency: "monthly", priority: 0.8 },
  { path: "/dyplomy", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/consultation", changeFrequency: "weekly", priority: 0.9 },
  { path: "/supervision", changeFrequency: "monthly", priority: 0.8 },
  { path: "/therapy-group", changeFrequency: "monthly", priority: 0.8 },
  { path: "/linktree", changeFrequency: "monthly", priority: 0.6 },
];

async function getPublishedBlogs(): Promise<
  { slug: string; lastModified: Date }[]
> {
  try {
    const fileContent = await fs.readFile(
      path.join(process.cwd(), "blogs.json"),
      "utf-8"
    );
    const data = JSON.parse(fileContent) as {
      blogs: {
        slug: string;
        isPublished: boolean;
        publishDate?: string;
      }[];
    };
    return data.blogs
      .filter((b) => b.isPublished)
      .map((b) => ({
        slug: b.slug,
        lastModified: b.publishDate ? new Date(b.publishDate) : new Date(),
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getPublishedBlogs();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticPaths) {
      const urlPath = `/${locale}${route.path}`;
      entries.push({
        url: `${BASE_URL}${urlPath}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            "uk-UA": `${BASE_URL}/uk${route.path}`,
            "ru-RU": `${BASE_URL}/ru${route.path}`,
            "x-default": `${BASE_URL}/uk${route.path}`,
          },
        },
      });
    }

    for (const blog of blogs) {
      entries.push({
        url: `${BASE_URL}/${locale}/blogs/${blog.slug}`,
        lastModified: blog.lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            "uk-UA": `${BASE_URL}/uk/blogs/${blog.slug}`,
            "ru-RU": `${BASE_URL}/ru/blogs/${blog.slug}`,
            "x-default": `${BASE_URL}/uk/blogs/${blog.slug}`,
          },
        },
      });
    }
  }

  return entries;
}

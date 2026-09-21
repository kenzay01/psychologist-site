import type { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import { locales, type Locale } from "@/i18n/config";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

type Blog = {
  slug: string;
  title: { uk: string; ru: string };
  excerpt: { uk: string; ru: string };
  mainImage?: string;
  isPublished: boolean;
  publishDate?: string;
};

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const fileContent = await fs.readFile(
      path.join(process.cwd(), "blogs.json"),
      "utf-8"
    );
    const data = JSON.parse(fileContent) as { blogs: Blog[] };
    return data.blogs.find((b) => b.slug === slug && b.isPublished) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = (locales.includes(localeParam as Locale)
    ? localeParam
    : "uk") as Locale;
  const blog = await getBlog(slug);
  const pathname = `/${locale}/blogs/${slug}`;

  if (!blog) {
    return buildPageMetadata({ pathname, locale, noIndex: true });
  }

  const title = `${blog.title[locale]} | ${
    locale === "ru" ? "Блог Александры Алексюк" : "Блог Олександри Алексюк"
  }`;
  const description =
    blog.excerpt[locale] ||
    (locale === "ru"
      ? "Статья о психологии и сексологии."
      : "Стаття про психологію та сексологію.");

  const image = blog.mainImage
    ? blog.mainImage.startsWith("http") || blog.mainImage.startsWith("/")
      ? blog.mainImage
      : `/${blog.mainImage}`
    : "/og-image.jpg";

  return buildPageMetadata({
    pathname,
    locale,
    title,
    description,
    ogImage: image,
  });
}

export default async function BlogSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = (locales.includes(localeParam as Locale)
    ? localeParam
    : "uk") as Locale;
  const blog = await getBlog(slug);
  const home = locale === "ru" ? "Главная" : "Головна";
  const blogLabel = locale === "ru" ? "Блог" : "Блог";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: home, path: `/${locale}` },
          { name: blogLabel, path: `/${locale}/blogs` },
          {
            name: blog?.title[locale] || slug,
            path: `/${locale}/blogs/${slug}`,
          },
        ])}
      />
      {blog ? (
        <JsonLd
          data={articleJsonLd({
            locale,
            slug,
            title: blog.title[locale],
            description: blog.excerpt[locale],
            image: blog.mainImage,
            datePublished: blog.publishDate,
          })}
        />
      ) : null}
      {children}
    </>
  );
}

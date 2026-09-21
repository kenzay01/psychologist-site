import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

export const BASE_URL = "https://alexandraaleksiuk.com";
export const SITE_NAME = "Олександра Алексюк — Психологиня-сексологиня";

type PageCopy = {
  title: string;
  description: string;
  ogTitle?: string;
};

const pages: Record<string, Record<Locale, PageCopy>> = {
  "": {
    uk: {
      title:
        "Олександра Алексюк — психологиня-сексологиня | Консультації онлайн і в Києві",
      description:
        "Психологічна допомога від Олександри Алексюк: індивідуальні консультації, парна терапія, робота з дітьми та підлітками, супервізія. Онлайн і офлайн у Києві.",
      ogTitle: "Олександра Алексюк — психологиня-сексологиня",
    },
    ru: {
      title:
        "Александра Алексюк — психолог-сексолог | Консультации онлайн и в Киеве",
      description:
        "Психологическая помощь от Александры Алексюк: индивидуальные консультации, парная терапия, работа с детьми и подростками, супервизия. Онлайн и офлайн в Киеве.",
      ogTitle: "Александра Алексюк — психолог-сексолог",
    },
  },
  "/aboutMe": {
    uk: {
      title: "Про мене — Олександра Алексюк | Психологиня-сексологиня",
      description:
        "Хто така Олександра Алексюк: підхід до терапії, формати роботи, клієнти та філософія психологічної практики.",
    },
    ru: {
      title: "Обо мне — Александра Алексюк | Психолог-сексолог",
      description:
        "Кто такая Александра Алексюк: подход к терапии, форматы работы, клиенты и философия психологической практики.",
    },
  },
  "/dyplomy": {
    uk: {
      title: "Дипломи та сертифікати — Олександра Алексюк",
      description:
        "Освіта, дипломи та сертифікати психологині-сексологині Олександри Алексюк.",
    },
    ru: {
      title: "Дипломы и сертификаты — Александра Алексюк",
      description:
        "Образование, дипломы и сертификаты психолога-сексолога Александры Алексюк.",
    },
  },
  "/blogs": {
    uk: {
      title: "Блог — статті з психології та сексології | Олександра Алексюк",
      description:
        "Корисні статті про стосунки, сексуальність, тривогу, травми та психологічне здоров’я від Олександри Алексюк.",
    },
    ru: {
      title: "Блог — статьи по психологии и сексологии | Александра Алексюк",
      description:
        "Полезные статьи об отношениях, сексуальности, тревоге, травмах и психологическом здоровье от Александры Алексюк.",
    },
  },
  "/consultation": {
    uk: {
      title:
        "Консультація психолога — індивідуальна, парна, дитяча | Олександра Алексюк",
      description:
        "Запис на психологічну консультацію: індивідуальна, парна або дитяча. Онлайн і в Києві. Тривалість, вартість і теми роботи.",
    },
    ru: {
      title:
        "Консультация психолога — индивидуальная, парная, детская | Александра Алексюк",
      description:
        "Запись на психологическую консультацию: индивидуальная, парная или детская. Онлайн и в Киеве. Длительность, стоимость и темы работы.",
    },
  },
  "/supervision": {
    uk: {
      title: "Супервізія для психологів — індивідуальна та групова | Олександра Алексюк",
      description:
        "Супервізія для фахівців: індивідуальний і груповий формати. Підтримка професійного розвитку психологів.",
    },
    ru: {
      title: "Супервизия для психологов — индивидуальная и групповая | Александра Алексюк",
      description:
        "Супервизия для специалистов: индивидуальный и групповой форматы. Поддержка профессионального развития психологов.",
    },
  },
  "/therapy-group": {
    uk: {
      title: "Терапевтична група — Олександра Алексюк",
      description:
        "Терапевтична група з Олександрою Алексюк: формат, для кого підходить і як долучитися.",
    },
    ru: {
      title: "Терапевтическая группа — Александра Алексюк",
      description:
        "Терапевтическая группа с Александрой Алексюк: формат, для кого подходит и как присоединиться.",
    },
  },
  "/linktree": {
    uk: {
      title: "Контакти та соцмережі — Олександра Алексюк",
      description:
        "Телефон, месенджери та соціальні мережі Олександри Алексюк. Швидкий зв’язок і запис на консультацію.",
    },
    ru: {
      title: "Контакты и соцсети — Александра Алексюк",
      description:
        "Телефон, мессенджеры и социальные сети Александры Алексюк. Быстрая связь и запись на консультацию.",
    },
  },
};

const NOINDEX_PREFIXES = [
  "/adminBoard",
  "/thank-you",
  "/payment-status",
];

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "";
  const trimmed =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const withoutLocale = trimmed.replace(/^\/(uk|ru)(?=\/|$)/, "");
  return withoutLocale === "/" ? "" : withoutLocale;
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  return "uk";
}

export function swapLocalePath(pathname: string, targetLocale: Locale): string {
  const match = pathname.match(/^\/(uk|ru)(\/.*)?$/);
  if (!match) return `/${targetLocale}`;
  return `/${targetLocale}${match[2] || ""}`;
}

export function isNoIndexPath(pathname: string): boolean {
  const route = normalizePathname(pathname);
  return NOINDEX_PREFIXES.some(
    (prefix) => route === prefix || route.startsWith(`${prefix}/`)
  );
}

export function getPageCopy(pathname: string, locale: Locale): PageCopy {
  const route = normalizePathname(pathname);
  const entry = pages[route];
  if (entry?.[locale]) return entry[locale];
  if (route.startsWith("/blogs/")) {
    return locale === "ru"
      ? {
          title: "Статья блога — Александра Алексюк",
          description:
            "Статья о психологии, отношениях и сексуальности от Александры Алексюк.",
        }
      : {
          title: "Стаття блогу — Олександра Алексюк",
          description:
            "Стаття про психологію, стосунки та сексуальність від Олександри Алексюк.",
        };
  }
  return pages[""][locale];
}

export function buildPageMetadata({
  pathname,
  locale,
  title,
  description,
  ogImage = "/og-image.jpg",
  noIndex,
}: {
  pathname: string;
  locale: Locale;
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const cleanPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname || `/${locale}`;
  const copy = getPageCopy(cleanPath, locale);
  const finalTitle = title || copy.title;
  const finalDescription = description || copy.description;
  const canonical = `${BASE_URL}${cleanPath}`;
  const shouldNoIndex = noIndex ?? isNoIndexPath(cleanPath);

  return {
    title: finalTitle,
    description: finalDescription,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
      languages: {
        "uk-UA": `${BASE_URL}${swapLocalePath(cleanPath, "uk")}`,
        "ru-RU": `${BASE_URL}${swapLocalePath(cleanPath, "ru")}`,
        "x-default": `${BASE_URL}${swapLocalePath(cleanPath, "uk")}`,
      },
    },
    openGraph: {
      title: copy.ogTitle || finalTitle,
      description: finalDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "ru" ? "ru_RU" : "uk_UA",
      alternateLocale: locale === "ru" ? ["uk_UA"] : ["ru_RU"],
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.ogTitle || finalTitle,
      description: finalDescription,
      images: [ogImage === "/og-image.jpg" ? "/twitter-image.jpg" : ogImage],
    },
    robots: shouldNoIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    authors: [{ name: "Олександра Алексюк", url: `${BASE_URL}/uk` }],
    creator: "Олександра Алексюк",
    publisher: SITE_NAME,
    category: "healthcare",
    applicationName: SITE_NAME,
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
    appleWebApp: {
      capable: true,
      title: "Олександра Алексюк",
      statusBarStyle: "default",
    },
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: SITE_NAME,
        inLanguage: ["uk-UA", "ru-RU"],
        publisher: { "@id": `${BASE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Олександра Алексюк",
        url: `${BASE_URL}/uk`,
        image: `${BASE_URL}/og-image.jpg`,
        jobTitle: "Психологиня-сексологиня",
        description:
          "Психологічна допомога: індивідуальні консультації, парна терапія, робота з дітьми та підлітками, супервізія.",
        email: "info@alexandraaleksiuk.com",
        telephone: "+380997906110",
        knowsLanguage: ["uk", "ru"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Київ",
          addressCountry: "UA",
        },
        sameAs: [`${BASE_URL}/uk/linktree`],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${BASE_URL}/#service`,
        name: SITE_NAME,
        url: `${BASE_URL}/uk`,
        image: `${BASE_URL}/og-image.jpg`,
        telephone: "+380997906110",
        email: "info@alexandraaleksiuk.com",
        priceRange: "$$",
        availableLanguage: ["uk", "ru"],
        areaServed: { "@type": "Country", name: "Ukraine" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Київ",
          addressCountry: "UA",
        },
        founder: { "@id": `${BASE_URL}/#person` },
        sameAs: [`${BASE_URL}/uk/linktree`],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Психологічні послуги",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Індивідуальна консультація",
                url: `${BASE_URL}/uk/consultation?type=individual`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Парна консультація",
                url: `${BASE_URL}/uk/consultation?type=couple`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Дитяча консультація",
                url: `${BASE_URL}/uk/consultation?type=child`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Супервізія",
                url: `${BASE_URL}/uk/supervision`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Терапевтична група",
                url: `${BASE_URL}/uk/therapy-group`,
              },
            },
          ],
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

export function articleJsonLd({
  locale,
  slug,
  title,
  description,
  image,
  datePublished,
  dateModified,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = `${BASE_URL}/${locale}/blogs/${slug}`;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`
    : `${BASE_URL}/og-image.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: {
      "@type": "Person",
      name: "Олександра Алексюк",
      url: `${BASE_URL}/uk`,
    },
    publisher: {
      "@type": "Person",
      name: "Олександра Алексюк",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon-192.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: locale === "ru" ? "ru-RU" : "uk-UA",
    url,
  };
}

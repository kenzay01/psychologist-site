import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import "../globals.css";
import AppRootLayout from "@/app/[locale]/RootLayout";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Олександра Алексюк - Психологиня-сексологиня | Психологічна допомога онлайн та офлайн",
    description:
      "Професійна психологічна допомога від досвідченої психологині-сексологині Олександри Алексюк. Індивідуальне консультування, парна терапія, робота з дітьми та підлітками. Спеціалізація: сексуальність, стосунки, психосоматика, травматичний досвід. Онлайн та офлайн консультації.",
    keywords:
      "психологиня Олександра Алексюк, психологічна допомога, сексологиня, парна терапія, дитячий психолог, підлітковий психолог, психологічне консультування онлайн, сексуальні дисфункції, психосоматика, травматичний досвід, тривога, депресія, стрес, стосунки, психологічна підтримка, супервізія психологів, позитивна психотерапія, транзактний аналіз",

    // Іконки
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },

    // Open Graph теги
    openGraph: {
      title: "Олександра Алексюк - Психологиня-сексологиня",
      description:
        "Професійна психологічна допомога та сексологічне консультування. Індивідуальна терапія, парне консультування, робота з дітьми та підлітками. Онлайн та офлайн.",
      url: "https://alexandraaleksiuk.com/uk",
      siteName: "Олександра Алексюк - Психологиня",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Олександра Алексюк - Психологиня-сексологиня. Професійна психологічна допомога",
        },
      ],
      locale: "uk_UA",
      type: "website",
    },

    // Twitter теги
    twitter: {
      card: "summary_large_image",
      title: "Олександра Алексюк - Психологиня-сексологиня",
      description:
        "Професійна психологічна допомога. Індивідуальне консультування, парна терапія, робота з дітьми. Спеціалізація: сексуальність, стосунки, травми.",
      images: ["/twitter-image.jpg"],
    },

    // SEO налаштування
    robots: {
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

    // Canonical URL та мовні альтернативи
    alternates: {
      canonical: "https://alexandraaleksiuk.com/uk",
      languages: {
        "uk-UA": "https://alexandraaleksiuk.com/uk",
        "ru-RU": "https://alexandraaleksiuk.com/ru",
      },
    },

    // Базова URL
    metadataBase: new URL("https://alexandraaleksiuk.com/uk"),

    // Додаткові SEO елементи
    authors: [
      {
        name: "Олександра Алексюк",
        url: "https://alexandraaleksiuk.com/uk",
      },
    ],
    creator: "Олександра Алексюк",
    publisher: "Олександра Алексюк - Психологиня-сексологиня",

    // Налаштування виявлення форматів
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },

    // Верифікація пошукових систем
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },

    // Категоризація
    category: "healthcare",
    classification: "psychology and sexology services",
    applicationName: "Олександра Алексюк - Психологиня",

    // PWA налаштування
    manifest: "/manifest.json",
    themeColor: "red", // Приємний червоний для психологічних послуг
    colorScheme: "light",

    // Viewport налаштування
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },

    // Apple Web App налаштування
    appleWebApp: {
      capable: true,
      title: "Олександра Алексюк",
      statusBarStyle: "default",
    },

    // Додаткові метатеги для кращої індексації
    other: {
      "revisit-after": "7 days",
      "content-language": "uk-UA",
      distribution: "global",
      rating: "general",
      "geo.region": "UA",
      "geo.country": "Ukraine",
      "dc.language": "uk-UA",
      "dc.title": "Олександра Алексюк - Психологиня-сексологиня",
      "dc.creator": "Олександра Алексюк",
      "dc.subject": "психологічна допомога, сексологія, парна терапія",
      "dc.type": "service",
      // Структуровані дані для Google
      "article:author": "Олександра Алексюк",
      "article:section": "Психологічні послуги",
      // Медичні метатеги
      "health-topics": "mental health, psychology, sexology, family therapy",
      "medical-disclaimer": "Консультації не замінюють медичну діагностику",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" data-color-mode="light">
      <head>
        {/* Структуровані дані JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Олександра Алексюк - Психологиня-сексологиня",
              description:
                "Професійна психологічна допомога та сексологічне консультування",
              url: "https://alexandraaleksiuk.com/uk",
              telephone: "+380997906110",
              email: "info@alexandraaleksiuk.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "UA",
                addressRegion: "Україна",
              },
              serviceType: [
                "Індивідуальне консультування",
                "Парна терапія",
                "Дитяча психологія",
                "Сексологічне консультування",
                "Супервізія психологів",
              ],
              provider: {
                "@type": "Person",
                name: "Олександра Алексюк",
                jobTitle: "Психологиня-сексологиня",
                description:
                  "Досвідчена психологиня-сексологиня з багаторічним досвідом роботи",
                knowsAbout: [
                  "Позитивна психотерапія",
                  "Транзактний аналіз",
                  "Полімодальний підхід",
                  "Сексологія",
                  "Психосоматика",
                ],
              },
              areaServed: "Україна",
              availableLanguage: ["українська", "російська"],
              serviceOutput:
                "Психологічна підтримка та покращення ментального здоров'я",
            }),
          }}
        />

        {/* Додаткові метатеги в head */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Для медичних сайтів */}
        <meta
          name="health-disclaimer"
          content="Інформація не замінює професійної медичної консультації"
        />
        <meta name="privacy-policy" content="/privacy-policy" />
      </head>
      <body>
        <AppRootLayout>{children}</AppRootLayout>
      </body>
    </html>
  );
}

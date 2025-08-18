import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import "../globals.css";
import AppRootLayout from "@/app/[locale]/RootLayout";
import Script from "next/script";

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

    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },

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

    twitter: {
      card: "summary_large_image",
      title: "Олександра Алексюк - Психологиня-сексологиня",
      description:
        "Професійна психологічна допомога. Індивідуальне консультування, парна терапія, робота з дітьми. Спеціалізація: сексуальність, стосунки, травми.",
      images: ["/twitter-image.jpg"],
    },

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

    alternates: {
      canonical: "https://alexandraaleksiuk.com/uk",
      languages: {
        "uk-UA": "https://alexandraaleksiuk.com/uk",
        "ru-RU": "https://alexandraaleksiuk.com/ru",
      },
    },

    metadataBase: new URL("https://alexandraaleksiuk.com/uk"),

    authors: [
      {
        name: "Олександра Алексюк",
        url: "https://alexandraaleksiuk.com/uk",
      },
    ],
    creator: "Олександра Алексюк",
    publisher: "Олександра Алексюк - Психологиня-сексологиня",

    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },

    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },

    category: "healthcare",
    classification: "psychology and sexology services",
    applicationName: "Олександра Алексюк - Психологиня",

    manifest: "/manifest.json",
    themeColor: "red",
    colorScheme: "light",

    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },

    appleWebApp: {
      capable: true,
      title: "Олександра Алексюк",
      statusBarStyle: "default",
    },

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
      "article:author": "Олександра Алексюк",
      "article:section": "Психологічні послуги",
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17475095137"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17475095137');
            `,
          }}
        />
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Олександра Алексюк - Психологиня-сексологиня",
              // ... other JSON-LD properties
            }),
          }}
        />

        {/* Additional Meta Tags */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="health-disclaimer"
          content="Інформація не замінює професійної медичної консультації"
        />
        <meta name="privacy-policy" content="/privacy-policy" />
      </head>

      {/* Facebook Pixel Script */}
      <Script id="facebook-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2459138231133802');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2459138231133802&ev=PageView&noscript=1"
        />
      </noscript>

      <body>
        <AppRootLayout>{children}</AppRootLayout>
      </body>
    </html>
  );
}

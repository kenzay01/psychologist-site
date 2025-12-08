import type { Metadata, Viewport } from "next";
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

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: "red",
    colorScheme: "light",
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MHP3DJMV');
            `,
          }}
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X9154K7V57"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X9154K7V57');
            `,
          }}
        />

        {/* TikTok Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

                ttq.load('D31T5JJC77U0G6NU6J9G');
                ttq.page();
              }(window, document, 'ttq');
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
              // ... інші JSON-LD властивості
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

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHP3DJMV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

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

        <AppRootLayout>{children}</AppRootLayout>
      </body>
    </html>
  );
}

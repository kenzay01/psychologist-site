import type { Metadata, Viewport } from "next";
import { locales } from "@/i18n/config";
import "../globals.css";
import AppRootLayout from "@/app/[locale]/RootLayout";
import Script from "next/script";

const BASE_URL = "https://alexandraaleksiuk.com";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Олександра Алексюк - Психологиня-сексологиня | Психологічна допомога онлайн та офлайн",
    description:
      "Професійна психологічна допомога від досвідченої психологині-сексологині Олександри Алексюк. Індивідуальне консультування, парна терапія, робота з дітьми та підлітками. Спеціалізація: сексуальність, стосунки, психосоматика, травматичний досвід. Онлайн та офлайн консультації.",

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
      url: `${BASE_URL}/uk`,
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
      canonical: `${BASE_URL}/uk`,
      languages: {
        "uk-UA": `${BASE_URL}/uk`,
        "ru-RU": `${BASE_URL}/ru`,
      },
    },

    metadataBase: new URL(BASE_URL),

    authors: [
      {
        name: "Олександра Алексюк",
        url: `${BASE_URL}/uk`,
      },
    ],
    creator: "Олександра Алексюк",
    publisher: "Олександра Алексюк - Психологиня-сексологиня",

    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },

    category: "healthcare",
    applicationName: "Олександра Алексюк - Психологиня",
    manifest: "/manifest.json",

    appleWebApp: {
      capable: true,
      title: "Олександра Алексюк",
      statusBarStyle: "default",
    },
  };
}

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: "#ef4444",
    colorScheme: "light",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Олександра Алексюк - Психологиня-сексологиня",
    url: `${BASE_URL}/uk`,
    image: `${BASE_URL}/og-image.jpg`,
    telephone: "+380997906110",
    email: "info@alexandraaleksiuk.com",
    description:
      "Професійна психологічна допомога та сексологічне консультування. Індивідуальна терапія, парне консультування, робота з дітьми та підлітками.",
    availableLanguage: ["uk", "ru"],
    areaServed: {
      "@type": "Country",
      name: "Ukraine",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Київ",
      addressCountry: "UA",
    },
    sameAs: [
      "https://alexandraaleksiuk.com/uk/linktree",
    ],
    priceRange: "$$",
  };

  return (
    <html lang="uk" data-color-mode="light">
      <head>
        {/* GTM only — GA4/Meta/TikTok should be configured inside GTM to avoid duplicate page_view */}
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <meta name="format-detection" content="telephone=yes" />
        <meta
          name="health-disclaimer"
          content="Інформація не замінює професійної медичної консультації"
        />
      </head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHP3DJMV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {/* Marketing pixels: prefer GTM; Meta/TikTok lazy until consent/CMP is added */}
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
        <Script id="tiktok-pixel" strategy="lazyOnload">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('D31T5JJC77U0G6NU6J9G');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>

        <AppRootLayout>{children}</AppRootLayout>
      </body>
    </html>
  );
}

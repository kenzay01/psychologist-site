import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (locales.includes(localeParam as Locale)
    ? localeParam
    : "uk") as Locale;
  return buildPageMetadata({
    pathname: `/${locale}/adminBoard`,
    locale,
    noIndex: true,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

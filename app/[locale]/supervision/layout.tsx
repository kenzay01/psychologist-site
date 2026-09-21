import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import RouteBreadcrumbLd from "@/components/RouteBreadcrumbLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (locales.includes(localeParam as Locale)
    ? localeParam
    : "uk") as Locale;
  return buildPageMetadata({ pathname: `/${locale}/supervision`, locale });
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (locales.includes(localeParam as Locale)
    ? localeParam
    : "uk") as Locale;
  return (
    <>
      <RouteBreadcrumbLd locale={locale} routeKey="supervision" />
      {children}
    </>
  );
}

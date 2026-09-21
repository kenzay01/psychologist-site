import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

const LABELS: Record<
  string,
  { uk: string; ru: string }
> = {
  aboutMe: { uk: "Про мене", ru: "Обо мне" },
  dyplomy: { uk: "Дипломи", ru: "Дипломы" },
  blogs: { uk: "Блог", ru: "Блог" },
  consultation: { uk: "Консультація", ru: "Консультация" },
  supervision: { uk: "Супервізія", ru: "Супервизия" },
  "therapy-group": { uk: "Терапевтична група", ru: "Терапевтическая группа" },
  linktree: { uk: "Контакти", ru: "Контакты" },
};

export default function RouteBreadcrumbLd({
  locale,
  routeKey,
}: {
  locale: Locale;
  routeKey: keyof typeof LABELS;
}) {
  const home = locale === "ru" ? "Главная" : "Головна";
  const label = LABELS[routeKey][locale];
  return (
    <JsonLd
      data={breadcrumbJsonLd([
        { name: home, path: `/${locale}` },
        { name: label, path: `/${locale}/${routeKey === "therapy-group" ? "therapy-group" : routeKey}` },
      ])}
    />
  );
}

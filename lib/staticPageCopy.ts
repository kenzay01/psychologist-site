import type { Locale } from "@/i18n/config";
import uk from "@/i18n/locales/uk.json";
import ru from "@/i18n/locales/ru.json";

const byLocale = { uk, ru } as const;

export function staticAboutMeTitle(locale: Locale): string {
  return byLocale[locale].aboutMe.title;
}

export function staticConsultationTitle(
  locale: Locale,
  type: "individual" | "couple" | "child"
): string {
  return byLocale[locale].consultation.types[type].title;
}

export function staticSupervisionTitle(
  locale: Locale,
  type: "individual" | "group"
): string {
  return byLocale[locale].supervision.types[type].title;
}

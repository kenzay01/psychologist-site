"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { CheckCircle, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ThankYouConsultationContent() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const searchParams = useSearchParams();
  const [consultationType, setConsultationType] = useState<string>("");

  useEffect(() => {
    const type = searchParams.get("type");
    const timestamp = searchParams.get("timestamp");
    
    if (type) {
      setConsultationType(type);
    }

    // Відстеження конверсії для аналітики
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
        value: 1.0,
        currency: "UAH",
        custom_parameters: {
          consultation_type: type || "unknown",
          timestamp: timestamp || Date.now().toString(),
        },
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {dict?.thankYou?.consultation?.title || "Дякуємо за заявку!"}
          </h1>
          {consultationType && (
            <p className="text-sm text-red-600 font-medium mb-2">
              {consultationType === "individual" && (dict?.consultation?.types?.individual?.title || "Індивідуальна консультація")}
              {consultationType === "couple" && (dict?.consultation?.types?.couple?.title || "Парна консультація")}
              {consultationType === "child" && (dict?.consultation?.types?.child?.title || "Дитяча консультація")}
            </p>
          )}
          <p className="text-gray-600">
            {dict?.thankYou?.consultation?.message || 
              "Ваша заявка на консультацію успішно відправлена. Ми зв'яжемося з вами найближчим часом."}
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href={`/${currentLocale}`}
            className="inline-flex items-center justify-center w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {dict?.thankYou?.backToHome || "Повернутися на головну"}
          </Link>

          <a
            href={process.env.NEXT_PUBLIC_TELEGRAM_LINK || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {dict?.thankYou?.contactTelegram || "Написати в Telegram"}
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            {dict?.thankYou?.responseTime || 
              "Час відгуку: до 24 годин"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouConsultation() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Завантаження...</div>}>
      <ThankYouConsultationContent />
    </Suspense>
  );
}

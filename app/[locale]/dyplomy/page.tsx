"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import Image from "next/image";

const CERTIFICATE_COUNT = 19;
const certificateImages = Array.from(
  { length: CERTIFICATE_COUNT },
  (_, i) => `/certificates/certificate_${i + 1}.jpg`
);

export default function DiplomasPage() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          {dict?.diplomas?.title || "Дипломи та сертифікати"}
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {dict?.diplomas?.description ||
            "Наші професійні досягнення та кваліфікації"}
        </p>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {certificateImages.map((image, index) => (
            <div
              key={image}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 break-inside-avoid"
            >
              <Image
                src={image}
                alt={`Сертифікат ${index + 1}`}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width={500}
                height={300}
                quality={60}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

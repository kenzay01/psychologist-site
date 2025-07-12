"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function DiplomasPage() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkImages = async () => {
      setIsLoading(true);
      const validImagePaths: string[] = [];

      // Перевіряємо зображення по одному
      for (let i = 1; i <= 30; i++) {
        const imagePath = `/certificates/certificate_${i}.jpg`;

        try {
          const response = await fetch(imagePath, { method: "HEAD" });
          if (response.ok) {
            validImagePaths.push(imagePath);
          } else {
            break;
          }
        } catch (error) {
          console.error(`Error fetching image ${imagePath}:`, error);
          break;
        }
      }

      setValidImages(validImagePaths);
      setIsLoading(false);
    };

    checkImages();
  }, []);

  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          {dict?.diplomas?.title || "Дипломи та сертифікати"}
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {dict?.diplomas?.description ||
            "Наші професійні досягнення та кваліфікації"}
        </p>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto"></div>
            {/* <p className="mt-4 text-gray-600 text-lg"> */}
            {/* {dict?.diplomas?.loading || "Завантаження дипломів..."} */}
            {/* </p> */}
          </div>
        ) : validImages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              {dict?.diplomas?.noImages || "Зображення дипломів не знайдено"}
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {validImages.map((image, index) => (
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

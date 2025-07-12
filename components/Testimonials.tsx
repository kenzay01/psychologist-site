"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [validImages, setValidImages] = useState<string[]>([]);
  //   const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const checkImages = async () => {
      const validImagePaths: string[] = [];

      // Перевіряємо зображення по одному
      for (let i = 1; i <= 30; i++) {
        const imagePath = `/comments/${currentLocale}/comment_${currentLocale}_${i}.jpg`;

        try {
          const response = await fetch(imagePath, { method: "HEAD" });
          if (response.ok) {
            validImagePaths.push(imagePath);
          } else {
            // Якщо зображення не знайдено, припиняємо пошук
            break;
          }
        } catch (error) {
          // Якщо помилка, припиняємо пошук
          console.error(`Error fetching image ${imagePath}:`, error);
          break;
        }
      }

      setValidImages(validImagePaths);
      //   setImagesLoaded(true);
    };

    checkImages();
  }, [currentLocale]);

  //   if (loading || !imagesLoaded) {
  //     return (
  //       <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //           <div className="text-center">
  //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
  //             <p className="mt-4 text-gray-600">Завантаження галереї...</p>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  //   if (validImages.length === 0) {
  //     return (
  //       <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //           <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
  //             {dict?.testimonials.title}
  //           </h2>
  //           <div className="text-center text-gray-600">
  //             <p>Зображення не знайдено для поточної мови.</p>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          {dict?.testimonials.title}
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {dict?.testimonials.description}
        </p>

        {/* Masonry-стиль галерея */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {validImages.map((image, index) => (
            <div
              key={image}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 break-inside-avoid"
            >
              <img
                src={image}
                alt={`Відгук ${index + 1}`}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0  group-hover:bg-opacity-20 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
// import { useLayoutEffect } from "react";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUp, ArrowDown } from "lucide-react";

const Testimonials = () => {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(3); // Початкова кількість зображень
  const [isDesktop, setIsDesktop] = useState(false);

  // Налаштування кількості зображень для показу
  const INITIAL_DESKTOP_COUNT = 8; // Початкова кількість на десктопі
  const INITIAL_MOBILE_COUNT = 3; // Початкова кількість на мобільних
  const INCREMENT_DESKTOP = 4; // Скільки додавати на десктопі
  const INCREMENT_MOBILE = 3; // Скільки додавати на мобільних

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      // Встановлюємо початкову кількість залежно від розміру екрану
      if (desktop) {
        setDisplayCount(INITIAL_DESKTOP_COUNT);
      } else {
        setDisplayCount(INITIAL_MOBILE_COUNT);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const checkImages = async () => {
      setIsLoading(true);
      const validImagePaths: string[] = [];

      for (let i = 1; i <= 30; i++) {
        const imagePath = `/comments/${currentLocale}/comment_${currentLocale}_${i}.jpg`;

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
  }, [currentLocale]);

  // Показуємо обмежену кількість зображень на всіх пристроях
  const displayedImages = validImages.slice(0, displayCount);

  // Функція для показу наступних зображень
  const handleShowMore = () => {
    setDisplayCount(
      (prev) => prev + (isDesktop ? INCREMENT_DESKTOP : INCREMENT_MOBILE)
    );
  };

  // Функція для скорочення кількості зображень
  const handleShowLess = () => {
    const reviewsPosition = document.getElementById("reviewsContainer");
    if (reviewsPosition) {
      try {
        // Спробуємо scrollIntoView
        reviewsPosition.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } catch (error) {
        // Fallback для старих браузерів
        const rect = reviewsPosition.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop;

        window.scrollTo(0, targetY);
        console.error(error);
      }

      // Змінюємо стан з затримкою
      setTimeout(() => {
        setDisplayCount(
          isDesktop ? INITIAL_DESKTOP_COUNT : INITIAL_MOBILE_COUNT
        );
      }, 300);
    } else {
      setDisplayCount(isDesktop ? INITIAL_DESKTOP_COUNT : INITIAL_MOBILE_COUNT);
    }
  };

  return (
    <div className="py-8 bg-white" id="reviewsContainer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
          {dict?.testimonials?.title || "Відгуки"}
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {dict?.testimonials?.description || "Думки наших клієнтів"}
        </p>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto"></div>
          </div>
        ) : validImages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              {dict?.testimonials?.noImages ||
                "Зображення відгуків не знайдено"}
            </p>
          </div>
        ) : (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {displayedImages.map((image, index) => (
                <div
                  key={image}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 break-inside-avoid"
                >
                  <Image
                    src={image}
                    alt={`Відгук ${index + 1}`}
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

            {/* Кнопка для показу більше/менше зображень */}
            <div className="text-center mt-8">
              <button
                onClick={
                  validImages.length > displayCount
                    ? handleShowMore
                    : handleShowLess
                }
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold text-base inline-flex items-center gap-2 justify-center hover:scale-105 transition-all duration-300 shadow-md"
              >
                {validImages.length > displayCount
                  ? dict?.testimonials?.moreReviews || "Більше відгуків"
                  : dict?.testimonials?.lessReviews || "Менше відгуків"}
                {validImages.length > displayCount ? (
                  <ArrowDown className="w-4 h-4" />
                ) : (
                  <ArrowUp className="w-4 h-4" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Testimonials;

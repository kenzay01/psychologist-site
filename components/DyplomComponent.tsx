"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function DiplomasBlock() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const router = useRouter();

  // Дипломи з підписами
  const diplomas = [
    {
      id: 1,
      title:
        dict?.diplomas.subtitle ||
        "CBT-сертификат \n Супервизия 2024 \n Тренинг по эмоциональному интеллекту",
      image1: "/certificates/certificate_18.jpg",
      image2: "/certificates/certificate_19.jpg",
      image3: "/certificates/certificate_17.jpg",
    },
  ];

  useEffect(() => {
    const checkImages = async () => {
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

      //   setValidImages(validImagePaths);
    };

    checkImages();
  }, []);

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {dict?.diplomas?.title || "Дипломи та сертифікати"}
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {dict?.diplomas?.description ||
              "Ознайомтеся з моїми професійними досягненнями"}
          </p>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-8 w-full">
          {diplomas.map((diploma) => (
            <div
              key={diploma.id}
              className="bg-white rounded-2xl transition-all duration-300 overflow-hidden flex flex-col w-full"
            >
              {/* Image Section */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4">
                <div className="w-full md:w-1/3 shadow-lg">
                  <Image
                    src={diploma.image1}
                    alt={diploma.title}
                    className="w-full h-full object-cover rounded-lg"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 16vw"
                    loading="lazy"
                    width={250}
                    height={300}
                  />
                </div>
                <div className="w-full md:w-1/3 shadow-lg">
                  <Image
                    src={diploma.image2}
                    alt={diploma.title}
                    className="w-full h-full object-cover rounded-lg"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 16vw"
                    loading="lazy"
                    width={250}
                    height={300}
                  />
                </div>
                <div className="w-full md:w-1/4 shadow-lg">
                  <Image
                    src={diploma.image3}
                    alt={diploma.title}
                    className="w-full h-full object-cover rounded-lg"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 16vw"
                    loading="lazy"
                    width={250}
                    height={300}
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 md:p-6 flex flex-col items-center">
                <button
                  onClick={() => router.push(`/${currentLocale}/dyplomy`)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-xl font-semibold text-base md:text-md inline-flex items-center gap-2 justify-center hover:scale-102 transition-all duration-300 shadow-md"
                >
                  {dict?.diplomas?.cta?.learnMore || "Дізнатися більше"}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

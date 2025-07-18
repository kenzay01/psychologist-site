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
  //   const [validImages, setValidImages] = useState<string[]>([]);

  // Дипломи з підписами
  const diplomas = [
    {
      id: 1,
      title:
        dict?.diplomas.subtitle ||
        "CBT-сертификат \n Супервизия 2024 \n Тренинг по эмоциональному интеллекту",
      image: "/certificates/certificate_17.jpg",
      image2: "/certificates/certificate_1.jpg",
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
              className="bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row hover:shadow-2xl hover:scale-[1.01]"
            >
              {/* Image Section */}
              <div className="flex-none w-full md:w-1/2 bg-gray-100 flex items-center justify-center gap-2 p-2">
                <div className="flex-1/5">
                  <Image
                    src={diploma.image}
                    alt={diploma.title}
                    className="w-full h-full object-cover rounded-lg"
                    quality={85}
                    //   placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 16vw"
                    width={250}
                    height={300}
                  />
                </div>
                <div className="flex-1/3">
                  <Image
                    src={diploma.image2}
                    alt={diploma.title}
                    className="w-full h-full object-cover rounded-lg"
                    quality={85}
                    //   placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 16vw"
                    width={400}
                    height={300}
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                <h3 className="text-md md:text-xl font-bold text-gray-900 mb-2 flex flex-col gap-2">
                  {diploma.title.split("\n").map((line, index) => (
                    // <Fragment key={index}>
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <button
                  onClick={() => router.push(`/${currentLocale}/dyplomy`)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 w-full py-2 md:px-8 md:py-3 rounded-xl font-semibold text-base md:text-md inline-flex items-center gap-2 justify-between hover:scale-102 transition-all duration-300 shadow-md"
                >
                  {dict?.diplomas?.cta?.learnMore || "Дізнатися більше"}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile version - Horizontal Slider */}
        {/* <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4">
          {diplomas.map((diploma) => (
            <div
              key={diploma.id}
              className="bg-white rounded-2xl shadow-xl flex-none w-4/5 snap-center"
            >
              <div className="flex flex-col">
                <div className="bg-gray-100 flex items-center justify-center">
                  <Image
                    src={diploma.image}
                    alt={diploma.title}
                    className="w-full h-48 object-cover"
                    quality={85}
                    // placeholder="blur"
                    sizes="(max-width: 768px) 80vw"
                    width={300}
                    height={200}
                  />
                </div>
                <div className="p-4 flex flex-col justify-center">
                  <h3 className="text-md font-bold text-gray-900 mb-3">
                    {diploma.title}
                  </h3>
                  <button
                    onClick={() => router.push(`/${currentLocale}/dyplomy`)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold text-sm inline-flex items-center gap-2 justify-between hover:scale-102 transition-all duration-300 shadow-md"
                  >
                    {dict?.diplomas?.cta?.learnMore || "Дізнатися більше"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

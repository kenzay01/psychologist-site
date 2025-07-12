"use client";
import Image from "next/image";
import benefitsImg from "@/public/benefits-img.jpg";
import { useRouter } from "next/navigation";
import {
  Shield,
  Users,
  Heart,
  Sparkles,
  HandHeart,
  GraduationCap,
} from "lucide-react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function BenefitsContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const router = useRouter();
  const benefits = [
    {
      id: "01",
      title: dict?.benefits.items[0].title,
      description: dict?.benefits.items[0].description,
      icon: Sparkles,
    },
    {
      id: "02",
      title: dict?.benefits.items[1].title,
      description: dict?.benefits.items[1].description,
      icon: Users,
    },
    {
      id: "03",
      title: dict?.benefits.items[2].title,
      description: dict?.benefits.items[2].description,
      icon: Heart,
    },
    {
      id: "04",
      title: dict?.benefits.items[3].title,
      description: dict?.benefits.items[3].description,
      icon: Shield,
    },
    {
      id: "05",
      title: dict?.benefits.items[4].title,
      description: dict?.benefits.items[4].description,
      icon: HandHeart,
    },
    {
      id: "06",
      title: dict?.benefits.items[5].title,
      description: dict?.benefits.items[5].description,
      icon: GraduationCap,
    },
  ];

  // if (loading) return null;

  return (
    <section className="relative py-10 font-semibold">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            {dict?.benefits.title}
          </h1>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Image */}
          <div className="flex-1/3 flex flex-col gap-8 justify-center">
            <h1 className="md:text-lg font-semibold text-black mb-4 text-center">
              {dict?.benefits.description}
            </h1>
            <Image
              src={benefitsImg}
              alt="Олександра Алексюк"
              className="w-full md:w-auto md:h-160 h-92 rounded-3xl shadow-2xl self-center object-cover"
              quality={85}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>

          <div className="flex-1/2 flex flex-col gap-4 justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={benefit.id}
                    className="group bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-2 shadow-md group-hover:shadow-lg transition-all duration-300">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-black group-hover:text-red-600 transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed font-normal text-gray-700">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Button */}
            <div className="pt-6 md:col-span-2 w-full">
              <button
                onClick={() => {
                  router.push(`/${currentLocale}/aboutMe`);
                }}
                className="bg-red-500 hover:bg-red-600 text-white w-full md:px-12 py-3 rounded-bl-md rounded-br-3xl rounded-tl-3xl rounded-tr-md font-semibold shadow-md hover:scale-105 transition-all duration-300"
              >
                {dict?.benefits.cta.learnMore}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

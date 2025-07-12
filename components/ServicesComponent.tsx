"use client";
import { User, Users, Baby, GraduationCap, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import supervisionImg from "@/public/services/supervision.png";
import individualImg from "@/public/services/individual.jpg";
import couple from "@/public/services/couple.jpg";
import child from "@/public/services/child.jpg";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function ServicesBlock() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const router = useRouter();

  const services = [
    {
      id: 1,
      title: dict?.services.items[0].title,
      description: dict?.services.items[0].description,
      icon: User,
      link: "/consultation?type=individual",
      img: individualImg,
    },
    {
      id: 2,
      title: dict?.services.items[1].title,
      description: dict?.services.items[1].description,
      icon: Users,
      link: "/consultation?type=couple",
      img: couple,
    },
    {
      id: 3,
      title: dict?.services.items[2].title,
      description: dict?.services.items[2].description,
      icon: Baby,
      link: "/consultation?type=child",
      img: child,
    },
    {
      id: 4,
      title: dict?.services.items[3].title,
      description: dict?.services.items[3].description,
      icon: GraduationCap,
      link: "/supervision",
      img: supervisionImg,
    },
  ];

  // if (loading) return null;

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {dict?.services.title}
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {dict?.services.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row hover:shadow-2xl hover:scale-[1.01]"
            >
              {/* Image/Icon Section */}
              <div className="flex-none w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
                <Image
                  src={service.img}
                  alt={service.title ?? ""}
                  className="w-full h-full object-cover"
                  quality={85}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-md leading-relaxed mb-4 md:mb-6 flex-1">
                  {service.description}
                </p>
                <button
                  onClick={() => router.push(`${currentLocale}${service.link}`)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 w-full py-2 md:px-8 md:py-3 rounded-xl font-semibold text-base md:text-md inline-flex items-center gap-2 justify-between hover:scale-102 transition-all duration-300 shadow-md"
                >
                  {dict?.services.cta.learnMore}
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

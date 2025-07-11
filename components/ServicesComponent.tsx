"use client";
import { User, Users, Baby, GraduationCap, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import supervisionImg from "@/public/services/supervision.png"; // Placeholder image path
import individualImg from "@/public/services/individual.jpg"; // Placeholder image path
import couple from "@/public/services/couple.jpg"; // Placeholder image path
import child from "@/public/services/child.jpg"; // Placeholder image path
export default function ServicesBlock() {
  const router = useRouter();

  const services = [
    {
      id: 1,
      title: "Індивідуальне консультування",
      description:
        "Професійна психологічна допомога для дорослих. Працюю з тривогою, депресією, стресом та іншими життєвими викликами.",
      icon: User,
      link: "/consultation?type=individual",
      img: individualImg,
    },
    {
      id: 2,
      title: "Парне консультування",
      description:
        "Допомога парам у вирішенні конфліктів, покращенні комунікації та зміцненні стосунків.",
      icon: Users,
      link: "/consultation?type=couple",
      img: couple,
    },
    {
      id: 3,
      title: "Робота з дітьми та підлітками",
      description:
        "Спеціалізована допомога дітям та підліткам у подоланні емоційних труднощів та адаптації.",
      icon: Baby,
      link: "/consultation?type=child",
      img: child,
    },
    {
      id: 4,
      title: "Супервізія для психологів",
      description:
        "Професійна супервізія для практикуючих психологів. Групові та індивідуальні сесії.",
      icon: GraduationCap,
      link: "/supervision",
      img: supervisionImg,
    },
  ];

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Послуги
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Професійна психологічна допомога для різних життєвих ситуацій
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
              <div className="flex-none w-full md:w-1/2 bg-gray-100  flex items-center justify-center">
                {/* <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 md:p-8">
                  <service.icon className="w-12 h-12 md:w-16 md:h-16 text-white bg-red-500 p-3 rounded-full" />
                </div> */}
                <Image
                  src={service.img}
                  alt={service.title}
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
                  onClick={() => router.push(service.link)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 w-full py-2 md:px-8 md:py-3 rounded-xl font-semibold text-base md:text-md inline-flex items-center gap-2 justify-between hover:scale-102 transition-all duration-300 shadow-md"
                >
                  Дізнатися більше
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

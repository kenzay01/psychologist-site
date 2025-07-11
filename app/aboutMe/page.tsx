"use client";
import Image from "next/image";
import aboutMeImg from "@/public/about-me-img.jpg";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import {
  MapPin,
  Monitor,
  Users,
  Heart,
  MessageCircle,
  Star,
  Shield,
  Lightbulb,
  Compass,
} from "lucide-react";

export default function AboutMe() {
  // const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const approaches = [
    {
      name: "Позитивна психотерапія",
      description: "Фокус на ресурсах і сильних сторонах особистості",
      icon: Star,
    },
    {
      name: "Трансактний аналіз",
      description: "Розуміння динаміки стосунків і внутрішніх станів",
      icon: MessageCircle,
    },
    {
      name: "Полімодальний підхід",
      description: "Гнучке поєднання різних терапевтичних методів",
      icon: Compass,
    },
    {
      name: "Психосоматика",
      description: "Робота з тілесними проявами емоційних станів",
      icon: Heart,
    },
    {
      name: "Сімейна терапія",
      description: "Налагодження стосунків у родині та з близькими",
      icon: Users,
    },
  ];

  const workFormats = [
    {
      title: "Консультації в Києві",
      location: "центр міста",
      icon: MapPin,
      description: "Особисті зустрічі в комфортному офісі",
    },
    {
      title: "Онлайн-формат",
      location: "з будь-якої точки світу",
      icon: Monitor,
      description: "Зручні сесії через відеозв'язок",
    },
    {
      title: "Супервізії для психологів",
      location: "індивідуальні та групові",
      icon: Users,
      description: "Професійна підтримка для колег",
    },
  ];

  const clientTypes = [
    {
      title: "Жінки, які прагнуть змін",
      description: "Ті, хто втомився бути завжди сильною і хоче знайти баланс",
      icon: Heart,
    },
    {
      title: "Пари в пошуках близькості",
      description: "Хочуть відновити зв'язок, сексуальність та взаємоповагу",
      icon: Users,
    },
    {
      title: "Підлітки у становленні",
      description:
        "Шукають себе, переживають тривогу чи проблеми з ідентичністю",
      icon: Compass,
    },
    {
      title: "Фахівці в розвитку",
      description: "Потребують супервізії, підтримки та професійного зростання",
      icon: Lightbulb,
    },
    {
      title: "Люди в кризових станах",
      description: "Не знають що саме болить, але відчувають потребу в змінах",
      icon: Shield,
    },
  ];

  return (
    <>
      <section className="min-h-screen bg-white py-8">
        <div className="max-w-6xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Про мене
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start mb-8 md:mb-16">
            {/* Left Column - Image and Quote */}
            <div className="space-y-4 md:space-y-8">
              <div className="relative">
                <Image
                  src={aboutMeImg}
                  alt="Олександра Алексюк - психологиня-сексологиня"
                  className="w-full h-106 object-cover rounded-3xl shadow-2xl"
                  placeholder="blur"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="relative mt-4 md:mt-0 md:absolute md:-bottom-6 md:-right-6 bg-red-500 text-white px-4 py-3 rounded-2xl shadow-lg max-w-sm">
                  <blockquote className=" font-medium italic">
                    «Зі мною можна по-справжньому: без сорому, без `правильно`
                    чи `неправильно`. Я створюю безпечний простір для справжніх
                    розмов»
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Right Column - About Text */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Мій підхід до роботи
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Я не працюю за готовими шаблонами. Кожна людина унікальна,
                  тому терапія вибудовується саме під ваші потреби, темп і
                  особливості. Створюю безпечний простір, де можна говорити про
                  важке, сумне, інтимне — все, що справжнє.
                </p>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="text-gray-700 font-medium">
                    Працюю з повагою до ваших кордонів, досвіду та темпу. Не даю
                    готових порад — разом досліджуємо, що саме для вас є
                    правдою, ресурсом і виходом.
                  </p>
                </div>
              </div>

              <div className="bg-red-100 rounded-2xl p-8 border border-red-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Філософія роботи
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Вірю, що з теплом, професіоналізмом і прийняттям можливо
                  зцілювати навіть дуже глибокі рани. Усе, що зараз болить — має
                  право бути. І може стати точкою росту.
                </p>
              </div>
            </div>
          </div>

          {/* Approaches Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Підходи у роботі
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approaches.map((approach, index) => {
                const IconComponent = approach.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-red-100 p-3 rounded-full mr-4">
                        <IconComponent className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {approach.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {approach.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Work Formats Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Формати роботи
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {workFormats.map((format, index) => {
                const IconComponent = format.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
                  >
                    <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {format.title}
                    </h3>
                    <p className="text-red-600 font-medium mb-4">
                      {format.location}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {format.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Client Types Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              З ким я працюю
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {clientTypes.map((client, index) => {
                const IconComponent = client.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {client.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {client.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-red-500 rounded-3xl p-6 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Готові розпочати свій шлях до змін?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Говорити про сексуальність, стосунки і внутрішні конфлікти можна —
              без сорому, осуду чи табу.
            </p>
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="bg-white text-red-600 w-full px-2  md:px-12 py-4 rounded-bl-md rounded-br-3xl rounded-tl-3xl rounded-tr-md font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              ЗАПИСАТИСЯ НА КОНСУЛЬТАЦІЮ
            </button>
          </div>
        </div>
      </section>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

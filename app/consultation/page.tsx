"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingModal from "@/components/BookingModal";
import {
  Calendar,
  Clock,
  Star,
  MessageCircle,
  CreditCard,
  User,
  Users,
  Baby,
} from "lucide-react";

type ConsultationType = "individual" | "couple" | "child";

const ConsultationContent = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ConsultationType>("individual");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultationType, setSelectedConsultationType] =
    useState<ConsultationType>("individual");

  useEffect(() => {
    const type = searchParams.get("type") as ConsultationType;
    if (type && ["individual", "couple", "child"].includes(type)) {
      setActiveTab(type);
      setSelectedConsultationType(type);
    }
  }, [searchParams]);

  const consultationData = {
    individual: {
      title: "Індивідуальна терапія",
      icon: <User className="w-6 h-6" />,
      duration: "60",
      price: "2000",
      blockquote:
        "«Коли всередині щось болить, але словами не описати — це вже запит»",
      description:
        "Індивідуальна терапія — це місце, де не треба триматися. Тут можна зняти всі маски й бути справжньою.",
      description2:
        "Ми звикаємо справлятись. Терпіти, усміхатись, бути «зручною», «сильною», «успішною». Але всередині накопичується втома, порожнеча, тривога, відчуття, що щось не так — із життям, із тілом, з собою.",
      topics: [
        "Постійна тривога, відчуття провини, сором",
        "Апатія, втрата сенсу, «нічого не хочу»",
        "Проблеми у стосунках або неможливість їх побудувати",
        "Відсутність сексуального бажання або страх інтимності",
        "Тілесний сором, неприйняття себе",
        "Розрив, зрада, розлучення",
        "Нав’язливі думки, перфекціонізм, синдром самозванця",
        "Післяпологові стани, материнське вигоряння",
        "ПТСР, досвід війни або насильства",
        "«Просто важко» — без пояснень",
      ],
      format: "Онлайн або офлайн сесії (Київ), тривалістю 50–60 хвилин",
      reviews: [
        {
          name: "Олена К.",
          rating: 5,
          text: "Дуже професійний підхід. Допомогла розібратися з тривожністю.",
        },
        {
          name: "Михайло С.",
          rating: 5,
          text: "Рекомендую! Відчуваю значні зміни після кількох сесій.",
        },
      ],
    },
    couple: {
      title: "Сімейна та парна психотерапія",
      icon: <Users className="w-6 h-6" />,
      duration: "80",
      price: "2600",
      blockquote:
        "«Коли в системі порушується баланс — страждають усі. Але змінюючи взаємодію, можна змінити життя»",
      description:
        "У сім’ї чи парі ми можемо відчувати найбільшу близькість — або найбільший біль. Стосунки, які мали бути джерелом сили, нерідко стають полем боротьби, розчарувань, образ і мовчання.",
      description2:
        "Я працюю з сімейними та парними системами, допомагаючи знайти нову мову розуміння, почути одне одного, відновити зв’язок і довіру. Я бачу пару чи родину не як набір окремих людей, а як єдину живу систему, в якій кожен має значення.",
      topics: [
        "Неможливість домовитися",
        "Криза: зрада, ревнощі, втрата близькості",
        "Зміни після народження дитини",
        "Відсутність спільного «ми»",
        "Дивна поведінка дитини як дзеркало системи",
        "Бажання зберегти або поглибити стосунки",
      ],
      format: "Онлайн або офлайн сесії (Київ), тривалістю 80 хвилин",
      reviews: [
        {
          name: "Андрій та Марія",
          rating: 5,
          text: "Врятували наші стосунки. Дякуємо за професійну допомогу!",
        },
        {
          name: "Ігор та Аліна",
          rating: 5,
          text: "Навчилися краще розуміти один одного.",
        },
      ],
    },
    child: {
      title: "Дитяче та підліткове консультування",
      icon: <Baby className="w-6 h-6" />,
      duration: "60",
      price: "2000",
      blockquote:
        "«Дитина не має проблем — вона має спосіб кричати про те, що її турбує»",
      description:
        "Діти та підлітки не завжди можуть пояснити словами, що з ними відбувається. Вони говорять через поведінку, тіло, страхи, тишу, сльози, гнів або дивні реакції. І завдання дорослих — почути ці сигнали.",
      description2:
        "Я працюю з дітьми, підлітками та батьками як психологиня, дитяча та підліткова терапевтка. Створюю безпечний простір, де дитина може бути собою, а батьки — отримати підтримку та розуміння.",
      topics: [
        "Замкнутість, тривожність, страхи",
        "Агресія, істерики, відмова говорити",
        "Порушення сну, апетиту, тики",
        "Труднощі в адаптації до садка чи школи",
        "Реакції на зміни, розлучення батьків",
        "Підліткова криза ідентичності, самопошук",
        "Тілесний сором, сексуальні переживання",
        "Булінг, тривога, складнощі у навчанні",
      ],
      format:
        "Індивідуальна робота або сімейні сесії (онлайн/офлайн у Києві), тривалістю 45–60 хвилин",
      reviews: [
        {
          name: "Оксана (мама Данила)",
          rating: 5,
          text: "Син став більш впевненим і комунікабельним.",
        },
        {
          name: "Володимир (батько Ані)",
          rating: 5,
          text: "Допомогли дочці впоратися з шкільними проблемами.",
        },
      ],
    },
  };

  const openModal = (type: keyof typeof consultationData) => {
    setSelectedConsultationType(type);
    setIsModalOpen(true);
  };

  const currentData = consultationData[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Object.entries(consultationData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  params.set("type", key);
                  window.history.replaceState(
                    {},
                    "",
                    `${window.location.pathname}?${params.toString()}`
                  );
                }}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                  activeTab === key
                    ? "bg-white text-red-500 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {data.icon}
                <span className="hidden sm:inline">{data.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex-1 md:flex-0">{currentData.icon}</div>
                <h1 className="md:flex-1 text-3xl font-bold text-gray-800">
                  {currentData.title}
                </h1>
              </div>

              <blockquote className="text-sm md:text-[16px] font-medium italic leading-relaxed mb-4">
                {currentData.blockquote}
              </blockquote>

              <p className="text-gray-600 text-lg mb-4">
                {currentData.description}
              </p>
              <p className="text-gray-600 text-lg ">
                {currentData.description2}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Теми роботи
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentData.topics.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Формат і умови
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    Тривалість: {currentData.duration} хвилин
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">{currentData.format}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    Ціна: {currentData.price} грн
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Відгуки клієнтів
              </h2>
              <div className="space-y-4">
                {currentData.reviews.map((review, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-800">
                        {review.name}
                      </span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Швидка інформація
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Тривалість:</span>
                  <span className="font-medium">{currentData.duration} хв</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ціна:</span>
                  <span className="font-medium">{currentData.price} грн</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Формат:</span>
                  <span className="font-medium">Онлайн/офлайн</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="space-y-3">
                <button
                  onClick={() => openModal(activeTab)}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Записатися на консультацію</span>
                </button>

                <a
                  href="https://t.me/admin_username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Зв`язатися в Telegram</span>
                </a>
              </div>
            </div>
            {selectedConsultationType === "couple" && (
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Важлива інформація
                </h3>
                <h4 className="text-sm text-red-600 italic">
                  Також можливе індивідуальне консультування одного з партнерів,
                  якщо наразі немає змоги або готовності працювати разом.
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        consultationType={selectedConsultationType}
        price={Number(consultationData[selectedConsultationType].price)}
        duration={Number(
          consultationData[selectedConsultationType].duration.split("-")[0]
        )}
      />
    </div>
  );
};

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <ConsultationContent />
    </Suspense>
  );
}

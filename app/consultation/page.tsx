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
      title: "Індивідуальне консультування",
      icon: <User className="w-6 h-6" />,
      duration: "50",
      price: "1500",
      description:
        "Персональна робота з досвідченим психологом для вирішення особистих проблем та розвитку особистості.",
      topics: [
        "Тривожність та стрес",
        "Депресивні стани",
        "Самооцінка та впевненість",
        "Особистісне зростання",
        "Робота з травмами",
        "Відносини з оточенням",
      ],
      format: "Онлайн або офлайн сесії тривалістю 50 хвилин",
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
      title: "Парне консультування",
      icon: <Users className="w-6 h-6" />,
      duration: "80",
      price: "2200",
      description:
        "Спеціалізована робота з парами для покращення стосунків, розв'язання конфліктів та зміцнення партнерства.",
      topics: [
        "Комунікація в парі",
        "Конфлікти та їх вирішення",
        "Інтимність та сексуальність",
        "Довіра та ревнощі",
        "Планування майбутнього",
        "Подолання кризи",
      ],
      format: "Онлайн або офлайн сесії тривалістю 80 хвилин для пари",
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
      title: "Робота з дітьми та підлітками",
      icon: <Baby className="w-6 h-6" />,
      duration: "45",
      price: "1200",
      description:
        "Спеціалізована допомога дітям віком 6-17 років з урахуванням вікових особливостей та потреб.",
      topics: [
        "Адаптація до школи",
        "Поведінкові проблеми",
        "Тривожність у дітей",
        "Підлітковий період",
        "Проблеми з навчанням",
        "Соціальні навички",
      ],
      format: "Індивідуальна робота або сімейні сесії тривалістю 45 хвилин",
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
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Object.entries(consultationData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => {
                  // setActiveTab(key as ConsultationType);
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
                    ? "bg-white text-teal-600 shadow-sm"
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-1 md:flex-0">{currentData.icon}</div>
                <h1 className="md:flex-1 text-3xl font-bold text-gray-800">
                  {currentData.title}
                </h1>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {currentData.description}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Теми роботи
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentData.topics.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
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
                  <Clock className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700">
                    Тривалість: {currentData.duration} хвилин
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700">{currentData.format}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-teal-500" />
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
                  <div key={index} className="border-l-4 border-teal-500 pl-4">
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
                    <p className="text-gray-600 italic">`{review.text}`</p>
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
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
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

            {/* <div className="bg-teal-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-teal-800 mb-3">
                Важлива інформація
              </h3>
              <ul className="text-sm text-teal-700 space-y-2">
                <li>• Можна скасувати запис за 24 години</li>
                <li>• Конфіденційність гарантована</li>
                <li>• Перша консультація включає знайомство</li>
                <li>• Можлива оплата частинами</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        consultationType={selectedConsultationType}
        price={Number(consultationData[selectedConsultationType].price)}
        duration={Number(consultationData[selectedConsultationType].duration)}
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

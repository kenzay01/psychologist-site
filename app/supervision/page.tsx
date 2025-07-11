"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Star, User, Users } from "lucide-react";
import Modal from "@/components/Modal/Modal";

// Головний компонент сторінки
type SupervisionType = "individual" | "group";

const SupervisionContent = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<SupervisionType>("individual");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupervisionType, setSelectedSupervisionType] =
    useState<SupervisionType>("individual");

  useEffect(() => {
    const type = searchParams.get("type") as SupervisionType;
    if (type && ["individual", "group"].includes(type)) {
      setActiveTab(type);
      setSelectedSupervisionType(type);
    }
  }, [searchParams]);

  const supervisionData = {
    individual: {
      title: "Індивідуальна супервізія",
      icon: <User className="w-6 h-6" />,
      duration: "60",
      price: "2000",
      description:
        "Простір для глибокої роботи з особистими темами, контрперенесенням, вигорянням або власною терапевтичною історією. Тут можна говорити про те, що ви не наважуєтесь обговорити в групі.",
      topics: [
        "Складні клієнтські кейси",
        "Контрперенос та перенесення",
        "Емоційне вигоряння",
        "Професійна впевненість",
        "Теми сексуальності та травми",
        "Формування терапевтичного стилю",
      ],
      format: "Онлайн або офлайн (Київ), за попереднім записом",
      reviews: [
        {
          name: "Анна П.",
          rating: 5,
          text: "Допомогла розібратися зі складним кейсом і повернути впевненість у роботі.",
        },
        {
          name: "Олег К.",
          rating: 5,
          text: "Дуже підтримуюча атмосфера, отримав чіткі рекомендації.",
        },
      ],
    },
    group: {
      title: "Групова супервізія",
      icon: <Users className="w-6 h-6" />,
      duration: "120",
      price: "1000",
      description:
        "Професійне коло для обміну досвідом, роботи з кейсами, зворотного зв’язку та підтримки. До 12 учасників, 1 раз на 2 тижні.",
      topics: [
        "Обмін досвідом",
        "Робота з кейсами",
        "Професійна підтримка",
        "Аналіз інтервенцій",
        "Групова динаміка",
        "Багатопарадигмальний підхід",
      ],
      format: "Онлайн, 1 раз на 2 тижні, тривалість 2 години",
      reviews: [
        {
          name: "Марія С.",
          rating: 5,
          text: "Неймовірно цінний досвід, відчуваю себе частиною професійної спільноти.",
        },
        {
          name: "Ірина Л.",
          rating: 5,
          text: "Допомогло подивитися на кейси з різних сторін.",
        },
      ],
    },
  };

  const openModal = (type: keyof typeof supervisionData) => {
    setSelectedSupervisionType(type);
    setIsModalOpen(true);
  };

  const currentData = supervisionData[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Object.entries(supervisionData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => {
                  //   setActiveTab(key as SupervisionType);
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
                    ? "bg-white text-red-500 shadow-sm border-2 border-red-500"
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
            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <div className="flex items-center space-x-3 mb-4">
                {currentData.icon}
                <h1 className="text-3xl font-bold text-gray-800">Супервізія</h1>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed italic">
                «Супервізія — це не розкіш, а турбота про себе та своїх
                клієнтів»
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                Психологічна практика — це глибока робота з болем, страхами,
                травмами інших людей. І щоб зберігати ясність, стійкість, не
                вигоріти — нам потрібен простір, де можна бути не `терапевтом`,
                а живою людиною. Супервізія — це дзеркало того, як ви працюєте з
                клієнтом і як це потім проявляється у вашому власному житті.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Чому супервізія зі мною?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Я — клінічна психологиня, психотерапевтка, сексологиня,
                викладачка та супервізорка з багаторічним досвідом. Моя
                супервізійна робота базується на багатофокусному полімодальному
                підході, що дає змогу розглядати кейси з різних професійних
                ракурсів — гнучко, точно, багатогранно. Мені довіряють ті, хто
                вже самі є підтримкою для інших.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                На моїх супервізіях працюють фахівці з різних напрямів:
                психоаналітики, когнітивно-поведінкові терапевти, терапевти
                символдрами, практики позитивної психотерапії, спеціалісти з
                травмотерапії, тілесно-орієнтованих та інтегративних методів.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Для кого ця супервізія?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Застрягли у кейсі й не розумієте, як рухатися далі",
                  "Маєте сумнів: «чи я хороша/ий терапевт?»",
                  "Берете багато клієнтів за низький чек",
                  "Емоційно виснажені та уникаєте сесій",
                  "Втрачаєте впевненість і боїтесь помилитися",
                  "Хочете глибше розуміти себе у стосунках із клієнтами",
                  "Потребуєте професійного росту в безпечному середовищі",
                  "Починаєте шлях у психології/сексології",
                  "Стикаєтесь з темами сексуальності, насильства, травми",
                ].map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Формат і умови
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    Цільова аудиторія: Психологи, сексологи, студенти
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    Теми: Складні кейси, професійне зростання
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">{currentData.format}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    По завершенню видається сертифікат від Міжнародної спілки
                    супервізорів із зазначенням кількості годин та кредитами
                    ECTS
                  </span>
                </div>
              </div>
            </div>
            {/*Відгуки*/}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Відгуки учасників
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
                    <p className="text-gray-600 italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
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
                  <span className="font-medium">
                    {selectedSupervisionType === "individual"
                      ? "Онлайн/офлайн"
                      : "Онлайн"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <div className="space-y-3">
                <button
                  onClick={() => openModal(activeTab)}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Записатися на супервізію</span>
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
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="supervision"
        supervisionType={selectedSupervisionType}
        // price={Number(supervisionData[selectedSupervisionType].price)}
        // duration={Number(supervisionData[selectedSupervisionType].duration)}
      />
    </div>
  );
};

export default function SupervisionPage() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <SupervisionContent />
    </Suspense>
  );
}

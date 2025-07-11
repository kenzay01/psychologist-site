import { useEffect, useState } from "react";
import {
  Clock,
  MessageCircle,
  Calendar,
  CreditCard,
  User,
  Users,
  Baby,
} from "lucide-react";
import moment from "moment";
import GoogleCalendar from "./GoogleCalendar";

export default function BookingModal({
  isOpen,
  onClose,
  consultationType: initialConsultationType,
}: // price: initialPrice,
// duration: initialDuration,
{
  isOpen: boolean;
  onClose: () => void;
  consultationType?: "individual" | "couple" | "child";
  // price?: number;
  // duration?: number;
}) {
  const consultationData = {
    individual: {
      title: "Індивідуальна терапія",
      icon: <User className="w-6 h-6 flex " />,
      duration: 60,
      price: 2000,
    },
    couple: {
      title: "Сімейна та парна психотерапія",
      icon: <Users className="w-6 h-6" />,
      duration: 80,
      price: 2600,
    },
    child: {
      title: "Дитяче та підліткове консультування",
      icon: <Baby className="w-6 h-6" />,
      duration: 60,
      price: 2000,
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    socialMedia: "",
    problem: "",
    partnerName: "",
    childName: "",
    childAge: "",
  });

  const [currentStep, setCurrentStep] = useState<
    "form" | "calendar" | "confirmation"
  >("form");
  const [selectedConsultationType, setSelectedConsultationType] = useState<
    "individual" | "couple" | "child"
  >(initialConsultationType || "individual");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const price = consultationData[selectedConsultationType].price;
  const duration = consultationData[selectedConsultationType].duration;

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialConsultationType) {
      setSelectedConsultationType(initialConsultationType);
    }
  }, [isOpen, initialConsultationType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeSelect = (type: "individual" | "couple" | "child") => {
    setSelectedConsultationType(type);
    setFormData({
      name: "",
      phone: "",
      socialMedia: "",
      problem: "",
      partnerName: "",
      childName: "",
      childAge: "",
    }); // Очищаємо форму при зміні типу
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.problem) {
      alert("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    if (selectedConsultationType === "couple" && !formData.partnerName) {
      alert("Будь ласка, вкажіть ім'я другого партнера");
      return;
    }

    if (
      selectedConsultationType === "child" &&
      (!formData.childName || !formData.childAge)
    ) {
      alert("Будь ласка, заповніть всі поля для дитячого консультування");
      return;
    }

    setCurrentStep("calendar");
  };

  const handleDateSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCurrentStep("confirmation");
  };

  const handleBookingConfirmation = async () => {
    try {
      let bookingMessage = ``;
      if (selectedConsultationType === "individual") {
        bookingMessage = `
    🔔 Нове бронювання
    😊 Тип: Індивідуальне консультування
    📅 Дата: ${selectedDate}
    ⏰ Час: ${selectedTime}
    🙎‍♂️ Ім'я: ${formData.name}
    📞 Телефон: ${formData.phone}
    📫 Соц.мережі: ${formData.socialMedia || "Не вказано"}
    📝 Опис проблеми: ${formData.problem}
            `;
      } else if (selectedConsultationType === "couple") {
        bookingMessage = `
    🔔 Нове бронювання
    😊 Тип: Парне консультування
    📅 Дата: ${selectedDate}
    ⏰ Час: ${selectedTime}
    🙎‍♂️ Ім'я першого партнера: ${formData.name}
    🙎‍♂️ Ім'я другого партнера: ${formData.partnerName}
    📞 Телефон: ${formData.phone}
    📫 Соц.мережі: ${formData.socialMedia || "Не вказано"}
    📝 Опис проблеми: ${formData.problem}
            `;
      } else if (selectedConsultationType === "child") {
        bookingMessage = `
    🔔 Нове бронювання
    😊 Тип: Дитяче консультування
    📅 Дата: ${selectedDate}
    ⏰ Час: ${selectedTime}
    🙎‍♂️ Ім'я батька/матері: ${formData.name}
    🙎‍♀️ Ім'я дитини: ${formData.childName}
    👶 Вік дитини: ${formData.childAge}
    📞 Телефон: ${formData.phone}
    📫 Соц.мережі: ${formData.socialMedia || "Не вказано"}
    📝 Опис проблеми: ${formData.problem}
            `;
      }

      await fetch(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
            text: bookingMessage,
          }),
        }
      );

      const summary =
        selectedConsultationType === "individual"
          ? "Індивідуальне консультування"
          : selectedConsultationType === "couple"
          ? "Парне консультування"
          : "Дитяче консультування";

      let formattedDescription;
      if (selectedConsultationType === "individual") {
        formattedDescription = `
    Тип: ${summary}
    Ім'я: ${formData.name}
    Телефон: ${formData.phone}
    Соц.мережі: ${formData.socialMedia || "Не вказано"}
    Опис проблеми: ${formData.problem}
    `;
      } else if (selectedConsultationType === "couple") {
        formattedDescription = `
    Тип: ${summary}
    Ім'я першого партнера: ${formData.name}
    Ім'я другого партнера: ${formData.partnerName}
    Телефон: ${formData.phone}
    Соц.мережі: ${formData.socialMedia || "Не вказано"}
    Опис проблеми: ${formData.problem}
    `;
      } else if (selectedConsultationType === "child") {
        formattedDescription = `
    Тип: ${summary}
    Ім'я батька/матері: ${formData.name}
    Ім'я дитини: ${formData.childName}
    Вік дитини: ${formData.childAge}
    Телефон: ${formData.phone}
    Соц.мережі: ${formData.socialMedia || "Не вказано"}
    Опис проблеми: ${formData.problem}
    `;
      }

      await fetch("/api/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary,
          description: formattedDescription,
          start: `${selectedDate}T${selectedTime}:00`,
          end: moment(`${selectedDate}T${selectedTime}:00`)
            .add(duration, "minutes")
            .toISOString(),
        }),
      });

      alert("Бронювання успішно створено! Деталі відправлені в Telegram.");
      onClose();
      setCurrentStep("form");
      setFormData({
        name: "",
        phone: "",
        socialMedia: "",
        problem: "",
        partnerName: "",
        childName: "",
        childAge: "",
      });
    } catch (error) {
      alert("Помилка при створенні бронювання: " + error);
    }
  };

  const handlePayment = () => {
    // Логіка оплати через MonoBank
  };

  const telegramLink = "https://t.me/admin_username";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {consultationData[selectedConsultationType].title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {currentStep === "form" && (
            <div className="space-y-4">
              {/* Вкладки для вибору типу консультації */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
                {Object.entries(consultationData).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() =>
                      handleTypeSelect(key as keyof typeof consultationData)
                    }
                    className={`flex-1 flex items-center justify-center md:space-x-2 py-2 px-4 rounded-md transition-colors ${
                      selectedConsultationType === key
                        ? "bg-white text-red-500 shadow-sm border-2 border-red-500"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {data.icon}
                    <span className="text-sm hidden md:block">
                      {data.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-red-800">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Тривалість: {duration} хв | Ціна: {price} грн
                </p>
              </div>

              {selectedConsultationType === "individual" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ім`я *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </>
              )}

              {selectedConsultationType === "couple" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ім`я першого партнера *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ім`я другого партнера *
                    </label>
                    <input
                      type="text"
                      name="partnerName"
                      value={formData.partnerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </>
              )}

              {selectedConsultationType === "child" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ім`я батька/матері *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ім`я дитини *
                    </label>
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Вік дитини *
                    </label>
                    <input
                      type="number"
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      min="6"
                      max="17"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="+380..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Соціальні мережі
                </label>
                <input
                  type="text"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Instagram, Telegram тощо"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Опис проблеми *
                </label>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                >
                  Відправити заявку
                </button>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-center"
                >
                  <MessageCircle className="inline w-4 h-4 mr-2" />
                  Зв`язатися в Telegram
                </a>
              </div>
            </div>
          )}

          {currentStep === "calendar" && (
            <div>
              <GoogleCalendar
                onDateSelect={handleDateSelect}
                consultationType={selectedConsultationType}
                duration={duration}
                minimumBookingHours={4}
              />
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => setCurrentStep("form")}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Назад
                </button>
              </div>
            </div>
          )}

          {currentStep === "confirmation" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Підтвердження бронювання
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Деталі бронювання:</h4>
                <p>
                  <strong>Послуга:</strong>{" "}
                  {consultationData[selectedConsultationType].title}
                </p>
                <p>
                  <strong>Дата:</strong>{" "}
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString("uk-UA")
                    : ""}
                </p>
                <p>
                  <strong>Час:</strong> {selectedTime}
                </p>
                <p>
                  <strong>Тривалість:</strong> {duration} хв
                </p>
                <p>
                  <strong>Ціна:</strong> {price} грн
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBookingConfirmation}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Підтвердити бронювання
                </button>
                <h1 className="text-center text-gray-500 text-sm">Або</h1>
                <button
                  onClick={handlePayment}
                  className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Оплатити через MonoBank
                </button>

                <button
                  onClick={() => setCurrentStep("calendar")}
                  className="w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Назад до вибору часу
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

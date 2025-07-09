import { useEffect, useState } from "react";
import { Clock, MessageCircle, Calendar, CreditCard } from "lucide-react";
export default function BookingModal({
  isOpen,
  onClose,
  consultationType,
  price,
  duration,
}: {
  isOpen: boolean;
  onClose: () => void;
  consultationType: "individual" | "couple" | "child";
  price: number;
  duration: number;
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    socialMedia: "",
    problem: "",
    partnerName: "",
    childName: "",
    childAge: "",
  });

  const [currentStep, setCurrentStep] = useState("form"); // 'form', 'calendar', 'confirmation'
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Валідація форми
    console.log("Form Data:", formData);
    if (!formData.name || !formData.phone || !formData.problem) {
      alert("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    if (consultationType === "couple" && !formData.partnerName) {
      alert("Будь ласка, вкажіть ім'я другого партнера");
      return;
    }

    if (
      consultationType === "child" &&
      (!formData.childName || !formData.childAge || !formData.name)
    ) {
      alert("Будь ласка, заповніть всі поля для дитячого консультування");
      return;
    }

    setCurrentStep("calendar");
    // Відправка в Telegram
    // try {
    //   const message = `
    //     Нова заявка на ${
    //       consultationType === "individual"
    //         ? "індивідуальне"
    //         : consultationType === "couple"
    //         ? "парне"
    //         : "дитяче"
    //     } консультування
    //     Ім'я: ${formData.name}
    //     ${
    //       consultationType === "couple"
    //         ? `Другий партнер: ${formData.partnerName}\n`
    //         : ""
    //     }
    //     ${
    //       consultationType === "child"
    //         ? `Батько/мати: ${formData.name}\nІм'я дитини: ${formData.childName}\nВік дитини: ${formData.childAge}\n`
    //         : ""
    //     }
    //     Телефон: ${formData.phone}
    //     Соц.мережі: ${formData.socialMedia || "Не вказано"}
    //     Проблема: ${formData.problem}
    //           `;

    //   await fetch(
    //     `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
    //         text: message,
    //       }),
    //     }
    //   );

    // } catch (error) {
    //   alert("Помилка при відправці заявки. Спробуйте ще раз." + error);
    // }
  };

  const handleDateSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCurrentStep("confirmation");
  };

  const handleBookingConfirmation = async () => {
    try {
      let bookingMessage = ``;
      if (consultationType === "individual") {
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
      } else if (consultationType === "couple") {
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
      } else if (consultationType === "child") {
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

      alert("Бронювання успішно створено! Деталі відправлені в Telegram.");
      onClose();
      setCurrentStep("form");
    } catch (error) {
      alert("Помилка при створенні бронювання. Спробуйте ще раз." + error);
    }
  };

  const handlePayment = () => {
    // Інтеграція з MonoBank API
    // window.location.href = "https://pay.mono.bank/"; // Replace with actual MonoBank payment URL
  };

  const telegramLink = "https://t.me/admin_username";

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const availableDates = [
    "2025-07-10",
    "2025-07-11",
    "2025-07-12",
    "2025-07-15",
    "2025-07-16",
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      //   onClick={onClose}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {consultationType === "individual" &&
                "Індивідуальне консультування"}
              {consultationType === "couple" && "Парне консультування"}
              {consultationType === "child" && "Дитяче консультування"}
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
              <div className="bg-teal-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-teal-800">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Тривалість: {duration} хв | Ціна: {price} грн
                </p>
              </div>

              {consultationType === "individual" && (
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </>
              )}

              {consultationType === "couple" && (
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </>
              )}

              {consultationType === "child" && (
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
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
              <h3 className="text-lg font-semibold mb-4">
                Оберіть дату та час
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Доступні дати:</h4>
                  <div className="space-y-2">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`w-full p-3 text-left rounded-md border transition-colors ${
                          selectedDate === date
                            ? "border-teal-500 bg-teal-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {new Date(date).toLocaleDateString("uk-UA", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h4 className="font-medium mb-3">Доступний час:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleDateSelect(selectedDate, time)}
                          className="p-2 border border-gray-300 rounded-md hover:border-teal-500 hover:bg-teal-50 transition-colors"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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
                  {consultationType === "individual"
                    ? "Індивідуальне консультування"
                    : consultationType === "couple"
                    ? "Парне консультування"
                    : "Дитяче консультування"}
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
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center"
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

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
export default function SupervisionModal({
  isOpen,
  onClose,
  supervisionType,
  price,
  duration,
}: {
  isOpen: boolean;
  onClose: () => void;
  supervisionType: "individual" | "group";
  price: number;
  duration: number;
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    socialMedia: "",
    experience: "",
    supervisionGoals: "",
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
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
    if (!formData.name || !formData.phone || !formData.supervisionGoals) {
      alert("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    try {
      //       const message = `
      // Нова заявка на ${
      //         supervisionType === "individual" ? "індивідуальну" : "групову"
      //       } супервізію
      // Ім'я: ${formData.name}
      // Телефон: ${formData.phone}
      // Соц.мережі: ${formData.socialMedia || "Не вказано"}
      // Досвід: ${formData.experience || "Не вказано"}
      // Цілі супервізії: ${formData.supervisionGoals}
      //       `;

      //       await fetch(`https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage`, {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({
      //           chat_id: "YOUR_CHAT_ID",
      //           text: message,
      //         }),
      //       });

      alert("Заявку успішно відправлено в Telegram!");
      onClose();
    } catch (error) {
      alert("Помилка при відправці заявки. Спробуйте ще раз." + error);
    }
  };

  const telegramLink = "https://t.me/admin_username";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {supervisionType === "individual"
                ? "Індивідуальна супервізія"
                : "Групова супервізія"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-teal-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-teal-800">
                Тривалість: {duration} хв | Ціна: {price} грн
              </p>
            </div>

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
                Ваш досвід у психології/терапії
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Опишіть ваш професійний досвід"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цілі супервізії *
              </label>
              <textarea
                name="supervisionGoals"
                value={formData.supervisionGoals}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                placeholder="Які питання чи кейси хочете обговорити?"
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
        </div>
      </div>
    </div>
  );
}

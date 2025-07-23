"use client";

import { useEffect, useState } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { X } from "lucide-react";

export default function SimpleModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    socialMedia: "",
    email: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert(
        dict?.modal?.form?.requiredFieldsError ||
          "Будь ласка, заповніть усі обов’язкові поля"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // console.log("Sending message to Telegram...", formData.query);
      const message =
        (dict?.modal?.form?.newRequest || "Новий запит з форми зв’язку") +
        "\n" +
        (dict?.modal?.form?.name || "Ім’я: ").replace("{name}", formData.name) +
        "\n" +
        (dict?.modal?.form?.phone || "Телефон: ").replace(
          "{phone}",
          formData.phone
        ) +
        "\n" +
        (dict?.modal?.form?.email || "Email: ").replace(
          "{email}",
          formData.email
        ) +
        "\n" +
        (dict?.modal?.form?.socialMedia || "Соцмережа: ").replace(
          "{socialMedia}",
          formData.socialMedia ||
            dict?.modal?.form?.noSocialMedia ||
            "Не вказано"
        ) +
        "\n" +
        (dict?.modal?.form?.query || "Запит: ").replace(
          "{query}",
          formData.query || dict?.modal?.form?.noQuery || "Не вказано"
        );

      // console.log("Sending message to Telegram:", message);
      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        throw new Error("Telegram bot token is not defined");
      }
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
      if (!chatId) {
        throw new Error("Telegram chat ID is not defined");
      }
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      alert(dict?.modal?.form?.requestSuccess || "Запит успішно відправлено!");
      setFormData({
        name: "",
        phone: "",
        socialMedia: "",
        email: "",
        query: "",
      });
      onClose();
    } catch (error) {
      alert(
        (dict?.modal?.form?.requestError || "Помилка відправки запиту: ") +
          error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || loading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {dict?.modal?.form?.title || "Зв’язатися з нами"}
        </h2>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dict?.modal?.form?.nameLabel || "Ім’я"} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={
                dict?.modal?.form?.namePlaceholder || "Введіть ваше ім’я"
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dict?.modal?.form?.phoneLabel || "Телефон"} *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={
                dict?.modal?.form?.phonePlaceholder ||
                "Введіть ваш номер телефону"
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dict?.modal?.form?.emailLabel || "Email"} *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={
                dict?.modal?.form?.emailPlaceholder || "Введіть ваш email"
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dict?.modal?.form?.socialMediaLabel || "Соцмережа"}
            </label>
            <input
              type="text"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={
                dict?.modal?.form?.socialMediaPlaceholder ||
                "Введіть ваш профіль у соцмережі"
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dict?.modal?.form?.queryLabel || "Запит"}
            </label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={
                dict?.modal?.form?.queryPlaceholder ||
                "Опишіть суть вашого питання"
              }
              rows={4}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSubmitting
            ? dict?.modal?.form?.submitting || "Відправка..."
            : dict?.modal?.form?.submit || "Відправити"}
        </button>
      </div>
    </div>
  );
}

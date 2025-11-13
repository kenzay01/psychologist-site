"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

type TherapyGroupModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type TherapyGroupFormState = {
  name: string;
  phone: string;
  socialMedia: string;
  problem: string;
};

const initialState: TherapyGroupFormState = {
  name: "",
  phone: "",
  socialMedia: "",
  problem: "",
};

export default function TherapyGroupModal({
  isOpen,
  onClose,
}: TherapyGroupModalProps) {
  const locale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(locale);
  const [formState, setFormState] =
    useState<TherapyGroupFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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
  }, [isOpen]);

  const therapyDict = dict?.therapyGroupForm;
  const modalDict = dict?.modal?.form;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formState.name || !formState.phone || !formState.problem) {
      alert(
        therapyDict?.errorMessage ??
          modalDict?.requiredFieldsError ??
          "Будь ласка, заповніть всі обов’язкові поля"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

      if (!botToken || !chatId) {
        throw new Error("Telegram credentials are not configured.");
      }

      const lines = [
        therapyDict?.telegramMessage?.newRequest ??
          "🧘‍♀️ Нова заявка на терапевтичну групу",
        (therapyDict?.telegramMessage?.name ?? "🙎‍♀️ Ім'я: {name}").replace(
          "{name}",
          formState.name
        ),
        (therapyDict?.telegramMessage?.phone ?? "📞 Телефон: {phone}").replace(
          "{phone}",
          formState.phone
        ),
        (therapyDict?.telegramMessage?.socialMedia ??
          "📫 Соцмережі: {socialMedia}").replace(
          "{socialMedia}",
          formState.socialMedia ||
            modalDict?.noSocialMedia ||
            "Не вказано"
        ),
        (therapyDict?.telegramMessage?.problem ?? "📝 Опис: {problem}").replace(
          "{problem}",
          formState.problem
        ),
        `🌐 Locale: ${locale}`,
      ];

      const message = lines.join("\n");

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

      const redirectPath =
        therapyDict?.successRedirect ??
        "/thank-you/contact";

      const timestamp = Date.now();
      window.location.href = `/${locale}${redirectPath}?timestamp=${timestamp}`;

      setFormState(initialState);
      onClose();
    } catch (error) {
      alert(
        (modalDict?.requestError ?? "Помилка відправки запиту: ") + error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 transition hover:text-gray-800"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {therapyDict?.title ?? "Заявка на терапевтичну групу"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {therapyDict?.nameLabel ?? "Ім’я *"}
            </label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder={
                therapyDict?.namePlaceholder ?? "Ваше ім’я"
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {therapyDict?.phoneLabel ?? "Телефон *"}
            </label>
            <input
              type="tel"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              placeholder={
                therapyDict?.phonePlaceholder ?? "+380..."
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {therapyDict?.socialMediaLabel ?? "Соціальні мережі"}
            </label>
            <input
              type="text"
              name="socialMedia"
              value={formState.socialMedia}
              onChange={handleChange}
              placeholder={
                therapyDict?.socialMediaPlaceholder ??
                "Instagram, Telegram тощо"
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {therapyDict?.problemLabel ?? "Опис проблеми *"}
            </label>
            <textarea
              name="problem"
              rows={4}
              value={formState.problem}
              onChange={handleChange}
              placeholder={
                therapyDict?.problemPlaceholder ??
                "Опишіть, з чим хочете працювати у групі"
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex-1 bg-red-500 text-white py-3 px-4 rounded-md transition-colors ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-red-600"
            }`}
          >
            {isSubmitting
              ? therapyDict?.submitting ?? "Відправка..."
              : therapyDict?.submitButton ?? "Відправити заявку"}
          </button>
          <a
            href={therapyDict?.telegramLink ?? "https://t.me/aleksandra_psychologist"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors text-center"
          >
            {therapyDict?.telegramButton ?? "Зв’язатися в Telegram"}
          </a>
        </div>
      </div>
    </div>
  );
}


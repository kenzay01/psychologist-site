"use client";

import { MessageCircle, Clock } from "lucide-react";
import { JSX } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

interface SupervisionFormProps {
  supervisionData: {
    individual: {
      title: string | undefined;
      icon: JSX.Element;
      duration: number;
      price: number;
    };
    group: {
      title: string | undefined;
      icon: JSX.Element;
      duration: number;
      price: number;
    };
  };
  selectedSupervisionType: "individual" | "group";
  onSupervisionTypeSelect: (type: "individual" | "group") => void;
  formData: {
    name: string;
    phone: string;
    socialMedia: string;
    experience: string;
    supervisionGoals: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  duration: number;
  price: number;
  onSubmit: () => void;
  telegramLink: string;
}

export default function SupervisionForm({
  supervisionData,
  selectedSupervisionType,
  onSupervisionTypeSelect,
  formData,
  onInputChange,
  duration,
  price,
  onSubmit,
  telegramLink,
}: SupervisionFormProps) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  if (loading) return null;

  return (
    <div className="space-y-4">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
        {Object.entries(supervisionData).map(([key, data]) => (
          <button
            key={key}
            onClick={() =>
              onSupervisionTypeSelect(key as keyof typeof supervisionData)
            }
            className={`flex-1 flex items-center justify-center md:space-x-2 py-2 px-4 rounded-md transition-colors ${
              selectedSupervisionType === key
                ? "bg-white text-red-500 shadow-sm border-2 border-red-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {data.icon}
            <span className="text-sm hidden md:block">{data.title}</span>
          </button>
        ))}
      </div>

      <div className="bg-red-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-red-800">
          <Clock className="inline w-4 h-4 mr-1" />
          {dict?.supervisionForm.durationPrice
            .replace("{duration}", duration.toString())
            .replace("{price}", price.toString())}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {dict?.supervisionForm.nameLabel}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {dict?.supervisionForm.phoneLabel}
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={"+380..."}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {dict?.supervisionForm.socialMediaLabel}
        </label>
        <input
          type="text"
          name="socialMedia"
          value={formData.socialMedia}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={dict?.supervisionForm.socialMediaPlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {dict?.supervisionForm.experienceLabel}
        </label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={onInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={dict?.supervisionForm.experiencePlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {dict?.supervisionForm.supervisionGoalsLabel}
        </label>
        <textarea
          name="supervisionGoals"
          value={formData.supervisionGoals}
          onChange={onInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
          placeholder={dict?.supervisionForm.supervisionGoalsPlaceholder}
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          onClick={onSubmit}
          className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          {dict?.supervisionForm.submitButton}
        </button>
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-center"
        >
          <MessageCircle className="inline w-4 h-4 mr-2" />
          {dict?.supervisionForm.telegramButton}
        </a>
      </div>
    </div>
  );
}

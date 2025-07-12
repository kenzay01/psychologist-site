"use client";

import { MessageCircle, Clock } from "lucide-react";
import { JSX } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

interface ConsultationFormProps {
  consultationData: {
    individual: {
      title: string | undefined;
      icon: JSX.Element;
      duration: number;
      price: number;
    };
    couple: {
      title: string | undefined;
      icon: JSX.Element;
      duration: number;
      price: number;
    };
    child: {
      title: string | undefined;
      icon: JSX.Element;
      duration: number;
      price: number;
    };
  };
  selectedConsultationType: "individual" | "couple" | "child";
  onConsultationTypeSelect: (type: "individual" | "couple" | "child") => void;
  formData: {
    name: string;
    phone: string;
    socialMedia: string;
    problem: string;
    partnerName: string;
    childName: string;
    childAge: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  duration: number;
  price: number;
  onSubmit: () => void;
  telegramLink: string;
}

export default function ConsultationForm({
  consultationData,
  selectedConsultationType,
  onConsultationTypeSelect,
  formData,
  onInputChange,
  duration,
  price,
  onSubmit,
  telegramLink,
}: ConsultationFormProps) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  //   if (loading) return null;

  return (
    <div className="space-y-4">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
        {Object.entries(consultationData).map(([key, data]) => (
          <button
            key={key}
            onClick={() =>
              onConsultationTypeSelect(key as keyof typeof consultationData)
            }
            className={`flex-1 flex items-center justify-center md:space-x-2 py-2 px-4 rounded-md transition-colors ${
              selectedConsultationType === key
                ? "bg-white text-red-500 shadow-sm border-2 border-red-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <div className="md:flex-1">{data.icon}</div>
            <span className="text-sm hidden md:block">{data.title}</span>
          </button>
        ))}
      </div>

      <div className="bg-red-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-red-800">
          <Clock className="inline w-4 h-4 mr-1" />
          {dict?.consultationForm.durationPrice
            .replace("{duration}", duration.toString())
            .replace("{price}", price.toString())}
        </p>
      </div>

      {selectedConsultationType === "individual" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {dict?.consultationForm.nameLabel}
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
      )}

      {selectedConsultationType === "couple" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dict?.consultationForm.firstPartnerNameLabel}
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
              {dict?.consultationForm.secondPartnerNameLabel}
            </label>
            <input
              type="text"
              name="partnerName"
              value={formData.partnerName}
              onChange={onInputChange}
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
              {dict?.consultationForm.parentNameLabel}
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
              {dict?.consultationForm.childNameLabel}
            </label>
            <input
              type="text"
              name="childName"
              value={formData.childName}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dict?.consultationForm.childAgeLabel}
            </label>
            <input
              type="number"
              name="childAge"
              value={formData.childAge}
              onChange={onInputChange}
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
          {dict?.consultationForm.phoneLabel}
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={dict?.consultationForm.phonePlaceholder}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {dict?.consultationForm.socialMediaLabel}
        </label>
        <input
          type="text"
          name="socialMedia"
          value={formData.socialMedia}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={dict?.consultationForm.socialMediaPlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {dict?.consultationForm.problemLabel}
        </label>
        <textarea
          name="problem"
          value={formData.problem}
          onChange={onInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          onClick={onSubmit}
          className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          {dict?.consultationForm.submitButton}
        </button>
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-center"
        >
          <MessageCircle className="inline w-4 h-4 mr-2" />
          {dict?.consultationForm.telegramButton}
        </a>
      </div>
    </div>
  );
}

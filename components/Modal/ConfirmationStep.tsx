"use client";

import { Calendar, CreditCard } from "lucide-react";
import { JSX } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

interface ConfirmationStepProps {
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
  selectedDate: string | null;
  selectedTime: string | null;
  duration: number;
  price: number;
  onConfirm: () => void;
  onPayment: () => void;
  onBack: () => void;
}

export default function ConfirmationStep({
  consultationData,
  selectedConsultationType,
  selectedDate,
  selectedTime,
  duration,
  price,
  onConfirm,
  onPayment,
  onBack,
}: ConfirmationStepProps) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  if (loading) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        {dict?.confirmationStep.title}
      </h3>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium mb-2">
          {dict?.confirmationStep.detailsTitle}
        </h4>
        <p>
          <strong>{dict?.confirmationStep.service}:</strong>{" "}
          {consultationData[selectedConsultationType].title}
        </p>
        <p>
          <strong>{dict?.confirmationStep.date}:</strong>{" "}
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString(currentLocale)
            : ""}
        </p>
        <p>
          <strong>{dict?.confirmationStep.time}:</strong> {selectedTime}
        </p>
        <p>
          <strong>{dict?.confirmationStep.duration}:</strong> {duration}{" "}
          {dict?.confirmationStep.minutes}
        </p>
        <p>
          <strong>{dict?.confirmationStep.price}:</strong> {price}{" "}
          {dict?.confirmationStep.currency}
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onConfirm}
          className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
        >
          <Calendar className="w-5 h-5 mr-2" />
          {dict?.confirmationStep.confirmButton}
        </button>
        <h1 className="text-center text-gray-500 text-sm">
          {dict?.confirmationStep.or}
        </h1>
        <button
          onClick={onPayment}
          className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          {dict?.confirmationStep.payButton}
        </button>

        <button
          onClick={onBack}
          className="w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
        >
          {dict?.confirmationStep.backButton}
        </button>
      </div>
    </div>
  );
}

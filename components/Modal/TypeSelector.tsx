"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

interface TypeSelectorProps {
  selectedType: "consultation" | "supervision";
  onTypeSelect: (type: "consultation" | "supervision") => void;
}

export default function TypeSelector({
  selectedType,
  onTypeSelect,
}: TypeSelectorProps) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  //   if (loading) return null;

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
      <button
        onClick={() => onTypeSelect("consultation")}
        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
          selectedType === "consultation"
            ? "bg-white text-red-500 shadow-sm border-2 border-red-500"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        {dict?.typeSelector.consultation}
      </button>
      <button
        onClick={() => onTypeSelect("supervision")}
        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
          selectedType === "supervision"
            ? "bg-white text-red-500 shadow-sm border-2 border-red-500"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        {dict?.typeSelector.supervision}
      </button>
    </div>
  );
}

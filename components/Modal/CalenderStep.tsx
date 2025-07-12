"use client";

import GoogleCalendar from "../GoogleCalendar";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

interface CalendarStepProps {
  consultationType: "individual" | "couple" | "child";
  duration: number;
  onDateSelect: (date: string, time: string) => void;
  onBack: () => void;
}

export default function CalendarStep({
  consultationType,
  duration,
  onDateSelect,
  onBack,
}: CalendarStepProps) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  //   if (loading) return null;

  return (
    <div>
      <GoogleCalendar
        onDateSelect={onDateSelect}
        consultationType={consultationType}
        duration={duration}
        minimumBookingHours={4}
      />
      <div className="flex space-x-3 pt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          {dict?.calendarStep.back}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Clock } from "lucide-react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import {
  formatDmY,
  formatYmd,
  isSameDay,
  parseLocalDateTime,
  startOfDay,
} from "@/lib/date";

interface Props {
  onDateSelect: (date: string, time: string) => void;
  consultationType: "individual" | "couple" | "child";
  duration: number;
  minimumBookingHours?: number;
}

const GoogleCalendar = ({
  onDateSelect,
  consultationType,
  duration,
  minimumBookingHours = 5,
}: Props) => {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<
    {
      title: string;
      start: Date;
      end: Date;
      type: "individual" | "couple" | "child";
    }[]
  >([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!calendarId || !apiKey) return;
      try {
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${new Date().toISOString()}&timeMax=${new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString()}`
        );
        const data = await res.json();

        const fetched = data.items.map(
          (item: {
            summary: string;
            start: { dateTime: string };
            end: { dateTime: string };
            description?: string;
          }) => ({
            title: item.summary,
            start: new Date(item.start.dateTime),
            end: new Date(item.end.dateTime),
            type: item.description?.includes("individual")
              ? "individual"
              : item.description?.includes("couple")
                ? "couple"
                : "child",
          })
        );

        setEvents(fetched);
      } catch (err) {
        console.error("Google API error:", err);
      }
    };
    fetchEvents();
  }, [consultationType, calendarId, apiKey]);

  const workingHours = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const generateAvailableTimes = (date: Date, slotDuration: number) => {
    const now = new Date();
    const selected = startOfDay(date);
    const ymd = formatYmd(date);

    const bookedIntervals = events
      .filter((e) => isSameDay(e.start, selected))
      .map((e) => ({ start: e.start, end: e.end }));

    const free = workingHours.filter((timeStr) => {
      const slotStart = parseLocalDateTime(ymd, timeStr);
      const slotEnd = new Date(slotStart.getTime() + slotDuration * 60_000);

      const overlaps = bookedIntervals.some(
        ({ start, end }) => slotStart < end && slotEnd > start
      );

      if (isSameDay(date, now)) {
        const minimumBookingTime = new Date(
          now.getTime() + minimumBookingHours * 60 * 60_000
        );
        return !overlaps && slotStart > minimumBookingTime;
      }

      return !overlaps;
    });

    setAvailableTimes(free);
  };

  const getMinDate = () => {
    const now = new Date();
    const minBookingTime = new Date(
      now.getTime() + minimumBookingHours * 60 * 60_000
    );
    const lastWorkingHour = parseLocalDateTime(formatYmd(now), "17:00");

    if (minBookingTime > lastWorkingHour) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return startOfDay(tomorrow);
    }
    return startOfDay(now);
  };

  const handleDateChange = (
    value: Date | [Date | null, Date | null] | null
  ) => {
    let selected: Date | null = null;

    if (value instanceof Date) {
      selected = value;
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      selected = value[0];
    }

    if (selected) {
      setSelectedDate(selected);
      generateAvailableTimes(selected, duration);
    } else {
      setSelectedDate(null);
      setAvailableTimes([]);
    }
  };

  const handleSelectTime = (time: string) => {
    if (selectedDate) {
      onDateSelect(formatYmd(selectedDate), time);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border-2 border-red-500">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
        <Clock className="w-5 h-5 text-red-500" />
        <span>{dict?.calendar.selectDateTime}</span>
      </h3>
      <div className="w-full flex justify-center">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={getMinDate()}
          locale={currentLocale}
          className="border-none rounded-lg shadow-sm bg-gray-50 text-gray-800"
        />
      </div>

      {selectedDate && (
        <div>
          <h4 className="font-medium text-gray-800 mt-4 mb-2">
            {dict?.calendar.availableTimeOn} {formatDmY(selectedDate)}:
          </h4>
          {availableTimes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleSelectTime(time)}
                  className="p-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100 hover:text-red-600 font-medium transition-colors border border-red-500"
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              {dict?.calendar.noAvailableTime}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleCalendar;

import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

// Declare gapi on the Window interface for TypeScript
declare global {
  interface Window {
    gapi: any;
  }
}

// Типи для Google Calendar API
interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  status: string;
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface GoogleCalendarBookingProps {
  duration: number; // тривалість в хвилинах
  onBookingConfirm: (date: string, time: string) => void;
  onError: (error: string) => void;
  workingHours?: {
    start: string;
    end: string;
  };
  excludeWeekends?: boolean;
}

export default function GoogleCalendarBooking({
  duration,
  onBookingConfirm,
  onError,
  workingHours = { start: "09:00", end: "18:00" },
  excludeWeekends = true,
}: GoogleCalendarBookingProps) {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  // Конфігурація Google Calendar API
  const GOOGLE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    discoveryDoc:
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    scopes: "https://www.googleapis.com/auth/calendar",
  };

  // Завантаження Google API
  useEffect(() => {
    const initializeGoogleApi = async () => {
      try {
        // Завантажуємо Google API скрипт
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://apis.google.com/js/api.js";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });

        // Завантажуємо Google Identity Services
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://accounts.google.com/gsi/client";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });

        // Ініціалізуємо Google API
        await window.gapi.load("client:auth2", async () => {
          await window.gapi.client.init({
            apiKey: GOOGLE_CONFIG.apiKey,
            clientId: GOOGLE_CONFIG.clientId,
            discoveryDocs: [GOOGLE_CONFIG.discoveryDoc],
            scope: GOOGLE_CONFIG.scopes,
          });

          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          setIsGoogleLoaded(true);

          // Слухаємо зміни статусу авторизації
          authInstance.isSignedIn.listen(setIsSignedIn);
        });
      } catch (error) {
        onError("Помилка завантаження Google API");
        console.error("Google API initialization error:", error);
      }
    };

    initializeGoogleApi();
  }, [onError]);

  // Авторизація в Google
  const handleSignIn = async () => {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signIn();
    } catch (error) {
      onError("Помилка авторизації в Google");
      console.error("Google sign-in error:", error);
    }
  };

  // Генерація часових слотів
  const generateTimeSlots = (date: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startTime = parseInt(workingHours.start.split(":")[0]);
    const endTime = parseInt(workingHours.end.split(":")[0]);

    for (let hour = startTime; hour < endTime; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;
      const startDateTime = new Date(`${date}T${timeString}`);
      const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

      slots.push({
        start: timeString,
        end: endDateTime.toTimeString().substring(0, 5),
        available: true,
      });
    }

    return slots;
  };

  // Перевірка доступності часових слотів
  const checkSlotAvailability = (
    slots: TimeSlot[],
    events: CalendarEvent[]
  ): TimeSlot[] => {
    return slots.map((slot) => {
      const slotStart = new Date(`${selectedDate}T${slot.start}`);
      const slotEnd = new Date(`${selectedDate}T${slot.end}`);

      const isAvailable = !events.some((event) => {
        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);

        return slotStart < eventEnd && slotEnd > eventStart;
      });

      return { ...slot, available: isAvailable };
    });
  };

  // Отримання подій з календаря
  const fetchCalendarEvents = async (date: string) => {
    try {
      setLoading(true);

      const startOfDay = new Date(`${date}T00:00:00`);
      const endOfDay = new Date(`${date}T23:59:59`);

      const response = await window.gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      });

      const events = response.result.items || [];
      setCalendarEvents(events);

      // Генеруємо слоти та перевіряємо доступність
      const slots = generateTimeSlots(date);
      const availableSlots = checkSlotAvailability(slots, events);
      setAvailableSlots(availableSlots);
    } catch (error) {
      onError("Помилка завантаження календаря");
      console.error("Calendar fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Створення події в календарі
  const createCalendarEvent = async (slot: TimeSlot) => {
    try {
      setLoading(true);

      const startDateTime = new Date(`${selectedDate}T${slot.start}`);
      const endDateTime = new Date(`${selectedDate}T${slot.end}`);

      const event = {
        summary: "Психологічна консультація",
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: "Europe/Kiev",
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: "Europe/Kiev",
        },
        description: "Бронювання через веб-сайт",
      };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      if (response.status === 200) {
        onBookingConfirm(selectedDate, slot.start);
      }
    } catch (error) {
      onError("Помилка створення події в календарі");
      console.error("Event creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Обробка вибору дати
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (isSignedIn) {
      fetchCalendarEvents(date);
    }
  };

  // Генерація доступних дат (наступні 30 днів)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Пропускаємо вихідні, якщо потрібно
      if (excludeWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
        continue;
      }

      dates.push(date.toISOString().split("T")[0]);
    }

    return dates;
  };

  if (!isGoogleLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження Google Calendar...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="text-center p-6">
        <Calendar className="w-16 h-16 text-teal-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          Підключення до Google Calendar
        </h3>
        <p className="text-gray-600 mb-4">
          Для бронювання потрібно підключитися до вашого Google Calendar
        </p>
        <button
          onClick={handleSignIn}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
        >
          Підключити Google Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Оберіть дату та час</h3>
        <p className="text-sm text-gray-600">Тривалість: {duration} хвилин</p>
      </div>

      {/* Вибір дати */}
      <div>
        <h4 className="font-medium mb-3">Доступні дати:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
          {getAvailableDates().map((date) => (
            <button
              key={date}
              onClick={() => handleDateSelect(date)}
              className={`p-2 text-sm rounded-md border transition-colors ${
                selectedDate === date
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {new Date(date).toLocaleDateString("uk-UA", {
                month: "short",
                day: "numeric",
                weekday: "short",
              })}
            </button>
          ))}
        </div>
      </div>

      {/* Вибір часу */}
      {selectedDate && (
        <div>
          <h4 className="font-medium mb-3">
            Доступний час на{" "}
            {new Date(selectedDate).toLocaleDateString("uk-UA")}:
          </h4>

          {loading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
              <span className="ml-2 text-gray-600">Завантаження...</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot.start}
                  onClick={() => setSelectedSlot(slot)}
                  disabled={!slot.available}
                  className={`p-2 text-sm rounded-md border transition-colors ${
                    !slot.available
                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : selectedSlot?.start === slot.start
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Clock className="w-3 h-3 inline mr-1" />
                  {slot.start}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Підтвердження бронювання */}
      {selectedSlot && (
        <div className="bg-teal-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
            <h4 className="font-medium">Підтвердження бронювання</h4>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Дата:{" "}
            {new Date(selectedDate).toLocaleDateString("uk-UA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <br />
            Час: {selectedSlot.start} - {selectedSlot.end}
          </p>
          <button
            onClick={() => createCalendarEvent(selectedSlot)}
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Створення події...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Забронювати час
              </>
            )}
          </button>
        </div>
      )}

      {/* Інформація про існуючі події */}
      {calendarEvents.length > 0 && (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <h4 className="font-medium text-yellow-800">Заброньований час</h4>
          </div>
          <div className="space-y-1">
            {calendarEvents.map((event) => (
              <p key={event.id} className="text-sm text-yellow-700">
                {new Date(event.start.dateTime).toLocaleTimeString("uk-UA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                - {event.summary}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

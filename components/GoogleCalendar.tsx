import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";

interface Props {
  onDateSelect: (date: string, time: string) => void;
  consultationType: "individual" | "couple" | "child";
  duration: number; // тривалість консультації в хвилинах
  minimumBookingHours?: number; // мінімальна кількість годин від поточного часу для бронювання
}

const GoogleCalendar = ({
  onDateSelect,
  consultationType,
  duration,
  minimumBookingHours = 5, // За замовчуванням 5 годин
}: Props) => {
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

  // Отримання подій з Google Calendar
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

  // Генерація доступного часу з урахуванням обмеження
  const generateAvailableTimes = (date: Date, duration: number) => {
    const now = moment();
    const selected = moment(date).startOf("day");

    // Відфільтровуємо події для вибраного дня
    const bookedIntervals = events
      .filter((e) => {
        const eventDate = moment(e.start);
        return eventDate.isSame(selected, "day");
      })
      .map((e) => ({
        start: moment(e.start),
        end: moment(e.end),
      }));

    const free = workingHours.filter((timeStr) => {
      const slotStart = moment(
        `${moment(date).format("YYYY-MM-DD")}T${timeStr}`
      );
      const slotEnd = slotStart.clone().add(duration, "minutes");

      // Перевірка, чи слот перетинається з заброньованими подіями
      const overlaps = bookedIntervals.some(
        ({ start, end }) => slotStart.isBefore(end) && slotEnd.isAfter(start)
      );

      // Перевірка обмеження для сьогоднішнього дня
      const isToday = moment(date).isSame(now, "day");
      if (isToday) {
        const minimumBookingTime = now
          .clone()
          .add(minimumBookingHours, "hours");
        return !overlaps && slotStart.isAfter(minimumBookingTime);
      }

      return !overlaps;
    });

    setAvailableTimes(free);
  };

  // Обмеження мінімальної дати
  const getMinDate = () => {
    const now = moment();
    const minBookingTime = now.clone().add(minimumBookingHours, "hours");
    const lastWorkingHour = moment(`${now.format("YYYY-MM-DD")}T17:00`);

    // Якщо після додавання minimumBookingHours виходить час після 17:00, мінімальна дата - завтра
    if (minBookingTime.isAfter(lastWorkingHour)) {
      return moment().add(1, "day").toDate();
    }
    return new Date();
  };

  const handleDateChange = (
    value: Date | [Date | null, Date | null] | null
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      onDateSelect(formattedDate, time);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Оберіть дату:</h3>
      <div className="w-full flex justify-center">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={getMinDate()}
          maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
          locale="uk-UA"
        />
      </div>

      {selectedDate && (
        <div>
          <h4 className="font-medium mt-4 mb-2">
            Доступний час на {moment(selectedDate).format("DD.MM.YYYY")}:
          </h4>
          {availableTimes.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleSelectTime(time)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-red-50 hover:border-red-500"
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Немає вільного часу на цю дату</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleCalendar;

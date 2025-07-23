"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import moment from "moment";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

interface PaymentData {
  formData: {
    name: string;
    phone: string;
    socialMedia: string;
    problem: string;
    partnerName: string;
    childName: string;
    childAge: string;
    experience: string;
    supervisionGoals: string;
  };
  selectedType: "consultation" | "supervision";
  selectedConsultationType: "individual" | "couple" | "child";
  selectedSupervisionType: "individual" | "group";
  selectedDate: string;
  selectedTime: string;
  price: number;
  duration: number;
  timestamp: number;
  invoiceId?: string;
}

type PaymentStatus =
  | "success"
  | "failure"
  | "processing"
  | "hold"
  | "created"
  | "reversed"
  | "expired";

export default function PaymentStatusPage() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("processing");
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  // Перевірка статусу платежу
  useEffect(() => {
    const storedData = localStorage.getItem("paymentData");
    console.log("Stored data from localStorage:", storedData); // Логування
    if (storedData) {
      const parsedData: PaymentData = JSON.parse(storedData);
      console.log("Parsed payment data:", parsedData); // Логування
      setPaymentData(parsedData);

      const now = Date.now();
      const hoursPassed = (now - parsedData.timestamp) / (1000 * 60 * 60);
      console.log("Hours passed since booking:", hoursPassed); // Логування
      if (hoursPassed > 24) {
        localStorage.removeItem("paymentData");
        setError(
          dict?.paymentStatus?.errors?.expiredBooking ||
            "Дані бронювання застаріли. Будь ласка, створіть нове бронювання."
        );
        setLoading(false);
        return;
      }

      const checkPaymentStatus = async () => {
        const invoiceId = parsedData.invoiceId;
        console.log("Checking payment status for invoiceId:", invoiceId); // Логування
        if (invoiceId) {
          try {
            console.log("Fetching payment status from /api/payment-status"); // Логування
            const response = await fetch(
              `/api/payment-status?invoiceId=${invoiceId}`
            );
            const result = await response.json();
            console.log("Payment status response:", result); // Логування
            if (result.success) {
              setPaymentStatus(result.status);
            } else {
              setError(
                `${
                  dict?.paymentStatus?.errors?.checkStatusFailed ||
                  "Не вдалося перевірити статус платежу"
                }: ${result.error}`
              );
              console.error("Payment status error:", result.error); // Логування
            }
          } catch (error) {
            console.error("Error checking payment status:", error);
            setError(
              dict?.paymentStatus?.errors?.checkStatusError ||
                "Помилка при перевірці статусу платежу"
            );
          }
        } else {
          setError(
            dict?.paymentStatus?.errors?.missingInvoiceId ||
              "Відсутній invoiceId для перевірки статусу платежу"
          );
          console.error("No invoiceId provided"); // Логування
        }
        setLoading(false);
      };

      checkPaymentStatus();
    } else {
      setError(
        dict?.paymentStatus?.errors?.noBookingData ||
          "Дані бронювання не знайдено"
      );
      console.error("No payment data in localStorage"); // Логування
      setLoading(false);
    }
  }, [dict]);

  // Обробка успішного платежу з затримкою
  useEffect(() => {
    if (paymentStatus === "success" && paymentData) {
      console.log(
        "Payment status is success, scheduling handleSuccessfulPayment"
      ); // Логування
      const timer = setTimeout(async () => {
        console.log("Executing handleSuccessfulPayment after delay"); // Логування
        await handleSuccessfulPayment();
      }, 2000); // Затримка 2 секунди

      return () => clearTimeout(timer); // Очищення таймера при демонтажі
    }
  }, [paymentStatus, paymentData]);

  const handleSuccessfulPayment = async () => {
    if (!paymentData) {
      console.error("No payment data available in handleSuccessfulPayment"); // Логування
      return;
    }

    try {
      console.log("Starting handleSuccessfulPayment"); // Логування
      console.log("Sending Telegram message..."); // Логування
      await sendTelegramMessage(true);

      console.log("Creating calendar event..."); // Логування
      await createCalendarEvent(true);

      console.log("Clearing localStorage"); // Логування
      localStorage.removeItem("paymentData");
    } catch (error) {
      console.error("Error processing successful payment:", error); // Логування
      setError(
        dict?.paymentStatus?.errors?.processPaymentError ||
          "Помилка при обробці успішного платежу"
      );
    }
  };

  const handleConfirmWithoutPayment = async () => {
    if (!paymentData) {
      console.error("No payment data available in handleConfirmWithoutPayment"); // Логування
      return;
    }

    try {
      console.log("Starting handleConfirmWithoutPayment"); // Логування
      console.log("Sending Telegram message (without payment)..."); // Логування
      await sendTelegramMessage(false);

      console.log("Creating calendar event (without payment)..."); // Логування
      await createCalendarEvent(false);

      console.log("Clearing localStorage and redirecting"); // Логування
      localStorage.removeItem("paymentData");
      alert(
        dict?.paymentStatus?.messages?.confirmWithoutPayment ||
          "Бронювання підтверджено без оплати"
      );
      router.push("/");
    } catch (error) {
      console.error("Error confirming without payment:", error); // Логування
      setError(
        dict?.paymentStatus?.errors?.confirmWithoutPaymentError ||
          "Помилка при підтвердженні без оплати"
      );
    }
  };

  const sendTelegramMessage = async (isPaid: boolean) => {
    if (!paymentData) {
      console.error("No payment data for Telegram message"); // Логування
      return;
    }

    console.log("Checking Telegram environment variables"); // Логування
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.error("NEXT_PUBLIC_TELEGRAM_BOT_TOKEN is not defined");
      throw new Error("Telegram bot token is not configured");
    }

    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    if (!chatId) {
      console.error("NEXT_PUBLIC_TELEGRAM_CHAT_ID is not defined");
      throw new Error("Telegram chat ID is not configured");
    }

    const consultationTypes = dict?.paymentStatus?.consultationTypes || {
      individual: "Індивідуальна консультація",
      couple: "Парна консультація",
      child: "Дитяча консультація",
    };
    const supervisionTypes = dict?.paymentStatus?.supervisionTypes || {
      individual: "Індивідуальна супервізія",
      group: "Групова супервізія",
    };
    const statusText = isPaid
      ? dict?.paymentStatus?.labels?.paid || "ОПЛАЧЕНО"
      : dict?.paymentStatus?.labels?.notPaid || "БЕЗ ОПЛАТИ";
    const emoji = isPaid ? "🎯" : "⚠️";

    let message = "";
    if (paymentData.selectedType === "consultation") {
      message = `${emoji} ${
        dict?.paymentStatus?.messages?.newBooking || "Нове бронювання"
      } (${statusText})
📝 ${dict?.paymentStatus?.labels?.type || "Тип"}: ${
        consultationTypes[paymentData.selectedConsultationType] ||
        paymentData.selectedConsultationType
      }
📅 ${dict?.paymentStatus?.labels?.date || "Дата"}: ${paymentData.selectedDate}
⏰ ${dict?.paymentStatus?.labels?.time || "Час"}: ${paymentData.selectedTime}
👤 ${dict?.paymentStatus?.labels?.name || "Ім'я"}: ${paymentData.formData.name}
📞 ${dict?.paymentStatus?.labels?.phone || "Телефон"}: ${
        paymentData.formData.phone
      }
📱 ${dict?.paymentStatus?.labels?.socialMedia || "Соціальні мережі"}: ${
        paymentData.formData.socialMedia ||
        dict?.paymentStatus?.labels?.notSpecified ||
        "Не вказано"
      }
💰 ${dict?.paymentStatus?.labels?.amount || "Сума"}: ${paymentData.price} ${
        dict?.paymentStatus?.labels?.currency || "грн"
      }${
        isPaid
          ? ""
          : ` (${dict?.paymentStatus?.labels?.notPaid || "БЕЗ ОПЛАТИ"})`
      }
${
  paymentData.selectedConsultationType === "couple"
    ? `👫 ${dict?.paymentStatus?.labels?.partnerName || "Ім'я партнера"}: ${
        paymentData.formData.partnerName
      }`
    : ""
}
${
  paymentData.selectedConsultationType === "child"
    ? `👶 ${dict?.paymentStatus?.labels?.childName || "Ім'я дитини"}: ${
        paymentData.formData.childName
      }\n🎂 ${dict?.paymentStatus?.labels?.childAge || "Вік дитини"}: ${
        paymentData.formData.childAge
      }`
    : ""
}
📋 ${dict?.paymentStatus?.labels?.problem || "Проблема"}: ${
        paymentData.formData.problem
      }`;
    } else {
      message = `${emoji} ${
        dict?.paymentStatus?.messages?.newBooking || "Нове бронювання"
      } (${statusText})
📝 ${dict?.paymentStatus?.labels?.type || "Тип"}: ${
        supervisionTypes[paymentData.selectedSupervisionType] ||
        paymentData.selectedSupervisionType
      }
📅 ${dict?.paymentStatus?.labels?.date || "Дата"}: ${paymentData.selectedDate}
⏰ ${dict?.paymentStatus?.labels?.time || "Час"}: ${paymentData.selectedTime}
👤 ${dict?.paymentStatus?.labels?.name || "Ім'я"}: ${paymentData.formData.name}
📞 ${dict?.paymentStatus?.labels?.phone || "Телефон"}: ${
        paymentData.formData.phone
      }
📱 ${dict?.paymentStatus?.labels?.socialMedia || "Соціальні мережі"}: ${
        paymentData.formData.socialMedia ||
        dict?.paymentStatus?.labels?.notSpecified ||
        "Не вказано"
      }
💰 ${dict?.paymentStatus?.labels?.amount || "Сума"}: ${paymentData.price} ${
        dict?.paymentStatus?.labels?.currency || "грн"
      }${
        isPaid
          ? ""
          : ` (${dict?.paymentStatus?.labels?.notPaid || "БЕЗ ОПЛАТИ"})`
      }
📋 ${dict?.paymentStatus?.labels?.experience || "Досвід"}: ${
        paymentData.formData.experience ||
        dict?.paymentStatus?.labels?.notSpecified ||
        "Не вказано"
      }
📋 ${dict?.paymentStatus?.labels?.supervisionGoals || "Цілі супервізії"}: ${
        paymentData.formData.supervisionGoals ||
        dict?.paymentStatus?.labels?.notSpecified ||
        "Не вказано"
      }`;
    }

    console.log("Sending Telegram message:", message); // Логування
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Telegram API error:", errorData); // Логування
        throw new Error(`Telegram API error: ${errorData.description}`);
      }
      console.log("Telegram message sent successfully"); // Логування
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const createCalendarEvent = async (isPaid: boolean) => {
    if (!paymentData) {
      console.error("No payment data for calendar event"); // Логування
      return;
    }

    const consultationTypes = dict?.paymentStatus?.consultationTypes || {
      individual: "Індивідуальна консультація",
      couple: "Парна консультація",
      child: "Дитяча консультація",
    };
    const supervisionTypes = dict?.paymentStatus?.supervisionTypes || {
      individual: "Індивідуальна супервізія",
      group: "Групова супервізія",
    };
    const statusText = isPaid
      ? dict?.paymentStatus?.labels?.paid || "ОПЛАЧЕНО"
      : dict?.paymentStatus?.labels?.notPaid || "БЕЗ ОПЛАТИ";

    let description = "";
    const summary =
      paymentData.selectedType === "consultation"
        ? consultationTypes[paymentData.selectedConsultationType] ||
          paymentData.selectedConsultationType
        : supervisionTypes[paymentData.selectedSupervisionType] ||
          paymentData.selectedSupervisionType;

    if (paymentData.selectedType === "consultation") {
      description = `${dict?.paymentStatus?.labels?.type || "Тип"}: ${summary}
${dict?.paymentStatus?.labels?.client || "Клієнт"}: ${paymentData.formData.name}
${dict?.paymentStatus?.labels?.phone || "Телефон"}: ${
        paymentData.formData.phone
      }
${dict?.paymentStatus?.labels?.socialMedia || "Соціальні мережі"}: ${
        paymentData.formData.socialMedia ||
        dict?.paymentStatus?.labels?.notSpecified ||
        "Не вказано"
      }
${
  paymentData.selectedConsultationType === "couple"
    ? `${dict?.paymentStatus?.labels?.partnerName || "Ім'я партнера"}: ${
        paymentData.formData.partnerName
      }`
    : ""
}
${
  paymentData.selectedConsultationType === "child"
    ? `${dict?.paymentStatus?.labels?.childName || "Ім'я дитини"}: ${
        paymentData.formData.childName
      }, ${dict?.paymentStatus?.labels?.childAge || "Вік дитини"}: ${
        paymentData.formData.childAge
      }`
    : ""
}
${dict?.paymentStatus?.labels?.problem || "Проблема"}: ${
        paymentData.formData.problem
      }
${dict?.paymentStatus?.labels?.status || "Статус"}: ${statusText}`;
    } else {
      description = `${dict?.paymentStatus?.labels?.type || "Тип"}: ${summary}
${dict?.paymentStatus?.labels?.client || "Клієнт"}: ${paymentData.formData.name}
${dict?.paymentStatus?.labels?.phone || "Телефон"}: ${
        paymentData.formData.phone
      }
${dict?.paymentStatus?.labels?.socialMedia || "Соціальні мережі"}: ${
        paymentData.formData.socialMedia ||
        dict?.paymentStatus?.labels?.notSpecified ||
        "Не вказано"
      }
${dict?.paymentStatus?.labels?.experience || "Досвід"}: ${
        paymentData.formData.experience ||
        dict?.paymentStatus?.labels?.notSpecified ||
        "Не вказано"
      }
${dict?.paymentStatus?.labels?.supervisionGoals || "Цілі супервізії"}: ${
        paymentData.formData.supervisionGoals ||
        dict?.paymentStatus?.labels?.notSpecified ||
        "Не вказано"
      }
${dict?.paymentStatus?.labels?.status || "Статус"}: ${statusText}`;
    }

    console.log("Creating calendar event with data:", { summary, description }); // Логування
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch("/api/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary,
          description,
          start: `${paymentData.selectedDate}T${paymentData.selectedTime}:00`,
          end: moment(
            `${paymentData.selectedDate}T${paymentData.selectedTime}:00`
          )
            .add(paymentData.duration, "minutes")
            .toISOString(),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Calendar API error:", errorData); // Логування
        throw new Error("Failed to create calendar event: " + errorData);
      }
      console.log("Calendar event created successfully"); // Логування
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const handleRetryPayment = async () => {
    if (!paymentData) {
      console.error("No payment data for retry payment"); // Логування
      return;
    }

    try {
      console.log("Retrying payment..."); // Логування
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentData.price * 100,
          merchantPaymInfo: {
            reference: `booking_retry_${Date.now()}`,
            destination: `${
              paymentData.selectedType === "consultation"
                ? dict?.paymentStatus?.labels?.consultation || "Консультація"
                : dict?.paymentStatus?.labels?.supervision || "Супервізія"
            }`,
            comment: `${
              dict?.paymentStatus?.labels?.retryPaymentComment ||
              "Повторна оплата за"
            } ${
              paymentData.selectedType === "consultation"
                ? dict?.paymentStatus?.labels?.consultationLower ||
                  "консультацію"
                : dict?.paymentStatus?.labels?.supervisionLower || "супервізію"
            }`,
          },
          redirectUrl: `${window.location.origin}/payment-status`,
          webHookUrl: `${window.location.origin}/api/payment-webhook`,
        }),
      });

      const result = await response.json();
      console.log("Retry payment response:", result); // Логування

      if (result.success) {
        const updatedPaymentData = {
          ...paymentData,
          invoiceId: result.invoiceId,
        };
        localStorage.setItem("paymentData", JSON.stringify(updatedPaymentData));
        console.log("Redirecting to payment page:", result.pageUrl); // Логування
        window.location.href = result.pageUrl;
      } else {
        alert(
          `${
            dict?.paymentStatus?.errors?.createPaymentError ||
            "Помилка створення платежу"
          }: ${result.error}`
        );
        console.error("Retry payment error:", result.error); // Логування
      }
    } catch (error) {
      console.error("Retry payment error:", error);
      alert(
        dict?.paymentStatus?.errors?.retryPaymentError ||
          "Помилка при повторній оплаті"
      );
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "success":
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case "failure":
        return <XCircle className="w-16 h-16 text-red-500" />;
      case "processing":
        return <Clock className="w-16 h-16 text-yellow-500" />;
      case "hold":
        return <Clock className="w-16 h-16 text-orange-500" />;
      case "created":
        return <CreditCard className="w-16 h-16 text-blue-500" />;
      case "reversed":
        return <XCircle className="w-16 h-16 text-red-500" />;
      case "expired":
        return <XCircle className="w-16 h-16 text-red-500" />;
      default:
        return <CreditCard className="w-16 h-16 text-gray-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "success":
        return {
          title:
            dict?.paymentStatus?.statusMessages?.success?.title ||
            "Оплата успішна!",
          message:
            dict?.paymentStatus?.statusMessages?.success?.message ||
            "Ваше бронювання підтверджено. Ми відправили деталі до вашого календаря та в Telegram.",
          color: "text-green-600",
        };
      case "failure":
        return {
          title:
            dict?.paymentStatus?.statusMessages?.failure?.title ||
            "Оплата не вдалася",
          message:
            dict?.paymentStatus?.statusMessages?.failure?.message ||
            "На жаль, платіж не було завершено. Ви можете спробувати ще раз або підтвердити бронювання без оплати.",
          color: "text-red-600",
        };
      case "processing":
        return {
          title:
            dict?.paymentStatus?.statusMessages?.processing?.title ||
            "Оплата обробляється",
          message:
            dict?.paymentStatus?.statusMessages?.processing?.message ||
            "Ваш платіж обробляється. Будь ласка, зачекайте...",
          color: "text-yellow-600",
        };
      case "hold":
        return {
          title:
            dict?.paymentStatus?.statusMessages?.hold?.title ||
            "Платіж заморожено",
          message:
            dict?.paymentStatus?.statusMessages?.hold?.message ||
            "Ваш платіж тимчасово заморожено. Зверніться до служби підтримки.",
          color: "text-orange-600",
        };
      case "created":
        return {
          title:
            dict?.paymentStatus?.statusMessages?.created?.title ||
            "Платіж створено",
          message:
            dict?.paymentStatus?.statusMessages?.created?.message ||
            "Платіж створено, але ще не оброблено. Спробуйте оновити сторінку.",
          color: "text-blue-600",
        };
      case "reversed":
        return {
          title:
            dict?.paymentStatus?.statusMessages?.reversed?.title ||
            "Платіж повернено",
          message:
            dict?.paymentStatus?.statusMessages?.reversed?.message ||
            "Платіж було скасовано та повернено. Спробуйте ще раз.",
          color: "text-red-600",
        };
      case "expired":
        return {
          title:
            dict?.paymentStatus?.statusMessages?.expired?.title ||
            "Платіж прострочено",
          message:
            dict?.paymentStatus?.statusMessages?.expired?.message ||
            "Час дії платежу закінчився. Створіть новий платіж.",
          color: "text-red-600",
        };
      default:
        return {
          title:
            dict?.paymentStatus?.statusMessages?.unknown?.title ||
            "Невідомий статус",
          message:
            dict?.paymentStatus?.statusMessages?.unknown?.message ||
            "Не вдалося визначити статус платежу.",
          color: "text-gray-600",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statusInfo = getStatusMessage();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">{getStatusIcon()}</div>
          <h1 className={`text-2xl font-bold mb-2 ${statusInfo.color}`}>
            {statusInfo.title}
          </h1>
          <p className="text-gray-600">{statusInfo.message}</p>
        </div>

        {paymentData && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">
              {dict?.paymentStatus?.labels?.bookingDetails ||
                "Деталі бронювання"}
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">
                  {dict?.paymentStatus?.labels?.type || "Тип"}:
                </span>{" "}
                {paymentData.selectedType === "consultation"
                  ? dict?.paymentStatus?.labels?.consultation || "Консультація"
                  : dict?.paymentStatus?.labels?.supervision || "Супервізія"}
              </p>
              <p>
                <span className="font-medium">
                  {dict?.paymentStatus?.labels?.date || "Дата"}:
                </span>{" "}
                {paymentData.selectedDate}
              </p>
              <p>
                <span className="font-medium">
                  {dict?.paymentStatus?.labels?.time || "Час"}:
                </span>{" "}
                {paymentData.selectedTime}
              </p>
              <p>
                <span className="font-medium">
                  {dict?.paymentStatus?.labels?.duration || "Тривалість"}:
                </span>{" "}
                {paymentData.duration}{" "}
                {dict?.paymentStatus?.labels?.minutes || "хв"}
              </p>
              <p>
                <span className="font-medium">
                  {dict?.paymentStatus?.labels?.amount || "Сума"}:
                </span>{" "}
                {paymentData.price}{" "}
                {dict?.paymentStatus?.labels?.currency || "грн"}
              </p>
              <p>
                <span className="font-medium">
                  {dict?.paymentStatus?.labels?.client || "Клієнт"}:
                </span>{" "}
                {paymentData.formData.name}
              </p>
              {paymentData.invoiceId && (
                <p>
                  <span className="font-medium">
                    {dict?.paymentStatus?.labels?.paymentId || "ID платежу"}:
                  </span>{" "}
                  {paymentData.invoiceId}
                </p>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          {paymentStatus === "success" && (
            <button
              onClick={() => router.push("/")}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {dict?.paymentStatus?.buttons?.returnToHome ||
                "Повернутися на головну"}
            </button>
          )}

          {(paymentStatus === "failure" ||
            paymentStatus === "reversed" ||
            paymentStatus === "expired") && (
            <div className="space-y-3">
              <button
                onClick={handleRetryPayment}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {dict?.paymentStatus?.buttons?.retryPayment ||
                  "Спробувати оплатити ще раз"}
              </button>

              <button
                onClick={handleConfirmWithoutPayment}
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {dict?.paymentStatus?.buttons?.confirmWithoutPayment ||
                  "Підтвердити без оплати"}
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {dict?.paymentStatus?.buttons?.returnToHome ||
                  "Повернутися на головну"}
              </button>
            </div>
          )}

          {(paymentStatus === "processing" ||
            paymentStatus === "hold" ||
            paymentStatus === "created") && (
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {dict?.paymentStatus?.buttons?.updateStatus || "Оновити статус"}
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {dict?.paymentStatus?.buttons?.returnToHome ||
                  "Повернутися на головну"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

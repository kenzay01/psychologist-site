"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import ModalContainer from "./ModalContainer";
import TypeSelector from "./TypeSelector";
import ConsultationForm from "./ConsultationForm";
import SupervisionForm from "./SupervisionForm";
import CalendarStep from "./CalenderStep";
import ConfirmationStep from "./ConfirmationStep";
import { User, Users, Baby } from "lucide-react";
import moment from "moment";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import type { PaymentData } from "@/types/payment";

export default function Modal({
  isOpen,
  onClose,
  type: initialType,
  consultationType: initialConsultationType,
  supervisionType: initialSupervisionType,
}: {
  isOpen: boolean;
  onClose: () => void;
  type?: "consultation" | "supervision";
  consultationType?: "individual" | "couple" | "child";
  supervisionType?: "individual" | "group";
}) {
  // const router = useRouter();
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  const consultationData = {
    individual: {
      title: dict?.consultation.types.individual.title,
      icon: <User className="w-6 h-6 flex" />,
      duration: 60,
      price: 2000,
    },
    couple: {
      title: dict?.consultation.types.couple.title,
      icon: <Users className="w-6 h-6" />,
      duration: 80,
      price: 2600,
    },
    child: {
      title: dict?.consultation.types.child.title,
      icon: <Baby className="w-6 h-6" />,
      duration: 60,
      price: 2000,
    },
  };

  const supervisionData = {
    individual: {
      title: dict?.supervision.types.individual.title,
      icon: <User className="w-6 h-6" />,
      duration: 60,
      price: 2000,
    },
    group: {
      title: dict?.supervision.types.group.title,
      icon: <Users className="w-6 h-6" />,
      duration: 120,
      price: 1000,
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    socialMedia: "",
    problem: "",
    partnerName: "",
    childName: "",
    childAge: "",
    experience: "",
    supervisionGoals: "",
  });

  const [currentStep, setCurrentStep] = useState<
    "form" | "calendar" | "confirmation"
  >("form");
  const [selectedType, setSelectedType] = useState<
    "consultation" | "supervision"
  >(initialType || "consultation");
  const [selectedConsultationType, setSelectedConsultationType] = useState<
    "individual" | "couple" | "child"
  >(initialConsultationType || "individual");
  const [selectedSupervisionType, setSelectedSupervisionType] = useState<
    "individual" | "group"
  >(initialSupervisionType || "individual");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const price =
    selectedType === "consultation"
      ? consultationData[selectedConsultationType].price
      : supervisionData[selectedSupervisionType].price;
  const duration =
    selectedType === "consultation"
      ? consultationData[selectedConsultationType].duration
      : supervisionData[selectedSupervisionType].duration;

  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (initialType) setSelectedType(initialType);
      if (initialConsultationType)
        setSelectedConsultationType(initialConsultationType);
      if (initialSupervisionType)
        setSelectedSupervisionType(initialSupervisionType);
    }
  }, [isOpen, initialType, initialConsultationType, initialSupervisionType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeSelect = (type: "consultation" | "supervision") => {
    setSelectedType(type);
    setFormData({
      name: "",
      phone: "",
      socialMedia: "",
      problem: "",
      partnerName: "",
      childName: "",
      childAge: "",
      experience: "",
      supervisionGoals: "",
    });
    setCurrentStep("form");
  };

  const handleConsultationTypeSelect = (
    type: "individual" | "couple" | "child"
  ) => {
    setSelectedConsultationType(type);
    setFormData({
      name: "",
      phone: "",
      socialMedia: "",
      problem: "",
      partnerName: "",
      childName: "",
      childAge: "",
      experience: "",
      supervisionGoals: "",
    });
  };

  const handleSupervisionTypeSelect = (type: "individual" | "group") => {
    setSelectedSupervisionType(type);
    setFormData({
      name: "",
      phone: "",
      socialMedia: "",
      problem: "",
      partnerName: "",
      childName: "",
      childAge: "",
      experience: "",
      supervisionGoals: "",
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert(dict?.modal.form.requiredFieldsError);
      return;
    }

    if (selectedType === "consultation") {
      if (!formData.problem) {
        alert(dict?.modal.form.problemRequiredError);
        return;
      }
      if (selectedConsultationType === "couple" && !formData.partnerName) {
        alert(dict?.modal.form.partnerNameRequiredError);
        return;
      }
      if (
        selectedConsultationType === "child" &&
        (!formData.childName || !formData.childAge)
      ) {
        alert(dict?.modal.form.childFieldsRequiredError);
        return;
      }
      setCurrentStep("calendar");
    } else {
      if (!formData.supervisionGoals) {
        alert(dict?.modal.form.supervisionGoalsRequiredError);
        return;
      }
      try {
        const message =
          dict?.modal.supervisionMessage.newRequest.replace(
            "{type}",
            selectedSupervisionType === "individual"
              ? dict?.supervision.types.individual.title
              : dict?.supervision.types.group.title
          ) +
          "\n" +
          dict?.modal.supervisionMessage.name.replace("{name}", formData.name) +
          "\n" +
          dict?.modal.supervisionMessage.phone.replace(
            "{phone}",
            formData.phone
          ) +
          "\n" +
          dict?.modal.supervisionMessage.socialMedia.replace(
            "{socialMedia}",
            formData.socialMedia || dict?.modal.supervisionMessage.socialMedia
          ) +
          "\n" +
          dict?.modal.supervisionMessage.experience.replace(
            "{experience}",
            formData.experience || dict?.modal.supervisionMessage.experience
          ) +
          "\n" +
          dict?.modal.supervisionMessage.supervisionGoals.replace(
            "{supervisionGoals}",
            formData.supervisionGoals
          );

        await fetch(
          `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
              text: message,
            }),
          }
        );

        alert(dict?.modal.form.supervisionRequestSuccess);
        onClose();
        setFormData({
          name: "",
          phone: "",
          socialMedia: "",
          problem: "",
          partnerName: "",
          childName: "",
          childAge: "",
          experience: "",
          supervisionGoals: "",
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleDateSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCurrentStep("confirmation");
  };

  const handleBookingConfirmation = async () => {
    try {
      let bookingMessage = "";
      let summary = "";
      if (selectedConsultationType === "individual") {
        summary = dict?.consultation.types.individual.title || "";
        bookingMessage =
          dict?.modal.bookingMessage.newBooking +
          "\n" +
          dict?.modal.bookingMessage.type.replace("{type}", summary) +
          "\n" +
          dict?.modal.bookingMessage.date.replace(
            "{date}",
            selectedDate || ""
          ) +
          "\n" +
          dict?.modal.bookingMessage.time.replace(
            "{time}",
            selectedTime || ""
          ) +
          "\n" +
          dict?.modal.bookingMessage.name.replace("{name}", formData.name) +
          "\n" +
          dict?.modal.bookingMessage.phone.replace("{phone}", formData.phone) +
          "\n" +
          dict?.modal.bookingMessage.socialMedia.replace(
            "{socialMedia}",
            formData.socialMedia || dict?.modal.bookingMessage.socialMedia
          ) +
          "\n" +
          dict?.modal.bookingMessage.problem.replace(
            "{problem}",
            formData.problem
          );
      } else if (selectedConsultationType === "couple") {
        summary = dict?.consultation.types.couple.title || "";
        bookingMessage =
          dict?.modal.bookingMessage.newBooking +
          "\n" +
          dict?.modal.bookingMessage.type.replace("{type}", summary) +
          "\n" +
          dict?.modal.bookingMessage.date.replace(
            "{date}",
            selectedDate || ""
          ) +
          "\n" +
          dict?.modal.bookingMessage.time.replace(
            "{time}",
            selectedTime || ""
          ) +
          "\n" +
          dict?.modal.bookingMessage.name.replace("{name}", formData.name) +
          "\n" +
          dict?.modal.bookingMessage.partnerName.replace(
            "{partnerName}",
            formData.partnerName
          ) +
          "\n" +
          dict?.modal.bookingMessage.phone.replace("{phone}", formData.phone) +
          "\n" +
          dict?.modal.bookingMessage.socialMedia.replace(
            "{socialMedia}",
            formData.socialMedia || dict?.modal.bookingMessage.socialMedia
          ) +
          "\n" +
          dict?.modal.bookingMessage.problem.replace(
            "{problem}",
            formData.problem
          );
      } else if (selectedConsultationType === "child") {
        summary = dict?.consultation.types.child.title || "";
        bookingMessage =
          dict?.modal.bookingMessage.newBooking +
          "\n" +
          dict?.modal.bookingMessage.type.replace("{type}", summary) +
          "\n" +
          dict?.modal.bookingMessage.date.replace(
            "{date}",
            selectedDate || ""
          ) +
          "\n" +
          dict?.modal.bookingMessage.time.replace(
            "{time}",
            selectedTime || ""
          ) +
          "\n" +
          dict?.modal.bookingMessage.name.replace("{name}", formData.name) +
          "\n" +
          dict?.modal.bookingMessage.childName.replace(
            "{childName}",
            formData.childName
          ) +
          "\n" +
          dict?.modal.bookingMessage.childAge.replace(
            "{childAge}",
            formData.childAge
          ) +
          "\n" +
          dict?.modal.bookingMessage.phone.replace("{phone}", formData.phone) +
          "\n" +
          dict?.modal.bookingMessage.socialMedia.replace(
            "{socialMedia}",
            formData.socialMedia || dict?.modal.bookingMessage.socialMedia
          ) +
          "\n" +
          dict?.modal.bookingMessage.problem.replace(
            "{problem}",
            formData.problem
          );
      }

      await fetch(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
            text: bookingMessage,
          }),
        }
      );

      let formattedDescription = "";
      if (selectedConsultationType === "individual") {
        formattedDescription =
          dict?.modal.eventDescription.type.replace("{type}", summary) +
          "\n" +
          dict?.modal.eventDescription.name.replace("{name}", formData.name) +
          "\n" +
          dict?.modal.eventDescription.phone.replace(
            "{phone}",
            formData.phone
          ) +
          "\n" +
          dict?.modal.eventDescription.socialMedia.replace(
            "{socialMedia}",
            formData.socialMedia || dict?.modal.eventDescription.socialMedia
          ) +
          "\n" +
          dict?.modal.eventDescription.problem.replace(
            "{problem}",
            formData.problem
          );
      } else if (selectedConsultationType === "couple") {
        formattedDescription =
          dict?.modal.eventDescription.type.replace("{type}", summary) +
          "\n" +
          dict?.modal.eventDescription.name.replace("{name}", formData.name) +
          "\n" +
          dict?.modal.eventDescription.partnerName.replace(
            "{partnerName}",
            formData.partnerName
          ) +
          "\n" +
          dict?.modal.eventDescription.phone.replace(
            "{phone}",
            formData.phone
          ) +
          "\n" +
          dict?.modal.eventDescription.socialMedia.replace(
            "{socialMedia}",
            formData.socialMedia || dict?.modal.eventDescription.socialMedia
          ) +
          "\n" +
          dict?.modal.eventDescription.problem.replace(
            "{problem}",
            formData.problem
          );
      } else if (selectedConsultationType === "child") {
        formattedDescription =
          dict?.modal.eventDescription.type.replace("{type}", summary) +
          "\n" +
          dict?.modal.eventDescription.childName
            .replace("{name}", formData.name)
            .replace("{childName}", formData.childName) +
          "\n" +
          dict?.modal.eventDescription.childAge.replace(
            "{childAge}",
            formData.childAge
          ) +
          "\n" +
          dict?.modal.eventDescription.phone.replace(
            "{phone}",
            formData.phone
          ) +
          "\n" +
          dict?.modal.eventDescription.socialMedia.replace(
            "{socialMedia}",
            formData.socialMedia || dict?.modal.eventDescription.socialMedia
          ) +
          "\n" +
          dict?.modal.eventDescription.problem.replace(
            "{problem}",
            formData.problem
          );
      }

      await fetch("/api/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary,
          description: formattedDescription,
          start: `${selectedDate}T${selectedTime}:00`,
          end: moment(`${selectedDate}T${selectedTime}:00`)
            .add(duration, "minutes")
            .toISOString(),
        }),
      });

      alert(dict?.modal.form.bookingSuccess);
      onClose();
      setCurrentStep("form");
      setFormData({
        name: "",
        phone: "",
        socialMedia: "",
        problem: "",
        partnerName: "",
        childName: "",
        childAge: "",
        experience: "",
        supervisionGoals: "",
      });
    } catch (error) {
      alert(dict?.modal.form.bookingError + ": " + error);
    }
  };

  // Функція для збереження даних та створення платежу
  const handlePayment = async () => {
    try {
      const paymentData = {
        formData,
        selectedType,
        selectedConsultationType,
        selectedSupervisionType,
        selectedDate,
        selectedTime,
        price,
        duration,
        timestamp: Date.now(),
      } as PaymentData;

      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price * 100,
          merchantPaymInfo: {
            reference: `booking_${Date.now()}`,
            destination: `${
              selectedType === "consultation"
                ? consultationData[selectedConsultationType].title
                : supervisionData[selectedSupervisionType].title
            }`,
            comment: `Оплата за ${
              selectedType === "consultation" ? "консультацію" : "супервізію"
            }`,
          },
          redirectUrl: `${window.location.origin}/payment-status`,
          webHookUrl: `${window.location.origin}/api/payment-webhook`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Зберігаємо invoiceId разом із paymentData
        paymentData.invoiceId = result.invoiceId;
        localStorage.setItem("paymentData", JSON.stringify(paymentData));
        // Перенаправляємо на сторінку оплати
        window.location.href = result.pageUrl;
      } else {
        alert("Помилка створення платежу: " + result.error);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Помилка при створенні платежу");
    }
  };

  const telegramLink = "https://t.me/admin_username";

  if (!isOpen || loading) return null;

  return (
    <ModalContainer
      title={
        selectedType === "consultation"
          ? consultationData[selectedConsultationType].title
          : supervisionData[selectedSupervisionType].title
      }
      onClose={onClose}
    >
      {currentStep === "form" && (
        <>
          <TypeSelector
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
          />
          {selectedType === "consultation" ? (
            <ConsultationForm
              consultationData={consultationData}
              selectedConsultationType={selectedConsultationType}
              onConsultationTypeSelect={handleConsultationTypeSelect}
              formData={formData}
              onInputChange={handleInputChange}
              duration={duration}
              price={price}
              onSubmit={handleSubmit}
              telegramLink={telegramLink}
            />
          ) : (
            <SupervisionForm
              supervisionData={supervisionData}
              selectedSupervisionType={selectedSupervisionType}
              onSupervisionTypeSelect={handleSupervisionTypeSelect}
              formData={formData}
              onInputChange={handleInputChange}
              duration={duration}
              price={price}
              onSubmit={handleSubmit}
              telegramLink={telegramLink}
            />
          )}
        </>
      )}

      {currentStep === "calendar" && selectedType === "consultation" && (
        <CalendarStep
          consultationType={selectedConsultationType}
          duration={duration}
          onDateSelect={handleDateSelect}
          onBack={() => setCurrentStep("form")}
        />
      )}

      {currentStep === "confirmation" && selectedType === "consultation" && (
        <ConfirmationStep
          consultationData={consultationData}
          selectedConsultationType={selectedConsultationType}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          duration={duration}
          price={price}
          onConfirm={handleBookingConfirmation}
          onPayment={handlePayment}
          onBack={() => setCurrentStep("calendar")}
        />
      )}
    </ModalContainer>
  );
}

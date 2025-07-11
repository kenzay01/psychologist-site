import { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import TypeSelector from "./TypeSelector";
import ConsultationForm from "./ConsultationForm";
import SupervisionForm from ".//SupervisionForm";
import CalendarStep from "./CalenderStep";
import ConfirmationStep from "./ConfirmationStep";
import { User, Users, Baby } from "lucide-react";
import moment from "moment";

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
  const consultationData = {
    individual: {
      title: "Індивідуальна терапія",
      icon: <User className="w-6 h-6 flex" />,
      duration: 60,
      price: 2000,
    },
    couple: {
      title: "Сімейна та парна психотерапія",
      icon: <Users className="w-6 h-6" />,
      duration: 80,
      price: 2600,
    },
    child: {
      title: "Дитяче та підліткове консультування",
      icon: <Baby className="w-6 h-6" />,
      duration: 60,
      price: 2000,
    },
  };

  const supervisionData = {
    individual: {
      title: "Індивідуальна супервізія",
      icon: <User className="w-6 h-6" />,
      duration: 60,
      price: 2000,
    },
    group: {
      title: "Групова супервізія",
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
      alert("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    if (selectedType === "consultation") {
      if (!formData.problem) {
        alert("Будь ласка, вкажіть опис проблеми");
        return;
      }
      if (selectedConsultationType === "couple" && !formData.partnerName) {
        alert("Будь ласка, вкажіть ім'я другого партнера");
        return;
      }
      if (
        selectedConsultationType === "child" &&
        (!formData.childName || !formData.childAge)
      ) {
        alert("Будь ласка, заповніть всі поля для дитячого консультування");
        return;
      }
      setCurrentStep("calendar");
    } else {
      if (!formData.supervisionGoals) {
        alert("Будь ласка, вкажіть цілі супервізії");
        return;
      }
      try {
        const message = `
        🔔 Нова заявка на ${
          selectedSupervisionType === "individual" ? "індивідуальну" : "групову"
        } супервізію
        🙎‍♂️ Ім'я: ${formData.name}
        📞 Телефон: ${formData.phone}
        📫 Соц.мережі: ${formData.socialMedia || "Не вказано"}
        📝 Досвід: ${formData.experience || "Не вказано"}
        🎯 Цілі супервізії: ${formData.supervisionGoals}
        `;

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

        alert("Заявку успішно відправлено в Telegram!");
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
        alert("Помилка при відправці заявки. Спробуйте ще раз." + error);
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
      let bookingMessage = ``;
      if (selectedConsultationType === "individual") {
        bookingMessage = `
        🔔 Нове бронювання
        😊 Тип: Індивідуальне консультування
        📅 Дата: ${selectedDate}
        ⏰ Час: ${selectedTime}
        🙎‍♂️ Ім'я: ${formData.name}
        📞 Телефон: ${formData.phone}
        📫 Соц.мережі: ${formData.socialMedia || "Не вказано"}
        📝 Опис проблеми: ${formData.problem}
        `;
      } else if (selectedConsultationType === "couple") {
        bookingMessage = `
        🔔 Нове бронювання
        😊 Тип: Парне консультування
        📅 Дата: ${selectedDate}
        ⏰ Час: ${selectedTime}
 O       🙎‍♂️ Ім'я першого партнера: ${formData.name}
        🙎‍♂️ Ім'я другого партнера: ${formData.partnerName}
        📞 Телефон: ${formData.phone}
        📫 Соц.мережі: ${formData.socialMedia || "Не вказано"}
        📝 Опис проблеми: ${formData.problem}
        `;
      } else if (selectedConsultationType === "child") {
        bookingMessage = `
        🔔 Нове бронювання
        😊 Тип: Дитяче консультування
        📅 Дата: ${selectedDate}
        ⏰ Час: ${selectedTime}
        🙎‍♂️ Ім'я батька/матері: ${formData.name}
        🙎‍♀️ Ім'я дитини: ${formData.childName}
        👶 Вік дитини: ${formData.childAge}
        📞 Телефон: ${formData.phone}
        📫 Соц.мережі: ${formData.socialMedia || "Не вказано"}
        📝 Опис проблеми: ${formData.problem}
        `;
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

      const summary =
        selectedConsultationType === "individual"
          ? "Індивідуальне консультування"
          : selectedConsultationType === "couple"
          ? "Парне консультування"
          : "Дитяче консультування";

      let formattedDescription;
      if (selectedConsultationType === "individual") {
        formattedDescription = `
        Тип: ${summary}
        Ім'я: ${formData.name}
        Телефон: ${formData.phone}
        Соц.мережі: ${formData.socialMedia || "Не вказано"}
        Опис проблеми: ${formData.problem}
        `;
      } else if (selectedConsultationType === "couple") {
        formattedDescription = `
        Тип: ${summary}
        Ім'я першого партнера: ${formData.name}
        Ім'я другого партнера: ${formData.partnerName}
        Телефон: ${formData.phone}
        Соц.мережі: ${formData.socialMedia || "Не вказано"}
        Опис проблеми: ${formData.problem}
        `;
      } else if (selectedConsultationType === "child") {
        formattedDescription = `
        Тип: ${summary}
        Ім'я батька/матері: ${formData.name}
        Ім'я дитини: ${formData.childName}
        Вік дитини: ${formData.childAge}
        Телефон: ${formData.phone}
        Соц.мережі: ${formData.socialMedia || "Не вказано"}
        Опис проблеми: ${formData.problem}
        `;
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

      alert("Бронювання успішно створено! Деталі відправлені в Telegram.");
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
      alert("Помилка при створенні бронювання: " + error);
    }
  };

  const handlePayment = () => {
    // Логіка оплати через MonoBank
  };

  const telegramLink = "https://t.me/admin_username";

  if (!isOpen) return null;

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

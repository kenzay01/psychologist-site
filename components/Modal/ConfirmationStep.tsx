import { Calendar, CreditCard } from "lucide-react";
import { JSX } from "react";
interface ConfirmationStepProps {
  consultationData: {
    individual: {
      title: string;
      icon: JSX.Element;
      duration: number;
      price: number;
    };
    couple: {
      title: string;
      icon: JSX.Element;
      duration: number;
      price: number;
    };
    child: {
      title: string;
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
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Підтвердження бронювання</h3>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium mb-2">Деталі бронювання:</h4>
        <p>
          <strong>Послуга:</strong>{" "}
          {consultationData[selectedConsultationType].title}
        </p>
        <p>
          <strong>Дата:</strong>{" "}
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString("uk-UA")
            : ""}
        </p>
        <p>
          <strong>Час:</strong> {selectedTime}
        </p>
        <p>
          <strong>Тривалість:</strong> {duration} хв
        </p>
        <p>
          <strong>Ціна:</strong> {price} грн
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onConfirm}
          className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Підтвердити бронювання
        </button>
        <h1 className="text-center text-gray-500 text-sm">Або</h1>
        <button
          onClick={onPayment}
          className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Оплатити через MonoBank
        </button>

        <button
          onClick={onBack}
          className="w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
        >
          Назад до вибору часу
        </button>
      </div>
    </div>
  );
}

interface TypeSelectorProps {
  selectedType: "consultation" | "supervision";
  onTypeSelect: (type: "consultation" | "supervision") => void;
}

export default function TypeSelector({
  selectedType,
  onTypeSelect,
}: TypeSelectorProps) {
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
        Консультація
      </button>
      <button
        onClick={() => onTypeSelect("supervision")}
        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
          selectedType === "supervision"
            ? "bg-white text-red-500 shadow-sm border-2 border-red-500"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Супервізія
      </button>
    </div>
  );
}

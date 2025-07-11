import { ReactNode } from "react";

interface ModalContainerProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalContainer({
  title,
  onClose,
  children,
}: ModalContainerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

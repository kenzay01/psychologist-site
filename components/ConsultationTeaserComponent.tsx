"use client";

import { useState } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import Modal from "@/components/Modal/Modal";
export default function ConsultationTeaserComponent() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="w-full max-w-7xl flex justify-center items-center mx-auto py-4">
        <div className="bg-red-500 rounded-3xl p-6 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">{dict?.aboutMe.cta.title}</h2>
          <p className="text-xl mb-8 opacity-90">
            {dict?.aboutMe.cta.description}
          </p>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="bg-white text-red-600 w-full px-2 md:px-12 py-4 rounded-bl-md rounded-br-3xl rounded-tl-3xl rounded-tr-md font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300"
          >
            {dict?.aboutMe.cta.bookConsultation}
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

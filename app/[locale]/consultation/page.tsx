"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import {
  Calendar,
  Clock,
  Star,
  MessageCircle,
  CreditCard,
  User,
  Users,
  Baby,
} from "lucide-react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

type ConsultationType = "individual" | "couple" | "child";

const ConsultationContent = () => {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ConsultationType>("individual");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultationType, setSelectedConsultationType] =
    useState<ConsultationType>("individual");

  useEffect(() => {
    const type = searchParams.get("type") as ConsultationType;
    if (type && ["individual", "couple", "child"].includes(type)) {
      setActiveTab(type);
      setSelectedConsultationType(type);
    }
  }, [searchParams]);

  const consultationData = {
    individual: {
      title: dict?.consultation.types.individual.title,
      icon: <User className="w-6 h-6" />,
      duration: dict?.consultation.types.individual.duration,
      price: dict?.consultation.types.individual.price,
      blockquote: dict?.consultation.types.individual.blockquote,
      description: dict?.consultation.types.individual.description,
      description2: dict?.consultation.types.individual.description2,
      topics: dict?.consultation.types.individual.topics,
      format: dict?.consultation.types.individual.format,
      reviews: [
        {
          name: dict?.consultation.types.individual.reviews[0].name,
          rating: 5,
          text: dict?.consultation.types.individual.reviews[0].text,
        },
        {
          name: dict?.consultation.types.individual.reviews[1].name,
          rating: 5,
          text: dict?.consultation.types.individual.reviews[1].text,
        },
      ],
    },
    couple: {
      title: dict?.consultation.types.couple.title,
      icon: <Users className="w-6 h-6" />,
      duration: dict?.consultation.types.couple.duration,
      price: dict?.consultation.types.couple.price,
      blockquote: dict?.consultation.types.couple.blockquote,
      description: dict?.consultation.types.couple.description,
      description2: dict?.consultation.types.couple.description2,
      topics: dict?.consultation.types.couple.topics,
      format: dict?.consultation.types.couple.format,
      reviews: [
        {
          name: dict?.consultation.types.couple.reviews[0].name,
          rating: 5,
          text: dict?.consultation.types.couple.reviews[0].text,
        },
        {
          name: dict?.consultation.types.couple.reviews[1].name,
          rating: 5,
          text: dict?.consultation.types.couple.reviews[1].text,
        },
      ],
    },
    child: {
      title: dict?.consultation.types.child.title,
      icon: <Baby className="w-6 h-6" />,
      duration: dict?.consultation.types.child.duration,
      price: dict?.consultation.types.child.price,
      blockquote: dict?.consultation.types.child.blockquote,
      description: dict?.consultation.types.child.description,
      description2: dict?.consultation.types.child.description2,
      topics: dict?.consultation.types.child.topics,
      format: dict?.consultation.types.child.format,
      reviews: [
        {
          name: dict?.consultation.types.child.reviews[0].name,
          rating: 5,
          text: dict?.consultation.types.child.reviews[0].text,
        },
        {
          name: dict?.consultation.types.child.reviews[1].name,
          rating: 5,
          text: dict?.consultation.types.child.reviews[1].text,
        },
      ],
    },
  };

  const openModal = (type: keyof typeof consultationData) => {
    setSelectedConsultationType(type);
    setIsModalOpen(true);
  };

  if (loading) return null;

  const currentData = consultationData[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Object.entries(consultationData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  params.set("type", key);
                  window.history.replaceState(
                    {},
                    "",
                    `${window.location.pathname}?${params.toString()}`
                  );
                }}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                  activeTab === key
                    ? "bg-white text-red-500 shadow-sm border-2 border-red-500"
                    : "text-gray-600 hover:text-gray-800"
                } `}
              >
                {data.icon}
                <span className="hidden sm:inline">{data.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <div className="flex items-center space-x-3 mb-2 flex-col md:flex-row justify-center text-center md:text-left">
                <div className="flex-1 md:flex-0">{currentData.icon}</div>
                <h1 className="md:flex-1 text-3xl font-bold text-gray-800 ">
                  {currentData.title}
                </h1>
              </div>

              <blockquote className="text-sm md:text-[16px] font-medium italic leading-relaxed mb-4">
                {currentData.blockquote}
              </blockquote>

              <p className="text-gray-600 text-lg mb-4">
                {currentData.description}
              </p>
              <p className="text-gray-600 text-lg ">
                {currentData.description2}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dict?.consultation.topicsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentData.topics?.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dict?.consultation.formatTitle}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    {dict?.consultation.durationLabel}: {currentData.duration}{" "}
                    {dict?.consultation.minutes}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">{currentData.format}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    {dict?.consultation.priceLabel}: {currentData.price}{" "}
                    {dict?.consultation.currency}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dict?.consultation.reviewsTitle}
              </h2>
              <div className="space-y-4">
                {currentData.reviews.map((review, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-800">
                        {review.name}
                      </span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {dict?.consultation.quickInfoTitle}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {dict?.consultation.durationLabel}:
                  </span>
                  <span className="font-medium">
                    {currentData.duration} {dict?.consultation.minutes}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {dict?.consultation.priceLabel}:
                  </span>
                  <span className="font-medium">
                    {currentData.price} {dict?.consultation.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {dict?.consultation.formatLabel}:
                  </span>
                  <span className="font-medium">
                    {dict?.consultation.formatValue}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-red-500">
              <div className="space-y-3">
                <button
                  onClick={() => openModal(activeTab)}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>{dict?.consultation.cta.bookConsultation}</span>
                </button>

                <a
                  href="https://t.me/admin_username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{dict?.consultation.cta.contactTelegram}</span>
                </a>
              </div>
            </div>
            {selectedConsultationType === "couple" && (
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  {dict?.consultation.coupleInfo.title}
                </h3>
                <h4 className="text-sm text-red-600 italic">
                  {dict?.consultation.coupleInfo.description}
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={"consultation"}
        consultationType={selectedConsultationType}
      />
    </div>
  );
};

export default function ConsultationPage() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  return (
    <Suspense fallback={<div>{dict?.consultation.loading}</div>}>
      <ConsultationContent />
    </Suspense>
  );
}

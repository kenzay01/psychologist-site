"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Star, User, Users } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import supervisionImg from "@/public/services/supervision.png";
import Image from "next/image";

type SupervisionType = "individual" | "group";

const SupervisionContent = () => {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<SupervisionType>("individual");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupervisionType, setSelectedSupervisionType] =
    useState<SupervisionType>("individual");

  useEffect(() => {
    const type = searchParams.get("type") as SupervisionType;
    if (type && ["individual", "group"].includes(type)) {
      setActiveTab(type);
      setSelectedSupervisionType(type);
    }
  }, [searchParams]);

  const supervisionData = {
    individual: {
      title: dict?.supervision.types.individual.title,
      icon: <User className="w-6 h-6" />,
      duration: dict?.supervision.types.individual.duration,
      price: dict?.supervision.types.individual.price,
      description: dict?.supervision.types.individual.description,
      topics: dict?.supervision.types.individual.topics,
      format: dict?.supervision.types.individual.format,
      reviews: [
        {
          name: dict?.supervision.types.individual.reviews[0].name,
          rating: 5,
          text: dict?.supervision.types.individual.reviews[0].text,
        },
        {
          name: dict?.supervision.types.individual.reviews[1].name,
          rating: 5,
          text: dict?.supervision.types.individual.reviews[1].text,
        },
      ],
    },
    group: {
      title: dict?.supervision.types.group.title,
      icon: <Users className="w-6 h-6" />,
      duration: dict?.supervision.types.group.duration,
      price: dict?.supervision.types.group.price,
      description: dict?.supervision.types.group.description,
      topics: dict?.supervision.types.group.topics,
      format: dict?.supervision.types.group.format,
      reviews: [
        {
          name: dict?.supervision.types.group.reviews[0].name,
          rating: 5,
          text: dict?.supervision.types.group.reviews[0].text,
        },
        {
          name: dict?.supervision.types.group.reviews[1].name,
          rating: 5,
          text: dict?.supervision.types.group.reviews[1].text,
        },
      ],
    },
  };

  const openModal = (type: keyof typeof supervisionData) => {
    setSelectedSupervisionType(type);
    setIsModalOpen(true);
  };

  if (loading) return null;

  const currentData = supervisionData[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Object.entries(supervisionData).map(([key, data]) => (
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
                }`}
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
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                {currentData.icon}
                <h1 className="text-3xl font-bold text-gray-800">
                  {dict?.supervision.title}
                </h1>
              </div>
              <Image
                src={supervisionImg}
                alt={"Consultation Image"}
                className="w-full h-64 object-cover rounded-lg shadow-md mb-2"
                quality={85}
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
              <p className="text-gray-600 text-lg leading-relaxed italic">
                {dict?.supervision.blockquote}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                {dict?.supervision.description}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dict?.supervision.whyTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {dict?.supervision.whyDescription1}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                {dict?.supervision.whyDescription2}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dict?.supervision.forWhomTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dict?.supervision.forWhomTopics.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dict?.supervision.formatTitle}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    {dict?.supervision.targetAudience}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    {dict?.supervision.topicsLabel}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">{currentData.format}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">
                    {dict?.supervision.certificate}
                  </span>
                </div>
              </div>
            </div>
            {/*Відгуки*/}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Відгуки учасників
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
                    <p className="text-gray-600 italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {dict?.consultation.quickInfoTitle}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {dict?.supervision.durationLabel}:
                  </span>
                  <span className="font-medium">
                    {currentData.duration} {dict?.supervision.minutes}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {dict?.supervision.priceLabel}:
                  </span>
                  <span className="font-medium">
                    {currentData.price} {dict?.supervision.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {dict?.supervision.formatLabel}:
                  </span>
                  <span className="font-medium">
                    {selectedSupervisionType === "individual"
                      ? dict?.supervision.formatValueIndividual
                      : dict?.supervision.formatValueGroup}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="space-y-3">
                <button
                  onClick={() => openModal(activeTab)}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>{dict?.supervision.cta.bookSupervision}</span>
                </button>

                <a
                  href="https://t.me/admin_username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{dict?.supervision.cta.contactTelegram}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="supervision"
        supervisionType={selectedSupervisionType}
      />
    </div>
  );
};

export default function SupervisionPage() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  return (
    <Suspense fallback={<div>{dict?.supervision.loading}</div>}>
      <SupervisionContent />
    </Suspense>
  );
}

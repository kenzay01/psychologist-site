"use client";
import Image from "next/image";
import aboutMeImg from "@/public/about-me-img.jpg";
import { useState } from "react";
import BookingModal from "@/components/Modal/Modal";
import {
  MapPin,
  Monitor,
  Users,
  Heart,
  MessageCircle,
  Star,
  Shield,
  Lightbulb,
  Compass,
} from "lucide-react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function AboutMe() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const approaches = [
    {
      name: dict?.aboutMe.approaches[0].name,
      description: dict?.aboutMe.approaches[0].description,
      icon: Star,
    },
    {
      name: dict?.aboutMe.approaches[1].name,
      description: dict?.aboutMe.approaches[1].description,
      icon: MessageCircle,
    },
    {
      name: dict?.aboutMe.approaches[2].name,
      description: dict?.aboutMe.approaches[2].description,
      icon: Compass,
    },
    {
      name: dict?.aboutMe.approaches[3].name,
      description: dict?.aboutMe.approaches[3].description,
      icon: Heart,
    },
    {
      name: dict?.aboutMe.approaches[4].name,
      description: dict?.aboutMe.approaches[4].description,
      icon: Users,
    },
  ];

  const workFormats = [
    {
      title: dict?.aboutMe.workFormats[0].title,
      location: dict?.aboutMe.workFormats[0].location,
      icon: MapPin,
      description: dict?.aboutMe.workFormats[0].description,
    },
    {
      title: dict?.aboutMe.workFormats[1].title,
      location: dict?.aboutMe.workFormats[1].location,
      icon: Monitor,
      description: dict?.aboutMe.workFormats[1].description,
    },
    {
      title: dict?.aboutMe.workFormats[2].title,
      location: dict?.aboutMe.workFormats[2].location,
      icon: Users,
      description: dict?.aboutMe.workFormats[2].description,
    },
  ];

  const clientTypes = [
    {
      title: dict?.aboutMe.clientTypes[0].title,
      description: dict?.aboutMe.clientTypes[0].description,
      icon: Heart,
    },
    {
      title: dict?.aboutMe.clientTypes[1].title,
      description: dict?.aboutMe.clientTypes[1].description,
      icon: Users,
    },
    {
      title: dict?.aboutMe.clientTypes[2].title,
      description: dict?.aboutMe.clientTypes[2].description,
      icon: Compass,
    },
    {
      title: dict?.aboutMe.clientTypes[3].title,
      description: dict?.aboutMe.clientTypes[3].description,
      icon: Lightbulb,
    },
    {
      title: dict?.aboutMe.clientTypes[4].title,
      description: dict?.aboutMe.clientTypes[4].description,
      icon: Shield,
    },
  ];

  // if (loading) return null;

  return (
    <>
      <section className="min-h-screen bg-white py-8">
        <div className="max-w-6xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {dict?.aboutMe.title}
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start mb-8 md:mb-16">
            {/* Left Column - Image and Quote */}
            <div className="space-y-4 md:space-y-8">
              <div className="relative">
                <Image
                  src={aboutMeImg}
                  alt="Олександра Алексюк - психологиня-сексологиня"
                  className="w-full h-106 object-cover rounded-3xl shadow-2xl"
                  placeholder="blur"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="relative mt-4 md:mt-0 md:absolute md:-bottom-6 md:-right-6 bg-red-500 text-white px-4 py-3 rounded-2xl shadow-lg max-w-sm">
                  <blockquote className="font-medium italic">
                    {dict?.aboutMe.quote}
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Right Column - About Text */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {dict?.aboutMe.approachTitle}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {dict?.aboutMe.approachDescription}
                </p>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="text-gray-700 font-medium">
                    {dict?.aboutMe.approachDetail}
                  </p>
                </div>
              </div>

              <div className="shadow-xl rounded-2xl p-8 ">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {dict?.aboutMe.philosophyTitle}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {dict?.aboutMe.philosophyDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Approaches Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              {dict?.aboutMe.approachesTitle}
              <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approaches.map((approach, index) => {
                const IconComponent = approach.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="flex items-center mb-4">
                      <div className="shadow-xl p-3 rounded-full mr-4 border border-red-500">
                        <IconComponent className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {approach.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {approach.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Work Formats Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              {dict?.aboutMe.workFormatsTitle}
              <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {workFormats.map((format, index) => {
                const IconComponent = format.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
                  >
                    <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {format.title}
                    </h3>
                    <p className="text-red-600 font-medium mb-4">
                      {format.location}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {format.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Client Types Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              {dict?.aboutMe.clientTypesTitle}
              <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {clientTypes.map((client, index) => {
                const IconComponent = client.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shadow-xl border border-red-500 p-3 rounded-full flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {client.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {client.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-red-500 rounded-3xl p-6 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              {dict?.aboutMe.cta.title}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {dict?.aboutMe.cta.description}
            </p>
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="bg-white text-red-600 w-full px-2 md:px-12 py-4 rounded-bl-md rounded-br-3xl rounded-tl-3xl rounded-tr-md font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {dict?.aboutMe.cta.bookConsultation}
            </button>
          </div>
        </div>
      </section>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

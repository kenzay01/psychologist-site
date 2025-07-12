"use client";

import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import instagramImg from "@/public/socials/instagram.jpg";
import youtubeImg from "@/public/socials/youtube.jpg";
import tiktokImg from "@/public/socials/tiktok.jpg";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function SocialsContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [showAll, setShowAll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const socials = [
    {
      id: 1,
      title: dict?.socials?.items[0].title,
      icon: FaInstagram,
      link: "https://www.instagram.com/alexandra_aleksiuk?igsh=MWY2b2Y4eTR6MmllOQ%3D%3D&utm_source=qr",
      img: instagramImg,
    },
    {
      id: 2,
      title: dict?.socials?.items[1].title,
      icon: FaYoutube,
      link: "https://youtube.com/@psiholog.o.aleksiuk?si=6fosJ4s08PVEuWZj",
      img: youtubeImg,
    },
    {
      id: 3,
      title: dict?.socials?.items[2].title,
      icon: FaTiktok,
      link: "https://www.tiktok.com/@alexandraaleksiuk?_t=ZM-8xgvh42k9xe&_r=1",
      img: tiktokImg,
    },
  ];

  const displayedSocials = isDesktop
    ? socials
    : showAll
    ? socials
    : socials.slice(0, 1);

  return (
    <section
      className={`py-8 md:py-16 bg-white ${
        currentLocale === "ru" ? "hidden" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {dict?.socials?.title || "Соціальні мережі"}
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {dict?.socials?.description || "Долучайтеся до наших спільнот"}
          </p>
        </div>

        {/* Socials Grid */}
        <div className="grid md:grid-cols-3 gap-8 min-w-full">
          {displayedSocials.map((social) => (
            <a
              className="flex items-center justify-center flex-col gap-2"
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-red-500 w-24 backdrop-blur-sm rounded-2xl py-2 flex items-center justify-center">
                <social.icon className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center justify-center hover:shadow-2xl hover:scale-[1.01]">
                <div className="w-full min-w-[280px] h-[550px] md:h-[575px] bg-gray-100 flex items-center justify-center relative">
                  <Image
                    src={social.img}
                    alt={social.title ?? "Social image"}
                    width={600}
                    height={450}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="top"
                    quality={85}
                    placeholder="blur"
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 33vw, 25vw"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Кнопка показується тільки на мобільних пристроях */}
        {socials.length > 1 && (
          <div className="text-center mt-8 md:hidden">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold text-base inline-flex items-center gap-2 justify-center hover:scale-105 transition-all duration-300 shadow-md"
            >
              {showAll
                ? dict?.socials?.lessSocials || "Менше"
                : dict?.socials?.moreSocials || "Інші соцмережі"}
              {showAll ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

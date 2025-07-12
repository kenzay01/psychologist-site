"use client";
import { FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import instagramImg from "@/public/socials/instagram.jpg";
import youtubeImg from "@/public/socials/youtube.jpg";
import tiktokImg from "@/public/socials/tiktok.jpg";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function SocialsContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  const socials = [
    {
      id: 1,
      title: dict?.socials.items[0].title,
      icon: FaInstagram,
      link: "https://www.instagram.com/alexandra_aleksiuk?igsh=MWY2b2Y4eTR6MmllOQ%3D%3D&utm_source=qr",
      img: instagramImg,
    },
    {
      id: 2,
      title: dict?.socials.items[1].title,
      icon: FaYoutube,
      link: "https://youtube.com/@psiholog.o.aleksiuk?si=6fosJ4s08PVEuWZj",
      img: youtubeImg,
    },
    {
      id: 3,
      title: dict?.socials.items[2].title,
      icon: FaTiktok,
      link: "https://www.tiktok.com/@alexandraaleksiuk?_t=ZM-8xgvh42k9xe&_r=1",
      img: tiktokImg,
    },
  ];

  if (loading) return null;

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
            {dict?.socials.title}
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {dict?.socials.description}
          </p>
        </div>

        {/* Socials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {socials.map((social) => (
            <a
              className="flex items-center justify-center flex-col gap-2"
              key={social.id}
              href={social.link}
            >
              <div className="bg-red-500 w-24 backdrop-blur-sm rounded-2xl py-2 flex items-center justify-center">
                <social.icon className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center justify-center hover:shadow-2xl hover:scale-[1.01]">
                <div className="flex-none w-full bg-gray-100 flex items-center justify-center relative">
                  <Image
                    src={social.img}
                    alt={social.title ?? "Social image"}
                    width={400}
                    height={450}
                    className="w-full h-[550px] md:h-[450px] object-cover"
                    quality={85}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

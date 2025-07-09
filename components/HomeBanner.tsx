import bannerBg from "@/public/home-banner.jpg";
import homePhoto from "@/public/home-img.jpg";
import Image from "next/image";
import { Youtube, Instagram, Send } from "lucide-react";

export default function HomeBanner() {
  const socialLinks = [
    { href: "#", icon: Youtube, label: "YouTube", color: "bg-red-700" },
    { href: "#", icon: Instagram, label: "Instagram", color: "bg-pink-700" },
    { href: "#", icon: Send, label: "Telegram", color: "bg-blue-500" },
  ];

  return (
    <section className="relative h-auto md:h-150 flex flex-col md:flex-row items-center font-semibold py-10 md:py-0 ">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bannerBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 shadow-2xl"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row">
        {/* Left side (image + quote) */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-white text-center px-4 mb-10 md:mb-0">
          <Image
            src={homePhoto}
            alt="HomePhoto"
            className="h-72 w-auto md:h-120 rounded-3xl"
            placeholder="blur"
            quality={60}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <blockquote className="text-lg font-medium italic text-white leading-relaxed">
            «Коли ви маєте безпечне місце для себе — ви нарешті починаєте жити,
            а не виживати»
          </blockquote>
        </div>

        {/* Right side (text + button + social) */}
        <div className="flex-1 text-white flex flex-col items-center md:items-start justify-center px-4">
          <div className="flex flex-col flex-1/2 gap-2 text-center justify-end md:text-left">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              Олександра <br className="hidden md:block" /> Алексюк
            </h1>
            <h2 className="font-semibold text-base md:text-lg mt-2 md:pl-1 max-w-xl">
              Психологиня-сексологиня, клінічна психологиня, супервізорка та
              викладачка сексології
            </h2>
            <h2 className="italic text-base md:text-lg md:pl-1 max-w-xl">
              Працюю з дорослими, парами, підлітками та дітьми, проводжу групові
              та індивідуальні супервізії
            </h2>
          </div>

          <div className="mt-6 md:mt-12">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 md:px-12 py-3 rounded-bl-md rounded-br-3xl rounded-tl-3xl rounded-tr-md font-semibold shadow-md hover:scale-105 transition-all duration-300">
              ЗАПИСАТИСЯ НА КОНСУЛЬТАЦІЮ
            </button>
          </div>

          <div className="mt-6 md:mt-auto flex space-x-4 self-center md:self-end flex-1/6 items-end">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`${social.color} hover:scale-105 transition-all duration-300 p-2 rounded-full flex items-center justify-center`}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 md:w-8 md:h-8" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { Instagram } from "lucide-react";
// , Youtube, MessageCircle
// import { useRouter } from "next/navigation";
import Image from "next/image";
import instagramImg from "@/public/socials/instagram.jpg";
// import youtubeImg from "@/public/socials/youtube.jpg";
// import tiktokImg from "@/public/socials/tiktok.jpg";

export default function SocialsContainer() {
  //   const router = useRouter();

  const socials = [
    {
      id: 1,
      title: "Instagram",
      icon: Instagram,
      link: "https://www.instagram.com/alexandra_aleksiuk?igsh=MWY2b2Y4eTR6MmllOQ%3D%3D&utm_source=qr",
      img: instagramImg,
    },
    // {
    //   id: 2,
    //   title: "YouTube",
    //   icon: Youtube,
    //   link: "https://www.youtube.com", // Placeholder link, replace with actual YouTube link
    //   img: youtubeImg,
    // },
    // {
    //   id: 3,
    //   title: "TikTok",
    //   icon: MessageCircle,
    //   link: "https://www.tiktok.com", // Placeholder link, replace with actual TikTok link
    //   img: tiktokImg,
    // },
  ];

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Мої соціальні мережі
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Долучайтеся до моїх соціальних мереж для корисного контенту
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
                <social.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <div className="bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center justify-center hover:shadow-2xl hover:scale-[1.01]">
                <div className="flex-none w-full bg-gray-100 flex items-center justify-center relative">
                  <Image
                    src={social.img}
                    alt={social.title}
                    className="w-full h-auto object-cover"
                    quality={85}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>

                {/* Button Section
              <div className="flex-1 p-4 flex flex-col justify-center">
                <button
                  onClick={() => router.push(social.link)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 w-full py-2 rounded-xl font-semibold text-base inline-flex items-center gap-2 justify-between hover:scale-102 transition-all duration-300 shadow-md"
                >
                  Перейти до {social.title}
                </button>
              </div> */}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

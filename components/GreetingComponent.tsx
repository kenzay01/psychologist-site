"use client";
import Image from "next/image";
import greetingImg from "@/public/greeting-img.jpg";
import { useRouter } from "next/navigation";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function GreetingComponent() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const router = useRouter();

  // if (loading) return null;

  return (
    <section className="bg-red-500 text-white relative overflow-hidden">
      <div className="pt-16 pb-16 px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - text content */}
          <div className="space-y-4 md:space-y-8 flex flex-col justify-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {dict?.greeting.title}
              </h1>
              <p className="text-lg leading-relaxed opacity-95">
                {dict?.greeting.description}
              </p>
            </div>

            <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-lg font-medium leading-relaxed">
                {dict?.greeting.goal}
              </p>
            </div>

            <div className="pt-6 self-center w-full">
              <button
                onClick={() => {
                  router.push(`${currentLocale}/aboutMe`);
                }}
                className="bg-white hover:bg-red-200 text-gray-800 w-full md:px-12 py-3 rounded-bl-md rounded-br-3xl rounded-tl-3xl rounded-tr-md font-semibold shadow-md hover:scale-105 transition-all duration-300"
              >
                {dict?.greeting.cta.learnMore}
              </button>
            </div>
          </div>

          {/* Right column - image */}
          <div className="flex-col items-center space-y-6 hidden md:flex">
            <Image
              src={greetingImg}
              alt="Greeting Image"
              className="w-auto md:h-140 h-92 rounded-3xl object-cover shadow-2xl"
              placeholder="blur"
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />

            <div className="max-w-sm text-center">
              <blockquote className="text-sm md:text-lg font-medium italic text-white leading-relaxed">
                {dict?.greeting.quote}
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wavy border */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 fill-white"
        >
          <path d="M0,120 C150,40 350,120 600,80 C850,40 1050,120 1200,80 L1200,120 Z" />
        </svg>
      </div>
    </section>
  );
}

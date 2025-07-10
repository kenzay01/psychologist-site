"use client";
import Image from "next/image";
import greetingImg from "@/public/greeting-img.jpg"; // Placeholder image path
import { useRouter } from "next/navigation";
export default function GreetingComponent() {
  const router = useRouter();
  return (
    <section className="bg-red-500 text-white relative overflow-hidden">
      {/* Top wavy border */}
      {/* <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 fill-[#020f04]"
        >
          <path d="M0,0 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,0 Z" />
        </svg>
      </div> */}

      <div className="pt-16 pb-16 px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - text content */}
          <div className="space-y-4 md:space-y-8 flex flex-col justify-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Вітаю! Мене звати Олександра Алексюк
              </h1>
              <p className="text-lg leading-relaxed opacity-95">
                Я — практикуюча психологиня-сексологиня з багаторічним досвідом
                роботи з індивідуальними клієнтами, парами та сім`ями, дітьми та
                підлітками. Моя спеціалізація охоплює теми сексуальності,
                стосунків, психосоматики, дитячо-батьківської динаміки, а також
                впливу травматичного досвіду на тілесність і сексуальну
                поведінку.
              </p>
            </div>

            {/* <div className="border-l-4 border-white/30 pl-6">
              <h2 className="text-xl font-semibold mb-4">
                У своїй роботі я поєдную науковий підхід із глибиною
                психотерапевтичного процесу:
              </h2>
              <div className="space-y-2 text-lg">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  позитивна психотерапія
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  трансактний аналіз
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  психосоматика
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  сімейна терапія
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  сексологія
                </div>
              </div>
            </div> */}

            <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-lg font-medium leading-relaxed">
                Моя мета — не просто «вирішити проблему», а допомогти людині
                повернутися до себе, своїх бажань, тіла й почуттів.
              </p>
            </div>

            {/* <div className="border-l-4 border-white/30 pl-6">
              <h2 className="text-xl font-semibold mb-4">Я працюю з:</h2>
              <div className="space-y-2 text-lg">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  жінками, які втомились бути `сильними`
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  парами, які хочуть знову відчути близькість
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  підлітками, які шукають себе
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  фахівцями, які потребують підтримки та супервізії
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  тими, хто не знає «що саме болить», але хоче жити інакше
                </div>
              </div>
            </div> */}
            {/* Button */}
            <div className="pt-6 self-center w-full hidden md:block">
              <button
                onClick={() => {
                  router.push("/aboutMe");
                }}
                className="bg-white hover:bg-red-200 text-gray-800 w-full md:px-12 py-3 rounded-bl-md rounded-br-3xl rounded-tl-3xl rounded-tr-md font-semibold shadow-md hover:scale-105 transition-all duration-300"
              >
                ДІЗНАТИСЯ БІЛЬШЕ
              </button>
            </div>
            {/* <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-lg font-medium leading-relaxed italic">
                Вірю, що з теплом, професіоналізмом і прийняттям можливо
                зцілювати навіть дуже глибокі рани.
              </p>
            </div> */}
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
                «Найглибша робота починається не з питання `що зі мною не так?`,
                а з питання `чого я насправді потребую?`»
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

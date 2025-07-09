"use client";
import Image from "next/image";
import benefitsImg from "@/public/benefits-img.jpg";
import { useRouter } from "next/navigation";
export default function BenefitsContainer() {
  const router = useRouter();
  const benefits = [
    // {
    //   id: "01",
    //   title: "Безпечний простір без осуду",
    //   description:
    //     "Я створюю підтримувальний простір, де можна відкрито говорити про важливе — без осуду, сорому чи табу. Працюю з повагою до ваших кордонів, досвіду та темпу.",
    // },
    {
      id: "01",
      title: "Інтегративний та гнучкий підхід",
      description:
        "Не працюю «по шаблону». Поєдную різні підходи: позитивну психотерапію, транзактний аналіз, полімодальний підхід, психосоматику. Терапія вибудовується під вас і ваші реальні потреби.",
    },
    {
      id: "02",
      title: "Професійна підтримка для пар та родин",
      description:
        "Працюю з парами у кризах, на межі розриву або тими, хто хоче повернути близькість, сексуальність, взаємоповагу. Допомагаю налагодити спілкування та зупинити руйнівні сценарії.",
    },
    {
      id: "03",
      title: "Досвід роботи з дітьми та підлітками",
      description:
        "Працюю з підлітками, які переживають тривогу, сором, самотність або шукають свою ідентичність. Допомагаю батькам краще розуміти своїх дітей і створювати контакт замість конфлікту.",
    },
    {
      id: "04",
      title: "Глибока спеціалізація у сфері сексуальності",
      description:
        "Як сертифікована сексологиня, допомагаю працювати з сексуальними дисфункціями, відсутністю бажання, тілесним соромом, болем під час сексу, страхом близькості та відновленням сексуальності після травми.",
    },
    {
      id: "05",
      title: "Підтримка в найважчі моменти життя",
      description:
        "Психологічна допомога в часи втрат, змін, війни, переїздів, післяпологових станів, вигорання. Усе, що зараз болить — має право бути. І може стати точкою росту.",
    },
    {
      id: "06",
      title: "Супервізія і розвиток для фахівців",
      description:
        "Працюю як супервізорка для психологів, які прагнуть професійного росту, ясності у роботі, етичної підтримки й натхнення. Допомагаю не лише розібратись у складних випадках, а й не загубити себе в роботі з іншими.",
    },
  ];

  return (
    <section className="relative py-10 font-semibold">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Переваги моєї роботи
          </h1>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Image */}
          <div className="flex-1 flex flex-col gap-8 justify-center">
            <h1 className="md:text-lg font-semibold text-black mb-4 text-center">
              Я створюю підтримувальний простір, де можна відкрито говорити про
              важливе — без осуду, сорому чи табу. Працюю з повагою до ваших
              кордонів, досвіду та темпу.
            </h1>
            <Image
              src={benefitsImg}
              alt="Олександра Алексюк"
              className="w-auto md:h-160 h-92 rounded-3xl shadow-2xl self-center"
              quality={60}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>

          {/* Benefits List */}
          <div className="flex-1 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="text-black">
                <div className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold text-xl min-w-fit">
                    [{benefit.id}]
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-base leading-relaxed font-normal">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Button */}
            <div className="pt-6">
              <button
                onClick={() => {
                  router.push("/aboutMe");
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 md:px-12 py-3 rounded-bl-md rounded-br-3xl rounded-tl-3xl rounded-tr-md font-semibold shadow-md hover:scale-105 transition-all duration-300"
              >
                ДІЗНАТИСЯ БІЛЬШЕ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import TherapyGroupModalButton from "@/components/Modal/TherapyGroupModalButton";
import { getDictionary } from "@/i18n";
import { Locale } from "@/i18n/config";

type TherapyGroupPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function TherapyGroupPage({
  params,
}: TherapyGroupPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const content = dictionary?.therapyGroup;

  if (!content) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <section className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <div className="inline-flex items-center justify-center md:justify-start">
              <span className="text-sm uppercase tracking-wide text-red-500 font-semibold">
                {content.hero.subtitle}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {content.hero.title}
            </h1>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {content.hero.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm md:text-base font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              {content.hero.price}
            </p>
            <div className="flex justify-center md:justify-start">
              <TherapyGroupModalButton
                label={content.cta.button}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-10 space-y-10 md:space-y-14 mt-10">
        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {content.about.title}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
              {content.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {content.format.title}
            </h2>
            <ul className="space-y-3 text-gray-700 text-base md:text-lg leading-relaxed">
              {content.format.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm md:text-base text-gray-500">
              {content.format.durationNote}
            </p>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {content.helps.title}
            </h2>
            <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
              {content.helps.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {content.join.title}
          </h2>
          <ol className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
            {content.join.steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white font-semibold">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-red-500 rounded-3xl shadow-lg p-6 md:p-10 text-center md:text-left text-white space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">{content.hero.title}</h2>
            <p className="text-lg md:text-xl font-medium">{content.cta.note}</p>
          </div>
          <div className="flex justify-center">
            <TherapyGroupModalButton
              label={content.cta.button}
              variant="secondary"
            />
          </div>
        </section>
      </div>
    </div>
  );
}


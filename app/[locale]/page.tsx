import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import HomeBanner from "@/components/HomeBanner";
import GreetingComponent from "@/components/GreetingComponent";
import BenefitsContainer from "@/components/BenefitsContainer";
import ServicesBlock from "@/components/ServicesComponent";
import SocialsContainer from "@/components/SocialsContainer";
import Testimonials from "@/components/Testimonials";
import DiplomasBlock from "@/components/DyplomComponent";
import BlogsBlock from "@/components/BlogBlock";
import ConsultationTeaserComponent from "@/components/ConsultationTeaserComponent";
import VideoCommentsSection from "@/components/VideoCommentsSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (locales.includes(localeParam as Locale)
    ? localeParam
    : "uk") as Locale;
  return buildPageMetadata({ pathname: `/${locale}`, locale });
}

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <GreetingComponent />
      <BenefitsContainer />
      <ServicesBlock />
      <ConsultationTeaserComponent />
      <DiplomasBlock />
      <BlogsBlock />
      <Testimonials />
      <VideoCommentsSection />
      <SocialsContainer />
      {/* <div className="hidden md:block">
        <ConsultationTeaserComponent />
      </div> */}
    </div>
  );
}

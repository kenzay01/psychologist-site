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

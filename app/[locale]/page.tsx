import HomeBanner from "@/components/HomeBanner";
import GreetingComponent from "@/components/GreetingComponent";
import BenefitsContainer from "@/components/BenefitsContainer";
import ServicesBlock from "@/components/ServicesComponent";
import SocialsContainer from "@/components/SocialsContainer";
import Testimonials from "@/components/Testimonials";
import DiplomasBlock from "@/components/DyplomComponent";
import BlogsBlock from "@/components/BlogBlock";
export default function Home() {
  return (
    <div>
      <HomeBanner />
      <GreetingComponent />
      <BenefitsContainer />
      <ServicesBlock />
      <DiplomasBlock />
      <BlogsBlock />
      <Testimonials />
      <SocialsContainer />
    </div>
  );
}

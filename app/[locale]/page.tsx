import HomeBanner from "@/components/HomeBanner";
import GreetingComponent from "@/components/GreetingComponent";
import BenefitsContainer from "@/components/BenefitsContainer";
import ServicesBlock from "@/components/ServicesComponent";
import SocialsContainer from "@/components/SocialsContainer";
import Testimonials from "@/components/Testimonials";
export default function Home() {
  return (
    <div>
      <HomeBanner />
      <GreetingComponent />
      <BenefitsContainer />
      <ServicesBlock />
      <Testimonials />
      <SocialsContainer />
      {/* Add more components or sections as needed */}
    </div>
  );
}

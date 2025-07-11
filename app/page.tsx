import HomeBanner from "@/components/HomeBanner";
import GreetingComponent from "@/components/GreetingComponent";
import BenefitsContainer from "@/components/BenefitsContainer";
import ServicesBlock from "@/components/ServicesComponent";
import SocialsContainer from "@/components/SocialsContainer";
export default function Home() {
  return (
    <div>
      <HomeBanner />
      <GreetingComponent />
      <BenefitsContainer />
      <ServicesBlock />
      <SocialsContainer />
      {/* Add more components or sections as needed */}
    </div>
  );
}

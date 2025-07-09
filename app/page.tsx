import HomeBanner from "@/components/HomeBanner";
import GreetingComponent from "@/components/GreetingComponent";
import BenefitsContainer from "@/components/BenefitsContainer";
export default function Home() {
  return (
    <div>
      <HomeBanner />
      <GreetingComponent />
      <BenefitsContainer />
      {/* Add more components or sections as needed */}
    </div>
  );
}

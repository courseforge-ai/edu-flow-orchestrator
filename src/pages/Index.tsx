
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Anvil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { CtaSection } from "@/components/marketing/CtaSection";
import { Footer } from "@/components/marketing/Footer";

const Index = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

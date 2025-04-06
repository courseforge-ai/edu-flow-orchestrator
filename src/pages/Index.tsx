
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { CtaSection } from "@/components/marketing/CtaSection";
import { Footer } from "@/components/marketing/Footer";

const Index = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isSignedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isSignedIn, navigate]);

  // Only render marketing content if not signed in
  if (isSignedIn) {
    return null; // Prevent flash of marketing content during redirect
  }

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

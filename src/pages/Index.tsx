
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
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
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">CourseForge</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/#features" className="text-sm font-medium hover:text-primary">Features</Link>
            <Link to="/#how-it-works" className="text-sm font-medium hover:text-primary">How It Works</Link>
            <Link to="/#pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
            <Link to="/#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</Link>
            <Link to="/#contact" className="text-sm font-medium hover:text-primary">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="hidden sm:flex">
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/sign-up">Get Started Free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

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

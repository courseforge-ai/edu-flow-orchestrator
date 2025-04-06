
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-blue-50/60 to-white pointer-events-none" />
        <div aria-hidden="true" className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-100 rounded-full blur-3xl opacity-20" />
        <div aria-hidden="true" className="absolute top-3/4 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-blue-100 rounded-full blur-3xl opacity-20" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-purple-700 via-violet-600 to-blue-600 bg-clip-text text-transparent"
            >
              Empower Your Courses with Seamless Integrations
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Connect, Create, and Deliver Immersive Learning Experiences Effortlessly
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="text-base font-medium">
                <Link to="/sign-up">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base font-medium">
                <Link to="/#features">See How It Works</Link>
              </Button>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                <img 
                  src="https://placehold.co/800x600/E9ECFF/7C3AED?text=Integration+Hub&font=poppins" 
                  alt="Platform Integration Hub" 
                  className="w-full h-auto"
                />
                
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-80" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-80" />
              </div>
              
              {/* Decorative elements representing connected platforms */}
              <div className="absolute -top-4 -left-4 bg-white p-2 rounded-lg shadow-lg border border-gray-100 transform rotate-6">
                <img src="https://placehold.co/60x60/E9ECFF/7C3AED?text=LMS&font=poppins" alt="LMS" className="w-12 h-12" />
              </div>
              <div className="absolute top-1/4 -right-6 bg-white p-2 rounded-lg shadow-lg border border-gray-100 transform -rotate-3">
                <img src="https://placehold.co/60x60/E9ECFF/7C3AED?text=Slack&font=poppins" alt="Slack" className="w-12 h-12" />
              </div>
              <div className="absolute bottom-1/3 -left-8 bg-white p-2 rounded-lg shadow-lg border border-gray-100 transform rotate-12">
                <img src="https://placehold.co/60x60/E9ECFF/7C3AED?text=Drive&font=poppins" alt="Google Drive" className="w-12 h-12" />
              </div>
              <div className="absolute -bottom-2 right-8 bg-white p-2 rounded-lg shadow-lg border border-gray-100 transform -rotate-6">
                <img src="https://placehold.co/60x60/E9ECFF/7C3AED?text=Zoom&font=poppins" alt="Zoom" className="w-12 h-12" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

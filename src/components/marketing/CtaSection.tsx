
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 to-blue-700">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://placehold.co/1600x400/1a1a1a/000000?text=+&font=opensans')] mix-blend-overlay opacity-20" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/60 to-transparent" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative py-16 px-8 md:py-24 md:px-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              Ready to Elevate Your Courses?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-blue-100 max-w-2xl mx-auto mb-8"
            >
              Join a community of forward-thinking educators enhancing their teaching with seamless integrations.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-blue-50">
                <Link to="/sign-up">Start Your Free Trial Today</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

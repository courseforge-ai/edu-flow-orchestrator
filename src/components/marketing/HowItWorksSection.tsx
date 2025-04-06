
import { motion } from "framer-motion";
import { Link2, Pencil, BarChart4 } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Tools",
      description: "Link your existing platforms and services with just a few clicks.",
      icon: Link2,
      color: "bg-blue-500"
    },
    {
      number: "02",
      title: "Design Engaging Workflows",
      description: "Use our visual builder to map out personalized learning journeys.",
      icon: Pencil,
      color: "bg-purple-500"
    },
    {
      number: "03",
      title: "Launch and Monitor",
      description: "Deploy your courses and track performance with real-time analytics.",
      icon: BarChart4,
      color: "bg-indigo-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Create Immersive Courses in Three Simple Steps
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Our platform simplifies the process of building connected and engaging learning experiences
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-xl p-8 h-full shadow-sm border border-gray-100">
                <div className={`absolute -top-5 left-8 ${step.color} rounded-full w-10 h-10 flex items-center justify-center text-white font-bold`}>
                  {step.number}
                </div>
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-6 mt-4">
                  <step.icon className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10H30M30 10L20 0M30 10L20 20" stroke="#D1D5DB" strokeWidth="2"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden rounded-xl shadow-lg"
        >
          <div className="aspect-video bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
            <img 
              src="https://placehold.co/1200x600/E9ECFF/7C3AED?text=Workflow+Builder+Preview&font=poppins" 
              alt="Platform workflow builder preview" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
